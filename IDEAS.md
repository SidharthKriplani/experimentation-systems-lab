# Product Analytics Lab — Ideas Backlog

Tiered build backlog. **In Progress** = actively being built this session. **Tier 1** = high impact, buildable now. **Tier 2** = high impact, more effort or dependencies. **Tier 3** = interesting, lower priority. **Retired** = consciously not building, with reasons.

---

## In Progress

**P2 — New user experience** (V4.22, current session)
- Nav IA cleanup: remove emojis from all nav items, fix "Instrum." truncation, remove Consult from nav, fix inconsistent labels
- Pricing raise: $49 → $69 one-time (copy + Pricing.jsx + DECISIONS.md rationale)

---

## Tier 1 — High impact, buildable now

### Content
- ~~Playbook articles for BI, Instrumentation, and Take-Home rooms~~ — ✅ shipped V4.8.2
- ~~More BI cases (BI13+): real-time dashboards, Looker/Tableau case studies~~ — ✅ shipped V4.10.0 (bi13–bi16)
- ~~More Instrumentation cases: dbt data models, data lineage, schema migration~~ — ✅ shipped V4.10.0 (inst09–inst12)

### Features
- ~~`case_completed` PostHog event~~ — ✅ shipped V4.6 (all 18 runners instrumented)
- ~~Interview debrief export (PDF of session answers + model answers)~~ — ✅ shipped V4.13.0 (DebriefCopyButton — markdown copy to clipboard, wired into 4 runners)
- ~~Per-case notes that persist across sessions (currently one global textarea)~~ — ✅ shipped V4.11.0 (all runners now have pal-notes-v1 notes)
- ~~Search within a single room (room-level filter on global search)~~ — ✅ shipped V4.11.0 (room filter chips in SearchPage)
- ~~Frameworks (Playbook) page redesign~~ — ✅ shipped V4.14.0 (reference-card layout, 3-col grid, category filter tabs, distinct from Deep Dives)
- ~~Consult page — overlaps with Search~~ — ✅ cut V4.14.0
- Stripe paywall activation — flip isUnlocked() → false, test end-to-end
- Confirm `VITE_POSTHOG_KEY` is live in Vercel prod and establish WAU baseline

### Bugs
- ~~**`onResetAllProgress` missing 9 keys** (audit #62)~~ — ✅ fixed V4.6.1 (8 keys added, reset now covers all rooms)
- ~~**`case_opened` missing from 4 open functions** (audit #61)~~ — ✅ fixed V4.6.1 (BI, STF, Take-Home, Instrumentation now tracked)
- ~~**Sitemap missing 8 V4.x routes** (audit #63)~~ — ✅ fixed V4.6.1 (22 URLs, all rooms indexed)
- ~~**Home.jsx daily drill — wrong BEH case** (audit #65)~~ — ✅ fixed V4.6.1 (BEH01→BEH05, title corrected)
- ~~**Stats Room DIFFICULTY_CFG missing intermediate/advanced/staff entries** (audit #67)~~ — ✅ fixed V4.7.2 (STAT09/STAT10-12 showed "Foundational" badge incorrectly)
- ~~**STAT08 claim references seller data not shown in setup** (audit #67)~~ — ✅ fixed V4.7.2 (seller conversion data added to observedResult)
- ~~**Template literals in 9 data files** (audit #64)~~ — ✅ resolved V4.12.0 (all 26 data files audited, all clean, no changes needed)

---

## Tier 2 — High impact, more effort

### Content
- STAT17–20+: more causal inference (IV estimation, synthetic control, geo holdout) — partially done in V3.4, extend further
- Cases Room expansion: pricing strategy, international expansion (C13+)
- ~~Growth Analytics Room expansion: GA09+ — supply-side metrics, marketplace health~~ — ✅ shipped V4.8.4 (GA09–GA12)

### Features
- Stripe payment flow activation (link already scaffolded in `VITE_STRIPE_PAYMENT_LINK`) — requires flipping paywall gate + end-to-end test
- ~~Company track completion badges~~ — ✅ shipped V4.14.0 (green Complete badge on card + 🎉 banner in TrackDetail)
- ~~Dark/light mode persistence fix~~ — ✅ already in place via index.html inline script (was pre-existing)
- Difficulty progression lock (must complete junior before senior unlocks) — opt-in mode only

### Platform
- First-Time User cold walk-through audit with sidebar nav (incognito, every confusion point noted) — sidebar is new in V4.7, cold path not yet audited
- IP/Moat audit — what's genuinely hard to replicate? What to double down on?
- MVP/Weight audit — which features earn their place? Consolidation candidates?
- **India PM Company Tracks** — Blinkit, CRED, Meesho, Zepto, Myntra, Swiggy, Razorpay, Flipkart, PhonePe, Paytm etc. Round-by-round maps exist (Malay Krishna source). Infrastructure is `companyTracks.js`. Blocked on: no data that Indian users are on PAL yet; content needs to be specific enough to actually prep against, not just round-name lists.

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
