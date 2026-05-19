// Product Analytics Lab — Metrics Room Case Data

export const metricCases = [
  {
    id: 'M01',
    title: 'What Defines a Successful Search?',
    subtitle: 'Vela · B2C Marketplace · Search Quality',
    difficulty: 'analyst',
    isFree: true,
    domain: 'search',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'guardrail-metric', 'primary-metric'],
    linkedDesignScenarioIds: ['d05-search-ranking-test'],
    linkedReviewScenarioIds: ['s09-clickbait-ranking-win'],
    context: {
      company: 'Vela',
      product: 'Search ranking',
      businessGoal: 'Improve search quality to drive purchases',
      pressure:
        'The ML team wants to ship a new ranking model next sprint and needs a success metric for the experiment.',
      trap:
        'CTR is the natural metric — but the ML model was trained on CTR, making any CTR improvement circular validation, not evidence of real quality gain.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'The ML team has retrained the search ranking model. Which metric should be the single north-star for deciding whether to ship?',
        options: [
          {
            id: 'a',
            label: 'Search-to-add-to-cart rate — share of search sessions that result in an add-to-cart',
            scoreValue: 2,
            rationale:
              "This metric captures genuine purchase intent downstream of the click, breaking the circularity of using CTR on a model trained with CTR data. It is directly aligned with Vela's business goal (drive purchases) and cannot be inflated simply by showing more clickable-but-irrelevant results.",
          },
          {
            id: 'b',
            label: 'Revenue per searcher — average GMV attributed to users who ran at least one search session',
            scoreValue: 2,
            rationale:
              'Revenue per searcher captures the full purchase funnel impact of search quality, including order value. It is immune to the CTR circularity trap and ties search directly to business outcome, though it may be noisier than conversion rate in short experiments.',
          },
          {
            id: 'c',
            label: 'CTR + downstream conversion — click-through rate combined with a post-click purchase signal',
            scoreValue: 1,
            rationale:
              'Pairing CTR with a downstream signal partially addresses the circularity problem, but CTR remains the primary lever and the model was trained on it. The downstream signal is valuable but it plays second fiddle, leaving the core proxy trap partially intact.',
          },
          {
            id: 'd',
            label: 'Click-through rate — fraction of search results pages where any result is clicked',
            scoreValue: 0,
            rationale:
              "CTR is the exact signal the ranking model was trained to optimize. Using it as the evaluation metric creates circular validation: a higher CTR proves only that the model learned to generate clickable results, not better ones. Teams that ship on CTR alone routinely move it while harming downstream conversion.",
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which set of diagnostic metrics best explains WHY the primary metric moved (or did not move)?',
        options: [
          {
            id: 'a',
            label: 'Reformulation rate + zero-result rate + search bounce rate — query-level failure signals',
            scoreValue: 2,
            rationale:
              'Reformulation rate reveals when users found results unsatisfying enough to retry; zero-result rate catches hard failures; search bounce captures users who clicked a result and immediately returned. Together they decompose the gap between a ranking change and its downstream purchase impact.',
          },
          {
            id: 'b',
            label: 'Page views per session + time on search results page — engagement proxies',
            scoreValue: 1,
            rationale:
              'These metrics capture broad engagement but conflate good engagement (exploring quality results) with bad engagement (struggling to find anything relevant). They provide weak diagnostic signal for a ranking model change.',
          },
          {
            id: 'c',
            label: 'Raw click-through rate broken down by query type',
            scoreValue: 0,
            rationale:
              'CTR segmented by query type still inherits the circularity problem of the primary CTR metric. It does not reveal whether the ranking change improved result relevance or merely made items more clickable.',
          },
          {
            id: 'd',
            label: 'Category page views + homepage visits — session breadth signals',
            scoreValue: 0,
            rationale:
              'Category and homepage views are influenced by many factors unrelated to search quality and provide no diagnostic signal for understanding ranking model changes.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against the most likely ways a CTR-optimized ranking model can harm the user experience?',
        options: [
          {
            id: 'a',
            label: 'Reformulation rate + zero-result rate + search bounce rate — failure-mode guardrails',
            scoreValue: 2,
            rationale:
              'These are exactly the dimensions a CTR-gaming model damages: it surfaces clickable but wrong results, increasing reformulations and bounce, while suppressing niche queries, increasing zero-result rates. Holding these stable ensures the primary metric improvement is genuine, not manufactured by clickbait ranking.',
          },
          {
            id: 'b',
            label: 'Average session duration — time-based engagement guardrail',
            scoreValue: 1,
            rationale:
              'Session duration can catch severe degradation but is a noisy proxy. A model that surfaces confusing results may increase session time while worsening outcome quality, making this guardrail gameable in the wrong direction.',
          },
          {
            id: 'c',
            label: 'Overall site conversion rate — platform-level purchase rate',
            scoreValue: 1,
            rationale:
              'Platform conversion is a reasonable lagging guardrail but is influenced by many non-search factors. It may not be sensitive enough to catch a ranking degradation within the typical experiment window.',
          },
          {
            id: 'd',
            label: 'No guardrails — trust the primary metric',
            scoreValue: 0,
            rationale:
              'Running without guardrails on a model trained on a proxy metric is exactly how teams ship ranking changes that lift CTR while harming buyer experience and long-term purchase behavior. Guardrails are not optional here.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          'At what grain should the primary metric be measured to best reflect the impact of the ranking change?',
        options: [
          {
            id: 'a',
            label: 'Per search session — one session = one user query intent episode',
            scoreValue: 2,
            rationale:
              "The search session is the natural unit of analysis: each session represents a user with a discrete intent who ran one or more queries. Measuring conversion per search session normalizes for the number of searches and isolates ranking quality from visit frequency effects.",
          },
          {
            id: 'b',
            label: "Per user-visit — one visit = a user's entire time on the platform",
            scoreValue: 1,
            rationale:
              "Per-visit measurement dilutes the search signal with non-search behavior during the same visit. It is workable but less precise than per-search-session for attributing the ranking change's effect.",
          },
          {
            id: 'c',
            label: 'Per page view — one page = one results page render',
            scoreValue: 0,
            rationale:
              'Page-view grain conflates single-intent searches that paginate with multiple-query sessions, inflating denominator counts and distorting conversion rates in favor of users who refine queries frequently.',
          },
          {
            id: 'd',
            label: 'Per registered user — one unit = one account regardless of search activity',
            scoreValue: 0,
            rationale:
              'Averaging over all registered users—many of whom may not have searched during the experiment window—dilutes the signal and makes it nearly impossible to detect meaningful ranking changes within standard experiment durations.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should govern the ship/no-ship decision for the new ranking model?',
        options: [
          {
            id: 'a',
            label:
              'Pre-committed: >=2% lift in search-to-cart rate (p<0.05) AND no significant degradation in reformulation, zero-result, or bounce guardrails',
            scoreValue: 2,
            rationale:
              'Pre-committing both the primary threshold and guardrail stability conditions before the experiment runs prevents post-hoc rationalization. The combined rule ensures the ship decision is evidence of genuine quality improvement, not CTR inflation or gaming.',
          },
          {
            id: 'b',
            label: 'p<0.05 on the primary metric only, any direction of movement',
            scoreValue: 1,
            rationale:
              'Statistical significance on the primary metric alone is a minimum bar but insufficient. Without guardrail conditions, a statistically significant win on conversion could coexist with meaningful harm to search failure rates that will compound over time.',
          },
          {
            id: 'c',
            label: 'Any increase in overall click volume from search',
            scoreValue: 0,
            rationale:
              'Total click volume is the raw CTR proxy at its most gameable. A model that demotes niche results and promotes popular-but-irrelevant ones can trivially increase click volume while degrading the experience for a large fraction of searchers.',
          },
          {
            id: 'd',
            label: 'Internal team review of result quality via manual spot-check',
            scoreValue: 0,
            rationale:
              'Manual spot-checks are a useful development signal but not a valid ship decision rule. They are subject to selection bias, do not generalize to the full query distribution, and cannot replace statistical evidence from a controlled experiment.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "The core trap in M01 is the proxy-circularity problem: a model trained on CTR cannot be validated with CTR without tautological evidence. The primary metric must sit downstream of the click — add-to-cart or revenue per searcher — so that the evaluation is independent of the training signal. Guardrails matter because a CTR-optimized ranker has a known failure mode: it learns to surface clickable-but-wrong results, which inflates reformulation and bounce. A senior analyst pre-commits both the primary threshold and guardrail stability before running the experiment, removing the temptation to rationalize marginal results post-hoc.",
      metricTree: [
        {
          role: 'primary',
          name: 'Search-to-add-to-cart rate',
          rationale:
            "Directly measures purchase intent conversion from search, independent of the CTR training signal, and aligns with Vela's GMV goal.",
        },
        {
          role: 'diagnostic',
          name: 'Reformulation rate',
          rationale:
            'Reveals when users found ranking results unsatisfying enough to retry with a new query — the first failure signal in the search funnel.',
        },
        {
          role: 'diagnostic',
          name: 'Zero-result rate',
          rationale:
            'Catches hard ranking failures where the model returns no results for real user intents.',
        },
        {
          role: 'diagnostic',
          name: 'Search bounce rate',
          rationale:
            'Identifies clicks that resulted in an immediate return to search, signaling result-content mismatch.',
        },
        {
          role: 'guardrail',
          name: 'Reformulation rate',
          rationale:
            'A CTR-gaming model reliably increases reformulation by surfacing misleading results — this guardrail catches that.',
        },
        {
          role: 'guardrail',
          name: 'Zero-result rate',
          rationale:
            'Aggressive ranking changes can suppress long-tail queries, raising zero-result rates that harm niche-intent buyers.',
        },
        {
          role: 'guardrail',
          name: 'Search bounce rate',
          rationale:
            'Protects against clickbait ranking by catching the pattern of high CTR with immediate disengagement.',
        },
      ],
      commonMistakes: [
        'Using CTR as both training signal and evaluation metric — this produces circular validation that cannot distinguish real quality improvement from click-bait optimization.',
        'Omitting guardrails because the primary metric improved — a lift in add-to-cart can coexist with a rising reformulation rate if the model is only improving for popular queries while degrading long-tail coverage.',
        'Measuring at page-view grain instead of search-session grain — pagination inflates the denominator and makes conversion rates appear lower than they are, biasing against shipping real improvements.',
      ],
      interviewPhrase:
        "The key question I'd ask is: what was the model trained on, and are we using the same signal for evaluation? If the ranking model was trained on CTR, CTR cannot validate it — we need a downstream conversion metric like add-to-cart rate that is independent of the training objective. I'd also pre-commit guardrails on reformulation and bounce before the experiment runs, because that's exactly where a CTR-optimized model fails silently.",
    },
  },

  {
    id: 'M02',
    title: 'When Is a New User Actually Activated?',
    subtitle: 'Loopwise · B2B SaaS · Onboarding',
    difficulty: 'analyst',
    isFree: true,
    domain: 'growth',
    linkedConceptIds: ['activation', 'metric-gaming', 'retention'],
    linkedDesignScenarioIds: ['d08-onboarding-checklist-test'],
    linkedReviewScenarioIds: ['s12-checklist-completion-illusion'],
    context: {
      company: 'Loopwise',
      product: 'Onboarding checklist',
      businessGoal: 'Improve week-1 activation to reduce early churn',
      pressure:
        'The PM wants a clear activation metric to declare success on the onboarding experiment before the next planning cycle.',
      trap:
        'Checklist completion is the obvious metric but it is gameable — users can click through all steps without internalizing the product value, producing high completion rates alongside unchanged retention.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'Loopwise has redesigned its onboarding checklist. Which metric should define whether a new account is "activated"?',
        options: [
          {
            id: 'a',
            label:
              'Meaningful activation rate — % of accounts completing all 3 value actions (create project + add task + invite teammate) within 7 days',
            scoreValue: 2,
            rationale:
              'The three-action bundle mirrors the minimum viable usage pattern that predicts retention in B2B project tools: a project without tasks is a shell, and a project without a teammate is not a collaboration product. Requiring all three within 7 days ties activation to demonstrated value exchange, not checklist mechanics.',
          },
          {
            id: 'b',
            label: 'Partial activation rate — % of accounts completing any 2 of the 3 core value actions within 7 days',
            scoreValue: 1,
            rationale:
              'Two-of-three captures more accounts and acknowledges that some single-user accounts may not invite teammates immediately. It is a reasonable fallback but may not be sensitive enough to detect meaningful retention differences, since solo usage without collaboration is a weaker retention predictor in B2B SaaS.',
          },
          {
            id: 'c',
            label: 'Checklist completion rate — % of new accounts that reach 100% on the onboarding checklist',
            scoreValue: 0,
            rationale:
              'Checklist completion measures whether users clicked the UI, not whether they extracted value. A redesigned checklist that is easier to click through will lift this metric without improving retention — the exact gaming pattern this scenario is designed to catch.',
          },
          {
            id: 'd',
            label: 'Day-1 login rate — % of new accounts that log in within the first 24 hours',
            scoreValue: 0,
            rationale:
              'Day-1 login is a leading indicator of engagement but is too shallow to constitute activation. It captures onboarding email effectiveness more than product value realization, and any checklist change will mechanically influence it.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best reveals whether the onboarding change improved genuine product adoption or just checklist behavior?',
        options: [
          {
            id: 'a',
            label: '14-day retained usage (week-2 feature depth) + week-1 support ticket volume',
            scoreValue: 2,
            rationale:
              'Week-2 feature depth measures whether activated users actually continue using the product after onboarding ends — this is the acid test for whether activation was genuine. Support ticket volume in week 1 distinguishes between users who completed the checklist with understanding versus confusion.',
          },
          {
            id: 'b',
            label: 'Page views during onboarding + session count in week 1',
            scoreValue: 1,
            rationale:
              'Session and page-view counts capture engagement volume but conflate productive use with confused navigation. They provide a broad signal about onboarding investment but cannot distinguish genuine adoption from frustrated clicking.',
          },
          {
            id: 'c',
            label: 'Checklist steps completed per account + time to checklist completion',
            scoreValue: 0,
            rationale:
              'These metrics live entirely within the gameable layer. A faster, easier checklist will reduce time-to-completion and increase steps completed without any change in downstream product value realization.',
          },
          {
            id: 'd',
            label: 'Onboarding email open rate + click-through rate',
            scoreValue: 0,
            rationale:
              'Email engagement measures the quality of the communication channel, not product adoption. It is upstream of the activation problem and provides no diagnostic signal about whether the product delivered value.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against the most likely failure modes of an onboarding redesign?',
        options: [
          {
            id: 'a',
            label: '14-day retention rate + week-1 support ticket volume + bounce rate after onboarding completion',
            scoreValue: 2,
            rationale:
              'These three guardrails cover the three main ways an onboarding change can look good while harming the product: a checklist-gaming redesign that lifts completion but not retention, one that confuses users into support queues, and one that leads to immediate churn after the onboarding flow ends.',
          },
          {
            id: 'b',
            label: 'Week-1 session count per account',
            scoreValue: 1,
            rationale:
              'Session count provides a broad engagement guardrail but is not specific enough to catch the checklist-gaming failure mode. An easy-to-complete onboarding might increase session count in week 1 while producing users who churn in week 2.',
          },
          {
            id: 'c',
            label: 'Account-level NPS survey at day 30',
            scoreValue: 1,
            rationale:
              'Day-30 NPS is a useful long-term signal but too delayed to serve as an experiment guardrail. It will not be available during the experiment window and cannot catch acute onboarding failures in time to stop a bad ship.',
          },
          {
            id: 'd',
            label: 'No guardrails — activation rate improvement is sufficient',
            scoreValue: 0,
            rationale:
              'Without guardrails, a checklist redesign that inflates activation rate while worsening retention and support load will ship undetected. The entire risk of this scenario is a false-positive activation signal — guardrails are essential.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          'At what grain should the activation metric be measured for a B2B SaaS product?',
        options: [
          {
            id: 'a',
            label: 'Per account — one unit = one company/workspace',
            scoreValue: 2,
            rationale:
              'Loopwise is B2B SaaS where the buying and churning decision is made at the account level. An account with 5 activated users is worth the same as an account with 1 if they renew — measuring per-account aligns the metric with the revenue and churn unit of analysis.',
          },
          {
            id: 'b',
            label: 'Per user — one unit = one individual seat',
            scoreValue: 1,
            rationale:
              'Per-user measurement is reasonable for tracking individual adoption within accounts but obscures the account-level activation story. A single highly active user in an otherwise dormant account looks identical to an equally distributed team.',
          },
          {
            id: 'c',
            label: 'Per session — one unit = one login session',
            scoreValue: 0,
            rationale:
              'Session grain is appropriate for engagement depth analysis but not for activation measurement. It is far too granular for a B2B onboarding metric and inflates apparent activation by counting repeated engagement from already-activated accounts.',
          },
          {
            id: 'd',
            label: 'Per feature interaction — one unit = one use of a core feature',
            scoreValue: 0,
            rationale:
              'Feature interaction grain is a diagnostic metric input, not an activation denominator. Treating each interaction as the unit of measurement disconnects the metric from the account-level business outcome entirely.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should govern whether the new onboarding checklist ships to all accounts?',
        options: [
          {
            id: 'a',
            label:
              'Pre-committed: >=5% lift in meaningful activation rate (p<0.05) AND no degradation in 14-day retention guardrail',
            scoreValue: 2,
            rationale:
              'Requiring both the activation lift and a stable retention guardrail before committing to ship prevents the checklist-gaming false positive. If activation improves but retention does not, the design changed clicking behavior without changing value realization.',
          },
          {
            id: 'b',
            label: 'Any statistically significant improvement in activation rate, however defined',
            scoreValue: 1,
            rationale:
              'A significance-only rule at least requires statistical rigor, but without a pre-committed primary metric definition and guardrail condition, it leaves the door open for post-hoc metric selection and checklist-completion as the winning definition.',
          },
          {
            id: 'c',
            label: 'Checklist completion rate exceeds 80% in the treatment group',
            scoreValue: 0,
            rationale:
              'This rule embeds the gameable metric directly into the success definition. Hitting 80% checklist completion says nothing about product value realization and will trivially be achieved by making the checklist easier to complete.',
          },
          {
            id: 'd',
            label: 'Positive user feedback from onboarding exit survey',
            scoreValue: 0,
            rationale:
              'Exit survey sentiment measures the onboarding experience, not downstream product value. Users can enjoy an onboarding flow they immediately forget — this is not a valid ship criterion for an activation experiment.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "The activation trap in B2B SaaS is conflating UI completion with value realization. Checklist completion measures the onboarding UI mechanic, not product adoption — making it structurally gameable by any UX change that reduces friction. A strong activation metric bundles the minimum actions that predict retention: in Loopwise's case, project creation, task addition, and teammate invitation represent the minimum collaboration loop. The 14-day retention guardrail is the acid test: if the onboarding change genuinely improved activation, it will show up in week-2 usage. If only completion rates moved, the intervention changed clicking behavior without changing outcomes.",
      metricTree: [
        {
          role: 'primary',
          name: 'Meaningful activation rate (3-action bundle within 7 days)',
          rationale:
            'Captures the minimum viable usage pattern that predicts retention in a B2B collaboration tool, at the account grain.',
        },
        {
          role: 'diagnostic',
          name: '14-day feature depth (week-2 active usage)',
          rationale:
            'The post-activation retention check — tells you whether users who activated continued to find value after the onboarding flow ended.',
        },
        {
          role: 'diagnostic',
          name: 'Week-1 support ticket volume',
          rationale:
            'High tickets alongside high completion signals confusion-driven completion — users clicked through without understanding.',
        },
        {
          role: 'guardrail',
          name: '14-day retention rate',
          rationale:
            'The primary mechanism guardrail: genuine activation should improve retention; checklist gaming will not.',
        },
        {
          role: 'guardrail',
          name: 'Bounce rate after onboarding completion',
          rationale:
            'Catches the pattern of users who finish the checklist and immediately leave — a strong signal of value misalignment.',
        },
      ],
      commonMistakes: [
        'Defining activation as checklist completion — this creates a direct incentive to make checklists easier to click through rather than more effective at conveying value.',
        'Measuring at per-user rather than per-account grain in a B2B product — the renewal and churn decision is made at the account level, not the individual user level.',
        'Declaring success before the 14-day retention signal is available — week-1 activation improvements that do not translate to week-2 retention are noise, not signal.',
      ],
      interviewPhrase:
        "In B2B SaaS, activation has to be defined as the minimum action bundle that predicts retention — not the last step in a UI flow. I'd anchor Loopwise's activation definition on the collaboration loop: project created, task added, teammate invited, all within 7 days at the account grain. Then I'd require a 14-day retention guardrail before shipping, because any onboarding change that moves completion without moving retention is telling us we optimized the mechanic, not the outcome.",
    },
  },

  {
    id: 'M03',
    title: 'What Proves Notifications Are Working?',
    subtitle: 'Orion · Consumer Mobile · Engagement',
    difficulty: 'analyst',
    isFree: false,
    domain: 'retention',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'guardrail-metric'],
    linkedDesignScenarioIds: ['d06-notification-timing-test'],
    linkedReviewScenarioIds: ['s10-push-open-rate-trap'],
    context: {
      company: 'Orion',
      product: 'Push notification timing model',
      businessGoal: 'Improve notification strategy to drive session quality',
      pressure:
        'The PM wants to prove notifications are driving meaningful engagement before the quarterly review.',
      trap:
        'Open rate is the obvious metric — but a model trained on open rate learns when phones are picked up (commute times, morning alarms), not when users are cognitively ready to engage with Orion, producing high opens with shallow sessions.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'Orion has retrained its notification timing model. Which metric should determine whether the new timing strategy is working?',
        options: [
          {
            id: 'a',
            label: '7-day active session rate — % of notified users with at least one quality session in the following 7 days',
            scoreValue: 2,
            rationale:
              'Session activity over 7 days measures durable behavioral change driven by notifications, not just reflexive opens. It breaks the circularity of using open rate on a model that learned phone-pickup patterns, and ties notification effectiveness to the business goal of driving session quality.',
          },
          {
            id: 'b',
            label: 'Task completion per notified session — average tasks completed in sessions that follow a notification open',
            scoreValue: 2,
            rationale:
              'Task completion per session measures whether notifications are driving productive engagement rather than idle app opens. It directly captures session quality — the stated business goal — and cannot be inflated by a timing model that finds phone-pickup moments without engagement readiness.',
          },
          {
            id: 'c',
            label: 'Notification open rate — % of delivered notifications that result in an app open',
            scoreValue: 0,
            rationale:
              "Open rate is the training signal the timing model optimized. Using it for evaluation creates the same circularity as M01's CTR trap: the model has learned to predict phone pickup, so any open-rate improvement proves only that the prediction improved, not that engagement quality improved.",
          },
          {
            id: 'd',
            label: 'Daily active users — total unique users with any app open on each day',
            scoreValue: 1,
            rationale:
              'DAU provides a broad engagement signal and is independent of the notification training objective, making it a reasonable primary. However, it conflates organic app opens with notification-driven ones, diluting the signal from the timing model change specifically.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best distinguishes genuine engagement improvement from a timing model that simply gets better at catching phone-pickup moments?',
        options: [
          {
            id: 'a',
            label:
              'Session depth (tasks completed per active session) + day-over-day retention cohort (% users active on day N who return on day N+1)',
            scoreValue: 2,
            rationale:
              'Session depth reveals whether notification-driven opens result in substantive usage rather than idle scrolling. The retention cohort tracks whether the engagement is building habit, not just capturing one-time opens. Together they diagnose whether the timing model is driving quality engagement or just phone-pickup.',
          },
          {
            id: 'b',
            label: 'Daily active users + weekly active users',
            scoreValue: 1,
            rationale:
              'DAU and WAU provide engagement volume context but are too aggregated to diagnose the specific failure mode of a notification timing model. They cannot distinguish quality sessions from hollow opens.',
          },
          {
            id: 'c',
            label: 'Notification send volume + delivery rate',
            scoreValue: 0,
            rationale:
              'Send volume and delivery rate are operational metrics about the notification infrastructure, not diagnostic metrics for engagement quality. They provide zero signal about whether the timing strategy is working.',
          },
          {
            id: 'd',
            label: 'Notification open rate by time-of-day bucket',
            scoreValue: 0,
            rationale:
              'This is a segmented version of the gameable training signal. It tells you when users pick up their phones, which is exactly what the model already learned — not whether those opens resulted in quality engagement.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against notification strategies that improve opens while harming the user relationship?',
        options: [
          {
            id: 'a',
            label: 'Push opt-out rate + app uninstall rate + notification mute rate',
            scoreValue: 2,
            rationale:
              'These three guardrails cover the escalating user-rejection responses to over-aggressive notifications: muting (soft rejection), opting out of push entirely (hard rejection), and uninstalling (full rejection). A timing model that sends notifications at phone-pickup moments regardless of user context will degrade all three over time.',
          },
          {
            id: 'b',
            label: 'Average session count per week',
            scoreValue: 1,
            rationale:
              'Weekly session count provides an engagement volume guardrail but is directionally influenced by the same dynamics as the primary metric. It would not independently catch a scenario where notifications drive sessions at the cost of user trust.',
          },
          {
            id: 'c',
            label: 'Notification open rate — ensure it does not drop',
            scoreValue: 0,
            rationale:
              'Using open rate as a guardrail reinstates the same circular signal we are trying to escape. Holding open rate stable while measuring a downstream primary is contradictory and will create perverse pressure to protect the gameable signal.',
          },
          {
            id: 'd',
            label: 'No guardrails — session rate improvement is sufficient',
            scoreValue: 0,
            rationale:
              'Notification strategies without guardrails on opt-out and uninstall have a well-documented failure mode: short-term session lifts followed by accelerating churn as users reject the channel. The guardrails are essential for catching this pattern before it compounds.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          'At what grain should the primary notification effectiveness metric be measured?',
        options: [
          {
            id: 'a',
            label: 'Per active user per week — one unit = one user in a given 7-day window',
            scoreValue: 2,
            rationale:
              'Weekly active user grain normalizes for engagement frequency, captures the durable behavioral effect of notification timing changes, and aligns with the 7-day session activity primary metric. It is also the grain at which retention cohort analysis is most interpretable.',
          },
          {
            id: 'b',
            label: 'Per notification delivered — one unit = one delivered push notification',
            scoreValue: 1,
            rationale:
              'Per-notification grain is reasonable for click-to-open or open-to-session conversion analysis, but conflates users who receive many notifications with engaged users. A model that sends more notifications will inflate the denominator and make per-notification rates appear lower even as absolute engagement rises.',
          },
          {
            id: 'c',
            label: 'Per notification sent — one unit = one push send event',
            scoreValue: 0,
            rationale:
              'Send grain includes undelivered notifications and is dominated by delivery infrastructure factors rather than engagement dynamics. It is the wrong denominator for a user behavior metric.',
          },
          {
            id: 'd',
            label: 'Per day per user — one unit = one calendar day of app availability',
            scoreValue: 1,
            rationale:
              'Daily grain is workable but less natural than weekly for a notification timing study where the behavioral effect of a notification may play out over several days. Weekly grain reduces day-to-day noise while still being sensitive to the experiment signal.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should determine whether the new notification timing model ships?',
        options: [
          {
            id: 'a',
            label:
              'Pre-committed: significant improvement in 7-day active session rate AND no significant increase in opt-out, uninstall, or mute rate',
            scoreValue: 2,
            rationale:
              'This rule requires both a genuine engagement improvement and confirmation that the notification strategy is not eroding the user relationship. Pre-committing prevents post-hoc rationalization where a session lift is declared a win despite rising opt-out rates.',
          },
          {
            id: 'b',
            label: 'Open rate improvement with any positive retention signal',
            scoreValue: 1,
            rationale:
              'Including a retention signal partially addresses the circularity problem, but anchoring the rule on open rate improvement still rewards the phone-pickup optimization. It is a step up from open rate alone but not a clean decision rule.',
          },
          {
            id: 'c',
            label: 'Open rate increase above baseline in the treatment group',
            scoreValue: 0,
            rationale:
              'Open rate improvement is the exact gameable signal the timing model was trained on. Shipping on this metric alone provides zero evidence that notification quality improved — only that the phone-pickup prediction got better.',
          },
          {
            id: 'd',
            label: 'Positive PM assessment of qualitative user feedback',
            scoreValue: 0,
            rationale:
              'Qualitative feedback is useful for hypothesis generation but is not a valid ship decision rule for a timing model change that affects 2.1M users. Selection bias in feedback collection is severe and cannot substitute for controlled experiment results.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "The notification timing trap mirrors the search CTR trap: the model was trained on open rate, which measures when users pick up their phones, not when they are ready to engage with Orion. A timing strategy optimized for phone-pickup will find commute windows and morning alarms, driving opens at moments when users are distracted — which produces hollow sessions and eventually opt-out fatigue. The primary metric must sit downstream of the open: session quality or 7-day active session rate. Guardrails on opt-out, mute, and uninstall are essential because notification over-aggression is an asymmetric harm — users who opt out or uninstall are lost, and the damage compounds before aggregate engagement metrics detect it.",
      metricTree: [
        {
          role: 'primary',
          name: '7-day active session rate',
          rationale:
            'Measures durable behavioral engagement driven by notifications, independent of the open-rate training signal.',
        },
        {
          role: 'diagnostic',
          name: 'Session depth (tasks completed per session)',
          rationale:
            'Distinguishes quality engagement from hollow opens — a timing model that finds distracted moments produces low session depth.',
        },
        {
          role: 'diagnostic',
          name: 'Day-over-day retention cohort',
          rationale:
            'Tracks whether notification-driven engagement is building habit or just generating one-time opens.',
        },
        {
          role: 'guardrail',
          name: 'Push opt-out rate',
          rationale:
            'The primary user-rejection signal for over-aggressive notification timing.',
        },
        {
          role: 'guardrail',
          name: 'App uninstall rate',
          rationale:
            'The terminal user-rejection signal — indicates the notification strategy crossed a threshold of user tolerance.',
        },
        {
          role: 'guardrail',
          name: 'Notification mute rate',
          rationale:
            'Early-warning signal for opt-out trajectory — users mute before they opt out.',
        },
      ],
      commonMistakes: [
        'Using notification open rate as the primary metric when the timing model was trained on open rate — this creates the same circular validation problem as using CTR on a CTR-trained ranking model.',
        'Ignoring opt-out and uninstall guardrails because session metrics look positive — notification over-aggression causes asymmetric harm that is not visible in aggregate engagement data until it is already compounding.',
        'Measuring per-notification-sent rather than per-active-user — this denominator rewards sending more notifications and obscures user-level engagement quality trends.',
      ],
      interviewPhrase:
        "The first thing I'd ask about a notification timing model is what signal it was trained on and whether that same signal appears in our success metric. If the model learned open rate, we've trained it to find phone-pickup moments — not engagement readiness. The primary metric needs to be downstream: 7-day session activity or task completion per session. And I'd require opt-out and uninstall guardrails before shipping, because that's where notification over-aggression shows up first.",
    },
  },

  {
    id: 'M04',
    title: 'What Measures Seller Quality in a Marketplace?',
    subtitle: 'Crafted · Two-Sided Marketplace · Seller Health',
    difficulty: 'senior',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['marketplace-interference', 'guardrail-metric', 'primary-metric'],
    linkedDesignScenarioIds: ['d07-seller-incentive-test'],
    linkedReviewScenarioIds: ['s11-seller-speed-spillover'],
    context: {
      company: 'Crafted',
      product: 'Seller incentive program',
      businessGoal: 'Improve seller responsiveness to increase buyer conversion',
      pressure:
        'The ops team wants a single seller health score to track for the incentive program evaluation.',
      trap:
        'Response speed alone can be gamed (fast bad answers) and ignores buyer-side impact. A seller-only metric also misses marketplace displacement: incentivized sellers may win at the expense of non-incentivized ones, producing no net platform gain.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'Crafted is launching a seller incentive program to improve responsiveness. Which metric should be the primary judge of seller quality improvement?',
        options: [
          {
            id: 'a',
            label: "Buyer conversion rate per seller — % of buyer contacts that result in a completed purchase",
            scoreValue: 2,
            rationale:
              "Buyer conversion rate captures end-to-end seller quality from the buyer's perspective — it integrates responsiveness, answer quality, and trust into a single outcome metric. It cannot be inflated by fast but unhelpful responses, and it ties seller health directly to the marketplace's revenue mechanism.",
          },
          {
            id: 'b',
            label: 'Seller response time (p50) — median time from buyer message to seller first response',
            scoreValue: 1,
            rationale:
              'Response time is a legitimate leading indicator of seller quality and a direct target of the incentive program. However, it is gameable: sellers can improve response time by sending brief acknowledgments without useful content, lifting the metric without helping buyers convert.',
          },
          {
            id: 'c',
            label: 'Message response rate — % of buyer messages that receive any seller reply within 24h',
            scoreValue: 0,
            rationale:
              'Message response rate measures whether sellers reply, not whether those replies are useful. A seller can achieve 100% response rate with low-quality, non-converting replies — this metric provides no signal about buyer outcome quality.',
          },
          {
            id: 'd',
            label: 'Seller star rating — buyer-submitted rating after completed transactions',
            scoreValue: 1,
            rationale:
              'Star ratings capture buyer satisfaction post-transaction but suffer from low response rates, recency bias, and strategic manipulation. They are useful diagnostic signals but lag too much and have too low coverage to serve as a primary seller quality metric.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          "Which diagnostic set best reveals whether seller quality improved from the buyer's perspective, not just seller-side behavior?",
        options: [
          {
            id: 'a',
            label: 'Cancellation rate + dispute/refund rate + repeat buyer rate per seller',
            scoreValue: 2,
            rationale:
              'Cancellations reveal post-commitment quality failures; disputes and refunds capture the most severe buyer dissatisfaction; repeat buyer rate measures whether buyers trusted a seller enough to return. Together they cover pre-purchase, at-purchase, and post-purchase quality signals that response speed cannot fake.',
          },
          {
            id: 'b',
            label: 'Average star rating per seller',
            scoreValue: 1,
            rationale:
              'Star ratings provide buyer satisfaction context but have coverage and bias limitations. As a sole diagnostic they miss the operational failure signals (cancellations, disputes) that are more reliable and less gameable.',
          },
          {
            id: 'c',
            label: 'Message volume per seller + response speed distribution',
            scoreValue: 0,
            rationale:
              'These are seller-side activity metrics that measure engagement with the messaging system, not buyer outcome quality. High message volume with fast responses can coexist with low conversion and high dispute rates.',
          },
          {
            id: 'd',
            label: 'Seller listing view count + favorites per listing',
            scoreValue: 0,
            rationale:
              'Listing views and favorites measure discovery and initial interest, which are primarily driven by listing quality and search ranking — not by the seller responsiveness that the incentive program targets.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best catches the marketplace displacement risk of an incentive program that boosts treated sellers?',
        options: [
          {
            id: 'a',
            label:
              'Marketplace-level buyer conversion rate + control seller conversion rate (displacement signal)',
            scoreValue: 2,
            rationale:
              'If incentivized sellers improve but platform-level conversion stays flat and control seller conversion drops, the program has displaced sales rather than created new ones. Both guardrails are necessary: the platform metric catches net-zero effects; the control seller metric catches cannibalization.',
          },
          {
            id: 'b',
            label: 'Overall GMV — total gross merchandise value on the platform',
            scoreValue: 1,
            rationale:
              "GMV provides a top-line displacement check but is influenced by seasonality, pricing, and category mix changes that obscure the incentive program's specific displacement effect. It is a lagging, noisy guardrail compared to conversion rate.",
          },
          {
            id: 'c',
            label: 'Incentivized seller satisfaction score',
            scoreValue: 0,
            rationale:
              'Seller satisfaction measures how treated sellers feel about the program — it is entirely on the supply side and provides no protection against buyer-side displacement or net-zero marketplace effects.',
          },
          {
            id: 'd',
            label: 'No guardrails — treated seller improvement is the goal',
            scoreValue: 0,
            rationale:
              'A marketplace incentive program without displacement guardrails can produce a statistical win on treated sellers while generating exactly zero net benefit to the platform. This is the canonical marketplace interference failure mode.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          "At what grain should seller quality metrics be measured to best capture buyer-side impact?",
        options: [
          {
            id: 'a',
            label: 'Per unique buyer contact — one unit = one buyer initiating contact with a seller',
            scoreValue: 2,
            rationale:
              "Per-contact grain measures conversion from the point a buyer reaches out, which is precisely the handoff the incentive program targets. It normalizes for contact volume differences between sellers and isolates the quality of the seller's response as the key variable.",
          },
          {
            id: 'b',
            label: 'Per transaction — one unit = one completed purchase',
            scoreValue: 2,
            rationale:
              'Per-transaction grain captures post-purchase quality signals (cancellations, disputes, repeats) and is appropriate for the diagnostic tier. It is equally valid as the primary grain depending on whether the focus is pre-purchase conversion or post-purchase satisfaction.',
          },
          {
            id: 'c',
            label: 'Per message — one unit = one message exchanged',
            scoreValue: 0,
            rationale:
              'Message grain is dominated by conversation length differences between sellers and buyer inquiry complexity. Sellers who engage in longer conversations before converting will appear worse than sellers who close quickly, which inverts the quality signal.',
          },
          {
            id: 'd',
            label: 'Per seller — one unit = one seller account regardless of contact volume',
            scoreValue: 0,
            rationale:
              'Per-seller aggregation confounds high-volume sellers with high-quality ones and makes it impossible to control for contact volume differences. A seller with 10x more contacts who converts at a lower rate looks equivalent to a low-volume high-quality seller.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should govern whether the seller incentive program expands?',
        options: [
          {
            id: 'a',
            label:
              'Buyer conversion improvement in treated sellers AND no displacement signal in platform-level or control-seller conversion rates',
            scoreValue: 2,
            rationale:
              'This rule requires both a genuine buyer outcome improvement and confirmation that the gain is additive to the marketplace rather than cannibalized from other sellers. Pre-committing the displacement guardrail condition is essential because marketplace interference is invisible in seller-only metrics.',
          },
          {
            id: 'b',
            label: 'Seller response speed improvement (p50 >= target threshold)',
            scoreValue: 1,
            rationale:
              'Response speed improvement confirms the incentive program changed seller behavior as intended, but is insufficient as a success rule because it does not confirm that the behavioral change translated into buyer conversions or additive platform value.',
          },
          {
            id: 'c',
            label: 'Any seller-side metric improvement in the treated group',
            scoreValue: 0,
            rationale:
              'An undifferentiated seller-side improvement rule will trigger on gameable metrics (response rate, speed) without confirming buyer outcome improvement or ruling out displacement. This is the weakest possible success definition.',
          },
          {
            id: 'd',
            label: 'Treated seller star rating above platform average',
            scoreValue: 0,
            rationale:
              'Star ratings have low coverage and recency bias, and are easily influenced by the types of buyers attracted to incentivized sellers rather than true quality changes. Anchoring expansion on star ratings invites gaming and ignores the displacement question entirely.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "Marketplace seller quality measurement has two distinct failure modes: the gaming problem (response speed metrics reward fast bad answers) and the displacement problem (seller-level improvements may produce no net platform value if they cannibalize non-incentivized sellers). The primary metric must be buyer-side — buyer conversion rate per seller — because it integrates responsiveness, answer quality, and trust into a single outcome that cannot be gamed by fast acknowledgments. The displacement guardrail is non-negotiable: any experiment that measures only treated sellers will miss the case where incentivized sellers win at the expense of other marketplace participants, producing zero incremental value for Crafted despite a strong experiment result.",
      metricTree: [
        {
          role: 'primary',
          name: 'Buyer conversion rate per seller',
          rationale:
            "Captures end-to-end seller quality from the buyer's perspective, resistant to gaming by fast-but-unhelpful responses.",
        },
        {
          role: 'diagnostic',
          name: 'Cancellation rate per seller',
          rationale:
            'Reveals post-commitment quality failures that buyer conversion rate cannot catch pre-purchase.',
        },
        {
          role: 'diagnostic',
          name: 'Dispute/refund rate per seller',
          rationale:
            'The most severe post-purchase quality signal — indicates fundamental product or service misrepresentation.',
        },
        {
          role: 'diagnostic',
          name: 'Repeat buyer rate per seller',
          rationale:
            'Measures whether buyers trusted a seller enough to return — a strong long-term quality signal.',
        },
        {
          role: 'guardrail',
          name: 'Marketplace-level buyer conversion rate',
          rationale:
            'Catches net-zero displacement: if platform conversion stays flat while treated seller conversion rises, the program shifted, not created, value.',
        },
        {
          role: 'guardrail',
          name: 'Control seller conversion rate',
          rationale:
            'Catches direct cannibalization: if control sellers see declining conversion as treated sellers improve, displacement is confirmed.',
        },
      ],
      commonMistakes: [
        'Using seller response speed as the primary metric — it is gameable by fast acknowledgments that do not help buyers, and it ignores the buyer-side outcome that actually matters to marketplace GMV.',
        'Measuring only treated sellers without a displacement guardrail — this is the canonical marketplace interference mistake that produces statistically significant wins that deliver zero net platform value.',
        'Aggregating at per-seller grain instead of per-buyer-contact — this confounds seller volume with seller quality and makes it impossible to isolate the responsiveness effect.',
      ],
      interviewPhrase:
        "In a two-sided marketplace, a seller-only metric can show improvement even when the program creates no net value — you need to check for displacement. I'd make buyer conversion rate per seller the primary (it can't be gamed by fast bad answers) and then require the marketplace-level and control-seller conversion rates to hold stable before calling it a win. If treated sellers improve while control sellers decline and platform conversion is flat, we've just moved demand around, not grown it.",
    },
  },

  {
    id: 'M05',
    title: 'What Should Drive Our Revenue Growth Decision?',
    subtitle: 'Vantage Analytics · B2B SaaS · Pricing & Discounts',
    difficulty: 'senior',
    isFree: false,
    domain: 'revenue',
    linkedConceptIds: ['guardrail-metric', 'primary-metric'],
    linkedDesignScenarioIds: [],
    linkedReviewScenarioIds: [],
    context: {
      company: 'Vantage Analytics',
      product: 'Discount/pricing program for annual commitments',
      businessGoal: 'Grow annual recurring revenue through volume discounts',
      pressure:
        'Finance wants a single revenue metric for the discount program evaluation before end of quarter.',
      trap:
        'Gross bookings and GMV mechanically improve when discounts increase volume, while contribution margin and net revenue retention — the metrics that predict long-term revenue health — may simultaneously worsen.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'Vantage Analytics is testing an annual commitment discount program. Which metric should be the primary decision driver?',
        options: [
          {
            id: 'a',
            label: 'Net revenue retention (NRR) — (starting ARR + expansion - contraction - churn) / starting ARR',
            scoreValue: 2,
            rationale:
              'NRR captures the full revenue lifecycle of a discount cohort: whether discounted customers expand, contract, or churn. It is the only single metric that can simultaneously detect the positive case (discounts attract customers who grow) and the negative case (discounts attract low-quality customers who churn at renewal), making it the correct primary for a discount program evaluation.',
          },
          {
            id: 'b',
            label: 'Annual recurring revenue (ARR) growth rate — % change in total ARR over the program period',
            scoreValue: 1,
            rationale:
              'ARR growth captures new customer additions and net expansion, making it a reasonable primary for a growth program. However, it does not isolate discount cohort quality from the broader book of business, and early-stage ARR growth from discounted accounts can coexist with deteriorating retention that will show up later.',
          },
          {
            id: 'c',
            label: 'Gross bookings — total contract value signed during the program period',
            scoreValue: 0,
            rationale:
              'Gross bookings measure contract volume, not revenue quality. A discount program will mechanically increase bookings by making contracts cheaper to sign. This metric cannot distinguish between high-quality customers acquired at scale and low-quality customers attracted by price sensitivity who will churn at renewal.',
          },
          {
            id: 'd',
            label: 'Gross merchandise value (GMV) — total transaction value processed through the platform',
            scoreValue: 0,
            rationale:
              'GMV is an engagement/volume metric, not a revenue health metric for B2B SaaS. It is heavily influenced by platform usage patterns unrelated to the discount program and does not capture the retention trajectory that determines whether the program created lasting revenue value.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best reveals whether discounted customers are high-quality additions to the book of business?',
        options: [
          {
            id: 'a',
            label: 'Contribution margin per customer + churn rate by discount cohort',
            scoreValue: 2,
            rationale:
              'Contribution margin per customer reveals whether discounted accounts are profitable at the current pricing level. Churn rate by discount cohort isolates whether the price-sensitive customers attracted by discounts have different retention behavior than the baseline — which is the key question for long-term revenue health.',
          },
          {
            id: 'b',
            label: 'Monthly recurring revenue (MRR) breakdown by plan tier',
            scoreValue: 1,
            rationale:
              'MRR by plan tier provides context on which segments are growing, but does not isolate discount cohort quality or reveal margin trajectory. It is useful alongside the primary metric but insufficient as the sole diagnostic.',
          },
          {
            id: 'c',
            label: 'Raw contract count by sales rep + average deal size',
            scoreValue: 0,
            rationale:
              "Sales activity metrics measure the sales team's output, not customer quality. They cannot distinguish whether new contracts are revenue-positive additions or discounted churn risks, and they create incentives to optimize deal volume over deal quality.",
          },
          {
            id: 'd',
            label: 'Customer usage metrics (seats active, features used)',
            scoreValue: 1,
            rationale:
              'Usage depth is a useful leading indicator of retention — deeply engaged customers are more likely to renew. However, without the margin context, high usage at deeply discounted prices may still be economically harmful.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against discount programs that improve top-line metrics while damaging revenue quality?',
        options: [
          {
            id: 'a',
            label: 'Gross margin percentage + refund/credit rate + time-to-churn in discount cohort',
            scoreValue: 2,
            rationale:
              'Gross margin percentage catches revenue volume improvements that come at the cost of profitability. Refund and credit rate reveals post-commitment dissatisfaction in discounted accounts. Time-to-churn in the discount cohort catches the scenario where cheaper customers sign annual contracts but exit early — the most dangerous financial outcome of a discount program.',
          },
          {
            id: 'b',
            label: 'Customer satisfaction score (CSAT) across all accounts',
            scoreValue: 1,
            rationale:
              'CSAT provides a broad satisfaction signal but is not specifically sensitive to the financial risks of a discount program. High CSAT can coexist with deteriorating gross margin if discounted customers are happy at the price they paid.',
          },
          {
            id: 'c',
            label: 'Sales team quota attainment rate',
            scoreValue: 0,
            rationale:
              'Sales quota attainment is a supply-side metric that has no direct relationship to revenue quality. A discount program that makes deals easier to close will mechanically improve quota attainment while potentially harming NRR and margin.',
          },
          {
            id: 'd',
            label: 'No guardrails — NRR improvement is sufficient',
            scoreValue: 0,
            rationale:
              'NRR is the right primary but is a lagging metric. Margin and cohort-level churn guardrails provide leading signals that allow course correction before the NRR deterioration fully materializes. Running without guardrails means waiting until the financial damage is already done.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          'At what grain should revenue quality metrics be measured for a discount program evaluation?',
        options: [
          {
            id: 'a',
            label: 'Per account/contract — one unit = one enterprise account',
            scoreValue: 2,
            rationale:
              'The enterprise contract is the unit at which revenue is committed, renewed, and churned. Per-account grain aligns revenue metrics with the business decision unit, allows cohort analysis by discount level, and correctly surfaces the NRR signal at the level where it is most actionable.',
          },
          {
            id: 'b',
            label: 'Per user seat — one unit = one licensed individual user',
            scoreValue: 1,
            rationale:
              'Per-seat grain is useful for analyzing seat expansion and contraction within accounts, but does not capture account-level churn risk or the overall revenue health of an account. It is more granular than needed for a program-level evaluation.',
          },
          {
            id: 'c',
            label: 'Per transaction — one unit = one billable event',
            scoreValue: 0,
            rationale:
              'Transaction grain is appropriate for usage-based billing models but is not the right unit for annual commitment contracts. It disconnects the metric from the renewal decision and makes NRR calculation unintuitive.',
          },
          {
            id: 'd',
            label: 'Per product SKU — one unit = one plan or feature tier',
            scoreValue: 0,
            rationale:
              'SKU-level grain measures product mix rather than customer revenue health. Discount program impact is best understood at the account level, where the full customer relationship — including expansion, contraction, and churn — is visible.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should govern whether the discount program expands to all accounts?',
        options: [
          {
            id: 'a',
            label:
              'Pre-committed: NRR improvement in discount cohort vs. control AND gross margin guardrail stable',
            scoreValue: 2,
            rationale:
              'Requiring both NRR improvement and margin stability ensures the program is growing revenue in a financially sustainable way. Pre-committing prevents the temptation to declare success on ARR growth or bookings when the discount cohort shows early churn signals.',
          },
          {
            id: 'b',
            label: 'ARR growth exceeds pre-program target',
            scoreValue: 1,
            rationale:
              'ARR growth is a reasonable success signal for a growth program but is insufficient without the margin and retention guardrail. Early ARR growth from discounted accounts may reverse at renewal, making it a premature success signal.',
          },
          {
            id: 'c',
            label: 'Total bookings growth above baseline during program period',
            scoreValue: 0,
            rationale:
              'Bookings growth is mechanically guaranteed by any discount program that increases signing volume. Using it as a success threshold provides zero information about whether the program created sustainable revenue value.',
          },
          {
            id: 'd',
            label: 'Finance sign-off based on revenue impact model',
            scoreValue: 0,
            rationale:
              'Revenue impact models are important planning tools but are not a substitute for empirical cohort data. A model built on optimistic retention assumptions will validate any discount level — the decision rule must be grounded in observed NRR and margin data.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "Discount programs create a metric trap where top-line revenue signals improve while the underlying revenue quality deteriorates. Gross bookings and ARR growth are structurally guaranteed to increase when discounts increase signing volume — they cannot distinguish between high-quality customers acquired efficiently and price-sensitive customers who will churn at renewal. NRR is the right primary because it integrates the full revenue lifecycle: expansion, contraction, and churn in the discount cohort. The gross margin guardrail is essential because NRR can improve while profitability deteriorates if discounts are deep enough. A senior analyst pre-commits both conditions before the program launches and waits for at least one renewal cycle before declaring success.",
      metricTree: [
        {
          role: 'primary',
          name: 'Net revenue retention (NRR)',
          rationale:
            'Captures the full revenue lifecycle of discount cohorts including expansion, contraction, and churn — the only metric that distinguishes quality growth from volume growth.',
        },
        {
          role: 'diagnostic',
          name: 'Contribution margin per customer',
          rationale:
            'Reveals whether discounted pricing is still economically viable at the unit level before the NRR signal fully develops.',
        },
        {
          role: 'diagnostic',
          name: 'Churn rate by discount cohort',
          rationale:
            'Isolates whether price-sensitive customers attracted by discounts have meaningfully different retention behavior from baseline accounts.',
        },
        {
          role: 'guardrail',
          name: 'Gross margin percentage',
          rationale:
            'Catches the scenario where NRR improves on growing revenue that is less profitable — volume growth at the cost of margin health.',
        },
        {
          role: 'guardrail',
          name: 'Time-to-churn in discount cohort',
          rationale:
            'Early warning signal for the worst-case discount outcome: customers who sign annual commitments but exit before renewal.',
        },
      ],
      commonMistakes: [
        'Using gross bookings or GMV as the success metric for a discount program — both are mechanically guaranteed to improve when discounts increase signing volume, providing zero signal about revenue quality.',
        'Declaring ARR growth success before a renewal cycle has completed — discounted accounts can appear healthy through the initial contract period while carrying latent churn risk that only surfaces at renewal.',
        "Omitting gross margin guardrails — a discount program can improve NRR while simultaneously degrading profitability if the expansion revenue comes from deeply discounted accounts expanding at the same low price.",
      ],
      interviewPhrase:
        "For a discount program, the key question is whether we're growing revenue or just pulling forward future churn at a lower price. I'd use NRR as the primary because it captures the full lifecycle of discounted accounts, and I'd require a gross margin guardrail because NRR can improve on revenue that isn't profitable. I'd also wait for at least one renewal cycle before calling it a win — early ARR growth from discount-driven signing is not evidence of sustainable revenue.",
    },
  },

  {
    id: 'M06',
    title: 'What Proves the Support Bot Is Actually Helping?',
    subtitle: 'Threadline · B2B SaaS · AI-Powered Support',
    difficulty: 'senior',
    isFree: false,
    domain: 'genai',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'guardrail-metric'],
    linkedDesignScenarioIds: [],
    linkedReviewScenarioIds: [],
    context: {
      company: 'Threadline',
      product: 'GenAI support bot replacing first-tier human support',
      businessGoal: 'Reduce support cost while maintaining customer satisfaction',
      pressure:
        'The support VP wants to prove bot ROI by end of quarter with a clear metric.',
      trap:
        'Deflection rate alone rewards hiding human escalation paths or providing superficially confident answers that close tickets without resolving issues — users stop trying to escalate rather than getting resolved, which looks identical to genuine resolution in deflection data.',
    },
    fields: [
      {
        id: 'primaryMetric',
        label: 'Primary metric',
        type: 'single',
        prompt:
          'Threadline has deployed a GenAI support bot as the first tier of customer support. Which metric should determine whether the bot is genuinely helping customers?',
        options: [
          {
            id: 'a',
            label: 'Resolved contact rate — % of support contacts resolved without human escalation within 24 hours',
            scoreValue: 2,
            rationale:
              "Resolved contact rate requires both non-escalation AND a 24-hour resolution window, which distinguishes genuine resolution from users who gave up trying. The time-bound component is critical: a contact that doesn't escalate within 24h is likely to show up as a repeat contact if unresolved, which the guardrail catches.",
          },
          {
            id: 'b',
            label: 'First-contact resolution rate — % of contacts where the issue is fully resolved on the first interaction',
            scoreValue: 2,
            rationale:
              'First-contact resolution is a classic support quality metric that measures whether the bot solved the problem on the first attempt. It is harder to game than deflection rate because a user who recontacts within a short window undermines the first-contact claim.',
          },
          {
            id: 'c',
            label: 'Deflection rate — % of support contacts that never result in a human agent escalation',
            scoreValue: 0,
            rationale:
              'Deflection rate is the most dangerous primary metric for a support bot because it is directly optimizable by making escalation harder to access. A bot can achieve 95% deflection by burying escalation buttons, giving confident-sounding wrong answers, or closing tickets before users can respond. High deflection with low resolution is the core failure mode of AI support systems.',
          },
          {
            id: 'd',
            label: 'Average handle time (AHT) per contact — average duration of bot interactions',
            scoreValue: 0,
            rationale:
              'AHT optimization drives bots to close conversations quickly rather than resolve issues thoroughly. A bot that ends conversations fast with deflection achieves low AHT while leaving issues unresolved — it optimizes process efficiency at the expense of customer outcome.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best distinguishes genuine bot resolution from the deflection-without-resolution failure mode?',
        options: [
          {
            id: 'a',
            label:
              'Repeat contact rate (same issue within 7 days) + CSAT score + escalation quality (% escalations resolved by human on first try)',
            scoreValue: 2,
            rationale:
              'Repeat contact rate is the acid test: if the bot resolved the issue, the user should not recontact about the same topic within 7 days. CSAT provides the customer satisfaction dimension. Escalation quality measures whether human agents are receiving well-prepared escalations or cleaning up bot failures — a key signal of bot response quality.',
          },
          {
            id: 'b',
            label: 'Average session length per bot interaction + number of turns per conversation',
            scoreValue: 1,
            rationale:
              'Session length and turn count provide engagement context — very short sessions may indicate issue resolution or abandonment — but cannot distinguish between these outcomes without an outcome signal. They are useful input diagnostics but not resolution diagnostics.',
          },
          {
            id: 'c',
            label: 'Deflection rate by ticket category',
            scoreValue: 0,
            rationale:
              'Segmented deflection rate inherits all the problems of the top-line deflection metric. Knowing which categories are deflected most does not tell you whether those deflections were genuine resolutions or user abandonments.',
          },
          {
            id: 'd',
            label: 'Bot response latency + uptime percentage',
            scoreValue: 0,
            rationale:
              'Latency and uptime are infrastructure health metrics, not resolution quality diagnostics. A bot that responds instantly with wrong answers and a bot that responds slowly with correct answers have identical infrastructure metrics but opposite customer outcomes.',
          },
        ],
      },
      {
        id: 'guardrailMetrics',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against the specific failure modes of a GenAI support bot optimizing for deflection?',
        options: [
          {
            id: 'a',
            label:
              'Repeat contact rate + hallucination/error flag rate + human escalation satisfaction score',
            scoreValue: 2,
            rationale:
              'Repeat contact rate catches the resolution-without-resolution failure mode. Hallucination/error flag rate is specific to GenAI: a model that gives confidently wrong answers will deflect contacts while causing downstream harm — this guardrail is unique to AI support. Human escalation CSAT catches whether escalated users received a satisfying resolution, flagging cases where the bot damaged the customer relationship before escalation.',
          },
          {
            id: 'b',
            label: 'Overall CSAT score averaged across all support channels',
            scoreValue: 1,
            rationale:
              'Aggregate CSAT provides a broad satisfaction guardrail but is diluted by non-bot interactions. It would not catch a bot that is degrading CSAT for its cohort of users while aggregate scores remain stable due to human support performance.',
          },
          {
            id: 'c',
            label: 'Human agent headcount change over the deployment period',
            scoreValue: 0,
            rationale:
              'Headcount is a cost metric, not a quality guardrail. Using it as a guardrail creates perverse pressure to maintain deflection rate to justify headcount decisions, reinforcing the deflection trap rather than guarding against it.',
          },
          {
            id: 'd',
            label: 'No guardrails — resolved contact rate covers the key risk',
            scoreValue: 0,
            rationale:
              'Even a well-designed primary metric like resolved contact rate can be gamed if the bot learns to close tickets with superficially complete answers. The hallucination rate guardrail is especially critical for GenAI — it catches a failure mode that has no analog in rule-based support systems.',
          },
        ],
      },
      {
        id: 'denominator',
        label: 'Denominator / grain',
        type: 'single',
        prompt:
          'At what grain should support bot effectiveness be measured?',
        options: [
          {
            id: 'a',
            label: 'Per support contact/ticket — one unit = one customer-initiated support request',
            scoreValue: 2,
            rationale:
              'The support contact is the natural unit of analysis for a support system: each contact represents one customer issue that should be resolved. Per-contact grain directly maps to the business goal (reduce contacts requiring human escalation) and enables cohort analysis by issue type, customer tier, and bot version.',
          },
          {
            id: 'b',
            label: 'Per user — one unit = one customer account in a given period',
            scoreValue: 1,
            rationale:
              'Per-user grain is appropriate for measuring the support experience across the customer lifecycle but is less precise for evaluating bot effectiveness on specific contact types. A user with one complex issue looks identical to a user with three simple issues at per-user grain.',
          },
          {
            id: 'c',
            label: 'Per bot session — one unit = one continuous bot conversation',
            scoreValue: 0,
            rationale:
              'Per-session grain is problematic because a single support ticket may involve multiple sessions (user returns to continue a conversation). It also inflates the denominator if the bot restarts sessions frequently, making resolution rates appear lower than they are.',
          },
          {
            id: 'd',
            label: 'Per bot response — one unit = one bot message sent',
            scoreValue: 0,
            rationale:
              'Per-response grain is the operational telemetry level — it has no meaningful relationship to contact resolution and would produce a metric that rewards verbose bots that send many messages over concise bots that resolve issues quickly.',
          },
        ],
      },
      {
        id: 'successThreshold',
        label: 'Success threshold / decision rule',
        type: 'single',
        prompt:
          'What decision rule should govern whether the support bot is declared a success and expanded?',
        options: [
          {
            id: 'a',
            label:
              'Pre-committed: significant improvement in resolved contact rate AND repeat contact guardrail stable AND hallucination flag rate below threshold',
            scoreValue: 2,
            rationale:
              'Three conditions are necessary for a GenAI support bot: genuine resolution improvement, confirmation that resolutions are not just superficial closures (repeat contact guardrail), and safety against the hallucination failure mode that is unique to AI systems. All three must be pre-committed to prevent post-hoc rationalization.',
          },
          {
            id: 'b',
            label: 'Any reduction in human escalation volume with positive CSAT trend',
            scoreValue: 1,
            rationale:
              'Reduced escalations with positive CSAT is a reasonable combined signal but is not specific enough. CSAT trends can be positive even when repeat contact rates are rising, and escalation volume reductions can be achieved by hiding escalation paths.',
          },
          {
            id: 'c',
            label: 'Deflection rate above X% target set by support VP',
            scoreValue: 0,
            rationale:
              "This is the exact decision rule that generates the deflection trap. A target deflection rate creates organizational pressure to find the most efficient path to deflection — which is hiding escalation paths and providing confident-but-wrong answers, not genuinely resolving issues.",
          },
          {
            id: 'd',
            label: 'Cost per contact reduction exceeds pre-defined ROI threshold',
            scoreValue: 0,
            rationale:
              'Cost per contact can be reduced by deflecting unresolved issues or reducing bot response quality — both of which generate repeat contacts that eventually cost more. A cost metric without resolution quality conditions creates the same deflection gaming pressure as deflection rate directly.',
          },
        ],
      },
    ],
    scoringRubric: {
      dimensions: [
        { id: 'primary', label: 'Primary metric selection', weight: 0.30, fieldId: 'primaryMetric' },
        { id: 'guardrails', label: 'Guardrail coverage', weight: 0.25, fieldId: 'guardrailMetrics' },
        { id: 'diagnostics', label: 'Diagnostic metrics', weight: 0.25, fieldId: 'diagnosticMetrics' },
        { id: 'grain', label: 'Denominator / grain', weight: 0.20, fieldId: 'denominator' },
      ],
    },
    seniorMetricDesign: {
      summary:
        "GenAI support bots have a specific failure mode that rule-based systems do not: they can generate confident-sounding wrong answers that close tickets without resolving issues. This makes deflection rate — the most intuitive ROI metric — actively dangerous, because it rewards the exact behavior that causes this failure. The primary metric must require a resolution outcome with a time-bound, not just the absence of escalation. The repeat contact guardrail is the empirical acid test for resolution quality. The hallucination/error flag rate is a GenAI-specific guardrail with no analog in traditional support systems — it must be included because a model that sounds authoritative while being wrong will produce delayed harm that CSAT scores do not immediately capture.",
      metricTree: [
        {
          role: 'primary',
          name: 'Resolved contact rate',
          rationale:
            'Measures genuine resolution without human escalation within 24h — the time-bound component distinguishes resolution from abandonment.',
        },
        {
          role: 'diagnostic',
          name: 'Repeat contact rate (7-day same-issue window)',
          rationale:
            'The acid test for resolution quality: genuine resolutions should not generate repeat contacts within 7 days on the same issue.',
        },
        {
          role: 'diagnostic',
          name: 'CSAT score (bot interaction)',
          rationale:
            'Customer satisfaction captures the subjective resolution experience and catches low-quality deflections that resolve the ticket without satisfying the user.',
        },
        {
          role: 'diagnostic',
          name: 'Escalation quality (% escalations resolved by human on first try)',
          rationale:
            'Measures whether the bot is preparing good escalations or passing on damaged customer relationships — a key signal of bot response quality.',
        },
        {
          role: 'guardrail',
          name: 'Repeat contact rate',
          rationale:
            'Prevents the deflection-without-resolution failure mode — a bot that closes tickets without solving problems will see repeat contacts rise.',
        },
        {
          role: 'guardrail',
          name: 'Hallucination/error flag rate',
          rationale:
            'GenAI-specific guardrail: confident wrong answers damage customer trust and cause downstream harm before aggregate metrics detect the problem.',
        },
        {
          role: 'guardrail',
          name: 'Human escalation satisfaction score',
          rationale:
            'Catches the pattern where the bot damages the customer relationship before escalation, making human agent resolution harder.',
        },
      ],
      commonMistakes: [
        'Using deflection rate as the primary success metric — this creates a direct organizational incentive to hide escalation paths and provide superficially confident answers rather than genuinely resolve issues.',
        'Omitting hallucination and error rate as a guardrail — this is the GenAI-specific failure mode that traditional support metrics were not designed to catch, and it can cause significant customer harm before CSAT signals deteriorate.',
        'Declaring success before repeat contact data has accumulated — the repeat contact signal takes 7-14 days to fully develop, and bots that close tickets with wrong answers will look successful in the first few days of deployment.',
      ],
      interviewPhrase:
        "For a GenAI support bot, deflection rate is the wrong primary metric because it rewards making escalation hard to find. I'd use resolved contact rate with a 24-hour window instead, and I'd require a repeat contact guardrail to confirm resolutions are genuine. The one thing I'd add that's specific to AI support is a hallucination flag rate guardrail — a model that sounds authoritative while being wrong will damage customer relationships before CSAT data shows the problem.",
    },
  },

  {
    id: 'M07',
    title: 'What Should We Optimize in the Feed?',
    subtitle: 'Spark · Consumer Social · Feed Ranking',
    difficulty: 'senior',
    isFree: false,
    domain: 'engagement',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'guardrail-metric', 'primary-metric'],
    linkedDesignScenarioIds: [],
    linkedReviewScenarioIds: [],
    context: {
      company: 'Spark',
      product: 'Short-video feed ranking model',
      businessGoal: 'Improve feed ranking to drive genuine user value and long-run retention',
      pressure:
        'The growth team is running a ranking model experiment and needs a metric framework before the next sprint. Stakeholders are split between optimizing for likes/comments (easy to measure, high signal volume) vs. time-spent (deeper consumption, but ambiguous).',
      trap:
        'Likes and comments are emotionally reactive signals that optimize for provocative or outrage-inducing content, not genuine value. Time-spent conflates passive scroll-trap behavior with genuine enjoyment — a user stuck in a dopamine loop looks identical to a user discovering content they love. The real north star is intentional action: saves and shares to close friends require deliberate effort and predict long-run retention far better than passive consumption signals.',
    },
    fields: [
      {
        id: 'northStar',
        label: 'North-star metric',
        type: 'single',
        prompt:
          'Spark is testing a new feed ranking model. Which metric should be the single north star for the experiment?',
        options: [
          {
            id: 'a',
            label: 'Avg session depth — average number of posts viewed per session',
            scoreValue: 0,
            rationale:
              'Session depth measures how far users scroll, which is maximized by an infinite-scroll trap rather than by delivering content users genuinely value. A ranking model optimized for session depth will learn to surface addictive, hard-to-stop content rather than content users find meaningful — producing a metric win alongside a degraded user experience.',
          },
          {
            id: 'b',
            label: 'Like + comment rate — combined like and comment interactions per post impression',
            scoreValue: 0,
            rationale:
              'Like and comment signals are heavily weighted toward emotionally provocative content — outrage, controversy, and shock drive high reaction rates. A ranking model trained on these signals will systematically surface content that triggers emotional reactions over content that delivers genuine value, producing a well-documented long-term retention and wellbeing problem.',
          },
          {
            id: 'c',
            label: 'Save rate + share-to-close-friend rate — intentional value actions per post impression',
            scoreValue: 2,
            rationale:
              'Saves and direct shares to close friends are deliberate, high-effort actions that users only perform when content genuinely resonates. Unlike likes or watch time, these actions require conscious intent — they cannot be triggered by outrage or passive inertia. Research across social platforms consistently shows that save and close-friend share rates predict long-run retention and content satisfaction better than reactive engagement signals.',
          },
          {
            id: 'd',
            label: 'Daily active users — unique users with any app open each day',
            scoreValue: 1,
            rationale:
              'DAU provides a broad health signal that is independent of the specific engagement trap risks, making it a reasonable guardrail or secondary metric. However, it is too high-level and too slow-moving to serve as the north star for a ranking model experiment — it aggregates organic growth, notification-driven opens, and genuine content engagement into an undifferentiated count.',
          },
        ],
      },
      {
        id: 'guardrails',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against a ranking model that optimizes for scroll-trap behavior at the expense of user wellbeing?',
        options: [
          {
            id: 'a',
            label: 'Regret signal rate (user closes app immediately after session) + creator diversity index (breadth of creators in feed)',
            scoreValue: 2,
            rationale:
              'The regret signal rate — users who close the app immediately after a session, especially after long sessions — is a direct behavioral proxy for the scroll-trap failure mode: users spent time they did not intend to spend and felt bad about it. The creator diversity index guards against the filter-bubble risk of a save/share-optimized model, which could aggressively narrow the feed to a small set of proven creators, reducing the discovery that drives long-term platform health.',
          },
          {
            id: 'b',
            label: 'Session count — total number of sessions per user per day',
            scoreValue: 0,
            rationale:
              'Session count is a broad engagement volume metric with no diagnostic power for the scroll-trap failure mode. A model that creates dopamine-loop content will increase session count as users return compulsively — making this guardrail directionally perverse: it would signal danger as improvement.',
          },
          {
            id: 'c',
            label: 'Notification open rate — % of push notifications that result in an app open',
            scoreValue: 0,
            rationale:
              'Notification open rate measures the quality of the notification channel, not feed ranking quality. It operates in a different product funnel and provides no signal about whether the ranking model is creating genuine value or a scroll trap.',
          },
          {
            id: 'd',
            label: 'Time-between-opens — average hours between consecutive app sessions',
            scoreValue: 1,
            rationale:
              'Time-between-opens provides a partial signal: a scroll-trap model may reduce time-between-opens as users return compulsively, which would correctly flag a problem. However, it is a lagging and noisy signal that conflates notification-driven returns with organic habit — the regret signal rate and creator diversity index provide more direct and actionable measurement of the specific failure modes.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best explains why the north-star metric (save rate + share-to-close-friend rate) moved or failed to move?',
        options: [
          {
            id: 'a',
            label: 'Content category breakdown of saves + shares by cohort + scroll depth distribution by user segment',
            scoreValue: 2,
            rationale:
              'Breaking saves and shares by content category reveals which content types are driving the north-star improvement — essential for understanding whether the ranking model is surfacing genuinely diverse valuable content or over-indexing on a narrow category. Scroll depth distribution by user segment distinguishes between users who are engaging deeply with curated content versus users showing passive over-consumption patterns, providing the diagnostic layer needed to separate healthy engagement from scroll traps.',
          },
          {
            id: 'b',
            label: 'Total video plays — raw count of videos played per day',
            scoreValue: 0,
            rationale:
              'Total video plays is a volume metric that measures how often the feed auto-advances, which correlates more with scroll depth and session length than with intentional engagement. It cannot distinguish saves and shares from passive consumption and provides no causal diagnostic for north-star metric movement.',
          },
          {
            id: 'c',
            label: 'Follower growth rate — net new followers gained by creators in the experiment period',
            scoreValue: 0,
            rationale:
              'Follower growth is a creator-side supply metric that is influenced by many factors beyond feed ranking quality, including external promotion, trends, and notification strategies. It provides no diagnostic signal about why individual user engagement with the feed changed.',
          },
          {
            id: 'd',
            label: 'DAU/MAU ratio — daily to monthly active user ratio as an engagement depth proxy',
            scoreValue: 1,
            rationale:
              'DAU/MAU provides a useful habit-formation signal and is independent of the gaming risks of the other options. However, it is too aggregated to explain why the save and share rate moved — it conflates session frequency, content quality, notification effects, and seasonal patterns into a single ratio with limited diagnostic resolution for a ranking model experiment.',
          },
        ],
      },
    ],
    debrief: {
      summary:
        'The core tension in feed ranking metric design is optimizing for engagement versus optimizing for genuine user value. Likes and comments optimize for emotionally reactive content — they are the path to outrage-driven feeds. Time-spent optimizes for passivity — it is the path to scroll traps. The right north star captures intentional user actions that require deliberate effort and reflect real content value: saves signal "I want to return to this" and direct shares signal "this is worth someone else\'s attention." Both actions predict long-run retention and user satisfaction better than any passive consumption metric because they cannot be manufactured by content that exploits psychological vulnerabilities.',
      seniorRead:
        'A senior analyst recognizes that the choice of engagement metric is not neutral — it shapes the content ecosystem. A like-optimized feed becomes an outrage machine; a time-spent-optimized feed becomes a scroll trap; a save/share-optimized feed has structural pressure toward content with genuine informational or emotional value. The guardrail design is equally important: the regret signal rate operationalizes the scroll-trap failure mode in behavioral terms, and the creator diversity index prevents the save/share north star from collapsing the feed into a small set of proven creators at the expense of discovery. In an interview, the strongest answer frames this as a values choice embedded in a metric, not just a measurement problem.',
      commonMistake:
        'The most common mistake is optimizing for a high-volume engagement signal (likes, comments, time-spent) because it is easy to measure and shows clear movement. This produces exactly the content ecosystem the platform claims not to want. The subtler mistake is treating time-spent as a neutral north star — it sounds like it rewards quality, but it structurally rewards addiction. Candidates who cannot explain why save rate is superior to watch time have not internalized the difference between behavioral intent and passive consumption.',
      interviewPhrase:
        'I\'d ask what user action the metric requires deliberate intent to perform. Likes are reactive — one thumb tap in a fraction of a second. Watch time is passive — doing nothing is enough. Saves and direct shares require a user to stop, think "this is worth keeping or sharing," and take an extra action. That deliberate intent is the signal. A ranking model trained on deliberate intent will surface content that earns it. A ranking model trained on watch time will surface content that captures attention, which is a very different optimization target.',
      connectsTo: ['proxy-metric', 'metric-gaming', 'guardrail-metric'],
    },
  },

  {
    id: 'M08',
    title: 'What Proves the Bidding Engine Is Winning?',
    subtitle: 'Clearstream · B2B · Ad Tech Marketplace',
    difficulty: 'senior',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['marketplace-interference', 'guardrail-metric', 'primary-metric'],
    linkedDesignScenarioIds: [],
    linkedReviewScenarioIds: [],
    context: {
      company: 'Clearstream',
      product: 'Real-time bidding (RTB) platform — new bidding algorithm evaluation',
      businessGoal: 'Evaluate a new bidding algorithm that improves marketplace efficiency for both advertisers and publishers',
      pressure:
        'The head of product wants a clear metric framework before the algorithm experiment launches. The engineering team is pushing to use total revenue cleared as the success metric because it is easy to compute.',
      trap:
        'Total revenue cleared is the most intuitive metric but conflates volume with marketplace health. A bidding algorithm that extracts higher CPMs will increase revenue short-term while churning cost-sensitive advertisers. An algorithm that improves fill rate will delight publishers but may accept low-quality bids that degrade advertiser ROAS. In a two-sided marketplace, optimizing one side at the expense of the other is the canonical failure mode — and revenue is always a lagging indicator of that deterioration.',
    },
    fields: [
      {
        id: 'northStar',
        label: 'North-star metric',
        type: 'single',
        prompt:
          'Clearstream is testing a new bidding algorithm. Which metric should be the primary judge of whether the algorithm improves the marketplace?',
        options: [
          {
            id: 'a',
            label: 'Total cleared spend — total advertiser spend transacted through the platform per period',
            scoreValue: 1,
            rationale:
              'Total cleared spend captures marketplace volume and is a real business outcome, making it a reasonable secondary metric. However, it conflates healthy volume growth with growth driven by CPM extraction or fill-rate gaming — a new algorithm that forces higher prices will improve cleared spend while accelerating advertiser churn, and this metric will not detect the deterioration until it is too late to course correct.',
          },
          {
            id: 'b',
            label: 'Marketplace liquidity score — clearance rate × avg CPM × demand concentration index',
            scoreValue: 2,
            rationale:
              'Marketplace liquidity score is the only single metric that simultaneously captures all three dimensions of a healthy RTB marketplace: clearance rate (are auctions resolving?), average CPM (are prices healthy for publishers?), and demand concentration index (is demand diverse enough that losing one advertiser is not catastrophic?). It cannot be improved by gaming any one dimension — raising CPM while reducing clearance rate or concentrating demand will lower the composite score, making it resistant to the single-sided optimization that total spend enables.',
          },
          {
            id: 'c',
            label: 'Publisher fill rate — % of available ad inventory that is filled with a winning bid',
            scoreValue: 0,
            rationale:
              'Publisher fill rate measures the supply side of the marketplace only. An algorithm that accepts any bid, including very low-quality or low-CPM bids, can achieve near-100% fill rate while degrading publisher revenue and advertiser quality simultaneously. Fill rate optimization without CPM and ROAS guardrails is one of the most common RTB algorithm failure modes.',
          },
          {
            id: 'd',
            label: 'Advertiser ROAS — return on ad spend for advertisers on the platform',
            scoreValue: 0,
            rationale:
              'Advertiser ROAS measures the demand side of the marketplace only. An algorithm that improves ROAS by aggressively filtering low-performing inventory will delight advertisers while destroying publisher revenue and reducing inventory supply — degrading marketplace liquidity even as the demand-side metric improves. One-sided metrics are structurally incapable of evaluating a two-sided marketplace algorithm.',
          },
        ],
      },
      {
        id: 'guardrails',
        label: 'Guardrail metrics',
        type: 'single',
        prompt:
          'Which guardrail set best protects against a bidding algorithm that improves the north-star metric by degrading one side of the marketplace?',
        options: [
          {
            id: 'a',
            label: 'Advertiser 7-day retention rate + publisher floor price breach rate',
            scoreValue: 2,
            rationale:
              'Advertiser 7-day retention catches the demand-side churn signal before it compounds into lost volume — advertisers who pause campaigns within 7 days of the new algorithm going live are the early warning that CPM extraction or poor ROAS is eroding the demand side. Publisher floor price breach rate catches the supply-side failure mode: if the algorithm is accepting bids below publisher floor prices to inflate fill rate or clearance metrics, this guardrail will surface it before publisher relationship damage accumulates.',
          },
          {
            id: 'b',
            label: 'Total impressions served — raw count of ad impressions delivered per period',
            scoreValue: 0,
            rationale:
              'Total impressions served is a volume metric that can be improved by accepting low-quality bids, reducing floor prices, or degrading targeting quality — all failure modes of RTB algorithms. It does not protect either side of the marketplace and provides no directional signal about which side is being harmed.',
          },
          {
            id: 'c',
            label: 'Average bid price — mean price submitted by advertisers per auction',
            scoreValue: 0,
            rationale:
              'Average bid price measures advertiser willingness to pay at submission, not the health of the clearing mechanism or the experience of either side post-auction. It is influenced heavily by audience quality and targeting changes that are independent of the bidding algorithm, making it a noisy and non-diagnostic guardrail.',
          },
          {
            id: 'd',
            label: 'Publisher revenue per 1000 impressions (RPM) — publisher-side yield per unit of inventory',
            scoreValue: 1,
            rationale:
              'Publisher RPM captures the supply-side health of the marketplace — it is a genuine guardrail against algorithms that sacrifice publisher yield for fill rate or clearance metrics. However, it covers only the publisher side, leaving the advertiser churn risk unmonitored. A complete guardrail set requires both sides of the marketplace to be protected simultaneously.',
          },
        ],
      },
      {
        id: 'diagnosticMetrics',
        label: 'Diagnostic metrics',
        type: 'single',
        prompt:
          'Which diagnostic set best explains why the marketplace liquidity score moved — or failed to move — in the experiment?',
        options: [
          {
            id: 'a',
            label: 'Bid density curve (bids per auction by price tier) + win rate by advertiser segment + fill rate by inventory category',
            scoreValue: 2,
            rationale:
              'The bid density curve reveals whether the new algorithm is changing the competitive dynamics of auctions — are more advertisers bidding at each price tier, or has concentration increased? Win rate by advertiser segment identifies whether specific advertiser cohorts (large vs. small, performance vs. brand) are benefiting or being excluded. Fill rate by inventory category pinpoints which publisher inventory types are affected, enabling targeted diagnosis of supply-side impacts. Together these three diagnostics decompose every component of the liquidity score.',
          },
          {
            id: 'b',
            label: 'Total auctions run — count of auctions held per period',
            scoreValue: 0,
            rationale:
              'Total auctions run is an operational throughput metric driven by publisher supply volume and platform infrastructure, not by the quality of the bidding algorithm. It cannot explain why clearance rate, CPM, or demand concentration changed and provides no causal diagnostic value for algorithm evaluation.',
          },
          {
            id: 'c',
            label: 'Revenue per advertiser — average cleared spend per advertiser account',
            scoreValue: 1,
            rationale:
              'Revenue per advertiser provides a useful demand-side diagnostic — it reveals whether the algorithm is growing per-advertiser spend (healthy expansion) or concentrating spend in fewer, larger advertisers (concentration risk). However, it covers only the demand side and cannot diagnose supply-side dynamics or auction mechanism changes, making it a partial diagnostic that requires supply-side metrics to be complete.',
          },
          {
            id: 'd',
            label: 'Publisher CPM distribution — histogram of CPMs achieved across publisher inventory',
            scoreValue: 1,
            rationale:
              'Publisher CPM distribution is a valuable supply-side diagnostic that reveals whether the algorithm is improving yields across inventory types or concentrating value in premium inventory while degrading the long tail. Like revenue per advertiser, it covers one side of the marketplace well but cannot diagnose the demand-side or auction mechanism dynamics that explain the full liquidity score movement.',
          },
        ],
      },
    ],
    debrief: {
      summary:
        'RTB marketplaces present the hardest metric design problem in product analytics: you are evaluating an algorithm that operates on a two-sided dynamic system where improving one side can erode the other. The sophisticated analyst rejects revenue throughput as the primary metric because it is a lagging indicator that conflates health with extraction. The right north star — marketplace liquidity — captures the simultaneous health of both sides through a composite that cannot be gamed by single-sided optimization. Guardrails on advertiser retention and publisher floor price breaches provide early warning on both sides independently, and the diagnostic tier decomposes the liquidity score into its auction-mechanism, demand-side, and supply-side components.',
      seniorRead:
        'The senior insight in RTB metric design is understanding that marketplace liquidity is not a metaphor — it is an operationalizable composite metric. Clearance rate measures whether auctions are resolving (the mechanism works). Average CPM measures whether prices are healthy for the supply side. Demand concentration index measures whether the marketplace has systemic fragility from over-reliance on a small number of large advertisers. A bidding algorithm that improves clearance and CPM while concentrating demand is building a structurally fragile marketplace that looks healthy in aggregate metrics until the top advertiser churns. The concentration index guardrails against exactly this risk. In an interview, candidates who can define marketplace liquidity as a composite and explain each component demonstrate a genuine understanding of two-sided platform dynamics that most product analysts miss.',
      commonMistake:
        'The most common mistake is using total revenue cleared as the primary metric because it is the most visible business outcome. This produces an algorithm that maximizes short-term extraction — higher CPMs delight publishers and increase revenue, but accelerate advertiser churn. The subtler mistake is using a single-sided metric (fill rate or ROAS) as the north star, which is equivalent to optimizing a two-player game by only looking at one player\'s score. Candidates who do not immediately recognize that any single-sided metric is structurally insufficient for a two-sided marketplace evaluation need to develop their marketplace mechanics intuition.',
      interviewPhrase:
        'In a two-sided marketplace, any single-sided metric is a trap. Fill rate maximization will accept terrible bids to fill inventory. ROAS maximization will filter so aggressively that publishers lose yield. Revenue maximization will extract CPMs until advertisers churn. The right framework asks: what does a healthy marketplace look like on both sides simultaneously? That\'s marketplace liquidity — auctions clearing at healthy prices with diverse demand. I\'d build the primary metric as a composite of those three dimensions, put advertiser retention and publisher floor price breach rates as guardrails for early-warning on both sides, and decompose the composite with bid density and segment win-rate diagnostics when I need to explain the movement.',
      connectsTo: ['marketplace-interference', 'guardrail-metric', 'primary-metric'],
    },
  },
];

export const metricCasesById = Object.fromEntries(metricCases.map(c => [c.id, c]));
