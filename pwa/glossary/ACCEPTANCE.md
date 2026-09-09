# Glossary PWA v1 Acceptance

검증 시각: 09/09/2026 01:15:32

환경: Windows / Microsoft Edge(headless) / Playwright. 로컬 정적 서버에서 실제 브라우저로 검증했습니다.

| # | 항목 | 결과 |
|---|---|---|
| 1 | JSON 로드 및 형식·버전 검증 | PASS |
| 2 | CORE 30 전체 노출 및 검색 | PASS |
| 3 | 15개 비교 접근 | PASS |
| 4 | 공급된 퀴즈 전체 사용 가능 | PASS |
| 5 | 원본 정의와 화면 내용 일치 | PASS |
| 6 | RAG 한국어·약어·영문 검색 | PASS |
| 7 | MCP 약어·영문 검색 | PASS |
| 8 | 샌드박스 검색 | PASS |
| 9 | 빈 검색 CORE 목록 | PASS |
| 10 | 검색 결과 없음 안내 | PASS |
| 11 | 관련 CORE 링크 정확성 | PASS |
| 12 | 브라우저 뒤로 가기 | PASS |
| 13 | 정적 호스팅 hash 새로고침 | PASS |
| 14 | 자동화 / 자율성 | PASS |
| 15 | 트리거 / 자율성 단계 | PASS |
| 16 | Prompt Injection / Jailbreak | PASS |
| 17 | Logging / Observability | PASS |
| 18 | EXTENDED 정의 임의 생성 없음 | PASS |
| 19 | 중복 없는 5문제 세션 | PASS |
| 20 | 즉시 피드백·해설 및 오답 연결 | PASS |
| 21 | 학습 결과 표현 | PASS |
| 22 | 즐겨찾기 새로고침 복원 | PASS |
| 23 | 학습 메타데이터 복원 | PASS |
| 24 | 손상된 localStorage 안전 복원 | PASS |
| 25 | 오프라인 전체 핵심 기능 | PASS |
| 26 | manifest·service worker·캐시 | PASS |
| 27 | 모바일 375px·320px 레이아웃 | PASS |
| 28 | 키보드 접근·포커스·펼치기 | PASS |
| 29 | Control 별도 횡단 구조 | PASS |
| 30 | 외부 런타임·API·서버 의존 없음 | PASS |

총 30 PASS / 0 FAIL.

추가 확인: node --check(app.js, storage.js), git diff --check 통과. 모바일 320px/375px 가로 넘침 없음. 원본 30개 정의·한 줄 설명·오해·바로잡기·사례·원고 위치를 화면과 대조했습니다.

오프라인 검증은 Playwright 브라우저 컨텍스트의 네트워크를 차단한 뒤 각 화면을 다시 열어 수행했습니다. 퀴즈 전체 10개는 반복 무작위 세션에서 모두 출현하고 응답 가능한지 확인했습니다.

키보드는 검색 입력, Enter로 펼치기, Space로 즐겨찾기, visible focus, 현재 메뉴 표시를 확인했습니다. 전체 WCAG 감사나 실제 스크린리더 검증을 뜻하지 않습니다.

Android/iOS 실기기 설치 및 홈 화면 실행은 미검증입니다. 설치용 manifest와 SVG·192/512px PNG 아이콘은 제공했습니다.

변경 범위는 pwa/glossary/에 한정하며 pwa/v2 및 동결 원고/JSON 변경은 없습니다.
