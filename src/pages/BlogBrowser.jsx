// Blog / Learn layer
// Full topic population — 12 posts have full content, rest are stubs
// Each post maps to a room with a "Practice this now →" CTA

import { useState } from 'react';

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
    content: [
      { type: 'text', text: 'Every rate metric has a numerator and a denominator. Most analysts obsess over the numerator — purchases, clicks, sign-ups — and treat the denominator as obvious. It isn\'t. The denominator is a choice, and that choice changes what the metric measures, who it indicts, and what action it implies. Getting it wrong doesn\'t just produce a wrong number; it produces a wrong story.' },
      { type: 'heading', text: 'Three Denominators, Three Different Metrics' },
      { type: 'text', text: 'Consider conversion rate for an e-commerce product page. You could compute it three ways: purchases divided by sessions, purchases divided by unique users, or purchases divided by product detail page (PDP) viewers. These are not interchangeable. Session-level CVR penalizes products with high browse-to-return behavior — a user who comes back four times before buying counts as four non-converting sessions plus one converting session, yielding a 20% rate. User-level CVR would give that same user a 100% rate. PDP-viewer CVR isolates purchase intent — it only includes users who actually looked at the product, stripping out people who never saw it.' },
      { type: 'example', label: 'Worked example', text: 'Baseline: 10,000 sessions, 6,000 unique users, 4,000 PDP viewers, 400 purchases.\n\nSession CVR = 400 / 10,000 = 4.0%\nUser CVR = 400 / 6,000 = 6.7%\nPDP Viewer CVR = 400 / 4,000 = 10.0%\n\nSame 400 purchases. Three completely different stories. A PM looking at PDP Viewer CVR thinks the product is converting well. A PM looking at Session CVR thinks there\'s a major funnel problem.' },
      { type: 'heading', text: 'How Denominator Choice Changes the Story' },
      { type: 'text', text: 'Imagine you ship a new recommendation carousel on the homepage. After the launch, session CVR drops 0.3%. Your PM is alarmed. But when you look at PDP viewer CVR — which strips out the incremental browse sessions the carousel generated — it\'s up 1.2%. What happened? The carousel brought in more exploratory traffic. Those sessions browse without buying, diluting session CVR. But the users who did reach a PDP converted at a higher rate, probably because the carousel surfaced better product matches. Session CVR made a win look like a loss.' },
      { type: 'text', text: 'This isn\'t a cherry-picking problem — it\'s a specification problem. The right denominator depends on what decision you\'re informing. If you\'re measuring checkout flow efficiency, use users who entered checkout. If you\'re measuring the effectiveness of product discovery, use users who saw at least one product. If you\'re measuring top-of-funnel health, sessions or visits might be appropriate. The question to ask is: what\'s the population for whom the event was possible?' },
      { type: 'heading', text: 'The Denominator Ownership Habit' },
      { type: 'text', text: 'Senior analysts lock the denominator before they compute anything. In an interview, this sounds like: "Before I give you the conversion rate, I want to clarify the denominator. Are we measuring CVR among all sessions, unique users, or users who reached the product page? Each tells a different story — let me explain why." That sentence alone signals metric maturity. It shows you know that numbers without specifications are ambiguous, and that ambiguity is where bad decisions live.' },
      { type: 'callout', label: 'The rule', text: 'Before computing any rate metric, state the denominator explicitly. Ask: for whom was the event in the numerator actually possible? That\'s your denominator. Everything else is a measurement of something different.' },
      { type: 'text', text: 'The most common mistake is defaulting to sessions because sessions are easy to count. Sessions are available in almost every analytics tool, they\'re high-volume, and they feel objective. But sessions are a behavioral artifact — they depend on how your tracking fires, what counts as a session boundary, and how often your users return. For most product questions, users or a specific funnel entry point is the right denominator. When you find yourself reaching for sessions, pause and ask whether that\'s actually what the question requires.' },
      { type: 'list', items: [
        'State the denominator before computing any rate. "CVR among users who viewed at least one product page."',
        'Check whether the denominator changed between periods before attributing a rate movement to the numerator.',
        'When a metric moves, decompose numerator and denominator separately — the movement might be entirely in the denominator.',
        'In interviews, always clarify denominator choice before answering. It demonstrates precision before you\'ve produced any analysis.',
      ]},
      { type: 'cta', room: 'metrics', label: 'Practice denominator decisions in the Metrics Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Every metric that becomes a target eventually gets gamed. This isn\'t a cynical observation — it\'s Goodhart\'s Law in action, and it applies as reliably in product analytics as anywhere else. The question isn\'t whether your north star metric can be gamed. It can. The question is whether you\'ve named the failure mode before your stakeholders discover it, and whether you\'ve built the guardrail that catches it.' },
      { type: 'heading', text: 'The Gaming Test' },
      { type: 'text', text: 'For any north star metric, ask: "What is the cheapest action that would raise this metric without improving the underlying business outcome?" The answer is your primary gaming risk. If your north star is Daily Active Users, the cheapest action is usually aggressive push notification campaigns. You can flood users with badges, reminders, and alerts, and DAU will climb — because opening a push notification counts as a session. The business outcome you care about (people getting value from the product) doesn\'t move. But DAU does, and your dashboard looks good.' },
      { type: 'example', label: 'DAU gaming via push spam', text: 'Scenario: A social app uses DAU as its north star.\n\nBefore push campaign: DAU = 2.1M, D7 retention = 34%, push opt-out rate = 8%\nAfter aggressive push campaign: DAU = 2.4M (+14%), D7 retention = 29% (-15%), push opt-out rate = 19% (+138%)\n\nDAU looks like a win. Retention and opt-out tell you the product experience is degrading. Without the guardrails, the team ships more push campaigns.' },
      { type: 'heading', text: 'Designing the Guardrail Before You Launch' },
      { type: 'text', text: 'The right time to design the guardrail is when you choose the north star — not after you see the first gaming attempt. For DAU, the obvious guardrails are retention (D7 or D30) and notification opt-out rate. If DAU goes up but D7 retention goes down, you haven\'t grown — you\'ve borrowed engagement from the future. If opt-out rate rises, you\'re burning the channel that created the DAU lift.' },
      { type: 'text', text: 'The guardrail framework has three components: the north star (the thing you\'re trying to move), the failure mode (the gaming vector), and the guardrail metric (what you monitor to catch gaming). Write all three before the metric goes into production. This forces you to think about what you\'re not measuring and what the metric can\'t see.' },
      { type: 'callout', label: 'The framework', text: 'North star → name the gaming vector → define the guardrail.\n\nDAU → gaming vector: push spam → guardrail: D7 retention + opt-out rate\nGMV → gaming vector: low-quality supply flooding → guardrail: cancellation rate + refund rate\nMessages sent → gaming vector: bot/spam activity → guardrail: reply rate + block rate' },
      { type: 'heading', text: 'Multiple Gaming Vectors' },
      { type: 'text', text: 'Complex north stars have multiple gaming vectors. GMV (gross merchandise value) can be inflated by adding low-quality supply that drives transactions that don\'t complete, by running promotional subsidies that make transactions happen at negative margin, or by allowing fraudulent orders. Each gaming vector needs its own guardrail. The skill is being comprehensive enough to catch the real risks without adding so many guardrails that your experiment readouts become unreadable.' },
      { type: 'text', text: 'In practice, two to three guardrail metrics per north star is the right range. More than that creates metric overload — you\'ll have contradictory signals and no framework for resolving them. Fewer than two and you\'ve probably missed a real gaming vector. The guardrails should be chosen to catch the most likely and highest-impact gaming risks, not to be exhaustive.' },
      { type: 'list', items: [
        'Name the north star\'s failure mode before it launches. What\'s the cheapest action that raises it without improving outcomes?',
        'Design guardrails that directly measure what the north star can\'t see.',
        'Pre-commit to a guardrail threshold: if X drops below Y while north star rises, the result is not a win.',
        'Review gaming risks quarterly — new product surfaces create new gaming vectors.',
      ]},
      { type: 'cta', room: 'metrics', label: 'Practice metric design in the Metrics Room →' },
    ],
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
    content: [
      { type: 'text', text: 'A metric tree is the single most useful diagnostic tool in product analytics. When a north star metric moves, a metric tree tells you which branch broke. When you\'re sizing an opportunity, it tells you which lever has the most room to move. When you\'re explaining a trend to a PM, it gives you a shared structure for the conversation. The problem is that most analysts build metric trees wrong — they make them too flat, or they mix additive and multiplicative relationships, or they stop one level too early.' },
      { type: 'heading', text: 'The Revenue Tree' },
      { type: 'text', text: 'Revenue is the most common north star for product analytics teams, so it\'s the best tree to learn. Revenue decomposes multiplicatively into: Revenue = Sessions × Session-to-PDP CVR × PDP-to-Checkout CVR × Checkout-to-Purchase CVR × Average Order Value. Each of these factors can then decompose further. Session volume breaks into new user sessions and returning user sessions. AOV breaks into items per order multiplied by average item price. You can extend this as deep as you need.' },
      { type: 'example', label: 'Finding the broken branch', text: 'Revenue is down 12% week-over-week. You build the tree:\n\nSessions: flat (+0.3%)\nSession-to-PDP CVR: flat (-0.5%, within noise)\nPDP-to-Checkout CVR: flat (-0.8%, within noise)\nCheckout-to-Purchase CVR: DOWN 18%\nAOV: slightly up (+2.1%)\n\nThe broken branch is Checkout CVR. Revenue is down not because fewer people are discovering products or adding to cart — it\'s because people are abandoning checkout at a much higher rate. The investigation narrows immediately: look at checkout flow changes, payment failures, shipping cost display, promo code errors.' },
      { type: 'heading', text: 'Additive vs Multiplicative Trees' },
      { type: 'text', text: 'Revenue trees are multiplicative — every level multiplies into the next. But some north stars decompose additively. Total messages sent = messages from power users + messages from casual users + messages from new users. Each segment contributes independently. When you mix additive and multiplicative relationships in the same tree, your math breaks down. Before building any tree, decide which type you\'re dealing with: is the north star a product of its drivers, or a sum?' },
      { type: 'text', text: 'The test is simple: if you multiply all the branches together, do you get the north star? If yes, it\'s multiplicative. If you add the branches together and get the north star, it\'s additive. Most funnel metrics (CVR, retention rates, completion rates) are multiplicative. Most volume metrics (total events, total users, total revenue by segment) are additive.' },
      { type: 'heading', text: 'How Deep to Go' },
      { type: 'text', text: 'The right depth is one level beyond where you have data and one level short of where the drivers become unactionable. A good rule: build the tree to four levels for RCA purposes, and to two levels for stakeholder communication. The full four-level tree is your diagnostic instrument. The two-level summary — "Revenue = Sessions × Funnel CVR × AOV, and the issue is in Funnel CVR" — is how you explain the finding.' },
      { type: 'callout', label: 'The process', text: '1. Write the north star at the top.\n2. Ask: does it decompose as a product or a sum?\n3. Write the level-1 drivers — the 2-4 factors that mathematically produce the north star.\n4. Extend to level 2 for each driver where you have data.\n5. When a north star metric moves, traverse the tree level by level, checking each branch for the movement. Stop at the branch that explains the full move.' },
      { type: 'list', items: [
        'Build the tree before a crisis hits — you don\'t want to be constructing it mid-incident.',
        'Validate the math: branches should multiply or add to the node above them.',
        'Keep the tree as a team artifact. Shared trees mean shared diagnosis vocabulary.',
        'When presenting RCA findings, show the tree with the broken branch highlighted.',
      ]},
      { type: 'cta', room: 'metrics', label: 'Practice metric trees in the Metrics Room →' },
    ],
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
    content: [
      { type: 'text', text: 'The single most common mistake in root cause analysis — in interviews and in real work — is jumping to hypotheses before decomposing the metric. Someone tells you "checkout completion rate dropped 15%" and immediately you hear: "probably a bug in the payment flow," "maybe a mobile UI issue," "could be a promo code problem." These might all be valid hypotheses. But you don\'t know which to investigate first, whether the metric moved for structural reasons unrelated to any of them, or whether your hypotheses are even in the right ballpark — because you haven\'t looked at the data yet.' },
      { type: 'heading', text: 'Why Decomposition Comes First' },
      { type: 'text', text: 'Decomposition answers a question that hypotheses can\'t: is the metric movement in the numerator, the denominator, or both? This distinction matters enormously. If checkout completion rate dropped because checkout attempts increased (denominator) while completions held flat, the problem isn\'t in the checkout flow — it\'s in whatever is driving more low-intent users into checkout. If completions dropped while attempts held flat, then yes, the checkout flow is the right place to look. Hypotheses about payment bugs and UI issues only apply to the second case. Generating them before decomposing wastes investigation time on the wrong branch.' },
      { type: 'example', label: 'Checkout drop: decompose first', text: 'Alert: Checkout completion rate dropped from 72% to 61% (-15%).\n\nDecompose before hypothesizing:\n- Checkout attempts (denominator): 14,200 → 15,800 (+11%)\n- Completed checkouts (numerator): 10,224 → 9,638 (-5.7%)\n\nThe rate dropped because BOTH the numerator fell AND the denominator rose. This isn\'t one problem — it\'s two. Completions are slightly down (investigate checkout flow), but attempts are way up (investigate what drove more users to checkout — a campaign? a landing page change? a navigation change?).\n\nHypothesizing about payment bugs before decomposing would have missed the denominator story entirely.' },
      { type: 'heading', text: 'The Decomposition Discipline' },
      { type: 'text', text: 'For any rate metric (CVR, completion rate, click-through rate, retention), the first move is always to separate numerator from denominator and check each independently. This takes 60 seconds in most analytics tools and eliminates half of all RCA rabbit holes before they start. It\'s the equivalent of checking whether the patient has a pulse before diagnosing the specific illness.' },
      { type: 'text', text: 'For volume metrics (total purchases, total sessions, total messages), the decomposition is different: break the total into its constituent parts. Total purchases = mobile purchases + desktop purchases. Is the drop in both platforms, or concentrated in one? Total sessions = new user sessions + returning user sessions. Did new acquisition dry up, or did returning users stop coming back? Decomposing by additive component tells you the scope and likely source of the problem before you generate a single hypothesis.' },
      { type: 'callout', label: 'The order that works', text: '1. Get context: what exactly moved, when did it start, what changed recently?\n2. Decompose: numerator vs denominator (for rate metrics), or by additive component (for volume metrics).\n3. Segment: platform, device, geography, user cohort, new vs returning.\n4. Only then: hypothesize based on what decomposition and segmentation revealed.\n5. Validate: pick the highest-probability hypothesis and identify the data that would confirm or rule it out.' },
      { type: 'heading', text: 'The Interview Implication' },
      { type: 'text', text: 'In an interview, when you hear "metric X dropped Y%," the panel is watching to see whether you decompose before diagnosing. If you immediately say "here are five hypotheses," you\'ve skipped the most important step. Instead, say: "Before I generate hypotheses, I want to decompose the metric to understand where the movement is. For a rate metric like this, I want to check the numerator and denominator separately, because a drop in the rate could come from a numerator problem, a denominator problem, or both — and those have different root causes." That sentence alone demonstrates more analytical maturity than a list of five hypotheses.' },
      { type: 'list', items: [
        'For rate metrics: check numerator and denominator independently before generating any hypotheses.',
        'For volume metrics: decompose into additive components (platform, user type, product category) before explaining the aggregate.',
        'The decomposition tells you which hypotheses are plausible. Generate hypotheses after you see the decomposition, not before.',
        'In interviews: explicitly narrate the decomposition step. The panel rewards the process, not just the answer.',
      ]},
      { type: 'cta', room: 'rca', label: 'Practice RCA decomposition in the RCA Room →' },
    ],
  },
  {
    id: 'segment-before-aggregate',
    category: 'RCA',
    title: 'The Aggregate Is Always Hiding Something',
    summary: 'A flat aggregate is a weighted average of segment movements. Platform, cohort, and time-pattern cuts first — every time. Here\'s the sequence that works.',
    readMin: 6,
    room: 'rca',
    roomLabel: 'RCA Room',
    content: [
      { type: 'text', text: 'An aggregate metric is a weighted average of its underlying segments. When the aggregate holds flat, that\'s not the same as nothing happening — it often means two things are moving in opposite directions and canceling each other out. When the aggregate drops, it might be driven by one small segment while everything else holds steady. The aggregate hides this structure. Segmentation reveals it.' },
      { type: 'heading', text: 'The Flat Aggregate Trap' },
      { type: 'text', text: 'Suppose overall 7-day retention is flat at 32% week over week. You might conclude there\'s no retention problem. But cut it by platform: iOS retention is up from 34% to 38%, and Android retention is down from 30% to 22%. The aggregate is flat because the iOS improvement is masking a major Android regression. Without the segment cut, you\'d have missed an active fire.' },
      { type: 'example', label: 'Simpson\'s paradox in practice', text: 'Overall CVR: Week 1 = 4.2%, Week 2 = 4.1% (looks flat)\n\nCut by user type:\n- New users: Week 1 = 2.1%, Week 2 = 3.4% (improving)\n- Returning users: Week 1 = 6.8%, Week 2 = 5.2% (declining)\n\nThe aggregate is flat because mix shifted: more new users this week (who convert at lower rates) offset improving new-user CVR, while returning-user CVR quietly collapsed. Investigating the aggregate "flat" metric would miss both stories. Segmentation reveals two separate problems requiring different investigations.' },
      { type: 'heading', text: 'The Segmentation Sequence' },
      { type: 'text', text: 'There is a sequence to segmentation that maximizes signal per query. Start with the cuts most likely to reveal structural differences: platform (iOS vs Android vs web), user type (new vs returning), geography (if your product has regional variation), and device type. These cuts cost almost nothing to run and often isolate the problem immediately. After these structural cuts, move to behavioral cuts: power users vs casual users, users who completed onboarding vs those who didn\'t, users in a specific feature cohort.' },
      { type: 'text', text: 'The worst segmentation strategy is random — cutting by every dimension until something looks significant. This produces false positives and wastes time. The best strategy is hypothesis-driven: you decompose first (numerator vs denominator), then segment along the dimensions most likely to explain the decomposition result. If checkout attempts spiked, segment by traffic source — was it a specific campaign that drove low-intent users? If completions dropped, segment by device — is this a mobile rendering bug?' },
      { type: 'heading', text: 'Simpson\'s Paradox' },
      { type: 'text', text: 'Simpson\'s paradox is the formal name for the phenomenon where a trend that appears in every subgroup disappears or reverses in the aggregate. It arises when segment sizes change at the same time the segment rates change. In product analytics, it appears most often in A/B test results (treatment appears worse in aggregate but better in every segment, because control had more of the high-converting segment), in retention analysis (product appears to be retaining users better, but actually composition shifted toward users with higher baseline retention), and in cohort comparisons (new cohorts appear weaker, but they\'re just newer).' },
      { type: 'callout', label: 'The segmentation checklist', text: 'Before concluding anything from an aggregate metric:\n1. Platform cut: iOS / Android / web\n2. User type cut: new / returning / power\n3. Geography cut (if relevant to your product)\n4. Time pattern cut: day of week, hour of day, before/after deployment\n5. Cohort cut: acquisition week or month\n\nIf the aggregate moves but no segment shows a proportional move, you have a mix shift — not a behavior change.' },
      { type: 'list', items: [
        'Never conclude from an aggregate without at least two segment cuts.',
        'A flat aggregate is not a clean bill of health. Check for opposing segment movements.',
        'When one segment explains the full aggregate movement, the other segments are your control.',
        'For A/B test readouts, always segment by user type before reporting the headline number.',
      ]},
      { type: 'cta', room: 'rca', label: 'Practice segmentation in the RCA Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Sample Ratio Mismatch (SRM) is one of the most important concepts in experimentation, and one of the most commonly skipped in practice. SRM occurs when the ratio of users assigned to your experiment\'s treatment and control groups doesn\'t match the intended allocation. If you set up a 50/50 split but end up with 48.2% in control and 51.8% in treatment, that\'s SRM. It sounds like a small discrepancy. It isn\'t. An experiment with SRM is not a valid experiment — and any results you compute from it are unreliable.' },
      { type: 'heading', text: 'Why SRM Invalidates an Experiment' },
      { type: 'text', text: 'The reason SRM is so damaging is that it almost always indicates a systematic difference between your groups — not just a random sampling fluctuation. If the assignment mechanism worked correctly and the only randomness was in which users got treatment vs control, you\'d expect the groups to be very close to the intended ratio, with deviations explained by chance alone. When you see a persistent imbalance, it usually means the assignment mechanism itself is biased, and the groups differ not just in which variant they saw but in who they are.' },
      { type: 'example', label: 'Detecting SRM with a chi-squared test', text: 'Experiment: 50/50 split, ran for 7 days\nIntended: 50,000 control / 50,000 treatment\nActual: 48,200 control / 51,800 treatment\n\nChi-squared test:\n- Expected: 50,000 / 50,000\n- Observed: 48,200 / 51,800\n- Chi-squared statistic: 128.8\n- p-value: 0.0000000001 (effectively 0)\n\nThis is a massive SRM. The probability of seeing this imbalance by chance, if assignment was unbiased, is essentially zero. The experiment assignment is broken.' },
      { type: 'heading', text: 'The 4 Most Common Causes of SRM' },
      { type: 'text', text: 'The first and most common cause is client-side logging errors. If your assignment happens on the server but your logging happens on the client, any logging failures (crashes, network errors, slow load times) will disproportionately affect one group if they\'re experiencing different performance. Typically the treatment group, which may be slower to load, will show lower logging rates, creating an apparent imbalance.' },
      { type: 'text', text: 'The second cause is bot traffic filtering applied inconsistently. If bots are filtered out of your analysis but the filter is applied at different stages of the pipeline for treatment vs control, the final group sizes will be imbalanced. Third: redirects and caching. If the treatment involves a redirect and your assignment is cached, some users who should be in treatment will get stuck in a cached version of control, skewing the ratio. Fourth: assignment logic bugs, where the hash function used to assign users to groups has uneven distribution for certain user ID ranges.' },
      { type: 'callout', label: 'The SRM check is non-negotiable', text: 'Run the chi-squared test on group sizes before looking at any metric results. If the p-value for the ratio test is below 0.01, stop the analysis. Investigate the assignment mechanism. Fix it. Re-run the experiment if needed. There is no statistical correction that makes an SRM experiment valid — the groups are not comparable, period.' },
      { type: 'heading', text: 'What to Do When You Find SRM' },
      { type: 'text', text: 'First, don\'t ship. Second, investigate the assignment pipeline systematically: check logging rates by group, check whether any users experienced errors at a different rate in treatment vs control, check whether any filtering was applied asymmetrically. If you can identify the cause and it\'s restricted to a specific sub-population, you may be able to exclude that population and re-run the analysis — but only if the exclusion is principled and pre-registered. More often, the right answer is to fix the pipeline and re-run the experiment from scratch.' },
      { type: 'list', items: [
        'Run a chi-squared test on group sizes as the very first step of any experiment readout.',
        'If p < 0.01 for the ratio test, the experiment has SRM — stop the analysis.',
        'SRM almost always indicates a systematic bias in assignment, not random fluctuation.',
        'No metric result from an SRM experiment is trustworthy. Don\'t ship, don\'t use the data.',
      ]},
      { type: 'cta', room: 'review', label: 'Practice experiment review in the Review Room →' },
    ],
  },
  {
    id: 'p-values',
    category: 'Experimentation',
    title: 'p-values Don\'t Mean What You Think They Mean',
    summary: 'p < 0.05 does not mean 95% chance the treatment works. Understanding what it actually says — and what it doesn\'t — changes every experiment readout you\'ll ever do.',
    readMin: 4,
    room: 'stats',
    roomLabel: 'Stats Room',
    content: [
      { type: 'text', text: 'The p-value is the most misunderstood number in product analytics. It\'s reported in almost every experiment readout, cited in almost every ship/no-ship decision, and understood correctly by a surprisingly small fraction of the people who use it. The misconceptions aren\'t subtle: they lead directly to wrong ship decisions, overconfident product teams, and analyses that report statistical significance as if it were proof that something works. Getting this right changes how you read every experiment you\'ll ever run.' },
      { type: 'heading', text: 'What a p-value Actually Means' },
      { type: 'text', text: 'A p-value is the probability of observing your data — or data more extreme — if the null hypothesis were true. The null hypothesis is usually "the treatment has no effect." So a p-value of 0.03 means: if the treatment had no effect, we would see a result at least this large by random chance only 3% of the time. That\'s it. That\'s the whole definition. It says nothing about the probability that the treatment works. It says nothing about effect size. It says nothing about practical importance.' },
      { type: 'example', label: 'The correct and incorrect readings', text: 'Experiment result: p = 0.03, treatment CVR = 4.21%, control CVR = 4.08%\n\nINCORRECT: "We\'re 97% confident the treatment works."\nINCORRECT: "There\'s a 3% chance this result is due to noise."\nINCORRECT: "The treatment has a 97% chance of being the right decision to ship."\n\nCORRECT: "If the treatment had no effect, we\'d observe a difference this large or larger about 3% of the time by random chance alone. Given our pre-set alpha of 0.05, this clears the significance threshold — but we should also look at the effect size and confidence interval before deciding to ship."' },
      { type: 'heading', text: 'The Null Hypothesis Framework' },
      { type: 'text', text: 'To interpret a p-value correctly, you need to hold the null hypothesis clearly in mind. The null is the baseline claim — the world where your treatment does nothing. When you run a test with alpha = 0.05, you\'re saying: "I will reject the null hypothesis (and call this result significant) if I see data that would occur less than 5% of the time under the null." When you get p = 0.03, you\'re not proving the treatment works — you\'re saying the data is inconsistent enough with the null to make you doubt it, at your chosen threshold.' },
      { type: 'text', text: 'This framing matters because it clarifies what p-values don\'t do. They don\'t tell you the effect size is practically meaningful. They don\'t tell you the result will replicate. They don\'t account for multiple testing. A p-value of 0.049 on a 0.01% CVR lift is statistically significant and practically worthless. A p-value of 0.06 on a 2% CVR lift is technically not significant but probably worth investigating further. The number alone doesn\'t tell you what to do.' },
      { type: 'heading', text: 'What to Report Alongside p-values' },
      { type: 'text', text: 'A rigorous experiment readout reports the p-value in context: alongside the effect size (how large is the observed difference?), the confidence interval (what range of effect sizes are consistent with the data?), and the practical significance threshold (what lift would actually matter for the business?). "p = 0.03, effect size = 0.13% CVR lift, 95% CI: [0.02%, 0.24%]" is a complete statement. "p = 0.03, we should ship" is not.' },
      { type: 'callout', label: 'The correct p-value sentence', text: '"A p-value of X means: if the treatment truly had no effect, we would see a result this extreme or more extreme only X% of the time by chance. It does not tell us the probability that the treatment works — that requires additional reasoning about effect size, confidence intervals, and prior probability."' },
      { type: 'list', items: [
        'p-value = probability of data this extreme under the null, not probability the treatment works.',
        'Statistical significance and practical significance are different. Check both.',
        'Report p alongside effect size and confidence interval — the number alone is incomplete.',
        'Pre-commit your alpha threshold before running the experiment. Choosing alpha after seeing results is p-hacking.',
      ]},
      { type: 'cta', room: 'stats', label: 'Practice stats interpretation in the Stats Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Statistical power is the probability that your experiment will detect a real effect if one exists. An underpowered experiment — one with insufficient sample size — will fail to detect small real effects and produce a null result, which teams routinely misinterpret as "the treatment doesn\'t work." In reality it means "the experiment wasn\'t designed to find an effect this small." The failure to ship something that actually works is a real business cost, and it happens silently. Nobody raises the alarm when you call something a null.' },
      { type: 'heading', text: 'The Power / MDE / N Triangle' },
      { type: 'text', text: 'Three quantities determine whether an experiment is valid: power (usually 80%), minimum detectable effect (MDE — the smallest lift you want to be able to detect), and sample size N. These three are locked together. If you fix power and MDE, you get a required N. If you fix power and N, you get the MDE your experiment can detect. If you fix N and MDE, you get the power. Most teams only talk about one of these — usually whether the test is "significant" — without thinking about the other two.' },
      { type: 'example', label: 'Calculating required sample size', text: 'Scenario: You want to detect a 1% relative lift in checkout CVR.\n\nBaseline CVR: 8.0%\nAbsolute lift to detect: 0.08 percentage points (1% of 8%)\nDesired power: 80%\nAlpha: 0.05 (two-tailed)\n\nApproximate formula: n = 16σ² / δ²\nwhere σ² = p(1-p) = 0.08 × 0.92 = 0.0736, δ = 0.0008\n\nn = 16 × 0.0736 / (0.0008²) = 1.178 / 0.00000064 ≈ 1,840,000 per group\n\nTo detect a 1% relative CVR lift at 80% power, you need roughly 1.84M users per group, or about 3.7M total. If your checkout sees 50,000 users/day, that\'s 74 days per group — impractical for most teams.' },
      { type: 'heading', text: 'Why Most Tests Are Underpowered' },
      { type: 'text', text: 'The most common reason tests are underpowered is that teams pick a runtime based on convenience (two weeks) rather than the power calculation. Two weeks of traffic gives you a fixed N. That N might be enough to detect a 5% relative lift. It almost certainly isn\'t enough to detect a 0.5% lift. When the two-week test comes back null, the team concludes the feature doesn\'t work — but all the data shows is that the feature doesn\'t produce a very large effect. A smaller, real effect could easily be hiding beneath the noise floor.' },
      { type: 'text', text: 'The solution is to run the power calculation before the experiment starts and set runtime accordingly. If the required runtime is impractical, you have three options: accept a larger MDE (you can only detect bigger effects), increase the allocation to treatment (more users per day), or use variance reduction techniques like CUPED to lower the required N.' },
      { type: 'callout', label: 'Before any experiment', text: 'Answer these three questions before you start:\n1. What is the smallest lift that would be meaningful for this product decision? (Your MDE)\n2. What is your baseline metric value and variance?\n3. Given 80% power and your MDE, how many users do you need per group?\n\nIf your projected traffic doesn\'t reach that N within a reasonable timeframe, either the experiment is impractical at this lift threshold or you need to reduce variance.' },
      { type: 'heading', text: 'Reading Null Results Carefully' },
      { type: 'text', text: 'When an experiment comes back null, always check the power calculation before concluding the feature has no effect. Report it as: "We did not detect a statistically significant effect. Given our sample size of N, we had 80% power to detect an effect of X or larger. Effects smaller than X remain possible." This is the honest interpretation. It distinguishes "we ruled out effects larger than X" from "there is no effect." The former is often useful. The latter is rarely true.' },
      { type: 'list', items: [
        'Run a power calculation before every experiment. Don\'t pick runtime by convenience.',
        'An 80% power threshold means 20% of real effects will be missed — factor this into decisions.',
        'When you see a null result, check: what was the MDE? Could a smaller real effect be hiding?',
        'If required N is too large to reach, consider whether the experiment is worth running at all.',
      ]},
      { type: 'cta', room: 'stats', label: 'Practice power calculations in the Stats Room →' },
    ],
  },
  {
    id: 'novelty-effect',
    category: 'Experimentation',
    title: 'Novelty Effect: The Trap That Fools Every Junior Analyst',
    summary: 'Users engage with new things because they\'re new — not because they\'re better. Early experiment results are systematically biased upward. Here\'s how to account for it.',
    readMin: 6,
    room: 'review',
    roomLabel: 'Review Room',
    content: [
      { type: 'text', text: 'The novelty effect is one of the most reliable threats to experiment validity in product analytics, and one of the least discussed. When you ship a new UI, a new feature, or a new interaction pattern, a subset of users will engage with it simply because it\'s new. Curiosity-driven engagement is real, but it isn\'t sustainable. It inflates your treatment metrics in the first days of the experiment and creates a false impression of a larger lift than the feature will sustain in production.' },
      { type: 'heading', text: 'What the Novelty Effect Looks Like in Data' },
      { type: 'text', text: 'The signature of the novelty effect is week-over-week decay in the treatment group\'s relative lift. In week one, treatment might show a 12% higher engagement rate. In week two, it\'s 8%. In week three, 5%. The effect is real but shrinking as users habituate to the new experience. If you stop the experiment after week one and declare a 12% win, you\'ll ship a feature that delivers 5% in production — and your credibility will take a hit when the post-launch metrics don\'t match the experiment projection.' },
      { type: 'example', label: 'Novelty effect decay pattern', text: 'New feed ranking algorithm experiment:\n\nWeek 1: treatment engagement +15% vs control (p < 0.001)\nWeek 2: treatment engagement +9% vs control (p = 0.002)\nWeek 3: treatment engagement +6% vs control (p = 0.03)\nWeek 4: treatment engagement +5% vs control (p = 0.04)\n\nThe effect stabilizes around +5%. This is the true sustained lift. If you shipped on week 1 data, you\'d have projected +15% and delivered +5%. The team would investigate why "the experiment result didn\'t hold."' },
      { type: 'heading', text: 'Detecting and Accounting for Novelty Effect' },
      { type: 'text', text: 'The cleanest detection method is to plot the metric movement by week or by cohort of exposure. If the lift is decaying systematically, you\'re looking at a novelty effect. A genuine behavioral improvement tends to hold or improve over time as users build new habits. A novelty effect starts high and trends down toward a lower stable level.' },
      { type: 'text', text: 'The right response is to extend the experiment runtime until the lift stabilizes — typically three to four weeks for UI changes. Report the stabilized lift, not the first-week peak. If your experiment platform allows it, compute the lift separately for users in their first week of exposure vs users in their second week or later. The second-week-and-later cohort gives you a better estimate of the sustained effect.' },
      { type: 'heading', text: 'When to Worry Most' },
      { type: 'text', text: 'Novelty effect is most pronounced for UI changes, new content formats, redesigned navigation, and new notification types. It\'s less common for infrastructure changes (latency improvements, backend changes) and for changes that users don\'t consciously notice. The test: did users see something different? If yes, check for novelty effect. If the change is invisible to the user, the novelty concern is lower.' },
      { type: 'callout', label: 'The novelty effect checklist', text: 'Before reading out a positive experiment result on a UI change:\n1. Plot the week-over-week lift trend. Is it decaying?\n2. If the experiment ran less than 3 weeks, flag the novelty effect risk explicitly.\n3. Compare the lift in week 1 vs weeks 3-4. Use the stable period as your estimate.\n4. If you must ship on early data (business pressure), state the confidence range and set a post-launch monitoring period.' },
      { type: 'list', items: [
        'UI changes have strong novelty effects. Always run for at least 3 weeks before reading out.',
        'Plot the weekly lift trend. Decaying lift = novelty effect. Stable or growing lift = real effect.',
        'Report the stabilized lift, not the peak. Your post-launch metrics will match the stable number.',
        'In interviews, calling out novelty effect is a signal of experimentation maturity.',
      ]},
      { type: 'cta', room: 'review', label: 'Practice experiment review in the Review Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Peeking is one of the most widespread sources of false positives in product experimentation. It happens when analysts or stakeholders look at experiment results before the pre-committed runtime is complete, see a significant result, and make a ship decision — or when they check repeatedly and stop the experiment at the first moment it crosses significance. Both behaviors inflate your false positive rate beyond your stated alpha, and the inflation compounds with the number of looks.' },
      { type: 'heading', text: 'How Peeking Inflates False Positives' },
      { type: 'text', text: 'The p < 0.05 threshold assumes you look at the data exactly once, after collecting the pre-planned sample. When you look at the data multiple times and stop whenever it crosses significance, you\'re not running one test at 5% false positive rate — you\'re running multiple tests, each with an independent chance of producing a spurious significant result. The false positive rate accumulates.' },
      { type: 'example', label: 'How false positive rate compounds', text: 'Null experiment (treatment truly has no effect). Alpha = 0.05.\n\nLooks at data: 1 → False positive rate: 5.0%\nLooks at data: 2 → False positive rate: 8.3%\nLooks at data: 3 → False positive rate: 10.7%\nLooks at data: 5 → False positive rate: 14.2%\nLooks at data: 10 → False positive rate: 19.3%\n\nIf you check your experiment every day for two weeks and stop when it\'s significant, your actual false positive rate is not 5% — it\'s closer to 20%. One in five experiments you "win" will be noise.' },
      { type: 'heading', text: 'Pre-Committing Your Stopping Rule' },
      { type: 'text', text: 'The solution is a pre-committed stopping rule: decide before the experiment starts when you will read the results. This is usually a fixed runtime (run for N days) or a fixed sample size (stop when N users per group have been exposed). Whatever the rule is, write it down. The moment you deviate from it — stopping early because "the results look great" — you\'ve introduced peeking bias.' },
      { type: 'text', text: 'The pre-committed rule should also specify the primary metric, the alpha threshold, and whether the test is one-tailed or two-tailed. These decisions need to be made before you see data. Making them after looking at preliminary results turns data-driven experimentation into post-hoc rationalization, even if each individual decision seems reasonable.' },
      { type: 'heading', text: 'Sequential Testing as the Legitimate Alternative' },
      { type: 'text', text: 'If you need to peek — because a safety guardrail might be moving, or because there\'s genuine business urgency — sequential testing methods (like the Sequential Probability Ratio Test or always-valid p-values) are designed to allow multiple looks while controlling the overall false positive rate. These methods adjust the significance threshold dynamically so that you can stop early with statistical validity. They\'re not free — they require larger sample sizes than fixed-horizon tests — but they\'re honest.' },
      { type: 'callout', label: 'The stopping rule template', text: 'Write this before every experiment:\n"This experiment will run until [date] or until [N users per group] have been exposed, whichever comes first. Results will be read at that time. No interim reads will be used to make ship decisions. The primary metric is [X]. We will reject the null at alpha = 0.05 (two-tailed). If we need to check for safety guardrail violations mid-run, we will use a Bonferroni-corrected threshold."' },
      { type: 'list', items: [
        'Pre-commit your stopping rule before the experiment starts. Write it down.',
        'Every extra look at in-progress results inflates your false positive rate.',
        'If you need to peek for safety reasons, use a Bonferroni-corrected threshold for interim checks.',
        'For genuinely flexible monitoring, use sequential testing methods — not standard t-tests.',
      ]},
      { type: 'cta', room: 'stats', label: 'Practice stats interpretation in the Stats Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Senior data science interviews aren\'t testing whether you know the formulas — they\'re testing how you think and communicate. The difference between a "junior-sounding" answer and a "senior-sounding" answer is often structural: not more knowledge, but a different shape. The junior answer lists options. The senior answer makes a recommendation with reasoning. The junior answer says "it depends." The senior answer says "my default would be X, because Y — the exception is if Z, in which case I\'d do W." Learning these patterns is one of the highest-leverage things you can do before an interview loop.' },
      { type: 'heading', text: 'The Core Upgrade: From Options to Recommendations' },
      { type: 'text', text: 'The single most impactful pattern upgrade is replacing "it depends" with a structured recommendation. Every analytical question has conditional answers — what to do depends on context. But "it depends" as a stopping point signals that you\'re a junior analyst waiting for the context to be handed to you. A senior answer structures the dependency explicitly: "My recommendation is X, under the assumption that Y. If Y is not true — for example if [specific condition] — then I\'d go with Z instead, because [reason]."' },
      { type: 'example', label: 'Before and after: the recommendation upgrade', text: 'Question: "How would you measure whether our new checkout feature is successful?"\n\nJUNIOR: "It depends on what the goal is. We could look at CVR, time to checkout, abandonment rate, revenue per session..."\n\nSENIOR: "My primary metric would be checkout completion rate among users who enter checkout — that\'s the most direct measure of whether the feature reduces friction. I\'d also track average order value as a sanity check that we\'re not completing more low-value orders, and refund rate as a guardrail. The decision threshold: if checkout completion rate improves by more than 0.5 percentage points with no degradation in AOV or refunds, that\'s a ship."' },
      { type: 'heading', text: 'Ten Patterns Worth Internalizing' },
      { type: 'list', items: [
        '"My default assumption is X. Tell me if that\'s wrong and I\'ll adjust." — signals you\'re making a decision, not waiting for instructions.',
        '"Before I pick metrics, let me make sure I understand the business goal." — shows you care about the right problem.',
        '"The most important thing to check first is [X], because [reason]. Everything else is secondary." — demonstrates prioritization.',
        '"I\'d compute this at the user level, not the session level, because [reason]." — explicit denominator ownership.',
        '"The risk here is [X]. I\'d add [guardrail metric] to catch it." — proactive thinking, not reactive.',
        '"This result is statistically significant but the effect size is [X]. At our scale that\'s [$Y] in annual revenue — which [is/isn\'t] material." — business translation.',
        '"A naive analysis would show X. But there\'s a confound here: [Z]. The right approach accounts for it by [method]." — demonstrates statistical maturity.',
        '"I\'d decompose this before generating hypotheses. The rate could be down because of [numerator] or [denominator] — those have different root causes." — analytical discipline.',
        '"My recommendation is [X]. The key assumption is [Y]. If that assumption is wrong, I\'d change my recommendation to [Z]." — structured uncertainty.',
        '"I don\'t have enough data to be confident, but the pattern is consistent with [hypothesis]. I\'d want to validate by [specific check] before acting on it." — intellectual honesty.',
      ]},
      { type: 'heading', text: 'The Closing Move' },
      { type: 'text', text: 'Every senior answer ends with a recommendation and a next step, even under uncertainty. The formula: "Based on what we\'ve discussed, my recommendation is [X]. The key risk is [Y], so before we ship I\'d want to [specific validation]. If that check passes, I\'d feel confident moving forward." This closing move signals that you know the job of a data scientist isn\'t to produce a beautiful analysis — it\'s to enable a decision.' },
      { type: 'callout', label: 'The seniority signal in one sentence', text: '"My recommendation is X, assuming Y. The key risk is Z, which I\'d mitigate by doing W. If W reveals a problem, I\'d revisit the recommendation."\n\nThis sentence pattern — recommendation, assumption, risk, mitigation — is the fingerprint of a senior analytical communicator.' },
      { type: 'cta', room: 'cases', label: 'Practice analytical communication in the Cases Room →' },
    ],
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
    content: [
      { type: 'text', text: 'Before an experiment is designed, before an engineering sprint is scoped, before a PM writes a PRD — there\'s a question that should always be answered first: is this worth building? Opportunity sizing is the analytical tool that answers it. It doesn\'t require perfect data. It requires structured estimation with documented assumptions. The output is a rough range of expected impact, which tells you whether the opportunity is worth the investment to pursue more rigorously.' },
      { type: 'heading', text: 'The Three-Step Framework' },
      { type: 'text', text: 'Opportunity sizing follows three steps: identify the addressable population, estimate the conversion improvement, and multiply by the value per conversion. Each step requires an assumption. The assumptions should be explicit, conservative, and stated alongside the estimate. A sizing that hides its assumptions is useless — you can\'t interrogate it, update it, or communicate it. A sizing that surfaces its assumptions is a tool for alignment.' },
      { type: 'example', label: 'Checkout abandonment feature sizing', text: 'Feature: a "save for later" prompt when a user abandons checkout.\n\nStep 1 — Addressable population:\nMonthly checkout starts: 2,000,000\nUsers who abandon checkout: 34% = 680,000/month\nUsers who abandon due to "not ready to buy" (vs. payment issues): ~40% = 272,000/month\nThis is our addressable group — users the feature can plausibly recapture.\n\nStep 2 — Conversion improvement:\nBenchmark: similar save-for-later features recapture 8-15% of abandoners.\nConservative estimate: 8% recapture rate = 21,760 incremental purchases/month.\n\nStep 3 — Value per conversion:\nAverage order value: $62\nIncremental revenue: 21,760 × $62 = $1.35M/month = ~$16M/year\n\nIs that worth 3 weeks of engineering? Probably yes.' },
      { type: 'heading', text: 'Making Assumptions Explicit' },
      { type: 'text', text: 'The sizing above has three major assumptions: what fraction of abandoners are "not ready to buy" (vs having payment problems), what recapture rate to use, and whether AOV of recaptured orders matches baseline. Each of these could be wrong. The right way to handle this is to report a range: "Under conservative assumptions (5% recapture, 50% of abandoners addressable), impact is $6M/year. Under optimistic assumptions (12% recapture, 60% addressable), impact is $24M/year. Base case is ~$16M/year." That range gives stakeholders the information they need to make a prioritization decision.' },
      { type: 'text', text: 'In interviews, the sizing itself matters less than the structure. Interviewers are not checking whether you got the right number — they\'re checking whether you know how to build the estimate. The correct opening move is always: "Let me size the addressable population first, then estimate the conversion improvement, then multiply by value per unit. I\'ll be explicit about my assumptions at each step." Then execute the steps, naming each assumption as you make it.' },
      { type: 'callout', label: 'The sizing formula', text: 'Impact = Addressable population × Realistic conversion improvement × Value per conversion\n\nAddressable population = total users who could plausibly be affected (not total users)\nConversion improvement = conservative estimate of what fraction you can move\nValue per conversion = revenue, LTV, or whatever metric the business cares about\n\nReport a range, not a point estimate. The range signals that you understand the uncertainty.' },
      { type: 'list', items: [
        'Addressable population ≠ total user base. Scope it to users for whom the change is relevant.',
        'Use conservative lift estimates — optimistic sizings don\'t survive stakeholder scrutiny.',
        'State every assumption explicitly. Hidden assumptions are the failure mode of opportunity sizing.',
        'In interviews, the process matters as much as the number. Show the structure.',
      ]},
      { type: 'cta', room: 'cases', label: 'Practice opportunity sizing in the Cases Room →' },
    ],
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

// ─────────────────────────────────────────────────────────────
// Post reader — renders a single post's content array
// ─────────────────────────────────────────────────────────────
function PostReader({ post, cfg, onBack, onNavigate }) {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600,
          padding: '0.3rem 0', marginBottom: '1.5rem',
        }}
      >
        ← Back to Learn
      </button>

      {/* Category + read time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
          color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>{post.category}</span>
        <span style={{
          fontSize: '0.62rem', color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>{post.readMin} min read</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)',
        margin: '0 0 0.6rem', letterSpacing: '-0.02em', lineHeight: 1.25,
      }}>
        {post.title}
      </h1>

      {/* Summary */}
      <p style={{
        fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65,
        margin: '0 0 2rem', paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        {post.summary}
      </p>

      {/* Content blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {(post.content || []).map((block, i) => {
          if (block.type === 'text') {
            return (
              <p key={i} style={{
                fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.75,
                margin: 0,
              }}>
                {block.text}
              </p>
            );
          }

          if (block.type === 'heading') {
            return (
              <h2 key={i} style={{
                fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)',
                margin: '0.4rem 0 0', letterSpacing: '-0.01em', lineHeight: 1.3,
              }}>
                {block.text}
              </h2>
            );
          }

          if (block.type === 'example') {
            return (
              <div key={i} style={{
                background: 'var(--surface-code, #0d1117)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1rem 1.2rem',
              }}>
                <div style={{
                  fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.5rem',
                }}>
                  {block.label}
                </div>
                <pre style={{
                  fontSize: '0.82rem', color: 'var(--text-code, #e6edf3)',
                  margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.65,
                }}>
                  {block.text}
                </pre>
              </div>
            );
          }

          if (block.type === 'callout') {
            return (
              <div key={i} style={{
                background: 'var(--accent-bg)', border: `1px solid var(--accent-border)`,
                borderRadius: 'var(--radius)', padding: '1rem 1.2rem',
                borderLeft: '3px solid var(--accent)',
              }}>
                <div style={{
                  fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.45rem',
                }}>
                  {block.label}
                </div>
                <p style={{
                  fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.65,
                  margin: 0, whiteSpace: 'pre-line',
                }}>
                  {block.text}
                </p>
              </div>
            );
          }

          if (block.type === 'list') {
            return (
              <ul key={i} style={{
                margin: 0, paddingLeft: '1.4rem',
                display: 'flex', flexDirection: 'column', gap: '0.45rem',
              }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6,
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === 'cta') {
            const isClickable = typeof onNavigate === 'function';
            return (
              <div key={i} style={{
                marginTop: '0.8rem', paddingTop: '1.2rem',
                borderTop: '1px solid var(--border-subtle)',
              }}>
                <button
                  onClick={isClickable ? () => onNavigate(block.room) : undefined}
                  style={{
                    background: 'var(--yellow)', color: '#000',
                    border: 'none', borderRadius: 'var(--radius)',
                    padding: '0.65rem 1.3rem',
                    fontSize: '0.85rem', fontWeight: 700,
                    cursor: isClickable ? 'pointer' : 'default',
                    letterSpacing: '-0.01em',
                    opacity: isClickable ? 1 : 0.75,
                  }}
                >
                  {block.label}
                </button>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main browser
// ─────────────────────────────────────────────────────────────
export function BlogBrowser({ onNavigate }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const total = POSTS.length;
  const writtenCount = POSTS.filter(p => p.content && p.content.length > 0).length;

  // If a post is selected, render the reader view
  if (selectedPost) {
    const cfg = CATEGORY_CONFIG[selectedPost.category] || CATEGORY_CONFIG['Metrics'];
    return (
      <PostReader
        post={selectedPost}
        cfg={cfg}
        onBack={() => setSelectedPost(null)}
        onNavigate={onNavigate}
      />
    );
  }

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
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--green)', lineHeight: 1 }}>{writtenCount}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>articles live</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
            fontSize: '0.75rem', color: 'var(--yellow)', fontWeight: 600,
          }}>
            ⏳ More coming soon
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
                <PostCard
                  key={post.id}
                  post={post}
                  cfg={cfg}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PostCard({ post, cfg, onClick }) {
  const hasContent = post.content && post.content.length > 0;

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: `1.5px solid ${hasContent ? cfg.border : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '1.1rem 1.2rem',
        display: 'flex', flexDirection: 'column', gap: '0.45rem',
        opacity: hasContent ? 1 : 0.78,
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = hasContent
          ? '0 0 0 2px var(--accent-border)'
          : 'none';
      }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
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
        {hasContent ? (
          <span style={{
            fontSize: '0.56rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
            color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
          }}>Read Now</span>
        ) : (
          <span style={{
            fontSize: '0.56rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
            color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.07rem 0.32rem', marginLeft: 'auto',
          }}>Coming Soon</span>
        )}
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
        {hasContent
          ? <span>Read article → <span style={{ color: cfg.color, fontWeight: 600 }}>then practice in {post.roomLabel}</span></span>
          : <span>Practice in → <span style={{ color: cfg.color, fontWeight: 600 }}>{post.roomLabel}</span></span>
        }
      </div>
    </div>
  );
}
