# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.36.4 (2026-05-30)*

---

## Next session

**1. Foundation module task instructions — "What to do" framing (audit #95)** `M` `UX`
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

**Done in this session (V4.35.5–V4.36.3):**
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
