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
  const total = POSTS.length;
  const companyCat = POSTS.filter(p => p.category === 'Company Questions').length;

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
            { n: total, label: 'topics' },
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
                <PostCard key={post.id} post={post} cfg={cfg} onOpenItem={onOpenItem} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PostCard({ post, cfg, onOpenItem }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.1rem 1.2rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
    }}>

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
        <span style={{
          fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
          color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
        }}>Coming Soon</span>
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
