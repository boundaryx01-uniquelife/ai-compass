# AI Compass Hub v2 Acceptance

검증 시각: 2026-09-10T03:46:30.733Z

Windows / Microsoft Edge(headless) / Playwright. 데스크톱 1366×768, 모바일 375×812 및 320×812.

**40 PASS / 0 FAIL**

| # | Handoff Acceptance Criterion | 결과 |
|---|---|---|
| 1 | Hub loads from `/pwa/hub/`. | PASS |
| 2 | Intro is the front door. | PASS |
| 3 | Intro fits desktop viewport without vertical scrolling at a common laptop size. | PASS |
| 4 | Intro communicates MODEL / CONTEXT / ACTION-TOOLS / AUTONOMY / CONTROL structure. | PASS |
| 5 | CONTROL is not rendered as Layer 5. | PASS |
| 6 | Global navigation reaches EXPLORE / LEARN / READ / TEACH. | PASS |
| 7 | EXPLORE has six separate topic routes/views. | PASS |
| 8 | EXPLORE is not implemented as one long vertical article. | PASS |
| 9 | Glossary CORE 30 search still works in Hub. | PASS |
| 10 | Korean/English/acronym glossary search works. | PASS |
| 11 | 15 compare pairs remain reachable. | PASS |
| 12 | EXTENDED comparison concepts do not get invented full definitions. | PASS |
| 13 | 5-question learning session works. | PASS |
| 14 | learning result does not become an aggregate ability/risk score. | PASS |
| 15 | at least one Case Lab scenario is fully usable. | PASS |
| 16 | READ has real source-derived content. | PASS |
| 17 | READ has TOC. | PASS |
| 18 | READ has previous/next navigation. | PASS |
| 19 | READ indicates current section. | PASS |
| 20 | READ glossary links work where mapped. | PASS |
| 21 | TEACH contains a usable first deck. | PASS |
| 22 | TEACH slides have student view. | PASS |
| 23 | TEACH slides have Quick Note. | PASS |
| 24 | TEACH slides have Full Teaching Script. | PASS |
| 25 | Audience Mode hides teaching script. | PASS |
| 26 | Teacher Mode shows teaching support. | PASS |
| 27 | Teacher Mode shows teacher question where available. | PASS |
| 28 | Teacher Mode shows misconception where available. | PASS |
| 29 | slide navigation works by button/keyboard. | PASS |
| 30 | desktop slide view avoids document-length vertical scrolling. | PASS |
| 31 | mobile has no horizontal overflow. | PASS |
| 32 | Hub uses no external runtime API/server/login/database. | PASS |
| 33 | canonical glossary definitions are not duplicated into Hub code. | PASS |
| 34 | `pwa/glossary/` remains functional. | PASS |
| 35 | `pwa/v2/` is not modified. | PASS |
| 36 | frozen conceptual rules above remain intact. | PASS |
| 37 | service worker does not indiscriminately remove other app caches. | PASS |
| 38 | basic offline reload works after initial load. | PASS |
| 39 | keyboard focus is visible. | PASS |
| 40 | no KoPub font binary is committed. | PASS |

## Smoke A–F

브라우저 자동화로 시나리오의 동작을 재현하고 주요 화면 캡처를 육안 확인했습니다. 실기기 터치·수동 발표 리허설을 수행했다는 뜻은 아닙니다.

| Scenario | 확인 내용 | 결과 |
|---|---|---|
| A | 첫 방문 · 한 화면 Intro와 진입 | PASS |
| B | Autonomy · Trigger 분리와 관련 개념 | PASS |
| C | MCP · 원본 Glossary 검색 | PASS |
| D | eBook · 실원문, 목차, 이전/다음, 용어 연결 | PASS |
| E | Teacher Deck · Audience/Teacher 전환과 대본 | PASS |
| F | 모바일 · 메뉴, 넘침, 내부 스크롤 | PASS |

## 검증 범위

- READ: 전사본 전체 53쪽과 생성 JSON을 CRLF/LF 정규화 후 대조하고, 각 쪽의 실제 렌더링 문구를 공백·제목 마크업 정규화 후 대조했습니다.
- TEACH: 실제 PPTX 42장의 데이터와 지원 필드를 확인하고 Audience Mode의 모든 장에서 데스크톱 내부 넘침을 검사했습니다. 교사 설명 패널은 의도적으로 내부 스크롤됩니다.
- Offline: 새로운 브라우저 프로필에서 Intro만 방문한 뒤 네트워크를 끊고 새로고침하여 READ·TEACH·EXPLORE·Case A·Glossary·Compare·Quiz를 확인했습니다.
- 기존 Glossary와 pwa/v2, 동결 원고/정의 파일의 변경 없음도 검사했습니다.
- 원본 PDF/PPTX 다운로드의 오프라인 사용, 실기기 설치, 전체 WCAG/스크린리더 감사, 향후 캐시 버전 변경의 운영 누락은 검증 범위 밖입니다.
- 표 추출의 불명확한 셀 관계, Case B/C 활동, Appendix G 및 미이관 범위는 README.md를 참조하세요.
