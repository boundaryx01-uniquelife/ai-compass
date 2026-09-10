import {routeParts,selectNav} from './router.js';
import {read,write} from './storage.js';
const main = document.getElementById('main');
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let hub,book,deck,lab,glossary;
let teacher = false;
const investigations = new Map();
let savedRead = read('reading',null,v=>v&&typeof v.part==='string'&&typeof v.id==='string');
const termLink = id => {const t=glossary.terms.find(t=>t.id===id);return t?`<a class="chip" href="#/learn/glossary/${id}">${esc(t.ko)}</a>`:'';};
const pageRoute = page => {const s=book.sections.find(s=>s.page===page);return `#/read/${s.part}/${s.id}`;};
const link = (href,label,cls='button') => `<a class="${cls}" href="${href}">${esc(label)}</a>`;
function compass(active='') {
  return `<div class="compass" aria-label="전체 능력을 감싸는 Control Plane"><div class="control-caption">CONTROL PLANE <span>전체를 가로지르는 통제</span></div><div class="capability" aria-label="네 능력 축">${hub.topics.slice(1,5).map((t,i)=>`<a class="dimension ${active===t.id?'selected':''}" href="#/explore/${t.id}"><span class="dimension-number">0${i+1}</span><strong>${esc(t.label)}</strong><span>${esc(t.question)}</span></a>`).join('')}</div><a class="control-link" href="#/explore/control">${esc(hub.intro.controlQuestion)} <span>↗</span></a></div>`;
}
function intro() {
  main.innerHTML=`<section class="intro"><div class="intro-copy"><h1>AI Compass</h1><p class="subtitle">AI를 이름으로 판단하지 않습니다.<br><span>구조를 읽고, 개념을 연결하고, 질문을 수업으로 이어갑니다.</span></p></div><figure class="intro-visual"><img src="./hero-compass.png" alt="Model, Context, Action / Tools, Autonomy를 Control이 감싸는 AI Compass 구조를 추상화한 나침반 이미지" width="1536" height="1024" fetchpriority="high"></figure></section>`;
}
function explore(id) {
  const topic=hub.topics.find(t=>t.id===id);if(!topic)return missing();
  const index=hub.topics.indexOf(topic),term=glossary.terms.find(t=>t.id===topic.summaryTerm);
  main.innerHTML=`<section class="view"><nav class="tabs" aria-label="탐색 주제">${hub.topics.map(t=>`<a href="#/explore/${t.id}" ${id===t.id?'aria-current="page"':''}>${esc(t.label)}</a>`).join('')}</nav><div class="explore-grid"><article class="explore-copy"><p class="eyebrow">EXPLORE / ${String(index+1).padStart(2,'0')}</p><h1>${esc(topic.label)}</h1><h2>${esc(topic.question)}</h2><p class="summary">${esc(term.short)}</p>${id==='autonomy'?'<div class="callout">Trigger = 언제 켜지는가<br>Autonomy = 켜진 뒤 얼마나 혼자 가는가<br><strong>L3는 끝나면 사라지고, L4는 끝나도 남는다.</strong></div>':''}${id==='control'?'<div class="callout">전체를 가로지르는 통제 구조<br><strong>관찰 · 승인 · 정지 · 복구</strong></div>':''}<div class="chips">${topic.terms.map(termLink).join('')}</div><div class="actions">${link(pageRoute(topic.page),'원고 읽기 ↗')}${link(`#/learn/compare/${topic.compare}`,'개념 비교')}${link('#/learn/case/hidden-instruction','사례 보기')}</div></article>${compass(id)}</div><div class="pager">${index?link('#/explore/'+hub.topics[index-1].id,'← 이전 주제'):'<span></span>'}<span>${index+1} / 6</span>${index<5?link('#/explore/'+hub.topics[index+1].id,'다음 주제 →'):link('#/learn/glossary','학습으로 →')}</div></section>`;
}
function learnTabs(active) {
  return `<nav class="tabs" aria-label="학습 메뉴">${[['glossary','Glossary'],['compare','Compare'],['quiz','3분 학습'],['case','Case Lab']].map(([id,label])=>`<a href="#/learn/${id}" ${id===active?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
}
function learn(module='glossary',id) {
  if(module==='case')return caseLab(id);
  if(!['glossary','compare','quiz'].includes(module))return missing();
  if(id && module==='glossary' && !glossary.terms.some(t=>t.id===id))return missing();
  const target=module==='glossary'?(id?'term/'+id:'find'):module==='quiz'?'learn':'compare'+(id?'/'+encodeURIComponent(id):'');
  main.innerHTML=`<section class="view learn-view">${learnTabs(module)}<div class="module-heading"><h1>${module==='glossary'?'개념을 찾고 연결하기':module==='compare'?'헷갈리는 개념 구분하기':'3분 학습'}</h1><a href="../glossary/#/${target}" target="_blank" rel="noopener">독립 용어집 열기 ↗</a></div><iframe class="glossary-frame" title="AI Compass ${module==='quiz'?'3분 학습':module==='compare'?'개념 비교':'용어집'}" src="../glossary/#/${target}"></iframe></section>`;
  // Reuse the tested application directly. Only presentation chrome changes inside this instance.
  // The independent glossary's source files, storage, validation and behavior stay intact.
  const frame=main.querySelector('iframe');
  frame.addEventListener('load',()=>{
    const doc=frame.contentDocument;
    if(!doc)return;
    const style=doc.createElement('style');
    style.textContent='body{background:#fafbf6}.site-header,.navigation,footer,.hero,.skip{display:none!important}main{padding:12px 18px 36px;min-height:0;max-width:1080px}.actions{margin:12px 0}.search{min-height:48px}.card{padding:18px}h1{font-size:28px}.scope{padding-top:12px}';
    doc.head.append(style);
  });
}
function caseLab(id) {
  if(!id){
    const cards=lab.cases.map((c,i)=>{
      const action=c.available?link('#/learn/case/'+c.id,'사건 조사하기 →','button primary'):`<p>단계형 활동 준비 중</p>${link('#/read/'+c.read,'원고에서 사례 읽기')}`;
      return `<article class="case-card"><span class="eyebrow">CASE ${String.fromCharCode(65+i)}</span><h2>${esc(c.title)}</h2>${action}</article>`;
    }).join('');
    main.innerHTML=`<section class="view">${learnTabs('case')}<div class="section-head"><p class="eyebrow">CASE LAB</p><h1>어디서 시작되고, 무엇이 키웠을까?</h1><p>사건을 따라 구조와 통제를 연결해 보세요.</p></div><div class="case-list">${cards}</div></section>`;
    return;
  }
  const item=lab.cases.find(c=>c.id===id);if(!item)return missing();
  if(!item.available){main.innerHTML=`<section class="view">${learnTabs('case')}<h1>${esc(item.title)}</h1><p>단계형 활동은 준비 중입니다. 전체 사례는 원고에서 읽을 수 있습니다.</p>${link('#/read/'+item.read,'사례 원고 읽기')}</section>`;return;}
  const state=investigations.get(id)||{step:-1,answers:[]};investigations.set(id,state);
  let body;
  if(state.step<0)body=`<p class="eyebrow">사건 제시</p><h1>${esc(item.title)}</h1><p class="summary">${esc(item.situation)}</p><blockquote>${esc(item.quote)}</blockquote><button class="primary" id="case-start">조사 시작 →</button>`;
  else if(state.step>=item.steps.length)body=`<p class="eyebrow">COMPASS 구조에 연결</p><h1>입력에서 실행까지 이어지는 사건</h1><div class="case-flow">${item.connections.map((id,i)=>`<a href="#/explore/${id}">${i?'<span>→</span>':''}${esc(hub.topics.find(t=>t.id===id).label)}</a>`).join('')}</div><p class="summary">${esc(item.steps[2].explanation)}</p><div class="chips">${item.glossary_links.map(termLink).join('')}</div><div class="actions">${link('#/read/'+item.read,'전체 해설 읽기')}<button id="case-reset">다시 조사하기</button></div>`;
  else {const step=item.steps[state.step],answered=state.answers[state.step]!==undefined;body=`<p class="eyebrow">사건 조사 ${state.step+1} / ${item.steps.length}</p><h1>${esc(step.question)}</h1><div class="case-options">${step.options.map((text,i)=>`<button data-option="${i}" ${answered?'disabled':''} aria-pressed="${state.answers[state.step]===i}">${esc(text)}</button>`).join('')}</div><div role="status">${answered?`<div class="feedback"><strong>${state.answers[state.step]===step.answer?'핵심을 찾았습니다.':'이 구분을 다시 살펴보세요.'}</strong><p>${esc(step.explanation)}</p></div><button class="primary" id="case-next">${state.step===2?'구조에 연결하기':'다음 질문 →'}</button>`:''}</div>`;}
  main.innerHTML=`<section class="view">${learnTabs('case')}<article class="case-investigation scroll-panel">${body}</article></section>`;
  main.querySelector('#case-start')?.addEventListener('click',()=>{state.step=0;caseLab(id);main.focus();});
  main.querySelectorAll('[data-option]').forEach(btn=>btn.onclick=()=>{state.answers[state.step]=Number(btn.dataset.option);caseLab(id);main.querySelector('#case-next').focus();});
  main.querySelector('#case-next')?.addEventListener('click',()=>{state.step++;caseLab(id);main.focus();});
  main.querySelector('#case-reset')?.addEventListener('click',()=>{investigations.delete(id);caseLab(id);main.focus();});
}
function manuscriptHTML(text) {
  // Escape before adding semantic tags; extraction line breaks are preserved without guessing table cells.
  return text.split(/\n\n+/).map(block=>{
    const output=[],paragraph=[];
    const flush=()=>{if(paragraph.length){output.push('<p>'+esc(paragraph.join('\n'))+'</p>');paragraph.length=0;}};
    for(const line of block.split('\n')){
      if(line.startsWith('## ')){flush();output.push('<h2>'+esc(line.slice(3))+'</h2>');}
      else paragraph.push(line);
    }
    flush();return output.join('');
  }).join('');
}
function readBook(part,id) {
  const section=part?book.sections.find(s=>s.part===part&&s.id===id):book.sections.find(s=>s.part===savedRead?.part&&s.id===savedRead?.id)||book.sections[0];
  if(!section)return missing();
  const index=book.sections.indexOf(section);
  savedRead={part:section.part,id:section.id};write('reading',savedRead);
  main.innerHTML=`<section class="view reader-view"><div class="reader-top"><div><p class="eyebrow">READ · AI COMPASS</p><h1>${esc(section.partLabel)}</h1></div><button id="toc-toggle" aria-expanded="false" aria-controls="toc">목차</button><a href="../../docs/publication/AI_COMPASS_v1.0_FINAL.pdf#page=${section.page}" target="_blank" rel="noopener">원본 PDF ↗</a></div><div class="reader-grid"><nav id="toc" class="toc scroll-panel" aria-label="원고 목차">${book.parts.map(p=>`<details ${p.id===section.part?'open':''}><summary>${esc(p.label)}</summary>${book.sections.filter(s=>s.part===p.id).map(s=>`<a href="#/read/${s.part}/${s.id}" ${s.id===section.id?'aria-current="page"':''}>${s.page}. ${esc(s.title)}</a>`).join('')}</details>`).join('')}</nav><article class="reading scroll-panel" tabindex="0" aria-label="원고 본문"><p class="reading-position">${esc(section.partLabel)} · ${section.page} / 53</p><div class="manuscript">${manuscriptHTML(section.text)}</div><div class="reading-related"><h3>관련 개념</h3><div class="chips">${section.glossary_links.map(termLink).join('')}</div>${section.part==='part6'?link('#/learn/case/hidden-instruction','Case Lab에서 조사하기'):''}${hub.topics.some(t=>pageRoute(t.page).split('/')[2]===section.part)?link('#/explore/'+hub.topics.find(t=>pageRoute(t.page).split('/')[2]===section.part).id,'구조 탐색하기'):''}</div></article></div><div class="pager">${index?link(pageRoute(index),'← 이전 구간'):'<span></span>'}<span>${section.page} / 53</span>${index<52?link(pageRoute(index+2),'다음 구간 →'):'<span>읽기 끝</span>'}</div></section>`;
  const toggle=main.querySelector('#toc-toggle');toggle.onclick=()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));main.querySelector('#toc').classList.toggle('mobile-open',open);};
}
function studentView(slide) {
  if([3,6,8].includes(Number(slide.id)))return compass()+`<p class="slide-caption">${esc(slide.core_message)}</p>`;
  if(slide.id==='38'){
    const body=slide.student_view;
    return `<table class="case-comparison"><thead><tr><th scope="col">구분</th>${body.slice(0,3).map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${[3,7,11,15].map(i=>`<tr><th scope="row">${esc(body[i])}</th>${body.slice(i+1,i+4).map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="slide-caption">${esc(body.at(-1))}</p>`;
  }
  const body=[...slide.student_view];
  const caption=body.at(-1).length>45||/[.。]$/.test(body.at(-1))?body.pop():null;
  if(slide.id==='19')return `<ol class="tool-flow">${body.map(text=>`<li>${esc(text)}</li>`).join('')}</ol><p class="slide-caption">${esc(caption||'')}</p>`;
  return `<div class="student-content ${body.length>8?'dense':''}">${body.map(text=>`<div>${esc(text)}</div>`).join('')}</div>${caption?`<p class="slide-caption">${esc(caption)}</p>`:''}`;
}
function teach(deckId='core',id='1') {
  if(deckId!==deck.id)return missing();
  const slide=deck.slides.find(s=>s.id===id);if(!slide)return missing();
  const index=deck.slides.indexOf(slide),mis=glossary.terms.find(t=>t.id===slide.misconception?.termId);
  main.innerHTML=`<section class="view teach-view"><div class="teach-toolbar"><div><p class="eyebrow">TEACH · CORE DECK</p><label for="slide-select">슬라이드</label> <select id="slide-select">${deck.slides.map((s,i)=>`<option value="${s.id}" ${s.id===id?'selected':''}>${i+1}. ${esc(s.title)}</option>`).join('')}</select></div><div class="actions"><button id="audience" aria-pressed="${!teacher}">Audience Mode</button><button id="teacher" aria-pressed="${teacher}">Teacher Mode</button><button id="fullscreen">전체화면</button></div></div><div class="teach-grid ${teacher?'teacher-mode':''}"><article class="student-slide" aria-label="학생용 슬라이드"><p class="eyebrow">AI COMPASS / ${id.padStart(2,'0')}</p><h1>${esc(slide.title)}</h1>${studentView(slide)}</article>${teacher?`<aside class="teacher-notes scroll-panel" aria-label="교사용 설명" tabindex="0"><p class="eyebrow">TEACHER NOTES · ${esc(slide.estimated_time)}</p><h2>Quick Note</h2><p>${esc(slide.quick_note)}</p><h2>Full Teaching Script</h2><p class="full-script">${esc(slide.full_script)}</p><h2>학생 질문</h2><p>${esc(slide.teacher_question)}</p>${mis?`<h2>흔한 오개념</h2><p>${esc(mis.misconception)}</p><h3>바로잡기</h3><p>${esc(mis.correction)}</p>`:''}<h2>강조할 문장</h2><p>${esc(slide.emphasis)}</p><div class="chips">${slide.glossary_links.map(termLink).join('')}</div><div class="actions">${slide.ebook_links.map(r=>link('#/read/'+r,'관련 원고')).join('')}${slide.activity_or_case_links.map(r=>link('#/learn/case/'+r,'사례 활동')).join('')}</div></aside>`:''}</div><div class="pager">${index?link('#/teach/core/'+deck.slides[index-1].id,'← 이전 슬라이드'):'<span></span>'}<span>${index+1} / ${deck.slides.length}</span>${index<deck.slides.length-1?link('#/teach/core/'+deck.slides[index+1].id,'다음 슬라이드 →'):link('#/intro','처음으로')}</div></section>`;
  main.querySelector('#teacher').onclick=()=>{teacher=true;teach(deckId,id);main.querySelector('#teacher').focus();};
  main.querySelector('#audience').onclick=()=>{teacher=false;teach(deckId,id);main.querySelector('#audience').focus();};
  main.querySelector('#slide-select').onchange=event=>{location.hash='#/teach/core/'+event.target.value;};
  main.querySelector('#fullscreen').onclick=async()=>{try {if(document.fullscreenElement)await document.exitFullscreen();else await main.requestFullscreen();}catch {document.getElementById('status').textContent='이 브라우저에서는 전체화면을 지원하지 않습니다.';}};
}
function missing(){main.innerHTML='<section class="view"><h1>찾을 수 없는 페이지입니다</h1><p>메뉴에서 다시 선택해 주세요.</p><a class="button" href="#/intro">처음으로</a></section>';}
function render() {
  if(!hub)return;
  const [section='intro',a,b,extra]=routeParts();
  selectNav(section);
  if(extra)missing();
  else if(section==='intro')intro();else if(section==='explore')explore(a||'system');else if(section==='learn')learn(a,b);else if(section==='read')readBook(a,b);else if(section==='teach')teach(a,b);else missing();
  document.title=(main.querySelector('h1')?.textContent||'AI Compass')+' · Hub';
  main.dataset.route=location.hash || '#/intro';
  main.focus({preventScroll:true});
}
window.addEventListener('hashchange',render);
window.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||/INPUT|SELECT|TEXTAREA|BUTTON/.test(event.target.tagName))return;
  const [section,a,b]=routeParts();
  if(section==='teach'&&['ArrowLeft','ArrowRight'].includes(event.key)){
    const index=deck.slides.findIndex(s=>s.id===(b||'1')),next=index+(event.key==='ArrowRight'?1:-1);
    if(deck.slides[next]){event.preventDefault();location.hash='#/teach/core/'+deck.slides[next].id;}
  }
  if(event.key==='Escape'){const toc=main.querySelector('#toc');toc?.classList.remove('mobile-open');main.querySelector('#toc-toggle')?.setAttribute('aria-expanded','false');}
});
async function init() {
  try {
    const urls=['./data/hub.json','./data/ebook.json','./data/teacher-deck.json','./data/cases.json','../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json'];
    const loaded=await Promise.all(urls.map(async url=>{const response=await fetch(url);if(!response.ok)throw Error('자료를 불러오지 못했습니다.');return response.json();}));
    [hub,book,deck,lab,glossary]=loaded;
    if(glossary.format!=='ai-compass-glossary'||glossary.version!=='1.0'||glossary.terms.length!==30||book.sections.length!==53||deck.slides.length!==42)throw Error('지원하지 않는 자료 구성입니다.');
    render();
    if('serviceWorker' in navigator){try {
      const registrations=await Promise.all([navigator.serviceWorker.register('./service-worker.js'),navigator.serviceWorker.register('../glossary/service-worker.js')]);
      await Promise.all(registrations.map(reg=>new Promise((resolve,reject)=>{
        if(reg.active && !reg.installing && !reg.waiting)return resolve();
        const worker=reg.installing||reg.waiting||reg.active;
        if(!worker)return reject(Error('서비스 워커 없음'));
        const inspect=()=>{if(worker.state==='activated')resolve();else if(worker.state==='redundant')reject(Error('오프라인 설치 실패'));};
        worker.addEventListener('statechange',inspect);inspect();
      })));
      document.getElementById('status').textContent='오프라인 사용 준비 완료';
    }catch{document.getElementById('status').textContent='오프라인 준비 실패 · 연결 후 새로고침해 주세요.';}}
  } catch(error){hub=null;main.innerHTML=`<section class="view"><h1>Hub를 불러오지 못했습니다</h1><p>${esc(error.message)}</p><p>저장소 루트에서 정적 서버를 실행했는지 확인해 주세요.</p><button id="retry">다시 시도</button></section>`;main.querySelector('#retry').onclick=init;}
}
init();
