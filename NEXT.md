# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.36.0 (2026-05-30)*

---

## Next session

**1. Remove isStub nav logic from data files (already done) — verify build** `S` `VERIFY`
All 19 isStub flags removed from data files. Foundation nav items should now render as normal clickable items. Verify the build (npm run dev locally) and confirm all 12 new interactive modules render correctly. If any module has a render error, fix before next session.

**2. Hardcoded color values — CSS variable pass (audit #92)** `M` `BUG`
40+ hardcoded `#fff`, `rgba(0,0,0,x)`, `#333` across RCAFoundationsRunner, AuthModal, Sidebar, LockOverlay, DesignDebriefPanel, MetricChoicePanel. Check `index.css` for existing variables first. Moved from Deferred — enough surface area built now to justify this pass.

**3. Foundation module task instructions + depth (audits #95, #96)** `M` `UX`
All interactive foundation elements need "What to do" framing (InstructionBox or equivalent). Audit all 4 runners. Also: assess depth on RCA/Metrics/Exp modules — are the new stubs deep enough for senior-level prep or do they need a second layer? ~1 session per room.

**4. Sitemap — add 8 missing top-level routes (audit #93)** `S` `SEO`
Add to `public/sitemap.xml`: home, progress, trainer, unlock, company-tracks, defense-doc, about, search. Runner sub-pages excluded. ~20 min.

**5. Frameworks + Deep Dives label copy fix (audit #83)** `S` `COPY`
`PlaybookBrowser.jsx` label reads "framework" (redundant — change to "Reference cards"). `BlogBrowser.jsx` reads "concepts and frameworks" (change to "deep dives"). Copy-only, 2 files.

---

## Deferred to own session

**Hardcoded color values — CSS variable pass (audit #92)** `M` — 40+ hardcoded `#fff`, `rgba(0,0,0,x)`, `#333` across RCAFoundationsRunner, AuthModal, Sidebar, LockOverlay, DesignDebriefPanel, MetricChoicePanel. Check `index.css` for existing variables first. ~1 session. Moved from queue — guided path UX fix took priority.

**Frameworks + Deep Dives label copy fix (audit #83)** — `PlaybookBrowser.jsx` label reads "framework" (redundant with page title — change to "Reference cards" or remove). `BlogBrowser.jsx` reads "concepts and frameworks" (change to "deep dives"). Copy-only, 2 files. Moved from queue — broken links bug took priority.

**Sitemap — add 8 missing top-level routes (audit #93)** — Add to `public/sitemap.xml`: home, progress, trainer, unlock, company-tracks, defense-doc, about, search. Runner sub-pages excluded. Moved from queue — homepage framing took priority.

**Supabase auth — finish or cut (audit #104)** — DECISION DUE before Batch 2 outreach. Either complete to production-ready (E2E test with real Supabase project, PROGRESS_KEYS completeness, error handling) or remove entirely. Read DECISIONS.md for the rule. Do not leave half-done.

**Data file validator script (audit #102)** — `scripts/validate-data.js` that checks all `src/data/*.js` for template literals, unescaped apostrophes, missing required fields. Wire as `npm run validate-data`. Prevents the build breaks that have already happened twice. One session.

**React error boundary (audit #105)** — `src/components/shared/ErrorBoundary.jsx`, wrap `<main>` in App.jsx. ~30 min. Fixes white-screen crashes and shows engineering maturity to reviewers.

**Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)**
All three are related. Dedicated session only: redesign Simulator config screen, remove all UI-chrome emojis, standardize room header icon boxes. Do not mix with a normal bug/fix session.

**Foundation module task instructions + depth (audits #95, #96)**
Two separate sessions. First: add "What to do" framing to all interactive elements across all four foundation rooms (~1 session). Second: assess and expand module depth for RCA/Metrics/Exp (~1 session per room). Do not mix with a bug/fix session.

**Empty state quality pass (audit #91)**
Deferred — lower priority than bug fixes above.

---

## Carry-forward from V4.33.7–V4.34.0 session

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
- Search gap fixed — V4.33.8 (8 missing rooms + shallow field coverage, audit #106)
- Foundation guiding text pass — V4.33.9 (all 46 modules across 4 rooms, audit #95 + #107 resolved)
- Skeleton depth expansion — V4.34.0 (19 new stubs: ef08–ef15, mf09–mf13, rf07–rf12; devNotes with MICRO/MACRO/INTERACTIVE/PRIORITY for all)
- Investor-style review of all 3 labs logged — AUDITS.md Part XXI, audit #109 (homepage/nav dilution, open); DECISIONS.md new rule on core room visual weight; actionable items only, pre-data recommendations discarded
- Foundation broken links bug logged — NEXT.md #1 (investigation needed before fix)
- Progress page guided path cards logged — NEXT.md #4 (collapse item list, keep name + progress + Continue)
- Premium animation pass — V4.35.0 (keyframes + utility classes in index.css, route key transition in App.jsx, shimmer Suspense fallbacks, staggered card-enter + card-hover across all 21 browser pages)
- Bold polish pass — V4.35.1 (spring-overshoot debrief reveal on all 20 runners, Next button glow pulse on 41 CTAs, modal/overlay slide-up, MCQ correct/wrong feedback on Stats + Cases + Scenario runners, global button press scale)
- Animation coverage audit + gap fill — V4.35.2 (100% coverage: 21/21 runners, 39/39 pages, 32/32 StatsFoundations modules all verified by grep audit)
- LINEAGE.md created — V4.35.3 (narrative history V1→V4.35.2, reconstructed from CHANGELOG.md; spine table reference now resolves)
- Stat Foundations 7-module UI bug fix pass — V4.35.4 (bell curve spike, SE overflow, power slider distance, correlation layout shift, Bonferroni n=1, regression overlap, selection bias clip)
- Indian e-commerce field intelligence logged — V4.35.3 (Meesho Company Track expanded in Tier 2 Platform; Indian tech case cluster + marketplace metric tree module added to Tier 2 Content; IDEAS.md + CHANGELOG.md updated)
- Module04 σ reshape fix + foundation nav panel — V4.35.5 (REF_PDF constant for fixed-height normalization; sticky right-side nav sidebar across all 4 foundation runners with jump-to navigation, progress state, lock state)
- Foundation nav stub greying — V4.35.6 (isStub: true on 19 stub entries across 3 data files; 0.4 opacity, non-clickable, tooltip "Coming soon" in all 4 runner nav sidebars)
- Foundation stub population — V4.36.0 (12 interactive modules: ef12–ef15, mf11–mf13, rf08–rf12; SVG charts, sliders, classify exercises, MCQs; isStub flags removed from all 3 data files)

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
