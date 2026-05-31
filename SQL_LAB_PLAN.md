# SQL_LAB_PLAN.md — SQL Lab Content Overhaul Master Plan

Single source of truth for all SQL Lab decisions, findings, architecture choices, and session sequencing. Created after the Session 1 investigative audit (2026-05-31). Update this file at the end of every SQL Lab session.

**Current version:** V4.39.11 (analysis complete, no code changes yet)
**Last updated:** 2026-05-31

---

## Status at a glance

| Item | Status |
|---|---|
| Session 1 investigative findings | ✅ Complete — results in this file |
| NEXT.md updated | ✅ Done |
| DECISIONS.md updated | ✅ Done |
| AUDITS.md updated | ✅ Done |
| CHANGELOG.md updated | ✅ Done |
| Session 1 execution (cull + reclassify + bug fix) | ✅ Done — V4.40.0 |
| Sessions 2–6 | ⏳ Pending Session 1 |

---

## Section 1 — Market-Anchored Difficulty Rubric

Derived from systematic benchmarking of LeetCode, DataLemur, and StrataScratch (May 2026). This rubric replaces all prior difficulty classifications in sqlLabProblems.js.

**The critical prior error:** The original 250-problem bank classified single window functions (RANK, NTILE, SUM OVER), anti-joins (NOT IN, LEFT JOIN IS NULL), and multi-join GROUP BY as Hard. The market benchmark contradicts this. LeetCode 183 ("Customers Who Never Order" — NOT IN anti-join) is explicitly Easy. Any window function = Medium by DataLemur/StrataScratch standard.

### Easy
One SQL concept, direct mapping from question to SQL clause. The candidate's only job is knowing the construct.

Patterns:
- SELECT + WHERE (any condition)
- GROUP BY + COUNT/SUM/AVG/MAX (single table or one JOIN)
- HAVING (filter on aggregated result)
- Simple 2-table JOIN (INNER or LEFT)
- IS NULL / IS NOT NULL
- LEFT JOIN + IS NULL anti-join (LeetCode 183 = Easy)
- NOT IN / NOT EXISTS single-table
- CASE WHEN in SELECT (non-aggregated)
- COALESCE, NULLIF
- ORDER BY + LIMIT (top-N)
- DISTINCT
- Arithmetic in SELECT or WHERE (computed column like `SUM(days_supply * (1 + refills))`)
- Date range WHERE filter

### Medium
Requires a window function OR multi-step reasoning where the composition of two concepts is the hard part. The candidate must know *when* to use the technique and *how* to compose it with something else.

Patterns:
- Any basic window function with PARTITION BY: RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD, SUM OVER, AVG OVER, NTILE
- Simple CTE (1–2 CTEs, straightforward logic)
- 3-table JOIN (all JOINs necessary, non-obvious key)
- Conditional aggregation / pivot (SUM CASE WHEN across multiple categories)
- Date arithmetic composed with aggregation (strftime + GROUP BY month)
- Correlated subqueries (above-average patterns, N-per-group)
- Percentage calculations across groups
- HAVING with non-obvious aggregate filter
- EXISTS / NOT EXISTS subquery

### Hard
Chaining 2+ advanced concepts where the *combination* is the difficulty. Naive approach gives wrong or incomplete answer. Candidate must both know the pattern AND recognize that the naive query fails.

Patterns:
- Gaps-and-islands (ROW_NUMBER subtraction trick for consecutive sequence detection)
- Recursive CTEs (date spine, number series, hierarchy traversal)
- Window function + date arithmetic chained (LAG + julianday to compute day-level deltas)
- Multi-CTE pipelines (3+ CTEs each feeding the next with distinct signal)
- Self-join with rolling date window in ON clause (julianday difference in JOIN condition)
- State machine logic via CASE WHEN + UNION
- Aggregate over aggregate (SUM(COUNT(*)) OVER)
- 4-table JOIN chain with non-obvious business logic at each step
- Complex window frames (ROWS BETWEEN with explicit frame spec as the test, not incidental)
- Full funnel analysis (multiple conversion rate steps in one result set)

### Master
Beyond standard interview complexity. Candidates at this tier must decompose an ambiguous business question, choose the approach, and write a multi-concept solution without scaffolding.

Patterns:
- 4+ CTEs where each feeds the next with distinct signal sources
- Gaps-and-islands + window function + date arithmetic (all three combined)
- Full cohort retention matrix (month 0/1/2/3 in single result set)
- CROSS JOIN for affinity / combinatorics
- Composite scoring across 3+ signals
- Anomaly detection with per-entity statistical baseline
- Recursive hierarchy traversal + aggregation

---

## Section 2 — Session 1 Investigative Findings

All 250 problems read and audited (h01–h50, all 25 Master, e13–e100, m01–m75). No code changes made — findings only.

### 2A — Cull List (39 problems to remove)

Remove these problems. Reason in each case: duplicate SQL skeleton applied to a different datamart column/domain with no added SQL concept.

**Easy — 20 cuts:**

| ID | Reason |
|---|---|
| e27 | Duplicate GROUP BY COUNT pattern — same skeleton as e04/e14 |
| e38 | Duplicate WHERE filter pattern — same as e11 |
| e41 | Duplicate ORDER BY + LIMIT top-N — same skeleton as e05 |
| e63 | Duplicate DISTINCT COUNT — same concept as e22 |
| e75 | Duplicate COALESCE / IS NULL — same as e19 |
| e76 | Duplicate GROUP BY + AVG — same as e09 |
| e79 | Duplicate WHERE date range — same as e17 |
| e86 | Duplicate skeleton — GROUP BY COUNT on different column, no new concept |
| e87 | Duplicate skeleton — GROUP BY COUNT on different column |
| e88 | Duplicate skeleton — GROUP BY COUNT on different column |
| e89 | Duplicate skeleton — GROUP BY COUNT on different column |
| e90 | Duplicate skeleton — GROUP BY COUNT on different column |
| e91 | Duplicate skeleton — GROUP BY COUNT on different column |
| e92 | Duplicate skeleton — GROUP BY COUNT on different column |
| e93 | Duplicate skeleton — GROUP BY COUNT on different column |
| e94 | Duplicate skeleton — GROUP BY COUNT on different column |
| e95 | Duplicate skeleton — GROUP BY COUNT on different column |
| e96 | Duplicate skeleton — GROUP BY COUNT on different column |
| e98 | Duplicate skeleton — same anti-join skeleton as e01/e12 |
| e99 | Duplicate skeleton — same top-N skeleton as e05/e41 |

**Medium — 11 cuts:**

| ID | Reason |
|---|---|
| m27 | Above-average subquery — duplicate of m17/m49 |
| m38 | Easy-level GROUP BY COUNT mislabeled Medium |
| m44 | Monthly time-series — duplicate of m09/m15 |
| m50 | Easy-level GROUP BY COUNT mislabeled Medium |
| m55 | Easy-level GROUP BY COUNT mislabeled Medium |
| m59 | RANK — duplicate of m24 |
| m63 | Easy-level GROUP BY COUNT mislabeled Medium |
| m65 | Easy-level GROUP BY COUNT mislabeled Medium |
| m67 | Easy-level GROUP BY COUNT mislabeled Medium |
| m68 | Easy-level GROUP BY COUNT mislabeled Medium |
| m69 | Anti-join — duplicate skeleton of e01/m12 |

**Hard — 3 cuts:**

| ID | Reason |
|---|---|
| h36 | CASE WHEN 5-column pivot — duplicate of h28 |
| h43 | Single-table GROUP BY COUNT = Easy level, duplicates e32/e60 |
| h46 | Completion rate by visit type — duplicate skeleton of h29 |

**Master — 5 cuts:**

| ID | Reason |
|---|---|
| master15 | strftime + GROUP BY — Medium-level, mislabeled Master |
| master17 | JOIN + GROUP BY + COUNT DISTINCT — Medium-level, mislabeled Master |
| master20 | strftime + GROUP BY aggregate — Medium-level, mislabeled Master |
| master22 | JOIN + GROUP BY — Medium-level, mislabeled Master |
| master24 | JOIN + GROUP BY + COUNT DISTINCT — Medium-level, mislabeled Master |

**Post-cull survivor count:** 211 problems (before reclassification)

---

### 2B — Reclassification Table

All reclassifications anchored to the market rubric in Section 1. Direction: Hard → Easy, Hard → Medium, or Master → Hard.

**Hard → Easy:**

| ID | Title (approx) | Old | New | Reason |
|---|---|---|---|---|
| h16 | Total Medication Coverage Days | Hard | Easy | SUM(arithmetic) GROUP BY single table — confirmed Easy by user + market research |
| h23 | Anti-join (NOT IN pattern) | Hard | Easy | NOT IN anti-join = LeetCode 183 = explicit Easy |

**Hard → Medium (basic window function or single-concept problem):**

| ID | Old | New | Reason |
|---|---|---|---|
| h14 | Hard | Medium | EXISTS × 2 — EXISTS subquery = Medium |
| h19 | Hard | Medium | strftime + HAVING + COUNT DISTINCT — two concepts, no window function |
| h20 | Hard | Medium | NTILE + CTE — one window function = Medium by market standard |
| h22 | Hard | Medium | HAVING SUM = 0 — aggregate filter only |
| h25 | Hard | Medium | SUM OVER PARTITION BY ORDER BY running total — basic window function = Medium |
| h26 | Hard | Medium | JOIN + GROUP BY multi-column — no window, no CTE chain |
| h27 | Hard | Medium | NTILE quartiles — one window function |
| h28 | Hard | Medium | CASE WHEN 5-column pivot — conditional aggregation |
| h29 | Hard | Medium | GROUP BY + rate calculation |
| h30 | Hard | Medium | CASE WHEN GROUP BY classification |
| h35 | Hard | Medium | SUM/COUNT conversion rate |
| h37 | Hard | Medium | JOIN + GROUP BY + SUM |
| h39 | Hard | Medium | GROUP BY + HAVING + COUNT DISTINCT |
| h40 | Hard | Medium | NTILE value bands + CTE — one window function |
| h44 | Hard | Medium | 3-table JOIN + GROUP BY |
| h47 | Hard | Medium | JOIN + GROUP BY + HAVING |
| h49 | Hard | Medium | CTE + MAX + date |
| h50 | Hard | Medium | JOIN + GROUP BY multi-aggregate |

**Master → Hard (medium-complexity multi-step, not Master caliber):**

| ID | Old | New | Reason |
|---|---|---|---|
| master06 | Master | Hard | Content Engagement Funnel: 1 CTE + pivot + rates |
| master07 | Master | Hard | Hypertension Care Gap: 2 CTEs + NOT IN |
| master11 | Master | Hard | Referred User Engagement: 2 CTEs + GROUP BY |
| master13 | Master | Hard | Returning vs New Customer: single CTE + ROW_NUMBER + CASE WHEN |
| master16 | Master | Hard | Creator Portfolio: JOIN + GROUP BY + CASE WHEN pivot |
| master21 | Master | Hard | Referral Performance: self-join + GROUP BY |
| master23 | Master | Hard | Discount Mix by Channel: JOIN + CASE WHEN SUM |

---

### 2C — Known Bug: master10 Solution String

The solution field for master10 has `GROUP BY a.user_id\)` — the `\)` should be `\n)` (line break before closing paren). Fix in Session 1 execution alongside cull and reclassify.

---

### 2D — Gap List (8 missing patterns)

After culling, these SQL patterns have zero or near-zero representation:

| # | Pattern | Target difficulty | Notes |
|---|---|---|---|
| 1 | Date spine / gap-filling | Hard | Recursive CTE or series generator + LEFT JOIN to fill missing dates with zeroes |
| 2 | ROWS BETWEEN frame specification | Hard/Master | ROWS vs RANGE distinction, explicit named frame clause as the *test* |
| 3 | PERCENT_RANK / CUME_DIST | Medium | NTILE exists but percentile rank functions missing |
| 4 | Two valid queries, different results | Medium/Hard | NULL handling or JOIN type produces different counts — candidate explains why |
| 5 | Ambiguous-definition problems | Hard/Master | Metric itself is undefined — candidate must interpret and document assumption |
| 6 | Syntactically valid but semantically wrong SQL | Medium/Hard | Produces a result but the wrong one — no error thrown |
| 7 | Recursive CTE / hierarchy traversal | Hard/Master | Org chart, referral tree, or product category hierarchy |
| 8 | Full cohort retention curve | Master | Month 0/1/2/3+ retention in single result set |

---

## Section 3 — Architecture Decisions

All open items resolved. These are standing decisions.

### Problem count target: 130 (down from 250)

| Tier | Count | Rationale |
|---|---|---|
| Easy | 50 | Sufficient breadth across all Easy patterns without redundancy |
| Medium | 40 | Covers window functions, CTEs, conditional agg, date composition |
| Hard | 25 | Real Hard patterns (gaps-and-islands, recursive, multi-CTE chains) |
| Master | 15 | Not 10 (too thin for a Challenge Vault) / not 18 (overextends authoring scope) |
| **Total** | **130** | |

User proposed 50/40/30/10. Decision: 25H instead of 30H (not enough distinct Hard patterns post-cull), 15 Master instead of 10 (Vault needs depth). Same 130 total.

### Datamart count target: 12 (up from 5)

| Datamart | Status | Notes |
|---|---|---|
| ecomm | ✅ Existing | |
| saas | ✅ Existing | |
| fintech | ✅ Existing | |
| consumer | ✅ Existing | |
| health | ✅ Existing | |
| gaming | 🔲 New | DAU/WAU/retention, session length, level completion, in-app purchase |
| logistics | 🔲 New | Delivery SLA, driver utilization, route efficiency, damage rate |
| marketplace | 🔲 New | GMV, take rate, seller/buyer cohorts, category mix |
| food_delivery | 🔲 New | Order funnel, delivery time, cancellation, restaurant churn |
| social_network | 🔲 New | Feed engagement, follower graph, content virality, DAU |
| edtech | 🔲 New | Course completion, quiz score, study streak, refund rate |
| hr_analytics | 🔲 New | Headcount, attrition, time-to-hire, performance bands |

"Wider not longer" — more schemas, not more rows in existing schemas. Schema memorization is the risk when 250 problems share 5 datamarts.

### Master problem schema rule

Master problems get **standalone schemas** — one schema per Master problem, never shared across problems. This preserves the "business question only" framing without candidates memorizing the data layout.

### Sequencing decision

Sessions 2–3 (prompt rewrites / stakeholder-request framing) come BEFORE schema architecture design and new problem authoring. Reason: Sessions 2–3 close 55–65% of the MVP gap because prompt framing is the actual differentiation from StrataScratch. Schema/authoring work builds on the correct framing.

---

## Section 4 — Session Sequence

Six sessions total. Each is a complete unit of work. Order is fixed — dependencies are real.

### Session 1 — Execute Cull + Reclassify + Bug Fix
**Gate:** User approval of these findings
**Scope:**
- Remove 39 problems from sqlLabProblems.js (cull list in Section 2A)
- Apply 27 reclassifications (Section 2B) — change difficulty field only, no other edits
- Fix master10 bug: `GROUP BY a.user_id\)` → `GROUP BY a.user_id\n)`
- Post-execution: run validate-data.js, verify Vite build passes, spot-check 5 problems in browser
- Version bump: V4.40.0

**Output:** Cleaned 211-problem bank with correct difficulty labels. DO NOT rewrite any prompts or debriefs — that is Sessions 2–3.

### Session 2 — Prompt Type Classification
**Gate:** Session 1 complete
**Scope:**
- Read every surviving prompt
- Tag each: `technical-spec` or `stakeholder-request`
- Identify conversion candidates (technical-spec → stakeholder-request) at Medium/Hard/Master
- Target mix: Easy 80/20, Medium 60/40, Hard 50/50, Master 40/60
- Document: conversion list with draft direction notes per problem (NOT full rewrites — that is Session 3)
- No code changes to sqlLabProblems.js in this session

**Output:** Classification table (ID → prompt_type), conversion candidates list with direction notes.

### Session 3 — Stakeholder-Request Rewrites + Debrief Restructure
**Gate:** Session 2 classification done
**Scope:**
- Rewrite prompts for all conversion candidates in natural stakeholder voice
- Rewrite debriefs in order: (1) what stakeholder actually wants, (2) ambiguities resolved, (3) SQL approach, (4) what weak SQL looks like, (5) interviewer follow-up
- Do NOT change expectedColumns, expectedRowCount, checkValues, solution — prompt and debrief fields ONLY
- Estimated 50–80 rewrites; split by datamart if scope is too large for one session
- Single-quote rules apply; no backticks; escape apostrophes as `\'`
- Version bump: V4.41.0

**Output:** Updated sqlLabProblems.js with rewritten prompts and debriefs.

### Session 4 — Schema Architecture Design (7 new datamarts)
**Gate:** Sessions 2–3 done (final problem set locked before schema design)
**Scope:**
- Design spec for 7 new datamarts: gaming, logistics, marketplace, food_delivery, social_network, edtech, hr_analytics
- Per datamart: table names, column names, column types, 20–30 seed rows (as JS arrays of arrays)
- Ensure each datamart enables 8–12 problems covering the right SQL patterns
- Master schemas: design standalone schema per Master problem (15 schemas total)
- No implementation yet — spec only, reviewed before writing code

**Output:** Schema spec document or direct additions to sqlLabDatamarts.js.

### Session 5 — New Problem Authoring (fill gap list + reach 130 target)
**Gate:** Session 4 schemas done and reviewed
**Scope:**
- Write new problems against new datamarts to fill the 8-pattern gap list (Section 2D)
- Reach 130 total (50E/40M/25H/15Master) from current post-cull count
- All new problems: single quotes, no backticks, stakeholder-request framing where appropriate
- Validate: expectedRowCount verified against seed data, checkValues hand-traced
- Version bump: V4.42.0

**Output:** Updated sqlLabProblems.js + sqlLabDatamarts.js at 130-problem target.

### Session 6 — Phase 2 Features
**Gate:** Session 5 complete; all 130 problems verified correct
**Scope:**
- Study Plan modal (4-step: interview?/when?/role?/time?) → Casual/Steady/Intensive modes
  - localStorage: `pal-sql-lab-plan-v1`
  - Solved-aware: skips already-completed problems
- Per-problem timer: starts on first keystroke, records to `pal-sql-lab-times-v1` on correct solve only
- SQL Lab section in Progress.jsx: solved count by difficulty, total time, current streak
- Version bump: V4.43.0

**Output:** SqlLabPage.jsx + Progress.jsx updated with Phase 2 features.

---

## Section 5 — Why This Sequence (rationale)

**Why Sessions 2–3 before Sessions 4–5:**
Prompt framing is where PAL differentiates from StrataScratch. StrataScratch already has correct SQL problems — what it lacks is the stakeholder-translation layer. If Sessions 4–5 author new problems against new datamarts before the prompt style is locked, those new problems will be written in the wrong register and need rewriting again. Lock the framing style first, then author.

**Why Session 1 is pure execution, no rewrites:**
Session 1 is structural cleanup — removing noise (duplicates) and correcting signal (difficulty labels). Mixing in prompt rewrites risks double-touching the same problem twice. Clean the structure first, then improve the content.

**Why 130 and not 250:**
250 problems with 20% being duplicate skeletons teaches the same SQL concept 3x. 130 problems with zero duplicates, correct difficulty labels, and stakeholder-framed prompts teaches 130 distinct judgment calls. Volume is not differentiation. Fidelity is.

**Why 12 datamarts:**
At 250 problems over 5 datamarts = 50 problems per datamart. Candidates will memorize the schema by problem 10. 12 datamarts with 10–12 problems each keeps the schema fresh. Master problems get standalone schemas to preserve "business question only" framing.

---

## Section 6 — What Doesn't Change (standing rules from DECISIONS.md)

- File split: sqlLabDatamarts.js (schemas + seed) + sqlLabProblems.js (problems only) — never merge
- DB init: prepared statements only (`db.prepare(...).run(row)`) — never raw SQL INSERT strings
- Master problems: never in study plan queues — Challenge Vault only
- SQL Lab token limit: never write more than ~400 lines per tool call
- All strings single-quoted; apostrophes escaped as `\'`; no template literals in data files
- `isUnlocked()` stays true (beta) — do not change
