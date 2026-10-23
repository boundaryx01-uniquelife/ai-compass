# Git 명령으로 업로드

```powershell
git clone https://github.com/boundaryx01-uniquelife/ai-compass.git
cd ai-compass

# 전달 묶음의 docs 폴더 내용을 저장소의 docs 폴더에 복사

git add docs/publication/AI_COMPASS_v1.0_FINAL.pdf
git add docs/slides/AI_Compass_Lecture_Deck_v0.1.pptx
git add docs/slides/AI_Compass_Lecture_Deck_v0.1.pdf

git commit -m "docs: add frozen manuscript and lecture deck binaries"
git push origin main
```
