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

현재 v1.0 본문은 Part 0~7과 부록 A~G로 구성되어 있습니다.

## Four Project Outputs

AI Compass는 하나의 원고를 네 가지 산출물로 확장합니다.

### 1. Publication / Distribution
읽고 배포할 수 있는 핵심 원고와 출판용 자료.

### 2. Educational Appendices
학습자 워크북, 교수자 가이드, 사례 카드, 자율성·가역성 활동, 퀴즈 등.

### 3. AI Compass Learning Lab PWA
원고를 화면에 옮기는 앱이 아니라, AI 시스템을 **조립하고 비교하고 사건을 풀며 이해하는 인터랙티브 학습 도구**.

### 4. Lecture Slides
원고를 60–90분 강의·연수로 전달하기 위한 슬라이드와 교수자 노트.

## Repository Structure

```text
ai-compass/
├─ README.md
├─ CHANGELOG.md
├─ docs/
│  ├─ manuscript/
│  ├─ education/
│  ├─ slides/
│  ├─ canvas/
│  └─ archive/
├─ pwa/
├─ codex/
└─ assets/
```

## Current Direction

프로젝트 방향 기준 문서:

`docs/AI_COMPASS_PROJECT_DIRECTION_v2.0.md`

기존 Analysis Canvas PWA 방향은 초보 학습자용 메인 앱으로 사용하지 않습니다. Analysis Canvas 자체는 여전히 유효하며, 학습 후의 **capstone / advanced analysis tool**로 유지합니다.

새 PWA의 목표는 다음입니다.

> **AI 시스템을 직접 조립하고 사건을 풀면서 구조와 위험을 배우는 학습 실험실**

학습자는 PWA에서 주로 다음 행동을 하게 됩니다.

> **조립하기 · 비교하기 · 사건 풀기 · 판정하기**

## Next Stage

1. 교육용 부록 제작
2. 강의 슬라이드 제작 및 검수
3. PWA Learning Lab 화면/상호작용 와이어프레임 확정
4. 와이어프레임 승인 후 Codex 구현 handoff

PWA는 설계 승인 전까지 추가 구현을 멈춥니다.

## License

라이선스는 공개 배포 전에 별도로 결정합니다. 현재 저장소는 개발 및 정리 단계의 기준 저장소입니다.
