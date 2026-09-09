# 학교 작업 재개 — 2026-09-10

브랜치: feat/ai-compass-hub-v2

## 현재 상태
- Hub v2 구현 및 원본 강의 42장 복원 완료. TEACH는 docs/slides의 PPTX/PDF를 사용한다.
- PPTX 발표자 노트 17장만 Quick Note에 원문 그대로 이관했다.
- Acceptance 36 PASS / 4 FAIL, smoke 5 PASS / 1 FAIL. 상세: ACCEPTANCE.md, tests/results.json.
- FAIL 23/24/27/28: Quick Note 25장, Full Script 전체, 별도 질문/오개념 필드가 원본에 없다. 임의 보충하지 않는다.
- 전체화면, 키보드, 이전 주소 호환, 42장 오프라인 표시 검증 통과.
- EXPLORE는 주제 탐색 안내와 해당 원본 강의 구간 링크를 제공한다.

## 보호 경계
- pwa/glossary 및 pwa/v2 수정 금지.
- READ는 docs/manuscript의 canonical Markdown만 사용. 원고 재작성 금지, Appendix G 빈 양식 유지.
- docs/publication의 최종 PDF는 참고 원본이며 READ 소스를 대체하지 않는다.

## 학교에서 실행
기존 변경이 있다면 먼저 git status로 확인하고 보존한다. 강제 reset/clean 금지.

    git switch feat/ai-compass-hub-v2
    git pull --ff-only origin feat/ai-compass-hub-v2
    python -m http.server 8877 --bind 127.0.0.1

주소: http://127.0.0.1:8877/pwa/hub/#/teach/lecture-v01/slide-01
오래된 12장 덱이 보이면 기존 Hub 탭을 모두 닫고 다시 연다.
일반 실행은 Python 정적 서버만 필요하다. 데이터 재생성에는 PyMuPDF, Pillow, lxml이 필요하다.

## 다음 작업
- 사용자와 원본 42장 화면 및 EXPLORE 연결을 검토한다.
- 미제공 교사 자료는 승인된 소스/작성 방향이 확보된 후 처리한다. acceptance를 완화하지 않는다.
- 실기기 설치 및 원고 전사 표/도식의 편집 검토는 남아 있다.
