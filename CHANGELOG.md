# Product Analytics Lab — Changelog

Full build lineage. Covers what changed, why, what was added, what was fixed, and which files were touched in each release. Intended to make the project understandable to any future contributor, collaborator, or reviewer without needing to read the git log.

---

## V3.5 — Stat Foundations Room + Blog Layer + New Learning Paths + Content Completions
**Date:** May 2026
**Commit message:** "feat: V3.5 — Stat Foundations Room, Blog layer fully populated, new learning paths, stats next-case nav, completionMap, playbook worked examples"
**Files changed:** `src/data/statsFoundationsModules.js` (NEW), `src/utils/statsFoundationsProgress.js` (NEW), `src/pages/StatsFoundationsBrowser.jsx` (NEW), `src/components/statsFoundations/StatsFoundationsRunner.jsx` (NEW), `src/components/statsFoundations/modules/Module01_WhatIsData.jsx` through `Module12_Power.jsx` (NEW), `src/pages/BlogBrowser.jsx`, `src/data/learningPaths.js`, `src/components/stats/StatsRunner.jsx`, `src/App.jsx`, `src/components/layout/Header.jsx`, `src/pages/Progress.jsx`, `CHANGELOG.md`, `IDEAS.md`

### Why
Three categories of work: a brand-new foundational statistics education room (the "learn before you practice" layer for stats concepts), full population of the Blog / Learn layer (was 0/80 articles with content), and several V3.5 backlog items (stats next-case nav, completionMap gaps, new learning paths, playbook worked examples).

### Stat Foundations Room (NEW)
- 12 sequential interactive modules: What is Data → Mean/Median/Mode → Variance/SD → Normal Distribution → Z-Scores → Areas Under the Curve → Sampling → Standard Error → CLT → Confidence Intervals → Hypothesis Testing → Power & Effect Size
- Each module has a live SVG/recharts visualization with sliders and real-time calculations
- Sequential learning path browser with progress tracking
- Files: `src/data/statsFoundationsModules.js`, `src/utils/statsFoundationsProgress.js`, `src/pages/StatsFoundationsBrowser.jsx`, `src/components/statsFoundations/StatsFoundationsRunner.jsx`, `src/components/statsFoundations/modules/Module01_WhatIsData.jsx` through `Module12_Power.jsx`
- "Foundations" nav item added to header

### Blog / Learn Layer
- `src/pages/BlogBrowser.jsx` fully populated: all ~80 articles now have full narrative content (was 0/80 with content before)
- Inline post reader built inside BlogBrowser — clicking an article opens it inline; stubs show "Coming Soon"
- CTAs at end of each article link to the corresponding practice room
- Nav updated: "Learn" (Blog) is now a separate nav item from "Playbook"

### New Learning Paths
- **"Code Track"**: Funnel SQL → Mix Shift SQL → CUPED SQL → Bootstrap Python
- **"Full-Stack DS Interview"**: Stats → RCA → Business Case → Behavioral → Estimation

### Stats Room next-case nav
- `StatsRunner` now receives an `onNext` prop — "Next module →" button appears after the debrief, matching all other rooms
- `getNextStatsId()` helper added to `App.jsx`

### Progress page completionMap
- Added 6 missing rooms: Code, ProductDesign, Prioritization, Behavioral, Estimation, StatFoundations

### Playbook worked examples
- All ~47 framework articles now have worked examples (heading + example block appended to content)
- 39 articles added in this release; 8 were done in V3.4

---

## V3.4 — Gap-Fill: 6 New Rooms / Expansions + 2 New Room Types
**Date:** May 2026
**Commit message:** "feat: V3.4 — RCA/Cases expansion, causal inference stats, interview SQL, Behavioral + Estimation rooms"
**Files changed:** `src/data/rcaCases.js`, `src/data/businessCases.js`, `src/data/statsModules.js`, `src/data/codeModules.js`, `src/data/behavioralQuestions.js` (NEW), `src/data/estimationProblems.js` (NEW), `src/utils/behavioralProgress.js` (NEW), `src/utils/estimationProgress.js` (NEW), `src/pages/BehavioralBrowser.jsx` (NEW), `src/pages/EstimationBrowser.jsx` (NEW), `src/components/behavioral/BehavioralRunner.jsx` (NEW), `src/components/estimation/EstimationRunner.jsx` (NEW), `src/App.jsx`, `src/components/layout/Header.jsx`, `CHANGELOG.md`, `IDEAS.md`

### Why
Honest platform audit identified 6 material gaps: RCA and Cases rooms were thin relative to interview frequency; no behavioral/leadership layer existed; no Fermi/estimation room; no causal inference beyond A/B; Code Room lacked classic interview-format SQL. All 6 gaps addressed in this release.

### RCA Room — RCA07–RCA12 (12 total)
- **RCA07** Crafted marketplace seller fraud spike — Express Seller low-friction onboarding exploited by coordinated fraud ring. Paired SQL: fraud rate by seller cohort age × onboarding tier × buyer age.
- **RCA08** Prism DAU drop post Auto-Play rollout — session exhaustion effect: longer sessions reduce habitual return frequency, D1 retention proxy reveals the mechanism.
- **RCA09** Threadline MRR growth near-zero — SMB segment NRR collapse (82%) while enterprise remains at 118%; MRR waterfall decomposition via LAG().
- **RCA10** Threadline monthly churn 2.3x spike — 25% month-to-month price increase hit price-elastic short-tenure SMB accounts at their next billing cycle.
- **RCA11** Spark ad revenue per DAU -22% — content safety filter over-triggering at 7-8x expected rate, suppressing ads on high-CPM engagement content.
- **RCA12** Prism new creator 7-day retention -30% — algorithm cold-start failure: completion-rate ranking suppresses new creator impressions 41%, breaking the feedback loop.

### Business Cases Room — C07–C12 (12 total)
- **C07** Threadline pricing decision — blanket vs. tiered 20% price increase; segment elasticity by SMB/enterprise; NRR as the right metric (not new ARR).
- **C08** Crafted build vs. buy AI recommendation engine — validate that recommendation is the bottleneck first; 3-year TCO framing; vendor-first with escape clause.
- **C09** Spark SEA international expansion — SEA CPMs are 80-90% lower; unit economics break-even per DAU must precede market sizing; Indonesia-first pilot.
- **C10** Prism cost-cutting $2M — map costs against growth contribution before cutting; sequence infrastructure → low-ROI marketing → headcount.
- **C11** Threadline competitive response — 2 lost deals ≠ a trend; 90-day win/loss tracking with pre-committed threshold before pricing changes.
- **C12** Crafted product sunset (Crafted Local events) — LTV of 2,400 at-risk sellers vs. $1.2M cost; three-option matrix (sunset / min-viable / keep).

### Stats Room — STAT17–20: Causal Inference beyond A/B (20 total)
- **STAT17** DiD — Threadline onboarding regional rollout: 7pp - 4pp control trend = 3pp DiD estimate; parallel trends assumption.
- **STAT18** Regression Discontinuity — Crafted Top Seller badge at 100-review threshold; manipulation test; external validity warning on threshold change.
- **STAT19** Synthetic Control — Spark Canada feature rollout; single-country US comparison as weak counterfactual; donor pool weighting.
- **STAT20** Instrumental Variables — Crafted promotions OLS selection bias; A/B email invite as valid instrument; LATE vs. ATE distinction.

### Code Room — C15–C18: Interview-Format SQL (18 total)
- **C15** Anti-join (watched ≥3, never shared) — LEFT JOIN IS NULL vs. NOT EXISTS, performance comparison.
- **C16** Rolling 7-day DAU — date spine + self-join; why COUNT DISTINCT breaks RANGE BETWEEN window frames.
- **C17** Top-N per group — DENSE_RANK vs. RANK vs. ROW_NUMBER; CTE wrapping requirement.
- **C18** Sessionization — LAG → gap flag → cumulative SUM = session_id; highest-frequency advanced SQL interview pattern.

### Behavioral / Leadership Room (NEW — 8 questions)
New room: `src/pages/BehavioralBrowser.jsx` + `src/components/behavioral/BehavioralRunner.jsx` + `src/data/behavioralQuestions.js` + `src/utils/behavioralProgress.js`
- 8 questions covering: influence, communication, data-impact, conflict, leadership categories
- STAR guide collapsible, model answer in Situation/Task/Action/Result prose blocks
- Self-rating: "Nailed the structure + insight" / "Had the structure, missed a key principle" / "Needs more practice"
- Room color: `var(--accent)` (blue). BEH01 and BEH02 free.

### Estimation / Fermi Room (NEW — 8 problems)
New room: `src/pages/EstimationBrowser.jsx` + `src/components/estimation/EstimationRunner.jsx` + `src/data/estimationProblems.js` + `src/utils/estimationProgress.js`
- 8 problems: Uber rides NYC, YouTube storage cost, WhatsApp India MAU, Yelp restaurants, Spotify songs, Google searches/sec, Airbnb host CAC, Instagram revenue per user
- Approach badge (bottom-up / top-down / hybrid), collapsible framework steps + hints
- Model answer shows real arithmetic inline; highlighted final estimate; sanity checks
- Room color: `var(--teal)`. EST01 and EST02 free.

### App.jsx + Header.jsx changes
- 4 new lazy imports (BehavioralBrowser, BehavioralRunner, EstimationBrowser, EstimationRunner)
- 2 new data imports (behavioralQuestions, estimationProblems)
- 2 new progress util imports
- 2 new state vars (activeBehavioralId, activeEstimationId)
- 2 new open functions (openBehavioralQuestion, openEstimationProblem)
- 2 new getNext helpers (getNextBehavioralId, getNextEstimationId)
- 2 new computed active/next vars each
- JSX routing blocks for behavioral + estimation browser + runner
- onResetAllProgress updated with new localStorage keys
- Header: added "Behavioral" and "Estimation" nav items; active-state for both runners

---

## V3.3.1 — Next-case nav for Product Design + Code runners
**Date:** May 2026
**Commit message:** "feat: V3.3.1 — next-case nav on ProductDesign + Code runners, CHANGELOG/IDEAS update"
**Files changed:** `src/components/productDesign/ProductDesignRunner.jsx`, `src/components/code/CodeRunner.jsx`, `src/App.jsx`, `CHANGELOG.md`, `IDEAS.md`

### Why
Next-case navigation was added to Metrics, RCA, Cases, Design, and Prioritization in V3.2.3/V3.3, but ProductDesign and Code runners were missed. Both rooms now have the same "Next →" flow as all other rooms — completing the pattern across the full platform.

### What changed
- `ProductDesignRunner.jsx`: added `onNext` prop through `DebriefView` inner component; "Next scenario →" button renders alongside "← Back to Room" and "Retry Scenario" in the debrief action row.
- `CodeRunner.jsx`: added `onNext` prop through `ModelAnswerPanel` inner component; "Next module →" button renders alongside "Try again from scratch" after the model answer.
- `App.jsx`: added `getNextPDScenarioId` and `getNextCodeModuleId` helpers (same accessible-filter + findIndex pattern as all other rooms); computed `nextPDScenarioId` and `nextCodeModuleId`; passed `onNext` to both runners.

---

## V3.3 — Content Expansion + Universal Next-case Nav
**Date:** May 2026
**Commit message:** "feat: V3.3 — next-case nav expansion, 4 Code modules, M07-M08, STAT09-12"
**Files changed:** `src/components/design/DesignRunner.jsx`, `src/components/design/DesignDebriefPanel.jsx`, `src/components/prioritization/PrioritizationRunner.jsx`, `src/App.jsx`, `src/data/codeModules.js`, `src/data/metricCases.js`, `src/data/statsModules.js`

### Why
Three categories of work: completing the next-case nav pattern across remaining rooms (Design, Prioritization), and expanding all three content-heavy rooms (Code, Metrics, Stats) with new modules that cover advanced and PM-relevant concepts.

### Next-case nav wiring
- `DesignRunner` / `DesignDebriefPanel`: added `onNext` prop; "Next scenario →" button alongside "↺ Try again" in debrief footer.
- `PrioritizationRunner`: added `onNext` prop; "Next scenario →" button in post-reveal action row (purple, `marginLeft: auto`).
- `App.jsx`: added `getNextDesignScenarioId` and `getNextPrioritizationId` helpers; computed `nextDesignScenarioId` and `nextPrioritizationId`.

### Code Room — C07–C10
- **C07 CUPED in SQL** (`code07-cuped-sql`): Ardent Commerce, 4-CTE pattern computing theta via covariance formula then applying variance-reduced metric. Analyst difficulty.
- **C08 Bootstrap CI in Python** (`code08-bootstrap-python`): Loopwise B2B SaaS, 10k bootstrap samples on revenue per user (skewed distribution), percentile CI method. Senior difficulty.
- **C09 Funnel visualization with matplotlib** (`code09-funnel-viz-python`): Crestline Home, side-by-side barh chart with delta annotations, complete figure save. Analyst difficulty.
- **C10 Retention heatmap in Python** (`code10-retention-heatmap`): Threadline SaaS, cohort pivot_table, seaborn heatmap with NaN triangle masking. Senior difficulty.

### Metrics Room — M07–M08
- **M07** (`M07`): Feed ranking north-star metric — Spark social platform. Tradeoff between likes, time-spent, and saves/shares as north star. Tests whether candidates understand that time-spent optimizes for addiction, not value.
- **M08** (`M08`): RTB marketplace metrics — Clearstream ad exchange. Two-sided liquidity score design vs. revenue-maximizing metrics that destroy long-run marketplace health.

### Stats Room — STAT09–12
- **STAT09** (`stat09-cuped-variance`): CUPED post-hoc vs pre-specified. Pre/post revenue correlation = 0.68, p_raw = 0.12 → p_cuped = 0.031. Correct answer: valid only if pre-specified.
- **STAT10** (`stat10-novelty-effect`): Novelty effect decay — week 1 +8% (p<0.001) vs week 4 +1.2% (p=0.21). Correct answer: week-4 result is statistically indistinguishable from zero; don't ship on novelty.
- **STAT11** (`stat11-bayesian-stopping`): Bayesian stopping rules — P(treatment > control) = 0.96 at day 8 of planned 14-day run. Correct answer: valid only if stopping rule was pre-specified.
- **STAT12** (`stat12-longrun-shortrun`): CTR vs 30-day retention divergence — Orbit Streaming. CTR +6.2% (p<0.001), retention -0.8% (p=0.31). Correct answer: directionally negative downstream signal warrants longer follow-up before ship.

---

## V3.2.4 — Performance, Analytics, UX (genai-systems-lab Homogeneity Pass)
**Date:** May 2026
**Commit message:** "feat: PostHog analytics, lazy loading, learning path outcomes (V3.2.4)"
**Files changed:** `src/utils/analytics.js` (new), `.env.example` (new), `.gitignore`, `src/main.jsx`, `src/App.jsx`, `src/data/learningPaths.js`, `src/pages/Home.jsx`

### Why
Three features ported from the sibling product (genai-systems-lab) to maintain ecosystem homogeneity: analytics instrumentation, bundle performance, and guided onboarding clarity. Plus a `.env` security fix caught during audit.

### Analytics (PostHog)
- `src/utils/analytics.js`: thin PostHog CDN wrapper. Env-var gated (`VITE_POSTHOG_KEY`) — app works identically without it (no-op in prod, console.debug in dev). Strips PII keys (email, name, ip) via `sanitize_properties`. `autocapture: false`, `capture_pageview: false` — only explicit events are collected.
- `src/main.jsx`: calls `initAnalytics()` before render.
- `src/App.jsx`: imports `track()` and fires `page_viewed` on all navigation, `case_opened` on every room open (with room + id + title), `paywall_hit` when a locked case is attempted, and `unlocked` on successful beta unlock.
- `.env.example`: documents `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` for contributors.

### Lazy loading (code splitting)
- All 19 page and runner components converted from static `import` to `React.lazy()` with named-export `.then(m => ({ default: m.X }))` pattern.
- Static imports reorganized to the top of `App.jsx` (data, layout, utils), lazy `const` declarations below — valid ESM ordering.
- `<Suspense fallback={<div>Loading…</div>}>` wraps the entire `<main>` content area.
- Effect: initial JS bundle excludes all room code. Each room loads its chunk on first visit and is cached thereafter.

### Learning path outcome statements
- `src/data/learningPaths.js`: added `outcome` field to all 4 paths with concrete "You'll…" statements describing the skill gained.
- `src/pages/Home.jsx`: path cards now render the outcome below the subtitle in italic, colored with `path.color`.

### Security fix
- `.gitignore`: added `.env` and `.env.*` (with `!.env.example` exception) — was missing entirely, which would have committed any local PostHog key.

---

## V3.2.3 — Polish Pass (Content, UX, Visual, Accessibility)
**Date:** May 2026
**Commit message:** "V3.2.3: Polish pass — content rewrites, next-case nav, expandable steps, WCAG contrast, keyboard a11y, responsive nav"
**Files changed:** `src/pages/PlaybookBrowser.jsx`, `src/components/rca/RCARunner.jsx`, `src/components/rca/RCADebriefPanel.jsx`, `src/components/metrics/MetricDebriefPanel.jsx`, `src/components/cases/CaseDebriefPanel.jsx`, `src/components/metrics/MetricsRunner.jsx`, `src/components/cases/CaseRunner.jsx`, `src/App.jsx`, `src/index.css`, `src/components/layout/Header.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/CasesBrowser.jsx`, `src/pages/DesignBrowser.jsx`, `src/pages/StatsBrowser.jsx`

### Why
Comprehensive polish sweep across three categories: content depth, UX continuity, and visual/accessibility quality. No new rooms or mechanics — all improvements to existing features.

### Content improvements

**`end-to-end-experiment` full rewrite:** Article opened with an SRM failure discovered during a live experiment, stepped through 8 stages (pre-flight → SRM investigation → business communication), added a Decision Scenarios framework_box, and added 6 keyTakeaways. This was the most-referenced article in the Playbook and deserved flagship treatment.

**`decision-rule` rewrite:** Added story opening (checkout CVR up, latency guardrail degraded, no pre-committed rule = negotiation), added "Why the Conflict Condition Is the Most Important" section, added callout box, added 5 keyTakeaways.

**`five-question-types` rewrite:** Added concrete opening story (analyst uses RCA framing for a causal question), expanded framework_box, added "Most Common Confusions" section, added 5 keyTakeaways.

**`stakeholder-communication` rewrite:** Added concrete 3-audience story (same CSS rendering bug communicated as engineer/PM/exec versions), added 5 keyTakeaways.

**keyTakeaways added to 12 articles:** `p-values`, `confidence-intervals`, `power-mde`, `type1-type2`, `practical-vs-statistical`, `simpsons-paradox`, `bayesian-vs-frequentist`, `dau-mau-ratio`, `segment-before-aggregate`, `mix-shift`, `rca-walkthrough-search`, `two-sided-marketplace-experiments`.

### UX improvements

**RCARunner expandable completed steps:** `CompletedStepCard` components are now clickable — clicking a completed step toggles it between a collapsed summary chip and an expanded view showing your chosen option with feedback text and the best answer. Full keyboard accessibility (role=button, tabIndex, onKeyDown).

**Next-case navigation on all three debrief panels:** Added "Next case →" button to `RCADebriefPanel`, `MetricDebriefPanel`, and `CaseDebriefPanel`. Button only renders when an `onNext` prop is provided. Button uses the room's accent color (yellow/green/purple respectively).

**App.jsx next-case wiring:** Added `getNextRCACaseId`, `getNextMetricsCaseId`, `getNextBusinessCaseId` helper functions (filter accessible cases, findIndex, return next or null). Computed `nextRCACaseId`, `nextMetricsCaseId`, `nextBusinessCaseId` before the render. Passed `onNext` to `RCARunner`, `MetricsRunner`, and `CaseRunner`.

### Visual and accessibility fixes

**WCAG AA contrast fix:** `--text-dim` in light mode changed from `#9ca3af` (contrast ~2.8:1, fails AA) to `#6b7280` (contrast ~4.5:1, passes AA). Dark mode `--text-dim` bumped from `#545b7a` (~2.1:1) to `#8890a8` (~4.5:1).

**Responsive nav:** Header `<nav>` now has `overflowX: 'auto'` and `scrollbarWidth: 'none'` so it scrolls horizontally on narrow viewports without breaking layout. Added `header nav::-webkit-scrollbar { display: none; }` to hide the scrollbar chrome on webkit browsers.

**Keyboard accessibility on card divs:** Added `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space handlers) to all clickable card `<div>` elements in `MetricsBrowser`, `RCABrowser`, `CasesBrowser`, `DesignBrowser`, and `StatsBrowser`. Locked cards in `CasesBrowser` get `tabIndex={-1}`.

---

## V3.2.2 — Bug Fix Pass (Routing, Paywall, Reset, Nav, Color)
**Date:** May 2026
**Commit message:** "V3.2.2: Bug fixes — routing, paywall, reset progress, nav active state, color variable"
**Files changed:** `src/App.jsx`, `src/pages/CasesBrowser.jsx`, `src/components/layout/Header.jsx`, `src/components/metrics/MetricsRunner.jsx`

### Why
Full internal audit (spawned agent cross-check) surfaced five actionable bugs: two silent routing failures, a broken paywall display, an incomplete progress reset, a missing nav item, and a lingering wrong color variable. All fixed.

### What changed

**BUG-01 — `App.jsx` `onOpenItem` routing (silent failure):**
- Both `onOpenItem` callbacks (PlaybookBrowser and QADashboard) were missing `product-design` and `prioritization` branches.
- Effect: Playbook articles linking to PD or Prioritization scenarios via "Now practice it" would silently do nothing.
- Fix: Added `else if (room === 'product-design') openPDScenario(id)` and `else if (room === 'prioritization') openPrioritizationScenario(id)` to both callbacks.

**BUG-02 — `CasesBrowser.jsx` hardcoded `isLocked={false}`:**
- `CasesBrowser` did not accept `unlocked` or `onUnlock` props. All cards had `isLocked={false}`, so C03 and C04 (non-free cases) showed no paywall indicator for locked users.
- Fix: Added `unlocked` and `onUnlock` to props. Computed `isLocked={!bc.isFree && !unlocked}` in `.map()`. Passed `onUnlock` to `CaseCard`.

**BUG-03 — `App.jsx` `onResetAllProgress` missing keys:**
- Reset function was missing `pal-code-progress-v1` and `pal-pri-progress-v1`. Product Design uses a per-scenario prefix (`pd-progress-*`) that requires iterating localStorage keys.
- Fix: Added both missing flat keys. Added `Object.keys(localStorage).filter(k => k.startsWith('pd-progress-')).forEach(k => localStorage.removeItem(k))` for product design.

**BUG-04 — `Header.jsx` missing `product-design` nav item and active state:**
- `product-design` had no nav entry — the room was unreachable from the header. `product-design-runner` had no active-state condition.
- Fix: Added `{ id: 'product-design', label: 'PM Design' }` to navItems. Added `|| (item.id === 'product-design' && currentPage === 'product-design-runner')` to isActive.

**BUG-05 — `MetricsRunner.jsx` `--teal` color remnant:**
- Two references to `var(--teal)` and `var(--teal-border)` remained in the case header label and submit button (missed in V2.2 teal→green migration).
- Fix: Replaced all instances with `var(--green)` and `var(--green-border)`.

---

## V3.2.1 — Playbook Content Quality Pass
**Date:** May 2026
**Commit message:** "V3.2.1: Playbook content quality pass — story-first rewrites of thin articles"
**Files changed:** `src/pages/PlaybookBrowser.jsx`

### Why
Content audit across all 117 Playbook articles revealed several articles that were structurally complete but lacked the narrative depth and story-first voice of the best articles. Four articles were genuinely thin (framework/checklist only, no opening story, no depth). Rewrote those with concrete scenarios, richer examples, and stronger interview applications.

### What changed
**Full rewrites (thin → substantial):**
- `take-rate` (Metrics): Expanded from 3 items to 6 with a Q2 earnings story opening, mix-shift section, double-axis analysis, and interview framing. readMin 3 → 5.
- `data-quality` (SQL & Data): Expanded from a bare checklist + callout to a full article with a story opening (silent join fanout error), six documented checks, a worked SQL example showing the fanout fix, and workflow guidance. Added relatedItems.
- `search-ranking-metrics` (Product Sense): Expanded from framework_box + callout to a full article with a concrete ranking regression story, explanation of why CTR/CVR are insufficient, a gaming hierarchy (easy to game → hard to game), and offline evaluation guidance.

**Opening narrative improvements:**
- `guardrails` (Metrics): Replaced dry "A guardrail is a metric..." opener with a concrete marketplace story (GMV up 4%, return rate up 12%, late discovery).
- `segment-before-aggregate` (RCA): Added a concrete 9:47am Slack message scenario that grounds the aggregate/segment concept in a real investigation moment.

---

## V3.2 — PM Playbook Articles + Prioritization Room + Home Role Toggle
**Date:** May 2026
**Commit message:** "V3.2: PM playbook, Prioritization Room, role toggle"
**Files changed (new):** `src/data/prioritizationScenarios.js`, `src/pages/PrioritizationBrowser.jsx`, `src/components/prioritization/PrioritizationRunner.jsx`, `src/utils/prioritizationProgress.js`
**Files changed (existing):** `src/pages/PlaybookBrowser.jsx`, `src/App.jsx`, `src/components/layout/Header.jsx`, `src/pages/Home.jsx`

### Why
V3.2 completes the PM layer started in V3.0 (Product Design Room): a Playbook article foundation for the PM track (15 articles across 4 new categories), a structured framework practice room for prioritization (the single most tested PM skill in interviews), and a role toggle on the home page so users can self-identify as DS or PM and see a relevant room ordering.

### What changed

**PM Playbook Articles (15 new):**
- `PlaybookBrowser.jsx`: Added 15 articles across 4 new categories:
  - *Product Design* (4): Jobs To Be Done, Product Design Frameworks (CIRCLES + HEART), How to Write a PRD, User Research in PM Interviews
  - *Prioritization* (5): RICE Framework, Effort–Impact Matrix, North Star vs. OKR Tension, Prioritization Under Stakeholder Conflict, Technical Debt as Velocity Tax
  - *PM Strategy* (3): Influence Without Authority, PM Interview Archetypes (Analytics PM / Growth PM / Core PM), Making Product Bets
  - *PM Career* (3): DS-to-PM Transition, The First 90 Days as a PM, Analytics PM vs. Growth PM
- `CATEGORY_CONFIG` extended with 4 new entries: Product Design (purple), Prioritization (accent), PM Strategy (blue), PM Career (muted).

**Prioritization Room (Room #9, 6 scenarios):**
- `prioritizationScenarios.js`: 6 scenarios covering the full prioritization interview surface:
  - PRI01 (Free): Spotify — Feature Backlog Sprint Planning (RICE scoring, 5-item backlog, 6-sprint capacity constraint)
  - PRI02: Airbnb — Effort–Impact Matrix (8 initiatives, 60-day VP ask, quick win identification)
  - PRI03: Notion — Technical Debt vs. New Features (velocity tax quantification, exec summary format)
  - PRI04: Meta — Growth vs. Safety Stakeholder Conflict (interest mapping, option expansion, alignment memo)
  - PRI05: Duolingo — OKR-Level Prioritization (DAU vs. learning efficacy dual mandate, CEO framing impact)
  - PRI06: Stripe — Platform vs. Feature Sequencing (3 internal requests, 2 engineers, 2-quarter plan)
- `PrioritizationBrowser.jsx`: Tag filter (RICE, effort-impact, technical debt, stakeholder conflict, OKRs, platform vs. feature), difficulty badges, completion indicators with rating color.
- `PrioritizationRunner.jsx`: Multi-schema model answer renderer (handles RICE table, 2×2 matrix, velocity tax, stakeholder memo, OKR scoring, platform analysis). Scenario-aware data display (items table, situation data, requests panel). Same self-rating pattern (Nailed it / Mostly there / Needs more work). Framework collapsible (formula + steps or quadrant grid).
- `prioritizationProgress.js`: localStorage key `pal-pri-progress-v1`.

**Home Role Toggle:**
- `Home.jsx`: Added `ROLES` constant (`DS + PM`, `Product DS`, `Product PM`). Toggle saved to localStorage (`pal-role-toggle`). DS mode sorts rooms in analytics-first order (Stats, Metrics, Design, Review, RCA, Code…). PM mode sorts rooms in PM-first order (Product Design, Prioritization, Cases…). Toggle rendered inline with the section header. Subtitle text explains the active ordering.

**Platform counts updated:**
- Hero: "64 practice cases across nine rooms" (was 58 / eight)
- Section label: "Nine rooms. Nine judgment muscles." (was Eight)
- "64 playable items" section label updated

**App.jsx routing:**
- Imports: `prioritizationScenarios`, `PrioritizationBrowser`, `PrioritizationRunner`, `getPrioritizationProgress`
- State: `activePrioritizationId`
- Function: `openPrioritizationScenario(id)` — lock-check + navigate to `prioritization-runner`
- Routes: `'prioritization'` → `PrioritizationBrowser`, `'prioritization-runner'` → `PrioritizationRunner`

**Header.jsx:**
- Added `{ id: 'prioritization', label: 'Prioritize' }` between Code and Playbook
- Active state check includes `'prioritization-runner'`

---

## V3.1 — SQL Validation Step + Code Room + GenAI Playbook Articles
**Date:** May 2026
**Commit message:** "V3.1: SQL step in RCA, Code Room, GenAI playbook"
**Files changed (new):** `src/data/codeModules.js`, `src/pages/CodeBrowser.jsx`, `src/components/code/CodeRunner.jsx`, `src/utils/codeProgress.js`
**Files changed (existing):** `src/data/rcaCases.js`, `src/components/rca/RCARunner.jsx`, `src/App.jsx`, `src/pages/Home.jsx`, `src/components/layout/Header.jsx`, `src/pages/PlaybookBrowser.jsx`

### Why
V3.1 completes the three features identified in the IDEAS.md backlog: SQL validation in RCA (unique in the prep space — no one else bridges diagnosis to code), a Code Room for analytics SQL + Python in product context (not syntax drills), and GenAI threading through the Playbook (new articles on LLM eval, hallucination, and AI experiment design).

### What changed

**SQL Validation Step in RCA Room:**
- `rcaCases.js`: Added `sqlStep: { prompt, hints, modelQuery, annotation }` to all 6 RCA cases (RCA01–RCA06). Each query is specific to the case's confirmed hypothesis — not generic SQL, but the exact query a senior analyst would write to validate that diagnosis (e.g., RCA01: Visa success rate by platform pre/post deploy; RCA06: true resolution rate with re-contact classification by intent + confidence bucket).
- `RCARunner.jsx`: Added `SQL_RATINGS` constant and three new state variables (`sqlResponse`, `sqlRevealed`, `sqlRating`). Added `SQLValidationStep` component (free-text textarea, hints, model query code block with annotation, self-rating). Added SQL step CTA to the bottom of the debrief view (only renders if `rcaCase.sqlStep` exists). New `'sql'` view state navigates to `SQLValidationStep` and back. Gated reveal: ≥20 chars required. Same design language as Product Design Room (partial/strong/miss self-rating).

**Code Room (new room #8):**
- `codeModules.js`: 6 modules — 4 SQL, 2 Python. Each module has: `scenario` (company context + schema + task), `hints[]`, `partialCode` (code with blanks), `modelAnswer` (complete solution), `keyInsights[]`. Modules: CODE01 Funnel Query (free), CODE02 Retention Cohort (SQL), CODE03 A/B Test Significance (Python/scipy), CODE04 CUPED (Python/Pandas), CODE05 SRM Detection (SQL/chi-squared), CODE06 Mix Shift Decomposition (SQL/shift-share). All grounded in scenarios from existing RCA/Metrics/Cases rooms.
- `CodeBrowser.jsx`: Track filter (SQL/Python/All), module cards with track badge, difficulty badge, scenario context snippet, tags, and completion state. Lock gate for non-free modules.
- `CodeRunner.jsx`: Scenario panel with schema + task. Hints collapsible. Starter code collapsible. Free-text textarea (≥30 chars to reveal). Model answer panel with syntax-highlighted pre block + key insights. Self-rating (Nailed it / Got the idea / Needs more practice). Retry from scratch button.
- `codeProgress.js`: localStorage save/load via key `pal-code-progress-v1`. Saves response, rating, completedAt per module.
- `App.jsx`: Added `activeCodeModuleId` state, `openCodeModule()` function, `code` and `code-runner` page routing, imports for all new files.
- `Header.jsx`: Added `code` nav item between Cases and Playbook. Added `code-runner` to active-state detection.
- `Home.jsx`: Added Code Room as 8th room card. Added RoomList entry with 6 module lines. Updated hero copy from "seven rooms" to "eight rooms", "52 items" to "58 items".

**GenAI Playbook Articles (3 new articles):**
- `llm-eval-metrics`: LLM evaluation metrics — reference-based (BLEU/ROUGE), reference-free, LLM-as-judge, the evaluation paradox, pairing offline and online signals. 7 min read. Full keyTakeaways + references.
- `hallucination-as-metric`: Hallucination as a guardrail — three types (fabrication, attribution, contradiction), production definition, stratified sampling approach, using hallucination as a hard guardrail in experiments. 6 min read. Full keyTakeaways + references.
- `ai-experiment-design`: Designing AI experiments — trust lag problem, adjusted runtime (3 weeks minimum), task completion as primary metric, latency as first-class guardrail, novelty check by cohort-day. 6 min read. Full keyTakeaways + references.

### Architectural decisions
- SQL step is optional (renders via CTA at bottom of debrief, not forced) — keeps the core RCA flow clean while adding depth for users who want it
- Code Room uses the same self-rating pattern as Product Design Room — consistent with the open-ended room philosophy: the goal is judgment, not automated scoring
- GenAI articles positioned as a lens (added to existing GenAI Analytics category, not a new section) — aligns with the IDEAS.md architecture decision that GenAI is a thread, not a standalone room

---

## V3.0 — Product Design Room + Content Audit + PM Layer Begin
**Date:** May 2026
**Commit message:** "V3.0: Product Design Room + content audit"
**Files changed (new):** `src/data/productDesignScenarios.js`, `src/pages/ProductDesignBrowser.jsx`, `src/components/productDesign/ProductDesignRunner.jsx`, `src/utils/productDesignProgress.js`
**Files changed (existing):** `src/App.jsx`, `src/pages/Home.jsx`, `src/components/playbook/PostDetail.jsx`, `src/pages/PlaybookBrowser.jsx`, `src/pages/BlogBrowser.jsx`

### Why
V3.0 begins the PM layer of the product — extending from pure DS/analytics prep into product management preparation. The core thesis: product analysts, aspiring PMs, and DS-PM hybrid roles all need PM judgment alongside analytics judgment. Product design (the "how would you build X?" question) is the most common PM interview question type and was completely absent from the platform.

Simultaneously, a content audit pass improved the Learn layer: emotional/human-tone rewrites, key takeaways, and citation references on the 10 highest-traffic playbook articles.

### What changed

**Product Design Room (new room #7):**
- `productDesignScenarios.js`: 8 full PM product design scenarios. Companies: Spotify (podcast discovery), Airbnb (host response lag), Slack (notification fatigue), Google Maps (EV drivers), LinkedIn (application quality), DoorDash (post-order cancellations), Stripe (SMB revenue understanding), Instagram (creator growth). Each scenario has 5 phases: Clarify & Scope, User Segments, Goals & Metrics, Generate Solutions, Prioritize & Next Steps. Each phase has: `prompt`, `guidance`, `criteria` checklist (5–7 items), `modelAnswer` (full senior PM model response).
- `ProductDesignBrowser.jsx`: Browser with company badges, difficulty tags, category badges, phase progress pips, completion state rendering.
- `ProductDesignRunner.jsx`: Free-text textarea per phase. Gated reveal: user must write ≥20 characters before seeing model answer. Self-rating per phase (Strong/Partial/Missed). Full debrief view with expandable phase breakdowns comparing user answer to model answer. Self-scored via `computeProductDesignScore()`.
- `productDesignProgress.js`: localStorage save/load for responses, ratings, completed phase IDs, and result. `computeProductDesignScore()` maps self-ratings to a 0–4 score with levels: excellent/strong/developing/needs_practice.
- `App.jsx`: Added `activePDScenarioId` state, `openPDScenario()` function, `product-design` and `product-design-runner` page routing, imports for all new files.
- `Home.jsx`: Added Product Design Room as 7th room card in the rooms grid. Added RoomList entry showing all 8 scenarios. Updated hero copy from "44 practice cases across six rooms" to "52 practice cases across seven rooms". Updated section labels.

**PostDetail.jsx — reading experience upgrades (from prior session, committed this release):**
- `ReadingProgress` component: fixed 3px progress bar at viewport top, color matches article category (via `CATEGORY_CONFIG`), throttled scroll listener with `{ passive: true }`.
- `KeyTakeaways` component: renders optional `post.keyTakeaways: string[]` as a highlighted summary block before practice links.
- `References` component: renders optional `post.references: [{ label, url?, note? }]` as a numbered "Further Reading & Sources" section with clickable external links.
- Extended `ROOM_CONFIG` with `product-design` (purple) and `prioritization` (teal) rooms.
- Extended `CATEGORY_CONFIG` with `The Big Picture`, `Product Design`, `Prioritization`, `PM Strategy`, `PM Career`.

**Content audit — PlaybookBrowser.jsx:**
10 top articles received: (1) emotional/story-first opening paragraph rewrites, (2) `keyTakeaways: string[]` (5 bullets), (3) `references: [...]` with real citations, URLs, and notes.

Articles audited: `srm`, `novelty-effect`, `sutva`, `peeking`, `cuped`, `denominator-discipline`, `five-metric-types`, `guardrails`, `guardrail-conflicts`, `multiple-testing`, `cdshv-framework`, `meta-dau-drop`, `airbnb-booking-drop`.

Opening rewrites emphasize: scenario hooks before definitions, the human stakes of getting it wrong, pressure and ambiguity as the real context. Examples: SRM opens with a champagne-celebration scenario that turns out to be broken data; peeking opens with the "it feels responsible" rationalization before naming the false positive inflation.

### Architecture decisions
- Product Design Room uses free-text + self-rating (unlike other rooms which use structured multiple-choice). This was intentional: PM design questions are too open-ended for pre-computed scoring. Self-rating with model answers is the honest tradeoff.
- `keyTakeaways` and `references` are optional fields on article objects — backward compatible with all 99 existing articles. Components render nothing if the fields are absent.
- `ROOM_CONFIG` and `CATEGORY_CONFIG` in PostDetail.jsx are forward-expanded for V3.x PM rooms that haven't been built yet (product-design, prioritization).

### Status
- Product Design Room: fully functional, 1 free + 7 beta scenarios
- Prioritization Room: data file and components not yet built (V3.x)
- PM Playbook articles: not yet written (V3.x)
- Home role toggle (DS/PM/Both): not yet built (V3.x)
- SQL validation step in RCA Room: captured in IDEAS.md, high-priority V3.x addition

---

## V2.4 — Blog / Learn Layer (Placeholder)
**Date:** May 2026
**Commit message:** "V2.4: Add Learn page — 22 blog topic placeholders, IDEAS.md"
**Files changed (new):** `src/pages/BlogBrowser.jsx`, `IDEAS.md`
**Files changed (existing):** `src/App.jsx`, `src/components/layout/Header.jsx`

### Why
Blog layer adds the learn → practice loop missing from most prep resources. Users can read the framework, then immediately test judgment in the relevant room. Also serves as SEO and organic distribution. Topics derived from existing interview prep PDFs (Metric Universe Atlas, RCA Packet, Experimentation Prep, Ambiguous Problem Breakdown, DS Master Handbook).

### What changed
- `BlogBrowser.jsx`: 22 placeholder topic cards across 6 categories — Metrics, RCA, Experimentation, Ambiguous Problems, GenAI Analytics, Business Impact. Each card shows title, summary, read time, category badge, "Coming Soon" label, and which room to practice in after reading.
- `Header.jsx`: Added "Learn" nav item routing to `blog` page (between Cases and Library).
- `App.jsx`: Wired `blog` page → `BlogBrowser`.
- `IDEAS.md`: Created at repo root. Documents the blog idea, source material, implementation notes, and other future ideas.

### Status
Placeholder only — no articles written yet. Start with 5-6 posts that map 1:1 to rooms, each ending with "Practice this now →" CTA.

---

## V2.3 — Full Open Access (Beta)
**Date:** May 2026
**Commit message:** "V2.3: Remove paywall — all 44 items free during beta"
**Files changed:** `src/utils/unlock.js`, `src/pages/StatsBrowser.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/ScenarioBrowser.jsx`, `src/pages/DesignBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/CasesBrowser.jsx`, `src/components/scenario/ScenarioCard.jsx`

### Why
Beta testing phase with warm community users (~6-8 testers from "Data All In" WhatsApp community). Decision: remove all paywalls during beta to maximize engagement, gather usage data, and build testimonials before introducing paid tiers. No code required to access anything.

### What changed
- `unlock.js`: `isUnlocked()` now always returns `true`. Unlock code `EXP-LAB-DEV-2026` preserved in file but inactive.
- All 7 browser/card components: removed `Free`/`Beta` access badges, `isLocked` logic, lock buttons, unlock banners, and "X free" stat pills. All 44 items fully accessible with no gates.
- `ScenarioBrowser.jsx`: Removed Free/Locked filter tabs. Only All and Done filters remain.

### Business rationale
Get traffic and habit first. Introduce paid tier after usage data, retention signal, and testimonials exist.

---

## V2.2 — Beta Launch Polish
**Date:** May 2026  
**Commit message:** "V2.2: Polish onboarding and beta launch experience"  
**Files changed:** `Unlock.jsx`, `Home.jsx`, `Header.jsx`, `Footer.jsx`, `CasesBrowser.jsx`, `MetricsBrowser.jsx`, `JudgmentBank.jsx`, `QADashboard.jsx`, `Progress.jsx`, `StatsBrowser.jsx`, `DesignDebriefPanel.jsx`

### Why
First-impression audit before private beta launch. The product had strong content but the front door was stale (V1-era copy on the Unlock page), had a color conflict (Metrics and Design both used teal), and the homepage CTAs were too scattered. This release is a polish pass, not a feature release.

### What changed

**P0 — Blocking issues:**
- `Unlock.jsx`: All copy was V1-era ("unlock 8 scenarios", "Scenario Browser", "Paid access coming soon"). Updated to reflect 44 items across 6 rooms. Removed all pricing-framing. Fixed `alreadyUnlocked` route from `browser` to `progress`. Fixed success CTA to "View My Progress →".
- Metrics Room color: Metrics and Design both used `var(--teal)`, making them visually identical. Metrics Room rebranded to `var(--green)` across 5 files: `Home.jsx`, `MetricsBrowser.jsx`, `JudgmentBank.jsx` (MetricsCard), `QADashboard.jsx` (ROOM_COLORS), `Progress.jsx` (readiness bar).
- `CasesBrowser.jsx`: Eyebrow label and h1 both said "Cases Room" (duplicate). Eyebrow changed to "Business Cases".

**P1 — Polish:**
- `Home.jsx`: Badge changed from "V2.0" to "Private Beta". CTAs reduced from 3 equal buttons to 1 primary ("Start with Stats Room →") + 1 secondary ("New here? Try the Beginner Path →"). Subheadline tightened. Section heading changed from "Six rooms. One loop." to "Six rooms. Six judgment muscles." Build history (developer diary) section removed and replaced with a compact guided paths section showing all 4 learning paths.
- `StatsBrowser.jsx`: Cards were showing `module.situation.context.slice(0, 120)` as the description — raw internal text. Changed to use `module.subtitle` field (added in V2.1.1).
- `Header.jsx`: Nav label "Judgment Bank" renamed to "Library" (user-facing only; routing stays `'bank'`). Logo subtitle changed from "V2.0" to "Beta".
- `Progress.jsx`: Clear button previously only cleared Review Room progress (`clearProgress()`). Updated to clear all 6 rooms by removing all 6 localStorage keys. Button label updated to "Clear All Progress". Guided paths column now uses CSS `order` to appear before the readiness column when `totalCompleted === 0` (first-time user experience).
- `DesignDebriefPanel.jsx`: Paired Review Room CTA strengthened. Section header changed from "Paired Review Room scenario" to "You designed this test. Now see what happened." Button text changed from "Go to Review Room →" to "See the result in Review Room →".
- `Footer.jsx`: Version updated from V2.0 to V2.2.

### QA result
63/63 content audit checks passing after all changes.

---

## V2.1.1 — Content Integrity Patch
**Date:** May 2026  
**Commit message:** "V2.1.1: Fix 5 content integrity failures from QA audit"  
**Files changed:** `statsModules.js`, `concepts.js`, `designScenarios.js`

### Why
QA Dashboard (built in V2.1) exposed 5 failing content audit checks on first run. This patch fixes all 5 before any further feature work.

### What changed
- `statsModules.js`: All 8 stat modules were missing `subtitle` field. Added subtitles for stat01–stat08. `StatsBrowser.jsx` was already referencing `module.subtitle` in the content audit check.
- `concepts.js`: Missing concept IDs referenced by other data files. Added: `retention`, `funnel-decomposition`, `segmentation`, `data-quality-check`, `cohort-analysis`. These were referenced by M02 (Metrics), RCA01–RCA06, and C01/C02/C04 (Cases).
- `designScenarios.js`: D04 had wrong `pairedReviewScenarioId: 's06-five-metrics'` — correct ID is `'s06-five-metrics-problem'`. Fixed.

### QA result
0 failures after patch (was 5 failures before).

---

## V2.1 — QA Dashboard
**Date:** May 2026  
**Commit message:** "V2.1: QA Dashboard — internal content audit tool"  
**Files changed (new):** `QADashboard.jsx`, `contentAudit.js`  
**Files changed (existing):** `App.jsx`, `Footer.jsx`

### Why
With 44 playable items across 6 rooms and a complex web of cross-references (concept IDs, paired scenario IDs, learning path item IDs), manual content integrity checking was unreliable. A systematic audit tool was needed before community beta.

### What changed
- New `src/utils/contentAudit.js`: Pure function `runContentAudit()` that takes all data files and returns 63 structured checks covering: item counts, required fields, concept reference integrity, learning path item validity, paired scenario ID validity, and free/beta flag consistency.
- New `src/pages/QADashboard.jsx`: Full internal dashboard rendering all 63 checks with pass/fail/warning status, room badges, affected item lists, and detailed explanations. Also includes: localStorage inspector, unlock/lock toggles for testing, and "Reset All Progress" button.
- `App.jsx`: Added `QADashboard` routing (`page === 'qa'`), `onOpenItem` handler for jumping directly to any item, `onUnlock`/`onLock` handlers.
- `Footer.jsx`: Added a hidden `qa` text link (monospace, near-invisible, hover to reveal) for dev access to the QA dashboard without polluting the user-facing nav.
- `LS_KEYS` array exported from `contentAudit.js` for use in QADashboard localStorage inspector.

---

## V2.0 — Full 6-Room Product
**Date:** May 2026  
**Commit:** First complete multi-room release  
**New files (data):** `metricCases.js`, `rcaCases.js`, `businessCases.js`, `learningPaths.js`  
**New files (pages):** `MetricsBrowser.jsx`, `RCABrowser.jsx`, `CasesBrowser.jsx`  
**New files (components):** `MetricsRunner.jsx`, `RCARunner.jsx`, `CaseRunner.jsx`, `GuidedPathCard.jsx`  
**New files (utils):** `metricsProgress.js`, `rcaProgress.js`, `caseProgress.js`  
**Updated:** `App.jsx`, `Header.jsx`, `Home.jsx`, `JudgmentBank.jsx`, `About.jsx`, `Progress.jsx`, `concepts.js`

### Why
V1.6 had 3 rooms (Stats, Design, Review) and 28 items. The product vision required 6 rooms covering the full analytics judgment loop: metric design → experiment design → statistical evaluation → result review → root cause analysis → business case framing. V2.0 completes this loop.

### What changed

**Metrics Room (6 cases):**
- M01: What Defines a Successful Search? (proxy trap)
- M02: When Is a New User Actually Activated? (checklist gaming)
- M03: Push Notification Health (open rate trap)
- M04: Marketplace Seller Quality (displacement)
- M05: Revenue Growth Metric (GMV vs NRR)
- M06: GenAI Support Bot (deflection ≠ resolution)
- Format: 6-dimension rubric (primary metric, diagnostics, guardrails, grain, proxy risk, decision rule)

**RCA Room (6 cases):**
- RCA01: Checkout Conversion Drop (payment bug)
- RCA02: Zero-Result Search Spike (catalog ingestion)
- RCA03: Marketplace Cancellations (seller quality)
- RCA04: D7 Retention Drop (notification fatigue)
- RCA05: Revenue Up, Margin Down (mix shift)
- RCA06: GenAI Bot Escalation Spike (deflection proxy)
- Format: 5-stage structured diagnosis (system check → decompose → segment → hypothesize → validate)

**Cases Room (4 cases):**
- C01: Launch Same-Day Delivery? (ops expansion)
- C02: Why Did Retention Fall? (metric decomp)
- C03: Replace Tier-1 Support with AI? (GenAI ROI)
- C04: Which Seller Segment to Incentivize? (segmentation)
- Format: 6-phase analysis (clarify → KPIs → hypotheses → cut data → methods → recommend)

**Guided Learning Paths (4 paths):**
- Beginner Path: 5 items, starts with Stats → Metrics → Design → Review
- Experimentation Path: 6 items, full design-to-review loop
- Product Analytics Path: 5 items, metrics → RCA → Cases
- GenAI Product Analytics Path: 3 items, GenAI-focused subset
- Rendered via `GuidedPathCard.jsx` in `Progress.jsx`

**Total items:** 44 (8 Stats + 6 Metrics + 8 Design + 12 Review + 6 RCA + 4 Cases)  
**Free items:** 16  **Beta items:** 28

---

## V1.6 — Paired Scenarios + Claim Evaluation Mechanic
**Date:** 2025  
**Files changed:** `statsModules.js` (stat01–stat08 redesigned), `scenarios.js` (s09–s12 added), `designScenarios.js` (d05–d08 added), `StatsDecisionCard.jsx`, `concepts.js`

### Why
V1.5 Stats Room used a basic Q&A format. The product needed a "claim evaluation" mechanic — the user reads a stakeholder claim, inspects supporting data, and evaluates whether the claim holds. This is more realistic and forces judgment, not recall. Simultaneously, 8 paired Design+Review scenarios were added to complete the design-to-review loop.

### What changed
- All 8 stats modules redesigned around "Claim to Evaluate" panel: a stakeholder makes a specific claim about an experiment result, user must agree/partially agree/disagree with structured reasoning.
- `StatsDecisionCard.jsx`: New component to render the Claim panel with the stakeholder quote, the relevant data, and the options.
- S09–S12 added (Review Room): The Clickbait Ranking Win, The Push Open Rate Trap, The Seller Speed Spillover, The Checklist Completion Illusion.
- D05–D08 added (Design Room): Design the Search Ranking Test, Design the Notification Timing Test, Design the Seller Incentive Test, Design the Onboarding Checklist Test.
- 8 paired scenario links wired: each Design scenario has `pairedReviewScenarioId`, each Review scenario has `pairedDesignScenarioId`.
- Total: 28 playable items.

---

## V1.5 — Stats Room
**Date:** 2025  
**New files:** `statsModules.js`, `StatsBrowser.jsx`, `StatsRunner.jsx`, `statsProgress.js`  
**Updated:** `App.jsx`, `Header.jsx`, `Home.jsx`, `JudgmentBank.jsx`, `About.jsx`

### Why
The product needed a statistics concepts room to complement Design and Review. Stats concepts (p-values, CIs, power, SRM, multiple testing, guardrails, novelty effects, SUTVA) were being referenced in review scenarios but never taught directly.

### What changed
- 8 stats modules: stat01 (p-value decision), stat02 (CI reality), stat03 (power/MDE), stat04 (SRM first), stat05 (multiple testing), stat06 (guardrail conflict), stat07 (novelty effect), stat08 (SUTVA/spillover).
- Each module has a situation context, claim to evaluate, structured answer options, scoring, and a senior analyst debrief.
- Progress tracked per module in `localStorage` under key `pal-stats-progress-v1`.
- 4 free modules, 4 beta modules.

---

## V1.2 — Design Room + Rebrand
**Date:** 2025  
**New files:** `designScenarios.js` (D01–D04), `DesignBrowser.jsx`, `DesignRunner.jsx`, `DesignDebriefPanel.jsx`, `designProgress.js`  
**Updated:** `App.jsx`, `Header.jsx`, `Home.jsx`, `About.jsx`  
**Rebrand:** "Experimentation Systems Lab" → "Product Analytics Lab"

### Why
The Review Room alone was a one-sided product — users could review experiment results but had never designed a test. The Design Room adds the upstream judgment: given a product scenario, design the test before data exists. This creates a complete Design → Review loop.

### What changed
- D01–D04 design scenarios: Checkout Test, Onboarding Assignment, Mobile Feature Test, Multi-Metric Launch.
- 4-phase design format: primary metric selection, randomization unit, guardrails, pre-committed decision rule.
- Scored across 4 dimensions against senior analyst standard.
- Partial progress saved between phases via `designProgress.js`.
- Paired scenario IDs linking Design ↔ Review scenarios.
- Platform renamed from "Experimentation Systems Lab" to "Product Analytics Lab" to reflect the expanded scope.
- Progress tracked in `localStorage` under key `pal-design-progress-v1`.

---

## V1.1 — Judgment Bank + Theme System
**Date:** 2025  
**New files:** `scenarioBank.js`, `JudgmentBank.jsx`, `index.css` (full theme system)  
**Updated:** `App.jsx`, `Header.jsx`, `Home.jsx`, `About.jsx`, all 16 component files (CSS variables)

### Why
V1 used hardcoded hex colors and had no browsable archive of all scenarios (including planned future ones). The Judgment Bank was designed as a full scenario registry — showing both playable and roadmap scenarios — giving users a sense of the product's scope and trajectory.

### What changed
- Full CSS custom property theme system introduced: `--bg`, `--surface`, `--accent`, `--teal`, `--yellow`, `--purple`, `--green`, `--red`, `--blue-text` etc. Light and dark mode via `data-theme="dark"` on `<html>`.
- Theme toggle added to header. Theme persisted in `localStorage` under `exp-lab-theme`.
- `scenarioBank.js`: 42 planned scenario objects with title, teaser, difficulty, industry, family tags — used for the Judgment Bank "coming soon" section.
- `JudgmentBank.jsx`: Browsable archive of all playable + planned scenarios, filterable by room and difficulty.
- All 16 component files updated from hardcoded colors to CSS variables.

---

## V1 — Experiment Review Room (Initial Release)
**Date:** 2025  
**Stack:** React + Vite, static SPA, no backend, localStorage only  
**New files:** All initial files — `App.jsx`, `scenarios.js`, `ScenarioBrowser.jsx`, `ScenarioRunner.jsx`, `scoring.js`, `progress.js`, `Header.jsx`, `Footer.jsx`, `Home.jsx`, `About.jsx`

### Why
Built as a practice tool for product analysts who understand experimentation theory but struggle with applying judgment to messy, realistic experiment results. Existing resources (textbooks, courses) teach the formulas but not the calls.

### What shipped
- 8 experiment review scenarios (S01–S08), each featuring a fictional company, a completed A/B test with real-looking data, stakeholder pressure, and a 3-way decision: Ship / Rollback / Investigate.
- Structured answer options with scoring. After decision: a full "senior analyst debrief" explaining what traps were set, what the correct read was, and how to explain it to stakeholders.
- S01–S04 free. S05–S08 behind unlock code (`EXP-LAB-DEV-2026`).
- Progress tracked per scenario in `localStorage` under `exp-lab-progress-v1`.
- Concepts covered: metric conflict, SRM, guardrail breach, novelty effect / peeking, HTE, multiple testing, SUTVA, proxy metrics.

---

## Architecture constants (all versions)

| Property | Value |
|---|---|
| Stack | React + Vite v8 |
| Hosting | Vercel (static) |
| Backend | None |
| Data storage | localStorage only |
| Unlock mechanism | Hardcoded code `EXP-LAB-DEV-2026` in `src/utils/unlock.js` |
| Build command | `npm_config_cache=/tmp/npm-cache ./node_modules/.bin/vite build --outDir /tmp/dist-*` (disk workaround) |
| localStorage keys | `exp-lab-theme`, `exp-lab-unlocked-v1`, `exp-lab-progress-v1`, `pal-design-progress-v1`, `pal-stats-progress-v1`, `pal-metrics-progress-v2`, `pal-rca-progress-v2`, `pal-cases-progress-v2` |
| Content audit | `src/utils/contentAudit.js` — 63 checks, run via QA Dashboard (`/qa` route, hidden footer link) |
| Repo | github.com/SidharthKriplani/experimentation-systems-lab |
