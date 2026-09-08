# AI Compass Publication Package Spec v1.0

Status: **PUBLICATION PREP BASELINE**

## Goal

Turn the frozen core manuscript into a package that can be distributed digitally, printed for training, or prepared for formal publication without changing the conceptual core.

## Source of truth

- Content baseline: `AI Compass Core Manuscript v1.0 — FREEZE`
- Part 0–7 + Appendix A–G
- Product names remain outside the main explanatory axis
- Appendix G remains separately updateable

## Required publication outputs

### A. Reading PDF
Purpose: immediate digital distribution.

Requirements:
- cover
- copyright / edition page
- table of contents
- consistent page headers / footers
- selectable/searchable Korean text
- page numbering
- embedded or safely substituted fonts
- print-safe margins
- no broken traffic-light symbols

### B. Print PDF
Purpose: workshops, institutional printing, possible book production.

Requirements:
- A4 or selected trim size
- bleed only if visual design requires it
- grayscale legibility check
- figures readable when printed
- workbook pages separated from reading pages where appropriate

### C. Editable Source
Purpose: future maintenance.

Preferred source:
- Markdown or structured source document

Rules:
- one authoritative editable source
- generated PDF is an artifact, not the editable master
- Appendix G can be updated independently

### D. Distribution Metadata
Add before public release:
- title
- subtitle
- edition/version
- author/editor/organization credit
- publication date
- contact or project URL if desired
- copyright statement
- license / permitted educational use
- revision policy

## Recommended package

```text
docs/publication/
├─ source/
├─ pdf/
│  ├─ AI_COMPASS_v1.0_READING.pdf
│  └─ AI_COMPASS_v1.0_PRINT.pdf
├─ cover/
├─ metadata/
└─ release-checklist/
```

## Content-policy decisions still needed before public distribution

1. author / organization credit
2. copyright holder
3. educational reproduction permission
4. whether commercial redistribution is allowed
5. whether derivative works are allowed
6. final public repository visibility

Do not choose a license implicitly.

## Publication QA checklist

- [ ] Part 0–7 present
- [ ] Appendix A–G present
- [ ] six Compass questions unchanged
- [ ] Control Plane not rendered as layer 5
- [ ] Autonomy / Trigger distinction intact
- [ ] L0 fixed scheduled-message counterexample intact
- [ ] Korean typography checked
- [ ] tables not clipped
- [ ] links/URLs intentionally included or removed
- [ ] traffic-light meanings include text, not color alone
- [ ] accessibility / searchable-text check
- [ ] version and publication date visible
- [ ] Appendix G update instructions visible

## Recommendation

Treat the current FINAL PDF as the **content-frozen reference edition**. Create a separate `RELEASE` or `PUBLICATION` edition only after front matter, rights, print QA, and distribution metadata are decided.
