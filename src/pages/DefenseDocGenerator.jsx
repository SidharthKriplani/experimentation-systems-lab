import { useState } from 'react';

// ─── Case map: specific PAL cases per room, with skill tags ──────────────────
// Tags are matched against JD text to surface the most relevant cases.
const CASE_MAP = {
  'stat-foundations': [
    { id: 'sf01', title: 'Data Types & Measurement Levels', tags: ['data types', 'measurement', 'scale'] },
    { id: 'sf03', title: 'Variance & Standard Deviation', tags: ['variance', 'spread', 'standard deviation'] },
    { id: 'sf05', title: 'Hypothesis Testing & the Null', tags: ['hypothesis', 'null hypothesis', 'testing'] },
    { id: 'sf06', title: 'p-values, α, and Type I/II Errors', tags: ['p-value', 'alpha', 'type i error', 'type ii error'] },
    { id: 'sf07', title: 'Statistical Power & Sample Size', tags: ['power', 'sample size', 'underpowered'] },
    { id: 'sf08', title: 'Confidence Intervals', tags: ['confidence interval', 'ci', 'uncertainty'] },
    { id: 'sf09', title: 'A/B Testing End-to-End', tags: ['a/b test', 'ab test', 'experiment', 'randomization'] },
    { id: 'sf13', title: 'Experiment Designer', tags: ['experiment design', 'randomization unit', 'primary metric'] },
    { id: 'sf15', title: 'Simpson\'s Paradox', tags: ['simpson', 'paradox', 'segmentation', 'aggregation'] },
    { id: 'sf17', title: 'Multiple Testing', tags: ['multiple testing', 'bonferroni', 'fdr', 'family-wise'] },
    { id: 'sf19', title: 'Selection Bias', tags: ['selection bias', 'survivorship', 'sampling'] },
    { id: 'sf20', title: 'Practical vs Statistical Significance', tags: ['practical significance', 'effect size', 'business value'] },
  ],
  'stats': [
    { id: 'stat01-pvalue-decision', title: 'p < 0.05. Ship it?', tags: ['p-value', 'significance', 'decision'] },
    { id: 'stat02-ci-trap', title: 'The 95% Confidence Trap', tags: ['confidence interval', 'ci', 'uncertainty'] },
    { id: 'stat03-flat-results', title: 'We Ran It — Results Were Flat', tags: ['statistical power', 'sample size', 'underpowered', 'null result'] },
    { id: 'stat04-srm-first', title: 'The Uneven Split', tags: ['srm', 'sample ratio mismatch', 'trust checks', 'randomization'] },
    { id: 'stat05-multiple-testing', title: 'Five Wins, One Test', tags: ['multiple testing', 'false positive', 'bonferroni'] },
    { id: 'stat06-guardrails', title: 'Revenue Holds, Engagement Tanks', tags: ['guardrails', 'metric conflict', 'tradeoffs'] },
    { id: 'stat07-novelty', title: 'The Week-One Surge', tags: ['novelty effect', 'long-run', 'holdout'] },
    { id: 'stat08-sutva', title: 'The Marketplace Spill', tags: ['sutva', 'interference', 'network effects', 'marketplace'] },
  ],
  'metrics': [
    { id: 'M01', title: 'Search Success Rate', tags: ['search', 'proxy metric', 'success rate'] },
    { id: 'M02', title: 'Activation Metric Design', tags: ['activation', 'north star', 'aha moment', 'onboarding'] },
    { id: 'M03', title: 'Push Notification Health', tags: ['notifications', 'open rate', 'engagement', 'push'] },
    { id: 'M04', title: 'Marketplace Seller Quality', tags: ['marketplace', 'seller', 'supply quality', 'two-sided'] },
    { id: 'M05', title: 'Revenue vs GMV vs ARPU', tags: ['revenue', 'gmv', 'arpu', 'financial metrics'] },
    { id: 'M06', title: 'GenAI Support Bot', tags: ['genai', 'ai', 'deflection', 'resolution', 'support'] },
    { id: 'M07', title: 'Checkout Abandonment Rate', tags: ['checkout', 'conversion', 'abandonment', 'e-commerce'] },
    { id: 'M08', title: 'Content Feed Quality', tags: ['content', 'feed', 'ranking', 'relevance', 'recommendation'] },
  ],
  'rca': [
    { id: 'RCA01', title: 'Checkout Conversion Dropped Overnight', tags: ['checkout', 'conversion', 'payment', 'bug'] },
    { id: 'RCA02', title: 'Zero-Result Search Spike', tags: ['search', 'catalog', 'data pipeline', 'ingestion'] },
    { id: 'RCA03', title: 'Marketplace Cancellations Surge', tags: ['marketplace', 'cancellations', 'seller quality'] },
    { id: 'RCA04', title: 'D7 Retention Drop', tags: ['retention', 'notification', 'fatigue', 'cohort'] },
    { id: 'RCA05', title: 'Revenue Up, Margin Down', tags: ['revenue', 'margin', 'mix shift', 'unit economics'] },
    { id: 'RCA06', title: 'GenAI Bot Escalation Spike', tags: ['genai', 'ai', 'escalation', 'deflection'] },
    { id: 'RCA07', title: 'DAU Dropped 12% on iOS', tags: ['mobile', 'ios', 'platform', 'app store'] },
    { id: 'RCA08', title: 'Ad Revenue Collapsed', tags: ['ads', 'revenue', 'monetization', 'ctr'] },
  ],
  'growth-analytics': [
    { id: 'GA01', title: 'DAU Dropped 8% — What\'s Driving It?', tags: ['dau', 'growth accounting', 'decomposition'] },
    { id: 'GA02', title: 'Cohort Retention Analysis', tags: ['cohort', 'retention', 'd7', 'd30'] },
    { id: 'GA03', title: 'Funnel Drop-Off Investigation', tags: ['funnel', 'drop-off', 'conversion'] },
    { id: 'GA04', title: '13% Purchase Conversion — Good or Bad?', tags: ['conversion rate', 'benchmark', 'e-commerce'] },
    { id: 'GA05', title: 'LTV/CAC Health Check', tags: ['ltv', 'cac', 'unit economics', 'payback period'] },
    { id: 'GA06', title: 'Growth Accounting Decomposition', tags: ['growth accounting', 'new users', 'resurrection', 'churn'] },
  ],
  'cases': [
    { id: 'C01', title: 'Should We Launch Same-Day Delivery?', tags: ['business case', 'launch decision', 'ops', 'expansion'] },
    { id: 'C02', title: 'Why Did Retention Fall?', tags: ['retention', 'diagnosis', 'root cause', 'decomposition'] },
    { id: 'C03', title: 'Replace Tier-1 Support with AI?', tags: ['genai', 'ai', 'roi', 'cost reduction', 'support'] },
    { id: 'C04', title: 'Which Seller Segment to Incentivize?', tags: ['marketplace', 'segmentation', 'seller', 'incentive'] },
    { id: 'C05', title: 'International Expansion Decision', tags: ['expansion', 'market entry', 'strategy', 'localization'] },
    { id: 'C06', title: 'Build vs Buy Analytics Infrastructure', tags: ['build vs buy', 'infrastructure', 'data engineering', 'make or buy'] },
  ],
  'product-design': [
    { id: 'pd01', title: 'Improve Podcast Discovery (Spotify)', tags: ['discovery', 'recommendation', 'content', 'audio'] },
    { id: 'pd02', title: 'Reduce Host Response Lag (Airbnb)', tags: ['marketplace', 'host', 'supply', 'response time'] },
    { id: 'pd03', title: 'Reduce Notification Fatigue (Slack)', tags: ['notifications', 'b2b', 'productivity', 'fatigue'] },
    { id: 'pd04', title: 'Design for EV Drivers (Google Maps)', tags: ['navigation', 'ev', 'utility', 'new segment'] },
    { id: 'pd05', title: 'Improve Application Quality (LinkedIn)', tags: ['two-sided platform', 'hiring', 'application quality'] },
    { id: 'pd06', title: 'Reduce Post-Order Cancellations (DoorDash)', tags: ['delivery', 'cancellations', 'ops', 'reliability'] },
    { id: 'pd07', title: 'Help SMBs Understand Revenue (Stripe)', tags: ['fintech', 'b2b', 'smb', 'analytics'] },
    { id: 'pd08', title: 'Help Creators Grow (Instagram)', tags: ['social', 'creator', 'growth', 'content'] },
  ],
  'prioritization': [
    { id: 'pri01', title: 'Sprint Planning — RICE Scoring (Spotify)', tags: ['rice', 'sprint', 'backlog', 'scoring'] },
    { id: 'pri02', title: 'Effort-Impact Matrix (Airbnb)', tags: ['effort impact', 'quick wins', 'matrix', 'tradeoffs'] },
    { id: 'pri03', title: 'Technical Debt vs New Features (Notion)', tags: ['technical debt', 'velocity', 'feature vs debt'] },
    { id: 'pri04', title: 'Growth vs Safety Conflict (Meta)', tags: ['stakeholder conflict', 'ethics', 'growth vs safety'] },
    { id: 'pri05', title: 'OKR-Level Prioritization (Duolingo)', tags: ['okr', 'north star', 'strategic tradeoffs'] },
    { id: 'pri06', title: 'Platform vs Feature Sequencing (Stripe)', tags: ['platform', 'sequencing', 'time horizon', 'b2b'] },
  ],
  'behavioral': [
    { id: 'BEH01', title: 'Changing a PM\'s Mind with Data', tags: ['influence', 'data persuasion', 'stakeholder'] },
    { id: 'BEH03', title: 'A Metric That Misled a Team', tags: ['metrics', 'misleading data', 'honesty'] },
    { id: 'BEH05', title: 'Engineering Buy-In Without Escalation', tags: ['cross-functional', 'engineering', 'influence', 'communication'] },
    { id: 'BEH07', title: 'Pushing Back on a Bad Decision', tags: ['pushback', 'speaking up', 'leadership'] },
    { id: 'BEH10', title: 'Conflicting Priorities with Leadership', tags: ['conflict', 'leadership', 'prioritization', 'stakeholder management'] },
    { id: 'BEH15', title: 'Running an Analysis Under Pressure', tags: ['deadline', 'ambiguity', 'pressure', 'time constraint'] },
  ],
  'estimation': [
    { id: 'EST01', title: 'Uber Rides in NYC Right Now', tags: ['market sizing', 'ride-sharing', 'supply demand'] },
    { id: 'EST03', title: 'Gmail Storage Used Per Day', tags: ['storage', 'google', 'scale', 'data volume'] },
    { id: 'EST05', title: 'YouTube Uploads Per Day', tags: ['video', 'content', 'upload volume', 'scale'] },
    { id: 'EST07', title: 'Revenue of a Grocery Delivery App', tags: ['revenue estimation', 'e-commerce', 'delivery'] },
  ],
  'bi': [
    { id: 'bi01', title: 'Executive Dashboard Design', tags: ['dashboard', 'executive', 'reporting', 'kpi'] },
    { id: 'bi02', title: 'Attribution Modeling', tags: ['attribution', 'marketing', 'multi-touch', 'last click'] },
    { id: 'bi03', title: 'Data Storytelling for Non-Technical Stakeholders', tags: ['data storytelling', 'communication', 'visualization'] },
    { id: 'bi05', title: 'Self-Serve Analytics Design', tags: ['self-serve', 'bi tools', 'democratization'] },
  ],
  'browser': [
    { id: 'S01', title: 'The Checkout Trap', tags: ['metric conflict', 'checkout', 'tradeoff'] },
    { id: 'S04', title: 'The Week-Two Drop', tags: ['novelty', 'peeking', 'long-run'] },
    { id: 'S05', title: 'The Mobile Winners', tags: ['heterogeneous effects', 'segment', 'mobile'] },
    { id: 'S06', title: 'The Five Metrics Problem', tags: ['multiple testing', 'multiple metrics', 'false positive'] },
    { id: 'S09', title: 'The Clickbait Ranking Win', tags: ['proxy metric', 'long-term quality', 'engagement'] },
    { id: 'S10', title: 'The Push Open Rate Trap', tags: ['notification', 'open rate', 'metric gaming'] },
  ],
  'code': [
    { id: 'SQL01', title: 'Write a Funnel Query', tags: ['sql', 'funnel', 'conversion steps'] },
    { id: 'SQL02', title: 'Retention Cohort Table', tags: ['sql', 'cohort', 'retention', 'window functions'] },
    { id: 'PY01', title: 'A/B Test Significance Check', tags: ['python', 'scipy', 'statistical test', 'significance'] },
    { id: 'PY02', title: 'CUPED Variance Reduction', tags: ['python', 'cuped', 'variance reduction', 'pandas'] },
    { id: 'SQL03', title: 'Detect a Sample Ratio Mismatch', tags: ['sql', 'srm', 'chi-squared', 'experiment health'] },
    { id: 'SQL04', title: 'Decompose a Mix Shift', tags: ['sql', 'mix shift', 'decomposition', 'shift-share'] },
  ],
};

// ─── Interview question patterns by room ─────────────────────────────────────
const QUESTION_PATTERNS = {
  'stat-foundations': [
    'Explain statistical power to a PM who wants to cut the test short.',
    'Our test ran for 5 days — is that enough? Walk me through how you\'d evaluate it.',
    'What\'s the difference between Type I and Type II errors, and which one do you prioritize?',
    'We saw p=0.04. Can you explain what that means to a non-technical stakeholder?',
  ],
  'stats': [
    'Our A/B test shows p=0.04 after 3 days. The PM wants to ship. What do you do?',
    'Walk me through what a sample ratio mismatch is and how you\'d detect it.',
    'Our treatment improved revenue but hurt engagement. What\'s your recommendation?',
    'We ran 10 tests simultaneously. Three showed p<0.05. How many do you trust?',
    'How would you set the primary metric and guardrails for an experiment on checkout flow?',
  ],
  'metrics': [
    'How would you define the success metric for a new notification feature?',
    'Our CTR is up 15%. Is that a good result? What else would you check?',
    'Design the full metric framework for [feature] — primary, diagnostic, and guardrail metrics.',
    'What\'s the difference between a leading and lagging indicator? Give me an example.',
    'We\'re launching a marketplace feature — how do you balance buyer and seller metrics?',
  ],
  'rca': [
    'Revenue dropped 15% overnight. Walk me through your investigation.',
    'How do you distinguish between a data pipeline issue and a real product regression?',
    'Our DAU is down but MAU is flat. What does that tell you and how do you diagnose it?',
    'Describe a time you diagnosed a metric drop. What was your process?',
    'How do you decide when a drop is significant enough to investigate vs. noise?',
  ],
  'growth-analytics': [
    'How would you decompose a 10% drop in DAU?',
    'Walk me through how you\'d build a cohort retention analysis.',
    'Our month-over-month growth looks healthy but our cohort retention is declining. What\'s happening?',
    'What\'s LTV/CAC and how would you use it to guide acquisition spend decisions?',
    'How do you evaluate whether a product change improved long-term retention?',
  ],
  'cases': [
    'Should we launch this feature in India given the data I\'ll show you?',
    'Our retention dropped after a product change. Walk me through how you\'d analyze it.',
    'We\'re considering replacing human support agents with AI. How would you evaluate that decision?',
    'Given limited engineering resources, how would you prioritize this quarter\'s analytics roadmap?',
  ],
  'product-design': [
    'How would you improve the home feed for a social app with 100M MAU?',
    'Design a feature to reduce churn for a B2B SaaS product.',
    'How would you approach improving onboarding for a product where 60% of users churn in week 1?',
    'You\'re a PM at Airbnb. Host response time is declining. What do you build?',
    'How do you decide which user problem to solve first when you have 10 on the backlog?',
  ],
  'prioritization': [
    'Walk me through how you\'d prioritize a backlog of 20 features for next quarter.',
    'We have a conflict between shipping a growth feature vs. paying down tech debt. How do you decide?',
    'How would you handle a situation where leadership wants X but data suggests Y?',
    'Describe your framework for evaluating a build vs. buy decision.',
    'How do you prioritize when everything is P0?',
  ],
  'behavioral': [
    'Tell me about a time you used data to change someone\'s mind.',
    'Describe a situation where you had to push back on a stakeholder\'s request. What happened?',
    'How do you build trust with engineering teams you don\'t have authority over?',
    'Tell me about a time a metric you relied on turned out to be misleading.',
    'How do you handle ambiguity when the ask isn\'t clear and there\'s time pressure?',
  ],
  'estimation': [
    'How many Google searches happen per second?',
    'Estimate the storage Spotify needs for all its podcasts.',
    'How would you size the market for a new B2B analytics tool?',
    'Walk me through how you\'d estimate the revenue of a mid-size food delivery app.',
  ],
  'bi': [
    'How would you design an executive dashboard for a consumer app?',
    'Walk me through how you\'d explain a counterintuitive data finding to the CEO.',
    'What\'s your approach to self-serve analytics — what belongs in a dashboard vs. ad hoc?',
    'How do you choose between last-click and multi-touch attribution?',
  ],
  'browser': [
    'Our experiment shows +5% on revenue and -8% on NPS. What do you recommend?',
    'How do you handle business pressure to ship when results are borderline?',
    'Walk me through how you\'d present ambiguous A/B test results to leadership.',
    'When would you run an A/A test, and what would you do with the results?',
  ],
  'code': [
    'Write a SQL query to calculate 7-day retention by signup cohort.',
    'How would you detect a sample ratio mismatch using SQL?',
    'Write Python to run a two-sample t-test and report statistical significance.',
    'How would you implement CUPED variance reduction in a pandas dataframe?',
    'Write a query to compute DAU, WAU, MAU and stickiness from a raw events table.',
  ],
};

// ─── Keyword → room mapping ───────────────────────────────────────────────────
const KEYWORD_MAP = [
  { keywords: ['experiment', 'a/b test', 'ab test', 'hypothesis', 'statistical', 'significance', 'p-value', 'pvalue', 'p value', 'power', 'sample size', 'srm', 'sample ratio', 'guardrail', 'holdout', 'randomization', 'control group', 'treatment'], room: 'stats', label: 'Stats Room', weight: 0 },
  { keywords: ['stat foundation', 'statistics foundation', 'confidence interval', 'null hypothesis', 'type i', 'type ii', 'normal distribution', 'central limit', 'variance', 'standard deviation', 'distribution', 'inference', 'bayes', 'bayesian'], room: 'stat-foundations', label: 'Stat Foundations', weight: 0 },
  { keywords: ['metric', 'kpi', 'north star', 'measurement', 'dau', 'mau', 'wau', 'retention', 'engagement', 'activation', 'guardrail', 'proxy'], room: 'metrics', label: 'Metrics Room', weight: 0 },
  { keywords: ['growth', 'cohort', 'ltv', 'cac', 'funnel', 'acquisition', 'activation', 'stickiness', 'dau/mau', 'growth accounting', 'churned', 'resurrected', 'new users'], room: 'growth-analytics', label: 'Growth Analytics', weight: 0 },
  { keywords: ['root cause', 'rca', 'diagnose', 'investigate', 'spike', 'drop', 'anomaly', 'debug', 'triage', 'metric drop', 'regression'], room: 'rca', label: 'RCA Room', weight: 0 },
  { keywords: ['sql', 'python', 'query', 'data pipeline', 'etl', 'analytics engineering', 'pandas', 'spark', 'dbt', 'warehouse', 'window function', 'cte'], room: 'code', label: 'Code Room', weight: 0 },
  { keywords: ['product sense', 'product design', 'user research', 'pm role', 'product manager', 'feature design', 'roadmap', 'product strategy', 'ux', 'user experience', 'user journey'], room: 'product-design', label: 'PM Design Room', weight: 0 },
  { keywords: ['prioritization', 'rice', 'ice score', 'tradeoff', 'backlog', 'planning', 'effort impact', 'quick wins', 'okr', 'tech debt'], room: 'prioritization', label: 'Prioritization Room', weight: 0 },
  { keywords: ['behavioral', 'leadership', 'stakeholder', 'cross-functional', 'influence', 'communication', 'conflict', 'collaboration', 'executive', 'presenting', 'storytelling'], room: 'behavioral', label: 'Behavioral Room', weight: 0 },
  { keywords: ['estimation', 'fermi', 'market size', 'back of envelope', 'scale', 'how many', 'estimate', 'sizing'], room: 'estimation', label: 'Estimation Room', weight: 0 },
  { keywords: ['dashboard', 'bi', 'reporting', 'visualization', 'tableau', 'looker', 'attribution', 'data storytelling', 'self-serve', 'business intelligence'], room: 'bi', label: 'BI & Reporting', weight: 0 },
  { keywords: ['experiment review', 'review', 'readout', 'result interpretation', 'ship decision', 'rollback', 'launch decision', 'experiment result'], room: 'browser', label: 'Review Scenarios', weight: 0 },
];

// ─── Company signals → prep callout ──────────────────────────────────────────
const COMPANY_SIGNALS = [
  { names: ['meta', 'facebook', 'instagram', 'whatsapp'], note: 'Meta interviews are heavy on experimentation at scale, metric tradeoffs, and data-informed product decisions. Expect questions about running hundreds of simultaneous tests and handling metric conflicts across surfaces.' },
  { names: ['google', 'youtube', 'deepmind', 'alphabet'], note: 'Google interviews emphasize statistical rigor, large-scale SQL, and ambiguous open-ended questions. Expect a strong focus on data structures, query efficiency, and measuring quality at scale.' },
  { names: ['amazon', 'aws'], note: 'Amazon interviews heavily use the STAR format and Leadership Principles. Expect behavioral questions tied to specific principles, plus product sense questions framed around customer obsession.' },
  { names: ['airbnb'], note: 'Airbnb focuses on two-sided marketplace metrics, host/guest experience tradeoffs, and causal inference. Expect questions about measuring trust, quality, and supply-demand balance.' },
  { names: ['stripe', 'plaid', 'brex', 'ramp'], note: 'Fintech DS/PM roles focus on financial metrics, B2B product design, risk/fraud signals, and working with technical stakeholders. Expect precise metric definitions and SQL-heavy rounds.' },
  { names: ['netflix'], note: 'Netflix prioritizes A/B testing methodology, content quality metrics, and long-horizon retention analysis. Expect deep stats questions and nuanced discussions of what "engagement" really means.' },
  { names: ['spotify'], note: 'Spotify focuses on audio engagement metrics, creator/listener ecosystem balance, and recommendation quality. Expect product sense questions and metric design for a two-sided media platform.' },
  { names: ['uber', 'lyft', 'doordash', 'instacart'], note: 'Marketplace and gig economy companies focus on supply-demand balance, ops metrics, and driver/rider or restaurant/customer experience tradeoffs. Expect RCA and decomposition questions.' },
  { names: ['linkedin', 'twitter', 'x corp', 'snap', 'tiktok', 'bytedance'], note: 'Social/professional platforms focus on feed quality, engagement vs. meaningful metrics, creator monetization, and network effects. Expect nuanced discussions about what "active" really means.' },
  { names: ['shopify', 'etsy', 'ebay'], note: 'E-commerce platforms focus on seller/buyer marketplace metrics, conversion optimization, and GMV vs. margin tradeoffs. Expect both product sense and data deep-dives.' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeWeights(jdText) {
  const text = jdText.toLowerCase();
  return KEYWORD_MAP
    .map(entry => {
      const hits = entry.keywords.filter(k => text.includes(k)).length;
      return { ...entry, weight: hits };
    })
    .filter(e => e.weight > 0)
    .sort((a, b) => b.weight - a.weight);
}

function detectRole(jdText) {
  const text = jdText.toLowerCase();
  const dsSignals = ['data scientist', 'machine learning', 'statistical modeling', 'python', 'sql', 'experimentation', 'analytics', 'data analyst'];
  const pmSignals = ['product manager', 'product management', 'roadmap', 'stakeholder', 'strategy', 'user research', 'product owner'];
  const dsScore = dsSignals.filter(k => text.includes(k)).length;
  const pmScore = pmSignals.filter(k => text.includes(k)).length;
  const isStaff = ['staff', 'principal'].some(k => text.includes(k));
  const isSenior = ['senior', 'sr.', 'lead'].some(k => text.includes(k));
  const level = isStaff ? 'Staff' : isSenior ? 'Senior' : 'Mid-Level';
  if (dsScore > pmScore) return level + ' Data Scientist / Analyst';
  if (pmScore > dsScore) return level + ' Product Manager';
  return level + ' DS/PM (hybrid)';
}

function detectCompany(jdText) {
  const text = jdText.toLowerCase();
  for (const co of COMPANY_SIGNALS) {
    if (co.names.some(n => text.includes(n))) return co;
  }
  return null;
}

function getRecommendedCases(room, jdText) {
  const cases = CASE_MAP[room];
  if (!cases || !cases.length) return [];
  const text = jdText.toLowerCase();
  return cases
    .map(c => ({ ...c, score: c.tags.filter(t => text.includes(t)).length }))
    .sort((a, b) => b.score - a.score || 0)
    .slice(0, 3);
}

function getExpectedQuestions(weighted) {
  const seen = new Set();
  const questions = [];
  for (const entry of weighted.slice(0, 4)) {
    const pool = QUESTION_PATTERNS[entry.room] || [];
    if (pool.length === 0) continue;
    // Take top 2 questions per room, up to 6 total
    for (const q of pool.slice(0, 2)) {
      if (!seen.has(q) && questions.length < 6) {
        seen.add(q);
        questions.push({ q, room: entry.label });
      }
    }
  }
  return questions;
}

function buildStudyPlan(weighted, jdText) {
  const primary   = weighted.slice(0, 3);
  const secondary = weighted.slice(3, 5);
  const light     = weighted.slice(5);

  function topCases(roomEntry) {
    if (!roomEntry) return '';
    const cases = getRecommendedCases(roomEntry.room, jdText).slice(0, 2);
    if (!cases.length) return roomEntry.label;
    return cases.map(c => c.title).join(', ');
  }

  return [
    {
      day: 1, label: 'Day 1',
      theme: 'Primary Focus: ' + (primary[0] ? primary[0].label : 'Core Skills'),
      tasks: primary[0]
        ? ['Start with: ' + topCases(primary[0]), 'Focus on understanding the pattern before the answer — re-read the debrief', 'Write a 2-sentence takeaway for each case in your own words']
        : ['Review your highest-priority room', 'Complete 3 core cases', 'Note weak spots for Day 6 review'],
      tier: 'primary',
    },
    {
      day: 2, label: 'Day 2',
      theme: 'Primary Focus: ' + (primary[0] ? primary[0].label + ' (depth pass)' : 'Core Skills (continued)'),
      tasks: primary[0]
        ? ['Complete 2 more cases in ' + primary[0].label + ' you haven\'t tried', 'Attempt 1 case cold — no hints until you\'ve committed your answer', 'Review your Day 1 takeaways — any repeating patterns?']
        : ['Complete 3 more core cases', 'Attempt at least 1 case without hints', 'Self-assess: which concepts are still shaky?'],
      tier: 'primary',
    },
    {
      day: 3, label: 'Day 3',
      theme: primary[1] ? 'Primary Focus: ' + primary[1].label : 'Primary review + breadth',
      tasks: primary[1]
        ? ['Start with: ' + topCases(primary[1]), 'Map how ' + primary[1].label + ' connects to ' + (primary[0] ? primary[0].label : 'your first priority'), 'Write 1 STAR story from your own experience for this topic']
        : ['Revisit Day 1–2 cases you struggled with', 'Try a case from a secondary room', 'Write a STAR story for the core topic'],
      tier: 'primary',
    },
    {
      day: 4, label: 'Day 4',
      theme: (primary[2] ? primary[2].label : 'Cross-room depth') + ' + out-loud practice',
      tasks: primary[2]
        ? ['Start with: ' + topCases(primary[2]), 'Complete 2 more cases in ' + (primary[1] ? primary[1].label : 'your second priority'), '2-minute verbal explanation of each answer out loud — no notes']
        : ['Complete 3 cases mixing your top two rooms', 'Practice explaining each answer out loud', 'Identify your weakest case type so far'],
      tier: 'primary',
    },
    {
      day: 5, label: 'Day 5',
      theme: 'Secondary rooms: ' + (secondary.length > 0 ? secondary.map(s => s.label).join(' + ') : 'Breadth'),
      tasks: secondary.length > 0
        ? [
            'Complete 2 cases in ' + (secondary[0] ? secondary[0].label : 'first secondary room'),
            secondary[1] ? 'Complete 2 cases in ' + secondary[1].label : 'Breadth: complete 1 case in a room you haven\'t touched',
            'Connect: how do secondary skills appear in your primary role? Write 1 sentence.',
          ]
        : ['Complete 2 cases in each of your secondary topics', 'Write down how these connect to your primary strengths', 'Note any terminology gaps to review tonight'],
      tier: 'secondary',
    },
    {
      day: 6, label: 'Day 6',
      theme: 'Light coverage + cross-room challenge',
      tasks: light.length > 0
        ? [
            'Complete 1 case in each light-coverage room: ' + light.slice(0, 3).map(l => l.label).join(', '),
            'Complete 1 Challenges case combining ' + (primary[0] ? primary[0].label : 'your top room') + ' + ' + (secondary[0] ? secondary[0].label : 'a secondary skill'),
            'Review your lowest-rated cases from the week — which patterns keep tripping you up?',
          ]
        : ['Complete 1 case in each remaining room', 'Attempt a cross-room challenge', 'Review all missed rubric points from the week'],
      tier: 'light',
    },
    {
      day: 7, label: 'Day 7',
      theme: 'Full simulator run + weak-area review',
      tasks: [
        'Run the Interview Simulator timed — treat it like the real thing, no hints',
        'Re-attempt your 3 lowest-rated cases from the week cold',
        'Final check: can you explain your top 3 strengths and 2 growth areas in 90 seconds?',
      ],
      tier: 'review',
    },
  ];
}

const TIER_STYLE = {
  primary:   { color: 'var(--teal)',      bg: 'var(--teal-bg)',    border: 'var(--teal-border)',    label: 'Primary (30 min/day)' },
  secondary: { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',  border: 'var(--yellow-border)',  label: 'Secondary (20 min/day)' },
  light:     { color: 'var(--blue-text)', bg: 'var(--blue-bg)',    border: 'var(--blue-border)',    label: 'Light (10 min/day)' },
  review:    { color: 'var(--green)',     bg: 'var(--green-bg)',   border: 'var(--green-border)',   label: 'Full Review' },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function DefenseDocGenerator({ onBack, onNavigate }) {
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState(null);

  function handleGenerate() {
    if (!jdText.trim()) return;
    const weighted = computeWeights(jdText);
    const role = detectRole(jdText);
    const company = detectCompany(jdText);
    const plan = buildStudyPlan(weighted, jdText);
    const questions = getExpectedQuestions(weighted);

    const caseRecs = weighted.slice(0, 3).map(entry => ({
      room: entry.room,
      label: entry.label,
      cases: getRecommendedCases(entry.room, jdText),
    })).filter(r => r.cases.length > 0);

    setResult({ weighted, role, company, plan, questions, caseRecs });
  }

  function handleReset() {
    setResult(null);
    setJdText('');
  }

  const primary   = result ? result.weighted.slice(0, 3) : [];
  const secondary = result ? result.weighted.slice(3, 5) : [];
  const light     = result ? result.weighted.slice(5)    : [];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: '@media print { .no-print { display: none !important; } body { background: white; color: black; } .print-card { break-inside: avoid; border: 1px solid #ccc; margin-bottom: 8px; } }' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* Back button */}
        {onBack && (
          <button
            className="no-print"
            onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            ← Back
          </button>
        )}

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>🛡️</span>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: 2 }}>Prep Tools</div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>Defense Doc Generator</h1>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.5rem 0 0', maxWidth: 600, lineHeight: 1.6 }}>
            Paste a job description — get your personalized study plan, specific case recommendations, and the questions you\'re most likely to face.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div className="no-print">
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                Job Description
              </label>
              <textarea
                value={jdText}
                onChange={e => setJdText(e.target.value)}
                placeholder="Paste the full job description here — the more complete, the better the recommendations..."
                style={{ width: '100%', minHeight: 220, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
                Tip: include the full responsibilities and qualifications sections for best results.
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={!jdText.trim()}
              style={{ background: jdText.trim() ? 'var(--teal)' : 'var(--surface-2)', color: jdText.trim() ? 'white' : 'var(--text-dim)', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontSize: '0.95rem', fontWeight: 700, cursor: jdText.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
            >
              Generate Defense Doc →
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Action bar */}
            <div className="no-print" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', color: 'var(--teal)', borderRadius: 7, padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                🖨️ Print / Save PDF
              </button>
              <button onClick={handleReset} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 7, padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                ← New JD
              </button>
            </div>

            {/* ── Role detected ── */}
            <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: 4 }}>Role Detected</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.55 }}>
                <strong>{result.role}</strong>
                {primary.length > 0 && <span> — primary focus on <strong>{primary[0].label}</strong></span>}
                {primary.length > 1 && <span> and <strong>{primary[1].label}</strong></span>}
                {primary.length === 0 && <span>. Paste more of the JD for stronger signal.</span>}
              </div>
            </div>

            {/* ── Company callout ── */}
            {result.company && (
              <div style={{ background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 10, padding: '0.9rem 1.2rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--yellow)', marginBottom: 4 }}>Company Intel</div>
                <div style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.company.note}
                </div>
              </div>
            )}

            {/* ── Keyword signal chips ── */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Keyword Signals Detected</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {result.weighted.length === 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No strong signals found — paste a more complete JD for better results.</span>
                )}
                {primary.map(e => (
                  <span key={e.room} style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)', background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 20, padding: '0.25rem 0.7rem' }}>
                    {e.label} ({e.weight}) — Primary
                  </span>
                ))}
                {secondary.map(e => (
                  <span key={e.room} style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 20, padding: '0.25rem 0.7rem' }}>
                    {e.label} ({e.weight}) — Secondary
                  </span>
                ))}
                {light.map(e => (
                  <span key={e.room} style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--blue-text)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)', borderRadius: 20, padding: '0.25rem 0.7rem' }}>
                    {e.label} ({e.weight}) — Light
                  </span>
                ))}
              </div>
            </div>

            {/* ── Recommended cases ── */}
            {result.caseRecs.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>Start With These Cases</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: '0.65rem' }}>
                  {result.caseRecs.map(rec => (
                    <div key={rec.room} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: 6 }}>{rec.label}</div>
                      {rec.cases.map((c, i) => (
                        <div
                          key={c.id}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                            padding: '0.35rem 0',
                            borderBottom: i < rec.cases.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                          }}
                        >
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', flexShrink: 0, paddingTop: 2, fontFamily: 'monospace' }}>{c.id}</span>
                          {onNavigate ? (
                            <button
                              className="no-print"
                              onClick={() => onNavigate(rec.room)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 600, fontSize: '0.83rem', padding: 0, textAlign: 'left', lineHeight: 1.4 }}
                            >
                              {c.title} →
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', fontWeight: 600, lineHeight: 1.4 }}>{c.title}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Questions to expect ── */}
            {result.questions.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>Questions to Prepare For</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {result.questions.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 4, padding: '0.15rem 0.4rem', whiteSpace: 'nowrap', flexShrink: 0, marginTop: 1 }}>
                        {item.room}
                      </span>
                      <span style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item.q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 7-day plan ── */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>7-Day Study Plan</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '0.75rem' }}>
                {result.plan.map(day => {
                  const cfg = TIER_STYLE[day.tier] || TIER_STYLE.primary;
                  return (
                    <div key={day.day} className="print-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.1rem', borderTop: '3px solid ' + cfg.color }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>{day.label}</span>
                        <span style={{ fontSize: '0.66rem', fontWeight: 600, color: cfg.color, background: cfg.bg, border: '1px solid ' + cfg.border, borderRadius: 4, padding: '0.1rem 0.4rem' }}>{cfg.label}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal)', marginBottom: '0.55rem', lineHeight: 1.35 }}>{day.theme}</div>
                      <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                        {day.tasks.map((task, i) => (
                          <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '0.25rem' }}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <div style={{ padding: '0.85rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              💡 As you complete cases, your{' '}
              {onNavigate ? (
                <button className="no-print" onClick={() => onNavigate('progress')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--teal)', fontWeight: 600, fontSize: '0.83rem', padding: 0 }}>Progress page</button>
              ) : (
                <span style={{ color: 'var(--teal)', fontWeight: 600 }}>Progress page</span>
              )}{' '}
              will show which rooms need more attention. Revisit this generator if your target role or company changes.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
