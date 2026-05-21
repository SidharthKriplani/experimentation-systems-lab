# Product Analytics Lab — Ideas Backlog

Tiered build backlog. **In Progress** = actively being built this session. **Tier 1** = high impact, buildable now. **Tier 2** = high impact, more effort or dependencies. **Tier 3** = interesting, lower priority. **Retired** = consciously not building, with reasons.

---

## In Progress

_(nothing active — update this at session start when pulling from Tier 1)_

---

## Tier 1 — High impact, buildable now

### Content
- Playbook articles for BI, Instrumentation, and Take-Home rooms (these rooms have no linked articles yet — breaks the learn→practice loop)
- More BI cases (BI13+): real-time dashboards, Looker/Tableau case studies
- More Instrumentation cases: dbt data models, data lineage, schema migration

### Features
- ~~`case_completed` PostHog event~~ — ✅ shipped V4.6 (all 18 runners instrumented)
- Interview debrief export (PDF of session answers + model answers) — high-value, users want to share results
- Per-case notes that persist across sessions (currently one global textarea)
- Search within a single room (room-level filter on global search)

### Infrastructure
- Confirm `VITE_POSTHOG_KEY` is live in Vercel prod and establish WAU baseline
- `isUnlocked()` → false when Stripe is live; flip the gate and test the paywall flow end-to-end

---

## Tier 2 — High impact, more effort

### Content
- STAT17–20+: more causal inference (IV estimation, synthetic control, geo holdout) — partially done in V3.4, extend further
- Cases Room expansion: pricing strategy, international expansion (C13+)
- Growth Analytics Room expansion: GA09+ — supply-side metrics, marketplace health

### Features
- Stripe payment flow activation (link already scaffolded in `VITE_STRIPE_PAYMENT_LINK`) — requires flipping paywall gate + end-to-end test
- Company track completion badges
- Dark/light mode persistence fix (survives hard refresh without flash)
- Difficulty progression lock (must complete junior before senior unlocks) — opt-in mode only

### Platform
- First-Time User cold walk-through audit (incognito, every confusion point noted) — feeds directly into Tier 1 UX fixes
- IP/Moat audit — what's genuinely hard to replicate? What to double down on?
- MVP/Weight audit — which features earn their place? Consolidation candidates?

---

## Tier 3 — Interesting, lower priority

### Content
- More Take-Home prompts (TH06+): marketplace, fintech, health domains
- Behavioral Room expansion: BEH31+ for Staff/Director-level leadership scenarios
- Estimation Room: industry-specific tracks (fintech, healthtech, marketplace)

### Features
- `Escape` key closes hint accordions (currently only navigates home)
- Mobile bottom nav rail for most-used rooms
- "Shuffle" button in MCQ Trainer (randomise across all 40 questions)
- Per-session score summary after Interview Simulator (shareable card)
- Consultation Space expansion: show heatmap of which concepts are most queried

### Platform
- Review Queue smarter scheduling (weight by room difficulty + time since last attempt)
- Learning path completion certificates (downloadable, shareable on LinkedIn)
- "What changed" digest for returning users (new cases since last visit)

---

## Retired — Consciously not building

| Idea | Reason |
|---|---|
| Social features (leaderboards, score sharing, community) | Distorts motivation toward proxy metrics; users optimise for score not learning |
| Mobile app | Content is inherently desktop — tables, charts, multi-column layouts don't translate |
| Video content | Passive, expensive to produce, doesn't differentiate from every other prep course |
| LMS structure (required curriculum, forced sequence, completion gates) | Implies a course; PAL is a practice space you return to, not a course you complete |
| AI evaluation of free-text answers | Expensive per-call, consistency problems, latency; defer to V5+ when revenue supports it |
| Team accounts / org dashboards | Requires backend; V5 territory |
| API / embed for third parties | Premature platform thinking; not enough users yet to justify |
| Email / notification system | Engagement mechanics distract from content quality |
| Product Cases Room as free-text only | Format breaks pre-computed scoring model; needs AI eval which is retired above |
| Stats Room as text-heavy MVP | Better to not ship than to ship another textbook |
| Cross-device sync | Requires backend; not a V4 problem |
| Standalone GenAI room | GenAI is a thread across rooms, not a room itself; would produce thin content |

---

## ✅ Shipped through V4.5 (full record)

### Rooms (16 total)
- Stats Foundations (sf01–sf20): 20 interactive modules
- Stats Room (STAT01–16): claim-evaluation mechanic
- Metrics Room (M01–M08)
- Design Room (D01–D16)
- Review Room (S01–S16)
- RCA Room (RCA01–12) with SQL validation step
- Cases Room (C01–C12)
- Code Room (code01–22): SQL + Python + Pyodide live runner
- Product Design Room (pd01–pd16)
- Prioritization Room (pri01–pri12)
- Behavioral Room (BEH01–30)
- Estimation Room (EST01–30)
- Growth Analytics Room (GA01–08) with Recharts visualizations
- BI Room (BI01–12)
- Spot the Flaw (STF01–12)
- Analytics Instrumentation Room (inst01–08)

### Practice tools
- Cross-Room Challenges (CHL01–06)
- Take-Home Challenges (TH01–05)
- Interview Simulator (DS/PM mode, MCQ mode, speech practice)
- A/B Test Interpreter (z-test, CI, SRM, multiple testing)
- MCQ Trainer (40 questions, 4 categories)

### Discovery + navigation tools
- Global Search (all rooms, keyboard shortcut `/` or `Ctrl+K`)
- Consultation Space (keyword → cases + articles + MCQs)
- Defense Doc Generator (JD → 7-day study plan, printable)
- Bookmarks (cross-room, persistent)
- Company Tracks (FAANG prep packs)
- Grouped header nav (ROOMS / PRACTICE / TOOLS / LEARN / TRACK)
- Keyboard shortcuts hook

### Infrastructure
- React.lazy + Suspense code splitting (30+ chunks)
- Pyodide in-browser Python execution
- PostHog analytics (env-var gated, PII-stripped)
- 91-day practice heatmap
- Role readiness score (Getting Started / Analyst / Senior / Staff)
- Spaced repetition review queue
- Leadership Lens toggle (GA + RCA runners)
- Per-room progress reset
- Bookmark buttons across debrief panels
- Active recall textarea (Stats, Behavioral, Estimation, RCA)
- First-run onboarding modal
- Daily Drill (epoch-seeded random case)
- Last Visited labels on room cards

### Content
- 80 long-form Playbook + Blog articles
- 40 MCQ questions with explanations
- leadershipNote on all GA and RCA01–08 cases
- Worked examples on all 47 framework articles
- keyTakeaways + references on 13 top Playbook articles
