# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.42.0 (2026-05-31) — Sessions 4+5 executed: 7 datamarts added, 130-problem target reached, build clean*

---

## Next session

**1. SQL Lab Session 6 — UX fixes + hints system + phase 2 features** `L` `CODE`

Gate: Sessions 4+5 done ✅ (130 problems, 12 datamarts, build clean).

- UX fixes: sort by difficulty tier, Google favicon API logos, filter chips (difficulty/company/time), scroll/layout restructure (left panel fixed, description scrolls internally)
- Hints system: replaces Show Answer; 1 hint Easy / 1–2 Medium / 3–5 Hard+Master; structural reasoning questions ("What is one row in your output?"); Show Answer unlocks only after hints exhausted; hints authored per problem
- Phase 2: per-problem timer (starts on first keystroke, records to pal-sql-lab-times-v1), Progress.jsx SQL section (solved count by difficulty, total time, streak)
- Study Plan modal: deprioritized — move to Tier 2 IDEAS.md
- May split 6a (UX fixes + layout) and 6b (hints authoring + phase 2)

Full spec in `SQL_LAB_PLAN.md` Section 4.

---

**2. Foundation module depth audit — RCA, Metrics, Exp (audit #96)** `M` `CODE`

Gate: task instructions pass (#95) done ✅

---

## Deferred (own sessions, not blocking)

**Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)**
Dedicated session: redesign Simulator config screen, remove UI-chrome emojis, standardize room header icon boxes.

**Foundation module depth audit — RCA, Metrics, Exp (audit #96)**
Gate: task instructions pass (#95) done first.

**Case debrief failure mode pass (audit #86)**
Debriefs need: (1) what weak answer looks like, (2) follow-up that exposes the gap. Prioritize RCA, Metrics, Stats.

**Supabase auth — finish or cut decision (audit #104)**
DECISION DUE before Batch 2 outreach. Do not leave half-done.

---

## Carry-forward log

**Done this session (V4.42.0 — Sessions 4+5):**
- Session 4: 7 new datamarts appended to sqlLabDatamarts.js (gaming, logistics, marketplace, food_delivery, social_network, edtech, hr_analytics). Seed data engineered for all 8 gap patterns. Double-comma syntax bug fixed at health/gaming boundary.
- Session 5: Culled 91 problems (33E/45M/13H). Added 10 new gap-pattern problems (1E/3M/4H/2Master). Final: 50E/40M/25H/15Master = 130.
- Also completed: Foundation task instructions audit #95 (4 "What to do:" prompts added to RCAFoundationsRunner.jsx for rf11/rf12)
- validate-data.js: sqlLabProblems.js PASS. Vite build: ✓ 0 errors. 6/6 spot checks passed.

**Done this session (V4.41.0 — Session 3):**
- 74 prompts and debriefs rewritten: 16 Easy (prompt only) + 33 Medium + 17 Hard + 8 Master
- 5-section debrief format applied to all 57 Medium/Hard/Master rewrites
- Bug caught + fixed: literal newlines in JS single-quoted strings (58 fields corrected via scanner)
- validate-data.js: PASS. Vite build: ✓ 0 errors. 6/6 spot checks passed
- AUDITS.md: #133 marked resolved. SQL_LAB_PLAN.md and CHANGELOG.md updated

**Done this session (Session 2 — no code changes):**
- All 211 surviving problems read and classified: 211/211 technical-spec
- 74 conversion candidates identified with direction notes: 16 Easy, 33 Medium, 17 Hard, 8 Master
- Full classification table + direction notes written to SQL_LAB_PLAN.md Section 7

**Done this session (V4.40.0):**
- Session 1 executed: 39 culled, 27 reclassified, master10 bug fixed
- validate-data.js: PASS. Vite build: ✓ 0 errors. 15/15 spot checks passed

**Done this session (V4.39.8–V4.39.11 — code changes):**
- SQL Lab scroll — fixed with two independent `position: fixed` panels, body scroll lock
- SQL Lab visual vibrancy — teal header, teal active state, difficulty-colored borders
- Schema accordion reduced to `maxHeight: 160px`
- Expected output — column chips + actual sample rows (first 3 rows from running solution silently)
- Progress streak heatmap extended to 52 weeks (364 days, GitHub-style)

**Done in prior session (V4.39.0):**
- SQL Lab scaled from 30 → 250 problems: 100 Easy / 75 Medium / 50 Hard / 25 Master
- All MD files updated

**Still open:**
- SQL Lab Session 6 (UX + hints + phase 2) — gate: Sessions 4+5 done ✅
- PostHog live in Vercel prod — confirm `VITE_POSTHOG_KEY` is set
- Foundation depth audit (audit #96) — gate: task instructions done ✅
- Font system (Source Serif 4 + DM Sans) — research done, not shipped

---

## Do not touch next session (unless explicitly decided)

- Defense Strategy V2 — gate: Batch 1 usage confirmed
- Deep Dives IA overhaul — gate: content taxonomy + ≥6 full posts per category
- New rooms / new cases — wrong session type
- Stripe activation — own sprint
- Learning paths — Tier 2, not yet
- Sessions 4+5 — ✅ done
- Session 3 — ✅ done
- Sessions 1–2 — ✅ done
