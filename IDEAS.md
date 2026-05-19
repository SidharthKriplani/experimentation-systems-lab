# Product Analytics Lab — Ideas Backlog

Running list of product, content, and feature ideas. Not prioritized — just captured so nothing gets lost.

---

## Blog / Learn Layer

**Status:** Placeholder page built (BlogBrowser.jsx). Content not written yet.

### The Idea
Add a blog/articles section that teaches the frameworks and concepts behind each room — before people try to practice them. The loop becomes:

**Read the concept → understand the framework → practice it immediately on the platform**

This is the core gap in most prep resources: they either teach passively (courses, articles) or test actively (LeetCode-style) but never connect the two. A blog layer built on top of the practice layer creates the full loop and makes both stickier.

### Source material
The following prep packets (Sidharth's interview prep materials) are rich source material for blog posts:
- `DS_Product_Scientist_Master_Handbook.pdf` — 5-mode operating system: Metric Design, Problem Investigation, RCA, Experimentation, AI/ML
- `Metric_Universe_Atlas.pdf` + `Metric_Universe_Atlas_Reference.pdf` + `Metric_Universe_Atlas_Pure.pdf` — 69 metrics across 9 families, decomposition, segmentation, denominator discipline
- `KPI_Metrics_Study_Packet.pdf` — KPI framing, metric trees, guardrails, walkthroughs
- `RCA_Interview_Prep_Packet.pdf` — CDSHV framework, walkthroughs, practice questions
- `Experimentation_Interview_Prep.pdf` — SRM, power/MDE, CUPED, trust checks, tradeoff/cannibalization
- `Ambiguous_Problem_Breakdown_Packet.pdf` — 10-step framework, proxy design, ambiguous problem bank
- `product_sense_ds_packet.pdf` — Product sense for DS/analytics roles
- `product_business_case_study_packet.pdf` — Business case framing, dollar impact translation

### Blog topics planned (see BlogBrowser.jsx for full list)
Grouped by room: Metrics, RCA, Experimentation, Stats, Ambiguous Problems, GenAI/ML, Business Cases

### Implementation notes
- Start with 5-6 posts that directly map to a room — not 20 posts upfront
- Each post should end with a "Practice this now →" CTA that deep-links into the relevant room
- Format: framework first, walkthrough example, common mistakes, CTA
- Static MDX or hardcoded JSX to start — no CMS needed yet
- No separate blog infrastructure needed until traffic justifies it

---

## SQL Validation Step in RCA Room ✅ Shipped V3.1

**The idea:** After a user forms a diagnosis hypothesis in the RCA Room, present a "validate it" step: "What SQL query would you write to confirm this?" The user writes freeform SQL, then sees the model query with annotations.

**Why it's high ROI:**
- No new room needed — it extends the existing RCA flow as a 6th step: Context → Decompose → Segment → Hypothesize → Validate → **Write the Query**
- Completely unique in the interview prep space — nothing else bridges diagnosis to code this way
- Directly reflects the real workflow: a senior analyst forms a hypothesis *then* goes to SQL
- Low build cost: freeform textarea + model answer reveal, same pattern as the Product Design Room

**Implementation sketch:**
- Add a `sqlStep: { prompt, hints, modelQuery, annotations }` field to each RCA case
- RCA Runner shows the SQL step after the debrief — optional, but available
- Model query shown with line-by-line annotation: `-- This WHERE clause isolates the Android regression we hypothesized`
- Self-rated (same Strong/Partial/Miss pattern as Product Design Room)

**Example for rca01 (Checkout Conversion Drop):**
Hypothesis confirmed: drop is at the payment step for iOS users on v4.2.1.
Prompt: "Write a query to validate that the payment success rate dropped specifically for iOS users on app version 4.2.1, not other platforms or versions."
Model query: window function over `payments` table, segmented by `platform` and `app_version`, comparing D7 success rate to prior 30-day baseline.

---

## Code Room — Python + SQL in Product Context ✅ Shipped V3.1 (MVP: 6 modules)

**The idea:** A "Code Room" that teaches analytics SQL patterns and Python/Pandas workflows in a *product* context — not generic coding, but the specific patterns senior analysts actually use.

**Why it belongs inside the current product (not a separate one):**
- Same audience: product analysts, data scientists prepping for DS/PM roles
- Same mental model: judgment under product pressure, not raw syntax
- Extends the existing loop: learn the concept → practice the judgment → write the code

**SQL track:**
- Funnel analysis (conversion rates by step, by cohort, by platform)
- Retention cohorts (Day 1/7/30 retention in a single query, window functions)
- CUPED adjustment in SQL (variance reduction using pre-experiment covariate)
- Mix shift decomposition (shift-share analysis in SQL)
- SRM detection (chi-squared check in SQL)

**Python/Pandas track:**
- Cohort analysis with groupby + pivot_table
- A/B test significance calculator (scipy.stats, bootstrap CI)
- CUPED implementation in Pandas (regressing out pre-experiment covariate)
- Funnel visualization with matplotlib
- Retention heatmap

**Format:** Each module presents a product scenario, gives a dataset schema, shows partial code, asks the user to complete the key step. Model answer reveals the full implementation with annotations. Same judgment-first philosophy — the code serves the analysis, not the other way around.

---

## GenAI Analytics Threading ✅ Playbook articles shipped V3.1 (Ongoing — Not a Separate Room)

**The idea:** GenAI belongs as a *lens* through existing rooms, not a standalone room. Every product room should have GenAI-flavored variants of existing scenarios.

**Where it threads naturally:**
- **Metrics Room:** How do you measure LLM response quality? Precision/recall tradeoffs for AI retrieval, hallucination rate as a guardrail, task completion rate as north star
- **RCA Room:** Escalation spike in AI support bot (already built in rca06), LLM response latency regression, content safety filter over-triggering
- **Cases Room:** "Should we replace Tier-1 Support with AI?" (already built in c03), "Should we build in-house vs. buy a foundation model?"
- **Review Room:** Experiment where AI-generated content beat human content on engagement but hurt trust metrics — the guardrail conflict

**What belongs in the GenAI Analytics Playbook category (already exists):**
- LLM evaluation metrics (BLEU/ROUGE for reference-based, LLM-as-judge for reference-free)
- Designing experiments for AI features (longer stabilization windows, user trust lag)
- Hallucination as a metric (how to define, measure, and guardrail it)
- The "evaluation paradox" — if your model judges your model, who judges the judge?

---

## Separate Product: DS/ML Engineering Lab (Future — Different Audience)

**The idea:** A standalone product for the ML engineer / senior data scientist track. Different audience, different interview process, different depth.

**Why it must be separate (not inside Product Analytics Lab):**
- Audience is MLEs and data engineers, not DAs and PMs — different interview prep needs
- ML system design is a different skill set: model selection, feature stores, serving infrastructure, monitoring for drift
- PySpark / distributed computing is about scale, not product judgment
- Would dilute Product Analytics Lab's identity if bundled in

**What it covers (rough syllabus):**
- Model evaluation: AUC-ROC, precision/recall curves, calibration, PR vs ROC when classes are imbalanced
- Feature engineering: target encoding, feature importance, leakage detection
- ML system design: feature store design, training pipelines, online vs offline scoring
- PySpark: distributed aggregations, window functions at scale, broadcast joins
- Production ML: data drift detection, model monitoring, retraining triggers, shadow mode testing

**Build trigger:** Build this after Product Analytics Lab has stable traffic and a validated monetization model. Don't start until V4.0 is stable.

---

## PM Layer — V3.0 + V3.2 Complete

### Completed (V3.0)
- Product Design Room: 8 scenarios, 5-phase open-ended runner, self-scored with model answers
- PostDetail.jsx: Reading progress bar, KeyTakeaways, References components
- Content audit: 10 articles rewritten with emotional tone + keyTakeaways + references

### ✅ Prioritization Room — Shipped V3.2
- `PrioritizationBrowser.jsx` + `PrioritizationRunner.jsx` + `prioritizationScenarios.js` + `prioritizationProgress.js`
- 6 scenarios: PRI01 (Spotify RICE), PRI02 (Airbnb 2×2), PRI03 (Notion tech debt), PRI04 (Meta stakeholder conflict), PRI05 (Duolingo OKR), PRI06 (Stripe platform vs. feature)
- Multi-schema model answer renderer: RICE table, 2×2 matrix, velocity tax calc, alignment memo, OKR scoring, platform analysis
- Tag filter, difficulty badges, completion tracking

### ✅ PM Playbook Articles (15) — Shipped V3.2
- 4 new categories: Product Design, Prioritization, PM Strategy, PM Career
- 15 articles: JTBD, CIRCLES+HEART, PRD, User Research, RICE, Effort-Impact, North Star vs. OKR, Stakeholder Conflict, Tech Debt, Influence Without Authority, PM Archetypes, Making Bets, DS-to-PM, First 90 Days, Analytics PM vs. Growth PM
- CATEGORY_CONFIG extended with 4 color-coded entries

### ✅ Home Role Toggle — Shipped V3.2
- `Product DS` / `Product PM` / `DS + PM` toggle in Home.jsx
- Saved to localStorage (`pal-role-toggle`)
- DS mode: analytics-first room ordering; PM mode: Product Design/Prioritization/Cases first
- Renders inline next to the section header

---

---

## Code Room — V3.x Expansions (Post V3.1)

**Status:** MVP shipped (6 modules). Planned additions:

- **SQL Track additions:** CUPED in SQL (not just Python), retention heatmap query, mix shift with interaction term
- **Python Track additions:** Funnel visualization with matplotlib, retention heatmap, bootstrap CI for small samples
- **Pandas Track:** Cohort analysis with groupby + pivot_table, A/B test result summarization pipeline

---

*Last updated: May 2026 (V3.2)*
