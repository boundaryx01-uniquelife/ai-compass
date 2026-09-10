# AI Compass Current Status — 2026-09-10

Status: **CURRENT BASELINE**

이 문서는 학교·집·사무실에서 이어 작업할 때 현재 위치를 빠르게 확인하기 위한 운영 기준점입니다.

## 1. Current checkpoint

AI Compass는 초기 설계 단계가 아닙니다.

현재 단계는 다음과 같습니다.

> **Core Manuscript FREEZE → Glossary CORE30 v1.0 → Hub v2 구현 → GitHub Pages 배포 → 40/40 Acceptance PASS → Field Validation / Release Preparation**

현재 `main`의 Hub v2가 학습용 디지털 산출물의 구현 기준입니다.

## 2. What is complete

### Core manuscript
- v1.0 conceptual content frozen
- Part 0–7 + Appendix A–G
- 53-page source represented in Hub READ
- frozen concepts must not be casually rewritten during PWA polish

### Glossary
- architecture specification
- writing style specification
- CORE 30 v1.0
- canonical JSON data
- independent Glossary PWA
- Hub LEARN integration
- 15 comparison pairs
- 5-question learning session

### Lecture / TEACH
- 42-slide primary deck
- Audience Mode
- Teacher Mode
- Quick Note
- Full Teaching Script
- keyboard navigation and responsive web presentation

### AI Compass Hub v2
Top-level sections:

> **INTRO · EXPLORE · LEARN · READ · TEACH**

Implemented:
- INTRO framework overview
- EXPLORE six concept routes
- LEARN glossary / comparison / quiz / case entry
- full Case A staged interaction
- READ full 53-page manuscript
- TEACH 42-slide web teaching experience
- glossary deep links where mapped
- offline core screens after first load
- mobile responsive behavior
- GitHub Pages deployment workflow

### Automated acceptance
`pwa/hub/ACCEPTANCE.md`

Result:

> **40 PASS / 0 FAIL**

Verified areas include desktop/mobile rendering, navigation, glossary integration, comparisons, quiz, Case A, READ, TEACH, keyboard focus, offline core reload, frozen-definition preservation, and preservation of existing `pwa/glossary/` and `pwa/v2/`.

## 3. Known gaps

These are the current meaningful gaps. They should be treated as a finite backlog, not as a reason to redesign the whole product.

| Priority | Gap | Current state | Recommended next action |
|---|---|---|---|
| P1 | Real-device validation | Android/iOS install and touch behavior unverified | Test on at least one Android phone/tablet and one iOS/iPadOS device if available |
| P1 | Real teaching rehearsal | TEACH scripts are generated from manuscript/slide sources but not fully field-rehearsed | Run a 30–60 minute rehearsal and mark timing, awkward spoken phrases, and missing transitions |
| P1 | Case B/C staged interaction | Full source exists in READ but interactive investigation is not migrated | Decide whether both are required for v1.0 Hub release, then implement only if approved |
| P2 | Accessibility audit | Visible keyboard focus checked, full WCAG/screen-reader audit not done | Run targeted semantic/contrast/screen-reader checks and fix confirmed issues |
| P2 | Tables and diagrams in READ | Some source extraction order/cell relationships are ambiguous | Compare against source PDF and create explicit accessible representations only where certain |
| P2 | Release packaging | Technical deployment exists, formal v1.0 release definition does not | Define release checklist, version marker, changelog entry, and artifact links |
| P2 | License / public metadata | Not decided | Decide license, attribution, release notice before formal public distribution |
| P3 | Appendix G | Intentionally blank/current-product map | Keep blank unless an annual update policy and evidence workflow are approved |
| P3 | Derived decks | 30-minute/high-school/workshop variants not made | Treat as later derivatives, not blockers |

## 4. v1.0 Hub release gate proposal

A practical Hub v1.0 release should require all of the following:

- automated acceptance remains green
- no conceptual drift from frozen manuscript definitions
- Android or equivalent touch-device smoke test completed
- mobile layout manually inspected
- one real teaching rehearsal completed
- all P1 defects either fixed or explicitly accepted
- Case B/C scope decision recorded
- release license/attribution decision recorded
- README, Direction, Current Status, and CHANGELOG agree on current state
- final public URLs and downloadable publication/slide assets verified

## 5. Codex role from this point

Codex should now be used for bounded implementation work rather than exploratory redesign.

Good Codex tasks:
- reproduce and fix a confirmed real-device bug
- implement approved Case B/C interactions from existing canonical source content
- add accessibility checks or improve semantics
- extend acceptance automation
- add release/version metadata
- automate release verification

Do not ask Codex to:
- redefine the six Compass questions
- turn Control into a fifth capability layer
- merge Trigger into Autonomy
- rewrite frozen manuscript definitions for convenience
- invent missing source relationships in ambiguous tables

## 6. Recommended execution order

### Stage R1 — Field check
Real device + real lecture rehearsal.

### Stage R2 — Confirmed fixes
Only issues actually observed in R1 and accessibility review.

### Stage R3 — Content completion decision
Decide whether Case B/C staged interactions are v1.0 requirements.

### Stage R4 — Release package
Versioning, license, changelog, public links, final regression acceptance.

### Stage R5 — v1.0 release
Tag/release only after the above gate is satisfied.

## 7. Do not regress

The following earlier status statements are obsolete:

- “PWA wireframe must be completed before Codex resumes.”
- “Glossary is the next item to start.”
- “Hub implementation has not begun.”

All three have already been overtaken by work in `main`.

## 8. Primary reference files

- `README.md`
- `docs/AI_COMPASS_PROJECT_DIRECTION_v2.0.md`
- `docs/AI_COMPASS_CURRENT_STATUS_20260910.md`
- `pwa/hub/README.md`
- `pwa/hub/ACCEPTANCE.md`
- `docs/education/glossary/AI_COMPASS_GLOSSARY_CORE30_v1.0.md`
- `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`

When documents disagree about implementation status, this file and the latest `main` implementation/acceptance evidence should be checked before resuming work.
