# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.41.0 (2026-05-31) — Session 3 executed: 74 prompts/debriefs rewritten, build clean*

---

## Next session

**1. Foundation module task instructions — "What to do" framing (audit #95)** `M` `UX`

Gate: SQL Lab Sessions 1–3 complete ✅

All interactive foundation elements across all 4 runners need a 1–2 sentence instruction prompt above each interactive element. InstructionBox component exists in ExpFoundationsRunner. Start with the 12 new stubs (ef12–ef15, mf11–mf13, rf08–rf12). Then audit older modules. ~1 session.

---

**2. SQL Lab — Sessions 4–6 (schema design → new problems → phase 2)** `L` `CODE`

Gate: Sessions 1–3 done ✅ (prompt style locked before new authoring).

- Session 4: Design 7 new datamarts (gaming, logistics, marketplace, food_delivery, social_network, edtech, hr_analytics) + standalone Master schemas
- Session 5: Author new problems to fill 8-pattern gap list, reach 130-problem target (50E/40M/25H/15Master)
- Session 6: Phase 2 features — study plan modal, per-problem timer, Progress.jsx SQL Lab section

Full spec in `SQL_LAB_PLAN.md` Sections 3–4.

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
- SQL Lab Sessions 4–6 (schema design → new problems → phase 2)
- PostHog live in Vercel prod — confirm `VITE_POSTHOG_KEY` is set
- Foundation task instructions (audit #95) — gate now clear
- Foundation depth audit (audit #96) — gate: task instructions done first
- Font system (Source Serif 4 + DM Sans) — research done, not shipped

---

## Do not touch next session (unless explicitly decided)

- Defense Strategy V2 — gate: Batch 1 usage confirmed
- Deep Dives IA overhaul — gate: content taxonomy + ≥6 full posts per category
- New rooms / new cases — wrong session type
- Stripe activation — own sprint
- Learning paths — Tier 2, not yet
- Session 3 — ✅ done
- Sessions 1–2 — ✅ done
