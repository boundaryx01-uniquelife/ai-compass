from pathlib import Path
import re,json,hashlib,subprocess
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
# A small complete teaching sequence; not a claim to have migrated the 42-slide main deck.
# Each explanatory excerpt is read from the canonical manuscript. New facilitation text is marked as a derivative.
def excerpt(page,start,end):
 t=pages[page]['text'];a=t.index(start);b=t.index(end,a) if end else len(t)
 return t[a:b].strip()
slidespec=[
('system','같은 모델, 다른 시스템',3,'모델과 제품과 에이전트는 같은 것이 아니다','가장 먼저 풀어야 할 매듭','정리하면 이렇습니다.',['MODEL','PRODUCT','AGENT'],'같은 모델을 쓰는 두 서비스의 행동 범위가 같을까요?','모델 이름만 같으면 시스템도 같다는 생각을 구분합니다.','모델 성능 외에 어떤 요소를 확인해야 할지 생각해 보세요.'),
('purpose','기술보다 먼저, 용도와 영향',4,'이 AI는 무엇을 위해 쓰이며, 실패하면 누가 어떤 영향을 받는가?','상황 A.','그래서 이 질문은',['PURPOSE','STAKES'],'맞춤법 제안과 최종 성적 기록에 같은 통제로 충분할까요?','같은 오류율이면 같은 위험이라는 판단을 경계합니다.','이제 용도 위에 놓이는 네 능력축을 살펴봅니다.'),
('control','네 능력축을 가로지르는 통제',5,'Control Plane은 네 층 위에 얹는 다섯 번째 층이 아닙니다.','주의할 점이 있습니다.','PURPOSE & STAKES',['MODEL','CONTEXT','ACTION / TOOLS','AUTONOMY'],'정지와 복구는 어느 한 층에만 필요할까요?','Control을 다섯째 능력층으로 읽지 않도록 외곽의 통제를 짚습니다.','먼저 모델에서 어떤 출력이 만들어지는지 확인합니다.'),
('model','그럴듯함과 사실은 다르다',8,'출력의 자신감 있는 어조는 사실 정확도의 지표가 아닙니다.','모델은 사실 목록을','치우침은 한 곳에서만',['생성','환각','확인 경로'],'자신 있게 쓰인 학생 활동 기록에서 무엇을 먼저 확인할까요?','환각을 의도적인 거짓말이나 단순 고장으로 설명하지 않습니다.','출력을 확인했다면 다음에는 입력의 출처를 봅니다.'),
('context','데이터가 지시처럼 작동할 때',12,'시스템이 데이터로 읽으려고 넣은 텍스트가, 모델에게는 지시처럼 작동할 수 있다.','사람은 두 가지를','탈옥과 인젝션은',['CONTEXT','TRUST BOUNDARY'],'학생 과제의 만점 지시와 교사의 평가 기준은 같은 권위를 가질까요?','지시 계층이 존재한다고 물리적 분리가 보장되는 것은 아닙니다.','이제 그 판단이 실행으로 이어지는 경로를 봅니다.'),
('action','모델은 요청하고, 실행 계층이 실행한다',16,'AI 시스템의 행동 범위를 정하는 것은 모델이 아니라, 그 바깥을 설계한 사람입니다.','모델이 만드는 것은 요청입니다.',None,['MODEL → 요청','HARNESS / RUNTIME','권한 검사 → 실행'],'메일 발송을 제한하려면 어느 지점에 통제를 넣어야 할까요?','모델이 실제 전송을 직접 수행한다는 표현을 구분합니다.','실행할 수 있는 일과 스스로 고르는 일은 별개입니다.'),
('autonomy','자동 시작과 자율 판단은 별개',21,'언제 시작하는가와, 시작한 뒤 얼마나 스스로 판단하는가는 같은 것인가?','시스템 A.','그래서 이번 장의 질문은',['AUTOMATION','AUTONOMY','TRIGGER'],'A와 B 중 시작한 뒤 스스로 선택하는 시스템은 무엇인가요?','예약 실행이라는 이유로 높은 자율성 수준을 부여하지 않습니다.','반복하는 시스템이 작업 뒤에도 남는지 살펴봅니다.'),
('persistence','L3는 끝나면 사라지고, L4는 끝나도 남는다.',22,'L3는 끝나면 사라지고, L4는 끝나도 남는다.','L3는 맡긴 일이 끝나면',None,['L3 · 작업 종료','L4 · 목표·권한·상태 지속'],'승인을 받더라도 작업 뒤에 목표와 권한이 남으면 무엇을 확인해야 할까요?','승인 유무 하나만으로 L3를 정하지 않습니다. 반복 구조와 지속성부터 확인합니다.','자동 시작의 반례를 한 번 더 확인합니다.'),
('scheduled','09:00 고정 메시지',23,'L0 / Scheduled','F를 자세히 볼 필요가 있습니다.','언제 켜지는가는',['AI 판단 없음','정해진 시각','고정 문장'],'매일 자동으로 보내는데도 왜 L0인가요?','Scheduled는 시작 조건이며 자율성 수준이 아닙니다.','이제 사람이 확인하는 통제가 실제로 작동하는지 봅니다.'),
('hitl','승인 절차와 실질적 감독',27,'승인 단계가 존재한다 ≠ 실질적인 감독이 이루어진다','HITL은 가장 널리 쓰이는','되돌릴 수 있는가',['자동화 편향','승인 피로','실질적 검토'],'승인 요청을 늘리는 것만으로 감독이 좋아질까요?','사람의 확인이 있으면 안전하다는 결론으로 끝내지 않습니다.','무엇을 반드시 검토할지 가역성과 연결합니다.'),
('reversibility','혼자 되돌릴 수 있는가?',27,'이걸 되돌리려면 다른 사람에게 부탁해야 하는가?','다만 이 신호등을','세 사건을 다시',['GREEN','YELLOW','RED','UNKNOWN'],'내 임시 파일과 공동 문서를 삭제하는 것은 같은 색일까요?','색은 행동 이름이 아니라 실제 복구 가능성과 영향 범위로 판단합니다. 모르면 UNKNOWN으로 남깁니다.','세 사건에서 무엇을 바꾸면 결과가 달라질지 확인합니다.'),
('transfer','사건 이름보다 바꿀 수 있는 구조',34,'세 번 모두 바꾼 것은 모델이 아니었습니다.','이 장에서 확인할 것','판단 지점',['CONTEXT','ACTION / AUTONOMY','CONTROL'],'Case A, B, C에서 각각 하나의 통제를 바꾼다면 무엇을 고르겠습니까?','사건 하나에 위험 이름 하나만 붙이면 다른 층의 원인이 보이지 않습니다.','Case Lab에서 판단을 기록하고 원고 해설과 대조해 보세요.')]
deck=[]
for i,(id,title,page,core,start,end,keywords,q,mis,transition) in enumerate(slidespec):
 quote=excerpt(page,start,end)
 section=next(s for s in sections if s['page']==page)
 # full_script is directly reusable as PPTX speaker notes.
 script=f"도입\n{title}를 함께 살펴보겠습니다. 먼저 화면의 핵심 문장을 읽어 보세요.\n\n핵심 설명 · 원고 발췌\n{quote}\n\n학생 질문\n{q}\n답을 바로 제시하기보다 잠시 생각할 시간을 주고, 근거가 되는 구조를 말하도록 요청합니다.\n\n오개념 교정\n{mis}\n\n다음 연결\n{transition}"
 deck.append({'id':id,'title':title,'student_view':{'message':core,'keywords':keywords,'diagram':'cross-control' if id=='control' else 'keywords'},'core_message':core,'quick_note':f'{core} {mis}','full_script':script,'estimated_time':'2–3분 (질문 포함)','teacher_question':q,'misconception':mis,'emphasis':core,'glossary_links':section['glossary_links'],'ebook_links':[f"read/{section['part']}/{section['id']}"],'activity_or_case_links':['learn/case/hidden-instruction'],'source':{'file':pages[page]['source'],'page':page,'excerpt':quote},'editorial_status':'원고 기반 수업용 파생 초안 · 교사 검토 가능'})
dump('teacher-deck.json',{'version':'1.0','id':'compass-intro','title':'구조로 읽는 AI · 첫 수업','description':'원고와 강의 명세에 근거한 12장 입문 수업. 42장 본강의 전체 이관본은 아닙니다.','speakerNotesField':'full_script','slides':deck})
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
print(f'Generated {len(sections)} source mappings, {len(deck)} slides, {len(case_data)} cases.')
