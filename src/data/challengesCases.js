export const challengesCases = [
  {
    id: 'CHL01',
    title: 'DAU Drops 15% During Active A/B Test',
    subtitle: 'Feed ranking experiment collides with a platform-wide DAU collapse — diagnose both simultaneously.',
    difficulty: 'senior',
    isFree: true,
    rooms: ['stats', 'rca', 'metrics'],
    estimatedMin: 20,
    company: 'Meta',
    tags: ['srm', 'dau', 'rca', 'notifications', 'experiment-validity'],
    scenario: `Meta's Feed team is running an A/B test of a new ML-based ranking algorithm. The experiment launched on Monday with a 10% treatment split (approximately 30M users globally). The new algorithm is designed to surface higher-quality long-form content over reactive short-form posts.

By day 4, the experiment dashboard shows encouraging results: the primary metric (Feed session time) is up +6% in treatment, with p=0.04. The team is cautiously optimistic. Then the alerting system fires: platform-wide DAU has dropped 15% over the past 48 hours. The drop is not isolated to the experiment cohort — it appears global.

Further investigation reveals an anomaly in the experiment itself: treatment group has 10.3% of users rather than the target 10.0%. This represents roughly 900,000 extra users in treatment who should not be there. The experiment infrastructure team says "it's within normal variance," but the data science team is skeptical.

Simultaneously, the trust & safety team flags that a major push notification deliverability incident occurred on day 3 — a routing bug caused ~40% of scheduled re-engagement notifications to fail to send. Users who normally return via notification link rather than direct app open saw sharp drops in their return rates.`,
    subQuestions: [
      {
        id: 'q1',
        room: 'stats',
        label: 'Statistics',
        question: 'The experiment shows a Sample Ratio Mismatch (SRM) — treatment has 10.3% of users vs the expected 10.0%. Is this a problem? How do you detect, quantify, and interpret SRM? Should you trust the p=0.04 result?',
        hint: 'Run a chi-square test on the allocation counts. With 300M total users, even a 0.3pp deviation is statistically massive. Ask: what systematic process could cause more users to end up in treatment than expected?',
        modelAnswer: 'SRM is a critical validity threat. At 300M users, the expected treatment count is 30M. The observed count is ~30.9M — a difference of 900,000 users. A chi-square test on these allocation counts will yield p << 0.001, meaning the allocation is statistically non-random. This invalidates the experiment results because the groups are no longer comparable — whoever leaked into treatment did so for a non-random reason (e.g., more engaged users, users on a specific platform version, or users exposed to a specific surface). The p=0.04 result cannot be trusted as-is. The correct action is to (1) halt the analysis, (2) identify the allocation bug, (3) fix it and re-randomize, and (4) restart the experiment. Publishing a result from an SRM experiment is a Type I error risk regardless of the p-value.',
        keyPoints: [
          'Chi-square test on allocation counts reveals statistical significance of the imbalance at any reasonable alpha with n=300M.',
          'SRM invalidates the experiment because the "extra" users leaked in non-randomly — the groups are no longer exchangeable.',
          'The p=0.04 result is untrustworthy; you cannot separate the treatment effect from the selection bias introduced by the SRM.',
        ],
      },
      {
        id: 'q2',
        room: 'rca',
        label: 'Root Cause Analysis',
        question: 'Separate from the experiment, platform DAU dropped 15% globally over 48 hours. Walk through your RCA framework. What are your top 5 hypotheses and how would you validate each one?',
        hint: 'Start with the 5 Whys and work through the MECE buckets: instrumentation/logging, product change, infrastructure, external event, or supply-side change. The notification incident is one signal but not necessarily the root cause.',
        modelAnswer: 'A 15% global DAU drop is a P0 incident requiring immediate RCA. My top 5 hypotheses in order of investigation priority: (1) Logging/instrumentation failure — verify that DAU counts come from server-side event logs, not client-side, and check for any pipeline failures or schema changes in the past 48 hours; this rules out phantom drops. (2) Push notification deliverability incident (already identified) — quantify how much of DAU is notification-driven vs direct open, and model the expected DAU impact of a 40% notification failure; this may be the primary cause. (3) App crash or performance regression — check crash rate dashboards, app store ratings delta, and p99 load times to see if the app became unusable for a user segment. (4) Experiment contamination — while the experiment is 10% of users, the new ranking algorithm could have degraded Feed quality in a way that caused treatment users to churn and spread negative sentiment. (5) External event — check for competitive launches, social media controversies, or holiday effects that could suppress usage. Validation requires isolating each hypothesis with data: compare DAU by platform (iOS/Android/web), by country, by acquisition channel, and by notification-engagement status.',
        keyPoints: [
          'Always rule out instrumentation failure first — a logging bug can mimic a real DAU drop and waste hours of RCA time.',
          'The notification deliverability incident is the most actionable lead; quantify its contribution by segmenting DAU into notification-dependent vs direct-return users.',
          'Segment the drop by platform, geography, and user cohort to triangulate the causal layer (infrastructure vs product vs external).',
        ],
      },
      {
        id: 'q3',
        room: 'metrics',
        label: 'Metrics',
        question: 'You find the DAU drop is concentrated in "notification-driven DAU" — users who in the past 30 days returned exclusively via push notification click, not direct app open. This segment dropped 38% while organic DAU dropped only 2%. How does this change your interpretation? What metrics would you now track to fully understand and monitor this incident?',
        hint: 'Break DAU into return-path segments. Think about what "notification-driven DAU" means for user health — these are likely less-engaged, habit-free users whose retention is entirely mediated by push. What does that mean for your DAU quality metric?',
        modelAnswer: 'This finding is highly diagnostic: the DAU drop is almost entirely explained by a single return-path segment, which strongly implicates the push notification deliverability incident as the primary cause rather than a product quality regression. Users who return only via notification are structurally different from organic openers — they have no app-open habit and their engagement is entirely extrinsically triggered. Their 38% drop matches well with a 40% notification failure rate. The implication for metrics is threefold: (1) track DAU segmented by return path (notification-click, direct open, external link, widget) as an ongoing health signal; (2) create a "notification dependency ratio" — the share of DAU that is notification-driven — as a DAU quality metric, since high notification dependency signals fragile retention; (3) monitor push delivery rate, click-through rate, and conversion-to-session as pipeline health metrics. The 2% drop in organic DAU suggests the product itself is not the issue, which is actually a positive signal that should redirect the investigation entirely to the notification infrastructure.',
        keyPoints: [
          'Segmenting DAU by return path immediately identifies which user behavior is causing the drop, making the RCA tractable.',
          'High notification-dependency is a DAU quality risk signal — these users have no intrinsic habit and will churn when notifications fail.',
          'Push delivery rate and notification-to-session conversion should become tier-1 monitoring metrics after this incident.',
        ],
      },
    ],
    synthesis: 'The three findings converge into a clear recommendation: (1) do not ship the ranking experiment — the SRM invalidates the result and the experiment must be restarted with a fixed allocator; (2) the 15% DAU drop is primarily caused by the notification deliverability incident, not the experiment or a product regression — fix the routing bug and restore notification delivery; (3) add notification-path DAU segmentation and push delivery rate to the permanent monitoring stack so this class of incident can be detected in under 1 hour next time.',
    keyTakeaways: [
      'SRM invalidates an experiment regardless of the p-value — always check allocation before analyzing results.',
      'Global DAU drops during an experiment do not mean the experiment caused the drop; segment and correlate with known incidents first.',
      'Notification-driven DAU is structurally fragile — it is a quantity metric that can mask poor retention quality.',
      'Good RCA separates hypotheses into instrumentation, product, infrastructure, and external buckets before investigating any single thread.',
      'The correct ship/no-ship decision requires both a valid experiment result and a clean platform health baseline — you cannot have either here.',
    ],
    playbookLinks: ['sample-ratio-mismatch', 'dau-decomposition', 'rca-framework'],
  },

  {
    id: 'CHL02',
    title: 'Feature Experiment With Conflicting Metric Signals',
    subtitle: 'Instant Book prominence drives bookings up but host trust and guest satisfaction down — how do you decide?',
    difficulty: 'senior',
    isFree: false,
    rooms: ['stats', 'metrics', 'product-design'],
    estimatedMin: 20,
    company: 'Airbnb',
    tags: ['metric-tradeoffs', 'guardrail-metrics', 'multi-metric', 'host-trust', 'product-judgment'],
    scenario: `Airbnb's Supply team is testing a UI change: Instant Book listings are given a significantly larger card in search results, a top-position boost, and a new "Book instantly — no wait" badge. The hypothesis is that reducing friction in the booking decision will increase conversion and GMV.

The experiment ran for 3 weeks across all US users (n=2.1M per group). The results are in, and they are causing a heated debate in the weekly product review meeting.

Positive signals: Booking conversion rate increased +8% (p=0.01). Revenue per user increased +5.3% (p=0.006). These numbers are clearly significant and the growth team is excited.

Negative signals: Host response rate (the share of inquiries to non-Instant-Book hosts that receive a response within 24 hours) dropped 12%. The hypothesis is that the UI de-emphasis made traditional-request hosts feel their listings were second-class, and some reduced their activity. Guest post-stay review scores fell from 4.71 to 4.68 — a drop of 0.03 points (p=0.08). Repeat booking rate at 90 days has not yet been measured (the experiment is too new).

The product manager wants to ship. The trust & safety team wants to pause. The data science team is asked to make the recommendation.`,
    subQuestions: [
      {
        id: 'q1',
        room: 'metrics',
        label: 'Metrics',
        question: 'Draw the metric tree for this experiment. Which metrics are primary, secondary, and guardrail? Given the results — +8% bookings, +5.3% revenue, -12% host response rate, -0.03 review score — did the experiment succeed or fail?',
        hint: 'Think about what Airbnb ultimately cares about: marketplace health requires both supply quality (hosts engaged and active) and demand satisfaction (guests having great stays). Revenue is a primary metric but so is long-term marketplace trust.',
        modelAnswer: 'The metric tree has three tiers. Primary metrics (directly measuring the experiment hypothesis): booking conversion rate (+8%), revenue per user (+5.3%) — both moved positively and significantly. Secondary metrics (correlated leading indicators of long-term value): repeat booking rate at 90 days (not yet measured), average review score (-0.03, p=0.08), and Instant Book adoption rate. Guardrail metrics (must-not-harm thresholds): host response rate (-12%), host listing count (did any hosts delist?), and platform NPS. The experiment partially succeeded on primary metrics but triggered a guardrail violation on host response rate. A 12% drop in host response rate is a serious supply-side health signal — it suggests non-Instant-Book hosts are becoming less engaged with the platform. In a two-sided marketplace, supply degradation is an existential risk that revenue gains cannot fully compensate for in the short run. The verdict: the primary metrics passed, but the guardrail breach means the experiment cannot ship in its current form without further investigation and mitigation.',
        keyPoints: [
          'Primary metrics (conversion, revenue) are the experiment hypothesis; guardrail metrics (host response rate) are the existential constraints.',
          'A guardrail breach in a two-sided marketplace is a serious failure mode — supply-side degradation can undermine demand-side gains over time.',
          'The review score drop is ambiguous at p=0.08 but directionally negative; it should not be dismissed.',
        ],
      },
      {
        id: 'q2',
        room: 'stats',
        label: 'Statistics',
        question: 'The review score drop has p=0.08. The team argues this is "not significant" and should be ignored. How do you handle this in a multi-metric experiment where you are simultaneously evaluating 5+ metrics? What is the correct statistical framing?',
        hint: 'Think about multiple comparisons correction and the concept of one-tailed vs two-tailed testing. Also consider: with a large n (2.1M), why might p=0.08 still carry weight? What is the Type II error risk here?',
        modelAnswer: 'The "p=0.08 is not significant" argument is statistically naive in this context. First, in a multi-metric experiment evaluating 5+ metrics simultaneously, you face a multiple comparisons problem — if you use alpha=0.05 for each metric independently, the family-wise error rate across 5 tests is 1-(0.95^5) ≈ 23%. To control this, you should apply a Bonferroni correction or use the Benjamini-Hochberg procedure for false discovery rate control. Ironically, multiple comparisons correction would make the review score result even less significant (the adjusted alpha would be ~0.01), but the correct framing is to be honest that the overall experiment has elevated false positive risk. Second, with n=2.1M per group, the experiment has enormous statistical power. A p=0.08 result with this sample size implies a very small effect size — the review score moved 0.03 points on a 5-point scale. The question is not just statistical significance but practical significance: is a 0.03-point review drop economically meaningful for Airbnb? Research shows even small review score drops correlate with future booking rates and host quality. Third, there is a Type II error risk: failing to detect a real negative effect because of insufficient sensitivity on this metric. Given the guardrail breach on host response rate, the directional negative on review scores should be treated as a corroborating signal, not ignored.',
        keyPoints: [
          'Multiple comparisons inflate Type I error risk; p-values across multiple simultaneous tests must be interpreted with correction methods.',
          'With n=2.1M, p=0.08 signals a very small but potentially real effect — practical significance matters as much as statistical significance.',
          'When a guardrail metric is already breached, a directionally negative secondary metric (p=0.08) should be treated as corroborating evidence, not dismissed.',
        ],
      },
      {
        id: 'q3',
        room: 'product-design',
        label: 'Product Design',
        question: 'The feature creates a structural tradeoff: it optimizes short-term booking conversion at the potential cost of long-term host trust and guest satisfaction. How do you frame this tradeoff for leadership? What is your product recommendation?',
        hint: 'Think about Airbnb\'s two-sided marketplace dynamics: the platform only works if both sides are healthy. Frame the decision as a short-term vs long-term value question, and propose a specific design modification that could preserve the booking gains while mitigating the supply-side harm.',
        modelAnswer: 'This is a classic short-term revenue vs long-term marketplace health tradeoff. The correct frame for leadership is: we found a feature that reliably extracts more short-term booking value, but it does so by degrading the host experience — and in a two-sided marketplace, supply quality is the foundation on which demand value is built. A 12% drop in host response rate, if sustained, will reduce the quality and availability of the non-Instant-Book supply pool, which in turn will push more bookings toward a narrower set of Instant Book hosts, reduce price competition, and ultimately harm guest outcomes (less choice, higher prices, lower quality diversity). My recommendation is to not ship the current variant, but to run a follow-up experiment with a modified design: (1) give Instant Book a visual differentiation that communicates speed advantage to guests without visually demoting traditional listings (e.g., a badge rather than a card size change); (2) introduce a "respond within 2 hours" badge for responsive traditional hosts to give them a competitive hook; (3) measure host response rate and listing active days as primary guardrail metrics with pre-registered thresholds. This preserves the legitimate product insight (guests value instant booking signal) while protecting supply health.',
        keyPoints: [
          'Two-sided marketplace health requires both supply and demand metrics; revenue gains that degrade supply quality are not sustainable wins.',
          'The correct recommendation is not ship/no-ship but ship-with-modification — identify which design element caused the host response drop and redesign around it.',
          'Pre-register guardrail thresholds before future experiments so ship/no-ship decisions are mechanical, not political.',
        ],
      },
    ],
    synthesis: 'The conflicting signals resolve into a coherent story: the feature correctly identifies that guests want instant booking clarity, but the implementation over-indexes on that signal by visually demoting traditional hosts, causing a supply-side engagement drop. Ship the insight (instant booking is valued), not the specific implementation. The data science recommendation should be: do not ship current variant due to guardrail breach; design a new variant that separates the "Instant Book badge" value from the "card size promotion" mechanism; re-experiment with host response rate as a primary guardrail with a pre-registered minimum threshold.',
    keyTakeaways: [
      'In two-sided marketplaces, supply-side guardrail metrics (host health) are as important as demand-side primary metrics (bookings).',
      'p=0.08 is not a license to ignore a result — practical significance and directional alignment with other signals both matter.',
      'Multi-metric experiments require pre-registered decision rules to avoid post-hoc rationalization of mixed results.',
      'The right decision is often "ship a better variant" not "ship or kill" — experiments reveal insights about user needs, not just go/no-go verdicts.',
    ],
    playbookLinks: ['guardrail-metrics', 'multi-metric-experiments', 'two-sided-marketplace-metrics'],
  },

  {
    id: 'CHL03',
    title: 'Growth Up, Engagement Down — Diagnosis and Fix',
    subtitle: 'A massive marketing campaign inflated DAU by 18% YoY while destroying retention quality.',
    difficulty: 'staff',
    isFree: false,
    rooms: ['growth-analytics', 'rca', 'estimation'],
    estimatedMin: 25,
    company: 'Google',
    tags: ['growth-accounting', 'acquisition-quality', 'ltv', 'retention-decay', 'campaign-attribution'],
    scenario: `Google Maps ran a major global marketing campaign over Q3 — TV ads, app store featuring, influencer partnerships, and referral bonuses. The campaign budget was $120M. The growth team is reporting a triumph: DAU grew 18% YoY, with new user installs doubling in the campaign period.

However, the product analytics team has been tracking a parallel set of signals that tell a different story. In the 90 days following campaign launch, three metrics have declined materially: session depth (average actions per session) fell from 5.2 to 3.8; day-7 return rate fell from 41% to 34% for campaign-acquired cohorts vs 41% baseline for organic cohorts; and NPS dropped from 52 to 44.

The growth team argues these are normal "dilution effects" from bringing in a broader audience. The product team argues the campaign is acquiring low-quality users who are degrading engagement signals and will have significantly lower LTV than organic users. The CMO wants to run a second campaign at $150M next quarter.

You have been asked to adjudicate the dispute and provide a recommendation on whether to run the second campaign.`,
    subQuestions: [
      {
        id: 'q1',
        room: 'growth-analytics',
        label: 'Growth Analytics',
        question: 'Use the growth accounting framework to decompose the 18% YoY DAU growth. What does "18% growth via acquisition but declining retention" look like in the growth accounting model? Is this a sustainable growth state?',
        hint: 'The growth accounting identity: DAU_t = DAU_{t-1} × retention_rate + new_users + reactivated_users. If retention falls while new users surge, the "bucket" is filling faster but also leaking faster. Model what happens at steady state if both rates persist.',
        modelAnswer: 'In the growth accounting framework, DAU_t = retained_users + new_users + reactivated_users. The 18% DAU growth is driven entirely by new_users doubling from the campaign — the new users term surged while the retention term degraded. Specifically: if DAU was 50M before the campaign, the 18% growth implies 59M DAU. With day-7 return rate falling from 41% to 34% for the campaign cohort (7pp drop), and if 40% of current DAU are campaign-acquired users, the blended retention rate is approximately 0.60×0.41 + 0.40×0.34 = 38.2% vs the organic baseline of 41%. This "leaky bucket" state is not sustainable: the campaign is adding new users at the top of the funnel faster than the retention drain at the bottom, but once the campaign spend stops, new user inflow returns to baseline while the degraded blended retention persists. Within 2–3 cohort cycles post-campaign, DAU will likely retrace toward or below pre-campaign levels. The growth is real today but represents borrowed time, not compounding value. The signal that distinguishes dilution from quality degradation: check whether organic user engagement metrics (session depth, return rate) have also declined, which would indicate the campaign users are pulling down signals in a way that reveals a shared product surface — or if the degradation is purely isolated to campaign cohorts.',
        keyPoints: [
          'Growth accounting makes the "leaky bucket" dynamic visible: surge in new users + retention degradation = temporary DAU inflation that will reverse.',
          'A sustainable growth state requires retention rate × existing_base to grow proportionally with new user additions — this campaign violates that balance.',
          'Isolating organic vs campaign-cohort retention is the key diagnostic to distinguish dilution from a true quality signal.',
        ],
      },
      {
        id: 'q2',
        room: 'rca',
        label: 'Root Cause Analysis',
        question: 'What are the top 3 hypotheses for why campaign-acquired users (day-7 return rate 34% vs organic 41%) behave so differently? How would you validate each hypothesis with data?',
        hint: 'Think about who these users are (campaign targeting), why they installed (ad creative vs organic intent), and what Maps features they actually use. Consider the "job to be done" difference between a user who organically searches for Maps vs a user who installs because of a $5 referral.',
        modelAnswer: 'Hypothesis 1 — Intent mismatch: Campaign users installed due to an extrinsic incentive (referral bonus, ad curiosity) rather than a genuine navigation need. These users have no recurring use case for Maps and therefore do not return. Validation: compare the feature usage distribution in first sessions — organic users should immediately navigate to a real destination, while campaign users may open the app, explore briefly, and close. Check "first navigation completed" rate: campaign vs organic. Hypothesis 2 — Target audience mismatch: The campaign reached users who already use a competitor (Waze, Apple Maps) as their primary navigation tool and have no intention of switching. They downloaded Maps for a one-time use (e.g., a referral incentive). Validation: compare Maps uninstall rate at day-30 by cohort, and cross-reference install source. If campaign users have 3× the uninstall rate, this supports the hypothesis. Hypothesis 3 — Onboarding and product-market fit failure for the campaign audience: The campaign may have targeted a demographic (e.g., older users, non-urban users) for whom Maps\' current feature set (transit, bike, scooter, restaurant discovery) is not relevant, meaning the product doesn\'t serve their actual jobs-to-be-done. Validation: segment day-7 return rate by user demographic attributes (age bracket, urban/suburban/rural based on home location inference) and by device type to see if the gap concentrates in a specific subgroup.',
        keyPoints: [
          'Intent mismatch is the most common cause of acquisition-cohort retention divergence — users installed for a reason that does not create a recurring habit.',
          'Uninstall rate at day-30 is a strong signal of whether the product fit the user, independent of engagement depth.',
          'Segmenting by demographic and geographic profile reveals whether the campaign reached an audience the product can genuinely serve.',
        ],
      },
      {
        id: 'q3',
        room: 'estimation',
        label: 'Estimation',
        question: 'Estimate the long-term LTV delta between organic cohorts and campaign-acquired cohorts. Assume: 5M new users from the campaign, organic day-7 return rate 41% vs campaign 34%, ARPU $2/year for retained users, and that the retention gap persists proportionally across the full user lifecycle. What is the total LTV shortfall? Is the $120M campaign ROI-positive?',
        hint: 'Simplify to: LTV = annual ARPU × expected active years. Expected active years is driven by retention rate — model it as a geometric series. A user with p=0.41 weekly retention has a different expected lifetime than one with p=0.34.',
        modelAnswer: 'To estimate LTV, I will use a simplified retention-decay model. Model retention as a geometric series where each period (quarter) a user either churns or remains. Using quarterly retention proxied from day-7 weekly return rates (scaling approximately): an organic user with 41% weekly return translates to roughly 6–8 quarters of expected active engagement before becoming dormant; a campaign user with 34% return translates to roughly 4–5 quarters. Simplified LTV calculation: Organic LTV ≈ 7 quarters × (ARPU/4 per quarter) = 7 × $0.50 = $3.50 per user. Campaign LTV ≈ 4.5 quarters × $0.50 = $2.25 per user. LTV delta = $3.50 − $2.25 = $1.25 per user. Across 5M campaign users: total LTV shortfall = 5M × $1.25 = $6.25M in foregone lifetime value. However, the campaign also added genuine LTV: 5M users × $2.25 campaign LTV = $11.25M incremental revenue generated. Net incremental value from campaign users: $11.25M. Campaign cost: $120M. ROI = ($11.25M / $120M) − 1 = −90.6%. The campaign is deeply ROI-negative even before accounting for the product experience degradation and NPS decline. A second $150M campaign at the same efficiency would generate approximately $14M in incremental LTV — a $136M loss.',
        keyPoints: [
          'LTV modeling with retention rates reveals that even a 7pp day-7 retention gap compounds into a significant per-user value difference over lifetime.',
          'The campaign is ROI-negative: $120M spend generating ~$11M incremental LTV at campaign-cohort quality. The business case does not hold.',
          'The correct recommendation is to reject the second campaign and redirect budget toward improving day-7 retention for organic cohorts, where the unit economics are positive.',
        ],
      },
    ],
    synthesis: 'The growth accounting decomposition, the RCA hypotheses, and the LTV estimation converge on the same conclusion: the campaign acquired users who do not have a genuine recurring need for Maps, resulting in a retention rate 7pp below organic and an LTV that is ~36% lower per user. At $120M campaign cost against ~$11M incremental LTV, the ROI is approximately −90%. The recommendation is to halt the second campaign, invest in onboarding optimization for the existing campaign cohort to recover some LTV, and redesign campaign targeting around use-case qualification signals (users in car-heavy commute markets without an existing navigation app) rather than broad reach.',
    keyTakeaways: [
      'DAU growth from acquisition spend is only valuable if retention is strong — check the growth accounting decomposition to see if you are filling or draining the bucket.',
      'LTV math often makes "impressive" growth campaigns look deeply ROI-negative when cohort retention differences are factored in.',
      'The correct response to "growth up, engagement down" is not "normal dilution" — it is a quality audit of who you acquired and whether the product serves them.',
      'Recommending against a $150M campaign backed by this data is a high-value staff+ move; the analysis must be airtight and the communication must address the political dynamics.',
    ],
    playbookLinks: ['growth-accounting', 'cohort-retention-curves', 'ltv-models'],
  },

  {
    id: 'CHL04',
    title: 'ML Model Update Causes Segment Regression',
    subtitle: 'Aggregate CTR improved +3% — but new users just lost 18% of their recommendation quality.',
    difficulty: 'staff',
    isFree: false,
    rooms: ['stats', 'rca', 'code'],
    estimatedMin: 25,
    company: 'Netflix',
    tags: ['simpson-paradox', 'segment-analysis', 'ml-regression', 'sql', 'rollback-decision'],
    scenario: `Netflix's Personalization team shipped a new recommendation model — a transformer-based architecture trained on 18 months of watch history — globally to all 250M subscribers. The A/B test prior to launch showed aggregate CTR improved +3% (p<0.001) and streaming hours per user increased +1.8%. The model shipped on a Tuesday.

By Friday, a data scientist on the Growth team notices something alarming while building a routine retention report: CTR for new users (account age <30 days) has dropped 18% post-launch compared to the pre-launch baseline. Meanwhile, veteran users (account age >1 year) show a CTR improvement of +7%. The overall improvement of +3% is a weighted average of a large veteran population improvement masking a severe new-user regression.

The new model was trained on 18 months of watch history. New users, by definition, have little to no watch history. The model was not explicitly tested on this segment before launch. There are currently 8M new users (account age <30 days) on the platform, all experiencing degraded recommendations.

The VP of Product has been notified. The question is: roll back globally, partial rollback for new users, or proceed and iterate?`,
    subQuestions: [
      {
        id: 'q1',
        room: 'stats',
        label: 'Statistics',
        question: 'The overall +3% CTR improvement is statistically significant but the segment results show a reversal (new users −18%, veterans +7%). What statistical concept explains this apparent contradiction? How would you formally test whether the segment difference is statistically significant?',
        hint: 'Think about Simpson\'s Paradox — how can an aggregate go up when a subgroup goes down? Also consider testing the interaction: run a two-sample test comparing new-user CTR delta vs veteran CTR delta, or use a regression model with an interaction term.',
        modelAnswer: 'This is a textbook case of Simpson\'s Paradox: the aggregate metric (CTR +3%) moves in the opposite direction from one subgroup (new users −18%) because the composition of the population creates a weighted averaging effect. Veterans (>1 year) represent the vast majority of 250M users — perhaps 85%+ — and their +7% improvement dominates the aggregate, masking the severe new-user regression. To test whether the segment difference is statistically significant, there are two approaches: (1) Two-sample proportion test comparing new-user CTR before vs after launch — with 8M new users, the sample size is large enough that even a 2% difference would be highly significant, so 18% will give p<<0.001. (2) Regression with interaction term: run CTR ~ model_version × user_tenure_bucket, where the interaction coefficient captures whether the model effect differs by tenure. A significant negative interaction coefficient for the new-user bucket confirms the effect is real. The key insight: you cannot aggregate across heterogeneous user segments when evaluating a model that may have differential effects by data sparsity. The pre-launch A/B test failed to surface this because it also reported aggregate metrics without segment breakdowns.',
        keyPoints: [
          'Simpson\'s Paradox explains how an aggregate can move positively while a subgroup moves negatively — when the subgroup is a small fraction of the total, its signal is drowned out.',
          'The segment difference should be tested with a two-sample proportion test or a regression interaction term, not just directional comparison.',
          'Pre-launch A/B tests must include mandatory segment breakdowns by user tenure, platform, and other known heterogeneity axes to prevent this class of regression.',
        ],
      },
      {
        id: 'q2',
        room: 'rca',
        label: 'Root Cause Analysis',
        question: 'Why would a model that improves aggregate CTR specifically hurt new users? Walk through the 3 most likely technical root causes and how you would validate each.',
        hint: 'Think about what the transformer model is trained on and what new users lack. Consider cold-start problem, popularity bias, and training data distribution shift. What does the model "see" for a user with 0 watch history?',
        modelAnswer: 'Root Cause 1 — Cold-start failure: The transformer model relies heavily on watch history embeddings to generate user representations. New users have sparse or zero watch history, meaning the model produces low-confidence, high-variance recommendations — likely defaulting to globally popular or regionally popular content rather than personalized content. Validation: inspect the distribution of recommended item popularity scores for new users vs veterans — if new users are receiving almost exclusively top-10% popularity items while veterans receive a long-tail distribution, cold-start failure is confirmed. Root Cause 2 — Training data distribution bias: The 18-month training corpus is dominated by veteran user behavior (users who have been on the platform for years generate far more training signal). The model learned to optimize for users with rich history, and its parameters are poorly calibrated for sparse-history users. Validation: compare the model\'s predicted CTR vs actual CTR accuracy (calibration curve) for new users vs veterans — poor calibration for new users (overconfident or systematically wrong) confirms this root cause. Root Cause 3 — Feature importance shift with the new architecture: The previous model may have used explicit collaborative filtering signals that gracefully degrade for new users (e.g., demographic-based cold-start clusters), while the transformer replaced these with learned history embeddings that fail catastrophically when history is absent. Validation: ablation study — run the new model on new users with only the non-history features (demographics, onboarding preferences, browse behavior) to see if CTR recovers.',
        keyPoints: [
          'Cold-start failure is the most likely root cause: transformer models trained on rich history data have no fallback for users with sparse history.',
          'Training data distribution bias means the model\'s parameters are implicitly weighted toward the majority user behavior, underserving minority segments.',
          'Calibration analysis (predicted vs actual CTR by segment) is a fast, model-agnostic diagnostic that surfaces segment-specific failures without re-running the full experiment.',
        ],
      },
      {
        id: 'q3',
        room: 'code',
        label: 'SQL',
        question: 'Write the SQL to detect this pattern. Given tables `events(user_id, event_type, timestamp)` and `users(user_id, created_at)`, compute CTR (click events / impression events) broken down by user tenure bucket (<30 days, 30–365 days, >365 days), for pre-launch vs post-launch periods. Assume launch date is 2024-11-05.',
        hint: 'You need: (1) tenure bucket per user based on account age at time of event, (2) period label (pre vs post), (3) aggregate clicks and impressions per bucket × period, (4) CTR = clicks / impressions. Watch for division by zero.',
        modelAnswer: `WITH tenure_events AS (
  SELECT
    e.user_id,
    e.event_type,
    e.timestamp,
    CASE
      WHEN e.timestamp < '2024-11-05' THEN 'pre_launch'
      ELSE 'post_launch'
    END AS period,
    CASE
      WHEN DATEDIFF('day', u.created_at, e.timestamp) < 30  THEN 'new_user'
      WHEN DATEDIFF('day', u.created_at, e.timestamp) <= 365 THEN 'mid_tenure'
      ELSE 'veteran'
    END AS tenure_bucket
  FROM events e
  JOIN users u ON e.user_id = u.user_id
  WHERE e.event_type IN ('impression', 'click')
    AND e.timestamp BETWEEN '2024-10-01' AND '2024-11-20'
)
SELECT
  tenure_bucket,
  period,
  COUNT(*) FILTER (WHERE event_type = 'impression') AS impressions,
  COUNT(*) FILTER (WHERE event_type = 'click')      AS clicks,
  ROUND(
    1.0 * COUNT(*) FILTER (WHERE event_type = 'click')
        / NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0),
    4
  ) AS ctr
FROM tenure_events
GROUP BY tenure_bucket, period
ORDER BY tenure_bucket, period;`,
        keyPoints: [
          'DATEDIFF between event timestamp and user created_at gives the tenure at time of event — critical to get right when users age across the measurement window.',
          'NULLIF prevents division-by-zero when a bucket has impressions but no clicks (or vice versa).',
          'The output should show the Simpson\'s Paradox clearly: new_user rows show CTR declining post-launch while veteran rows show improvement.',
        ],
      },
    ],
    synthesis: 'The analysis supports a partial rollback: keep the new model for users with account age >30 days (where it improves CTR +7% for veterans and is presumably neutral for 30–365 day users), and fall back to the previous model for new users (<30 days) until a cold-start solution is built. This protects 8M new users from a degraded first experience while preserving the gains for the vast majority of the user base. Going forward, all model launches must include a mandatory segment audit by user tenure before global rollout.',
    keyTakeaways: [
      'Simpson\'s Paradox can make a harmful model change look beneficial in aggregate — always break down results by key user segments before shipping.',
      'Cold-start failure is a predictable failure mode for history-based models; it requires explicit testing and a cold-start fallback strategy.',
      'Partial rollbacks (new model for veterans, old model for new users) are often the right operational decision when segment effects diverge.',
      'SQL for segment analysis is a core staff DS skill — being able to write this query quickly is the difference between detecting regressions in hours vs days.',
    ],
    playbookLinks: ['simpsons-paradox', 'rca-framework', 'experiment-design'],
  },

  {
    id: 'CHL05',
    title: 'New Market Expansion — Size It and Experiment',
    subtitle: 'Should Stripe expand Stripe Tax to 15 EU countries? Estimate the TAM, design the launch, evaluate the results.',
    difficulty: 'staff',
    isFree: false,
    rooms: ['estimation', 'stats', 'product-design'],
    estimatedMin: 30,
    company: 'Stripe',
    tags: ['market-sizing', 'experiment-design', 'holdout', 'expansion', 'b2b-saas'],
    scenario: `Stripe Tax is an automated tax compliance product for online businesses — it calculates, collects, and remits sales tax / VAT automatically. It launched in the US in 2021 and has been growing steadily. The product team is now evaluating expansion to 15 EU countries where Stripe has significant payment processing market share but no Stripe Tax product currently.

The EU expansion would require significant engineering work (country-specific tax rule libraries, VAT compliance integrations, language localization), estimated at 18 months of effort from a 12-person team. Before committing, leadership wants: (1) a market size estimate to validate the revenue opportunity, (2) a phased launch plan that de-risks the bet, and (3) a statistical assessment of early results from a pilot launch.

The product team ran a pilot: 3 countries (Germany, France, Netherlands) went live with Stripe Tax 90 days ago. The remaining 12 EU countries remain in holdout. Early results show a +14% revenue lift in the live countries vs holdout (p=0.07, n=450 companies per group at the time of analysis).

The VP of Finance is asking: is this enough to proceed with the full 15-country rollout?`,
    subQuestions: [
      {
        id: 'q1',
        room: 'estimation',
        label: 'Estimation',
        question: 'Estimate the total addressable market (TAM) for Stripe Tax in the EU — annual revenue potential. Use a bottoms-up approach anchored on EU SMB counts, SaaS penetration, and tax compliance software pricing.',
        hint: 'Start with EU SMB count (~25M businesses), apply filters for digital/online businesses (SaaS or e-commerce), then for those who would need automated tax compliance, then for Stripe TAM (Stripe-processable payments), then price per company per year. Build up layer by layer.',
        modelAnswer: 'Bottoms-up TAM estimation: Layer 1 — EU SMB universe: The EU has approximately 25 million SMEs across 27 countries. Layer 2 — Digital/online businesses: Of these, approximately 15–20% have meaningful online revenue streams (e-commerce, SaaS, digital services). That gives us ~3.75–5M businesses with online sales. Layer 3 — VAT compliance complexity: Businesses selling cross-border within the EU are subject to EU VAT rules and OSS (One Stop Shop) requirements. Roughly 30–40% of online businesses sell cross-border, creating the strongest need for automated compliance — approximately 1.1–2M businesses. Layer 4 — Stripe payment volume addressable market: Stripe processes payments for an estimated 15–20% of online businesses globally. Applying this to EU online businesses gives approximately 170,000–400,000 Stripe-adjacent businesses. Layer 5 — Stripe Tax adoption rate: Among Stripe merchants, adoption of add-on compliance products like Stripe Tax might reach 20–35% over 3 years, yielding 34,000–140,000 customers. Layer 6 — Revenue per customer: Stripe Tax pricing is approximately $0.50 per transaction for low-volume users, or flat annual plans starting ~$500/year for SMBs. Using an average of $800/year: TAM = 87,000 mid-point customers × $800 = ~$70M annual revenue. Range: $27M–$112M. This is a plausible EU TAM for year-3 penetration, which is meaningful for a single product line but requires the 18-month investment to be evaluated against expected margin and strategic value (sticky payment volume, reduced churn).',
        keyPoints: [
          'Layer-by-layer bottoms-up: start with the EU SMB universe, apply digital/online filter, cross-border VAT complexity filter, Stripe share, adoption rate, then price.',
          'The TAM range ($27M–$112M) reflects genuine uncertainty in adoption rate and cross-border SMB share — be explicit about which assumptions drive the range.',
          'At $70M mid-point TAM, the 18-month engineering investment needs to be evaluated against both direct revenue and strategic retention value (Stripe Tax increases switching costs).',
        ],
      },
      {
        id: 'q2',
        room: 'product-design',
        label: 'Product Design',
        question: 'Design the phased launch experiment. Which 3 countries would you launch in first and why? What is your success metric and minimum bar? How long would you run the pilot before deciding to expand to all 15 countries?',
        hint: 'Think about what makes a good first-launch country: market size, regulatory complexity, product readiness, and ability to generate learnings. The pilot must be large enough to generate statistically meaningful signal while small enough to limit downside risk.',
        modelAnswer: 'Country selection criteria: I would select Germany, France, and Netherlands as the first three launch countries based on: (1) Market size — Germany is the EU\'s largest economy and highest Stripe penetration; France is the second-largest SaaS market; Netherlands has high English proficiency (reducing localization risk) and a large fintech ecosystem. (2) Regulatory tractability — all three countries use EU VAT OSS, which Stripe Tax can implement with a single EU-wide integration rather than country-specific rules, reducing engineering complexity for the pilot. (3) Learning potential — these three markets vary enough in customer profile (German B2B focus, French consumer SaaS, Dutch international commerce) that learnings will generalize to the remaining 12 countries. Success metric: primary metric is Stripe Tax attach rate (% of eligible Stripe merchants who activate Stripe Tax within 90 days of availability) with a minimum success bar of 8% attach rate (below this, the product-market fit is weak). Secondary metric: revenue lift per merchant cohort (do merchants using Stripe Tax process more payment volume, suggesting reduced compliance friction?). Timeline: run for 180 days (6 months) before the expansion decision. 90 days is too short — tax compliance decisions are not made quickly by businesses; it takes a full quarter-end for merchants to evaluate whether automated compliance solves a real pain point.',
        keyPoints: [
          'Country selection should maximize learning diversity while minimizing implementation risk — large markets + shared regulatory framework (EU VAT OSS) is the right filter.',
          'Attach rate is the right primary metric for an add-on product: it measures whether the product has genuine pull from the installed base.',
          '180 days is the minimum meaningful signal window for B2B tax compliance — shorter timelines will generate underpowered and misleading signals.',
        ],
      },
      {
        id: 'q3',
        room: 'stats',
        label: 'Statistics',
        question: 'The pilot shows +14% revenue lift in the 3 live countries vs 12 holdout countries (p=0.07, n=450 companies per group). The VP of Finance wants to expand. Should you? What are the statistical concerns with this experiment design?',
        hint: 'Think about unit of randomization (countries vs companies), sample size power, the fact that 3 vs 12 countries is not a proper randomized experiment, and survivorship bias in which countries were selected first. p=0.07 with n=450 in a non-randomized design has multiple interpretation issues.',
        modelAnswer: 'The VP\'s enthusiasm is understandable but the experimental design has serious problems that make expansion premature. Problem 1 — Non-random treatment assignment: The 3 "live" countries were not randomly selected — they were chosen based on the criteria outlined above (largest markets, highest Stripe penetration, regulatory tractability). This means the control group (12 holdout countries) is systematically different from the treatment group, and any revenue difference confounds the Stripe Tax effect with the fact that we deliberately chose the strongest markets first. This is not a valid RCT. Problem 2 — Unit of randomization mismatch: The experiment randomizes at the country level (n=3 treatment, n=12 control) but reports statistical significance at the company level (n=450 per group). This inflates statistical power — the true degrees of freedom are 15 countries, not 900 companies, because all companies within a country are exposed to the same "treatment." A country-level analysis would have n=3 vs n=12 and would not have anywhere near sufficient power to detect a 14% effect. Problem 3 — p=0.07 is borderline and likely over-powered by the wrong unit: Even ignoring the above issues, p=0.07 does not meet conventional alpha=0.05 threshold. The correct recommendation: do not expand to all 15 countries immediately. Instead, randomize a subset of the remaining 12 countries (select 4–5 more at random), run for 180 days, and measure attach rate as the primary metric at the country level with appropriate power calculations.',
        keyPoints: [
          'Country-level treatment with company-level significance testing inflates power — the correct unit of analysis is the country, not the company.',
          'Non-random country selection (cherry-picking the best markets for the pilot) creates selection bias that makes the revenue lift uninterpretable.',
          'p=0.07 with these design flaws is not sufficient to justify a major expansion commitment — the correct action is to improve the experimental design first.',
        ],
      },
    ],
    synthesis: 'The TAM analysis ($27M–$112M) suggests the EU expansion is worth pursuing, but the pilot results are not yet statistically credible due to non-random country selection and unit-of-analysis mismatch. The recommendation to the VP of Finance: approve the expansion plan in principle based on the TAM, but do not use the p=0.07 pilot result as justification — instead, randomize additional country launches over the next 6 months and use attach rate (not revenue lift) as the primary success metric at the country level.',
    keyTakeaways: [
      'Market sizing for B2B SaaS requires layered funnel thinking: total businesses → online businesses → cross-border VAT complexity → Stripe share → adoption rate → ARPU.',
      'Country-level experiments with company-level significance testing are a common but critical methodological error — the unit of randomization determines the degrees of freedom.',
      'A p=0.07 result from a non-randomized design should generate humility, not expansion decisions — design matters as much as p-values.',
      'Phased expansion design should optimize for learning diversity (varied country profiles) and regulatory tractability simultaneously.',
    ],
    playbookLinks: ['market-sizing', 'experiment-design', 'holdout-experiments'],
  },

  {
    id: 'CHL06',
    title: 'Viral Feature with Network Effects Breaks A/B Testing',
    subtitle: 'Uber\'s Ride Together test shows +22% ride frequency — but SUTVA is violated and the number is fiction.',
    difficulty: 'staff',
    isFree: false,
    rooms: ['stats', 'growth-analytics', 'metrics'],
    estimatedMin: 25,
    company: 'Uber',
    tags: ['sutva', 'network-effects', 'interference', 'north-star', 'social-features'],
    scenario: `Uber's Product team is testing "Ride Together" — a feature that lets friends coordinate shared rides. Users can invite friends to join their route, split the fare, and plan pickups for groups. The feature is designed to capitalize on social coordination use cases: going to concerts, airports, or sporting events with friends.

The experiment team ran a standard A/B test: 50% of users in San Francisco were assigned to treatment (can see and use Ride Together), 50% to control (standard Uber experience). After 6 weeks, the results look phenomenal: treatment users show +22% increase in ride frequency vs control. The team is ready to ship globally.

However, a senior data scientist raises a concern in the pre-ship review: "SUTVA is violated. Treatment and control users are in the same city and interact with each other. A treatment user who invites a control user for a Ride Together trip is exposing control users to the feature and potentially generating rides in the control group that wouldn't otherwise occur. The +22% is biased and we don't know in which direction."

The experiment team pushes back: "The effect is so large it must be real regardless of SUTVA violations." The PM asks you to adjudicate.`,
    subQuestions: [
      {
        id: 'q1',
        room: 'stats',
        label: 'Statistics',
        question: 'Explain SUTVA (Stable Unit Treatment Value Assumption) and why this Ride Together experiment likely violates it. What direction does the bias go — does the interference overestimate or underestimate the true effect? How would you redesign the experiment to handle network effects?',
        hint: 'SUTVA requires that treatment of unit i has no effect on outcomes of unit j. Think about what happens when a treatment user invites a control user. There are two interference directions: control users being "uplifted" by treatment users (deflation bias) and treatment users benefiting from network effects that only exist because their social graph friends are also in treatment (inflation bias).',
        modelAnswer: 'SUTVA states that the potential outcome for unit i depends only on the treatment assigned to i, not on the treatments assigned to other units. Ride Together violates this because: (1) A treatment user can directly expose a control user to the feature by initiating a Ride Together invitation — the control user participates in a Ride Together trip even though they were assigned to control. This "spills" treatment into the control group, making control look more like treatment and compressing the measured effect (downward bias, underestimation). (2) The feature\'s value scales with network size — a treatment user whose social graph friends are also in treatment can coordinate rides far more easily than a treatment user whose friends are in control. Because San Francisco users are intermixed, some treatment users have mostly-treatment social graphs (high network value) and others have mostly-control social graphs (low network value). The aggregate effect is a noisy average of these unequal experiences, not the true steady-state effect when everyone is in treatment. The direction of net bias depends on which effect dominates. If control contamination (direction 1) is stronger, the effect is underestimated. If the feature delivers its full value only when most of a user\'s network is in treatment (strong network effects), the current test underestimates the true long-run value. To redesign: use cluster-based randomization. Divide the city into geographic clusters (e.g., neighborhoods) or social network communities and assign entire clusters to treatment or control. This ensures that treatment users have a treated social context and control users are not contaminated. Alternatively, run the experiment in isolated city-level holdouts: Ride Together live in SF, no Ride Together in LA, compare across markets.',
        keyPoints: [
          'SUTVA violation from social feature interference is bidirectional — spillover into control compresses the effect (underestimation), while network value multipliers for users in treatment-dense social graphs may inflate it.',
          'Cluster-based randomization (geographic or social graph clusters) is the standard solution for network effect experiments.',
          'The "effect is so large it must be real" argument is insufficient — a biased estimate can be large and still be wrong about the true causal effect.',
        ],
      },
      {
        id: 'q2',
        room: 'growth-analytics',
        label: 'Growth Analytics',
        question: 'The feature creates direct network effects — the value of Ride Together increases as more of a user\'s friends are on Uber and use the feature. How do you measure the strength of network effects? What metrics capture the "more friends = more value" relationship?',
        hint: 'Think about the connection between a user\'s network size (number of Uber-using friends) and their engagement with the feature. You want a metric that shows the marginal value of each additional friend using the feature. Consider retention curves stratified by network size, and ride frequency as a function of connected-friends count.',
        modelAnswer: 'To measure network effect strength, I would instrument the following metrics: (1) Ride Together trips per user by friend-network size bucket — segment users by how many Uber-active friends they have (0, 1–2, 3–5, 6–10, 10+) and plot Ride Together trip frequency by bucket. If network effects are strong, the curve should be convex (accelerating returns with each additional friend). (2) Ride Together feature adoption rate by friend-network size — what percentage of users with at least one Uber-active friend have completed a Ride Together trip? Compare across network size buckets. If adoption jumps significantly at 3+ friends, the network threshold is identifiable. (3) Day-30 retention broken down by friend-network size — the most powerful network effect signal is whether users with denser Uber networks retain better, specifically on the Ride Together feature. (4) Network-conditional NPS or feature satisfaction — survey treatment users and ask whether they used Ride Together with friends. Cross-tabulate with friend count to estimate the value gradient. (5) Marginal friend value curve — regress ride frequency on friend_count controlling for user tenure, geography, and ride frequency pre-launch. The regression coefficient on friend_count is an estimate of the marginal network value. A coefficient significantly above zero confirms network effects are real and quantifiable.',
        keyPoints: [
          'Stratifying engagement metrics by friend-network size bucket is the core analytical technique for measuring network effect strength.',
          'Convex ride frequency vs friend-count curves signal strong network effects; flat or concave curves suggest the feature value is primarily standalone.',
          'Day-30 retention as a function of connected-friend density is the most predictive long-run signal of whether network effects will compound.',
        ],
      },
      {
        id: 'q3',
        room: 'metrics',
        label: 'Metrics',
        question: 'Design the North Star metric and full metric tree for the Ride Together feature. The feature has both supply effects (pooled routes = lower cost per mile for drivers and riders) and demand effects (social coordination = more rides). How do you capture both sides and avoid metric proliferation?',
        hint: 'Think about what unique value Ride Together creates that existing Uber metrics don\'t capture. The North Star should be specific to the feature\'s value proposition — not just "rides" (which measures all of Uber). Consider a metric that captures the social coordination dimension and the supply efficiency simultaneously.',
        modelAnswer: 'North Star metric for Ride Together: "Coordinated Ride Sessions per Active User per Month" — defined as the number of trips where two or more users planned and completed a Ride Together trip (as opposed to coincidental carpooling). This metric is specific to the feature\'s value proposition (social coordination), distinguishes Ride Together from standard carpool, and is measurable. Metric tree: Level 1 (North Star): Coordinated Ride Sessions / Active User / Month. Level 2 — Demand side: (a) Ride Together invitation send rate — % of active users who invite at least one friend per month; (b) Invitation acceptance rate — % of received invitations that result in a coordinated trip; (c) Group size distribution — % of coordinated trips with 2, 3, 4+ riders (larger groups = higher social coordination value). Level 2 — Supply side: (d) Cost per coordinated mile vs standard ride — measures the supply efficiency gain from route pooling; (e) Driver acceptance rate for Ride Together requests — supply willingness to serve coordinated pickups; (f) Estimated CO2 reduction per month — an externality metric that can be used in regulatory / ESG communications. Level 2 — Quality guardrails: (g) Coordinated trip cancellation rate — if social coordination adds friction, this will spike; (h) Post-trip rating for Ride Together trips vs solo trips — ensures the pooled experience doesn\'t degrade service quality. This tree captures both the demand thesis (more rides via social coordination) and the supply thesis (route efficiency), with guardrails that prevent optimizing North Star at the expense of user experience.',
        keyPoints: [
          'The North Star should be specific to the feature\'s unique value proposition — "coordinated trips" is more precise than "rides" and forces clarity about what success means.',
          'The metric tree must have explicit supply-side efficiency metrics (cost per mile, driver acceptance) alongside demand-side engagement metrics to capture both sides of the value thesis.',
          'Guardrail metrics (cancellation rate, post-trip rating) prevent the team from optimizing coordination volume at the expense of experience quality.',
        ],
      },
    ],
    synthesis: 'The SUTVA violation means the +22% result is likely biased (direction uncertain without additional analysis), and the experiment design is invalid for a feature with network effects. The correct path is: (1) rerun the experiment using city-level holdouts or social cluster randomization; (2) use "coordinated ride sessions per user" as the primary metric rather than overall ride frequency; (3) measure network effect strength via the friend-network size stratification to understand whether the feature needs critical mass to deliver value; (4) the global ship decision should wait for a valid experiment result, but a phased rollout to additional cities is reasonable to gather more network-effect data.',
    keyTakeaways: [
      'SUTVA is violated by any social or network feature tested within a single geography — cluster or market-level randomization is required.',
      'Network effect features demand custom metrics that capture the "more connected friends = more value" thesis, not just aggregate usage.',
      'The North Star metric for a social feature should be specific to the coordination use case, not a general engagement metric that exists without the feature.',
      'Arguing that "the effect is so large it must be real" is not statistical reasoning — large biased estimates are still wrong estimates.',
    ],
    playbookLinks: ['experiment-design', 'network-effects', 'north-star-metrics'],
  },
];

export const challengesCasesById = Object.fromEntries(
  challengesCases.map(c => [c.id, c])
);
