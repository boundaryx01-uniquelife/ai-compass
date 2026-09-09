import {read, write, validFavorites, validLearning} from './storage.js';

const DATA_URL = '../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json';
const main = document.getElementById('main');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const normalize = value => value.normalize('NFKC').toLowerCase().replace(/[\s/\-‐‑–—]+/g, '');
let data, terms, pairs, session;
let search = '', favoritesOnly = false;
let favorites = read('favorites', [], validFavorites);
let learning = read('learning', null, validLearning);
// UI navigation metadata only. All displayed educational content comes from the frozen JSON.
const quizTerms = {q1:['rag','hallucination'],q2:['automation','trigger'],q3:['tool-use','harness-runtime'],q4:['mcp','agent'],q5:['context','memory'],q6:['observability'],q7:['sandbox'],q8:['reversibility'],q9:['autonomy','agent'],q10:['control-plane']};
const pairKey = pair => JSON.stringify([pair.left, pair.right]);
// Stable routes and CORE links are keyed by exact frozen label combinations, never array position.
const pairMetadata = new Map([
  [['AI 모델','AI 서비스'], 'ai-model-ai-service', ['ai-model','ai-service']],
  [['컨텍스트','메모리'], 'context-memory', ['context','memory']],
  [['메모리','학습'], 'memory-training', ['memory','training']],
  [['RAG','Fine-tuning'], 'rag-fine-tuning', ['rag',null]],
  [['도구 사용','API'], 'tool-use-api', ['tool-use',null]],
  [['API','MCP'], 'api-mcp', [null,'mcp']],
  [['Workflow','Agent'], 'workflow-agent', [null,'agent']],
  [['자동화','자율성'], 'automation-autonomy', ['automation','autonomy']],
  [['트리거','자율성 단계'], 'trigger-autonomy', ['trigger','autonomy']],
  [['Prompt Injection','Jailbreak'], 'prompt-injection-jailbreak', ['prompt-injection',null]],
  [['환각','편향'], 'hallucination-bias', ['hallucination',null]],
  [['Guardrail','Alignment'], 'guardrail-alignment', [null,null]],
  [['Safety','Security'], 'safety-security', [null,null]],
  [['Sandbox','Permission'], 'sandbox-permission', ['sandbox','permission']],
  [['Logging','Observability'], 'logging-observability', [null,'observability']],
].map(([labels,id,termIds]) => [JSON.stringify(labels), {id,termIds}]));
const badges = term => `<div class="chips"><span class="badge">${escape(term.tier)}</span>${term.layers.map(layer => `<span class="badge ${layer === 'CONTROL' ? 'control' : ''}">${escape(layer)}</span>`).join('')}</div>`;
const termLink = id => terms.has(id) ? `<a href="#/term/${id}">${escape(terms.get(id).ko)}</a>` : '';
const card = term => `<a class="card term-card" href="#/term/${term.id}"><h3>${escape(term.ko)}</h3><p class="en">${escape(term.en)}</p>${badges(term)}<p>${escape(term.short)}</p></a>`;
function validate(value) {
  if (value?.format !== 'ai-compass-glossary' || value.version !== '1.0') throw new Error('지원하지 않는 용어 데이터 형식 또는 버전입니다.');
  if (!Array.isArray(value.terms) || value.terms.length !== 30 || !Array.isArray(value.comparePairs) || value.comparePairs.length !== 15 || !Array.isArray(value.quiz) || value.quiz.length < 5) throw new Error('용어 데이터 구성을 확인해 주세요.');
  const ids = new Set();
  for (const term of value.terms) {
    if (!/^[a-z0-9-]+$/.test(term.id) || ids.has(term.id) || term.tier !== 'CORE' || !['ko','en','short','definition','misconception','correction','example'].every(key => typeof term[key] === 'string') || !['aliases','layers','related','manuscript'].every(key => Array.isArray(term[key]) && term[key].every(item => typeof item === 'string'))) throw new Error('용어 항목이 올바르지 않습니다.');
    ids.add(term.id);
  }
  if (value.terms.some(term => term.related.some(id => !ids.has(id)))) throw new Error('관련 용어 ID가 일치하지 않습니다.');
  if (value.comparePairs.some(pair => !['left','right','oneLine'].every(key => typeof pair[key] === 'string'))) throw new Error('비교 데이터가 올바르지 않습니다.');
  const seenPairs = new Set();
  const seenRoutes = new Set();
  for (const pair of value.comparePairs) {
    const key = pairKey(pair);
    const metadata = pairMetadata.get(key);
    if (!metadata) throw new Error('비교 쌍 라벨이 알려진 조합과 일치하지 않습니다.');
    if (seenPairs.has(key) || seenRoutes.has(metadata.id)) throw new Error('비교 쌍 또는 경로가 중복되었습니다.');
    if (metadata.termIds.some(id => id !== null && !ids.has(id))) throw new Error('비교 쌍의 관련 용어 ID가 일치하지 않습니다.');
    seenPairs.add(key);
    seenRoutes.add(metadata.id);
  }
  if (seenPairs.size !== pairMetadata.size) throw new Error('필수 비교 쌍이 누락되었습니다.');
  const quizIds = new Set();
  for (const q of value.quiz) {
    if (typeof q.id !== 'string' || quizIds.has(q.id) || typeof q.prompt !== 'string' || typeof q.explanation !== 'string' || !(q.type === 'trueFalse' && typeof q.answer === 'boolean' || q.type === 'choice' && Array.isArray(q.choices) && q.choices.every(x => typeof x === 'string') && q.choices.includes(q.answer))) throw new Error('학습 데이터가 올바르지 않습니다.');
    quizIds.add(q.id);
    if (!Object.hasOwn(quizTerms,q.id) || !quizTerms[q.id].length || quizTerms[q.id].some(id => !ids.has(id))) throw new Error('퀴즈 복습 용어 매핑이 없거나 올바르지 않습니다.');
  }
  if (Object.keys(quizTerms).some(id => !quizIds.has(id))) throw new Error('퀴즈 복습 매핑에 대응하는 문항이 없습니다.');
  return value;
}
function renderFind() {
  main.innerHTML = `<section class="hero"><p class="eyebrow">FIND · COMPARE · CONNECT</p><h1>AI Compass Glossary</h1><p class="intro">AI 시대의 개념을 찾고, 비교하고, 연결해서 이해하는 사전</p><p>AI 용어가 헷갈리나요?<br>검색해서 찾고, 비슷한 개념을 비교하고, 관련 개념까지 연결해 보세요.</p></section><section aria-label="용어 찾기"><label class="search-label" for="search">AI 용어 검색</label><input class="search" id="search" type="search" placeholder="예: RAG, 메모리, 자율성" autocomplete="off" value="${escape(search)}"><div class="actions"><button id="show-core">핵심 용어 보기</button><a class="button" href="#/compare">헷갈리는 용어 비교</a><a class="button" href="#/learn">3분 학습</a></div><div class="scope"><span class="badge">CORE 30</span><span>AI Compass를 이해하는 데 먼저 필요한 핵심 개념</span></div><div class="filter-row"><span class="count" id="result-count" role="status"></span><label><input type="checkbox" id="favorites-only" ${favoritesOnly ? 'checked' : ''}>즐겨찾기만</label></div><div id="results" class="grid"></div></section>`;
  document.getElementById('search').addEventListener('input', event => { search = event.target.value; renderResults(); });
  document.getElementById('favorites-only').addEventListener('change', event => { favoritesOnly = event.target.checked; renderResults(); });
  document.getElementById('show-core').onclick = () => { search = ''; favoritesOnly = false; renderFind(); document.getElementById('search').focus(); };
  renderResults();
}
function renderResults() {
  const query = normalize(search);
  const matches = data.terms.filter(term => (!favoritesOnly || favorites.includes(term.id)) && [term.ko,term.en,...term.aliases,term.short].some(text => normalize(text).includes(query)));
  document.getElementById('result-count').textContent = `${matches.length}개 용어`;
  document.getElementById('results').innerHTML = matches.length ? matches.map(card).join('') : `<div class="empty">${favoritesOnly ? '조건에 맞는 즐겨찾기가 없습니다. 용어 카드에서 즐겨찾기를 추가하거나 필터를 해제해 보세요.' : '찾는 용어가 CORE 30에 없습니다.<br>영문명·약어로 다시 검색하거나 분류에서 탐색해 보세요.'}</div>`;
}
function renderTerm(id) {
  const term = terms.get(id);
  if (!term) return renderMissing();
  main.innerHTML = `<article class="detail"><a class="back" href="#/find">← 용어 찾기</a><div class="detail-header"><div><h1>${escape(term.ko)}</h1><p class="muted">${escape(term.en)}</p>${badges(term)}</div><button id="bookmark" aria-pressed="${favorites.includes(id)}">${favorites.includes(id) ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가'}</button></div><section><h2 class="section-heading">한 줄 이해</h2><p class="lead">${escape(term.short)}</p></section><section><h2>정확히 말하면</h2><p class="definition">${escape(term.definition)}</p></section><section class="related"><h2>관련 용어</h2><div class="chips">${term.related.map(termLink).join('')}</div></section><div class="disclosure">${[['흔한 오해','misconception'],['바로잡기','correction'],['짧은 사례','example'],['원고 위치','manuscript']].map(([label,key]) => `<details><summary>${label}</summary><p>${escape(Array.isArray(term[key]) ? term[key].join(' · ') : term[key])}</p></details>`).join('')}</div></article>`;
  document.getElementById('bookmark').onclick = event => {
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites,id];
    write('favorites',favorites);
    event.currentTarget.setAttribute('aria-pressed',String(favorites.includes(id)));
    event.currentTarget.textContent = favorites.includes(id) ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가';
  };
}
function renderCompare(id) {
  if (id) {
    const pair = pairs.get(id);
    if (!pair) return renderMissing();
    main.innerHTML = `<a class="back" href="#/compare">← 비교 목록</a><p class="eyebrow">COMPARE CONCEPTS</p><h1>${escape(pair.left)} <span class="vs">VS</span> ${escape(pair.right)}</h1><div class="distinction"><h2>한 줄 구분</h2>${escape(pair.oneLine)}</div><div class="grid">${[pair.left,pair.right].map((label,index) => { const term = terms.get(pairMetadata.get(pairKey(pair)).termIds[index]); return `<section class="card"><h2>${escape(label)}</h2>${term ? `<p>${escape(term.short)}</p><div class="chips">${termLink(term.id)}</div>` : '<span class="badge extended">EXTENDED · 상세 카드 준비 중</span>'}</section>`; }).join('')}</div>`;
  } else main.innerHTML = `<p class="eyebrow">COMPARE · 15 PAIRS</p><h1>비슷해 보이지만 다른 AI 용어</h1><p>이름이 비슷해서가 아니라, 섞으면 판단이 틀어지는 쌍을 모았습니다.</p><div class="grid">${[...pairs].map(([key,pair]) => `<a class="card compare-card" href="#/compare/${key}"><div class="pair"><span>${escape(pair.left)}</span><span class="vs">VS</span><span>${escape(pair.right)}</span></div><p>${escape(pair.oneLine)}</p></a>`).join('')}</div>`;
}
function startSession() {
  const pool = [...data.quiz];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i],pool[j]] = [pool[j],pool[i]]; }
  session = {questions:pool.slice(0,5),index:0,answers:[],saved:false};
  renderLearn();
}
function reviewLinks(ids) { return `<ul class="review-list">${[...new Set(ids)].filter(id => terms.has(id)).map(id => `<li>${termLink(id)}</li>`).join('')}</ul>`; }
function renderLearn() {
  if (!session) {
    main.innerHTML = `<section class="quiz"><p class="eyebrow">LEARN · ONE SMALL STEP</p><h1>3분이면 충분합니다.</h1><p class="intro">5문제를 풀고 오늘 헷갈린 개념만 다시 보세요.</p><div class="actions"><button class="primary" id="start-quiz">5문제 시작</button></div>${learning ? `<section class="card"><h2>최근 학습 기록</h2><p>${learning.completed}회 완료 · 마지막 학습 ${escape(new Date(learning.lastCompleted).toLocaleString('ko-KR'))}</p>${learning.wrongTermIds.length ? `<h3>헷갈린 용어 다시 보기</h3>${reviewLinks(learning.wrongTermIds)}` : '<p>최근 학습에서 모든 개념을 확인했습니다.</p>'}</section>` : '<p class="muted">학습 기록은 이 브라우저에만 저장됩니다.</p>'}</section>`;
    document.getElementById('start-quiz').onclick = startSession;
    return;
  }
  if (session.index === 5) {
    const wrong = session.questions.filter((q,i) => session.answers[i] !== q.answer);
    const wrongIds = [...new Set(wrong.flatMap(q => quizTerms[q.id] || []))];
    if (!session.saved) {
      learning = {completed:(learning?.completed || 0)+1,lastCompleted:new Date().toISOString(),wrongQuizIds:wrong.map(q=>q.id),wrongTermIds:wrongIds};
      write('learning',learning); session.saved = true;
    }
    main.innerHTML = `<section class="quiz"><p class="eyebrow">오늘의 개념 확인</p><h1>5개 중 ${5-wrong.length}개 확인</h1><p>헷갈린 개념을 다시 살펴보며 구분을 선명하게 해 보세요.</p>${wrong.length ? `<section class="card"><h2>헷갈린 용어 다시 보기</h2>${reviewLinks(wrongIds)}${wrongIds.length ? '' : '<p>다음 학습에서 문제를 다시 확인해 보세요.</p>'}</section>` : '<p class="card">이번 학습의 모든 개념을 확인했습니다.</p>'}<div class="actions"><button class="primary" id="restart-quiz">다시 5문제 시작</button><button id="learning-home">학습 기록 보기</button></div></section>`;
    document.getElementById('restart-quiz').onclick = startSession;
    document.getElementById('learning-home').onclick = () => {session = null;renderLearn();};
    return;
  }
  const q = session.questions[session.index];
  const answered = session.answers.length > session.index;
  const options = q.type === 'trueFalse' ? [true,false] : q.choices;
  const correct = answered && session.answers[session.index] === q.answer;
  main.innerHTML = `<section class="quiz"><p class="eyebrow">3분 학습 · ${session.index+1} / 5</p><div class="progress" aria-hidden="true"><span style="width:${(session.index+1)*20}%"></span></div><div class="quiz-box"><h1 style="font-size:25px">${escape(q.prompt)}</h1><div class="answers" role="group" aria-label="답 선택">${options.map((option,i) => `<button data-answer="${i}" aria-pressed="${answered && session.answers[session.index] === option}" ${answered ? 'disabled' : ''}>${escape(typeof option === 'boolean' ? option ? 'O · 맞아요' : 'X · 아니에요' : option)}</button>`).join('')}</div><div id="feedback" role="status">${answered ? `<div class="feedback"><h2>${correct ? '정답입니다 · 개념을 확인했어요' : '오답입니다 · 다시 구분해 보세요'}</h2><p>${escape(q.explanation)}</p>${correct ? '' : `<div class="chips">${(quizTerms[q.id] || []).map(termLink).join('')}</div>`}</div>` : ''}</div>${answered ? `<button class="primary" id="next-question">${session.index === 4 ? '학습 마치기' : '다음 문제'}</button>` : ''}</div></section>`;
  main.querySelectorAll('[data-answer]').forEach(button => {button.onclick = () => { if (session.answers.length > session.index) return; session.answers.push(options[Number(button.dataset.answer)]); renderLearn(); document.getElementById('next-question').focus(); };});
  const next = document.getElementById('next-question');
  if (next) next.onclick = () => {session.index++;renderLearn();main.focus();};
}
function renderBrowse() {
  const group = (label, ids, cls='browse-group') => `<section class="${cls}"><h2>${label}</h2><div class="chips">${ids.map(termLink).join('')}</div></section>`;
  main.innerHTML = `<p class="eyebrow">BROWSE · THE COMPASS</p><h1>개념을 구조 속에 놓아 보세요</h1><p>용어가 연결되는 위치를 따라 AI 시스템을 이해합니다.</p>${group('SYSTEM · 시스템 전체',['ai-model','ai-service','ai-system','agent'],'system-group')}<section aria-label="Capability Stack"><h2 class="section-heading">Capability Stack · 능력과 행동 범위</h2>${group('MODEL — 무엇을 알고 있는가?',['training','inference','llm','knowledge-cutoff','hallucination'])}${group('CONTEXT — 지금 무엇을 보고 있는가?',['context','prompt','rag','memory','instruction-hierarchy','trust-boundary','prompt-injection','indirect-prompt-injection'])}${group('ACTION / TOOLS — 무엇을 할 수 있는가?',['tool-use','harness-runtime','mcp','permission','least-privilege','sandbox'])}${group('AUTONOMY — 얼마나 혼자 가는가?',['automation','autonomy','trigger'])}</section><section class="control-plane" aria-label="전체를 가로지르는 통제 구조"><span class="badge control">CONTROL PLANE</span><h2>전체를 가로지르는 통제 구조</h2><p>누가 멈추고 되돌릴 수 있는가?</p><div class="chips">${['control-plane','hitl','observability','reversibility'].map(termLink).join('')}</div></section>`;
}
function renderMissing() {main.innerHTML = '<h1>찾을 수 없는 페이지입니다</h1><p>용어 목록에서 다시 찾아보세요.</p><a class="button" href="#/find">용어 찾기</a>';}
function route() {
  if (!data) return;
  const [screen = 'find', id, extra] = (location.hash.slice(2) || 'find').split('/');
  const active = screen === 'term' ? 'find' : screen;
  document.querySelectorAll('.navigation a').forEach(link => {if (link.hash === `#/${active}`) link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  if (extra || !['find','term','compare','learn','browse'].includes(screen)) renderMissing();
  else if (screen === 'find') renderFind();
  else if (screen === 'term') renderTerm(id);
  else if (screen === 'compare') renderCompare(id);
  else if (screen === 'learn') renderLearn();
  else renderBrowse();
  document.title = `${main.querySelector('h1')?.textContent || '용어 찾기'} · AI Compass Glossary`;
  main.focus({preventScroll:true}); window.scrollTo(0,0);
}
async function load() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`데이터 요청 실패 (${response.status})`);
    data = validate(await response.json()); terms = new Map(data.terms.map(term => [term.id,term]));
    pairs = new Map(data.comparePairs.map(pair => [pairMetadata.get(pairKey(pair)).id,pair]));
    favorites = favorites.filter(id => terms.has(id));
    if (!location.hash) history.replaceState(null,'','#/find');
    route();
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./service-worker.js');
        await navigator.serviceWorker.ready;
        document.getElementById('offline-status').textContent = '오프라인 사용 준비 완료';
      } catch {document.getElementById('offline-status').textContent = '오프라인 준비에 실패했습니다. 연결 상태를 확인한 뒤 새로고침해 주세요.';}
    }
  } catch (error) {
    main.innerHTML = `<h1>용어를 불러오지 못했습니다</h1><p>${escape(error.message)}</p><p>저장소 루트에서 정적 서버를 실행했는지 확인해 주세요.</p><button id="retry">다시 시도</button>`;
    document.getElementById('retry').onclick = () => {main.innerHTML='<p role="status">핵심 용어를 불러오는 중입니다…</p>';load();};
  }
}
window.addEventListener('hashchange',route);
load();
