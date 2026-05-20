import { useState } from 'react';
import { learningPaths } from '../data/learningPaths.js';

const BRIEFS = [
  {
    id: 'brief-01',
    concept: 'Statistical Power',
    tldr: 'The probability your test detects a real effect when one exists. Low power = missed signals.',
    depth: 'Power depends on sample size, effect size, and α. Most A/B tests are underpowered — teams run them too short and then ship a null result that was actually a weak positive. Rule of thumb: aim for 80% power minimum. Use a sample size calculator before launching.',
    example: 'You run an A/B test for 3 days and see p=0.15. Do you stop? Not necessarily — if your expected effect is 2% lift on a 1M DAU product, you likely needed 2 weeks of data.',
    tags: ['statistics', 'a/b testing', 'experimentation'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-02',
    concept: 'North Star Metric',
    tldr: 'One metric that best captures the value your product delivers to users.',
    depth: 'NSM should reflect user value (not revenue), be measurable, and predict long-term growth. Common mistake: choosing DAU as NSM when DAU doesn\'t mean users got value — "messages sent" (Slack), "nights booked" (Airbnb), "hours watched" (Netflix) are better.',
    example: 'Facebook chose "10 friends in 10 days" as their early activation NSM. It predicted retention better than DAU because it proxied real social connection.',
    tags: ['product analytics', 'metrics', 'strategy'],
    learnMore: 'metrics',
  },
  {
    id: 'brief-03',
    concept: 'Cohort Retention',
    tldr: 'Tracking the same group of users over time to see how many stay active.',
    depth: 'Cross-sectional retention (all users on day N) is misleading — it mixes acquisition cohorts with different quality. Cohort retention isolates signal. A flattening retention curve = product has found its engaged core. A slope that never flattens = you have a leaky bucket.',
    example: 'Jan cohort: 1000 users, Day-7 = 400 (40%), Day-30 = 180 (18%), Day-90 = 120 (12%). The flattening from 18%→12% over 60 days suggests a sticky 12% core.',
    tags: ['retention', 'cohorts', 'growth analytics'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-04',
    concept: 'Simpson\'s Paradox',
    tldr: 'A trend appears in several groups but disappears or reverses when groups are combined.',
    depth: 'Classic in A/B testing: Treatment wins overall but loses in every segment. This happens when groups have different sizes and baseline rates. Always segment your results. Common culprit: device type (mobile converts lower, treatment skews mobile-heavy).',
    example: 'Overall: Control 15% conversion, Treatment 14%. But: Desktop Control 20% vs Treatment 22%. Mobile Control 10% vs Treatment 11%. Treatment actually wins in both segments — the aggregate reversal is a composition artifact.',
    tags: ['statistics', 'segmentation', 'a/b testing'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-05',
    concept: 'P-value Misconceptions',
    tldr: 'p < 0.05 does NOT mean there\'s a 95% chance your hypothesis is true.',
    depth: 'p-value = probability of seeing data this extreme IF the null is true. It says nothing about the probability the null IS true. It\'s also not the probability you\'ll replicate. Common error: "we have 95% confidence the treatment is better." Correct: "if the null were true, we\'d see this data only 5% of the time."',
    example: 'p=0.03 with n=50 and effect size 0.02%? Likely noise. p=0.03 with n=100,000 and effect size 2%? Worth shipping. p-value without effect size and sample size is almost meaningless.',
    tags: ['statistics', 'hypothesis testing'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-06',
    concept: 'DAU/MAU Ratio (Stickiness)',
    tldr: 'The fraction of monthly active users who return daily — a core engagement signal.',
    depth: 'DAU/MAU of 50%+ means roughly half of monthly users return daily. Benchmark varies by app type: social (50%+), tools (20-30%), e-commerce (5-10%). Watch out: if you inflate MAU with re-engagement campaigns, stickiness looks worse. Always decompose into casual vs power users.',
    example: 'WhatsApp ~70% DAU/MAU. News apps ~15-20%. B2B tools ~25-40%. Your product\'s benchmark depends on its use case and cadence of natural need.',
    tags: ['engagement', 'growth analytics', 'metrics'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-07',
    concept: 'Regression to the Mean',
    tldr: 'Extreme measurements tend to move toward average on remeasurement — not due to intervention.',
    depth: 'If you pick your worst-performing cohort and "treat" them, they\'ll likely improve — not because of your treatment, but because they were extreme by chance. Common in product: A/B tests on pages that had an unusually bad week, "fixing" metrics that were temporarily low.',
    example: 'You notice Feature X had a terrible day-7 retention for the Dec cohort. You add an onboarding change. Jan cohort looks better. Was it the change? Maybe — or maybe Dec was just a bad acquisition month.',
    tags: ['statistics', 'experimentation'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-08',
    concept: 'Funnel Analysis',
    tldr: 'Tracking what fraction of users complete each sequential step toward a goal.',
    depth: 'Funnels reveal where drop-off is highest (opportunity) vs. where retention is already good. Key: define the funnel steps based on user intent, not just clicks. Avoid funnel theater — cherry-picking steps that look good. Also time-bound your funnel (conversion within N days) or you conflate intent with timing.',
    example: 'Signup funnel: 10,000 visit → 4,000 click signup → 2,000 complete form → 1,500 verify email → 900 complete profile. The email verification step (2000→1500) is your biggest drop — that\'s where to focus.',
    tags: ['funnel', 'conversion', 'product analytics'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-09',
    concept: 'LTV / CAC Ratio',
    tldr: 'Lifetime value vs. customer acquisition cost — the unit economics health check.',
    depth: 'LTV:CAC > 3x is the common benchmark for sustainable growth. But LTV depends heavily on your payback period assumption and churn rate. A 3x ratio with an 18-month payback period means you\'re cash-flow negative for a year and a half per customer — unsustainable without funding.',
    example: 'SaaS: ARPU $100/mo, churn 5%/mo, LTV = 100/0.05 = $2000. If CAC = $500, ratio = 4x. But if CAC = $800, ratio = 2.5x — borderline. Focus on reducing churn before scaling acquisition.',
    tags: ['growth analytics', 'unit economics', 'ltv'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-10',
    concept: 'Network Effects',
    tldr: 'The product becomes more valuable as more people use it.',
    depth: 'Direct network effects (social): more users → better for each user directly. Indirect (marketplace): more sellers → better for buyers → attracts more sellers. Data network effects: more usage → better ML → better product → more usage. Network effects create moats but require critical mass to ignite.',
    example: 'Slack: team communication value grows with teammates. But Slack also has "same-side" negative effects within a workspace — too many channels = noise. Strong product teams manage network density, not just growth.',
    tags: ['strategy', 'growth', 'product design'],
    learnMore: 'product-design',
  },
  {
    id: 'brief-11',
    concept: 'Selection Bias',
    tldr: 'Your sample isn\'t representative of the population you\'re drawing conclusions about.',
    depth: 'Survivorship bias is the most common form: you only see users who stayed, reviews that were written, features that shipped. Volunteer bias: surveys get answered by engaged users, skewing NPS up. Measurement bias: you only measure what\'s measurable, ignoring dark data.',
    example: 'Your NPS survey goes to users who opened the app in the last 7 days. You get 42. But 40% of users haven\'t opened in 30 days — they\'d probably score you 10-15. Your real NPS is much lower.',
    tags: ['statistics', 'bias', 'research'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-12',
    concept: 'Jobs To Be Done',
    tldr: 'Users "hire" products to accomplish a specific job in their lives.',
    depth: 'JTBD reframes product design: instead of "who is this user" (demographics), ask "what job are they hiring this for." The same person might hire Uber for convenience at night but hire a rental car for a road trip — different jobs, different competitors. JTBD helps explain switching behavior.',
    example: 'People hire a milkshake for a morning commute job (thick, keeps them full, one-handed) — not as a dessert. Competitor is a banana, not a smoothie. Understanding the job reveals the right product decisions.',
    tags: ['product design', 'strategy', 'user research'],
    learnMore: 'product-design',
  },
  {
    id: 'brief-13',
    concept: 'Multiple Testing Problem',
    tldr: 'Run enough tests and you\'ll find a "significant" result by chance.',
    depth: 'At α=0.05, if you run 20 independent tests, you expect 1 false positive by chance. This is FWER (family-wise error rate). Solution: Bonferroni correction (divide α by number of tests), Benjamini-Hochberg (controls FDR), or pre-register your primary metric before peeking at results.',
    example: 'You test 10 button color variants. Color #7 hits p=0.04. Before shipping: how many colors did you test? At α=0.05 and 10 tests, you\'d expect a false positive 40% of the time (1-(0.95)^10). Color #7 is probably noise.',
    tags: ['statistics', 'multiple testing', 'experimentation'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-14',
    concept: 'Activation Metrics',
    tldr: 'The specific actions that predict whether a new user will become retained.',
    depth: 'Activation is the moment a user experiences the core value proposition. Facebook\'s "7 friends in 10 days" was their activation threshold — users who hit it were 3x more likely to be retained at 90 days. Your activation metric should be the minimum action that predicts retention, not just any usage.',
    example: 'Slack: sending a certain number of messages in week 1. Dropbox: uploading a file. Airbnb: completing your first booking. The key is finding the "aha moment" through cohort analysis — what did retained users do that churned users didn\'t?',
    tags: ['growth analytics', 'retention', 'product analytics'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-15',
    concept: 'Novelty Effect',
    tldr: 'Users engage with a new feature because it\'s new, not because it\'s better.',
    depth: 'Common A/B test trap: treatment shows +8% click rate for 2 weeks, you ship it, engagement returns to baseline. The treatment "won" only because of novelty. Mitigation: run tests longer, look at holdout tests over months, measure repeat usage vs first-touch.',
    example: 'A new UI layout test shows 12% more time spent in week 1. But users who were in the treatment group in weeks 3-4 (novelty worn off) showed only 1% more time. You should not have shipped on week-1 data alone.',
    tags: ['experimentation', 'a/b testing', 'bias'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-16',
    concept: 'Metric Trees',
    tldr: 'Decomposing a top-line metric into its multiplicative or additive components.',
    depth: 'Revenue = Users × Conversion Rate × ARPU. Each node can be further split. This is how you diagnose: "revenue dropped 10%" becomes "was it users? conversion? ARPU? which segment?" without metric trees you\'re guessing. North Star metrics should have a metric tree published for the team.',
    example: 'DAU dropped 5%. Metric tree: DAU = New users + Retained users + Resurrected users - Churned users. Drill: New users flat. Retained users down 8%. Resurrected flat. Root cause: a retention issue, not acquisition.',
    tags: ['metrics', 'product analytics', 'diagnosis'],
    learnMore: 'metrics',
  },
  {
    id: 'brief-17',
    concept: 'Confidence Intervals',
    tldr: 'A range of values that likely contains the true parameter — more useful than p-values alone.',
    depth: 'A 95% CI means: if you repeated the experiment 100 times, 95 CIs would contain the true value. It\'s NOT "95% chance the true value is in this range." CIs give you effect size + uncertainty together. A CI of [+0.1%, +3.2%] tells you more than p=0.02 alone.',
    example: 'Treatment: +1.5% conversion rate, 95% CI [+0.2%, +2.8%]. Interpretation: real effect, but the true lift could be as small as 0.2%. Worth shipping? Depends on implementation cost. Compare to CI [-0.3%, +3.3%] — null is in range, don\'t ship.',
    tags: ['statistics', 'experimentation', 'inference'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-18',
    concept: 'Growth Accounting',
    tldr: 'Decomposing user growth into New, Retained, Resurrected, and Churned users.',
    depth: 'MAU(t) = New(t) + Retained(t) + Resurrected(t) - Churned(t). This framework, from Andrew Chen/GrowthScience, lets you see whether growth comes from acquisition or retention. A product with high new user acquisition but low retention is a leaky bucket — you can\'t grow by adding more water.',
    example: 'MAU grew 5%: New +15%, Retained +2%, Resurrected +3%, Churned -15%. Growth is almost entirely acquisition-driven — retention is weak. Competing product: MAU grew 5% with Churned -5%, Retained +10% — far healthier compounding.',
    tags: ['growth analytics', 'retention', 'diagnosis'],
    learnMore: 'growth-analytics',
  },
  {
    id: 'brief-19',
    concept: 'Bayesian vs Frequentist Testing',
    tldr: 'Two different frameworks for interpreting experimental data with different tradeoffs.',
    depth: 'Frequentist (p-values): assumes a fixed true effect, asks "is data this extreme unlikely under null?" Bayesian: starts with a prior belief, updates with data, gives you "probability treatment is better." Bayesian is more intuitive for business decisions but requires choosing a prior. Frequentist is more standard but misinterpreted constantly.',
    example: 'Frequentist says: p=0.04, reject null. Bayesian says: 92% probability treatment > control, expected lift = 1.8%. The Bayesian framing lets you make expected-value decisions. If expected lift × traffic × revenue > cost of implementation → ship.',
    tags: ['statistics', 'experimentation', 'bayesian'],
    learnMore: 'stat-foundations',
  },
  {
    id: 'brief-20',
    concept: 'Instrumentation & Logging',
    tldr: 'The foundation of any analytics system — garbage in, garbage out.',
    depth: 'Most analytics failures are instrumentation failures. Key properties: completeness (every event logged), consistency (same event schema across platforms), timeliness (near-real-time for operational metrics), and immutability (don\'t backfill raw logs). Schema-on-write > schema-on-read for production pipelines.',
    example: 'You run an A/B test and the treatment group has 15% fewer logged events per user. That\'s not a real drop — it\'s a logging bug in the treatment code path. Always validate instrumentation before interpreting results.',
    tags: ['data engineering', 'analytics', 'fundamentals'],
    learnMore: 'stats',
  },
  {
    id: 'brief-21',
    concept: 'Practical vs Statistical Significance',
    tldr: 'A result can be statistically significant but too small to matter — or vice versa.',
    depth: 'With large samples, even a 0.001% conversion lift is statistically significant. But is it worth shipping? Practical significance depends on business context: implementation cost, opportunity cost, user experience tradeoff. Always report effect size (Cohen\'s d, relative lift) alongside p-values.',
    example: '+0.05% conversion rate on checkout, p=0.001, n=2M. Statistically significant. But at $50 AOV and 5% margin, that\'s $25K/year. If the change requires 2 engineering weeks, it\'s probably not worth it. Practical significance threshold depends on the team\'s cost structure.',
    tags: ['statistics', 'decision making', 'experimentation'],
    learnMore: 'stat-foundations',
  },
];

function getTodaysCase() {
  const pool = [
    { room: 'stats', id: 'stat01-pvalue-decision', title: 'p < 0.05. Ship it?', subtitle: 'Stats' },
    { room: 'rca', id: 'RCA01', title: 'Checkout Conversion Dropped Overnight', subtitle: 'RCA' },
    { room: 'metrics', id: 'M01', title: 'What Defines a Successful Search?', subtitle: 'Metrics' },
    { room: 'growth-analytics', id: 'GA01', title: "DAU Dropped 8% — What's Driving It?", subtitle: 'Growth' },
    { room: 'estimation', id: 'EST01', title: 'Uber Rides in NYC Right Now', subtitle: 'Estimation' },
    { room: 'behavioral', id: 'BEH01', title: 'Influence Without Authority', subtitle: 'Behavioral' },
    { room: 'cases', id: 'C01', title: 'Should We Launch Same-Day Delivery?', subtitle: 'Cases' },
    { room: 'stats', id: 'stat04-srm-first', title: 'Check This First.', subtitle: 'Stats' },
    { room: 'rca', id: 'RCA05', title: 'Revenue Up, Margin Down', subtitle: 'RCA' },
    { room: 'growth-analytics', id: 'GA04', title: '13% Purchase Conversion', subtitle: 'Growth' },
    { room: 'metrics', id: 'M05', title: 'Revenue vs GMV vs ARPU', subtitle: 'Metrics' },
    { room: 'estimation', id: 'EST03', title: 'Gmail Storage Used Daily', subtitle: 'Estimation' },
    { room: 'behavioral', id: 'BEH03', title: 'A Metric That Misled a Team', subtitle: 'Behavioral' },
    { room: 'cases', id: 'C02', title: 'Why Did Our Retention Fall?', subtitle: 'Cases' },
  ];
  const dayIndex = Math.floor(Date.now() / 86400000); // days since epoch
  return pool[dayIndex % pool.length];
}

function getLastVisited(roomKey) {
  const keyMap = {
    'stats': 'pal-stats-progress-v1',
    'metrics': 'pal-metrics-progress-v2',
    'rca': 'pal-rca-progress-v1',
    'cases': 'pal-cases-progress-v1',
    'growth-analytics': 'pal-growth-analytics-progress-v1',
    'behavioral': 'pal-behavioral-progress-v1',
    'estimation': 'pal-estimation-progress-v1',
    'stat-foundations': 'pal-stat-foundations-progress-v1',
  };
  const key = keyMap[roomKey];
  if (!key) return null;
  try {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    const timestamps = Object.values(data)
      .map(e => e.completedAt || e.lastCompletedAt)
      .filter(Boolean)
      .map(t => new Date(t).getTime());
    if (!timestamps.length) return null;
    const latest = Math.max(...timestamps);
    const daysAgo = Math.floor((Date.now() - latest) / 86400000);
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo}d ago`;
  } catch { return null; }
}

const ROLES = [
  { id: 'both', label: 'All rooms' },
  { id: 'ds',   label: 'Analytics' },
  { id: 'pm',   label: 'PM' },
];

function getSavedRole() {
  try { return localStorage.getItem('pal-role-toggle') || 'both'; } catch { return 'both'; }
}

function saveRole(role) {
  try { localStorage.setItem('pal-role-toggle', role); } catch {}
}

// Which nav IDs are prioritized for each role
const DS_ROOMS  = ['stats', 'metrics', 'design', 'review', 'rca', 'code', 'cases', 'product-design', 'prioritization'];
const PM_ROOMS  = ['product-design', 'prioritization', 'cases', 'review', 'metrics', 'rca', 'design', 'stats', 'code'];
const ALL_ROOMS = ['stats', 'metrics', 'design', 'review', 'rca', 'cases', 'code', 'product-design', 'prioritization'];

const todaysBrief = BRIEFS[Math.floor(Date.now() / 86400000) % BRIEFS.length];

export function Home({ onNavigate, onStartScenario }) {
  const [role, setRole] = useState(getSavedRole);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try { return !localStorage.getItem('pal-onboarded-v1'); } catch { return false; }
  });
  const [briefExpanded, setBriefExpanded] = useState(false); // collapsed by default

  function switchRole(r) {
    setRole(r);
    saveRole(r);
  }

  function dismissOnboarding() {
    localStorage.setItem('pal-onboarded-v1', '1');
    setShowOnboarding(false);
  }

  const rooms = [
    {
      id: 'stats', label: 'Stats Room', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)',
      tagline: 'A stakeholder makes a claim. Evaluate it against the evidence.',
      description: 'p-values, CIs, power, SRM, multiple testing, guardrails, novelty effects, SUTVA — each concept taught through structured claim evaluation. Senior analyst debrief after every answer.',
      meta: '8 modules · 4 free + 4 beta · Foundational → Senior',
      cta: 'Open Stats Room →',
      nav: 'stats',
    },
    {
      id: 'metrics', label: 'Metrics Room', color: 'var(--green)', bg: 'var(--green-bg)', border: 'var(--green-border)',
      tagline: 'Can you choose the right metric before the experiment runs?',
      description: 'Define the primary metric, diagnostic metrics, and guardrails for a product scenario. Catch proxy traps, gaming incentives, and circular definitions. Scored against a senior metric design standard.',
      meta: '6 cases · 2 free + 4 beta · Analyst → Senior',
      cta: 'Open Metrics Room →',
      nav: 'metrics',
    },
    {
      id: 'design', label: 'Design Room', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)',
      tagline: 'Can you design the test correctly before data exists?',
      description: 'Set the primary metric, randomization unit, guardrails, trust checks, and pre-committed decision rule. Scored across 4 dimensions against the senior analyst standard.',
      meta: '8 scenarios · Free + Beta · Analyst → Senior',
      cta: 'Open Design Room →',
      nav: 'design',
    },
    {
      id: 'review', label: 'Review Room', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)',
      tagline: 'Can you read the messy result honestly after it runs?',
      description: "SRM flags, guardrail breaches, conflicting metrics, business pressure. Make the ship, rollback, or investigate call — then see how a senior analyst read the same data.",
      meta: '12 scenarios · Free + Beta · Analyst → Staff',
      cta: 'Open Review Room →',
      nav: 'browser',
    },
    {
      id: 'rca', label: 'RCA Room', color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)',
      tagline: 'A metric moved. Can you diagnose why?',
      description: 'Step through a structured 5-stage root cause diagnosis: system check, decompose, segment, hypothesize, validate. Real product failure modes — payment bugs, catalog issues, cohort quality, notification fatigue.',
      meta: '6 cases · 2 free + 4 beta · Analyst → Senior',
      cta: 'Open RCA Room →',
      nav: 'rca',
    },
    {
      id: 'cases', label: 'Cases Room', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)',
      tagline: 'An exec asks a business question. Structure your answer.',
      description: '6-phase analysis: clarify the ask, define KPIs, form hypotheses, cut the data, choose methods, recommend. Ambiguous briefs with business pressure built in.',
      meta: '4 cases · 2 free + 2 beta · Analyst → Senior',
      cta: 'Open Cases Room →',
      nav: 'cases',
    },
    {
      id: 'product-design', label: 'Product Design Room', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)',
      tagline: 'Design a real product feature — from first principles.',
      description: 'PM-style product design questions from Spotify, Airbnb, Slack, LinkedIn, and more. Work through 5 phases: Clarify, Users, Goals, Solutions, Prioritize. Self-score against a senior PM model answer.',
      meta: '8 scenarios · 1 free + 7 beta · PM / DS-PM',
      badge: '✦ New',
      cta: 'Open Product Design Room →',
      nav: 'product-design',
    },
    {
      id: 'code', label: 'Code Room', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)',
      tagline: 'Write the query that proves your diagnosis.',
      description: 'Analytics SQL and Python in product context — not syntax drills. Each module presents a real product scenario (metric drop, experiment, margin question) and asks you to write the query or script that answers it.',
      meta: '6 modules · 1 free + 5 beta · SQL + Python · Analyst → Senior',
      badge: '✦ New',
      cta: 'Open Code Room →',
      nav: 'code',
    },
    {
      id: 'prioritization', label: 'Prioritization Room', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)',
      tagline: 'Stack-rank like a senior PM.',
      description: 'RICE scoring, effort–impact matrices, technical debt tradeoffs, stakeholder conflicts, OKR-level decisions — 6 scenarios from Spotify, Airbnb, Notion, Meta, Duolingo, and Stripe. Structured framework exercises with model answers.',
      meta: '6 scenarios · 1 free + 5 beta · PM · Intermediate → Advanced',
      badge: '✦ New',
      cta: 'Open Prioritization Room →',
      nav: 'prioritization',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem 5rem', width: '100%', boxSizing: 'border-box' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '680px', paddingTop: '2rem', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
          borderRadius: '20px', padding: '0.25rem 0.75rem',
          marginBottom: '1.75rem', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          Private Beta
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.12,
          marginBottom: '1.25rem',
          color: 'var(--text)',
        }}>
          You know the formulas.<br />
          <span style={{ color: 'var(--accent)' }}>Now practice the calls.</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          marginBottom: '0.6rem',
          maxWidth: '560px',
        }}>
          64 practice cases across nine rooms. Each one puts you in a real product scenario —
          messy data, stakeholder pressure, no clean answer — then shows you how a senior analyst or PM read it.
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
          For product analysts, data scientists, and PMs who already know the basics.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button
            onClick={() => onNavigate(role === 'pm' ? 'product-design' : 'stats')}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              letterSpacing: '-0.01em', boxShadow: 'var(--shadow)',
            }}
          >
            {role === 'pm' ? 'Start with Product Design →' : 'Start with Stats Room →'}
          </button>
          <button
            onClick={() => onNavigate('progress')}
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 500, fontSize: '0.92rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            New here? Try a guided path →
          </button>
        </div>
      </div>

      {/* ── Today section ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        {/* Section header */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-muted)',
          }}>Today</span>
        </div>

        {/* Drill + Brief side-by-side */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', flexWrap: 'wrap' }}>

          {/* ── Today's Case (drill) ── */}
          {(() => {
            const todaysCase = getTodaysCase();
            return (
              <div
                style={{ flex: '0 0 38%', minWidth: '200px', padding: '1rem 1.25rem', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 10, cursor: 'pointer' }}
                onClick={() => onNavigate(todaysCase.room, todaysCase.id)}
              >
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--yellow)', marginBottom: 4 }}>
                  ⚡ Today's Case
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{todaysCase.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{todaysCase.subtitle} Room</div>
              </div>
            );
          })()}

          {/* ── The Brief ── */}
          <div style={{
            flex: '1 1 55%', minWidth: '260px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent)',
            borderRadius: 10,
            padding: '1.1rem 1.25rem',
          }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 6 }}>
          📰 The Brief · Daily Concept
        </div>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
          {todaysBrief.concept}
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10, lineHeight: 1.5 }}>
          TL;DR: {todaysBrief.tldr}
        </div>

        {!briefExpanded && (
          <button
            onClick={() => setBriefExpanded(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 600,
              padding: 0, marginBottom: 4,
            }}
          >
            Read more ↓
          </button>
        )}

        {briefExpanded && (
          <div style={{ marginTop: 2 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
              {todaysBrief.depth}
            </p>
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '0.65rem 0.9rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '0.85rem',
            }}>
              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', marginRight: 4 }}>Example:</span>
              {todaysBrief.example}
            </div>
            <button
              onClick={() => setBriefExpanded(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-dim)', fontSize: '0.78rem', fontWeight: 500,
                padding: 0, marginBottom: 4,
              }}
            >
              Collapse ↑
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: 8 }}>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {todaysBrief.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.68rem', fontWeight: 600,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                color: 'var(--text-dim)', borderRadius: 4,
                padding: '0.1rem 0.45rem', letterSpacing: '0.02em',
              }}>
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => onNavigate(todaysBrief.learnMore)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 700,
              padding: 0, whiteSpace: 'nowrap',
            }}
          >
            Learn more →
          </button>
        </div>
          </div>{/* end Brief card */}
        </div>{/* end drill+brief flex row */}
      </div>{/* end Today section */}

      {/* ── Nine rooms ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        {/* Practice Rooms section header */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-muted)',
          }}>Practice Rooms</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div className="label-caps">Nine rooms. Nine judgment muscles.</div>
          {/* Role toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort by track:</span>
            <div style={{ display: 'flex', gap: '0.2rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.2rem' }}>
              {ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => switchRole(r.id)}
                  style={{
                    background: role === r.id ? 'var(--surface)' : 'none',
                    border: role === r.id ? '1px solid var(--border)' : '1px solid transparent',
                    borderRadius: '6px', padding: '0.25rem 0.65rem',
                    color: role === r.id ? 'var(--text)' : 'var(--text-muted)',
                    fontWeight: role === r.id ? 600 : 400, fontSize: '0.78rem',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    boxShadow: role === r.id ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.1s',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {role !== 'both' && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {role === 'ds'
              ? '↑ Sorted analytics-first — Stats, Metrics, Design, Review, RCA, and Code at the top.'
              : '↑ Sorted PM-first — Product Design, Prioritization, and Cases at the top.'}
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '0.65rem',
        }}>
          {(role === 'ds' ? [...rooms].sort((a, b) => DS_ROOMS.indexOf(a.nav) - DS_ROOMS.indexOf(b.nav))
            : role === 'pm' ? [...rooms].sort((a, b) => PM_ROOMS.indexOf(a.nav) - PM_ROOMS.indexOf(b.nav))
            : rooms
          ).map(room => (
            <div key={room.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.4rem 1.5rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                color: room.color, marginBottom: '0.5rem',
              }}>{room.label}</div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.45rem', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                {room.tagline}
              </h3>
              {/* description grows to fill available space, keeping meta+button anchored at bottom */}
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 0.85rem', flex: 1 }}>
                {room.description}
              </p>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginBottom: '0.45rem' }}>
                {room.meta}
              </div>
              {(() => {
                const lv = getLastVisited(room.nav);
                return lv ? (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.6rem', fontStyle: 'italic' }}>
                    Last visited: {lv}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.6rem', fontStyle: 'italic' }}>
                    Never visited
                  </div>
                );
              })()}
              <button
                onClick={() => onNavigate(room.nav)}
                style={{
                  background: room.color, color: '#fff', border: 'none',
                  borderRadius: 'var(--radius)', padding: '0.5rem 0.9rem',
                  fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                }}
              >
                {room.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Loop callout */}
        <div style={{
          marginTop: '0.65rem',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.75rem 1.2rem',
          fontSize: '0.8rem', color: 'var(--text-dim)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>◆</span>
          8 paired scenarios — design the test in Design Room, then review the result in Review Room. Stats modules link to both.
        </div>
      </div>

      {/* ── Why this is different ────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>Why this is different</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.65rem',
        }}>
          {[
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not a textbook statistics course',
              body: 'Concepts appear only when they affect a product decision. Inline reference cards for terms like SRM and p-value — surfaced in context, not upfront.',
            },
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not formula drills',
              body: "The gap isn't knowing the math. It's applying it when the readout is messy and the PM wants an answer today.",
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'The full analytics loop',
              body: 'Metric design → experiment design → statistical evaluation → result review → root cause → business framing. Six skills in one product.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Senior analyst debriefs',
              body: 'Every decision unlocks a full senior read: what the trap was, what you might have missed, and how to explain it to stakeholders.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Business pressure built in',
              body: 'Every scenario has a fictional company, a launch deadline, and a PM pushing for a quick answer. Judgment under realistic constraints.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'No AI grading, no free text',
              body: 'All scoring is pre-computed from structured choices. Consistent, instant, and works offline — no waiting for an LLM to grade your answer.',
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.1rem 1.2rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: item.signColor, lineHeight: 1 }}>{item.sign}</span>
                <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, flex: 1 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 44 playable items ──────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>64 playable items — what's inside</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.1rem',
          /* removed alignItems:'start' so grid rows equalize card heights */
        }}>
          {/* Stats */}
          <RoomList
            label="Stats Room · 8 Modules"
            labelColor="var(--blue-text)" labelBg="var(--blue-bg)" labelBorder="var(--blue-border)"
            items={[
              ['Free', 'p < 0.05. Ship it?', 'p-value'],
              ['Free', 'The 95% Confidence Trap', 'CI'],
              ['Free', 'We Ran It — Results Were Flat', 'power'],
              ['Free', 'The Uneven Split', 'SRM'],
              ['Beta', 'Five Wins, One Test', 'multiple testing'],
              ['Beta', 'Revenue Holds, Engagement Tanks', 'guardrails'],
              ['Beta', 'The Week-One Surge', 'novelty effect'],
              ['Beta', 'The Marketplace Spill', 'SUTVA'],
            ]}
            btnColor="var(--blue-text)"
            btnLabel="Open Stats Room →"
            onOpen={() => onNavigate('stats')}
          />
          {/* Metrics */}
          <RoomList
            label="Metrics Room · 6 Cases"
            labelColor="var(--green)" labelBg="var(--green-bg)" labelBorder="var(--green-border)"
            items={[
              ['Free', 'Search Success Rate', 'proxy trap'],
              ['Free', 'Activation Metric', 'checklist gaming'],
              ['Beta', 'Push Notification Health', 'open rate trap'],
              ['Beta', 'Marketplace Seller Quality', 'displacement'],
              ['Beta', 'Revenue Growth Metric', 'GMV vs NRR'],
              ['Beta', 'GenAI Support Bot', 'deflection≠resolution'],
            ]}
            btnColor="var(--green)"
            btnLabel="Open Metrics Room →"
            onOpen={() => onNavigate('metrics')}
          />
          {/* Review */}
          <RoomList
            label="Review Room · 12 Scenarios"
            labelColor="var(--accent)" labelBg="var(--accent-bg)" labelBorder="var(--accent-border)"
            items={[
              ['Free', 'The Checkout Trap', 'metric conflict'],
              ['Free', 'The Ghost Assignment', 'SRM'],
              ['Free', 'The Slow Tax', 'guardrail breach'],
              ['Free', 'The Week-Two Drop', 'novelty / peeking'],
              ['Beta', 'The Mobile Winners', 'HTE'],
              ['Beta', 'The Five Metrics Problem', 'multiple testing'],
              ['Beta', 'The Two-Sided Spill', 'SUTVA'],
              ['Beta', 'False Rigor', 'when not to test'],
              ['Beta', 'The Clickbait Ranking Win', 'proxy metric'],
              ['Beta', 'The Push Open Rate Trap', 'metric gaming'],
              ['Beta', 'The Seller Speed Spillover', 'marketplace'],
              ['Beta', 'The Checklist Completion Illusion', 'activation'],
            ]}
            btnColor="var(--accent)"
            btnLabel="Open Review Room →"
            onOpen={() => onNavigate('browser')}
          />
          {/* Design */}
          <RoomList
            label="Design Room · 8 Scenarios"
            labelColor="var(--teal)" labelBg="var(--teal-bg)" labelBorder="var(--teal-border)"
            items={[
              ['Free', 'Design the Checkout Test', 'metric selection'],
              ['Free', 'Design the Onboarding Assignment', 'rand. unit'],
              ['Beta', 'Design the Mobile Feature Test', 'pre-registration'],
              ['Beta', 'Design the Multi-Metric Launch', 'multiple testing'],
              ['Beta', 'Design the Search Ranking Test', 'proxy metric'],
              ['Beta', 'Design the Notification Timing Test', 'metric gaming'],
              ['Beta', 'Design the Seller Incentive Test', 'SUTVA'],
              ['Beta', 'Design the Onboarding Checklist Test', 'activation'],
            ]}
            btnColor="var(--teal)"
            btnLabel="Open Design Room →"
            onOpen={() => onNavigate('design')}
            footer="◆ All 8 paired with Review Room counterparts"
          />
          {/* RCA */}
          <RoomList
            label="RCA Room · 6 Cases"
            labelColor="var(--yellow)" labelBg="var(--yellow-bg)" labelBorder="var(--yellow-border)"
            items={[
              ['Free', 'Checkout Conversion Drop', 'payment bug'],
              ['Free', 'Zero-Result Search Spike', 'catalog ingestion'],
              ['Beta', 'Marketplace Cancellations', 'seller quality'],
              ['Beta', 'D7 Retention Drop', 'notification fatigue'],
              ['Beta', 'Revenue Up, Margin Down', 'mix shift'],
              ['Beta', 'GenAI Bot Escalation Spike', 'deflection proxy'],
            ]}
            btnColor="var(--yellow)"
            btnLabel="Open RCA Room →"
            onOpen={() => onNavigate('rca')}
          />
          {/* Cases */}
          <RoomList
            label="Cases Room · 4 Cases"
            labelColor="var(--purple)" labelBg="var(--purple-bg)" labelBorder="var(--purple-border)"
            items={[
              ['Free', 'Launch Same-Day Delivery?', 'ops expansion'],
              ['Free', 'Why Did Retention Fall?', 'metric decomp'],
              ['Beta', 'Replace Tier-1 Support with AI?', 'GenAI ROI'],
              ['Beta', 'Which Seller Segment to Incentivize?', 'segmentation'],
            ]}
            btnColor="var(--purple)"
            btnLabel="Open Cases Room →"
            onOpen={() => onNavigate('cases')}
          />
          {/* Product Design Room */}
          <RoomList
            label="✦ Product Design Room · 8 Scenarios · New"
            labelColor="var(--purple)" labelBg="var(--purple-bg)" labelBorder="var(--purple-border)"
            items={[
              ['Free', 'Spotify — Improve Podcast Discovery', 'product design'],
              ['Beta', 'Airbnb — Reduce Host Response Lag', 'marketplace'],
              ['Beta', 'Slack — Reduce Notification Fatigue', 'B2B / productivity'],
              ['Beta', 'Google Maps — Design for EV Drivers', 'utility / new segment'],
              ['Beta', 'LinkedIn — Improve Application Quality', 'two-sided platform'],
              ['Beta', 'DoorDash — Reduce Post-Order Cancellations', 'delivery ops'],
              ['Beta', 'Stripe — Help SMBs Understand Revenue', 'fintech / B2B'],
              ['Beta', 'Instagram — Help Creators Grow', 'social / creator economy'],
            ]}
            btnColor="var(--purple)"
            btnLabel="Open Product Design Room →"
            onOpen={() => onNavigate('product-design')}
            footer="5-phase open-ended framework · Self-scored with model PM answers"
          />

          <RoomList
            label="Code Room"
            labelColor="var(--teal)" labelBg="var(--teal-bg)" labelBorder="var(--teal-border)"
            items={[
              ['Free', 'Write a Funnel Query', 'SQL · funnel analysis'],
              ['Beta', 'Build a Retention Cohort Table', 'SQL · window functions'],
              ['Beta', 'Run an A/B Test Significance Check', 'Python · scipy.stats'],
              ['Beta', 'Implement CUPED Variance Reduction', 'Python · Pandas'],
              ['Beta', 'Detect a Sample Ratio Mismatch', 'SQL · chi-squared'],
              ['Beta', 'Decompose a Mix Shift', 'SQL · shift-share analysis'],
            ]}
            btnColor="var(--teal)"
            btnLabel="Open Code Room →"
            onOpen={() => onNavigate('code')}
            footer="Complete partial code → reveal model answer · SQL + Python tracks"
          />

          {/* Prioritization Room */}
          <RoomList
            label="✦ Prioritization Room · 6 Scenarios · New"
            labelColor="var(--purple)" labelBg="var(--purple-bg)" labelBorder="var(--purple-border)"
            items={[
              ['Free', 'Spotify — Feature Backlog Sprint Planning', 'RICE scoring'],
              ['Beta', 'Airbnb — Effort–Impact Matrix', '2×2 quick wins'],
              ['Beta', 'Notion — Technical Debt vs. New Features', 'velocity tax'],
              ['Beta', 'Meta — Growth vs. Safety Conflict', 'stakeholder negotiation'],
              ['Beta', 'Duolingo — OKR-Level Prioritization', 'north star tradeoffs'],
              ['Beta', 'Stripe — Platform vs. Feature Sequencing', 'time horizon decisions'],
            ]}
            btnColor="var(--purple)"
            btnLabel="Open Prioritization Room →"
            onOpen={() => onNavigate('prioritization')}
            footer="Framework exercises with model answers · RICE, 2×2, OKR, stakeholder conflict"
          />
        </div>
      </div>

      {/* ── Guided paths ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="label-caps">Guided paths — where to start</div>
          <button
            onClick={() => onNavigate('progress')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}
          >View all paths →</button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.65rem',
        }}>
          {learningPaths.map(path => (
            <div
              key={path.id}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate('progress')}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('progress'); } }}
              style={{
                background: 'var(--surface)', border: `1px solid ${path.border}`,
                borderRadius: 'var(--radius)', padding: '1rem 1.1rem',
                cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.1s',
              }}
            >
              <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: path.color, marginBottom: '0.35rem' }}>
                {path.sequence.length} items
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                {path.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {path.subtitle}
              </div>
              {path.outcome && (
                <div style={{ fontSize: '0.73rem', color: path.color, lineHeight: 1.5, marginTop: '0.55rem', fontStyle: 'italic', opacity: 0.9 }}>
                  {path.outcome}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer bar: social proof + email capture ───────────────────── */}
      <div style={{
        marginTop: '2.5rem',
        padding: '0.85rem 1.25rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        maxWidth: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        {/* Social proof numbers */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {[
            { n: '10', label: 'practice rooms' },
            { n: '150+', label: 'cases & modules' },
            { n: '20', label: 'interactive stat labs' },
            { n: 'Free', label: 'to start' },
          ].map(s => (
            <span key={s.label}><strong style={{ color: 'var(--text)', fontWeight: 800 }}>{s.n}</strong> {s.label}</span>
          ))}
        </div>

        {/* Compact email capture */}
        <a
          href="mailto:hello@productanalyticslab.com?subject=Notify me"
          style={{
            display: 'inline-block', padding: '0.45rem 1.1rem',
            background: 'var(--yellow)', color: '#000',
            fontWeight: 700, borderRadius: 'var(--radius)',
            textDecoration: 'none', fontSize: '0.82rem',
            whiteSpace: 'nowrap',
          }}
        >
          Get notified of new rooms →
        </a>
      </div>

      {/* ── Onboarding modal ───────────────────────────────────────────── */}
      {showOnboarding && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '2rem', maxWidth: 420, width: '90%', position: 'relative' }}>
            <button
              onClick={dismissOnboarding}
              style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1, padding: '0.2rem 0.4rem' }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Welcome to Product Analytics Lab
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              150+ practice cases for DS and PM interviews.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => { dismissOnboarding(); onNavigate('stat-foundations'); }}
                style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: '0.65rem 1rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}
              >
                I'm a Data Scientist →
              </button>
              <button
                onClick={() => { dismissOnboarding(); onNavigate('product-design'); }}
                style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.65rem 1rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}
              >
                I'm a Product Manager →
              </button>
              <button
                onClick={dismissOnboarding}
                style={{ background: 'none', color: 'var(--text-muted)', border: 'none', borderRadius: 'var(--radius)', padding: '0.5rem 1rem', fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
              >
                Explore on my own
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── RoomList card ────────────────────────────────────────────────────────────
// Fixed-height card (420px) with three non-overlapping zones:
//   1. Header — flex-shrink: 0
//   2. Scroll area — flex: 1; min-height: 0  ← the critical pair for flex overflow
//   3. Footer + CTA — flex-shrink: 0
//
// min-height: 0 overrides the flex default (auto) so the scroll area actually
// shrinks when the card is constrained, enabling overflow-y: auto to work.
// Scrollbar is hidden via .room-list-scroll CSS class (see index.css).
// Fade gradient is always rendered as a scroll affordance hint.

function RoomList({ label, labelColor, labelBg, labelBorder, items, btnColor, btnLabel, onOpen, footer }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '1.4rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
      height: '420px',  /* fixed card height — all 6 cards same size */
    }}>

      {/* ── Zone 1: Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem', flexShrink: 0,
      }}>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{label}</span>
        <span style={{
          fontSize: '0.58rem', fontWeight: 600, color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '4px', padding: '0.1rem 0.4rem', letterSpacing: '0.03em',
        }}>V3</span>
      </div>

      {/* ── Zone 2: Scroll area ── */}
      {/* flex:1 + min-height:0 is the required pair — without min-height:0   */}
      {/* the flex item refuses to shrink below content size and overflow:auto */}
      {/* never activates. position:relative contains the fade overlay.        */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <div
          className="room-list-scroll"
          style={{ overflowY: 'auto', height: '100%' }}
        >
          {items.map(([tier, title, concept], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 0',
              borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              fontSize: '0.82rem',
            }}>
              <span style={{
                fontSize: '0.58rem', fontWeight: 700,
                color: tier === 'Free' ? 'var(--accent)' : 'var(--teal)',
                background: tier === 'Free' ? 'var(--accent-bg)' : 'var(--teal-bg)',
                border: `1px solid ${tier === 'Free' ? 'var(--accent-border)' : 'var(--teal-border)'}`,
                borderRadius: '3px', padding: '0.08rem 0.3rem',
                whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>{tier}</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
              <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', fontSize: '0.72rem', flexShrink: 0 }}>{concept}</span>
            </div>
          ))}
        </div>
        {/* Subtle scroll-affordance fade — always rendered, pointer-events off */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2rem',
          background: 'linear-gradient(to bottom, transparent, var(--surface))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Zone 3: Footer note + CTA ── */}
      {footer && (
        <div style={{
          fontSize: '0.72rem', color: 'var(--accent)',
          marginTop: '0.65rem', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          {footer}
        </div>
      )}
      <button
        onClick={onOpen}
        style={{
          width: '100%',
          background: btnColor, color: '#fff', border: 'none',
          borderRadius: 'var(--radius)', padding: '0.55rem',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
          marginTop: '0.75rem', flexShrink: 0,
        }}
      >
        {btnLabel}
      </button>
    </div>
  );
}
