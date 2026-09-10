# AI Compass

**현대 AI를 이해하기 위한 Systems & Risk Literacy 교육 프로젝트**

AI Compass는 특정 AI 제품이나 모델의 사용법을 외우는 대신, 처음 보는 AI 시스템의 구조와 위험을 스스로 이해하고 분석하기 위한 교육 프로젝트입니다.

## Six Compass Questions

1. 무엇을 위해 쓰는가?
2. 무엇을 알고 있는가?
3. 무엇을 보고 있는가?
4. 무엇을 할 수 있는가?
5. 얼마나 혼자 가는가?
6. 누가 멈추고 되돌릴 수 있는가?

## Core Framework

- **Purpose & Stakes** — 이 시스템은 무엇을 위해 쓰이며, 실패하면 누가 어떤 영향을 받는가?
- **Capability Stack** — Model → Context → Action / Tools → Autonomy
- **Control Plane** — 권한 제한, 격리, 사람의 개입, 기록과 관찰, 정지와 복구, 거버넌스

각 층은 **CAPABILITY → RISK → CONTROL**의 순서로 읽습니다.

## Current Status

**AI Compass Core Manuscript v1.0 — FREEZE**

2026-09-10 기준 핵심 산출물은 설계 단계를 넘어 구현·통합 단계까지 진행되었습니다.

- Core Manuscript v1.0: 내용 동결
- Glossary CORE 30 v1.0: 완성 및 구조화 데이터 연동
- Lecture Deck: 42장 강의 자료를 Hub TEACH에 이관
- AI Compass Hub v2: 구현 및 GitHub Pages 배포
- Hub Acceptance: **40 PASS / 0 FAIL**
- 현재 단계: **실사용 검수 · 남은 콘텐츠 이관 · 공개 배포 준비**

세부 기준은 `docs/AI_COMPASS_CURRENT_STATUS_20260910.md`와 `pwa/hub/ACCEPTANCE.md`를 참조합니다.

## Four Project Outputs

AI Compass는 하나의 핵심 프레임워크를 네 가지 산출물로 확장합니다.

### 1. Publication / Distribution
읽고 배포할 수 있는 핵심 원고와 출판용 자료.

### 2. Educational Appendices
공식 용어집, 학습자 워크북, 교수자 가이드, 사례 카드, 자율성·가역성 활동, 퀴즈 등.

현재 최우선 용어집은 **CORE 30 v1.0**까지 작성되어 Hub LEARN에서 검색·비교·학습에 사용됩니다.

### 3. AI Compass Hub / Learning Lab PWA
AI 시스템을 **탐색하고, 비교하고, 사건을 풀고, 읽고, 가르치며 이해하는 인터랙티브 학습 허브**.

현재 Hub v2는 다음 다섯 영역을 연결합니다.

> **INTRO · EXPLORE · LEARN · READ · TEACH**

기존 Analysis Canvas 입력폼은 초보 학습자용 메인 PWA 방향에서 제외하며, capstone / advanced analysis tool로 유지합니다.

### 4. Lecture Slides
원고를 60–90분 강의·연수로 전달하기 위한 슬라이드와 교수자 지원 자료.

42장 기본 덱이 Hub TEACH에 이관되었으며 Audience / Teacher Mode, Quick Note, Full Teaching Script를 제공합니다.

## Hub v2

`pwa/hub/`

현재 구현 범위:

- INTRO: 프레임워크 진입 화면
- EXPLORE: System / Model / Context / Action / Autonomy / Control
- LEARN: CORE 30 Glossary, 15개 비교쌍, 5문항 학습, Case Lab
- READ: 동결 원고 53쪽 전체 웹 읽기
- TEACH: 42장 강의 덱과 교수 지원
- 오프라인 핵심 화면 지원
- 모바일 375px / 320px 검증
- 기존 `pwa/glossary/` 및 `pwa/v2/` 보존

자동 브라우저 Acceptance 결과는 **40 PASS / 0 FAIL**입니다.

## Repository Structure

```text
ai-compass/
├─ README.md
├─ CHANGELOG.md
├─ docs/
│  ├─ manuscript/
│  ├─ publication/
│  ├─ education/
│  │  └─ glossary/
│  ├─ slides/
│  ├─ canvas/
│  └─ archive/
├─ pwa/
│  ├─ hub/
│  ├─ glossary/
│  └─ v2/
├─ codex/
└─ assets/
```

## Project Direction

프로젝트 방향 기준 문서:

`docs/AI_COMPASS_PROJECT_DIRECTION_v2.0.md`

현재 구현·검수 기준:

- `docs/AI_COMPASS_CURRENT_STATUS_20260910.md`
- `pwa/hub/README.md`
- `pwa/hub/ACCEPTANCE.md`

## Next Stage

새로운 대규모 PWA 재설계보다 현재 Hub v2를 실제 교육·배포 가능한 수준으로 다듬는 것을 우선합니다.

1. README·방향·상태 문서를 현재 구현과 동기화
2. Case B/C 단계형 인터랙션 등 명시된 미이관 범위 검토
3. Android/iOS 실기기 설치 및 터치 검수
4. Teacher Script 실제 강의 리허설 및 어조·시간 검수
5. 접근성·원문 표/도식 표현 문제 점검
6. Publication / Hub v1.0 공개 배포 기준과 라이선스 결정

Codex는 이제 초기 구현 단계가 아니라 **검수·보완·릴리스 준비를 위한 구현 파트너**로 사용합니다.

## License

라이선스는 공개 배포 전에 별도로 결정합니다. 현재 저장소는 개발·교육 검수 및 공개 배포 준비 단계의 기준 저장소입니다.
