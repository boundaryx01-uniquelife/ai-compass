# AI Compass Glossary PWA v1

CORE 30 용어를 검색하고, 15개 비교 쌍을 살펴보고, 무작위 5문제로 오개념을 확인하는 독립 정적 PWA입니다.

구현 기준: `codex/AI_COMPASS_GLOSSARY_PWA_CODEX_HANDOFF_v1.0.md`.
기준 문서 6개를 지정 순서대로 읽고 구현했습니다. 기존 `pwa/v2/`, 원고와 용어 정의는 수정하지 않았습니다.

## 실행

저장소 루트에서 Python 3으로 실행합니다. 빌드나 npm install은 필요 없습니다.

```powershell
cd C:\dev\ai-compass
python -m http.server 8765 --bind 127.0.0.1
```

<http://127.0.0.1:8765/pwa/glossary/>

현재 사무실 PC에는 `python` 명령이 PATH에 없으므로 아래 명령으로도 실행할 수 있습니다.

```powershell
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8765 --bind 127.0.0.1
```

`file://`로 HTML을 열면 JSON fetch와 서비스 워커가 작동하지 않습니다. 서버 루트는 반드시 저장소 루트여야 합니다. 운영용 서버/API/DB는 없으며 위 서버는 로컬 정적 파일 제공용입니다.

## 파일

- `index.html`, `styles.css`: 모바일 우선 화면, 접근성, 4개 메뉴
- `app.js`: JSON 검증, 검색, hash 경로, 비교, 퀴즈, 분류
- `storage.js`: localStorage 검증·저장 실패 처리
- `manifest.webmanifest`, `service-worker.js`: 설치 메타데이터 및 버전별 오프라인 캐시
- `icon.svg`, `icon-192.png`, `icon-512.png`: 로컬 앱 아이콘
- `acceptance.cjs`: 개발용 Edge / Playwright 검증 스크립트
- `acceptance-results.json`: 30개 acceptance 실행 결과
- `ACCEPTANCE.md`: 항목별 검증표 및 한계
- `mobile-check.png`, `desktop-check.png`: 브라우저 검증 화면

콘텐츠는 `../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json` 한 곳에서 직접 로드합니다. 별도 사본이나 생성 정의는 없습니다. `app.js`의 비교 경로와 퀴즈 관련 용어 ID는 UI 탐색용 메타데이터입니다. JSON에 없는 `왜 중요한가`를 임의로 생성하지 않습니다.

## 집 ↔ 사무실 이어하기

작업 브랜치: `feat/glossary-pwa-v1`. 이 브랜치를 GitHub에 push하여 코드를 이어갑니다. 앱의 즐겨찾기·학습 기록은 브라우저 로컬 데이터이므로 PC 간 동기화되지 않습니다.

다른 PC에서 작업을 시작하기 전에:

```powershell
git status --short --branch
git fetch origin
git switch feat/glossary-pwa-v1
git pull --ff-only origin feat/glossary-pwa-v1
```

집 컴퓨터에 미커밋 작업이 있으면 먼저 해당 변경을 확인해 별도 커밋으로 보존하세요. `pull --ff-only`가 실패하면 두 PC의 커밋이 갈라진 것이므로 이력을 확인해 병합해야 합니다. 강제 push나 reset으로 덮어쓰지 않습니다. 같은 브랜치를 두 PC에서 동시에 편집하기보다 작업 시작 때 pull, 마칠 때 commit/push하는 방식으로 이어갑니다.

작업을 마칠 때 변경 파일을 확인한 뒤:

```powershell
git add pwa/glossary
git commit -m "feat: update AI Compass Glossary PWA"
git push origin feat/glossary-pwa-v1
```

이어하기 프롬프트:

> feat/glossary-pwa-v1 브랜치의 pwa/glossary/README.md와 ACCEPTANCE.md를 읽고 이어서 작업. 원본 JSON과 pwa/v2는 변경하지 말 것. 작업 전 원격 브랜치와 로컬 변경을 확인할 것.

## 검증 재실행

앱은 외부 런타임 의존성이 없습니다. 검증 스크립트만 별도로 Node.js, Playwright, Microsoft Edge를 사용합니다. 정적 서버를 실행한 상태에서 설치된 Playwright 경로를 지정합니다.

```powershell
$env:PLAYWRIGHT_MODULE='C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node pwa/glossary/acceptance.cjs
```

다른 컴퓨터에서 Playwright가 일반 모듈로 설치되어 있다면 환경변수 없이 실행할 수 있습니다. 검증 결과 JSON과 PNG는 재실행 시 갱신됩니다.

## 오프라인 및 유지보수

첫 접속 후 하단의 `오프라인 사용 준비 완료`를 확인하면 검색·상세·비교·학습·분류·즐겨찾기를 오프라인에서 사용할 수 있습니다. 서비스 워커 범위는 `pwa/glossary/`이며 다른 PWA의 캐시를 제거하지 않습니다. 루트 외부의 원본 JSON도 이 앱에서 요청할 때 캐시합니다.

앱 코드나 원본 데이터가 변경되면 `service-worker.js`의 `CACHE` 버전을 올려 모든 캐시가 일관되게 갱신되도록 해야 합니다. 새 워커가 활성화된 후 열린 화면을 새로고침하세요.

남은 확인: 실제 Android/iOS 기기의 홈 화면 설치와 스크린리더 낭독은 별도 기기 검증이 필요합니다. EXTENDED 상세 카드는 v1 범위 밖입니다.
