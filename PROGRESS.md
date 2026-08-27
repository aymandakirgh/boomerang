# PROGRESS — boomerang-showcase

**Resume here:** M7
**Updated:** 2026-08-27 17:07

Source of truth for this build. A fresh session reads THIS FILE and continues
from the first unchecked milestone. It never restarts from scratch, and never
re-derives the plan from the original prompt.

Context: extend the existing one-viewport Boomerang landing (~/boomerang, GRO-372,
spec in the KB) into a multi-page showcase. First viewport of Home stays exactly
as specced (boomerang canvas video hero + glass panel). Design system: white,
#191919, #F4F3F3, Mackinac serif + Inter, 200ms transitions. Motion values come
from /liquid-ui (measured, never invented). References: bakai.me/lab,
jakubantalik.com, originkit.dev (MCP available), canvasui.dev.
Deploy: GitHub repo aymandakirgh/boomerang, Vercel team scope testin-07ebc9a2.
Vercel-verified commit author: ayman.dakir@growthackers.io.

## Milestones

- [x] **M1 — Research: liquid-ui motion values, OriginKit components, reference-site patterns**
  - Acceptance: `test -s docs/RESEARCH.md`
  - Verify: `test -s docs/RESEARCH.md`
  - Notes:

- [x] **M2 — Routing + shared shell: react-router, footer, nav wired, demo page — no dead links**
  - Acceptance: `npm run build && bash scripts/check-links.sh`
  - Verify: `npm run build && bash scripts/check-links.sh`
  - Notes: check-links.sh curls every route on a preview server, asserts 200 + non-trivial HTML.

- [x] **M3 — Home below-the-fold sections**
  - Acceptance: `npm run build`
  - Verify: `npm run build`
  - Notes: first viewport untouched (spec-locked). Sections below: logos/metrics, product narrative, channel showcase, CTA band.

- [x] **M4 — Product page**
  - Acceptance: `npm run build && bash scripts/check-links.sh /product`
  - Verify: `npm run build && bash scripts/check-links.sh /product`
  - Notes:

- [x] **M5 — Solutions page**
  - Acceptance: `npm run build && bash scripts/check-links.sh /solutions`
  - Verify: `npm run build && bash scripts/check-links.sh /solutions`
  - Notes:

- [x] **M6 — Pricing page**
  - Acceptance: `npm run build && bash scripts/check-links.sh /pricing`
  - Verify: `npm run build && bash scripts/check-links.sh /pricing`
  - Notes:

- [ ] **M7 — Company page**
  - Acceptance: `npm run build && bash scripts/check-links.sh /company`
  - Verify: `npm run build && bash scripts/check-links.sh /company`
  - Notes:

- [ ] **M8 — Logo + favicon set (unique mark, og meta, apple-touch)**
  - Acceptance: `test -s public/favicon.svg && grep -q 'og:title' index.html && grep -q 'apple-touch-icon' index.html`
  - Verify: `test -s public/favicon.svg && grep -q 'og:title' index.html && grep -q 'apple-touch-icon' index.html`
  - Notes: mark already custom (spec SVG); favicon tile + og image + touch icon derived from it.

- [ ] **M9 — QA: build green, all links resolve, browser QA desktop+mobile, adversarial review**
  - Acceptance: `npm run build && bash scripts/check-links.sh`
  - Verify: `npm run build && bash scripts/check-links.sh`
  - Notes: plus headless browser pass (console clean, screenshots) and adversarial review workflow with zero blockers.

- [ ] **M10 — Git repo + push (aymandakirgh/boomerang), Vercel deploy under testin scope, live URL verified**
  - Acceptance: `git ls-remote origin >/dev/null && curl -sf -o /dev/null "$(cat .live-url)"`
  - Verify: `git ls-remote origin >/dev/null && curl -sf -o /dev/null "$(cat .live-url)"`
  - Notes: author ayman.dakir@growthackers.io; never force-push; .live-url written after deploy.

## Blockers

_none_
