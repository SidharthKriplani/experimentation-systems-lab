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
      { type: 'text', text: 'Every rate metric is a fraction. The numerator gets all the attention. The denominator determines everything.' },
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
  },
  {
    id: 'five-metric-types',
    category: 'Metrics',
    title: 'The 5 Metric Types Every Product Analyst Must Know Cold',
    summary: 'North star, diagnostic, guardrail, proxy, composite. Know the role of each, when to reach for which, and how to articulate the hierarchy to a PM without jargon.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Revenue Growth Metric', room: 'metrics', id: 'm05' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
    ],
    content: [
      { type: 'text', text: 'Most analysts know what a metric is. Senior analysts know what role a metric plays — and that role determines how you use it in an experiment, how you weight it in a decision, and how you defend it to stakeholders.' },
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
  },
  {
    id: 'game-proof-north-star',
    category: 'Metrics',
    title: 'How to Game-Proof Your North Star Metric',
    summary: 'Every metric can be gamed. The senior move is naming exactly how — and designing the guardrail that catches it before a stakeholder does.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Checklist Completion Illusion', room: 'review', id: 's12' },
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
    ],
  },
  {
    id: 'gmv-vs-revenue',
    category: 'Metrics',
    title: 'GMV vs Revenue vs ARPU vs LTV: When to Use Which',
    summary: 'These are not interchangeable. Using GMV when you mean revenue costs you credibility in senior interviews and stakeholder meetings.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Revenue Growth Metric (GMV vs NRR)', room: 'metrics', id: 'm05' },
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
    ],
  },
  {
    id: 'metric-grain',
    category: 'Metrics',
    title: 'Metric Grain: The Most Underrated Concept in Product Analytics',
    summary: 'Grain defines what one row represents. Getting it wrong means your aggregations are silently incorrect. Most analysts never explicitly state it.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
  },
  {
    id: 'proxy-metrics',
    category: 'Metrics',
    title: 'Proxy Metrics: When to Use Them, When They Betray You',
    summary: 'Open rate is not engagement. Deflection is not resolution. Proxy metrics are necessary but dangerous — here\'s how to propose them with the right caveats.',
    readMin: 6,
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
    readMin: 8,
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
    readMin: 6,
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
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
    ],
  },
  {
    id: 'metric-ownership',
    category: 'Metrics',
    title: 'Metric Ownership: Formula, Grain, Numerator, Denominator — All Four, Always',
    summary: 'You cannot have a metric conversation until all four are locked. This is what metric ownership means in practice.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
    ],
  },
  {
    id: 'marketplace-liquidity',
    category: 'Metrics',
    title: 'Marketplace Liquidity: The Metric That Predicts Marketplace Health Before GMV Moves',
    summary: 'Liquidity measures whether buyers can find what they want and sellers can find buyers. It leads GMV by weeks — here\'s how to track and interpret it.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
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
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
    content: [
      { type: 'text', text: 'When a metric drops and your PM is pinging you for answers, the worst thing you can do is start listing hypotheses. That\'s not analysis — it\'s guessing out loud. The CDSHV framework gives you a repeatable structure that works under pressure.' },
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
  },
  {
    id: 'decompose-before-diagnose',
    category: 'RCA',
    title: 'Decompose Before You Diagnose',
    summary: 'Listing hypotheses before decomposing is the most common RCA mistake. The order matters more than the hypotheses themselves.',
    readMin: 6,
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
    readMin: 6,
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
    readMin: 7,
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
    readMin: 10,
    source: 'Meta / Airbnb interview pattern',
    relatedItems: [
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
  },
  {
    id: 'rca-vs-sizing-vs-causal',
    category: 'RCA',
    title: 'RCA vs Opportunity Sizing vs Causal Validation: Three Different Tools',
    summary: 'Treating these as the same thing is a common failure mode. Each has a different structure, data requirement, and output.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'notification-fatigue-rca',
    category: 'RCA',
    title: 'D7 Retention Is Falling — Is It Notification Fatigue or Something Else?',
    summary: 'Diagnosing retention drops requires layered cuts — platform, cohort, feature usage, and notification cadence. Walk through the full analysis tree.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Notification Timing Test', room: 'review', id: 's10' },
    ],
  },
  {
    id: 'time-patterns-rca',
    category: 'RCA',
    title: 'Time Patterns in RCA: Deployment, Seasonality, and Cohort Cuts',
    summary: 'A metric drop that started Tuesday is likely a deployment. One that started after a campaign is attribution. Time cuts narrow the hypothesis space faster than anything else.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
  },
  {
    id: 'seller-quality-rca',
    category: 'RCA',
    title: 'Marketplace Cancellations Are Spiking: A Seller Quality Diagnosis',
    summary: 'When buyer-facing metrics deteriorate, the root cause is often supply-side. Walk through a seller quality RCA with segment cuts and validation steps.',
    readMin: 9,
    source: 'eBay / Airbnb interview pattern',
    relatedItems: [
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
  },
  {
    id: 'data-availability-thinking',
    category: 'RCA',
    title: 'Data Availability Thinking: Map What You Have, What\'s Missing, and What the Gap Means',
    summary: 'Assuming all data exists is a red flag. Senior analysts name the table, grain, and join logic — and acknowledge gaps without using them as an excuse to stop.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
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
    readMin: 7,
    source: 'Meta, Airbnb interview standard',
    relatedItems: [
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
    ],
    content: [
      { type: 'text', text: 'SRM — Sample Ratio Mismatch — is when the proportion of users assigned to your experiment groups doesn\'t match the intended split. If you assigned 50/50 but see 47% in control and 53% in treatment, your experiment is broken. Shipping on this data is worse than not running the experiment at all.' },
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
  },
  {
    id: 'randomization-unit',
    category: 'Experimentation',
    title: 'Randomization Unit: User vs Session vs Device — Why It Matters',
    summary: 'The wrong randomization unit inflates variance, breaks SUTVA, or creates inconsistent user experience. The right choice depends on what you\'re testing.',
    readMin: 7,
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
    readMin: 6,
    source: 'Netflix, Spotify interview pattern',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
    ],
    content: [
      { type: 'text', text: 'When you ship a new feature, users notice it because it\'s new — not necessarily because it\'s better. The initial engagement spike is temporary. Two weeks later, behavior reverts toward baseline. If you stopped your experiment at day 3, you shipped based on novelty, not value.' },
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
  },
  {
    id: 'sutva',
    category: 'Experimentation',
    title: 'SUTVA Violations: When Your A/B Test Measures the Wrong Thing',
    summary: 'When treatment and control units interact, your experiment is contaminated. Network effects, shared inventory, and marketplace dynamics all break SUTVA.',
    readMin: 7,
    source: 'Airbnb, Uber two-sided marketplace pattern',
    relatedItems: [
      { label: 'SUTVA/Spillover (Stats)', room: 'stats', id: 'stat08' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
    content: [
      { type: 'text', text: 'SUTVA stands for Stable Unit Treatment Value Assumption. It says: the outcome for any unit depends only on whether that unit is treated, not on what happens to other units. When SUTVA breaks, your experiment\'s results are contaminated — you\'re not measuring what you think you\'re measuring.' },
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
  },
  {
    id: 'guardrail-conflicts',
    category: 'Experimentation',
    title: 'When the North Star Rises and the Guardrail Falls',
    summary: 'GMV is up 3% but refund rate is up 8%. Ship, rollback, or investigate? This is the most common real-world experiment scenario and the decision framework is not obvious.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Guardrail Conflict (Stats)', room: 'stats', id: 'stat06' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
  },
  {
    id: 'multiple-testing',
    category: 'Experimentation',
    title: 'Multiple Testing: Why More Metrics Inflates Your False Positive Rate',
    summary: 'Test 20 metrics at p < 0.05 and you expect one false positive by chance. Bonferroni, FDR, and pre-registration — the tools that keep you honest.',
    readMin: 7,
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
  },
  {
    id: 'peeking',
    category: 'Experimentation',
    title: 'Peeking: Why Checking Your Experiment Mid-Run Is Dangerous',
    summary: 'Every time you look at an in-progress test and consider stopping early, you raise your false positive rate. Sequential testing methods solve this.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
    ],
    content: [
      { type: 'text', text: 'Peeking is looking at your experiment results before the planned end date and making a decision to stop early. It feels responsible — why run longer if you already see significance? But it systematically inflates false positive rates.' },
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
  },
  {
    id: 'cuped',
    category: 'Experimentation',
    title: 'CUPED: More Statistical Power Without Running Longer',
    summary: 'CUPED uses pre-experiment behavior to reduce variance. More power, same sample size, same runtime. Here\'s the intuition without the math.',
    readMin: 7,
    source: 'Netflix, Spotify, Microsoft standard',
    relatedItems: [
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
    ],
  },
  {
    id: 'experiment-design-primary-metric',
    category: 'Experimentation',
    title: 'Pre-Committing Your Primary Metric Before the Experiment Starts',
    summary: 'Pre-committing to a primary metric is what keeps you from p-hacking your way to a ship decision. Here\'s how to choose it.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Design the Mobile Feature Test', room: 'design', id: 'd03' },
    ],
  },
  {
    id: 'decision-rule',
    category: 'Experimentation',
    title: 'The Pre-Committed Decision Rule: Writing It Before You See Results',
    summary: 'A decision rule written after seeing results is post-hoc rationalization. Here\'s what a good pre-committed rule looks like and how to defend it.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Multi-Metric Launch', room: 'design', id: 'd04' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
  },
  {
    id: 'cannibalization',
    category: 'Experimentation',
    title: 'Cannibalization and Tradeoffs: When Your Win Comes at a Cost',
    summary: 'A feature that lifts engagement but hurts revenue is not a win. Detecting and quantifying tradeoffs between metrics is the experimentation skill most analysts skip.',
    readMin: 7,
    source: 'Airbnb guest vs host tradeoff pattern',
    relatedItems: [
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
  },
  {
    id: 'hte',
    category: 'Experimentation',
    title: 'Heterogeneous Treatment Effects: When the Average Hides the Story',
    summary: 'An average null result can mask a strong positive for one segment and a strong negative for another. HTE analysis is where the real insight lives.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Mobile Feature Test (HTE)', room: 'review', id: 's05' },
    ],
  },
  {
    id: 'two-sided-marketplace-experiments',
    category: 'Experimentation',
    title: 'A/B Testing in Two-Sided Marketplaces: What\'s Different',
    summary: 'Experiments that affect both buyers and sellers create interference by design. Switchback designs, holdout groups, and marketplace-aware randomization — when and how to use each.',
    readMin: 9,
    source: 'Airbnb, Uber, eBay interview pattern',
    relatedItems: [
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
    ],
  },
  {
    id: 'end-to-end-experiment',
    category: 'Experimentation',
    title: 'End-to-End Experiment: Hypothesis to Ship/Rollback Decision',
    summary: 'Most prep covers individual concepts. This walks the full lifecycle — hypothesis, metric selection, power, trust checks, readout, final call.',
    readMin: 12,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Checkout CVR Drop (Review)', room: 'review', id: 's01' },
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
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
    ],
  },
  {
    id: 'confidence-intervals',
    category: 'Statistics',
    title: 'Confidence Intervals: Read Them, Don\'t Just Report Them',
    summary: 'A CI that barely excludes zero is not the same as one centered far from zero. Most analysts report CIs but don\'t read them.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
    ],
  },
  {
    id: 'power-mde',
    category: 'Statistics',
    title: 'Power, MDE, and Why Most A/B Tests Are Underpowered',
    summary: 'Running an underpowered test and calling a null result "no effect" is a common, silent mistake. Here\'s how to calculate what sample size you actually need.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
      { label: 'Design the Notification Timing Test', room: 'design', id: 'd06' },
    ],
  },
  {
    id: 'type1-type2',
    category: 'Statistics',
    title: 'Type I vs Type II Errors in Product Decisions',
    summary: 'Type I: shipping something that doesn\'t work. Type II: not shipping something that does. The cost of each depends on your product context — not just alpha.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'Power/MDE (Stats)', room: 'stats', id: 'stat03' },
    ],
  },
  {
    id: 'practical-vs-statistical',
    category: 'Statistics',
    title: 'Statistical Significance vs Practical Significance',
    summary: 'A 0.01% CVR lift can be statistically significant at scale. It is almost never practically significant. Knowing which you\'re looking at prevents bad ship decisions.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'CI Reality (Stats)', room: 'stats', id: 'stat02' },
      { label: 'Multi-Metric Launch', room: 'review', id: 's04' },
    ],
  },
  {
    id: 'simpsons-paradox',
    category: 'Statistics',
    title: 'Simpson\'s Paradox: When the Aggregate Points the Wrong Direction',
    summary: 'A treatment can appear to help in every subgroup while hurting in aggregate — or vice versa. Real product examples and the segmentation habit that catches it.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
      { label: 'Seller Speed Spillover', room: 'review', id: 's11' },
    ],
  },
  {
    id: 'bayesian-vs-frequentist',
    category: 'Statistics',
    title: 'Bayesian vs Frequentist A/B Testing: The Practical Difference',
    summary: 'You don\'t need to pick a side. The choice affects how you interpret results and communicate uncertainty — both matter in product work.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
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
    readMin: 9,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
  },
  {
    id: 'proxy-design',
    category: 'Ambiguous Problems',
    title: 'Proxy Design: What to Do When You Don\'t Have the Exact Data',
    summary: '"We don\'t have that data" is never a complete answer. Senior analysts propose proxies with stated limitations.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
    ],
  },
  {
    id: 'sound-senior',
    category: 'Ambiguous Problems',
    title: '20 Answer Patterns That Signal Analytical Seniority',
    summary: 'The difference between analyst-level and senior-level answers is often phrasing and structure, not knowledge.',
    readMin: 8,
    source: 'Composite from Meta, Google, Airbnb interview feedback',
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'five-question-types',
    category: 'Ambiguous Problems',
    title: 'The 5 Question Types in Every DS Product Analytics Loop',
    summary: 'Diagnose a movement. Measure whether something works. Size an opportunity. Build a decision model. ML modeling. Each has a different structure and opening move.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'problem-framing',
    category: 'Ambiguous Problems',
    title: 'Problem Framing: Restating the Business Decision Before Touching Data',
    summary: 'The first 60 seconds should never include a metric. Restate the business decision, success definition, and scope — then start the analysis.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
  },
  {
    id: 'opportunity-sizing',
    category: 'Ambiguous Problems',
    title: 'Opportunity Sizing: Estimating Impact Before Running an Experiment',
    summary: 'Is this worth building? Sizing with base rates, addressable population, and realistic lift prevents teams from optimizing the wrong things.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'stakeholder-communication',
    category: 'Ambiguous Problems',
    title: 'Calibrating Your Answer for PM vs Engineer vs Exec',
    summary: 'Same finding, three different communication styles. Senior analysts know which audience they\'re talking to and adjust depth, vocabulary, and framing accordingly.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
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
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'GenAI Support Bot', room: 'metrics', id: 'm06' },
      { label: 'GenAI Bot Escalation Spike', room: 'rca', id: 'rca06' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
  },
  {
    id: 'genai-metrics',
    category: 'GenAI Analytics',
    title: 'Measuring GenAI Products: Edit Rate, Task Completion, Satisfaction',
    summary: 'LLM outputs don\'t fit neatly into traditional engagement metrics. Here\'s a framework for defining what success looks like for AI-generated features.',
    readMin: 7,
    source: null,
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
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
  },
  {
    id: 'ab-testing-llm',
    category: 'GenAI Analytics',
    title: 'A/B Testing LLM Features: What\'s Different and What\'s Not',
    summary: 'Experimentation fundamentals still apply — but LLM outputs have high variance, latency effects, and user adaptation patterns that complicate standard design.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
  },
  {
    id: 'ml-vs-crosstab',
    category: 'GenAI Analytics',
    title: 'When to Use ML vs a Simple Crosstab',
    summary: 'Over-indexing on ML for problems solvable with a crosstab is a red flag in senior interviews. Here\'s the decision tree.',
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
  },
  {
    id: 'churn-prediction',
    category: 'GenAI Analytics',
    title: 'Churn Prediction: Label Design, Feature Engineering, Business Actionability',
    summary: 'A churn model nobody acts on is a wasted model. It starts with label design and ends with an intervention — here\'s the full pipeline.',
    readMin: 8,
    source: 'Lyft, DoorDash, Spotify interview pattern',
    relatedItems: [
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
    ],
  },
  {
    id: 'feature-importance-causality',
    category: 'GenAI Analytics',
    title: 'Feature Importance vs Causality: Why Your Model\'s Top Feature May Be a Confounder',
    summary: 'SHAP values tell you what the model learned — not what caused the outcome. Mixing the two leads to bad interventions and wrong product decisions.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
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
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
    ],
  },
  {
    id: 'feature-launch-metrics',
    category: 'Product Sense',
    title: 'Defining Success Metrics for Any Feature Launch',
    summary: 'North star → diagnostics → guardrails → decision rule. The four-layer metric structure that makes any launch measurable from day one.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'Design the Checkout Test', room: 'design', id: 'd01' },
      { label: 'Design the Mobile Feature Test', room: 'design', id: 'd03' },
    ],
  },
  {
    id: 'search-ranking-metrics',
    category: 'Product Sense',
    title: 'Measuring Search Ranking Quality: Beyond CTR and CVR',
    summary: 'A ranking change that improves CTR on bad results is a regression. How to build a metric system that captures quality, not just clicks.',
    readMin: 7,
    source: 'eBay, Google, Airbnb search team pattern',
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
    ],
  },
  {
    id: 'marketplace-health',
    category: 'Product Sense',
    title: 'Marketplace Health: 5 Signals That Matter for Two-Sided Platforms',
    summary: 'Liquidity, GMV concentration, buyer-to-seller ratio, fill rate, supply quality. What they mean, how they interact, and what breaks first.',
    readMin: 8,
    source: 'eBay, Airbnb, DoorDash interview pattern',
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'notification-metrics',
    category: 'Product Sense',
    title: 'Notification Health: Why Open Rate Is the Wrong Primary Metric',
    summary: 'Open rate is a proxy for attention, not value. The right metric captures whether the notification drove the intended action without burning long-term engagement.',
    readMin: 6,
    source: null,
    relatedItems: [
      { label: 'Push Notification Health', room: 'metrics', id: 'm03' },
      { label: 'Design the Notification Timing Test', room: 'design', id: 'd06' },
      { label: 'The Push Open Rate Trap', room: 'review', id: 's10' },
    ],
  },
  {
    id: 'seller-incentives',
    category: 'Product Sense',
    title: 'Seller Incentive Programs: Measuring ROI Without Getting Fooled by Selection Bias',
    summary: 'Sellers who join an incentive program are different from those who don\'t. Naive before/after comparisons overestimate impact.',
    readMin: 7,
    source: 'eBay, Walmart marketplace team pattern',
    relatedItems: [
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
      { label: 'Design the Seller Incentive Test', room: 'design', id: 'd07' },
    ],
  },
  {
    id: 'recommendation-systems-metrics',
    category: 'Product Sense',
    title: 'Measuring Recommendation Systems: Relevance, Diversity, and Long-Term Engagement',
    summary: 'A recommender that maximizes short-term CTR can create filter bubbles, reduce catalog breadth, and hurt long-term retention. How to balance the tradeoffs.',
    readMin: 8,
    source: 'Netflix, Spotify, Amazon interview pattern',
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
    readMin: 9,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
  },
  {
    id: 'retention-sql',
    category: 'SQL & Data',
    title: 'Retention Curves in SQL: D1, D7, D30 and What They Tell You',
    summary: 'How to compute retention at each horizon, visualize cohort curves, and what shape tells you what about your product\'s stickiness.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Why Did Retention Fall?', room: 'cases', id: 'c02' },
    ],
  },
  {
    id: 'cohort-analysis-sql',
    category: 'SQL & Data',
    title: 'Cohort Analysis: Why Every User Metric Should Be Segmented by Acquisition Date',
    summary: 'Aggregating across acquisition cohorts hides composition changes. A product that looks healthy in aggregate may be surviving on strong old cohorts while new ones fail.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'Revenue Up, Margin Down', room: 'rca', id: 'rca05' },
    ],
  },
  {
    id: 'window-functions',
    category: 'SQL & Data',
    title: 'Window Functions for Product Analytics: LAG, LEAD, RANK, Running Totals',
    summary: 'The four window function patterns that appear in almost every product analytics SQL problem — with worked examples.',
    readMin: 8,
    source: null,
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
  },
  {
    id: 'data-quality',
    category: 'SQL & Data',
    title: 'Data Quality Checks Before You Start Any Analysis',
    summary: 'Nulls, duplicates, grain mismatches, timestamp anomalies. The checks that catch silent errors before they become wrong conclusions.',
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
    ],
  },
  {
    id: 'ab-test-sql',
    category: 'SQL & Data',
    title: 'Computing A/B Test Results in SQL: Means, Variances, t-stats From Scratch',
    summary: 'Knowing how to compute experiment results in SQL shows you understand what the tool does — and catches errors when it breaks.',
    readMin: 9,
    source: null,
    relatedItems: [
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
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
    readMin: 7,
    source: null,
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
  },
  {
    id: 'goodharts-law',
    category: 'Mental Models',
    title: 'Goodhart\'s Law: Every Metric Becomes a Bad Metric When It Becomes a Target',
    summary: 'Product analytics history is full of metrics that were gamed the moment teams were held accountable to them. How to design around it.',
    readMin: 6,
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
    readMin: 6,
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
  },
  {
    id: 'correlation-causation',
    category: 'Mental Models',
    title: 'Correlation, Causation, and the Analyst Who Got Them Confused',
    summary: 'Applied to real product analytics scenarios — where confusing the two led to bad interventions and what the right analysis would have looked like.',
    readMin: 6,
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
    readMin: 5,
    source: null,
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'Replace Tier-1 Support with AI?', room: 'cases', id: 'c03' },
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
    readMin: 10,
    source: 'Meta Data Scientist interview — multiple Glassdoor/IGotAnOffer reports',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'D7 Retention Drop', room: 'rca', id: 'rca04' },
      { label: 'SRM First (Stats)', room: 'stats', id: 'stat04' },
    ],
    content: [
      { type: 'text', text: 'Your PM pings you Monday morning: "DAU is down 10% from last week. Session duration is up 8%. What\'s going on?" This question tests your RCA structure, your ability to handle a contradictory signal, and your composure under ambiguity.' },
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
  },
  {
    id: 'airbnb-booking-drop',
    category: 'Company Questions',
    title: '[Airbnb] Booking Conversion Dropped 5% — Diagnose It',
    summary: 'Two-sided marketplace RCA. Tests funnel decomposition, platform/cohort cuts, and awareness that supply-side changes can explain demand-side metric drops.',
    readMin: 10,
    source: 'Airbnb Data Scientist interview — Glassdoor + Interview Query reports',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
    content: [
      { type: 'text', text: 'Airbnb is a two-sided marketplace. The booking funnel connects guest intent to host supply. A 5% conversion drop could come from demand-side causes, supply-side causes, or product/engineering issues. The first mistake most candidates make: assuming it\'s a demand-side problem.' },
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
  },
  {
    id: 'doordash-coupon-impact',
    category: 'Company Questions',
    title: '[DoorDash] How Would You Measure the Impact of a 5% Off Delivery Fee Coupon?',
    summary: 'Incrementality measurement under selection bias. Tests whether you distinguish correlation from causal impact and know when holdout groups or synthetic controls are needed.',
    readMin: 9,
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
    readMin: 9,
    source: 'Spotify Data Scientist interview — Interview Query + Prepfully reports',
    relatedItems: [
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Design the Search Ranking Test', room: 'design', id: 'd05' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
    ],
  },
  {
    id: 'netflix-content-engagement',
    category: 'Company Questions',
    title: '[Netflix] How Would You Measure Whether a New Content Format Is Working?',
    summary: 'Product sense for a content platform — engagement quality vs quantity, session depth vs breadth, retention impact, and experiment design with novelty effect controls.',
    readMin: 8,
    source: 'Netflix Data Scientist interview — Interview Query reports',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
      { label: 'Design the Onboarding Checklist Test', room: 'design', id: 'd08' },
    ],
  },
  {
    id: 'uber-surge-pricing',
    category: 'Company Questions',
    title: '[Uber] How Would You Measure the Effect of Surge Pricing on Driver and Rider Satisfaction?',
    summary: 'Two-sided marketplace tradeoff measurement. Tests your ability to hold both sides of a marketplace in your head simultaneously and design guardrails for each.',
    readMin: 9,
    source: 'Uber Data Scientist interview — Glassdoor + multiple reports',
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
    readMin: 10,
    source: 'Meta Data Scientist Product Analytics — Glassdoor + DataLemur',
    relatedItems: [
      { label: 'Novelty Effect (Stats)', room: 'stats', id: 'stat07' },
      { label: 'Multiple Testing (Stats)', room: 'stats', id: 'stat05' },
      { label: 'Clickbait Ranking Win', room: 'review', id: 's09' },
      { label: 'Five Metrics Problem', room: 'review', id: 's06-five-metrics-problem' },
    ],
  },
  {
    id: 'amazon-seller-quality',
    category: 'Company Questions',
    title: '[Amazon] How Do You Measure Seller Quality on the Marketplace?',
    summary: 'Multi-dimensional quality measurement — on-time delivery, listing accuracy, return rate, response time, and buyer satisfaction. Tests decomposition and tradeoff awareness.',
    readMin: 8,
    source: 'Amazon / eBay marketplace DS pattern — Interview Query + Glassdoor',
    relatedItems: [
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'Marketplace Cancellations', room: 'rca', id: 'rca03' },
      { label: 'Which Seller Segment to Incentivize?', room: 'cases', id: 'c04' },
    ],
  },
  {
    id: 'google-engagement-drop',
    category: 'Company Questions',
    title: '[Google] Search Engagement Dropped 20% in the Last Month — Where Do You Start?',
    summary: 'Broad funnel RCA at scale. Tests platform cuts, query category decomposition, time-pattern analysis, and the ability to distinguish supply-side from demand-side causes.',
    readMin: 9,
    source: 'Google DS / Product Analytics — Glassdoor multiple reports',
    relatedItems: [
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
      { label: 'What Defines a Successful Search?', room: 'metrics', id: 'm01' },
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
    ],
  },
  {
    id: 'lyft-driver-retention',
    category: 'Company Questions',
    title: '[Lyft] Driver Churn Is Up — How Do You Diagnose It and What Do You Recommend?',
    summary: 'Supply-side retention RCA for a two-sided marketplace. Tests cohort analysis, earnings-per-hour decomposition, and the ability to connect supply health to demand-side outcomes.',
    readMin: 9,
    source: 'Lyft Data Scientist interview — DataInterview.com + SQLPad',
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
    readMin: 9,
    source: 'Stripe / fintech DS interview pattern',
    relatedItems: [
      { label: 'Checkout Conversion Drop', room: 'rca', id: 'rca01' },
      { label: 'Zero-Result Search Spike', room: 'rca', id: 'rca02' },
    ],
  },
  {
    id: 'airbnb-superhost',
    category: 'Company Questions',
    title: '[Airbnb] How Would You Redesign the Superhost Program\'s Success Metrics?',
    summary: 'Metric design for a trust system. Tests your ability to distinguish input metrics (checklist compliance) from outcome metrics (guest satisfaction, repeat bookings) and catch gaming risks.',
    readMin: 8,
    source: 'Airbnb Data Scientist interview — Glassdoor + Codinginterview.com',
    relatedItems: [
      { label: 'Checklist Completion Illusion', room: 'review', id: 's12' },
      { label: 'Marketplace Seller Quality', room: 'metrics', id: 'm04' },
      { label: 'When Is a User Actually Activated?', room: 'metrics', id: 'm02' },
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
    readMin: 6,
    source: 'Composite from Meta, Airbnb, Netflix, DoorDash loops',
    relatedItems: [
      { label: 'Launch Same-Day Delivery?', room: 'cases', id: 'c01' },
      { label: 'p-Value Decision (Stats)', room: 'stats', id: 'stat01' },
    ],
  },
  {
    id: 'common-mistakes-interview',
    category: 'Career & Interview',
    title: '12 Most Common Mistakes in Product Analytics Interviews',
    summary: 'Jumping to metrics before framing. Not naming denominators. Listing hypotheses without decomposing. Treating all metrics equally. The full checklist.',
    readMin: 8,
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
