# Product Analytics Lab — Audit Log

Full record of every audit run against the PAL codebase: content integrity checks, bug sweeps, mobile responsiveness audits, security reviews, and build-safety scans. Ordered newest-first.

---

## Audit 9 — Apostrophe / Syntax Safety Scan
**Version:** V4.5.1 — 2026-05
**Type:** Build safety / syntax audit
**Trigger:** Vercel deployment failed with `[builtin:vite-transform] Expected ',' or '}' but found 'Identifier'` at `growthAnalyticsCases.js:146:206`

**What was checked:**
All `leadershipNote` fields added during V4.4's Leadership Lens feature in `growthAnalyticsCases.js` — specifically any single-quoted JS strings containing apostrophes.

**Findings (3 violations):**
- Line 146: `the product's natural cadence` — unescaped apostrophe in single-quoted string
- Line 227: `new cohort's Day-7` — unescaped apostrophe in single-quoted string
- Line 603: `growth team's attribution` — unescaped apostrophe in single-quoted string

**Fix:** Python script replaced all three with `\'` escaped versions. Same class of bug previously found in `challengesCases.js` (`Maps'`).

**Rule established:** All JS data files use single quotes only. Any apostrophe inside a single-quoted string must be escaped as `\'`. No template literals (backticks) in data files — Vite/Rolldown will throw parse errors.

**Files touched:** `src/data/growthAnalyticsCases.js`

---

## Audit 8 — Mobile Responsiveness Audit (V4.5 rooms)
**Version:** V4.5.0 — 2026-05
**Type:** Mobile responsiveness audit
**Trigger:** User asked "has the app been mobile optimized?" after V4.5 build

**What was checked:**
All rooms added or significantly changed since the V3.6 mobile pass — BIBrowser, InstrumentationBrowser, ChallengesBrowser, SpotTheFlawBrowser, TakehomeBrowser, ScenarioRunner, PlaybookBrowser, BlogBrowser, MetricsBrowser, Progress page.

**Findings (8 files with overflow issues):**
All failures shared the same root cause: CSS `minmax(Xpx, 1fr)` grid patterns where `X` exceeded the mobile viewport width, causing horizontal overflow.

| File | Old pattern | Fixed pattern |
|---|---|---|
| `src/pages/BIBrowser.jsx` | `minmax(380px, 1fr)` | `minmax(min(380px, 100%), 1fr)` |
| `src/pages/InstrumentationBrowser.jsx` | `minmax(380px, 1fr)` | `minmax(min(380px, 100%), 1fr)` |
| `src/pages/ChallengesBrowser.jsx` | `minmax(420px, 1fr)` | `minmax(min(400px, 100%), 1fr)` |
| `src/components/scenario/ScenarioRunner.jsx` | `'minmax(0, 1fr) 360px'` | `'minmax(0, 1fr) min(360px, 100%)'` |
| `src/pages/PlaybookBrowser.jsx` | `minmax(340px, 1fr)` | `minmax(min(340px, 100%), 1fr)` |
| `src/pages/BlogBrowser.jsx` | `minmax(340px, 1fr)` | `minmax(min(340px, 100%), 1fr)` |
| `src/pages/MetricsBrowser.jsx` | `minmax(340px, 1fr)` | `minmax(min(340px, 100%), 1fr)` |
| `src/pages/Progress.jsx` | `minmax(320px, 1fr)` | `minmax(min(320px, 100%), 1fr)` |

**Fix pattern:** `minmax(min(Xpx, 100%), 1fr)` — the inner `min()` clamps the minimum track size to the viewport width, preventing grid items from causing horizontal scroll on narrow screens.

---

## Audit 7 — Mobile Responsiveness Audit (V3.6 rooms)
**Version:** V3.6 — 2026-05
**Type:** Mobile responsiveness audit
**Trigger:** Pre-launch production-readiness pass before monetization rollout

**What was checked:**
All pages reachable from the nav on a narrow (~375px) viewport. Focus: room browsers, runners, Header nav touch targets.

**Findings and fixes:**
- `Header.jsx` — nav buttons lacked minimum touch target size. Added `minHeight: 44px` and `flexShrink: 0` for 44px touch targets (Apple HIG minimum).
- `Home.jsx`, `StatsFoundationsBrowser.jsx`, `StatsFoundationsRunner.jsx`, `StatsBrowser.jsx` — main containers lacked `width: '100%'` and `boxSizing: 'border-box'`, causing content to escape container bounds on mobile.
- `Module01_WhatIsData.jsx` — drop-zones row lacked `flexWrap: 'wrap'`, so columns didn't stack on narrow screens.

**Files touched:** `Header.jsx`, `Home.jsx`, `StatsFoundationsBrowser.jsx`, `StatsFoundationsRunner.jsx`, `StatsBrowser.jsx`, `Module01_WhatIsData.jsx`

---

## Audit 6 — Platform Gap Audit
**Version:** V3.4 — 2026-05
**Type:** Content completeness / feature gap audit
**Trigger:** Pre-V3.4 sprint planning — honest assessment of what was missing relative to real interview frequency

**What was checked:**
Room-by-room coverage mapped against the actual distribution of interview question types in DS/PM loops at top-tier tech companies.

**Findings (6 material gaps):**
1. **RCA Room thin** — only 6 cases (RCA01–RCA06) relative to how frequently RCA drives the first 30 minutes of DS interviews. Needed 12.
2. **Cases Room thin** — only 4 cases (C01–C04). Business framing and stakeholder recommendation questions appear in every senior DS/PM loop. Needed 12.
3. **No behavioral/leadership room** — the STAR format and influence/conflict scenarios are tested in every PM and senior DS loop. Zero coverage.
4. **No Fermi/estimation room** — Fermi questions ("How many Uber rides per day in NYC?") appear in 60–70% of DS phone screens. Zero coverage.
5. **No causal inference beyond A/B** — DiD, RDD, Synthetic Control, IV all appear at senior DS / research levels. Only standard A/B covered.
6. **Code Room missing interview-format SQL** — anti-joins, rolling DAU, sessionization, top-N per group are canonical SQL interview questions. Only analytics SQL existed.

**Resolution:** All 6 gaps addressed in V3.4 — RCA expanded to 12, Cases expanded to 12, Behavioral Room (8 questions) added, Estimation Room (8 problems) added, Stats expanded with STAT17–20 (causal inference), Code expanded with C15–C18 (interview SQL).

---

## Audit 5 — Security Audit
**Version:** V3.2.4 — 2026-05
**Type:** Security / secret management audit
**Trigger:** Caught incidentally during the PostHog analytics integration pass

**What was checked:**
`.gitignore` contents relative to the new `.env` file introduced for `VITE_POSTHOG_KEY` and `VITE_STRIPE_PAYMENT_LINK`.

**Finding:**
`.gitignore` was missing entirely — any `.env` file with a real PostHog key or Stripe key would have been committed to the public GitHub repository on the next `git add .`.

**Fix:**
- Added `.gitignore` with `.env` and `.env.*` entries (with `!.env.example` exception to keep the template visible).
- Created `.env.example` documenting `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` for contributors.

**Files touched:** `.gitignore` (new), `.env.example` (new)

---

## Audit 4 — Internal Bug Audit (Agent Cross-Check)
**Version:** V3.2.2 — 2026-05
**Type:** Feature/routing correctness audit
**Trigger:** Proactive cross-check before community beta launch — spawned a separate agent to review all routing, paywall, progress, and nav logic independently

**What was checked:**
All routing branches in `App.jsx`, paywall display logic across all room browsers, progress reset completeness, Header nav items vs. registered pages, and CSS color variable consistency across all runners.

**Findings (5 bugs):**

| Bug | File | Description |
|---|---|---|
| BUG-01 | `App.jsx` | `onOpenItem` missing `product-design` and `prioritization` branches — Playbook "Now practice it" links for those rooms silently did nothing |
| BUG-02 | `CasesBrowser.jsx` | Hardcoded `isLocked={false}` — C03/C04 showed no paywall indicator for locked users |
| BUG-03 | `App.jsx` | `onResetAllProgress` missing `pal-code-progress-v1` and `pal-pri-progress-v1` keys; Product Design keys required prefix-iteration |
| BUG-04 | `Header.jsx` | `product-design` had no nav entry — room was unreachable from header; `product-design-runner` had no active-state condition |
| BUG-05 | `MetricsRunner.jsx` | Two `var(--teal)` / `var(--teal-border)` remnants left from V2.2 teal→green migration |

**All 5 fixed in V3.2.2.**

---

## Audit 3 — Playbook Content Quality Audit
**Version:** V3.2.1 — 2026-05
**Type:** Content quality audit
**Trigger:** Pre-community-beta content review — all 117 Playbook articles evaluated against a story-first, narrative-depth standard

**What was checked:**
Every article in `PlaybookBrowser.jsx` assessed for: story-first opening (concrete scenario, not definition), narrative depth beyond framework/checklist, interview application clarity, keyTakeaways presence.

**Findings:**
4 articles were genuinely thin — framework or checklist only, no opening scenario, no depth:
- `take-rate` (Metrics): 3 bullet points, no story, no worked example
- `data-quality` (SQL & Data): bare checklist + one callout, no opening scenario, no SQL example
- `search-ranking-metrics` (Product Sense): framework_box + callout only, no gaming hierarchy, no offline evaluation guidance
- `guardrails` (Metrics): dry definition opener with no human stakes
- `segment-before-aggregate` (RCA): no concrete investigation scenario

**Resolution:** Full rewrites of `take-rate`, `data-quality`, `search-ranking-metrics`. Opening narrative improvements on `guardrails` and `segment-before-aggregate`. All rewrites added concrete story hooks, worked examples, and stronger interview application framing.

---

## Audit 2 — First-Impression / Pre-Beta Launch Audit
**Version:** V2.2 — 2026-05
**Type:** UX / content freshness audit
**Trigger:** Imminent private beta launch to "Data All In" WhatsApp community (~6–8 testers)

**What was checked:**
Full front-door review — Unlock page copy, color system conflicts, homepage CTA clarity, room browser labels, progress reset completeness, nav label conventions.

**Findings:**

| Severity | Issue | File |
|---|---|---|
| P0 | `Unlock.jsx` copy was V1-era ("unlock 8 scenarios", "Scenario Browser", "Paid access coming soon") — product had 44 items across 6 rooms | `Unlock.jsx` |
| P0 | Metrics Room and Design Room both used `var(--teal)` — visually identical rooms | `Home.jsx`, `MetricsBrowser.jsx`, `JudgmentBank.jsx`, `QADashboard.jsx`, `Progress.jsx` |
| P0 | `CasesBrowser.jsx` h1 and eyebrow both said "Cases Room" (duplicate label) | `CasesBrowser.jsx` |
| P1 | Homepage had 3 equal-weight CTAs with no clear primary action | `Home.jsx` |
| P1 | `StatsBrowser.jsx` showing raw `module.situation.context.slice(0,120)` as card description instead of `module.subtitle` | `StatsBrowser.jsx` |
| P1 | Progress "Clear" button only cleared Review Room — all other rooms unaffected | `Progress.jsx` |
| P1 | Nav label "Judgment Bank" was internal/developer terminology | `Header.jsx` |

**Resolution:** All P0s and P1s fixed in V2.2. QA audit confirmed 63/63 checks passing post-fix.

---

## Audit 1 — Automated Content Integrity Audit (QA Dashboard)
**Version:** V2.1 — 2026-05
**Type:** Automated content integrity / data consistency audit
**Trigger:** Pre-beta — with 44 playable items across 6 rooms and a dense cross-reference graph (concept IDs, paired scenario IDs, learning path item IDs), manual checking became unreliable

**Audit tool built:**
- `src/utils/contentAudit.js` — pure function `runContentAudit()` returning 63 structured checks
- `src/pages/QADashboard.jsx` — internal dashboard rendering all checks with pass/fail/warning, room badges, affected item lists. Hidden behind a footer link (`qa` route) — not visible to end users.

**63 checks cover:**
- Item counts per room match expected totals
- All required fields present on every item (title, subtitle, difficulty, isFree, etc.)
- Concept IDs referenced by items actually exist in `concepts.js`
- Learning path item IDs resolve to real items
- Paired scenario IDs (`pairedReviewScenarioId` / `pairedDesignScenarioId`) are mutually valid
- `isFree` flag consistency with stated free-item counts

**First run result (V2.1):** 5 failures

| Check | Failure |
|---|---|
| Required fields — statsModules | All 8 stat modules missing `subtitle` field |
| Concept reference integrity | `retention`, `funnel-decomposition`, `segmentation`, `data-quality-check`, `cohort-analysis` IDs missing from `concepts.js` |
| Paired scenario ID validity | D04 had wrong `pairedReviewScenarioId: 's06-five-metrics'` — correct is `'s06-five-metrics-problem'` |

**Resolution (V2.1.1):** All 5 failures fixed. Final score: 63/63 passing.

**Files touched:** `src/utils/contentAudit.js` (NEW), `src/pages/QADashboard.jsx` (NEW), `src/data/statsModules.js`, `src/data/concepts.js`, `src/data/designScenarios.js`

**Status:** QA Dashboard still live at the `/qa` route (hidden footer link). Re-runnable at any time.

---

## Audit coverage by type

| Type | Versions | Count |
|---|---|---|
| Content integrity (automated) | V2.1, V2.1.1 | 2 |
| Content quality (manual) | V2.2, V3.0, V3.2.1 | 3 |
| Bug / routing / feature correctness | V3.2.2 | 1 |
| Security / secret management | V3.2.4 | 1 |
| Platform gap / coverage | V3.4 | 1 |
| Mobile responsiveness | V3.6, V4.5 | 2 |
| Build safety / syntax | V4.5.1 | 1 |
| **Total** | | **11** |
