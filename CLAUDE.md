# CLAUDE.md — PAL Session Briefing

Read this first, every session. It is the fastest path from cold start to productive work.

---

## Working relationship

Act as a product and engineering partner, not an assistant. That means:

- Push back when something is wrong, over-scoped, or not worth building
- Give an honest opinion before executing — if the idea is weak, say so first
- Don't pipeline every input into the backlog. Most things don't belong there
- Don't invent tiers or reframe bad ideas to make them sound good
- If a decision has a real cost or risk, name it plainly
- Disagree out loud. Agreement should mean something

The job is to build a good product, not to make every session feel productive.

---

## What this project is (5 lines)

**Product Analytics Lab (PAL)** is a browser-based interview prep platform for product analysts and PMs. Users practice judgment calls — not recall — across 17 rooms covering stats, experimentation, RCA, metrics, SQL/Python, product design, prioritization, behavioral, estimation, analytics instrumentation, and A/B foundations. React + Vite SPA, localStorage + optional Supabase auth. Deployed on Vercel. Repo: `github.com/SidharthKriplani/experimentation-systems-lab`. Current version: V4.30.0.

---

## Scope constraint (non-negotiable)

**PAL stays within product analytics and PM.** No ML systems, no data engineering, no model training content. BI is in scope. Analytics instrumentation is in scope. Anything that belongs in the sibling ML Systems Lab is not.

---

## Non-negotiable code rules

### Syntax — will break the Vercel build if violated
- All JS data files use **single quotes only**
- Any apostrophe inside a single-quoted string **must be escaped as `\'`** — e.g. `'product\'s metric'`
- **No template literals (backticks) in data files** — Vite/Rolldown throws parse errors
- This has broken the build twice (challengesCases.js, growthAnalyticsCases.js). Check every leadershipNote, situation, and debrief field before committing

### Component pattern — lazy loading
All page and runner components use `React.lazy()` with named-export pattern:
```js
const MyBrowser = lazy(() => import('./pages/MyBrowser.jsx').then(m => ({ default: m.MyBrowser })));
```
Never use static imports for room pages/runners. `<Suspense>` wraps the entire `<main>` block.

### CSS — always use variables, never hardcode
```css
var(--accent)        /* blue — Review Room, Experimentation Foundations */
var(--teal)          /* teal — Instrumentation, Stat Foundations, RCA Foundations */
var(--yellow)        /* yellow — Challenges, BI, Take-Home */
var(--green)         /* green — Metrics, Metrics Foundations */
var(--red)           /* red — Spot the Flaw */
var(--purple)        /* purple — Product Design, Leadership Lens */
var(--surface)       /* card background */
var(--border)        /* border color */
var(--text)          /* primary text */
var(--text-muted)    /* secondary text */
```

### Mobile — responsive grid pattern
```css
gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))'
```
The inner `min()` prevents horizontal overflow on mobile. Never use `minmax(380px, 1fr)` bare.

### Apostrophes and escape sequences — build-breaking if wrong

Three distinct contexts; three different rules:

1. **Data files (`src/data/*.js`)** — single-quoted strings: escape apostrophes as `\'` — e.g. `'product\'s metric'`. Required.
2. **JSX/component files — JS string expressions** — `\'` is valid only *inside* an already-open single-quoted string. **Never use `\'` as string delimiters** (e.g. `\'-\'` or `\'# \'`). Rolldown throws "Invalid Unicode escape sequence" at build time.
3. **JSX text content** (between `>` and `<` tags) — use **plain apostrophes only**. `\'` in JSX text renders as literal `\` + `'` or causes a parse error.

This class of bug broke the Vercel build in V4.14.1 (DebriefCopyButton.jsx). Do not repeat it.

### Paywall
`isUnlocked()` in `src/utils/unlock.js` returns `true` (beta). Do not change this. When Stripe goes live this will flip — it is marked with `// TODO: set to false when Stripe goes live`.

---

## File structure (what matters)

```
src/
  App.jsx                     — routing, state, track() calls for every room
  index.css                   — full CSS variable theme system
  data/                       — all case/scenario/module data files
                                (includes expFoundationModules.js, metricsFoundationModules.js,
                                 rcaFoundationModules.js and all other room data files)
  pages/                      — browser pages (one per room)
  components/
    layout/Header.jsx          — nav (PRACTICE ROOMS / PRACTICE / LEARN / TOOLS / TRACK)
    expFoundations/            — Experimentation Foundations runner
    metricsFoundations/        — Metrics Foundations runner
    rcaFoundations/            — RCA Foundations runner
    shared/                    — shared components (e.g. DebriefCopyButton.jsx)
    [room]/[Room]Runner.jsx    — case runner components
  utils/
    analytics.js               — PostHog wrapper (env-var gated, PII-stripped)
    unlock.js                  — beta gate (always true right now)
    [room]Progress.js          — localStorage progress per room
public/
  sitemap.xml                 — 25+ URLs, update when adding routes
  robots.txt
  og-image.png
docs/
  PLATFORM_ARCHITECTURE_MEMO.md
  CONTENT_QUALITY_BAR.md
  SCENARIO_BANK_TAXONOMY.md
  ROADMAP.md
```

---

## Dev + commit workflow

### Running locally
```bash
npm run dev
```

### Building (Vercel workaround for disk space)
```bash
npm_config_cache=/tmp/npm-cache ./node_modules/.bin/vite build --outDir /tmp/dist-output
```

### Git lock issue (recurring — sandbox cannot push)
The sandbox cannot remove `.git/HEAD.lock` across the FUSE mount. When git fails with "cannot lock ref HEAD", the user must run from their Mac terminal:
```bash
cd "/Users/ASUS/Documents/GitHub/experimentation-systems-lab"
rm -f .git/index.lock .git/HEAD.lock
git add -A
git commit -m "your message"
git push origin main
```

---

## When external content arrives (screenshots, links, posts)

Make a product + engineering call first. Not everything belongs. Ask: does this reveal a gap PAL is genuinely placed to fill, with content specific enough to practice against? If yes, add to IDEAS.md at the right tier with honest effort sizing. If no, say so and move on. Don't pipeline every input into the backlog.

**Field intelligence workflow** (practitioner posts, LinkedIn screenshots, job descriptions):
1. Assess source credibility — is this a practitioner signal or generic advice?
2. Gap-map to PAL rooms — which room(s) does this inform? Is the gap real?
3. Check for content specificity — can PAL build a case around this, or is it too vague?
4. If viable: name the cluster, add to IDEAS.md at the right tier, note the source
5. If not: say why and discard — don't invent tiers to make weak signals sound useful

---

## Adding a new room (checklist)

1. `src/data/[room]Cases.js` — data file, single quotes, escape apostrophes
2. `src/utils/[room]Progress.js` — localStorage key `pal-[room]-progress-v1`
3. `src/pages/[Room]Browser.jsx` — named export, mobile-safe grid
4. `src/components/[room]/[Room]Runner.jsx` — named export, `onBack`, `onNext`, `unlocked` props
5. `src/App.jsx` — lazy import, state var, open function, routing block, `onResetAllProgress` key
6. `src/components/layout/Header.jsx` — nav item + active state for runner page
7. `src/pages/Progress.jsx` — add to completionMap, allRoomProgress, heatmap dates, getNextSuggested
8. `public/sitemap.xml` — add route

---

## MD spine files (what each does)

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file. Read every session. |
| `DECISIONS.md` | Prescriptive rulebook — architectural + product standing rules. Check before making any structural choice. |
| `LINEAGE.md` / `CHANGELOG.md` | Build history. `CHANGELOG.md` is terse (version + bullets). Full narrative lineage is embedded in `CHANGELOG.md` as detailed entries. Covers V1.0 through V4.13.1. |
| `IDEAS.md` | Tiered backlog — In Progress / Tier 1 / Tier 2 / Tier 3 / Retired. |
| `AUDITS.md` | Health log — 70 audits to date, with ✅ resolved / ⚠️ open status. |
| `METRICS.md` | Tracked events, user funnel, success metrics, localStorage keys. |
| `docs/CONTENT_QUALITY_BAR.md` | 8-dimension standard every case must pass before shipping. |
| `docs/SCENARIO_BANK_TAXONOMY.md` | 15 scenario families for the Review Room. |
| `ROLLOUT.md` | Beta rollout plan — batches, self-vet checklists, tester briefs, feedback tracking. Operational only; not a backlog. |
