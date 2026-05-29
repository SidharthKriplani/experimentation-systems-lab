# NEXT.md — Session Queue

Read this at the start of every build session. Do only this. Update before closing.

**Rule:** Max 5 items, ordered by priority. Never a dump — if it grows past 5, something doesn't belong here. When done, cross off, reorder, add what carries forward.

*Last updated: V4.33.1 (2026-05-29)*

---

## Next session

**1. Frameworks + Deep Dives label copy fix (audit #83)** `S` `QUICK WIN`
- `src/pages/PlaybookBrowser.jsx` — find and fix "framework" label (redundant with page title)
- `src/pages/BlogBrowser.jsx` — find and fix "concepts and frameworks"; should say "deep dives"

**2. Metrics Room — linked scenario chips not clickable** `S` `BUG`
Linked scenario cards in debrief tap to nothing. Wire `onNavigate` or `onOpen` on each chip.
See: IDEAS.md → Bugs

**3. Hardcoded color values — CSS variable pass (audit #92)** `M` `HIGH`
40+ hardcoded `#fff`, `rgba(0,0,0,x)`, `#333` across RCAFoundationsRunner, AuthModal, Sidebar, LockOverlay, DesignDebriefPanel, MetricChoicePanel. Check `index.css` for existing variables first. Replace all violations. ~1 session.

**4. Sitemap — add 8 missing top-level routes (audit #93)** `S` `MEDIUM`
Add to `public/sitemap.xml`: home, progress, trainer, unlock, company-tracks, defense-doc, about, search. Runner sub-pages excluded. Quick edit.

**5. Empty state quality pass (audit #91)** `S` `UX`
Bookmarks, Progress (zero rooms), locked-room state, MCQ Trainer (no attempts). Each needs: acknowledge state + explain what belongs here + give one specific next-action CTA. Quick copy + JSX pass.

---

## Deferred to own session

**Visual pass — Simulator layout + emoji removal + icon consistency (audits #82, #80, #79)**
All three are related. Dedicated session only: redesign Simulator config screen, remove all UI-chrome emojis, standardize room header icon boxes. Do not mix with a normal bug/fix session.

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
