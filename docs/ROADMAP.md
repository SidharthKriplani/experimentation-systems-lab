# Experimentation Systems Lab — Roadmap

**Current version:** V1.1  
**Last updated:** 2026-05

---

## V1 — Shipped ✓

**8 playable scenarios · Free + private beta tiers**

| Tier | Scenario | Difficulty | Theme |
|------|----------|------------|-------|
| Free | The Checkout Trap | Analyst | Metric Conflict |
| Free | The Ghost Assignment | Analyst | Sample Ratio Mismatch |
| Free | The Slow Tax | Analyst | Guardrail Breach |
| Free | The Week-Two Drop | Analyst | Novelty Effect / Peeking |
| Beta | The Mobile Winners | Senior | Heterogeneous Treatment Effects |
| Beta | The Five Metrics Problem | Senior | Multiple Testing |
| Beta | The Two-Sided Spill | Staff | Marketplace Interference / SUTVA |
| Beta | False Rigor | Senior | When Not to Experiment |

Core product loop: read the readout → flag the warnings → make the call → see the senior debrief.

---

## V1.1 — Current (in progress)

**Visual polish · 50-scenario architecture · No new playable scenarios**

- Light/dark theme toggle with flash-prevention
- Full CSS variable design system (teal secondary accent, radius scale, shadow scale)
- Judgment Bank page — 50-scenario architecture across 15 families
- 42 planned scenario cards with metadata defined (title, family, industry, difficulty, core trap, teaser)
- Homepage redesign with "Why this is different" grid
- ScenarioRunner step progression, improved debrief framing
- Documentation: PRD, roadmap, content quality bar, scenario taxonomy

**What V1.1 is not:** New playable scenarios. The 42 roadmap cards are metadata only.

---

## V1.5 — Planned

**20 playable scenarios · 12 new + 8 existing = 20 total**

New scenario families covered:
- CUPED / variance reduction
- Geo-holdout design
- Switchback experiments
- Cannibalization framing
- Right-censored metrics (LTV, churn timing)
- B2B constraints (small N, account-level randomization)

New difficulty distribution target: 8 Analyst, 8 Senior, 4 Staff

Unlock model update: introduce proper payment flow (Stripe or Gumroad) replacing developer unlock code.

---

## V2 — Planned

**Experiment Design Room · 50-scenario Judgment Bank complete**

### Experiment Design Room
Given a product goal and constraints, design the experiment:
- Choose randomization unit (user, session, account, geo)
- Define primary metric and guardrails with justification
- Set runtime and power analysis
- Flag SUTVA risks and design mitigations

Expert evaluation reveals what you got right, what you missed, and what a senior analyst would push back on.

### Judgment Bank completion
All 50 scenarios playable. 15 scenario families fully covered.

### Other V2 features
- Scenario tagging and difficulty progression paths
- Interview prep mode (timed, scored, exportable)
- Improved progress tracking with family-level mastery

---

## V3 — Stats & Inference Lab (planned)

**Focused statistical inference exercises under non-ideal conditions**

- Sequential testing and early stopping
- CUPED / MLRATE implementation exercises
- Variance estimation under heavy tails
- Confidence intervals for rare events (low base rate metrics)
- Resampling, bootstrapping, Bayesian credible intervals
- When does the CLT break? Practical boundary exercises

Format: structured problems with worked solutions, not scenario-based.

---

## V4 — RCA Room (planned)

**Root cause analysis scenarios**

Given a metric anomaly, work through the diagnostic tree:
- Instrumentation issue vs. real effect
- External event vs. product change
- Experiment contamination vs. actual regression
- Novelty decay vs. feature failure

Builds the complementary skill to experiment analysis: diagnosing what's wrong without a controlled test.

---

## V5 — Full Platform (planned)

**Integrated learning path · Team accounts · Custom scenarios**

- Team/org accounts with dashboards
- Custom scenario uploads (for training and onboarding)
- Interview prep certification
- Analytics on team calibration gaps
- API for embedding scenarios in other tools

---

## What Will Not Be Built

- **Statistics tutorial content.** This platform assumes users know the basics. Courses, glossaries, and formula modules are explicitly out of scope.
- **AI-evaluated reasoning.** All scoring is pre-computed. No LLM evaluation of user responses. This keeps the product consistent, offline-capable, and cheap.
- **Social / gamification features.** Leaderboards, streaks, badges. These distort the goal (better judgment) toward proxy metrics (usage).

---

## Decision Log

**Why static-only through V2?**  
Zero operating cost. Vercel free tier handles any traffic level. Server-side logic is not required for the core product loop through V2. The tradeoff (no cross-device sync, no team accounts) is acceptable until V3.

**Why pre-computed scoring vs. AI evaluation?**  
Consistency and trust. Users need to be able to audit why a decision scored as it did. Pre-computed scoring with explicit feedback text is more trustworthy than LLM evaluation at this stage.

**Why a content quality bar document?**  
Because the credibility of the platform is entirely dependent on scenario quality. A bad scenario that teaches the wrong lesson is worse than no scenario. The quality bar exists to prevent shipping anything that doesn't meet the standard.
