// Development-only regression checks; uses the same environment as acceptance.cjs.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.GLOSSARY_URL || 'http://127.0.0.1:8765/pwa/glossary/';
const source = JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json'),'utf8'));
const results = [];
(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const context = await browser.newContext({serviceWorkers:'block'});
  async function fixture(value, test) {
    const page = await context.newPage();
    await page.route('**/AI_COMPASS_GLOSSARY_DATA_v1.0.json',r=>r.fulfill({json:value}));
    try {await page.goto(base+'#/compare');await page.locator('main h1').waitFor();await test(page);}
    finally {await page.close();}
  }
  async function check(name, test) {
    try {await test();results.push({name,status:'PASS'});}
    catch(error) {results.push({name,status:'FAIL',reason:error.message});}
    console.log(JSON.stringify(results.at(-1)));
  }
  async function rejected(mutate, message) {
    const value = structuredClone(source);mutate(value);
    await fixture(value,async page=>{
      assert.equal(await page.locator('main h1').innerText(),'용어를 불러오지 못했습니다');
      assert((await page.locator('main').innerText()).includes(message));
    });
  }
  await check('비교 배열 역순에서도 기존 15개 URL·내용·CORE 링크 유지',async()=>{
    let baseline;
    await fixture(source,async page=>{baseline=await page.locator('.compare-card').evaluateAll(nodes=>nodes.map(n=>({hash:n.hash,text:n.textContent})));});
    const reversed=structuredClone(source);reversed.comparePairs.reverse();
    await fixture(reversed,async page=>{
      const actual=await page.locator('.compare-card').evaluateAll(nodes=>nodes.map(n=>({hash:n.hash,text:n.textContent})));
      assert.deepEqual(actual,baseline.toReversed());
      for(const original of baseline){
        await page.goto(base+original.hash);
        await page.locator('.distinction').waitFor();
        const pair=source.comparePairs.find(p=>original.text.includes(p.oneLine));
        assert.equal(await page.locator('.distinction').innerText(),'한 줄 구분\n'+pair.oneLine);
        if(original.hash==='#/compare/trigger-autonomy')assert.equal(await page.locator('section.card a[href="#/term/autonomy"]').count(),1);
      }
    });
  });
  await check('알 수 없는 비교 라벨 명시적 오류',()=>rejected(v=>v.comparePairs[0].left='알 수 없는 라벨','알려진 조합'));
  await check('중복 비교·다른 쌍 누락 명시적 오류',()=>rejected(v=>v.comparePairs[1]=v.comparePairs[0],'중복'));
  await check('새 퀴즈 ID의 복습 매핑 누락 감지',()=>rejected(v=>v.quiz[0].id='q-new','퀴즈 복습 용어 매핑'));
  await check('삭제된 퀴즈의 남은 매핑 감지',()=>rejected(v=>v.quiz.pop(),'대응하는 문항'));
  await check('비교 메타데이터의 없는 CORE 참조 감지',()=>rejected(v=>{
    v.terms.find(t=>t.id==='autonomy').id='autonomy-renamed';
    v.terms.forEach(t=>{t.related=t.related.map(id=>id==='autonomy'?'autonomy-renamed':id);});
  },'비교 쌍의 관련 용어 ID'));
  await browser.close();
  fs.writeFileSync(path.join(__dirname,'mapping-regression-results.json'),JSON.stringify({testedAt:new Date().toISOString(),results},null,2)+'\n');
  process.exitCode=results.some(r=>r.status==='FAIL')?1:0;
})().catch(error=>{console.error(error);process.exit(1);});
