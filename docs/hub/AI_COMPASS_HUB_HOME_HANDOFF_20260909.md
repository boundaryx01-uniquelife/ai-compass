# AI Compass Hub — Home Handoff

Status: **DESIGN BASELINE / HOME CONTINUATION**  
Date: 2026-09-09  
Repository: `boundaryx01-uniquelife/ai-compass`  
Work branch: `feat/ai-compass-hub-v1`

## 1. Current production state

AI Compass Glossary PWA v1 is merged to `main` and deployed through GitHub Pages.

- Public root: `https://boundaryx01-uniquelife.github.io/ai-compass/`
- Glossary: `https://boundaryx01-uniquelife.github.io/ai-compass/pwa/glossary/#/find`
- Pages workflow: `.github/workflows/deploy-glossary-pages.yml`
- Glossary implementation: `pwa/glossary/`
- Glossary content source: `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`
- Glossary v1 PR: #1 merged
- Glossary v1.1 editorial follow-up: Issue #2 open

Current root Pages site redirects to Glossary. The next project is to replace that redirect with an **AI Compass Hub** landing page while preserving the Glossary URL.

## 2. Hub goal

Create one public entrance for the AI Compass publication and learning ecosystem.

Product sentence:

> **AI Compass를 읽고, 찾고, 배우고, 가르치는 하나의 공간.**

The root should no longer behave as a file list or a direct Glossary redirect. A first-time visitor should understand the project and choose what they want to do.

## 3. Proposed information architecture

```text
/ai-compass/
    AI Compass Hub

/ai-compass/ebook/
    eBOOK / manuscript reading area

/ai-compass/pwa/glossary/
    AI Compass Glossary PWA

/ai-compass/slides/
    lecture slide area

/ai-compass/learning/
    future Learning Lab
```

Existing Glossary paths must not break.

## 4. Home-page content structure

### Hero

**AI COMPASS**  
현대 AI를 이해하기 위한 Systems & Risk Literacy

Suggested supporting sentence:

> AI의 이름보다 구조를 보는 법을 배웁니다.

Primary actions:

- `eBOOK 읽기`
- `용어집 열기`

### Explore cards

#### READ — eBOOK
AI Compass 본문을 읽는 영역.

Initial v1 can provide:
- web/PDF view
- PDF download

Future version may convert the manuscript into a chapter-based HTML eBOOK.

#### LOOK UP — Glossary
Existing deployed Glossary PWA.

- search CORE terms
- compare confusing concepts
- short learning quiz

#### TEACH — Lecture Slides
Lecture deck area.

Possible actions:
- web/PDF slide viewing
- PDF download
- PPTX download

Do not expose unfinished slide assets until explicitly approved.

#### EXPERIENCE — Learning Lab
Future interactive learning area.

For Hub v1 it may be shown as `Coming Soon` rather than linking to unfinished material.

## 5. Framework section

The home page should briefly show the frozen AI Compass structure without turning into a textbook page.

Capability Stack:

- MODEL
- CONTEXT
- ACTION / TOOLS
- AUTONOMY

Control Plane:

- cross-cutting control structure
- **not Capability Layer 5**

Recommended short framing:

> 무엇을 할 수 있는가와 누가 멈추고 되돌릴 수 있는가를 함께 봅니다.

## 6. Visual direction

- publication / education site rather than dashboard
- generous whitespace
- strong Korean readability
- simple cards and section hierarchy
- no excessive gradients, glassmorphism, metric dashboard styling
- mobile first
- use system web fonts for Hub/PWA unless a separate web-font licensing decision is made
- user-provided KoPub World fonts remain for generated publication/PDF/PPTX artifacts, not repository font distribution

## 7. Assets and approval state

### Approved / deployed
- Glossary PWA v1
- Glossary CORE30 data

### Manuscript
- frozen source manuscript exists as `AI_COMPASS_v1.0_FINAL.pdf` outside the current repository deployment package unless explicitly added later
- do not edit manuscript content while building the Hub

### Slides
- lecture deck exists as a working artifact from earlier project work, but slide review is still gradual
- do not publish a slide download until the user selects the approved file/version

### Learning Lab
- design direction exists
- not implemented for Hub v1

## 8. Hub v1 acceptance

1. `https://boundaryx01-uniquelife.github.io/ai-compass/` opens Hub instead of automatically redirecting to Glossary.
2. A new visitor understands AI Compass and the available resources within about 10 seconds.
3. Glossary remains reachable at the existing URL with no functional regression.
4. eBOOK, Glossary, Slides, Learning Lab are visually distinguishable by purpose, not merely file type.
5. Unavailable resources are clearly marked `준비 중` rather than linked to missing files.
6. Mobile layout works without horizontal overflow.
7. Keyboard focus and semantic links/buttons are usable.
8. No external runtime, analytics, login, database, or AI API is introduced.
9. Existing frozen manuscript, glossary JSON, and `pwa/v2/` are not modified as part of the Hub UI task.
10. GitHub Pages deployment remains automatic from `main` after the Hub work is later merged.

## 9. Suggested implementation files

Preferred new location:

```text
hub/
  index.html
  styles.css
  app.js       # optional; keep minimal if static HTML is enough
  assets/      # only project-owned/approved visual assets
```

The Pages workflow can copy `hub/` contents to `_site/` root while still copying:

```text
pwa/glossary/
docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json
```

Do not move Glossary just to make the Hub cleaner.

## 10. Work sequence at home

1. Pull this branch.
2. Review this handoff.
3. Confirm which exact eBOOK PDF and slide files may be publicly deployed.
4. Implement Hub shell with placeholders for unapproved assets.
5. Run locally from repository root.
6. Check desktop + mobile.
7. Commit and push to `feat/ai-compass-hub-v1`.
8. Review before PR to `main`.

## 11. Commands to continue at home

```powershell
git status --short --branch
git fetch origin
git switch feat/ai-compass-hub-v1
git pull --ff-only origin feat/ai-compass-hub-v1
```

Local preview:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Current Glossary local URL:

`http://127.0.0.1:8765/pwa/glossary/#/find`

Hub preview path will depend on implementation. If built under `hub/`, use:

`http://127.0.0.1:8765/hub/`

## 12. Current decision gate

The next decision is not whether to build the Hub. That direction is approved.

The remaining pre-publication asset decisions are:

- which manuscript/eBOOK file is safe and approved to publish
- which lecture slide version is approved to publish
- whether Hub v1 exposes downloads immediately or shows placeholders until those assets are frozen

Hub shell implementation can proceed before these asset decisions, provided unfinished items are marked `준비 중`.
