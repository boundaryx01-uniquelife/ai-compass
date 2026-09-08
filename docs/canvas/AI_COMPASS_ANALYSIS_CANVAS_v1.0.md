# AI Compass Analysis Canvas v1.0

Status: **FROZEN SPEC**  
Source baseline: **AI Compass Core Manuscript v1.0 — FREEZE**

## 1. Purpose

AI Compass Analysis Canvas는 처음 보는 AI 시스템을 제품명이나 모델명 중심이 아니라 구조와 위험의 조합으로 읽기 위한 단일 분석 객체입니다.

세 모드는 서로 다른 평가표가 아니라 **같은 데이터를 서로 다른 해상도로 보는 방식**입니다.

- **60 Second Scan** — 핵심 여섯 질문만 빠르게 확인
- **5 Minute Check** — 각 질문을 실무 항목으로 확장
- **Deep Review** — 신뢰 경계, 권한, 가역성, 지속성, 관찰 가능성, 복구를 깊게 확인

## 2. Frozen Compass Questions

다음 문구는 순서와 표현을 임의 변경하지 않습니다.

1. **무엇을 위해 쓰는가?**
2. **무엇을 알고 있는가?**
3. **무엇을 보고 있는가?**
4. **무엇을 할 수 있는가?**
5. **얼마나 혼자 가는가?**
6. **누가 멈추고 되돌릴 수 있는가?**

## 3. Core Analysis Object

```json
{
  "id": "string",
  "title": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "purposeAndStakes": {},
  "model": {},
  "context": {},
  "action": {},
  "autonomy": {},
  "control": {},
  "reversibility": {},
  "decision": {}
}
```

이 객체는 60초, 5분, 상세 검토에서 공통 사용합니다.

## 4. Purpose & Stakes

```json
{
  "purpose": "string",
  "affectedPeople": "string",
  "affectedCount": null,
  "failureImpact": "string",
  "stakes": {
    "officialRecord": false,
    "evaluation": false,
    "financial": false,
    "public": false
  }
}
```

핵심 질문:

> 이 AI는 무엇을 위해 쓰이며, 실패하면 누가 어떤 영향을 받는가?

Purpose & Stakes는 나머지 모든 층의 허용 기준을 결정합니다.

## 5. Model

```json
{
  "latestInformationRequired": null,
  "factVerificationRequired": null,
  "errorSeverity": "unknown",
  "biasMaterial": null,
  "notes": ""
}
```

Model은 제품 성능 순위를 매기는 항목이 아닙니다. 환각, 오래된 지식, 편향, 비결정성이 현재 용도에서 얼마나 중요한지 기록합니다.

## 6. Context

```json
{
  "channels": {
    "prompt": false,
    "file": false,
    "rag": false,
    "memory": false,
    "toolResult": false,
    "multimodal": false
  },
  "sources": [],
  "untrustedSources": [],
  "containsSensitiveData": null,
  "trustBoundaryNotes": ""
}
```

각 입력 통로에 대해 최소한 다음을 확인합니다.

- 출처는 어디인가?
- 우리가 통제하는 곳에서 왔는가?
- 민감한 정보가 포함되는가?

## 7. Action / Tools

```json
{
  "capabilities": {
    "read": false,
    "write": false,
    "modify": false,
    "delete": false,
    "send": false,
    "publish": false,
    "pay": false,
    "executeCode": false,
    "changePermission": false
  },
  "mostIrreversibleAction": "",
  "permissionNotes": ""
}
```

핵심은 행동 이름 자체가 아니라 다음 질문입니다.

> 이 모델이 틀렸을 때, 실제로 어디까지 바꿀 수 있는가?

## 8. Autonomy

```json
{
  "level": "L0",
  "trigger": "Manual",
  "evidence": "",
  "persistent": false,
  "approvalBeforeIrreversibleAction": null
}
```

### 8.1 Frozen levels

- **L0 응답형** — 스스로 외부 행동을 선택하지 않는다
- **L1 도구보조형** — 사람이 정한 하나의 작업 범위 안에서 도구를 사용하고 끝난다
- **L2 감독수행형** — 여러 단계를 스스로 잇지만, 되돌리기 어려운 행동 앞에서 승인을 받는다
- **L3 목표위임형** — 맡긴 목표 범위 안에서 중간 승인 없이 계획·실행·관찰을 반복하고 끝나면 보고한다
- **L4 지속위임형** — 작업이 끝나도 목표·권한·상태가 남아 환경 변화에 따라 다시 판단하고 행동한다

Frozen sentence:

> **L3는 끝나면 사라지고, L4는 끝나도 남는다.**

### 8.2 Trigger

Trigger는 자율성의 크기가 아닙니다.

- Manual
- Scheduled
- Event-triggered
- Condition-triggered

표기 예:

`L2 / Event-triggered`

### 8.3 Classification order

1. **Persistence** — 작업 종료 뒤에도 목표·권한·상태가 남고 환경 변화에 따라 다시 판단하는가? YES → L4
2. **Iteration** — 한 목표 아래 여러 단계에서 다음 행동을 스스로 선택하고 결과를 보고 다시 판단하는가?
3. **Approval Gate** — 반복 구조가 있을 때 되돌리기 어려운 행동 앞에서 반드시 승인받는가? YES → L2 / NO → L3
4. **Task Scope** — 반복 구조가 없다면, 하나의 사람이 정한 작업 범위 안에서 도구 또는 외부 행동을 수행하고 끝나는가? YES → L1 / NO → L0

절대 구현 규칙:

> **승인이 없다는 사실만으로 L3가 되는 것은 아니다. 반복 구조가 함께 있어야 한다.**

또한 여러 수준의 특징이 함께 나타나는 경우 실제로 수행 가능한 가장 높은 자율성 수준을 기록합니다.

## 9. Control Plane

```json
{
  "leastPrivilege": {"exists": false, "effective": null},
  "approvalGate": {"exists": false, "effective": null},
  "sandbox": {"exists": false, "effective": null},
  "logging": {"exists": false, "effective": null},
  "monitoring": {"exists": false, "effective": null},
  "observability": {"exists": false, "effective": null},
  "stop": {"exists": false, "effective": null},
  "recovery": {"exists": false, "effective": null},
  "governance": {"exists": false, "effective": null}
}
```

중요 원칙:

> **통제가 존재하는가와 실제로 작동하는가는 다르다.**

Control Plane은 다섯 번째 능력층이 아니라 Model, Context, Action, Autonomy 전체를 가로지르는 구조입니다.

## 10. Reversibility

```json
{
  "level": "UNKNOWN",
  "reason": ""
}
```

- **GREEN** — 외부 상태 변화가 없거나 되돌릴 것이 거의 없음
- **YELLOW** — 외부 상태를 바꾸지만 사용자가 혼자 되돌릴 수 있음
- **RED** — 복구에 다른 사람의 협력이 필요하거나 이미 발생한 영향을 회수하기 어려움
- **UNKNOWN** — 필요한 정보 부족

빠른 질문:

> **이걸 되돌리려면 다른 사람에게 부탁해야 하는가?**

YES라면 RED일 가능성이 높습니다.

색은 행동 이름이 아니라 실제 맥락, 복구 가능성, 영향 범위로 판단합니다.

## 11. Deep Review fields

상세 검토에서는 새로운 분석 객체를 만들지 않고 기존 객체에 다음 정보를 확장합니다.

```json
{
  "deepReview": {
    "trustBoundary": "",
    "unnecessaryPermissions": "",
    "persistence": "",
    "observability": "",
    "recovery": ""
  }
}
```

필수 질문:

- 외부 입력은 정확히 어디에서 들어오는가?
- 업무에 필요 없는 권한은 무엇인가?
- 작업이 끝나면 시스템이 종료되는가?
- 목표·권한·메모리가 남는가?
- 지금 무엇을 하고 있는지 진행 중에 볼 수 있는가?
- 마지막 정상 상태로 돌아갈 수 있는가?

## 12. Final Decision

```json
{
  "status": "UNKNOWN",
  "conditions": "",
  "reason": "",
  "missingInformation": ""
}
```

허용 값:

- **YES** — 현재 용도에서 허용할 수 있다
- **CONDITIONAL** — 특정 통제를 추가하거나 권한 또는 자율성을 낮추면 허용할 수 있다
- **NO** — 현재 구조와 용도에서는 허용하기 어렵다
- **UNKNOWN** — 판단에 필요한 정보가 부족하다

Validation:

- CONDITIONAL이면 `conditions` 필수
- NO이면 `reason` 필수
- UNKNOWN이면 `missingInformation` 필수

숫자형 총점 또는 위험 점수는 만들지 않습니다.

## 13. Repeated Judgment Question

각 분석 층의 끝과 최종 판정 직전에 다음 문장을 동일하게 사용합니다.

> **여기까지 확인한 것을, 이 AI의 용도와 실패했을 때의 영향에 비추어 허용할 수 있는가?**

문구를 축약하거나 변형하지 않습니다.

## 14. PWA View Mapping

### 60 Second Scan

한 화면 또는 짧은 단계 흐름에서 다음만 보여줍니다.

- Purpose
- Model
- Context
- Action
- Autonomy
- Control
- Final Decision

### 5 Minute Check

동일 객체를 확장하여 체크박스, 텍스트 입력, Level / Trigger 선택, Reversibility를 보여줍니다.

### Deep Review

새 평가를 시작하지 않습니다. 기존 분석 기록에 심화 필드를 추가합니다.

## 15. Non-negotiable Rules

1. Product name 중심 평가 금지
2. 숫자형 종합 위험 점수 금지
3. Trigger와 Autonomy 결합 판정 금지
4. `No approval → L3` 규칙 금지
5. Control Plane을 5번째 Capability layer로 표현 금지
6. CONDITIONAL 조건 없는 저장 금지
7. UNKNOWN 누락정보 없는 저장 금지
8. GREEN/YELLOW/RED를 행동 이름만으로 자동 결정 금지
9. 60s / 5m / Deep을 별도 데이터 구조로 만들지 않음
10. 핵심 여섯 질문의 표현과 순서 변경 금지

## 16. Freeze Declaration

**AI Compass Analysis Canvas v1.0 — FREEZE**

이 문서를 PWA v2 구현의 개념적 기준선으로 사용합니다.
