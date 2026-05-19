import { useState } from 'react';
import { PostDetail } from '../components/playbook/PostDetail.jsx';

// THE PLAYBOOK — Learn layer
// Framework articles + sourced real interview questions, each linked to practice room items
// relatedItems maps directly to room scenario/module IDs for one-click launch

// relatedItems: [{ label, room, id }]
// room values: 'stats' | 'metrics' | 'design' | 'review' | 'rca' | 'cases'

const POSTS = [

  // ══════════════════════════════════════════════════════════════════
  // METRICS & KPIs
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'denominator-discipline',
    category: 'Metrics',
    title: 'Denominator Discipline: Why Every Rate Metric Is Lying to You',
    summary: 'CVR from sessions vs users vs PDP viewers are three different numbers. Locking the denominator first is the single habit that separates junior from senior metric thinking — and the first thing interviewers test.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
      { label: 'The Push Open Rate Trap', room: 'review', id: 's10' },
    ],
    content: [
      { type: 'text', text: 'A product manager walks into a weekly review and says "checkout conversion is up 4%." The engineer nods. The designer smiles. Nobody asks what "conversion" was divided by. Six months later, leadership wonders why the metric keeps moving in apparently random ways — because three different teams have been tracking three different denominators and calling them all "conversion rate."\n\nEvery rate metric is a fraction. The numerator gets all the attention. The denominator determines everything.' },
      { type: 'heading', text: 'The Same Product, Three Different Conversion Rates' },
      { type: 'text', text: 'Consider a checkout flow. You can calculate "conversion rate" three ways:' },
      { type: 'list', items: [
        'Completions / Total Sessions → 3.2%',
        'Completions / Sessions that reached the cart → 22.1%',
        'Completions / Sessions with at least one item in cart → 31.4%',
      ]},
      { type: 'text', text: 'None of these is wrong. But they answer completely different questions. The first measures overall checkout efficiency. The second measures purchase intent efficiency. The third measures near-close efficiency. Using any of them interchangeably in a presentation destroys your credibility.' },
      { type: 'callout', label: 'The rule', text: 'Before reporting any rate metric, state: "This is X out of Y, where Y means..." out loud. Every. Single. Time.' },
      { type: 'heading', text: 'Where It Goes Wrong in Interviews' },
      { type: 'text', text: 'The typical failure mode: an interviewer asks "what metric would you use to measure checkout health?" and the candidate says "conversion rate." The interviewer then asks "conversion rate of what?" and the candidate says "…purchases divided by visits."\n\nThe interviewer wants the denominator conversation — not as a gotcha, but because misaligned denominators between teams cause months of confusion in real product work. Naming yours first signals seniority.' },
      { type: 'heading', text: 'Denominator Choices That Change the Insight' },
      { type: 'list', items: [
        'Push notification CTR: Opens / Sent vs Opens / Delivered vs Opens / Shown-in-tray — all different numbers with different implications for deliverability vs creative quality',
        'Search conversion: Purchases / Queries vs Purchases / Queries-with-results vs Purchases / Clicked-results — the last one isolates ranking quality from inventory quality',
        'Activation rate: Activated users / New signups vs Activated users / New signups-who-completed-onboarding — very different if onboarding completion itself is broken',
      ]},
      { type: 'heading', text: 'The Denominator Move in an RCA' },
      { type: 'text', text: 'When a rate metric drops, the denominator can move independently of the numerator. If "search CVR" fell 10%, ask: did purchases fall, did queries rise, or both? A marketing campaign that drove lower-intent traffic would increase your denominator without changing your numerator — making CVR fall without the product doing anything wrong.' },
      { type: 'callout', label: 'Senior habit', text: 'When diagnosing any rate metric drop, always decompose: (1) did the numerator move? (2) did the denominator move? (3) did both move? Only then form hypotheses.' },
    ],
    keyTakeaways: [
      'Every rate metric is a fraction — the denominator defines what the metric actually measures, and it\'s usually the part that\'s left undefined.',
      'Three valid "conversion rates" on the same product can be 3%, 22%, and 31% — none wrong, all measuring different things.',
      'In RCA: a rate drop can mean the numerator fell, the denominator rose, or both — decompose them independently before hypothesizing.',
      'Senior move: state your denominator explicitly before anyone asks. "Checkout CVR = completions ÷ sessions with at least one cart item."',
      'Misaligned denominators between teams cause months of confusion. Agreeing on them is a core alignment task, not a technical detail.',
    ],
    references: [
      { label: 'Lean Analytics — Croll & Yoskovitz', note: 'Chapter 2 covers the denominator problem in startup and growth metric selection' },
      { label: 'The One Metric That Matters — GrowthHackers', url: 'https://growthhackers.com/articles/the-one-metric-that-matters', note: 'Practical framing for picking a single, well-defined primary metric with a clear denominator' },
    ],
  },
  {
    id: 'five-metric-types',
    category: 'Metrics',
    title: 'The 5 Metric Types Every Product Analyst Must Know Cold',
    summary: 'North star, diagnostic, guardrail, proxy, composite. Know the role of each, when to reach for which, and how to articulate the hierarchy to a PM without jargon.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Revenue Growth Metric', room: 'metrics', id: 'm05' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
    ],
    content: [
      { type: 'text', text: 'Most analysts can define a metric. Senior analysts know what job a metric is being hired to do.\n\nThose are very different things. A metric that\'s excellent as a north star becomes dangerous as a guardrail. A proxy that\'s valid in a two-week experiment can mislead you in a six-month strategy review. The role a metric plays determines how you use it in an experiment, how you weight it in a decision, and how you defend it when a stakeholder challenges you.' },
      { type: 'framework_box', label: 'The 5 Types', items: [
        '1. North Star — the one metric that best represents the long-term value your product delivers',
        '2. Diagnostic — metrics that explain why the north star moved (or didn\'t)',
        '3. Guardrail — metrics you commit to not harming, regardless of north star movement',
        '4. Proxy — short-run observable stand-ins for long-run outcomes you can\'t measure in an experiment window',
        '5. Composite — weighted combinations of multiple metrics (e.g., a quality score or health index)',
      ]},
      { type: 'heading', text: 'North Star' },
      { type: 'text', text: 'The north star is not revenue (usually). Revenue is a lagging outcome. The north star is what drives revenue over time: for Spotify it\'s time spent listening, for Airbnb it\'s nights booked with high guest satisfaction, for LinkedIn it\'s professional connections made. It should be measurable, causally connected to revenue, and not gameable without delivering real value.' },
      { type: 'heading', text: 'Diagnostic' },
      { type: 'text', text: 'Diagnostics are the decomposed components of your north star. If "weekly active users" is the north star, diagnostics are: new user activation rate, reactivation rate, and retention rate. When the north star moves, diagnostics tell you which lever moved. Without diagnostics, you know something changed but not where to act.' },
      { type: 'heading', text: 'Proxy' },
      { type: 'text', text: 'You can\'t measure 6-month retention in a 2-week experiment. But you can measure D7 retention and use it as a proxy. The risk: the proxy relationship can break. If you change the new user experience, D7 retention may become a worse predictor of D180 retention because the cohorts are now structurally different. Name this assumption explicitly when using a proxy.' },
      { type: 'heading', text: 'Composite' },
      { type: 'text', text: 'Composite metrics (quality scores, health scores) simplify complexity into one number. They\'re dangerous because the weights are arbitrary and small changes in weighting produce different conclusions. In interviews, prefer explicit named metrics over composites unless the composite is an industry standard (CSAT, NPS).' },
      { type: 'callout', label: 'Interview application', text: 'When asked to define metrics for any product, name at least one of each: north star, diagnostic, and guardrail. That structure instantly signals senior thinking.' },
    ],
    keyTakeaways: [
      'North star, diagnostic, guardrail, proxy, composite — every metric you track is playing one of these five roles, whether you name it or not.',
      'The north star is not revenue — it\'s what causally drives revenue: listening time, bookings with satisfaction, professional connections made.',
      'Diagnostics decompose the north star: when it moves, they tell you which lever changed so you know where to act.',
      'Proxy metrics are bets on a correlation — name the assumption explicitly, because the relationship can break when you change the product.',
      'In any interview metrics question: name at least one north star, one diagnostic, and one guardrail — that three-layer structure signals senior thinking instantly.',
    ],
    references: [
      { label: 'The North Star Framework — Amplitude', url: 'https://amplitude.com/blog/north-star-metric', note: 'The clearest practical guide to north star metric selection and the diagnostic tree beneath it' },
      { label: 'North Star Metric Deep Dive — Lenny Rachitsky', url: 'https://www.lennysnewsletter.com/p/north-star-metric', note: 'How top companies (Spotify, Airbnb, Duolingo) define and defend their north star metrics' },
    ],
  },
  {
    id: 'guardrails',
    category: 'Metrics',
    title: 'Guardrails: The Metrics Nobody Asks For That You Must Track Anyway',
    summary: 'A rising CVR with a rising refund rate is not a win. Guardrails prevent you from optimizing one thing into the ground while ignoring what breaks downstream.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Guardrail Conflict (Stats)', room: 'stats', id: 'stat06' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
    content: [
      { type: 'text', text: 'A guardrail is a metric you don\'t optimize for but commit to not harming. The experiment won\'t ship if the guardrail degrades beyond a threshold, even if the north star improves.' },
      { type: 'heading', text: 'Why Guardrails Exist' },
      { type: 'text', text: 'Product teams optimize for a primary metric. Without guardrails, the fastest path to improving the primary metric often involves harming something else. A clickbait recommendation improves CTR but degrades content quality and long-term retention. Without a guardrail rule pre-committed, the team ships the clickbait and calls it a win.' },
      { type: 'callout', label: 'Real example', text: 'GMV is up 4% but return rate is up 12%. This is not a ship. The 4% GMV gain will be partially reversed by return costs, and the long-term trust impact is negative. A pre-committed return rate guardrail would have caught this before it shipped.' },
      { type: 'heading', text: 'How to Choose Guardrails' },
      { type: 'list', items: [
        'Cover downstream consequences: if optimizing for engagement, guardrail on satisfaction/content quality',
        'Cover the other side of the marketplace: if optimizing for buyer metrics, guardrail on seller metrics',
        'Cover long-term vs short-term: if optimizing for activation, guardrail on D30 retention',
        'Cover system health: guardrail on latency and error rates for any product feature',
      ]},
      { type: 'heading', text: 'Setting Thresholds' },
      { type: 'text', text: 'A guardrail with no threshold is not a guardrail — it\'s an observation. Commit before the experiment starts: "Refund rate must not increase more than 2% relative." This forces the decision rule to be explicit and prevents post-hoc rationalization ("it was only 3%, not so bad").' },
      { type: 'heading', text: 'When North Star and Guardrail Conflict' },
      { type: 'text', text: 'North star improved, guardrail degraded. There is no universal rule — it depends on magnitude and business context. The default in most teams: guardrail violation blocks ship, requires root cause investigation before proceeding. The key move is to name this as a tradeoff explicitly and escalate to product leadership rather than making the call solo.' },
    ],
    keyTakeaways: [
      'A guardrail is a metric you commit to not harming — the experiment doesn\'t ship if the guardrail degrades beyond a threshold, even with a positive north star.',
      'Without pre-committed thresholds, guardrails are just observations — "not so bad" rationalization fills the vacuum.',
      'Cover downstream consequences, the other side of the marketplace, long-term outcomes, and system health when choosing guardrails.',
      'When north star improves and guardrail degrades: quantify both in the same unit (dollars, rate points) before making any recommendation.',
      'Never make a guardrail conflict call solo — name it as a tradeoff and escalate to PM and leadership with the math attached.',
    ],
    references: [
      { label: 'Guardrail Metrics and Experimentation — Airbnb Engineering', url: 'https://medium.com/airbnb-engineering/designing-experimentation-guardrails-ed6a976ec669', note: 'How Airbnb\'s data science team designs and operationalizes guardrail metric systems' },
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 7 covers guardrail metric frameworks and multi-metric decision making' },
    ],
  },
  {
    id: 'game-proof-north-star',
    category: 'Metrics',
    title: 'How to Game-Proof Your North Star Metric',
    summary: 'Every metric can be gamed. The senior move is naming exactly how — and designing the guardrail that catches it before a stakeholder does.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Checklist Completion Illusion', room: 'review', id: 's12' },
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
    ],
    content: [
      { type: 'text', text: 'If you can\'t name how your north star metric can be gamed, you don\'t fully understand it. Every metric has attack vectors — ways to move the number without delivering real value. Naming them is not pessimism; it\'s the credibility check that makes stakeholders trust your analysis.' },
      { type: 'heading', text: 'Why Metrics Get Gamed' },
      { type: 'text', text: 'Teams optimize what gets measured. If DAU is the north star, the fastest path to DAU gains might be daily push notification barrages that bring users back without giving them value. The metric goes up; user trust erodes. In interviews, pointing this out before being asked is the senior move.' },
      { type: 'framework_box', label: 'Game-Proofing Checklist', items: [
        '1. Name the primary attack vector: how can this metric be inflated without delivering value?',
        '2. Design the guardrail that catches it: what downstream metric would reveal the gaming?',
        '3. Define a threshold: at what guardrail deviation do you investigate?',
        '4. Check for denominator gaming: can the denominator be shrunk to inflate the rate?',
        '5. Audit seasonality: can the metric be "gamed" by timing launches around natural peaks?',
      ]},
      { type: 'heading', text: 'Classic Attack Vectors by Metric Type' },
      { type: 'list', items: [
        'DAU: Gaming with empty push notifications. Guardrail: D7 retention, session length per user',
        'Search CTR: Gaming with clickbait titles. Guardrail: purchase rate, search refinement rate',
        'Activation rate: Gaming with trivial checklist completion. Guardrail: activation-to-D7-retention rate',
        'NPS: Gaming by surveying only power users. Guardrail: random sampling rule + response rate monitoring',
      ]},
      { type: 'callout', label: 'Interview application', text: 'When proposing a north star, immediately name one guardrail and explain which attack vector it defends against. Interviewers at senior levels specifically probe this — and candidates who wait to be asked look reactive, not strategic.' },
    ],
  },
  {
    id: 'gmv-vs-revenue',
    category: 'Metrics',
    title: 'GMV vs Revenue vs ARPU vs LTV: When to Use Which',
    summary: 'These are not interchangeable. Using GMV when you mean revenue costs you credibility in senior interviews and stakeholder meetings.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Revenue Growth Metric (GMV vs NRR)', room: 'metrics', id: 'm05' },
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
    ],
    content: [
      { type: 'text', text: 'Four numbers that analysts regularly conflate: GMV, Revenue, ARPU, LTV. Each measures a fundamentally different slice of the business. Using the wrong one in a presentation or interview signals that you don\'t understand the business model you\'re analyzing.' },
      { type: 'framework_box', label: 'The Four Definitions', items: [
        'GMV (Gross Merchandise Value): Total value of transactions flowing through the platform — before the platform takes its cut. Measures economic activity, not what the company earns.',
        'Revenue: What the company actually keeps — typically take rate × GMV, or subscription fees, or ad revenue. This is the P&L line.',
        'ARPU (Average Revenue Per User): Revenue / active users over a period. Measures revenue efficiency per user base.',
        'LTV (Lifetime Value): Expected total revenue from a user over their entire relationship with the product. Requires retention assumptions and discount rate.',
      ]},
      { type: 'heading', text: 'When to Use Each' },
      { type: 'list', items: [
        'GMV: When you want to measure the size of the market you facilitate or the health of supply-demand matching. Common for marketplace health.',
        'Revenue: When you\'re evaluating business sustainability, unit economics, or margin discussions.',
        'ARPU: When comparing efficiency across time periods, cohorts, or product lines.',
        'LTV: When justifying acquisition spend (CAC:LTV ratio) or forecasting long-term business value.',
      ]},
      { type: 'callout', label: 'The classic mistake', text: '"We grew 20% this quarter" — GMV or revenue? For a marketplace like Airbnb, GMV could grow while revenue falls if the take rate was reduced. Always specify which measure you\'re reporting and why it\'s the right one for the question being asked.' },
    ],
  },
  {
    id: 'metric-grain',
    category: 'Metrics',
    title: 'Metric Grain: The Most Underrated Concept in Product Analytics',
    summary: 'Grain defines what one row represents. Getting it wrong means your aggregations are silently incorrect. Most analysts never explicitly state it.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: 'Grain is the answer to the question: "what does one row in this dataset represent?" One row = one order. One row = one user-day. One row = one session. Getting this wrong silently corrupts your aggregations, and most analysts never explicitly state it — which is exactly how errors hide for weeks.' },
      { type: 'callout', label: 'The grain rule', text: 'Before writing any query or building any metric, state the grain out loud: "The grain of this table is one row per [user / session / order / event]. I need a metric at [user / session] grain, so I\'ll [aggregate / deduplicate] at that level."' },
      { type: 'heading', text: 'Why Grain Errors Are Silent' },
      { type: 'text', text: 'A grain error doesn\'t throw an error in SQL — it produces a plausible but wrong number. Classic example: joining a user table (grain: one row per user) to an orders table (grain: one row per order) without aggregating first produces one row per order, inflating your user count to match order count. Every aggregate after that is wrong.' },
      { type: 'example', label: 'Silent error: wrong join', text: `-- WRONG: user count is inflated by orders
SELECT COUNT(u.user_id) AS users
FROM users u
JOIN orders o ON u.user_id = o.user_id
-- Returns: one row per order, not per user

-- RIGHT: deduplicate before aggregating
SELECT COUNT(DISTINCT u.user_id) AS users
FROM users u
JOIN orders o ON u.user_id = o.user_id` },
      { type: 'heading', text: 'Grain Check Before Every Query' },
      { type: 'list', items: [
        'What is the grain of each source table I\'m using?',
        'What grain do I need my output at?',
        'At which join or aggregation step does the grain change?',
        'Am I using COUNT vs COUNT DISTINCT correctly at each step?',
      ]},
    ],
  },
  {
    id: 'proxy-metrics',
    category: 'Metrics',
    title: 'Proxy Metrics: When to Use Them, When They Betray You',
    summary: 'Open rate is not engagement. Deflection is not resolution. Proxy metrics are necessary but dangerous — here\'s how to propose them with the right caveats.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
      { label: 'GenAI Support Bot', room: 'metrics', id: 'm06' },
      { label: 'The Push Open Rate Trap', room: 'review', id: 's10' },
    ],
    content: [
      { type: 'text', text: 'You can\'t always measure what you actually care about in the window of an experiment. Long-term retention can\'t be measured in 2 weeks. Lifetime value can\'t be measured in a quarter. Proxy metrics are shorter-term, more observable signals used as stand-ins. They\'re necessary — and dangerous.' },
      { type: 'heading', text: 'When Proxies Are Valid' },
      { type: 'text', text: 'A proxy is valid if it has a strong, stable, causal relationship with the outcome you actually care about. D7 retention predicts D30 retention reasonably well in a stable product. But validity is not permanent: if you redesign onboarding or add a new channel, the proxy relationship can weaken without you noticing.' },
      { type: 'callout', label: 'The validation requirement', text: 'Before using a proxy in a ship decision, confirm the relationship: does improving this proxy in past experiments actually correlate with downstream outcome improvements? If not, you\'re optimizing a signal that doesn\'t predict what you care about.' },
      { type: 'heading', text: 'When Proxies Betray You' },
      { type: 'list', items: [
        'Push open rate as engagement: User opens to dismiss → open rate up, engagement down',
        'Search clicks as search quality: Clicking a result doesn\'t mean it was a good result',
        'Deflection rate for support bot as resolution: Bot may deflect without actually resolving the issue',
        'Profile completion as activation: Users complete profiles without ever using core product value',
      ]},
      { type: 'heading', text: 'How to Propose a Proxy Correctly' },
      { type: 'text', text: '"I\'m using X as a proxy for Y because [causal mechanism]. The risk is [specific way proxy can decouple from outcome]. To validate, I\'d [check correlation in historical experiments / complement with a longer-term follow-up analysis]." That framing shows you understand what you\'re sacrificing.' },
    ],
  },
  {
    id: 'metric-trees',
    category: 'Metrics',
    title: 'How to Build a Metric Tree From Any North Star',
    summary: 'A metric tree decomposes your north star into its multiplicative or additive drivers. Build one correctly and you can locate any lever. Build it wrong and your RCA will miss the real cause.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
    content: [
      { type: 'text', text: 'A metric tree decomposes your north star into the levers that drive it. When the north star moves, the tree tells you which lever moved. Without a tree, an RCA is a guessing game. With one, it\'s a structured elimination.' },
      { type: 'heading', text: 'Building a Metric Tree' },
      { type: 'text', text: 'Start with your north star. Then ask: what mathematical components multiply or add to produce it? Revenue = sessions × CVR × AOV. Each of those has sub-components: CVR = add-to-cart rate × checkout completion rate × payment success rate. Keep going until every leaf node is a directly measurable metric.' },
      { type: 'example', label: 'Example: E-commerce Revenue Tree', text: 'Revenue\n├── Sessions\n│   ├── Organic traffic\n│   ├── Paid traffic\n│   └── Direct / returning\n├── CVR (conversions / sessions)\n│   ├── Add-to-cart rate\n│   ├── Cart-to-checkout rate\n│   └── Payment success rate\n└── AOV (revenue / conversions)\n    ├── Items per order\n    └── Average item price' },
      { type: 'callout', label: 'The key property', text: 'Every node must be either a multiplicative or additive combination of its children. The math must hold. If you can\'t write the formula, you haven\'t decomposed it correctly.' },
      { type: 'heading', text: 'Using the Tree in an RCA' },
      { type: 'text', text: 'Revenue dropped 8%. Check each branch: sessions flat, CVR fell (3.2% → 2.9%), AOV flat. Now go into CVR\'s sub-tree: which funnel step fell? Checkout completion rate dropped from 78% to 65%. You now have a specific, localized problem instead of a 20-hypothesis list — and you got there in 3 minutes.' },
      { type: 'heading', text: 'What Makes a Bad Metric Tree' },
      { type: 'list', items: [
        'Overlapping branches: A user counted in multiple branches means the math doesn\'t hold',
        'Incorrect grain: Revenue at order level, sessions at user level — mixing grains breaks the tree',
        'Missing leaf nodes: A branch that doesn\'t decompose to something queryable is useless in an actual RCA',
      ]},
    ],
  },
  {
    id: 'activation-metrics',
    category: 'Metrics',
    title: 'Activation Metrics: The Most Important Metric Nobody Defines Properly',
    summary: 'When is a new user actually activated? Checklist completion isn\'t it. The right activation metric predicts long-term retention — here\'s how to find it.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
      { label: 'Onboarding Checklist Test', room: 'review', id: 's12' },
    ],
    content: [
      { type: 'text', text: 'Activation is the moment when a new user first experiences the core value of your product. The activation metric is how you measure whether that moment happened. Getting this right is one of the hardest problems in product analytics — and one of the most common interview topics.' },
      { type: 'heading', text: 'The Wrong Definition' },
      { type: 'text', text: 'Activation ≠ onboarding completion. Completing a profile setup or tutorial is compliance with your flow, not experience of value. The question is: did the user experience the thing your product exists to deliver? For a music app: played a song and listened for more than 30 seconds — not just pressed play.' },
      { type: 'callout', label: 'How to find the real activation event', text: 'Look at users who retained at D30 and trace back to their first week. What action(s) did they take that churned users didn\'t? That action is your activation metric candidate.' },
      { type: 'heading', text: 'The Empirical Method' },
      { type: 'text', text: 'Take a new user cohort. Label them retained at D30 or churned. For every candidate activation event (first search, first purchase, first follow), calculate: what % of D30-retained users completed this in their first 7 days vs churned users? The event with the highest differential predictive power is your activation metric candidate.' },
      { type: 'heading', text: 'Real-World Examples' },
      { type: 'list', items: [
        'Facebook (reported internally): Adding 7 friends within 10 days → strong D30 retention predictor',
        'Slack: 2,000 messages sent within a team → correlated with ongoing adoption',
        'Twitter: Following 30 accounts in first week → D30 return predictor',
        'Airbnb: First completed booking (not just search) → downstream retention tied to booking quality',
      ]},
      { type: 'heading', text: 'The Interview Frame' },
      { type: 'text', text: '"Activation should be the event most predictive of long-term retention — not just the first meaningful action. I\'d run a cohort analysis on retained vs churned users to identify which first-week event has the highest differential. My hypothesis for this product is [X] because it represents the first moment a user gets the core value: [state it explicitly]."' },
    ],
  },
  {
    id: 'dau-mau-ratio',
    category: 'Metrics',
    title: 'DAU/MAU: What It Measures and When It Misleads',
    summary: 'High DAU/MAU signals habit. But the ratio compresses cohort differences and can look healthy while retention collapses. When to trust it and when to decompose it.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop (Notification Fatigue)', room: 'rca', id: 'rca04' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: 'DAU/MAU measures stickiness — what proportion of your monthly user base engages every day. A ratio of 1.0 means all MAUs are also DAUs (perfect daily habit). Most healthy consumer apps target 0.20–0.50. A news app and a shopping app should have very different targets — news is daily habit, shopping is not.' },
      { type: 'heading', text: 'What It Actually Measures' },
      { type: 'text', text: 'DAU/MAU is a frequency metric, not an engagement quality metric. It tells you how often people come back, not what they do when they arrive. Benchmarking across product categories is usually misleading. A marketplace at 0.15 might be healthier than a social app at 0.25 — depends entirely on the intended use frequency.' },
      { type: 'callout', label: 'The compression problem', text: 'DAU/MAU compresses cohort differences. New users have lower DAU/MAU because they haven\'t established habit yet. If you\'re acquiring users aggressively, MAU grows, new users pull down the ratio — even if your existing user cohorts are perfectly healthy. A flat or falling DAU/MAU can look like a product problem when it\'s actually an acquisition mix shift.' },
      { type: 'heading', text: 'When DAU/MAU Is Misleading' },
      { type: 'list', items: [
        'Rapid new user acquisition: New cohort volume grows MAU faster than DAU',
        'Seasonality: Holiday shopping spike = MAU surge, DAU unchanged → ratio falls, product is fine',
        'Segment heterogeneity: Power users pull up the ratio and can mask problems in median user experience',
        'Activity definition changes: If "active" redefined, both numerator and denominator affected differently',
      ]},
      { type: 'heading', text: 'What to Do Instead' },
      { type: 'text', text: 'Decompose DAU/MAU by signup cohort. Plot the ratio for users who signed up 0-30 days ago vs 30-90 days vs 90+ days. This immediately separates new user habit formation from established user behavior. You can identify whether the drop is in a specific cohort (suggesting an acquisition problem) or universal (suggesting a product regression).' },
    ],
  },
  {
    id: 'take-rate',
    category: 'Metrics',
    title: 'Take Rate in Marketplace Analytics: The Metric That Hides Compression',
    summary: 'Take rate = revenue / GMV. A rising take rate on falling GMV is a warning sign most analysts miss.',
    readMin: 3,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
    ],
    content: [
      { type: 'text', text: 'Take rate is the platform\'s cut of transaction value: Revenue / GMV. For a marketplace charging sellers a 10% commission, take rate = 10%. It sounds simple. But take rate is one of the most diagnostically rich metrics for understanding marketplace health — and it\'s where many analysts stop too early.' },
      { type: 'callout', label: 'Formula', text: 'Take Rate = Revenue / GMV. A 10% take rate means for every $100 in goods/services transacted, the platform keeps $10. Changes to take rate can come from pricing changes, product mix shifts, or promotional discounts to sellers.' },
      { type: 'heading', text: 'What Rising Take Rate Can Hide' },
      { type: 'list', items: [
        'GMV compression: Revenue grew 5% via take rate increase, but GMV fell 10% — sellers are transacting less',
        'Mix shift: High-take-rate product lines growing faster than low-take-rate ones inflates average take rate without pricing action',
        'Promotional pullback: Removing seller fee waivers appears as take rate increase, not pricing action',
      ]},
      { type: 'heading', text: 'The Double-Axis Analysis' },
      { type: 'text', text: 'Never report take rate alone. Report it alongside GMV volume. A rising take rate on rising GMV is pricing power. A rising take rate on flat or falling GMV is extraction — the platform is charging more per transaction as sellers transact less. The second pattern predicts seller churn before it shows up in GMV.' },
    ],
  },
  {
    id: 'metric-ownership',
    category: 'Metrics',
    title: 'Metric Ownership: Formula, Grain, Numerator, Denominator — All Four, Always',
    summary: 'You cannot have a metric conversation until all four are locked. This is what metric ownership means in practice.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
    ],
    content: [
      { type: 'text', text: 'Metric ownership means you can answer four questions without hesitation: What is the formula? What is the grain? What exactly is the numerator? What exactly is the denominator? Until all four are explicit, you don\'t own the metric — you have a rough idea of a metric.' },
      { type: 'framework_box', label: 'The Four Ownership Components', items: [
        '1. Formula: The mathematical expression. "Search CVR = purchases / searches" is not sufficient — see below.',
        '2. Grain: What does one row in the underlying data represent? User-day? Session? Search query?',
        '3. Numerator: Exactly what qualifies as a "purchase"? Completed orders only? Including returns? Within what time window?',
        '4. Denominator: Exactly what qualifies as a "search"? All queries? Only queries with results? Only queries by logged-in users?',
      ]},
      { type: 'heading', text: 'Why All Four Matter' },
      { type: 'text', text: 'In a product review, when the PM says "search CVR dropped 3%" and you say "our search CVR held flat" — and you\'re both right — it means your denominator definitions are different. One of you is including zero-result queries; the other isn\'t. This wastes 30 minutes of a stakeholder meeting. Locking all four components before a metric is named in a doc prevents this.' },
      { type: 'callout', label: 'Interview test', text: 'When you propose any metric in an interview, immediately state all four: "Search CVR = purchases (completed, non-refunded, same session) / search queries with at least one result returned, at session grain, for logged-in users on mobile." That completeness signals metric ownership.' },
    ],
  },
  {
    id: 'marketplace-liquidity',
    category: 'Metrics',
    title: 'Marketplace Liquidity: The Metric That Predicts Marketplace Health Before GMV Moves',
    summary: 'Liquidity measures whether buyers can find what they want and sellers can find buyers. It leads GMV by weeks — here\'s how to track and interpret it.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
    content: [
      { type: 'text', text: 'Liquidity is the probability that a transaction can complete when a buyer and seller are both present. A liquid marketplace: buyer searches → finds relevant supply → completes transaction. An illiquid marketplace: buyer searches → few or poor matches → leaves without transacting. Low liquidity leads GMV decline by weeks.' },
      { type: 'framework_box', label: '5 Liquidity Signals', items: [
        '1. Fill rate: % of searches/requests that result in a transaction — the most direct liquidity proxy',
        '2. Time-to-match: How long from search to transaction. Rising = supply thinning or pricing mismatch',
        '3. Search zero-result rate: % of queries returning no supply — direct signal of supply gaps',
        '4. Buyer-to-active-seller ratio: If this rises fast, supply isn\'t keeping up with demand growth',
        '5. Repeat search rate: Users searching twice for the same thing means first results were inadequate',
      ]},
      { type: 'heading', text: 'Reading Liquidity Before GMV Moves' },
      { type: 'text', text: 'GMV is a lagging indicator. Buyers who don\'t find what they need today don\'t show up in GMV decline until next week (when they\'ve tried a competitor). Liquidity signals — especially fill rate and zero-result rate — show up immediately when supply thins. This is why senior marketplace analysts monitor liquidity daily and GMV weekly.' },
      { type: 'callout', label: 'Leading indicator', text: 'If zero-result rate increases by 3pp over two weeks and fill rate falls 5pp, expect GMV to decline in the following 1-2 weeks even if current GMV looks fine. Build the alert on fill rate, not on GMV.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // ROOT CAUSE ANALYSIS
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'cdshv-framework',
    category: 'RCA',
    title: 'CDSHV: The Step-by-Step RCA Framework That Beats Guessing',
    summary: 'Context → Decompose → Segment → Hypothesize → Validate. Five stages that keep your RCA structured when pressure is high and data is ambiguous.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
    content: [
      { type: 'text', text: 'It\'s 9am on a Tuesday. Your PM messages you: "Checkout conversion dropped 8% overnight. Do you know why?" You feel the pressure. You want to say something smart and reassuring immediately. So you say: "Could be a payment bug, or maybe the UX change that shipped yesterday, or possibly a traffic quality issue from the new campaign..."\n\nThat list of guesses — however confident it sounds — is not analysis. It\'s the analyst equivalent of shrugging with extra steps. The CDSHV framework is what separates a real investigation from reassuring-sounding noise.' },
      { type: 'framework_box', label: 'The CDSHV Framework', items: [
        'C — Context: What happened, when, how big, is this expected?',
        'D — Decompose: Break the metric into its component parts (numerator / denominator, funnel steps)',
        'S — Segment: Cut by platform, geography, user cohort, traffic source, feature version',
        'H — Hypothesize: Only now form hypotheses — ranked by data volume and reversibility',
        'V — Validate: Confirm with a second query or corroborating signal from a different source',
      ]},
      { type: 'heading', text: 'Why Order Matters' },
      { type: 'text', text: 'Jumping to hypotheses before decomposing is the most common interview mistake. If you hypothesize before decomposing, you create a list of guesses with no structure for elimination. The decomposition step is what narrows the space logically rather than by intuition.' },
      { type: 'callout', label: 'Key rule', text: 'Never form a hypothesis before you\'ve decomposed the metric and cut it by at least two segments. Everything before that is confirmation bias waiting to happen.' },
      { type: 'heading', text: 'C — Context First (The Step Everyone Skips)' },
      { type: 'text', text: 'Before touching data, get calibrated. Is this drop relative to yesterday, last week, or the same weekday last period? Is it in absolute terms or percentage? What changed recently — deployments, campaigns, seasonality, data pipeline? A drop that started Tuesday at 2pm is almost always a deployment. One that started after a marketing campaign is attribution, not product.' },
      { type: 'heading', text: 'D — Decompose: The Math Must Hold' },
      { type: 'text', text: 'Conversion rate = completions / visitors. If CVR fell, either completions fell, visitors rose, or both. Start here — before platform cuts, before feature hypotheses. The decomposition tells you which part of the math moved. If completions fell but visitors held, you\'re looking at a funnel problem. If visitors spiked, it might be traffic composition.' },
      { type: 'heading', text: 'S — Segment: The Aggregate Is Always Hiding Something' },
      { type: 'text', text: 'Cut by: platform (iOS/Android/web), geography (country, region), user cohort (new vs existing), traffic source (organic vs paid vs referral), product variant (if mid-experiment). You\'re looking for where the drop is concentrated. A 10% overall drop that is 40% for Android but 0% for iOS is almost certainly a deployment or OS-compatibility bug.' },
      { type: 'heading', text: 'H — Hypothesize: Ranked, Not Listed' },
      { type: 'text', text: 'By the time you reach H, your segment cuts have already pointed at a suspect. List hypotheses ranked by: (1) volume of affected users, (2) data availability to validate, (3) reversibility if confirmed. The most common mistake here is treating all hypotheses as equally likely.' },
      { type: 'callout', label: 'Interview tip', text: 'When listing hypotheses, always add: "this would affect X% of users and I can validate it by looking at Y." That shows you\'re thinking about prioritization, not just enumeration.' },
      { type: 'heading', text: 'V — Validate: Second Signal Required' },
      { type: 'text', text: 'One query is not enough. The standard is: one query identifies the candidate, a second corroborates from a different source. For a checkout drop, if your funnel query shows a drop at the payment step, corroborate with payment success rate from the payments table — confirming the same signal independently.' },
    ],
    keyTakeaways: [
      'CDSHV: Context → Decompose → Segment → Hypothesize → Validate — five stages that eliminate guessing from root cause analysis.',
      'Context first: timing (deployment? holiday?), magnitude, and comparison window — these often rule out the problem before you touch data.',
      'Decomposition narrows the hypothesis space mathematically before you form a single guess.',
      'Segmentation reveals where a drop is concentrated — a 10% overall drop that\'s 40% Android is a deployment bug, not a product problem.',
      'Validate with two independent signals: one query to identify, one to corroborate from a different source.',
    ],
    references: [
      { label: 'Root Cause Analysis in Product Data Science — Airbnb Engineering', url: 'https://medium.com/airbnb-engineering/', note: 'Airbnb\'s internal RCA principles adapted for product data science' },
      { label: 'A Structured RCA Approach — Towards Data Science', url: 'https://towardsdatascience.com/', note: 'Practical walkthroughs of decomposition-first RCA for product metrics' },
    ],
  },
  {
    id: 'decompose-before-diagnose',
    category: 'RCA',
    title: 'Decompose Before You Diagnose',
    summary: 'Listing hypotheses before decomposing is the most common RCA mistake. The order matters more than the hypotheses themselves.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
    ],
    content: [
      { type: 'text', text: '"Checkout conversion dropped 8%. What are your hypotheses?" Most people immediately list causes: payment bug, UX issue, pricing change, competitor. This is the wrong order. Hypotheses before decomposition is analytical theater — it looks like thinking but it\'s guessing.' },
      { type: 'heading', text: 'Why Order Matters' },
      { type: 'text', text: 'Decomposition narrows the hypothesis space mathematically. Once you decompose and find the drop is entirely at the payment step (not add-to-cart, not cart-to-checkout), you\'ve eliminated 70% of your hypothesis list before writing a single query. Not smarter — more efficient.' },
      { type: 'callout', label: 'The rule', text: 'In any RCA, decompose the metric mathematically before forming any hypothesis. The decomposition output tells you which branch of the math moved. Only then rank hypotheses — based on what the decomposition showed, not what feels intuitive.' },
      { type: 'heading', text: 'Decomposition Patterns' },
      { type: 'list', items: [
        'Funnel decomposition: Which step in the conversion funnel lost conversion rate?',
        'Numerator / denominator split: Did the numerator fall, denominator rise, or both?',
        'Additive decomposition: If metric = A + B, which component fell?',
        'Ratio identity: If metric = X/Y × Y/Z, which ratio changed?',
      ]},
      { type: 'heading', text: 'The Right Answer in Practice' },
      { type: 'text', text: 'Interviewer asks about a CVR drop. Wrong answer: "My hypotheses are UX bug, pricing, traffic quality." Right answer: "First, I\'d decompose CVR into funnel steps — add-to-cart rate, cart-to-checkout rate, payment completion — to identify which step fell. Then I\'d cut by platform and geography to find concentration. Only after that would I form specific hypotheses."' },
    ],
  },
  {
    id: 'segment-before-aggregate',
    category: 'RCA',
    title: 'The Aggregate Is Always Hiding Something',
    summary: 'A flat aggregate is a weighted average of segment movements. Platform, cohort, and time-pattern cuts first — every single time.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
    ],
    content: [
      { type: 'text', text: 'The aggregate is a weighted average. A flat aggregate is segment movements that net to zero. A falling aggregate is segments where the negative outweighs the positive. Diagnosing the aggregate directly means trying to find one cause for multiple things happening simultaneously.' },
      { type: 'heading', text: 'The Pattern' },
      { type: 'text', text: 'Retention fell 3% overall. Cut by platform: iOS fell 2%, Android fell 8%, Web grew 4%. The 3% decline is an average of three different stories. Diagnosing the aggregate, you\'re trying to explain one number that is actually three different problems averaged together. The real cause is the Android regression.' },
      { type: 'callout', label: 'The standard cuts', text: 'For any metric movement: (1) platform / device, (2) geography / market, (3) user cohort (new vs returning, signup period), (4) feature version (if experiment running), (5) traffic source (organic vs paid vs referral). Do all five before forming hypotheses.' },
      { type: 'heading', text: 'Simpson\'s Paradox Edge Case' },
      { type: 'text', text: 'Simpson\'s Paradox: the aggregate moves in one direction while all individual segments move the opposite direction. Happens when the mix of segments changes and segments have different baseline values. A treatment improves CVR for both experienced and new users — but the mix shifts toward new users (lower baseline CVR), so aggregate CVR falls. The treatment was a win in both segments but looks like a loss overall.' },
      { type: 'heading', text: 'The Interview Move' },
      { type: 'text', text: '"Revenue fell 5%, why?" — the first sentence of your answer should not be a hypothesis. It should be: "I\'d first cut this by platform, geography, and user cohort to identify where the concentration is before forming hypotheses." Then name the two or three most likely segment patterns and what each would imply.' },
    ],
  },
  {
    id: 'mix-shift',
    category: 'RCA',
    title: 'Mix Shift: The Hidden Cause Behind Half Your Metric Movements',
    summary: 'Revenue grew but margin fell. CVR improved but GMV didn\'t. Mix shift causes movements that look wrong until you understand the composition change underneath.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'Mix shift is one of the most common causes of metric movements that look paradoxical. It happens when the composition of your user population (or traffic mix, product mix, order mix) changes — and that change alone moves an aggregate metric, even if nothing changed for any individual segment.' },
      { type: 'heading', text: 'The Classic Example' },
      { type: 'text', text: 'Revenue grew 8% month-over-month. But average order value fell 5%. How? New user cohorts (acquired in a growth push) have lower AOV than existing users. The mix of new vs existing users shifted toward lower-AOV new users, pulling down the average — even though both cohorts\' individual AOV was stable or growing.' },
      { type: 'callout', label: 'The tell', text: 'When your aggregate metric moves in a direction that disagrees with every individual segment (all segments held flat or improved, aggregate fell), that\'s mix shift. The segments are fine — the composition changed.' },
      { type: 'heading', text: 'Common Mix Shift Scenarios' },
      { type: 'list', items: [
        'Revenue up, margin down: Fast-growing low-margin product lines are a larger share of revenue mix',
        'CVR improved, GMV flat: Higher-intent (browsing) traffic share increased, pulling up CVR without more purchases',
        'Engagement up, retention down: More casual users acquired who engage briefly then churn',
        'Rating improved, GMV fell: Premium (high-rated, high-cost) sellers left; average rating rose on remaining sellers',
      ]},
      { type: 'heading', text: 'How to Detect Mix Shift' },
      { type: 'list', items: [
        'Cut the metric by segment and verify direction for each segment independently',
        'Calculate the weighted-average math: if each segment is flat but weights changed, you have mix shift',
        'Use a shift-share decomposition: total change = within-segment change + cross-segment composition change',
      ]},
      { type: 'heading', text: 'In an Interview' },
      { type: 'text', text: '"Revenue and GMV both grew 10%, but average selling price fell 15%. How?" The mix shift hypothesis should be your first answer: "The GMV growth may be concentrated in lower-ASP categories or newer low-priced SKUs, which would pull down average selling price even as total GMV grows. I\'d decompose GMV by category and cohort to confirm."' },
    ],
  },
  {
    id: 'rca-walkthrough-search',
    category: 'RCA',
    title: 'Search CVR Dropped 15%: A Full RCA Walkthrough',
    summary: 'Step by step from alert to root cause — decomposing the funnel, cutting by segment, forming hypotheses, and deciding what to validate first.',
    readMin: 7,
    source: 'Meta / Airbnb interview pattern',
    relatedItems: [
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: 'Scenario: You get an alert — search conversion rate dropped 15% yesterday vs 7-day average. Here\'s the full CDSHV walkthrough, step by step.' },
      { type: 'heading', text: 'Step 1 — Context' },
      { type: 'text', text: 'Before opening a query tool: Was there a deployment yesterday? Any A/B tests touching search currently live? Any marketing campaigns that could change traffic composition? What\'s 15% relative to — sessions, unique users, queries with results? A 15% drop in all search queries, including zero-result ones, could be an inventory issue, not a product bug.' },
      { type: 'heading', text: 'Step 2 — Decompose the Funnel' },
      { type: 'framework_box', label: 'Search-to-Purchase Funnel', items: [
        'Queries submitted → Check absolute volume (did queries increase?)',
        'Queries with ≥1 result → Check zero-result rate (inventory/indexing problem?)',
        'Clicks on results → Check CTR (ranking problem, bad titles?)',
        'Add to cart → Check cart rate from click (pricing, PDP quality)',
        'Purchase completed → Check cart-to-purchase (checkout, payment)',
      ]},
      { type: 'text', text: 'Identify which step\'s rate fell. If zero-result rate spiked from 8% to 18%, the problem is upstream of the user experience — inventory or indexing. If CTR fell but results are returning, it\'s a ranking or presentation problem.' },
      { type: 'heading', text: 'Step 3 — Segment Cuts' },
      { type: 'list', items: [
        'Platform: iOS, Android, web — concentrated in one? Likely a deployment regression',
        'Query type: Navigational (brand searches) vs discovery (category browsing) — different problems',
        'Category: Is the CVR drop concentrated in electronics, apparel, or all categories?',
        'User type: New vs returning — new user drop is onboarding or paid acquisition quality',
      ]},
      { type: 'heading', text: 'Step 4 — Hypotheses, Ranked' },
      { type: 'list', items: [
        '1. Ranking change regression (high volume, query-level validation available)',
        '2. Zero-result rate spike from inventory/catalog change',
        '3. Platform-specific UI bug (validate: split by platform)',
        '4. Traffic composition shift from campaign (lower-intent users inflating denominator)',
      ]},
      { type: 'callout', label: 'The close', text: '"I\'d start validation by splitting the funnel by platform. If it\'s not concentrated, I\'d check zero-result rate over time. If that\'s flat, I\'d look at CTR per position in the results — a ranking change would show declining CTR for position 1-3 even as results return."' },
    ],
  },
  {
    id: 'rca-vs-sizing-vs-causal',
    category: 'RCA',
    title: 'RCA vs Opportunity Sizing vs Causal Validation: Three Different Tools',
    summary: 'Treating these as the same thing is a common failure mode. Each has a different structure, data requirement, and output.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'Three of the most common product analytics tasks — diagnosing a metric movement, sizing an opportunity, and validating a causal relationship — use different data, different methods, and produce different outputs. Confusing them leads to either answering the wrong question or using the wrong tool.' },
      { type: 'framework_box', label: 'Three Different Tools', items: [
        'RCA: Something moved — why? Uses decomposition, segmentation, time patterns. Output: root cause + confidence level.',
        'Opportunity Sizing: Is this worth building? Uses base rates, addressable population, realistic lift. Output: expected impact range.',
        'Causal Validation: Does X cause Y? Uses experiments or quasi-experiments (DiD, IV). Output: causal estimate with confidence interval.',
      ]},
      { type: 'heading', text: 'Where Conflation Hurts' },
      { type: 'text', text: 'Common mistake: using RCA-style analysis to answer a causal question. "Users who use feature A have 3x better retention — so we should push more users to feature A." This is correlation, not causation. The retained users may have used feature A because they were already engaged, not the other way around. A causal validation would require an experiment.' },
      { type: 'text', text: 'Second common mistake: trying to build a causal case when the question only needs sizing. "Should we build this?" is an opportunity sizing question — not an experiment. The answer is a Fermi estimate, not a regression.' },
      { type: 'callout', label: 'Interview pattern', text: 'When given an open-ended business question, name which tool applies before starting: "This is an opportunity sizing question, not an RCA." That framing signals you understand the job to be done — and prevents you from building a 15-step analysis plan for a yes/no go/no-go call.' },
    ],
  },
  {
    id: 'notification-fatigue-rca',
    category: 'RCA',
    title: 'D7 Retention Is Falling — Is It Notification Fatigue or Something Else?',
    summary: 'Diagnosing retention drops requires layered cuts — platform, cohort, feature usage, and notification cadence. Walk through the full analysis tree.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Notification Timing Test', room: 'review', id: 's10' },
    ],
    content: [
      { type: 'text', text: 'D7 retention fell from 32% to 28% over the past three weeks. Before hypothesizing notification fatigue, work the RCA. Retention drops have many causes — notification cadence is one of many, and blaming it first without data is the kind of answer that gets challenged immediately.' },
      { type: 'heading', text: 'The Retention Drop Analysis Tree' },
      { type: 'framework_box', label: 'Ordered Cuts for Retention RCA', items: [
        '1. Cohort timing: Are all cohorts degrading, or only recent ones? (Recent only = product change; all = current regression)',
        '2. Platform cut: iOS vs Android vs web — concentrated = deployment or OS issue',
        '3. Activation completeness: Did onboarding completion change? Incomplete onboarding predicts poor retention',
        '4. Feature usage on D1: Are retained users different on day-1 feature usage vs churned users?',
        '5. Notification engagement: Is unsubscribe rate or notification opt-out rate rising?',
      ]},
      { type: 'callout', label: 'Key cut', text: 'Notification fatigue shows a specific signature: push opt-out rate rises before retention falls, and the retention drop is concentrated in users who receive high notification volume. If opt-out rate is flat, notification fatigue is not the cause — look elsewhere.' },
      { type: 'heading', text: 'Validating Notification Fatigue Specifically' },
      { type: 'list', items: [
        'Segment users by notification volume received in first 7 days (quintiles)',
        'Compute D7 retention by each quintile — if it\'s U-shaped (high vol = low retention) that\'s fatigue',
        'Check if high-volume users have rising unsubscribe rates over the degrading period',
        'Compare notification volume of recent cohorts vs older cohorts — did cadence increase?',
      ]},
    ],
  },
  {
    id: 'time-patterns-rca',
    category: 'RCA',
    title: 'Time Patterns in RCA: Deployment, Seasonality, and Cohort Cuts',
    summary: 'A metric drop that started Tuesday is likely a deployment. One that started after a campaign is attribution. Time cuts narrow the hypothesis space faster than anything else.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
    content: [
      { type: 'text', text: 'Time is the fastest hypothesis filter in RCA. The exact moment a metric starts falling — and its shape over time — tells you the likely cause category before you write a single query.' },
      { type: 'framework_box', label: 'Time Pattern → Cause Category', items: [
        'Sharp drop at a specific hour/day: Deployment regression or data pipeline failure. Check deploy log.',
        'Gradual decline over 1-2 weeks: Behavioral or product change affecting user behavior over time. Check for A/B tests or feature rollouts.',
        'Drop aligned with a campaign start: Traffic composition change. Lower-intent users inflating denominator.',
        'Cyclical / day-of-week pattern: Normal seasonality — compare same day last week, not yesterday.',
        'Drop affecting only new cohorts: Onboarding or acquisition quality change in the affected period.',
      ]},
      { type: 'callout', label: 'The first question', text: 'Before any segment cut or hypothesis, plot the metric hourly for the past 7 days. The shape of the drop is the fastest clue. A staircase drop (overnight jump then flat) is almost always a pipeline or code issue, not a user behavior shift.' },
      { type: 'heading', text: 'Cohort Time Cuts' },
      { type: 'text', text: 'For user-level metrics (retention, LTV), time cuts are cohort cuts. Plot D7 retention by signup week for the past 8 weeks. If only the most recent cohort is degrading, the problem is recent — look at last week\'s acquisition source or new user onboarding change. If all cohorts are degrading simultaneously, it\'s a current product regression affecting all users.' },
    ],
  },
  {
    id: 'seller-quality-rca',
    category: 'RCA',
    title: 'Marketplace Cancellations Are Spiking: A Seller Quality Diagnosis',
    summary: 'When buyer-facing metrics deteriorate, the root cause is often supply-side. Walk through a seller quality RCA with segment cuts and validation steps.',
    readMin: 6,
    source: 'eBay / Airbnb interview pattern',
    relatedItems: [
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'Cancellation rate spiked 40% month-over-month. The instinct: buyer experience problem. The reality: marketplace cancellations are usually a supply-side issue — seller reliability, inventory accuracy, or fulfillment capacity. The RCA must cover both sides.' },
      { type: 'heading', text: 'Step 1 — Decompose Cancellation Source' },
      { type: 'list', items: [
        'Buyer-initiated cancellations: Buyer changed mind or found better price. Demand-side.',
        'Seller-initiated cancellations: Seller cancels after accepting. Supply-side quality problem.',
        'System cancellations: Payment failure, inventory-out-of-sync. Technical problem.',
      ]},
      { type: 'text', text: 'Segment by who initiated. If seller-initiated cancellations drove the spike, proceed to seller quality cuts.' },
      { type: 'heading', text: 'Step 2 — Seller Quality Segment Cuts' },
      { type: 'list', items: [
        'Seller cohort: New sellers vs established — new sellers typically have higher cancellation rates; did mix shift toward new sellers?',
        'Seller size: Small/occasional sellers vs high-volume — concentrated in one tier?',
        'Category: Electronics, apparel, etc. — specific category supply quality degraded?',
        'Time pattern: Did cancellations spike after a promotional event (sellers oversold inventory)?',
      ]},
      { type: 'callout', label: 'Supply-side hypothesis', text: 'The most common driver: a promotional campaign drove demand spike → sellers oversold → cancellation spike when they couldn\'t fulfill. Validate by checking if the cancellation spike started 3-7 days after the promotion peak (the typical fulfill window).' },
    ],
  },
  {
    id: 'data-availability-thinking',
    category: 'RCA',
    title: 'Data Availability Thinking: Map What You Have, What\'s Missing, and What the Gap Means',
    summary: 'Assuming all data exists is a red flag. Senior analysts name the table, grain, and join logic — and acknowledge gaps without using them as an excuse to stop.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'When an interviewer describes a scenario, they rarely list every table available to you. The senior move is to name what data you\'d need, acknowledge what might be missing, propose a proxy for the gap — and never stop the analysis at "we don\'t have that data."' },
      { type: 'framework_box', label: 'Data Availability Mapping Process', items: [
        '1. Name the tables: "I\'d need an events table at session grain, an orders table, and a users table with cohort info."',
        '2. State the joins: "Orders joined to events on user_id, events filtered to the same session window."',
        '3. Flag likely gaps: "I may not have session-level attribution, but I can proxy with user\'s last acquisition channel."',
        '4. Propose the proxy: State the assumption and the direction of error it introduces.',
        '5. Identify what to ask engineering: Name the one missing signal that would most change your conclusion.',
      ]},
      { type: 'callout', label: 'The anti-pattern', text: '"We don\'t have that data" as a full stop is a junior signal. The senior version: "We probably don\'t have X directly, so I\'d use Y as a proxy — accepting that it over-estimates Z. If the decision is sensitive to that assumption, I\'d flag it as a gap to instrument before a final ship decision."' },
      { type: 'heading', text: 'The Gap That Changes the Conclusion' },
      { type: 'text', text: 'Not all data gaps are equal. The one that matters most is the gap that, if filled, might flip your recommendation. Identifying that gap — and being explicit about the direction of uncertainty it creates — is what senior-level data availability thinking looks like.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // EXPERIMENTATION
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'srm',
    category: 'Experimentation',
    title: 'What Is SRM and Why It Should Stop Your Ship Decision',
    summary: 'Sample Ratio Mismatch means your experiment is broken. Shipping on an experiment with SRM is worse than not running the experiment at all.',
    readMin: 5,
    source: 'Meta, Airbnb interview standard',
    relatedItems: [
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
    ],
    content: [
      { type: 'text', text: 'Picture this: you just ran a clean two-week experiment. Engagement is up 6%, revenue is up 3%, the team is ready to celebrate. Then someone pulls the assignment counts — 47% in control, 53% in treatment instead of the planned 50/50. Everything you just read is probably noise.\n\nThat\'s SRM — Sample Ratio Mismatch — and it\'s one of the most dangerous experiment bugs precisely because it can look like a win. When your group assignment is skewed, you no longer have a valid control. The difference you\'re measuring could be selection bias, not treatment effect. Shipping on an SRM experiment is worse than not running one at all.' },
      { type: 'heading', text: 'How to Detect SRM' },
      { type: 'text', text: 'Run a chi-squared test against your expected split. Most experimentation platforms do this automatically. If the p-value is below 0.01, flag SRM and stop the readout. For manual checks: if the split deviation is more than 1-2% of the expected allocation, investigate.' },
      { type: 'framework_box', label: 'SRM Detection Process', items: [
        'Pull assignment counts per variant at the unit level (user_id, not event count)',
        'Compare observed vs expected counts — expected = total_assigned × split_ratio',
        'Run chi-squared: if p < 0.01, flag SRM',
        'Investigate cause before proceeding with readout',
      ]},
      { type: 'heading', text: 'Why SRM Invalidates Results' },
      { type: 'text', text: 'Randomization is the foundation of causal inference from A/B tests. If assignment is uneven, you no longer have a valid control — you have a biased sample. Any metric difference you observe could be due to the selection bias in assignment, not the treatment effect. You cannot adjust for this post-hoc.' },
      { type: 'callout', label: 'The rule', text: 'Always check for SRM before reporting any experiment results. SRM check comes first — before significance, before lift, before ship/no-ship.' },
      { type: 'heading', text: 'Common Causes' },
      { type: 'list', items: [
        'Bot traffic filtered differently between groups (bots inflate one variant)',
        'Logging gaps — events not captured at the same rate in both variants',
        'Bucketing bug — a code path skips the assignment logic for certain users',
        'Survivorship bias — users who churn early are lost from one group disproportionately',
        'Multiple assignment — users reassigned mid-experiment if assignment logic is flawed',
      ]},
      { type: 'heading', text: 'What to Do When You Find SRM' },
      { type: 'text', text: 'Stop. Do not ship. Investigate the cause. If you find a bucketing bug, fix it and restart. If it\'s a logging issue, fix the instrumentation. Never attempt to "adjust" for SRM statistically — the result is not recoverable. In an interview, the correct answer is: "First, I\'d check for SRM. If SRM is present, I wouldn\'t trust these results regardless of what the metrics show."' },
    ],
    keyTakeaways: [
      'SRM means your experiment\'s randomization is broken — results are untrustworthy regardless of how compelling they look.',
      'A chi-squared test against expected split (p < 0.01) is the standard detection method; run this before reporting any numbers.',
      'Common causes: bot filtering asymmetry, logging gaps, bucketing bugs, survivorship bias, multiple assignment.',
      'Never statistically "adjust" for SRM — the result is not recoverable. Fix the root cause and restart.',
      'SRM check comes first: before significance, before lift, before any ship/no-ship discussion.',
    ],
    references: [
      { label: 'Diagnosing Sample Ratio Mismatch in A/B Testing — Fabijan et al. (Microsoft, KDD 2019)', url: 'https://dl.acm.org/doi/10.1145/3292500.3330722', note: 'The seminal paper on SRM taxonomy from Microsoft\'s experimentation platform' },
      { label: 'SRM Checker — Lukas Vermeer', url: 'https://www.lukasvermeer.nl/srm/', note: 'Free browser-based tool for running chi-squared tests on your experiment splits' },
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 3 covers SRM taxonomy in depth; the definitive practitioner reference for A/B testing' },
    ],
  },
  {
    id: 'randomization-unit',
    category: 'Experimentation',
    title: 'Randomization Unit: User vs Session vs Device — Why It Matters',
    summary: 'The wrong randomization unit inflates variance, breaks SUTVA, or creates inconsistent user experience. The right choice depends on what you\'re testing.',
    readMin: 5,
    source: 'Uber, Airbnb two-sided marketplace pattern',
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Design the Onboarding Assignment', room: 'design', id: 'd02' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
    content: [
      { type: 'text', text: 'The randomization unit is the entity you assign to treatment or control. It seems like a technical detail but it drives everything: variance of your estimate, validity of causal inference, and whether the user experience is consistent.' },
      { type: 'heading', text: 'The Three Common Units' },
      { type: 'list', items: [
        'User: Most common. Each user is in one group for the entire experiment. Consistent experience, easy to analyze, preferred for UX changes.',
        'Session: Each visit is independently assigned. Users can see both variants. Creates an inconsistent experience — bad for most product experiments.',
        'Device: Each device is assigned. One user on two devices could be in both groups. Edge case for cross-device products.',
      ]},
      { type: 'heading', text: 'Variance Implications' },
      { type: 'text', text: 'User-level randomization has higher variance per observation than session-level because a user\'s sessions are correlated (a high-intent user has consistently high-intent sessions). Session-level randomization treats correlated sessions as independent observations, understating variance. Session-level experiments appear more powered than they actually are.' },
      { type: 'callout', label: 'The general rule', text: 'Randomize at the level of the entity whose experience you want to be consistent, and at the level that minimizes SUTVA violations. For most consumer product experiments, this is the user.' },
      { type: 'heading', text: 'When User-Level Doesn\'t Work' },
      { type: 'list', items: [
        'Two-sided marketplace: User-level assignment on a supply feature affects all demand-side users through shared inventory → SUTVA violation → geo or time-based randomization',
        'Social features: User A (treatment) interacts with User B (control) → network interference → cluster/community randomization',
        'Very slow experiment / requires full population: Geographic holdout or time-based switchback',
      ]},
      { type: 'heading', text: 'Complete Design Room Answer' },
      { type: 'text', text: 'Every Design Room problem asks you to specify randomization unit. A complete answer covers: (1) the unit, (2) why that unit was chosen, (3) any SUTVA risks with that unit, (4) alternative units if the primary creates problems. Missing any one of these leaves the design incomplete.' },
    ],
  },
  {
    id: 'novelty-effect',
    category: 'Experimentation',
    title: 'Novelty Effect: The Trap That Fools Every Junior Analyst',
    summary: 'Users engage with new things because they\'re new — not because they\'re better. Early experiment results are systematically biased upward.',
    readMin: 4,
    source: 'Netflix, Spotify interview pattern',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
    ],
    content: [
      { type: 'text', text: 'There\'s a psychological phenomenon that\'s killed more good experiment readouts than bad code: people engage with new things simply because they\'re new. A new button gets clicked. A new feed module gets opened. A new recommendation gets followed — not because it\'s better, but because different is interesting for about ten days.\n\nThen the novelty fades. Behavior reverts. The 12% engagement lift from last week becomes a 2% lift today. If your experiment ran for four days and you shipped on Monday, you made a decision based on a mirage.' },
      { type: 'heading', text: 'The Three Novelty Patterns' },
      { type: 'list', items: [
        'Pure novelty: Engagement spikes then fully reverts to baseline — the feature added no long-term value',
        'Novelty + value: Engagement spikes, then settles above baseline — there is real value, but it was inflated early',
        'Adoption curve: Engagement starts low, grows as users discover it — early data understates impact',
      ]},
      { type: 'callout', label: 'The implication', text: 'If you can only run the experiment for 5 days, you cannot distinguish between these three patterns. You need enough runtime to see the stabilization plateau.' },
      { type: 'heading', text: 'How to Detect Novelty Effect' },
      { type: 'text', text: 'Plot your primary metric over time, segmented by exposure date (not calendar date). If users who first saw the feature on day 1 show declining engagement while users who saw it on day 10 are at the same level as day-1 users were on their day 1, you have novelty effect. The pattern looks like a declining waterfall when cohorted by first-exposure date.' },
      { type: 'heading', text: 'Minimum Runtime as a Defense' },
      { type: 'text', text: 'The minimum runtime for consumer features with weekly usage patterns is two full weeks — covering two complete weekly cycles. For features used daily, one week may suffice. The goal is not just statistical power but behavioral stabilization. Power tells you whether the effect is detectable; runtime tells you whether the effect is real.' },
      { type: 'heading', text: 'The Interview Trap' },
      { type: 'text', text: 'The interviewer shows you experiment results at day 4 with a 12% lift and asks "would you ship?" The correct answer begins: "Before shipping, I\'d want to know if we\'ve run long enough to rule out novelty effect. 12% at day 4 is promising but potentially inflated. I\'d want to see day-by-day metric trends segmented by exposure cohort before making a recommendation."' },
      { type: 'callout', label: 'Watch for this', text: 'Novelty effect is most severe for visible UI changes (new recommendation module, redesigned feed) and weakest for backend changes (ranking algorithm, pricing logic). Adjust your skepticism accordingly.' },
    ],
    keyTakeaways: [
      'Novelty effect is the temporary engagement spike that appears when users encounter anything new — not evidence of lasting value.',
      'Plot metrics by first-exposure cohort (not calendar date) to detect the waterfall pattern that confirms novelty.',
      'Two full weeks is the minimum runtime for consumer features with weekly usage cycles.',
      'Three patterns to distinguish: pure novelty (fully reverts), novelty+value (settles above baseline), adoption curve (grows over time).',
      'In interviews: never commit to shipping based on day-3 or day-5 results without explicitly addressing novelty effect.',
    ],
    references: [
      { label: 'Novelty and Primacy: A Long-Term Experiment Perspective — Dmitriev et al. (Microsoft)', url: 'https://dl.acm.org/doi/10.1145/2783258.2785376', note: 'Empirical study showing novelty effect patterns across thousands of experiments' },
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 21 covers novelty and primacy effects with real platform data' },
    ],
  },
  {
    id: 'sutva',
    category: 'Experimentation',
    title: 'SUTVA Violations: When Your A/B Test Measures the Wrong Thing',
    summary: 'When treatment and control units interact, your experiment is contaminated. Network effects, shared inventory, and marketplace dynamics all break SUTVA.',
    readMin: 5,
    source: 'Airbnb, Uber two-sided marketplace pattern',
    relatedItems: [
      { label: 'SUTVA/Spillover (Stats)', room: 'stats', id: 'stat08' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'Imagine you\'re testing a new feature that promotes premium Airbnb listings to treated users. The listings get snapped up faster. Control users, shown the normal experience, now see a thinner supply of great listings — not because the product failed them, but because treated users got there first. Your control group is no longer a true counterfactual. It\'s been contaminated.\n\nThis is a SUTVA violation — Stable Unit Treatment Value Assumption — one of the most conceptually important and practically underappreciated failure modes in product experimentation. It says: the outcome for any unit should depend only on that unit\'s own treatment, not on what happens to anyone else. In networked, marketplace, or social products, this assumption breaks constantly.' },
      { type: 'heading', text: 'How SUTVA Breaks in Product' },
      { type: 'list', items: [
        'Network products: User A (treatment) invites User B (control). B\'s behavior changes because of A\'s treatment.',
        'Shared inventory: Treatment group books the best Airbnb listings first, leaving worse supply for control.',
        'Marketplace pricing: Treat some drivers with surge pricing optimization → affects ride availability for all riders.',
        'Social proof: Treatment users see more engagement on a post → post becomes more prominent for control users too.',
      ]},
      { type: 'callout', label: 'The core problem', text: 'When SUTVA breaks, your control group is not a true counterfactual. Treatment and control users are interacting, which means the "no treatment" world you\'re trying to measure doesn\'t exist.' },
      { type: 'heading', text: 'Detecting SUTVA Violations' },
      { type: 'text', text: 'The signature is: treatment effect looks significant, but when you look at control group metrics independently vs a pre-experiment baseline, they also moved. The spillover inflated or deflated the control, making the A/B difference misleading.' },
      { type: 'heading', text: 'Solutions' },
      { type: 'list', items: [
        'Cluster randomization: Randomize at a higher unit (city, country, friend group) that contains interactions',
        'Holdout groups: Create a complete holdout that receives no treatment and no contamination from treated users',
        'Switchback designs: Alternate treatment on/off over time periods (used at Lyft, DoorDash for marketplace experiments)',
        'Ego-network isolation: For social products, randomize at the connected-component level',
      ]},
      { type: 'heading', text: 'In Every Marketplace/Network Design Problem' },
      { type: 'text', text: 'Always flag SUTVA first. "This product has network effects / shared supply, so standard user-level randomization may violate SUTVA. I\'d consider geo-based or cluster-based randomization to isolate the treatment." This single sentence separates candidates who understand experimentation from those who just know the mechanics.' },
    ],
    keyTakeaways: [
      'SUTVA says each user\'s outcome should depend only on their own treatment — when users interact, it breaks.',
      'Shared inventory, network features, and social proof mechanisms are the most common SUTVA violators in consumer products.',
      'The signature: control group metrics shift from pre-experiment baseline even without receiving treatment.',
      'Solutions: cluster randomization (city/country level), holdout groups, switchback designs for marketplace experiments.',
      'In any marketplace or social product design question: flag SUTVA first, before discussing any other experiment design decision.',
    ],
    references: [
      { label: 'Interference and SUTVA in Experiment Design — Airbnb Engineering', url: 'https://medium.com/airbnb-engineering/interference-and-sutva-in-experiment-design-5b5e72c3a6d3', note: 'Airbnb\'s practical treatment of SUTVA violations in two-sided marketplace experiments' },
      { label: 'Detecting Network Effects: Randomizing Over the Ego-Network — Facebook Research', url: 'https://research.facebook.com/publications/detecting-network-effects-randomizing-over-the-ego-network/', note: 'How Meta handles social product SUTVA violations through ego-network randomization' },
      { label: 'Switchback Experiments for Two-Sided Marketplaces — Lyft Engineering', url: 'https://eng.lyft.com/switchback-tests-and-randomized-experimentation-under-network-effects-at-lyft-cb7cc4ef3a47', note: 'Time-based switchback design as a SUTVA solution for ride-sharing and delivery platforms' },
    ],
  },
  {
    id: 'guardrail-conflicts',
    category: 'Experimentation',
    title: 'When the North Star Rises and the Guardrail Falls',
    summary: 'GMV is up 3% but refund rate is up 8%. Ship, rollback, or investigate? This is the most common real-world experiment scenario and the decision framework is not obvious.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Guardrail Conflict (Stats)', room: 'stats', id: 'stat06' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
    content: [
      { type: 'text', text: 'You ran a clean experiment. GMV is up 3% (statistically significant). But refund rate is up 8% (also significant). This is the real-world scenario that most interview questions are building toward. There is no universal rule — but there is a structured decision process.' },
      { type: 'heading', text: 'Step 1: Is the Guardrail Movement Real?' },
      { type: 'text', text: 'Before any decision: check the guardrail result\'s validity. Is the refund rate movement statistically significant with enough power? Is it driven by the same user segment as the GMV lift? Or is it noise in a small subgroup? If the guardrail movement is marginal or concentrated in an outlier segment, the weight you give it changes.' },
      { type: 'heading', text: 'Step 2: Quantify the Tradeoff' },
      { type: 'text', text: 'Translate both movements to the same unit. +3% GMV = X incremental dollars. +8% refund rate on Y% refund base = Z additional refund cost. If X >> Z, the math might support shipping even with the guardrail hit. If Z approaches X, it\'s not a win. Finance can help with this translation.' },
      { type: 'heading', text: 'Step 3: Understand the Mechanism' },
      { type: 'text', text: 'Why did refund rate increase? If the treatment made it easier to buy (reducing friction) and some of those marginal purchases turned out to be wrong-fit orders, the mechanism is: lower friction → more purchases including low-intent ones → more returns. This is different from: the treatment caused delivery errors or product quality issues. The mechanism determines whether it\'s fixable.' },
      { type: 'callout', label: 'The decision framework', text: 'If: (1) the guardrail movement is real, (2) the magnitude materially erodes the north star gain, or (3) the mechanism suggests downstream trust damage — do not ship. Investigate and iterate. Escalate to PM + leadership with the tradeoff quantified. Never make this call solo.' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: '"Would you ship?" is the wrong question to answer immediately. The right answer: "I wouldn\'t make that call without: (1) verifying the guardrail significance, (2) quantifying the tradeoff in business terms, (3) understanding the mechanism. If the mechanism is marginal-purchase returns, it might be fixable with a product change. If it\'s quality degradation, I\'d recommend a rollback."' },
    ],
    keyTakeaways: [
      'A north star gain doesn\'t automatically win — validate the guardrail movement is real and statistically significant first.',
      'Translate both metrics to the same unit (dollars, percentage points) to make the tradeoff quantitative, not qualitative.',
      'The mechanism matters: marginal-purchase returns (fixable with product iteration) vs. quality degradation (signals something broken).',
      'Pre-committed guardrail thresholds prevent post-hoc rationalization — "only 3%" is not a guardrail, it\'s an observation.',
      'Escalate with the math done, never make a guardrail conflict call solo — this is a product and business decision, not just an analytics one.',
    ],
    references: [
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 7 covers multi-metric decision frameworks including guardrail conflict resolution' },
    ],
  },
  {
    id: 'multiple-testing',
    category: 'Experimentation',
    title: 'Multiple Testing: Why More Metrics Inflates Your False Positive Rate',
    summary: 'Test 20 metrics at p < 0.05 and you expect one false positive by chance. Bonferroni, FDR, and pre-registration — the tools that keep you honest.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Multiple Testing (Stats)', room: 'stats', id: 'stat05' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
    content: [
      { type: 'text', text: 'At a significance level of 0.05, you have a 5% chance of a false positive on each test. Run 20 independent tests and you expect one to be a false positive by pure chance. This is multiple testing. Every additional metric in your experiment readout makes the false positive risk worse.' },
      { type: 'heading', text: 'The Math' },
      { type: 'text', text: 'Probability of at least one false positive across n tests = 1 − (1 − α)^n. At α = 0.05 and n = 14 tests, this exceeds 50%. Your experiment dashboard with 14 metrics has a coin-flip chance of showing at least one false positive — even if the treatment did absolutely nothing.' },
      { type: 'callout', label: 'How p-hacking happens', text: 'Run an experiment with one primary metric (no movement) and 13 secondary ones. One secondary hits p = 0.04. The team ships citing that metric. This is not a win — it\'s a false positive that survived because nobody corrected for multiple testing.' },
      { type: 'heading', text: 'Corrections' },
      { type: 'list', items: [
        'Bonferroni: Divide α by number of tests. Testing 10 metrics at α = 0.05 → require p < 0.005 each. Very conservative — inflates false negatives.',
        'Benjamini-Hochberg (FDR): Controls the False Discovery Rate rather than the family-wise error rate. Less conservative, used more in practice at companies like Netflix.',
        'Pre-registration: Commit to one primary metric before the experiment starts. Secondary metrics are exploratory only — no ship decision based on them.',
      ]},
      { type: 'heading', text: 'The Practical Rule' },
      { type: 'text', text: 'Designate one pre-committed primary metric. Ship/no-ship decisions are based solely on this metric. Secondary metrics can be used to understand mechanism or identify follow-up work. Never use a secondary metric as the basis for a ship decision, even if it looks compelling.' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: 'When shown an experiment with many significant metrics and asked "would you ship?" — ask how many metrics were pre-committed. If all were added post-hoc, the results are not trustworthy. Name this before interpreting the numbers, and propose which single metric you\'d use for the decision.' },
    ],
    keyTakeaways: [
      'At α = 0.05 across 14 independent tests, there\'s a >50% chance of at least one false positive — even if the treatment did nothing.',
      'The fix is a pre-committed primary metric: ship/no-ship is based solely on this one metric, decided before the experiment starts.',
      'Bonferroni correction is conservative; Benjamini-Hochberg (FDR) is more practical for large dashboards and used at companies like Netflix.',
      'Secondary metrics are for understanding mechanism and planning follow-up work — never for making ship decisions.',
      'In any readout: ask "which metric was pre-committed?" before interpreting any other result.',
    ],
    references: [
      { label: 'Controlling the False Discovery Rate — Benjamini & Hochberg (1995)', url: 'https://www.jstor.org/stable/2346101', note: 'The foundational paper on FDR correction; more practical than Bonferroni for product experimentation contexts' },
      { label: 'Multiple Comparisons in A/B Testing — Netflix Technology Blog', url: 'https://netflixtechblog.com/netflix-experimentation-causal-reasoning-about-experiment-results-using-causal-graphs-7e6302e5d5e8', note: 'How Netflix handles multiple comparisons in large-scale experimentation pipelines' },
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 18 covers multiple testing, p-hacking, and pre-registration in product experiments' },
    ],
  },
  {
    id: 'peeking',
    category: 'Experimentation',
    title: 'Peeking: Why Checking Your Experiment Mid-Run Is Dangerous',
    summary: 'Every time you look at an in-progress test and consider stopping early, you raise your false positive rate. Sequential testing methods solve this.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
    ],
    content: [
      { type: 'text', text: 'It feels responsible. The experiment has been running three days and significance is there — p = 0.03, treatment up 8%. Why run another eleven days? There\'s budget pressure, a launch deadline, a PM asking daily. You stop early and ship.\n\nWhat you don\'t realize: that p = 0.03 was a chance fluctuation that would have disappeared by day 7. You just shipped a false positive, and the feature will gradually erode the metric it was supposed to move. Peeking feels like prudence. It\'s actually the most common way good experimentation processes break down.' },
      { type: 'heading', text: 'Why Peeking Is a Problem' },
      { type: 'text', text: 'When you set α = 0.05, that p-value is calibrated for a single look at the end of a fixed-horizon test. If you look multiple times and stop when you first see p < 0.05, you inflate the actual false positive rate substantially above 5%.' },
      { type: 'callout', label: 'The math', text: 'In simulations: if you check an experiment at every 5% of planned runtime and stop at first p < 0.05, your actual false positive rate approaches 20-30%, not 5%. You\'re running a casino, not a test.' },
      { type: 'heading', text: 'Sequential Testing as the Fix' },
      { type: 'text', text: 'Sequential testing methods (mSPRT, always-valid inference, AGILE) let you look at results continuously without inflating false positives. They adjust the significance threshold dynamically based on how many observations you\'ve seen. Most modern platforms (Optimizely, Statsig, Eppo) offer sequential testing modes.' },
      { type: 'heading', text: 'The Practical Rule for Teams Without Sequential Testing' },
      { type: 'text', text: 'Commit to a minimum runtime before the experiment starts. Do not look at results until that runtime has elapsed. If business pressure requires early stopping, treat the result as exploratory only — not a ship decision.' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: '"The experiment looks significant at day 3, would you ship?" — Name peeking explicitly. "Stopping at day 3 based on early significance inflates my false positive rate. I\'d either run to the pre-committed end date, or use sequential testing if we need real-time decisions."' },
    ],
    keyTakeaways: [
      'Every early look at experiment results and potential early stop inflates your actual false positive rate beyond the nominal α.',
      'Checking at every 5% of runtime and stopping on first p < 0.05 can push false positives to 20–30%, not 5%.',
      'Sequential testing (mSPRT, always-valid inference) is the principled fix — it adjusts thresholds dynamically for continuous monitoring.',
      'Without sequential testing: commit to a minimum runtime upfront, treat early results as exploratory-only.',
      'In interviews: frame "can we stop early?" as a question about whether sequential testing is in place — not just about current p-values.',
    ],
    references: [
      { label: 'Peeking at A/B Tests — Johari et al. (Stanford / Optimizely)', url: 'https://www.optimizely.com/insights/blog/sequential-testing/', note: 'The paper that quantified false positive inflation from peeking and motivated industry adoption of sequential testing' },
      { label: 'Always Valid Inference — Ramdas et al.', url: 'https://arxiv.org/abs/1512.04922', note: 'Mathematical framework for sequential hypothesis testing; basis for Statsig\'s sequential mode' },
      { label: 'Trustworthy Online Controlled Experiments — Kohavi, Tang & Xu', url: 'https://experimentguide.com', note: 'Chapter 17 covers early stopping, sequential testing, and practical runtime decisions' },
    ],
  },
  {
    id: 'cuped',
    category: 'Experimentation',
    title: 'CUPED: More Statistical Power Without Running Longer',
    summary: 'CUPED uses pre-experiment behavior to reduce variance. More power, same sample size, same runtime. Here\'s the intuition without the math.',
    readMin: 5,
    source: 'Netflix, Spotify, Microsoft standard',
    relatedItems: [
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
    ],
    content: [
      { type: 'text', text: 'There\'s a quiet anxiety in experimentation teams: every feature needs a test, every test needs sample size, and sample size means time — two weeks minimum, sometimes four. Meanwhile the product team wants to move faster, the competition just shipped, and the calendar is slipping.\n\nCUPED — Controlled-experiment Using Pre-Experiment Data — is the statistical technique that buys back that time without cutting validity corners. Developed by Microsoft Research in 2013 and now standard at Netflix, Spotify, Airbnb, and Booking.com, it\'s one of the few genuine free lunches in applied statistics: more power, same sample size, no validity tradeoffs.' },
      { type: 'heading', text: 'The Intuition' },
      { type: 'text', text: 'Your experiment metric has variance because users are different from each other. A heavy user and a light user in the same group contribute wildly different metric values. This variance makes it harder to detect a real treatment effect.\n\nCUPED says: if you know a user\'s pre-experiment behavior (their metric value before the experiment started), you can use that to "adjust" their experiment metric — removing the part of their behavior explained by who they already were. What remains is the treatment effect, with much less noise.' },
      { type: 'callout', label: 'What CUPED actually does', text: 'CUPED replaces your raw metric with: Y_adjusted = Y - θ × (X - E[X]), where X is the pre-experiment covariate (same metric, pre-period) and θ is estimated by regression. The adjusted metric has lower variance → same statistical power at smaller sample sizes or shorter runtimes.' },
      { type: 'heading', text: 'How Much Does It Help?' },
      { type: 'text', text: 'Variance reduction of 20-50% is typical for behavioral metrics that are stable over time (revenue per user, sessions per user). This translates to: you can detect the same effect size with 20-50% fewer observations, or run the experiment for 20-50% less time. For Booking.com, CUPED reportedly cut required experiment runtimes by 30-40%.' },
      { type: 'heading', text: 'When CUPED Works Best' },
      { type: 'list', items: [
        'Metric is stable over time: Sessions last month predicts sessions this month well → high variance reduction',
        'Sufficient pre-period data: Needs at least 1-2 weeks of pre-experiment data per user',
        'Same user population: Works best when the experiment population is similar to the pre-period population',
      ]},
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: '"How would you improve the power of this experiment?" — if runtime is fixed, mention CUPED as a variance reduction approach. "I\'d use CUPED with pre-experiment behavioral data as a covariate to reduce variance and improve detection at the same sample size."' },
    ],
    keyTakeaways: [
      'CUPED uses pre-experiment behavior as a covariate to explain away user-level variance, leaving a cleaner treatment signal.',
      'Typical variance reduction: 20–50% for stable behavioral metrics like revenue per user or sessions per user.',
      'This directly translates to shorter runtimes or smaller sample sizes — not magic, just removing noise you already had data to explain.',
      'Works best when the pre-period metric correlates highly with the experiment metric (same metric, 1–4 weeks prior).',
      'Available natively in Statsig, Optimizely, Eppo, and most mature experimentation platforms.',
    ],
    references: [
      { label: 'Improving the Sensitivity of Online Controlled Experiments Using Pre-Experiment Data — Deng et al. (Microsoft Research, 2013)', url: 'https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf', note: 'The original CUPED paper; still the clearest mathematical treatment of the technique' },
      { label: 'How Booking.com Increases Power with CUPED — Booking.com Engineering', url: 'https://medium.com/booking-com-development/how-booking-com-increases-the-power-of-online-experiments-with-cuped-995d186fff1d', note: 'Practical implementation showing 30–40% runtime reduction in production experiments' },
      { label: 'Variance Reduction for Experiments at Spotify — Spotify Engineering', url: 'https://engineering.atspotify.com/2023/10/variance-reduction-for-experiments/', note: 'Spotify\'s production implementation with variance reduction benchmarks across metric types' },
    ],
  },
  {
    id: 'experiment-design-primary-metric',
    category: 'Experimentation',
    title: 'Pre-Committing Your Primary Metric Before the Experiment Starts',
    summary: 'Pre-committing to a primary metric is what keeps you from p-hacking your way to a ship decision. Here\'s how to choose it.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Design the Mobile Feature Test', room: 'design', id: 'd03' },
    ],
    content: [
      { type: 'text', text: 'The primary metric is the one number that determines your ship decision. If the primary metric is positive and statistically significant, you ship. If it\'s not, you don\'t — regardless of what other metrics say. Without one pre-committed primary metric, every experiment becomes a search for a positive result somewhere in the data.' },
      { type: 'heading', text: 'Criteria for a Good Primary Metric' },
      { type: 'framework_box', label: 'Primary Metric Checklist', items: [
        '1. Directly tied to the hypothesis: Measures exactly what the feature is supposed to change.',
        '2. Sensitive enough to detect the expected effect: If MDE is 2% and your metric has high variance, you may never detect it.',
        '3. Single number: Not "CVR and AOV both need to improve" — pick one. The other goes to secondary.',
        '4. Pre-committed: Written in the experiment doc before treatment is launched.',
        '5. Not gameable by the treatment itself: Measuring same-session CTR for a feature that causes more sessions to start is misleading.',
      ]},
      { type: 'callout', label: 'The p-hacking protection', text: 'Pre-commitment works because the value of alpha (5%) only holds if the test is specified before seeing results. Checking 10 metrics and choosing the positive one gives you a much higher than 5% false positive rate. One pre-committed metric holds the statistical guarantee.' },
      { type: 'heading', text: 'Secondary and Guardrail Metrics' },
      { type: 'text', text: 'Pre-commit secondaries and guardrails too. Secondary metrics inform but don\'t determine the ship decision. Guardrail metrics block the ship if they degrade beyond threshold. Write all three in the experiment doc.' },
    ],
  },
  {
    id: 'decision-rule',
    category: 'Experimentation',
    title: 'The Pre-Committed Decision Rule: Writing It Before You See Results',
    summary: 'A decision rule written after seeing results is post-hoc rationalization. Here\'s what a good pre-committed rule looks like and how to defend it.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Multi-Metric Launch', room: 'design', id: 'd04' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
    content: [
      { type: 'text', text: 'A decision rule is the explicit statement written before an experiment starts: "We will ship if [primary metric] improves by at least [MDE] with p < 0.05, and [guardrail metric] does not degrade by more than [threshold]." No rule = post-hoc rationalization when results come back.' },
      { type: 'framework_box', label: 'Complete Decision Rule Structure', items: [
        'Primary condition: "[Metric] increases by ≥X% with p < 0.05 — ship"',
        'Guardrail condition: "[Guardrail metric] does not increase by >Y% — required to ship"',
        'Null condition: "Primary metric is not significant — do not ship, diagnose"',
        'Conflict condition: "Primary positive, guardrail degraded — escalate to product lead, do not auto-ship"',
        'Runtime: "Run for minimum N weeks; do not call results before this date"',
      ]},
      { type: 'callout', label: 'The conflict case', text: 'The hardest scenario: primary metric improved, guardrail degraded. The pre-committed rule should specify what happens here. Most mature teams say: guardrail degradation blocks ship, requires root cause investigation. Without a rule, this becomes a negotiation every time.' },
    ],
  },
  {
    id: 'cannibalization',
    category: 'Experimentation',
    title: 'Cannibalization and Tradeoffs: When Your Win Comes at a Cost',
    summary: 'A feature that lifts engagement but hurts revenue is not a win. Detecting and quantifying tradeoffs between metrics is the experimentation skill most analysts skip.',
    readMin: 5,
    source: 'Airbnb guest vs host tradeoff pattern',
    relatedItems: [
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'Cannibalization happens when a feature win in one metric comes at a cost to another metric — and both effects are real. A faster checkout that skips upsells lifts CVR but reduces AOV. A feed ranking change that promotes engaging content might reduce time on premium content. The experiment "won" on the primary — but was it actually a win?' },
      { type: 'heading', text: 'The Two-Sided Marketplace Version' },
      { type: 'text', text: 'The most consequential cannibalization in marketplace products: guest-side improvements at host-side costs. Lower booking friction for guests → host economics worsen (lower prices accepted). This shows up as a CVR win but a GMV-per-host or host satisfaction guardrail loss. Airbnb\'s Instant Book is a classic example of this tension.' },
      { type: 'framework_box', label: 'Detecting Cannibalization', items: [
        '1. Check all downstream metrics in the experiment, not just primary',
        '2. Look for the opposite sign: if CVR is up, check AOV; if guest bookings up, check host metrics',
        '3. Compute net revenue impact: CVR_lift × volume × AOV_change — is net revenue positive?',
        '4. Check segment-level: Does the win come entirely from a segment where the cost is smaller?',
      ]},
      { type: 'callout', label: 'How to frame in an interview', text: '"This CVR improvement comes with a 12% AOV reduction. At current volume, that\'s net negative revenue — a loss of ~$200K/month even though CVR is up 8%. I\'d flag this as a cannibalization pattern and recommend investigating whether we can recover AOV through downstream changes before shipping."' },
    ],
  },
  {
    id: 'hte',
    category: 'Experimentation',
    title: 'Heterogeneous Treatment Effects: When the Average Hides the Story',
    summary: 'An average null result can mask a strong positive for one segment and a strong negative for another. HTE analysis is where the real insight lives.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Mobile Feature Test (HTE)', room: 'review', id: 's05' },
    ],
    content: [
      { type: 'text', text: 'The average treatment effect is a weighted average of treatment effects across all your users. When those effects are heterogeneous — different for different segments — the average obscures what\'s actually happening. Sometimes the average being null is the least interesting thing about the experiment.' },
      { type: 'heading', text: 'When to Look for HTE' },
      { type: 'list', items: [
        'Average result is null but you have strong prior that the treatment should help some users',
        'Feature is clearly more relevant to some segments (power users, mobile users, new users)',
        'Average result shows harm — are there segments that benefited enough to justify a targeted rollout?',
        'The mechanism of the feature logically differs by user type',
      ]},
      { type: 'example', label: 'Classic HTE pattern', text: 'Mobile-only feature: Average result null.\nCut by platform:\n  Mobile: +8% engagement (statistically significant)\n  Desktop: -4% engagement (statistically significant)\n\nAverage: ~0%. The feature worked on the intended platform. Don\'t kill it — ship it mobile-only.' },
      { type: 'heading', text: 'How to Do HTE Analysis Correctly' },
      { type: 'text', text: 'HTE analysis is exploratory by default — you\'re looking at multiple subgroups, which inflates false positive risk. To make HTE findings credible:' },
      { type: 'list', items: [
        'Pre-register your HTE segments before the experiment starts (e.g., "we expect this to differ by platform")',
        'Apply multiple testing corrections when looking at many subgroups post-hoc',
        'Use HTE findings to generate hypotheses for future experiments, not to make ship decisions on their own',
        'The most credible HTE finding: pre-registered, with a mechanistic reason why the segment would differ',
      ]},
      { type: 'callout', label: 'The interview move', text: 'When an experiment returns null or inconclusive, and the interviewer asks "what would you do next?" — HTE analysis is one of three strong answers: (1) look for HTE by segment, (2) extend runtime if novelty effect is suspected, (3) check whether the metric choice was correct.' },
    ],
  },
  {
    id: 'two-sided-marketplace-experiments',
    category: 'Experimentation',
    title: 'A/B Testing in Two-Sided Marketplaces: What\'s Different',
    summary: 'Experiments that affect both buyers and sellers create interference by design. Switchback designs, holdout groups, and marketplace-aware randomization — when and how to use each.',
    readMin: 6,
    source: 'Airbnb, Uber, eBay interview pattern',
    relatedItems: [
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
    content: [
      { type: 'text', text: 'Standard A/B testing assumes treatment and control users don\'t interact. In a two-sided marketplace, they do — a seller assigned to treatment still serves buyers in control. This interference violates the SUTVA assumption and makes your effect estimates biased.' },
      { type: 'heading', text: 'The Interference Problem' },
      { type: 'text', text: 'Imagine testing a "Boost" feature for sellers that increases their listing visibility. Treatment sellers get more traffic from control-group buyers. Control sellers lose traffic to treatment sellers. Your treatment effect is inflated and the control baseline is depressed. The test is running, but estimates are wrong.' },
      { type: 'framework_box', label: 'Design Options for Marketplace Experiments', items: [
        'Cluster randomization: Randomize at market/geography level. Entire markets see treatment — reduces cross-unit interference.',
        'Holdout design: Randomly prevent a small % of listings/sellers from ever being exposed. Compare treated to holdout.',
        'Switchback design: Alternate treatment and control across time periods for the same market. Good for real-time matching markets.',
        'Two-sided randomization: Randomize both sellers and buyers independently and analyze joint effects.',
      ]},
      { type: 'callout', label: 'Interview signal', text: 'If asked to design an experiment for any marketplace feature, immediately flag: "This is a two-sided marketplace — standard user-level randomization creates interference. I\'d use [cluster/switchback] randomization to isolate the effect, accepting the tradeoff of lower statistical power per unit."' },
    ],
  },
  {
    id: 'end-to-end-experiment',
    category: 'Experimentation',
    title: 'End-to-End Experiment: Hypothesis to Ship/Rollback Decision',
    summary: 'Most prep covers individual concepts. This walks the full lifecycle — hypothesis, metric selection, power, trust checks, readout, final call.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Checkout CVR Drop (Review)', room: 'review', id: 's01' },
    ],
    content: [
      { type: 'text', text: 'Most interview prep covers experiment concepts in isolation. Here\'s the complete lifecycle of one experiment — every stage in sequence, with the decision point at each step.' },
      { type: 'framework_box', label: 'Full Experiment Lifecycle', items: [
        '1. Hypothesis: "Changing X will improve Y because [mechanism]. Expected effect: ≥Z%."',
        '2. Metric selection: Primary (1), secondary (2-3), guardrails (1-2). All pre-committed.',
        '3. Power calculation: Required sample size for MDE at 80% power, α = 0.05.',
        '4. Randomization unit: User / session / seller — based on SUTVA and network effects.',
        '5. Launch + trust checks: SRM check, day-1 data validation, pipeline confirmation.',
        '6. Monitoring: No peeking for significance until minimum runtime. Guardrail monitoring allowed.',
        '7. Readout: Primary metric + CIs, secondary metrics, guardrails. Apply pre-committed decision rule.',
        '8. Final call: Ship / iterate / rollback — with written rationale filed.',
      ]},
      { type: 'callout', label: 'The most skipped step', text: 'Step 5 (trust checks) is most commonly skipped in interview answers. Mentioning SRM check and data pipeline validation before interpreting results signals that you know experiments break in practice — not just in theory. That\'s the senior signal.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // STATISTICS
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'p-values',
    category: 'Statistics',
    title: 'p-values Don\'t Mean What You Think They Mean',
    summary: 'p < 0.05 does not mean 95% chance the treatment works. Understanding what it actually says changes every experiment readout you\'ll ever do.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
    ],
    content: [
      { type: 'text', text: 'p < 0.05 does not mean there is a 95% probability that the treatment works. It does not mean the effect is large or practically meaningful. It does not mean the null hypothesis is false. Getting this wrong produces confident statements about uncertain results.' },
      { type: 'callout', label: 'The correct interpretation', text: 'p = 0.03 means: if the null hypothesis were true (no real effect), there is a 3% probability of observing a result at least as extreme as this one by chance. That\'s it. It says nothing about the probability that the treatment works.' },
      { type: 'heading', text: 'The Three Most Common Misinterpretations' },
      { type: 'list', items: [
        '"p < 0.05 means 95% confidence the treatment works" — wrong. It means a specific probability about the data, not about the hypothesis.',
        '"p = 0.04 is significant; p = 0.06 is not" — the 0.05 threshold is a convention, not a law. A CI that barely excludes zero and one that barely includes zero are almost the same thing.',
        '"Not significant means no effect" — an underpowered test can produce p = 0.4 for a real 10% effect. Absence of evidence is not evidence of absence.',
      ]},
      { type: 'heading', text: 'What to Say Instead' },
      { type: 'text', text: 'Instead of "the result is significant at p < 0.05," say: "The result is consistent with a [X% to Y%] lift in [metric], and we can reject the hypothesis of no effect at the 5% significance threshold." This is longer but accurate — and it includes the effect size range, which is what stakeholders actually need.' },
    ],
  },
  {
    id: 'confidence-intervals',
    category: 'Statistics',
    title: 'Confidence Intervals: Read Them, Don\'t Just Report Them',
    summary: 'A CI that barely excludes zero is not the same as one centered far from zero. Most analysts report CIs but don\'t read them.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
    ],
    content: [
      { type: 'text', text: 'A confidence interval is a range of plausible effect sizes, not just a significance test. Two experiments can both be "statistically significant" while telling completely different business stories — if you only look at the p-value, you miss the story.' },
      { type: 'callout', label: 'Correct interpretation', text: 'A 95% CI means: if we repeated this experiment many times, 95% of the computed intervals would contain the true effect. For a single experiment, it means: the effect is plausibly somewhere in this range. The range matters as much as whether it excludes zero.' },
      { type: 'heading', text: 'What the Width and Position Tell You' },
      { type: 'list', items: [
        'CI [+0.1%, +0.15%]: Statistically significant, but practically irrelevant. Shipping for 0.1% is rarely justified.',
        'CI [+3%, +12%]: Significant and practically meaningful. The uncertainty is about how big the win is.',
        'CI [-1%, +5%]: Includes zero — not significant, but consistent with a meaningful effect. May need more power.',
        'CI [+4.9%, +5.1%]: Narrow CI — high precision estimate. Very confident in the effect size.',
        'CI [-8%, +20%]: Wide CI — insufficient data. Could be a big loss or a big win. Uninformative.',
      ]},
      { type: 'heading', text: 'In Experiment Readouts' },
      { type: 'text', text: '"The experiment showed a 5% lift (95% CI: +3% to +7%)" — this means the effect is real and practically meaningful, with the lower bound alone justifying a ship. "The experiment showed a 0.2% lift (95% CI: +0.1% to +0.3%)" — real but tiny. Report both: the point estimate and the range.' },
    ],
  },
  {
    id: 'power-mde',
    category: 'Statistics',
    title: 'Power, MDE, and Why Most A/B Tests Are Underpowered',
    summary: 'Running an underpowered test and calling a null result "no effect" is a common, silent mistake. Here\'s how to calculate what sample size you actually need.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
      { label: 'Design the Notification Timing Test', room: 'design', id: 'd06' },
    ],
    content: [
      { type: 'text', text: 'Power is the probability of detecting a real effect when it exists. Running a test at 20% power means there is an 80% chance you\'ll miss a real effect. Most product experiments are set up with insufficient sample sizes and then the null result is called "no effect" — when the reality is that the test couldn\'t detect the effect it was designed to find.' },
      { type: 'framework_box', label: 'Power Calculation Inputs', items: [
        'MDE (Minimum Detectable Effect): The smallest effect size worth detecting. Set by business value, not statistical convenience.',
        'Baseline metric value: Current conversion rate, revenue per user, etc.',
        'Significance level α: Typically 0.05 — the false positive threshold.',
        'Power (1 - β): Typically 0.80 — 80% chance of detecting the effect if it\'s real.',
        'Required n: Solved from the above four inputs.',
      ]},
      { type: 'callout', label: 'The MDE anchor', text: 'MDE should be anchored to business value, not to what\'s detectable. "What is the minimum improvement that would change our ship decision?" If a 1% CVR lift generates $500K/year and shipping costs $200K, then 1% is your MDE. Do not set MDE by asking "what can we detect?"' },
      { type: 'heading', text: 'The Underpowered Test Trap' },
      { type: 'text', text: 'You run a test at 50% power with an MDE of 5%. The result: p = 0.18, not significant. The team concludes the feature doesn\'t work. But with 50% power, there was a coin-flip chance of missing a real 5% effect. "Not significant" is not "no effect" — it\'s "insufficient evidence at this sample size." Name this distinction explicitly.' },
    ],
  },
  {
    id: 'type1-type2',
    category: 'Statistics',
    title: 'Type I vs Type II Errors in Product Decisions',
    summary: 'Type I: shipping something that doesn\'t work. Type II: not shipping something that does. The cost of each depends on your product context — not just alpha.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
    ],
    content: [
      { type: 'text', text: 'Type I error (false positive): you declare a winner that isn\'t real — and ship a feature that does nothing or causes harm. Type II error (false negative): you fail to detect a real effect — and don\'t ship a feature that would have helped. Both have business costs. The right alpha and power levels depend on which cost is higher.' },
      { type: 'framework_box', label: 'Type I vs Type II', items: [
        'Type I (False Positive): Conclude effect exists when it doesn\'t. Rate = α (typically 0.05). Cost: shipping features that don\'t work, wasting engineering effort, potential user harm.',
        'Type II (False Negative): Conclude no effect when effect is real. Rate = β (1 - power). Cost: not shipping features that would have helped users or grown the business.',
      ]},
      { type: 'heading', text: 'When Asymmetric Costs Change Your Threshold' },
      { type: 'list', items: [
        'Safety-related features: Type I cost is high (shipping something harmful) → use α = 0.01',
        'Low-risk UX experiments: Type II cost is high (missing wins) → use α = 0.1 and lower power threshold',
        'Expensive-to-build features: Type II cost is high (engineer months wasted if null) → higher power, smaller MDE',
        'Marketing personalization: Many tests, fast iteration → Bayesian approach; different tradeoff model',
      ]},
      { type: 'callout', label: 'Interview signal', text: '"What alpha level would you use?" — the senior answer is not "0.05 always." It\'s: "Alpha depends on the relative cost of Type I vs Type II errors for this specific decision. For a high-stakes safety feature, I\'d use 0.01. For a low-risk UX test, 0.10 is defensible if we care more about shipping wins than avoiding false positives."' },
    ],
  },
  {
    id: 'practical-vs-statistical',
    category: 'Statistics',
    title: 'Statistical Significance vs Practical Significance',
    summary: 'A 0.01% CVR lift can be statistically significant at scale. It is almost never practically significant. Knowing which you\'re looking at prevents bad ship decisions.',
    readMin: 3,
    source: null,
    relatedItems: [
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
    ],
    content: [
      { type: 'text', text: 'At Amazon or Meta scale, tiny effects become statistically significant with certainty. A 0.001% conversion rate improvement on 100M sessions/day will be p < 0.001. That doesn\'t mean you should ship it. Statistical significance and practical significance are separate questions — only practical significance determines if it\'s worth building.' },
      { type: 'callout', label: 'The scale effect', text: 'Statistical significance grows with sample size. Given enough data, even noise becomes "significant." Practical significance is about effect size: is this improvement large enough to justify the engineering cost, the maintenance burden, and the opportunity cost of what you didn\'t build instead?' },
      { type: 'heading', text: 'How to Evaluate Practical Significance' },
      { type: 'list', items: [
        'Translate the effect to revenue or user impact: "A 0.01% CVR lift at our volume is $X/year — is that worth the eng investment?"',
        'Compare to your MDE: Was the MDE you set based on business value? If the observed effect is below MDE, it may be practically insignificant even if p < 0.05.',
        'Check the confidence interval lower bound: Even if the point estimate is meaningful, if the CI lower bound represents a negligible impact, the uncertainty alone suggests holding off.',
      ]},
      { type: 'text', text: 'In experiment readouts, always pair statistical significance with the practical interpretation: "The 0.02% conversion lift (p = 0.003) translates to approximately $120K/year at current volume. Given the implementation complexity, our threshold for this type of change is $500K. This does not meet the bar for ship."' },
    ],
  },
  {
    id: 'simpsons-paradox',
    category: 'Statistics',
    title: 'Simpson\'s Paradox: When the Aggregate Points the Wrong Direction',
    summary: 'A treatment can appear to help in every subgroup while hurting in aggregate — or vice versa. Real product examples and the segmentation habit that catches it.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'Simpson\'s Paradox occurs when a trend that appears in aggregate data disappears or reverses when the data is segmented. The most famous real-world example: UC Berkeley admissions appeared to show bias against women in aggregate — but in every individual department, women were admitted at higher rates than men. The paradox arose because women applied disproportionately to more competitive departments.' },
      { type: 'heading', text: 'A Product Analytics Example' },
      { type: 'example', label: 'Experiment result — before segmentation', text: 'Treatment CVR: 2.8%\nControl CVR: 3.1%\n→ Conclusion: Treatment hurt CVR by 0.3pp' },
      { type: 'example', label: 'Same result — after segmenting by user type', text: 'New users:   Treatment 2.1% vs Control 1.8% → Treatment HELPED (+0.3pp)\nReturning:   Treatment 4.2% vs Control 3.9% → Treatment HELPED (+0.3pp)\n→ But new users flooded into treatment during the experiment, pulling down aggregate' },
      { type: 'text', text: 'The treatment helped both segments — but the aggregate showed a loss. The mix of new vs returning users in treatment vs control was different (SRM-adjacent issue, or natural mix shift during test period).' },
      { type: 'callout', label: 'Detection habit', text: 'After any experiment readout — especially a null or negative result — segment by 2-3 key dimensions (new vs returning, platform, geography). If the aggregate says one thing but all segments say another, you have a composition problem, not a product signal.' },
    ],
  },
  {
    id: 'bayesian-vs-frequentist',
    category: 'Statistics',
    title: 'Bayesian vs Frequentist A/B Testing: The Practical Difference',
    summary: 'You don\'t need to pick a side. The choice affects how you interpret results and communicate uncertainty — both matter in product work.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
    ],
    content: [
      { type: 'text', text: 'Frequentist and Bayesian testing answer slightly different questions. Frequentist: "Is this result unlikely to be due to chance?" Bayesian: "Given what we\'ve observed, what is the probability that treatment is better than control?" The second question is closer to what product teams actually want to know — but Bayesian testing has its own assumptions and risks.' },
      { type: 'framework_box', label: 'Frequentist vs Bayesian', items: [
        'Frequentist: Uses p-values and confidence intervals. Requires pre-committed sample size. Strict alpha guard against false positives. Most common in mature platforms.',
        'Bayesian: Uses posterior probability ("78% chance treatment is better"). Allows continuous monitoring. Requires a prior. More interpretable for non-statistical stakeholders.',
      ]},
      { type: 'heading', text: 'The Practical Differences' },
      { type: 'list', items: [
        'Communication: "78% probability treatment is better" (Bayesian) vs "p = 0.04, we reject the null" (Frequentist). Bayesian is often more intuitive for PMs.',
        'Peeking: Bayesian naturally handles continuous monitoring better. Frequentist peeking inflates false positive rates unless sequential testing methods are used.',
        'Prior: Bayesian requires a prior distribution. A bad prior biases results, especially in small samples.',
        'Standard: Most enterprise experimentation platforms (Optimizely, Statsig, Amplitude) now offer both; Frequentist remains the default for regulatory and compliance contexts.',
      ]},
      { type: 'callout', label: 'Interview approach', text: '"Which do you prefer, Bayesian or Frequentist?" — the right answer is contextual: "For mature products with high traffic where we run sequential tests, Bayesian gives better real-time decision support. For regulated contexts or when we need provable false positive control, Frequentist with pre-committed sample sizes." Picking sides without context is a red flag.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // AMBIGUOUS PROBLEMS
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'ambiguous-10-steps',
    category: 'Ambiguous Problems',
    title: 'How to Break Down Any Ambiguous Product Question in 10 Steps',
    summary: 'Interviewers want to see you convert a fuzzy question into structured analysis — not a metrics list. Here\'s the framework.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: '"Should we launch this feature?" "Why is retention falling?" "Is this working?" These questions don\'t come with a formula. The skill is converting a fuzzy question into a structured analysis in real time — without the crutch of knowing the answer in advance.' },
      { type: 'framework_box', label: 'The 10-Step Ambiguous Question Framework', items: [
        '1. Restate the business decision being made (not the analysis task)',
        '2. Name the success condition: how would we know if this succeeded?',
        '3. Identify the question type: RCA, sizing, causal, or diagnostic?',
        '4. State the data you\'d need (tables, grain, joins)',
        '5. Name one key assumption and its direction of error',
        '6. Propose the primary analysis: what query or model answers the core question?',
        '7. Name two alternative explanations your analysis can\'t rule out',
        '8. Identify the one data gap that would most change your conclusion',
        '9. State your current best guess before all data is in',
        '10. Recommend a decision, not just an observation',
      ]},
      { type: 'callout', label: 'The most common failure mode', text: 'Jumping to metrics in step 1. The question "How would you measure the success of X?" does not start with a metrics list — it starts with "success of X from whose perspective, over what time horizon, and compared to what baseline?" That framing takes 30 seconds and changes the entire subsequent answer.' },
    ],
  },
  {
    id: 'proxy-design',
    category: 'Ambiguous Problems',
    title: 'Proxy Design: What to Do When You Don\'t Have the Exact Data',
    summary: '"We don\'t have that data" is never a complete answer. Senior analysts propose proxies with stated limitations.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
    ],
    content: [
      { type: 'text', text: '"We don\'t have that data" is the most common cop-out in product analytics. Sometimes it\'s true — you don\'t have exactly what you need. The senior move is to propose a proxy that gets you 80% of the way there, state the direction of error it introduces, and flag what you\'d instrument to get the full signal in the future.' },
      { type: 'framework_box', label: 'Proxy Design Process', items: [
        '1. Name what you actually need: "I need to know if users genuinely resolved their issue."',
        '2. State why it\'s unavailable: "We don\'t have post-interaction survey data."',
        '3. Propose a proxy: "I\'d use re-contact rate within 48 hours as a proxy for non-resolution."',
        '4. State the direction of error: "This undercounts non-resolution — some users give up rather than re-contacting."',
        '5. Name the instrumentation ask: "To get exact resolution data, we\'d need a post-chat satisfaction question."',
      ]},
      { type: 'callout', label: 'The interview template', text: '"I don\'t have [X] directly, so I\'d use [Y] as a proxy. This gives me [what I can learn] but understates/overstates [what direction] because [reason]. The key assumption is [Z]. To get the exact answer, I\'d recommend instrumenting [specific event or survey]." That structure shows analytical completeness even under data constraints.' },
    ],
  },
  {
    id: 'sound-senior',
    category: 'Ambiguous Problems',
    title: '20 Answer Patterns That Signal Analytical Seniority',
    summary: 'The difference between analyst-level and senior-level answers is often phrasing and structure, not knowledge.',
    readMin: 6,
    source: 'Composite from Meta, Google, Airbnb interview feedback',
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'The gap between analyst-level and senior-level interview answers is often not technical knowledge — it\'s framing, self-awareness about assumptions, and always closing with a recommendation. Here are 20 patterns that move your answer up a level.' },
      { type: 'framework_box', label: 'Senior Phrasing Patterns', items: [
        '1. "Before defining metrics, let me clarify the business decision being made..."',
        '2. "My primary metric is X. I\'m choosing it over Y because..."',
        '3. "The key assumption here is [Z]. If that breaks, the conclusion reverses."',
        '4. "I\'d use [proxy] because [direct measure] isn\'t available, accepting that it over-counts [X]."',
        '5. "This is a [RCA / sizing / causal] question — the approach is different for each."',
        '6. "I\'d decompose before hypothesizing — let me start with the math."',
        '7. "The aggregate may be hiding segment movements — I\'d cut by platform and cohort first."',
        '8. "Given the current data, my best estimate is [X]. This could change if [Y]."',
        '9. "I\'d flag this as a guardrail concern before recommending ship."',
        '10. "My recommendation is [X]. The risk is [Y] and I\'d mitigate it by [Z]."',
      ]},
      { type: 'heading', text: 'Ten More — The Self-Calibration Ones' },
      { type: 'list', items: [
        '"I\'m uncertain about X — here\'s how I\'d reduce that uncertainty."',
        '"Two alternative explanations I can\'t rule out with current data are..."',
        '"The worst-case interpretation of this result is..."',
        '"I\'d validate this before presenting to leadership by..."',
        '"This is an interesting case where the simple explanation may be wrong because..."',
        '"The decision changes if [threshold] — let me show the sensitivity."',
        '"I\'d instrument [event] to fill this gap in the future."',
        '"This metric can be gamed by [X] — the guardrail that catches it is [Y]."',
        '"I\'m treating this as exploratory. To make it confirmatory, I\'d need..."',
        '"My bottom line recommendation is [X], with confidence level [medium/high] because..."',
      ]},
    ],
  },
  {
    id: 'five-question-types',
    category: 'Ambiguous Problems',
    title: 'The 5 Question Types in Every DS Product Analytics Loop',
    summary: 'Diagnose a movement. Measure whether something works. Size an opportunity. Build a decision model. ML modeling. Each has a different structure and opening move.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'Most product DS interview questions fall into one of five types. Recognizing the type determines your opening move — and candidates who jump to an answer before naming the type often use the wrong structure.' },
      { type: 'framework_box', label: 'The 5 Question Types', items: [
        '1. Diagnosis: "Why did [metric] move?" — Opening move: Context + decompose + segment. Output: root cause.',
        '2. Measurement: "Is this feature working / did this launch succeed?" — Opening move: Define success metric, identify experiment or quasi-experiment. Output: causal estimate.',
        '3. Opportunity Sizing: "Is this worth building?" — Opening move: Fermi estimate with base rates + addressable population + realistic lift. Output: expected impact range.',
        '4. Decision Analysis: "Should we do X or Y?" — Opening move: Frame the tradeoffs + decision criteria. Output: a recommendation with conditions.',
        '5. ML/Modeling: "Can we predict/personalize X?" — Opening move: Label design + feasibility + action link. Output: model approach + evaluation plan.',
      ]},
      { type: 'callout', label: 'Opening move first', text: 'When an interview question arrives, state the type first: "This is a measurement question — it requires a causal setup, not just observation." That framing signals you understand the different analytical jobs and won\'t accidentally answer a measurement question with an RCA approach.' },
    ],
  },
  {
    id: 'problem-framing',
    category: 'Ambiguous Problems',
    title: 'Problem Framing: Restating the Business Decision Before Touching Data',
    summary: 'The first 60 seconds should never include a metric. Restate the business decision, success definition, and scope — then start the analysis.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'When given an ambiguous question in an interview, the first 60 seconds should be framing — not metrics. Framing means restating what decision needs to be made, who makes it, what success looks like, and what scope you\'re working within. Metrics come third.' },
      { type: 'framework_box', label: 'Framing Before Analysis', items: [
        '1. Restate the decision: "The decision is whether to [launch/invest/change] — not whether the data looks interesting."',
        '2. Name the stakeholder: "This decision is made by the product team, so the frame is product value, not data elegance."',
        '3. Define success: "How do we know this worked? What does good look like one month post-launch?"',
        '4. Set scope: "Are we evaluating global launch or a specific market? New users, existing, or all?"',
        '5. Then name the metrics: "Given that framing, the relevant metric is..."',
      ]},
      { type: 'callout', label: 'Why it matters', text: 'An analysis without framing produces interesting observations, not decision support. "DAU grew 15% after the campaign" is an observation. "DAU grew 15% — which exceeds our 10% success threshold, supports a full rollout, and was driven primarily by organic (not paid) channels, suggesting sustainable growth" is decision support. The frame produces the second version.' },
    ],
  },
  {
    id: 'opportunity-sizing',
    category: 'Ambiguous Problems',
    title: 'Opportunity Sizing: Estimating Impact Before Running an Experiment',
    summary: 'Is this worth building? Sizing with base rates, addressable population, and realistic lift prevents teams from optimizing the wrong things.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'Opportunity sizing answers the question: is this worth building? It\'s a Fermi estimation — not a precise model. The goal is to get the order of magnitude right and identify whether the opportunity is $100K/year or $10M/year before investing eng effort.' },
      { type: 'framework_box', label: 'Sizing Structure', items: [
        '1. Addressable population: How many users are eligible to receive this feature/change?',
        '2. Baseline rate: What is the current rate of the metric this feature affects?',
        '3. Realistic lift: What is a realistic improvement? (Anchor to similar past experiments)',
        '4. Translation to business value: Convert metric improvement to revenue, retention, or cost.',
        '5. Confidence range: Give a low/high estimate, not a point estimate.',
      ]},
      { type: 'example', label: 'Sizing example: checkout streamlining feature', text: 'Addressable population: 2M checkout sessions/month\nBaseline CVR: 68%\nExpected lift: +2pp (based on similar checkout tests)\nIncremental completions: 2M × 0.02 = 40,000/month\nAt AOV of $45: $1.8M/month incremental GMV → ~$216M/year\nAt 8% take rate: ~$17M/year revenue\nConclusion: Large opportunity; justify significant eng investment' },
      { type: 'callout', label: 'The realistic lift anchor', text: 'The most common mistake in sizing: using optimistic lift assumptions. Anchor your lift estimate to past experiments in the same product area. If past checkout changes averaged +0.5pp to +1.5pp, don\'t size at +5pp without a specific reason.' },
    ],
  },
  {
    id: 'stakeholder-communication',
    category: 'Ambiguous Problems',
    title: 'Calibrating Your Answer for PM vs Engineer vs Exec',
    summary: 'Same finding, three different communication styles. Senior analysts know which audience they\'re talking to and adjust depth, vocabulary, and framing accordingly.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: 'The same analysis presented identically to a PM, an engineer, and a VP produces three different reactions — two of them confused or disengaged. Senior analysts code-switch: same content, different frame, different depth, different vocabulary.' },
      { type: 'framework_box', label: 'Three Audience Modes', items: [
        'PM: Decision focus. Lead with the recommendation and its implications. Go into data only if challenged. Frame in business terms: revenue, user impact, tradeoffs.',
        'Engineer: Technical depth welcome. Be specific about data models, query logic, precision. Call out data quality gaps. They will probe implementation details.',
        'Exec/VP: One number, one implication, one ask. No methodology. "Retention fell 3pp in our key market. The likely cause is X. Our recommendation is Y, requiring Z resource."',
      ]},
      { type: 'callout', label: 'The interview version', text: 'In a panel interview, read the room. If the interviewer asks "how would you communicate this to leadership?", they want the exec version: start with the bottom line, work backward to support. If they ask "walk me through your analysis," they want PM or technical depth. Adjust before answering, not halfway through.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // GENAI & ML ANALYTICS
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'deflection-resolution',
    category: 'GenAI Analytics',
    title: 'Deflection ≠ Resolution: The Proxy Trap in AI Support Metrics',
    summary: 'A bot that deflects 80% of tickets looks great. Until you track what happened to those users downstream. The most common GenAI metric mistake.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'GenAI Support Bot', room: 'metrics', id: 'm06' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'Deflection rate — the % of support contacts that end without a human agent — is the most commonly reported AI support metric. It is also the most commonly misinterpreted. A bot can deflect by: answering the user\'s question, confusing them into giving up, or sending them to a FAQ that doesn\'t help. All three show up identically in the deflection rate.' },
      { type: 'callout', label: 'The proxy trap', text: 'Deflection rate measures bot avoidance of human agents — not user issue resolution. These diverge when the bot is effective at ending conversations but not at solving problems. The user leaves the chat without resolving their issue, and the bot counts a deflection.' },
      { type: 'heading', text: 'What to Measure Instead' },
      { type: 'list', items: [
        'Re-contact rate within 24-48 hours: If the user contacts support again soon, the bot didn\'t resolve their issue',
        'Task completion rate: For specific task types (refund, tracking, cancel), did the user complete the task?',
        'Downstream satisfaction: Post-interaction CSAT or NPS, specifically for bot-deflected conversations',
        'Escalation rate from bot: % who ask for a human — high rate means users don\'t trust the bot',
      ]},
      { type: 'heading', text: 'The Full Support Funnel' },
      { type: 'text', text: 'Think of support as a funnel: contact → bot interaction → deflection/escalation → resolution/non-resolution → re-contact. Optimizing deflection rate without measuring resolution rate optimizes the middle of the funnel while ignoring whether the final outcome was achieved.' },
    ],
  },
  {
    id: 'genai-metrics',
    category: 'GenAI Analytics',
    title: 'Measuring GenAI Products: Edit Rate, Task Completion, Satisfaction',
    summary: 'LLM outputs don\'t fit neatly into traditional engagement metrics. Here\'s a framework for defining what success looks like for AI-generated features.',
    readMin: 5,
    source: null,
    content: [
      { type: 'text', text: 'GenAI products — writing assistants, code copilots, chat support bots, summarization tools — produce outputs that don\'t map cleanly to traditional engagement metrics. Session length and page views don\'t capture whether the AI helped. A new metric framework is needed.' },
      { type: 'framework_box', label: 'GenAI Metric Framework', items: [
        'Task Completion Rate: Did the user accomplish what they came to do? Requires defining task types.',
        'Edit Rate: What % of AI-generated outputs did users edit before using? Low edit rate = high confidence in AI.',
        'Acceptance Rate: % of AI suggestions accepted without modification. High = relevant; too high = users may be accepting without checking.',
        'Re-generation Rate: % of users requesting a new output after seeing the first. High = model not meeting expectations.',
        'Time-to-task-completion: Did the AI speed up the user\'s task? Compare AI-assisted vs non-assisted users.',
      ]},
      { type: 'callout', label: 'The acceptance rate nuance', text: 'Very high acceptance rate (>95%) can be a warning sign — it may mean users are accepting AI outputs without verifying them, leading to downstream quality problems. The healthy range depends on the task: for high-stakes outputs (code, legal, medical), high acceptance without edit should trigger a review of user behavior.' },
      { type: 'heading', text: 'Metric Choice by GenAI Use Case' },
      { type: 'list', items: [
        'Coding assistant: Acceptance rate, compilation success rate, time-to-completion',
        'Support bot: Resolution rate, re-contact rate, task completion by task type',
        'Content generator: Edit rate, publish rate, time-from-generation-to-publish',
        'Search summarization: Clicks from summary vs full results, satisfaction rating',
      ]},
    ],
    relatedItems: [
      { label: 'GenAI Support Bot', room: 'metrics', id: 'm06' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
    ],
  },
  {
    id: 'rag-quality-metrics',
    category: 'GenAI Analytics',
    title: 'How to Measure RAG Quality: Retrieval vs Generation vs End Task',
    summary: 'A RAG system has two failure modes — bad retrieval and bad generation — and they need different diagnostics.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'A RAG (Retrieval-Augmented Generation) system retrieves relevant documents, then generates a response grounded in them. When a RAG system produces bad output, the failure can be in retrieval (wrong documents fetched), generation (bad answer from good documents), or the end task (technically correct answer but doesn\'t help the user). Each failure needs a different fix.' },
      { type: 'framework_box', label: 'RAG Quality Layers', items: [
        'Retrieval quality: Are the right documents being fetched? Metrics: recall@k, MRR, NDCG. Issue: retrieved docs aren\'t relevant to the query.',
        'Generation quality: Is the model producing accurate, grounded responses from retrieved docs? Metrics: faithfulness score, hallucination rate, citation accuracy.',
        'End-task quality: Does the response actually help the user? Metrics: task completion, user satisfaction, re-query rate.',
      ]},
      { type: 'callout', label: 'The diagnostic logic', text: 'If resolution rate is low but users are not re-querying: generation failure (wrong answer from right docs). If users are re-querying with more specific terms: retrieval failure (docs not relevant to original query). If users are converting to human agents: end-task failure (technically correct but doesn\'t match user need).' },
      { type: 'heading', text: 'Practical Measurement in Product Analytics' },
      { type: 'text', text: 'For most product teams, offline RAG evaluation (RAGAS, LLM-as-judge) is the starting point. But for business decisions, pair offline metrics with online behavioral signals: re-query rate, satisfaction rating, escalation rate. Offline quality can look good while online behavior shows user frustration.' },
    ],
  },
  {
    id: 'ab-testing-llm',
    category: 'GenAI Analytics',
    title: 'A/B Testing LLM Features: What\'s Different and What\'s Not',
    summary: 'Experimentation fundamentals still apply — but LLM outputs have high variance, latency effects, and user adaptation patterns that complicate standard design.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
    content: [
      { type: 'text', text: 'The fundamentals of A/B testing (SRM checks, pre-committed metrics, guardrails, minimum runtime) all still apply to LLM features. But LLM outputs introduce specific complications that standard experimentation doesn\'t face.' },
      { type: 'framework_box', label: 'What\'s Different for LLM Experiments', items: [
        'Output variance: LLM outputs are non-deterministic — the same user seeing the same prompt may get different outputs across sessions. This increases variance and reduces statistical power.',
        'Latency effects: LLM features add latency. Test for latency impact separately — slower responses may hurt metrics even if output quality improves.',
        'User adaptation: Users learn to interact with AI over time. Early experiment results may not reflect steady-state behavior. Consider novelty effect adjustments.',
        'Metric sensitivity: Traditional engagement metrics (CTR, session length) may not capture LLM output quality. Need task-specific metrics (completion, edit rate).',
      ]},
      { type: 'callout', label: 'The novelty effect problem', text: 'LLM features often get a novelty boost in experiments — users engage more just because the feature is new and interesting. This inflates early results. For LLM experiments, run for at least 2-3 weeks and check if the effect attenuates by cohort-day (day 1 vs day 7 behavior for users in the experiment).' },
      { type: 'heading', text: 'What Stays the Same' },
      { type: 'text', text: 'SRM checks, pre-commitment, guardrails on latency and error rate, and minimum runtime rules all still apply. The test infrastructure doesn\'t change — only the metric choices and variance considerations need adjustment.' },
    ],
  },
  {
    id: 'ml-vs-crosstab',
    category: 'GenAI Analytics',
    title: 'When to Use ML vs a Simple Crosstab',
    summary: 'Over-indexing on ML for problems solvable with a crosstab is a red flag in senior interviews. Here\'s the decision tree.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'Proposing a machine learning model for a question that a crosstab would answer in 15 minutes is one of the clearest red flags in a product DS interview. ML has a place — but that place is not "every analytical question we have."' },
      { type: 'framework_box', label: 'Decision Tree: ML vs Simpler Analysis', items: [
        'Use a crosstab/segment analysis when: The question is descriptive or diagnostic. You need to understand which segment behaves differently, or why a metric moved.',
        'Use regression when: You need to control for confounders and understand the relationship between variables, or quantify the independent impact of a feature.',
        'Use ML when: You need to predict a continuous outcome or classify users at scale, personalization requires handling many features simultaneously, and the prediction is actionable.',
        'Don\'t use ML when: Sample is small (<1K observations), the question is causal (ML can\'t establish causality), or the answer is needed in 24 hours.',
      ]},
      { type: 'callout', label: 'The interview signal', text: '"We want to identify which users are likely to churn" — a natural ML use case. But before proposing a churn model, ask: "Is there a simple behavioral signal that predicts churn well enough? If users who don\'t complete onboarding churn at 80%, a crosstab by onboarding_complete = true/false may be all we need to target interventions."' },
    ],
  },
  {
    id: 'churn-prediction',
    category: 'GenAI Analytics',
    title: 'Churn Prediction: Label Design, Feature Engineering, Business Actionability',
    summary: 'A churn model nobody acts on is a wasted model. It starts with label design and ends with an intervention — here\'s the full pipeline.',
    readMin: 6,
    source: 'Lyft, DoorDash, Spotify interview pattern',
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
    ],
    content: [
      { type: 'text', text: 'A churn prediction model is only valuable if it leads to an intervention. The question "should we build a churn model?" is really the question "is there an intervention we can run if we know someone is going to churn — and can we identify them early enough to act?"' },
      { type: 'heading', text: 'Step 1 — Label Design' },
      { type: 'text', text: 'Churn is defined as: no activity for N days, where N is product-specific. For a daily-use product like a ride-share app, 30 days of inactivity = churn. For a B2B SaaS product, the threshold might be 90 days. The prediction horizon determines the label window: if you want to intervene 2 weeks before churn, you predict churn status at day T+14, trained on behavior up to day T.' },
      { type: 'framework_box', label: 'Churn Model Pipeline', items: [
        '1. Define churn: No activity in [N] days from the prediction date',
        '2. Define prediction horizon: How far in advance do you need to know?',
        '3. Feature engineering: Recency, frequency, session depth, feature usage, trend features (declining activity)',
        '4. Model training: Binary classification — churned (1) vs retained (0) at the horizon',
        '5. Actionability check: What intervention exists? Discounts? Push notifications? CSM outreach?',
        '6. Targeting threshold: At what probability do you trigger the intervention? Higher threshold = fewer triggers, higher precision',
      ]},
      { type: 'callout', label: 'The actionability check', text: '"We can predict churn with 75% accuracy" is meaningless without: "...and we have an intervention that reduces churn by X% at cost Y, generating positive ROI for users with predicted churn probability > Z." Always connect the model to the decision it enables.' },
    ],
  },
  {
    id: 'feature-importance-causality',
    category: 'GenAI Analytics',
    title: 'Feature Importance vs Causality: Why Your Model\'s Top Feature May Be a Confounder',
    summary: 'SHAP values tell you what the model learned — not what caused the outcome. Mixing the two leads to bad interventions and wrong product decisions.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'SHAP values and feature importance scores tell you which features the model relies on to make predictions. They do not tell you which features cause the outcome. This distinction is often blurred in product decisions — with costly results.' },
      { type: 'callout', label: 'The key distinction', text: '"Days since last purchase" being the top feature in a churn model tells you the model uses recency to predict churn. It does NOT mean that making users purchase more frequently will reduce churn — the causal relationship may run the opposite way (happy users happen to purchase more, not: purchasing more makes users happy).' },
      { type: 'heading', text: 'The Common Mistake' },
      { type: 'text', text: 'A retention model shows "feature A usage" as the top predictor of 6-month retention. The product team builds a campaign to push more users into feature A. Result: engagement with feature A increases, but retention doesn\'t. Why? Feature A usage was a proxy for user engagement level, not the cause of retention. High-engagement users use feature A and also retain well — but making low-engagement users use feature A doesn\'t change their engagement level.' },
      { type: 'list', items: [
        'Feature importance tells you: predictive power of a feature for the model\'s target variable',
        'Causality requires: an experiment where the feature is independently varied, with retention as the outcome',
        'Correlation ≠ causation: The feature might correlate with both the treatment and outcome (confounding)',
        'The action link: Before acting on a top feature, ask: "Can we experimentally increase this feature\'s usage, and would that actually change the outcome?"',
      ]},
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // PRODUCT SENSE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'product-sense-ds',
    category: 'Product Sense',
    title: 'Product Sense for Data Scientists: What\'s Actually Being Tested',
    summary: 'DS product sense is not PM product sense. You\'re not being asked what to build — you\'re asked how to know if it\'s working and what the data says to do next.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: '"How would you improve our search product?" sounds like a PM question. When asked to a data scientist, it\'s actually asking: "How would you diagnose what\'s broken, measure what works, and design the data-driven decision process for improving it?" The answer is analytical, not aspirational.' },
      { type: 'framework_box', label: 'DS Product Sense = Three Questions', items: [
        '1. How do we know if it\'s working? — Define the metric system: north star, diagnostics, guardrails.',
        '2. What does the data say is broken? — RCA or diagnostic analysis from observed patterns.',
        '3. How do we decide what to do next? — Prioritize by opportunity size + confidence in causal mechanism.',
      ]},
      { type: 'heading', text: 'What Interviewers Are Testing' },
      { type: 'list', items: [
        'Do you understand how the product creates value for users? (Business intuition)',
        'Can you translate product goals into measurable metrics? (Metrics thinking)',
        'Do you know which data would tell you if the product is healthy? (Analytical depth)',
        'Can you close with an action recommendation, not just an observation? (Decision orientation)',
      ]},
      { type: 'callout', label: 'The pattern', text: '"Tell me about a product you love and how you\'d measure its success" — start with the user value, translate to a metric hierarchy (north star, diagnostic, guardrail), name one thing you\'d investigate in the current data, and close with what decision that investigation would enable.' },
    ],
  },
  {
    id: 'feature-launch-metrics',
    category: 'Product Sense',
    title: 'Defining Success Metrics for Any Feature Launch',
    summary: 'North star → diagnostics → guardrails → decision rule. The four-layer metric structure that makes any launch measurable from day one.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Design the Mobile Feature Test', room: 'design', id: 'd03' },
    ],
    content: [
      { type: 'text', text: 'Before a feature launches, you need a metric system, not a metric list. A list of 10 metrics with no hierarchy produces analysis paralysis on launch day — every metric moved slightly in a different direction and nobody knows whether to ship.' },
      { type: 'framework_box', label: 'Four-Layer Metric Structure', items: [
        '1. Primary success metric: The one number that defines success. If this improves significantly, the launch was a win. Pre-commit before launch.',
        '2. Diagnostic metrics (2-3): Explain whether the primary moved for the right reason. If primary is up, are diagnostics consistent with the mechanism we expected?',
        '3. Guardrail metrics (1-2): Metrics that must not degrade. Pre-commit thresholds before launch. Violation blocks ship.',
        '4. Decision rule: Written before launch. "We ship if primary metric improves ≥X% with p < 0.05 and guardrails are within threshold."',
      ]},
      { type: 'callout', label: 'Interview application', text: '"What metrics would you use to measure the success of [feature]?" — answer with the full structure. Name the primary first and explain why it\'s primary over alternatives. Then add one guardrail and explain what it protects against. That structure, not a list of 8 metrics, is the senior answer.' },
      { type: 'heading', text: 'Common Anti-Patterns' },
      { type: 'list', items: [
        'No decision rule: "We\'ll look at the results" without a pre-committed threshold',
        'Too many primary metrics: "We\'ll measure engagement AND retention AND revenue" — pick one primary',
        'No guardrails: Every optimization has a downstream cost; not naming it means you\'ll miss it when it happens',
      ]},
    ],
  },
  {
    id: 'search-ranking-metrics',
    category: 'Product Sense',
    title: 'Measuring Search Ranking Quality: Beyond CTR and CVR',
    summary: 'A ranking change that improves CTR on bad results is a regression. How to build a metric system that captures quality, not just clicks.',
    readMin: 5,
    source: 'eBay, Google, Airbnb search team pattern',
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
    content: [
      { type: 'text', text: 'CTR and CVR measure user click and purchase behavior — not whether the results were good. A clickbait title gets high CTR on an irrelevant result. A deceptively cheap listing converts on first click but leads to a return. Good search ranking metrics must capture downstream outcomes, not just upstream engagement.' },
      { type: 'framework_box', label: 'Search Quality Metric System', items: [
        'MRR (Mean Reciprocal Rank): For navigational queries, did the right result appear in position 1-3?',
        'NDCG (Normalized Discounted Cumulative Gain): Does the ranking order match relevance scores?',
        'Post-click satisfaction: Purchase + no return, or purchase + positive review. Measures outcome quality.',
        'Search refinement rate: % of queries where user immediately refines/reformulates. High = results weren\'t relevant.',
        'Zero-result rate: % of queries returning no results. Direct measure of coverage gap.',
        'Session CVR from search: Did the user who searched eventually convert in the session?',
      ]},
      { type: 'callout', label: 'The quality trap', text: 'CTR at position 1 can be gamed by clickbait. CVR can be inflated by cheap listings that generate returns. The metric that resists gaming: post-click satisfaction = purchase + no return + positive review within N days. Hard to fake, directly reflects user value.' },
    ],
  },
  {
    id: 'marketplace-health',
    category: 'Product Sense',
    title: 'Marketplace Health: 5 Signals That Matter for Two-Sided Platforms',
    summary: 'Liquidity, GMV concentration, buyer-to-seller ratio, fill rate, supply quality. What they mean, how they interact, and what breaks first.',
    readMin: 6,
    source: 'eBay, Airbnb, DoorDash interview pattern',
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'A marketplace is healthy when buyers can reliably find what they want, and sellers can reliably find buyers. GMV measures the outcome. These five signals measure the structural health that predicts whether GMV is sustainable.' },
      { type: 'framework_box', label: '5 Marketplace Health Signals', items: [
        '1. Liquidity (fill rate): % of searches/requests that complete in a transaction. The most direct health signal.',
        '2. GMV concentration: Is GMV concentrated in top 10% of sellers? High concentration = fragility (losing one seller hurts disproportionately).',
        '3. Buyer-to-active-seller ratio: Measures supply-demand balance. Rising ratio = supply isn\'t keeping up with demand.',
        '4. Supply quality score: Average rating, cancellation rate, response time. Predicts buyer satisfaction before complaints arrive.',
        '5. Repeat purchase rate: Buyers returning within a period. Measures trust and value delivery beyond one-off transactions.',
      ]},
      { type: 'heading', text: 'What Breaks First' },
      { type: 'text', text: 'Supply quality typically breaks first, before buyers see it. Sellers under price pressure cut corners on fulfillment → cancellation rate rises → buyer experience degrades → buyers lose trust and stop returning. The sequence: supply quality → fill rate → repeat purchase rate → GMV. Monitor in that order.' },
      { type: 'callout', label: 'The concentration risk', text: 'If your top 10 sellers represent 60% of GMV, each of those sellers\' churn risk is existential. This is a health risk that doesn\'t show up in aggregate GMV until it\'s too late. Track seller concentration alongside GMV every quarter.' },
    ],
  },
  {
    id: 'notification-metrics',
    category: 'Product Sense',
    title: 'Notification Health: Why Open Rate Is the Wrong Primary Metric',
    summary: 'Open rate is a proxy for attention, not value. The right metric captures whether the notification drove the intended action without burning long-term engagement.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
      { label: 'Design the Notification Timing Test', room: 'design', id: 'd06' },
      { label: 'The Push Open Rate Trap', room: 'review', id: 's10' },
    ],
    content: [
      { type: 'text', text: 'Open rate measures whether a user tapped the notification. It does not measure whether they received value from it. A notification that gets opened out of curiosity (or annoyance) and drives no session action has a high open rate and zero value. The metric system for notifications must capture downstream action, not just the tap.' },
      { type: 'framework_box', label: 'Notification Metric Hierarchy', items: [
        'Primary: Notification-driven action rate — did the user complete the intended action after opening? (Not just open)',
        'Diagnostic: Session depth from notification open — did they stay or bounce immediately?',
        'Guardrail: Opt-out rate — are users unsubscribing from notification categories?',
        'Long-term: D30 retention for heavy-notification vs light-notification users — are notifications helping or burning engagement?',
      ]},
      { type: 'callout', label: 'The open rate trap', text: 'A notification that mentions "your account has a security issue" will get very high open rates. It is manipulative, destroys trust, and generates a negative NPS spike. Open rate would call this a win. Action rate, session depth, and opt-out rate would catch the failure.' },
    ],
  },
  {
    id: 'seller-incentives',
    category: 'Product Sense',
    title: 'Seller Incentive Programs: Measuring ROI Without Getting Fooled by Selection Bias',
    summary: 'Sellers who join an incentive program are different from those who don\'t. Naive before/after comparisons overestimate impact.',
    readMin: 5,
    source: 'eBay, Walmart marketplace team pattern',
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
    ],
    content: [
      { type: 'text', text: 'Seller incentive programs — top seller badges, fee waivers, promotional boosts — are expensive and their ROI is systematically overestimated by naive analysis. The problem: sellers who enroll in an incentive program are different from those who don\'t. They\'re typically more engaged, more experienced, and more likely to grow regardless of the incentive.' },
      { type: 'callout', label: 'The selection bias problem', text: 'Program enrollees grow 30% faster than non-enrollees after joining. But if they were already growing 25% faster before joining, the program added only 5 percentage points. Naive before/after comparison (or enrollee vs non-enrollee) will attribute the full 30% to the program.' },
      { type: 'heading', text: 'Design Options to Get the Causal Effect' },
      { type: 'list', items: [
        'Randomized experiment: Randomly assign eligible sellers to treatment (offered incentive) vs control (not offered). Most accurate but logistically complex.',
        'Diff-in-differences: Compare growth trend before vs after program, for enrollees vs a matched control group. Works if trends were parallel pre-program.',
        'Regression discontinuity: If there\'s an eligibility threshold (e.g., sellers above $X GMV qualify), compare sellers just above vs just below the cutoff.',
        'Matched control: Find statistically similar non-enrolling sellers and compare post-program trajectories.',
      ]},
      { type: 'callout', label: 'Interview framing', text: '"How would you measure the impact of our Top Seller badge program?" — don\'t say "compare badge holders to non-badge holders." Say: "Self-selection creates a comparison bias. I\'d need either a randomized design at enrollment time, or a DiD with matched controls. Without that, the ROI estimate is likely overstated."' },
    ],
  },
  {
    id: 'recommendation-systems-metrics',
    category: 'Product Sense',
    title: 'Measuring Recommendation Systems: Relevance, Diversity, and Long-Term Engagement',
    summary: 'A recommender that maximizes short-term CTR can create filter bubbles, reduce catalog breadth, and hurt long-term retention. How to balance the tradeoffs.',
    readMin: 5,
    source: 'Netflix, Spotify, Amazon interview pattern',
    content: [
      { type: 'text', text: 'Recommendation systems optimize for a metric — and what you optimize shapes the user\'s experience over months, not just sessions. A system that maximizes short-term CTR surfaces whatever gets tapped, not whatever is valuable. This produces filter bubbles, catalog concentration, and long-term disengagement as users see the same top items repeatedly.' },
      { type: 'framework_box', label: 'Three Dimensions of Recommender Quality', items: [
        'Relevance: Did the user engage with what was recommended? Metrics: CTR, watch/listen/purchase rate.',
        'Diversity: Is the catalog used broadly? Metrics: catalog coverage (% of items ever recommended), intra-list diversity, repeat recommendation rate.',
        'Long-term engagement: Do users keep coming back? Metrics: D30/D90 retention, session frequency trend, catalog exploration rate over time.',
      ]},
      { type: 'callout', label: 'The filter bubble problem', text: 'A recommendation engine that only shows you what you already like creates a self-reinforcing loop. Metrics: does a user\'s recommended catalog diversity decrease over time? If the same 50 items are recommended to 80% of users, the long-tail catalog is effectively invisible.' },
      { type: 'heading', text: 'Balancing Relevance vs Diversity' },
      { type: 'text', text: 'Netflix and Spotify explicitly inject diversity into recommendations (new genres, unfamiliar artists) and measure whether those injections improve long-term retention. The experiment design: compare a purely relevance-optimized recommender vs one with diversity injection. Primary metric: D90 retention. Short-term CTR is a guardrail (don\'t let it fall too much), not the primary.' },
    ],
    relatedItems: [
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // SQL & DATA EXECUTION
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sql-funnel-analysis',
    category: 'SQL & Data',
    title: 'Funnel Analysis in SQL: From Session Start to Conversion',
    summary: 'Step-level conversion rates, drop-off diagnosis, and cohort-level funnel comparison. The query patterns every product analyst needs.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
    content: [
      { type: 'text', text: 'Funnel analysis is one of the most common analytical tasks in product analytics. The goal: understand how users move through a multi-step flow, where they drop off, and how that differs across segments or time periods.' },
      { type: 'heading', text: 'The Core Pattern' },
      { type: 'example', label: 'Basic funnel query', text: `SELECT
  COUNT(DISTINCT CASE WHEN event = 'session_start' THEN user_id END) AS step_1,
  COUNT(DISTINCT CASE WHEN event = 'product_view' THEN user_id END) AS step_2,
  COUNT(DISTINCT CASE WHEN event = 'add_to_cart' THEN user_id END) AS step_3,
  COUNT(DISTINCT CASE WHEN event = 'checkout_start' THEN user_id END) AS step_4,
  COUNT(DISTINCT CASE WHEN event = 'purchase_complete' THEN user_id END) AS step_5
FROM events
WHERE event_date BETWEEN '2025-01-01' AND '2025-01-31'
  AND session_date = event_date  -- same-session constraint` },
      { type: 'callout', label: 'The grain question', text: 'Before writing a funnel query, decide: is this user-level (did the user ever hit this step?) or session-level (did they hit it in this session)? Most product funnels are session-level. Using COUNT(DISTINCT user_id) across sessions conflates users who completed across multiple sessions with in-session conversion — make sure you know which you want.' },
      { type: 'heading', text: 'Step-Level Conversion Rates' },
      { type: 'example', label: 'Conversion rate at each step', text: `SELECT
  step_2 / NULLIF(step_1, 0) AS view_rate,
  step_3 / NULLIF(step_2, 0) AS cart_rate,
  step_4 / NULLIF(step_3, 0) AS checkout_rate,
  step_5 / NULLIF(step_4, 0) AS payment_rate,
  step_5 / NULLIF(step_1, 0) AS overall_cvr
FROM (funnel_query_above)` },
      { type: 'heading', text: 'Segmented Funnel (The RCA Version)' },
      { type: 'text', text: 'For RCA, run the same funnel query segmented by platform, geography, or cohort, then compare the step-level rates across segments. The step where one segment diverges is your candidate root cause location.' },
      { type: 'example', label: 'Segmented funnel by platform', text: `SELECT
  platform,
  COUNT(DISTINCT CASE WHEN event = 'session_start' THEN user_id END) AS step_1,
  COUNT(DISTINCT CASE WHEN event = 'purchase_complete' THEN user_id END) AS step_5,
  COUNT(DISTINCT CASE WHEN event = 'purchase_complete' THEN user_id END) * 1.0 /
    NULLIF(COUNT(DISTINCT CASE WHEN event = 'session_start' THEN user_id END), 0) AS cvr
FROM events
WHERE event_date BETWEEN '2025-01-01' AND '2025-01-31'
GROUP BY platform` },
    ],
  },
  {
    id: 'retention-sql',
    category: 'SQL & Data',
    title: 'Retention Curves in SQL: D1, D7, D30 and What They Tell You',
    summary: 'How to compute retention at each horizon, visualize cohort curves, and what shape tells you what about your product\'s stickiness.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: 'Retention analysis answers: of the users who signed up in a given week, what fraction returned X days later? The cohort approach is critical — without it, you\'re measuring the average across users at very different lifecycle stages.' },
      { type: 'heading', text: 'The Core Retention Query' },
      { type: 'example', label: 'D7 retention by signup cohort', text: `SELECT
  DATE_TRUNC('week', u.signup_date) AS cohort_week,
  COUNT(DISTINCT u.user_id) AS cohort_size,
  COUNT(DISTINCT CASE
    WHEN e.event_date BETWEEN u.signup_date + 6
                          AND u.signup_date + 8
    THEN u.user_id END) AS returned_d7,
  COUNT(DISTINCT CASE
    WHEN e.event_date BETWEEN u.signup_date + 6
                          AND u.signup_date + 8
    THEN u.user_id END) * 1.0
    / COUNT(DISTINCT u.user_id) AS d7_retention
FROM users u
LEFT JOIN events e ON u.user_id = e.user_id
WHERE u.signup_date >= '2025-01-01'
GROUP BY 1
ORDER BY 1` },
      { type: 'callout', label: 'The D7 window', text: 'D7 retention is typically defined as: the user was active on day 6, 7, or 8 after signup (a 3-day window around day 7). This accounts for daily variation and users who might return on adjacent days. Some companies use a strict day-7-only definition — always clarify which your team uses.' },
      { type: 'heading', text: 'Reading the Retention Curve Shape' },
      { type: 'list', items: [
        'Steep drop then flat plateau: Typical healthy product. Users either find value quickly (retained) or churn early. The plateau level is your "sticky" user base.',
        'No plateau / continuous decline: Engagement is not habit-forming. Core value isn\'t being delivered consistently.',
        'Improving retention by cohort (newer cohorts retain better): Product improvements are working.',
        'Degrading retention by cohort (newer cohorts worse): Acquisition quality declining, or recent product change hurting new users.',
      ]},
      { type: 'heading', text: 'Comparing Cohorts for RCA' },
      { type: 'text', text: 'When D7 retention drops, plot the cohort curves for the last 4-8 signup weeks. If only the most recent cohort is degraded, it\'s a product or acquisition change from the past week. If multiple recent cohorts are degrading, it\'s a longer-running problem. If all cohorts are degrading at their respective D7s, it\'s a current product regression affecting everyone.' },
    ],
  },
  {
    id: 'cohort-analysis-sql',
    category: 'SQL & Data',
    title: 'Cohort Analysis: Why Every User Metric Should Be Segmented by Acquisition Date',
    summary: 'Aggregating across acquisition cohorts hides composition changes. A product that looks healthy in aggregate may be surviving on strong old cohorts while new ones fail.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
    ],
    content: [
      { type: 'text', text: 'Aggregate user metrics average across every cohort who ever joined the product. A DAU that looks stable might be: old cohorts retaining well, new cohorts failing completely. The product appears healthy but is dying at the front end. Cohort analysis reveals this by tracking each acquisition group separately over time.' },
      { type: 'heading', text: 'The Classic Composition Problem' },
      { type: 'text', text: 'D7 retention is 35% overall. That number is the average of: Jan cohort (42%), Feb cohort (40%), Mar cohort (28%), Apr cohort (24%). Retention is degrading across cohorts, but the aggregate is held up by large, well-retained older cohorts. Without cohort analysis, the problem is invisible.' },
      { type: 'example', label: 'Cohort retention grid in SQL', text: `SELECT
  cohort_week,
  horizon_days,
  cohort_size,
  retained_users,
  retained_users * 1.0 / cohort_size AS retention_rate
FROM (
  SELECT
    DATE_TRUNC('week', u.signup_date) AS cohort_week,
    DATEDIFF(e.event_date, u.signup_date) AS horizon_days,
    COUNT(DISTINCT u.user_id) AS cohort_size,
    COUNT(DISTINCT e.user_id) AS retained_users
  FROM users u
  LEFT JOIN events e ON u.user_id = e.user_id
  WHERE DATEDIFF(e.event_date, u.signup_date) IN (1, 7, 14, 30)
  GROUP BY 1, 2
) t
ORDER BY cohort_week, horizon_days` },
      { type: 'callout', label: 'Reading the cohort grid', text: 'Read each row (cohort) across horizons for a single cohort\'s retention curve. Read each column (horizon) down rows to compare cohorts at the same lifecycle point. Degrading columns = newer cohorts are worse at the same lifecycle point = product or acquisition quality regression.' },
    ],
  },
  {
    id: 'window-functions',
    category: 'SQL & Data',
    title: 'Window Functions for Product Analytics: LAG, LEAD, RANK, Running Totals',
    summary: 'The four window function patterns that appear in almost every product analytics SQL problem — with worked examples.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: 'Window functions perform calculations across a set of rows related to the current row, without collapsing the output like GROUP BY does. Four patterns show up constantly in product analytics SQL.' },
      { type: 'heading', text: 'Pattern 1: LAG for Period-over-Period Change' },
      { type: 'example', label: 'Week-over-week metric change', text: `SELECT
  week,
  dau,
  LAG(dau) OVER (ORDER BY week) AS prev_week_dau,
  dau - LAG(dau) OVER (ORDER BY week) AS wow_change,
  dau * 1.0 / NULLIF(LAG(dau) OVER (ORDER BY week), 0) - 1 AS wow_pct
FROM daily_metrics` },
      { type: 'heading', text: 'Pattern 2: RANK for Top N Per Group' },
      { type: 'example', label: 'Top 3 selling items per category', text: `SELECT *
FROM (
  SELECT
    category,
    item_id,
    total_revenue,
    RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC) AS rank
  FROM item_revenue
) ranked
WHERE rank <= 3` },
      { type: 'heading', text: 'Pattern 3: Running Total / Cumulative Sum' },
      { type: 'example', label: 'Running GMV by month', text: `SELECT
  month,
  gmv,
  SUM(gmv) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS cumulative_gmv
FROM monthly_gmv` },
      { type: 'heading', text: 'Pattern 4: Session-to-Session Gap (LEAD)' },
      { type: 'example', label: 'Time between sessions per user', text: `SELECT
  user_id,
  session_date,
  LEAD(session_date) OVER (PARTITION BY user_id ORDER BY session_date) AS next_session_date,
  DATEDIFF(
    LEAD(session_date) OVER (PARTITION BY user_id ORDER BY session_date),
    session_date
  ) AS days_to_next_session
FROM sessions` },
      { type: 'callout', label: 'Interview note', text: 'When asked "how would you compute returning user rate?" or "how would you track week-over-week changes?" — window functions are typically the clean answer. Stating PARTITION BY and ORDER BY correctly signals SQL fluency.' },
    ],
  },
  {
    id: 'data-quality',
    category: 'SQL & Data',
    title: 'Data Quality Checks Before You Start Any Analysis',
    summary: 'Nulls, duplicates, grain mismatches, timestamp anomalies. The checks that catch silent errors before they become wrong conclusions.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
    ],
    content: [
      { type: 'text', text: 'Data quality errors rarely announce themselves. They produce plausible-looking numbers that are silently wrong. The checks below take 5-10 minutes and have caught more errors than any statistical sophistication in the analysis itself.' },
      { type: 'framework_box', label: 'Pre-Analysis Data Quality Checklist', items: [
        '1. Row count check: Does the count match your expectation? Too few (filter error) or too many (join fanout)?',
        '2. NULL scan: SELECT COUNT(*) WHERE key_field IS NULL — what % of your join keys and metric fields are null?',
        '3. Duplicate check: SELECT id, COUNT(*) GROUP BY id HAVING COUNT(*) > 1 — are there duplicate records at the grain?',
        '4. Date range check: MIN(event_date) and MAX(event_date) — does the range match your intention?',
        '5. Extreme value check: SELECT MAX, MIN, AVG, STDDEV for numeric fields — are there obvious outliers?',
        '6. Grain verification: SELECT COUNT(*) vs COUNT(DISTINCT user_id) — are these equal (user grain) or different (session grain)?',
      ]},
      { type: 'callout', label: 'The join fanout trap', text: 'A LEFT JOIN from users to orders, when users have multiple orders, creates multiple rows per user. COUNT(user_id) is now inflated. Always check: did my row count change after the join? If users table had 10,000 rows and the joined result has 50,000 rows — you have a fanout, and all your aggregates are wrong.' },
    ],
  },
  {
    id: 'ab-test-sql',
    category: 'SQL & Data',
    title: 'Computing A/B Test Results in SQL: Means, Variances, t-stats From Scratch',
    summary: 'Knowing how to compute experiment results in SQL shows you understand what the tool does — and catches errors when it breaks.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
    ],
    content: [
      { type: 'text', text: 'Most teams use an experimentation platform that computes p-values automatically. Knowing how to compute them from scratch in SQL proves you understand what\'s happening under the hood — and lets you debug when the tool gives a suspicious result.' },
      { type: 'heading', text: 'Step 1: Group-Level Statistics' },
      { type: 'example', label: 'Compute means and variances per group', text: `SELECT
  variant,
  COUNT(*) AS n,
  AVG(metric_value) AS mean_metric,
  VARIANCE(metric_value) AS var_metric,
  STDDEV(metric_value) AS std_metric
FROM experiment_users
WHERE experiment_id = 'exp_001'
  AND assignment_date BETWEEN '2025-01-01' AND '2025-01-14'
GROUP BY variant` },
      { type: 'heading', text: 'Step 2: t-statistic Computation' },
      { type: 'example', label: 'Two-sample t-test from summary stats', text: `WITH stats AS (
  SELECT
    MAX(CASE WHEN variant = 'treatment' THEN mean_metric END) AS t_mean,
    MAX(CASE WHEN variant = 'control'   THEN mean_metric END) AS c_mean,
    MAX(CASE WHEN variant = 'treatment' THEN var_metric  END) AS t_var,
    MAX(CASE WHEN variant = 'control'   THEN var_metric  END) AS c_var,
    MAX(CASE WHEN variant = 'treatment' THEN n           END) AS t_n,
    MAX(CASE WHEN variant = 'control'   THEN n           END) AS c_n
  FROM group_stats
)
SELECT
  t_mean - c_mean AS delta,
  (t_mean - c_mean) / SQRT(t_var/t_n + c_var/c_n) AS t_stat
FROM stats` },
      { type: 'callout', label: 'What the t-stat tells you', text: 'A t-stat above ~1.96 corresponds to p < 0.05 for large samples (two-tailed). The exact critical value depends on degrees of freedom — for most product experiments with n > 1000 per group, 1.96 is the right threshold. Cross-check your SQL result with the platform output as a sanity check.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // MENTAL MODELS
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'five-senior-habits',
    category: 'Mental Models',
    title: 'The 5 Senior Thinking Habits That Define Analytical Maturity',
    summary: 'Denominator discipline. Decompose before diagnosing. Segment before aggregating. Guardrails. Business impact translation. Why these five habits compound over a career.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: 'Most analytical knowledge can be looked up. These five habits can\'t — they\'re behavioral patterns that separate analysts who produce correct outputs from analysts who produce correct decisions. They compound over a career because they become automatic.' },
      { type: 'heading', text: '1. Denominator Discipline' },
      { type: 'text', text: 'Before stating any rate metric, name the denominator explicitly. "Conversion rate of what?" is the senior analyst\'s first reflex. Sessions vs users vs intent-qualified visitors produce completely different numbers with completely different implications. The denominator conversation separates a precise metric from a vague one.' },
      { type: 'heading', text: '2. Decompose Before Diagnosing' },
      { type: 'text', text: 'Never form a hypothesis before mathematically decomposing the metric. Decomposition narrows the hypothesis space from 20 guesses to 3 structured candidates. The decomposition step is not optional — it\'s the analytical equivalent of checking your work before submitting.' },
      { type: 'heading', text: '3. Segment Before Aggregating' },
      { type: 'text', text: 'The aggregate is always a weighted average of segment movements. Every metric investigation starts with cuts — platform, geography, cohort, traffic source — before anything else. Diagnosing the aggregate directly is trying to fix a weighted average instead of the components driving it.' },
      { type: 'heading', text: '4. Pre-Commit to Guardrails' },
      { type: 'text', text: 'Name the guardrail metric before seeing results. Not after. The senior analyst\'s reflex when anyone proposes a success metric: "What could this improve while something else breaks?" Then pre-commit to a threshold. Guardrails defined after seeing the data are just post-hoc rationalization dressed up as rigor.' },
      { type: 'heading', text: '5. Translate to Business Impact' },
      { type: 'text', text: 'Never stop at the metric. "CVR improved 0.4pp" means nothing to a PM or executive. "CVR improved 0.4pp on current traffic volume = ~$2.3M additional annual revenue at average AOV" is a decision input. The habit: every metric movement gets translated to the business unit that leadership cares about. Always.' },
      { type: 'callout', label: 'Why these compound', text: 'Each habit takes 30 seconds. Together, they make every analysis more precise, more interpretable, and more actionable. In interviews, demonstrating all five in a single answer is the clearest signal of senior-level readiness.' },
    ],
  },
  {
    id: 'goodharts-law',
    category: 'Mental Models',
    title: 'Goodhart\'s Law: Every Metric Becomes a Bad Metric When It Becomes a Target',
    summary: 'Product analytics history is full of metrics that were gamed the moment teams were held accountable to them. How to design around it.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Checklist Completion Illusion', room: 'review', id: 's12' },
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
    ],
    content: [
      { type: 'text', text: 'Goodhart\'s Law: "When a measure becomes a target, it ceases to be a good measure." This is not a theoretical curiosity — it describes what happens to every major metric in every product organization, given enough time and enough pressure.' },
      { type: 'heading', text: 'The Pattern' },
      { type: 'text', text: 'A metric is chosen because it correlates with value. The team is held accountable to it. They find ways to improve the metric that are cheaper than improving the underlying value. The metric improves. The value doesn\'t. Eventually the metric loses its predictive validity entirely.' },
      { type: 'heading', text: 'Product Analytics Examples' },
      { type: 'list', items: [
        'Activation rate: team triggers mandatory onboarding checklist completion → activation rate improves, D30 retention unchanged',
        'Session length: infinite scroll with low-value content → session length improves, intent satisfaction falls',
        'Support CSAT: agents learn to ask for a rating immediately after a positive moment → CSAT improves, resolution quality unchanged',
        'NPS: surveys timed immediately after a gifting or reward interaction → NPS improves, baseline sentiment unchanged',
      ]},
      { type: 'callout', label: 'The design implication', text: 'Every metric you target will eventually be gamed — including by well-meaning teams. The defense: (1) rotate north stars periodically, (2) use correlated metrics so gaming one is detectable via the others, (3) do qualitative validation alongside quantitative.' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: 'Interviewers often ask "what could go wrong with this metric?" The expected move is Goodhart\'s Law: describe specifically how the metric could be improved without improving the underlying value, and what guardrail you\'d put in place to catch it.' },
    ],
  },
  {
    id: 'survivorship-bias',
    category: 'Mental Models',
    title: 'Survivorship Bias: You\'re Only Seeing the Users Who Stayed',
    summary: 'Analyzing active users to understand engagement tells you nothing about churned users. How survivorship bias corrupts product decisions.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: 'Survivorship bias is analyzing only the entities that made it through a selection process, while ignoring those that didn\'t. In product analytics, it shows up constantly — and almost always invisibly.' },
      { type: 'heading', text: 'The Classic Product Example' },
      { type: 'text', text: 'You want to understand what drives power user behavior. You pull highly engaged users and analyze their patterns: they use Feature X 5x per week, completed Y onboarding steps, connected Z integrations. You build a "features that drive engagement" model.\n\nThe problem: churned users who also tried Feature X but didn\'t become engaged are not in your sample. You\'ve built a model of users who survived, not a model of what causes survival.' },
      { type: 'callout', label: 'The fix', text: 'Include churned users in your analysis. For any cohort study of engagement drivers, take a representative sample of all users — not just current actives — and look at whether the predictor variables differed at the time of the behavior.' },
      { type: 'heading', text: 'Where It Shows Up' },
      { type: 'list', items: [
        'Feature adoption analysis: Users who adopted a feature are more engaged — or are engaged users just more likely to adopt features?',
        'A/B test analysis: Users who churned mid-experiment are underrepresented in post-experiment metrics',
        'RCA on active users: Engagement trends on current actives excludes the signal from those who churned',
        'Seller quality analysis: Active marketplace sellers exclude the signal from sellers who left the platform',
      ]},
      { type: 'heading', text: 'The Interview Signal' },
      { type: 'text', text: '"How would you analyze what drives engagement?" — Flag survivorship bias as a methodological risk. "Pulling only current active users and analyzing their behavior tells me what active users do, not what causes activation or retention. I\'d want to structure this as a cohort study with both retained and churned users from the same signup period."' },
    ],
  },
  {
    id: 'base-rate-neglect',
    category: 'Mental Models',
    title: 'Base Rate Neglect: The Mistake Behind Half of Bad Product Decisions',
    summary: 'A 50% lift on a 0.1% base rate is not interesting. A 5% lift on a 40% base rate is. Relative change without anchoring on the base is a systematic error.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
    ],
    content: [
      { type: 'text', text: 'Relative changes without the base rate are almost meaningless. "We improved conversion by 50%!" is exciting until you learn the base rate was 0.2% and is now 0.3%. That\'s 1 additional conversion per 1000 users. The absolute impact determines whether this matters.' },
      { type: 'heading', text: 'The Pattern' },
      { type: 'list', items: [
        'High relative lift, low base rate: Sounds impressive, may not be actionable. A 100% lift on a 0.01% rate = 0.02% rate. Negligible in absolute terms.',
        'Low relative lift, high base rate: Sounds boring, often very valuable. A 2% improvement to a 60% checkout completion rate = 1.2 percentage points = massive GMV impact at scale.',
        'Framing trap: Teams present relative lifts because they look larger. Always ask for the absolute base.',
      ]},
      { type: 'callout', label: 'The anchor habit', text: 'Every time you see a relative change, immediately ask: "What\'s the base rate?" Then compute: what does this mean in absolute terms? Per day? Per 1M users? Translate to the unit the business cares about.' },
      { type: 'heading', text: 'In Power Analysis' },
      { type: 'text', text: 'Base rate neglect directly affects experiment design. Your MDE (minimum detectable effect) should be specified in absolute terms, not relative. "Detect a 10% relative lift" on a 1% base rate requires detecting a 0.1 percentage point change — which requires far more sample than detecting a 10% relative lift on a 20% base rate (2 percentage points).' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: 'When presented with a result like "we improved the metric by 35%," always anchor before interpreting: "What was the base rate? What does 35% mean in absolute terms? And how does that translate to business impact at the current user volume?" This one habit signals analytical maturity consistently.' },
    ],
  },
  {
    id: 'correlation-causation',
    category: 'Mental Models',
    title: 'Correlation, Causation, and the Analyst Who Got Them Confused',
    summary: 'Applied to real product analytics scenarios — where confusing the two led to bad interventions and what the right analysis would have looked like.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
    ],
    content: [
      { type: 'text', text: 'This is the most cited analytical principle and the most routinely violated one. The problem is not that analysts don\'t know the distinction — it\'s that pressure to turn findings into actionable insight makes it tempting to paper over the gap.' },
      { type: 'example', label: 'Example 1: Seller quality program', text: 'Finding: Sellers enrolled in the quality program have 40% higher GMV than non-enrolled sellers.\nConclusion drawn: The program causes GMV improvement.\nActual issue: Selection bias. High-GMV sellers enroll because they have more to gain. The program didn\'t cause the GMV — the GMV caused the enrollment.' },
      { type: 'example', label: 'Example 2: Feature correlation', text: 'Finding: Users who use Feature X have 3x higher D30 retention.\nConclusion drawn: Promote Feature X to increase retention.\nActual issue: Reverse causality + survivorship. Retained users use Feature X more because they\'re retained, not the reverse. The feature is a symptom of engagement, not a cause.' },
      { type: 'example', label: 'Example 3: Notification timing', text: 'Finding: Users who receive notifications between 7-9pm have the highest CTR.\nConclusion drawn: Send all notifications at 7-9pm.\nActual issue: Confounding. Users active at 7-9pm are the most habitual users anyway. The time slot correlates with user type, it doesn\'t cause engagement.' },
      { type: 'callout', label: 'The tools for establishing causality', text: 'Randomized A/B test → strongest. Quasi-experiment (diff-in-diff, regression discontinuity) → conditional on assumptions. Instrumental variables → requires a valid instrument. Observational correlation alone → not sufficient for causal claims. Always name which method you\'re using and why.' },
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: 'When presented with a correlation finding: "This is consistent with X causing Y, but I\'d want to rule out: (1) reverse causality, (2) a common third cause driving both, (3) selection bias. An experiment would give us cleaner causal evidence."' },
    ],
  },
  {
    id: 'decision-partner-framing',
    category: 'Mental Models',
    title: 'You Are Not a Metrics Reporter — You Are an Analytical Decision Partner',
    summary: 'The mindset shift that changes how you answer every interview question: the output is always a recommendation, not a dashboard.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'Metrics reporter: "Retention fell 3% in February. Here\'s the breakdown by platform." Decision partner: "Retention fell 3% in February, driven by Android users acquired in the Jan campaign. My hypothesis is CAC-driven quality decline. I\'d recommend pausing the campaign and running a cohort quality analysis before the March budget allocation." The data is the same. The value is completely different.' },
      { type: 'callout', label: 'The mindset shift', text: 'Every piece of analysis you do exists to enable a decision. Before starting any analysis, ask: "What decision does this enable? Who makes it? What would they do differently if the answer is X vs Y?" If you can\'t answer those questions, you may be doing analysis for its own sake.' },
      { type: 'framework_box', label: 'Three Operating Modes', items: [
        'Metrics reporter: Describes what happened. Output: numbers and charts. Value: low without context.',
        'Diagnostic analyst: Explains why it happened. Output: root causes and supporting evidence. Value: medium.',
        'Decision partner: Recommends what to do and why. Output: a recommendation with conditions and confidence. Value: high.',
      ]},
      { type: 'heading', text: 'In Interviews' },
      { type: 'text', text: 'Every interview answer should end with a recommendation, not an observation. "CVR fell because of a checkout regression on Android" is diagnostic. "CVR fell because of a checkout regression on Android — I\'d recommend a hotfix within 24 hours and a post-mortem before the next release cycle" is decision partnership. The latter is what senior roles require.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // REAL COMPANY QUESTIONS (sourced from interview experiences)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'meta-dau-drop',
    category: 'Company Questions',
    title: '[Meta] DAU Dropped 10% Last Week But Average Session Duration Increased — What Do You Do?',
    summary: 'Classic Meta RCA question. Tests whether you decompose before hypothesizing, check for SRM/instrumentation issues, and can explain the paradox without jumping to conclusions.',
    readMin: 7,
    source: 'Meta Data Scientist interview — multiple Glassdoor/IGotAnOffer reports',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
    ],
    content: [
      { type: 'text', text: 'Monday morning, 8:47am. Slack notification: "DAU is down 10% from last week and session duration is up 8%. What\'s going on?" Your VP is already in the thread. Two things appear to contradict each other. The pressure to say something — anything — is enormous.\n\nThis is exactly the kind of question that separates analysts who panic-hypothesize from analysts who stay structured. The metrics aren\'t actually contradicting each other. Once you see the composition effect, the whole picture resolves. But first: don\'t reach for an explanation before you\'ve looked at the data.' },
      { type: 'heading', text: 'Step 1: Context Before Data' },
      { type: 'text', text: 'Before touching data: What is "last week" compared to — YoY or WoW? Is this global or a specific region? Was there a deployment? Any external events (holiday, news cycle, platform incident)? A 10% DAU drop on a Monday after a holiday weekend is expected, not alarming. Context determines urgency.' },
      { type: 'heading', text: 'Step 2: Resolve the Paradox First' },
      { type: 'callout', label: 'The apparent contradiction', text: 'DAU is down 10% (fewer people showed up) but session duration is up 8% (people who did show up stayed longer). This is not contradictory — it\'s a composition effect. If low-engagement users churned, the remaining users are higher-engagement by definition. Average duration rises because the short-session users left the denominator.' },
      { type: 'text', text: 'Resolve this before forming hypotheses: "The duration increase is likely a composition effect. I\'d verify by checking if power users\' individual session duration also increased, or if it only moved in aggregate."' },
      { type: 'heading', text: 'Step 3: Decompose DAU' },
      { type: 'text', text: 'DAU = new users active + returning users active. Did new user activations fall? Did returning user reactivation fall? Did existing habitual users not return? Each answer locates the problem differently: a new user drop is an acquisition/onboarding problem; a returning user drop is a retention problem.' },
      { type: 'heading', text: 'Step 4: Segment Cuts' },
      { type: 'list', items: [
        'Platform: iOS / Android / Web — concentrated on one? (Deployment bug)',
        'Geography: Country-level — specific market? (Regulatory, competitive event)',
        'User cohort: New vs returning vs highly retained — who specifically didn\'t show up?',
        'Feature surface: Home feed, Stories, Marketplace — where are sessions starting?',
      ]},
      { type: 'heading', text: 'Step 5: Top Hypotheses (Ranked)' },
      { type: 'list', items: [
        '1. Instrumentation/logging bug — always check pipeline anomalies around the drop start time',
        '2. Deployment regression — check for releases deployed around the drop start',
        '3. Composition shift — recent acquisition cohort churning disproportionately',
        '4. External event — competitive launch, news event, platform incident',
      ]},
      { type: 'callout', label: 'Strong close', text: '"Given the duration increase, my leading hypothesis is composition shift — we\'re losing low-engagement users. I\'d check D7 retention of the most recent acquisition cohort vs prior cohorts. Stable retention but lower new user volume = acquisition problem. Falling retention = product problem."' },
    ],
    keyTakeaways: [
      'DAU down + duration up is not a contradiction — it\'s a composition effect. Low-engagement users left, raising the average for those who stayed.',
      'Always check instrumentation / logging issues as hypothesis #1 before assuming product causation.',
      'Decompose DAU into new activations + returning actives — the source of the drop determines the fix.',
      'Segment by platform and geography first to find concentration; a global gradual drop has a different playbook than a Tuesday spike.',
      'Resolution: stable power-user retention + DAU drop = acquisition problem. Falling retention across cohorts = product problem.',
    ],
    references: [
      { label: 'Data Science at Meta — Meta Careers', url: 'https://www.metacareers.com/life/data-science-at-meta/', note: 'Overview of how Meta structures product data science and the types of RCA problems their analysts solve' },
    ],
  },
  {
    id: 'airbnb-booking-drop',
    category: 'Company Questions',
    title: '[Airbnb] Booking Conversion Dropped 5% — Diagnose It',
    summary: 'Two-sided marketplace RCA. Tests funnel decomposition, platform/cohort cuts, and awareness that supply-side changes can explain demand-side metric drops.',
    readMin: 6,
    source: 'Airbnb Data Scientist interview — Glassdoor + Interview Query reports',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
    content: [
      { type: 'text', text: 'This is the question that trips up candidates who think of Airbnb as a consumer app. Booking conversion dropped 5% — and your interviewer watches carefully to see if you go straight to "guest-side bug" or if you remember that you\'re dealing with a two-sided marketplace.\n\nEvery booking requires a host to say yes. When conversion falls, the problem might have nothing to do with what guests see. It might be hosts raising prices, removing availability, or taking longer to respond. The failure to consider supply-side causes is the single most common missed hypothesis in two-sided marketplace RCA questions.' },
      { type: 'heading', text: 'Step 1: Define the Metric' },
      { type: 'text', text: 'Booking conversion = bookings / what? Sessions? Searches? Listing page views? Get specific. The most useful version for diagnosis: bookings / users who reached at least one listing page view. This isolates purchase intent and removes query-volume effects from the calculation.' },
      { type: 'heading', text: 'Step 2: Funnel Decomposition' },
      { type: 'framework_box', label: 'Airbnb Booking Funnel', items: [
        'Search query submitted',
        'Search results returned (with available listings)',
        'Listing page view',
        'Booking request / Instant Book click',
        'Booking completed (accepted by host)',
      ]},
      { type: 'text', text: 'Which step fell? A drop at "results returned" is an inventory or search quality problem. A drop at "listing view → request" is pricing, photos, or trust. A drop at "request → completion" is a host acceptance problem — a supply-side issue.' },
      { type: 'callout', label: 'The non-obvious cut', text: 'Always check host behavior, not just guest behavior. If hosts\' acceptance rate fell or average listing response time increased, booking conversion falls even if nothing changed on the guest product. This is the most common missed hypothesis in two-sided marketplace RCAs.' },
      { type: 'heading', text: 'Step 3: Segment Cuts' },
      { type: 'list', items: [
        'Geography: Is the drop global or in specific markets? (Supply shortage post-event?)',
        'Room type: Entire home vs private room — one type experiencing higher cancellations?',
        'Price band: High-priced listings underperforming? (Economic sensitivity)',
        'New vs repeat guests: Repeat guests have higher conversion baseline — a drop there is more alarming',
      ]},
      { type: 'heading', text: 'Hypothesis Ranking' },
      { type: 'list', items: [
        '1. Host acceptance rate / response time degradation (supply-side, high impact)',
        '2. Listing availability changes (hosts removing calendar availability)',
        '3. Price increases (market rates pushing guests past willingness-to-pay)',
        '4. Search ranking change (lower-quality listings surfaced)',
        '5. Guest experience bug (checkout flow regression)',
      ]},
    ],
    keyTakeaways: [
      'Airbnb is two-sided — always check host-side metrics (acceptance rate, response time, availability) before assuming a guest-side problem.',
      'Define the denominator first: bookings / listing page views isolates purchase intent from query-volume fluctuations.',
      'Funnel decomposition reveals the step — a drop at request→completion is a supply problem, not a product bug.',
      'Geography matters enormously: supply shortages, seasonal events, and regulatory changes are market-specific.',
      'Repeat guest conversion drop is more alarming than new guest drop — the habitually-returning audience should be the stickiest.',
    ],
    references: [
      { label: 'How Airbnb Measures Marketplace Health — Airbnb Engineering', url: 'https://medium.com/airbnb-engineering/', note: 'Airbnb\'s engineering blog covers their two-sided marketplace measurement challenges' },
      { label: 'Two-Sided Marketplaces and SUTVA — Gupta et al.', url: 'https://medium.com/airbnb-engineering/interference-and-sutva-in-experiment-design-5b5e72c3a6d3', note: 'How marketplace interdependencies affect experiment design and metric interpretation' },
    ],
  },
  {
    id: 'doordash-coupon-impact',
    category: 'Company Questions',
    title: '[DoorDash] How Would You Measure the Impact of a 5% Off Delivery Fee Coupon?',
    summary: 'Incrementality measurement under selection bias. Tests whether you distinguish correlation from causal impact and know when holdout groups or synthetic controls are needed.',
    readMin: 6,
    source: 'DoorDash Data Scientist interview — Glassdoor',
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
    ],
    content: [
      { type: 'text', text: 'DoorDash ran a 5% off delivery fee coupon. Your PM asks: "Did it work? How do you measure its impact?" This is an incrementality problem. The instinct is to compare orders before/after or coupon users vs non-users. Both are wrong. Here\'s why.' },
      { type: 'heading', text: 'The Core Problem: Selection Bias' },
      { type: 'text', text: 'Users who use a coupon are systematically different: more price-sensitive, more likely to have been searching for a deal, possibly would have ordered anyway. If coupon users order more than non-coupon users, you can\'t tell if the coupon caused it or high-intent users self-selected into using it.' },
      { type: 'callout', label: 'The measurement goal', text: 'Incrementality = orders that happened BECAUSE of the coupon, not orders that would have happened anyway. A coupon with 10,000 redemptions may have driven only 3,000 incremental orders — the rest would have ordered at full price.' },
      { type: 'heading', text: 'Option 1: Holdout Experiment (Best)' },
      { type: 'text', text: 'Randomize users before coupon launch: Treatment (receives coupon) vs Holdout (doesn\'t). Compare order rates over the same period. The difference is incremental lift. Cleanest approach — but requires infrastructure and advance planning.' },
      { type: 'heading', text: 'Option 2: Difference-in-Differences' },
      { type: 'text', text: 'If no holdout was set up: find a comparable control group (similar users in a market where the coupon wasn\'t offered, or a similar user cohort that didn\'t receive it). Compare behavior before/after the coupon across both groups. The "double difference" removes confounds from time trends.' },
      { type: 'heading', text: 'Metrics Beyond Orders' },
      { type: 'list', items: [
        'Incremental order rate (primary — adjusted for holdout)',
        'Average order value: did users order more, or just pay less for the same order?',
        'Contribution margin per redemption: did incremental orders justify the discount cost?',
        'D30 retention: do coupon users retain better in the 30 days post-coupon? (Long-term value)',
      ]},
      { type: 'callout', label: 'The trap to name', text: '"Orders went up 20% during the coupon period." Correct response: "I can\'t attribute that to the coupon without a holdout. Orders may have increased due to seasonality, concurrent campaigns, or organic growth. I\'d want a holdout group to establish incrementality before calling this a win."' },
    ],
  },
  {
    id: 'spotify-discover-weekly',
    category: 'Company Questions',
    title: '[Spotify] How Would You Measure the Success of Discover Weekly?',
    summary: 'Feature-level metric design for a personalization product. Tests north star selection (engagement vs discovery vs long-term retention), guardrail discipline, and A/B test design.',
    readMin: 6,
    source: 'Spotify Data Scientist interview — Interview Query + Prepfully reports',
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
    ],
    content: [
      { type: 'text', text: 'Discover Weekly is Spotify\'s personalized playlist — 30 songs, refreshed every Monday, designed to surface artists and tracks you haven\'t heard but will love. It\'s been called one of the most successful product features in streaming history. Measuring it correctly is a genuinely hard problem.' },
      { type: 'heading', text: 'The Goal Clarification' },
      { type: 'text', text: 'Before proposing any metric, establish what Discover Weekly is trying to do: (1) help users discover artists they wouldn\'t find otherwise, (2) increase long-term engagement by expanding their musical taste graph, (3) differentiate Spotify from competitors through personalization quality. The metrics follow from this ordering.' },
      { type: 'heading', text: 'North Star Candidates and Why Each Is Incomplete' },
      { type: 'list', items: [
        'Streams per playlist: measures engagement but not discovery. A playlist of familiar artists scores well.',
        'Save rate (tracks saved to library): measures preference signal but biased toward already-known artists.',
        'New artist plays / total plays: captures discovery but not quality of recommendation.',
        'D30 return to Discover Weekly: measures habit formation — strong predictor of long-term value.',
      ]},
      { type: 'callout', label: 'The recommended north star', text: 'Discovery depth: % of listeners who played tracks from ≥ 3 artists they had not heard in the prior 90 days AND gave a positive engagement signal (save, repeat listen, or playlist add) on at least 1 of them. This measures genuine discovery + quality in one metric.' },
      { type: 'heading', text: 'Guardrails' },
      { type: 'list', items: [
        'Overall streams: Discover Weekly must not cannibalize streams from the rest of the platform',
        'Skip rate: High skip rates signal poor recommendation quality masking behind high volume',
        'D30 retention: A Discover Weekly that drives short-term engagement but hurts long-term retention is a failure',
      ]},
      { type: 'heading', text: 'Experiment Design Consideration' },
      { type: 'text', text: 'Testing a change to Discover Weekly requires novelty effect controls — users get genuinely excited about a new playlist experience for 1-2 weeks regardless of quality. Minimum 3-4 week runtime. Also flag: the algorithm personalizes per user, so user-level randomization is the correct unit and you\'d need to confirm no interference through shared catalog popularity signals.' },
    ],
  },
  {
    id: 'netflix-content-engagement',
    category: 'Company Questions',
    title: '[Netflix] How Would You Measure Whether a New Content Format Is Working?',
    summary: 'Product sense for a content platform — engagement quality vs quantity, session depth vs breadth, retention impact, and experiment design with novelty effect controls.',
    readMin: 7,
    source: 'Netflix Data Scientist interview — Interview Query reports',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
      { label: 'Design the Onboarding Checklist Test', room: 'design', id: 'd08' },
    ],
    content: [
      { type: 'text', text: 'Netflix launches short-form content (30-45 min formats) to compete with YouTube and TikTok. How do you know if it\'s working? This is a metric design + experiment design question — the right answer shows you understand engagement quality vs quantity tradeoffs and controls for novelty.' },
      { type: 'heading', text: 'Step 1 — Define "Working"' },
      { type: 'text', text: 'What is Netflix trying to achieve with this format? Likely: (1) attract new users who prefer short content, (2) increase session frequency for existing users, (3) improve retention. Each goal needs a different primary metric.' },
      { type: 'framework_box', label: 'Metric System for New Content Format', items: [
        'Primary: 30-day retention rate for users exposed to the new format vs comparable users not exposed',
        'Secondary: Session frequency (sessions/week), content format CTR, completion rate',
        'Guardrails: Long-form content consumption (don\'t cannibalize premium content), NPS, subscription renewal rate',
      ]},
      { type: 'heading', text: 'The Engagement Quality Problem' },
      { type: 'text', text: 'High session count on short-form content doesn\'t mean the product is healthier. Netflix\'s business model depends on subscription renewals — and those correlate with deep engagement (long content completion, diverse catalog usage), not short-form scrolling. Guardrail on long-form consumption and renewal rate.' },
      { type: 'callout', label: 'Novelty effect control', text: 'Any new content format will get engagement inflation in the first 2 weeks from users exploring the new section. Run the experiment for minimum 4 weeks and check weekly engagement trend — a novelty-driven lift declines week over week. A real quality improvement stabilizes or grows.' },
    ],
  },
  {
    id: 'uber-surge-pricing',
    category: 'Company Questions',
    title: '[Uber] How Would You Measure the Effect of Surge Pricing on Driver and Rider Satisfaction?',
    summary: 'Two-sided marketplace tradeoff measurement. Tests your ability to hold both sides of a marketplace in your head simultaneously and design guardrails for each.',
    readMin: 7,
    source: 'Uber Data Scientist interview — Glassdoor + multiple reports',
    content: [
      { type: 'text', text: 'Surge pricing is a two-sided instrument: it increases supply (drivers go online when surge is active) and reduces demand (some riders cancel or delay). The question asks you to measure both sides simultaneously — and they pull in opposite directions.' },
      { type: 'heading', text: 'Framing the Question' },
      { type: 'text', text: 'The business question is not just "do riders and drivers like surge?" It\'s: "Does surge pricing efficiently clear the supply-demand imbalance, and what is the net satisfaction effect across both sides?" This requires a rider metric system and a driver metric system separately.' },
      { type: 'framework_box', label: 'Metric System — Both Sides', items: [
        'Rider primary: Ride completion rate during surge periods (did riders who searched during surge actually get a ride?)',
        'Rider guardrail: Surge opt-out rate, cancellation rate, app abandon rate during surge. High rates = pricing hurting acquisition.',
        'Driver primary: Hours online during surge periods vs baseline (did supply actually increase?)',
        'Driver guardrail: Earnings per hour during vs outside surge. If not materially higher, drivers won\'t respond to future surges.',
        'System: Wait time during surge vs baseline. This is the ultimate metric — did surge actually improve supply-demand balance?',
      ]},
      { type: 'callout', label: 'The tradeoff framing', text: '"Surge increased driver supply by 18% but rider abandon rate grew 25% in the highest surge (3x+) scenarios. The net marketplace efficiency improvement exists at 1.5-2x surge, but diminishing returns and rider harm set in above 2x. My recommendation: calibrate surge cap at 2x for most markets."' },
    ],
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
    ],
  },
  {
    id: 'meta-feed-ranking-change',
    category: 'Company Questions',
    title: '[Meta] We Changed the Feed Ranking Algorithm — How Do You Evaluate the Results?',
    summary: 'Experiment readout under complexity: novelty effects, multiple metrics, HTE across user segments, and long-term vs short-term engagement tradeoffs.',
    readMin: 7,
    source: 'Meta Data Scientist Product Analytics — Glassdoor + DataLemur',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Multiple Testing (Stats)', room: 'stats', id: 'stat05' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
    content: [
      { type: 'text', text: 'A feed ranking change at Meta scale is one of the most complex experiment readouts in the industry. The signals are noisy, the metrics conflict, user segments behave differently, and novelty effect is significant. Here\'s the complete evaluation framework.' },
      { type: 'heading', text: 'Step 1: Validity Checks Before Any Metric' },
      { type: 'list', items: [
        'SRM check: Feed changes often affect logging disproportionately across variants. Check first.',
        'Runtime: Feed experiments need ≥ 2 weeks minimum to see past novelty. Was this run long enough?',
        'Segment exposure: Did all user types see the new ranking? New users, returning users, mobile vs web?',
      ]},
      { type: 'heading', text: 'Step 2: The Metric Hierarchy' },
      { type: 'text', text: 'Feed ranking has inherently conflicting metrics. You need a pre-committed hierarchy:' },
      { type: 'framework_box', label: 'Metric Hierarchy for Feed Ranking', items: [
        '1. North star: Long-form content consumption (time spent on meaningful content, not just any content)',
        '2. Primary guardrail: D30 retention and weekly active rate',
        '3. Secondary: Comment and share rates (quality engagement signals)',
        '4. Watch-out: Passive scroll time without interaction — this is not a success metric',
      ]},
      { type: 'heading', text: 'Step 3: Novelty Effect Analysis' },
      { type: 'text', text: 'Plot engagement metrics by day and by exposure cohort. If day-1 users show steadily declining engagement over 14 days while day-7 users show the same pattern at their day 1, the lift is entirely novelty. Look for the stabilization plateau — that\'s the real signal.' },
      { type: 'heading', text: 'Step 4: Heterogeneous Treatment Effects' },
      { type: 'text', text: 'Feed ranking changes almost never affect all users equally. Segment by: (1) content consumption style (passive scroller vs active commenter), (2) account age (new users have different ranking needs), (3) geography (cultural norms around content types vary significantly). An average null result can mask a 10% improvement for power users and a 10% degradation for new users.' },
      { type: 'callout', label: 'The ship decision', text: 'If the north star improved, guardrail held, no novelty effect after 2 weeks, no harmful HTE in key segments — ship. If north star improved but guardrail degraded, don\'t ship — escalate the tradeoff to leadership. Never make that call solo on a feed ranking change.' },
    ],
  },
  {
    id: 'amazon-seller-quality',
    category: 'Company Questions',
    title: '[Amazon] How Do You Measure Seller Quality on the Marketplace?',
    summary: 'Multi-dimensional quality measurement — on-time delivery, listing accuracy, return rate, response time, and buyer satisfaction. Tests decomposition and tradeoff awareness.',
    readMin: 6,
    source: 'Amazon / eBay marketplace DS pattern — Interview Query + Glassdoor',
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
    content: [
      { type: 'text', text: 'Seller quality cannot be captured by a single metric. A seller with fast shipping but frequent return-inducing listing inaccuracies looks great on speed but terrible on outcome quality. A composite quality score needs dimensions that capture different failure modes.' },
      { type: 'framework_box', label: 'Seller Quality Dimensions', items: [
        'Fulfillment reliability: On-time shipment rate, cancellation rate (especially seller-initiated)',
        'Listing accuracy: Return rate attributable to "not as described" reason codes',
        'Responsiveness: Response time to buyer messages within 24 hours',
        'Buyer satisfaction: Star rating average, negative review rate, A-to-Z guarantee claims',
        'Repeat purchase: % of buyers from this seller who buy from them again (trust signal)',
      ]},
      { type: 'heading', text: 'Building a Quality Score' },
      { type: 'text', text: 'Composite scores are dangerous (arbitrary weights produce arbitrary rankings). Better approach: define thresholds for each dimension separately, flag sellers who breach any threshold, and tier sellers by number of dimension thresholds met. This is more interpretable and actionable than a single score.' },
      { type: 'callout', label: 'The business question', text: 'Seller quality measurement exists to drive two actions: (1) remove or sanction sellers whose quality falls below acceptable thresholds, (2) incentivize high-quality sellers to stay and grow. Your metric system should make both those actions easy to take.' },
    ],
  },
  {
    id: 'google-engagement-drop',
    category: 'Company Questions',
    title: '[Google] Search Engagement Dropped 20% in the Last Month — Where Do You Start?',
    summary: 'Broad funnel RCA at scale. Tests platform cuts, query category decomposition, time-pattern analysis, and the ability to distinguish supply-side from demand-side causes.',
    readMin: 7,
    source: 'Google DS / Product Analytics — Glassdoor multiple reports',
    relatedItems: [
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: '"Search engagement" is underspecified. Before starting any analysis: engagement = what? Queries per user? Clicks per query? Sessions with search? CTR? The answer shapes everything.' },
      { type: 'heading', text: 'Step 1 — Clarify the Metric' },
      { type: 'text', text: 'For Google Search, the most common engagement metrics: (1) queries per user per month, (2) CTR (click through rate from search results), (3) session depth (queries per session). A 20% drop in each tells a completely different story. Clarify which one before proceeding.' },
      { type: 'heading', text: 'Step 2 — Time Pattern First' },
      { type: 'text', text: 'A 20% drop over one month is a gradual decline, not a sharp event. This rules out a deployment bug (which would be sharp). Likely cause categories: external competition (AI assistants replacing queries), product change causing fewer sessions, seasonality (summer months have different search behavior), or ranking quality regression driving fewer click-satisfying results.' },
      { type: 'framework_box', label: 'Segment Cuts for Search RCA', items: [
        'Query category: Informational vs navigational vs transactional — is the drop in one query type?',
        'Platform: Mobile vs desktop vs app — concentrated platform suggests UX or deployment change',
        'Geography: Global or specific markets? (Competitive landscape or regulation may differ)',
        'User cohort: Power users (heavy searchers) vs casual users — different causes',
        'Time of day: Working hours vs evening — may indicate professional search substitution',
      ]},
      { type: 'callout', label: 'The AI substitution hypothesis', text: 'A key hypothesis in 2024-2025 for any search engagement drop: AI chatbots (ChatGPT, Claude, Gemini) are replacing queries that previously went to Google Search. Validate by checking if the drop is concentrated in informational/research query types, which are most substitutable by AI.' },
    ],
  },
  {
    id: 'lyft-driver-retention',
    category: 'Company Questions',
    title: '[Lyft] Driver Churn Is Up — How Do You Diagnose It and What Do You Recommend?',
    summary: 'Supply-side retention RCA for a two-sided marketplace. Tests cohort analysis, earnings-per-hour decomposition, and the ability to connect supply health to demand-side outcomes.',
    readMin: 7,
    source: 'Lyft Data Scientist interview — DataInterview.com + SQLPad',
    content: [
      { type: 'text', text: 'Driver churn = a supply-side problem that becomes a demand-side problem. When drivers churn, wait times increase for riders, which reduces rider satisfaction and eventually demand. Diagnosing driver churn requires understanding driver economics, not just driver behavior.' },
      { type: 'heading', text: 'Step 1 — Define Churn' },
      { type: 'text', text: 'Driver churn = no trips completed in N consecutive days. This is platform-specific: for ride-share, 30 days of inactivity is typically churn. But first cut: is this churn (permanent departure) or reduced activity (still on platform, driving less)? The two require different interventions.' },
      { type: 'framework_box', label: 'Driver Churn Diagnosis Framework', items: [
        'Segment by tenure: New drivers (< 3 months) vs established. New driver churn has different causes (onboarding, first-week experience).',
        'Earnings-per-hour decomposition: Trips per hour × fare per trip × surge rate. Which component changed?',
        'Geographic cut: Is churn concentrated in markets where Uber launched a competitive offer?',
        'Vehicle type: If churn is concentrated in drivers who can work on other platforms (UberEats, DoorDash), this is platform substitution.',
        'Time pattern: Did churn spike after a policy change (commission rate increase, insurance requirement)?',
      ]},
      { type: 'callout', label: 'The earnings hypothesis', text: 'The most common driver churn cause: earnings per hour declined, making Lyft less competitive with alternatives. Decompose it: did trip volume per hour fall (fewer ride requests in their zones), or did fare per trip fall (rate changes, shorter average trip length, fewer surge events)?' },
    ],
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
  },
  {
    id: 'stripe-payment-success',
    category: 'Company Questions',
    title: '[Stripe] Payment Success Rate Dropped 3% — Diagnose the Root Cause',
    summary: 'High-stakes funnel RCA with multiple layers: card network, issuing bank, merchant type, device, and geography cuts. Tests structured decomposition under business pressure.',
    readMin: 6,
    source: 'Stripe / fintech DS interview pattern',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
    content: [
      { type: 'text', text: 'Payment success rate dropping 3% at Stripe means billions of dollars in transaction volume at risk. This RCA is uniquely complex because Stripe sits between merchants and card networks — the root cause could be on Stripe\'s side, the issuing bank\'s side, the card network\'s side, or the merchant\'s side.' },
      { type: 'heading', text: 'Step 1: Define the Metric' },
      { type: 'text', text: 'Payment success rate = successful charges / attempted charges. "Successful" means authorized and settled, not just authorized. Clarify: is this across all payment methods (card, ACH, SEPA, wallets) or card-only? A drop in overall PSR could be driven entirely by one payment method.' },
      { type: 'heading', text: 'Step 2: Decompose by Payment Infrastructure Layer' },
      { type: 'framework_box', label: 'Stripe Payment Funnel', items: [
        'Charge attempt received by Stripe',
        'Stripe fraud/risk check (Radar)',
        'Card network routing (Visa / Mastercard / Amex)',
        'Issuing bank authorization',
        'Settlement',
      ]},
      { type: 'text', text: 'Which step failed? A Radar model change affects step 2. A network outage affects step 3. A bank risk policy change affects step 4. Each has a completely different remediation path.' },
      { type: 'heading', text: 'Step 3: Segment Cuts' },
      { type: 'list', items: [
        'Card network: Is the drop concentrated on Visa, Mastercard, or Amex? (Network-specific issue)',
        'Issuing bank: Top 10 issuers by volume — is one bank responsible for the drop?',
        'Merchant vertical: Is the drop concentrated in one industry? (Travel, gaming, crypto have different issuer decline rates)',
        'Geography: US vs international? (Issuer policies differ significantly)',
        'Card type: Credit vs debit? Consumer vs corporate? (Different authorization paths)',
        'Time pattern: Did it start at a specific time? (Deployment or network event)',
      ]},
      { type: 'callout', label: 'The non-obvious hypothesis', text: 'At Stripe, a common cause of sudden PSR drops is an issuing bank\'s fraud model update — they start declining a category of transactions that they previously approved. This shows up as a spike in "do_not_honor" decline codes from specific BINs (Bank Identification Numbers). Always check decline code distribution before forming other hypotheses.' },
    ],
  },
  {
    id: 'airbnb-superhost',
    category: 'Company Questions',
    title: '[Airbnb] How Would You Redesign the Superhost Program\'s Success Metrics?',
    summary: 'Metric design for a trust system. Tests your ability to distinguish input metrics (checklist compliance) from outcome metrics (guest satisfaction, repeat bookings) and catch gaming risks.',
    readMin: 6,
    source: 'Airbnb Data Scientist interview — Glassdoor + Codinginterview.com',
    relatedItems: [
      { label: 'Checklist Completion Illusion', room: 'review', id: 's12' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
    ],
    content: [
      { type: 'text', text: 'Airbnb\'s Superhost program uses a checklist of input metrics: response rate ≥90%, cancellation rate <1%, 10+ trips per year, 4.8+ star average. The question is: do these inputs actually predict the outcome we care about (excellent guest experience), and can they be gamed?' },
      { type: 'heading', text: 'What\'s Wrong With Input-Only Metrics' },
      { type: 'text', text: 'A host can achieve 4.8+ stars by only accepting easy-to-serve guests (families, couples, adults) and declining guests who might leave harder reviews. They maintain high response rate by using automation. These behaviors satisfy the checklist without improving the average guest experience — they just select for easier guest profiles.' },
      { type: 'framework_box', label: 'Redesigned Metric System', items: [
        'Outcome primary: Guest return booking rate — guests who had a great experience are more likely to rebook. Hard to game without genuinely satisfying guests.',
        'Outcome secondary: Review quality (not just stars) — NLP analysis of review text for hospitality signals beyond the rating',
        'Input guardrails (keep, but not sufficient alone): Response rate, cancellation rate, minimum trip volume',
        'Gaming protection: Penalize review selectivity — if a host has a notably skewed guest acceptance pattern, flag for manual review',
      ]},
      { type: 'callout', label: 'The design principle', text: 'The best metric system for a trust badge uses: outcome metrics as the primary criteria (did guests have great experiences?), input metrics as guardrails (was the host reliable?), and gaming detection as an audit layer. No checklist-only criteria survive a smart host trying to game the badge.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // CAREER & INTERVIEW
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'interview-loop-map',
    category: 'Career & Interview',
    title: 'Mapping the DS / Product Analytics Loop: What Each Round Is Actually Testing',
    summary: 'Round 1: SQL execution. Round 2: metric design and ambiguous problems. Round 3+: experimentation, business cases, ML. Know the map before you prepare.',
    readMin: 5,
    source: 'Composite from Meta, Airbnb, Netflix, DoorDash loops',
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
    ],
    content: [
      { type: 'text', text: 'Product DS and product analytics interview loops at companies like Meta, Airbnb, Netflix, and DoorDash follow a recognizable structure. Knowing the map before you prep lets you prioritize by round type rather than studying everything equally.' },
      { type: 'framework_box', label: 'The Standard Loop Structure', items: [
        'Phone Screen (1 round): Light SQL or metric definition. Goal: screen for basic data literacy. Pass rate: ~50-60%.',
        'Technical Round 1 (SQL): Medium-complexity SQL, window functions, funnel analysis. Goal: can you write queries that answer business questions? Pass rate: ~40-50%.',
        'Technical Round 2 (Metrics/Product): Metric design for a product, ambiguous problem breakdown, "how would you measure X?" Goal: product intuition + analytical structure. Most filtered here.',
        'Technical Round 3 (Experimentation): A/B test design, readout, edge cases (SRM, novelty, HTE). Goal: experimentation rigor at a product scale.',
        'Case / Behavioral (1-2 rounds): Business case analysis, ML problem, and/or past experience. Goal: decision-making, communication, seniority calibration.',
      ]},
      { type: 'callout', label: 'Prep priority', text: 'Most candidates over-index on SQL (easiest round to study for) and under-index on the metrics + experimentation rounds (hardest rounds and highest filter rate). Allocate 20% to SQL, 40% to metrics/product sense, 30% to experimentation, 10% to ML/ML design.' },
      { type: 'heading', text: 'Company-Specific Notes' },
      { type: 'list', items: [
        'Meta: Heavy emphasis on experimentation rigor and business case decomposition. Two-sided product questions common.',
        'Airbnb: Marketplace-specific metric design, host/guest tradeoffs, supply-demand experiments.',
        'Netflix: Content engagement quality vs quantity. Recommendation system metrics. Novelty effect awareness.',
        'DoorDash: Courier/restaurant/customer three-sided marketplace. Fulfillment quality metrics. Cohort analysis.',
      ]},
    ],
  },
  {
    id: 'common-mistakes-interview',
    category: 'Career & Interview',
    title: '12 Most Common Mistakes in Product Analytics Interviews',
    summary: 'Jumping to metrics before framing. Not naming denominators. Listing hypotheses without decomposing. Treating all metrics equally. The full checklist.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
    ],
    content: [
      { type: 'text', text: 'These are the 12 most reliable ways to signal junior thinking in a product analytics interview. Most are not about not knowing the framework — they\'re about execution under pressure.' },
      { type: 'heading', text: 'Metric Design Mistakes' },
      { type: 'list', items: [
        '1. Proposing metrics before defining the product goal. The goal determines the metric, not the reverse.',
        '2. Not naming the denominator. "Conversion rate" without specifying "of what" is incomplete.',
        '3. Listing only success metrics with no guardrails. Interviewers will explicitly probe for this.',
        '4. Using activity metrics (sessions, page views) as north stars. These measure behavior, not value delivered.',
      ]},
      { type: 'heading', text: 'RCA Mistakes' },
      { type: 'list', items: [
        '5. Forming hypotheses before decomposing the metric. Always decompose first, always.',
        '6. Not checking for instrumentation or logging issues before diagnosing product causes.',
        '7. Diagnosing the aggregate without segment cuts. The aggregate always hides something.',
        '8. Stopping at one hypothesis. Always rank at least three, with data needed to validate each one.',
      ]},
      { type: 'heading', text: 'Experimentation Mistakes' },
      { type: 'list', items: [
        '9. Not specifying the randomization unit, or defaulting to "session" without considering UX consistency.',
        '10. Proposing an experiment without specifying minimum detectable effect and required runtime.',
        '11. Reporting experiment results without checking for SRM first.',
        '12. Using secondary metrics as the basis for a ship decision without accounting for multiple testing.',
      ]},
      { type: 'callout', label: 'The meta-pattern', text: 'Most of these mistakes share one cause: moving to the "interesting" part of the problem before doing the structural groundwork. The interviewer isn\'t looking for interesting ideas — they\'re looking for rigorous process they can trust in production.' },
      { type: 'heading', text: 'The Fix' },
      { type: 'text', text: 'Before answering any question, pause and state your framework out loud. "For a metric design question, I\'ll start by defining the product goal, then propose a north star, then diagnostics, then guardrails." Stating process before content signals analytical seniority — every single time.' },
    ],
  },
  {
    id: 'closing-with-recommendation',
    category: 'Career & Interview',
    title: 'How to Close Every Answer With a Recommendation, Even Under Uncertainty',
    summary: '"It depends" with no direction is not a senior answer. Here\'s the structure: recommendation + confidence level + key assumption + next step.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: '"It depends" is the most common closing line in analytics interviews — and the most damaging. It signals that you can analyze but can\'t decide. Decision-making under uncertainty is the job. Here\'s how to close every answer with a clear recommendation, even when the data isn\'t definitive.' },
      { type: 'heading', text: 'The Closing Structure' },
      { type: 'framework_box', label: 'The 4-Part Close', items: [
        '1. Recommendation: State it directly. "I would ship / not ship / run a follow-up experiment."',
        '2. Confidence level: "I\'m moderately confident because [strongest supporting data point]."',
        '3. Key assumption: "This recommendation rests on [assumption]. If [assumption] is wrong, the recommendation changes."',
        '4. Next step: "To increase confidence, I\'d want to [specific action: longer runtime / additional segment cut / qual research]."',
      ]},
      { type: 'heading', text: 'What It Looks Like in Practice' },
      { type: 'example', label: 'Example close: experiment with mixed signals', text: 'Weak version: "It depends on the business context and how much we value long-term vs short-term metrics."\n\nStrong version: "My recommendation is to hold and investigate before shipping. Confidence: moderate. The guardrail degradation is real and the mechanism isn\'t clear yet. Key assumption: that the refund rate increase is not just noise — if it is, I\'d revise to ship. Next step: pull the refund cohort and identify whether these are new users or existing users making different purchase decisions."' },
      { type: 'heading', text: 'When You Genuinely Don\'t Have Enough Data' },
      { type: 'text', text: 'Even then, you can close with a directed recommendation: "Based on what I know, I lean toward X because Y. But the data needed to be confident is Z. In the absence of that, I\'d default to the more conservative option [ship or don\'t ship] because the downside of being wrong is [lower/higher]."' },
      { type: 'callout', label: 'The mindset shift', text: 'An analyst\'s job isn\'t to have certainty — it\'s to give the best possible recommendation given available information, with honest uncertainty quantification. "I don\'t know" is never the answer. "Here\'s my best judgment and here\'s what would change it" always is.' },
    ],
  },
  {
    id: 'rapid-revision',
    category: 'Career & Interview',
    title: 'The 30-Minute Rapid Revision Sheet Before Any Analytics Interview',
    summary: 'Opening moves for every question type — metric design, RCA, experimentation, ambiguous problems, business cases. Read aloud, don\'t study new content.',
    readMin: 4,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
    content: [
      { type: 'text', text: 'Don\'t learn new things in the 30 minutes before an interview. Read this instead — it primes your opening moves for every question type so you don\'t freeze on the first sentence.' },
      { type: 'heading', text: 'Metric Design Questions' },
      { type: 'callout', label: 'Opening move', text: '"Before proposing metrics, let me clarify the product goal. We\'re optimizing for [X]. Given that, my north star would be [Y], because it directly measures [value delivered]. I\'d also want [diagnostic] to explain why it moves, and [guardrail] to make sure we don\'t optimize at the expense of [downstream harm]."' },
      { type: 'heading', text: 'RCA Questions' },
      { type: 'callout', label: 'Opening move', text: '"First I\'d get context: when did this start, how big is the drop, what changed recently? Then I\'d decompose the metric mathematically before forming any hypothesis. Then cut by platform, geography, and cohort. Only then would I rank hypotheses by volume affected and data available to validate."' },
      { type: 'heading', text: 'Experiment Design Questions' },
      { type: 'callout', label: 'Opening move', text: '"I\'d start by defining the primary metric and pre-committing to it. Then: randomization unit (user-level unless there\'s a SUTVA risk), guardrails, minimum detectable effect, required sample size and runtime. I\'d also flag any novelty effect risk given the nature of the change."' },
      { type: 'heading', text: 'Ambiguous Problems' },
      { type: 'callout', label: 'Opening move', text: '"Let me make sure I understand the business context before diving in. [Clarify goal, user, and what success looks like.] I\'ll structure my answer as: [frame the problem] → [identify what data I\'d need] → [propose an approach] → [name the risks and assumptions]."' },
      { type: 'heading', text: 'Business Cases' },
      { type: 'callout', label: 'Opening move', text: '"I\'ll close with a clear recommendation with a confidence level. But first let me structure the analysis: [what\'s the decision?] → [what does the data say?] → [what are the key risks?] → [recommendation + next step if uncertain]."' },
      { type: 'heading', text: 'The Meta Rule' },
      { type: 'text', text: 'Every question: state your framework out loud before executing it. This buys you thinking time, signals structure, and tells the interviewer what to expect. It\'s not stalling — it\'s what senior analysts do in real meetings.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // THE BIG PICTURE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'salary-guide',
    category: 'The Big Picture',
    title: 'DS & Product Analytics Salary Guide: What the Market Actually Pays in 2025-2026',
    summary: 'Level-by-level comp bands at FAANG, tier-2 tech, and startups. Base vs total comp, equity vs cash tradeoffs, and the factors that move your number up or down.',
    readMin: 5,
    source: 'Compiled from Levels.fyi, Glassdoor, H1B data, and community reports',
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
    ],
    content: [
      { type: 'text', text: 'Compensation data in this space is notoriously opaque. Most job listings don\'t post ranges. Most people don\'t share numbers. What follows is a synthesized picture from Levels.fyi, H1B disclosure data, Glassdoor, and industry community reports. Ranges are approximate and vary by location, negotiation, and timing.' },
      { type: 'callout', label: 'Important caveat', text: 'These figures are US market, 2025-2026. Non-US markets are typically 40-60% lower for base, with equity upside concentrated at pre-IPO startups. Negotiate everything — the first offer is rarely the best offer.' },
      { type: 'heading', text: 'FAANG / Tier-1 Tech (Meta, Google, Amazon, Apple, Netflix, Airbnb, Uber, Stripe, DoorDash)' },
      { type: 'list', items: [
        'Entry (L3/IC1, 0-2 yrs): $140-180k base, $220-320k total comp (TC). Strong new grad offers.',
        'Mid (L4/IC2, 2-5 yrs): $175-220k base, $280-450k TC. Where most DS/PA roles live.',
        'Senior (L5/IC3, 5-9 yrs): $220-280k base, $380-650k TC. Requires ownership + strategic impact.',
        'Staff (L6/IC4, 8+ yrs): $270-380k base, $550k-1M+ TC. Rare, requires cross-org influence.',
        'Principal (L7+): $350k+ base, $1M+ TC at top companies. Fewer than 2% of ICs reach here.',
      ]},
      { type: 'heading', text: 'Tier-2 Tech (Shopify, Snowflake, Databricks, Figma, Notion, Canva, growth-stage startups)' },
      { type: 'list', items: [
        'Entry (0-2 yrs): $110-145k base, $140-220k TC (lower cash, more equity upside)',
        'Mid (2-5 yrs): $140-180k base, $200-320k TC',
        'Senior (5-9 yrs): $170-230k base, $280-500k TC (equity upside higher at pre-IPO)',
        'Note: Pre-IPO equity is illiquid — discount heavily until liquidity event',
      ]},
      { type: 'heading', text: 'Tier-3 / Traditional Tech / Non-Tech (banks, retail, healthcare, media)' },
      { type: 'list', items: [
        'Entry (0-2 yrs): $75-100k base, minimal equity',
        'Mid (2-5 yrs): $100-130k base',
        'Senior (5+ yrs): $130-175k base, some bonus',
        'Note: Lower comp, but often better work-life balance and more cross-functional scope',
      ]},
      { type: 'heading', text: 'What Moves Your Number' },
      { type: 'list', items: [
        'Company tier: The single biggest lever. Meta L4 ≈ Startup L5-L6 in total comp.',
        'Location: SF/NYC base premium ~15-25% vs Seattle/Austin; remote roles converging.',
        'Specialization: Experimentation and ML-adjacent DS roles command a ~10-20% premium over pure analytics.',
        'Negotiation: First offers are routinely 10-25% below ceiling. Always counter. Use competing offers.',
        'Level: Getting leveled up at offer time (from L4 to L5) can be worth $100k+ in TC.',
      ]},
      { type: 'heading', text: 'Base vs Total Comp' },
      { type: 'text', text: 'Always negotiate on total comp, not just base. At tier-1 companies, equity refreshes and annual bonuses often exceed base salary over a 4-year period. A $200k base with a $300k equity grant over 4 years = $275k TC annually — very different from a $200k base with no equity.' },
    ],
  },
  {
    id: 'role-evolution',
    category: 'The Big Picture',
    title: 'How the DS & Analytics Role Has Evolved: 2010 to Today',
    summary: 'From "Data Analyst = Excel + SQL" to a fragmented landscape of Product Analytics, Applied DS, Analytics Engineering, and MLE. Understanding the lineage explains why the job is what it is now.',
    readMin: 6,
    source: null,
    relatedItems: [],
    content: [
      { type: 'text', text: 'The title "Data Scientist" was Harvard Business Review\'s sexiest job of the 21st century in 2012. Fourteen years later, the role has split into at least five distinct career tracks, each with different skill requirements, compensation, and organizational positioning. Here\'s the full arc.' },
      { type: 'heading', text: '2008-2014: The Analyst Era' },
      { type: 'text', text: 'Before "data science" became a category, most analytical roles were called Data Analyst or Business Analyst. The job was: build dashboards in Excel, write SQL queries, summarize trends in PowerPoint. The output was reporting. The organizational positioning was support function — analytics served the business but didn\'t shape it.\n\nThink of this era as: what happened? Analytics teams described past performance.' },
      { type: 'heading', text: '2014-2018: The Data Scientist Hype Cycle' },
      { type: 'text', text: 'Silicon Valley\'s success stories (Netflix recommendations, Facebook News Feed ranking, Google search) created enormous demand for "data scientists" who could build ML models. Companies hired PhDs for roles that turned out to be 80% data cleaning and SQL. The hype created a supply-demand mismatch that peaked around 2017-2018.\n\nOrganizational change: analytics moved from support to embedded — DSs sitting inside product teams rather than in a central analytics function.' },
      { type: 'heading', text: '2018-2022: The Specialization Split' },
      { type: 'text', text: 'The hype-driven "one data scientist does everything" role proved unsustainable. The function split into distinct tracks:' },
      { type: 'list', items: [
        'Product Analytics / Data Analyst: metrics, experimentation, dashboards, RCA. No ML required.',
        'Applied Data Scientist: ML model building, feature engineering, A/B test design for ML systems.',
        'Analytics Engineer (dbt era): Data modeling, pipeline reliability, semantic layer. SQL-heavy, no ML.',
        'ML Engineer: Model deployment, infrastructure, serving. Closer to SWE than analyst.',
      ]},
      { type: 'text', text: 'The dbt revolution (2018-2022) was particularly significant: it created a new profession (analytics engineering) and dramatically raised the data quality bar for analytical work.' },
      { type: 'heading', text: '2022-Present: The GenAI Disruption' },
      { type: 'text', text: 'LLMs automated the most commoditized analytical work: basic SQL queries, dashboard creation, ad hoc report generation. This shifted the value proposition upward: the analyst role that survived is the one that requires judgment — experiment design, business framing, cross-functional influence, metric strategy. The analyst who only writes queries is increasingly competing with AI. The analyst who shapes what questions get asked is not.' },
      { type: 'callout', label: 'The key insight', text: 'Every automation wave in analytics history has eliminated the most mechanical work and elevated the remaining role. The "Data Analyst" of 2010 was automated into obsolescence. The "Product Analytics" role of today is much harder to automate because it requires business judgment, not pattern matching.' },
      { type: 'heading', text: 'Where the Tracks Are Converging' },
      { type: 'text', text: 'In 2025-2026, the clearest career signal is: Python + SQL fluency is now the baseline for all tracks. The differentiation is judgment and domain expertise, not technical tools. A strong product analyst with deep experimentation knowledge is more valuable than a weak ML practitioner — the tooling gap has narrowed faster than the judgment gap.' },
    ],
  },
  {
    id: 'analytics-in-ai-era',
    category: 'The Big Picture',
    title: 'Analytics in the AI Era: What Got Automated, What Got More Important',
    summary: 'LLMs changed what analysts spend time on. Understanding what moved — and what didn\'t — is how you position yourself for the next 5 years.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'GenAI Support Bot', room: 'metrics', id: 'm06' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'The most common anxiety among analysts in 2024-2025: "Will AI replace my job?" The honest answer: parts of it, yes. But the parts that got automated were never the highest-leverage parts to begin with.' },
      { type: 'heading', text: 'What Got Automated (or Dramatically Accelerated)' },
      { type: 'list', items: [
        'Basic SQL generation: LLMs write competent SELECT queries from natural language prompts. Most one-off data pulls no longer require a human to write SQL from scratch.',
        'Dashboard creation: Tools like Looker AI, Tableau Pulse, and internal AI assistants generate first-pass dashboards from schema descriptions.',
        'Ad hoc report summarization: "Summarize what happened with this metric last week" is now a prompting task, not an analyst task.',
        'Standard documentation: Query documentation, metric definitions, and data dictionaries increasingly auto-generated from schemas.',
      ]},
      { type: 'heading', text: 'What Got More Important' },
      { type: 'list', items: [
        'Experiment design: LLMs can\'t decide what to test, what metric to care about, or whether the randomization unit is valid for this specific product context.',
        'Business framing: Translating a noisy data signal into a recommendation that accounts for org dynamics, risk tolerance, and strategic context is irreducibly human.',
        'Metric strategy: Deciding which north star to optimize, what the guardrails should be, and how to game-proof the measurement system requires deep product understanding.',
        'Cross-functional influence: Getting engineering to instrument the right events, getting product to pre-commit to a decision rule, getting leadership to trust the experiment — none of this is automatable.',
        'Judgment under ambiguity: When the data doesn\'t give a clear answer, what do you recommend? This is where senior analysts earn their compensation.',
      ]},
      { type: 'heading', text: 'New Skills That Matter Now' },
      { type: 'list', items: [
        'Prompt engineering for analytical workflows: writing effective prompts for data questions, knowing when to trust LLM output and when to verify',
        'LLM system evaluation: if your company is building AI products, measuring their quality is now an analytics problem (the m06 GenAI Support Bot case is a direct example)',
        'AI-assisted speed: analysts who use AI tools to 5x their throughput on routine work can focus more time on high-judgment tasks — this is a real competitive advantage',
      ]},
      { type: 'callout', label: 'The positioning takeaway', text: 'The analyst who competes on SQL speed is competing with AI and losing. The analyst who competes on measurement strategy and analytical judgment is becoming more valuable as AI handles the mechanical work. This platform trains the latter — which is exactly why it exists.' },
    ],
  },
  {
    id: 'how-decisions-get-made',
    category: 'The Big Picture',
    title: 'How a Product Decision Actually Gets Made: The Full Chain',
    summary: 'From first signal to shipped feature — where analytics sits in the loop, what it owns vs influences, and where the chain most commonly breaks.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
    content: [
      { type: 'text', text: 'Most product decisions are made in messy, non-linear ways. But the underlying structure is consistent enough to map. Here\'s the full chain — and where analytics contributes at each step.' },
      { type: 'framework_box', label: 'The Decision Chain', items: [
        '1. Signal: A metric moves, user research surfaces a pattern, or a PM has an intuition',
        '2. Framing: Analytics defines the question precisely and builds the data context',
        '3. Hypothesis: PM proposes the intervention; analytics assesses plausibility and scope',
        '4. Experiment Design: Analytics owns this — primary metric, randomization unit, runtime, guardrails',
        '5. Execution: Engineering ships the variant; analytics monitors for SRM and early signals',
        '6. Readout: Analytics presents results — what moved, by how much, with what confidence',
        '7. Decision: PM + leadership decide to ship, kill, or iterate. Analytics provides recommendation.',
        '8. Monitoring: Analytics sets up post-ship dashboards and guardrail alerts',
      ]},
      { type: 'heading', text: 'Where Analytics Has Authority vs Influence' },
      { type: 'text', text: 'Analytics owns steps 2, 4, 6, and 8. It influences steps 3, 5, and 7. It does not own step 7 — that\'s a leadership call. The biggest failure mode for analysts is either (a) not asserting enough in steps 2 and 4, letting poor framing and poor design produce uninterpretable results, or (b) overreaching in step 7, treating a recommendation as a mandate.' },
      { type: 'callout', label: 'The framing trap', text: 'Step 2 is where most value is lost. If the question is framed wrong — wrong metric, wrong comparison group, wrong time window — the rest of the chain produces a precise answer to the wrong question. The analyst who pushes back on question framing adds more value than the one who executes fast on a bad question.' },
      { type: 'heading', text: 'The Most Common Breaking Points' },
      { type: 'list', items: [
        'Instrumentation not in place before experiment starts: No events → no data → no readout. Fix: analytics must review instrumentation at design time, not after launch.',
        'Primary metric not pre-committed: PM decides to ship based on the secondary metric that moved. Fix: decision rule documented before experiment starts.',
        'Readout without SRM check: Results presented without verifying experiment validity. Fix: SRM check is the first line of every readout template.',
        'No monitoring after ship: A regression appears 3 weeks post-launch with no alert. Fix: automated guardrail alerts as part of every ship checklist.',
      ]},
      { type: 'heading', text: 'What "Decision Partner" Actually Means' },
      { type: 'text', text: 'The analyst who says "here is what the data shows" is a reporter. The analyst who says "here is what the data shows, here is what I recommend, and here is what I\'d need to be more confident" is a decision partner. The distinction is not about having opinions — it\'s about taking ownership of the recommendation while being honest about uncertainty.' },
    ],
  },
  {
    id: 'cross-functional-collab',
    category: 'The Big Picture',
    title: 'Cross-Functional Collaboration: How Analytics Works With Product, Engineering, DS, and Finance',
    summary: 'Who owns what, who gets pulled in when, where the friction lives, and how senior analysts navigate each relationship differently.',
    readMin: 6,
    source: null,
    relatedItems: [],
    content: [
      { type: 'text', text: 'Analytics sits at the intersection of every major function in a product org. Understanding the different relationship modes — not just the mechanics, but the org dynamics — is what separates a strong individual contributor from someone who actually shapes outcomes.' },
      { type: 'heading', text: 'Analytics × Product Management' },
      { type: 'text', text: 'The core relationship. PM owns the roadmap; analytics owns the measurement. The healthiest dynamic: PM and analyst co-own experiment design, with the analyst pushing back on vague success criteria and the PM providing business context that shapes metric prioritization.\n\nCommon friction: PM wants results yesterday; analyst needs runtime. PM wants to ship on early positive signals; analyst flags novelty effect and peeking risk. Resolution: pre-committed decision rules eliminate most of these conflicts — both parties agree before results are visible.' },
      { type: 'heading', text: 'Analytics × Engineering' },
      { type: 'text', text: 'The instrumentation relationship. Analytics needs events logged; engineering implements them. The breakdown: analytics asks for logging too late (after launch), engineering implements it inconsistently, analytics discovers gaps at readout time.\n\nBest practice: analytics reviews the instrumentation spec before any experiment-related engineering work begins. A one-page "measurement plan" documenting required events, grain, and expected volumes eliminates most post-hoc logging gaps.' },
      { type: 'callout', label: 'The trust dynamic', text: 'Engineers trust analysts who understand data infrastructure constraints. If you know why event deduplication is hard, why session definitions are tricky, and why backfilling historical data is expensive — you get better data. If you just make requests, you get whatever is easiest to implement.' },
      { type: 'heading', text: 'Analytics × Data Science / MLE' },
      { type: 'text', text: 'The intelligence amplification relationship. Analytics identifies opportunities and measures outcomes; DS builds the models that capture them.\n\nTypical flow: Analytics surfaces a pattern ("users who do X retain at 2x the rate"). DS investigates whether this is causal and builds a model to drive X behavior. Analytics measures whether the model intervention improved retention.\n\nFriction: DS teams often don\'t invest in outcome measurement — they optimize for model performance metrics (AUC, precision) rather than business outcomes. Analysts bridge this gap.' },
      { type: 'heading', text: 'Analytics × Finance' },
      { type: 'text', text: 'The revenue attribution relationship. Finance owns P&L; analytics owns the product metrics that drive it. They meet at: revenue forecasting, unit economics, and ROI measurement for product investments.\n\nKey skill: being able to translate product metric changes into revenue impact. "A 5% improvement in D30 retention → X more users active at 30 days → Y more purchases at average Z AOV = $W incremental revenue." This kind of back-of-envelope connects product work to finance\'s language.' },
      { type: 'heading', text: 'Analytics × Design / User Research' },
      { type: 'text', text: 'The qual-quant bridge. Design does the qual work (why are users behaving this way?); analytics does the quant work (how many users, how often, what impact?). The best product decisions combine both: qual explains the mechanism, quant validates the scale.\n\nWhere analysts add most value here: being skeptical of small qualitative samples that suggest product changes, while also recognizing that pure quantitative analysis can miss the behavioral mechanism that explains the pattern.' },
    ],
  },
  {
    id: 'what-senior-means',
    category: 'The Big Picture',
    title: 'What "Senior" Actually Means in Product Analytics — Level by Level',
    summary: 'Junior analysts answer questions accurately. Senior analysts ask better questions. Staff analysts decide which questions matter. The behavioral markers at each level — and what interviewers are actually testing.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
    content: [
      { type: 'text', text: 'The level system in data science and analytics feels abstract until you see it in behavioral terms. Here\'s what each level actually looks like in practice — what you hear, what you don\'t hear, and what interviewers are specifically testing for.' },
      { type: 'heading', text: 'Junior (L3 / 0-2 years)' },
      { type: 'text', text: 'The junior analyst executes accurately. They write correct queries, build correct dashboards, and answer the question they were asked. The gap: they answer the question as literally stated, not the underlying question the PM needed answered.' },
      { type: 'list', items: [
        'What you hear: "The query returned X. Here\'s the chart."',
        'What\'s missing: Context, interpretation, recommendation, caveats about data quality',
        'Interview tells: Jumps to metrics before framing, doesn\'t name denominator, lists hypotheses without decomposing',
      ]},
      { type: 'heading', text: 'Mid-Level (L4 / 2-5 years)' },
      { type: 'text', text: 'The mid-level analyst asks clarifying questions and adds interpretation. They push back on ambiguous requests, add context to numbers, and occasionally offer a recommendation. The gap: still reactive — they wait for someone to bring them a question.' },
      { type: 'list', items: [
        'What you hear: "The query returned X. This likely means Y, because of Z context. I\'d recommend..."',
        'What\'s missing: Proactive surfacing of problems PM didn\'t think to ask about, strategic framing',
        'Interview tells: Gets frameworks right, sometimes misses the meta-question or the business implication',
      ]},
      { type: 'heading', text: 'Senior (L5 / 5-9 years)' },
      { type: 'text', text: 'The senior analyst defines the measurement strategy, not just executes it. They push back on the experiment before it\'s designed, shape what questions the team is asking, and connect metric movements to business outcomes unprompted.' },
      { type: 'list', items: [
        'What you hear: "Before we design this experiment, I want to make sure we\'re asking the right question. The PM framed this as X, but the real decision is Y, which requires a different primary metric and a longer runtime."',
        'What\'s missing (at this level): Org-level influence, mentoring, driving measurement culture',
        'Interview tells: Demonstrates proactive framing, names tradeoffs before being asked, closes with a recommendation under uncertainty',
      ]},
      { type: 'heading', text: 'Staff (L6 / 8+ years)' },
      { type: 'text', text: 'The staff analyst shapes how an entire product area thinks about measurement. They write the measurement standards, mentor the team, and are the person PMs and engineering leaders bring into strategic discussions — not just readouts.' },
      { type: 'callout', label: 'The key progression', text: 'Junior: answers questions. Mid: interprets answers. Senior: shapes questions. Staff: shapes how the org thinks about questions. This is not about seniority — it\'s about scope of influence on outcomes.' },
      { type: 'heading', text: 'What Interviewers Are Specifically Testing' },
      { type: 'list', items: [
        'L3/L4 bar: Technical accuracy. Can you execute correctly? Do you know the frameworks?',
        'L5 bar: Strategic framing + recommendation quality. Do you close with a clear recommendation under uncertainty? Do you proactively name tradeoffs?',
        'L6 bar: Org influence + meta-level thinking. Do you identify what\'s wrong with the question before answering it? Can you articulate a measurement philosophy, not just a measurement?',
      ]},
    ],
  },
];

const CATEGORY_CONFIG = {
  'Metrics':             { color: 'var(--green)',     bg: 'var(--green-bg)',    border: 'var(--green-border)',   icon: '📐' },
  'RCA':                 { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',   border: 'var(--yellow-border)',  icon: '🔍' },
  'Experimentation':     { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)',  icon: '⚗' },
  'Statistics':          { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)',    icon: '📊' },
  'Ambiguous Problems':  { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)',  icon: '🧩' },
  'GenAI Analytics':     { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)',    icon: '🤖' },
  'Product Sense':       { color: 'var(--blue-text)', bg: 'var(--blue-bg)',     border: 'var(--blue-border)',    icon: '💡' },
  'SQL & Data':          { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)',  icon: '🗄' },
  'Company Questions':   { color: 'var(--red)',       bg: 'var(--red-bg)',      border: 'var(--red-border)',     icon: '🏢' },
  'Mental Models':       { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)',  icon: '🧠' },
  'Career & Interview':  { color: 'var(--text-muted)',bg: 'var(--surface-2)',   border: 'var(--border)',         icon: '🎯' },
  'The Big Picture':     { color: 'var(--blue-text)', bg: 'var(--blue-bg)',     border: 'var(--blue-border)',    icon: '🌐' },
};

const ROOM_CONFIG = {
  stats:   { label: 'Stats Room',   color: 'var(--accent)',    page: 'stats',   openFn: 'openStats' },
  metrics: { label: 'Metrics Room', color: 'var(--green)',     page: 'metrics', openFn: 'openMetrics' },
  design:  { label: 'Design Room',  color: 'var(--teal)',      page: 'design',  openFn: 'openDesign' },
  review:  { label: 'Review Room',  color: 'var(--accent)',    page: 'browser', openFn: 'openReview' },
  rca:     { label: 'RCA Room',     color: 'var(--yellow)',    page: 'rca',     openFn: 'openRCA' },
  cases:   { label: 'Cases Room',   color: 'var(--purple)',    page: 'cases',   openFn: 'openCases' },
};

const CATEGORIES = Object.keys(CATEGORY_CONFIG);

export function PlaybookBrowser({ onOpenItem }) {
  const [activePost, setActivePost] = useState(null);
  const total = POSTS.length;
  const companyCat = POSTS.filter(p => p.category === 'Company Questions').length;
  const writtenCount = POSTS.filter(p => p.content).length;

  if (activePost) {
    return (
      <PostDetail
        post={activePost}
        onBack={() => { setActivePost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenItem={onOpenItem}
      />
    );
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.25rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--accent)', marginBottom: '0.4rem',
        }}>
          The Playbook
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Learn the framework. Then go practice it.
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '600px', margin: '0 0 1rem' }}>
          Every topic is a complete unit — framework, real examples, common mistakes, and direct links
          to practice problems in the rooms. Read → apply in one flow.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { n: writtenCount, label: 'articles live', color: 'var(--green)' },
            { n: total, label: 'topics total' },
            { n: companyCat, label: 'real company Qs', color: 'var(--red)' },
            { n: CATEGORIES.length, label: 'categories' },
          ].map(({ n, label, color }) => (
            <div key={label} style={{
              background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)', padding: '0.28rem 0.65rem',
              display: 'flex', alignItems: 'baseline', gap: '0.3rem',
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: color || 'var(--accent)', lineHeight: 1 }}>{n}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{label}</span>
            </div>
          ))}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.28rem 0.6rem',
            fontSize: '0.73rem', color: 'var(--yellow)', fontWeight: 600,
          }}>
            ⏳ Articles coming soon
          </div>
        </div>
      </div>

      {/* Category sections */}
      {CATEGORIES.map(cat => {
        const cfg = CATEGORY_CONFIG[cat];
        const posts = POSTS.filter(p => p.category === cat);
        if (!posts.length) return null;
        return (
          <div key={cat} style={{ marginBottom: '2.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              marginBottom: '1rem', paddingBottom: '0.55rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}>
              <span style={{ fontSize: '1.05rem' }}>{cfg.icon}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>{cat}</span>
              <span style={{
                fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
                borderRadius: 'var(--radius-sm)', padding: '0.12rem 0.42rem',
              }}>{posts.length}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '0.8rem',
            }}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} cfg={cfg} onOpenItem={onOpenItem} onRead={setActivePost} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PostCard({ post, cfg, onOpenItem, onRead }) {
  const hasContent = !!post.content;
  return (
    <div
      onClick={hasContent ? () => onRead(post) : undefined}
      style={{
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1.1rem 1.2rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        cursor: hasContent ? 'pointer' : 'default',
        transition: 'border-color 0.12s',
      }}
      onMouseEnter={e => { if (hasContent) e.currentTarget.style.borderColor = cfg.color; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    >

      {/* Top badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '0.56rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
          color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
          borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem',
        }}>{post.category}</span>
        <span style={{
          fontSize: '0.56rem', color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem',
        }}>{post.readMin} min read</span>
        {post.source && (
          <span style={{
            fontSize: '0.54rem', color: 'var(--red)', background: 'var(--red-bg)',
            border: '1px solid var(--red-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem',
            maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }} title={post.source}>🏢 {post.source}</span>
        )}
        {hasContent ? (
          <span style={{
            fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
            color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
          }}>Read →</span>
        ) : (
          <span style={{
            fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
            color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
          }}>Coming Soon</span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '0.89rem', fontWeight: 800, color: 'var(--text)',
        margin: 0, letterSpacing: '-0.01em', lineHeight: 1.35,
      }}>
        {post.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontSize: '0.78rem', color: 'var(--text-secondary)',
        margin: 0, lineHeight: 1.55, flex: 1,
      }}>
        {post.summary}
      </p>

      {/* Practice links */}
      {post.relatedItems?.length > 0 && (
        <div style={{
          marginTop: '0.35rem', paddingTop: '0.55rem',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--text-dim)', marginBottom: '0.4rem',
          }}>
            Practice now →
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {post.relatedItems.map(item => {
              const rc = ROOM_CONFIG[item.room];
              return (
                <button
                  key={item.id}
                  onClick={() => onOpenItem && onOpenItem(item.room, item.id)}
                  style={{
                    background: 'var(--surface-2)', border: `1px solid var(--border)`,
                    borderRadius: 'var(--radius-sm)', padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem', color: rc?.color || 'var(--text-muted)',
                    cursor: onOpenItem ? 'pointer' : 'default',
                    fontWeight: 500, transition: 'all 0.1s',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => {
                    if (onOpenItem) {
                      e.currentTarget.style.borderColor = rc?.color || 'var(--border)';
                      e.currentTarget.style.background = 'var(--surface)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface-2)';
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
