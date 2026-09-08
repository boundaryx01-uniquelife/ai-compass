# AI Compass

**현대 AI를 이해하기 위한 Systems & Risk Literacy 교육 프로젝트**

AI Compass는 특정 AI 제품이나 모델의 사용법을 외우는 대신, 처음 보는 AI 시스템의 구조와 위험을 스스로 분석하기 위한 교육 프로젝트입니다.

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

## Repository Structure

```text
ai-compass/
├─ README.md
├─ CHANGELOG.md
├─ docs/
│  ├─ AI_COMPASS_v1.0_FINAL.pdf
│  ├─ manuscript/
│  ├─ canvas/
│  └─ archive/
├─ pwa/
│  ├─ v1/
│  └─ v2/
├─ codex/
└─ assets/
```

## Next Stage

다음 개발 단계는 **AI Compass Analysis Canvas v1.0 → PWA v2 구현**입니다.

구현 시 다음 원칙을 유지합니다.

- 60 Second Scan → 5 Minute Check → Deep Review
- Autonomy Level과 Trigger를 분리
- Reversibility를 GREEN / YELLOW / RED로 판단
- 최종 판정은 YES / CONDITIONAL / NO / UNKNOWN
- 단일 숫자 위험 점수는 사용하지 않음

## License

라이선스는 공개 배포 전에 별도로 결정합니다. 현재 저장소는 개발 및 정리 단계의 기준 저장소입니다.
