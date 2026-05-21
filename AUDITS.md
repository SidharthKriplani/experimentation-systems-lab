# Product Analytics Lab — Audit Log

Full record of every audit run against PAL: architecture reviews, content quality passes, design direction audits, product perspective reviews, UX audits, bug sweeps, accessibility checks, security reviews, mobile audits, and build-safety scans. Ordered newest-first within each section.

---

## Part I — Architecture & Product Audits

### Platform Architecture Audit
**Version:** Pre-V1.2 (2026-05)
**Type:** Product architecture / IA / build sequence
**Output:** `docs/PLATFORM_ARCHITECTURE_MEMO.md` (18 questions answered)

The founding document for the full platform. Ran before any multi-room code was written. Asked and answered 18 hard questions:

- Keep as Experimentation Systems Lab or upgrade to broader product? → Upgrade, rename to Product Analytics Lab.
- What rooms should exist and in what order? → Stats → Metrics → Design → Review → RCA → Cases (follows analyst causality chain).
- What should be built next? → Design Room (shares most code patterns with existing system, completes the design→review loop).
- Platform shell or rooms-first? → Rooms-first. Empty nav items are a graveyard.
- What absolutely should not be built yet? → 10 items listed: social features, team accounts, video content, LMS structure, AI evaluation, mobile app, API embeds, email/notification system, Stats Room as text-heavy MVP, Product Cases Room (breaks scoring model).

**Identified risks (6):**
1. Content production bottleneck — content quality is the binding constraint, not engineering speed
2. Platform dilution — 6 thin rooms worse than 1 excellent room
3. Stats Room becoming a textbook — interaction-first or don't ship
4. Losing the "practice the calls" positioning — every room must be a judgment exercise
5. Premature paid tier — real Stripe integration only makes sense with 3+ paid rooms
6. Activation problem — solution is content quality and clear use cases, not gamification

---

### Platform Gap Audit
**Version:** V3.4 — 2026-05
**Type:** Content coverage vs. real interview frequency
**Output:** 6 new rooms/expansions shipped in V3.4

Mapped every room against the actual distribution of question types in DS/PM interviews at top-tier tech companies. Found 6 material gaps:

| Gap | Finding | Resolution |
|---|---|---|
| RCA Room thin | Only 6 cases vs. frequency of RCA in first 30 min of DS loops | Expanded to 12 (RCA07–RCA12) |
| Cases Room thin | Only 4 cases vs. frequency in senior DS/PM loops | Expanded to 12 (C07–C12) |
| No behavioral room | Zero coverage of STAR format, influence, conflict scenarios | Built Behavioral Room (8 questions) |
| No estimation room | Fermi questions appear in 60–70% of DS phone screens | Built Estimation Room (8 problems) |
| No causal inference beyond A/B | DiD, RDD, Synthetic Control, IV appear at senior levels | Added STAT17–20 |
| No interview-format SQL | Anti-joins, rolling DAU, sessionization all canonical SQL questions | Added C15–C18 |

---

### Scenario Bank Taxonomy Audit
**Version:** Pre-V1.2 (2026-05)
**Type:** Content taxonomy / scenario family framework
**Output:** `docs/SCENARIO_BANK_TAXONOMY.md`

Defined 15 scenario families before writing most content. Each family teaches one category of experimentation failure — no scenario should straddle two families. Planned 50 scenarios total across 8 playable at launch.

Families defined: metric_conflict, srm, guardrail_breach, novelty_peeking, hte_subgroups, multiple_testing, sutva_interference, when_not_to_experiment, underpowered, cuped_variance, geo_holdout, switchback, b2b_constraints, right_censored, multi_touch.

Distribution targets set: 20 Analyst / 20 Senior / 10 Staff across all 15 families. No family more than 4 scenarios, none represented at only one difficulty level.

This taxonomy governs all Review Room scenario assignments and is referenced by the Content Quality Bar.

---

### Beta Launch Product Audit
**Version:** V2.3 — 2026-05
**Type:** Product / business model audit
**Output:** Full open access during beta (`isUnlocked()` returns `true`)

Audited the readiness to charge users before having usage data, retention signal, or testimonials. Decision: remove all paywalls during beta. Rationale: get traffic and habit first, introduce paid tier after metrics exist. Unlock code `EXP-LAB-DEV-2026` preserved in file but inactive. All 44 items made fully accessible.

---

## Part II — Content Quality Audits

### Content Quality Bar Definition
**Version:** Pre-V1.5 (2026-05)
**Type:** Quality standards framework
**Output:** `docs/CONTENT_QUALITY_BAR.md`

Defined the minimum standard every scenario must pass before shipping. Eight quality dimensions:

1. **Decision hardness** — surface read must differ from correct read; if a 2-year analyst gets it on first pass, it's too easy
2. **Metric readout quality** — table must create tension, not just information; realistic p-values, at least one guardrail with real stakes
3. **Warning flags** — real validity concerns discoverable from available data, correct severity, 3–6 per scenario
4. **Decision option calibration** — four levels: Junior Miss (defensible wrong), Analyst-Ready (right call, incomplete reasoning), Senior-Ready (right call + mechanism), Staff-Level (precision + stakeholder framing)
5. **Debrief quality** — specific to this scenario, not generic; names failure mode, explains why it matters here, addresses most common wrong answer, 400–700 words
6. **Business context specificity** — fictional company + specific product moment + real stakeholder pressure; not flavor text
7. **Scenario family alignment** — teaches exactly one failure mode, not two
8. **Difficulty tier consistency** — if all testers at target level get it right, it's mis-tiered

Ship checklist: 10 items including "at least one person who didn't write it has reviewed the debrief."

---

### V4.1 Review Scenario Quality Audit — S01–S08 Rewrite
**Version:** V4.1 — 2026-05
**Type:** Content quality audit
**Output:** All 8 original Review Room scenarios rewritten

Evaluated all S01–S08 Review scenarios against the current quality bar. All 8 failed the debrief specificity test — debriefs were generically written and didn't add precision beyond what was visible in the metrics. Rewrote all 8 with: stakeholderSummary, nextTestIdeas (3 each), keyTakeaways (5 each), scenarioFamily tag, conceptTags.

---

### V4.1 Stats + Metrics Enrichment Audit
**Version:** V4.1 — 2026-05
**Type:** Content depth audit
**Output:** STAT01–08 and M01–M06 enriched to current quality bar

Evaluated all 8 Stats modules (STAT01–08) and all 6 Metrics cases (M01–M06) against the quality bar set after V3.4. Found that both rooms were shipped at an earlier, lower standard. All 14 items enriched — deeper debrief specificity, stronger business context, richer failure mode explanations.

---

### Playbook Content Quality Audit — 117 Articles
**Version:** V3.2.1 — 2026-05
**Type:** Content quality audit
**Output:** 3 full rewrites, 2 opening narrative improvements

Reviewed all 117 Playbook articles against a story-first, narrative-depth standard. Four articles failed: framework/checklist-only structure, no opening scenario, no depth.

| Article | Issue | Resolution |
|---|---|---|
| `take-rate` | 3 bullet points, no story, no worked example | Full rewrite — Q2 earnings story opening, mix-shift section, double-axis analysis |
| `data-quality` | Bare checklist, no opening scenario, no SQL example | Full rewrite — silent join fanout error story, 6 checks, worked SQL example |
| `search-ranking-metrics` | Framework + callout only, no gaming hierarchy | Full rewrite — ranking regression story, gaming hierarchy, offline evaluation |
| `guardrails` | Dry definition opener | Opening narrative rewrite — marketplace story, late discovery |
| `segment-before-aggregate` | No concrete investigation scenario | Opening rewrite — concrete 9:47am Slack message scenario |

---

### V3.0 Content Audit — Top 10 Playbook Articles
**Version:** V3.0 — 2026-05
**Type:** Content quality / voice audit
**Output:** 10 articles with story-first rewrites, keyTakeaways, references

Audited the 10 highest-traffic Playbook articles for emotional/human-tone quality. All 10 received: story-first opening paragraph rewrites, `keyTakeaways: string[]` (5 bullets), `references: [...]` with real citations and URLs.

Articles audited: `srm`, `novelty-effect`, `sutva`, `peeking`, `cuped`, `denominator-discipline`, `five-metric-types`, `guardrails`, `guardrail-conflicts`, `multiple-testing`, `cdshv-framework`, `meta-dau-drop`, `airbnb-booking-drop`.

Opening rewrite principle established: scenario hooks before definitions, human stakes of getting it wrong, pressure and ambiguity as the real context.

---

### V2.1 Automated Content Integrity Audit (QA Dashboard)
**Version:** V2.1 — 2026-05
**Type:** Automated content integrity
**Output:** `src/utils/contentAudit.js` + `src/pages/QADashboard.jsx` — 63 checks

With 44 playable items across 6 rooms and a dense cross-reference graph, manual checking became unreliable before community beta. Built an automated audit tool.

**63 checks cover:**
- Item counts per room match expected totals
- All required fields present on every item
- Concept IDs referenced by items exist in `concepts.js`
- Learning path item IDs resolve to real items
- Paired scenario IDs (`pairedReviewScenarioId` / `pairedDesignScenarioId`) are mutually valid
- `isFree` flag consistency with stated free-item counts

**First run (V2.1): 5 failures**

| Failure | Fix |
|---|---|
| All 8 stat modules missing `subtitle` field | Added subtitles stat01–stat08 |
| 5 concept IDs missing from `concepts.js` (`retention`, `funnel-decomposition`, `segmentation`, `data-quality-check`, `cohort-analysis`) | Added all 5 |
| D04 wrong `pairedReviewScenarioId` | Corrected to `'s06-five-metrics-problem'` |

**Post-fix: 63/63 passing.** QA Dashboard still live at `/qa` route (hidden footer link). Re-runnable at any time.

---

### V1.6 Stats Mechanic Quality Audit
**Version:** V1.6 — 2025
**Type:** Content mechanic audit
**Output:** STAT01–08 redesigned from basic Q&A to claim-evaluation mechanic

Audited the V1.5 Stats Room against the core product principle: "decision-first, always." Found that the original STAT01–04 format (definition + Q&A) was teaching recall, not judgment. The product needed a "claim evaluation" mechanic — user reads a stakeholder claim, inspects supporting data, evaluates whether the claim holds.

All 8 stats modules redesigned around "Claim to Evaluate" panel: a stakeholder makes a specific claim about an experiment result, user agrees/partially agrees/disagrees with structured reasoning. This redesign made Stats Room consistent with the Review Room's judgment-first format.

---

## Part III — Visual & Design Audits

### Design Direction Audit
**Version:** V1.1 (2025)
**Type:** Visual identity / design system audit
**Output:** Full CSS theme system (`src/index.css`), light/dark mode, all 16 components migrated

Audited the hardcoded hex color system in V1 and found it unscalable and visually inconsistent across 16 components. Defined the correct aesthetic direction: "serious analytical learning workspace" — Linear, PostHog, Retool, Stripe Docs as reference points. Not edtech, not gamified.

Design principles established:
- Surface hierarchy: home canvas slightly warmer, card surfaces darker (depth, not flat)
- CSS variables introduced: `--bg`, `--surface`, `--accent`, `--teal`, `--yellow`, `--purple`, `--green`, `--red` etc.
- Light mode as default (desktop analytical workspace register)
- Theme toggle persisted in localStorage (`exp-lab-theme`)
- Dark mode via `data-theme="dark"` on `<html>`

All 16 component files migrated from hardcoded colors to CSS variables.

---

### Color System Conflict Audit
**Version:** V2.2 — 2026-05
**Type:** Visual design consistency audit
**Output:** Metrics color changed teal→green across 5 files

Discovered that Metrics Room and Design Room both used `var(--teal)` — visually identical rooms with no color differentiation. Metrics Room rebranded to `var(--green)` across 5 files: `Home.jsx`, `MetricsBrowser.jsx`, `JudgmentBank.jsx`, `QADashboard.jsx`, `Progress.jsx`.

Follow-up (V3.2.2 / V4.1): Two `var(--teal)` references remained in `MetricsRunner.jsx` case header label and submit button — caught in a later bug audit and corrected to `var(--green)`.

---

### V3.2.3 Visual & Accessibility Audit
**Version:** V3.2.3 — 2026-05
**Type:** Visual quality + WCAG accessibility audit
**Output:** Contrast fixes, responsive nav, keyboard accessibility on all card divs

**WCAG AA contrast:**
- Light mode `--text-dim` changed from `#9ca3af` (contrast ~2.8:1, fails AA) to `#6b7280` (~4.5:1, passes AA)
- Dark mode `--text-dim` bumped from `#545b7a` (~2.1:1) to `#8890a8` (~4.5:1)

**Responsive nav:** Header `<nav>` given `overflowX: 'auto'` and `scrollbarWidth: 'none'` — scrolls horizontally on narrow viewports without breaking layout.

**Keyboard accessibility:** `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space handlers) added to all clickable card `<div>` elements in `MetricsBrowser`, `RCABrowser`, `CasesBrowser`, `DesignBrowser`, `StatsBrowser`. Locked cards in `CasesBrowser` get `tabIndex={-1}`.

---

## Part IV — UX & Product Perspective Audits

### First-Impression Audit (Pre-Beta Launch)
**Version:** V2.2 — 2026-05
**Type:** UX / content freshness / front-door audit
**Output:** 7 issues fixed (3 P0, 4 P1)

Full front-door review before private beta launch to "Data All In" WhatsApp community (~6–8 testers). Evaluated: Unlock page copy, color conflicts, homepage CTA hierarchy, room browser labels, progress reset completeness, nav labels.

| Priority | Issue |
|---|---|
| P0 | `Unlock.jsx` copy was V1-era — product had 44 items, copy still said 8 scenarios |
| P0 | Metrics and Design rooms both used `var(--teal)` — visually identical |
| P0 | `CasesBrowser.jsx` h1 and eyebrow both said "Cases Room" — duplicate |
| P1 | Homepage had 3 equal-weight CTAs with no primary action |
| P1 | `StatsBrowser.jsx` showing raw `module.situation.context.slice(0,120)` as description instead of `module.subtitle` |
| P1 | Progress "Clear" button only cleared Review Room, not all rooms |
| P1 | Nav label "Judgment Bank" was internal terminology; renamed to "Library" |

---

### UX Density Audit — Home Page
**Version:** V3.2.4 / V4.3 — 2026-05
**Type:** Information density / cognitive load audit
**Output:** CTA reduction, section header cleanup, room grid tightening

Two passes. First pass (V3.2.4): homepage had 3 equal-weight CTAs — reduced to 1 primary + 1 secondary, removed developer diary section, tightened subheadline. Second pass (V4.3): further density reduction — cleaner hero, tighter room grid, less visual noise.

Principle established: every element on the Home page must either orient first-time users or re-orient returning users. Developer-diary content and equal-weight CTAs fail both tests.

---

### Next-Case Navigation Completeness Audit
**Version:** V3.3.1 — 2026-05
**Type:** Feature consistency audit
**Output:** Next-case nav added to ProductDesign and Code runners

After V3.2.3 added next-case nav to RCA, Metrics, and Cases, and V3.3 added it to Design and Prioritization, discovered that ProductDesign and Code runners had been missed entirely. Audited every runner in the app against the pattern — two missing. Added `onNext` prop to both.

Principle: any feature added to "all rooms" should be verified with an explicit pass over every room component, not assumed complete.

---

### User Journey Completeness Audit — Progress Page
**Version:** V4.5 — 2026-05
**Type:** Feature coverage audit
**Output:** 5 new rooms added to all Progress tracking structures

After V4.4 added Challenges, BI, Spot the Flaw, Take-Home, and Instrumentation rooms, audited Progress.jsx for coverage gaps. Found: none of the 5 new rooms appeared in completion bars, heatmap date stores, completionMap, `totalCompleted`/`grandTotal`, or `getNextSuggested()`. Fixed all gaps in V4.5.

---

## Part V — Bug & Routing Audits

### Internal Bug Audit (Agent Cross-Check)
**Version:** V3.2.2 — 2026-05
**Type:** Feature/routing correctness audit (independent agent review)
**Output:** 5 bugs found and fixed

Spawned a separate agent to cross-check all routing, paywall, progress, and nav logic independently before community beta launch.

| Bug | File | Description |
|---|---|---|
| BUG-01 | `App.jsx` | `onOpenItem` missing `product-design` and `prioritization` branches — "Now practice it" links silently did nothing |
| BUG-02 | `CasesBrowser.jsx` | Hardcoded `isLocked={false}` — C03/C04 showed no paywall for locked users |
| BUG-03 | `App.jsx` | `onResetAllProgress` missing `pal-code-progress-v1` and `pal-pri-progress-v1`; Product Design keys required prefix-iteration |
| BUG-04 | `Header.jsx` | `product-design` had no nav entry — room was unreachable from header |
| BUG-05 | `MetricsRunner.jsx` | Two `var(--teal)` remnants from V2.2 teal→green migration |

---

## Part VI — Security Audit

### .env / Secret Management Audit
**Version:** V3.2.4 — 2026-05
**Type:** Security audit
**Output:** `.gitignore` created, `.env.example` added

Caught incidentally during PostHog analytics integration. Found that `.gitignore` was missing entirely — any `.env` file with a real PostHog key or Stripe key would have been committed to the public GitHub repo on next `git add .`.

**Fix:** Added `.gitignore` with `.env` and `.env.*` (with `!.env.example` exception). Created `.env.example` documenting `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`.

---

## Part VII — Mobile Responsiveness Audits

### Mobile Audit — V4.5 Rooms (Post-V3.6)
**Version:** V4.5 — 2026-05
**Type:** Mobile responsiveness audit
**Trigger:** User check: "has the app been mobile optimized?"

Audited all rooms added since the V3.6 mobile pass. 8 files with overflow issues found — all shared the same root cause: `minmax(Xpx, 1fr)` where `X` exceeded the mobile viewport width.

**Fix pattern:** `minmax(min(Xpx, 100%), 1fr)` — inner `min()` clamps minimum track size to viewport width.

| File | Fix |
|---|---|
| `BIBrowser.jsx` | `380px` → `min(380px, 100%)` |
| `InstrumentationBrowser.jsx` | `380px` → `min(380px, 100%)` |
| `ChallengesBrowser.jsx` | `420px` → `min(400px, 100%)` |
| `ScenarioRunner.jsx` | `360px` → `min(360px, 100%)` |
| `PlaybookBrowser.jsx` | `340px` → `min(340px, 100%)` |
| `BlogBrowser.jsx` | `340px` → `min(340px, 100%)` |
| `MetricsBrowser.jsx` | `340px` → `min(340px, 100%)` |
| `Progress.jsx` | `320px` → `min(320px, 100%)` |

---

### Mobile Audit — V3.6 (Monetization Readiness)
**Version:** V3.6 — 2026-05
**Type:** Mobile responsiveness audit
**Trigger:** Pre-launch production-readiness pass before monetization rollout

Full nav review on a ~375px viewport. Findings:
- `Header.jsx` — nav buttons lacked minimum touch target size. Added `minHeight: 44px`, `flexShrink: 0`.
- `Home.jsx`, `StatsFoundationsBrowser.jsx`, `StatsFoundationsRunner.jsx`, `StatsBrowser.jsx` — containers lacked `width: 100%` and `boxSizing: border-box`.
- `Module01_WhatIsData.jsx` — drop-zones row lacked `flexWrap: wrap`, columns wouldn't stack.

---

## Part VIII — Build Safety Audits

### Apostrophe / Syntax Safety Scan — V4.5.1
**Version:** V4.5.1 — 2026-05
**Type:** Build safety audit
**Trigger:** Vercel build failure — `growthAnalyticsCases.js:146:206` — `Expected ',' or '}' but found 'Identifier'`

Three unescaped apostrophes in `leadershipNote` single-quoted strings added during V4.4 Leadership Lens feature:

| Line | Violation | Fix |
|---|---|---|
| 146 | `the product's natural cadence` | `product\'s` |
| 227 | `new cohort's Day-7` | `cohort\'s` |
| 603 | `growth team's attribution` | `team\'s` |

Same class of bug previously caught in `challengesCases.js` (`Maps'`).

**Rule:** All JS data files use single quotes only. Any apostrophe inside a single-quoted string must be escaped as `\'`. No template literals in data files — Vite/Rolldown will throw parse errors.

---

## Summary table

| # | Audit | Version | Type |
|---|---|---|---|
| 1 | Platform Architecture (18 Qs) | Pre-V1.2 | Architecture / product |
| 2 | Platform Risk Assessment (6 risks) | Pre-V1.2 | Product risk |
| 3 | Platform Gap vs. Interview Frequency | V3.4 | Coverage / content |
| 4 | Scenario Bank Taxonomy (15 families) | Pre-V1.2 | Content taxonomy |
| 5 | Beta Open-Access Decision | V2.3 | Business / product |
| 6 | Content Quality Bar Definition | Pre-V1.5 | Quality framework |
| 7 | S01–S08 Review Scenario Rewrite | V4.1 | Content quality |
| 8 | STAT01–08 + M01–M06 Enrichment | V4.1 | Content quality |
| 9 | 117 Playbook Article Quality Audit | V3.2.1 | Content quality |
| 10 | V3.0 Top-10 Article Voice Audit | V3.0 | Content quality |
| 11 | Automated Content Integrity (63 checks) | V2.1 | Automated integrity |
| 12 | 5-Failure Content Integrity Patch | V2.1.1 | Automated integrity |
| 13 | V1.6 Stats Mechanic Audit | V1.6 | Content mechanic |
| 14 | Design Direction + CSS System Audit | V1.1 | Visual / design system |
| 15 | Color System Conflict (Metrics teal→green) | V2.2 | Visual consistency |
| 16 | WCAG Contrast + Keyboard A11y Audit | V3.2.3 | Visual / accessibility |
| 17 | First-Impression Pre-Beta Audit | V2.2 | UX / front-door |
| 18 | Home Page Density Audit (×2) | V3.2.4 + V4.3 | UX / cognitive load |
| 19 | Next-Case Nav Completeness Audit | V3.3.1 | Feature consistency |
| 20 | Progress Page Coverage Audit | V4.5 | Feature coverage |
| 21 | Internal Bug Audit (agent cross-check, 5 bugs) | V3.2.2 | Bug / routing |
| 22 | .env Secret Management Audit | V3.2.4 | Security |
| 23 | Mobile Audit — V4.5 rooms (8 files) | V4.5 | Mobile responsiveness |
| 24 | Mobile Audit — V3.6 launch readiness | V3.6 | Mobile responsiveness |
| 25 | Apostrophe Syntax Safety Scan | V4.5.1 | Build safety |
