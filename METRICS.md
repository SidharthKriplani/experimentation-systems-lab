# METRICS.md — PAL Measurement System

What we track, what we measure success by, and what decisions have been made from data. Update baselines when new data is available. This file prevents building in the dark.

---

## Analytics stack

| Property | Value |
|---|---|
| Tool | PostHog (CDN-loaded) |
| Key env var | `VITE_POSTHOG_KEY` (set in Vercel dashboard) |
| Host | `VITE_POSTHOG_HOST` (default: `https://us.i.posthog.com`) |
| Autocapture | Off |
| Pageview capture | Off (manual only) |
| PII policy | `email`, `name`, `ip` stripped from all events via `sanitize_properties` |
| Gate | App works identically with or without the key |

---

## Tracked events

Events fire from `src/App.jsx` (navigation events) and directly from runner components (completion events) via `track()` from `src/utils/analytics.js`.

| Event | When it fires | Properties |
|---|---|---|
| `page_viewed` | Every navigation (room open, page change) | `{ page: string }` |
| `case_opened` | User opens any case that passes the paywall check | `{ room: string, id: string, title: string }` |
| `case_completed` | User submits self-rating / final answer in any runner | `{ room: string, id: string, rating: string\|number\|null }` |
| `paywall_hit` | User tries to open a locked case while `isUnlocked()` is false | `{ room: string, id: string }` |
| `unlocked` | User successfully enters the beta unlock code | _(no properties)_ |
| `open_challenge` | User opens a Cross-Room Challenge | `{ id: string, title: string }` |

### Rooms tracked via `case_opened`
`stats`, `design`, `review`, `metrics`, `rca`, `cases`, `code`, `prioritization`, `behavioral`, `estimation`, `stat-foundations`, `growth-analytics`, `bi`, `spot-the-flaw`, `take-home`, `product-design`, `challenges`, `instrumentation`

### Events not yet tracked (gaps)
- Debrief revealed
- Hint expanded
- Playbook article opened
- Search query
- Bookmark added/removed
- Interview Simulator session completed
- MCQ Trainer session scored
- Defense Doc generated
- Debrief copied to clipboard (`DebriefCopyButton` — V4.13.0) — clipboard copy fires but no PostHog event wired; `debrief_copied` event would be worth adding in a future pass to measure export behaviour

---

## User funnel

```
Landing (Home page)
    ↓
Room entry (page_viewed → room page)
    ↓
Case open (case_opened)
    ↓
[Paywall hit → Unlock page]  ← currently bypassed (beta gate = true)
    ↓
Case completion (self-rating submitted) ← case_completed event
    ↓
Return visit (heatmap activity) ← tracked via localStorage, not PostHog
```

### Current funnel gap
Top-of-funnel (page_viewed, case_opened), paywall signal (paywall_hit), and completion signal (case_completed) are all live. Remaining gap: we cannot measure debrief read-through, hint usage, or which specific answers users select.

---

## Success metrics

| Metric | Target | Current baseline | Notes |
|---|---|---|---|
| Weekly active users (WAU) | — | Unknown — PostHog not yet live in prod | Set baseline once PostHog key is live |
| Cases opened per session | ≥ 3 | Unknown | Proxy for engagement depth |
| Return visit rate (7-day) | ≥ 40% | Unknown | Core retention signal |
| Room diversity per user | ≥ 3 rooms visited | Unknown | Breadth engagement |
| Paywall conversion rate | — | 0% (beta gate = true) | Activate when Stripe goes live |
| Most-opened room | — | Unknown | Prioritise content expansion here |
| Most paywall-hit room | — | Unknown | First room to unlock post-beta |

---

## localStorage keys (client-side state)

All progress state lives in localStorage. Every key must be included in `onResetAllProgress` in App.jsx.

| Key | Room / Feature | Type |
|---|---|---|
| `exp-lab-theme` | Light/dark mode toggle | `'light' \| 'dark'` |
| `exp-lab-unlocked-v1` | Beta unlock status | `boolean` |
| `exp-lab-progress-v1` | Review Room (legacy key from V1) | per-scenario object |
| `pal-design-progress-v1` | Design Room | per-scenario object |
| `pal-stats-progress-v1` | Stats Room | per-module object |
| `pal-metrics-progress-v2` | Metrics Room | per-case object |
| `pal-rca-progress-v2` | RCA Room | per-case object |
| `pal-cases-progress-v2` | Cases Room | per-case object |
| `pal-code-progress-v1` | Code Room | per-module object |
| `pal-pri-progress-v1` | Prioritization Room | per-scenario object |
| `pal-behavioral-progress-v1` | Behavioral Room | per-question object |
| `pal-estimation-progress-v1` | Estimation Room | per-problem object |
| `pal-sf-progress-v1` | Stat Foundations Room | per-module object |
| `pal-ga-progress-v1` | Growth Analytics Room | per-case object |
| `pal-challenges-progress-v1` | Cross-Room Challenges | per-challenge object |
| `pal-bi-progress-v1` | BI Room | per-case object |
| `pal-stf-progress-v1` | Spot the Flaw Room | per-case object |
| `pal-takehome-progress-v1` | Take-Home Room | per-challenge object |
| `pal-instrumentation-progress-v1` | Instrumentation Room | per-case object |
| `pd-progress-*` | Product Design Room (prefix pattern) | per-scenario, per-phase |
| `pal-bookmarks-v1` | Bookmarks (cross-room) | array of `{ room, id }` |
| `pal-notes-v1` | Active Recall textarea | per-room notes string |
| `pal-role-toggle` | Home page DS/PM role filter | `'DS + PM' \| 'Product DS' \| 'Product PM'` |
| `pal-first-visit` | First-run onboarding modal shown flag | boolean |
| `pal-exp-foundation-progress-v1` | Experimentation Foundations Room | per-module object (`completedAt` per moduleId) |
| `pal-last-visited-*` | Last visited timestamp per room | ISO timestamp |

---

## Decisions made from metric data

| Date | Decision | Signal |
|---|---|---|
| V2.3 | Opened all content for free during beta | No conversion data existed; couldn't charge without usage proof |
| V3.6 | Stripe scaffolded but not activated | Beta still running; no retention or testimonial data to support paid launch |
| V4.x | PostHog wired but key not confirmed live in prod | Baseline data collection deferred — update this when key is confirmed active |

---

## Next measurement priorities

Before any paid conversion attempt, establish these baselines:

1. Confirm `VITE_POSTHOG_KEY` is active in Vercel production environment
2. Measure WAU and 7-day return rate for 4 weeks
3. ✅ `case_completed` event shipped — all 18 runners instrumented
4. Identify the most-opened room (content expansion priority)
5. Identify the most paywall-hit room (first unlock candidate post-beta)
