import {segments,go} from './router.js';
import {read,write} from './storage.js';
import {splitPages,renderManuscript,escape as e} from './manuscript.js';
const main=document.querySelector('main'),status=document.querySelector('#status');
let hub,ebook,deck,cases,glossary,pages=new Map(),teacher=false,caseStep=0,activeCase='',currentSlide=0;
let notes=read('case-notes',{});if(!notes||Array.isArray(notes)||typeof notes!=='object')notes={};
const term=id=>glossary.terms.find(t=>t.id===id);
const button=(href,text)=>'<a class="button" href="'+href+'">'+text+'</a>';
const termLinks=ids=>ids.map(id=>term(id)?button('#/learn/glossary/'+id,e(term(id).ko)):'').join('');
const readLink=n=>{const s=ebook.sections.find(s=>s.page===n);return '#/read/'+s.part+'/'+s.id;};
const tabs=(items,active,label)=>'<nav class="tabs" aria-label="'+label+'">'+items.map(([path,title])=>'<a href="#/'+path+'" '+(path===active?'aria-current="page"':'')+'>'+title+'</a>').join('')+'</nav>';
function diagram(){return '<div class="compass" aria-label="네 능력축을 감싸는 통제 구조"><div class="compass-caption">PURPOSE &amp; STAKES · 용도와 영향</div><div class="stack" aria-label="Capability Stack">'+hub.topics.slice(1,5).map(t=>'<div class="stack-row"><strong>'+t.title+'</strong><span>'+t.question+'</span></div>').join('')+'</div><div class="cross-control"><strong>CONTROL PLANE · 전체를 가로지르는 통제</strong><br>'+hub.questions[5]+'</div></div>';}
function intro(){main.innerHTML='<section class="intro"><div><p class="eyebrow">SYSTEMS &amp; RISK LITERACY</p><h1>AI COMPASS</h1><p class="statement">AI를 이름으로<br>판단하지 않습니다.</p><p class="hint">'+e(hub.promise)+'</p><a class="button primary" href="#/explore/system">COMPASS 열기 →</a></div>'+diagram()+'</section>';}
function explore(id='system'){
 const i=hub.topics.findIndex(t=>t.id===id);if(i<0)return missing();const t=hub.topics[i];
 const range={system:[2,9],model:[10,13],context:[14,18],action:[19,23],autonomy:[24,29],control:[30,34]}[id];
 main.innerHTML='<section class="screen">'+tabs(hub.topics.map(t=>['explore/'+t.id,t.title]),'explore/'+id,'탐색 주제')+'<p class="explore-guide hint">구조 탐색 · 주제를 선택하고, 관련 강의에서 설명과 도식을 확인하세요. 용어 카드와 원고로 더 읽을 수 있습니다.</p><div class="topic"><div><p class="eyebrow">'+(id==='control'?'CROSS-CUTTING CONTROL':'EXPLORE THE STRUCTURE')+'</p><h1>'+t.title+'</h1><h2>'+t.question+'</h2><p class="lead">'+e(term(t.term).short)+'</p>'+(id==='autonomy'?'<p class="hint">Autonomy와 Trigger는 별도의 축입니다.<br>L3는 끝나면 사라지고, L4는 끝나도 남는다.</p>':'')+(id==='control'?'<p class="hint">네 능력축 전체를 가로지르는 통제 구조</p>':'')+'<div class="actions">'+button('#/teach/lecture-v01/slide-'+String(range[0]).padStart(2,'0'),'이 주제 강의 보기 · '+range[0]+'–'+range[1]+'장')+button(readLink(t.page),'원고 읽기 ↗')+button('#/learn/case/hidden-instruction','사례 조사 ↗')+'</div></div><div class="concepts">'+t.terms.map(id=>'<a href="#/learn/glossary/'+id+'"><strong>'+e(term(id).ko)+'</strong><small>'+e(term(id).en)+' ↗</small></a>').join('')+'</div></div><div class="page-nav">'+(i?button('#/explore/'+hub.topics[i-1].id,'← 이전 주제'):'<span></span>')+'<span class="hint">'+(i+1)+' / 6</span>'+(i<5?button('#/explore/'+hub.topics[i+1].id,'다음 주제 →'):button('#/learn/glossary','학습으로 →'))+'</div></section>';
}
const learnTabs=k=>tabs([['learn/glossary','Glossary'],['learn/compare','Compare'],['learn/quiz','3분 학습'],['learn/case/hidden-instruction','Case Lab']],k==='case'?'learn/case/hidden-instruction':'learn/'+k,'학습 메뉴');
function learn(kind='glossary',id){
 if(kind==='case')return caseView(id);
 const target=kind==='glossary'?(id?'term/'+id:'find'):kind==='compare'?'compare'+(id?'/'+id:''):kind==='quiz'?'learn':null;
 if(!target||kind==='glossary'&&id&&!term(id))return missing();
 main.innerHTML='<section class="screen"><div class="learn-head">'+learnTabs(kind)+'<a class="hint" href="../glossary/#/'+e(target)+'" target="_blank" rel="noopener">용어집 별도 창 ↗</a></div><div class="frame-wrap"><iframe id="glossary-frame" title="AI Compass Glossary · 기존 학습 모듈" src="../glossary/#/'+e(target)+'"></iframe></div></section>';
 const frame=document.querySelector('iframe');
 frame.addEventListener('load',()=>{try{
 const sync=()=>{const [screen,id]=frame.contentWindow.location.hash.slice(2).split('/');const k=screen==='learn'?'quiz':screen==='compare'?'compare':'glossary';const suffix=screen==='term'||screen==='compare'&&id?'/'+id:'';history.replaceState(null,'','#/learn/'+k+suffix);document.querySelectorAll('main .tabs a').forEach(a=>{if(a.hash==='#/learn/'+k)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});};
 frame.contentWindow.addEventListener('hashchange',sync);
 }catch{status.textContent='용어집은 별도 창 링크로도 열 수 있습니다.';}});
}
function caseView(id='hidden-instruction'){
 const c=cases.cases.find(c=>c.id===id);if(!c)return missing();if(activeCase!==id){activeCase=id;caseStep=0;}
 const step=c.steps[caseStep],key=id+':'+caseStep;
 main.innerHTML='<section class="screen">'+learnTabs('case')+tabs(cases.cases.map(c=>['learn/case/'+c.id,e(c.title)]),'learn/case/'+id,'사례 선택')+'<article class="case-panel"><p class="eyebrow">CASE LAB · '+(caseStep+1)+' / 5</p><h1>'+e(step.title)+'</h1><h2>'+e(c.title)+'</h2><p>'+e(c.scenario)+'</p><label for="case-answer">'+e(step.prompt)+'</label><textarea id="case-answer">'+e(typeof notes[key]==='string'?notes[key]:'')+'</textarea><p class="hint">정답 점수 없이 내 판단을 기록하고 해설과 대조합니다.</p><details><summary>판단 후 원문 해설 확인</summary><p style="white-space:pre-wrap">'+e(step.feedback)+'</p></details>'+(caseStep===4?'<div class="related">'+termLinks(c.glossary_links)+button(readLink(c.page),'원고 해설 읽기')+'</div><p>조사를 마쳤습니다. 바꿀 수 있는 통제를 원고 근거와 연결해 보세요.</p>':'')+'<p class="hint">출처: Case Cards v0.1 / 원고 Part 6</p></article><div class="page-nav"><button id="case-prev" '+(caseStep===0?'disabled':'')+'>← 이전 단계</button><button id="case-next">'+(caseStep===4?'처음부터 다시':'다음 단계 →')+'</button></div></section>';
 document.querySelector('#case-answer').addEventListener('input',ev=>{notes[key]=ev.target.value;write('case-notes',notes);});
 document.querySelector('#case-prev').onclick=()=>{caseStep--;caseView(id);};
 document.querySelector('#case-next').onclick=()=>{caseStep=(caseStep+1)%5;caseView(id);};
}
function readView(part,id){
 if(!part){const last=read('reading',null),s=ebook.sections.find(s=>s.part===last?.part&&s.id===last?.id)||ebook.sections[0];history.replaceState(null,'','#/read/'+s.part+'/'+s.id);part=s.part;id=s.id;}
 const idx=ebook.sections.findIndex(s=>s.part===part&&s.id===id);if(idx<0)return missing();const s=ebook.sections[idx],text=pages.get(s.page);write('reading',{part,id});
 const groupIds=[...new Set(ebook.sections.map(s=>s.part))];
 main.innerHTML='<section class="screen"><div class="reading-top"><button class="mobile-toc" id="toc-toggle" aria-expanded="false" aria-controls="toc">목차</button><strong id="location">'+e(s.title)+'</strong><span class="hint">원고 v1.0 · 53쪽 전체</span></div><div class="reader"><aside class="toc" id="toc" aria-label="eBook 목차"><h2>목차</h2>'+groupIds.map(p=>'<details '+(p===part?'open':'')+'><summary>'+e(ebook.sections.find(s=>s.part===p).partTitle)+'</summary>'+ebook.sections.filter(s=>s.part===p).map(s=>'<a href="#/read/'+s.part+'/'+s.id+'" '+(s.id===id?'aria-current="page"':'')+'>'+s.page+'쪽</a>').join('')+'</details>').join('')+'</aside><div class="reading-column"><div class="reading-scroll" tabindex="0" aria-label="원고 본문"><article class="manuscript" data-page="'+s.page+'">'+renderManuscript(text)+'</article><div class="related" aria-label="관련 학습">'+termLinks(s.glossary_links)+button('#/explore/'+({'part-1':'model','part-2':'context','part-3':'action','part-4':'autonomy','part-5':'control'}[part]||'system'),'구조 탐색')+(s.page>=30&&s.page<=34?button('#/learn/case/hidden-instruction','Case Lab'):'')+'</div><details><summary>원문 출처 / 전사 안내</summary><p class="hint">docs/manuscript/'+e(s.source)+' · PDF '+s.page+'/53. 본문 문구와 전사 순서를 유지합니다. 표·도식은 전사 형태로 표시됩니다.</p>'+ebook.formatNotes.filter(n=>n.pages.includes(s.page)).map(n=>'<p class="hint">'+e(n.status)+'</p>').join('')+'</details></div><div class="page-nav">'+(idx?button(readLink(ebook.sections[idx-1].page),'← 이전 section'):'<span></span>')+'<span class="hint">'+s.page+' / 53</span>'+(idx<52?button(readLink(ebook.sections[idx+1].page),'다음 section →'):'<span>원고 끝</span>')+'</div></div></div></section>';
 document.querySelector('#toc-toggle').onclick=ev=>{const open=document.querySelector('.reader').classList.toggle('toc-open');ev.currentTarget.setAttribute('aria-expanded',String(open));};
}
function studentMarkup(s,idx){return '<img src="'+e(s.student_view.image)+'" alt="'+e(s.title)+'" width="1600" height="900"><span class="sr-only">'+e(s.student_view.text.join('\n'))+'</span>';}
function teach(deckId=deck.id,slideId){
 if(deckId==='compass-intro'){const legacy={system:5,purpose:7,control:9,model:11,context:17,action:19,autonomy:24,persistence:27,scheduled:29,hitl:31,reversibility:33,transfer:39};slideId='slide-'+String(legacy[slideId]||1).padStart(2,'0');deckId=deck.id;history.replaceState(null,'','#/teach/'+deckId+'/'+slideId);}
 if(deckId!==deck.id)return missing();const idx=slideId?deck.slides.findIndex(s=>s.id===slideId):0;if(idx<0)return missing();currentSlide=idx;const s=deck.slides[idx];
 if(!slideId)history.replaceState(null,'','#/teach/'+deck.id+'/'+s.id);
 const field=v=>e(v||'원본에 제공되지 않았습니다.');
 main.innerHTML='<section class="screen"><div class="teach-toolbar"><div><p class="eyebrow">TEACH · '+e(deck.title)+'</p><span class="hint">원본 42장 · PPTX 발표자 노트 17장</span></div><div class="actions" role="group" aria-label="발표 모드"><button id="audience" aria-pressed="'+!teacher+'">Audience Mode</button><button id="teacher" aria-pressed="'+teacher+'">Teacher Mode</button><button id="fullscreen">학생 화면 전체화면</button></div></div><div class="teach-grid '+(teacher?'':'audience')+'"><article class="slide original" id="student-slide" aria-label="학생용 슬라이드">'+studentMarkup(s,idx)+'</article>'+(teacher?'<aside class="notes" aria-label="교사용 수업 정보"><h1>'+e(s.title)+'</h1><section><h2>Quick Note</h2><p class="script">'+field(s.quick_note)+'</p><p class="hint">PPTX 발표자 노트 원문 · 예상 시간: '+field(s.estimated_time)+'</p></section><section><h2>Full Teaching Script</h2><p class="script">'+field(s.full_script)+'</p></section><section><h2>학생 질문</h2><p>'+field(s.teacher_question)+'</p><h2>오개념</h2><p>'+field(s.misconception)+'</p></section><details><summary>슬라이드 원문 텍스트</summary><p class="script">'+e(s.student_view.text.join('\n'))+'</p></details><p class="hint">출처: Lecture Deck v0.1 · '+s.number+'장. 학생 화면은 PDF, 발표자 노트는 PPTX에서 가져왔습니다. 미제공 교사 정보는 보충하지 않았습니다.</p><a href="'+e(s.student_view.image)+'" target="_blank" rel="noopener">슬라이드 크게 열기 ↗</a></aside>':'')+'</div><div class="page-nav"><button id="slide-prev" '+(idx===0?'disabled':'')+'>← 이전 슬라이드</button><label class="hint">슬라이드 <select id="slide-select">'+deck.slides.map((s,i)=>'<option value="'+s.id+'" '+(idx===i?'selected':'')+'>'+(i+1)+'. '+e(s.title)+'</option>').join('')+'</select></label><button id="slide-next" '+(idx===deck.slides.length-1?'disabled':'')+'>다음 슬라이드 →</button></div></section>';
 document.querySelector('#audience').onclick=()=>{teacher=false;teach(deck.id,s.id);document.querySelector('#audience').focus();};
 document.querySelector('#teacher').onclick=()=>{teacher=true;teach(deck.id,s.id);document.querySelector('#teacher').focus();};
 document.querySelector('#fullscreen').onclick=async()=>{try{if(!document.fullscreenElement)await document.querySelector('#student-slide').requestFullscreen();else await document.exitFullscreen();}catch{status.textContent='이 환경은 전체화면을 지원하지 않습니다. Audience Mode로 발표할 수 있습니다.';}};
 document.querySelector('#slide-prev').onclick=()=>slideMove(-1);document.querySelector('#slide-next').onclick=()=>slideMove(1);
 document.querySelector('#slide-select').onchange=ev=>go('teach/'+deck.id+'/'+ev.target.value);
}
function slideMove(delta){const idx=currentSlide+delta;if(idx<0||idx>=deck.slides.length)return;
 if(document.fullscreenElement){currentSlide=idx;document.querySelector('#student-slide').innerHTML=studentMarkup(deck.slides[idx],idx);history.replaceState(null,'','#/teach/'+deck.id+'/'+deck.slides[idx].id);}
 else go('teach/'+deck.id+'/'+deck.slides[idx].id);
}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&segments()[0]==='teach')route();});
function missing(){main.innerHTML='<section class="empty"><h1>이 경로를 찾을 수 없습니다.</h1><p>메뉴에서 다시 탐색해 주세요.</p><a class="button" href="#/intro">INTRO로</a></section>';}
function route(){
 const [screen,a,b,c]=segments();if(!hub)return;if(screen!=='teach')teacher=false;
 if(screen==='intro'&&!a)intro();else if(screen==='explore'&&!b)explore(a);else if(screen==='learn'&&!c)learn(a,b);else if(screen==='read'&&!c)readView(a,b);else if(screen==='teach'&&!c)teach(a,b);else missing();
 document.querySelectorAll('header nav a').forEach(el=>{if(el.hash.split('/')[1]===screen)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
 document.title=(main.querySelector('h1')?.textContent||screen.toUpperCase())+' · AI Compass';main.scrollTop=0;main.focus({preventScroll:true});
}
document.addEventListener('keydown',ev=>{if(segments()[0]!=='teach'||ev.altKey||ev.ctrlKey||ev.metaKey||ev.target.matches('input,textarea,select')||ev.target.isContentEditable)return;if(ev.key==='ArrowRight'||ev.key==='ArrowLeft'){ev.preventDefault();slideMove(ev.key==='ArrowRight'?1:-1);}});
let prompt;window.addEventListener('beforeinstallprompt',ev=>{ev.preventDefault();prompt=ev;document.querySelector('#install').hidden=false;});
document.querySelector('#install').onclick=async()=>{if(prompt){await prompt.prompt();prompt=null;document.querySelector('#install').hidden=true;}};
async function json(url){const r=await fetch(url);if(!r.ok)throw Error('자료 요청 실패: '+url);return r.json();}
async function load(){
 try{
 [hub,ebook,deck,cases,glossary]=await Promise.all(['hub','ebook','teacher-deck','cases'].map(n=>json('./data/'+n+'.json')).concat(json('../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json')));
 if(ebook.coverage!==53||ebook.sections.length!==53||glossary.terms.length!==30||!deck.slides.length)throw Error('콘텐츠 구성을 확인해 주세요.');
 pages=new Map();
 for(const source of ebook.sources){const r=await fetch(ebook.sourceRoot+source.file);if(!r.ok)throw Error('원고를 찾을 수 없습니다: '+source.file);for(const p of splitPages(await r.text())){if(pages.has(p.page))throw Error('중복 원고 페이지');pages.set(p.page,p.text);}}
 if(pages.size!==53)throw Error('53쪽 원고가 모두 필요합니다.');
 for(const s of ebook.sections){const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pages.get(s.page))))].map(v=>v.toString(16).padStart(2,'0')).join('');if(hash!==s.textSha256)throw Error('원고와 매핑 버전이 다릅니다. 새 버전으로 다시 열어주세요.');}
 if(!location.hash)history.replaceState(null,'','#/intro');route();
 if('serviceWorker' in navigator){try{
 const registrations=await Promise.all([navigator.serviceWorker.register('./service-worker.js'),navigator.serviceWorker.register('../glossary/service-worker.js',{scope:'../glossary/'})]);
 await Promise.all(registrations.map(reg=>reg.active?Promise.resolve():new Promise((resolve,reject)=>{const worker=reg.installing||reg.waiting;if(!worker)return reject(Error('Worker missing'));const timeout=setTimeout(()=>reject(Error('Worker timeout')),20000);worker.addEventListener('statechange',()=>{if(worker.state==='activated'){clearTimeout(timeout);resolve();}if(worker.state==='redundant'){clearTimeout(timeout);reject(Error('Install failed'));}});})));
 status.textContent='Hub · 원고 · Glossary 오프라인 준비 완료';
 }catch{status.textContent='오프라인 준비 실패 · 연결 상태를 확인하고 다시 열어주세요.';}}
 }catch(err){main.innerHTML='<section class="empty"><h1>자료를 불러오지 못했습니다</h1><p>'+e(err.message)+'</p><button id="retry">다시 시도</button></section>';document.querySelector('#retry').onclick=load;}
}
window.addEventListener('hashchange',route);load();
