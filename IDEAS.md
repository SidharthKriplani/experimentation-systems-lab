# Product Analytics Lab — Ideas Backlog

Tiered build backlog. **In Progress** = actively being built this session. **Tier 1** = high impact, buildable now. **Tier 2** = high impact, more effort or dependencies. **Tier 3** = interesting, lower priority. **Retired** = consciously not building, with reasons.

---

## In Progress

**PAUSED — feature building suspended as of V4.25.1.**
Next actions before any new feature work:
1. Confirm `VITE_POSTHOG_KEY` is live in Vercel prod and establish WAU baseline
2. Watch 20 real sessions — which room first, where do they drop off, do they reach debrief?
3. Decide on paywall flip based on observed usage, not assumptions

_No new features until PostHog baseline is established._

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
- **`gated: true` per-case paywall flag** (from GenAI Lab — 163 questions pre-tagged) — add `isFree` boolean to every case/module that should be free-tier; currently all gating is coarse (isUnlocked() global). Enables surgical free tier without touching paywall logic. Zero UX change; prerequisite for Stripe activation.
- Confirm `VITE_POSTHOG_KEY` is live in Vercel prod and establish WAU baseline
- ~~**Next-case highlight for all 15 remaining case room browsers** (audit #72)~~ — ✅ shipped V4.25.0 (all 16 browsers now have firstUnstartedId + accent border + "Next →" badge, each using room color var)
- ~~**Sticky next CTA for RCARunner, CaseRunner, BIRunner** (audit #72)~~ — ✅ shipped V4.25.0 (position-fixed bottom bar with back + next buttons)
- ~~**Progress sync on tab close for signed-in users** (audit #73)~~ — ✅ shipped V4.25.0 (visibilitychange listener in App.jsx)
- ~~**Delete Header.jsx or document it as unused** (audit #73)~~ — ✅ shipped V4.25.0 (comment added noting Sidebar.jsx is the real nav)
- ~~**Sign-in button in mobile topbar** (audit #73)~~ — ✅ shipped V4.25.0 (sign-in button + avatar added to mobile-topbar right slot)

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
- **Multi-part escalating case dossiers** (from ML Systems Lab pattern) — 3–5 part company scenarios where each part builds on previous answer. E.g. "Google retention case: (1) define churn metric; (2) design experiment; (3) handle confound in results; (4) make trade-off decision." Deeper than current Cases Room format.
- **Interview Q&A bank with 4-tier model answers** (from ML Systems Lab InterviewQATab) — 50+ curated questions ("Walk me through an A/B test," "How would you debug a retention drop?") with model answers at Junior/Mid/Senior/Principal tiers. Directly plugs into Behavioral + Stats + Metrics rooms.
- **"Analytics Failures" catalog** (from GenAI Lab Debug pattern) — 25 named failure patterns: bad event taxonomy, selection bias in A/B, cohort leakage, Simpson's Paradox in segmentation, metric definition drift, silent imputation, etc. Failure modes catalog for RCA, Metrics, Growth rooms.

### Features
- Stripe payment flow activation (link already scaffolded in `VITE_STRIPE_PAYMENT_LINK`) — requires flipping paywall gate + end-to-end test
- ~~Company track completion badges~~ — ✅ shipped V4.14.0 (green Complete badge on card + 🎉 banner in TrackDetail)
- ~~Dark/light mode persistence fix~~ — ✅ already in place via index.html inline script (was pre-existing)
- Difficulty progression lock (must complete junior before senior unlocks) — opt-in mode only
- **Learning paths with checkpoint tracking** (from ML Systems Lab, directly portable) — "6-week Analytics Interview Ready," "Metrics Mastery Track," "PM Onboarding Path." Each path is a guided sequence across rooms, with step completion checkmarks + progress counter (X/N steps). localStorage pattern identical to existing rooms.
- **JD-to-skill-gap mapper** (from ML Systems Lab JDPrepTab + GenAI Lab PrepLab) — paste a job description → extract required skills against PAL room mastery → surface targeted drill questions. Extends Defense Doc Generator.
- **Per-room breakdown in mock exam debrief** (from ML Systems Lab CombinatorTab) — after Interview Simulator session, show visual bar chart: Metrics 90% / Growth 65% / Behavioral 78% / Stats 80%. Gives clearer skill gap signal than current pass/fail format.
- **Verbal practice with speech-to-text** (from ML Systems Lab VerbatimTab) — Web Speech API, user speaks 2-min answer to interview question, transcript shown, self-score on 4 criteria (clarity, depth, speed, recovery). Already have the interview question bank.

### Features
- **Quiz Me on Playbook articles** (from GenAI Lab — auto-generated MCQs from article content) — every Playbook article gets a "Quiz Me" button that generates 3–5 MCQs from the article body. Transforms passive reading into active recall. Extends the MCQ Trainer without new manual content.
- **Playbook → practice direct linking** (from ML Systems Lab ∇ Gradient pattern) — every Playbook/Gradient article has a "Practice this" link at the bottom that navigates directly to the most relevant case in the relevant room. Currently articles and cases are disconnected. This closes the read-to-practice loop in one tap.
- **Timed exam lock mechanic** (from ML Systems Lab Combinator) — 30/45/60-min option where answers are locked until the timer ends. Current Interview Simulator has no time pressure. The lock mechanic makes it feel like a real screen.
- **Production bug debugging room** (from ML Systems Lab Code Bugs tab — 20 Python/SQL production bugs) — dedicated room for debugging broken analytics code: wrong aggregation, off-by-one in window functions, silent NULL handling, metric definition bugs. Different from Code Room (which is execution-focused). Scenario: "this query is running but giving the wrong answer — find it."
- **PM Practitioner tab** (from GenAI Lab AI Product tab analog) — dedicated tab/section for PM-specific tools: PRD critique simulator, stakeholder explainer, metric trade-off evaluator. PAL skews analyst-heavy; this anchors the PM audience.
- **Single forward pointer after case debrief** (from GenAI Lab principle) — upgrade "Forward-pointer card" (Tier 3) to enforce ONE next step, not 3–5 options. Genai lab implemented this as a single "What to do next" card with no menu. Prevents decision paralysis at debrief end.

### Platform
- **Three front doors IA audit** (from GenAI Lab — Build/Prove/Navigate structure) — audit PAL's home and nav for whether users can identify their entry mode in <5 sec. GenAI lab organizes around Build/Prove/Navigate. PAL equivalent: Practice (rooms) / Assess (Simulator+Trainer) / Navigate (Defense Doc+Company Tracks). Check if this framing improves cold-start clarity.
- **Create PARKED.md** (from GenAI Lab pattern) — separate file for consciously cut or deferred features with reasons. Currently IDEAS.md "Retired" section handles this, but a dedicated PARKED.md with more context per item is cleaner. Move Retired section → PARKED.md with migration notes.
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
- **"Spot the flaw" adversarial format for RCA + Metrics** (from ML Systems Lab, adaptable) — show a plausible-looking analysis with a buried methodological error, no MCQ, user must identify and explain the flaw. Flaw types: selection bias, confounding variable, Simpson's Paradox, wrong metric, incorrect cohort definition, feature flag misconfiguration. PAL already has Spot the Flaw room (STF) — extend this mechanic into RCA and Metrics rooms as a sub-format.
- **"Senior engineer reasoning" reveal layer** (from ML Systems Lab StaffLayerTab) — after each case, show "How a Staff analytics engineer reads this" with nuanced multi-step reasoning. Currently debriefs are authoritative but don't model the thought process explicitly.

### Features
- `Escape` key closes hint accordions (currently only navigates home)
- Mobile bottom nav rail for most-used rooms
- "Shuffle" button in MCQ Trainer (randomise across all 40 questions)
- Per-session score summary after Interview Simulator (shareable card)
- Consultation Space expansion: show heatmap of which concepts are most queried
- **Weak topic heatmap in Trainer debrief** (from ML Systems Lab TrainerTab, directly portable) — after MCQ drill session, show colored grid: Stats/Metrics/RCA/Design/etc. with % correct per room. "Study these next" surface specific weak-room cases.
- **Forward-pointer card at case/challenge endings** (from GenAI Lab sprint pattern, directly portable) — every case completion shows a "Master this concept" card: one related case to try next + one Defense Doc angle + one Company Track suggestion. Removes the dead-end after debrief.
- **"Share score" clipboard button** (from ML Systems Lab, directly portable) — one-click copy of score summary. "PAL: 18/20 · 90% · Strong: Metrics · Weak: Growth Analytics" → paste to LinkedIn or resume.
- **Difficulty badges on room entry cards** (from GenAI Lab pattern, directly portable) — label each card with difficulty tier (Junior/Mid/Senior) and estimated time. Makes progression legible at a glance.
- **91-day practice heatmap** (already on Progress page) — already shipped. Confirm it's visible on the main Progress dashboard.
- **Keyboard shortcuts in Trainer/Challenges** (from ML Systems Lab, directly portable) — press 1/2/3/4 to select MCQ options, Enter to submit, N for next. Currently requires mouse clicks.
- **Skill category tagging across rooms** (from ML Systems Lab/GenAI Lab pattern, adaptable) — define 8 core skills (Metrics Design, Statistical Thinking, RCA, Storytelling, Technical Depth, Product Sense, Systems Thinking, Business Acumen) and tag every case/question. Enables cross-room skill-based filtering in Search.
- **Progress export/import** (from ML Systems Lab, directly portable) — "Export my progress" button (JSON snapshot of all localStorage keys), "Import progress" for device handoff without Supabase auth.
- **"Product-first" framing audit** (from GenAI Lab copy pattern) — reframe room descriptions from "Practice X questions" to "Do X like a staff analyst." Not a feature — a copy pass on all room cards, Home hero, and Pricing page.
- **ELI5 mode toggle on Playbook articles** (from GenAI Lab) — toggle that rewrites article body at a simpler register: shorter sentences, no jargon, plain analogies. Useful for users early in their learning curve without requiring separate content.
- **PWA + offline support** (from GenAI Lab — service worker, installable PWA) — add manifest.json + service worker to cache static assets. PAL is entirely static; offline support is achievable without backend changes. Useful for mobile commute prep.

### Platform
- Review Queue smarter scheduling (weight by room difficulty + time since last attempt)
- Learning path completion certificates (downloadable, shareable on LinkedIn)
- "What changed" digest for returning users (new cases since last visit)
- **Fidelity badges on Simulator scenarios** (from ML Systems Lab pattern) — label each interactive scenario: `~` Simulated (scripted), `◌` Illustrative (conceptual). Builds user trust about what is realistic vs. simplified.
- **Breadcrumb nav on case runners** (from ML Systems Lab, adaptable) — "PAL > RCA > Case Bank > Case #47" breadcrumb in runner header. Makes navigation feel less like a dead end.

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
