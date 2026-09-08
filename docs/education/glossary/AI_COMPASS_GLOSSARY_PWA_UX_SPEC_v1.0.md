# AI Compass Glossary PWA — UX Spec v1.0

Status: **UX FREEZE / IMPLEMENTATION READY**  
Content source: `docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`  
Primary audience: AI를 배우거나 가르치는 교사·강사·고등학생·일반 사용자

## 1. Product goal

AI Compass Glossary는 단순한 전자사전이 아니다.

사용자가 AI 용어를 **찾고, 헷갈리는 개념을 비교하고, 관련 개념을 따라가며, 짧게 반복 학습**할 수 있게 한다.

첫 방문자가 5초 안에 이해해야 하는 문장:

> **AI 용어가 헷갈리나요? 검색해서 찾고, 비슷한 개념을 비교하고, 관련 개념까지 연결해 보세요.**

사용자가 얻어야 하는 결과:

1. 모르는 AI 용어를 빠르게 찾는다.
2. 비슷하지만 다른 용어를 구분한다.
3. 해당 용어가 Model / Context / Action / Autonomy / Control 중 어디에 놓이는지 이해한다.
4. 짧은 퀴즈로 오개념을 확인한다.
5. AI Compass 원고를 읽거나 강의를 들을 때 다시 돌아와 참고할 수 있다.

## 2. Non-goals

v1에서 하지 않는다.

- 제품별 성능 순위
- 모델 벤치마크 비교
- 생성형 AI 챗봇 기능
- 외부 AI API 호출
- 사용자 계정·서버·DB
- 100개 이상의 대규모 백과사전
- 복잡한 네트워크 그래프 시각화
- Analysis Canvas 입력 기능

## 3. Home

첫 화면의 목적은 설명보다 행동 선택이다.

### Hero

**AI Compass Glossary**  
AI 시대의 개념을 찾고, 비교하고, 연결해서 이해하는 사전

본문:

> AI 용어가 헷갈리나요?  
> 검색해서 찾고, 비슷한 개념을 비교하고, 관련 개념까지 연결해 보세요.

주 행동:

`[ 🔍 AI 용어 검색 ]`

보조 행동 3개:

- `[ 핵심 용어 보기 ]`
- `[ 헷갈리는 용어 비교 ]`
- `[ 3분 학습 ]`

Hero 아래에는 현재 범위를 명시한다.

> **CORE 30** · AI Compass를 이해하는 데 먼저 필요한 핵심 개념

## 4. Global navigation

모바일 하단 또는 상단 탭 4개:

1. `찾기`
2. `비교`
3. `학습`
4. `분류`

별도 ‘설정’ 탭은 만들지 않는다. 즐겨찾기와 진행 기록은 각 화면에서 직접 접근한다.

## 5. Find / Search

### Search behavior

검색 대상:

- 한국어 용어명
- 영문명
- 약어
- aliases
- 한 줄 정의

검색은 대소문자를 구분하지 않는다.
공백과 `-`, `/` 차이는 가능한 범위에서 정규화한다.

예:

- `검색 증강 생성`
- `RAG`
- `retrieval augmented generation`

모두 RAG 카드에 도달할 수 있어야 한다.

### Empty search

검색어가 없을 때는 CORE 30 전체를 카드 목록으로 보여준다.

카드에는 다음만 표시:

- 한국어 용어
- 영문명 / 약어
- layer badge
- 한 줄 이해

### No result

> 찾는 용어가 CORE 30에 없습니다.  
> 영문명·약어로 다시 검색하거나 분류에서 탐색해 보세요.

외부 검색으로 보내지 않는다.

## 6. Term detail

한 화면에서 처음부터 모든 설명을 펼치지 않는다.

### Always visible

- 용어 / 영문명
- CORE badge
- Compass layer
- 한 줄 이해
- 정확히 말하면
- 관련 용어 chips

### Expandable sections

`왜 중요한가`는 CORE30 기준 원고에 직접 있을 때 표시한다. v1 JSON에 별도 필드가 없는 항목은 UI가 억지로 생성하지 않는다.

접기/펼치기:

- `⚠ 흔한 오해`
- `✓ 바로잡기`
- `🧪 짧은 사례`
- `📖 원고 위치`

### Related navigation

관련 용어 chip을 누르면 해당 카드로 이동한다.
브라우저 뒤로 가기가 자연스럽게 동작해야 한다.

예:

`Prompt Injection → Trust Boundary → Context → Memory`

## 7. Compare

이 기능은 Glossary의 핵심 차별점이다.

첫 화면:

> **비슷해 보이지만 다른 AI 용어**  
> 이름이 비슷해서가 아니라, 섞으면 판단이 틀어지는 쌍을 모았습니다.

`comparePairs` 15개를 카드로 표시한다.

카드 예:

```text
Automation        Autonomy
자동화        VS   자율성

정해진 것을 사람 없이 실행
          ≠
무엇을 할지 고를 수 있는 정도
```

터치 시 비교 상세:

- 왼쪽 한 줄 이해
- 오른쪽 한 줄 이해
- `한 줄 구분`
- 관련 CORE 카드 링크

EXTENDED 용어가 포함된 쌍은 해당 용어의 전체 카드가 없어도 비교 카드는 표시한다.
예: RAG / Fine-tuning, Prompt Injection / Jailbreak, Logging / Observability.

EXTENDED 쪽에는 `EXTENDED · 상세 카드 준비 중` badge를 표시할 수 있다.

## 8. Learn — 3 minute learning

목표는 점수 경쟁이 아니라 오개념 확인이다.

### Start

> **3분이면 충분합니다.**  
> 5문제를 풀고 오늘 헷갈린 개념만 다시 보세요.

버튼:

`[ 5문제 시작 ]`

### Quiz behavior

- `quiz` 데이터에서 5개를 무작위 선택
- 한 문제씩 표시
- 답 선택 즉시 정답/오답과 explanation 표시
- 다음 문제로 이동
- 문제를 틀리면 관련 용어 카드 바로가기 제공

### Finish

숫자형 ‘AI 실력 점수’는 만들지 않는다.

표시 가능:

- `5개 중 4개 확인`
- 틀린 개념 목록
- `[ 헷갈린 용어 다시 보기 ]`

저장:

- 마지막 학습 시각
- 최근 틀린 term ids
- 완료 횟수

localStorage만 사용한다.

## 9. Browse by Compass

`분류` 탭에서 AI Compass 구조로 탐색한다.

### SYSTEM
AI Model · AI Service · AI System · Agent

### MODEL — 무엇을 알고 있는가?
Training · Inference · LLM · Knowledge Cutoff · Hallucination

### CONTEXT — 지금 무엇을 보고 있는가?
Context · Prompt · RAG · Memory · Instruction Hierarchy · Trust Boundary · Prompt Injection · Indirect Prompt Injection

### ACTION / TOOLS — 무엇을 할 수 있는가?
Tool Use · Harness / Runtime · MCP · Permission · Least Privilege · Sandbox

### AUTONOMY — 얼마나 혼자 가는가?
Automation · Autonomy · Trigger

### CONTROL — 누가 멈추고 되돌릴 수 있는가?
Control Plane · HITL · Observability · Reversibility

Control은 다섯 번째 Capability Layer처럼 표현하지 않는다.
시각적으로 Capability Stack과 분리하여 `전체를 가로지르는 통제`라고 표시한다.

## 10. Favorites

각 term detail에 bookmark button 제공.

localStorage key 예:

`aiCompass:glossary:favorites`

찾기 화면에서 `즐겨찾기만` filter 제공.

로그인·동기화는 하지 않는다.

## 11. Reading depth

PWA에는 학년 구분 대신 정보 깊이를 사용한다.

1. **한 줄 이해**
2. **정확히 이해**
3. **오해 바로잡기 / 사례**

사용자가 기본 화면에서 부담 없이 핵심을 보고 필요할 때 펼친다.

## 12. Visual language

목표: 교육자료 느낌은 유지하되 ‘PDF를 웹에 붙인 화면’처럼 보이지 않게 한다.

권장 방향:

- 충분한 여백
- 큰 검색창
- 카드 중심
- layer badge
- 한글 가독성 최우선
- 과도한 gradient, glassmorphism, dashboard metric 금지

글꼴:

- 웹 배포물에는 저장소에 KoPub 폰트 파일을 포함하지 않는다.
- CSS는 `system-ui`, `Apple SD Gothic Neo`, `Noto Sans KR`, sans-serif 계열 fallback을 사용한다.
- 출판·PDF·슬라이드 산출물에서는 제공된 KoPub World 돋움체 M/B를 사용할 수 있다.

## 13. Responsive behavior

모바일 first.

권장 breakpoint:

- narrow: 0–639
- wide: 640+

모바일:

- 단일 열
- bottom navigation 가능
- 검색 입력 44px 이상 터치 높이

데스크톱:

- 최대 콘텐츠 폭 960–1100px
- 검색 결과 2열 가능
- 비교 상세는 2열 배치 가능

## 14. Accessibility

필수:

- semantic HTML
- keyboard navigation
- visible focus
- label/aria-label
- badge 의미를 색만으로 전달하지 않음
- 최소 터치 영역 확보
- `prefers-reduced-motion` 고려
- quiz feedback을 색만으로 표시하지 않음

## 15. Offline / PWA

핵심 기능은 네트워크 없이 작동해야 한다.

필수 캐시:

- index.html
- styles.css
- app.js
- glossary JSON
- manifest
- icon

외부 CDN, 외부 font, analytics SDK 금지.

## 16. State model

localStorage 예:

```text
aiCompass:glossary:favorites
aiCompass:glossary:learning
aiCompass:glossary:preferences
```

저장하지 않는 것:

- 검색어 히스토리
- 개인 식별 정보
- 서버 전송 데이터

## 17. URL behavior

가능하면 hash route 사용:

```text
#/find
#/term/prompt-injection
#/compare
#/compare/automation-autonomy
#/learn
#/browse
```

정적 호스팅에서도 새로고침 문제가 없게 한다.

## 18. MVP acceptance

1. 첫 화면에서 5초 안에 목적을 이해할 수 있다.
2. CORE 30이 모두 검색된다.
3. 한국어/영문/약어/alias 검색이 작동한다.
4. term detail에서 관련 용어로 이동할 수 있다.
5. 15개 헷갈리는 용어 비교 카드가 표시된다.
6. quiz 5문제 세션이 작동한다.
7. 오답에서 관련 용어를 다시 볼 수 있다.
8. Compass 구조별 탐색이 가능하다.
9. Control Plane이 다섯 번째 Capability Layer로 표시되지 않는다.
10. 즐겨찾기가 새로고침 후 유지된다.
11. 핵심 기능이 offline에서 동작한다.
12. 서버/API/login/database가 없다.
13. 모바일과 키보드로 사용할 수 있다.
14. aggregate AI/risk score를 만들지 않는다.

## 19. Future, not v1

- EXTENDED 30–40
- TECHNICAL 15–20
- Daily 5 / spaced repetition
- 인쇄 가능한 용어 카드
- 교사용 quiz set
- Learning Lab 연동
- 전체 개념 관계 시각화

## 20. Product sentence

AI Compass Glossary v1의 존재 이유를 한 문장으로 고정한다.

> **AI 용어를 외우는 사전이 아니라, 헷갈리는 개념을 구분하고 AI 시스템의 구조 속에 놓아 이해하는 학습 도구.**
