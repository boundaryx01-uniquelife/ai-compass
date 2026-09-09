# Hub v2 Acceptance

검증: 2026-09-09T22:42:48.228Z · Windows / Edge headless / 1366×768, 320×812, 375×812

**36 PASS / 4 FAIL**. 원본 강의 복원 이후 결과이며 종전 12장 파생 덱의 40 PASS 보고를 대체합니다.
원래 acceptance 기준을 완화하지 않았습니다. Smoke A/B/C/D/F PASS, E FAIL.
Chromium 설치 가능 조건 PASS, JavaScript 오류 0. 실기기 설치 검증은 아닙니다.

| # | Handoff 원래 기준 | 결과 |
| --- | --- | --- |
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
| 23 | TEACH slides have Quick Note. | FAIL |
| 24 | TEACH slides have Full Teaching Script. | FAIL |
| 25 | Audience Mode hides teaching script. | PASS |
| 26 | Teacher Mode shows teaching support. | PASS |
| 27 | Teacher Mode shows teacher question where available. | FAIL |
| 28 | Teacher Mode shows misconception where available. | FAIL |
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

## 남은 원본/편집 이슈
- 23: Quick Note 17/42. 원본에 없는 25장은 미제공.
- 24: Full Teaching Script 0/42. 원본에 없어 생성하지 않음.
- 27, 28: 별도 교사 질문/오개념 필드 미제공. 슬라이드 본문 속 질문은 원본 화면과 텍스트에 그대로 보존.
- 원고 53쪽 및 Appendix G 빈 양식, Glossary, pwa/v2 보호 해시 검사 PASS.
- 42장 화면의 온라인·오프라인 로드 PASS. 원본 파일 SHA256 일치 PASS.
- 원고 전사본 표/도식의 시각 복원, 별도 PPTX 생성, 다른 대상별 강의는 이번 복원 범위 밖.
- 변경은 pwa/hub 내부에 한정. 사용자 추가 PDF/PPTX는 그대로 보존.
