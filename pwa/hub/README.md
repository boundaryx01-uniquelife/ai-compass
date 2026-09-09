# AI Compass Hub v2

INTRO → EXPLORE → LEARN → READ → TEACH를 연결하는 vanilla HTML/CSS/JavaScript PWA입니다. 구현은 이 폴더에 한정합니다. 기존 Glossary와 Analysis Canvas는 수정하지 않습니다.

## 실행

저장소 루트에서 정적 파일을 제공합니다.

```powershell
cd C:\dev\ai-compass
python -m http.server 8877 --bind 127.0.0.1
```

[로컬 Hub](http://127.0.0.1:8877/pwa/hub/) · [기존 Glossary](http://127.0.0.1:8877/pwa/glossary/)

정적 파일 제공 이외의 백엔드, API, 로그인, DB, 외부 폰트, CDN은 없습니다. localhost 또는 HTTPS가 필요합니다. `file://` 직접 실행은 지원하지 않습니다.

## Routes

| 경로 | 기능 |
| --- | --- |
| `#/intro` | 한 화면 중심 진입 |
| `#/explore/system` | 용도와 시스템 구조 |
| `#/explore/model`, `context`, `action`, `autonomy`, `control` | 여섯 주제 중 해당 화면 |
| `#/learn/glossary` | 기존 Glossary 검색 |
| `#/learn/glossary/:term` | 기존 CORE 상세 |
| `#/learn/compare`, `#/learn/compare/:pair` | 기존 15개 비교 |
| `#/learn/quiz` | 기존 무작위 5문제 |
| `#/learn/case/hidden-instruction` | 숨은 지시 사례 |
| `#/learn/case/hallucinated-record` | 환각 기록 사례 |
| `#/learn/case/drive-agent` | 공유 드라이브 사례 |
| `#/read/:part/page-:n` | Part/페이지 section 탐색, 총 53개 |
| `#/read` | 마지막 읽기 위치 또는 첫 페이지 |
| `#/teach` | 첫 입문 덱 |
| `#/teach/compass-intro/:slide` | 지정 슬라이드 |

READ part 값: `front`, `part-0`~`part-7`, `appendices`, `appendix-a`~`appendix-g`.
예: `#/read/part-4/page-23`, `#/read/appendix-g/page-52`.
TEACH slide 값은 `data/teacher-deck.json`의 안정적인 `id`입니다.

## 원고 보존

- READ는 **docs/manuscript의 여섯 Markdown 파일만** fetch하여 읽습니다.
- 53개 PDF 페이지 표시를 Part/Section 경계로 사용합니다. PDF에서 다음 페이지로 이어지는 문장은 다음 section에 그대로 이어집니다.
- 파일 설명용 첫 제목/전사 메타데이터와 PDF page 주석은 본문에서 제외합니다. 각 페이지 안의 본문은 그대로 렌더링합니다.
- HTML escaping, Markdown 제목의 semantic heading 표시, 문단별 분리만 수행합니다. 임의 요약·교정·문장 재작성·누락 보충은 하지 않습니다.
- `ebook.json`은 경로·Part·페이지·관련 용어·SHA256 매핑입니다. 별도 원고 사본이 아닙니다.
- 앱 시작 때 정규화된 페이지 본문의 SHA256을 확인합니다. 소스/매핑이 다르면 읽기를 중단하고 오류를 표시합니다.
- Appendix G는 원문에 있는 빈 양식 그대로입니다.
- 표와 도식은 전사본의 줄 순서를 유지합니다. 관계가 불명확한 부분은 재구성하지 않았습니다. 특히 33쪽 가역성 행, 43쪽 색상 표시는 PDF 대조가 필요합니다.
- 책갈피 대신 마지막 읽기 위치를 자동 기록하며, 모바일 목차는 패널로 엽니다.

## Glossary 재사용

같은 출처의 `../glossary/` 앱을 제목이 있는 iframe 내부 패널에서 재사용합니다. CORE 30 정의, 검색 정규화, 비교 매핑, 퀴즈, 즐겨찾기, localStorage가 기존 코드 그대로 동작합니다. 별도 창 링크도 제공합니다. iframe 내부 상세/비교 이동은 Hub hash에 반영합니다.

EXPLORE 역시 canonical Glossary JSON을 읽어 표시하며 정의 사본을 만들지 않습니다. 원문 READ와 용어집 설명은 각자의 원본을 따로 유지합니다. 퀴즈는 페이지를 새로 열면 새 세션이며 완료 기록은 기존 Glossary 저장소에 남습니다.

## Teacher Deck

12장 입문용 덱입니다. 42장 60–90분 본강의 완성본으로 표시하지 않습니다.

- 학생 화면: 한 장의 핵심 문장과 구조/키워드.
- Audience Mode: 교사 패널을 DOM에서 제외합니다. 새로 열거나 다른 모듈에서 돌아오면 Audience가 기본입니다.
- Teacher Mode: Quick Note, Full Teaching Script, 예상 시간, 질문, 오개념, 강조, 원고/용어/사례 링크.
- 이전/다음 버튼, 선택기, 좌우 방향키로 이동합니다.
- 전체화면은 학생용 article만 대상으로 합니다. 교사 노트는 화면에 포함되지 않습니다. Esc로 해제합니다.
- 교사 노트는 공개 교육 콘텐츠로서 숨김 UI이며 인증이나 접근 제한 장치는 아닙니다.
- `full_script`는 **향후 PPTX Speaker Notes에 직접 사용할 문자열**입니다. PPTX 생성은 이번 범위에 없습니다.
- 원고 발췌와 수업용 도입·질문·오개념 교정·연결 문장을 구분하고, 슬라이드별 source file/page/excerpt를 보존합니다.
- 수업용 파생 초안이며 기존 승인된 PPTX를 이관했다고 주장하지 않습니다.

## Case Lab

세 가지 원본 Case Card를 사용하여 사건 제시 → 시작점 → 증폭 조건 → 통제 → 구조 연결을 구현했습니다. 자유 서술을 기기 내에 기록하고 해설을 펼쳐 비교합니다. 자동 채점이나 위험 점수는 없습니다.

## 파일 / 재생성

- `index.html`, `styles.css`, `app.js`: 화면과 상호작용
- `router.js`, `storage.js`, `manuscript.js`: 경로, Hub 로컬 저장, 원고 렌더링
- `data/hub.json`: 주제와 연결 메타데이터
- `data/ebook.json`: 53페이지 출처 매핑
- `data/teacher-deck.json`: 12장 학생/교사 콘텐츠와 출처
- `data/cases.json`: 세 사례 조사 데이터
- `build-data.py`: 원고 기반 매핑 및 교육 데이터 생성기
- `manifest.webmanifest`, `service-worker.js`, SVG/PNG 아이콘: 설치·오프라인
- `tests/`: 40개 acceptance, 결과 JSON, 보호 대상 해시, 화면 캡처

```powershell
python pwa/hub/build-data.py
```

재생성은 원고를 수정하지 않습니다. 관련 용어/원고 페이지의 실제 연결을 확인한 뒤 실행하세요. 보호 대상 baseline은 기존 파일이 있으면 갱신하지 않습니다.

## 테스트

개발 검증만 Node.js, Playwright와 Edge를 사용합니다. 앱의 런타임 의존성이 아닙니다.

```powershell
$env:PLAYWRIGHT_MODULE='C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node pwa/hub/tests/acceptance.cjs
```

일회용 Edge 프로필에서 실행하며 사용자 기록을 변경하지 않습니다. `HUB_URL`로 기본 로컬 주소를 변경할 수 있습니다. 결과는 `tests/results.json`에 저장합니다.

## 오프라인 / 배포 경계

Hub SW는 Hub 파일·네 데이터·canonical Glossary JSON·여섯 원고를 캐시합니다. 별도 scope로 기존 Glossary SW도 등록하여 아직 방문하지 않은 Glossary 화면까지 오프라인 준비합니다. 준비 완료 상태를 확인한 뒤 연결을 끊으세요.

Hub SW의 정리 대상은 `ai-compass-hub-v2-`로 한정합니다. 다른 PWA 캐시를 제거하지 않습니다. 리소스 변경 시 캐시 버전을 올려야 하며 새 버전은 기존 Hub 탭을 닫은 뒤 활성화됩니다.

Pages workflow는 변경하지 않았습니다. 정적 호스팅 시 저장소 상대 경로의 `pwa/glossary/`, canonical Glossary JSON, `docs/manuscript/` 여섯 파일을 함께 제공해야 합니다. Hub 폴더만 독립 배포하면 원본 소스를 로드할 수 없습니다.

## 편집 / 미이관 범위

[ACCEPTANCE.md](./ACCEPTANCE.md)에 검증 결과와 제한을 기록했습니다.

- 본문: 53/53페이지 전체 이관. Appendix G의 제품 정보는 의도적으로 미작성.
- 원본 PDF의 정교한 도식·표 레이아웃: 전사 순서로 표시, 시각 복원은 미이관.
- Teacher Deck: 첫 12장 수업용 파생 덱만 구현. 42장 본강의 전체, 다른 대상별 덱, PPTX 및 Speaker Notes 파일 생성은 미이관.
- 실제 교사의 스크립트 소요 시간·수업 문장 편집 검수 필요.
- 기존 Glossary의 원고↔JSON 축약/누락 편집 이슈는 그대로 보존하며 자동 수정하지 않음.
- 실기기 홈 화면 설치와 전체 스크린리더 흐름은 별도 수동 확인 필요.
