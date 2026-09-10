# 작업 재개 — 2026-09-10 저녁 통합

브랜치: feat/ai-compass-hub-v2

## 현재 상태
- 학교의 Hub 40/40 구현, INTRO 이미지, 섹션 색상, GitHub Pages workflow를 집의 원본 강의 화면 복원과 병합했다.
- TEACH 학생 화면은 제공된 PDF의 42장 원본 배치를 사용한다. PPTX 텍스트도 `teacher-deck.json`에 보존한다.
- PPTX 발표자 노트는 17장이다. 나머지 Quick Note와 Full Script는 슬라이드·동결 원고를 기반으로 만든 웹 수업 자료이며 데이터에 유형을 명시한다.
- Acceptance 40 PASS / 0 FAIL, smoke 6 PASS / 0 FAIL. 상세: ACCEPTANCE.md, acceptance-results.json.
- 원본 42장 온라인·오프라인 로드, Audience/Teacher 전환, 학생 화면만 전체화면, 키보드 이동을 검증했다.
- TEACH Visual Hierarchy v2 적용: 42장 모두 TITLE / KEY MESSAGE / CONTENT 구조, 공통 레이아웃 renderer, 데스크톱 최소 글자 크기와 모바일 재배치 검증 완료.
- 대표 10장 screenshot과 `qa/teach-contact-sheet.png` 생성. 기존 `compass-intro` TEACH 링크는 `core` 덱으로 호환 이동한다.

## 보호 경계
- pwa/glossary 및 pwa/v2 수정 금지.
- READ는 docs/manuscript의 canonical Markdown만 사용. 원고 재작성 금지, Appendix G 빈 양식 유지.
- docs/publication의 최종 PDF는 참고 원본이며 READ 소스를 대체하지 않는다.

## 학교에서 실행
기존 변경이 있다면 먼저 git status로 확인하고 보존한다. 강제 reset/clean 금지.

    git switch feat/ai-compass-hub-v2
    git pull --ff-only origin feat/ai-compass-hub-v2
    python -m http.server 8877 --bind 127.0.0.1

주소: http://127.0.0.1:8877/pwa/hub/#/teach/core/1
오래된 화면이 보이면 기존 Hub 탭을 모두 닫고 다시 연다.
일반 실행은 Python 정적 서버만 필요하다. 데이터 재생성에는 PyMuPDF, Pillow, lxml이 필요하다.

## 다음 작업
- 실제 프로젝터와 강의실에서 제목·핵심 메시지 크기와 웹 수업 스크립트의 어조·분량을 검토한다.
- Case B/C 단계형 활동, 실기기 설치, 스크린리더, 원고 전사 표/도식 편집 검토가 남아 있다.
- Appendix G는 비워 두며, 원고·용어 정의·개념 규칙은 편집 승인 없이 바꾸지 않는다.
