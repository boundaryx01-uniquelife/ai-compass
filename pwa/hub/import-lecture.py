"""Render the supplied lecture PDF as web images without changing source files or teaching data."""
from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import fitz, posixpath, re
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'pwa/hub'
ppt=ROOT/'docs/slides/AI_Compass_Lecture_Deck_v0.1.pptx'
pdf=ROOT/'docs/slides/AI_Compass_Lecture_Deck_v0.1.pdf'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def rels(z,name):
 return {x.get('Id'):x for x in E.fromstring(z.read(name))}
def target(base,name): return posixpath.normpath(posixpath.join(posixpath.dirname(base),name))
def paras(node):return [''.join(p.xpath('.//a:t/text()',namespaces=ns)) for p in node.xpath('.//a:p',namespaces=ns)]
note_count=0;doc=fitz.open(pdf)
assets=OUT/'assets/lecture-v01';assets.mkdir(parents=True,exist_ok=True)
with ZipFile(ppt) as z:
 pres=E.fromstring(z.read('ppt/presentation.xml'));rs=rels(z,'ppt/_rels/presentation.xml.rels')
 ordered=[target('ppt/presentation.xml',rs[x.get('{'+ns['r']+'}id')].get('Target')) for x in pres.xpath('//p:sldId',namespaces=ns)]
 assert len(ordered)==len(doc)==42
 for i,name in enumerate(ordered,1):
  x=E.fromstring(z.read(name))
  texts=[v for v in paras(x) if v.strip()]
  # The supplied deck uses a small section label followed by the main title.
  title=texts[0] if i in (1,42) else texts[1]
  note=''
  relpath=posixpath.dirname(name)+'/_rels/'+posixpath.basename(name)+'.rels'
  if relpath in z.namelist():
   for rel in rels(z,relpath).values():
    if rel.get('Type','').endswith('/notesSlide'):
     nx=E.fromstring(z.read(target(name,rel.get('Target'))))
     bodies=nx.xpath('//p:sp[p:nvSpPr/p:nvPr/p:ph[@type="body"]]',namespaces=ns)
     note='\n'.join(p for b in bodies for p in paras(b)).strip()
  note_count+=bool(note)
  pdftext=doc[i-1].get_text()
  # Verify title matching; spatial text ordering differs, so compare ignoring whitespace.
  norm=lambda s:re.sub(r'\s+','',s)
  assert norm(title) in norm(pdftext),(i,title)
  pix=doc[i-1].get_pixmap(matrix=fitz.Matrix(1600/doc[i-1].rect.width,1600/doc[i-1].rect.width),alpha=False)
  file=f'slide-{i:02}.webp'
  Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(assets/file,'WEBP',quality=92,method=6)
print('Rendered slides:',len(doc),'PPTX slides with existing notes:',note_count)
