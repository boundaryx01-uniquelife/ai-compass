# AI Compass Glossary Architecture v1.0

Status: **DESIGN BASELINE**  
Source of truth: **AI Compass Core Manuscript v1.0 — FREEZE**

## 1. Purpose

The glossary is the highest-priority educational appendix of AI Compass.

It is not intended to become a flat list of definitions. It should act as a navigation layer across the manuscript, lecture slides, learner activities, and future PWA Learning Lab.

A good glossary entry should let the reader answer:

1. 이 말은 무엇인가?
2. 무엇과 헷갈리기 쉬운가?
3. 왜 중요한가?
4. AI Compass의 어느 질문과 연결되는가?

## 2. Entry template

Each full entry should use the following fields.

```text
한국어 용어
English term / acronym

한 줄 이해
정확한 정의
왜 중요한가
흔한 오해
헷갈리는 용어
관련 Compass 영역
관련 용어
짧은 예시 (선택)
원고 위치
```

### Depth rule

Use progressive disclosure:

- **한 줄 이해** — 누구나 빠르게 읽는 층
- **본문 정의** — 교사·강사·고등학생 기준
- **더 들어가기** — 기술적 구분이 필요한 경우만

Do not create separate conflicting definitions for different age groups. Younger learner materials may simplify the activity, but the glossary retains one conceptual source of truth.

## 3. Lookup routes

The same term dataset should support four indexes.

### A. 가나다 / A–Z index
Fast lookup.

### B. AI Compass structure index

- Purpose & Stakes
- Model
- Context
- Action / Tools
- Autonomy
- Control Plane
- Cross-layer / Security

### C. Confusing-pairs index
Appendix A's 15 pairs become a first-class comparison view rather than a separate disconnected appendix.

### D. Depth index

- CORE — should be understood by most readers
- EXTENDED — useful for serious users / instructors
- TECHNICAL — appendix-level technical detail

## 4. Frozen confusing pairs

These 15 pairs come directly from Appendix A and must remain intact as a comparison index.

1. AI 모델 / AI 서비스
2. 컨텍스트 / 메모리
3. 메모리 / 학습
4. RAG / 파인튜닝
5. 도구 사용 / API
6. API / MCP
7. 워크플로 / 에이전트
8. 자동화 / 자율성
9. 트리거 / 자율성 단계
10. 프롬프트 인젝션 / 탈옥(Jailbreak)
11. 환각 / 편향
12. 가드레일 / 정렬(Alignment)
13. 안전(Safety) / 보안(Security)
14. 격리(Sandbox) / 권한(Permission)
15. 기록(Logging) / 관찰 가능성(Observability)

Additional manuscript-emphasized distinctions to cross-link:

- Model / Product / Agent
- Training / Inference
- Context / Context Window
- Grounded / Guaranteed True
- Tool Call Request / Tool Execution
- Trigger / Autonomy
- L3 / L4
- GREEN / YELLOW / RED reversibility
- Open-weight / Open-source

## 5. Initial term inventory

This inventory is sourced from terms explicitly used or defined in the frozen manuscript and appendices. Definitions should be written from the manuscript before external expansion.

### MODEL

| Term | Depth |
|---|---|
| AI 모델 (AI Model) | CORE |
| AI 서비스 / 제품 (AI Service / Product) | CORE |
| 기반 모델 (Foundation Model) | CORE |
| 대규모 언어 모델 (LLM) | CORE |
| 학습 (Training) | CORE |
| 추론 (Inference) | CORE |
| 가중치 (Weights) | EXTENDED |
| 토큰 (Token) | CORE |
| 컨텍스트 윈도우 (Context Window) | CORE |
| 지식 컷오프 (Knowledge Cutoff) | CORE |
| 멀티모달 (Multimodal) | CORE |
| 비결정성 (Nondeterminism) | EXTENDED |
| Temperature | EXTENDED |
| 환각 (Hallucination) | CORE |
| 편향 (Bias) | CORE |
| 정렬 / 사후학습 (Alignment / Post-training) | CORE |
| 사용 맥락 (Deployment Context) | EXTENDED |

### CONTEXT

| Term | Depth |
|---|---|
| 컨텍스트 (Context) | CORE |
| 프롬프트 (Prompt) | CORE |
| 검색 / RAG | CORE |
| 메모리 (Memory) | CORE |
| 도구 실행 결과 (Tool Result) | EXTENDED |
| 지시 계층 (Instruction Hierarchy) | CORE |
| 신뢰 경계 (Trust Boundary) | CORE |
| 프롬프트 인젝션 (Prompt Injection) | CORE |
| 간접 프롬프트 인젝션 (Indirect Prompt Injection) | CORE |
| 탈옥 (Jailbreak) | CORE |
| 컨텍스트 오염 (Context Contamination) | EXTENDED |
| 신뢰할 수 없는 검색 결과 (Untrusted Retrieval) | EXTENDED |
| 출처 / Provenance | CORE |
| 근거 연결 (Grounding) | CORE |
| 데이터 유출 (Data Leakage) | CORE |
| 정보 탈취 (Exfiltration) | EXTENDED |
| 민감정보 최소화 | CORE |

### ACTION / TOOLS

| Term | Depth |
|---|---|
| 도구 사용 (Tool Use) | CORE |
| Tool Call Request | CORE |
| Tool Execution | CORE |
| 하네스 (Harness) | CORE |
| 런타임 (Runtime) | EXTENDED |
| 권한 / 정책 검사 (Permission / Policy Check) | CORE |
| API | CORE |
| MCP (Model Context Protocol) | CORE |
| 커넥터 (Connector) | EXTENDED |
| 플러그인 / 확장 | EXTENDED |
| 권한 (Permission) | CORE |
| 최소권한 (Least Privilege) | CORE |
| 허용 목록 (Allowlist) | EXTENDED |
| 혼란된 대리인 (Confused Deputy) | EXTENDED |
| 도구 오용 (Tool Misuse) | CORE |
| 과도한 권한 (Excessive Permission) | CORE |
| 허가되지 않은 행동 (Unauthorized Action) | EXTENDED |
| 공급망 위험 (Supply-chain Risk) | CORE |
| 샌드박스 / 격리 (Sandbox) | CORE |
| Blast Radius | CORE |
| 자격증명 (Credentials) | EXTENDED |
| 원격 코드 실행 (RCE) | TECHNICAL |
| 명령어 주입 (Command Injection) | TECHNICAL |
| 권한 상승 (Privilege Escalation) | TECHNICAL |

### AUTONOMY

| Term | Depth |
|---|---|
| 자동화 (Automation) | CORE |
| 자율성 (Autonomy) | CORE |
| 에이전트 (Agent) | CORE |
| 워크플로 (Workflow) | CORE |
| 목표 (Goal) | CORE |
| 관찰 (Observe) | EXTENDED |
| 판단 / 계획 (Decide / Plan) | EXTENDED |
| 행동 (Act) | EXTENDED |
| 반복 구조 / Loop | CORE |
| 트리거 (Trigger) | CORE |
| Manual | CORE |
| Scheduled | CORE |
| Event-triggered | CORE |
| Condition-triggered | CORE |
| L0 응답형 | CORE |
| L1 도구보조형 | CORE |
| L2 감독수행형 | CORE |
| L3 목표위임형 | CORE |
| L4 지속위임형 | CORE |
| 지속성 (Persistence) | CORE |
| 목표 이탈 (Goal Drift) | EXTENDED |
| 과잉 대리 (Excessive Agency) | EXTENDED |
| 연쇄 실패 (Cascading Failure) | CORE |
| 지속되는 오류 (Persistent Error) | EXTENDED |
| 감독 공백 (Oversight Gap) | EXTENDED |
| 범위 제한 (Scope) | CORE |
| 승인 지점 (Approval Gate) | CORE |
| 정지 조건 (Stop Condition) | EXTENDED |
| 행동 한도 (Rate / Action Limit) | EXTENDED |
| 멀티에이전트 (Multi-agent) | EXTENDED |

### CONTROL PLANE

| Term | Depth |
|---|---|
| Control Plane | CORE |
| 사람의 개입 (Human-in-the-Loop, HITL) | CORE |
| 자동화 편향 (Automation Bias) | CORE |
| 승인 피로 (Approval Fatigue) | CORE |
| 관찰 가능성 (Observability) | CORE |
| 기록 (Logging) | CORE |
| 감시 (Monitoring) | CORE |
| 정지 (Stop) | CORE |
| 복구 (Recovery) | CORE |
| 거버넌스 (Governance) | CORE |
| 가역성 (Reversibility) | CORE |
| GREEN | CORE |
| YELLOW | CORE |
| RED | CORE |
| 가드레일 (Guardrail) | EXTENDED |
| 안전 (Safety) | CORE |
| 보안 (Security) | CORE |

### MODEL / SYSTEM APPENDIX TERMS

| Term | Depth |
|---|---|
| Open-weight | CORE |
| Open-source | CORE |
| 벤치마크 (Benchmark) | EXTENDED |
| 오염 (Benchmark Contamination) | EXTENDED |
| 파인튜닝 (Fine-tuning) | CORE |
| AGI | EXTENDED |

## 6. Publication vs education versions

Use one dataset, two presentations.

### Publication glossary
Compact reference appendix.

Suggested entry fields:
- term
- English / acronym
- one-line understanding
- concise definition
- related term

### Educational expanded glossary
Full reference package.

Adds:
- why it matters
- misconception
- confusing pairs
- examples
- cross-links
- activity links

Do not maintain two independently written sets of definitions.

## 7. PWA relationship

The future PWA Learning Lab may use the glossary as contextual help, but the glossary itself should not become the app's main activity.

Examples:
- learner taps `Trust Boundary` inside Context Lab → short glossary card opens
- learner gets an Autonomy question wrong → links to `Automation`, `Autonomy`, `Trigger`
- Case Lab explanation links to `Hallucination`, `Approval Fatigue`, `Confused Deputy`

The glossary should therefore be stored in a reusable structured format later (JSON or JS data), generated from the same approved source text.

## 8. Next writing stage

Before writing all entries, produce:

1. final term inventory audit against the manuscript
2. CORE / EXTENDED / TECHNICAL classification audit
3. 10-entry style pilot
4. glossary style freeze
5. full glossary writing
6. confusing-pair comparison pages
7. printable publication layout

Do not invoke Codex for glossary content writing. Codex becomes useful after the glossary data structure and approved entry text are frozen.
