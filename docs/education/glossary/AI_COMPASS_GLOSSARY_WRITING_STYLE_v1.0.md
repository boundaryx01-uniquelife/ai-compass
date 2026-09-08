# AI Compass Glossary Writing Style v1.0

Status: **FREEZE**  
Approved: 2026-09-08  
Source baseline: `AI_COMPASS_v1.0_FINAL.pdf`

## 1. Purpose

AI Compass Glossary는 일반적인 AI 백과사전이 아니다. AI Compass 원고를 읽고, 강의하고, 학습하며, 실제 AI 시스템을 이해할 때 필요한 개념을 빠르게 찾고 서로 구분하도록 돕는 참조 도구다.

핵심 가치는 다음 세 가지다.

1. **찾기** — 모르는 용어를 빠르게 찾는다.
2. **구분하기** — 비슷하게 쓰이는 용어의 경계를 분명히 한다.
3. **연결하기** — 한 용어가 AI 시스템의 어느 층과 어떤 다른 개념에 연결되는지 이해한다.

## 2. Source-of-truth rule

- CORE v1의 정의와 구분은 `AI_COMPASS_v1.0_FINAL.pdf`의 개념 체계를 우선한다.
- 외부 지식으로 원고의 정의를 조용히 바꾸지 않는다.
- 원고에 없는 확장 정보가 필요하면 EXTENDED 또는 TECHNICAL 층에서 별도로 표시한다.
- 특정 회사명·제품명은 정의 축으로 사용하지 않는다.

## 3. Standard card structure

모든 CORE 카드는 아래 필드를 사용한다.

1. 용어 / 영문명
2. 태그
3. 한 줄 이해
4. 정확히 말하면
5. 왜 중요한가
6. 흔한 오해
7. 바로잡기
8. 구분해서 보기
9. 짧은 사례
10. 관련 용어
11. Compass 위치
12. 원고 위치

필드가 불필요한 경우 억지로 채우지 않는다. 단, `한 줄 이해`, `정확히 말하면`, `관련 용어`, `Compass 위치`는 CORE에서 필수다.

## 4. Writing rules

### 한 줄 이해
- 1문장 원칙.
- 20~45자 정도를 우선한다.
- 전문용어를 다른 전문용어로만 치환하지 않는다.
- 정의보다 독자가 먼저 잡아야 할 구분을 우선할 수 있다.

### 정확히 말하면
- 2~5문장.
- 원고의 기술적 경계를 유지한다.
- 절대 표현을 피한다. 예: `항상`, `완전히`, `절대로`는 원고가 그렇게 규정한 경우에만 사용한다.

### 왜 중요한가
- 실제 판단이 어떻게 달라지는지를 설명한다.
- 단순히 `중요한 개념이다`라고 쓰지 않는다.

### 흔한 오해 / 바로잡기
- 실제로 자주 섞이는 개념을 우선한다.
- 오해 문장은 짧고 단정적으로 제시한다.
- 바로잡기는 공격적 표현 없이 경계를 설명한다.

### 구분해서 보기
가능하면 짧은 대비식으로 쓴다.

예:

`RAG = 찾아서 넣기`  
`Fine-tuning = 모델 자체를 조정하기`

또는:

`Automation ≠ Autonomy`

### 짧은 사례
- 한 카드당 1개를 기본으로 한다.
- AI Compass의 3개 anchor case와 교육 현장 사례를 우선 재사용한다.
- 제품명보다 시스템 구조를 보여주는 사례를 사용한다.

## 5. Progressive disclosure

PWA와 인쇄 부록 모두 같은 콘텐츠 원본을 사용한다.

### 기본 노출
- 용어 / 영문명
- 한 줄 이해
- 정확히 말하면
- 왜 중요한가

### 펼쳐보기
- 흔한 오해
- 바로잡기
- 구분해서 보기
- 짧은 사례
- 관련 용어
- 원고 위치

별도 `초등용`, `성인용` 정의를 만들지 않는다. 필요한 경우 같은 개념을 활동 방식으로 다르게 경험하게 한다.

## 6. Classification

### Tier
- `CORE`
- `EXTENDED`
- `TECHNICAL`

### Compass / topic tags
- `SYSTEM`
- `MODEL`
- `CONTEXT`
- `ACTION`
- `TOOLS`
- `AUTONOMY`
- `CONTROL`
- `RISK`
- `SECURITY`

한 용어가 여러 태그를 가질 수 있다.

## 7. Frozen conceptual boundaries

다음 구분은 PWA·부록·슬라이드에서 동일하게 유지한다.

- AI Model ≠ AI Service ≠ Agent
- Context ≠ Memory
- Memory ≠ Training
- RAG ≠ Fine-tuning
- Tool Use ≠ API
- API ≠ MCP
- Workflow ≠ Agent
- Automation ≠ Autonomy
- Trigger ≠ Autonomy Level
- Prompt Injection ≠ Jailbreak
- Hallucination ≠ Bias
- Guardrail ≠ Alignment
- Safety ≠ Security
- Sandbox ≠ Permission
- Logging ≠ Observability

추가 고정 규칙:

- Control Plane은 Capability Layer 5가 아니다.
- 모델은 일반적으로 도구를 직접 실행하지 않는다. 실행 계층이 Tool Call Request를 처리해 실제 실행한다.
- Scheduled/Event-triggered라는 사실만으로 자율성이 높아지지 않는다.
- 승인이 없다는 사실만으로 L3가 되지 않는다.
- `L3는 끝나면 사라지고, L4는 끝나도 남는다.`

## 8. Typography for generated artifacts

AI Compass의 출판본·워크북·용어집 PDF·강의 슬라이드 등 생성 산출물의 기본 한글 서체는 사용자가 제공한 KoPub World 돋움 계열을 기준으로 한다.

- 본문: **KoPub World 돋움체 M**
- 제목·강조: **KoPub World 돋움체 B**

폰트 파일 자체는 저장소나 배포 패키지에 포함하지 않는다. 웹/PWA 번들링은 별도의 라이선스 검토 후 결정한다.

## 9. PWA reuse rule

용어 콘텐츠는 화면 HTML에 직접 박아 넣지 않고 구조화된 데이터로 관리한다. 향후 하나의 source-of-truth가 다음에서 재사용되어야 한다.

- Glossary PWA
- 인쇄/배포용 용어집
- Learning Lab
- Quiz
- 워크북
- 강의 슬라이드

## 10. Current approved baseline

- CORE 30 selection: approved
- Pilot 10 card density/style: approved
- Writing Style v1.0: **FREEZE**

다음 단계는 CORE 30 전체 카드 집필과 구조화 데이터 스키마 확정이다.
