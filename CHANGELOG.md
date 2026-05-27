# Product Analytics Lab — Changelog

Full build lineage. Covers what changed, why, what was added, what was fixed, and which files were touched in each release. Intended to make the project understandable to any future contributor, collaborator, or reviewer without needing to read the git log.

---

## [4.25.4] — 2026-05-27

### Fixed — Full dark mode palette rebuild (audit #74 follow-up)

V4.25.3 only lifted text values — backgrounds stayed near-black, so text was still fighting a collapsing void at low brightness. This release fixes all three structural root causes:

**Root cause 1 — Canvas too dark, surface step too small:**
bg→surface gap was ~7 luminance units; cards barely lifted off the page. Rebuilt with a ~12 unit gap so card surfaces are clearly visible even at 25% brightness.

**Root cause 2 — Semantic bg colors indistinguishable from background:**
Every tinted bg (`--accent-bg`, `--teal-bg`, `--red-bg`, `--green-bg`, `--purple-bg`, `--blue-bg`) was near-black (#0d0d0d range), visually identical to `--bg`. At low brightness these collapsed to the same shade. All now have proper color tinting.

**Root cause 3 — Borders invisible at low brightness:**
`--border: #333a55` was too dark to define card edges at low brightness. Lifted to `#3d4668`; `--border-strong` to `#535e82`.

| Variable | V4.25.3 | V4.25.4 |
|---|---|---|
| `--bg` | `#0d1018` | `#111520` |
| `--surface` | `#141828` | `#191e30` |
| `--surface-2` | `#1a1f30` | `#1f2438` |
| `--surface-raised` | `#20253c` | `#262c44` |
| `--border` | `#333a55` | `#3d4668` |
| `--border-strong` | `#444d6e` | `#535e82` |
| `--text` | `#eceef4` | `#f2f4fa` |
| `--text-muted` | `#9ba5be` | `#a2acc6` |
| `--text-dim` | `#7a8399` | `#8490aa` |
| `--accent-bg` | `#0d1629` | `#141f3e` |
| `--teal-bg` | `#042f2e` | `#0e2d2c` |
| `--red-bg` | `#2e0d0d` | `#2c1212` |
| `--purple-bg` | `#1e1030` | `#1e1238` |
| `--input-bg` | `#111420` | `#191e30` |
| `--header-bg` | `rgba(10,13,20,0.97)` | `rgba(17,21,32,0.97)` |

**Files touched:** `src/index.css`

---

## [4.25.3] — 2026-05-27

### Fixed — Dark mode contrast for low-brightness mobile (audit #74)

`--text-dim` was `#5a6278` — approximately 2.9:1 contrast ratio against the dark canvas, failing WCAG AA even at full screen brightness and becoming effectively invisible on mobile at 20–30% brightness. All dark mode canvas and text variables lifted:

| Variable | Before | After |
|---|---|---|
| `--bg` | `#0a0d14` | `#0d1018` |
| `--surface` | `#111420` | `#141828` |
| `--surface-2` | `#181b2a` | `#1a1f30` |
| `--surface-raised` | `#1e2235` | `#20253c` |
| `--border` | `#2d3148` | `#333a55` |
| `--border-subtle` | `#1e2235` | `#262c45` |
| `--border-strong` | `#3d4266` | `#444d6e` |
| `--text` | `#e8eaf0` | `#eceef4` |
| `--text-secondary` | `#c5c9d8` | `#c8cdd9` |
| `--text-muted` | `#8890a8` | `#9ba5be` |
| `--text-dim` | `#5a6278` | `#7a8399` |

The theme stays dark — backgrounds are not washed out. `--text-dim` was the critical failure; the rest are modest lifts to give contrast buffer at low brightness. `--text-dim` now achieves ~4.5:1 contrast ratio, passing WCAG AA.

**Files touched:** `src/index.css`

---

## [4.25.2] — 2026-05-27

### Changed — Idea intake from sibling repos + feature pause decision

**ML Systems Lab real-repo inspection:**
Fetched and read the live README and CLAUDE.md from `github.com/SidharthKriplani/ml-systems-lab`. Added 4 items to IDEAS.md that were not previously captured: Playbook → practice direct linking (∇ Gradient pattern), timed exam lock mechanic (Combinator), production bug debugging room (Code Bugs), and a note that previously cited ML Systems Lab items were directionally correct even though the prior agent inspection had not fetched the real repo.

**Feature pause decision recorded:**
- `DECISIONS.md` — new "Current priority (V4.25+)" section: feature building suspended until PostHog baseline is established and real session behavior is observed. Sequence: confirm PostHog live → watch 20 sessions → decide on paywall flip based on data.
- `IDEAS.md` — "In Progress" section updated to reflect pause and list the 3 pre-feature steps.

**Files touched:** `IDEAS.md`, `DECISIONS.md`

---

## [4.25.1] — 2026-05-27

### Changed — GenAI Lab real-repo ideas + field intelligence workflow

**GenAI Systems Lab real-repo inspection:**
Fetched the actual CLAUDE.md from `github.com/SidharthKriplani/genai-systems-lab`. Prior session used an Explore subagent that hallucinated the repo contents. Real fetch revealed: `gated: true` per-question paywall flag (163 questions pre-tagged), single forward pointer principle, field intelligence workflow, three front doors IA (Build/Prove/Navigate), PARKED.md pattern, ELI5 mode toggle, Quiz Me auto-generation, AI Product tab analog, PWA + offline support.

Added to IDEAS.md:
- Tier 1 Features: `gated: true` per-case paywall flag
- Tier 2 Features: Quiz Me on Playbook articles, PM Practitioner tab, single forward pointer principle
- Tier 2 Platform: three front doors IA audit, Create PARKED.md
- Tier 3 Features: ELI5 mode toggle, PWA + offline support

**CLAUDE.md:** field intelligence workflow formalized as a 5-step process under "When external content arrives."

**Files touched:** `IDEAS.md`, `CLAUDE.md`

---

## [4.25.0] — 2026-05-27

### Changed — Audit #72 + #73: Full UX consistency pass + auth hardening

**Next-case highlight — all 16 case room browsers (audit #72A):**
Every room browser now shows a "first unstarted case" signal: accent-colored left border (`3px solid var(--<room-color>)`) + absolute "Next →" badge on the top-right corner of the card. Previously only StatsBrowser had this pattern. Each browser uses its own room color variable and its own progress getter. Notable implementation details:
- `CasesBrowser`, `RCABrowser`: progress is per-case (`getCaseProgress(id)`, `getRCAProgress(id)`) — firstUnstartedId computed by scanning the full list
- `MetricsBrowser`: same per-case pattern via `getMetricsProgress(id)`
- `ChallengesBrowser`: firstUnstartedId from the full case list, not the filtered list — highlight persists across difficulty filter changes
- `ScenarioBrowser`: delegates `isNextUnstarted` prop to `ScenarioCard` component
- `ProductDesignBrowser`: "started" defined as `completedPhaseIds.length > 0` (multi-phase room)
- `TakehomeBrowser`: "completed" defined by `completedAt` field
- `GrowthAnalyticsBrowser`: "Next →" badge shifted left when bookmark emoji is also present to avoid overlap
- Agent also fixed pre-existing bugs in DesignBrowser (`diffCfg` undefined), PrioritizationBrowser (`priScenarios` reference + inner IIFE), SpotTheFlawBrowser (`stfCases` reference + missing `Icon` import)

**Sticky bottom CTA — RCARunner, CaseRunner, BIRunner (audit #72B):**
Position-fixed bottom bar (same pattern as ChallengesRunner) added to the 3 runners with longest debrief content. Bar shows "← Back" (secondary) + "Next →" (primary, only when `onNext` exists). Padding-bottom added to content containers to prevent content being hidden behind the fixed bar. Colors: `var(--teal)` for RCA, `var(--accent)` for Cases, `var(--yellow)` for BI.

**Auth hardening (audit #73):**
- `App.jsx` — `visibilitychange` listener added inside auth useEffect: pushes progress to Supabase when tab goes to background and user is signed in. Prevents progress loss between sign-in events.
- `App.jsx` — Sign-in button (and user initial avatar when signed in) added to mobile topbar right slot. Previously the only auth entry point on mobile was the sidebar hamburger.
- `Header.jsx` — Comment added noting the component is not rendered and navigation is handled by Sidebar.jsx.
- `README.md` — Supabase env var documentation added to deploy section.

**Audit #64 status corrected:**
Template literals in data files were already fully resolved in V4.12.0 (all 26 data files scanned, zero backticks remaining). AUDITS.md ⚠️ flag was stale — corrected to ✅.

### Files changed
`src/pages/BIBrowser.jsx`, `src/pages/BehavioralBrowser.jsx`, `src/pages/CasesBrowser.jsx`, `src/pages/ChallengesBrowser.jsx`, `src/pages/CodeBrowser.jsx`, `src/pages/DesignBrowser.jsx`, `src/pages/EstimationBrowser.jsx`, `src/pages/GrowthAnalyticsBrowser.jsx`, `src/pages/InstrumentationBrowser.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/PrioritizationBrowser.jsx`, `src/pages/ProductDesignBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/ScenarioBrowser.jsx`, `src/pages/SpotTheFlawBrowser.jsx`, `src/pages/TakehomeBrowser.jsx`, `src/components/scenario/ScenarioCard.jsx`, `src/components/rca/RCARunner.jsx`, `src/components/cases/CaseRunner.jsx`, `src/components/bi/BIRunner.jsx`, `src/App.jsx`, `src/components/layout/Header.jsx`, `README.md`, `AUDITS.md`, `IDEAS.md`

---

## [4.24.0] — 2026-05-27

### Added — UX pass (P4/P5) + Supabase auth

**ChallengesBrowser.jsx — difficulty filter bar:** Pills for All (16) / Senior (10) / Staff (6). Active state uses `var(--yellow)` for Senior, `var(--red)` for Staff, `var(--text)` for All. Filters `filteredCases` array via derived state. Addresses the blank-page problem for returning users who've already done the senior-level set.

**StatsBrowser.jsx — next-case highlight:** First unstarted case gets `borderLeft: '3px solid var(--accent)'` + absolute "Next →" badge (accent bg). Removes the "where do I start?" friction for every session.

**ChallengesRunner.jsx — sticky bottom bar:** Fixed bar (position: fixed, bottom: 0) shown when `rating !== null`. Contains "Case complete" label, "← Back to list" secondary button, "Next challenge →" primary button (`var(--red)` bg). Keeps forward momentum after debrief.

**Home.jsx — deferred onboarding modal:** Split `showOnboarding` (intent flag, set on first visit) from `showOnboardingModal` (render gate, delayed 4 seconds via `useEffect` + `setTimeout`). Modal no longer fires on page load before the user has seen any content.

**Home.jsx — filled hero CTA:** "Try it live →" changed from ghost link to filled accent button (`var(--accent)` bg, white text, `fontWeight: 700`). Higher visual weight to match primary CTA intent.

**Supabase auth layer:**
- `src/utils/supabase.js` — `createClient` guarded behind `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` env vars; exports `null` when not set so all downstream code falls back gracefully
- `src/utils/auth.js` — `signInWithEmail`, `signInWithGoogle`, `signOut`, `getUser`, `onAuthStateChange` — all null-guarded
- `src/utils/syncProgress.js` — `pushProgressToSupabase` + `pullProgressFromSupabase` over 18 `pal-*` localStorage keys; upserts to `user_progress` table with RLS
- `src/components/auth/AuthModal.jsx` — two-step modal: Google OAuth + magic link input → "check your inbox" confirmation
- `src/components/layout/Header.jsx` — sign-in button (no user) and avatar + email + sign-out dropdown (user present)
- `src/App.jsx` — `onAuthStateChange` useEffect: SIGNED_IN → push local progress → pull remote → setUser; AuthModal lazy-loaded and rendered on `showAuth`
- `package.json` — `@supabase/supabase-js ^2.39.0` added
- `SETUP_AUTH.md` — step-by-step: create Supabase project, run SQL schema, enable Google OAuth, add Vercel env vars

**Supabase SQL schema (run in Supabase SQL editor):**
```sql
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  key text not null,
  value jsonb not null,
  updated_at timestamptz default now(),
  unique(user_id, key)
);
alter table user_progress enable row level security;
create policy "Users can manage own progress" on user_progress
  for all using (auth.uid() = user_id);
```

### Files changed
`src/pages/ChallengesBrowser.jsx`, `src/pages/StatsBrowser.jsx`, `src/components/challenges/ChallengesRunner.jsx`, `src/pages/Home.jsx`, `src/utils/supabase.js` (new), `src/utils/auth.js` (new), `src/utils/syncProgress.js` (new), `src/components/auth/AuthModal.jsx` (new), `src/components/layout/Header.jsx`, `src/App.jsx`, `package.json`, `SETUP_AUTH.md` (new)

---

## [4.23.0] — 2026-05-27

### Changed — P3: Challenges room expansion 6 → 16 cases

**challengesCases.js — CHL07–CHL16 added (10 new cases):**

| ID | Company | Rooms | Topic |
|---|---|---|---|
| CHL07 | Spotify | stats, metrics, rca | Discover Weekly CTR +9%, listening hours −22% |
| CHL08 | Amazon | rca, growth-analytics, metrics | Prime Day DAU spike → 2-week engagement cliff |
| CHL09 | LinkedIn | metrics, stats, product-design | Job apply rate +15%, employer response rate −18% |
| CHL10 | DoorDash | rca, metrics, estimation | Better average ETA model, worse tail — CSAT −12pts |
| CHL11 | Slack | stats, product-design, metrics | Thread UI: +6% message send, −14% collaboration score |
| CHL12 | Pinterest | stats, growth-analytics, rca | Visual search CTR decayed from +31% to +3% over 8 weeks |
| CHL13 | Shopify | metrics, stats, rca | Checkout +11% conversion, −8% 30-day repeat purchase |
| CHL14 | Duolingo | metrics, growth-analytics, product-design | Streaks drive DAU; 40% lower vocabulary retention at 90d |
| CHL15 | Figma | product-design, stats, metrics | Multiplayer UI wins teams, drops freelancer NPS 11pts |
| CHL16 | Instacart | estimation, rca, growth-analytics | Weekend peak cancellations 3.2% → 8.7% in 3 months |

**caseIndex.js — challengesIndex updated** with all 10 new entries.

Each case follows the full Challenges schema: 3 subQuestions (one per room), 250–400 word model answers, 3 key points each, synthesis paragraph, 5 key takeaways.

### Files changed
`src/data/challengesCases.js`, `src/data/caseIndex.js`, `IDEAS.md`

---

## [4.22.0] — 2026-05-27

### Changed — P2: Nav IA cleanup + pricing raise

**Header.jsx — nav emoji removal:** All emoji prefixes stripped (`⚡ Challenges` → `Challenges`, `🐛 Spot Flaw` → `Spot Flaw`, `📝 Take-Home` → `Take-Home`, `🔍 Search` → `Search`, `🎯 Trainer` → `Trainer`, `🛡️ Defense` → `Defense`, `🔖 Saved` → `Saved`, `📡 Instrum.` → `Instrumentation`). Nav emojis were inconsistent (only some items had them), added visual noise to an analytical workspace, and contradicted the Linear/PostHog aesthetic PAL targets.

**Header.jsx — Consult removed from nav:** Had lingered in TOOLS group after being cut from the sidebar in V4.12. Overlaps with Search, adds nav clutter.

**Header.jsx — "Instrum." → "Instrumentation":** Labels must never be truncated with a period. Full word fits in scrollable nav.

**Pricing.jsx — $49 → $69:** $49 underpriced a product with 150+ cases, 25 interactive foundation modules, and lifetime access. $69 stays sub-$100 (low friction), signals quality, still far below any structured interview prep course ($200–500). 30-day guarantee absorbs the risk increase.

**Home.jsx — trust line updated to $69.**

**docs/ROADMAP.md — P0–P5 sprint priorities documented in full detail with status table.**

**DECISIONS.md — Monetization and Navigation sections added:** Pricing rationale, subscription deferral, free gate policy, nav emoji rule, Consult nav removal, label conventions.

### Files changed
`src/components/layout/Header.jsx`, `src/pages/Pricing.jsx`, `src/pages/Home.jsx`, `docs/ROADMAP.md`, `DECISIONS.md`, `IDEAS.md`

---

## [4.21.0] — 2026-05-27

### Changed — P1: Product preview mockup in first-visit hero

**Home.jsx — hero two-column layout:** First-visit hero restructured from single-column to two-column flex (collapses to stacked on mobile via `flexWrap: wrap`). Left: existing badge + headline + subtitle + CTAs + trust line. Right: static Stats Room case card mockup.

**Product preview mockup:** Realistic case card showing the actual product interface. Header: "Stats Room · Case Preview" + green "Free" badge. Question: "p = 0.04. Your PM wants to ship. What do you check first?" Four MCQ options — option A (Check for SRM) highlighted green with ✓. Debrief strip with green left border. Footer: "1 of 25 cases · Try it live →" links to Stats Room. Static, no interaction — shows the product before any click.

### Files changed
`src/pages/Home.jsx`

---

## [4.20.0] — 2026-05-27

### Changed — P0: Bundle refactor, label fix, font floor

**App.jsx — data import bundle refactor:** Removed static imports of all 21 data files (~1MB from initial bundle). Created `src/data/caseIndex.js` with slim `{id, isFree, title}` index arrays for all 21 rooms. All `openXxx()` and `getNextXxx()` functions updated to use index arrays. All 17 runner components updated to self-import full data and accept `caseId` prop instead of `caseData`. SearchPage, DefenseDocGenerator, Progress, ScenarioBrowser, CodeBrowser also updated to import own data directly.

**Progress.jsx — "Junior Miss" → "Junior-Ready":** Both LEVEL_LABELS entries corrected. "Junior Miss" was never a valid label.

**Global 0.68rem font floor:** 147 occurrences updated across all JSX files — any `fontSize` below `0.68rem` raised to `0.68rem`. Two intentional exceptions: decorative `●` dot symbols in MetricChoicePanel.jsx and DesignFieldGroup.jsx.

### Files changed
`src/data/caseIndex.js` (new), `src/App.jsx`, 17 runner components, `src/pages/SearchPage.jsx`, `src/pages/DefenseDocGenerator.jsx`, `src/pages/Progress.jsx`, `src/pages/ScenarioBrowser.jsx`, `src/pages/CodeBrowser.jsx`, all JSX files (font floor)

---

## [4.19.0] — 2026-05

### Changed — First-visit hero + Pricing page overhaul

**Home.jsx — first-visit hero:** New visitors (no rooms opened yet) now see a bold hero section above the dashboard. Two-line headline: "You know the framework. / Can you diagnose the drop?" in the style of ML/GenAI Systems Lab siblings. Indigo accent gradient bg, two CTAs ("Start practicing →" → stat-foundations, "See what's inside" → pricing), trust line ("Free to start · No account required · Works offline · Full access $49 one-time"). Hero collapses automatically once any room is opened — returning users see the dashboard as before.

**Pricing.jsx — full rewrite:** (1) Hero copy: replaced vague "practice the exact skills" with specific outcome framing — Google, Meta, Airbnb, Stripe named explicitly; judgment-under-pressure framing. (2) Risk reversal: "30-day money-back guarantee. No questions asked." added below the CTA button. (3) "What's inside" room grid: all 17 rooms listed as color-coded chips with dot indicators. (4) Free tier reframe: "No card required" tagline added, feature bullets rewritten to sound like a gift ("2 Stats cases — real scenarios, full debrief") not a gated trial, CTA changed from "Current plan" to active "Start free →". (5) Added `onNavigate` prop (future use).

### Files changed
`src/pages/Home.jsx`, `src/pages/Pricing.jsx`

---

## [4.18.0] — 2026-05

### Changed — "Take my money!" conversion audit: copy accuracy, trust signals, UX clarity

**Pricing + Unlock stale copy fixed:** Both `Pricing.jsx` and `Unlock.jsx` had outdated counts ("100+ cases across 9 rooms"). Updated to accurate "150+ practice cases across 17 rooms" in all three instances. Added social proof stat line to Pricing hero: "17 practice rooms · 150+ cases · 25 interactive foundation modules · No subscription".

**Footer developer jargon replaced:** "Static · No backend · No API calls · localStorage only" replaced with "Works offline · Private by design · No account required" — same technical truth, readable by non-developers. Footer version string updated to V4.17.

**Brief card italic tldr removed:** `fontStyle: 'italic'` removed from The Brief tldr div. Plain `var(--text-muted)` on body text is correct; italic added visual noise without semantic meaning.

**Today's Case dark mode button contrast:** Added `border: '1.5px solid rgba(0,0,0,0.18)'` to the yellow "Open case" chip — separates it from the `var(--yellow-bg)` card in dark mode where the contrast was near-zero.

**Foundation browser emoji h1s replaced:** `🔍` in `RCAFoundationsBrowser.jsx` replaced with `<Icon name="search" size={20} color="var(--teal)" />`. `📊` in `MetricsFoundationsBrowser.jsx` replaced with `<Icon name="bar-chart" size={20} color="var(--green)" />`. Both files now import Icon from `../components/shared/Icon.jsx`.

**START HERE chips — contextual subtitle added:** New one-line subtitle below the section label. New users see "Rooms picked for first-timers — each takes ~10 min". Returning users see "Continue where you left off". Removes the "why are these chips here?" ambiguity for first-time visitors.

### Files changed
`src/pages/Pricing.jsx`, `src/pages/Unlock.jsx`, `src/components/layout/Footer.jsx`, `src/pages/Home.jsx`, `src/pages/RCAFoundationsBrowser.jsx`, `src/pages/MetricsFoundationsBrowser.jsx`

---

## [4.17.0] — 2026-05

### Changed — "Million dollar" UI pass: difficulty borders, banners, progress bars, sort buttons, type hierarchy, dark mode

**Difficulty left-border on all room browsers:** Every case card in StatsBrowser, MetricsBrowser, RCABrowser, DesignBrowser, ProductDesignBrowser, BIBrowser, SpotTheFlawBrowser, BehavioralBrowser, EstimationBrowser, PrioritizationBrowser, TakehomeBrowser, GrowthAnalyticsBrowser now has `borderLeft: 3px solid diffCfg.color` — consistent color-coded difficulty signal at a glance.

**"Recommended starting point" banner redesign (6 browsers):** Replaced informal "New to this?" text hints with consistent left-accent callout blocks across StatsBrowser, MetricsBrowser, RCABrowser, BIBrowser, SpotTheFlawBrowser, GrowthAnalyticsBrowser. Pattern: `borderLeft: 3px solid var(--COLOR)`, colored bg, `<Icon name="book-open">`, uppercase "RECOMMENDED STARTING POINT" eyebrow, foundation link as styled button.

**Progress bar added to all room headers:** Replaced ad-hoc stat chips/counts with a consistent 96px × 4px track + fill bar showing completion %. Added to StatsBrowser, MetricsBrowser, RCABrowser, BIBrowser, SpotTheFlawBrowser, BehavioralBrowser, EstimationBrowser, PrioritizationBrowser, TakehomeBrowser, GrowthAnalyticsBrowser.

**Sort button active state:** `.pal-sort-btn.active` upgraded from tinted text to filled button (`background: var(--accent); color: #fff; font-weight: 700`). Applies to all 10 browsers using sort controls.

**Home.jsx guided path card outcome text:** Removed `fontStyle: italic` from `path.outcome` display. Replaced with clean `var(--text-dim)` + colored `→` prefix — consistent with the rest of the design system.

**Sidebar wordmark redesign:** Single "Analytics Lab" span replaced with two-line lockup: "Product Analytics" (900 weight, -0.035em tracking) above "LAB" (uppercase, 0.06em tracking, text-dim). Footer version string corrected from "V2.2 · 44 Playable Items" to "V4.16 · 150+ Playable Items". Build-breaking `./Icon.jsx` import path fixed to `../shared/Icon.jsx`.

**Dark mode text hierarchy fix:** `--text-dim` differentiated from `--text-muted` in dark theme (`#5a6278` vs `#8890a8`). Previously identical — no lower-level text hierarchy in dark mode.

### Files changed
`src/index.css`, `src/components/layout/Sidebar.jsx`, `src/components/layout/Footer.jsx`, `src/pages/Home.jsx`, `src/pages/StatsBrowser.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/DesignBrowser.jsx`, `src/pages/ProductDesignBrowser.jsx`, `src/pages/BIBrowser.jsx`, `src/pages/SpotTheFlawBrowser.jsx`, `src/pages/BehavioralBrowser.jsx`, `src/pages/EstimationBrowser.jsx`, `src/pages/PrioritizationBrowser.jsx`, `src/pages/TakehomeBrowser.jsx`, `src/pages/GrowthAnalyticsBrowser.jsx`

---

## [4.16.0] — 2026-05

### Changed — SVG icon system, CSS utility classes, runner premium pass, browser cleanup

**SVG Icon system (`src/components/shared/Icon.jsx`):** New shared component with 24 Lucide-compatible stroke icons. API: `<Icon name="..." size={16} color="currentColor" strokeWidth={1.75} />`. Icons cover all navigation, room, and UI contexts. Zero external dependency — inline SVG paths.

**CSS utility classes added to `index.css`:** `.pal-tabs` / `.pal-tab` / `.pal-tab.active` (tab bar system), `.pal-timer` / `.pal-timer.warning` (elapsed time pill, red on warning), `.pal-back-btn` (ghost back button), `.pal-textarea-wrap` (note section container with border-radius + focus ring), `.pal-progress-track` / `.pal-progress-fill` (progress bar), `.pal-sort-btn` / `.pal-sort-btn.active` (sort chips), `.pal-cta` (gradient submit/reveal button with disabled state), `.pal-icon-label` (icon + text inline label), `.pal-eyebrow` (section label).

**Sidebar emoji → icon pass:** ⚗ logo replaced with `<Icon name="flask">`. 🔍 search replaced with `<Icon name="search">`. All 12 FLAT_GROUPS nav items now render icons via `icon` field on each item definition.

**Home.jsx icon pass:** ⚡ "Today's Case" label replaced with `<Icon name="zap">` + text. 📰 "The Brief" label replaced with `<Icon name="newspaper">` + text. Added `Icon` import.

**Runner premium pass (6 runners):** Applied across BehavioralRunner, StatsRunner, RCARunner, EstimationRunner, MetricsRunner, InstrumentationRunner:
- Timer spans (`⏱ {formatTime}`) → `<span className="pal-timer">` + `<Icon name="clock">`. Warning class applied when elapsed > 600s.
- Note sections (`✏️ Write your thinking first`) → `className="pal-textarea-wrap"` + `<Icon name="pen-line">`. Hardcoded `borderRadius: 6/8` + `fontSize: 12/14` replaced with CSS variables.
- Submit/Reveal CTAs (inline `background/border/color` style objects) → `className="pal-cta"`.
- Back buttons (inline style objects) → `className="pal-back-btn"` + `<Icon name="arrow-left">`.
- StatsRunner "Review first" badges: 📚 → `<Icon name="book-open">`.

**Browser cleanup:** 📖 banners in StatsBrowser, MetricsBrowser, RCABrowser, CasesBrowser, GrowthAnalyticsBrowser → `<Icon name="book-open">`. Sort buttons in StatsBrowser, MetricsBrowser, RCABrowser upgraded from hardcoded yellow/black inline styles → `className="pal-sort-btn"` + `className="pal-sort-btn active"`. 📋 in DebriefCopyButton → `<Icon name="clipboard">`.

**Batch hardcoded value cleanup (141 replacements across 27 files):** `borderRadius: 6/8/10` → `'var(--radius-sm)'` / `'var(--radius)'`. `fontSize: 11/12/13/14` → `'0.72rem'` / `'0.75rem'` / `'0.82rem'` / `'0.88rem'`. Heaviest files: GrowthAnalyticsRunner (47), Module15_SimpsonsParadox (13), Trainer (15), DefenseDocGenerator (8).

### Files changed
`src/components/shared/Icon.jsx` (new), `src/index.css`, `src/components/layout/Sidebar.jsx`, `src/pages/Home.jsx`, `src/components/behavioral/BehavioralRunner.jsx`, `src/components/stats/StatsRunner.jsx`, `src/components/rca/RCARunner.jsx`, `src/components/estimation/EstimationRunner.jsx`, `src/components/metrics/MetricsRunner.jsx`, `src/components/instrumentation/InstrumentationRunner.jsx`, `src/pages/StatsBrowser.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/CasesBrowser.jsx`, `src/pages/GrowthAnalyticsBrowser.jsx`, `src/components/shared/DebriefCopyButton.jsx`, + 21 files with radius/fontSize normalization

---

## [4.15.0] — 2026-05

### Changed — Visual overhaul: typography, shadows, gradients, micro-interactions

**Design system upgrade (index.css):** Full visual pass across the CSS variable layer.
- **Typography**: Switched body font to Inter (Google Fonts import), base size 15px, Inter OpenType features enabled. Heading letter-spacing tightened (-0.035em on h1, -0.025em on h2, -0.02em on h3).
- **Shadow system expanded**: Added `--shadow-lg`, `--shadow-xl`, `--shadow-glow` (accent ring). All shadow levels deepened in both light and dark themes. Dark mode shadows significantly richer.
- **Dark mode surfaces**: `--bg` darkened to `#0a0d14`, `--surface` to `#111420`, `--surface-2` to `#181b2a` — more distinct layering, truer dark.
- **Gradient variables**: `--gradient-accent` (indigo→violet), `--gradient-warm` (amber→orange), `--gradient-teal`, `--gradient-hero` added. Dark mode gradients tuned to be brighter on dark bg.
- **Transition variables**: `--transition-fast` (0.1s), `--transition` (0.16s), `--transition-slow` (0.26s).
- **Radius bump**: `--radius` 9px, `--radius-sm` 5px, `--radius-lg` 13px, `--radius-xl` 18px.
- **Sidebar width**: 210px → 222px.
- **Sidebar shadow**: Added right-side depth shadow (`4px 0 20px rgba(0,0,0,0.05)`).
- **Utility classes added**: `.pal-card-hover` (translateY(-2px) lift + shadow-md on hover), `.pal-gradient-text` (gradient clip text), `.pal-btn-primary` (gradient button), `.pal-badge-accent`, `.pal-focus`, `.sidebar-nav-active`, `.sidebar-nav-active-sub`.

**Sidebar redesign:** Logo mark now uses `--gradient-accent` background with accent glow shadow. Active nav items use `.sidebar-nav-active` class — `accent-bg` fill + `inset 3px 0 0 accent` left bar (the premium indicator pattern). Sub-item active uses 2px left bar. Accordion arrow now animates rotation (▾ rotates -90deg when collapsed). Search button gets `--shadow-glow` on hover. Theme toggle hover adds surface-2 fill. All transitions wired to `--transition-fast`.

**Home.jsx polish:** "Today" heading uses `.pal-gradient-text` (gradient clip). Today's Case card and The Brief card both get `borderTop: 3px solid [color]` accent stripe + `--shadow-sm`. Learning path cards get `borderTop` stripe + `.pal-card-hover` class. Jump-back-in room chips get full hover lift (translateY(-1px) + shadow upgrade + border-strong). Onboarding modal gains backdrop blur, `--shadow-xl`, rounded-xl. Primary onboarding CTA uses `.pal-btn-primary` gradient button.

**Card hover lift across all room browsers:** 17 browser/page files upgraded from `boxShadow: shadow-sm` hover to `boxShadow: shadow + translateY(-2px)`. Transition strings updated to use `--transition` variable. Files: StatsBrowser, MetricsBrowser, RCABrowser, CasesBrowser, DesignBrowser, ProductDesignBrowser, StatsFoundationsBrowser, JudgmentBank, SpotTheFlawBrowser, BIBrowser, InstrumentationBrowser, GrowthAnalyticsBrowser, MetricsFoundationsBrowser, ChallengesBrowser, CodeBrowser, ScenarioBrowser, Trainer.

### Files changed
`src/index.css` (full variable + utility class overhaul), `src/components/layout/Sidebar.jsx` (logo, active state, transitions), `src/pages/Home.jsx` (gradient heading, card stripes, hover lifts, modal polish), `src/pages/StatsBrowser.jsx`, `src/pages/MetricsBrowser.jsx`, `src/pages/RCABrowser.jsx`, `src/pages/CasesBrowser.jsx`, `src/pages/DesignBrowser.jsx`, `src/pages/ProductDesignBrowser.jsx`, `src/pages/StatsFoundationsBrowser.jsx`, `src/pages/JudgmentBank.jsx`, `src/pages/SpotTheFlawBrowser.jsx`, `src/pages/BIBrowser.jsx`, `src/pages/InstrumentationBrowser.jsx`, `src/pages/GrowthAnalyticsBrowser.jsx`, `src/pages/MetricsFoundationsBrowser.jsx`, `src/pages/ChallengesBrowser.jsx`, `src/pages/CodeBrowser.jsx`, `src/pages/ScenarioBrowser.jsx`, `src/pages/Trainer.jsx`

---

## [4.14.1] — 2026-05

### Fixed — `\'` escape sequence build errors across JSX files

**Rolldown parse error sweep:** V4.14.0 deploy failed at DebriefCopyButton.jsx:21 with "Invalid Unicode escape sequence". Systematic audit of all non-data JSX/JS files for three distinct `\'` patterns. Fixed 36 delimiter instances in DebriefCopyButton.jsx (sed replacement). Fixed 8 JSX text content instances across TakehomeRunner.jsx, Module22_DiD.jsx, MetricsFoundationsRunner.jsx, RCAFoundationsBrowser.jsx, Home.jsx, CompanyTracks.jsx. Safe instances left untouched. Rule and audit (#71) added.

### Files changed
`src/components/shared/DebriefCopyButton.jsx`, `src/components/takehome/TakehomeRunner.jsx`, `src/components/statsFoundations/modules/Module22_DiD.jsx`, `src/components/metricsFoundations/MetricsFoundationsRunner.jsx`, `src/pages/RCAFoundationsBrowser.jsx`, `src/pages/Home.jsx`, `src/pages/CompanyTracks.jsx`, `CLAUDE.md`, `AUDITS.md`

---

## [4.14.0] — 2026-05

### Changed — Frameworks page redesign, Consult removed, company track completion badges

**Frameworks (PlaybookBrowser) redesigned as reference index:** Replaced the article-list card layout with compact 3-column reference cards grouped by category, with category filter tabs at the top. Each card shows title, 2-line summary, and up to 2 inline practice links. "Coming soon" items are visually dimmed and de-emphasized. Category sections show a live/total count badge. The page is now clearly distinct from Deep Dives — it\'s a scannable reference index, not a reading list. `src/pages/PlaybookBrowser.jsx`.

**Consult removed from sidebar:** The Consult page was causing confusion with Search and didn\'t justify its space. Removed `{ id: \'consult\', label: \'💬 Consult\' }` from TOOLS in Sidebar.jsx.

**Company track completion badges:** CompanyCard now shows a green "✓ Complete" badge (replacing the "X/Y done" progress badge) when all cases in a track are finished. TrackDetail shows a 🎉 celebration banner at 100% progress. `src/pages/CompanyTracks.jsx`.

**Existing but untracked:** Cases Room already has C13–C22 (22 total), STAT17–20 causal inference modules (DID, RDD, Synthetic Control, IV) shipped in V4.8. Dark mode flash prevention already in place via `index.html` inline script. All logged for record.

### Files changed
`src/components/layout/Sidebar.jsx` (Consult removed), `src/pages/PlaybookBrowser.jsx` (RefCard component, filter tabs, 3-col grid), `src/pages/CompanyTracks.jsx` (completion badge + banner), `CHANGELOG.md`, `IDEAS.md`

---

## [4.13.1] — 2026-05

### Fixed — Em dash parse error in DebriefCopyButton

**Rolldown parse error fix:** `src/components/shared/DebriefCopyButton.jsx` contained 3 em dash (—) Unicode characters inside JS string literals used as ternary fallback values. Rolldown raised "Invalid Character —" at line 18, blocking the Vercel build. Replaced all 3 with ASCII hyphens (-). Rule added to AUDITS.md: never use em dash, en dash, or other Unicode punctuation inside JS string literals in any .js/.jsx file.

### Files changed
`src/components/shared/DebriefCopyButton.jsx` (3 em dash → hyphen), `AUDITS.md`, `CHANGELOG.md`

---

## [4.13.0] — 2026-05

### Added — Defense Doc upgrade, Take-Home model answers, DebriefCopyButton

**Defense Doc upgraded:** `DefenseDocGenerator.jsx` now accepts an `allData` prop and surfaces 2 specific clickable cases per room per day, scored by tag and title match against the pasted job description. `onNavigate` expanded to cover all 16 rooms so clicking a recommended case routes directly to that room. Previously the doc showed generic room names only — now it delivers real case recommendations.

**Take-Home model answers:** Full prose `modelAnswer` field added to all 10 Take-Home cases (TH01–TH10) in `takehomeCases.js`. Answers render in `TakehomeRunner.jsx` after the rubric section, giving users a benchmark to compare their work against.

**DebriefCopyButton — new shared component:** `src/components/shared/DebriefCopyButton.jsx` copies a markdown-formatted debrief summary (title, model answer, notes, tags, difficulty) to clipboard. Wired into `ScenarioRunner`, `RCARunner`, `MetricsRunner`, and `TakehomeRunner`. Enables interview debrief export without requiring a backend.

**LEARN moved above TOOLS in sidebar:** Information hierarchy corrected — learning content (Deep Dives, Frameworks, FOUNDATIONS) now appears before utility tools.

### Files changed
`src/pages/DefenseDocGenerator.jsx` (allData prop, clickable cases, 16-room onNavigate), `src/data/takehomeCases.js` (modelAnswer on TH01–TH10), `src/components/shared/DebriefCopyButton.jsx` (new), `src/components/review/ScenarioRunner.jsx` (DebriefCopyButton), `src/components/rca/RCARunner.jsx` (DebriefCopyButton), `src/components/metrics/MetricsRunner.jsx` (DebriefCopyButton), `src/components/takehome/TakehomeRunner.jsx` (DebriefCopyButton + modelAnswer render), `src/components/layout/Header.jsx` (LEARN above TOOLS), `CHANGELOG.md`

---

## [4.12.3] — 2026-05

### Changed — Sidebar UI overhaul

- Theme toggle moved to top logo row
- Beta badge removed from bottom
- Search removed from TOOLS section — now a persistent bottom bar with `/` shortcut hint
- Theory Hub removed from LEARN (superseded by FOUNDATIONS section)
- Simulator renamed to Mock Interview
- Trainer renamed to MCQ Quiz
- A/B Interpreter renamed to Stats Calculator

### Files changed
`src/components/layout/Header.jsx` (all above), `CHANGELOG.md`

---

## [4.12.2] — 2026-05

### Changed — Sidebar naming overhaul

- Section label ROOMS → PRACTICE ROOMS
- Room label Review → A/B Review
- Room label PM Design → Product Design
- Room label Prioritize → Prioritization
- Room label Exp Foundations → A/B Foundations (id stays `exp-foundations`)
- Articles → Deep Dives, Playbook → Frameworks
- Code moved into Analytics accordion as Code Lab (no longer an orphaned flat item)

### Files changed
`src/components/layout/Header.jsx` (all label changes), `CHANGELOG.md`

---

## [4.12.1] — 2026-05

### Fixed — Exp Foundations practice room links

'Ready to practice?' links on the Exp Foundations browser page were built as `<a href>` tags pointing to hash routes, which do not trigger React SPA navigation — they reloaded the page to `#ab-design` etc. and state was lost. Replaced with `onNavigate` prop calls so links route within the SPA correctly.

### Files changed
`src/pages/ExpFoundationsBrowser.jsx` (onNavigate calls replacing dead anchor tags), `CHANGELOG.md`

---

## [4.12.0] — 2026-05

### Added — Experimentation Foundations room (ef01–ef07) + Foundation→Practice interlinks + Template literal audit

**Experimentation Foundations room:** 7 interactive modules covering the core statistical concepts behind A/B testing:
- ef01 — Causality and the Experiment Ideal: observational vs. RCT framing, confound identification
- ef02 — Randomization Unit: user vs. session vs. page unit choice, SUTVA violations, network effects
- ef03 — Power and MDE: sample size determinants, MDE practical definition, underpowered experiment cost
- ef04 — P-values and Confidence Intervals: p-value interpretation, CI construction, common misreadings
- ef05 — Sample Ratio Mismatch (SRM): detection, root causes, invalidation decision rule
- ef06 — Novelty Effects and Long-Run Treatment Effects: novelty vs. primacy, washout period, holdout design
- ef07 — Multiple Testing and FWER: family-wise error rate, Bonferroni correction, sequential testing

Blue `var(--accent)` theme. Wired into App.jsx (lazy import, state, open function, routing), Header.jsx (A/B Foundations nav item), Progress.jsx (completionMap, heatmap dates, getNextSuggested). localStorage key: `pal-exp-foundation-progress-v1`.

**Foundation → Practice interlinks:** Each Foundation browser page now has a 'Ready to practice?' section at the bottom linking to the relevant practice rooms. Exp Foundations links to A/B Design, A/B Review, and Spot the Flaw. Same pattern applied across all Foundation browsers.

**Template literal audit:** All 26 data files checked for backtick template literals. No new violations found — all files already clean. Audit #64 status updated to resolved.

### Files changed
`src/data/expFoundationModules.js` (new — ef01–ef07), `src/utils/expFoundationProgress.js` (new), `src/pages/ExpFoundationsBrowser.jsx` (new), `src/components/expFoundations/ExpFoundationsRunner.jsx` (new), `src/App.jsx` (lazy import, state, open, routing, reset key), `src/components/layout/Header.jsx` (A/B Foundations nav), `src/pages/Progress.jsx` (completionMap, heatmap, getNextSuggested), `public/sitemap.xml` (exp-foundations route), `CHANGELOG.md`

---

## [4.11.0] — 2026-05

### Added — Room filter chips in SearchPage + per-case notes in all remaining runners

**Room filter chips in SearchPage:** Global search results now show filter chips (All + one per room) below the search bar. Chips only render when 2 or more rooms have results for the current query. Clicking a chip filters results to that room only. State resets to 'All' on each new query.

**Per-case notes now in all runners:** `pal-notes-v1` persistent notes (textarea + Save button) added to the 11 runners that were missing it: `CaseRunner`, `ChallengesRunner`, `CodeRunner`, `DesignRunner`, `MetricsFoundationsRunner`, `PrioritizationRunner`, `ProductDesignRunner`, `RCAFoundationsRunner`, `ScenarioRunner`, `StatsFoundationsRunner`, `TakehomeRunner`. All runners now have per-case notes.

### Files changed
`src/pages/SearchPage.jsx` (room filter chips), `src/components/cases/CaseRunner.jsx`, `src/components/challenges/ChallengesRunner.jsx`, `src/components/code/CodeRunner.jsx`, `src/components/design/DesignRunner.jsx`, `src/components/metricsFoundations/MetricsFoundationsRunner.jsx`, `src/components/prioritization/PrioritizationRunner.jsx`, `src/components/productDesign/ProductDesignRunner.jsx`, `src/components/rcaFoundations/RCAFoundationsRunner.jsx`, `src/components/review/ScenarioRunner.jsx`, `src/components/statsFoundations/StatsFoundationsRunner.jsx`, `src/components/takehome/TakehomeRunner.jsx` (notes added), `CHANGELOG.md`

---

## [4.10.0] — 2026-05

### Added — BI expanded to 16 cases, Instrumentation expanded to 12 cases

**BI Room expanded:** 4 new cases (bi13–bi16) added to `biCases.js`. Cases cover real-time dashboards, Looker/Tableau workflows, and advanced BI scenarios.

**Instrumentation Room expanded:** 4 new cases (inst09–inst12) added to `instrumentationCases.js`. Cases cover dbt data models, data lineage, and schema migration scenarios.

### Files changed
`src/data/biCases.js` (bi13–bi16), `src/data/instrumentationCases.js` (inst09–inst12), `CHANGELOG.md`

---

## [4.9.0] — 2026-05

### Added — Metrics Foundations room (mf01–mf06) + RCA Foundations room (rf01–rf06)

**Metrics Foundations room:** 6 interactive modules (mf01–mf06) covering foundational metrics concepts. Uses green `var(--green)` theme (matching Metrics Room). Wired into App.jsx, Header.jsx (sidebar), and Progress.jsx (completionMap, heatmap, getNextSuggested).

**RCA Foundations room:** 6 interactive modules (rf01–rf06) covering root cause analysis fundamentals. Uses teal `var(--teal)` theme (matching RCA Room). Wired into App.jsx, Header.jsx (sidebar), and Progress.jsx (completionMap, heatmap, getNextSuggested).

### Files changed
`src/data/metricsFoundationModules.js` (new — mf01–mf06), `src/utils/metricsFoundationProgress.js` (new), `src/pages/MetricsFoundationsBrowser.jsx` (new), `src/components/metricsFoundations/MetricsFoundationsRunner.jsx` (new), `src/data/rcaFoundationModules.js` (new — rf01–rf06), `src/utils/rcaFoundationProgress.js` (new), `src/pages/RCAFoundationsBrowser.jsx` (new), `src/components/rcaFoundations/RCAFoundationsRunner.jsx` (new), `src/App.jsx` (both rooms: lazy import, state, open, routing, reset keys), `src/components/layout/Header.jsx` (both rooms in sidebar), `src/pages/Progress.jsx` (both rooms: completionMap, heatmap, getNextSuggested), `public/sitemap.xml` (2 new routes), `CHANGELOG.md`

---

## [4.8.4] — 2026-05

### Fixed + Audited — Progress heatmap keys, Growth Analytics expansion, Spot the Flaw audit

**Progress.jsx heatmap key fix:** `getPracticeDates()` was scanning `pal-rca-progress-v1` and `pal-cases-progress-v1` — stale keys. The actual utils use `pal-rca-progress-v2` and `pal-cases-progress-v2`. Any RCA or Cases practice was invisible on the activity heatmap. Fixed to v2.

**Growth Analytics expanded to 12 cases (GA09–GA12):**
- GA09 — LTV Diverged: Subscription vs Ads (Meta/senior) — 3-year LTV methodology, cohort windowing, churn timing, revenue-timing bias, Recharts scatter overlay
- GA10 — Viral Loop K-Factor Dropped (Pinterest/staff) — K-factor decomposition, invite friction vs social norm decay, invite funnel segmentation, clustered A/B design, Recharts bar chart
- GA11 — Paywall Conversion Stalled (Spotify/senior) — funnel segmentation by usage depth, message-market fit, free vs premium marginal value curve, Recharts funnel
- GA12 — Geographic Expansion Retention Gap (Uber Eats/senior) — density economics, restaurant supply quality, competitive intensity, localization lag, Recharts grouped bar

**Spot the Flaw audit (STF09–STF12):** All four cases had only 2 `keyTakeaways` instead of 3. Added a third actionable takeaway to each:
- STF09 (Confounding): correct solution requires RCT or matched cohort study, not just larger observational sample
- STF10 (Regression to Mean): correct design is RCT with randomly split bottom-decile performers — control provides the RTM baseline
- STF11 (P-Hacking/HARKing): HARKing is indistinguishable from pre-planned analysis without pre-registration — post-hoc subgroup findings are hypothesis-generating only
- STF12 (Network Contamination): full-rollout lift will not match test estimate — cross-contamination disappears when entire population is treated

**SpotTheFlawRunner notes:** Added `pal-notes-v1` persistent notes (textarea + Save button) to reveal screen, before the self-rating section. Same pattern as all other runners.

### Files changed
`src/pages/Progress.jsx` (heatmap v2 keys), `src/data/growthAnalyticsCases.js` (GA09–GA12), `src/components/growthAnalytics/GrowthAnalyticsRunner.jsx` (GA09–GA12 charts), `src/data/spotTheFlawCases.js` (3rd keyTakeaway for STF09–STF12), `src/components/spotTheFlaw/SpotTheFlawRunner.jsx` (notes), `CHANGELOG.md`

---

## [4.8.3] — 2026-05

### Added — Per-case notes in 4 runners + Take-Home expansion to 10 cases

**Per-case persistent notes** added to GrowthAnalyticsRunner, BIRunner, InstrumentationRunner, and MetricsRunner. Notes use the shared `pal-notes-v1` localStorage key (namespaced as `room:id`) — same pattern already in StatsRunner, RCARunner, BehavioralRunner, EstimationRunner. Notes appear before the reveal button in GA/Instrumentation/BI runners, and at the top of the debrief section in MetricsRunner.

**Take-Home Room expanded from 5 to 10 cases:**
- TH06 — Search Relevance Degradation (Google/DS/senior) — position-1 CTR decomposition, zero-click analysis, query-type segmentation, SERP feature cannibalization
- TH07 — Premium Feature Adoption Plateau (Notion/PM/senior) — activation vs retention distinction, habit trigger design, B2B SaaS solo vs team segmentation
- TH08 — Marketplace Liquidity Collapse in New Market (Upwork/both/staff) — supply quality vs quantity, GMV impact, pricing mismatch in SEA, trust bootstrapping
- TH09 — Email Engagement Collapse Post-Redesign (Substack/DS/senior) — deliverability audit first, counterfactual construction, email client rendering segmentation, rollback experiment
- TH10 — Activation Drop After Onboarding Redesign (Duolingo/both/analyst, FREE) — D1 vs D7 paradox, commitment psychology, speed vs personalization experiment

### Files changed
`src/components/growthAnalytics/GrowthAnalyticsRunner.jsx`, `src/components/bi/BIRunner.jsx`, `src/components/instrumentation/InstrumentationRunner.jsx`, `src/components/metrics/MetricsRunner.jsx` (notes added), `src/data/takehomeCases.js` (TH06–TH10), `CHANGELOG.md`

---

## [4.8.2] — 2026-05

### Added — Playbook articles for BI, Instrumentation, and Take-Home rooms

12 new articles across 3 categories, closing the learn→practice loop for rooms that had no Playbook coverage. Added `'BI'`, `'Instrumentation'`, and `'Take-Home'` to `CATEGORY_CONFIG` and `ROOM_CONFIG` in `PlaybookBrowser.jsx`. Wired all three rooms in `App.jsx` `onOpenItem` handler so "Practice now" buttons route correctly.

**BI (4 articles)**
- *Dashboard Design That Actually Gets Used* — audience-first design, vanity metric test, signal-to-noise layout hierarchy, self-serving dashboard anti-pattern (→ BI01, BI04)
- *Attribution Models: Why Your Channel Credits Don\'t Add Up* — last-touch systematic bias, five model comparison, incrementality testing as ground truth, DTC attribution audit example (→ BI03)
- *Separating Seasonality from Real Trend* — WoW vs YoY comparisons, time-series decomposition (trend + seasonal + residual), EdTech platform example where -22% WoW was entirely seasonal (→ BI08)
- *Data Storytelling for Stakeholders: Findings Before Numbers* — Pyramid Principle, slide title test (label vs finding), SCR framework, separating findings from caveats (→ BI07)

**Instrumentation (4 articles)**
- *Measurement Plans: Write the Questions Before the Events* — question → metric → event chain, critical vs nice-to-have events, common failures (missing denominator, inconsistent naming, missing properties, timing errors) (→ inst01, inst07)
- *Event Taxonomy Design: The Naming Decisions That Save You* — Entity-Action-Object pattern, verb tense standard, property schema types, versioning and deprecation (→ inst02)
- *Diagnosing Data Quality Incidents: The Isolation Methodology* — three incident types (sudden drop, gradual drift, schema break), When/Where/What/Who isolation, deployment correlation rule, SRM during A/B tests (→ inst03, inst08)
- *A/B Test Instrumentation: What Goes Wrong and How to Prevent It* — assignment vs exposure event distinction, pre-experiment checklist, SRM detection and causes (→ inst04, inst05)

**Take-Home (4 articles)**
- *The Take-Home Analysis Framework: Structure Before SQL* — what reviewers look for, four pre-SQL steps, deliverable structure (→ TH01, TH04)
- *Diagnosing a Metric Decline: The Right Order of Operations* — confirm real → locate by segment → hypothesize and test, driver retention example (→ TH02, TH05)
- *Cohort Analysis in Take-Homes: When to Slice and What to Look For* — retention vs reach use cases, cohort divergence test, mix-shift problem, behavioral cohorts (→ TH03, TH05)
- *Communicating Uncertainty: Confidence Without Overclaiming* — two failure modes, confidence ladder (observed/inferred/assumed), calibrated conclusion template, limitations section guidance (→ TH04, TH01)

### Files changed
`src/pages/PlaybookBrowser.jsx` (CATEGORY_CONFIG + ROOM_CONFIG + 12 new articles), `src/App.jsx` (onOpenItem routing), `CHANGELOG.md`

---

## [4.8.1] — 2026-05

### Fixed — Audit #68 findings (4 bugs)

- **MetricsBrowser.jsx DIFF_CFG missing `intermediate` and `advanced` entries** — `metricCases.js` has `difficulty: 'advanced'` (case M16). MetricsBrowser only defined foundational/analyst/senior/staff. M16 silently fell back to the analyst badge. Added `intermediate` (yellow) and `advanced` (purple) to complete the config map. Same root cause as audit #67 finding #1 — config not updated when new content was added.
- **Progress.jsx reset map missing 5 rooms** — `allRoomProgress` had no reset entries for Behavioral, Code, Estimation, Stat Foundations, or Prioritization. "Reset room progress" button in Progress.jsx would silently skip all five. Added reset entries for all five with correct localStorage keys.
- **Progress.jsx reset map stale keys** — RCA used `pal-rca-progress-v1` (correct key is `v2`); Cases used `pal-cases-progress-v1` (correct key is `v2`). Both updated to match current utils.
- **Progress.jsx heatmap missing Prioritization key** — `getPracticeDates()` scanned 14 stores but excluded `pal-pri-progress-v1`. Prioritization practice sessions were invisible on the activity heatmap. Key added.
- **Sitemap missing 3 indexable routes** — `#cases` (12 business cases), `#simulator` (Interview Simulator), `#ab-interpreter` (A/B Interpreter) had no sitemap entries despite having substantive content worth indexing. Added at priority 0.8/0.7.

### Files changed
`src/pages/MetricsBrowser.jsx`, `src/pages/Progress.jsx`, `public/sitemap.xml`, `AUDITS.md` (audit #68 resolved), `CHANGELOG.md` (this entry)

---

## [4.8.0] — 2026-05

### Added — SF Causal Inference Expansion (sf21–sf25)

Five new Advanced Stat Foundations modules completing the causal inference curriculum:

- **sf21 — Counterfactuals & Causal Inference** (`Module21_Counterfactuals.jsx`) — 3-scenario classify exercise. Users label each comparison (observational, RCT, before/after) as Causal or Confounded and receive scored feedback with explanations. Establishes the foundational framing for all quasi-experimental methods.
- **sf22 — Difference-in-Differences** (`Module22_DiD.jsx`) — Live DiD calculator with 4 editable inputs (T before, T after, C before, C after). 3 presets including the STAT17 example. Displays Treatment Δ, Control Δ (the "would-have-happened trend"), and DiD estimate with color coding and annotation calling out when raw Δ would be wrong.
- **sf23 — Regression Discontinuity** (`Module23_RD.jsx`) — SVG visualization (460×200) of a credit score cutoff at 680. Two views: Outcome jump (scatter with causal jump bracket) and Score density (McCrary histogram). Toggle "Show manipulation" reveals bunching/dip pattern and red dots, demonstrating how RD validity breaks.
- **sf24 — Synthetic Control** (`Module24_SyntheticControl.jsx`) — Donor pool selector with 3 candidates (Donor A: valid, low RMSE; Donor B: divergent pre-period; Donor C: previously treated). User picks the valid control, sees result + explanation. SVG time-series shows treated unit vs. highlighted donor with pre/post zones.
- **sf25 — Instrumental Variables** (`Module25_IV.jsx`) — 3-conditions checker (Relevance, Exogeneity, Exclusion Restriction). Each condition has 3 options; user selects for each and receives feedback with testability notes. DAG diagram (Z → D → Y, with crossed Z → Y path) renders inline. Score summary on completion.

### Wired — sfPrerequisites cross-links (Stats Room → SF)

Added `sfPrerequisites` to all 11 Stats Room modules that previously lacked them:
- STAT10 (novelty-effect): sf21, sf11
- STAT11 (bayesian-stopping): sf11, sf12
- STAT12 (metric-hierarchy): sf21, sf11
- STAT13 (did-parallel-trends): sf21, sf22
- STAT14 (rd-manipulation): sf21, sf23
- STAT15 (synthetic-control-donor-pool): sf21, sf24
- STAT16 (iv-exclusion-restriction): sf21, sf25
- STAT17 (did): sf22
- STAT18 (rdd): sf23
- STAT19 (synthetic-control): sf24
- STAT20 (iv-selection): sf25

### Fixed — Module20 button

- `Module20_PracticalSignificance.jsx` had "Complete ✓" (green) as its final button. Since sf21 now follows it, changed to "Next concept →" (yellow) to match all other non-terminal modules. sf25 retains "Complete ✓" as the new final module.

### Updated — StatsFoundationsRunner locked screen

- "all 20 Stat Foundations modules" → "all 25 Stat Foundations modules"

### Files changed
`src/components/statsFoundations/modules/Module20_PracticalSignificance.jsx` (button),
`src/components/statsFoundations/modules/Module21_Counterfactuals.jsx` (new),
`src/components/statsFoundations/modules/Module22_DiD.jsx` (new),
`src/components/statsFoundations/modules/Module23_RD.jsx` (new),
`src/components/statsFoundations/modules/Module24_SyntheticControl.jsx` (new),
`src/components/statsFoundations/modules/Module25_IV.jsx` (new),
`src/data/statsFoundationsModules.js` (sf21–sf25 data entries, comment updated),
`src/components/statsFoundations/StatsFoundationsRunner.jsx` (5 imports, MODULE_COMPONENTS, locked screen copy),
`src/data/statsModules.js` (sfPrerequisites added to STAT10–20),
`CHANGELOG.md` (this entry)

---

## [4.7.2] — 2026-05

### Fixed — Stats Room (audit #67)

- **DIFFICULTY_CFG missing `intermediate`, `advanced`, `staff` entries** — `StatsRunner.jsx` and `StatsBrowser.jsx` both defined their difficulty config maps with only 3 entries (foundational, analyst, senior). Modules STAT09 (advanced), STAT10 (intermediate), STAT11 (advanced), STAT12 (advanced) all fell back to "Foundational" badge with wrong color. Added: `intermediate` (yellow), `advanced` (purple), `staff` (red) to both files. Systemic root cause: config maps were not updated when the causal inference module batch was added.
- **STAT08 claim-data alignment** — The SUTVA scenario claim and options referenced seller conversion figures (+19% treatment sellers, −11.4% control sellers, +2.8% platform-level) that did not appear anywhere in `setup.observedResult` or `caveat`. Users had no data to evaluate the claim from. Fixed: added seller-arm conversion rates, control-side drop, and platform-level booking rate to `observedResult`; added inquiry volume delta to `caveat`.
- **STAT13 concept ID standardized** — `stat13-did-parallel-trends` used `concept: 'did'` and `linkedConceptIds: ['did', ...]` while `stat17-did` used `concept: 'diff-in-diff'`. Same concept, two different string IDs. Standardized both to `'diff-in-diff'`.
- **STAT17 difficulty recalibrated** — `stat17-did` ("Is +7pp the Onboarding Uplift?") was labelled `difficulty: 'senior'` but tests a basic DiD arithmetic subtraction (7pp − 4pp = 3pp). Changed to `'analyst'` to match the content quality bar's tier definitions.
- **STAT10–12 missing field stubs** — `stat10`, `stat11`, `stat12` lacked `linkedScenarioIds` and `linkedDesignIds` fields. All causal inference modules added in a later batch (STAT13–STAT20) have these as empty arrays. Added `linkedScenarioIds: []` and `linkedDesignIds: []` to all three.

### Updated — MD spine
- `IDEAS.md` — per-case notes entry clarified; first-time user audit updated to mention V4.7 sidebar; two Stats bugs logged as resolved
- `AUDITS.md` — audit type table expanded with 3 new types (Content staleness, Dead code/orphans, Config completeness); audit #67 (Stats Room comprehensive audit, 6 findings) added

### Files changed
`src/components/stats/StatsRunner.jsx`, `src/pages/StatsBrowser.jsx`, `src/data/statsModules.js` (STAT08 observedResult/caveat, STAT10–12 field stubs, STAT13 concept ID, STAT17 difficulty), `IDEAS.md`, `AUDITS.md`, `CHANGELOG.md` (this entry)

---

## [4.7.1] — 2026-05

### Improved — Defense Doc Generator
- **Specific case recommendations** — added `CASE_MAP` (12 rooms, 60+ cases with skill tags). For each top room detected in the JD, the output now surfaces 2–3 specific PAL case IDs and titles matched by tag overlap with the JD text. "Complete 3 cases in Metrics Room" → "Start with M01 (Search Success Rate), M05 (Revenue vs GMV vs ARPU)."
- **Interview questions to expect** — added `QUESTION_PATTERNS` (12 rooms, 4–5 questions each). Top 4 JD signal rooms each contribute 2 realistic interview questions to a new "Questions to Prepare For" section. Questions are role- and topic-specific, not generic.
- **Company intel callout** — added `COMPANY_SIGNALS` detecting 10 company clusters (Meta, Google, Amazon, Airbnb, Stripe/fintech, Netflix, Spotify, Uber/marketplaces, social platforms, e-commerce). When a company is detected, a callout describes known interview focus areas.
- **Better keyword coverage** — expanded keyword lists: added `ab test`, `pvalue`, `p value`, `srm`, `sample ratio`, `guardrail`, `dbt`, `window function`, `sr.`, `product owner`, and 20+ more. Previous detection missed many standard JD phrasings.
- **7-day plan references specific cases** — Days 1–4 now show the actual case titles from the CASE_MAP instead of generic "Complete 3 cases in X."

### Files changed
`src/pages/DefenseDocGenerator.jsx` (full rewrite with CASE_MAP, QUESTION_PATTERNS, COMPANY_SIGNALS, getRecommendedCases, getExpectedQuestions), `CHANGELOG.md` (this entry)

---

## [4.7.0] — 2026-05

### Changed — Layout
- **Sidebar navigation** — replaced the sticky horizontal `Header.jsx` with a fixed 210px left sidebar (`src/components/layout/Sidebar.jsx`). Same 5 nav groups (ROOMS, PRACTICE, TOOLS, LEARN, TRACK) with identical routing logic. Theme toggle + beta badge moved to sidebar footer.
- **Layout wrapper** — `App.jsx` now uses `app-layout` / `app-main-wrapper` CSS classes. Focus mode (any `-runner` page) hides the sidebar completely for distraction-free practice.
- **Mobile** — sidebar slides in as a 230px overlay triggered by a hamburger in `.mobile-topbar`. Tap outside or navigate to close.
- **Home.jsx → Today Dashboard** — stripped marketing copy (hero, nine-rooms grid, "Why different" section, RoomList cards). New structure: page header with date, Today's Case + The Brief, "Jump back in" row (recently visited rooms, or role-based starters for new users), Guided Paths (4 cards). Sidebar handles all room navigation so Home is now a focused daily dashboard.

### Files changed
`src/components/layout/Sidebar.jsx` (new), `src/index.css` (+sidebar layout CSS), `src/App.jsx` (import swap, sidebarOpen state, isFocusMode, layout divs), `src/pages/Home.jsx` (full rewrite), `CHANGELOG.md` (this entry)

---

## [4.6.2] — 2026-05

### Fixed
- **SF free tier extended** — sf03 (Variance & SD) and sf04 (Normal Distribution) changed from `isFree: false` to `isFree: true`. Cold-path users now get a complete beginner track (data types → central tendency → spread → normal distribution) before hitting the paywall.
- **Button label/style inconsistencies in SF modules 12–16** — modules sf12 and sf13 had "Complete ✓" (green) buttons left over from when they were the last module; sf15 and sf16 had the same. All changed to "Next concept →" (yellow) matching the rest of the sequence.
- **Module sf20 button fixed** — was "Next concept →" (yellow); corrected to "Complete ✓" (green) as it is the actual final module.
- **Duplicate Playbook Reading sections removed** — modules sf14–sf20 rendered their own inline `module.playbookLinks` block, which duplicated the runner-level playbook chips already rendered at lines 340–360 of `StatsFoundationsRunner.jsx`. All 7 inline blocks removed.

### Files changed
`src/data/statsFoundationsModules.js` (sf03+sf04 isFree→true), `src/components/statsFoundations/modules/Module12_Power.jsx` (button), `src/components/statsFoundations/modules/Module13_ExperimentDesigner.jsx` (button text), `src/components/statsFoundations/modules/Module14_Correlation.jsx` (button + remove playbook block), `src/components/statsFoundations/modules/Module15_SimpsonsParadox.jsx` (button + remove playbook block), `src/components/statsFoundations/modules/Module16_Skewness.jsx` (button + remove playbook block), `src/components/statsFoundations/modules/Module17_MultipleTesting.jsx` (remove playbook block), `src/components/statsFoundations/modules/Module18_RegressionToMean.jsx` (remove playbook block), `src/components/statsFoundations/modules/Module19_SelectionBias.jsx` (remove playbook block), `src/components/statsFoundations/modules/Module20_PracticalSignificance.jsx` (button + remove playbook block), `AUDITS.md` (#64 ✅), `CHANGELOG.md` (this entry)

---

## [4.6.1] — 2026-05

### Fixed
- **Home.jsx daily drill wrong case** (audit #65) — pool entry had `id: 'BEH01', title: 'Influence Without Authority'` but BEH01 is "Changing a PM's Mind with Cohort Data." The influence-without-authority case is BEH05. Fixed to `id: 'BEH05', title: 'Getting Engineering Buy-In Without Escalation'`. Users clicking the daily drill now land on the correct case.
- **`case_opened` missing from 4 V4.4+ open functions** (audit #61) — `openBICase`, `openSTFCase`, `openTakehomeCase`, `openInstrumentationCase` all now call `track('case_opened', { room, id, title: c.title })`. PostHog was undercounting opens for all rooms shipped in V4.4+.
- **`onResetAllProgress` missing 8 localStorage keys** (audit #62) — Added `pal-bi-progress-v1`, `pal-stf-progress-v1`, `pal-takehome-progress-v1`, `pal-instrumentation-progress-v1`, `pal-growth-analytics-progress-v1`, `pal-challenges-progress-v1`, `pal-bookmarks-v1`, `pal-notes-v1`. Reset All Progress now covers all rooms and clears bookmarks + notes.
- **Sitemap missing 8 V4.x routes** (audit #63) — Added `#bi`, `#spot-the-flaw`, `#take-home`, `#instrumentation`, `#challenges`, `#metrics`, `#search`, `#consult`. Sitemap now at 22 URLs.

### Files changed
`src/pages/Home.jsx` (BEH01→BEH05 in drill pool), `src/App.jsx` (+track case_opened to 4 open functions, +8 keys to onResetAllProgress), `public/sitemap.xml` (14→22 URLs), `AUDITS.md` (#61 #62 #63 ✅, +#65 ✅), `IDEAS.md` (bugs marked shipped), `CHANGELOG.md` (this entry)

---

## [4.6.0] — 2026-05

### Added
- **`case_completed` PostHog event** — all 18 room runners now fire `track('case_completed', { room, id, rating })` at the exact completion signal: self-rating submission in Prioritization, Code, Behavioral, Estimation, BI, Growth Analytics, Spot the Flaw, Take-Home, Instrumentation, and Challenges; final scored submit in Metrics, Stats, Review, and Design; final step/phase in RCA, Cases, and Product Design; module completion in Stat Foundations (`rating: null`). Closes the biggest funnel gap — completion rates and self-rating distributions are now measurable per room.
- **MD Spine System** — five institutional memory files created or restructured to eliminate cold-start friction:
  - `CLAUDE.md` (NEW) — AI session briefing: 5-line product summary, scope constraint, non-negotiable syntax rules (single quotes, escaped apostrophes, no template literals), CSS variable reference, lazy-loading pattern, mobile grid pattern, paywall rule, file structure, dev/commit workflow, git lock workaround, new-room checklist
  - `DECISIONS.md` (NEW) — Present-tense prescriptive rulebook: architecture (no backend, React+Vite only, lazy loading, localStorage only), product scope (PAL boundaries, GenAI-as-thread), content (decision-first, one failure mode per case, debrief specs, single-quotes rule), design (CSS variables, light-mode default, mobile patterns, 44px touch), paywall (beta gate, free tier design, Stripe deferred), and a "deliberately not built" table
  - `METRICS.md` (NEW) — Full analytics documentation: PostHog stack, 5 tracked events with properties, 18 rooms tracked via `case_opened`, untracked gaps list, user funnel diagram with explicit gap callout, all 24 localStorage keys, success metrics table (WAU, completion rate, return rate, room diversity), decisions-made-from-data log, next measurement priorities
  - `IDEAS.md` (RESTRUCTURED) — Flat list → tiered backlog (In Progress / Tier 1 / Tier 2 / Tier 3 / Retired). Retired section preserves 12 conscious "not building" decisions with reasons
  - `AUDITS.md` (ENHANCED) — Added canonical 19-type audit reference table (13 standard + 6 PAL-specific); ✅/⚠️ status flags on all 58 existing entries; 4 open items called out (#2 platform risk, #6 beta gate, #8 free/paid tier, #51 PostHog event taxonomy)

### Files changed
`src/components/metrics/MetricsRunner.jsx`, `src/components/prioritization/PrioritizationRunner.jsx`, `src/components/code/CodeRunner.jsx`, `src/components/behavioral/BehavioralRunner.jsx`, `src/components/estimation/EstimationRunner.jsx`, `src/components/bi/BIRunner.jsx`, `src/components/growthAnalytics/GrowthAnalyticsRunner.jsx`, `src/components/spotTheFlaw/SpotTheFlawRunner.jsx`, `src/components/challenges/ChallengesRunner.jsx`, `src/components/instrumentation/InstrumentationRunner.jsx`, `src/components/scenario/ScenarioRunner.jsx`, `src/components/stats/StatsRunner.jsx`, `src/components/design/DesignRunner.jsx`, `src/components/rca/RCARunner.jsx`, `src/components/cases/CaseRunner.jsx`, `src/components/productDesign/ProductDesignRunner.jsx`, `src/components/statsFoundations/StatsFoundationsRunner.jsx`, `src/components/takehome/TakehomeRunner.jsx` (all: +analytics import, +case_completed track call), `METRICS.md` (+case_completed event, funnel gap resolved, next priorities updated), `IDEAS.md` (case_completed marked shipped), `AUDITS.md` (#51 resolved, +audits #59 and #60, summary table updated), `CLAUDE.md` (NEW), `DECISIONS.md` (NEW), `METRICS.md` (NEW)

---

## [4.5.1] — 2026-05

### Fixed
- `src/data/growthAnalyticsCases.js` — three unescaped apostrophes in `leadershipNote` fields (`product's`, `cohort's`, `team's`) caused Vite/Rolldown parse error at line 146:206, breaking the Vercel build. Escaped all three as `\'`.

---

## [4.5.0] — 2026-05

### Added
- **Analytics Instrumentation Room** (NEW room) — 8 cases: measurement plans (inst01 Shopify, inst07 Pinterest), event taxonomy (inst02 Notion), data quality incidents (inst03 Duolingo, inst08 HubSpot instrumentation debt), A/B test SRM audits (inst04 Airbnb), GDPR/CCPA privacy design (inst05 Spotify), data contracts (inst06 Uber). Browser + runner + progress util wired into App.jsx and Header nav (📡 Instrum.)
- **BI Room expanded** — BI09–BI12 added: Host Performance Dashboard (Airbnb, dashboard-design), Checkout Funnel Drop-off (DoorDash, funnel-analysis), Subscriber Cohort Retention (Netflix, cohort-analysis), Surge Pricing Anomaly (Uber, anomaly-detection). Now 12 total cases.
- **Spot the Flaw expanded** — STF09–STF12 added: Confounding Variable (LinkedIn Premium engagement), Regression to the Mean (Google Ads optimization), P-Hacking / Multiple Testing (Booking.com), Network Effects SUTVA violation (Twitter/X follower algorithm). Now 12 total flaw types.
- **Progress.jsx** — Challenges, BI, Spot the Flaw, Take-Home, and Instrumentation rooms now fully tracked: completion bars, heatmap dates, completionMap entries, getNextSuggested() suggestions

### Files changed
`src/data/biCases.js` (+4 cases), `src/data/spotTheFlawCases.js` (+4 cases), `src/data/instrumentationCases.js` (NEW), `src/utils/instrumentationProgress.js` (NEW), `src/pages/InstrumentationBrowser.jsx` (NEW), `src/components/instrumentation/InstrumentationRunner.jsx` (NEW), `src/pages/Progress.jsx` (+imports, +room tracking), `src/App.jsx` (+Instrumentation room wiring), `src/components/layout/Header.jsx` (+📡 Instrum. nav item)

---

## [4.4.0] — 2026-05

### Added
- **BI Room** (NEW room) — 8 cases covering data storytelling, dashboard design, metric definition, attribution, A/B analysis, anomaly detection, cohort analysis, funnel analysis. Companies: Shopify, Airbnb, Meta, Spotify, Netflix, Google, Twitter, Stripe. Free case: BI01. Browser + runner + progress util.
- **Spot the Flaw Room** (NEW room) — 8 adversarial cases where user identifies the statistical flaw in a plausible-looking analysis. Flaw types: SRM (Meta), peeking (Amazon), Simpson's Paradox (LinkedIn), novelty effect (Spotify), multiple testing (Google), bad metric (Uber), selection bias (Airbnb), SUTVA (Lyft). Red accent, 🐛 icon.
- **Take-Home Challenges** (NEW room) — 5 timed challenges (45–90 min): Meta/Stories (DS, free), Airbnb/Host Supply (PM), Spotify/Podcast (Both), Stripe/Fraud (DS), DoorDash/Driver (Both). Timer turns red at <5 min. Rubric scoring with weighted checkboxes.
- **Defense Doc Generator** (NEW tool) — Input a job description → keyword-match against all 11 rooms → generate 7-day personalized study plan with Primary / Secondary / Light tiers. Printable via window.print().
- **Leadership Lens** — leadershipNote field added to all 8 GA cases and RCA01–RCA08. Collapsible purple toggle in GrowthAnalyticsRunner and RCADebriefPanel showing Staff/Director-level perspective.

### Files changed
`src/data/biCases.js` (NEW), `src/data/spotTheFlawCases.js` (NEW), `src/data/takehomeCases.js` (NEW), `src/data/growthAnalyticsCases.js` (+leadershipNote), `src/data/rcaCases.js` (+leadershipNote for RCA01–08), `src/utils/biProgress.js` (NEW), `src/utils/spotTheFlawProgress.js` (NEW), `src/utils/takehomeProgress.js` (NEW), `src/pages/BIBrowser.jsx` (NEW), `src/pages/SpotTheFlawBrowser.jsx` (NEW), `src/pages/TakehomeBrowser.jsx` (NEW), `src/pages/DefenseDocGenerator.jsx` (NEW), `src/components/bi/BIRunner.jsx` (NEW), `src/components/spotTheFlaw/SpotTheFlawRunner.jsx` (NEW), `src/components/takehome/TakehomeRunner.jsx` (NEW), `src/components/growthAnalytics/GrowthAnalyticsRunner.jsx` (+leadership lens), `src/components/rca/RCADebriefPanel.jsx` (+leadership lens), `src/App.jsx` (new lazy imports + routing), `src/components/layout/Header.jsx` (new PRACTICE/TOOLS group items)

---

## [4.3.0] — 2026-05

### Added
- **Cross-Room Challenges** (NEW room) — 6 multi-step challenges combining 3+ rooms in one problem: CHL01 (Meta, DAU + SRM + notifications, free), CHL02 (Stripe, conflicting metrics), CHL03 (Airbnb, growth up engagement down), CHL04 (Lyft, ML segment regression + SQL), CHL05 (DoorDash, market expansion), CHL06 (Uber, SUTVA in viral feature)
- **Interview Combinator extension** — duration selector, MCQ round mode, speech practice mode added to InterviewSimulator
- **Pyodide Python runner** — CodeRunner now loads Pyodide on demand for live in-browser Python execution; Python code modules run without any server
- **Grouped Header nav** — 5 groups: ROOMS (14 items), PRACTICE (5 items), TOOLS (6 items), LEARN (2 items), TRACK (2 items). Group labels hidden on mobile.
- **MCQ Trainer data** — trainerMCQ.js: 40 questions across Statistics (mcq01–10), Experimentation (mcq11–20), Metrics & Growth (mcq21–30), Product & Prioritization (mcq31–40)
- **EST21–EST30** — 10 new Estimation problems: tech-market Fermi estimates
- **code19–code22** — Bayesian A/B Python, cohort LTV Python, anomaly detection Python, funnel chi-square Python (all Pyodide-runnable)
- **Progress visual hierarchy** — section headers, completion % per group, visual separation between room types
- **Home density reduction** — cleaner hero, tighter room grid, less visual noise

### Files changed
`src/data/challengesCases.js` (NEW), `src/data/trainerMCQ.js` (NEW), `src/data/companyTracks.js` (NEW), `src/data/estimationProblems.js` (+EST21–30), `src/data/codeModules.js` (+code19–22), `src/utils/challengesProgress.js` (NEW), `src/pages/ChallengesBrowser.jsx` (NEW), `src/components/challenges/ChallengesRunner.jsx` (NEW), `src/pages/InterviewSimulator.jsx` (MCQ + speech), `src/components/code/CodeRunner.jsx` (+Pyodide), `src/components/layout/Header.jsx` (grouped nav), `src/pages/Progress.jsx` (visual hierarchy), `src/pages/Home.jsx` (density)

---

## [4.2.0] — 2026-05

### Added
- **Global Search** — SearchPage.jsx: full-text search across all 13 rooms, grouped results by type, arrow-key navigation, keyboard shortcut `/` or `Ctrl+K`
- **Keyboard shortcuts** — useKeyboardShortcuts hook: `/` search, `Ctrl+K` search, `Escape` home, `p` progress, `h` home, `t` trainer, `c` consult, `x` challenges, `b` bi, `d` defense-doc. Skips when input/textarea/select has focus.
- **Bookmarks** — bookmarks.js utility + BookmarksBrowser.jsx: save/unsave any case across all rooms, persistent in localStorage (`pal-bookmarks-v1`)
- **Consultation Space** — ConsultationSpace.jsx: keyword-based lookup returning linked cases + playbook articles + MCQs by relevance score; recent query history
- **MCQ Trainer** — Trainer.jsx: 40-question MCQ with immediate feedback, category filter, session scoring
- **Company Tracks** — CompanyTracks.jsx + companyTracks.js: curated prep tracks per company
- **GA Browser tag filter** — tag chips on GrowthAnalyticsBrowser for filtering by case type
- **Bookmark buttons** — added to GA, STF, and other runner debrief panels
- **Home "The Brief"** — daily rotating summary card showing practice tip + featured room

### Fixed
- BookmarksBrowser was created but not wired into App.jsx + Header — fixed

### Files changed
`src/pages/SearchPage.jsx` (NEW), `src/pages/BookmarksBrowser.jsx` (NEW), `src/pages/ConsultationSpace.jsx` (NEW), `src/pages/Trainer.jsx` (NEW), `src/pages/CompanyTracks.jsx` (NEW), `src/utils/bookmarks.js` (NEW), `src/hooks/useKeyboardShortcuts.js` (NEW), `src/pages/Home.jsx` (+The Brief), `src/App.jsx` (new routes + keyboard shortcuts), `src/components/layout/Header.jsx` (+TOOLS group items)

---

## [4.1.0] — 2025-01-XX

### Added
- **Interview Simulator** — 5-case mock interview loop (DS/PM mode), timer, notes, debrief screen with self-rating and full model answers
- **A/B Test Interpreter** — standalone tool for computing z-test, p-value, 95% CI (Wilson), SRM check (chi-square), multiple testing warning, and verdict (Ship/Hold/Invalid)
- **Growth Analytics Charts** — inline Recharts visualizations for all 8 GA cases: stacked bar, grouped bar, dual-line cohort, horizontal funnel, LTV/CAC comparison, session quality, 100% stacked area, geo comparison
- **91-day Practice Heatmap** — Progress page shows contribution-style grid aggregating all 9 room progress stores
- **Role Readiness Score** — Progress page calculates Getting Started / Analyst / Senior / Staff tier based on completion breadth
- **Daily Drill** — Home page rotates a random case from a 14-item pool seeded by epoch day
- **First-run Onboarding Modal** — shows on first visit with role-based room recommendations
- **Last Visited Labels** — room cards on Home show how long ago you last visited
- **Active Recall Textarea** — Stats, Behavioral, Estimation, RCA runners now have a persistent notes textarea (pal-notes-v1)
- **Growth Analytics Playbook** — 7 new articles: Growth Accounting, Cohort Retention Curves, Funnel Analysis Framework, LTV & Payback Period, Acquisition Quality, Notification-Driven DAU, Organic Growth Quality
- **S01-S08 Scenario Rewrite** — all Review scenarios now have stakeholderSummary, nextTestIdeas (3 each), keyTakeaways (5 each), scenarioFamily, tags, conceptTags

### Fixed
- `sitemap.xml`: added missing `#growth-analytics` route with priority 0.9
- `growthAnalyticsCases.js`: playbookLinks updated to reference real article IDs (growth-accounting, cohort-retention-curves, etc.)
- `Progress.jsx`: Growth Analytics room was missing from completionMap tracking

### Changed
- `PlaybookBrowser.jsx`: added Growth Analytics category (green palette, 📈 icon) with CTA renderer
- `Header.jsx`: added Simulate and A/B Tool nav items

---

## V3.6 — Monetization Layer + SEO + Mobile Fixes
**Date:** May 2026
**Commit message:** "feat: V3.6 — Pricing page, SEO layer, mobile responsive fixes"
**Files changed:** `src/pages/Pricing.jsx` (NEW), `src/pages/Unlock.jsx`, `src/utils/unlock.js`, `src/App.jsx`, `src/components/layout/Header.jsx`, `index.html`, `public/sitemap.xml` (NEW), `public/robots.txt` (NEW), `public/og-image.png` (NEW), `src/pages/StatsFoundationsBrowser.jsx`, `src/components/statsFoundations/StatsFoundationsRunner.jsx`, `src/components/statsFoundations/modules/Module01_WhatIsData.jsx`, `src/pages/Home.jsx`, `src/pages/StatsBrowser.jsx`

### Why
Three production-readiness tracks: a monetization layer so the lab can move from free beta to paid access, an SEO layer so the site is discoverable, and a mobile responsive audit so the experience works on phones.

### Monetization
- `src/pages/Pricing.jsx` — two-tier pricing page: Free (Stat Foundations 2 modules, Stats 2 cases, Playbook read-only) vs Full Access ($49 one-time, all 100+ cases, all rooms, lifetime access)
- Stripe CTA reads `VITE_STRIPE_PAYMENT_LINK` env var — set in Vercel dashboard when ready to go live
- `Unlock.jsx` — updated copy ("100+ practice cases across 9 rooms"), added "Buy Full Access →" button above the access-code form
- `unlock.js` — `isUnlocked()` still returns `true` for beta; marked with `// TODO: set to false when Stripe goes live`
- "Pricing" added to nav and App.jsx routing

### SEO
- `index.html` — OG tags (og:type, og:url, og:title, og:description, og:image), Twitter card (summary_large_image), JSON-LD structured data (WebApplication schema with offers)
- `public/og-image.png` — 1200×630 social preview image: dark background, yellow accent bar, product name, feature pills, URL
- `public/sitemap.xml` — 13 URLs covering all rooms + blog + playbook + pricing, with priorities
- `public/robots.txt` — allow all, sitemap pointer
- `App.jsx` — `useEffect` updates `document.title` on every route change (15 distinct titles)

### Mobile responsive fixes
- `Header.jsx` — nav buttons get `minHeight: 44px` and `flexShrink: 0` for 44px touch targets
- `Home.jsx`, `StatsFoundationsBrowser.jsx`, `StatsFoundationsRunner.jsx`, `StatsBrowser.jsx` — added `width: '100%'` and `boxSizing: 'border-box'` to main containers
- `Module01_WhatIsData.jsx` — `flexWrap: 'wrap'` on drop-zones row so columns stack on narrow screens

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
