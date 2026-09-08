# AI Compass Glossary PWA — Codex Handoff v1.0

Status: **IMPLEMENTATION READY**  
Repository: `boundaryx01-uniquelife/ai-compass`

## 1. Mission

Implement the first official AI Compass learning PWA:

# **AI Compass Glossary**

> **AI 용어를 외우는 사전이 아니라, 헷갈리는 개념을 구분하고 AI 시스템의 구조 속에 놓아 이해하는 학습 도구.**

This replaces the Analysis Canvas as the first-priority public-facing PWA.
Do not redesign or expand the Analysis Canvas PWA in this task.

## 2. Read before coding

Read in this order:

1. `README.md`
2. `docs/education/glossary/AI_COMPASS_GLOSSARY_WRITING_STYLE_v1.0.md`
3. `docs/education/glossary/AI_COMPASS_GLOSSARY_CORE30_v1.0.md`
4. `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`
5. `docs/education/glossary/AI_COMPASS_GLOSSARY_PWA_UX_SPEC_v1.0.md`

The JSON file is the machine-readable content source of truth.
The Markdown CORE30 file is the human-readable editorial reference.
If they appear to conflict, do not silently rewrite concepts. Report the conflict.

## 3. Implementation location

Create a self-contained application under:

```text
pwa/glossary/
├─ index.html
├─ styles.css
├─ app.js
├─ storage.js
├─ manifest.webmanifest
├─ service-worker.js
├─ icon.svg
└─ README.md
```

Do not modify `pwa/v2/` except to document that it is not the current first-priority learning PWA if a repository-level note is necessary.

## 4. Technical constraints

Use vanilla HTML/CSS/JavaScript.

Do not add:

- server
- database
- login
- external AI API
- external runtime dependency
- CDN
- analytics SDK
- external webfont

The app must work when the repository root is served by a simple local static server.

Expected local path example:

`http://127.0.0.1:8765/pwa/glossary/`

## 5. Content loading

Load the frozen JSON directly from:

```text
../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json
```

Do not maintain a second manually edited copy of the glossary data.

Requirements:

- graceful loading state
- graceful error state if JSON cannot be loaded
- do not replace missing content with invented text
- validate top-level `format === "ai-compass-glossary"`
- validate supported `version === "1.0"`

## 6. Core screens

Implement exactly these primary screens:

### A. Home / Find

Hero:

**AI Compass Glossary**  
AI 시대의 개념을 찾고, 비교하고, 연결해서 이해하는 사전

Text:

> AI 용어가 헷갈리나요?  
> 검색해서 찾고, 비슷한 개념을 비교하고, 관련 개념까지 연결해 보세요.

Primary search field.

Three visible entry actions:

- 핵심 용어 보기
- 헷갈리는 용어 비교
- 3분 학습

Display `CORE 30` scope.

### B. Term detail

Always show:

- ko
- en
- tier
- layer badges
- short
- definition
- related term chips

Expandable:

- misconception
- correction
- example
- manuscript location

Related CORE terms must be clickable.

### C. Compare

Render all `comparePairs`.

Each card must show:

- left
- VS
- right
- oneLine

If a compared label does not have a CORE term object, show comparison content without inventing a full definition and optionally mark:

`EXTENDED · 상세 카드 준비 중`

### D. Learn

A session contains 5 randomly selected quiz items.

Behavior:

1. show one question
2. user answers
3. immediately show correct/incorrect feedback
4. show explanation
5. continue

Finish screen:

- `5개 중 N개 확인`
- concepts to review when identifiable
- restart

Do not call this an AI ability score or risk score.

### E. Browse by Compass

Group terms by:

- SYSTEM
- MODEL
- CONTEXT
- ACTION / TOOLS
- AUTONOMY
- CONTROL

CONTROL must not look like Capability Layer 5.
Use a distinct label such as:

`전체를 가로지르는 통제 구조`

## 7. Navigation

Use 4 primary nav items:

- 찾기
- 비교
- 학습
- 분류

Mobile-first.
A bottom navigation is acceptable on narrow screens.

Recommended hash routes:

```text
#/find
#/term/<id>
#/compare
#/learn
#/browse
```

Use hash routing so static hosting refresh behavior remains simple.

## 8. Search

Search fields:

- `ko`
- `en`
- `aliases`
- `short`

Normalize:

- case
- repeated spaces
- hyphen differences where practical
- slash spacing where practical

Required examples:

- `RAG`
- `검색 증강 생성`
- `retrieval augmented generation`

must find the RAG term.

- `MCP`
- `Model Context Protocol`

must find MCP.

- `샌드박스`
- `Sandbox`

must find 격리.

## 9. Favorites

Each CORE term has bookmark toggle.

Store only locally.

Suggested key:

```text
aiCompass:glossary:favorites
```

Find screen must provide a favorites-only filter.

## 10. Learning state

Suggested key:

```text
aiCompass:glossary:learning
```

May store:

- completed session count
- last completed timestamp
- recent wrong quiz ids

Do not store personal information.

## 11. Visual requirements

The page must not look like a form-heavy Analysis Canvas.

Priority:

1. obvious search
2. readable glossary cards
3. strong compare experience
4. comfortable mobile reading
5. restrained educational visual identity

Avoid:

- dashboard metrics
- safety scores
- excessive gradients
- glassmorphism overload
- dense multi-column forms

Typography:

Do not commit or redistribute the supplied KoPub font files.
Use a system fallback stack such as:

```css
font-family: system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
```

## 12. Accessibility

Required:

- semantic landmarks
- label for search
- keyboard-operable navigation
- visible focus state
- 44px class touch target for primary controls on mobile
- quiz feedback not color-only
- badges not color-only
- `aria-current` where appropriate
- `prefers-reduced-motion`

## 13. PWA / Offline

Create:

- manifest
- installable icon
- service worker
- versioned cache

After first successful load, core features must work offline.

Precache app shell and glossary JSON.

Do not require a network connection for:

- search
- term detail
- compare
- quiz
- browse
- favorites

## 14. Content integrity rules

Do not change the following concepts during implementation:

- AI Model ≠ AI Service ≠ Agent
- Context ≠ Memory
- RAG does not eliminate hallucination
- model requests; external execution is handled by Harness / Runtime
- MCP ≠ Agent
- Automation ≠ Autonomy
- Trigger ≠ Autonomy level
- absence of approval does not imply L3
- L3 ends with the delegated task; L4 persists
- Control Plane is not Capability Layer 5
- Logging ≠ Observability
- Sandbox ≠ safe
- Reversibility depends on context, not only action name

Do not add aggregate numeric risk scoring.

## 15. Acceptance tests

Implementation is accepted only if all are true.

### Content

1. JSON loads and validates.
2. exactly 30 CORE term objects are visible/searchable.
3. all 15 compare pairs are accessible.
4. all supplied quiz items can be used.
5. no generated or invented definitions are added at runtime.

### Search

6. `RAG`, `검색 증강 생성`, and English full name find RAG.
7. `MCP` and full English name find MCP.
8. `샌드박스` finds Sandbox/격리.
9. empty search shows CORE terms.
10. no-result state is understandable.

### Navigation

11. related CORE chips navigate to correct term.
12. back navigation works.
13. hash routes remain usable on static hosting.

### Compare

14. Automation vs Autonomy appears.
15. Trigger vs Autonomy appears.
16. Prompt Injection vs Jailbreak appears.
17. Logging vs Observability appears.
18. EXTENDED-only labels are not given invented full definitions.

### Learning

19. 5-question session works.
20. immediate feedback and explanation work.
21. finish screen does not present an AI intelligence/risk score.

### Storage

22. favorites persist after refresh.
23. learning metadata persists after refresh.
24. corrupt localStorage has safe fallback.

### PWA / UI

25. app works offline after first load.
26. manifest and service worker are present.
27. mobile layout is usable.
28. keyboard navigation works.
29. Control is not visually rendered as Capability Layer 5.
30. no server/API/login/database/CDN is required.

## 16. Manual smoke scenarios

### Scenario 1

Search `자율성` → open Autonomy → navigate to Trigger → back to Autonomy.

### Scenario 2

Compare `자동화 / 자율성` and confirm the one-line distinction is visible immediately.

### Scenario 3

Search `MCP` and verify UI never says MCP itself is an Agent.

### Scenario 4

Run quiz until the scheduled fixed-message question appears. Expected answer:

`L0 / Scheduled`

### Scenario 5

Open Browse and verify Control is presented as cross-cutting, not Layer 5.

### Scenario 6

Enable offline mode after one successful load and confirm Find / Compare / Learn / Browse still work.

## 17. Deliverables

Return:

1. files under `pwa/glossary/`
2. `pwa/glossary/README.md`
3. implementation summary
4. acceptance checklist with PASS/FAIL
5. unresolved issues
6. exact local test command

Recommended README local test:

```powershell
python -m http.server 8765
```

Run from repository root, then open:

`http://127.0.0.1:8765/pwa/glossary/`

## 18. Suggested commit

```text
feat: implement AI Compass Glossary PWA v1
```

## 19. Stop conditions

Stop and report instead of changing the spec if:

- JSON cannot be loaded under the expected static-server layout
- content IDs are inconsistent
- a UX requirement requires inventing glossary content
- a technical constraint conflicts with offline/static operation

Do not modify the frozen manuscript or glossary definitions to make coding easier.
