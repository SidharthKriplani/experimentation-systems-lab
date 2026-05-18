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
];
