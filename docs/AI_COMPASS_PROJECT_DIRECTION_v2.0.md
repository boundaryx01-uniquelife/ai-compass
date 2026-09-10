# AI Compass Project Direction v2.0

Status: **ACTIVE DIRECTION**
Updated: 2026-09-10

## Why this revision exists

The first PWA direction treated the Analysis Canvas itself as the main product. That produced a technically coherent analysis form, but not an obvious learning experience. A learner opening the app could reasonably ask: "What am I supposed to do here, and what will I learn?"

That was a product-goal mismatch, not a manuscript problem.

The manuscript remains the conceptual source of truth. The digital product must serve learning first, not merely digitize a worksheet.

This direction has now moved beyond proposal stage. **AI Compass Hub v2 has been implemented, deployed through GitHub Pages, and passed its automated acceptance suite.** The current question is no longer whether to redesign the learner PWA, but how to finish, validate, and package the implemented system for real educational use.

## Four project outputs

AI Compass has four distinct outputs with different jobs.

### 1. Publication / Distribution Manuscript

Purpose: explain the framework in a coherent, readable form.

Current state:
- Core Manuscript v1.0 content frozen
- 53-page source represented in Hub READ
- final PDF retained as distribution source

Remaining publication work may include licensing, front matter, accessibility, print/digital packaging, and release metadata. These production decisions must not silently reopen the frozen conceptual manuscript.

### 2. Educational Appendices

Purpose: turn the manuscript into teachable and learnable material.

The highest-priority appendix is the **official Glossary**.

Current state:
- Glossary architecture defined
- writing style defined
- CORE 30 v1.0 completed
- canonical JSON data generated
- Glossary PWA and Hub LEARN integration available
- 15 compare pairs and a 5-question learning session available

Additional educational materials include case cards, autonomy and reversibility activities, worksheets, instructor supports, and future learner/facilitator derivatives.

### 3. PWA: AI Compass Hub / Learning Lab

Purpose: help a learner understand AI systems through interaction, comparison, prediction, reading, teaching, and feedback.

The PWA is **not** primarily a compliance form or system-audit form.

The implemented Hub v2 now organizes the learning experience into five top-level areas:

> **INTRO · EXPLORE · LEARN · READ · TEACH**

Current Hub capabilities include:
- six EXPLORE concept routes
- CORE 30 glossary search
- 15 concept comparison pairs
- 5-question learning sessions
- Case Lab entry and complete Case A interaction
- 53-page manuscript READ experience
- 42-slide TEACH experience with Audience / Teacher Mode
- offline support for core screens
- responsive mobile behavior

The Analysis Canvas remains valid as an advanced final activity or teacher/professional tool, but it is not the front door of the learner PWA.

### 4. Lecture Slides

Purpose: allow the manuscript to be taught as a lecture, workshop, or teacher-training session.

Current state:
- primary 42-slide deck exists
- slide content is represented in Hub TEACH
- Quick Note and Full Teaching Script are available in the web teaching experience

Future derivatives may include:
- 30-minute condensed deck
- high-school learning deck
- workshop/facilitation deck

These are optional extensions, not prerequisites for stabilizing Hub v2.

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
             AI Compass Hub v2
          interactive learning layer
```

The PWA and slides derive from the manuscript. They do not reproduce the manuscript page by page, even though READ preserves the full source text for reference.

## Frozen framework

Frozen:
- core manuscript concepts and terminology
- six Compass questions
- Purpose & Stakes
- Capability Stack: Model → Context → Action / Tools → Autonomy
- Control Plane as a cross-cutting control structure, not a fifth capability layer
- CAPABILITY → RISK → CONTROL grammar
- autonomy classification principles
- Trigger separation
- reversibility principles

Editable:
- learning sequence
- Hub navigation and visual treatment
- activities and game mechanics
- teaching scripts and facilitation language
- appendices beyond frozen definitions
- release packaging and accessibility improvements

## Implemented learning architecture

The earlier proposed Learning Lab modules have been consolidated into Hub v2.

### INTRO
Communicates the overall AI Compass structure and acts as the front door.

### EXPLORE
Independent routes for System, Model, Context, Action, Autonomy, and Control.

### LEARN
Glossary, comparisons, quiz, and Case Lab.

### READ
Full 53-page manuscript reading experience with navigation and glossary links where mapped.

### TEACH
42-slide teaching experience with student-facing and teacher-support modes.

This implemented architecture supersedes the earlier requirement to finish a new learner-facing wireframe before coding.

## Current acceptance baseline

`pwa/hub/ACCEPTANCE.md` records the current automated baseline.

- **40 PASS / 0 FAIL**
- desktop and mobile responsive checks
- keyboard focus checks
- glossary, compare, quiz, READ, TEACH, and Case A checks
- core offline reload checks
- frozen definitions and legacy PWA preservation checks

This automated acceptance is not equivalent to complete field validation.

## Known gaps and deliberately unmigrated scope

The next stage should focus on explicit gaps rather than inventing a new product direction.

1. Case B/C do not yet have the full staged interaction used by Case A.
2. Android/iOS real-device installation and touch behavior remain unverified.
3. Full WCAG and screen-reader auditing remain unverified.
4. Teacher scripts need real lecture rehearsal for timing and spoken tone.
5. Some manuscript tables/diagrams have ambiguous extraction or reading order and should be checked against the source PDF rather than reconstructed by guesswork.
6. Appendix G current-product information remains intentionally unfilled and requires a separate update policy if activated.
7. Publication license and release packaging are not yet decided.

## Current stage

**IMPLEMENTED → ACCEPTED IN AUTOMATED QA → FIELD VALIDATION / RELEASE PREPARATION**

The immediate objective is to move from a technically coherent Hub to a dependable teaching and distribution package.

## Immediate next work

1. keep repository status documents synchronized with the implemented Hub
2. review and rank known content/interaction gaps
3. run real-device and real-teaching validation
4. fix only issues supported by those checks
5. establish a v1.0 release checklist for Hub + publication assets
6. decide license and public-release metadata before formal distribution

Codex is now appropriate for **targeted fixes, QA automation, accessibility improvements, staged Case B/C implementation, and release preparation**. It should not be asked to reinterpret or redesign frozen conceptual rules without an explicit new decision.

The previous `AI_COMPASS_PWA_V2_CODEX_HANDOFF_v1.0.md` remains superseded for the learner-facing PWA. Its analysis logic remains valid as a future professional/advanced tool.
