# AI Compass PWA — Learning Lab Redesign Handoff DRAFT v0.1

Status: **DESIGN DRAFT — DO NOT IMPLEMENT YET**

## Why the previous direction is superseded

The previous PWA v2 centered the Analysis Canvas as the primary interface. That made sense as a professional analysis tool, but it does not create an obvious learner journey.

This redesign changes the learner-facing product goal.

Old mission:
> Digitize the Analysis Canvas.

New mission:
> Help a learner understand modern AI systems through interactive experiments, scenarios, comparison, prediction, and feedback.

The previous Canvas implementation should be preserved as an advanced/professional concept. Do not delete its logic.

## Product name

Working name: **AI Compass Learning Lab**

Home-screen promise:

> AI 시스템을 직접 조립하고 사건을 풀면서 구조와 위험을 배우는 학습 실험실

Learner actions:

> 조립하기 · 비교하기 · 사건 풀기 · 판정하기

Outcome:

> 처음 보는 AI도 여섯 질문으로 구조를 읽을 수 있게 됩니다.

## Target users

Primary:
- teachers and instructors learning the framework
- high-school learners
- general adult learners

Secondary learning path:
- middle / upper-elementary with simplified wording and guided activities

## Core learning loop

Each module should use some version of:

1. Predict
2. Change / interact
3. Observe consequence
4. Explain
5. Transfer to a new case

Do not make reading long explanatory pages the dominant interaction.

## Proposed information architecture

```text
Home
├─ Start Learning
│  ├─ 0. What is an AI System?
│  ├─ 1. Build an AI System
│  ├─ 2. Context Lab
│  ├─ 3. Tool & Permission Lab
│  ├─ 4. Autonomy Lab
│  ├─ 5. Reversibility Lab
│  ├─ 6. Case Lab
│  └─ 7. Compass Challenge
├─ Quick Practice
│  ├─ Autonomy Cards
│  ├─ Traffic Light
│  └─ Misconception Check
├─ Progress
└─ Reference
   ├─ Six Questions
   ├─ Core Terms
   └─ Analysis Canvas (Advanced)
```

## Module 0 — What is an AI System?

Interactive visual assembly:

```text
MODEL
  + CONTEXT
  + ACTION / TOOLS
  + AUTONOMY
  surrounded by CONTROL
```

Learner toggles elements on/off and sees a plain-language description of what changed.

Required insight:
- model is not product
- agent is not a special model
- same model can produce very different systems

## Module 1 — Build an AI System

Use one fictional base model.

Learner selects:
- context sources
- tool permissions
- autonomy behavior
- control mechanisms

System card updates live.

Example comparison:

A. model + chat only
B. same model + school-drive read access
C. same model + drive write/delete + iterative goal

Ask:
> "The model did not change. What did?"

## Module 2 — Context Lab

Activities:
- identify source/provenance
- mark trust boundaries
- hidden white-text student assignment
- RAG source quality scenario
- stale memory scenario

Prompt Injection must be shown as a system problem, not just a scary text string.

## Module 3 — Tool & Permission Lab

User receives a task and chooses permissions.

Example task:
> "Read student submissions and summarize common misconceptions."

Available permissions:
- read class folder
- write class folder
- delete files
- send email
- access entire school drive

Feedback should explain Least Privilege.

A second phase injects an untrusted document to show how Context + Permission can combine into Confused Deputy risk.

## Module 4 — Autonomy Lab

Scenario classification game.

User must classify two independent values:
- Level L0–L4
- Trigger

Immediate feedback explains why.

Mandatory scenarios:
A. answer-only AI → L0 / Manual
B. search report → L1 / Manual
C. multi-step research + approval before send → L2 / Manual
D. research/edit/report completion → L3 / Manual
E. persistent mail-processing objective → L4 / Event-triggered
F. fixed message every 09:00 → L0 / Scheduled

Hard rule:
> absence of approval alone must never make a scenario L3.

## Module 5 — Reversibility Lab

Drag/sort or card-choice activity.

Use context pairs:
- delete local temp file vs delete shared folder file
- edit private draft vs edit shared official record
- draft email vs send email

Question always available:
> 이걸 되돌리려면 다른 사람에게 부탁해야 하는가?

Explain GREEN / YELLOW / RED with text labels, not color only.

## Module 6 — Case Lab

Use three anchor cases as investigations, not reading pages.

For each case:
1. reveal situation
2. learner chooses primary starting layer
3. learner identifies amplifiers
4. learner chooses one or more controls
5. show before/after system pathway

Cases:
- hidden instruction in assignment
- hallucinated student record
- shared-drive agent

## Module 7 — Compass Challenge

Only after core learning.

Show an unfamiliar system.

Learner answers the six questions and receives structured feedback.

This is where the Analysis Canvas can appear in simplified form.

The full 60s / 5m / Deep Canvas is an optional advanced tool, not the primary learning route.

## Progress design

Progress should represent learning completion, not a safety score.

Possible state:
- modules completed
- practice accuracy
- concepts needing review
- final challenge completed

No global numeric AI-risk score.

## Content architecture

Separate educational content data from UI logic.

Suggested:

```text
pwa/learning-lab/
├─ index.html
├─ styles.css
├─ app.js
├─ modules/
├─ data/
│  ├─ concepts.js
│  ├─ scenarios.js
│  ├─ autonomy-cases.js
│  ├─ reversibility-cases.js
│  └─ case-lab.js
├─ storage.js
├─ manifest.webmanifest
├─ service-worker.js
└─ README.md
```

Final implementation folder/name is not frozen yet.

## UX acceptance questions

Before coding is approved, a paper/wireframe prototype must answer:

1. Can a first-time user explain what the site is for within 10 seconds?
2. Is there an obvious first action?
3. Does each module state what the learner will learn?
4. Does the learner make decisions, not just read text?
5. Does feedback explain why an answer is right or wrong?
6. Is the Analysis Canvas delayed until the learner has enough conceptual background?
7. Can the learner finish a meaningful first activity in under 5 minutes?

## Next gate

Do **not** begin full implementation from this draft.

Next required artifact:
- screen-by-screen wireframe / interaction storyboard for Home + Module 1 + Module 4 + Module 6

After that is reviewed and frozen, produce the implementation-ready Codex handoff.
