# Scenario Bank Taxonomy

**15 scenario families · 50 scenarios · 8 playable now**

Each family teaches one category of experimentation failure. Scenarios within a family vary by industry, difficulty, and specific mechanism — but the core trap is the same.

---

## Family Index

| Key | Family Name | Scenarios | Playable |
|-----|-------------|-----------|---------|
| metric_conflict | Metric Conflict | 4 | 1 |
| srm | Sample Ratio Mismatch | 4 | 1 |
| guardrail_breach | Guardrail Breach | 3 | 1 |
| novelty_peeking | Novelty & Peeking | 4 | 1 |
| hte_subgroups | Heterogeneous Treatment Effects | 4 | 1 |
| multiple_testing | Multiple Testing | 3 | 1 |
| sutva_interference | SUTVA & Interference | 3 | 1 |
| when_not_to_experiment | When Not to Experiment | 3 | 1 |
| underpowered | Underpowered Tests | 3 | 0 |
| cuped_variance | CUPED & Variance Reduction | 3 | 0 |
| geo_holdout | Geo-Holdout Design | 3 | 0 |
| switchback | Switchback Experiments | 3 | 0 |
| b2b_constraints | B2B Constraints | 3 | 0 |
| right_censored | Right-Censored Metrics | 3 | 0 |
| multi_touch | Multi-Touch Attribution | 3 | 0 |

---

## Family Details

---

### metric_conflict — Metric Conflict

**Core trap:** Primary metric moves in the right direction. Everything looks like a win. But one or more secondary metrics signal that the improvement is illusory, harmful, or short-term.

**What it teaches:**
- The difference between optimizing a metric and improving the underlying thing the metric measures
- How to reason about metric portfolios (primary, secondary, guardrail)
- When a green primary is not sufficient justification to ship

**Common wrong answer:** "Primary is significant, ship it."

**Why it's hard:** The primary metric is usually genuinely improved. The harm is real but visible only if you read the guardrails carefully.

**Interview relevance:** Extremely high. Metric conflict is the most common real-world scenario where analysts make costly mistakes.

**Playable scenarios:** The Checkout Trap (s01)

**Roadmap scenarios:** checkout vs. LTV, engagement vs. retention, DAU vs. session quality, revenue vs. cancellation rate

---

### srm — Sample Ratio Mismatch

**Core trap:** The experiment ran, the metrics look interesting — but the assignment ratio is wrong. The entire readout is invalid until you understand why.

**What it teaches:**
- How to detect SRM from assignment counts
- Why SRM invalidates causal inference even when the effect looks directionally correct
- The diagnostic tree for what causes SRM (logging issues, eligibility criteria changes, bot traffic, redirect issues)
- When SRM is severe enough to stop the experiment vs. investigate and continue

**Common wrong answer:** "SRM is present but the effect looks real — investigate and report."

**Why it's hard:** The effect often looks directionally plausible. Analysts who don't treat SRM as a validity stopper make a category error.

**Interview relevance:** High. SRM is a standard interview question at experimentation-mature companies.

**Playable scenarios:** The Ghost Assignment (s02)

**Roadmap scenarios:** redirect SRM, eligibility criteria drift, bot traffic contamination, holdout SRM in recommendation system

---

### guardrail_breach — Guardrail Breach

**Core trap:** Primary metric wins. The experiment is "successful" by the headline metric. But a guardrail — a metric you promised to protect — is breached. Does that change the call?

**What it teaches:**
- The difference between a permission metric and an obligation metric
- How to reason about the magnitude of a guardrail breach vs. the magnitude of the primary win
- Stakeholder communication when the data is mixed
- When the right answer is "ship with mitigation" vs. "don't ship"

**Common wrong answer:** "Guardrail is only slightly breached — the primary win outweighs it."

**Why it's hard:** The tradeoff is often genuinely ambiguous. The learning is about how to frame the decision, not just what the decision is.

**Interview relevance:** High. Guardrail reasoning is a core senior analyst skill.

**Playable scenarios:** The Slow Tax (s03)

**Roadmap scenarios:** latency guardrail with revenue primary, error rate breach in payments flow, accessibility metric breach

---

### novelty_peeking — Novelty & Peeking

**Core trap:** Either the effect is driven by novelty (users exploring something new) and will decay, or the analyst is reading a test early while the effect hasn't stabilized, or both.

**What it teaches:**
- How to recognize novelty effects from temporal data patterns (week-over-week decay)
- The statistical cost of peeking at results before runtime is complete
- When to extend a test vs. accept the early result
- How engagement features differ from utility features in novelty risk

**Common wrong answer:** "The effect is significant and we need to move fast — ship."

**Why it's hard:** Week-1 data is often genuinely exciting. The problem isn't visible without time-segmented metrics.

**Interview relevance:** High. Peeking is common in practice.

**Playable scenarios:** The Week-Two Drop (s04)

**Roadmap scenarios:** notification novelty decay, onboarding uplift that disappears at day-7, sequential testing boundary violation

---

### hte_subgroups — Heterogeneous Treatment Effects

**Core trap:** The average treatment effect is modest or null. But the effect is large and positive for one subgroup — and the analyst is tempted to report that as the finding.

**What it teaches:**
- The multiple comparisons problem in subgroup analysis
- The difference between pre-registered subgroup analysis and post-hoc fishing
- When HTE is a real finding vs. noise
- How to frame subgroup results to stakeholders without overclaiming

**Common wrong answer:** "Mobile users show a strong effect — let's ship to mobile only."

**Why it's hard:** The subgroup result is often real. The mistake is the inference: claiming it as the finding without adjusting for multiple comparisons.

**Interview relevance:** Very high. Subgroup fishing is endemic at growth-stage companies.

**Playable scenarios:** The Mobile Winners (s05)

**Roadmap scenarios:** power user vs. casual user HTE, new vs. returning user HTE, geographic HTE in marketplace, B2B plan tier HTE

---

### multiple_testing — Multiple Testing

**Core trap:** The experiment measured five (or ten, or fifteen) metrics. Three are significant. The team wants to report all three as wins.

**What it teaches:**
- FWER and FDR adjustment in practice
- How to decide which metrics were pre-registered vs. exploratory
- The difference between confirmatory and exploratory analysis
- How to communicate adjusted results when stakeholders are expecting wins

**Common wrong answer:** "Three metrics are significant — that's strong evidence."

**Why it's hard:** Each individual result looks fine. The problem is the ensemble.

**Interview relevance:** High. Multiple testing issues are underappreciated at most companies below a certain analytics maturity.

**Playable scenarios:** The Five Metrics Problem (s06)

**Roadmap scenarios:** feature launch with 10-metric dashboard, revenue metrics with 6 segments, quarterly OKR experiment with 8 tracked metrics

---

### sutva_interference — SUTVA & Interference

**Core trap:** Treatment assignment is at the user level but treatment effects spill across users — through marketplace dynamics, social graphs, or shared resources. SUTVA is violated; the estimated ATE is wrong.

**What it teaches:**
- What SUTVA is and when it fails
- Two-sided marketplace interference (seller and buyer effects)
- Network effects in social products
- Mitigation strategies: cluster randomization, ego-network isolation, switchback design

**Common wrong answer:** "The effect is positive — ship."

**Why it's hard:** The readout looks clean. The interference is invisible without understanding the product architecture.

**Interview relevance:** High at marketplace and social companies. Medium elsewhere.

**Playable scenarios:** The Two-Sided Spill (s07)

**Roadmap scenarios:** ride-share supply-demand interference, social feed recommendation interference, shared inventory in ecommerce

---

### when_not_to_experiment — When Not to Experiment

**Core trap:** The team designed an experiment. But the situation doesn't warrant one — because randomization isn't ethical, because the population is too small, because the decision is irreversible, or because the cost of waiting exceeds the value of the information.

**What it teaches:**
- The conditions under which experimentation adds value vs. costs more than it provides
- Ethical constraints on randomization (medical, financial, safety contexts)
- When to use observational methods instead
- When to make a judgment call without data

**Common wrong answer:** "We should always experiment before shipping."

**Why it's hard:** "Experiment before you ship" is good general advice. The learning is knowing when it's wrong.

**Interview relevance:** High for senior roles. Distinguishes analysts who understand the limits of their tools.

**Playable scenarios:** False Rigor (s08)

**Roadmap scenarios:** safety feature rollout, low-N B2B pricing change, irreversible infrastructure migration

---

### underpowered — Underpowered Tests

**Core trap:** The experiment ran to completion. The primary metric is not significant. The team wants to conclude "no effect." But the test was underpowered — it was never able to detect the effect it was designed to find.

**What it teaches:**
- The difference between "not significant" and "no effect"
- How to check whether a test was adequately powered after the fact
- How to report null results responsibly
- When to re-run vs. accept the null

**Common wrong answer:** "The test ran, nothing was significant, move on."

**Interview relevance:** Medium-high. Underpowered tests are common; misinterpreting them as evidence of no effect is very common.

---

### cuped_variance — CUPED & Variance Reduction

**Core trap:** The test is valid but the variance is too high to detect the effect. CUPED (or another variance reduction technique) would have increased sensitivity — but was either not applied, applied incorrectly, or applied in a way that introduces bias.

**What it teaches:**
- When and why variance reduction matters
- How CUPED works and when it's appropriate
- Tradeoffs between sensitivity and coverage
- How to detect variance reduction errors

**Interview relevance:** Medium. High at companies with mature experimentation platforms.

---

### geo_holdout — Geo-Holdout Design

**Core trap:** The treatment is a campaign or change that can't be randomized at the user level (e.g., TV advertising, city-level pricing, infrastructure changes). The analyst uses a geo-holdout but must account for non-IID treatment units and geo confounding.

**What it teaches:**
- When user-level randomization isn't possible
- How geo-holdout designs work and their assumptions
- Confounding risks in geographic comparison (seasonality, local events, market maturity)
- Synthetic control and difference-in-differences as alternatives

**Interview relevance:** Medium-high at companies that run geo-level experiments (retail, ride-share, marketplace).

---

### switchback — Switchback Experiments

**Core trap:** The experiment alternates treatment and control periods in the same units (e.g., an algorithm change on a ride-share platform). Carryover effects, temporal autocorrelation, and period imbalance can invalidate the result.

**What it teaches:**
- When switchback design is appropriate vs. geo-holdout or user-level randomization
- Carryover effects and washout periods
- Temporal autocorrelation in time-series experiments
- How to analyze switchback data correctly

**Interview relevance:** Medium. High at ride-share, food delivery, and other two-sided marketplace companies.

---

### b2b_constraints — B2B Constraints

**Core trap:** The experiment is run on a B2B product with 50–200 accounts. User-level randomization produces correlated observations within accounts. Account-level randomization produces a test with 50 units. Standard significance tests don't apply cleanly.

**What it teaches:**
- Account-level vs. user-level randomization in B2B contexts
- Minimum detectable effects with small N
- When to use Bayesian approaches vs. frequentist
- How to communicate uncertainty to B2B stakeholders

**Interview relevance:** High at B2B SaaS companies. Low elsewhere.

---

### right_censored — Right-Censored Metrics

**Core trap:** The primary metric is LTV, churn, or another time-to-event metric. The experiment ran for 4 weeks. Most users haven't churned yet — the metric is right-censored. The analyst treats it as a complete observation.

**What it teaches:**
- What right-censoring is and when it matters
- Survival analysis basics: Kaplan-Meier, hazard ratios
- How to design experiments with forward-looking metrics
- When proxies are sufficient vs. when you need to wait

**Interview relevance:** Medium-high at subscription, SaaS, and marketplace companies.

---

### multi_touch — Multi-Touch Attribution

**Core trap:** The experiment measures an intervention at one touchpoint (e.g., email send). The conversion happens 3 touchpoints later. The team attributes the conversion to the email and reports a win.

**What it teaches:**
- Why last-touch and first-touch attribution overstate causal effects
- Incrementality testing as an alternative to attribution modeling
- Holdout design for measuring true lift
- The difference between correlation and causal attribution

**Interview relevance:** High at growth and marketing analytics roles. Medium elsewhere.

---

## Scenario Distribution Targets

| Difficulty | Count | Families covered |
|------------|-------|-----------------|
| Analyst | 20 | All 15 |
| Senior | 20 | 12+ |
| Staff | 10 | 8+ |

No family should have more than 4 scenarios. No family should be represented at only one difficulty level (except in V1 — thin coverage is acceptable early).
