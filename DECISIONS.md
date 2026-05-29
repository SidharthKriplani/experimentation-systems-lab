# DECISIONS.md — PAL Rulebook

Prescriptive, present-tense standing rules. This is not build history (that's CHANGELOG.md). These are the rules that govern every future decision. When you're about to make a choice that affects the whole system, read this first.

---

## Architecture

**No custom backend. Supabase is the only allowed external service (V4.24+).**
The platform is a static SPA on Vercel. Core state lives in localStorage. Supabase auth and cross-device progress sync were added in V4.24 and are fully env-var gated — the app runs in localStorage-only mode when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are absent. No API routes, no custom servers. Do not introduce any other backend dependency through V4.x.

**React + Vite only. No framework migrations.**
The stack is React 18 + Vite 8. Do not introduce Next.js, Remix, or any SSR framework. The platform is intentionally static — SEO is handled via static OG tags and sitemap, not server rendering.

**All room components use React.lazy() + Suspense.**
Named-export pattern: `.then(m => ({ default: m.X }))`. Never static-import a room page or runner. The initial bundle must not contain room code.

**All progress uses localStorage as the primary store.**
Key naming convention: `pal-[room]-progress-v1`. New rooms must follow this pattern. `onResetAllProgress` in App.jsx must include every key. The 18 `pal-*` progress keys in `src/utils/syncProgress.js` (`PROGRESS_KEYS`) are also synced to Supabase when the user is signed in — add any new `pal-*` keys to that array. Product Design uses a prefix pattern (`pd-progress-*`) requiring key iteration — document any similar exceptions.

**One file per component. No separate CSS files.**
All styling uses inline style objects with CSS variables. No CSS modules, no Tailwind, no styled-components.

---

## Product scope

**PAL covers product analytics and PM only.**
Rooms in scope: stats, experimentation, RCA, metrics, SQL/Python analytics, product design, prioritization, behavioral/leadership, estimation/Fermi, growth analytics, BI, analytics instrumentation, spot-the-flaw, take-home challenges.
Out of scope: ML model training, data engineering pipelines, MLOps, anything that belongs in the sibling ML Systems Lab.

**GenAI is a thread, not a room.**
GenAI content lives inside existing rooms (Playbook articles, RCA cases, Metrics cases). There is no standalone GenAI room. This keeps scope clean and avoids thin content.

**Every room is a judgment exercise, not a knowledge transfer.**
The positioning is "practice the calls." Every room must put the user in a decision-making situation, not a reading situation. No room should feel like a course or textbook chapter.

---

## Content

**LinkedIn practitioners are a primary content signal source.**
See `CLAUDE.md → When a screenshot is dropped` for the full workflow. Short version: assess credibility, gap-map to rooms, add named cluster to IDEAS.md, log the source.

**Decision-first, always. Never definition-first.**
Every room, module, and article opens with a situation — not a definition. The Stats Room module on p-values starts with a stakeholder claim to evaluate, not "A p-value is the probability of...".

**Every case teaches exactly one failure mode.**
If a scenario straddles two failure modes, simplify it or split it. Teaching one thing well beats teaching two things messily. See `docs/SCENARIO_BANK_TAXONOMY.md`.

**The senior debrief must be scenario-specific, not generic.**
A debrief that could apply to any experiment with the same failure mode has failed the quality bar. It must name the failure mode in this specific context, explain why it matters here, and address the most common wrong answer. 400–700 words. See `docs/CONTENT_QUALITY_BAR.md`.

**All JS data files use single quotes. Apostrophes are escaped as `\'`.**
No template literals in data files. This has caused two production build failures. There are no exceptions to this rule.

**Playbook articles are story-first.**
Every article opens with a concrete scenario — a Slack message, a PM ask, a live experiment moment — before any framework or definition. "Here's a situation" before "here's the concept."

---

## Design

**CSS variables only. No hardcoded hex values.**
Every color reference uses a CSS variable from `src/index.css`. Color-to-room assignments are fixed:
- `--accent` (blue) → Review Room
- `--teal` → Instrumentation, Stat Foundations
- `--green` → Metrics
- `--yellow` → Challenges, BI, Take-Home
- `--red` → Spot the Flaw
- `--purple` → Product Design, Prioritization, Leadership Lens
- `--blue` → Behavioral

**Light mode is the default.**
The product targets desktop analytical workspaces. Dark mode is available via toggle but light is default. Do not invert this.

**Aesthetic reference: serious analytical workspace.**
Linear, PostHog, Retool, Stripe Docs. Not edtech, not gamified, not neon. No excessive animation. No completion certificates as primary motivation.

**Mobile grids use `minmax(min(Xpx, 100%), 1fr)`.**
Never use `minmax(Xpx, 1fr)` bare — the minimum will overflow on narrow viewports.

**Touch targets minimum 44px height on interactive nav elements.**
Matches Apple HIG minimum.

**Dark mode palette must maintain visible surface elevation at low screen brightness.**
The bg→surface luminance gap must be large enough to distinguish layers at 30% screen brightness. A gap of <10 luminance units collapses to identical black on dimmed mobile screens. Minimum values (V4.25.4): `--bg: #111520`, `--surface: #191e30`, `--surface-2: #1f2538`. Semantic bg colors (accent-bg, teal-bg, red-bg, etc.) must be visibly tinted, not the same shade as `--bg`. Do not "safely" nudge these values — the V4.25.3 incremental pass was invisible on real devices. Go far enough.

**Sign-in has one canonical entry point per layout mode.**
Desktop: Header.jsx right slot. Mobile: mobile topbar right slot. Do not add a second sign-in CTA to the sidebar or any overlay — it creates duplicate auth affordances. The sidebar shows auth state only when signed in (email + sign out). This was fixed in V4.26.1 (Audit #76).

---

## Paywall + monetization

**Access code gate is live as of V4.29.0. `isUnlocked()` reads localStorage.**
Located in `src/utils/unlock.js`. Valid code: `DAI2026` (single community code — LinkedIn, word of mouth, direct invite). Stored under key `pal-access-code-v1`. The access code tier is permanent — it remains as the community tier even after Stripe goes live.

**Free tier: first 3 cases per room + all Foundations + full Defense Strategy.**
Every room has exactly `isFree: true` on its first 3 items (Stats has 4). All Foundations modules are fully free. Defense Strategy is fully free. This split is intentional — enough value to hook, enough gate to motivate unlocking.

**Premium tier (access code required): full case banks, Company Tracks, full Behavioral (BEH04+), Interview Simulator.**
Company Tracks and Interview Simulator have no `isFree` partial access — they are entirely behind the gate.

**Stripe is scaffolded but not live.**
`VITE_STRIPE_PAYMENT_LINK` env var exists but the Stripe flow is not wired. When Stripe goes live, `isUnlocked()` should also accept a valid Stripe session token. The access code community tier coexists with Stripe — it does not go away.

---

## What is deliberately not built

These decisions are final through V4.x. Do not revisit without strong evidence:

| Not built | Reason |
|---|---|
| Social features (leaderboards, sharing scores) | Distorts motivation toward proxy metrics |
| Mobile app | Content is inherently desktop (tables, charts, sliders) |
| Video content | Passive, expensive, doesn't differentiate |
| LMS / forced curriculum | Implies a course, not a practice space |
| AI evaluation of free-text | Expensive, inconsistent; defer to V5+ |
| Team accounts / org dashboards | Requires backend; V5 territory |
| API / embed for third parties | Premature platform thinking |
| Email / notification system | Engagement mechanics distract from content quality |
| Stats Room as text-heavy fallback | Better to not ship than to ship a textbook |
| Product Cases as free-text room | Format breaks pre-computed scoring model |

---

## Current priority (V4.25+)

**Feature building is paused. Distribution and analytics come first.**
The product is technically complete enough to charge for. The next risk is not features — it is unknown usage. Before any new feature work:
1. Confirm `VITE_POSTHOG_KEY` is live in Vercel prod
2. Establish a WAU baseline from real sessions
3. Observe where users drop off before deciding what to build next

Do not start new features until Step 2 is complete. Every feature decision before then is speculation.

---

## Analytics

**PostHog is env-var gated. App works identically without it.**
`VITE_POSTHOG_KEY` must be set in Vercel dashboard. Never make analytics required for app function.

**`autocapture: false`. `capture_pageview: false`. Explicit events only.**
No implicit data collection. Every tracked event is a deliberate `track()` call in App.jsx.

**No PII. Ever.**
`sanitize_properties` strips `email`, `name`, `ip` from every event. Do not add user-identifiable properties to any event.

**Event naming convention: `snake_case`.**
Current events: `page_viewed`, `case_opened`, `paywall_hit`, `unlocked`, `open_challenge`. New events follow the same pattern. Document in `METRICS.md`.

---

## Monetization

**Price: $69 one-time. No subscription.**
Rationale: $49 underprices 150+ cases + 25 interactive foundation modules + lifetime access. $69 is still sub-$100 (low friction), signals quality over a prep course, and is below any meaningful competitor. A subscription would require backend infrastructure (usage tracking, billing webhooks) — not viable until V5.

**No subscription tier until V5.**
Recurring billing requires usage metering, cancellation flows, and dunning — backend-only problems. Everything through V4.x is a one-time purchase or free. Do not introduce subscription logic.

**30-day money-back guarantee. No questions asked.**
Stated on Pricing page. Reduces purchase friction more than any discount. Non-negotiable — do not remove this from Pricing copy.

**Free tier gates: 2 Stat Foundation modules + 2 Stats Room cases + full Playbook.**
These are the most convincing samples. Stats Room cases show the MCQ+debrief format. Stat Foundations shows the interactive module format. Playbook shows depth. Do not change the free gate without re-evaluating conversion.

---

## Navigation

**No emojis in nav labels.**
Emojis in nav items are inconsistent (some rooms have them, most don't) and add visual noise to an analytical tool. Icon components (Icon.jsx) are the correct approach for nav decoration. Do not add emojis to nav item labels.

**Consult is not in the nav.**
Consult (ConsultationSpace) was cut from nav in V4.12 — it overlaps with Search and adds nav clutter. It remains accessible via Search Room but is not surfaced in the header.

**Nav label conventions:**
- Room labels: short, noun-form, no emoji (Stats, Metrics, RCA, Cases, Growth, BI)
- Tools group: Search, Trainer, Companies, Defense, Saved
- Learn group: Learn, Playbook
- Track group: Pricing, Progress
- "Instrumentation" not "Instrum." — never truncate labels with a period
