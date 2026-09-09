# AI Compass Hub v2 — UX Spec v1.0

Status: **UX FREEZE / IMPLEMENTATION READY**  
Date: 2026-09-09  
Source baseline: `AI_COMPASS_v1.0_FINAL.pdf`  
Existing module to preserve: `pwa/glossary/`

## 1. Product identity

AI Compass Hub는 Glossary 단독 PWA가 아니라 AI Compass 전체 콘텐츠를 한곳에서 탐색하고, 읽고, 배우고, 가르칠 수 있는 학습 허브다.

제품 문장:

> **AI를 이름이 아니라 구조로 이해하고, 읽고, 비교하고, 가르치는 인터랙티브 허브.**

핵심 콘텐츠 흐름:

```text
INTRO
  ↓
EXPLORE
  ↓
LEARN ── Glossary / Compare / 3분 학습 / Case Lab
  ↓
READ ─── AI Compass eBook
  ↓
TEACH ── Teacher Slides / Notes / Scripts
```

Glossary는 폐기하지 않는다. 기존 `pwa/glossary/`의 검색·비교·학습 엔진을 Hub 안의 LEARN 모듈로 재사용한다.

## 2. UX principles

### 2.1 One screen, one idea

가능하면 긴 세로형 스크롤 페이지를 만들지 않는다.

기본 경험은 한 화면 안에서 하나의 개념 또는 하나의 선택을 전달한다.

- 데스크톱: viewport 중심, 좌우 또는 탭 전환
- 모바일: 한 화면 카드 + 탭/스와이프에 가까운 전환
- 내용이 많을 때만 내부 패널 스크롤 허용
- 전체 페이지가 길게 늘어지는 백과사전형 UI는 피한다.

### 2.2 Intro sets the identity

첫 화면은 사이트 설명문보다 AI Compass의 시각적 정체성을 보여준다.

첫 방문자가 5초 안에 느껴야 하는 것:

1. 이것은 일반 AI 뉴스/모델 순위 사이트가 아니다.
2. AI 시스템을 구조로 이해하는 학습 도구다.
3. 읽기, 학습, 수업 준비까지 연결된다.

### 2.3 Page/tab navigation over endless scrolling

최상위 네비게이션:

- EXPLORE
- LEARN
- READ
- TEACH

인트로는 별도 HOME 역할을 한다.

세부 주제는 페이지/탭 단위로 이동한다.

## 3. Intro

### 3.1 Full-screen landing

인트로는 가능한 한 한 화면에 맞춘다.

권장 문구:

```text
AI COMPASS

AI를 이름으로 판단하지 않습니다.

무엇을 알고 있는가
무엇을 보고 있는가
무엇을 할 수 있는가
얼마나 혼자 가는가

그리고
누가 멈추고 되돌릴 수 있는가?

[ COMPASS 열기 ]
```

### 3.2 Visual structure

Capability Stack:

- MODEL
- CONTEXT
- ACTION / TOOLS
- AUTONOMY

CONTROL은 다섯 번째 레이어처럼 보이지 않도록 전체를 가로지르거나 감싸는 구조로 표현한다.

애니메이션은 절제한다.

- 미세한 이동/점등/선 연결 정도
- 과도한 3D, particle, glassmorphism 금지
- `prefers-reduced-motion` 지원

## 4. EXPLORE

목적: AI Compass의 구조를 화면 단위로 탐색한다.

주제 페이지:

1. SYSTEM
2. MODEL
3. CONTEXT
4. ACTION / TOOLS
5. AUTONOMY
6. CONTROL

각 페이지는 다음을 기본으로 한다.

```text
[주제명]
핵심 질문
짧은 핵심 설명
3~6개 핵심 개념
관련 사례/Glossary/eBook 링크
← 이전 주제                      다음 주제 →
```

예:

```text
CONTEXT
AI는 지금 무엇을 보고 있는가?

Prompt · RAG · Memory · Trust Boundary
Instruction Hierarchy · Prompt Injection

[용어 보기] [사례 보기] [원고 읽기]
```

## 5. LEARN

LEARN은 기존 Glossary PWA 기능을 계승한다.

하위 기능:

- Glossary
- Compare
- 3분 학습
- Case Lab

### 5.1 Glossary

기존 CORE 30 source-of-truth JSON을 그대로 사용한다.

기존 기능 유지:

- 한국어/영문/약어/alias 검색
- 용어 상세
- 관련 용어
- 즐겨찾기
- localStorage
- offline

### 5.2 Compare

15개 헷갈리는 개념 쌍 유지.

Hub에서는 카드 목록보다 주제별 진입도 허용한다.

예:

- CONTEXT → Context / Memory
- AUTONOMY → Automation / Autonomy
- SECURITY → Prompt Injection / Jailbreak

### 5.3 3분 학습

현재 5문제 세션 유지.

숫자형 능력 점수는 만들지 않는다.

### 5.4 Case Lab

우선 세 개의 Anchor Case를 사용한다.

1. 숨은 흰색 글자와 AI 채점
2. 학생 기록 환각 승인
3. 학교 Drive/메일 자동화의 과도한 권한

Case Lab은 단계형 조사 방식으로 설계한다.

```text
사건 제시
→ 어디에서 문제가 시작됐나?
→ 무엇이 영향을 키웠나?
→ 어떤 통제가 필요했나?
→ Compass 구조에 연결
```

## 6. READ — AI Compass eBook

### 6.1 Goal

동결 원고를 웹에서 책처럼 읽을 수 있게 한다.

PDF iframe 단순 삽입은 기본안으로 사용하지 않는다.

HTML 기반 eBook을 목표로 한다.

### 6.2 Desktop layout

```text
┌────────────┬────────────────────────────────┐
│ 목차       │ 본문                           │
│ Part 0     │                                │
│ Part 1     │ 현재 Section                   │
│ Part 2     │                                │
│ ...        │                                │
│            │ [Glossary] [관련 사례]         │
└────────────┴────────────────────────────────┘
```

### 6.3 Mobile layout

- 본문 중심
- 목차는 drawer/sheet
- 이전/다음 section 고정 네비게이션 가능

### 6.4 Reading behavior

- Part / Section 단위 라우팅
- 현재 위치 표시
- 이전/다음
- 목차 이동
- 핵심 용어에서 Glossary로 연결
- 관련 주제에서 EXPLORE/Case Lab으로 연결

### 6.5 Source integrity

원고 내용을 임의 요약하여 원문으로 대체하지 않는다.

HTML eBook은 frozen manuscript를 읽기 형식으로 변환한 파생물이다.

내용 변경은 별도 편집 승인 없이는 하지 않는다.

## 7. TEACH — Teacher Slides

TEACH는 슬라이드 뷰어가 아니라 교사가 바로 수업할 수 있는 수업 패키지다.

### 7.1 Slide anatomy

각 슬라이드는 다음 데이터를 가진다.

```text
SLIDE
├ student_view
├ title
├ core_message
├ quick_note
├ full_script
├ estimated_time
├ teacher_question
├ misconception
├ emphasis
├ glossary_links
├ ebook_links
└ activity_or_case_links
```

### 7.2 Student view

학생/청중에게 보여주는 화면.

- 한 화면 한 메시지
- 키워드/도식/사례 중심
- 전체화면 프레젠테이션 가능
- 교사용 설명은 기본적으로 숨김

### 7.3 Quick Note

수업 직전 10~20초 안에 읽을 수 있는 메모.

예:

> L3와 L4의 차이는 지속성이다. L3는 끝나면 사라지고, L4는 끝나도 남는다.

### 7.4 Full Teaching Script

실제 말할 수 있는 강의 스크립트.

권장 구조:

```text
도입
→ 핵심 설명
→ 짧은 사례
→ 학생 질문
→ 오개념 교정
→ 다음 슬라이드 연결
```

기본 분량은 슬라이드당 약 1~3분.

### 7.5 Teacher support fields

각 슬라이드에는 가능하면 다음을 포함한다.

- 예상 소요 시간
- 학생에게 던질 질문
- 흔한 오개념
- 강조할 문장
- 관련 Glossary
- 관련 eBook 위치
- 관련 활동 / Case

### 7.6 Presentation mode

두 모드:

1. **Audience Mode**: 학생용 슬라이드만 표시
2. **Teacher Mode**: 슬라이드 + Quick Note + Full Script + 수업 정보 표시

데스크톱 Teacher Mode 권장 레이아웃:

```text
┌──────────────────────┬───────────────────┐
│                      │ Quick Note        │
│   Student Slide      │ Full Script       │
│                      │ Question          │
│                      │ Misconception     │
└──────────────────────┴───────────────────┘
```

### 7.7 Web and PPTX single source

웹 Teacher Deck과 향후 PPTX는 같은 슬라이드 콘텐츠 데이터에서 파생하는 것을 목표로 한다.

```text
Teacher Deck Data
        ↓
 ┌──────────────┬──────────────┐
 Web Slides                 PPTX
                               ↓
                        Speaker Notes
```

PPTX의 Speaker Notes에는 가능하면 Full Teaching Script를 넣는다.

## 8. Top-level information architecture

```text
AI COMPASS
│
├ INTRO
│
├ EXPLORE
│  ├ SYSTEM
│  ├ MODEL
│  ├ CONTEXT
│  ├ ACTION / TOOLS
│  ├ AUTONOMY
│  └ CONTROL
│
├ LEARN
│  ├ Glossary
│  ├ Compare
│  ├ 3분 학습
│  └ Case Lab
│
├ READ
│  └ AI Compass eBook
│
└ TEACH
   └ Teacher Slides
      ├ Audience Mode
      ├ Teacher Mode
      ├ Quick Notes
      └ Full Teaching Scripts
```

## 9. Navigation

Desktop:

- 상단 global nav 또는 좌측 compact rail
- 현재 section 명확히 표시
- 키보드 좌우 이동 지원 가능

Mobile:

- 4개 최상위 탭 또는 compact menu
- 하위 주제는 horizontal tabs / sheet / carousel식 탐색 가능
- 본문을 강제로 긴 세로 페이지로 만들지 않는다.

## 10. Data and source-of-truth rules

Frozen conceptual source:

- manuscript
- glossary CORE30 JSON
- glossary writing style
- existing glossary comparisons and quizzes

New structured sources to create:

- `hub` navigation metadata
- eBook section mapping
- teacher slide data
- case-lab data

콘텐츠는 UI 코드에 하드코딩하지 않는 것을 원칙으로 한다.

## 11. Reuse rules

Preserve:

- `pwa/glossary/` logic where useful
- existing glossary JSON
- current service-worker/offline lessons
- accessibility work
- hash routing strategy where appropriate

Do not inherit blindly:

- old Analysis Canvas as homepage
- long vertical glossary layout as Hub default
- duplicated glossary definitions

## 12. Visual language

Tone:

- modern educational editorial
- calm, precise, structural
- textbook보다 인터랙티브하고 dashboard보다 덜 기계적

Avoid:

- metric dashboard
- excessive gradients
- generic corporate AI imagery
- giant wall of cards
- unnecessary animations

Preferred:

- generous whitespace
- strong typographic hierarchy
- structural lines/frames/orbits
- subtle Compass motif
- one primary focal point per screen

Font:

웹에는 KoPub font 파일을 번들하지 않는다.

Fallback:

`system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`

## 13. Routes — suggested

```text
#/intro
#/explore/system
#/explore/model
#/explore/context
#/explore/action
#/explore/autonomy
#/explore/control
#/learn/glossary
#/learn/compare
#/learn/quiz
#/learn/case/:id
#/read/:part/:section
#/teach
#/teach/:deck/:slide
```

## 14. MVP scope for Hub v2

Hub v2 first implementation must include:

1. Full-screen Intro
2. Global navigation
3. EXPLORE six topic pages
4. Existing Glossary embedded/reused
5. Compare reused
6. 3-minute learning reused
7. eBook shell + usable first manuscript content mapping
8. TEACH shell + first usable teacher deck data
9. Audience Mode / Teacher Mode
10. Quick Note / Full Script display
11. responsive behavior
12. offline-compatible core shell

Case Lab may begin with one fully implemented anchor case if three complete cases would delay the first usable Hub.

## 15. Acceptance criteria

1. First screen fits within common desktop viewport without vertical scrolling.
2. Intro communicates AI Compass identity in about 5 seconds.
3. Primary Hub navigation reaches EXPLORE / LEARN / READ / TEACH.
4. EXPLORE is page/tab based, not one long vertical document.
5. CONTROL is not represented as Capability Layer 5.
6. Existing Glossary CORE 30 remains searchable.
7. Existing compare pairs remain available.
8. Existing 5-question learning session remains available.
9. eBook has real manuscript-derived reading content, not placeholder lorem ipsum.
10. eBook offers TOC and previous/next navigation.
11. glossary links from reading content work where mapped.
12. TEACH includes actual student slide content.
13. TEACH includes Quick Note.
14. TEACH includes Full Teaching Script.
15. TEACH can switch Audience / Teacher mode.
16. teacher script is not visible in Audience Mode.
17. Teacher Mode exposes question and misconception information where available.
18. slide pages avoid long vertical scrolling on standard desktop view.
19. mobile view remains usable.
20. no server/login/database/external AI API is required.
21. glossary definitions are not duplicated into UI code.
22. frozen manuscript concepts are not silently rewritten.
23. no numeric AI/risk score is introduced.
24. old `pwa/v2` Analysis Canvas is not promoted as Hub homepage.

## 16. Future after Hub v2

- complete Case Lab three-anchor-case implementation
- complete HTML eBook mapping
- multiple teacher decks: 30m / 60–90m / high-school / workshop
- PPTX generation pipeline using teacher slide data
- speaker notes injection
- printable teacher guide
- learner workbook integration
- relationship map visualization
- Learning Lab interactive simulations

## 17. Frozen product decision

AI Compass digital experience is no longer defined as a standalone glossary or analysis form.

It is:

> **INTRO + EXPLORE + LEARN + READ + TEACH가 하나로 연결된 AI Compass Hub.**

The Glossary remains a core module inside LEARN, and the Analysis Canvas remains an advanced/professional tool rather than the learner-facing front door.
