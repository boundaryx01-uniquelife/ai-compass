from pathlib import Path
import re,json,hashlib,subprocess,sys
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'pwa/hub/data'
OUT.mkdir(parents=True,exist_ok=True)
def dump(name,data): (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
names=['00_FRONT_PART0_PART1.md','01_PART2_PART3.md','02_PART4.md','03_PART5_PART6.md','04_PART7.md','05_APPENDICES.md']
pages={};sources=[]
for name in names:
 p=ROOT/'docs/manuscript'/name; raw=p.read_bytes(); text=raw.decode('utf-8').replace('\r\n','\n')
 sources.append({'file':name,'sha256':hashlib.sha256(raw).hexdigest()})
 chunks=re.split(r'<!-- PDF page (\d+) / 53 -->',text)
 for i in range(1,len(chunks),2): pages[int(chunks[i])]={'text':chunks[i+1].strip(),'source':name}
assert list(pages)==list(range(1,54))
groups=[('front','시작',1,2),('part-0','PART 0 · AI를 보는 새로운 방법',3,5),('part-1','PART 1 · MODEL',6,10),('part-2','PART 2 · CONTEXT',11,15),('part-3','PART 3 · ACTION / TOOLS',16,20),('part-4','PART 4 · AUTONOMY',21,25),('part-5','PART 5 · CONTROL PLANE',26,29),('part-6','PART 6 · CASE LAB',30,34),('part-7','PART 7 · ANALYSIS CANVAS',35,39),('appendices','부록 안내',40,40),('appendix-a','부록 A · 헷갈리는 용어 15쌍',41,41),('appendix-b','부록 B · 분석 캔버스 워크시트',42,44),('appendix-c','부록 C · 자율성 레벨 판정 시트',45,46),('appendix-d','부록 D · 자주 나오는 오개념',47,47),('appendix-e','부록 E · 보안 기술 세부',48,49),('appendix-f','부록 F · 모델과 시스템',50,51),('appendix-g','부록 G · 빈 Product Map / 마침',52,53)]
termGroups={'front':['ai-system'],'part-0':['ai-model','ai-service','agent','control-plane'],'part-1':['training','inference','hallucination'],'part-2':['context','rag','trust-boundary','prompt-injection'],'part-3':['tool-use','harness-runtime','mcp','permission'],'part-4':['autonomy','automation','trigger'],'part-5':['control-plane','hitl','observability','reversibility'],'part-6':['prompt-injection','hallucination','least-privilege'],'part-7':['autonomy','reversibility'],'appendix-a':['context','memory'],'appendix-b':['control-plane'],'appendix-c':['autonomy','trigger'],'appendix-d':['hallucination','hitl'],'appendix-e':['sandbox','permission'],'appendix-f':['training','rag'],'appendix-g':[],'appendices':[]}
sections=[]
for part,label,start,end in groups:
 for n in range(start,end+1):
  sections.append({'part':part,'partTitle':label,'id':f'page-{n}','page':n,'title':f'{label} · {n}쪽','source':pages[n]['source'],'textSha256':hashlib.sha256(pages[n]['text'].encode()).hexdigest(),'glossary_links':termGroups[part]})
dump('ebook.json',{'version':'1.0','sourceRoot':'../../docs/manuscript/','sources':sources,'sections':sections,'coverage':53,'appendixG':'intentionally-unfilled','formatNotes':[{'pages':[3,5,16,17,22,28,33,41,42,43,44,45,46,47,50,51,52],'status':'전사본의 표·도식 줄 순서를 유지합니다. 원문 관계를 추측해 재배열하지 않았습니다.'},{'pages':[33,43],'status':'색상/열 관계가 전사본에서 불명확합니다. PDF 대조 편집 확인이 필요합니다.'}]})
questions=['무엇을 위해 쓰는가?','무엇을 알고 있는가?','무엇을 보고 있는가?','무엇을 할 수 있는가?','얼마나 혼자 가는가?','누가 멈추고 되돌릴 수 있는가?']
topics=[
('system','SYSTEM',questions[0],'ai-system',3,['ai-model','ai-service','ai-system','agent']),
('model','MODEL',questions[1],'ai-model',6,['training','inference','llm','knowledge-cutoff','hallucination']),
('context','CONTEXT',questions[2],'context',11,['prompt','rag','memory','trust-boundary','instruction-hierarchy','prompt-injection']),
('action','ACTION / TOOLS',questions[3],'tool-use',16,['tool-use','harness-runtime','mcp','permission','least-privilege','sandbox']),
('autonomy','AUTONOMY',questions[4],'autonomy',21,['automation','autonomy','trigger','agent']),
('control','CONTROL',questions[5],'control-plane',26,['control-plane','hitl','observability','reversibility'])]
dump('hub.json',{'title':'AI COMPASS','promise':'AI를 이름이 아니라 구조로 이해하고, 읽고, 비교하고, 가르치는 인터랙티브 허브.','questions':questions,'topics':[{'id':id,'title':title,'question':q,'term':term,'page':page,'terms':terms} for id,title,q,term,page,terms in topics]})
# Restore supplied lecture; never regenerate replacement prose.
subprocess.run([sys.executable,str(OUT.parent/'import-lecture.py')],check=True)
case_source=ROOT/'docs/education/case-cards/AI_COMPASS_CASE_CARDS_v0.1.md'
case_text=case_source.read_text(encoding='utf-8').replace('\r\n','\n')
case_data=[]
for letter,id,page,termids in [('A','hidden-instruction',30,['indirect-prompt-injection','trust-boundary','permission']),('B','hallucinated-record',31,['hallucination','hitl']),('C','drive-agent',32,['permission','autonomy','observability'])]:
 chunk=case_text.split('## Card '+letter+' — ')[1].split('\n---')[0]
 title=chunk.split('\n')[0];situation=chunk.split('### 상황\n')[1].split('### 먼저 고르기')[0].strip()
 feedback=chunk.split('### 핵심 해설\n')[1].strip()
 case_data.append({'id':id,'title':title,'source':'docs/education/case-cards/AI_COMPASS_CASE_CARDS_v0.1.md','page':page,'scenario':situation,'steps':[{'title':'사건 제시','prompt':'누가 무엇을 맡겼고, 실패하면 누가 영향을 받는지 기록하세요.','feedback':situation},{'title':'어디에서 문제가 시작됐나?','prompt':'MODEL / CONTEXT / ACTION / AUTONOMY 중 시작점과 근거를 적으세요.','feedback':feedback},{'title':'무엇이 영향을 키웠나?','prompt':'권한, 반복, 공식 기록, 관찰 가능성을 연결해 보세요.','feedback':feedback},{'title':'어떤 통제가 필요했나?','prompt':'바꾸고 싶은 통제 하나와 결과가 달라질 이유를 적으세요.','feedback':feedback},{'title':'Compass 구조에 연결','prompt':'처음의 판단과 비교하고 관련 용어·원고에서 근거를 확인하세요.','feedback':feedback}],'glossary_links':termids})
dump('cases.json',{'version':'1.0','cases':case_data})
# Persist pre-change protected file inventory. Never write outside pwa/hub.
protected={}
for base in ['pwa/glossary','pwa/v2','docs/manuscript','docs/education/glossary']:
 for p in (ROOT/base).rglob('*'):
  if p.is_file(): protected[p.relative_to(ROOT).as_posix()]=hashlib.sha256(p.read_bytes()).hexdigest()
baseline=OUT.parent/'tests/protected-baseline.json'
baseline.parent.mkdir(exist_ok=True)
if not baseline.exists(): baseline.write_text(json.dumps(protected,indent=2)+'\n',encoding='utf-8')
print(f'Generated {len(sections)} source mappings, {len(json.loads((OUT/'teacher-deck.json').read_text(encoding='utf-8'))['slides'])} slides, {len(case_data)} cases.')
