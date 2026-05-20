export const growthAnalyticsCases = [
  {
    id: 'GA01',
    title: 'DAU Dropped 8% — What\'s Driving It?',
    subtitle: 'Prism · Video App · Growth Accounting',
    difficulty: 'analyst',
    isFree: true,
    domain: 'growth-accounting',
    company: 'Prism',
    tags: ['dau', 'growth-accounting', 'retention', 'diagnosis'],
    situation: `Prism is a short-form video app with 2.4M daily active users. Over the past four weeks, DAU has declined steadily to 2.2M — a drop of roughly 8.3%. Leadership is alarmed.

Here is what the data shows for the past four weeks:
- New users per week: stable at ~45,000
- Reactivated users per week (churned users returning): stable at ~12,000
- Weekly retention rate (users active last week who returned this week): dropped from 68% → 58%
- Current retained user base contributing to DAU: declining as a result

The CEO suspects the problem is acquisition. He argues: "Our marketing spend is flat, our install numbers are weak compared to last quarter, and that's why we're losing DAU." He wants to double the paid acquisition budget immediately.

The head of product disagrees and thinks it's a product engagement issue. She wants to run a full audit of the core loop before spending more on acquisition.

You are the lead data analyst. You need to diagnose what is actually driving the DAU decline before the budget meeting tomorrow.`,
    prompt: 'Walk through your diagnosis using the growth accounting identity. Show your calculations. Who is right — the CEO or the head of product?',
    frameworkSteps: [
      'Step 1 — State the growth accounting identity: DAU_today = Retained users + New users + Reactivated users. Every DAU movement can be decomposed into these three buckets.',
      'Step 2 — Establish a baseline: At 2.4M DAU with 68% weekly retention, ~1.632M of today\'s DAU came from retained users, ~45k from new, ~12k from reactivated.',
      'Step 3 — Apply the new retention rate: At 58% retention (same base), retained users would be ~1.392M. Compute implied DAU under new retention vs old retention.',
      'Step 4 — Isolate the retention impact: Calculate the DAU gap attributable purely to the retention drop. Compare to the actual observed DAU drop.',
      'Step 5 — Evaluate the acquisition hypothesis: New users are stable at 45k/week. Ask: could flat new users explain a 200k DAU drop? Run the math.',
      'Step 6 — Render the diagnosis: Attribute the decline to its source and state which lever to pull.',
    ],
    hints: [
      'Growth accounting: DAU = retained + new + reactivated. The DAU drop must come from one of these three levers.',
      'Retention dropping from 68% → 58% is a 10 percentage point fall. Apply that to the retained user base (roughly 1.6M at peak) to estimate the impact.',
      'New users are flat at 45k/week. If acquisition were the problem, you\'d expect new users to have dropped, not retention.',
      'Reactivated users are also stable at 12k/week — so reactivation isn\'t the issue either.',
      'The math: 1,600,000 × (0.68 − 0.58) = 160,000 fewer retained users per day. That alone explains most of the 200k DAU drop.',
    ],
    modelAnswer: {
      walkthrough: `The growth accounting identity is: DAU_today = Retained users + New users + Reactivated users.

Let's establish the baseline at peak DAU (2.4M):
- At 68% weekly retention and ~2.4M DAU, the retained component is approximately 2.4M × 0.68 = 1,632,000 users per day (rough approximation — the DAU base feeding into next day's retention).
- New users: ~45,000/week ÷ 7 ≈ 6,400/day
- Reactivated users: ~12,000/week ÷ 7 ≈ 1,700/day
- Together: 1,632,000 + 6,400 + 1,700 ≈ 1,640,100 (this models the next day's DAU, which in steady state equals today's DAU — so the retained base is the dominant lever)

Now apply the retention drop: 68% → 58%, a 10pp decline.

Impact of retention drop on the retained component:
1,632,000 × (0.68 − 0.58) / 0.68 × 0.68 — simplified: the retained pool shrinks by approximately 1,632,000 × (10/68) ≈ 240,000 users/day if we apply the rate to the same active base. A cleaner estimate: if 2.4M users were active, and 68% returned = 1,632,000 vs 58% returned = 1,392,000, that's a gap of 240,000 retained users.

The observed DAU drop is 2.4M → 2.2M = 200,000.

The retention-driven shortfall (240k) more than explains the 200k DAU drop. New users are flat at 45k/week. If acquisition were the culprit, we'd expect new user installs to have fallen — they haven't. Reactivation is also flat.

Conclusion: The CEO is wrong. Doubling acquisition spend would add ~45k new users/week, but with only 58% weekly retention those users will churn quickly, generating perhaps 26k retained DAU per week from new users — not nearly enough to offset the structural retention leak. The head of product is right: this is a retention/engagement problem. Fix the core product loop first, then scale acquisition into a product that can hold users.

The next investigative step: segment retention by cohort, feature usage, and platform (iOS vs Android) to identify what changed 4–5 weeks ago. Look for product changes, algorithm changes, or content supply shifts that coincide with the retention inflection.`,
      keyDiagnosis: 'Retention regression (68% → 58%) explains the entire DAU drop. New user acquisition is stable and not the cause.',
      recommendation: 'Do not increase acquisition spend. Audit the product engagement loop — look for what changed 4–5 weeks ago in content quality, recommendations, or the core loop. Fix retention first, then scale acquisition.',
    },
    keyTakeaways: [
      'Growth accounting decomposes DAU into three levers: retained, new, reactivated. A DAU drop must come from one of them — start there before hypothesizing.',
      'Flat new users rules out acquisition as the cause. The CEO\'s hypothesis fails the first data check.',
      'Pouring acquisition spend into a leaky retention bucket is one of the most common and costly mistakes in growth — you buy users at CAC only to lose them in days.',
    ],
    playbookLinks: [{ id: 'growth-accounting', label: 'Growth Accounting' }, { id: 'cohort-retention-curves', label: 'Cohort Retention' }],
  },

  {
    id: 'GA02',
    title: 'Stickiness Fell From 22% to 18% — Engagement Problem?',
    subtitle: 'Crafted Marketplace · Consumer Marketplace · Engagement',
    difficulty: 'senior',
    isFree: false,
    domain: 'engagement',
    company: 'Crafted Marketplace',
    tags: ['dau-mau', 'stickiness', 'mix-shift', 'segmentation', 'paid-acquisition'],
    situation: `Crafted Marketplace is a B2C e-commerce platform for handmade goods. Over the past six weeks, the product team has been tracking a key engagement metric: DAU/MAU ratio (stickiness). It has declined from 22% to 18%.

Here is the underlying data:
- Overall MAU: grew from 1.8M → 2.4M (+33%)
- Power users (≥5 sessions/month): DAU/MAU ratio stable at 38%. This segment grew slightly from 620k → 660k users.
- Casual users (1–2 sessions/month): grew from 400k → 680k users (driven almost entirely by a paid social campaign that ran for 5 weeks)
- Casual user DAU/MAU ratio: stable at ~8–9% (these users visit rarely by definition)

The paid marketing team ran a campaign that acquired 280k net new users over the 6-week period. The campaign was declared a success because MAU grew 33% and conversion from first visit to signup improved.

The VP of Product is now demanding a full engagement initiative — she wants to redesign the core loop, run A/B tests on the homepage, and consider adding a notification system to "pull users back in." The estimated cost: 2 months of engineering effort.

You are the senior analyst. Your job is to evaluate whether the stickiness decline represents a real product engagement problem before the VP commits the team's roadmap.`,
    prompt: 'Diagnose whether the DAU/MAU decline reflects real engagement degradation or a statistical artifact. Show the math. What should the VP do?',
    frameworkSteps: [
      'Step 1 — Decompose the aggregate DAU/MAU ratio by user segment. DAU/MAU is a weighted average across all user types.',
      'Step 2 — Hold segment-level ratios constant and model what the aggregate ratio would be under the old vs new user mix.',
      'Step 3 — Identify whether the ratio moved within a segment (true engagement change) or whether the user mix shifted (composition effect).',
      'Step 4 — Compute the expected DAU/MAU under the new mix if each segment\'s ratio stayed constant.',
      'Step 5 — Compare expected vs actual aggregate ratio to determine how much of the change is explained by mix shift alone.',
      'Step 6 — Render a diagnosis and a recommendation on the VP\'s proposed engagement initiative.',
    ],
    hints: [
      'DAU/MAU is a weighted average: (DAU_power + DAU_casual) / (MAU_power + MAU_casual). If you add low-DAU/MAU users, the aggregate ratio falls mechanically.',
      'Power users: 660k × 38% = ~251k DAU. Casual users: 680k × 8.5% = ~58k DAU. Total DAU = ~309k. Total MAU = 1.34M. Aggregate DAU/MAU ≈ 23% — close to actual.',
      'Model the old mix: 620k power (38%) + 400k casual (8.5%) = 236k + 34k = 270k DAU / 1.02M MAU ≈ 26% (old baseline was 22%, so use the actuals).',
      'The key insight: casual users have structurally low stickiness (they visit 1–2 times/month). Adding 280k of them dilutes the aggregate ratio even if the product is unchanged.',
      'If power user stickiness is unchanged at 38%, there is no product engagement regression among your best users.',
    ],
    modelAnswer: {
      walkthrough: `The DAU/MAU ratio is a weighted average across user segments. To diagnose whether it reflects real engagement regression or mix shift, I'll decompose by segment.

Old state (6 weeks ago):
- Power users (≥5 sessions/month): ~620k MAU, DAU/MAU = 38% → ~236k DAU
- Casual users (1–2 sessions/month): ~400k MAU, DAU/MAU = 8.5% → ~34k DAU
- Other segments (remaining of 1.8M): ~780k MAU, estimated DAU/MAU ~15% → ~117k DAU
- Total: 1.8M MAU, ~387k DAU → aggregate ratio = 21.5% (≈22%)

New state (current):
- Power users: ~660k MAU, DAU/MAU = 38% (unchanged) → ~251k DAU
- Casual users: ~680k MAU, DAU/MAU = 8.5% (unchanged) → ~58k DAU
- Other segments: ~1.06M MAU (residual), DAU/MAU ~15% → ~159k DAU
- Total: 2.4M MAU, ~468k DAU → aggregate ratio = 19.5% (≈18–20%)

Now simulate: what if the mix had shifted but engagement within each segment stayed the same? That's exactly what the model above shows — the ratio would fall from ~22% to ~19–20% purely due to composition, even with zero product regression.

Actual observed ratio: 18%. The model predicts ~19–20%. The 1–2pp residual could be measurement noise, segment boundary effects, or a small real engagement softening that warrants monitoring but not an emergency initiative.

The critical finding: power user stickiness is unchanged at 38%. These are your most valuable users — they drive GMV and referrals. Their engagement has not degraded.

Verdict: The VP's proposed 2-month engagement initiative is not justified by this data. The aggregate DAU/MAU decline is a mix-shift artifact from the paid campaign adding low-stickiness casual users — not a product engagement regression.

Recommendation: (1) Add segment-stratified DAU/MAU to the weekly dashboard so the aggregate metric is not misread. (2) Monitor power user stickiness as the primary engagement KPI. (3) Evaluate the paid campaign on LTV-adjusted CAC, not MAU growth — casual users with 8.5% stickiness likely have low LTV.`,
      keyDiagnosis: 'Mix-shift artifact from paid acquisition of low-stickiness casual users. Power user stickiness (38%) is unchanged — no product regression.',
      recommendation: 'Do not launch the engagement redesign. Instrument segment-stratified DAU/MAU on the dashboard. Evaluate the paid campaign on LTV:CAC, not headline MAU growth.',
    },
    keyTakeaways: [
      'Aggregate DAU/MAU is a weighted average that falls mechanically when you add low-frequency users — always segment before diagnosing.',
      'Mix-shift effects are one of the most common causes of misleading top-line metric moves in growth. Decompose before prescribing.',
      'Power user stickiness is usually the right leading indicator for marketplace health — protect and monitor it separately.',
    ],
    playbookLinks: [{ id: 'growth-accounting', label: 'Growth Accounting' }, { id: 'notification-driven-dau', label: 'Notification-Driven DAU' }],
  },

  {
    id: 'GA03',
    title: 'Two Cohorts, Two Retention Curves',
    subtitle: 'Threadline · B2B SaaS · Retention',
    difficulty: 'senior',
    isFree: false,
    domain: 'retention',
    company: 'Threadline',
    tags: ['cohort-retention', 'b2b-saas', 'gtm', 'segment-fit', 'churn'],
    situation: `Threadline is a B2B SaaS team communication tool (think Slack-adjacent). The company grew quickly in Q1 by adding both enterprise and SMB customers.

Here are the retention curves for two acquisition cohorts:

January cohort (800 accounts, enterprise outbound sales):
- M1 retention: 91%
- M3 retention: 71%
- M6 retention: 42% and flattening (curve appears to be leveling off)
- Average contract value: $12,000 ACV
- Acquisition method: outbound enterprise sales, 45-day sales cycle

March cohort (1,200 accounts, self-serve SMB):
- M1 retention: 88%
- M3 retention: 41%
- M6 retention: 17% and still declining
- Average contract value: $1,200 ACV
- Acquisition method: self-serve signup, free trial → paid conversion

Both cohorts started at similar M1 retention (91% vs 88%), suggesting initial activation is working for both. No significant product changes were shipped between January and March. The engineering team is debating whether there was a product regression that specifically hurt the March cohort.

The CEO wants to know: Is this a product problem? A content/onboarding problem? Or something structural?`,
    prompt: 'Diagnose why the two cohorts have diverged so sharply by M3. Rule out product regression. What is the real driver, and what should the company do?',
    frameworkSteps: [
      'Step 1 — Rule out product regression: No product changes shipped between Jan and March. Both cohorts have similar M1. This pattern of divergence appearing at M3+ is not consistent with a product regression.',
      'Step 2 — Profile the cohorts by segment characteristics: enterprise outbound (high ACV, longer commitment, IT-involved procurement) vs SMB self-serve (low ACV, individual decision-maker, low switching costs).',
      'Step 3 — Analyze the retention curve shapes: Jan cohort flattening = sticky for a segment that \"graduated\" to true adoption. March cohort still declining = no natural floor forming, users are churning continuously.',
      'Step 4 — Apply the PMF/segment-fit lens: High initial retention that flattens = right product for right customer. Low and continuously declining = product isn\'t solving a sustained need for this segment.',
      'Step 5 — Quantify the economic impact: Compare LTV across both cohorts using retention curves × ACV. Show that the March cohort has massively lower LTV despite more accounts.',
      'Step 6 — Diagnose root cause: Is this onboarding? Pricing? Product fit? Switching costs? Segment selection in GTM?',
    ],
    hints: [
      'Retention curves that flatten at M3–M6 suggest a "power user floor" — the customers who find deep value stay forever, weak ones churn early. This is healthy for the right segment.',
      'A continuously declining curve with no floor is the danger sign. It means even the users who stayed through M3 are churning — no one found the sustained value.',
      'Enterprise buyers have longer switching costs (procurement, IT, team habits, contract lock-in). SMB self-serve buyers can cancel in 2 clicks.',
      'The $10,800 ACV difference (12k vs 1.2k) means the Jan cohort has 10x the monetization per account even before accounting for retention.',
      'LTV estimate: Jan cohort at 42% M6 retention flattening → rough LTV of 2–3 years of subscription. March cohort at 17% M6 still declining → LTV < 1 year.',
    ],
    modelAnswer: {
      walkthrough: `Let me first rule out product regression. No significant product changes shipped between January and March. Both cohorts have near-identical M1 retention (91% vs 88%) — if there were a product regression specifically hurting the March cohort, you'd expect M1 to differ or see a specific cohort-level event. The divergence appears at M3, not at activation.

The divergence is almost certainly explained by segment composition, not product quality.

Profile the two cohorts:
- January enterprise cohort: $12k ACV, 45-day sales cycle, outbound, likely mid-market or enterprise buyers with IT-involved procurement. These buyers have high switching costs — they've negotiated contracts, integrated the tool into workflows, and face significant friction to leave.
- March SMB cohort: $1.2k ACV, self-serve, free trial → paid. These are individual contributors or small team leads. Switching costs near zero — they can sign up for a competitor in an afternoon.

Retention curve interpretation:
- Jan cohort flattening at 42%: This is the classic enterprise SaaS "survivor curve" — the accounts that make it to M6 have achieved true adoption. The flattening signals a natural retention floor of ~35–45% is forming. These accounts are likely to retain for 2–4+ more years.
- March cohort at 17% and still declining: No floor is forming. Even the users who survived early churn are continuing to leave. This indicates the product isn't solving a sustained problem for the SMB self-serve segment — there is no habitual use case or switching cost holding them.

Economic impact:
- Jan cohort LTV (rough): $12,000 ACV × ~2.5 years (assuming curve flattens and retains) = ~$30,000 LTV per account × 800 accounts = $24M cohort LTV
- March cohort LTV (rough): $1,200 ACV × ~0.8 years (declining curve, likely fully churned by M12) = ~$960 LTV per account × 1,200 accounts = $1.15M cohort LTV

1,200 accounts generating $1.15M vs 800 accounts generating $24M — the March cohort is consuming CAC and support resources while generating minimal LTV.

Root cause: This is a GTM problem, not a product problem. Threadline's product appears to be well-suited for mid-market/enterprise use cases with structured team workflows. SMB self-serve buyers don't have sufficient switching costs, team depth, or sustained communication needs to find enduring value.

Actions: (1) Stop investing in self-serve SMB acquisition at current unit economics. (2) Investigate what the surviving 17% of the March cohort looks like — they may be SMBs with enterprise-like characteristics. (3) Consider whether an SMB product could be designed with different onboarding and lower price points if the segment is strategic.`,
      keyDiagnosis: 'Segment composition drives the divergence, not product regression. Enterprise buyers have high switching costs and achieve sustained adoption; SMB self-serve buyers churn continuously with no retention floor forming.',
      recommendation: 'Stop scaling SMB self-serve acquisition. The GTM motion is the problem. Focus outbound on enterprise accounts where the product delivers lasting value and LTV justifies CAC.',
    },
    keyTakeaways: [
      'Retention curve shape tells you about PMF: a flattening curve = survivors found lasting value; a continuously declining curve = no one found durable value.',
      'Segment characteristics (switching costs, ACV, procurement complexity) explain retention differences more often than product quality differences.',
      'A GTM problem masquerading as a product problem is extremely common in early SaaS — always segment cohorts by acquisition channel and customer profile before diagnosing.',
    ],
    playbookLinks: [{ id: 'cohort-retention-curves', label: 'Cohort Retention Curves' }, { id: 'acquisition-quality', label: 'Acquisition Quality' }],
  },

  {
    id: 'GA04',
    title: '13% Browse-to-Purchase — Where Does the Funnel Break?',
    subtitle: 'Vela · B2C Marketplace · Funnel Analysis',
    difficulty: 'analyst',
    isFree: false,
    domain: 'funnel',
    company: 'Vela',
    tags: ['funnel', 'conversion', 'browse-to-purchase', 'ux', 'trust'],
    situation: `Vela is a two-sided B2C marketplace for curated lifestyle products. The product team is trying to improve the user journey from signup to first purchase.

Here is the weekly funnel data (new user cohort, weekly snapshot):
- Signup: 100,000 users
- Profile Complete (adds name, preferences, shipping address): 72,000 users (72% of signups)
- First Browse (views ≥3 product listings): 61,200 users (85% of profile completers)
- First Purchase: 8,000 users (13% of browsers)

Industry benchmarks for comparable B2C marketplaces:
- Signup → Profile Complete: 78–85%
- Profile Complete → First Browse: 88–93%
- Browse → First Purchase: 25–35%

The team has been debating where to focus for the past two weeks:
- The growth team lead says: "Profile completion is the bottleneck — 28% of signups never finish their profile, so they can't even see personalized listings."
- The head of design says: "We need to redesign onboarding and reduce the signup friction first."
- The PM says: "Browse-to-purchase is killing us, but it's a hard problem. Let's focus on the easy wins in profile completion first."

You have been asked to run the funnel analysis and recommend where the team should focus.`,
    prompt: 'Identify the highest-leverage step in the funnel. Show your gap analysis vs benchmarks. Where should the team focus first?',
    frameworkSteps: [
      'Step 1 — Calculate the absolute user drop at each step: How many users are lost at Signup→Profile, Profile→Browse, Browse→Purchase?',
      'Step 2 — Calculate the relative gap vs benchmark at each step: How far is Vela from industry benchmark at each stage?',
      'Step 3 — Estimate the incremental users and revenue recoverable at each step if you reached benchmark conversion.',
      'Step 4 — Prioritize by gap magnitude and feasibility: The largest relative gap vs benchmark with the most recoverable users deserves first attention.',
      'Step 5 — Identify the likely root cause at the broken step: What causes users to browse but not purchase on a marketplace?',
      'Step 6 — Render a prioritized recommendation with a hypothesis to test.',
    ],
    hints: [
      'Absolute drops: Signup→Profile loses 28k users. Profile→Browse loses 10.8k users. Browse→Purchase loses 53.2k users.',
      'Gap vs benchmark: Profile completion is at 72% vs 78–85% benchmark — below but not catastrophic. Browse→Purchase is at 13% vs 25–35% — roughly 2x below benchmark.',
      'Recovery calculation: If Browse→Purchase reached 25% (low end of benchmark), that\'s 15,300 purchasers vs 8,000 — 7,300 additional first purchases per week.',
      'If Signup→Profile reached 80%, that adds ~8,000 more profilers, then ~6,800 more browsers, then ~880 more purchases (at current 13% conversion) — much smaller purchase gain.',
      'Users who browse but don\'t buy on marketplaces typically face: price concerns, trust deficit (new marketplace, unknown sellers), product quality uncertainty, or poor purchase UX.',
    ],
    modelAnswer: {
      walkthrough: `Let me run the gap analysis against benchmarks at each step.

Step 1 — Absolute users lost at each step:
- Signup → Profile: 100,000 → 72,000 = 28,000 users lost (28% drop)
- Profile → Browse: 72,000 → 61,200 = 10,800 users lost (15% drop)
- Browse → Purchase: 61,200 → 8,000 = 53,200 users lost (87% drop)

Step 2 — Gap vs benchmark:
- Signup → Profile: 72% actual vs 78–85% benchmark → 6–13pp below benchmark (moderate gap)
- Profile → Browse: 85% actual vs 88–93% benchmark → 3–8pp below benchmark (small gap)
- Browse → Purchase: 13% actual vs 25–35% benchmark → 12–22pp below benchmark (catastrophic gap — ~2–2.7x below benchmark)

Step 3 — Recovery potential (incremental first purchases per week):
Scenario A: Fix Browse → Purchase from 13% → 25% (low benchmark)
61,200 browsers × 25% = 15,300 purchasers vs 8,000 current = +7,300 purchases/week

Scenario B: Fix Profile Completion from 72% → 80%
+8,000 more profilers → +6,800 more browsers → 6,800 × 13% = +884 more purchases/week

Scenario C: Fix both Signup→Profile + Profile→Browse to benchmark
At best: +12,000 more profilers → +10,200 more browsers → 10,200 × 13% = +1,326 more purchases/week

The Browse→Purchase fix is 5–8x more impactful at the purchase outcome than fixing the earlier steps, even at conservative conversion improvement assumptions.

Step 4 — Root cause at Browse→Purchase:
Users who browse ≥3 listings and don't buy on a B2C marketplace typically face:
- Trust deficit: New marketplace, unknown sellers, limited reviews, payment security uncertainty
- Price-value mismatch: Products look interesting but seem overpriced vs alternatives
- Product quality uncertainty: No tactile experience, limited photos or dimensions
- Purchase UX friction: Complex checkout, forced account commitment, limited payment methods
- Browsing intent vs buying intent mismatch: Some users are discovery-only

Recommended focus: Browse → Purchase is the catastrophic gap. Fix it first. Test trust signals (seller reviews, return policy visibility, payment badges), improve product page quality (photo standards, size charts, trusted seller indicators), and simplify checkout.

Profile completion is worth iterating on (it's 72% vs 78–85% benchmark) but should be second priority — fixing it at current browse-to-purchase rates yields ~10x less purchase impact.`,
      keyDiagnosis: 'Browse-to-purchase at 13% vs 25–35% benchmark is the catastrophic gap. It is 2x below benchmark and responsible for losing 53,200 potential buyers every week. Profile completion is below benchmark but secondary in impact.',
      recommendation: 'Focus first on Browse→Purchase. Hypothesize trust, product quality, and checkout friction as root causes. Run targeted tests: trust badges, seller review prominence, return policy callouts, checkout simplification. Do not prioritize onboarding redesign until the conversion floor is fixed.',
    },
    keyTakeaways: [
      'Always compare funnel steps against industry benchmarks — absolute conversion rates are meaningless without a reference point.',
      'Prioritize the step with the largest relative gap AND the most recoverable users at the outcome you care about (purchases, not just completions).',
      'An "easy win" upstream that converts 5% more users into a broken downstream step generates almost no outcome improvement — fix the leak, not the tap.',
    ],
    playbookLinks: [{ id: 'funnel-analysis-framework', label: 'Funnel Analysis' }, { id: 'acquisition-quality', label: 'Acquisition Quality' }],
  },

  {
    id: 'GA05',
    title: 'Which Acquisition Channel Is Worth It?',
    subtitle: 'Crafted Marketplace · Consumer Marketplace · Acquisition',
    difficulty: 'senior',
    isFree: false,
    domain: 'acquisition',
    company: 'Crafted Marketplace',
    tags: ['ltv-cac', 'acquisition-channels', 'paid-social', 'seo', 'referral', 'unit-economics'],
    situation: `Crafted Marketplace is evaluating its three main acquisition channels at the 6-month mark post-acquisition. The marketing team wants to decide where to invest the next $500,000 of acquisition budget.

Here is the performance data for each channel, measured on cohorts acquired in the same quarter:

Paid Social (Facebook/Instagram):
- CAC: $45 per acquired user
- Average 6-month LTV: $38
- 6-month payback status: Negative margin (LTV < CAC)
- Current budget share: 60% of acquisition budget

SEO / Content Marketing:
- CAC: $12 per acquired user (fully-loaded: content team cost + tooling amortized over traffic)
- Average 6-month LTV: $67
- 6-month payback period: ~1.1 months
- Current budget share: 25% of acquisition budget

Referral Program:
- CAC: $8 per acquired user (referral credit + program management cost)
- Average 6-month LTV: $89
- 6-month payback period: ~1.1 months
- Current budget share: 15% of acquisition budget

The head of growth wants to double the paid social budget. His reasoning: "Paid social has the highest reach and lets us target specific demographics. Our LTV will improve as we optimize creative and targeting. We just need more scale."

The CFO is skeptical. The CEO wants a data-driven recommendation.`,
    prompt: 'Evaluate the unit economics of all three channels. Should the team double paid social? Where should the $500k go?',
    frameworkSteps: [
      'Step 1 — Calculate LTV:CAC ratio for each channel. This is the primary unit economics signal.',
      'Step 2 — Calculate payback period: How long until the channel recoups its CAC? Rule of thumb: <12 months is healthy, <6 months is excellent.',
      'Step 3 — Assess scalability: Which channels scale with budget (paid social), which scale with compounding effort (SEO), which are constrained by user base size (referral)?',
      'Step 4 — Evaluate the paid social improvement hypothesis: What LTV improvement would be needed to make paid social break-even? Is that realistic?',
      'Step 5 — Compute the NPV of deploying $500k across different allocation scenarios.',
      'Step 6 — Render a channel allocation recommendation with caveats.',
    ],
    hints: [
      'LTV:CAC ratios: Paid Social = 38/45 = 0.84 (destroying value). SEO = 67/12 = 5.6 (excellent). Referral = 89/8 = 11.1 (exceptional).',
      'For paid social to break even at 6 months, LTV needs to reach $45 — that\'s a 18% improvement. To reach 3:1 LTV:CAC (healthy), LTV needs to reach $135 at current CAC.',
      'Referral doesn\'t scale infinitely — you can only refer users you have. Growth in referral revenue is bounded by your existing user base size and K-factor.',
      'SEO compounds: content created today earns traffic for years. The marginal CAC on SEO decreases over time as domain authority grows.',
      '$500k at referral CAC of $8 = 62,500 users. $500k at SEO CAC of $12 = 41,667 users. $500k at paid social CAC of $45 = 11,111 users — and at negative unit economics.',
    ],
    modelAnswer: {
      walkthrough: `Step 1 — LTV:CAC ratios:
- Paid Social: $38 LTV / $45 CAC = 0.84 — every dollar spent on paid social destroys $0.16 of value at the 6-month horizon
- SEO/Content: $67 LTV / $12 CAC = 5.58 — every dollar spent generates $5.58 in LTV at 6 months
- Referral: $89 LTV / $8 CAC = 11.1 — every dollar spent generates $11.10 in LTV at 6 months

Step 2 — Payback periods:
- Paid Social: Never at current LTV ($38 < $45 CAC). Would need LTV to improve.
- SEO: ~1.1 months (strong — means the channel pays for itself in roughly 5 weeks)
- Referral: ~1.1 months (same — reflects high purchase intent from referred users)

Step 3 — Scalability:
- Paid Social: Scales linearly with budget. But at negative unit economics, scaling it burns cash.
- SEO: Scales with content investment, but compounds. A $12 CAC today likely falls to $8–9 as domain authority grows. Non-linear returns with time.
- Referral: Constrained by existing user base (can only refer users you have) and K-factor. Not infinitely scalable but has the best economics while it works.

Step 4 — Paid Social improvement hypothesis:
For paid social to break even: LTV must reach $45 (18% improvement). That's achievable with optimization.
For paid social to reach a healthy 3:1 LTV:CAC: LTV must reach $135. That would require a 255% LTV improvement from the current $38 — implausible without a fundamental change to the product or pricing.

Step 5 — $500k allocation scenarios:
Scenario A (double paid social): $500k / $45 CAC = 11,111 users at $38 LTV = $422k LTV. Net loss: $78k
Scenario B (shift to SEO + Referral): $300k SEO + $200k Referral
  - SEO: 25,000 users × $67 LTV = $1.675M LTV
  - Referral: 25,000 users × $89 LTV = $2.225M LTV
  - Total LTV: $3.9M vs $500k spent → $3.4M net value creation

Recommendation: Do not double paid social. Reallocate 60% paid social budget to SEO (40%) and referral (20%). A small paid social test budget (5–10%) is acceptable to continue creative/targeting optimization and gather data on whether 12-month LTV improves. Set a gate: if paid social 12M LTV does not reach $55 (1.2x CAC), cut it entirely.`,
      keyDiagnosis: 'Paid social is destroying value at $38 LTV vs $45 CAC. SEO (5.6:1 LTV:CAC) and Referral (11.1:1 LTV:CAC) are the high-value channels. Current budget allocation is inverted — 60% in the worst channel.',
      recommendation: 'Shift budget: SEO 45%, Referral 30%, Paid Social 10% (test budget only), other 15%. Set a 12M LTV gate for paid social. Reallocating $500k from paid social to SEO/referral generates ~8x more LTV.',
    },
    keyTakeaways: [
      'LTV:CAC is the fundamental unit economics signal for acquisition channels. Below 1:1 means you\'re literally paying to lose money.',
      'Channels with the best unit economics (referral, SEO) often get underinvested because they\'re harder to scale or measure than paid.',
      'Set payback period gates — not just LTV at a single point. A channel with 12M+ payback is a cash flow risk even if LTV is eventually positive.',
    ],
    playbookLinks: [{ id: 'ltv-payback-period', label: 'LTV & Payback Period' }, { id: 'acquisition-quality', label: 'Acquisition Quality' }],
  },

  {
    id: 'GA06',
    title: 'DAU Up 12% After Push Campaign — Real or Hollow?',
    subtitle: 'Prism · Video App · Engagement Quality',
    difficulty: 'senior',
    isFree: false,
    domain: 'engagement',
    company: 'Prism',
    tags: ['dau-quality', 'push-notifications', 'engagement', 'hollow-metrics', 'retention'],
    situation: `Prism's growth team launched an aggressive push notification campaign on Monday. The campaign sends two types of notifications:
1. Daily digest: "Your top videos from people you follow — don't miss out"
2. Re-engagement: "You might have missed: [3 videos from followed creators]"

Results after 7 days:
- DAU: +12% week-over-week (from 2.2M → 2.46M)
- CEO declares the campaign a success and asks for it to continue and scale

However, you (the analyst) pull the underlying data and notice some troubling signals:
- Notification open rate: 71% of the DAU spike came from users who opened a push notification
- Average session length for notification-opened sessions: 1.2 minutes
- Average session length for organic (non-notification) sessions: 8.4 minutes
- 7-day rolling retention of the notification-sourced DAU: 23%
- 7-day rolling retention of organic DAU (same period): 61%

The CEO has scheduled a press release about "record engagement." The VP of Marketing wants to allocate $200k to develop a more sophisticated notification system.

You have 30 minutes to prepare a briefing on whether this DAU growth is real.`,
    prompt: 'Diagnose whether the DAU growth from the push campaign represents genuine user engagement or hollow inflation. Show the quality-adjusted analysis.',
    frameworkSteps: [
      'Step 1 — Decompose DAU into notification-driven and organic components. Quantify each.',
      'Step 2 — Quality-adjust DAU using session length as a proxy for engagement depth. Compute "engaged DAU" using a minimum session threshold.',
      'Step 3 — Apply D7 retention to project what the DAU looks like in one week when notifications stop or are ignored.',
      'Step 4 — Calculate the decay curve: what happens to total DAU if notifications drive 71% of the spike but those users have only 23% D7 retention?',
      'Step 5 — Benchmark the notification-session quality vs organic session quality.',
      'Step 6 — Render a verdict on campaign quality and a recommendation for leadership.',
    ],
    hints: [
      'Notification-sourced DAU: 71% of the 260k DAU spike = ~185k users came via notification opens. Organic DAU change = ~75k.',
      'Session quality: 1.2 min notification session vs 8.4 min organic session = notification sessions are 7x shorter — barely opening the app and closing.',
      'D7 retention forecast: 185k notification users × 23% = ~43k retained in 7 days. 75k organic users × 61% = ~46k retained. After 7 days, most of the DAU spike evaporates.',
      'Engaged DAU (sessions ≥2 min): Notification sessions avg 1.2 min — most fall below a 2-min meaningful engagement threshold. True engaged DAU may be roughly flat.',
      'Notifications can be sustainable if they drive genuine re-engagement. The problem here is session depth — users are opening to dismiss, not to actually watch.',
    ],
    modelAnswer: {
      walkthrough: `Step 1 — Decompose the DAU spike:
Total DAU spike: 2.46M − 2.2M = 260,000 additional daily users
Notification-sourced: 71% × 260,000 = ~185,000 users
Organic change: 29% × 260,000 = ~75,000 users (some of this may be noise or week-over-week variance)

Step 2 — Session quality analysis:
Notification sessions: avg 1.2 minutes
Organic sessions: avg 8.4 minutes
Ratio: notification sessions are 14% the length of organic sessions (7x shorter)

If we define "meaningfully engaged DAU" as a session ≥ 2 minutes (the minimum to watch at least one video to near-completion):
- Most notification-opened sessions (avg 1.2 min) fall below this threshold
- Estimated engaged DAU from notifications: perhaps 15–20% of 185k = 28–37k users
- Organic engaged DAU: largely intact
- True engaged DAU change: ~+35k, not +260k — roughly flat

Step 3 — D7 retention decay projection:
Week 1 notification cohort:
- 185k notification users × 23% D7 retention = ~43k return next week
- Net loss from notification cohort week 2: 142k users

Week 1 organic uplift:
- 75k organic users × 61% D7 retention = ~46k return next week
- Net loss: 29k users

Projected DAU in 7 days (if campaign continues at same scale):
2.2M base + new notification opens (similar ~185k) + 43k retained + 46k retained organic − decays = roughly similar headline DAU only if you keep sending notifications. Stop them → DAU drops.

Step 4 — The decay scenario:
If notifications stop after week 1: DAU reverts toward ~2.25–2.3M (nearly the pre-campaign level) because 77% of notification users won't return.

Verdict: This is hollow DAU. The 12% gain is driven by low-quality notification opens that have 7x shorter sessions and 23% D7 retention vs 61% organic. Engaged DAU (by session depth) is essentially flat.

Recommendation to leadership: (1) Do not issue a press release about "record engagement." (2) Do not invest $200k in scaling the notification system at current quality. (3) The notifications may be causing notification fatigue that will damage organic retention over time. (4) Test a lower-frequency, higher-quality notification strategy that drives ≥3-minute sessions and measures D7 retention as the success metric, not open rate or raw DAU.`,
      keyDiagnosis: 'Hollow DAU inflation. 71% of the spike is notification-driven with 1.2-minute avg sessions (vs 8.4 min organic) and 23% D7 retention (vs 61% organic). True engaged DAU is approximately flat.',
      recommendation: 'Do not scale the notification system or issue DAU-based press releases. Redefine the campaign success metric as engaged DAU (session ≥2 min) and D7 retention. Run a reduced-frequency test before spending $200k.',
    },
    keyTakeaways: [
      'DAU is a count metric — it tells you how many users opened the app, not whether they found value. Always quality-adjust with session depth or D7 retention.',
      'Notifications can inflate DAU while destroying long-term retention by training users to dismiss them. High open rate + low session = notification fatigue signal.',
      'Hollow growth is worse than flat growth — it burns CAC-equivalent notification budget, risks churning users, and misleads leadership into celebration mode.',
    ],
    playbookLinks: [{ id: 'notification-driven-dau', label: 'Notification-Driven DAU' }, { id: 'growth-accounting', label: 'Growth Accounting' }],
  },

  {
    id: 'GA07',
    title: '8% Growth But We\'re Bleeding Organic Share',
    subtitle: 'Nova · Subscription Fitness App · Growth Quality',
    difficulty: 'staff',
    isFree: false,
    domain: 'acquisition',
    company: 'Nova',
    tags: ['growth-quality', 'organic-share', 'k-factor', 'paid-dependency', 'unit-economics'],
    situation: `Nova is a subscription fitness app. It has been growing new users at a steady 8% month-over-month for the past 6 months. The growth team is celebrating consistent execution.

However, a closer look at the acquisition data reveals a structural shift:

Six months ago:
- Paid acquisition share of new users: 58%
- Organic/referral share: 42%
- CAC (blended): $18
- Viral coefficient (K-factor): 0.31

Current (today):
- Paid acquisition share of new users: 84%
- Organic/referral share: 16%
- CAC (blended): $41
- K-factor: 0.14

The paid acquisition team argues: "Growth is growth. We're hitting our monthly targets, the paid channels are performing, and user numbers are up. Why would we change what's working?"

The CFO flags concern: the marketing budget has grown 3.5x to maintain the same growth rate, and LTV has not changed materially. The CMO wants to know if the 8% growth rate is sustainable and what's actually happening.

You are the staff analyst. Prepare a growth quality audit.`,
    prompt: 'Audit the quality of Nova\'s 8% monthly growth. Diagnose what has structurally changed and model the sustainability of the current trajectory.',
    frameworkSteps: [
      'Step 1 — Decompose growth into organic vs paid components. Compute the implied organic growth rate from the K-factor and organic share data.',
      'Step 2 — Analyze CAC trend: What does the CAC increase from $18 → $41 imply about marginal returns on paid spend?',
      'Step 3 — Model the K-factor collapse: K-factor = 0.31 → 0.14. What does this mean for the viral loop? What does it imply about product satisfaction or share mechanics?',
      'Step 4 — Project the budget requirement to sustain 8% growth at the current CAC trajectory. Show when it becomes untenable.',
      'Step 5 — Diagnose why organic share collapsed: is it product satisfaction, referral program mechanics, market saturation, or something else?',
      'Step 6 — Define what "growth quality" means for a subscription app and render a verdict.',
    ],
    hints: [
      'K-factor interpretation: K=0.31 means each user brings in 0.31 additional users on average. K=0.14 means each user now brings in 0.14. Viral loop is more than halved.',
      'CAC doubling from $18 → $41 while LTV is flat means payback period has roughly doubled. If payback was 6 months before, it\'s now ~14 months.',
      'Organic share dropped from 42% → 16% of new users. If monthly new users are, say, 10,000: previously 4,200 organic, now 1,600 organic — an absolute decline in organic acquisition.',
      'At some CAC growth rate, the paid budget required to sustain 8% growth exceeds subscription LTV. Project when that crossover happens.',
      'K-factor collapse could signal: (a) the easy-to-refer social graph is saturated, (b) product satisfaction has declined, (c) referral mechanics changed, or (d) the acquired paid users refer less than organic users did.',
    ],
    modelAnswer: {
      walkthrough: `Growth quality audit for Nova:

Step 1 — Decompose growth components:
Assume current monthly new users ≈ 10,000 (for illustration; the ratios hold for any base).
- Paid new users: 84% = 8,400
- Organic/referral new users: 16% = 1,600

Six months ago (same base scale):
- Paid: 58% = 5,800
- Organic: 42% = 4,200

Organic acquisition has fallen from ~4,200 to ~1,600 users/month — a 62% absolute decline in organic user acquisition, even while the headline growth rate holds at 8%. Nova is buying back organic growth it is losing.

Step 2 — CAC trajectory and unit economics:
CAC: $18 → $41 (128% increase over 6 months ≈ 15%/month CAC inflation)
If LTV is $120 (unchanged) and CAC was $18: payback = 1.8 months, LTV:CAC = 6.7:1 (excellent)
At CAC = $41: payback = 4.1 months, LTV:CAC = 2.9:1 (acceptable but declining)
At current 15%/month CAC growth: in 4 more months CAC ≈ $72. LTV:CAC = 1.7:1 (marginal).
In 7 more months CAC ≈ $119. Approaching LTV — unit economics inversion.

Step 3 — K-factor collapse:
K = 0.31 → 0.14: viral coefficient fell by 55%.
In a viral growth model: total users = acquired users / (1 − K). At K=0.31, each paid user creates 0.45 organic users. At K=0.14, each paid user creates only 0.16 organic users. The paid-to-organic amplification ratio has collapsed 2.8x.

This means Nova must acquire many more paid users to achieve the same growth, explaining the CAC inflation and paid share increase.

Root cause of K-factor collapse (likely causes to investigate):
(a) Paid-acquired users refer at lower rates than organically-acquired users (paid users are less committed, less likely to evangelize)
(b) Product satisfaction has degraded — net promoter behavior declined
(c) The referral program mechanics changed or became less visible
(d) The referrable social graph of core users is approaching saturation

Step 4 — Sustainability projection:
At $41 CAC today with $120 LTV: budget efficiency = LTV/CAC = 2.9:1. Sustainable but narrowing.
At 15%/month CAC inflation: cross-over (LTV = CAC) occurs in approximately 7–8 months.
Monthly budget to sustain current growth: if 8,400 paid users/month at $41 = $344k/month. In 7 months at $119 CAC: $1M/month to acquire the same 8,400 users. This is not sustainable.

Step 5 — Verdict on growth quality:
The 8% headline growth rate masks a structural deterioration. Nova is on a treadmill: organic referral is collapsing, forcing ever-increasing paid investment at declining returns to maintain the same growth rate. This is the classic symptom of product-led growth erosion.

Actions: (1) Audit why organic referral collapsed — instrument K-factor by acquisition cohort to determine if paid users refer less than organic users. (2) Examine product NPS/satisfaction for trends over the same 6-month period. (3) Evaluate whether the referral program was changed or degraded. (4) Set a K-factor floor of 0.25 as a product health indicator. (5) Model the CAC ceiling: establish the maximum acceptable CAC before the growth team must scale back.`,
      keyDiagnosis: 'Nova is buying growth it used to earn. The K-factor collapsed from 0.31 to 0.14, organic share fell from 42% to 16%, and CAC doubled — all while the headline growth rate appears healthy. The growth engine is structurally degrading.',
      recommendation: 'Declare this a P0 growth quality problem. Audit the K-factor collapse (paid vs organic cohort referral rates, NPS trends, referral program mechanics). Set CAC ceiling alerts. The current trajectory leads to unit economics inversion within 7–8 months.',
    },
    keyTakeaways: [
      'Headline growth rates can be deeply misleading — decomposing paid vs organic is the first step in any growth quality audit.',
      'K-factor collapse combined with CAC inflation is the signature pattern of product-led growth erosion: the product is losing its ability to earn users, so you buy more.',
      'A sustainable growth engine has a healthy organic base that amplifies paid. Paid-dependent growth at declining LTV:CAC is a treadmill, not a flywheel.',
    ],
    playbookLinks: [{ id: 'organic-growth-quality', label: 'Organic vs Paid Growth' }, { id: 'acquisition-quality', label: 'Acquisition Quality' }],
  },

  {
    id: 'GA08',
    title: 'LatAm Retains at 17% vs US at 44%',
    subtitle: 'Crafted Marketplace · International Expansion · Retention & PMF',
    difficulty: 'staff',
    isFree: false,
    domain: 'retention',
    company: 'Crafted Marketplace',
    tags: ['international-expansion', 'pmf', 'activation', 'payment-friction', 'supply-quality'],
    situation: `Crafted Marketplace launched in three LatAm countries (Brazil, Mexico, Colombia) six months ago. The expansion was framed as a top strategic priority, with $3M allocated to regional marketing and seller acquisition.

Current data at the 6-month mark:

US market (mature):
- M6 cohort retention: 44%
- First-session purchase conversion: 31%
- Avg listing quality score: 4.3/5 (based on photos, descriptions, seller response time)
- Payment methods: Credit card (78% penetration), PayPal (61%), Buy Now Pay Later (42%)
- CAC: $22

LatAm market (6-month launch):
- M6 cohort retention: 17%
- First-session purchase conversion: 8%
- Avg listing quality score: 3.1/5
- Payment methods: Credit card only (18% penetration in target demographics)
- CAC: $22 (same as US due to similar CPMs)
- Seller count: 1,400 LatAm sellers (vs 42,000 US sellers)

Engineering is debating whether to scale LatAm paid acquisition. The regional growth lead argues: "We're early. Retention will improve as we grow. We just need more users to build the flywheel." The CFO wants to pause LatAm spend until retention improves.

You are the staff analyst. You have 48 hours to make a recommendation.`,
    prompt: 'Diagnose whether the LatAm retention gap reflects early-market dynamics (patience required) or a PMF failure (structural problem). Recommend whether to scale, pause, or fix-first.',
    frameworkSteps: [
      'Step 1 — Analyze the first-session purchase conversion rate as the activation signal. This is the earliest leading indicator of PMF.',
      'Step 2 — Identify structural product blockers: What features or infrastructure is missing in LatAm that exists in the US?',
      'Step 3 — Separate market maturity effects from product-market fit failures. What would you expect if this were just an early-market timing issue?',
      'Step 4 — Compute the unit economics of LatAm acquisition at current metrics and project at improved metrics.',
      'Step 5 — Define the fix-first threshold: What metrics need to reach what level before scaling acquisition is justified?',
      'Step 6 — Render a recommendation: Scale, Pause, or Fix-first. Include the specific interventions that would change the diagnosis.',
    ],
    hints: [
      '8% first-session purchase conversion is the critical tell. In the US, 31% of first-session visitors buy. LatAm users are seeing the product and not transacting at 4x lower rates.',
      'Credit card penetration at 18% means 82% of your target users literally cannot pay with the only method available. This alone could explain most of the conversion gap.',
      'Listing quality at 3.1/5 vs US 4.3/5 means the product looks materially worse — fewer photos, worse descriptions, slower seller response. Users in a discovery state see an inferior marketplace.',
      'LTV at 17% M6 retention (and declining) vs $22 CAC: LatAm LTV is likely <$15 at current trajectory. Payback may never occur.',
      'Early-market timing would show: lower volume but similar conversion rates, similar listing quality, similar activation patterns — just at lower absolute numbers. This shows structural differences in product experience.',
    ],
    modelAnswer: {
      walkthrough: `Step 1 — Activation analysis (first-session purchase conversion):
LatAm: 8% vs US: 31% → LatAm activation is 74% below US levels.

This is the most important number in this diagnosis. Retention is a lagging indicator — it measures what happens over months. First-session conversion is a leading indicator of immediate value perception. Users who browse the LatAm marketplace and don't buy in their first session are voting "not ready" in real time.

If this were just an early-market timing issue (e.g., users need more exposure before purchasing, brand trust takes time to build), we'd expect first-session conversion to be lower but not catastrophically so. A 4x gap vs an established US market is a structural signal, not a timing signal.

Step 2 — Structural product blockers:
(a) Payment friction: Credit card 18% penetration = 82% of users cannot complete a purchase with the available payment method. This alone likely explains a large portion of the 8% conversion rate. A user who wants to buy but has no credit card simply cannot.
(b) Supply thinness: 1,400 LatAm sellers vs 42,000 US. Assuming similar category distribution, LatAm has ~3% of the US seller density. Users searching for specific items are likely to find few or no options.
(c) Listing quality 3.1/5 vs 4.3/5: The product literally looks worse. New sellers have fewer photos, worse descriptions, lower seller trust signals. First impressions are driving users away.

Step 3 — Early-market vs PMF failure diagnosis:
Early-market timing would manifest as: similar conversion rates at lower volume, similar listing quality as sellers are onboarded, activation improving over time. We'd see a retention improvement trajectory over the 6 months.

PMF failure manifests as: low conversion from day one, retention declining (not improving) over the cohort's life, structural product gaps that volume alone won't fix.

LatAm shows the PMF failure pattern: 8% first-session conversion, 17% M6 retention on a cohort that has had 6 months, and structural blockers (payment, supply, listing quality) that more acquisition spend doesn't address.

Step 4 — Unit economics:
US LTV estimate (rough): At 44% M6 retention, flattening curve, avg $X order × ~3–4 purchases in 6 months. Assume $65 LTV at 6M. LTV:CAC = 65/22 = 3:1 (healthy).
LatAm LTV estimate: At 17% M6 retention (still declining), user who reaches M6 but is declining → LTV likely $12–18. LTV:CAC = 15/22 = 0.68 — destroying value.

Step 5 — Fix-first threshold:
Before scaling LatAm acquisition, three gates must be met:
(1) Payment methods: Add Pix (Brazil), OXXO (Mexico), local installment options (parcelamento). Target: first-session conversion ≥18% (still below US but demonstrates the payment friction was the primary blocker)
(2) Supply density: Reach 5,000+ active LatAm sellers with listing quality score ≥3.8. Invest in seller onboarding quality, photo guidelines, response-time incentives.
(3) M3 retention: First new cohort post-fixes must show M3 ≥35% before scaling acquisition budget.

Recommendation: Fix-first. Pause growth spend above maintenance level. Allocate LatAm budget to: (a) payment method integrations, (b) seller quality program, (c) supply acquisition in top 5 categories. Re-evaluate in 3 months with a new post-fix cohort.`,
      keyDiagnosis: 'PMF failure, not early-market timing. 8% first-session conversion signals structural product gaps: 82% of users cannot pay (payment method gap), supply is too thin, and listing quality is materially inferior to US. Scaling acquisition at 17% M6 retention burns $22 CAC per user generating <$15 LTV.',
      recommendation: 'Fix-first: pause scaled acquisition and invest LatAm budget in (1) local payment methods (Pix, OXXO, installments), (2) seller quality program to reach 5,000 active sellers at 3.8+ quality score. Set gates: first-session conversion ≥18% AND M3 retention ≥35% before resuming growth spend.',
    },
    keyTakeaways: [
      'First-session purchase conversion is the earliest PMF signal in a marketplace — it reflects whether users see something worth buying right now. Below 15% on a mature marketplace means structural blockers, not timing.',
      'Payment method coverage is table stakes for international marketplaces — launching credit-card-only into low-card-penetration markets is a near-guaranteed PMF failure.',
      'Scaling acquisition into a PMF gap doesn\'t build a flywheel — it burns CAC acquiring users who churn because the product isn\'t ready for them.',
    ],
    playbookLinks: [{ id: 'cohort-retention-curves', label: 'Cohort Retention Curves' }, { id: 'funnel-analysis-framework', label: 'Funnel Analysis' }],
  },
];

export const growthAnalyticsCasesById = Object.fromEntries(
  growthAnalyticsCases.map(c => [c.id, c])
);
