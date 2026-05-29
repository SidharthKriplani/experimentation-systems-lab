# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.33.7 (2026-05-29)*

---

## Next session

**1. Frameworks + Deep Dives label copy fix (audit #83)** `S` `QUICK WIN`
- `src/pages/PlaybookBrowser.jsx` — the section/content label currently reads "framework" (or a variant). This is redundant because the page title already says "Frameworks." Change the label to something that describes the content type, not the page identity — e.g. "Reference cards" or simply remove the label. Read the file first to confirm the exact current text.
- `src/pages/BlogBrowser.jsx` — the content descriptor currently reads "concepts and frameworks." Change to "deep dives" to match the room identity. Read the file first to confirm the exact current text.
Both are copy-only changes, no component logic changes needed.

**2. Metrics Room — linked scenario chips not clickable** `S` `BUG`
After revealing the answer in MetricsRunner, linked scenario cards appear in the debrief panel but tapping them does nothing. Need to wire `onNavigate` or `onOpen` prop through to each chip so clicking navigates to that case. File: `src/components/metrics/MetricsRunner.jsx` (or wherever debrief linked chips are rendered).

**3. Foundation module subtitle duplication bug (audit #94)** `S` `BUG`
Subtitle renders in yellow runner header card (correct) AND as first words of body paragraph (wrong, no separator). Confirm the pattern in one module component, then apply fix across all four foundation module directories:
- `src/components/statsFoundations/modules/`
- `src/components/expFoundations/modules/`
- `src/components/metricsFoundations/modules/`
- `src/components/rcaFoundations/modules/`

**4. Hardcoded color values — CSS variable pass (audit #92)** `M` `HIGH`
40+ hardcoded `#fff`, `rgba(0,0,0,x)`, `#333` across RCAFoundationsRunner, AuthModal, Sidebar, LockOverlay, DesignDebriefPanel, MetricChoicePanel. Check `index.css` for existing variables first. Replace all violations. ~1 session.

**5. Sitemap — add 8 missing top-level routes (audit #93)** `S` `MEDIUM`
Add to `public/sitemap.xml`: home, progress, trainer, unlock, company-tracks, defense-doc, about, search. Runner sub-pages excluded. Quick edit.

---

## Deferred to own session

**Supabase auth — finish or cut (audit #104)** — DECISION DUE before Batch 2 outreach. Either complete to production-ready (E2E test with real Supabase project, PROGRESS_KEYS completeness, error handling) or remove entirely. Read DECISIONS.md for the rule. Do not leave half-done.

**Data file validator script (audit #102)** — `scripts/validate-data.js` that checks all `src/data/*.js` for template literals, unescaped apostrophes, missing required fields. Wire as `npm run validate-data`. Prevents the build breaks that have already happened twice. One session.

**React error boundary (audit #105)** — `src/components/shared/ErrorBoundary.jsx`, wrap `<main>` in App.jsx. ~30 min. Fixes white-screen crashes and shows engineering maturity to reviewers.

**Homepage framing pass (audit #103)** — read `src/pages/Home.jsx`, check for stale audience/framing copy, align with README V4.33.7 updates. ~20 min, copy-only.

**Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)**
All three are related. Dedicated session only: redesign Simulator config screen, remove all UI-chrome emojis, standardize room header icon boxes. Do not mix with a normal bug/fix session.

**Foundation module task instructions + depth (audits #95, #96)**
Two separate sessions. First: add "What to do" framing to all interactive elements across all four foundation rooms (~1 session). Second: assess and expand module depth for RCA/Metrics/Exp (~1 session per room). Do not mix with a bug/fix session.

**Empty state quality pass (audit #91)**
Deferred — lower priority than bug fixes above.

---

## Carry-forward from V4.33.7 session

**Done today:**
- Audience labels fixed in onboarding modal + Interview Simulator (V4.32.6)
- Frameworks/Deep Dives/Simulator layout logged as audits #83, #82
- 7 audits logged from sibling lab cross-review (#85–#91)
- Defense Strategy V2 fully specced in IDEAS.md Tier 2
- Deep Dives IA overhaul specced in IDEAS.md Tier 2
- Sister labs footer added to Home page only (V4.33.0)
- Global footer removed (V4.33.1)
- NEXT.md created as session queue
- Full codebase audit — audits #92, #93 logged (V4.33.3)
- Foundation module UX issues logged — audits #94, #95, #96 (V4.33.4)
- MCQ Trainer mobile hover bug fixed — V4.33.5 (imperative DOM mutation, 4 components)
- Deep bug sweep — V4.33.6 (null deref in Module25_IV + DECISIONS.md spine pass)
- Stats Room "By Difficulty" sort fixed — V4.33.7 (group headers + pinned module numbers, audit #101)

**Still open (in IDEAS.md):**
- Empty state quality pass (#91) — deferred
- Foundation task instructions (#95) — deferred, own session
- Foundation depth audit (#96) — deferred, own session
- PostHog live in Vercel prod — confirm `VITE_POSTHOG_KEY` is set in Vercel dashboard

---

## Do not touch next session (unless explicitly decided)

- Defense Strategy V2 — gate: Batch 1 usage confirmed
- Deep Dives IA overhaul — gate: content taxonomy + ≥6 full posts per category
- New rooms / new cases — wrong session type
- Stripe activation — own sprint
- Learning paths — Tier 2, not yet
