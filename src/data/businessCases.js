// Product Analytics Lab — Business Cases (Cases Room)
export const businessCases = [
  {
    id: 'C01',
    title: 'Should We Launch Same-Day Delivery?',
    subtitle: 'Crafted · Marketplace · Ops Strategy',
    difficulty: 'analyst',
    isFree: true,
    domain: 'marketplace',
    linkedConceptIds: ['guardrail-metric', 'segmentation', 'marketplace-interference'],
    context: {
      company: 'Crafted',
      product: 'Peer-to-peer handmade goods marketplace with 40k active sellers',
      executiveAsk: '"Should we build same-day delivery for our top cities?"',
      pressure: 'Competitor just announced same-day. CEO wants an answer by end of month.',
      ambiguity:
        "We don't know if our buyers want same-day, if sellers can fulfill it, or whether the cost is worth the conversion uplift.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt:
          'Before you start analyzing, what is the real decision that needs to be made here?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Narrow to a specific decision scope: is this "should we pilot same-day in 2 cities?" or "should we build the full platform feature?" The two questions require completely different analyses.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Exactly right. The executive ask bundles together a feasibility question, a cost question, and a build-vs-pilot question. Separating those up front prevents you from doing the wrong analysis. A pilot question needs 2–3 city feasibility data; a full platform build needs a business case with long-term contribution margin modeling.',
          },
          {
            id: 'b',
            label:
              'Determine whether same-day delivery will increase GMV by enough to justify the investment.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'GMV impact is relevant, but this framing skips a crucial prior question: what exactly is being decided? "Should we build the full feature" and "should we run a 2-city pilot" are different decisions with different data requirements. Lock down the scope before modeling impact.',
          },
          {
            id: 'c',
            label:
              'Accept the question as stated and immediately model the revenue impact of same-day delivery across top cities.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              "This jumps to analysis before defining the decision. You'd be modeling the wrong thing. The question is ambiguous between a pilot and a full platform build — those require different time horizons, different data inputs, and different decision thresholds.",
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt:
          'You have narrowed the scope to a pilot question. What is the right primary metric to evaluate success?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Buyer conversion rate uplift for same-day eligible listings AND contribution margin per order (net of delivery cost).',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Correct. Conversion rate uplift tells you if same-day actually changes buyer behavior. Contribution margin per order tells you if the economics work after paying for delivery. You need both — high conversion with negative margin is not a business.',
          },
          {
            id: 'b',
            label: 'GMV or total order volume for same-day orders.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'GMV is a lagging proxy. It will grow if you offer same-day, but it hides cost. A $10M GMV increase that costs $12M to deliver is a failure. You need margin alongside volume.',
          },
          {
            id: 'c',
            label: 'Number of same-day orders placed.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Volume without conversion rate and without margin is the weakest possible signal. It conflates new demand with cannibalized standard orders, and ignores whether the economics are viable.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the most important hypothesis your analysis needs to test?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Same-day delivery converts high-intent buyers who are currently abandoning due to delivery timeline friction — and the margin is positive at scale."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis is testable and directly connected to the decision. It specifies the mechanism (delivery timeline friction causing abandonment), the population (high-intent buyers), and the financial condition that makes it worth building (positive margin at scale). If either half fails, you don\'t build.',
          },
          {
            id: 'b',
            label: '"Same-day delivery will increase revenue for Crafted."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Revenue is likely to increase with any feature that adds buyer convenience. The question is whether it increases it *profitably* and *causally* (not just by cannibalizing standard orders). This hypothesis is too weak to guide a go/no-go decision.',
          },
          {
            id: 'c',
            label: '"Buyers want faster delivery."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is almost certainly true — buyers always prefer faster delivery. But it doesn\'t help you make the decision. The question is whether they\'ll pay for it, whether it converts them, and whether Crafted can make money on it. A hypothesis that\'s trivially true isn\'t useful.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt:
          'What segmentation or data cut is most important before running any experiment?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Segment by (a) delivery-timeline abandonment in checkout exit data, (b) category and item size/weight (feasibility filter), and (c) city-level seller density and self-reported fulfillment readiness.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'These three cuts answer the three unknowns in parallel: (a) tells you whether demand exists among abandoning buyers, (b) tells you which product categories are even feasible for same-day, (c) tells you which cities have seller supply to support it. Without all three, you risk building toward a segment that doesn\'t convert or can\'t fulfill.',
          },
          {
            id: 'b',
            label: 'Segment by buyer location to identify which cities have the most buyers.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'City buyer density matters, but it\'s only one dimension. Without seller-side feasibility and category feasibility, you could be targeting cities where buyers exist but sellers can\'t fulfill. Location alone is necessary but not sufficient.',
          },
          {
            id: 'c',
            label: 'Segment by buyer demographics (age, income) to identify target market.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Demographics are not the relevant cut here. The decision hinges on operational feasibility (can sellers fulfill?) and behavioral signal (are buyers abandoning due to delivery time?). Demographics won\'t tell you either.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt:
          'What is the right analytical approach to build the evidence base for this decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Observational first: analyze abandonment data and seller fulfillment readiness to size the opportunity. Then design a geo-controlled pilot in 2 cities with pre-qualified sellers to get a causal conversion lift estimate.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right two-stage approach. Observational analysis is fast and cheap — it tells you whether the opportunity is large enough to bother piloting. The geo-controlled pilot gives you causal evidence without building full platform infrastructure. Sequencing matters: don\'t run an experiment before you know what you\'re testing.',
          },
          {
            id: 'b',
            label:
              'Run a regression analysis on historical delivery time vs. conversion rate to estimate the conversion uplift.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Regression on observational data gives you correlation, not causation, and confounds many variables (listing quality, category, seller reputation). It\'s a useful input, but it can\'t replace a causal estimate from a controlled pilot before a major infrastructure investment.',
          },
          {
            id: 'c',
            label:
              'Run a company-wide buyer survey asking if they would use same-day delivery.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Stated preference surveys are notoriously unreliable for behavioral predictions. Buyers say yes to everything that sounds convenient. What matters is revealed preference — do they actually convert when the option exists? Surveys can\'t give you that, and they definitely can\'t give you margin data.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt:
          'Based on your analysis, what is the right recommendation structure to bring to leadership?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Run a 2-city pilot with pre-qualified sellers, measure buyer conversion and contribution margin, and set a pre-committed decision threshold before building full platform infrastructure."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right structure: bounded, causal, and financially disciplined. Pre-committing the threshold means leadership can\'t move the goalposts after the pilot. Limiting to pre-qualified sellers avoids building infrastructure before validating demand. This is how good analytics translates to good decisions.',
          },
          {
            id: 'b',
            label:
              '"Launch same-day delivery nationally to compete with the competitor\'s announcement."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Responding to a competitor announcement without validating unit economics is how companies destroy margin. The fact that a competitor launched same-day doesn\'t mean it\'s profitable for them — or for Crafted.',
          },
          {
            id: 'c',
            label:
              '"We need 6 more months of data before we can make a recommendation."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is analysis paralysis. A well-structured 2-city pilot can produce actionable data in 4–6 weeks. Asking for 6 months of data when the CEO wants an answer in a month, and the decision is a pilot (not a full build), is avoiding the decision rather than informing it.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Run a 2-city geo-controlled pilot with pre-qualified sellers. Measure buyer conversion rate uplift and contribution margin per order. Pre-commit to a margin threshold before building full platform infrastructure.',
      reasoning:
        'The question is not whether buyers want faster delivery — they always do. The question is whether Crafted can make money on it and whether the operational supply (sellers who can fulfill) exists. The right analytical sequence is: (1) size the demand signal from abandonment data, (2) filter to feasible categories and geographies based on seller density, (3) pilot with a geo-holdout to get a causal estimate, (4) pre-commit to a contribution margin threshold that justifies full build. Skipping the pilot and building full infrastructure based on competitor pressure is the classic mistake — it creates sunk cost before economics are validated. The 2-city pilot design also protects against the other classic mistake: testing in cities that happen to have the most buyers but not the seller supply to support fulfillment quality.',
      keyFraming:
        "The real question is not 'do buyers want same-day?' (they do) — it's 'can Crafted make money on it, and do we have seller supply to support quality fulfillment?' Scope the decision to a pilot before investing in platform infrastructure.",
      commonMistakes: [
        'Treating competitor announcement as sufficient evidence to build',
        'Measuring GMV without subtracting delivery cost',
        'Running a pilot without pre-committing the success threshold',
        'Targeting high-buyer-density cities without checking seller fulfillment readiness',
        'Conflating "buyers want it" with "it will be profitable"',
      ],
      interviewPhrase:
        '"Before I model the impact, I want to separate the pilot decision from the full-build decision — they need different analyses. For the pilot, the gate is contribution margin positive at the city level, not GMV alone."',
    },
  },
  {
    id: 'C02',
    title: 'Why Did Our Retention Fall?',
    subtitle: 'Orion · Consumer Mobile · Cohort Health',
    difficulty: 'analyst',
    isFree: true,
    domain: 'retention',
    linkedConceptIds: ['cohort-analysis', 'segmentation', 'funnel-decomposition'],
    context: {
      company: 'Orion',
      product: 'Consumer mobile app with 2.1M MAU',
      executiveAsk: '"D30 retention fell from 38% to 31% over the last quarter. Why?"',
      pressure: 'Leadership review in 2 weeks. CEO wants root cause, not just a chart.',
      ambiguity:
        'Could be acquisition mix shift, product regression, external seasonality, notification fatigue, or any combination.',
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt:
          'Before you pull any data, what do you need to clarify about the metric itself?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Define the population and measurement method: is 38→31% measured per acquisition cohort week, or as a blended snapshot across all users on a fixed date? The answer determines the entire analysis approach.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Critical clarification. If it\'s blended across acquisition dates, you could be looking at a mix-shift artifact (more low-retention users acquired recently, pulling the average down) with no actual product regression at all. If it\'s per-cohort, you have a true product signal. Getting this wrong leads you to diagnose the wrong problem.',
          },
          {
            id: 'b',
            label:
              'Understand what changed in the product over the last quarter to correlate with the retention drop.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Product changes are one hypothesis to investigate, but this framing assumes the retention drop is product-caused. The first step is to validate the measurement itself. If the drop is a mix-shift artifact, product changes are irrelevant.',
          },
          {
            id: 'c',
            label:
              'Immediately pull the correlation between major product releases and the D30 retention number over the quarter.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Jumping to product correlation before validating the metric definition and ruling out acquisition mix shift is a common and costly mistake. You could spend a week debugging product changes when the real cause is that a cheaper acquisition channel was opened and filled the funnel with lower-intent users.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt:
          'What is the right way to slice the retention metric to diagnose root cause?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'D30 retention broken out by acquisition cohort week — not blended across acquisition dates — so you can isolate product effect from acquisition mix shift.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Exactly right. Cohort-by-acquisition-week is the foundational cut for any retention diagnosis. If cohorts acquired before and after a product change both show the drop, it\'s likely product. If only newer cohorts dropped, it could be mix shift. If a specific week\'s cohort dropped, it may be a product regression that week.',
          },
          {
            id: 'b',
            label: 'Overall blended D30 retention across all active users.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'The blended number is what triggered the alarm, but it\'s not diagnostic. It can fall for reasons that have nothing to do with product quality. Cohort-level analysis is required before attributing cause.',
          },
          {
            id: 'c',
            label: 'DAU/MAU ratio as a proxy for retention health.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'DAU/MAU is a stickiness metric, not a retention metric. It measures frequency of active users, not whether new cohorts are being retained. It would miss the precise cohort-level signal needed for RCA.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt:
          'What competing hypotheses should you hold simultaneously before looking at the data?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Three competing hypotheses: (a) acquisition mix changed — cheaper channels brought lower-intent users; (b) product regression in a core flow; (c) notification fatigue reducing re-engagement. Rule out mix shift before attributing to product.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right diagnostic frame. Holding all three hypotheses simultaneously prevents confirmation bias (where you look for the thing you expect). The ordering matters: acquisition mix shift is the fastest to rule out and is purely an instrumentation question. Only after ruling it out do you investigate product or engagement hypotheses.',
          },
          {
            id: 'b',
            label:
              '"The product changed and users who experienced the change are retaining at a lower rate."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Possible, but this is a single hypothesis that assumes product causality. You\'re missing the equally plausible acquisition mix and engagement hypotheses. Going in with a single hypothesis leads to anchoring — you\'ll find patterns that support it even if the real cause is elsewhere.',
          },
          {
            id: 'c',
            label: '"Seasonal factors caused the retention drop this quarter."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Seasonality is a real factor but it\'s the weakest hypothesis to lead with because (a) it\'s usually a partial explanation at most, and (b) it\'s hard to act on. Leading with seasonality risks becoming a dead end that doesn\'t generate actionable insight for the CEO.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt:
          'What is the most important segmentation to apply to the cohort retention data?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Segment by (a) acquisition channel within each cohort week (to rule out mix shift), (b) cohort week vs. product release date (to find regression correlation), (c) activated vs. non-activated users within the retention-falling cohorts.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'These three cuts address the three hypotheses in parallel. Channel breakdown kills the mix-shift hypothesis or confirms it. Release-date alignment finds the break point for product regression. Activation status tells you whether the problem is Day 1 (onboarding/activation) or Day 2–30 (engagement). Each cut can rule out or confirm a hypothesis.',
          },
          {
            id: 'b',
            label: 'Segment by geography to see if the drop is concentrated in certain markets.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Geography can be a useful secondary cut if you\'re trying to narrow down a product regression to a region-specific bug, but it\'s not the primary diagnostic cut. It doesn\'t help you distinguish mix shift from product regression.',
          },
          {
            id: 'c',
            label: 'Segment by feature usage overall to find which features correlate with retention.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Feature-retention correlation is an engagement analysis question, not a root-cause-of-decline question. It tells you what correlates with retention in general, not why retention dropped specifically this quarter. This is a common wrong turn.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What analytical method is right for diagnosing this retention drop?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Cohort retention curves by acquisition week, plotted against a product change timeline. Use change-point analysis or visual inspection to identify the break week. Then segment the break cohort by acquisition source and activation status.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This method is right because it directly maps the retention signal to the timeline and lets you find the break point visually or statistically. Overlaying product releases is a standard practice for RCA. Segmenting the break cohort confirms whether it\'s mix or product. It\'s fast, interpretable, and directly answers the CEO\'s question.',
          },
          {
            id: 'b',
            label:
              'Week-over-week aggregate retention chart to show the trend over time.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Aggregate trend shows you the problem but not the cause. Without cohort-level breakdown and acquisition source breakdown, you can\'t distinguish mix shift from product regression.',
          },
          {
            id: 'c',
            label:
              'Run a regression of all user attributes against retention to find the strongest predictors.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Regression on user attributes tells you who retains, not why retention changed. It\'s a discovery tool, not a root-cause tool. It also mixes pre-existing user differences with the change in question.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt:
          'How do you structure the output of this analysis for the CEO in 2 weeks?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"The break is in [cohort week X], isolated to [channel/activation segment]. Likely cause: [mix shift OR product regression]. Validation step: [specific query or test]. If product regression: [team to loop in + quick fix]. If mix shift: [acquisition adjustment]."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right RCA output structure: identify the break precisely, name the likely cause with confidence level, specify validation, and offer the action for each branch. The CEO gets a root cause and a next step — not just a chart. Pre-computing both branches shows rigor and avoids getting stuck waiting for more data.',
          },
          {
            id: 'b',
            label: '"We need to run a test to understand the retention drop before recommending anything."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'RCA is not an experiment — it\'s an observational investigation. You can and should reach a conclusion from the existing data. Asking for an experiment before giving a diagnosis is analysis avoidance. The CEO asked for root cause, not a test plan.',
          },
          {
            id: 'c',
            label: '"Launch a win-back campaign to re-engage churned users while we investigate."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Acting before diagnosing is a classic mistake. If the cause is acquisition mix shift, a win-back campaign does nothing — you\'re targeting users who were never going to retain regardless. If it\'s a product regression, a campaign masks the problem and delays the real fix.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Run cohort retention curves by acquisition week, overlay product change dates, and segment the break cohort by acquisition source. Report: where the break is, what caused it (mix vs. product), and the specific action for each branch.',
      reasoning:
        'Retention RCA has two primary branches: external (acquisition mix shift) and internal (product regression or engagement fatigue). Mix shift is the fastest branch to rule out — it only requires a cohort-by-channel breakdown. If mix shift is ruled out, the next step is to find the specific product change or release that correlates with the retention break week. The activation status cut within the break cohort tells you whether the problem is in onboarding (Day 1–3) or in sustained engagement (Day 4–30), which points to different teams and different fixes. A good RCA for retention should reach a conclusion from observational data within a week — it should not require an experiment or a new survey.',
      keyFraming:
        'Frame the diagnosis before framing the fix. Retention RCA has two branches — mix shift (acquisition) and product regression — and they point to completely different fixes. Rule out mix shift first, because it\'s fastest and because confusing the two leads to wasted effort.',
      commonMistakes: [
        'Jumping to product correlation before validating the metric definition',
        'Using blended D30 retention instead of cohort-by-acquisition-week',
        'Going in with a single hypothesis (usually "product regression") instead of holding multiple',
        'Recommending a win-back campaign before identifying root cause',
        'Asking for an experiment when observational RCA is the right tool',
      ],
      interviewPhrase:
        '"Before I pull any data, I want to confirm whether that 38→31 is measured per cohort or as a blended snapshot — because if it\'s blended, the first thing I\'d check is acquisition mix shift, not product regression."',
    },
  },
  {
    id: 'C03',
    title: 'Should We Replace Tier-1 Support With a GenAI Bot?',
    subtitle: 'Threadline · B2B SaaS · AI Product Strategy',
    difficulty: 'senior',
    isFree: false,
    domain: 'genai',
    linkedConceptIds: ['proxy-metric', 'guardrail-metric', 'metric-gaming'],
    context: {
      company: 'Threadline',
      product: 'B2B project management SaaS with 120k seats across enterprise and SMB',
      executiveAsk:
        '"We want to use AI to deflect 60% of support tickets and cut support headcount by 30%. Can we do this?"',
      pressure:
        'CFO has already modeled cost savings. This is a cost pressure as much as a product decision.',
      ambiguity:
        'Deflection rate is easy to measure but resolution quality is not. Headcount reduction may destroy customer trust in a B2B context where relationships matter.',
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt:
          'The CFO has framed this as a cost-reduction target. How do you reframe the real decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Reframe: the real decision is "can we improve resolution quality AND reduce cost, without harming customer trust for enterprise accounts?" The 60% deflection and headcount framing is a cost target masquerading as a product strategy.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This reframe is the most important analytical move in the case. Deflection is a proxy metric that can be gamed — a bot can deflect a ticket by closing it without resolution. The correct framing separates the cost goal (legitimate) from the quality constraint (non-negotiable in B2B) and forces the product strategy to serve both. Without this reframe, you design toward the wrong metric.',
          },
          {
            id: 'b',
            label:
              'Define what "deflection" means operationally before designing the analysis.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Defining deflection is necessary but not sufficient. The deeper issue is that the entire framing is built around a cost target, not a customer value target. Clarifying the definition without reframing the objective still leaves you optimizing the wrong metric.',
          },
          {
            id: 'c',
            label:
              'Accept the 60% deflection target and design an analysis to show whether the bot can hit it.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'A bot can hit 60% deflection by auto-closing tickets it can\'t handle. That\'s a real risk in this domain. Designing toward a deflection target without a resolution quality gate is how you destroy NPS and churn enterprise customers while technically hitting the CFO\'s number.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt:
          'What is the right primary metric to evaluate whether the GenAI support bot is working?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Resolved contact rate (issue resolved without re-contact within 7 days) plus enterprise CSAT score — both as guardrails that must be maintained alongside any cost reduction.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Resolved contact rate is the quality metric that deflection rate cannot fake: if the user re-contacts within 7 days, the issue wasn\'t resolved. Enterprise CSAT captures the relationship dimension that matters in B2B. Both must be guardrail metrics — not just nice-to-haves — because enterprise churn from trust degradation is catastrophically expensive.',
          },
          {
            id: 'b',
            label: 'Deflection rate — the percentage of tickets that do not escalate to a human agent.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Deflection rate is the metric the CFO is tracking, but it\'s a proxy that can be gamed. A high deflection rate with a high re-contact rate means you\'re just delaying tickets, not resolving them. Deflection rate alone cannot be the primary metric for a B2B product where trust is existential.',
          },
          {
            id: 'c',
            label: 'Tickets handled per agent, to measure productivity improvement.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Tickets per agent measures agent productivity, not bot quality. It can increase even when the bot is doing a poor job — because agents are spending more time on escalations and re-contacts caused by bad bot responses. This metric is the wrong unit of analysis entirely.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt:
          'What is the most defensible and useful hypothesis for this decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"A GenAI bot can handle high-volume, low-complexity tier-1 intents (billing lookup, feature how-to, account reset) at resolution quality ≥ human tier-1 — but cannot handle complex troubleshooting or enterprise relationship issues."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis is specific, testable, and directly operationalizable. It specifies the intent types where a bot can win, the quality standard it must meet (≥ human baseline), and the boundary conditions where it cannot be used. A hypothesis at this level of precision shapes both the pilot design and the decision criteria.',
          },
          {
            id: 'b',
            label: '"AI can handle most support issues at acceptable quality."',
            isCorrect: false,
            level: 'partial',
            feedback:
              '"Most" and "acceptable" are not measurable. This hypothesis can\'t be falsified, which means it can\'t guide a decision. A good hypothesis specifies the population, the threshold, and the condition.',
          },
          {
            id: 'c',
            label: '"AI can replace 30% of support staff by the end of the year."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is a restatement of the CFO\'s cost target, not a hypothesis. It says nothing about quality, customer tier, or intent type. It\'s also backwards — you can\'t test headcount as a hypothesis; you test quality and from that derive what headcount changes are safe.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt:
          'What segmentation is most important before designing the pilot?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Segment existing ticket volume by intent complexity (lookup vs. troubleshooting vs. escalation), account tier (SMB vs. enterprise), and CSAT by intent type. Find where the bot can win on quality, not just volume.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This three-way cut identifies the intersection of "high volume" (worth automating) and "low complexity" (bot can handle) and "low relationship risk" (safe to automate without trust damage). Without this cut, you might pilot the bot on a segment where it\'s most likely to fail — complex enterprise troubleshooting — and draw the wrong conclusion.',
          },
          {
            id: 'b',
            label: 'Segment by ticket volume per category to find the highest-volume support themes.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Volume is a necessary input but not sufficient. A high-volume category that is also high-complexity or enterprise-dominated is the wrong pilot segment, even if it has the most tickets. You need volume AND complexity AND account tier.',
          },
          {
            id: 'c',
            label: 'Segment by agent handle time to find the most time-consuming ticket types.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Handle time is a cost metric, not a quality metric. High-handle-time tickets are often high-complexity tickets — exactly the ones a bot will fail on. Optimizing toward reducing handle time leads you to pilot the bot on the hardest segments first, which is backwards.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt:
          'How should you structure the pilot to get the evidence you need?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Pilot on low-complexity, high-volume intents for SMB tier only. Measure resolved contact rate and CSAT vs. human baseline for 8+ weeks. Keep enterprise accounts on human tier-1 throughout the pilot.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This pilot design is correct on all dimensions: right segment (low-complexity, high-volume), right customer tier (SMB, not enterprise), right measurement (resolved contact rate + CSAT vs. baseline), right duration (8+ weeks to see re-contact patterns). Gating enterprise accounts out of the pilot protects the relationships that matter most for churn risk.',
          },
          {
            id: 'b',
            label:
              'Run an A/B test across all ticket types simultaneously to get the fastest overall signal.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Testing all ticket types simultaneously creates unacceptable risk for enterprise complex tickets where a bot failure can damage a high-value relationship. The speed gain is not worth the downside risk. Segment-first pilot design is slower but safer and more informative.',
          },
          {
            id: 'c',
            label:
              'Deploy the bot to all users and measure outcomes after 90 days.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Full deployment before quality validation is how you churn enterprise customers. 90-day measurement is also too slow — by the time you see churn signal in the data, the damage is done. You need a controlled pilot with a pre-committed quality gate, not a full rollout with post-hoc evaluation.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt:
          'What is the right recommendation to bring to both the CPO and the CFO?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Pilot on SMB tier-1 intents only with a pre-committed quality threshold (resolved contact rate ≥ human baseline, CSAT within 0.3pts). If quality holds, scale to SMB. Keep enterprise on human tier-1. Do not announce headcount targets until pilot validates quality."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation serves both the CFO and the CPO correctly. It gives the CFO a path to cost reduction that is gated on quality (not blind). It protects the CPO from a CSAT collapse in enterprise accounts. Pre-committing the quality threshold prevents goalpost-moving after the pilot. Not announcing headcount targets before quality is validated prevents organizational disruption that poisons the pilot.',
          },
          {
            id: 'b',
            label:
              '"Deploy the bot to all users and evaluate the quality outcome after 6 months."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Full deployment before quality validation, especially for enterprise accounts, is how you trigger churn. 6-month post-hoc evaluation means you won\'t see the damage until it\'s too late to reverse it.',
          },
          {
            id: 'c',
            label:
              '"Deploy the bot company-wide to hit the 60% deflection target and manage CSAT issues reactively."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Designing toward a deflection target without a quality gate, and planning to manage CSAT "reactively," is precisely the mistake this case is designed to catch. Enterprise B2B customers do not give second chances when support quality degrades — they escalate to their account manager and then to churn.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Pilot the bot on SMB tier-1 intents (lookup, how-to, reset) only. Pre-commit: resolved contact rate ≥ human baseline and CSAT within 0.3pts. Gate enterprise accounts out of the pilot entirely. Do not announce headcount targets until quality is validated.',
      reasoning:
        "The CFO's framing — 60% deflection, 30% headcount reduction — is a cost target, not a product strategy. Deflection rate is a proxy metric that can be satisfied by a bot that closes tickets without resolving them. The right frame for a B2B SaaS company is: which intents can a bot resolve at human-quality or better, for which customer tier, and what is the margin of safety for customer trust? Enterprise B2B customers cancel over trust degradation — one bad support experience for a $200k ARR account can trigger churn that costs more than a year of support headcount savings. The pilot must be designed around the segment where the bot can win on quality, not just the segment with the most volume. Headcount decisions should follow quality validation, not precede it.",
      keyFraming:
        "Deflection without resolution is just hiding the problem. The CFO's metric (deflection rate) can be gamed by a bot that closes tickets it can't handle. The right metric is resolved contact rate, and the right constraint is that enterprise accounts are never put at risk in a pilot.",
      commonMistakes: [
        'Accepting deflection rate as the primary success metric',
        'Including enterprise accounts in the initial pilot',
        'Announcing headcount targets before quality is validated (poisons the pilot)',
        'Testing all intent types simultaneously instead of starting with low-complexity',
        'Confusing "deflected" with "resolved"',
      ],
      interviewPhrase:
        '"Before I design toward the 60% deflection target, I want to reframe the success metric — deflection rate can be gamed by a bot that auto-closes tickets. The right gate is resolved contact rate at human-quality baseline, and the right pilot segment is SMB low-complexity intents, not enterprise accounts."',
    },
  },
  {
    id: 'C04',
    title: 'Which Seller Segment Drives the Most Value When Incentivized?',
    subtitle: 'Crafted · Two-Sided Marketplace · Seller Growth',
    difficulty: 'senior',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['segmentation', 'marketplace-interference', 'guardrail-metric'],
    context: {
      company: 'Crafted',
      product: 'Peer-to-peer handmade goods marketplace with 40k active sellers',
      executiveAsk:
        '"We have budget for a seller incentive program. Which sellers should we target to grow GMV?"',
      pressure: 'Growth target is 15% GMV increase this quarter. The incentive budget is $500k.',
      ambiguity:
        "We don't know if incentives work on already-high-performing sellers, new sellers, or mid-tier sellers. Incentivizing sellers can also create SUTVA violations in a marketplace — one seller's gain may displace another's.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt:
          'The executive asked "which sellers to target." What is the real question behind this?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Which segment has the highest marginal GMV uplift per dollar of incentive spend?" High-performing sellers don\'t need incentives — we\'d be paying for behavior they\'d do anyway.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Exactly right. The reframe from "which sellers?" to "where is marginal uplift highest?" changes the entire analysis. Targeting top sellers is the most common mistake: they have the highest GMV, so it\'s tempting, but incentivizing behavior that would happen anyway is pure waste. Marginal uplift per dollar is the only frame that justifies spend.',
          },
          {
            id: 'b',
            label:
              'Identify the sellers with the best seller ratings who are most likely to convert incentives into good buyer experiences.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Quality is a valid secondary consideration, but it doesn\'t answer the core question of marginal uplift. A highly-rated seller who is already at capacity will not produce incremental GMV no matter how you incentivize them.',
          },
          {
            id: 'c',
            label:
              'Target the sellers with the highest current GMV since they generate the most value on the platform.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is the classic mistake. High-GMV sellers are likely already at or near their capacity and intrinsically motivated. Paying them to do what they\'d do anyway is pure budget waste with zero incremental GMV uplift.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt:
          'What is the right metric to measure whether the incentive program is working?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Marginal GMV uplift per $1 of incentive spend, measured at the platform level — not just for incentivized sellers — to account for potential displacement of non-incentivized sellers.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Platform-level GMV is the right unit of analysis because marketplace incentives can displace demand from one seller to another without creating new GMV. If you measure only the incentivized seller\'s GMV, you\'ll see an increase even when total platform GMV is flat or negative. The marginal framing ensures you\'re measuring incremental value, not just value transfer.',
          },
          {
            id: 'b',
            label: 'GMV per incentivized seller, measured over the quarter.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Per-incentivized-seller GMV will almost always show an increase, because you selected active sellers with growth potential. The problem is that it misses displacement: if those sellers took sales from other sellers on the platform, total GMV didn\'t increase. Platform-level measurement is required.',
          },
          {
            id: 'c',
            label: 'Number of orders per incentivized seller.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Order count without revenue or margin is a volume metric. It misses GMV concentration (fewer high-value orders might outperform many low-value ones) and completely ignores displacement.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt:
          'What is the most defensible hypothesis about which segment will respond best to incentives?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Mid-tier sellers (top 20–60% by GMV) have the highest marginal uplift — they\'re active enough to respond but have capacity headroom. Top sellers are at capacity; new sellers lack the conversion skills to translate incentives into GMV."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the mid-tier hypothesis — the standard working hypothesis for marketplace incentive design. Top sellers are at capacity and intrinsically motivated. New sellers have low conversion rates and can\'t convert incentives into GMV. Mid-tier sellers are the "elastic middle": they have the skill and the capacity headroom to respond. This hypothesis is testable and operationalizable.',
          },
          {
            id: 'b',
            label: '"New sellers need the most support and will benefit most from incentives."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'New sellers have the most headroom by definition, but they also have the lowest conversion rates and least marketplace experience. Incentives without conversion skills produce low marginal GMV. This hypothesis is plausible but weaker than the mid-tier hypothesis for pure GMV impact.',
          },
          {
            id: 'c',
            label: '"High-GMV sellers will generate the most incremental GMV because they already have proven demand."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This conflates current GMV with marginal uplift. A seller doing $100k/month who is at capacity will produce near-zero incremental GMV from an incentive. Marginal uplift is a function of capacity headroom and responsiveness, not current volume.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt:
          'How should you segment the seller population before designing the incentive experiment?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Segment by current GMV tier (top 10%, 10–30%, 30–60%, bottom 40%), then analyze: (a) GMV growth rate in past 90 days, (b) sell-through rate as a capacity utilization proxy, (c) historical response rate to platform promotions.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This segmentation directly tests the mid-tier hypothesis. Sell-through rate tells you who has capacity headroom. GMV growth rate tells you who is already on an upward trajectory (and thus may respond to incentives). Historical promotion response rate is the most direct signal of incentive elasticity. Together these three cuts identify the segment where marginal responsiveness is highest before you spend the $500k.',
          },
          {
            id: 'b',
            label: 'Segment by seller product category to find the highest-GMV categories.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Category is a useful secondary cut for understanding feasibility and product type, but it doesn\'t tell you about marginal responsiveness. Two sellers in the same category can have completely different incentive elasticity depending on their tier and capacity utilization.',
          },
          {
            id: 'c',
            label: 'Target sellers with the highest star ratings as a proxy for quality.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Star ratings measure buyer satisfaction, not GMV growth potential or incentive responsiveness. A 5-star seller who is at full capacity produces no incremental GMV from incentives. Ratings are a quality filter, not an uplift filter.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt:
          'How should you design the experiment to measure incentive impact correctly?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Geo-holdout or matched-pair experiment: assign mid-tier sellers to incentive vs. control within geographic markets. Measure PLATFORM-level GMV (not just incentivized seller GMV) to catch displacement. Pre-commit to a minimum GMV/$ threshold.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Geo-holdout is the correct design for marketplace incentive experiments because it avoids SUTVA violation. If you run a standard seller-level A/B test, incentivized and control sellers compete in the same buyer pool — the incentivized sellers will take sales from control sellers, making the incentive look better than it is at the platform level. Geo separation prevents this. Platform-level GMV measurement catches displacement that seller-level measurement misses.',
          },
          {
            id: 'b',
            label:
              'Before/after comparison: measure incentivized sellers\' GMV before and after the incentive period.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Before/after comparison is contaminated by seasonality, trend, and regression to the mean. If you select high-growth-potential sellers (which you should), they\'ll grow regardless — you can\'t attribute that growth to the incentive without a proper control group.',
          },
          {
            id: 'c',
            label:
              'Run a seller-level A/B test: randomly assign sellers to incentive vs. control and compare their GMV after 4 weeks.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Seller-level A/B tests in a marketplace violate SUTVA (Stable Unit Treatment Value Assumption): incentivized sellers compete directly with control sellers in the same buyer pool. The incentivized sellers will redirect buyer demand from control sellers, inflating the apparent uplift. This is one of the most important experimental design concepts in marketplace analytics.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt:
          'What is the right recommendation for deploying the $500k incentive budget?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Target mid-tier sellers (top 20–60% by GMV) based on highest marginal responsiveness. Run a geo-holdout test with platform-level GMV measurement. Pre-commit: if platform GMV/$ < $2.50, do not scale. Keep top-tier sellers in control to detect displacement."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation has all the right elements: right target segment (mid-tier), right experimental design (geo-holdout), right measurement unit (platform GMV), and a pre-committed financial threshold that prevents escalation commitment. Keeping top-tier in control is the displacement detection mechanism.',
          },
          {
            id: 'b',
            label: '"Target all sellers above median GMV to maximize the total addressable incentive impact."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'This includes high-GMV sellers who are at capacity and will produce little to no marginal uplift. You\'re spreading budget across a segment with low expected responsiveness and paying for behavior that would happen anyway.',
          },
          {
            id: 'c',
            label: '"Give the biggest incentives to top-performing sellers to maximize GMV impact."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is the classic top-seller targeting mistake. Top sellers have the highest GMV but the lowest marginal responsiveness. You\'re subsidizing behavior they\'d do regardless. This is how you spend $500k and generate near-zero incremental GMV.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Target mid-tier sellers (top 20–60% by GMV) based on sell-through rate and historical promotion responsiveness. Run a geo-holdout experiment measuring platform-level GMV. Pre-commit to a minimum GMV/$ threshold before scaling.',
      reasoning:
        "The classic mistake is targeting high-performers — you pay for behavior that would happen anyway — or distributing incentives broadly with no marginal signal. The mid-tier hypothesis is the right starting point: these sellers have the conversion skills to respond to incentives and the capacity headroom to actually increase output. The experimental design question is equally important: any marketplace seller incentive test must use geo-holdout, not seller-level A/B, because incentivized sellers compete with control sellers in the same buyer pool. Measuring platform-level GMV is the only way to detect displacement. Pre-committing to a GMV/$ threshold before the test prevents post-hoc rationalization of a marginal result.",
      keyFraming:
        'The question is marginal uplift per dollar, not total GMV. High-performing sellers have the highest GMV but the lowest marginal responsiveness. Any marketplace incentive experiment must use geo-holdout — seller-level A/B creates SUTVA violation that inflates apparent uplift.',
      commonMistakes: [
        'Targeting top sellers (pays for behavior that would happen anyway)',
        'Using seller-level A/B test instead of geo-holdout (SUTVA violation)',
        'Measuring incentivized-seller GMV instead of platform-level GMV (misses displacement)',
        'Not pre-committing to a GMV/$ threshold before the experiment',
        'Ignoring capacity utilization as a filter for identifying responsive sellers',
      ],
      interviewPhrase:
        '"Before designing the incentive allocation, I want to reframe the question from \'which sellers?\' to \'where is marginal uplift per dollar highest?\' — because top sellers are already at capacity, so incentivizing them is pure budget waste. And any marketplace incentive experiment has to use geo-holdout to avoid SUTVA violation."',
    },
  },
  {
    id: 'C07',
    title: 'Should We Raise Prices 20% Across All Tiers?',
    subtitle: 'Threadline · B2B SaaS · Pricing Decision',
    difficulty: 'senior',
    isFree: false,
    domain: 'saas',
    linkedConceptIds: ['segmentation', 'guardrail-metric', 'proxy-metric'],
    context: {
      company: 'Threadline',
      product: 'B2B project management SaaS with $8M ARR across 450 SMB and enterprise customers',
      executiveAsk: '"Should we raise prices by 20% across all tiers at annual renewal?"',
      pressure: 'Investors are pushing for a path to profitability. Current gross margin is 58%, target is 72%.',
      ambiguity:
        "We don't know price elasticity for SMB vs. enterprise, churn risk by tier, whether competitive alternatives are cheaper, or whether the margin gap is a cost problem rather than a pricing problem.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'Before modeling any pricing scenario, what is the most important thing to clarify about the margin problem?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Determine whether the margin gap is a pricing problem or a cost problem — before changing prices at all. A 14-point gross margin gap could be caused by infrastructure over-spend, high support costs, or aggressive discounting, not just insufficient pricing.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right first move. Raising prices to fix a margin problem without first diagnosing whether the problem is revenue-side or cost-side is a common and costly mistake. If the margin gap is driven by infrastructure costs or support overhead, a 20% price increase may produce churn without solving the underlying issue. The first analytical step is a cost structure breakdown.',
          },
          {
            id: 'b',
            label:
              'Identify whether 20% is the right number by benchmarking Threadline\'s pricing against competitors.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Competitive benchmarking is relevant but it is not the first question. You can\'t determine the right price increase without knowing whether the margin problem is even addressable through pricing. Jumping to benchmarks skips the cost-side diagnosis that might reveal a different root cause.',
          },
          {
            id: 'c',
            label:
              'Accept the 20% figure as given and model the revenue impact across all tiers.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Modeling revenue impact before diagnosing the margin structure is analysis in the wrong direction. If costs are the problem, a blanket price increase creates churn risk without fixing margin. The framing of the question needs to be validated before any financial modeling begins.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'What is the right primary metric to evaluate the success or failure of a price increase?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Net Revenue Retention (NRR) — because a successful price increase must grow revenue from existing customers net of churn and downgrades, not just increase sticker prices for customers who then churn.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'NRR is the correct metric because it captures the full effect of a price change: expansion revenue from customers who accept the increase, minus revenue lost from customers who churn or downgrade in response. A price increase that expands ARR from retained customers while triggering disproportionate SMB churn will show a misleadingly positive new ARR number but a declining NRR — which is the signal that matters for long-term health.',
          },
          {
            id: 'b',
            label: 'New ARR added in the quarter following the price increase.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'New ARR only captures one side of the equation. A blanket price increase may boost renewal ARR from retained customers while simultaneously triggering SMB churn. New ARR doesn\'t net out the churn, so it overstates the true impact and can mask a deteriorating retention base.',
          },
          {
            id: 'c',
            label: 'Gross margin percentage, which is the stated target.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Gross margin is the end goal but it is a lagging output metric, not a leading indicator of whether the price change worked. If SMB customers churn in response to the increase, gross margin can improve in the short term while the customer base erodes — which is a false positive. NRR captures the health of the revenue base that gross margin does not.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the central hypothesis that should structure the pricing analysis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Enterprise customers have lower price elasticity than SMB customers — they can absorb a 20% increase with minimal churn, while SMB customers may churn at rates that more than offset the revenue gain from those who stay."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis is specific, testable, and directly actionable. It separates the analysis into two segments with different expected behaviors, which is the only way to evaluate a blanket price increase correctly. Enterprise accounts typically have higher switching costs, longer contracts, and deeper product integration — all of which reduce elasticity. SMB accounts have lower switching costs and more alternatives, which makes them significantly more elastic.',
          },
          {
            id: 'b',
            label: '"A 20% price increase will improve gross margin by approximately 14 points."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'This is an arithmetic projection, not a hypothesis. It assumes zero churn from the increase, which is almost certainly wrong. A real hypothesis must include a behavioral prediction — how will different customer segments respond — not just a revenue calculation.',
          },
          {
            id: 'c',
            label: '"Customers will accept the price increase because the product delivers strong value."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Value delivery and price elasticity are different constructs. Customers can believe a product delivers strong value and still churn when the price crosses their budget threshold — especially in SMB where procurement decisions are made by cost-conscious founders. This hypothesis cannot be tested and does not guide the analysis.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What segmentation is most important before modeling any churn scenarios?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Segment by tier (SMB vs. enterprise) and analyze: (a) historical churn rate by tier, (b) competitive alternative pricing per tier, (c) contract structure (month-to-month vs. annual) as a proxy for switching friction.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'These three cuts directly operationalize the elasticity hypothesis. Historical churn rate by tier tells you baseline churn sensitivity. Competitive pricing data tells you whether SMB customers have affordable alternatives. Contract structure tells you how much switching friction exists — annual contracts with data lock-in imply lower elasticity than month-to-month. Together they build the churn scenario model tier by tier, not as a blended average.',
          },
          {
            id: 'b',
            label: 'Segment by ARR per account to find the highest-value customers to protect.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'ARR per account is a useful input for prioritizing customer success outreach, but it doesn\'t tell you elasticity. A high-ARR SMB account might still be highly price-sensitive if it is on a month-to-month contract with cheap alternatives available. Elasticity requires behavioral and competitive data, not just revenue size.',
          },
          {
            id: 'c',
            label: 'Survey customers about whether they would accept a 20% price increase.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Stated preference surveys are unreliable for price sensitivity measurement. Customers systematically underreport price tolerance in surveys and overreport it in practice — and the reverse. Revealed preference from historical churn and competitive context is the correct analytical approach.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What analytical approach builds the strongest evidence base for this pricing decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Build churn scenario models by tier: for each 5% increment of price increase (5%, 10%, 15%, 20%), estimate the churn-adjusted NRR impact using historical elasticity proxies. Identify the revenue-maximizing price by tier, not a single blended number.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Churn scenario modeling by tier is the correct approach because it acknowledges that the optimal price is different for SMB and enterprise. Using incremental steps rather than a single 20% jump lets you find the revenue-maximizing price for each segment. Historical elasticity proxies (churn rate at previous price changes, competitive win/loss data) are the best available signals without running a live price test, which carries high downside risk.',
          },
          {
            id: 'b',
            label:
              'Run an A/B test: offer 20% higher prices to a random 50% of renewal accounts and measure churn.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'A/B testing prices at renewal is operationally complex and legally risky — it means charging different customers different prices for the same product at the same time. It also takes multiple renewal cycles (months to years) to produce statistically meaningful results. Scenario modeling with historical proxies is faster, lower-risk, and sufficient for a first-pass pricing decision.',
          },
          {
            id: 'c',
            label:
              'Apply the 20% increase uniformly and measure NRR after 2 quarters to evaluate success.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Implementing the full increase without a tiered scenario model exposes the company to worst-case SMB churn before you understand the elasticity profile. Measuring outcomes 2 quarters later means the damage is done before you can intervene. Pre-modeling the scenarios is exactly what prevents this.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right pricing recommendation to bring to leadership?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Implement a tiered price increase: 20% for enterprise (lower elasticity, high switching friction), 5–10% test for SMB with a 90-day churn monitoring window before committing to a larger SMB increase. Do not apply a blanket 20% to SMB without elasticity data."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation is analytically grounded and financially disciplined. It captures the high-confidence revenue opportunity (enterprise) while limiting downside risk (SMB). The 90-day monitoring window with a pre-committed churn threshold prevents over-committing to SMB increases before the behavioral signal is clear. This is also a more credible narrative for investors — it shows pricing discipline rather than a blunt margin-recovery move.',
          },
          {
            id: 'b',
            label:
              '"Raise prices 20% across all tiers simultaneously to hit the margin target as quickly as possible."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'A blanket 20% increase to all tiers ignores the differential elasticity between SMB and enterprise. If SMB churn is significantly higher than modeled, the revenue loss from churn can exceed the revenue gain from retained customers at higher prices — producing a worse margin outcome, not a better one.',
          },
          {
            id: 'c',
            label:
              '"Do not raise prices until we have 12 months of competitive pricing data."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is analysis paralysis. Investors require a near-term margin improvement path. Waiting 12 months for perfect data is not a viable strategy. The scenario model with historical elasticity proxies provides sufficient evidence for a tiered, staged pricing decision without requiring a year of new data collection.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Apply a 20% price increase to enterprise tiers at next renewal cycle. Run a staged 5–10% SMB test with a 90-day churn monitoring window and a pre-committed churn threshold before committing to a full SMB increase.',
      reasoning:
        'The first diagnostic question is whether the margin gap is a pricing problem or a cost problem — a 14-point gross margin shortfall could be partly driven by infrastructure over-spend or high support costs, not just pricing. Assuming it is partially a pricing problem, the key insight is that enterprise and SMB have fundamentally different price elasticities: enterprise accounts have higher switching costs, deeper integrations, and longer sales cycles that create stickiness, while SMB accounts typically have month-to-month contracts and access to cheaper alternatives. A blanket 20% increase ignores this and creates disproportionate SMB churn risk. The financially correct approach is to segment the increase by tier, capture the low-risk enterprise revenue first, and gather elasticity evidence from an SMB test before committing to the full increase.',
      keyFraming:
        "The question is not 'can we raise prices?' — it's 'where can we raise prices without triggering churn that exceeds the revenue gain?' Enterprise and SMB have different elasticities and different switching costs. Any blanket pricing decision ignores the most important segmentation in the analysis.",
      commonMistakes: [
        'Applying a uniform price increase without segmenting by elasticity',
        'Measuring success via new ARR instead of NRR (misses churn offset)',
        'Skipping the cost-side diagnosis before assuming the margin gap is a pricing problem',
        'Using customer surveys to measure price sensitivity instead of behavioral proxies',
        'Failing to pre-commit a churn threshold before rolling out the SMB increase',
      ],
      interviewPhrase:
        '"Before I model the revenue impact, I want to check whether the margin gap is a pricing problem or a cost problem — and if it is pricing, I\'d segment the increase by tier because enterprise and SMB have very different elasticities. A blanket 20% to SMB without elasticity data is how you overshoot and trigger churn that costs more than the revenue you gain."',
    },
  },
  {
    id: 'C08',
    title: 'Should We Build or Buy Our AI Recommendation Engine?',
    subtitle: 'Crafted · Marketplace · Build vs. Buy',
    difficulty: 'senior',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['proxy-metric', 'segmentation', 'guardrail-metric'],
    context: {
      company: 'Crafted',
      product: 'Peer-to-peer handmade goods marketplace with 40k active sellers',
      executiveAsk: '"Should we build an in-house AI recommendation engine or license one from a vendor?"',
      pressure:
        'Conversion rate from search is flat despite growing traffic. Vendor solution costs $180k/year with a 3-month integration. In-house estimate is 2 engineers for 6–8 months.',
      ambiguity:
        "Unknown how much recommendation quality improvement is achievable, whether a vendor solution handles handmade goods' irregular attributes, the true 3-year total cost of in-house, and whether the flat conversion problem is actually caused by recommendations at all.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'Before evaluating build vs. buy, what is the most important prior question to answer?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Determine whether recommendation quality is actually the bottleneck for conversion — if flat conversion is caused by pricing, trust, or logistics friction, a better recommendation engine of any kind will not fix it.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the essential prior question. Build vs. buy is an implementation decision, but the prior decision is whether to invest in recommendations at all. If conversion is flat because buyers find items but then balk at pricing, shipping times, or seller trust signals, improving the recommendation algorithm produces zero uplift regardless of how good it is. Answering this question first prevents a large engineering investment — or $180k/year — in the wrong solution.',
          },
          {
            id: 'b',
            label:
              'Compare the vendor\'s pricing to the in-house cost estimate to find the cheaper option.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Cost comparison is a necessary component of build vs. buy, but it is not the first question. If recommendations are not the bottleneck, the cost comparison is irrelevant — you should not build or buy. The bottleneck diagnosis must come before any cost analysis.',
          },
          {
            id: 'c',
            label:
              'Evaluate whether the vendor\'s recommendation algorithm is technically compatible with Crafted\'s product catalog.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Technical compatibility is a legitimate filter in the build vs. buy evaluation, but it comes after the bottleneck question. Answering technical fit before establishing whether the problem is actually recommendation quality means you could do a thorough technical evaluation and then discover the investment wouldn\'t have moved conversion anyway.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'Assuming recommendations are the bottleneck, what is the right metric to evaluate success?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Conversion rate lift from recommendation-influenced sessions — specifically the percentage of sessions where a buyer clicks a recommendation and completes a purchase, versus matched sessions without recommendation interaction.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This metric isolates the specific mechanism you are trying to improve. Measuring conversion in recommendation-influenced sessions vs. non-influenced sessions with matching gives you the causal contribution of recommendation quality to conversion. It avoids the broader conversion rate, which can be flat for many reasons unrelated to recommendations, and gives you the counterfactual needed to calculate ROI.',
          },
          {
            id: 'b',
            label: 'Overall site conversion rate, since that is the metric that is currently flat.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Overall conversion rate is the symptom you are trying to fix, but it is too broad to be the success metric for a recommendation engine specifically. It is affected by hundreds of factors beyond recommendation quality. Using it as the evaluation metric will produce noisy, inconclusive results that cannot be attributed to the recommendation change.',
          },
          {
            id: 'c',
            label: 'Click-through rate on recommended items, as a proxy for recommendation relevance.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Click-through rate measures relevance but not conversion. A recommendation engine can produce highly clicked items that buyers browse and abandon, which represents zero business value. Relevance without conversion is not the objective — purchase completion is the objective.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the right central hypothesis for the build vs. buy decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"A vendor solution offers faster time-to-value and lower 12-month cost, but may underperform on Crafted\'s irregular handmade catalog — in-house has higher long-term ceiling but requires 8 months of opportunity cost from 2 engineers. The decision depends on which risk matters more."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis correctly frames the decision as a risk tradeoff rather than a pure cost comparison. The vendor\'s advantage is speed and predictable cost; the risk is catalog fit. In-house\'s advantage is catalog customization and long-term control; the risk is opportunity cost and execution uncertainty. A hypothesis that captures both sides of the tradeoff is more useful for decision-making than one that only compares dollar amounts.',
          },
          {
            id: 'b',
            label: '"In-house will be better because we can customize it for handmade goods."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Customization potential is the right instinct for a catalog with irregular attributes, but this hypothesis ignores the opportunity cost of the engineering time and the 6–8 month build timeline. A hypothesis that only states the upside of one option without acknowledging the tradeoffs is not analytically complete.',
          },
          {
            id: 'c',
            label: '"The vendor solution is cheaper so we should use it."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'The vendor\'s first-year cost may be lower, but total cost of ownership over 3 years may favor in-house, especially if the vendor solution requires repeated customization work or if catalog fit is poor. A cost comparison based only on year-one numbers misses the full financial picture and ignores the quality dimension entirely.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What analysis is most critical before committing to either option?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Build a 3-year total cost of ownership model for both paths: vendor (license + integration + annual fees + customization overhead) vs. in-house (2 engineer salaries × 8 months + ongoing maintenance). Include probability-weighted conversion improvement estimates for each path.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'A 3-year TCO model is the right analytical frame because it reveals the true financial comparison across a horizon that includes the initial investment and ongoing costs. The vendor path front-loads costs but avoids engineering opportunity cost; the in-house path defers cost but ties up engineering capacity. Probability-weighting the conversion improvement estimates forces rigor on the question of how confident you are in each path\'s expected outcome — a key input the cost comparison alone misses.',
          },
          {
            id: 'b',
            label: 'Get a demo from 3 recommendation vendors and assess their catalog compatibility.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Vendor evaluation is a necessary step but it is not the most critical analysis at this stage. Before evaluating specific vendors, you need to know the financial framework — TCO and probability-weighted outcomes — so you have criteria to evaluate them against. Demos without a decision framework produce subjective impressions rather than structured comparisons.',
          },
          {
            id: 'c',
            label: 'Ask the engineering team for a more precise in-house build estimate.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Engineering estimates are notoriously unreliable for novel AI builds. A more detailed estimate is marginally useful but it is not the critical analysis. The strategic question — opportunity cost, TCO, catalog fit probability — is more important than shaving uncertainty off the in-house estimate.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What is the right approach to reduce decision risk before fully committing?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'License the vendor solution with a 6-month escape clause. Measure conversion lift in recommendation-influenced sessions at 90 days. If the lift meets the pre-committed threshold, renew; if not, use the data to inform in-house build requirements.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the staged approach that minimizes irreversible commitment. The vendor path produces real conversion data in 3–4 months without consuming engineering capacity. The escape clause limits financial exposure if catalog fit is poor. The data from the vendor trial also informs the in-house specification — you learn what works and what doesn\'t before writing a single line of custom code. This is a particularly good approach when the core question (is recommendation quality the bottleneck?) is still not fully validated.',
          },
          {
            id: 'b',
            label:
              'Begin the in-house build immediately to capture the long-term customization advantage.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Starting in-house immediately is the high-commitment path. If the in-house build takes 8 months and then discovery reveals that recommendation quality was not the conversion bottleneck, you have spent significant engineering opportunity cost with no return. The staged vendor path produces validation data faster at lower irreversible cost.',
          },
          {
            id: 'c',
            label:
              'Choose based on the year-one cost comparison and implement fully from day one.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Year-one cost comparison does not capture opportunity cost or probability-weighted outcomes. Full implementation without a validation phase exposes you to the risk that recommendations are not the bottleneck — a risk that a staged vendor trial would have resolved at much lower cost.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right recommendation to bring to the product and engineering leadership?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"First validate that recommendations are the conversion bottleneck using session-level analysis. If confirmed, license the vendor with a 6-month escape clause, measure conversion lift at 90 days against a pre-committed threshold, and use the result to decide whether to renew or build in-house."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation is correct in structure: it sequences the bottleneck validation before the build vs. buy decision, stages the commitment through the vendor trial, and includes a pre-committed decision threshold that prevents goalpost-moving at 90 days. It also preserves the in-house option — if the vendor does not meet the threshold, the data informs the in-house build rather than being wasted.',
          },
          {
            id: 'b',
            label:
              '"Build in-house because it gives us long-term competitive differentiation."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Competitive differentiation is a real benefit of in-house, but it does not justify skipping the bottleneck validation and the staged approach. The opportunity cost of 2 engineers for 8 months is high, and if conversion is flat for reasons other than recommendation quality, the differentiation argument is moot.',
          },
          {
            id: 'c',
            label:
              '"License the vendor solution immediately since it\'s cheaper and faster."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Licensing without first validating the bottleneck diagnosis and without an escape clause is still a premature commitment. The vendor may produce no conversion lift if recommendations are not the actual problem — or may perform poorly on the handmade catalog. The recommendation must include the validation step and the escape clause.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Validate that recommendation quality is the conversion bottleneck via session-level analysis first. If confirmed, license the vendor solution with a 6-month escape clause, measure conversion lift in recommendation-influenced sessions at 90 days against a pre-committed threshold, and use the result to determine whether to renew or spec the in-house build.',
      reasoning:
        'The most important prior question in this decision is whether recommendation quality is actually the conversion bottleneck — if buyers are abandoning due to pricing, trust, or shipping friction, a better algorithm produces zero lift regardless of whether it is built or bought. Assuming recommendations are the bottleneck, the vendor path offers faster time-to-value and lower 12-month risk, but carries catalog fit uncertainty for irregular handmade goods. The in-house path offers long-term customization ceiling but consumes 8 months of engineering opportunity cost with execution risk. The staged approach — vendor first with an escape clause — resolves both uncertainties: it validates the bottleneck hypothesis quickly and generates real-world data to inform the in-house specification if the vendor fails. Pre-committing the conversion lift threshold at the start of the vendor trial prevents post-hoc rationalization of a marginal result.',
      keyFraming:
        "Build vs. buy cannot be evaluated before answering whether to invest in recommendations at all. If the conversion problem is not a recommendation problem, the correct answer is neither build nor buy. The staged vendor trial with an escape clause is the best way to validate the hypothesis and limit irreversible commitment simultaneously.",
      commonMistakes: [
        'Jumping to build vs. buy without validating that recommendations are the conversion bottleneck',
        'Using overall site conversion rate instead of recommendation-influenced session conversion',
        'Comparing year-one costs without building a 3-year TCO model including opportunity cost',
        'Committing to full in-house build without a vendor trial phase to validate the hypothesis',
        'Failing to include an escape clause in the vendor contract',
      ],
      interviewPhrase:
        '"Before I evaluate build vs. buy, I want to step back and ask whether recommendation quality is actually the conversion bottleneck — because if buyers are abandoning for pricing or trust reasons, we\'d be investing in the wrong solution. Assuming it is the bottleneck, I\'d stage the commitment: vendor first with a 6-month escape clause, measure conversion lift at 90 days, and use that data to decide whether to renew or spec the in-house build."',
    },
  },
  {
    id: 'C09',
    title: 'Should We Expand to Southeast Asia?',
    subtitle: 'Spark · Social · International Expansion',
    difficulty: 'senior',
    isFree: false,
    domain: 'growth',
    linkedConceptIds: ['segmentation', 'guardrail-metric', 'proxy-metric'],
    context: {
      company: 'Spark',
      product: 'Social feed app with 12M DAU, primarily US-focused',
      executiveAsk: '"Should we expand to Southeast Asia — specifically Indonesia and Vietnam?"',
      pressure:
        'US DAU growth has slowed to 3% MoM from 11% six months ago. The board wants geographic diversification by Q3.',
      ambiguity:
        'Unknown regulatory landscape, content moderation requirements in SEA, local competition from TikTok and local apps, infrastructure costs for low-bandwidth regions, viability of the monetization model given structurally lower CPMs in SEA, and required localization depth.',
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'Before sizing the SEA market, what is the most important question to answer about the rationale for expanding?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Determine whether international expansion addresses the actual US growth problem — if US growth is slowing due to product-market fit issues or saturation, launching in SEA adds cost and complexity without fixing the underlying business.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the right framing challenge. Geographic diversification is the board\'s framing, but the underlying problem is slowing DAU growth. If DAU is slowing because of product issues, competitive dynamics, or early platform saturation, expanding to SEA adds organizational complexity and cost without addressing the root cause. The first question is: is international expansion the right solution to this problem, or is the growth problem solvable domestically?',
          },
          {
            id: 'b',
            label:
              'Size the total addressable market in Indonesia and Vietnam to assess the revenue opportunity.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Market sizing is necessary but it is not the first question. Market size is irrelevant if the unit economics of operating in SEA are structurally unattractive — CPMs in SEA are 80–90% lower than in the US, which fundamentally changes the revenue per DAU. Sizing the market before establishing the unit economics frame means you might get excited by a large TAM that generates very little revenue.',
          },
          {
            id: 'c',
            label:
              'Identify which SEA market — Indonesia or Vietnam — has stronger product-market fit signals.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Market selection is a downstream question. Before choosing between Indonesia and Vietnam, the prior question is whether SEA expansion makes financial sense at all given the CPM differential and infrastructure costs. Comparing two markets before establishing the unit economics foundation is working at the wrong level of the decision tree.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'What is the right primary metric for evaluating the financial viability of SEA expansion?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Revenue per DAU in SEA vs. the minimum threshold required to cover incremental infrastructure and localization costs — not raw DAU growth, which can look impressive while generating negligible revenue.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Revenue per DAU is the correct unit economics metric because it normalizes for the structural CPM difference between markets. SEA CPMs are 80–90% lower than US CPMs, meaning a large DAU number in Indonesia can produce a fraction of the revenue that the same DAU count produces in the US. The viability question is whether SEA revenue per DAU can exceed the break-even threshold given the added cost of operating in the market.',
          },
          {
            id: 'b',
            label: 'DAU growth rate in SEA after launch, to demonstrate geographic diversification.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'DAU growth demonstrates market adoption but is a misleading primary metric because it ignores monetization. A 2M DAU market with $0.50 CPM generates far less revenue than a 500k DAU market with $8 CPM. Using DAU growth as the primary KPI creates incentives to optimize for user acquisition in low-monetization markets.',
          },
          {
            id: 'c',
            label: 'Total revenue from SEA in year one, to show absolute contribution.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Absolute year-one revenue is not a useful viability metric because it does not account for the cost of the expansion. A market that generates $2M in year-one revenue while costing $4M in infrastructure, localization, and regulatory compliance is destroying value. The relevant metric is margin contribution, not gross revenue.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the central hypothesis that should structure the SEA expansion analysis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Indonesia represents a large enough addressable DAU pool that, even at structurally lower CPMs, revenue per DAU can exceed the break-even cost of operating in the market — but this depends on ad load optimization and whether Spark\'s engagement model works in low-bandwidth environments."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis is testable, financially grounded, and identifies the two key uncertainties: the CPM-adjusted revenue per DAU threshold and the infrastructure feasibility. It avoids the common trap of assuming that large DAU potential automatically translates into business value, and it specifies the conditions under which the expansion would be viable. These conditions can be analyzed before committing to full launch.',
          },
          {
            id: 'b',
            label: '"SEA has large mobile user populations and strong social media adoption, so Spark will grow rapidly."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'This hypothesis is true but it is not specific enough to guide a financial decision. Large mobile populations are a necessary condition for growth but they do not address monetization viability. Many apps have large DAU in SEA and very low revenue because the CPM environment does not support the same monetization model as the US.',
          },
          {
            id: 'c',
            label: '"Geographic diversification will reduce Spark\'s revenue concentration risk."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is the board\'s framing, not a testable financial hypothesis. Diversification is a strategic goal, but it is not a hypothesis about whether the expansion will create value. A business can diversify geographically while destroying shareholder value if the new markets have unattractive unit economics.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What analysis is most important before committing to a launch in any SEA market?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Build a unit economics model per market: (a) addressable DAU × CPM estimate × ad load → revenue per DAU, (b) incremental infrastructure cost per DAU in low-bandwidth environment, (c) regulatory and localization cost estimate. Find the break-even DAU required to achieve contribution margin positive.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This three-part unit economics model directly answers the viability question. It forces the analysis to confront the CPM differential explicitly rather than burying it in a high-level market sizing exercise. The break-even DAU calculation gives leadership a concrete target: "we need X million DAU in Indonesia within Y months to reach contribution margin positive," which is a more useful decision input than "the TAM is large."',
          },
          {
            id: 'b',
            label: 'Conduct user research in Indonesia and Vietnam to assess appetite for Spark.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'User research can reveal localization requirements and competitive context, but it cannot substitute for the unit economics model. Consumer interest in the product is necessary but not sufficient — many products are popular in SEA markets but do not generate enough revenue per user to cover operating costs. Financial viability must be established before user research drives investment decisions.',
          },
          {
            id: 'c',
            label: 'Benchmark DAU acquisition costs in SEA by looking at competitor spend data.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Acquisition cost is one input to the unit economics model but not the most critical. The CPM differential is the more important factor because it affects the lifetime revenue of every user acquired. Knowing acquisition costs without knowing revenue per user does not tell you whether the unit economics are positive.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'If the unit economics model shows marginal viability, what is the right approach to test before full launch?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Indonesia-first pilot: soft launch with localized content moderation and infrastructure, measure revenue per DAU and 30-day retention at 60 days, compare to the pre-committed break-even threshold before allocating full launch budget.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'A single-market pilot is the right staged approach for international expansion. Indonesia is the right first market due to larger population and established smartphone penetration. The 60-day measurement window gives you enough time to see early monetization and retention signals without committing full localization investment for both markets simultaneously. Pre-committing the break-even threshold prevents organizational pressure from overriding a marginal result.',
          },
          {
            id: 'b',
            label:
              'Launch in both Indonesia and Vietnam simultaneously to maximize geographic diversification quickly.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Simultaneous dual-market launch doubles the organizational complexity and cost without producing incremental learning over a single-market pilot. If both launches underperform, you have committed resources to two markets and have learned less than you would have from a staged Indonesia pilot with a defined decision gate.',
          },
          {
            id: 'c',
            label:
              'Build the full localized product for Indonesia before launching to maximize product quality at launch.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Full localization before launch is the high-commitment, low-learning path. A soft launch with partial localization is sufficient to test the key viability hypotheses — revenue per DAU and retention — before investing in full content localization. The goal of the pilot is to validate the unit economics, not to achieve optimal product quality.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right recommendation to bring to the board?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Run an Indonesia-only pilot with a pre-committed revenue per DAU threshold. If the threshold is met at 60 days, allocate full launch budget. If not, do not proceed to Vietnam. Share the unit economics model with the board before the pilot so the decision criteria are agreed in advance."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation is correct in all dimensions: single market to limit cost, pre-committed threshold to prevent goalpost-moving, board alignment on criteria before the pilot to avoid post-hoc rationalization, and a clear go/no-go gate before the larger Vietnam commitment. Sharing the unit economics model with the board addresses the governance dimension — it makes the financial assumptions transparent before anyone has invested political capital in the outcome.',
          },
          {
            id: 'b',
            label:
              '"Proceed with full SEA expansion immediately to hit the Q3 diversification target."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Board timeline pressure is not a sufficient reason to skip the unit economics validation. A Q3 launch that fails on revenue per DAU is worse for the company\'s position than a Q4 launch with validated economics. The pilot adds 60 days but significantly reduces the risk of a large, underperforming market commitment.',
          },
          {
            id: 'c',
            label:
              '"Do not expand to SEA because CPMs are too low to support the US monetization model."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is too definitive without completing the unit economics analysis. Lower CPMs do not automatically make a market unviable — if infrastructure costs are also lower and acquisition costs are lower, the unit economics may still work at sufficient scale. The pilot is designed to test this, not assume the answer in advance.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Build a unit economics model for Indonesia: addressable DAU × CPM estimate → revenue per DAU vs. break-even cost. If the model shows marginal viability, run a 60-day Indonesia pilot with a pre-committed revenue per DAU threshold before allocating full launch budget or extending to Vietnam.',
      reasoning:
        'The board framing — geographic diversification by Q3 — is a strategic goal, not an analytical justification for expansion. The first question is whether SEA expansion addresses the actual US growth problem or just adds organizational complexity. Assuming it is a valid strategic move, the critical financial insight is that SEA CPMs are 80–90% lower than US CPMs, which means DAU growth does not translate to revenue at the same rate. The unit economics model forces this tradeoff to be explicit before any commitment is made. Indonesia is the right first pilot market because it is the largest SEA market by smartphone users, which maximizes the probability of reaching the break-even DAU threshold. Vietnam can follow if Indonesia validates the model. Sharing the unit economics framework with the board in advance of the pilot aligns decision criteria and prevents pressure to launch based on DAU metrics alone.',
      keyFraming:
        "The danger in international expansion is confusing large user populations with large revenue potential. SEA has massive DAU opportunity but structurally lower CPMs that can make the unit economics unattractive regardless of scale. The right framing is: what revenue per DAU do we need to justify the cost of operating here, and is that achievable in this market?",
      commonMistakes: [
        'Using DAU growth as the primary success metric while ignoring CPM differential',
        'Sizing the TAM without building a per-user unit economics model',
        'Launching in both Indonesia and Vietnam simultaneously without staged validation',
        'Treating board timeline pressure as equivalent to financial validation',
        'Assuming that strong product-market fit in the US transfers to SEA without localization testing',
      ],
      interviewPhrase:
        '"Before sizing the SEA market, I want to build the unit economics model — because SEA CPMs are 80–90% lower than US, which means even 5M DAU may not generate enough revenue to cover the infrastructure and localization cost. The question isn\'t how many users we can get, it\'s what the break-even revenue per DAU is and whether we can hit it."',
    },
  },
  {
    id: 'C10',
    title: 'Where Do We Cut $2M Without Hurting Growth?',
    subtitle: 'Prism · Short-Form Video · Cost-Cutting Analysis',
    difficulty: 'senior',
    isFree: false,
    domain: 'growth',
    linkedConceptIds: ['guardrail-metric', 'segmentation', 'proxy-metric'],
    context: {
      company: 'Prism',
      product: 'Short-form video UGC platform with $12M ARR at Series B',
      executiveAsk: '"We need to cut $2M in annual costs without hurting growth. Where do we cut?"',
      pressure: 'Runway is 14 months. A new fundraise is planned in 6 months and requires a clean unit economics story.',
      ambiguity:
        "Unknown which cost categories are fixed vs. variable, which spending is directly tied to revenue growth, what the cost-per-DAU trend looks like, whether infrastructure or headcount is the larger lever, and what the investor optics are of different types of cuts.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'Before identifying any specific cuts, what is the most important framing question for a cost-cutting analysis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Separate costs into three categories: growth-generating (directly tied to DAU, acquisition, or retention), infrastructure-scaling (variable with usage), and overhead (fixed regardless of growth). Cuts to growth-generating costs have second-order revenue effects; cuts to overhead do not.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This three-way categorization is the foundational analytical move in any cost-cutting exercise. Cutting growth-generating costs — such as performance marketing, growth engineering, or creator acquisition — can look good on a P&L in the short term while destroying the revenue trajectory that investors are buying into. The framework forces every proposed cut to be evaluated not just on its direct cost impact but on its expected effect on future revenue.',
          },
          {
            id: 'b',
            label:
              'Identify the largest cost line items and evaluate which can be reduced the fastest.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Targeting the largest line items is an intuitive starting point, but size alone is not the right criterion. Headcount is typically the largest cost line, but cutting product or growth headcount destroys optionality and signals distress to investors. The analytical framework must weight each cut by its growth contribution, not just its dollar amount.',
          },
          {
            id: 'c',
            label:
              'Ask the CFO which departments have the most budget flexibility.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Budget flexibility is a political input, not an analytical one. The question of which costs have the most flexibility to be cut is different from the question of which costs should be cut. The analytical framework must be built on growth contribution, not departmental politics.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'What is the right success metric for a cost-cutting initiative in a growth-stage company?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Gross margin improvement without DAU regression — measured as the change in contribution margin per dollar of cost cut, with DAU trend as a guardrail metric that must not decline during the cost reduction.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This dual-metric frame is the correct construct for growth-stage cost-cutting. Contribution margin improvement is the direct financial objective. DAU trend as a guardrail ensures that the cost cuts are not buying short-term margin improvement at the expense of the growth story investors are funding. A Series B investor evaluating a fundraise in 6 months will look at both metrics simultaneously.',
          },
          {
            id: 'b',
            label: 'Total cost reduction achieved within 90 days.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Total cost reduction is the tactical output, but it ignores the second-order effect on growth. Cutting $2M from a $12M ARR company is meaningful, but if it reduces DAU growth from 8% to 3% MoM, the fundraise narrative is damaged more than the balance sheet is helped.',
          },
          {
            id: 'c',
            label: 'Headcount reduction as a percentage of total employees.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Headcount percentage is an operational metric, not a financial or growth metric. It conflates cost reduction with organizational disruption and does not distinguish between high-leverage roles (product, growth) and lower-leverage overhead roles. Headcount percentage is a distraction from the real analytical question.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the right hypothesis about where the $2M in cuts should come from?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"The highest-ROI cuts are in (a) infrastructure efficiency — video serving costs that scale with usage but may have optimization headroom — and (b) low-ROI marketing channels that are spending budget without measurable DAU or retention contribution."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis correctly points to the two categories with the highest potential for cost reduction without growth impact. Infrastructure optimization is a technical lever that does not affect product quality or user experience when done well. Marketing channel pruning targets spend with the lowest marginal DAU per dollar, which is identifiable through attribution data. Both levers preserve the growth trajectory while reducing costs — the ideal outcome for a pre-fundraise optimization.',
          },
          {
            id: 'b',
            label: '"Cutting sales and marketing spend will save the most money with the least product impact."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Sales and marketing is a plausible target, but the hypothesis is too broad. High-ROI marketing channels should be preserved; low-ROI channels are the correct cut target. Blanket marketing cuts can damage acquisition pipelines that are generating positive-ROI DAU. The hypothesis needs to distinguish between high- and low-ROI spend within the category.',
          },
          {
            id: 'c',
            label: '"Reducing headcount is the fastest way to hit the $2M target."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Headcount reduction is the fastest lever in dollar terms, but it is the highest-risk lever for a Series B company 6 months from a fundraise. Product and growth headcount cuts signal organizational instability to investors. The hypothesis should start with non-headcount levers and treat headcount as a last resort, not a first move.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What is the most important segmentation to perform before proposing any specific cuts?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Map every cost category against its DAU or revenue contribution: (a) infrastructure cost per DAU vs. industry benchmarks, (b) marketing channel ROI — cost per acquired DAU and 30-day retention by channel, (c) headcount by function vs. revenue-generating leverage.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This three-part mapping directly operationalizes the growth contribution framework. Infrastructure cost per DAU vs. benchmarks reveals optimization headroom without guessing. Marketing channel ROI by acquisition cost and retention identifies the specific channels to cut, not just the aggregate marketing budget. Headcount leverage by function is the most politically sensitive analysis but it is necessary to ensure that any headcount reductions are in overhead, not in product or growth.',
          },
          {
            id: 'b',
            label: 'Pull a full P&L by cost category and rank by size.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'P&L by cost category is a starting point, but ranking by size without layering in growth contribution leads to targeting the wrong items. The largest cost line is typically headcount, and cutting headcount without distinguishing function is one of the most common mistakes in startup cost reduction.',
          },
          {
            id: 'c',
            label: 'Survey department heads about which costs they can reduce.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Self-reported cost reduction potential is subject to organizational bias — departments will protect their own budgets. The analytical framework needs to be built bottom-up from cost-contribution data, not top-down from departmental opinions.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What is the right analytical approach to sequence the $2M of cost cuts?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Prioritize cuts in order of growth impact risk: (1) infrastructure optimization — highest technical confidence, zero user impact; (2) low-ROI marketing channel pruning — measurable ROI, preserves high-ROI channels; (3) vendor and tooling rationalization; (4) headcount only if the first three are insufficient.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This sequencing is correct because it minimizes irreversible decisions. Infrastructure optimization is fully reversible and has no user-facing impact. Marketing channel pruning can be reversed quickly if DAU declines. Vendor rationalization is moderately reversible. Headcount reduction is the most irreversible and most visible to investors, so it should be the last lever. This ordering also builds the cleanest unit economics narrative for the fundraise.',
          },
          {
            id: 'b',
            label:
              'Implement the largest cuts first to reach $2M as quickly as possible.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Speed of achieving the $2M target is a secondary criterion. The primary criterion is growth impact risk. The fastest path to $2M is headcount cuts, but those carry the highest risk to the growth story and the fundraise narrative. The right sequencing puts lowest-risk cuts first, even if they are slower to implement.',
          },
          {
            id: 'c',
            label:
              'Distribute cuts proportionally across all departments to share the pain equally.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Proportional distribution ignores the differential growth contribution of different cost centers. Cutting product and engineering at the same rate as overhead destroys high-leverage capacity while preserving low-leverage spend. Equal pain distribution is a political strategy, not an analytical one.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right recommendation to bring to the CEO and CFO 6 months before the fundraise?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Target $1.2M from infrastructure optimization and low-ROI marketing channel pruning first. Model the remaining $800k from vendor rationalization. Hold headcount flat. Frame the story for investors as \'improving unit economics while sustaining growth\' — not \'cutting costs.\'',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation is correct on both the analytical and narrative dimensions. It sequences cuts from lowest-risk to highest-risk, targets specific categories with analytical support rather than blanket reductions, and frames the investor narrative correctly. Pre-fundraise cost optimization should be positioned as unit economics discipline, not distress management — and the specific cuts chosen (infrastructure and low-ROI marketing) are the most defensible with investors because they do not reduce the team\'s capacity to grow.',
          },
          {
            id: 'b',
            label:
              '"Cut 15% of headcount immediately to achieve $2M quickly and demonstrate financial discipline."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'A 15% headcount cut 6 months before a Series B fundraise sends a distress signal to investors and damages the growth team\'s capacity at a critical moment. Financial discipline can be demonstrated through infrastructure and marketing efficiency without triggering the organizational and narrative damage of a large layoff.',
          },
          {
            id: 'c',
            label:
              '"Pause the cost-cutting initiative until after the fundraise to avoid impacting growth metrics."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Pausing cost optimization until after the fundraise misses the opportunity to improve unit economics before the investor story is told. Infrastructure and marketing channel optimization does not impair growth metrics — these are exactly the cuts that improve the investor narrative. The recommendation should proceed with the low-risk cuts while holding headcount.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Map all cost categories against their DAU and revenue contribution. Target $1.2M from infrastructure optimization and low-ROI marketing channel pruning in the first 90 days. Model the remaining $800k from vendor rationalization. Hold product and growth headcount flat. Frame the fundraise narrative as unit economics improvement, not cost-cutting.',
      reasoning:
        'The analytical frame for cost-cutting in a growth-stage company is marginal revenue per dollar of spend in each category — not total cost by category. Infrastructure and low-ROI marketing are the correct first targets because they have identifiable optimization potential and zero or negative growth impact when pruned correctly. Headcount in product and growth is the highest-cost and highest-leverage category simultaneously, which is why it should be preserved unless the first three levers are insufficient. The fundraise timeline is a critical constraint: cuts that damage the growth trajectory or the team signal are worse for the company\'s Series B valuation than modestly higher operating costs. Pre-committing the cut sequencing in writing before the CFO applies pressure ensures the highest-growth-risk levers are not pulled first.',
      keyFraming:
        "Cost-cutting is not about finding the largest line items — it's about finding the costs with the lowest marginal contribution to growth. Infrastructure optimization and low-ROI marketing channel pruning are the right first levers because they improve unit economics without touching the growth engine. Headcount reductions are a last resort, not a first move, for a company 6 months from a fundraise.",
      commonMistakes: [
        'Targeting headcount first because it is the largest cost line',
        'Making proportional cuts across departments instead of targeting by growth contribution',
        'Cutting high-ROI marketing channels alongside low-ROI ones',
        'Failing to separate infrastructure from headcount in the cost model',
        'Framing the cuts as cost pressure rather than unit economics optimization in investor communications',
      ],
      interviewPhrase:
        '"Before I identify specific cuts, I want to map every cost category against its DAU or revenue contribution — because cutting costs that drive growth is false economy, especially 6 months before a fundraise. The right sequence is infrastructure optimization first, then low-ROI marketing pruning, then vendor rationalization — and headcount only if those three are insufficient."',
    },
  },
  {
    id: 'C11',
    title: 'A Competitor Just Cut Prices 30%. How Do We Respond?',
    subtitle: 'Threadline · B2B SaaS · Competitive Response',
    difficulty: 'senior',
    isFree: false,
    domain: 'saas',
    linkedConceptIds: ['segmentation', 'guardrail-metric', 'proxy-metric'],
    context: {
      company: 'Threadline',
      product: 'B2B project management SaaS with $8M ARR across 450 customers',
      executiveAsk: '"A well-funded competitor just launched at 30% lower price. How do we respond?"',
      pressure: 'The sales team reported 2 lost deals this week citing competitor pricing. The CEO wants a response strategy by end of month.',
      ambiguity:
        "Unknown whether the competitor's lower price is venture-subsidized and unsustainable, what the actual product feature parity is, whether the 2 lost deals were already at risk for other reasons, what the true churn risk is for existing accounts, and whether this is a signal of durable competitive threat or temporary noise.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'The CEO wants a response strategy. What is the most important analytical step before proposing any response?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Distinguish signal from noise: 2 lost deals in one week is not statistically meaningful. The analytical question is whether the win rate has changed over a 90-day window — not whether 2 deals were lost this week.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This is the essential analytical discipline in competitive response decisions. Two lost deals can happen in any week for reasons entirely unrelated to pricing — poor fit, delayed budget, competitive timing. Responding to 2 data points with a pricing strategy change is how companies permanently reduce their margin in response to temporary noise. The 90-day win rate trend is the correct signal window.',
          },
          {
            id: 'b',
            label:
              'Benchmark Threadline\'s pricing against the competitor\'s announced price to understand the gap.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Pricing benchmarking is a necessary input to the competitive response decision, but it is not the first step. The prior question is whether the competitive pricing is actually causing deal losses at a statistically meaningful rate. If it is not, the benchmarking analysis leads to a response for a threat that does not yet exist in the data.',
          },
          {
            id: 'c',
            label:
              'Immediately match the competitor\'s price for all new deals to stop losing sales.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Price-matching before understanding whether the lost deals were price-driven, whether the competitor\'s pricing is sustainable, or whether 2 deals is a real trend permanently reduces Threadline\'s margin in response to anecdotal evidence. This is one of the most expensive competitive mistakes a SaaS company can make.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'What metric most accurately captures the true competitive threat from the new entrant?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Win rate by deal segment (SMB vs. enterprise) over a 90-day rolling window, segmented by whether pricing was cited in loss reasons — to distinguish price-driven losses from other competitive losses.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Win rate with loss reason segmentation is the correct metric because it distinguishes the competitive threat from other sources of deal loss. A declining win rate where pricing is cited in 60% of losses is a very different signal than a declining win rate where pricing is cited in 20% of losses. The 90-day window provides enough data to assess trend vs. noise. Segment-level analysis reveals whether the threat is more acute for SMB (likely) than enterprise.',
          },
          {
            id: 'b',
            label: 'Number of deals lost to the competitor per week.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Raw deal loss count is a starting point but it is too noisy on a weekly basis to be analytically meaningful. It does not normalize for total pipeline volume, does not distinguish price-driven from non-price-driven losses, and does not indicate trend vs. noise. Win rate over a rolling window is the correct normalized metric.',
          },
          {
            id: 'c',
            label: 'Customer churn rate in the 30 days since the competitor\'s announcement.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Existing customer churn in the 30 days after a competitor launch is too short a window to be meaningful — B2B customers on annual contracts do not churn within 30 days of a competitor announcement. The near-term competitive risk is in new deal win rate, not existing account churn, which operates on a longer cycle.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What competing hypotheses should structure the competitive response analysis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Three hypotheses: (a) the competitor is venture-subsidized and pricing is not sustainable — they will raise prices as they grow; (b) the competitor has found a genuine cost advantage and lower prices are durable; (c) the competitor\'s lower price is masking feature gaps that matter to Threadline\'s buyers.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Holding all three hypotheses simultaneously prevents the anchoring error of assuming the competitor\'s lower price is the primary threat. If hypothesis (a) is true, matching prices is a mistake — you\'re permanently reducing margin to compete with a price that will increase later. If hypothesis (c) is true, the response is not a price cut but a feature differentiation message. The hypotheses have different implications for the response strategy, which is why they must be held in parallel.',
          },
          {
            id: 'b',
            label: '"The competitor\'s lower price will cause us to lose significant market share."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'This is a prediction, not a hypothesis set. It anchors on the worst-case outcome and leads directly to reactive price-cutting. A good hypothesis structure holds multiple possibilities — including the possibility that the competitive threat is overestimated — and tests them against data before committing to a response.',
          },
          {
            id: 'c',
            label: '"We need to match the competitor\'s price to remain competitive."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is a conclusion, not a hypothesis. It assumes price is the only competitive dimension and that the competitor\'s pricing is the decisive factor in deal outcomes. It skips the analytical step of determining whether deals are actually being lost for pricing reasons and whether the competitor\'s pricing is durable.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What analysis is most important before designing any competitive response?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Analyze: (a) 90-day win rate trend segmented by loss reason, (b) feature comparison against the competitor\'s published product (what do you have that they do not?), (c) competitor funding history and unit economics profile to assess pricing sustainability.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'These three cuts address the three hypotheses in parallel. Win rate trend with loss reason segmentation tests the magnitude and nature of the competitive threat. Feature comparison reveals whether differentiation messaging is an available response. Competitor funding and unit economics analysis tests the sustainability hypothesis — a well-funded competitor burning cash on customer acquisition is a different threat than one with a genuine cost advantage.',
          },
          {
            id: 'b',
            label: 'Survey current customers to ask if they would consider switching to the competitor.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Customer intent surveys are useful for qualitative context but they are poor predictors of actual churn behavior. Customers regularly say they would consider switching and do not. Win rate data and actual loss reason analysis from the sales team are more reliable signals than stated switching intent.',
          },
          {
            id: 'c',
            label: 'Model the revenue impact of matching the competitor\'s price for all tiers.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Modeling the impact of price matching before establishing whether price is actually the cause of deal losses is analysis in the wrong direction. If deals are being lost for feature or fit reasons, the price match model is modeling a response to the wrong problem.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What is the right analytical approach to build the competitive response evidence base?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Implement structured win/loss analysis for all deals over the next 90 days: log loss reasons at the deal level, track whether the competitor is cited, and segment by deal size. Set a decision threshold in advance: "If win rate drops more than X% with pricing cited in >50% of losses, we revisit our pricing."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'Structured win/loss tracking is the correct method because it converts anecdotal sales reports into statistically meaningful trend data. The pre-committed decision threshold prevents reactive price changes based on week-to-week noise. Setting the threshold before the 90-day window closes prevents goalpost-moving under organizational pressure. This approach is also low-cost and fast to implement — it requires no product changes and no pricing changes.',
          },
          {
            id: 'b',
            label:
              'Immediately conduct an all-hands sales team meeting to gather qualitative competitive intelligence.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Qualitative sales team input is a useful first step for hypothesis generation, but it is subject to recency bias and confirmation bias — the sales team will overweight the 2 deals lost this week. Structured win/loss data over 90 days is more reliable than a one-time qualitative gathering.',
          },
          {
            id: 'c',
            label:
              'Match the competitor\'s price for a 30-day test period and measure the impact on win rate.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'A 30-day price reduction test is extremely difficult to reverse in B2B SaaS — customers who signed at the lower price expect that price at renewal, and the market will learn about the reduction. A price test in B2B is effectively a permanent price change for any customer acquired during the test period. Win/loss tracking is the right method for building evidence; price testing is the wrong tool for this stage of analysis.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right recommendation to bring to the CEO by end of month?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Implement structured win/loss tracking for 90 days with a pre-committed decision threshold. In the interim, arm the sales team with a differentiation playbook — what Threadline has that the competitor does not. Do not change pricing until the win rate trend confirms a structural shift."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation gives the CEO a concrete, immediate action (win/loss tracking and sales differentiation playbook) that is low-risk and high-value. It avoids the premature pricing response that would permanently reduce margin. The differentiation playbook addresses the immediate sales need without a price change. The pre-committed 90-day threshold and decision criteria provide a clear timeline that satisfies the CEO\'s "response by end of month" requirement without being reckless.',
          },
          {
            id: 'b',
            label:
              '"Match the competitor\'s price immediately to protect our pipeline."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Immediate price matching in response to 2 lost deals is the textbook reactive mistake. It permanently reduces Threadline\'s margin, signals to the competitor that Threadline is vulnerable to price pressure, and may not even address the real reason deals are being lost. It also devalues the product in the market before you know whether price was the actual decision factor.',
          },
          {
            id: 'c',
            label:
              '"Wait 6 months to see if the competitor\'s pricing is sustainable before responding."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Six months is too passive — if the win rate is genuinely declining, waiting 6 months allows significant pipeline damage. The 90-day win/loss tracking window is fast enough to detect a real trend while avoiding the reactive error. The sales differentiation playbook is an immediate response that does not require waiting for data.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Implement structured win/loss tracking with loss-reason logging for all deals over the next 90 days. Set a pre-committed decision threshold before the window closes. Arm the sales team with a differentiation playbook in the interim. Do not change pricing until the 90-day win rate data shows a structural shift with pricing cited in a majority of losses.',
      reasoning:
        'Two lost deals in one week is not a statistically meaningful competitive signal — it is the kind of anecdotal evidence that leads companies to permanently reduce their margin in response to temporary noise. The 90-day win rate trend with loss-reason segmentation is the correct analytical tool because it separates real competitive pressure from random variation. The three competing hypotheses — unsustainable venture-subsidized pricing, genuine cost advantage, or feature gap masking — have completely different response implications: if the competitor\'s pricing is venture-subsidized, matching it is a mistake; if they have a feature gap, the response is differentiation messaging rather than price. The differentiation playbook is the highest-leverage immediate action because it addresses the sales team\'s needs right now without any of the irreversible downside of a price change.',
      keyFraming:
        "The biggest risk in competitive response is confusing urgency with signal strength. Two lost deals feels like a crisis but it is not data. Price-matching a well-funded competitor before understanding whether their pricing is sustainable, whether it is causing deal losses at scale, or whether the real differentiator is product rather than price is how you destroy your own margin for a competitor that may not be building a sustainable business.",
      commonMistakes: [
        'Treating 2 lost deals as statistically meaningful trend data',
        'Price-matching before establishing that price is actually the loss driver',
        'Ignoring the sustainability question for the competitor\'s pricing model',
        'Failing to implement structured win/loss tracking before committing to a response',
        'Conflating new deal win rate risk with existing customer churn risk (they operate on different timelines)',
      ],
      interviewPhrase:
        '"Before designing a competitive response, I want to separate signal from noise — 2 lost deals in a week is not a trend. I\'d implement 90-day structured win/loss tracking with loss-reason logging and set a decision threshold before the window closes. In the interim, arm the sales team with a differentiation playbook. We should not touch pricing until the data shows a structural shift."',
    },
  },
  {
    id: 'C12',
    title: 'Should We Sunset the Crafted Local Events Feature?',
    subtitle: 'Crafted · Marketplace · Product Sunset',
    difficulty: 'senior',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['segmentation', 'guardrail-metric', 'cohort-analysis'],
    context: {
      company: 'Crafted',
      product: 'Peer-to-peer handmade goods marketplace with 40k active sellers',
      executiveAsk:
        '"Should we sunset our Crafted Local in-person marketplace events feature, which lets sellers host local pop-up events?"',
      pressure:
        'The feature is used by 2,400 sellers (6% of the seller base) but costs $1.2M/year in ops and support. The CFO wants to cut it.',
      ambiguity:
        "Unknown whether the 2,400 sellers would churn without the feature, how their GMV compares to average sellers, whether these sellers drive disproportionate retention or acquisition for other sellers, what the cost per active user vs. lifetime value looks like, and whether there is a lower-cost version of the feature that preserves the core value.",
    },
    phases: [
      {
        id: 'clarify',
        stepNumber: 1,
        label: 'Clarify the decision',
        prompt: 'Before building any business case, what is the most important thing to clarify about the population at risk?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Clarify who the 2,400 active users actually are — specifically their GMV contribution, churn rate vs. platform average, and whether they have any spillover effect on buyer or seller behavior for other users on the platform.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'The CFO\'s framing treats all 2,400 sellers as equivalent in value — $1.2M cost for 6% of sellers implicitly suggests low ROI. But if these sellers represent 15% of GMV, have 2x platform-average retention, and their events drive buyer discovery for other sellers, the true cost of sunsetting far exceeds $1.2M. The analytical foundation is understanding who these users actually are before any cost-benefit calculation.',
          },
          {
            id: 'b',
            label:
              'Calculate the cost per active user to show how expensive the feature is per seller.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Cost per active user is a useful diagnostic metric, but it answers the wrong question in isolation. $1.2M / 2,400 sellers = $500/seller/year — but if each seller generates $10k/year in GMV on average, that $500 cost looks very different than if they each generate $1k. Cost per user must be paired with value per user before any conclusion is reached.',
          },
          {
            id: 'c',
            label:
              'Accept the CFO\'s framing and focus on whether there is a cheaper way to provide the same feature.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Finding a lower-cost version of the feature is a valid analytical path, but it comes after establishing the value of the user segment. If the 2,400 sellers turn out to have average GMV and no spillover effects, sunsetting may be correct. If they are high-value sellers with spillover effects, the analysis shifts to how to preserve the value at lower cost. The user profile analysis must precede the cost-reduction analysis.',
          },
        ],
      },
      {
        id: 'kpi',
        stepNumber: 2,
        label: 'Choose the right KPI',
        prompt: 'What is the right primary metric to evaluate whether sunsetting the feature is value-positive or value-negative?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Expected lifetime GMV contribution at risk, discounted by the probability of churn — compared to the $1.2M annual cost savings. If (at-risk GMV × take rate × churn probability) > $1.2M, sunsetting destroys value.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This metric is the correct construct because it directly compares the cost savings to the discounted revenue at risk. The churn probability is the key uncertainty — not all 2,400 sellers will churn if the feature is removed. Some may stay because they use other Crafted features. Discounting the at-risk GMV by churn probability gives a realistic expected revenue impact, which can be compared to $1.2M with a clear decision rule.',
          },
          {
            id: 'b',
            label: 'Annual cost savings from sunsetting: $1.2M.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'The $1.2M is the savings figure, not the decision metric. It is only meaningful in comparison to the revenue at risk. A cost saving that is offset by $3M in at-risk GMV contribution is not a saving — it is a value-destroying decision. Cost savings must always be evaluated against the revenue consequences of the action.',
          },
          {
            id: 'c',
            label: 'Feature adoption rate: the percentage of the seller base that uses Crafted Local.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Adoption rate (6% of sellers) is the starting context, not the decision metric. Low adoption rate does not indicate low value — these 6% of sellers might represent a disproportionately high share of GMV. Using adoption rate as the metric conflates breadth of adoption with depth of value, which is a fundamental measurement error for niche but high-value features.',
          },
        ],
      },
      {
        id: 'hypothesis',
        stepNumber: 3,
        label: 'Form the key hypothesis',
        prompt: 'What is the right central hypothesis to structure the product sunset analysis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Crafted Local users are disproportionately high-GMV sellers with above-average retention, meaning the expected churn cost exceeds the $1.2M savings — but a minimum viable event-discovery feature could preserve 70–80% of the retention value at a fraction of the cost."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This hypothesis does two things correctly: it predicts that the full sunset is value-destructive (a testable prediction), and it opens the alternative path of a lower-cost version rather than a binary sunset-or-keep decision. The "minimum viable event-discovery" framing is the analytical move that prevents the false binary — it creates a third option that can be evaluated alongside the other two.',
          },
          {
            id: 'b',
            label: '"2,400 sellers is a small enough segment that most will stay on the platform even without Crafted Local."',
            isCorrect: false,
            level: 'partial',
            feedback:
              'This hypothesis assumes that low feature adoption implies low feature importance, which is frequently wrong for niche features used by high-value segments. The hypothesis is plausible but it is not grounded in the GMV and retention data that would confirm or deny it. Starting with this hypothesis risks anchoring on the CFO\'s framing without testing it.',
          },
          {
            id: 'c',
            label: '"The $1.2M cost is too high for a feature used by only 6% of sellers, so it should be cut."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is the CFO\'s conclusion stated as a hypothesis. It cannot be falsified because it is a value judgment rather than a testable prediction. The correct analytical hypothesis must specify what the data would need to show to confirm or deny the sunset decision — not restate the conclusion that prompted the analysis.',
          },
        ],
      },
      {
        id: 'data_cut',
        stepNumber: 4,
        label: 'Pick the critical data cut',
        prompt: 'What segmentation is most important before building any sunset recommendation?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Analyze the 2,400 Crafted Local sellers vs. a matched control of non-Local sellers on: (a) average GMV per seller, (b) 12-month retention rate, (c) new buyer acquisition rate (do Local events bring new buyers to the platform?), (d) cross-sell to other Crafted features.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This matched comparison directly tests whether Crafted Local sellers are disproportionately high-value in ways that would not be visible from adoption rate or cost figures alone. New buyer acquisition rate is particularly important — if Local sellers bring new buyers to the platform through their events, the feature is generating acquisition value that does not appear in any seller-level GMV metric. Matching to a control group controls for the possibility that the most motivated sellers self-select into Crafted Local regardless of its value.',
          },
          {
            id: 'b',
            label: 'Break down the $1.2M cost by category to find the largest operational cost drivers.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'Cost breakdown is useful for identifying the minimum viable version alternative, but it should come after the user value analysis. If the Crafted Local sellers turn out to be average in GMV and retention, the cost breakdown informs a cost reduction plan. If they turn out to be high-value, the cost breakdown informs how to preserve their value at lower cost — a different analytical use case.',
          },
          {
            id: 'c',
            label: 'Survey Crafted Local sellers to ask if they would leave the platform if the feature was removed.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Stated churn intent surveys are unreliable for actual churn prediction — sellers will systematically overstate their intention to leave in surveys to preserve a feature they value. Behavioral proxies (retention rate, GMV trend, feature engagement depth) are more reliable than stated intent. Surveys can be a supplementary input but should not be the primary data cut.',
          },
        ],
      },
      {
        id: 'method',
        stepNumber: 5,
        label: 'Choose the analysis method',
        prompt: 'What analytical framework best structures the sunset vs. keep vs. reduce cost decision?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              'Build a three-option decision matrix: (1) full sunset — model expected GMV at risk × churn probability vs. $1.2M savings; (2) minimum viable feature — identify which 20% of the $1.2M cost drives 80% of seller value, build a lower-cost version; (3) status quo — baseline. Compare all three on contribution margin impact.',
            isCorrect: true,
            level: 'strong',
            feedback:
              'The three-option decision matrix is the correct analytical framework because it prevents the false binary of sunset vs. keep. The minimum viable feature option is often the value-maximizing outcome in product sunset decisions — it preserves the seller retention and GMV value while eliminating the cost components that are not generating seller retention (e.g., physical logistics support vs. event-discovery tools). Comparing all three on contribution margin provides a common financial basis for the leadership decision.',
          },
          {
            id: 'b',
            label:
              'Run a small-scale test: remove the feature for 5% of Crafted Local sellers and measure churn.',
            isCorrect: false,
            level: 'partial',
            feedback:
              'A controlled churn test is a legitimate analytical method, but it requires careful design — randomly removing a feature from active users raises ethical and trust issues. It is also slower than the decision matrix approach and may not be necessary if the GMV and retention analysis from the matched comparison already provides sufficient confidence in the churn probability estimate.',
          },
          {
            id: 'c',
            label:
              'Sunset the feature with a 3-month deprecation notice and measure churn afterward.',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Implementing the sunset before completing the value analysis is the analytical equivalent of running the experiment after making the decision. Post-hoc measurement of churn does not provide decision-relevant information — the sunset has already been announced and cannot be easily reversed. The analysis must precede the decision, not follow it.',
          },
        ],
      },
      {
        id: 'recommend',
        stepNumber: 6,
        label: 'Structure the recommendation',
        prompt: 'What is the right recommendation to bring to the CFO and product leadership?',
        type: 'single',
        options: [
          {
            id: 'a',
            label:
              '"Complete the GMV and retention analysis on the 2,400 Crafted Local sellers before any sunset decision. If the at-risk GMV × churn probability exceeds $1.2M, recommend the minimum viable event-discovery alternative. If not, proceed with a structured deprecation with migration support."',
            isCorrect: true,
            level: 'strong',
            feedback:
              'This recommendation is correct in structure: it gates the sunset decision on the value analysis rather than the cost figure, it proposes the minimum viable alternative as the likely value-preserving option, and it provides a clear decision rule for the CFO — if the expected revenue at risk exceeds the cost savings, the full sunset is value-destroying. The structured deprecation with migration support is the responsible path if the analysis supports sunsetting.',
          },
          {
            id: 'b',
            label:
              '"Sunset the feature immediately to capture the $1.2M savings before the next board meeting."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'Sunsetting before completing the value analysis is the most common product sunset mistake. If these 2,400 sellers represent 15% of GMV and have 2x retention rates, the $1.2M in savings may come at a cost of $3–5M in lost GMV contribution. The board meeting timeline is not a sufficient reason to skip the analytical step.',
          },
          {
            id: 'c',
            label:
              '"Keep the feature as-is because seller retention is always more important than cost savings."',
            isCorrect: false,
            level: 'wrong',
            feedback:
              'This is an ideological position, not an analytical recommendation. Seller retention is important, but $1.2M is a real cost, and if these sellers have average GMV and average retention rates, the feature may not be worth its cost. The analysis should determine the recommendation — not a blanket principle about retention.',
          },
        ],
      },
    ],
    seniorAnswer: {
      recommendation:
        'Run the GMV and retention analysis on the 2,400 Crafted Local sellers vs. a matched control before any sunset decision. If their expected churn-adjusted GMV contribution exceeds the $1.2M cost savings, recommend a minimum viable event-discovery feature that preserves retention value at a fraction of the cost. Only proceed with full sunset if the analysis shows average-or-below GMV and retention profiles.',
      reasoning:
        'The CFO\'s framing — $1.2M cost for 6% of sellers — treats adoption rate as a proxy for value, which is a fundamental measurement error for niche features. The first analytical question is whether these 2,400 sellers are disproportionately high-value in GMV, retention, and buyer acquisition effects. If they are, the true cost of sunsetting can be 3x the $1.2M in direct savings once churn-adjusted lifetime GMV is modeled. The minimum viable feature option is the key analytical insight: it breaks the false binary of sunset vs. keep by asking what the minimum set of capabilities is that preserves the retention value at a fraction of the current operational cost. Product sunset decisions must always quantify the LTV of the at-risk segment before comparing it to the cost figure — cost-only framing is how companies destroy high-value user segments to hit short-term cost targets.',
      keyFraming:
        "Product sunset decisions require quantifying the LTV of the at-risk user segment before comparing to cost savings. A 6% adoption rate says nothing about value concentration — the 2,400 Crafted Local sellers could represent 15% of GMV and 2x retention rates. The minimum viable feature option is almost always underexplored and often the value-maximizing outcome.",
      commonMistakes: [
        'Using adoption rate (6%) as a proxy for value without measuring GMV concentration',
        'Comparing cost savings to feature cost without modeling churn-adjusted revenue at risk',
        'Ignoring spillover effects — do Local events bring new buyers to the platform for other sellers?',
        'Treating the decision as binary (sunset vs. keep) without exploring a minimum viable feature alternative',
        'Sunsetting before completing the retention and GMV analysis because of CFO timeline pressure',
      ],
      interviewPhrase:
        '"Before I evaluate whether to sunset, I want to understand who these 2,400 sellers actually are — specifically their GMV concentration and retention rate vs. platform average. A 6% adoption rate says nothing about value. If they represent 15% of GMV and have 2x retention, the $1.2M saving comes at a much higher expected cost. Then I\'d look at a minimum viable event-discovery feature before recommending a full sunset."',
    },
  },
];
