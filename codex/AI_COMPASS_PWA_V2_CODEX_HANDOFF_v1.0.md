# AI Compass PWA v2 — Codex Handoff v1.0

Status: **IMPLEMENTATION READY**  
Repository: `boundaryx01-uniquelife/ai-compass`  
Primary spec: `docs/canvas/AI_COMPASS_ANALYSIS_CANVAS_v1.0.md`  
Content baseline: **AI Compass Core Manuscript v1.0 — FREEZE**

## 1. Mission

Implement **AI Compass PWA v2**, a mobile-first offline-capable web application that turns the frozen AI Compass Analysis Canvas into an interactive analysis tool.

The app must help a user analyze an unfamiliar AI system through the same six questions used in the manuscript:

1. 무엇을 위해 쓰는가?
2. 무엇을 알고 있는가?
3. 무엇을 보고 있는가?
4. 무엇을 할 수 있는가?
5. 얼마나 혼자 가는가?
6. 누가 멈추고 되돌릴 수 있는가?

This is not a model-ranking app and not a numeric risk scoring app.

## 2. Scope for this implementation

Implement a self-contained PWA under:

`pwa/v2/`

Required initial files:

```text
pwa/v2/
├─ index.html
├─ styles.css
├─ app.js
├─ data-schema.js
├─ autonomy.js
├─ storage.js
├─ manifest.webmanifest
├─ service-worker.js
├─ icon.svg
└─ README.md
```

Use **vanilla HTML/CSS/JavaScript** unless the existing repository clearly establishes another approved stack.

Do not introduce a server, database, login, external API, CDN, analytics SDK, or runtime dependency for this version.

## 3. Core UX

The same Analysis record must be viewable at three resolutions.

### Mode A — 60 Second Scan

Goal: rapid first-pass judgment.

User can enter/select:

- Purpose & Stakes
- Model concern
- Context / untrusted source
- Action scope
- Autonomy summary
- Control summary
- Decision

The six frozen questions should remain visible as the navigation spine.

### Mode B — 5 Minute Check

Expand the exact same record with:

- Stakes flags
- Context channel checkboxes
- Action capability checkboxes
- Autonomy Level
- Trigger
- Control items
- Reversibility
- Decision rationale / conditions / missing information

### Mode C — Deep Review

Expand the same record with:

- Trust boundary notes
- Unnecessary permissions
- Persistence details
- Observability details
- Recovery details

Do not create a separate assessment record when switching modes.

## 4. Navigation

Recommended information architecture:

```text
Home
├─ New Analysis
│  ├─ 60 Second Scan
│  ├─ 5 Minute Check
│  └─ Deep Review
├─ Saved Analyses
│  ├─ Open
│  ├─ Duplicate
│  └─ Delete
└─ Reference
   ├─ Six Questions
   ├─ Autonomy Levels
   ├─ Trigger
   ├─ Reversibility
   └─ Decision meanings
```

Mobile usability is the first priority.

## 5. Data model

Implement the schema from:

`docs/canvas/AI_COMPASS_ANALYSIS_CANVAS_v1.0.md`

Minimum stored record:

```js
{
  id,
  title,
  createdAt,
  updatedAt,
  purposeAndStakes,
  model,
  context,
  action,
  autonomy,
  control,
  reversibility,
  deepReview,
  decision
}
```

Use a schema version field:

```js
schemaVersion: "1.0"
```

## 6. localStorage

Use a namespaced structure.

Suggested keys:

```text
aiCompass:v2:analyses
aiCompass:v2:preferences
aiCompass:v2:activeAnalysisId
```

Recommended analyses structure:

```js
{
  schemaVersion: "1.0",
  records: []
}
```

Requirements:

- persist after refresh
- safe JSON parse with fallback
- do not destroy all records if one record is malformed
- explicit delete confirmation
- update `updatedAt` on change

## 7. Autonomy classifier

Implement classification logic in `autonomy.js`.

Do not infer autonomy from Trigger.

Required logic order:

### Step 1 — Persistence

If task completion still leaves goal/permission/state active and the system can re-evaluate on environmental change:

→ `L4`

Otherwise continue.

### Step 2 — Iterative structure

Does one delegated goal lead to multiple self-selected actions with observe → decide → act → observe/rejudge repetition?

If YES → Step 3.

If NO → Step 4.

### Step 3 — Approval gate

For a system with the iterative structure, does it necessarily stop for human approval before irreversible actions?

YES → `L2`

NO → `L3`

### Step 4 — Task scope

Within one human-defined task scope, does it use tools or perform external action and then end?

YES → `L1`

NO → `L0`

Hard constraint:

```text
NO APPROVAL != L3
```

L3 requires the iterative structure from Step 2.

Frozen reminder shown in UI/help:

> L3는 끝나면 사라지고, L4는 끝나도 남는다.

## 8. Trigger

Trigger values are independent metadata:

```js
"Manual"
"Scheduled"
"Event-triggered"
"Condition-triggered"
```

UI should display combined shorthand such as:

`L2 / Event-triggered`

But the classifier must never raise autonomy because a trigger is Scheduled/Event/Condition.

Reference example that must classify correctly:

- fixed message automatically sent every day at 09:00
- no AI judgment

Expected:

`L0 / Scheduled`

## 9. Reversibility

Values:

```js
"GREEN"
"YELLOW"
"RED"
"UNKNOWN"
```

Definitions:

- GREEN: no external state change or almost nothing to reverse
- YELLOW: external state changes but the user can reverse it alone
- RED: reversing requires other people's cooperation or impact cannot be fully recovered
- UNKNOWN: insufficient information

The app may offer guidance, but must not automatically classify solely from an action label.

Show this question prominently:

> 이걸 되돌리려면 다른 사람에게 부탁해야 하는가?

## 10. Control Plane

Control properties:

- Least Privilege
- Approval Gate
- Sandbox
- Logging
- Monitoring
- Observability
- Stop
- Recovery
- Governance

Each item must support at least:

```js
{
  exists: boolean,
  effective: true | false | null
}
```

Do not visually present Control Plane as Capability Layer 5.

## 11. Final decision validation

Allowed values:

```js
"YES"
"CONDITIONAL"
"NO"
"UNKNOWN"
```

Validation rules:

- `CONDITIONAL` → conditions required
- `NO` → reason required
- `UNKNOWN` → missingInformation required

The application must not calculate or display an aggregate numeric risk score.

## 12. Repeated judgment checkpoint

Use the following exact sentence at meaningful section endings and before final decision:

> 여기까지 확인한 것을, 이 AI의 용도와 실패했을 때의 영향에 비추어 허용할 수 있는가?

Do not shorten or paraphrase this sentence in the core workflow.

## 13. State and interaction behavior

Required states:

- empty analysis
- in-progress analysis
- saved analysis
- validation error
- completed decision

Expected behaviors:

- autosave or explicit save is acceptable, but data loss on navigation is not
- show completion/progress by sections, not by a numeric safety score
- allow switching 60s → 5m → Deep without losing answers
- allow editing a completed record
- surface unanswered critical items as unknown, not automatically safe

## 14. Export / Import

Implement local JSON export/import if feasible without broadening scope.

Export format:

```js
{
  format: "ai-compass-analysis",
  version: "1.0",
  exportedAt: "ISO-8601",
  records: []
}
```

Import requirements:

- validate format/version
- reject unsupported payloads gracefully
- merge without silently overwriting existing IDs

If time is constrained, core Canvas flow has priority over export/import.

## 15. PWA requirements

- installable manifest
- service worker
- offline launch after first successful load
- mobile responsive
- app icon
- no required network connection for core functionality
- version cache names to allow future upgrade

## 16. Accessibility / interface requirements

- semantic HTML
- visible focus states
- labels for all form controls
- keyboard operable controls
- do not encode GREEN/YELLOW/RED meaning using color alone
- readable Korean typography on mobile

## 17. Reference test cases

Implement or manually verify these six cases.

### A
Question-answering AI only

Expected: `L0 / Manual`

### B
AI uses search tool to write a report within one task

Expected: `L1 / Manual`

### C
AI researches multiple sources and asks for approval before final send

Expected: `L2 / Manual`

### D
AI independently researches/modifies multiple files then reports completion

Expected: `L3 / Manual`

### E
AI continuously observes new mail and decides/processes according to a standing objective

Expected: `L4 / Event-triggered`

### F
Simple automation sends a fixed message at 09:00 every day

Expected: `L0 / Scheduled`

These are acceptance tests, not merely examples.

## 18. Additional acceptance scenario

Meeting transcript → summary → email to designated attendees.

Valid classifications depend on implementation:

- fixed transcript → summary → designated attendees in one task scope: may be `L1 / Event-triggered`
- several stages with approval before send: may be `L2 / Event-triggered`
- AI seeks additional sources, chooses recipients, modifies content, observes results, and repeats: evaluate for `L3`

Hard rule:

> 승인이 없다는 사실만으로 L3가 되는 것은 아닙니다.

## 19. Acceptance criteria

Implementation is accepted only if all are true:

1. app runs without server/API/login/database
2. installable PWA behavior is present
3. refresh preserves analyses
4. 60s/5m/Deep operate on one record
5. six frozen questions are preserved
6. Autonomy and Trigger are separate
7. F test case returns L0 / Scheduled
8. absence of approval alone cannot produce L3
9. L4 is driven by persistence
10. Control is not rendered as Capability Layer 5
11. CONDITIONAL requires conditions
12. UNKNOWN requires missing information
13. no aggregate numeric risk score exists
14. reversibility supports GREEN/YELLOW/RED/UNKNOWN
15. basic mobile and keyboard use works

## 20. Implementation discipline

Do not redesign the conceptual framework during coding.

If a technical implementation decision conflicts with the frozen concept specification, stop and document the conflict rather than changing the framework silently.

Prioritize:

1. conceptual correctness
2. data integrity
3. clear mobile UX
4. offline/PWA behavior
5. visual polish

## 21. Deliverables from Codex

Codex should return:

1. implemented files under `pwa/v2/`
2. `pwa/v2/README.md` with local execution/testing instructions
3. concise implementation summary
4. acceptance-test result checklist
5. list of assumptions or unresolved items

Do not modify the frozen manuscript or Canvas specification unless explicitly instructed.

## 22. Suggested commit

```text
feat: implement AI Compass Analysis Canvas PWA v2
```

## 23. Codex Start Instruction

Read in this order before coding:

1. `README.md`
2. `docs/canvas/AI_COMPASS_ANALYSIS_CANVAS_v1.0.md`
3. `codex/AI_COMPASS_PWA_V2_CODEX_HANDOFF_v1.0.md`

Then inspect existing `pwa/` content if present.

Implement only the approved v2 scope above.
