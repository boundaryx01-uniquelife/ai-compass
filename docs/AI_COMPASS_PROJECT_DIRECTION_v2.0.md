# AI Compass Project Direction v2.0

Status: **ACTIVE DIRECTION**
Date: 2026-09-08

## Why this revision exists

The first PWA direction treated the Analysis Canvas itself as the main product. That produced a technically coherent analysis form, but not an obvious learning experience. A learner opening the app could reasonably ask: "What am I supposed to do here, and what will I learn?"

That is a product-goal mismatch, not a manuscript problem.

The manuscript remains the conceptual source of truth. The digital product must serve learning first, not merely digitize a worksheet.

## Four project outputs

AI Compass now has four distinct outputs with different jobs.

### 1. Publication / Distribution Manuscript

Purpose: explain the framework in a coherent, readable form.

Primary outputs:
- final reading PDF
- editable source manuscript
- future print/distribution edition
- optional accessible web/e-book edition

The manuscript is not the PWA UI specification.

### 2. Educational Appendices

Purpose: turn the manuscript into teachable and learnable material.

Primary outputs:
- learner workbook
- instructor guide
- case cards
- concept and misconception cards
- autonomy classification activities
- reversibility activities
- worksheets and answer/discussion guides
- quiz/question bank

### 3. PWA: AI Compass Learning Lab

Purpose: help a learner understand AI systems through interaction, comparison, prediction, and feedback.

The PWA is **not** primarily a compliance form or system-audit form.

The learner should leave the PWA able to:
1. distinguish Model / Context / Action / Autonomy / Control
2. explain why the same model can produce very different system risks
3. identify trust boundaries and tool permissions in a scenario
4. distinguish automation from autonomy
5. classify basic autonomy levels without confusing Trigger with Autonomy
6. reason about reversibility and appropriate controls
7. apply the six Compass questions to a new system

The Analysis Canvas may remain as an advanced final activity or teacher/professional tool, but it is no longer the front door of the PWA.

### 4. Lecture Slides

Purpose: allow the manuscript to be taught as a lecture, workshop, or teacher-training session.

Primary deck:
- 60–90 minute instructor deck

Future derivatives:
- 30-minute condensed deck
- high-school learning deck
- workshop/facilitation deck

## Product relationship

```text
                 AI COMPASS CORE
             manuscript / concepts
                      |
        +-------------+-------------+
        |             |             |
  Publication     Education       Slides
        |          Appendices        |
        |             |             |
        +-------------+-------------+
                      |
              PWA Learning Lab
           interactive application
```

The PWA and slides derive from the manuscript. They do not reproduce the manuscript page by page.

## PWA redesign principle

Old question:
> How do we put the Analysis Canvas into an app?

New question:
> What can a learner understand through interaction that is harder to learn from reading alone?

This becomes the criterion for every PWA feature.

## Proposed PWA learning modules

### Module 0 — Start Here: What is an AI system?
A short visual explainer distinguishing model, product/service, harness, tools, and agent.

### Module 1 — Build an AI System
Learner toggles Context, Tools, Autonomy, and Control around the same model and sees how the resulting system changes.

Core insight: **same model, different system**.

### Module 2 — Context Lab
Interactive scenarios for trustworthy vs untrusted inputs, hidden instructions, memory, RAG, and trust boundaries.

Core insight: data can influence behavior, and source/provenance matters.

### Module 3 — Tool & Permission Lab
Learner gives an AI read/write/send/delete permissions and predicts consequences.

Core insight: model ability and system permission are different.

### Module 4 — Autonomy Lab
Scenario cards ask the learner to classify L0–L4 and Trigger separately, with immediate explanation.

Must include the fixed 09:00 scheduled-message counterexample.

### Module 5 — Reversibility Lab
Learner sorts actions into GREEN / YELLOW / RED based on concrete contexts, not action names alone.

Core insight: "Can I undo this alone?"

### Module 6 — Case Lab
Three anchor cases become branching investigations:
- hidden instruction in student assignment
- hallucinated student record
- shared-drive agent failure

Learner predicts where the failure starts, what amplifies it, and what control changes the outcome.

### Module 7 — Compass Challenge
A new unfamiliar AI system is shown. Learner applies the six Compass questions.

This is where the Analysis Canvas belongs: **as a capstone**, not the homepage.

## PWA home-screen promise

The first screen must answer three questions immediately:

1. What is this?
   - "AI 시스템을 직접 조립하고 사건을 풀면서 구조와 위험을 배우는 학습 실험실"
2. What will I do?
   - "조립하기 · 비교하기 · 사건 풀기 · 판정하기"
3. What will I gain?
   - "처음 보는 AI도 여섯 질문으로 구조를 읽을 수 있게 됩니다."

No learner should have to infer the product's purpose from a form.

## Frozen vs editable

Frozen:
- core manuscript concepts and terminology
- six Compass questions
- Capability Stack / Control Plane distinction
- autonomy classification principles
- Trigger separation
- reversibility principles

Editable:
- learning sequence
- PWA navigation
- activities
- game mechanics
- visual style
- slide pedagogy
- appendices

## Immediate next work

1. create educational appendix plan
2. create lecture deck specification and first deck
3. redesign PWA as Learning Lab before further coding
4. archive the Analysis Canvas PWA direction as a professional-tool branch, not the main learner experience

The previous `AI_COMPASS_PWA_V2_CODEX_HANDOFF_v1.0.md` should be treated as **superseded for the learner-facing PWA**. Its analysis logic remains valid as a future professional/advanced tool.
