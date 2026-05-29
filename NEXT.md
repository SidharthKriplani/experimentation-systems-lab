# NEXT.md — Next build session

Read this at session start. Do only this. Update before closing.

*Last updated: May 2026 (post V4.33.0)*

---

## Theme: Fix bugs. Establish analytics baseline. Then decide what to build.

Feature building is paused (DECISIONS.md). The next session is not a feature sprint — it's a cleanup + analytics sprint. Nothing ships until PostHog baseline is confirmed.

---

## Do this (in order)

**1. PostHog autocapture PII risk check** `S effort` `CRITICAL`
Verify `src/utils/analytics.js` PostHog init call includes `{ autocapture: false }`. If missing, one-line fix. Do not defer — autocapture with PII fields in DOM is a real liability.
See: IDEAS.md → Bugs → "PostHog autocapture PII risk (audit #85)"

**2. Timer cleanup on navigation bug check** `S effort` `BUG`
Verify TimerButton interval is cleared when `onBack` fires across all 5 runners (RCARunner, CaseRunner, BIRunner, etc.). Check for `clearInterval` in `useEffect` cleanup or `onBack` handler. If missing anywhere — ghost interval, state after unmount.
See: IDEAS.md → Bugs → "Timer cleanup on navigation (audit #88)"

**3. Metrics Room — linked scenario chips not clickable** `S effort` `BUG`
After revealing the senior metric design answer, linked scenario cards appear in the debrief but tapping them does nothing. Fix: wire `onNavigate` or `onOpen` on each chip.
See: IDEAS.md → Bugs → "Metrics Room — linked scenarios not clickable"

**4. Confirm PostHog is live in Vercel prod** `S effort` `BLOCKER`
Check Vercel dashboard: is `VITE_POSTHOG_KEY` set? Open the live site, check network tab for posthog.com requests. If not firing — nothing else matters until it is. Without a WAU baseline, every feature decision is guesswork.
See: DECISIONS.md → "Current priority (V4.25+)"

**5. Emoji removal pass — room headers + icon boxes** `M effort` `HIGH`
Emojis in room headers, icon boxes, and locked states give an unserious feel inconsistent with senior-IC positioning. Replace with inline SVG or typographic symbols. Scope: all browser header icon boxes, foundation page headers, paywall lock states, tool headers. Do NOT touch emoji inside case/article content text.
See: IDEAS.md → Visual Polish → "Emoji removal — full UI pass (audit #80)"

---

## If time allows

**Stat count consistency audit** `S effort`
Grep all numeric claims ("150+ cases", "17 rooms", "V4.17") across src/, public/, CLAUDE.md and verify against actual data file counts. ~30 min pass.
See: IDEAS.md → Bugs → "Stat count consistency audit (audit #89)"

---

## Do NOT touch this session

- Interview Simulator expansion — no PostHog data yet to justify
- Defense Strategy V2 — gate: Batch 1 usage confirmed first
- Deep Dives IA overhaul — gate: content taxonomy first
- New rooms / new cases — wrong session type
- Stripe activation — separate focused sprint
- Any new feature work — the pause is real, respect it

---

## End of session checklist

- [ ] Brace check all modified files
- [ ] Commit with descriptive message
- [ ] Update CLAUDE.md sprint log
- [ ] Update this file — move done items out, add anything new
- [ ] Push: `cd "/Users/ASUS/Documents/GitHub/experimentation-systems-lab" && git push origin main`
