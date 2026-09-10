# AI Compass Hub v2

INTRO · EXPLORE · LEARN · READ · TEACH를 연결하는 정적 학습 허브입니다. 승인된 Hub v2 Handoff, Manuscript Source Addendum, UX Spec을 기준으로 구현했습니다.

## 브랜치와 병합

- 작업 브랜치: `feat/ai-compass-hub-v2`
- 구현 전 `origin/main`을 fetch하고 병합했습니다. 충돌 없음.
- 병합 커밋: `821e64b`
- 반영한 main: `dbe5a67`
- main의 최종 원고 PDF, 강의 PDF/PPTX 3개 파일이 포함됩니다.
- 로컬에 있던 동일한 미추적 바이너리는 해시 일치를 확인하고 임시 디렉터리에 보존한 뒤 Git 추적 파일로 병합했습니다.

## 실행

저장소 루트에서 Python 3으로 실행합니다. 앱에 빌드·패키지 설치·외부 API는 필요 없습니다.

```powershell
cd C:\dev\ai-compass
python -m http.server 8877 --bind 127.0.0.1
```

URL: <http://127.0.0.1:8877/pwa/hub/>

이 사무실 PC의 Python 절대 경로:

```powershell
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8877 --bind 127.0.0.1
```

`file://`로 열지 마세요. 원본 용어 JSON과 독립 Glossary를 읽으므로 저장소 루트를 제공해야 합니다. `pwa/hub/` 폴더만 배포하는 구성은 지원하지 않습니다. 원격 배포에는 HTTPS가 필요합니다.

GitHub Pages 워크플로는 Hub와 기존 Glossary, 공용 용어 데이터, 원본 PDF/PPTX를 하나의 정적 사이트로 묶습니다. 저장소 Pages 루트는 `pwa/hub/#/intro`로 이동하며 독립 Glossary 주소도 계속 유지됩니다. 기능 브랜치에서는 Actions의 `workflow_dispatch`로 배포 화면을 갱신하고, `main` 반영 후에는 관련 파일 변경 시 자동 배포됩니다.

## 화면과 라우트

| 영역 | 경로 | 동작 |
|---|---|---|
| INTRO | `#/intro` | 기본 진입 화면, Control이 네 능력 축을 감싸는 구조 |
| EXPLORE | `#/explore/system`, `model`, `context`, `action`, `autonomy`, `control` | 독립 주제 6개, 이전/다음, 관련 개념·원고·사례 |
| LEARN | `#/learn/glossary` | CORE 30 검색 |
| 용어 바로가기 | `#/learn/glossary/<term-id>` | 관련 원고·슬라이드에서 특정 용어 연결 |
| 비교 | `#/learn/compare`, `#/learn/compare/<pair-id>` | 기존 15개 비교 |
| 학습 | `#/learn/quiz` | 기존 무작위 5문제 세션 |
| 사례 목록 | `#/learn/case` | 세 사례의 진입점과 준비 상태 |
| Case A | `#/learn/case/hidden-instruction` | 사건 제시 → 시작점 → 증폭 → 통제 → 구조 연결 |
| Case B/C | `#/learn/case/student-record`, `#/learn/case/shared-drive` | 활동 준비 안내와 전체 원고 링크 |
| READ | `#/read`, `#/read/<part>/<section>` | 53쪽 전체, 목차, 현재 위치, 이전/다음, 용어 연결 |
| TEACH | `#/teach`, `#/teach/core/<1–42>` | 학생/교사 모드, 키보드 좌우 이동, 전체화면 |

READ 예: `#/read/part4/p22`. `#/read`는 마지막 읽은 위치로 돌아갑니다. 구간은 전사본의 PDF 쪽 경계에 맞췄고 Part·부록별 목차로 묶었습니다.

## 데이터와 원문 보존

`data/`의 네 JSON은 `build-data.py`로 생성됩니다. 원본을 바꿀 때만 개발 환경에서 다시 생성하고 검증합니다. 앱 실행에는 Python이 필요하지 않으며 정적 파일 서버만 사용합니다.

- `hub.json`: 6개 탐색 주제, 질문, 관련 용어 ID, 원고 및 비교 경로
- `ebook.json`: 전사본 6개 파일 → PDF 53쪽 전체 구간, 출처·원본 SHA-256
- `teacher-deck.json`: 실제 PPTX 42장의 텍스트, Quick Note, Full Teaching Script, 질문·관련 원고·용어·활동
- `cases.json`: Case A의 완전한 조사 활동과 B/C의 원고 진입점

READ 원문은 `docs/manuscript/00_...`부터 `05_...`까지의 전사본에서 직접 변환했습니다. 안내용 파일 머리말과 PDF 매핑 주석만 본문에서 제외하고, 원문 문구는 요약하거나 수정하지 않았습니다. CRLF/LF 정규화와 HTML 제목·문단 변환만 적용합니다. 전체 53쪽의 실제 브라우저 본문과 전사본을 공백·제목 마크업 정규화 후 대조합니다.

Teacher Deck은 PPTX의 텍스트 상자 단위로 추출해 줄바꿈과 의미 묶음을 보존합니다. 원래 노트는 짧거나 없는 장이 많습니다. `full_script`는 **실제 원고의 대응 구절과 슬라이드 문장, 수업 질문으로 구성한 웹 강의 설명문**이며, 원래 PPTX에 완성된 대본이 있었다는 뜻은 아닙니다. 원래 발표 노트는 `source.original_notes`, 각 설명의 출처는 `source.manuscript`와 `source.page`에 기록합니다. 질문은 해당 내용에 맞춘 교육 활동 문구입니다. 소요 시간은 수업용 추정값입니다.

Glossary 정의는 Hub 코드나 데이터로 복사하지 않습니다. `../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json`에서 읽으며, 교사용 오개념 역시 term ID로 원본을 참조합니다.

```powershell
python pwa/hub/build-data.py
```

## 기존 앱 재사용

`pwa/glossary/`는 삭제·이동·편집하지 않았습니다. Hub의 LEARN 내부 프레임에서 기존 검색·비교·퀴즈·저장·검증 로직을 그대로 실행합니다. 프레임 인스턴스에만 표시용 CSS를 추가해 독립 앱의 상단 헤더·하단 메뉴를 숨깁니다. 독립 URL은 그대로 사용할 수 있습니다.

프레임 내부의 상세 탐색은 기존 Glossary 경로와 히스토리를 사용합니다. Hub의 상위 주소가 모든 프레임 내부 이동을 반영하는 구조는 아닙니다. 직접 공유할 용어·비교는 위 표의 Hub 바로가기 경로 또는 독립 Glossary 링크를 사용할 수 있습니다.

`pwa/v2/`는 변경하지 않았습니다.

## 저장과 오프라인

- 읽기 위치: `aiCompass:hub:reading`
- 즐겨찾기·학습 기록: 기존 `aiCompass:glossary:*` 사용
- 교사 모드: 현재 세션에서만 유지, 새 접속은 Audience Mode
- Case Lab 선택: 현재 세션 메모리에서 유지
- 개인정보·검색 기록·서버 전송 없음

처음 온라인 접속 시 Hub 및 기존 Glossary의 서비스 워커를 각각 등록합니다. 하단에 `오프라인 사용 준비 완료`가 표시된 뒤 핵심 화면을 오프라인으로 사용할 수 있습니다. 처음부터 LEARN을 열지 않았어도 오프라인에서 접근 가능합니다.

Hub 캐시는 `ai-compass-hub-v2-` 전용 이름만 정리합니다. Glossary 등 다른 앱의 캐시는 삭제하지 않습니다. 코드·생성 데이터·재사용 Glossary 변경 시 `service-worker.js`의 CACHE 버전을 올리고 새로고침하세요. 원본 PDF/PPTX 파일은 용량을 고려해 오프라인 캐시에 포함하지 않습니다. HTML 원고와 웹 강의 데이터는 포함합니다.

## 검증

`ACCEPTANCE.md`에 handoff 40개 항목과 smoke A–F를 개별 기록했습니다. `acceptance-results.json`은 실제 브라우저 실행 결과이며 `qa/`에 화면을 남겼습니다.

Node.js, Playwright, Edge가 있는 개발 환경에서 정적 서버를 켠 뒤 실행합니다.

```powershell
$env:PLAYWRIGHT_MODULE='C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node pwa/hub/acceptance.cjs
```

일반 Node 모듈 위치에 Playwright가 설치되어 있으면 환경변수를 생략할 수 있습니다. 이는 개발 검증 의존성이며 앱 배포물은 외부 런타임 라이브러리를 요청하지 않습니다.

## 미해결 표시·편집 사항

- 전사본의 표·도식은 추출 순서와 줄바꿈이 남아 있습니다. 특히 PDF 33쪽 사례 비교의 가역성 행, 43쪽 신호등 표시는 셀/색 대응이 충분히 명확하지 않습니다. 추정해서 채우지 않고 전사 텍스트 순서를 보존했습니다. READ의 원본 PDF 링크로 확인할 수 있습니다.
- 전사본 부록 F의 “본문 5층” 같은 표현도 내용 잠금에 따라 그대로 표시합니다. Hub의 구조도에서는 Control을 다섯 번째 능력층으로 만들지 않습니다.
- 교사용 스크립트는 수업 현장에서 강의 길이와 어조를 추가 검토할 수 있습니다. 원래 PPTX 노트의 완전한 전사본으로 오인하면 안 됩니다.
- Android/iOS 실기기 설치, 실제 스크린리더, 전체 WCAG 감사는 미검증입니다.

## Intentionally unmigrated content

- Case B/C의 **단계형 인터랙션**은 미이관. 전체 사건 원고는 READ에 있습니다.
- Appendix G의 최신 제품 정보는 의도적으로 채우지 않았습니다. 기존 빈 양식과 작성 안내만 보존합니다.
- 원문 표의 불명확한 셀 관계를 새 표로 재구성하지 않았습니다.
- 기존 PPTX의 장식·좌표·도형을 픽셀 단위로 복제하지 않았습니다. 텍스트 상자 내용을 웹 레이아웃으로 변환했습니다.
- 새 PPTX 생성, 복수 강의 덱, 인쇄물, 외부 제품 정보 갱신은 이번 범위 밖입니다.
- 본문 Part 0–7 및 Appendix A–G의 전사 텍스트 자체는 **53쪽 모두 이관**했습니다.

## 집/사무실 이어하기

작업 전 로컬 변경을 확인한 뒤 같은 브랜치를 가져옵니다.

```powershell
git status --short --branch
git fetch origin
git switch feat/ai-compass-hub-v2
git pull --ff-only origin feat/ai-compass-hub-v2
```

미커밋 변경은 먼저 보존합니다. 분기된 이력은 확인 후 병합하고 강제 push/reset으로 덮어쓰지 않습니다. 읽기 위치·즐겨찾기·학습 기록은 PC 간 자동 동기화되지 않습니다.
