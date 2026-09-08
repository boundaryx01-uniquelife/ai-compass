# AI Compass Glossary — CORE 30 v0.1

Status: **CONTENT SELECTION DRAFT — REVIEW REQUIRED**  
Source baseline: **AI_COMPASS_v1.0_FINAL.pdf**  
Purpose: AI Compass를 읽고, 강의하고, PWA에서 탐색·비교·학습하기 위해 가장 먼저 필요한 핵심 용어 30개를 확정하기 위한 초안.

## Selection principles

CORE 용어는 다음 기준으로 선정한다.

1. AI Compass 본문의 논리를 이해하는 데 직접 필요하다.
2. 실제 AI 사용·교육에서 자주 혼동되는 개념이다.
3. MODEL / CONTEXT / ACTION·TOOLS / AUTONOMY / CONTROL 구조를 읽는 데 필요하다.
4. 제품명이나 특정 회사명보다 오래 유지되는 개념을 우선한다.
5. 단순 기술 백과사전이 아니라 Systems & Risk Literacy에 필요한 어휘를 우선한다.

---

## A. SYSTEM STRUCTURE

### 01. AI 모델 — AI Model
- id: `ai-model`
- 핵심 이유: 모델과 서비스, 에이전트를 구분하는 출발점
- 관련: AI Service, AI System, Agent
- 원고: Part 0

### 02. AI 서비스 / 제품 — AI Service / Product
- id: `ai-service`
- 핵심 이유: 실제 사용자는 모델 단독이 아니라 모델을 둘러싼 시스템을 사용함
- 관련: AI Model, Harness, Tool Use, Control Plane
- 원고: Part 0

### 03. AI 시스템 — AI System
- id: `ai-system`
- 핵심 이유: MODEL + CONTEXT + TOOLS + AUTONOMY와 이를 가로지르는 CONTROL을 하나의 분석 대상으로 묶는 상위 개념
- 관련: Capability Stack, Control Plane
- 원고: Part 0

### 04. 에이전트 — Agent
- id: `agent`
- 핵심 이유: 특별한 모델이 아니라 목표 지향적 반복 구조라는 구분이 중요함
- 관련: Workflow, Autonomy, Tool Use, Persistence
- 원고: Part 0 / Part 4

---

## B. MODEL

### 05. 학습 — Training
- id: `training`
- 핵심 이유: 모델을 만드는 시점과 사용하는 시점을 구분하기 위한 기본 개념
- 관련: Inference, Weights, Memory
- 원고: Part 1

### 06. 추론 — Inference
- id: `inference`
- 핵심 이유: 학습된 가중치를 사용해 현재 입력에 대한 출력을 계산하는 단계
- 관련: Training, Weights, Context
- 원고: Part 1

### 07. 대규모 언어 모델 — LLM / Large Language Model
- id: `llm`
- 핵심 이유: AI 서비스 전체와 LLM을 동일시하지 않기 위한 핵심 용어
- 관련: AI Model, AI Service, Foundation Model
- 원고: Part 1

### 08. 지식 컷오프 — Knowledge Cutoff
- id: `knowledge-cutoff`
- 핵심 이유: 모델이 최신 세계와 계속 동기화되어 있지 않다는 한계를 이해하는 실용적 기준
- 관련: RAG, Hallucination, Verification
- 원고: Part 1

### 09. 환각 — Hallucination
- id: `hallucination`
- 핵심 이유: 근거 없는 내용이 사실과 같은 어조로 생성될 수 있다는 생성형 AI의 핵심 한계
- 관련: Grounding, RAG, Verification, Bias
- 원고: Part 1

---

## C. CONTEXT

### 10. 컨텍스트 — Context
- id: `context`
- 핵심 이유: 이번 추론에서 모델이 실제로 참고하는 작업 공간을 이해하는 중심 용어
- 관련: Context Window, Prompt, RAG, Memory, Tool Result
- 원고: Part 2

### 11. 프롬프트 — Prompt
- id: `prompt`
- 핵심 이유: 모델에게 주어지는 지시·입력 통로의 기본 개념
- 관련: Context, Instruction Hierarchy, Prompt Injection
- 원고: Part 2

### 12. RAG — Retrieval-Augmented Generation
- id: `rag`
- 핵심 이유: 외부 자료를 찾아 현재 작업 공간에 넣는 방식과 모델 자체를 바꾸는 것을 구분
- 관련: Retrieval, Grounding, Fine-tuning, Context
- 원고: Part 2 / Appendix A

### 13. 메모리 — Memory
- id: `memory`
- 핵심 이유: 저장했다 다시 건네는 것과 학습·가중치 변경을 구분
- 관련: Context, Training, RAG
- 원고: Part 2 / Appendix A

### 14. 지시 계층 — Instruction Hierarchy
- id: `instruction-hierarchy`
- 핵심 이유: 서로 다른 출처·역할의 지시에 우선순위를 두는 구조
- 관련: Prompt, Trust Boundary, Prompt Injection
- 원고: Part 2

### 15. 신뢰 경계 — Trust Boundary
- id: `trust-boundary`
- 핵심 이유: 통제 안에서 온 정보와 통제 밖에서 온 정보를 구분하는 Systems Literacy의 핵심 개념
- 관련: Context, Prompt Injection, Provenance
- 원고: Part 2

### 16. 프롬프트 인젝션 — Prompt Injection
- id: `prompt-injection`
- 핵심 이유: 데이터로 읽어야 할 내용이 지시처럼 작동하며 신뢰 경계와 지시 우선순위를 교란할 수 있음
- 관련: Jailbreak, Trust Boundary, Instruction Hierarchy
- 원고: Part 2 / Part 6

### 17. 간접 프롬프트 인젝션 — Indirect Prompt Injection
- id: `indirect-prompt-injection`
- 핵심 이유: 문서·웹페이지·메일 등에 심어진 지시가 사용자 모르게 작동할 수 있는 공격 구조
- 관련: Prompt Injection, Untrusted Context, Confused Deputy
- 원고: Part 2 / Part 6

---

## D. ACTION / TOOLS

### 18. 도구 사용 — Tool Use
- id: `tool-use`
- 핵심 이유: 모델의 출력이 외부 행동으로 연결되는 지점을 이해하기 위한 개념
- 관련: Tool Call Request, Harness, Runtime, API, MCP
- 원고: Part 3

### 19. 실행 계층 — Harness / Runtime
- id: `harness-runtime`
- 핵심 이유: 모델이 직접 외부 행동을 실행하는 것이 아니라 요청을 바깥 실행 계층이 처리한다는 구조를 설명
- 관련: Tool Use, Permission, Policy Check
- 원고: Part 3

### 20. MCP — Model Context Protocol
- id: `mcp`
- 핵심 이유: AI 애플리케이션과 도구·데이터 연결을 표준화하려는 규격이며 Agent 자체가 아님
- 관련: API, Tool Use, Agent
- 원고: Part 3 / Appendix A

### 21. 권한 — Permission
- id: `permission`
- 핵심 이유: 시스템이 실제로 무엇을 읽고·쓰고·삭제하고·전송할 수 있는지를 결정
- 관련: Least Privilege, Sandbox, Blast Radius
- 원고: Part 3

### 22. 최소권한 — Least Privilege
- id: `least-privilege`
- 핵심 이유: 필요한 권한만 부여해 사고가 났을 때 피해 범위를 줄이는 핵심 통제
- 관련: Permission, Blast Radius, Control Plane
- 원고: Part 3 / Part 5

### 23. 격리 — Sandbox
- id: `sandbox`
- 핵심 이유: 파일·네트워크·자격증명 등 번질 수 있는 범위를 제한하지만 위험 자체를 없애지는 않음
- 관련: Permission, Credentials, Network, Blast Radius
- 원고: Part 3 / Part 5

---

## E. AUTONOMY

### 24. 자동화 — Automation
- id: `automation`
- 핵심 이유: 사람이 미리 정한 것을 자동 실행하는 것과 시스템이 다음 행동을 고르는 자율성을 구분
- 관련: Autonomy, Trigger, Workflow
- 원고: Part 4 / Appendix A

### 25. 자율성 — Autonomy
- id: `autonomy`
- 핵심 이유: 목표 안에서 다음 행동을 얼마나 스스로 선택하고 이어가는지를 판단하는 축
- 관련: Automation, Agent, L0-L4, Trigger
- 원고: Part 4

### 26. 트리거 — Trigger
- id: `trigger`
- 핵심 이유: 언제 시작되는가와 시작된 뒤 얼마나 혼자 가는가를 분리하기 위한 개념
- 관련: Autonomy, Scheduled, Event-triggered, Condition-triggered
- 원고: Part 4 / Appendix A

---

## F. CONTROL

### 27. 통제 구조 — Control Plane
- id: `control-plane`
- 핵심 이유: 다섯 번째 능력 층이 아니라 MODEL·CONTEXT·TOOLS·AUTONOMY 전체를 가로지르는 통제 구조
- 관련: Least Privilege, HITL, Observability, Stop, Recovery, Governance
- 원고: Part 0 / Part 5

### 28. 사람의 개입 — Human-in-the-Loop / HITL
- id: `hitl`
- 핵심 이유: 중요한 판단 지점에 사람을 두는 방식이지만 사람의 존재만으로 안전이 보장되지는 않음
- 관련: Automation Bias, Approval Fatigue, Approval Gate
- 원고: Part 5

### 29. 관찰 가능성 — Observability
- id: `observability`
- 핵심 이유: 시스템이 무엇을 했고 지금 무엇을 하고 있는지 이해할 수 있는 상태이며 정지·복구·책임 규명의 전제
- 관련: Logging, Monitoring, Stop, Recovery
- 원고: Part 5 / Appendix A

### 30. 가역성 — Reversibility
- id: `reversibility`
- 핵심 이유: 행동 결과를 얼마나 쉽게 되돌릴 수 있는지가 권한·승인·통제 강도를 결정하는 핵심 축
- 관련: GREEN, YELLOW, RED, Approval Gate, Recovery
- 원고: Part 3 / Part 5 / Part 7

---

# Reserved for EXTENDED

아래 용어는 중요하지만 CORE 30에서는 우선 제외하고 EXTENDED 후보로 둔다.

- Weights
- Foundation Model
- Multimodal
- Bias
- Alignment
- Context Window
- Grounding
- Provenance / Source
- Context Contamination
- Untrusted Retrieval
- Data Leakage
- Exfiltration
- Jailbreak
- Tool Call Request
- API
- Confused Deputy
- Credentials
- Blast Radius
- Workflow
- Persistence
- L0 / L1 / L2 / L3 / L4
- Automation Bias
- Approval Fatigue
- Logging
- Monitoring
- Stop
- Recovery
- Governance
- Safety
- Security
- Guardrail
- Open-weight
- Open-source

# Review questions

1. CORE 30에서 빠지면 안 되는 용어가 있는가?
2. 반대로 CORE에서 EXTENDED로 내려도 되는 용어가 있는가?
3. `Harness / Runtime`을 하나의 카드로 유지할 것인가, 두 카드로 나눌 것인가?
4. `AI System`을 독립 용어로 둘 것인가, AI Service 카드 안에 포함할 것인가?
5. Reversibility를 Control에 둘지, Cross-cutting 개념으로 별도 표시할지 결정할 필요가 있다.

# Next step after approval

CORE 30이 승인되면 다음 순서로 진행한다.

1. Pilot 10 카드 스타일 검토
2. Glossary Writing Style v1.0 FREEZE
3. CORE 30 전체 집필
4. JSON source-of-truth 설계
5. Glossary PWA UX 설계
6. Codex handoff
