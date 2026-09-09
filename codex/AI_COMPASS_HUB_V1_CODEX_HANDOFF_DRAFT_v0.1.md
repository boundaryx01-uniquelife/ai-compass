# AI Compass Hub v1 — Codex Handoff Draft

Status: **SHELL IMPLEMENTATION READY / PUBLIC ASSETS PENDING**  
Target branch: `feat/ai-compass-hub-v1`  
Target repository: `boundaryx01-uniquelife/ai-compass`

## Read first

1. `README.md`
2. `docs/hub/AI_COMPASS_HUB_HOME_HANDOFF_20260909.md`
3. `.github/workflows/deploy-glossary-pages.yml`
4. `pwa/glossary/README.md`
5. `docs/education/glossary/AI_COMPASS_GLOSSARY_PWA_UX_SPEC_v1.0.md`

## Goal

Build an AI Compass Hub landing page that becomes the public root of the GitHub Pages site after review and merge.

The Hub should present four destinations by user purpose:

- READ — eBOOK
- LOOK UP — Glossary
- TEACH — Lecture Slides
- EXPERIENCE — Learning Lab

Existing Glossary behavior and URL must remain intact.

## Required protection

Do not modify:

- frozen manuscript content
- `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`
- `pwa/v2/`
- Glossary educational definitions

Do not publish or invent eBOOK/slide file paths until an approved asset is explicitly present in the repository or supplied by the user.

## Implementation scope

Create the Hub under:

```text
hub/
```

Recommended files:

```text
hub/index.html
hub/styles.css
hub/app.js   # optional
```

The page should be usable without JavaScript unless JS is genuinely needed.

## Content hierarchy

### Hero

- AI COMPASS
- 현대 AI를 이해하기 위한 Systems & Risk Literacy
- `AI의 이름보다 구조를 보는 법을 배웁니다.`
- primary actions: eBOOK / Glossary

### Resource cards

1. eBOOK
   - purpose: read the manuscript
   - if approved file absent, show `준비 중`
2. Glossary
   - link: `./pwa/glossary/#/find` when deployed at Pages root
3. Lecture Slides
   - if approved file absent, show `준비 중`
4. Learning Lab
   - show `Coming Soon` / `준비 중`

### Framework section

Show briefly:

```text
MODEL
CONTEXT
ACTION / TOOLS
AUTONOMY
```

Then visually separate:

```text
CONTROL PLANE
전체를 가로지르는 통제
```

Do not render Control as Capability Layer 5.

## Visual rules

- publication/education feel
- mobile first
- ample whitespace
- high Korean readability
- no dashboard metrics
- no excessive gradient/glassmorphism
- system font stack only
- accessible focus states
- semantic headings and links

## Deployment workflow change

Do not deploy from the feature branch.

Prepare the workflow change so that after merge to `main`, the Pages artifact root is built from the Hub rather than a generated redirect page.

Expected artifact shape:

```text
_site/index.html                  <- Hub
_site/<hub assets>
_site/pwa/glossary/**             <- existing Glossary
_site/docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json
```

Keep existing Glossary relative JSON loading valid.

## Local validation

From repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Validate:

- `/hub/`
- `/pwa/glossary/#/find`
- mobile width 320px / 375px
- keyboard focus
- no missing local assets
- no broken Glossary link

## Acceptance

1. Hub purpose understandable within 10 seconds.
2. READ / LOOK UP / TEACH / EXPERIENCE are distinct by use case.
3. Glossary existing public path is preserved.
4. Unapproved eBOOK/slides show clear placeholder state.
5. No external library/CDN/API/login/database.
6. No horizontal overflow at 320px.
7. Keyboard focus visible.
8. Control Plane is cross-cutting, not layer 5.
9. Pages workflow can package Hub + Glossary together after merge.
10. No protected source file is modified.

## Report after implementation

Return:

1. changed files
2. local preview URLs
3. acceptance PASS/FAIL
4. screenshots if generated
5. unresolved asset decisions
6. whether the branch is ready for human review

Do not merge to `main` automatically.
