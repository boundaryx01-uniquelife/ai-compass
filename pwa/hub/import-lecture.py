"""Restore supplied lecture assets; never edit the PPTX/PDF or manuscript."""
from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import fitz, json, hashlib, posixpath, re
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
deck=[];doc=fitz.open(pdf)
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
  pdftext=doc[i-1].get_text()
  # Verify title matching; spatial text ordering differs, so compare ignoring whitespace.
  norm=lambda s:re.sub(r'\s+','',s)
  assert norm(title) in norm(pdftext),(i,title)
  pix=doc[i-1].get_pixmap(matrix=fitz.Matrix(1600/doc[i-1].rect.width,1600/doc[i-1].rect.width),alpha=False)
  file=f'slide-{i:02}.webp'
  Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(assets/file,'WEBP',quality=92,method=6)
  deck.append({'id':f'slide-{i:02}','number':i,'title':title,'chapter':texts[0] if i not in (1,42) else 'AI COMPASS','student_view':{'image':'./assets/lecture-v01/'+file,'text':texts,'width':pix.width,'height':pix.height},'core_message':None,'quick_note':note or None,'full_script':None,'estimated_time':None,'teacher_question':None,'misconception':None,'emphasis':None,'glossary_links':[],'ebook_links':[],'activity_or_case_links':[],'source':{'pptx':ppt.relative_to(ROOT).as_posix(),'pdf':pdf.relative_to(ROOT).as_posix(),'slide':i,'slide_xml':name,'notes_verbatim':note},'editorial_status':'기존 강의 원본 이관 · 미제공 교사 필드는 비워 둠'})
data={'version':'1.1','id':'lecture-v01','title':'AI Compass Lecture Deck v0.1','description':'제공된 42장 원본 강의. 학생 화면은 PDF 배치 그대로, 짧은 발표자 노트는 PPTX 원문 그대로.','speakerNotesField':'full_script','sources':{'pptx':str(ppt.relative_to(ROOT)).replace('\\','/'),'pptxSha256':hashlib.sha256(ppt.read_bytes()).hexdigest(),'pdf':str(pdf.relative_to(ROOT)).replace('\\','/'),'pdfSha256':hashlib.sha256(pdf.read_bytes()).hexdigest()},'slides':deck}
(OUT/'data/teacher-deck.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Restored slides:',len(deck),'existing notes:',sum(bool(s['quick_note']) for s in deck),'full scripts:',sum(bool(s['full_script']) for s in deck))
