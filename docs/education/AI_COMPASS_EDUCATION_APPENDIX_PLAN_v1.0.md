# AI Compass Educational Appendix Plan v1.0

Status: **DESIGN BASELINE**

## Goal

The manuscript explains. The educational appendices make learners do something with the ideas.

The appendices should support teacher training, university instruction, high-school learning, and simplified middle/upper-elementary activities without rewriting the core concepts into separate competing versions.

## Appendix Set

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
├─ workbook/
├─ instructor-guide/
├─ case-cards/
├─ activities/
├─ quiz-bank/
└─ answer-guides/
```

## Priority order

Phase A:
1. Case Cards
2. Autonomy Lab
3. Reversibility Activity
4. Instructor Guide skeleton

Phase B:
5. Learner Workbook
6. Trust Boundary activity
7. Tool Permission activity
8. Misconception cards

Phase C:
9. Quiz bank
10. polished printable package

## Design principle

Every activity must map back to a source concept in the frozen manuscript, but it should create an experience rather than merely repeat paragraphs.

Examples:
- Context → find the hidden instruction
- Tools → choose the minimum permission
- Autonomy → classify scenarios
- Control → place the approval gate
- Reversibility → decide who is needed to undo the action
