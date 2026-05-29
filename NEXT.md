# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.33.1 (2026-05-29)*

---

## Next session

**1. PostHog autocapture PII check (audit #85)** `S` `CRITICAL`
Open `src/utils/analytics.js`. Find `posthog.init()`. Verify options include `{ autocapture: false }`. If missing, add it. One line. Potential live PII risk — do not skip.

**2. Frameworks + Deep Dives label copy fix (audit #83)** `S` `QUICK WIN`
- `src/pages/PlaybookBrowser.jsx` — fix "framework" label (redundant with page title)
- `src/pages/BlogBrowser.jsx` — fix "concepts and frameworks"; should say "deep dives"

**3. Timer cleanup verify (audit #88)** `S` `BUG`
Check `TimerButton` — verify `clearInterval` fires on unmount via `useEffect` cleanup or `onBack` handler across all 5 runners. Fix if missing.

**4. Metrics Room — linked scenario chips not clickable** `S` `BUG`
Linked scenario cards in debrief tap to nothing. Wire `onNavigate` or `onOpen` on each chip.
See: IDEAS.md → Bugs

**5. Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)** `L` `OWN SESSION`
All three are related. Do in one dedicated session: redesign Simulator config screen, remove all UI-chrome emojis, standardize room header icon boxes. Do not mix with items 1–4.

---

## Carry-forward from V4.33.1 session

**Done today:**
- Audience labels fixed in onboarding modal + Interview Simulator (V4.32.6)
- Frameworks/Deep Dives/Simulator layout logged as audits #83, #82
- 7 audits logged from sibling lab cross-review (#85–#91)
- Defense Strategy V2 fully specced in IDEAS.md Tier 2
- Deep Dives IA overhaul specced in IDEAS.md Tier 2
- Sister labs footer added to Home page only (V4.33.0)
- Global footer removed (V4.33.1)
- NEXT.md created as session queue

**Still open (in IDEAS.md):**
- Stat count consistency audit (#89) — ~30 min, add to session if time allows
- Empty state quality pass (#91) — deferred
- PostHog live in Vercel prod — confirm `VITE_POSTHOG_KEY` is set in Vercel dashboard

---

## Do not touch next session (unless explicitly decided)

- Defense Strategy V2 — gate: Batch 1 usage confirmed
- Deep Dives IA overhaul — gate: content taxonomy + ≥6 full posts per category
- New rooms / new cases — wrong session type
- Stripe activation — own sprint
- Learning paths — Tier 2, not yet
