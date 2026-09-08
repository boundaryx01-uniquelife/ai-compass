# Changelog

AI Compass의 기준 문서와 구현 변경 사항을 기록합니다.

## [1.0.0] - 2026-09-08

### Status

- **AI Compass Core Manuscript v1.0 — FREEZE**

### Added

- Purpose & Stakes + Capability Stack + Control Plane 프레임
- Model / Context / Action & Tools / Autonomy 구조
- CAPABILITY → RISK → CONTROL 분석 문법
- AI Systems Literacy / AI Risk Literacy 정의
- Autonomy Level L0~L4
- Trigger 분리: Manual / Scheduled / Event-triggered / Condition-triggered
- Reversibility Traffic Light: GREEN / YELLOW / RED
- Analysis Canvas의 60 Second Scan / 5 Minute Check / Deep Review 구조
- 최종 판정: YES / CONDITIONAL / NO / UNKNOWN
- Anchor Cases 3종
- 부록 A~G

### Frozen Principles

- Control Plane은 제5 Capability Layer가 아니다.
- Trigger는 Autonomy Level과 별개다.
- 승인 없음만으로 L3가 되지 않는다.
- L3는 작업 종료와 함께 끝나고, L4는 목표·권한·상태가 남아 지속된다.
- 위험을 단일 숫자 점수로 환산하지 않는다.

### Next

- Analysis Canvas v1.0 구현 명세 확정
- PWA v2 데이터 스키마 및 화면 구조 설계
- Codex implementation handoff
