# Product Analytics Lab — Changelog

Full build lineage. Covers what changed, why, what was added, what was fixed, and which files were touched in each release. Intended to make the project understandable to any future contributor, collaborator, or reviewer without needing to read the git log.

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
