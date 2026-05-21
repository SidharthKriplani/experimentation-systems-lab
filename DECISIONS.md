# DECISIONS.md — PAL Rulebook

Prescriptive, present-tense standing rules. This is not build history (that's CHANGELOG.md). These are the rules that govern every future decision. When you're about to make a choice that affects the whole system, read this first.

---

## Architecture

**No backend. Ever (until V5).**
The platform is a static SPA on Vercel. All state lives in localStorage. No API routes, no database, no auth server. Cross-device sync is a V5 problem. Do not introduce a backend dependency for any feature through V4.x.

**React + Vite only. No framework migrations.**
The stack is React 18 + Vite 8. Do not introduce Next.js, Remix, or any SSR framework. The platform is intentionally static — SEO is handled via static OG tags and sitemap, not server rendering.

**All room components use React.lazy() + Suspense.**
Named-export pattern: `.then(m => ({ default: m.X }))`. Never static-import a room page or runner. The initial bundle must not contain room code.

**All progress uses localStorage only.**
Key naming convention: `pal-[room]-progress-v1`. New rooms must follow this pattern. `onResetAllProgress` in App.jsx must include every key. Product Design uses a prefix pattern (`pd-progress-*`) requiring key iteration — document any similar exceptions.

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

---

## Paywall + monetization

**`isUnlocked()` returns `true` during beta. Do not change this.**
Located in `src/utils/unlock.js`. Marked with `// TODO: set to false when Stripe goes live`. Real payment infrastructure only after 3+ paid rooms with proven content.

**Free tier is always: 1–2 analyst-level cases per room.**
Every room must have at least one `isFree: true` case. Stats Foundations is fully free — it's the best marketing for the platform.

**Stripe is scaffolded but not live.**
`VITE_STRIPE_PAYMENT_LINK` env var is read in the Pricing page but the paywall is not enforced. Do not introduce Stripe logic until the team decides to flip the gate.

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

## Analytics

**PostHog is env-var gated. App works identically without it.**
`VITE_POSTHOG_KEY` must be set in Vercel dashboard. Never make analytics required for app function.

**`autocapture: false`. `capture_pageview: false`. Explicit events only.**
No implicit data collection. Every tracked event is a deliberate `track()` call in App.jsx.

**No PII. Ever.**
`sanitize_properties` strips `email`, `name`, `ip` from every event. Do not add user-identifiable properties to any event.

**Event naming convention: `snake_case`.**
Current events: `page_viewed`, `case_opened`, `paywall_hit`, `unlocked`, `open_challenge`. New events follow the same pattern. Document in `METRICS.md`.
