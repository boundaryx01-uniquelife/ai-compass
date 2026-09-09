# Hub v2 Acceptance

검증: 2026-09-09T12:53:20.456Z · Windows / Edge headless / 1366×768, 320×812, 375×812

**40 PASS / 0 FAIL**. Smoke A–F: 6 PASS. Chromium 설치 가능 조건 검사 PASS, 브라우저 JavaScript 오류 0.

실제 기기 설치를 수행했다는 의미는 아닙니다. 테스트는 로컬 정적 서버에서 실행했습니다.

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

## Smoke scenarios

| 시나리오 | 결과 |
| --- | --- |
| A | PASS |
| B | PASS |
| C | PASS |
| D | PASS |
| E | PASS |
| F | PASS |

## 검증 근거

- READ: 53개 route 각각 DOM 본문과 canonical 원고를 대조. 허용 변환은 Markdown heading marker 제거와 공백 레이아웃뿐이며 본문 글자 순서가 일치합니다. 앱에서도 각 페이지 SHA256을 검사합니다.
- Appendix G: 원문 일치와 미작성 날짜 양식 확인. 제품 데이터를 보충하지 않았습니다.
- 기존 Glossary 30개, 한/영/약어 검색, 15개 비교 route, 5문제 완료와 즐겨찾기 복원 확인.
- 보호된 기존 PWA와 원고/Glossary 소스는 시작 시점 해시와 대조했습니다.
- 모든 12장에 학생 콘텐츠와 원고에서 실제로 추출된 source excerpt, 교사 메모·스크립트가 있습니다. Audience에서는 notes DOM이 없음을 확인했습니다.
- 모바일에서 모든 모듈의 가로 넘침, 목차 패널, 교사 패널을 확인했습니다.
- 오프라인에서 Intro, READ, TEACH, Glossary 검색을 다시 열어 확인했습니다. 다른 PWA/sentinel cache도 남습니다.

## 편집 및 소스 이슈

1. PDF 33쪽 가역성 비교 행은 색상·셀 관계가 전사에서 소실되어 “가능”, “~” 등의 텍스트만 남아 있습니다. PDF 대조 전 의미를 채우지 않았습니다.
2. PDF 43쪽 가역성 체크 영역의 색상은 전사본에서 빠져 있습니다. 원문 그대로 표시합니다.
3. 추출형 줄바꿈/도식은 순서를 보존했으며 연결 관계를 추측해 semantic table로 재구성하지 않았습니다.
4. 12장 Teacher Deck은 원고와 강의 명세를 바탕으로 새로 작성한 수업용 파생 초안입니다. 원고 인용은 출처를 보존하고 진행 문장을 구분했습니다. 실제 수업 시간과 문장 편집 검수가 남아 있습니다.
5. Glossary의 기존 Agent 반복 문장 축약 등 편집 이슈는 원본 README에 기록된 상태를 보존했습니다. READ에는 Glossary를 대체 출처로 사용하지 않습니다.

## 미이관 / 한계

- 원고 본문 미이관: 없음 (53/53). Appendix G의 제품 정보는 원래처럼 비워 둠.
- 정교한 PDF 표/도식 시각 배치 복원, 42장 본강의 전체 및 파생 덱, PPTX 생성은 미이관.
- 실제 Android/iOS 홈 화면 설치, 전체 스크린리더 검증은 미실행.
- 정적 배포 workflow는 변경하지 않았으며 커밋을 자동 푸시하거나 배포하지 않음.
- 테스트 결과 파일: tests/results.json. 화면: tests/intro-desktop.png, tests/teach-desktop.png, tests/teach-mobile.png.
