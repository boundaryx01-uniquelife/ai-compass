# AI Compass Educational Appendix Plan v1.0

Status: **DESIGN BASELINE**

## Goal

The manuscript explains. The educational appendices make learners use, compare, recall, and apply the ideas.

The appendices should support teacher training, university instruction, high-school learning, and simplified middle/upper-elementary activities without rewriting the core concepts into separate competing versions.

## Highest-priority appendix: EDU-00 Glossary

The glossary is the first educational appendix and the main reference layer for the entire project.

It should not be a flat dictionary. It should help a reader answer three practical questions:

1. 이 말은 정확히 무엇을 뜻하는가?
2. 무엇과 자주 헷갈리는가?
3. AI Compass의 어느 질문과 연결되는가?

Each glossary entry should support:
- Korean term
- English term / acronym
- one-line understanding
- precise definition at manuscript level
- why it matters
- common misconception
- easily confused term(s)
- related Compass layer/question
- related term links
- optional example
- source section/page reference

The glossary should have multiple lookup routes:
- 가나다순 / A–Z
- six Compass questions / layers
- confusing pairs
- essential/core vs deeper/advanced

Appendix A의 '헷갈리는 용어 15쌍'은 glossary의 별도 비교 인덱스로 흡수한다. 기존 15쌍은 삭제하지 않고, 용어집 안에서 상호 링크되는 핵심 비교표로 유지한다.

## Appendix Set

### EDU-00 Glossary
- highest priority
- manuscript terminology as single source of truth
- cross-linked with all other appendices and PWA Learning Lab
- publication appendix can carry a compact version; education package can carry the expanded version

### EDU-01 Learner Workbook
- 12–20 pages
- guided note-taking around the six Compass questions
- short concept checks after each layer
- three anchor cases
- final unfamiliar-system challenge

### EDU-02 Instructor Guide
- learning goals by section
- common misconceptions
- suggested explanations
- discussion prompts
- expected learner responses
- places where terminology must remain precise

### EDU-03 Case Cards
Reusable printable cards.

Initial set:
1. hidden white-text grading instruction
2. hallucinated student activity record
3. school shared-drive agent
4. meeting summary → email
5. scheduled fixed-message automation
6. research assistant with search tool
7. AI recommendation with repeated human approval
8. AI with read-only vs write permission

Each card contains:
- situation
- what is known
- what is unknown
- learner questions
- instructor answer/discussion guide

### EDU-04 Autonomy Lab Cards
Learners classify:
- L0–L4
- Trigger separately
- explanation required

Mandatory counterexamples:
- Scheduled does not imply high autonomy
- No approval does not imply L3
- Persistent objective can raise classification to L4

### EDU-05 Reversibility Traffic-Light Activity
Sort concrete actions into GREEN / YELLOW / RED.

Important: context changes the answer.
Examples should pair similar action labels with different contexts.

### EDU-06 Trust Boundary & Prompt Injection Activity
- identify trusted and untrusted sources
- inspect a student assignment containing hidden instructions
- distinguish Jailbreak from Prompt Injection
- propose system-side controls

### EDU-07 Tool Permission Activity
Learner configures permissions for a fictional AI assistant.

Prompt:
"Which permission is truly necessary for this task?"

Use read/write/delete/send/post/permission-change examples.

### EDU-08 Misconception Cards
Front: misconception
Back: correction + layer

Initial items derive from Appendix D.

### EDU-09 Quiz / Question Bank
Three levels:
- recognition
- application
- transfer to unfamiliar systems

Avoid trivia about company/product names.

### EDU-10 Final Analysis Canvas
The existing 60s / 5m / Deep Canvas remains valuable here.

Role:
- capstone worksheet
- teacher/professional adoption check
- assessment of transfer

It should not be treated as the beginner's first activity.

## Packaging

Suggested folders:

```text
docs/education/
├─ glossary/
├─ workbook/
├─ instructor-guide/
├─ case-cards/
├─ activities/
├─ quiz-bank/
└─ answer-guides/
```

## Priority order

Phase A:
1. Glossary architecture + term inventory
2. Expanded glossary draft
3. Confusing-pairs comparison index
4. Case Cards
5. Autonomy Lab
6. Reversibility Activity

Phase B:
7. Instructor Guide
8. Learner Workbook
9. Trust Boundary activity
10. Tool Permission activity
11. Misconception cards

Phase C:
12. Quiz bank
13. polished printable package

## Design principle

Every activity and every glossary definition must map back to a source concept in the frozen manuscript.

The glossary explains and connects; activities create an experience rather than merely repeat paragraphs.

Examples:
- Context → find the hidden instruction
- Tools → choose the minimum permission
- Autonomy → classify scenarios
- Control → place the approval gate
- Reversibility → decide who is needed to undo the action
