# AI Compass Hub v2 — Manuscript Source Addendum v1.0

Status: **IMPLEMENTATION SOURCE UPDATE**

This addendum resolves the earlier blocker that the final manuscript was not present in the repository.

## Canonical READ/eBook source is now available

Before implementing or resuming the READ/eBook portion of AI Compass Hub v2, read:

1. `docs/manuscript/README.md`
2. `docs/manuscript/00_FRONT_PART0_PART1.md`
3. `docs/manuscript/01_PART2_PART3.md`
4. `docs/manuscript/02_PART4.md`
5. `docs/manuscript/03_PART5_PART6.md`
6. `docs/manuscript/04_PART7.md`
7. `docs/manuscript/05_APPENDICES.md`

These six manuscript files cover the complete frozen 53-page `AI_COMPASS_v1.0_FINAL.pdf`, Part 0–7 and Appendix A–G, as a repository-accessible transcription.

## Implementation rules

- READ/eBook implementation may now resume.
- Do not derive manuscript prose from Glossary JSON, slides, project-direction files, or general AI knowledge.
- Do not invent missing manuscript text.
- Do not summarize or rewrite the source while presenting the full eBook text.
- Keep the manuscript wording content-locked. UI-only transformations such as headings, page/part navigation, semantic tables, cards, diagrams, typography, bookmarks, and related-term links are allowed when they do not alter the wording or meaning.
- PDF page comments in the manuscript source are provenance/mapping markers. They do not need to be shown in the learner-facing UI.
- Tables and diagrams may have extraction-shaped line breaks. Reconstruct their web layout only when the source labels and relationships are clear. If ambiguous, preserve the source text and report the ambiguity rather than guessing.
- Appendix G remains intentionally unfilled/current. Do not populate it during Hub implementation.

## Source precedence

For READ/eBook manuscript content:

`AI_COMPASS_v1.0_FINAL.pdf` → `docs/manuscript/*` transcription → Hub rendering

The frozen PDF remains the publication authority. The repository transcription is the implementation source for Codex.

This addendum supersedes the earlier implementation stop caused only by absence of manuscript source. Other Hub v2 handoff constraints remain unchanged.
