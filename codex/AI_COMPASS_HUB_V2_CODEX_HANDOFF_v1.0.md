# AI Compass Hub v2 — Codex Handoff v1.0

Status: **IMPLEMENTATION READY**  
Branch: `feat/ai-compass-hub-v2`  
Base: `main`

## 1. Mission

Implement **AI Compass Hub v2** as the new learner/teacher-facing front door of the project.

Do not rebuild the old Analysis Canvas as the homepage.

The target product is:

```text
INTRO
EXPLORE
LEARN
READ
TEACH
```

where the existing Glossary PWA becomes a reusable LEARN module rather than the whole product.

## 2. Read before coding

Read in this order:

1. `README.md`
2. `docs/AI_COMPASS_PROJECT_DIRECTION_v2.0.md`
3. `docs/hub/AI_COMPASS_HUB_V2_UX_SPEC_v1.0.md`
4. `docs/education/glossary/AI_COMPASS_GLOSSARY_PWA_UX_SPEC_v1.0.md`
5. `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`
6. `docs/slides/AI_COMPASS_LECTURE_DECK_SPEC_v1.0.md`
7. `pwa/glossary/README.md`
8. `pwa/glossary/app.js`
9. `pwa/glossary/styles.css`

If any instruction conflicts with the Hub v2 UX spec, stop and report the conflict before changing frozen content.

## 3. Implementation location

Create the Hub under:

`pwa/hub/`

Suggested structure:

```text
pwa/hub/
  index.html
  styles.css
  app.js
  router.js
  storage.js
  manifest.webmanifest
  service-worker.js
  icon.svg
  README.md
  data/
    hub.json
    ebook.json
    teacher-deck.json
    cases.json
```

Do not move or delete `pwa/glossary/` in the first implementation.

Treat it as a stable source of working behavior to reuse or adapt.

Do not modify `pwa/v2/`.

## 4. Technology constraints

Use vanilla HTML/CSS/JavaScript unless an existing repository convention clearly requires otherwise.

No:

- external framework
- CDN
- external webfont
- server
- database
- login
- analytics
- external AI API

The Hub must run from a repository-root static server such as:

```powershell
python -m http.server 8877 --bind 127.0.0.1
```

Target URL:

`http://127.0.0.1:8877/pwa/hub/`

## 5. Frozen conceptual rules

Do not rewrite these concepts:

- MODEL / CONTEXT / ACTION-TOOLS / AUTONOMY are Capability dimensions.
- CONTROL is cross-cutting, not Layer 5.
- Trigger and Autonomy are separate.
- L3 vs L4: `L3는 끝나면 사라지고, L4는 끝나도 남는다.`
- fixed 09:00 scheduled-message example is L0 / Scheduled when no AI judgment occurs.
- permission does not equal autonomy.
- no approval alone does not make L3; repetition structure must also exist.
- Reversibility uses GREEN / YELLOW / RED / UNKNOWN.
- Prompt Injection and Jailbreak are distinct.
- Tool execution path includes Harness/Runtime.
- MCP is not an Agent.
- Control Plane is cross-cutting.

Do not introduce aggregate numeric AI/risk scores.

## 6. Existing Glossary reuse

The canonical glossary source remains:

`docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`

Do not copy the 30 definitions into new UI source files.

Reuse the existing behavior where practical:

- search normalization
- CORE 30 cards
- related-term linking
- 15 compare pairs
- 5-question learning session
- favorites/localStorage
- validation logic
- accessibility patterns

It is acceptable to refactor shared logic, but the first implementation must not break `pwa/glossary/`.

## 7. Screen requirements

### 7.1 INTRO

Must be the Hub's first meaningful screen.

Desktop intro should fit a common viewport without vertical scrolling.

Content:

```text
AI COMPASS

AI를 이름으로 판단하지 않습니다.

무엇을 알고 있는가
무엇을 보고 있는가
무엇을 할 수 있는가
얼마나 혼자 가는가

그리고
누가 멈추고 되돌릴 수 있는가?

[ COMPASS 열기 ]
```

Visualize MODEL / CONTEXT / ACTION-TOOLS / AUTONOMY structurally, with CONTROL visibly cross-cutting or surrounding them.

Do not make CONTROL look like a fifth box in the same sequence.

### 7.2 EXPLORE

Create separate topic views for:

- SYSTEM
- MODEL
- CONTEXT
- ACTION / TOOLS
- AUTONOMY
- CONTROL

Each should feel like one screen / one idea.

Desktop must avoid long article-style scrolling.

Provide previous/next or topic tabs.

Each topic should link to relevant Glossary terms and, where mapping exists, READ and LEARN.

Do not invent new core definitions.

### 7.3 LEARN

Provide Hub navigation to:

- Glossary
- Compare
- 3분 학습
- Case Lab

The first three must work using existing canonical glossary data.

Case Lab may implement one anchor case fully for Hub v2 MVP, but design data/route structure for all three.

Preferred first case:

`숨은 흰색 글자와 AI 채점`

Flow:

```text
사건 제시
→ 어디에서 문제가 시작됐나?
→ 무엇이 영향을 키웠나?
→ 어떤 통제가 필요했나?
→ Compass 구조에 연결
```

### 7.4 READ

Implement an HTML eBook shell using real manuscript-derived content available in the repository/source material.

Do not use lorem ipsum.

Required:

- table of contents
- Part/Section route
- previous/next navigation
- current reading location
- glossary links where a reliable mapping exists

Do not silently paraphrase frozen manuscript text into a replacement manuscript.

If a complete full-text mapping is not possible from repository text sources, implement a usable initial mapped subset and clearly mark remaining sections as not yet migrated. Do not fabricate missing prose.

### 7.5 TEACH

Implement a first usable Teacher Deck, not a placeholder shell.

Each slide data item should support:

```text
title
student_view
core_message
quick_note
full_script
estimated_time
teacher_question
misconception
emphasis
glossary_links
ebook_links
activity_or_case_links
```

Two modes:

- Audience Mode
- Teacher Mode

Audience Mode must not show teaching notes/scripts.

Teacher Mode should show at minimum:

- Quick Note
- Full Teaching Script
- estimated time
- teacher question
- misconception when available

Use existing lecture-deck material/specification as source. Do not invent contradictory teaching content.

## 8. Teacher Deck source design

Create structured `teacher-deck.json` (or equivalent) as a reusable single source for web slides.

Design it so future PPTX generation can reuse the same data and place `full_script` into PowerPoint Speaker Notes.

Do not implement PPTX generation in this first Hub coding pass unless it is trivial and does not delay the web Hub.

## 9. Navigation behavior

Suggested hash routes:

```text
#/intro
#/explore/system
#/explore/model
#/explore/context
#/explore/action
#/explore/autonomy
#/explore/control
#/learn/glossary
#/learn/compare
#/learn/quiz
#/learn/case/:id
#/read/:part/:section
#/teach
#/teach/:deck/:slide
```

Global navigation must make EXPLORE / LEARN / READ / TEACH obvious.

Avoid a giant single-page vertical layout.

## 10. Responsive behavior

Desktop:

- common 16:9 presentation-like viewport should feel intentional
- one main focal area
- topic/slide navigation stays visible
- avoid unnecessary document-length scrolling

Mobile:

- one-column content where necessary
- compact navigation
- no horizontal overflow
- controls >= comfortable touch target
- internal scrolling allowed for long teaching scripts/eBook text

## 11. Visual style

Aim for:

- editorial learning product
- generous whitespace
- clear structural diagrams
- calm typography
- Compass motif
- subtle motion only

Avoid:

- generic admin dashboard
- metric cards
- oversized card wall
- excessive gradients
- glassmorphism
- random AI stock aesthetics

Web font stack:

`system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`

Do not commit KoPub font files.

## 12. Offline / PWA

Hub shell should be installable/offline-compatible.

Cache at minimum:

- Hub HTML/CSS/JS
- Hub structured data
- glossary canonical JSON
- icons/manifest

Be careful with cache invalidation and source paths outside `pwa/hub/`.

Do not delete caches belonging to other PWAs by broad prefix matching.

## 13. Accessibility

Required:

- semantic landmarks
- keyboard navigation
- visible focus
- `aria-current` for current navigation
- no color-only meaning
- `prefers-reduced-motion`
- buttons/links sized for touch
- Audience/Teacher mode state programmatically understandable

## 14. Acceptance checklist

Report PASS/FAIL for each.

1. Hub loads from `/pwa/hub/`.
2. Intro is the front door.
3. Intro fits desktop viewport without vertical scrolling at a common laptop size.
4. Intro communicates MODEL / CONTEXT / ACTION-TOOLS / AUTONOMY / CONTROL structure.
5. CONTROL is not rendered as Layer 5.
6. Global navigation reaches EXPLORE / LEARN / READ / TEACH.
7. EXPLORE has six separate topic routes/views.
8. EXPLORE is not implemented as one long vertical article.
9. Glossary CORE 30 search still works in Hub.
10. Korean/English/acronym glossary search works.
11. 15 compare pairs remain reachable.
12. EXTENDED comparison concepts do not get invented full definitions.
13. 5-question learning session works.
14. learning result does not become an aggregate ability/risk score.
15. at least one Case Lab scenario is fully usable.
16. READ has real source-derived content.
17. READ has TOC.
18. READ has previous/next navigation.
19. READ indicates current section.
20. READ glossary links work where mapped.
21. TEACH contains a usable first deck.
22. TEACH slides have student view.
23. TEACH slides have Quick Note.
24. TEACH slides have Full Teaching Script.
25. Audience Mode hides teaching script.
26. Teacher Mode shows teaching support.
27. Teacher Mode shows teacher question where available.
28. Teacher Mode shows misconception where available.
29. slide navigation works by button/keyboard.
30. desktop slide view avoids document-length vertical scrolling.
31. mobile has no horizontal overflow.
32. Hub uses no external runtime API/server/login/database.
33. canonical glossary definitions are not duplicated into Hub code.
34. `pwa/glossary/` remains functional.
35. `pwa/v2/` is not modified.
36. frozen conceptual rules above remain intact.
37. service worker does not indiscriminately remove other app caches.
38. basic offline reload works after initial load.
39. keyboard focus is visible.
40. no KoPub font binary is committed.

## 15. Manual smoke scenarios

### Scenario A — first visit

Open `/pwa/hub/`.

Expected:

- clear AI Compass identity
- one-screen intro
- user can enter Compass without reading a long page

### Scenario B — explore autonomy

Navigate to AUTONOMY.

Expected:

- Trigger and Autonomy shown as distinct concepts
- links to related glossary material

### Scenario C — glossary

Search `MCP`.

Expected:

- canonical MCP card appears
- no duplicated rewritten definition

### Scenario D — eBook

Open a mapped manuscript section.

Expected:

- actual source-derived content
- TOC and previous/next
- at least one useful Glossary jump where mapped

### Scenario E — teacher mode

Open a slide in Audience Mode, then Teacher Mode.

Expected:

- student view stable
- script hidden in Audience Mode
- Quick Note / Full Script shown in Teacher Mode

### Scenario F — mobile

Test around 375px width.

Expected:

- no horizontal overflow
- nav remains usable
- teacher script/eBook content may internally scroll without breaking shell

## 16. Stop conditions

Stop and report instead of guessing if:

- manuscript text required for eBook is unavailable in repository-readable form
- lecture source needed for Teacher Deck cannot be reliably recovered
- a frozen concept conflicts across source files
- implementing Hub would require modifying frozen glossary definitions
- static/offline architecture cannot safely load the canonical glossary JSON

## 17. Completion report

At completion report:

1. changed files
2. new routes
3. data files created
4. local run command
5. acceptance 40 PASS/FAIL table
6. smoke-test results
7. unresolved editorial/source issues
8. any content that remains intentionally unmigrated
9. exact local URL
10. commit SHA

Suggested commit message:

`feat: implement AI Compass Hub v2`
