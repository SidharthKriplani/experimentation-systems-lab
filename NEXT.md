# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.38.0 (2026-05-31) — SQL Lab full build complete*

---

## Next session

**1. SQL Lab — vet + scale sprint** `L` `FEATURE`

SQL Lab is an internal-first practice tool (hidden at `/sql-lab`, keyboard shortcut `q`). POC shipped V4.37.2 (5 problems, single sidebar, basic runner). Full build in progress.

**Full feature spec:**
- 250 problems total: 100 Easy / 75 Medium / 50 Hard / 25 Master
- 4 difficulty tiers. Master = Challenge Vault, never included in study plans, always visible
- Business-first framing: every prompt gives context + business question, technique not implied
- Shared datamart architecture: 5 industries × 1 datamart = 5 datamarts, many problems per schema
- Company logos via Clearbit (`https://logo.clearbit.com/[domain]`)
- Timer: starts on first keystroke in editor, records elapsed time to localStorage on correct solve only
- Study plan onboarding: 4-step sequential modal (interview? / when? / role? / time/day?) → payoff screen showing plan summary and daily queue
- Plan modes: Casual (~30 min/day) / Steady (~60 min/day) / Intensive (~2 hrs/day)
- Plan is solved-aware: skips already-completed problems
- Difficulty filter in sidebar: Easy/Medium/Hard. Master excluded — shown in separate Challenge Vault section
- Role tags per problem: PA / DA / PM / BA. Priority tags: 1 (must-know) / 2 (role-specific) / 3 (specialist)
- localStorage keys: `pal-sql-lab-solved-v1` (Set of solved IDs), `pal-sql-lab-plan-v1` (plan config), `pal-sql-lab-times-v1` (solve times per problem)
- SQL engine: sql.js (SQLite via WASM, `public/sql-wasm.wasm` already present)

**File architecture (critical — do not merge back into one file):**
- `src/data/sqlLabDatamarts.js` — NEW FILE. 5 datamarts. Each datamart has `tables` object where each table has `schema` (CREATE TABLE string), `columns` (array of {name,type} for display), `rows` (array of arrays — seed data). No SQL strings with apostrophes — use parameter arrays and prepared statements in the page.
- `src/data/sqlLabProblems.js` — REWRITE. Problems array only. Each problem has `datamartId` (references datamarts), `companyDomain`, `roles[]`, `priority`. No per-problem `schema` or `seed` — those are in the datamart.
- `src/pages/SqlLabPage.jsx` — REWRITE. Import both files. DB init uses prepared statements from datamart rows. New features: Clearbit logo, timer, PlanModal, Challenge Vault in sidebar.

**V4.38.0 status — SHIPPED:**
- `sqlLabDatamarts.js` — 926 lines, 5 datamarts × 5 tables, seed data complete, 0 backticks ✅
- `sqlLabProblems.js` — 650 lines, 30 problems (12E/10M/6H/2Master), 0 backticks ✅
- `SqlLabPage.jsx` — 568 lines, prepared-statement DB init, Clearbit logos, Challenge Vault ✅
- Vite build: ✓ 807 modules, 0 errors ✅

**Vet checklist (user runs these before scaling to 250):**
1. Navigate to `/sql-lab` (or press `q`)
2. Try Easy sql-e01 (Re-engagement Targets) — LEFT JOIN anti-join, expect 3 rows (users 13,14,15 with no orders)
3. Try Medium sql-m05 (Channel Mix Pivot) — CASE WHEN aggregation
4. Try Hard sql-h02 (Streak Detector) — gap-and-island, expect user 5 only
5. Try Master sql-master01 (Risk Engine) — 3-CTE score, expect user 9 score 8
6. Confirm Challenge Vault section visible at sidebar bottom
7. Confirm schema accordion shows all datamart tables
8. Confirm Clearbit logos render (or hide gracefully on error)

**After vet — scale to 250 problems:**
- Add 88 more Easy, 65 more Medium, 44 more Hard, 23 more Master
- Add Study Plan 4-step modal (interview? / when? / role? / time?) → plan modes Casual/Steady/Intensive
- Add timer (starts on first keystroke, records elapsed on correct solve to `pal-sql-lab-times-v1`)
- Add SQL Lab progress section to Progress.jsx

**2. Foundation module task instructions — "What to do" framing (audit #95)** `M` `UX`
All interactive foundation elements across all 4 runners need a 1–2 sentence instruction prompt above each interactive element. InstructionBox component exists in ExpFoundationsRunner. Start with the 12 new stubs (ef12–ef15, mf11–mf13, rf08–rf12) — most launch without any instruction framing. Then audit the older modules. ~1 session. Do not mix with bug fixes.

**2. Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)** `L` `VISUAL`
All three are related. Dedicated session: redesign Simulator config screen (remove emojis from role cards, tighten spacing, increase visual gravity), remove all UI-chrome emojis (replace with Icon.jsx SVGs), standardize room header icon boxes to 36×36 box pattern across all browsers and foundation pages. Do not mix with a normal bug/fix session.

**3. Foundation module depth audit — RCA, Metrics, Exp (audit #96)** `L` `CONTENT`
All 72 foundation modules are now interactive. Assess depth: are the new modules sufficient for senior-level prep, or does a second layer exist? What topics are still missing per room? ~1 session per room. Gate: task instructions pass (audit #95) done first — now satisfied.

**4. Case debrief failure mode pass (audit #86)** `L` `CONTENT`
Debriefs state the right answer but don't explain what a weak answer looks like or why it fails under interviewer follow-up. Add: (1) what the weak answer looks like, (2) the specific follow-up that exposes the gap. Prioritize RCA, Metrics, Stats first. High effort — full data file pass.

**5. Supabase auth — finish or cut decision (audit #104)** `M` `ARCH`
DECISION DUE before Batch 2 outreach. Options: (A) complete to production-ready — E2E test with real Supabase project, PROGRESS_KEYS completeness, error handling; (B) remove entirely. Read DECISIONS.md rule before deciding. Do not leave half-done.

---

## Deferred to own session

**Empty state quality pass (audit #91)**
Deferred — lower priority than above.

**Defense Strategy Layer 4A — micro-sequence per skill**
Gate: PostHog confirms real Defense Strategy usage from Batch 1. Do not build until then.

---

## Carry-forward log

**Done this session (V4.38.0):**
- SQL Lab full build: sqlLabDatamarts.js (926 lines, 5 datamarts), sqlLabProblems.js (30 problems), SqlLabPage.jsx (568 lines)
- Vite build clean — 807 modules, 0 errors
- NEXT.md + CHANGELOG pending user commit

**Done in prior session (V4.35.5–V4.36.3):**
- Foundation broken links (NEXT #1) — dead `playbookLinks` block removed from StatsFoundationsRunner
- Metrics linked scenario chips (NEXT #2) — confirmed already wired (audit #35)
- Subtitle duplication across 5 stat modules (NEXT #3) — audit #94 ✅ resolved
- GuidedPathCard item list removed (NEXT #4) — sequence block removed from Progress.jsx
- Homepage framing pass (NEXT #5, audit #103) — ✅ resolved
- Right-side module nav panel across all 4 foundation runners — V4.35.5
- Foundation nav stub greying — V4.35.6 (isStub: true on 19 entries)
- Foundation stub population — V4.36.0 (12 interactive modules: ef12–ef15, mf11–mf13, rf08–rf12)
- CSS variable pass — V4.36.1 (audit #92 ✅, 7 files, --overlay token added)
- React error boundary — confirmed present, audit #105 ✅ resolved
- Sitemap 8 routes — confirmed present, audit #93 ✅ resolved
- Label copy fixes — confirmed present, audit #83 ✅ resolved
- Data validator script — V4.36.2 (audit #102 ✅, scripts/validate-data.js)
- Depth palette pass — V4.36.3 (audit #122 ✅, dark mode deepening, --discovery token, DECISIONS rule)
- RCA Foundations depth pass — V4.36.4 (rf01 framework viz, rf05 mix-shift playground, rf07 SVG metric tree)
- All MD files updated — V4.36.4

**Still open:**
- PostHog live in Vercel prod — confirm `VITE_POSTHOG_KEY` is set in Vercel dashboard
- Foundation task instructions (audit #95) — #1 in next session queue
- Foundation depth audit (audit #96) — now #3 in next session queue (gate cleared)
- Font system (Source Serif 4 + DM Sans) — research complete, NOT shipped. Preview locally before deciding.

---

## Do not touch next session (unless explicitly decided)

- Defense Strategy V2 — gate: Batch 1 usage confirmed
- Deep Dives IA overhaul — gate: content taxonomy + ≥6 full posts per category
- New rooms / new cases — wrong session type
- Stripe activation — own sprint
- Learning paths — Tier 2, not yet
