// Blog / Learn layer
// Full topic population — content not written yet, QA pass later
// Each post maps to a room with a "Practice this now →" CTA

const POSTS = [

  // ══════════════════════════════════════════════════════════════
  // METRICS & KPIs
  // ══════════════════════════════════════════════════════════════
  {
    id: 'denominator-discipline',
    category: 'Metrics',
    title: 'Denominator Discipline: Why Every Rate Metric Is Lying to You',
    summary: 'CVR from sessions, users, and PDP viewers are three different numbers. Interviewers notice when you don\'t lock the denominator first. This is the single habit that separates junior from senior metric thinking.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'five-metric-types',
    category: 'Metrics',
    title: 'The 5 Metric Types Every Product Analyst Must Know Cold',
    summary: 'North star, diagnostic, guardrail, proxy, and composite. Know the role of each, when to reach for which, and how to explain the hierarchy to a PM in one sentence.',
    readMin: 4,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'guardrails',
    category: 'Metrics',
    title: 'Guardrails: The Metrics Nobody Asks For That You Must Track Anyway',
    summary: 'A rising CVR with a rising refund rate is not a win. Guardrails are what separate analysts from metric-farmers. Here\'s how to select, defend, and explain them.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'game-proof-north-star',
    category: 'Metrics',
    title: 'How to Game-Proof Your North Star Metric',
    summary: 'Every metric can be gamed. The senior move is naming exactly how — and designing the guardrail that catches it before a stakeholder does.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'gmv-vs-revenue',
    category: 'Metrics',
    title: 'GMV vs Revenue vs ARPU vs LTV: When to Use Which',
    summary: 'These are not interchangeable. Using GMV when you mean revenue will cost you credibility in every senior interview and stakeholder meeting.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'metric-grain',
    category: 'Metrics',
    title: 'Metric Grain: The Most Underrated Concept in Product Analytics',
    summary: 'Grain defines what one row in your analysis represents. Getting it wrong means your aggregations are silently wrong. Most analysts never explicitly state it.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'proxy-metrics',
    category: 'Metrics',
    title: 'Proxy Metrics: When to Use Them, When They Betray You',
    summary: 'Open rate is not engagement. Deflection is not resolution. Proxy metrics are necessary but dangerous. How to propose them with the right caveats.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'metric-trees',
    category: 'Metrics',
    title: 'How to Build a Metric Tree From Any North Star',
    summary: 'A metric tree decomposes your north star into its multiplicative or additive drivers. Build one correctly and you can find any lever. Build it wrong and your RCA will miss the real cause.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'activation-metrics',
    category: 'Metrics',
    title: 'Activation Metrics: The Most Important Metric Nobody Defines Properly',
    summary: 'When is a new user actually activated? Checklist completion isn\'t it. The right activation metric predicts long-term retention — here\'s how to find it.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'dau-mau-ratio',
    category: 'Metrics',
    title: 'DAU/MAU Ratio: What It Actually Measures and When It Misleads',
    summary: 'High DAU/MAU signals habit. But the ratio compresses cohort differences and can look healthy while retention collapses. Here\'s when to trust it and when to decompose it.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'take-rate',
    category: 'Metrics',
    title: 'Take Rate in Marketplace Analytics: The Metric That Hides Compression',
    summary: 'Take rate = revenue / GMV. Simple formula, complex interpretation. A rising take rate on falling GMV is a warning sign most analysts miss.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'metric-ownership',
    category: 'Metrics',
    title: 'Metric Ownership: Defining Formula, Grain, Numerator, and Denominator Before You Measure Anything',
    summary: 'You cannot have a metric conversation until all four are locked. This is what metric ownership means in practice, and what weak ownership looks like in an interview.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'business-impact-translation',
    category: 'Metrics',
    title: 'Business Impact Translation: Putting a Dollar Number on Every Metric Movement',
    summary: '[N users] × [lift] × [ARPU] = $[impact]. Interviewers remember the candidate who put a number on it. Here\'s the formula and when to apply it.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },

  // ══════════════════════════════════════════════════════════════
  // ROOT CAUSE ANALYSIS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cdshv-framework',
    category: 'RCA',
    title: 'CDSHV: The Step-by-Step RCA Framework That Beats Guessing',
    summary: 'Context → Decompose → Segment → Hypothesize → Validate. Five stages that keep your RCA structured when pressure is high and data is ambiguous.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'decompose-before-diagnose',
    category: 'RCA',
    title: 'Decompose Before You Diagnose: Why Jumping to Hypotheses Loses',
    summary: 'Listing hypotheses before decomposing is the most common RCA mistake in interviews and in real work. The order matters more than the hypotheses themselves.',
    readMin: 6,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'segment-before-aggregate',
    category: 'RCA',
    title: 'The Aggregate Is Always Hiding Something',
    summary: 'A flat aggregate is a weighted average of segment movements. Platform, cohort, and time-pattern cuts first — every time. Here\'s the sequence that works.',
    readMin: 6,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'rca-walkthrough-search',
    category: 'RCA',
    title: 'Search CVR Dropped 15%: A Full RCA Walkthrough',
    summary: 'Step by step from alert to root cause — decomposing the funnel, cutting by segment, forming hypotheses, and deciding what to validate first.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'rca-vs-sizing-vs-causal',
    category: 'RCA',
    title: 'RCA vs Opportunity Sizing vs Causal Validation: Three Different Tools',
    summary: 'Treating these as the same thing is a common failure mode. Each has a different structure, data requirement, output format, and business implication.',
    readMin: 4,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'mix-shift',
    category: 'RCA',
    title: 'Mix Shift: The Hidden Cause Behind Half Your Metric Movements',
    summary: 'Revenue grew but margin fell. CVR improved but GMV didn\'t. Mix shift causes movements that look wrong until you understand the composition change underneath.',
    readMin: 4,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'rca-notification-fatigue',
    category: 'RCA',
    title: 'D7 Retention Is Falling. Is It Notification Fatigue or Something Else?',
    summary: 'Diagnosing retention drops requires layered cuts — platform, cohort, feature usage, and notification cadence. Walk through the analysis tree.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'data-availability-thinking',
    category: 'RCA',
    title: 'Data Availability Thinking: Map What You Have, What You\'re Missing, and What the Gap Means',
    summary: 'Assuming all data exists is a red flag. Senior analysts name the table, grain, and join logic — and acknowledge gaps without using them as an excuse to stop.',
    readMin: 6,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'rca-seller-quality',
    category: 'RCA',
    title: 'Marketplace Cancellations Are Spiking: A Seller Quality RCA',
    summary: 'When buyer-facing metrics deteriorate, the root cause is often supply-side. Walk through a seller quality diagnosis with segment cuts and validation steps.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'time-patterns-rca',
    category: 'RCA',
    title: 'Time Patterns in RCA: Day-of-Week, Cohort, and Deployment Cuts',
    summary: 'A metric drop that started Tuesday is likely a deployment. One that started after a campaign is attribution. Time cuts narrow the hypothesis space faster than anything else.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },

  // ══════════════════════════════════════════════════════════════
  // EXPERIMENTATION
  // ══════════════════════════════════════════════════════════════
  {
    id: 'srm',
    category: 'Experimentation',
    title: 'What Is SRM and Why It Should Stop Your Ship Decision',
    summary: 'Sample Ratio Mismatch means your experiment is broken. Shipping on an experiment with SRM is worse than not running the experiment at all.',
    readMin: 4,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'p-values',
    category: 'Experimentation',
    title: 'p-values Don\'t Mean What You Think They Mean',
    summary: 'p < 0.05 does not mean 95% chance the treatment works. Understanding what it actually says — and what it doesn\'t — changes every experiment readout you\'ll ever do.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'confidence-intervals',
    category: 'Experimentation',
    title: 'Confidence Intervals: Read Them, Don\'t Just Report Them',
    summary: 'A CI that barely excludes zero is not the same as one centered far from zero. Most analysts report CIs but don\'t read them. Here\'s the difference.',
    readMin: 6,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'power-mde',
    category: 'Experimentation',
    title: 'Power, MDE, and Why Most A/B Tests Are Underpowered',
    summary: 'Running an underpowered test and calling a null result "no effect" is a common, silent mistake. Here\'s how to calculate what sample size you actually need.',
    readMin: 5,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'novelty-effect',
    category: 'Experimentation',
    title: 'Novelty Effect: The Trap That Fools Every Junior Analyst',
    summary: 'Users engage with new things because they\'re new — not because they\'re better. Early experiment results are systematically biased upward. Here\'s how to account for it.',
    readMin: 6,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'sutva',
    category: 'Experimentation',
    title: 'SUTVA Violations: When Your A/B Test Measures the Wrong Thing',
    summary: 'When treatment and control units interact, your experiment is contaminated. Network effects, shared inventory, and marketplace dynamics all break SUTVA.',
    readMin: 4,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'guardrail-conflicts',
    category: 'Experimentation',
    title: 'When the North Star Rises and the Guardrail Falls: What Do You Do?',
    summary: 'GMV is up 3% but refund rate is up 8%. This is the most common real-world experiment scenario. The decision framework is not obvious — here it is.',
    readMin: 6,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'multiple-testing',
    category: 'Experimentation',
    title: 'Multiple Testing: Why Running More Metrics Inflates Your False Positive Rate',
    summary: 'Test 20 metrics at p < 0.05 and you expect one spurious positive by chance. Bonferroni, FDR, and pre-registration — the tools that keep you honest.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'peeking',
    category: 'Experimentation',
    title: 'Peeking: Why Checking Your Experiment Mid-Run Inflates False Positives',
    summary: 'Every time you check an in-progress test and consider stopping early, you increase your chance of a false positive. Sequential testing methods solve this — here\'s the intuition.',
    readMin: 6,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'randomization-unit',
    category: 'Experimentation',
    title: 'Randomization Unit: User vs Session vs Device — Why It Matters',
    summary: 'The wrong randomization unit inflates variance, breaks SUTVA, or leads to inconsistent user experience. The right choice depends on what you\'re testing.',
    readMin: 4,
    room: 'design',
    roomLabel: 'Design Room',
  },
  {
    id: 'cuped',
    category: 'Experimentation',
    title: 'CUPED: Getting More Statistical Power Without Running Longer',
    summary: 'CUPED uses pre-experiment behavior to reduce variance in your outcome metric. More power, same sample size, same runtime. Here\'s the intuition without the math.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'experiment-design-primary-metric',
    category: 'Experimentation',
    title: 'Choosing Your Primary Metric Before the Experiment Starts',
    summary: 'Pre-committing to a primary metric is not bureaucracy — it\'s what keeps you from p-hacking your way to a ship decision. Here\'s how to choose the right one.',
    readMin: 6,
    room: 'design',
    roomLabel: 'Design Room',
  },
  {
    id: 'decision-rule',
    category: 'Experimentation',
    title: 'The Pre-Committed Decision Rule: Writing It Before You See Results',
    summary: 'A decision rule written after seeing results is not a decision rule — it\'s post-hoc rationalization. Here\'s what a good pre-committed rule looks like.',
    readMin: 5,
    room: 'design',
    roomLabel: 'Design Room',
  },
  {
    id: 'cannibalization',
    category: 'Experimentation',
    title: 'Cannibalization and Tradeoffs: When Your Win Comes at a Cost',
    summary: 'A feature that lifts engagement but hurts revenue is not a win. Detecting and quantifying tradeoffs between metrics is the senior experimentation skill most analysts skip.',
    readMin: 4,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'hte',
    category: 'Experimentation',
    title: 'Heterogeneous Treatment Effects: When the Average Hides the Story',
    summary: 'An average null result can mask a strong positive effect for one segment and a strong negative effect for another. HTE analysis is where the real insight lives.',
    readMin: 4,
    room: 'review',
    roomLabel: 'Review Room',
  },
  {
    id: 'end-to-end-experiment',
    category: 'Experimentation',
    title: 'End-to-End Experiment Design: From Hypothesis to Ship/Rollback Decision',
    summary: 'Most interview prep covers individual concepts. This post walks the entire lifecycle — hypothesis, metric selection, power calculation, trust checks, readout, decision.',
    readMin: 5,
    room: 'design',
    roomLabel: 'Design Room',
  },

  // ══════════════════════════════════════════════════════════════
  // STATISTICS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'type1-type2',
    category: 'Statistics',
    title: 'Type I vs Type II Errors: What They Actually Mean in Product Decisions',
    summary: 'Type I: shipping something that doesn\'t work. Type II: not shipping something that does. The cost of each depends on your product context — not just your alpha level.',
    readMin: 6,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'practical-vs-statistical',
    category: 'Statistics',
    title: 'Statistical Significance vs Practical Significance: The Distinction That Changes Decisions',
    summary: 'A 0.01% CVR lift can be statistically significant at scale. It is almost never practically significant. Knowing which you\'re looking at prevents bad ship decisions.',
    readMin: 5,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'variance-reduction',
    category: 'Statistics',
    title: 'Variance Reduction in Experiments: Why It Matters and What to Do About It',
    summary: 'High variance in your outcome metric means you need longer experiments or more users. CUPED, stratification, and better metric selection all reduce variance.',
    readMin: 6,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'bayesian-vs-frequentist',
    category: 'Statistics',
    title: 'Bayesian vs Frequentist A/B Testing: What\'s the Real Difference?',
    summary: 'You don\'t need to pick a side to understand the practical tradeoffs. The choice affects how you interpret results and communicate uncertainty — both matter in product work.',
    readMin: 5,
    room: 'stats',
    roomLabel: 'Stats Room',
  },

  // ══════════════════════════════════════════════════════════════
  // AMBIGUOUS PROBLEMS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ambiguous-10-steps',
    category: 'Ambiguous Problems',
    title: 'How to Break Down Any Ambiguous Product Question in 10 Steps',
    summary: 'Interviewers asking ambiguous questions are not looking for your metrics list. They want to see you convert a fuzzy business question into structured analysis. Here\'s the framework.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'proxy-design',
    category: 'Ambiguous Problems',
    title: 'Proxy Design: What to Do When You Don\'t Have the Exact Data',
    summary: '"We don\'t have that data" is never a complete answer. Senior analysts propose proxies with stated limitations. Here\'s how to do it under interview pressure.',
    readMin: 6,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'sound-senior',
    category: 'Ambiguous Problems',
    title: '20 Answer Patterns That Signal Analytical Seniority',
    summary: 'The difference between analyst-level and senior-level answers is often phrasing and structure, not knowledge. These 20 patterns are worth internalizing before any interview loop.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'five-question-types',
    category: 'Ambiguous Problems',
    title: 'The 5 Question Types in Every DS Product Analytics Interview Loop',
    summary: 'Diagnose a metric movement. Measure whether something is working. Identify an opportunity. Build a decision model. ML/product modeling. Each has a different structure and opening move.',
    readMin: 4,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'problem-framing',
    category: 'Ambiguous Problems',
    title: 'Problem Framing: Restating the Question Before Touching Data',
    summary: 'The first 60 seconds of an ambiguous problem answer should never include a metric. Restate the business decision, the success definition, and the scope — then start the analysis.',
    readMin: 6,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'stakeholder-communication',
    category: 'Ambiguous Problems',
    title: 'Calibrating Your Answer for PM vs Engineer vs Exec',
    summary: 'Same finding, three different communication styles. Senior analysts know which audience they\'re talking to and adjust depth, vocabulary, and recommendation framing accordingly.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'opportunity-sizing',
    category: 'Ambiguous Problems',
    title: 'Opportunity Sizing: How to Estimate Impact Before Running an Experiment',
    summary: 'Is this worth building? Sizing the opportunity with back-of-envelope math using base rates, addressable population, and realistic lift prevents teams from optimizing the wrong things.',
    readMin: 4,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'build-or-not',
    category: 'Ambiguous Problems',
    title: 'Should We Build This? A Framework for Data-Backed Build/No-Build Decisions',
    summary: 'Expected value = P(success) × uplift × ARPU × addressable users. Below a threshold, the cost of building exceeds the expected return. Here\'s how to structure that conversation.',
    readMin: 4,
    room: 'cases',
    roomLabel: 'Cases Room',
  },

  // ══════════════════════════════════════════════════════════════
  // GENAI & ML ANALYTICS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'deflection-resolution',
    category: 'GenAI Analytics',
    title: 'Deflection ≠ Resolution: The Proxy Trap in AI Support Metrics',
    summary: 'A bot that deflects 80% of support tickets looks great. Until you track what happened to those users downstream. This is the most common GenAI metric mistake.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'ml-vs-crosstab',
    category: 'GenAI Analytics',
    title: 'When to Use ML vs a Simple Crosstab',
    summary: 'Over-indexing on ML for problems solvable with a crosstab is a red flag in senior interviews. Here\'s the decision tree for when ML actually adds value.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'genai-metrics',
    category: 'GenAI Analytics',
    title: 'Measuring GenAI Products: Edit Rate, Hallucination Rate, Task Completion, and Satisfaction',
    summary: 'LLM outputs don\'t fit neatly into traditional engagement metrics. Here\'s a framework for defining what success looks like for AI-generated features.',
    readMin: 4,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'rag-quality-metrics',
    category: 'GenAI Analytics',
    title: 'How to Measure RAG Quality: Retrieval vs Generation vs End Task',
    summary: 'A RAG system has two failure modes — bad retrieval and bad generation — and they require different diagnostics. Here\'s how to set up the measurement layer.',
    readMin: 4,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'ab-testing-llm',
    category: 'GenAI Analytics',
    title: 'A/B Testing LLM Features: What\'s Different and What\'s Not',
    summary: 'Experimentation fundamentals still apply — but LLM outputs have high variance, latency effects, and user adaptation patterns that complicate standard experiment design.',
    readMin: 5,
    room: 'design',
    roomLabel: 'Design Room',
  },
  {
    id: 'churn-prediction',
    category: 'GenAI Analytics',
    title: 'Churn Prediction: Label Design, Feature Engineering, and Business Actionability',
    summary: 'A churn model nobody acts on is a wasted model. The analysis starts with label design and ends with an intervention — here\'s the full pipeline.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'feature-importance',
    category: 'GenAI Analytics',
    title: 'Feature Importance vs Causality: Why Your Model\'s Top Feature Might Be a Confounder',
    summary: 'SHAP values tell you what the model learned — not what caused the outcome. Mixing the two up leads to bad interventions and wrong product decisions.',
    readMin: 4,
    room: 'cases',
    roomLabel: 'Cases Room',
  },

  // ══════════════════════════════════════════════════════════════
  // PRODUCT SENSE FOR DS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'product-sense-ds',
    category: 'Product Sense',
    title: 'Product Sense for Data Scientists: What\'s Actually Being Tested',
    summary: 'DS product sense is not PM product sense. You\'re not being asked what to build — you\'re being asked how to know if it\'s working, why a metric moved, and what the data says to do next.',
    readMin: 6,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'feature-launch-metrics',
    category: 'Product Sense',
    title: 'How to Define Success Metrics for Any Feature Launch',
    summary: 'North star → diagnostics → guardrails → decision rule. The four-layer metric structure that makes your launch measurable from day one.',
    readMin: 4,
    room: 'design',
    roomLabel: 'Design Room',
  },
  {
    id: 'search-ranking-metrics',
    category: 'Product Sense',
    title: 'Measuring Search Ranking Quality: Beyond CTR and CVR',
    summary: 'A ranking change that improves CTR on bad results is a regression. How to build a metric system that captures ranking quality, not just click behavior.',
    readMin: 4,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'marketplace-health',
    category: 'Product Sense',
    title: 'Marketplace Health: The 5 Signals That Matter for Two-Sided Platforms',
    summary: 'Liquidity, GMV concentration, buyer-to-seller ratio, fill rate, and supply quality. What they mean, how they interact, and what breaks when one deteriorates.',
    readMin: 5,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'notification-metrics',
    category: 'Product Sense',
    title: 'Notification Health: Why Open Rate Is the Wrong Primary Metric',
    summary: 'Open rate is a proxy for attention, not value. The right metric captures whether the notification drove the intended action without burning long-term engagement.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'seller-incentives',
    category: 'Product Sense',
    title: 'Seller Incentive Programs: How to Measure ROI Without Getting Fooled by Selection Bias',
    summary: 'Sellers who join an incentive program are different from those who don\'t. Naive before/after comparisons overestimate impact. Here\'s the right measurement approach.',
    readMin: 4,
    room: 'cases',
    roomLabel: 'Cases Room',
  },

  // ══════════════════════════════════════════════════════════════
  // SQL & DATA EXECUTION
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sql-funnel-analysis',
    category: 'SQL & Data',
    title: 'Funnel Analysis in SQL: From Session Start to Conversion',
    summary: 'Step-level conversion rates, drop-off diagnosis, and cohort-level funnel comparison — all in SQL. The query patterns every product analyst needs in their toolkit.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'retention-sql',
    category: 'SQL & Data',
    title: 'Retention Curves in SQL: D1, D7, D30 and What They Tell You',
    summary: 'How to compute retention at each horizon, how to visualize cohort curves, and what shape of curve tells you what about your product\'s stickiness.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'cohort-analysis-sql',
    category: 'SQL & Data',
    title: 'Cohort Analysis: Why Every User Metric Should Be Segmented by Acquisition Date',
    summary: 'Aggregating across acquisition cohorts hides composition changes. A product that looks healthy in aggregate may be surviving on strong old cohorts while new cohorts fail.',
    readMin: 4,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'window-functions',
    category: 'SQL & Data',
    title: 'Window Functions for Product Analytics: LAG, LEAD, RANK, and Running Totals',
    summary: 'The four window function patterns that appear in almost every product analytics SQL problem — with worked examples for session analysis, ranking, and time-series metrics.',
    readMin: 5,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'data-quality',
    category: 'SQL & Data',
    title: 'Data Quality Checks Before You Start Any Analysis',
    summary: 'Nulls, duplicates, grain mismatches, and timestamp anomalies. The checks that catch silent errors before they become wrong conclusions. A checklist with SQL patterns.',
    readMin: 4,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'ab-test-results-sql',
    category: 'SQL & Data',
    title: 'Computing A/B Test Results in SQL: Means, Variances, and t-stats From Scratch',
    summary: 'Most analysts use a tool to compute experiment results. Knowing how to compute them in SQL shows you understand what the tool is actually doing — and catches errors when it breaks.',
    readMin: 5,
    room: 'stats',
    roomLabel: 'Stats Room',
  },

  // ══════════════════════════════════════════════════════════════
  // CAREER & INTERVIEW
  // ══════════════════════════════════════════════════════════════
  {
    id: 'interview-loop-map',
    category: 'Career & Interview',
    title: 'Mapping the DS / Product Analytics Interview Loop: What Each Round Is Testing',
    summary: 'Round 1 is SQL execution. Round 2 is ambiguous problem framing and metric design. Round 3+ is experimentation, business cases, and ML. Know the map before you prepare.',
    readMin: 6,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'common-mistakes-interview',
    category: 'Career & Interview',
    title: '12 Most Common Mistakes in Product Analytics Interviews — and How to Avoid Each',
    summary: 'Jumping to metrics before framing. Not naming denominators. Listing hypotheses without decomposing. Treating all metrics as equally important. The checklist of what not to do.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'decision-partner-framing',
    category: 'Career & Interview',
    title: 'You Are Not a Metrics Reporter. You Are an Analytical Decision Partner.',
    summary: 'The mindset shift that changes how you answer every interview question and structure every analysis: the output is always a recommendation, not a dashboard.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'closing-with-recommendation',
    category: 'Career & Interview',
    title: 'How to Close Every Answer With a Recommendation (Even When You\'re Uncertain)',
    summary: '"It depends" with no direction is not a senior answer. Here\'s the structure for closing with a recommendation that includes confidence level, key assumption, and next step.',
    readMin: 5,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'rapid-revision',
    category: 'Career & Interview',
    title: 'The 30-Minute Rapid Revision Sheet Before Any Analytics Interview',
    summary: 'One-page refresher covering opening moves for every question type — metric design, RCA, experimentation, ambiguous problems, and business cases. Read aloud, don\'t study new content.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
  },

  // ══════════════════════════════════════════════════════════════
  // MENTAL MODELS
  // ══════════════════════════════════════════════════════════════
  {
    id: 'five-senior-habits',
    category: 'Mental Models',
    title: 'The 5 Senior Thinking Habits That Separate DS From Analytics',
    summary: 'Denominator discipline. Decompose before diagnosing. Segment before aggregating. Guardrails and counter-metrics. Business impact translation. Why these five habits compound.',
    readMin: 4,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'correlation-causation',
    category: 'Mental Models',
    title: 'Correlation, Causation, and the Analyst Who Got Them Confused',
    summary: 'The classic distinction, applied to real product analytics scenarios — where confusing the two led to bad interventions and what the right analysis would have looked like.',
    readMin: 6,
    room: 'cases',
    roomLabel: 'Cases Room',
  },
  {
    id: 'survivorship-bias',
    category: 'Mental Models',
    title: 'Survivorship Bias in Product Analytics: You\'re Only Seeing the Users Who Stayed',
    summary: 'Analyzing active users to understand engagement tells you nothing about the users who churned. How survivorship bias corrupts product decisions and how to correct for it.',
    readMin: 6,
    room: 'rca',
    roomLabel: 'RCA Room',
  },
  {
    id: 'goodharts-law',
    category: 'Mental Models',
    title: 'Goodhart\'s Law and Why Every Metric Becomes a Bad Metric When It Becomes a Target',
    summary: 'When a measure becomes a target, it ceases to be a good measure. Product analytics history is full of metrics that were gamed the moment teams were held accountable to them.',
    readMin: 6,
    room: 'metrics',
    roomLabel: 'Metrics Room',
  },
  {
    id: 'simpsons-paradox',
    category: 'Mental Models',
    title: 'Simpson\'s Paradox: When the Aggregate Points the Wrong Direction',
    summary: 'A treatment can appear to help in every subgroup while hurting in the aggregate — or vice versa. Real product examples and the segmentation habit that catches it.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
  {
    id: 'base-rate-neglect',
    category: 'Mental Models',
    title: 'Base Rate Neglect: The Mistake Behind Half of All Bad Product Decisions',
    summary: 'A 50% lift on a 0.1% base rate is not interesting. A 5% lift on a 40% base rate is. Anchoring on relative change without anchoring on the base is a systematic error.',
    readMin: 5,
    room: 'stats',
    roomLabel: 'Stats Room',
  },
];

const CATEGORY_CONFIG = {
  'Metrics':            { color: 'var(--green)',     bg: 'var(--green-bg)',    border: 'var(--green-border)',   icon: '📐' },
  'RCA':                { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',   border: 'var(--yellow-border)',  icon: '🔍' },
  'Experimentation':    { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)',  icon: '⚗' },
  'Statistics':         { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)',    icon: '📊' },
  'Ambiguous Problems': { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)',  icon: '🧩' },
  'GenAI Analytics':    { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)',    icon: '🤖' },
  'Product Sense':      { color: 'var(--blue-text)', bg: 'var(--blue-bg)',     border: 'var(--blue-border)',    icon: '💡' },
  'SQL & Data':         { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)',  icon: '🗄' },
  'Career & Interview': { color: 'var(--red)',       bg: 'var(--red-bg)',      border: 'var(--red-border)',     icon: '🎯' },
  'Mental Models':      { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)',  icon: '🧠' },
};

const CATEGORIES = Object.keys(CATEGORY_CONFIG);

export function BlogBrowser() {
  const total = POSTS.length;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--accent)', marginBottom: '0.4rem',
        }}>
          Learn
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Concepts & Frameworks
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '580px', margin: '0 0 0.9rem' }}>
          Read the framework. Then test your judgment in the practice rooms.
          Every article connects directly to a room — so you can go from concept to decision in one session.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.7rem',
            display: 'flex', alignItems: 'baseline', gap: '0.3rem',
          }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{total}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>topics planned</span>
          </div>
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.7rem',
            display: 'flex', alignItems: 'baseline', gap: '0.3rem',
          }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{CATEGORIES.length}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>categories</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
            fontSize: '0.75rem', color: 'var(--yellow)', fontWeight: 600,
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
          <div key={cat} style={{ marginBottom: '2.5rem' }}>

            {/* Category header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              marginBottom: '0.9rem', paddingBottom: '0.6rem',
              borderBottom: `1px solid var(--border-subtle)`,
            }}>
              <span style={{ fontSize: '1rem' }}>{cfg.icon}</span>
              <span style={{
                fontSize: '0.88rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em',
              }}>{cat}</span>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
                borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.45rem',
              }}>{posts.length} articles</span>
            </div>

            {/* Cards grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '0.75rem',
            }}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} cfg={cfg} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PostCard({ post, cfg }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.1rem 1.2rem',
      display: 'flex', flexDirection: 'column', gap: '0.45rem',
      opacity: 0.85,
    }}>
      {/* Badges */}
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
        <span style={{
          fontSize: '0.56rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
          color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
        }}>Coming Soon</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '0.9rem', fontWeight: 800, color: 'var(--text)',
        margin: 0, letterSpacing: '-0.01em', lineHeight: 1.35,
      }}>
        {post.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontSize: '0.79rem', color: 'var(--text-secondary)',
        margin: 0, lineHeight: 1.55, flex: 1,
      }}>
        {post.summary}
      </p>

      {/* Room CTA */}
      <div style={{
        paddingTop: '0.45rem', marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.71rem', color: 'var(--text-dim)',
      }}>
        Practice in → <span style={{ color: cfg.color, fontWeight: 600 }}>{post.roomLabel}</span>
      </div>
    </div>
  );
}
