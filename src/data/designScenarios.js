// Product Analytics Lab — Experiment Design Room Scenario Data
// V1.2 — 4 scenarios, all paired with Review Room counterparts

export const designScenarios = [

  // ─────────────────────────────────────────────
  // D01 — Design the Checkout Test (FREE · Analyst)
  // Paired with: s01-checkout-trap
  // Core trap: metric selection — picking conversion rate without defining revenue protection
  // ─────────────────────────────────────────────
  {
    id: 'd01-checkout-test',
    title: 'Design the Checkout Test',
    subtitle: 'Crestline Home wants to remove their checkout upsell widget. Design the experiment.',
    isFree: true,
    difficulty: 'analyst',
    industry: 'ecommerce',
    scenarioFamily: 'metric_conflict',
    pairedReviewScenarioId: 's01-checkout-trap',

    context: {
      company: 'Crestline Home',
      product: 'Direct-to-consumer e-commerce storefront — premium home goods, ~$55M ARR',
      team: 'Growth & Conversion team',
      background: 'Crestline\'s checkout page has a "complete your look" upsell carousel widget that fires after cart add. The design team believes it\'s friction. Merchandising believes it drives revenue. Engineering has capacity to A/B test removing it. Your job: design the experiment before any data is collected.',
      featureProposal: 'Remove the upsell widget from the checkout flow. Hypothesis: friction reduction improves checkout completion enough to offset any lost upsell revenue.',
      businessPressure: 'Q4 starts in 3 weeks. The Head of Growth wants a fast test. The VP of E-commerce wants a clean decision before the holiday campaign launches.',
      constraints: [
        '14-day maximum runtime before the Q4 freeze',
        'All checkout traffic is eligible — no major cohort exclusions needed',
        '~42,000 users reach checkout per day',
        'Engineering can support a standard 50/50 split',
      ],
    },

    designPhases: [
      {
        id: 'framing',
        label: 'Framing',
        hint: 'What are you testing and why?',
        fields: [
          {
            id: 'businessDecision',
            label: 'What business decision will this experiment inform?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'bd-a',
                label: 'Whether to permanently remove the upsell widget from checkout',
                scoreValue: 2,
                rationale: 'Correct. The decision is binary and clearly framed: keep or remove. This scopes the test correctly and makes the pre-committed decision rule straightforward.',
              },
              {
                id: 'bd-b',
                label: 'Whether the checkout UX needs improvement',
                scoreValue: 0,
                rationale: 'Too vague. "Needs improvement" is not a decision — it\'s a hypothesis. A test that can only tell you "yes, something is suboptimal" has no clear ship/no-ship output.',
              },
              {
                id: 'bd-c',
                label: 'Whether conversion rate is the right metric for checkout optimization',
                scoreValue: 0,
                rationale: 'This is a meta-question about measurement, not the business decision the experiment is designed to answer. You answer this question before designing the test.',
              },
              {
                id: 'bd-d',
                label: 'Whether removing the widget or redesigning it is the better path',
                scoreValue: 1,
                rationale: 'Reasonable framing — but this experiment only tests removal, not a redesign. You can\'t decide between two variants if only one is tested. Incomplete.',
              },
            ],
          },
          {
            id: 'hypothesis',
            label: 'Select the strongest hypothesis formulation',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'hyp-a',
                label: 'Removing the upsell widget will increase checkout conversion rate by reducing friction, and the conversion lift will exceed the revenue lost from removing the widget.',
                scoreValue: 2,
                rationale: 'Strong. Directional, mechanism-specified, and includes the key tradeoff (conversion gain vs. revenue loss). This is a testable, decision-informing hypothesis.',
              },
              {
                id: 'hyp-b',
                label: 'Users who see the upsell widget are less likely to complete checkout.',
                scoreValue: 1,
                rationale: 'Correct direction and testable, but incomplete. It only covers the friction side of the hypothesis — it doesn\'t address whether the revenue tradeoff is worth it, which is what the business actually cares about.',
              },
              {
                id: 'hyp-c',
                label: 'Removing friction from checkout will improve the user experience.',
                scoreValue: 0,
                rationale: 'Not a useful hypothesis. "Improves user experience" is not measurable. There\'s no clear metric, direction, or mechanism. This would make any experimental outcome ambiguous.',
              },
              {
                id: 'hyp-d',
                label: 'Checkout conversion rate will increase by at least 2% if the upsell widget is removed.',
                scoreValue: 1,
                rationale: 'Specific and testable, but only covers one metric. A checkout test that ignores revenue, AOV, and refund rate is incomplete — you might get the 2% lift and still make the business worse.',
              },
            ],
          },
        ],
      },
      {
        id: 'setup',
        label: 'Setup',
        hint: 'Who gets treated, and how?',
        fields: [
          {
            id: 'eligiblePopulation',
            label: 'Who should be included in the experiment?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'ep-a',
                label: 'All users who reach the checkout page during the test window',
                scoreValue: 2,
                rationale: 'Correct. The feature lives on the checkout page and affects all users who reach it. Restricting eligibility further would reduce power without improving validity.',
              },
              {
                id: 'ep-b',
                label: 'Only new users, to avoid confounding repeat purchase behavior',
                scoreValue: 0,
                rationale: 'This would invalidate external validity for returning customers — a significant segment in an e-commerce site. The widget is shown to all users; restricting to new users produces a result that doesn\'t generalize.',
              },
              {
                id: 'ep-c',
                label: 'Only users with cart values above $50, since they\'re most likely to respond to upsells',
                scoreValue: 0,
                rationale: 'Restricting to high-cart-value users would bias the test toward users where upsell revenue loss is highest. This inflates apparent harm and doesn\'t reflect the true average effect.',
              },
              {
                id: 'ep-d',
                label: 'All users who reach checkout, excluding those who arrived via paid ad campaigns',
                scoreValue: 1,
                rationale: 'Reasonable if paid users have different intent, but adds complexity without clear justification. Unless there\'s a specific reason to believe paid traffic responds differently, excluding them reduces generalizability.',
              },
            ],
          },
          {
            id: 'randomizationUnit',
            label: 'What should be the randomization unit?',
            type: 'single_select',
            conceptLinks: ['randomization-unit'],
            options: [
              {
                id: 'ru-a',
                label: 'User (cookie/account)',
                scoreValue: 2,
                rationale: 'Correct. User-level randomization ensures each person consistently sees one version. This respects the durable nature of the checkout experience and maintains independence between observations.',
              },
              {
                id: 'ru-b',
                label: 'Session',
                scoreValue: 0,
                rationale: 'Session-level randomization means the same user could see both versions. This violates independence, inflates apparent sample size, and produces biased estimates — especially harmful for a checkout flow where user expectations may carry across sessions.',
              },
              {
                id: 'ru-c',
                label: 'Cart (each cart gets independently assigned)',
                scoreValue: 1,
                rationale: 'Slightly better than session-level but still problematic. A user can have multiple carts. Multiple exposures for one user violates the independence assumption unless cart history is definitively isolated.',
              },
              {
                id: 'ru-d',
                label: 'Device',
                scoreValue: 0,
                rationale: 'Device-level assignment causes contamination for users who shop on multiple devices — common in e-commerce. The same user could see different versions, polluting both arms.',
              },
            ],
          },
          {
            id: 'unitOfAnalysis',
            label: 'What is the unit of analysis for computing metrics?',
            type: 'single_select',
            conceptLinks: ['unit-of-analysis'],
            options: [
              {
                id: 'ua-a',
                label: 'User — compute conversion rate as users who completed checkout / total users assigned',
                scoreValue: 2,
                rationale: 'Correct. User-level analysis matches user-level randomization. Computing the metric at the same level avoids the variance deflation that comes from treating sessions from the same user as independent.',
              },
              {
                id: 'ua-b',
                label: 'Session — compute conversion rate as sessions that converted / total sessions',
                scoreValue: 0,
                rationale: 'Mismatches the randomization unit. Sessions from the same user are correlated — treating them as independent deflates standard errors and produces overconfident p-values. This is a common mistake that makes results look more significant than they are.',
              },
              {
                id: 'ua-c',
                label: 'Order — compute metrics at the individual order level',
                scoreValue: 0,
                rationale: 'Order-level analysis is even more mismatched. Users can have multiple orders. Treating each order as independent introduces serious correlation structure that standard t-tests can\'t handle.',
              },
            ],
          },
        ],
      },
      {
        id: 'metrics',
        label: 'Metrics',
        hint: 'What will you measure?',
        fields: [
          {
            id: 'primaryMetric',
            label: 'What is the primary metric for this experiment?',
            type: 'single_select',
            conceptLinks: ['primary-metric'],
            options: [
              {
                id: 'pm-a',
                label: 'Checkout conversion rate (users who completed checkout / users who reached checkout)',
                scoreValue: 1,
                rationale: 'Reasonable but incomplete as a standalone primary. This is the natural friction metric, but it ignores revenue. A test that ships on conversion alone can miss the business outcome entirely — which is exactly what The Checkout Trap reveals.',
              },
              {
                id: 'pm-b',
                label: 'Revenue per user session (total revenue / users who reached checkout)',
                scoreValue: 2,
                rationale: 'Stronger primary. This captures both sides of the tradeoff: conversion gains and revenue losses from removing the upsell. A 2% conversion lift with a -3% revenue per session is a business failure. This metric reflects that.',
              },
              {
                id: 'pm-c',
                label: 'Net revenue impact (total treatment revenue minus total control revenue)',
                scoreValue: 2,
                rationale: 'Also strong. Directly answers the business question: is this change net positive or negative in revenue terms? Slightly less normalized than revenue per user, but the correct spirit.',
              },
              {
                id: 'pm-d',
                label: 'Click-through rate on the upsell widget (as a proxy for engagement)',
                scoreValue: 0,
                rationale: 'Wrong direction entirely. If the widget is removed from treatment, there\'s nothing to click. This metric only measures control behavior. It cannot be a primary metric for a removal test.',
              },
            ],
          },
          {
            id: 'guardrailMetrics',
            label: 'Which metrics should be guardrails? (Select all that apply)',
            type: 'multi_select',
            conceptLinks: ['guardrail-metric'],
            options: [
              {
                id: 'gm-a',
                label: 'Average order value (AOV)',
                scoreValue: 1,
                rationale: 'Good guardrail. AOV captures the upsell contribution directly. If AOV drops significantly, the widget was contributing meaningfully and removal is harmful.',
              },
              {
                id: 'gm-b',
                label: '7-day refund rate',
                scoreValue: 1,
                rationale: 'Important guardrail that many analysts miss. If removing the widget causes more impulsive purchases (by reducing consideration time), refund rates could spike. This is a downstream signal of product-market fit for individual orders.',
              },
              {
                id: 'gm-c',
                label: 'Page load time / latency',
                scoreValue: 0,
                rationale: 'Removing a widget should improve latency, not harm it. This is not a meaningful guardrail — it\'s more of an engineering health metric that should improve in treatment.',
              },
              {
                id: 'gm-d',
                label: 'Customer support contact rate',
                scoreValue: 0,
                rationale: 'Too lagging and too noisy for a 14-day experiment. Support contacts related to this feature would be a tiny fraction of total contacts. The signal-to-noise is too low to be meaningful as a guardrail.',
              },
            ],
          },
          {
            id: 'diagnosticMetrics',
            label: 'Which metrics should be tracked as diagnostics (informational only)?',
            type: 'multi_select',
            conceptLinks: [],
            options: [
              {
                id: 'dm-a',
                label: 'Cart abandonment rate at the checkout step',
                scoreValue: 1,
                rationale: 'Good diagnostic. Directly measures the friction mechanism the hypothesis claims to address. If conversion rate improves but cart abandonment doesn\'t move, the mechanism is wrong.',
              },
              {
                id: 'dm-b',
                label: 'Time from cart add to purchase completion',
                scoreValue: 1,
                rationale: 'Good diagnostic for understanding the friction mechanism. Faster checkout without the widget would confirm the hypothesis about friction reduction.',
              },
              {
                id: 'dm-c',
                label: 'Upsell widget CTR (in control only)',
                scoreValue: 1,
                rationale: 'Valid diagnostic for understanding the baseline widget engagement and sizing the revenue at stake.',
              },
              {
                id: 'dm-d',
                label: '30-day repeat purchase rate',
                scoreValue: 0,
                rationale: 'Too long-horizon for a 14-day test. 30-day repeat purchase behavior cannot be measured within the test window. Including it as a diagnostic creates confusion without providing signal.',
              },
            ],
          },
        ],
      },
      {
        id: 'logistics',
        label: 'Logistics',
        hint: 'How long, how large, how attributed?',
        fields: [
          {
            id: 'runtime',
            label: 'How long should this experiment run?',
            type: 'single_select',
            conceptLinks: ['novelty-effect', 'mde'],
            options: [
              {
                id: 'rt-a',
                label: '14 days — maximum allowed before Q4 freeze',
                scoreValue: 2,
                rationale: 'Correct given constraints. 14 days at ~42k users/day gives ~588k users — well powered for a 1.5% lift on conversion. Importantly, 14 days captures a full week-over-week cycle and reduces novelty effect risk.',
              },
              {
                id: 'rt-b',
                label: '7 days — enough traffic to get significance quickly',
                scoreValue: 1,
                rationale: 'Possible if statistical power is sufficient, but risky. 7 days may catch a day-of-week effect (weekdays vs. weekends have different checkout behavior). The full 14 days is safer and uses the available window.',
              },
              {
                id: 'rt-c',
                label: '3 days — fast decision, enough signal for a major feature',
                scoreValue: 0,
                rationale: 'Too short for a checkout test. Three days doesn\'t capture the full weekly purchase cycle. Day-of-week effects will contaminate the result, and refund rates (a key guardrail) won\'t have time to manifest.',
              },
              {
                id: 'rt-d',
                label: 'Run until significance — stop as soon as p < 0.05',
                scoreValue: 0,
                rationale: 'Classic peeking problem. Stopping early when the result looks good inflates Type I error significantly. This guarantees an over-confident result and may miss guardrail signals that take longer to emerge.',
              },
            ],
          },
          {
            id: 'attributionWindow',
            label: 'What attribution window should apply to revenue metrics?',
            type: 'single_select',
            conceptLinks: ['right-censoring'],
            options: [
              {
                id: 'aw-a',
                label: 'Same-session only — revenue from the checkout session',
                scoreValue: 2,
                rationale: 'Correct for a checkout flow experiment. The mechanism (upsell removal) acts during the checkout session. Cross-session attribution introduces noise from behavior unrelated to the widget.',
              },
              {
                id: 'aw-b',
                label: '7-day post-exposure window to capture follow-up purchases',
                scoreValue: 1,
                rationale: 'Reasonable if you believe removing the widget changes subsequent purchase intent, but this adds complexity and introduces confounding from non-experiment-related purchases in the 7-day window.',
              },
              {
                id: 'aw-c',
                label: '30-day window to capture LTV impact',
                scoreValue: 0,
                rationale: 'The test only runs 14 days — a 30-day attribution window can\'t be fully observed within the test period. This is a right-censoring problem: most users won\'t have completed their 30-day window before the test ends.',
              },
            ],
          },
          {
            id: 'sampleSizeConcern',
            label: 'What is the main sample size / power concern for this experiment?',
            type: 'single_select',
            conceptLinks: ['power', 'mde', 'confidence-interval'],
            options: [
              {
                id: 'ss-a',
                label: 'None — 42k users/day × 14 days = ~580k users is more than sufficient for any reasonable MDE',
                scoreValue: 1,
                rationale: 'Partially correct. The experiment is well-powered for conversion rate lifts of 1-2%. However, guardrail metrics (especially refund rate) may have much lower base rates, requiring more users to detect meaningful changes. Don\'t assume all metrics are equally powered.',
              },
              {
                id: 'ss-b',
                label: 'Primary metric is well-powered, but guardrail metrics with low base rates (e.g. refund rate) may require careful interpretation',
                scoreValue: 2,
                rationale: 'Correct and complete. High-traffic tests have high power on common metrics, but rare events (refunds, errors) may still be underpowered for small effects. Checking the MDE for each metric separately is the right approach.',
              },
              {
                id: 'ss-c',
                label: 'The test needs more traffic — 14 days is not enough to detect a real effect',
                scoreValue: 0,
                rationale: 'Incorrect. 580k users is very large. Most reasonable effect sizes (even 0.5% on conversion) are detectable at this sample size. The constraint is time (Q4 freeze), not traffic.',
              },
            ],
          },
        ],
      },
      {
        id: 'risks',
        label: 'Risks & Decision Rule',
        hint: 'What could invalidate this, and what will you do with the result?',
        fields: [
          {
            id: 'trustChecks',
            label: 'Which trust checks should you run before interpreting results? (Select all)',
            type: 'multi_select',
            conceptLinks: ['srm'],
            options: [
              {
                id: 'tc-a',
                label: 'SRM check — verify assignment counts match the intended 50/50 split',
                scoreValue: 2,
                rationale: 'Essential. Always the first check. An SRM on a checkout flow could indicate a redirect issue, a logging gap, or an eligibility bug. All of these would invalidate causal inference.',
              },
              {
                id: 'tc-b',
                label: 'Pre-experiment AA test to verify the randomization system is working',
                scoreValue: 1,
                rationale: 'Best practice, especially for a new experiment infrastructure or a high-stakes test. Confirms the randomization is producing comparable groups before the real test runs.',
              },
              {
                id: 'tc-c',
                label: 'Check that pre-experiment conversion rates are comparable between arms',
                scoreValue: 1,
                rationale: 'Good sanity check if pre-experiment data is available. Comparable baselines increase confidence that the randomization produced balanced groups.',
              },
              {
                id: 'tc-d',
                label: 'Check that refund rates are below 5% in both arms — if above, pause the test',
                scoreValue: 0,
                rationale: 'Refund rate is a guardrail metric, not a trust check. Trust checks verify the experiment mechanism; guardrails measure treatment effects. Conflating them muddies the analysis.',
              },
            ],
          },
          {
            id: 'validityRisks',
            label: 'What are the main validity risks for this experiment? (Select all)',
            type: 'multi_select',
            conceptLinks: ['novelty-effect', 'sutva'],
            options: [
              {
                id: 'vr-a',
                label: 'Novelty effect — users may explore the "new" checkout more than they would long-term',
                scoreValue: 1,
                rationale: 'Lower risk here than for content features — users don\'t typically explore checkout pages. But worth monitoring week-over-week to confirm the effect is stable.',
              },
              {
                id: 'vr-b',
                label: 'Holiday period confounding — Q4 traffic may behave differently than the test-period traffic',
                scoreValue: 2,
                rationale: 'High risk. Q4 starts during the test window. Holiday-season shoppers have different intent, basket sizes, and return rates. Results may not generalize to normal traffic. This should be noted explicitly as a limitation.',
              },
              {
                id: 'vr-c',
                label: 'SUTVA violation — users in different arms may influence each other through social sharing',
                scoreValue: 0,
                rationale: 'Very low risk for a checkout widget removal test. Users don\'t typically discuss checkout UX with each other in ways that would affect purchasing behavior. SUTVA is not a meaningful threat here.',
              },
              {
                id: 'vr-d',
                label: 'Metric gaming — the team might optimize the widget\'s loading to make the test look better',
                scoreValue: 0,
                rationale: 'Not a validity concern for this test — the treatment is simply removing the widget, and the team isn\'t measuring widget performance in treatment. There\'s no gaming vector here.',
              },
            ],
          },
          {
            id: 'decisionRule',
            label: 'What is the pre-committed decision rule?',
            type: 'single_select',
            conceptLinks: ['p-value', 'guardrail-metric', 'multiple-testing'],
            options: [
              {
                id: 'dr-a',
                label: 'Ship if primary metric is significant AND neither guardrail is significantly negative. Hold if either guardrail breaches threshold. Investigate if primary is null but guardrails are clean.',
                scoreValue: 2,
                rationale: 'This is the correct structure. It forces explicit commitment before seeing data, it treats guardrail breaches as blocking (not advisory), and it has a path for null results. This is senior-level decision discipline.',
              },
              {
                id: 'dr-b',
                label: 'Ship if primary metric shows p < 0.05. Review other metrics contextually.',
                scoreValue: 0,
                rationale: 'The word "contextually" is a red flag. It means the team will rationalize whatever they see. A pre-committed rule must specify what "other metrics" means and under what conditions they block shipping.',
              },
              {
                id: 'dr-c',
                label: 'Ship if at least two metrics improve significantly.',
                scoreValue: 0,
                rationale: 'This is a multiple testing problem. Testing multiple metrics without adjustment inflates the false positive rate. "At least two" is an ad hoc threshold with no statistical justification.',
              },
              {
                id: 'dr-d',
                label: 'Ship if primary metric is significant AND all secondary metrics trend positive, even if not significant.',
                scoreValue: 1,
                rationale: 'Better than pure single-metric shipping, but "trend positive" is too weak for guardrails. A guardrail should have a specific threshold, not just a directional requirement.',
              },
            ],
          },
        ],
      },
    ],

    scoringRubric: {
      dimensions: [
        {
          id: 'metric_selection',
          label: 'Metric selection',
          weight: 0.30,
          fieldIds: ['primaryMetric', 'guardrailMetrics'],
        },
        {
          id: 'design_validity',
          label: 'Design validity',
          weight: 0.35,
          fieldIds: ['randomizationUnit', 'unitOfAnalysis', 'trustChecks', 'validityRisks'],
        },
        {
          id: 'decision_discipline',
          label: 'Decision discipline',
          weight: 0.20,
          fieldIds: ['decisionRule', 'sampleSizeConcern'],
        },
        {
          id: 'hypothesis_framing',
          label: 'Hypothesis framing',
          weight: 0.15,
          fieldIds: ['hypothesis', 'businessDecision'],
        },
      ],
      levels: {
        incomplete:    { minScore: 0,    label: 'Incomplete' },
        analyst_ready: { minScore: 0.45, label: 'Analyst-Ready' },
        senior_ready:  { minScore: 0.68, label: 'Senior-Ready' },
        staff_level:   { minScore: 0.85, label: 'Staff-Level' },
      },
    },

    seniorDesign: {
      rationale: `The most important decision in this design is the primary metric. Checkout conversion rate is the intuitive choice — it\'s what the hypothesis is about. But it\'s the wrong primary metric for a business decision. Revenue per checkout user captures both sides of the tradeoff: the conversion lift and the upsell revenue loss. A test that ships on conversion alone can miss the actual business outcome entirely.

The second critical decision is the decision rule. Pre-committing before the data arrives is what separates analytical discipline from rationalization. The rule must specify: what constitutes a guardrail breach, what happens when guardrails and primary conflict, and what the null-result path looks like. Without this, every outcome becomes negotiable.

On trust checks: SRM is always first. A checkout flow with a redirect step or eligibility gate has obvious SRM failure modes. Running the analysis without an SRM check is leaving a trapdoor open.

The Q4 confound is the sleeper risk. The test window overlaps with holiday season behavioral shifts. Any result should be interpreted with the caveat that Q4 intent and basket sizes may not generalize to steady-state behavior.`,
      commonMistakes: [
        {
          mistake: 'Choosing checkout conversion rate as the primary metric',
          consequence: 'You get a significant lift, ship the feature, and discover three weeks later that revenue per session declined. The guardrail you needed was the primary metric.',
          conceptLink: 'primary-metric',
        },
        {
          mistake: 'Using "review contextually" as the decision rule',
          consequence: 'This is not a decision rule. It\'s a permission structure for post-hoc rationalization. You will ship on whatever looks good after the data arrives.',
          conceptLink: 'p-value',
        },
        {
          mistake: 'Not checking for SRM before reading metric effects',
          consequence: 'If there\'s a logging issue or redirect bug affecting assignment balance, every metric is biased. An SRM check takes minutes and prevents hours of invalid analysis.',
          conceptLink: 'srm',
        },
      ],
    },

    pairedScenarioPrompt: {
      toReview: 'You designed this test. Now read what actually happened when Crestline ran it.',
      fromReview: 'You read the result. Want to go back and design this experiment from scratch?',
    },
  },

  // ─────────────────────────────────────────────
  // D02 — Design the Onboarding Assignment (FREE · Analyst)
  // Paired with: s02-ghost-assignment
  // Core trap: randomization unit (session vs user) + missing trust checks (SRM)
  // ─────────────────────────────────────────────
  {
    id: 'd02-onboarding-assignment',
    title: 'Design the Onboarding Assignment',
    subtitle: 'Threadline wants to test AI-powered user persona assignment in onboarding. Design the experiment.',
    isFree: true,
    difficulty: 'analyst',
    industry: 'saas',
    scenarioFamily: 'srm',
    pairedReviewScenarioId: 's02-ghost-assignment',

    context: {
      company: 'Threadline',
      product: 'B2C project management tool, ~120k MAU, primarily SMB teams',
      team: 'Growth & Activation team',
      background: 'Threadline\'s onboarding asks new users to self-select their use case (personal, team, company). The team has built an ML-powered "persona assignment" feature that skips the self-selection step and assigns users to templates automatically based on signup signals. The hypothesis: faster onboarding with better template matching improves week-1 activation.',
      featureProposal: 'Replace the self-selection onboarding step with AI persona assignment. Control: existing self-selection flow. Treatment: auto-assigned persona based on ML model.',
      businessPressure: 'The ML team has been working on this for 3 months. The CPO wants to ship it before the end of the quarter. Activation rate (week-1 core action completion) is a top company OKR.',
      constraints: [
        'Only new signups are eligible — existing users are unaffected',
        '~800-1200 new signups per day',
        'The onboarding flow has a step-by-step funnel with separate logging for each step',
        'The ML assignment happens server-side on signup; the user never sees the selection screen in treatment',
      ],
    },

    designPhases: [
      {
        id: 'framing',
        label: 'Framing',
        hint: 'What are you testing and why?',
        fields: [
          {
            id: 'businessDecision',
            label: 'What business decision will this experiment inform?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'bd-a',
                label: 'Whether to replace self-selection onboarding with AI persona assignment for all new users',
                scoreValue: 2,
                rationale: 'Correct. Clear binary decision with obvious ship/no-ship interpretation. The scope is appropriately limited to new signups.',
              },
              {
                id: 'bd-b',
                label: 'Whether the ML model predicts user personas accurately',
                scoreValue: 0,
                rationale: 'This is an ML model evaluation question, not an experiment design question. Model accuracy is a necessary but not sufficient condition — you also need to know whether accurate assignment improves activation. These are separate questions.',
              },
              {
                id: 'bd-c',
                label: 'Whether onboarding improvements should be prioritized over other activation investments',
                scoreValue: 0,
                rationale: 'Too broad and not answerable by this experiment. This is a roadmap prioritization question, not a treatment-effect question.',
              },
              {
                id: 'bd-d',
                label: 'Whether to invest in further ML model improvements for persona assignment',
                scoreValue: 1,
                rationale: 'Partially correct — the experiment can inform this. But the primary decision is simpler: ship vs. not ship the current version. Framing it as an investment decision understates the immediate binary nature of the choice.',
              },
            ],
          },
          {
            id: 'hypothesis',
            label: 'Select the strongest hypothesis formulation',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'hyp-a',
                label: 'AI persona assignment will increase week-1 activation rate by reducing onboarding friction and improving template relevance, with no meaningful increase in early churn.',
                scoreValue: 2,
                rationale: 'Strong. Specifies the mechanism (friction reduction + better relevance), the primary direction (activation up), and the key guardrail condition (early churn not harmed). Well-formed.',
              },
              {
                id: 'hyp-b',
                label: 'Users assigned templates by AI will complete the onboarding flow faster.',
                scoreValue: 1,
                rationale: 'Testable and directional but too narrow. Speed is a mechanism, not the business outcome. If users complete onboarding faster but don\'t become activated, speed is irrelevant.',
              },
              {
                id: 'hyp-c',
                label: 'The ML model\'s template assignments will be more accurate than user self-selection.',
                scoreValue: 0,
                rationale: 'Not testable as a pure A/B outcome without ground truth labels for "correct" assignment. And even if testable, accuracy doesn\'t directly measure activation — the business outcome the OKR cares about.',
              },
              {
                id: 'hyp-d',
                label: 'Removing the self-selection step will increase onboarding completion rate.',
                scoreValue: 1,
                rationale: 'Testable but incomplete. Completing onboarding is a step metric, not the activation metric. Users can complete onboarding and not become activated if the templates are wrong for them.',
              },
            ],
          },
        ],
      },
      {
        id: 'setup',
        label: 'Setup',
        hint: 'Who gets treated, and how?',
        fields: [
          {
            id: 'eligiblePopulation',
            label: 'Who should be included in the experiment?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'ep-a',
                label: 'All new signups during the test window',
                scoreValue: 2,
                rationale: 'Correct. The treatment only affects new users (the self-selection step is in onboarding). Including all new signups maximizes power and produces the most generalizable result.',
              },
              {
                id: 'ep-b',
                label: 'New signups from organic channels only — exclude paid acquisition to reduce intent variance',
                scoreValue: 1,
                rationale: 'Reduces confounding from acquisition channel differences but also reduces sample size and external validity. Unless paid acquisition behavior is very different and you\'re specifically designing for organic, including all channels is usually better.',
              },
              {
                id: 'ep-c',
                label: 'New signups who complete email verification — exclude incomplete signups',
                scoreValue: 1,
                rationale: 'Reasonable if unverified signups are clearly noise (bots, spam). But you need to verify this exclusion applies equally to both treatment and control — otherwise it can introduce SRM.',
              },
              {
                id: 'ep-d',
                label: 'All users, including existing users switching workspaces',
                scoreValue: 0,
                rationale: 'Incorrect. The treatment is in the onboarding flow, which existing users never see. Including existing users would dilute the treatment effect toward zero and make the result uninterpretable.',
              },
            ],
          },
          {
            id: 'randomizationUnit',
            label: 'What should be the randomization unit?',
            type: 'single_select',
            conceptLinks: ['randomization-unit'],
            options: [
              {
                id: 'ru-a',
                label: 'User (each new signup is assigned once, persistently)',
                scoreValue: 2,
                rationale: 'Correct. New users go through onboarding exactly once. User-level assignment ensures each person has a consistent, complete experience in one arm. This is the natural unit for an onboarding test.',
              },
              {
                id: 'ru-b',
                label: 'Session (each onboarding session gets independently assigned)',
                scoreValue: 0,
                rationale: 'Critical mistake for this test. If a user starts onboarding, abandons, and comes back, they could see both versions. This contaminates both arms. More importantly, for a server-side ML assignment, session-level randomization would create inconsistent persona assignments — a user could get one persona on session 1 and a different one on session 2.',
              },
              {
                id: 'ru-c',
                label: 'Company/team (all users from the same company get the same version)',
                scoreValue: 1,
                rationale: 'Worth considering if team members discuss onboarding experiences. But for a tool where onboarding is largely individual, company-level clustering adds complexity without clear benefit and reduces effective sample size.',
              },
            ],
          },
          {
            id: 'unitOfAnalysis',
            label: 'What is the unit of analysis?',
            type: 'single_select',
            conceptLinks: ['unit-of-analysis'],
            options: [
              {
                id: 'ua-a',
                label: 'User — activation rate = users who completed the core action in week 1 / total assigned users',
                scoreValue: 2,
                rationale: 'Correct. User-level analysis matches user-level randomization. This is the clean, valid approach.',
              },
              {
                id: 'ua-b',
                label: 'Onboarding session — completion rate = sessions that completed onboarding / all onboarding sessions',
                scoreValue: 0,
                rationale: 'Mismatch. A user may have multiple onboarding sessions if they abandon and return. Sessions from the same user are correlated. This inflates sample size and deflates standard errors.',
              },
              {
                id: 'ua-c',
                label: 'Onboarding step — step completion rate per step in the funnel',
                scoreValue: 0,
                rationale: 'Step-level analysis is useful as a diagnostic, not as the primary unit of analysis. Steps from the same user are completely correlated — they\'re not independent observations.',
              },
            ],
          },
        ],
      },
      {
        id: 'metrics',
        label: 'Metrics',
        hint: 'What will you measure?',
        fields: [
          {
            id: 'primaryMetric',
            label: 'What is the primary metric?',
            type: 'single_select',
            conceptLinks: ['primary-metric'],
            options: [
              {
                id: 'pm-a',
                label: 'Week-1 activation rate (users who completed the core activation action within 7 days of signup)',
                scoreValue: 2,
                rationale: 'Correct. This is the company OKR and directly measures whether the hypothesis (better template matching → more activation) is true. It\'s the right level of abstraction — above onboarding mechanics, tied to business outcome.',
              },
              {
                id: 'pm-b',
                label: 'Onboarding completion rate (users who reached the "setup complete" screen)',
                scoreValue: 1,
                rationale: 'Reasonable step metric, but a proxy. Completing onboarding is not the same as becoming activated. If AI-assigned personas are wrong, users will complete onboarding and then not engage. This metric would show a win while the actual outcome is neutral or negative.',
              },
              {
                id: 'pm-c',
                label: 'Time to complete onboarding flow',
                scoreValue: 0,
                rationale: 'Too mechanical. Faster onboarding is a means, not an end. A user who completes onboarding in 30 seconds but never returns is not a success.',
              },
              {
                id: 'pm-d',
                label: 'Day-1 return rate (users who log in again within 24 hours)',
                scoreValue: 1,
                rationale: 'Useful early signal but possibly too early for a persona-matching hypothesis. A user who returns on day 1 but finds the template unhelpful will churn by day 14. Week-1 activation captures the medium-term signal better.',
              },
            ],
          },
          {
            id: 'guardrailMetrics',
            label: 'Which metrics should be guardrails?',
            type: 'multi_select',
            conceptLinks: ['guardrail-metric'],
            options: [
              {
                id: 'gm-a',
                label: '7-day churn rate (users who never return after onboarding)',
                scoreValue: 2,
                rationale: 'Critical guardrail. If AI assignment gives the wrong persona to many users, they\'ll immediately churn after finding the template irrelevant. This is the biggest downstream risk of the ML approach.',
              },
              {
                id: 'gm-b',
                label: '30-day paid conversion rate',
                scoreValue: 1,
                rationale: 'Important business metric but too lagging for a short experiment. If the test runs 3-4 weeks, 30-day conversion data won\'t be complete for most users. Better as a follow-up metric after the test.',
              },
              {
                id: 'gm-c',
                label: 'Onboarding abandonment rate at the persona step',
                scoreValue: 0,
                rationale: 'In treatment, the persona step doesn\'t exist — there\'s nothing to abandon. This metric can only be computed for control. It\'s not a valid guardrail for the treatment arm.',
              },
              {
                id: 'gm-d',
                label: 'Support ticket rate in first 7 days',
                scoreValue: 1,
                rationale: 'Useful signal that the assigned persona is confusing users (they contact support when the template doesn\'t match their needs). But noisy and possibly too slow to detect within the experiment window.',
              },
            ],
          },
          {
            id: 'diagnosticMetrics',
            label: 'Which metrics should be tracked as diagnostics?',
            type: 'multi_select',
            conceptLinks: [],
            options: [
              {
                id: 'dm-a',
                label: 'Onboarding step completion funnel (control only — treatment has a different funnel)',
                scoreValue: 1,
                rationale: 'Good diagnostic for understanding where control users drop off, which helps interpret why treatment might do better or worse.',
              },
              {
                id: 'dm-b',
                label: 'Template switch rate in week 1 (users who changed their assigned template)',
                scoreValue: 2,
                rationale: 'High-value diagnostic. If treatment users switch templates frequently, the ML assignment is wrong for many users — even if week-1 activation looks okay. This is the mechanism check for the hypothesis.',
              },
              {
                id: 'dm-c',
                label: 'Feature engagement breadth (number of distinct features used in week 1)',
                scoreValue: 1,
                rationale: 'Good proxy for whether the template is helping users discover value vs. just completing a task. But secondary to the primary activation metric.',
              },
            ],
          },
        ],
      },
      {
        id: 'logistics',
        label: 'Logistics',
        hint: 'How long, how large, how attributed?',
        fields: [
          {
            id: 'runtime',
            label: 'How long should this experiment run?',
            type: 'single_select',
            conceptLinks: ['power', 'mde'],
            options: [
              {
                id: 'rt-a',
                label: '3 weeks (21 days) — gives enough time to observe week-1 activation for most users in the window',
                scoreValue: 2,
                rationale: 'Correct. With ~1000 signups/day, 21 days gives ~21k users. To observe week-1 activation, you need to run long enough that even late-window signups have had 7 days. A 21-day window means users who signed up in week 3 won\'t have full week-1 data — so effectively you\'re analyzing 14 days of complete data from a 21-day enrollment window.',
              },
              {
                id: 'rt-b',
                label: '1 week — enough traffic for a quick read',
                scoreValue: 0,
                rationale: 'Critical problem: week-1 activation requires users to have had 7 days. A 1-week test means the last users enrolled have 0 days of observation. You cannot measure the primary metric from a 7-day window.',
              },
              {
                id: 'rt-c',
                label: '2 weeks with a trailing 1-week observation window',
                scoreValue: 2,
                rationale: 'Also valid. Enroll for 2 weeks, then observe the final cohort for a further week before reading results. Effectively the same as a 3-week enrollment window — pick whichever is cleaner to implement.',
              },
              {
                id: 'rt-d',
                label: '6 weeks — needed to observe 30-day paid conversion',
                scoreValue: 0,
                rationale: '30-day conversion is not the primary metric. Running 6 weeks to observe it delays the decision and exposes more users to a possibly worse experience without clear benefit.',
              },
            ],
          },
          {
            id: 'attributionWindow',
            label: 'What attribution window should apply to the primary metric?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'aw-a',
                label: '7 days post-signup — measure activation in the first 7 days after each user signs up',
                scoreValue: 2,
                rationale: 'Correct and matches the metric definition. Week-1 activation is measured from the day of signup, so each user gets exactly 7 days of observation regardless of when in the enrollment window they signed up.',
              },
              {
                id: 'aw-b',
                label: 'Calendar week — measure activation in the same calendar week as signup',
                scoreValue: 0,
                rationale: 'Creates unequal observation windows. A user who signs up on Monday gets 7 days; a user who signs up on Friday gets 3. This introduces systematic bias based on signup day.',
              },
              {
                id: 'aw-c',
                label: '1 day post-signup — quick read on early engagement',
                scoreValue: 0,
                rationale: 'Too short for an activation metric. Day-1 return doesn\'t capture whether users actually got value from the template — just whether they came back once.',
              },
            ],
          },
          {
            id: 'sampleSizeConcern',
            label: 'What is the main power concern?',
            type: 'single_select',
            conceptLinks: ['power', 'mde'],
            options: [
              {
                id: 'ss-a',
                label: 'Low traffic (~1000 signups/day) means the MDE is large — only big effects are detectable in a reasonable window',
                scoreValue: 2,
                rationale: 'Correct and important. At 1000 signups/day, a 3-week test yields ~21k users. To detect a 5% relative lift on activation (e.g., 40% → 42%) at 80% power requires roughly 8k per arm — achievable. But a 2% lift would require ~50k per arm, which takes 50 days. Be explicit about what effect size is detectable.',
              },
              {
                id: 'ss-b',
                label: 'No concern — 21k users over 3 weeks is sufficient for any effect size',
                scoreValue: 0,
                rationale: 'Incorrect. The MDE depends on the base rate and variance of the primary metric. 21k users may not be sufficient to detect small but real activation improvements. You need to compute the MDE before running.',
              },
              {
                id: 'ss-c',
                label: 'The test should be stopped early if activation rate drops below baseline in the first week',
                scoreValue: 0,
                rationale: 'Sequential testing without a formal stopping rule inflates Type I error. You can\'t apply an informal early-stopping rule without adjusting the significance threshold.',
              },
            ],
          },
        ],
      },
      {
        id: 'risks',
        label: 'Risks & Decision Rule',
        hint: 'What could invalidate this, and what will you do with the result?',
        fields: [
          {
            id: 'trustChecks',
            label: 'Which trust checks should you run?',
            type: 'multi_select',
            conceptLinks: ['srm'],
            options: [
              {
                id: 'tc-a',
                label: 'SRM check on signup counts — verify treatment and control arms have the expected 50/50 ratio',
                scoreValue: 2,
                rationale: 'Essential. For a server-side assignment triggered at signup, SRM can arise from eligibility filtering bugs (e.g., the ML model failing silently and excluding some users from assignment), logging delays, or email verification timing. Always check first.',
              },
              {
                id: 'tc-b',
                label: 'Verify the ML model is actually being called and returning persona assignments (not silently failing)',
                scoreValue: 2,
                rationale: 'Critical instrumentation check specific to this test. If the ML model fails silently and returns a fallback persona, treatment users get a degraded experience that\'s neither the intended treatment nor the control. This would bias results toward the null.',
              },
              {
                id: 'tc-c',
                label: 'Check pre-experiment equivalence on user acquisition channel mix',
                scoreValue: 1,
                rationale: 'Good practice. If the randomization produced arms with different channel compositions (e.g., more paid users in one arm), this could confound activation rates. A quick check prevents false positives from pre-existing differences.',
              },
              {
                id: 'tc-d',
                label: 'Verify all users in both arms complete the signup email verification step at equal rates',
                scoreValue: 1,
                rationale: 'Good specific check for this product. Email verification is often a dropout point. If treatment affects verification rate (unlikely but possible if persona assignment changes post-signup messaging), it would introduce an SRM at the verification step.',
              },
            ],
          },
          {
            id: 'validityRisks',
            label: 'What are the main validity risks?',
            type: 'multi_select',
            conceptLinks: ['novelty-effect'],
            options: [
              {
                id: 'vr-a',
                label: 'ML model warm-up period — model performance may improve over time as it processes more signups',
                scoreValue: 2,
                rationale: 'Real risk. If the ML model improves during the test (due to online learning or periodic retraining), treatment users later in the window get a better model than users earlier. This violates the stable treatment assumption and biases results upward over time.',
              },
              {
                id: 'vr-b',
                label: 'Novelty effect in onboarding — users may engage more with the "new" flow simply because it\'s different',
                scoreValue: 1,
                rationale: 'Lower risk here than in feature tests — users don\'t know they\'re in a "new" flow. But worth monitoring week-over-week engagement to confirm it\'s stable.',
              },
              {
                id: 'vr-c',
                label: 'Self-selection bias in persona matching — if the ML model systematically misassigns a subgroup, that subgroup\'s results will be masked in the average treatment effect',
                scoreValue: 2,
                rationale: 'Important validity concern specific to this test. If the model is poor for a specific signup type (e.g., enterprise users), those users\' negative experience is averaged out. Check activation by persona type as a diagnostic.',
              },
              {
                id: 'vr-d',
                label: 'SUTVA violation — treatment users might influence control users through referrals',
                scoreValue: 0,
                rationale: 'Very low risk. Onboarding experiences are private. A user who goes through AI onboarding is unlikely to causally affect the activation rate of users who don\'t. SUTVA is not a meaningful threat here.',
              },
            ],
          },
          {
            id: 'decisionRule',
            label: 'What is the pre-committed decision rule?',
            type: 'single_select',
            conceptLinks: ['p-value', 'guardrail-metric'],
            options: [
              {
                id: 'dr-a',
                label: 'Ship if week-1 activation is significantly positive AND 7-day churn is not significantly worse. Investigate if activation is null but churn is clean. Rollback if churn worsens significantly regardless of activation.',
                scoreValue: 2,
                rationale: 'Correct structure. Activation positive + churn clean = ship. Activation null = investigate, not discard. Churn worsening = rollback regardless of activation. This covers the three meaningful outcome combinations.',
              },
              {
                id: 'dr-b',
                label: 'Ship if week-1 activation is positive and the ML team confirms model performance is improving.',
                scoreValue: 0,
                rationale: 'The ML team\'s assessment of model performance is not a valid decision input for a product A/B test. The decision should be based on user outcomes (activation, churn), not model metrics.',
              },
              {
                id: 'dr-c',
                label: 'Ship if any activation metric improves significantly.',
                scoreValue: 0,
                rationale: '"Any activation metric" with multiple metrics measured creates a multiple testing problem. The threshold for significance needs to account for the number of tests.',
              },
              {
                id: 'dr-d',
                label: 'Ship if week-1 activation is significant (p < 0.05) and template switch rate is below 30%.',
                scoreValue: 1,
                rationale: 'Reasonable attempt but the 30% threshold for template switch rate is ad hoc. Decision rules should be based on pre-specified statistical thresholds for pre-defined guardrails, not informal thresholds for diagnostic metrics.',
              },
            ],
          },
        ],
      },
    ],

    scoringRubric: {
      dimensions: [
        { id: 'metric_selection', label: 'Metric selection', weight: 0.30, fieldIds: ['primaryMetric', 'guardrailMetrics'] },
        { id: 'design_validity', label: 'Design validity', weight: 0.35, fieldIds: ['randomizationUnit', 'unitOfAnalysis', 'trustChecks', 'validityRisks'] },
        { id: 'decision_discipline', label: 'Decision discipline', weight: 0.20, fieldIds: ['decisionRule', 'sampleSizeConcern'] },
        { id: 'hypothesis_framing', label: 'Hypothesis framing', weight: 0.15, fieldIds: ['hypothesis', 'businessDecision'] },
      ],
      levels: {
        incomplete:    { minScore: 0,    label: 'Incomplete' },
        analyst_ready: { minScore: 0.45, label: 'Analyst-Ready' },
        senior_ready:  { minScore: 0.68, label: 'Senior-Ready' },
        staff_level:   { minScore: 0.85, label: 'Staff-Level' },
      },
    },

    seniorDesign: {
      rationale: `The most important trust check for this test is not SRM (though SRM is essential) — it\'s verifying the ML model is actually working. A server-side ML assignment that silently fails is a silent validity threat. The test will appear to run, the SRM check might pass, and the results will be biased toward the null by the degraded treatment experience.

On randomization: session-level assignment is a critical mistake for any test where the treatment happens at signup. Users who abandon and return would see different versions, creating contamination in both arms. User-level assignment is the only valid choice.

The ML warm-up risk is underappreciated. If the model retrains during the experiment, later treatment users get a better model than earlier users. This creates a time trend in the treatment effect that standard analysis won\'t detect.

The decision rule needs to separate the activation result from the churn result. A feature that improves week-1 activation by creating a compelling but misleading first experience — causing users to explore, then churn — is not a win. Treat week-1 churn as a blocking guardrail, not an advisory metric.`,
      commonMistakes: [
        {
          mistake: 'Session-level randomization',
          consequence: 'Users who restart onboarding see both versions. The ML assignment is inconsistent across sessions. Assignment counts per user can\'t be tracked, making SRM diagnosis impossible.',
          conceptLink: 'randomization-unit',
        },
        {
          mistake: 'Not verifying ML model instrumentation before calling the test valid',
          consequence: 'Silent model failures corrupt the treatment arm without triggering any visible alert. You run a 3-week test and discover halfway through that the model was returning a fallback persona for 30% of users.',
          conceptLink: 'srm',
        },
        {
          mistake: 'Setting a 1-week runtime for a test measuring week-1 activation',
          consequence: 'Users who enroll in the last day of a 7-day window have 0 days of observation on the primary metric. The test can\'t measure what it\'s designed to measure.',
          conceptLink: 'mde',
        },
      ],
    },

    pairedScenarioPrompt: {
      toReview: 'You designed this test. Now read what happened when Threadline ran it.',
      fromReview: 'You read the result. Want to go back and design this experiment from scratch?',
    },
  },

  // ─────────────────────────────────────────────
  // D03 — Design the Mobile Feature Test (BETA · Senior)
  // Paired with: s05-mobile-winners
  // Core trap: subgroup pre-registration — mobile vs. desktop split
  // ─────────────────────────────────────────────
  {
    id: 'd03-mobile-feature-test',
    title: 'Design the Mobile Feature Test',
    subtitle: 'Vantage Analytics wants to test a redesigned mobile dashboard. Design the experiment — and decide upfront how you\'ll handle the mobile subgroup.',
    isFree: false,
    difficulty: 'senior',
    industry: 'saas',
    scenarioFamily: 'hte_subgroups',
    pairedReviewScenarioId: 's05-mobile-winners',

    context: {
      company: 'Vantage Analytics',
      product: 'B2B analytics platform, 8,400 paying accounts, ~60% of sessions from desktop, ~40% mobile',
      team: 'Product Analytics team',
      background: 'Vantage rebuilt their mobile dashboard from scratch — new layout, faster load times, and a redesigned chart drill-down pattern. The desktop experience is unchanged. Engineering believes mobile engagement has been suppressed by the old layout and expects the new design to lift mobile weekly active usage. Product leadership expects a cross-platform engagement improvement.',
      featureProposal: 'Roll out the redesigned mobile dashboard to 50% of users. Control: existing mobile layout. Treatment: new mobile layout. Desktop experience is identical in both arms.',
      businessPressure: 'The mobile redesign took 4 months. The CEO wants to announce the new mobile experience at next month\'s customer event. The Product team expects the test to show a clean win.',
      constraints: [
        'Account-level metrics matter (renewal decisions are made at account level)',
        'Users have strong cross-device usage patterns — the same user often uses both mobile and desktop',
        '~8,400 accounts, ~42,000 users total',
        'Randomization infrastructure supports both user-level and account-level assignment',
      ],
    },

    designPhases: [
      {
        id: 'framing',
        label: 'Framing',
        hint: 'What are you testing and why?',
        fields: [
          {
            id: 'businessDecision',
            label: 'What business decision will this experiment inform?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'bd-a',
                label: 'Whether to ship the redesigned mobile dashboard to all users',
                scoreValue: 2,
                rationale: 'Correct. Clear binary decision. The experiment should answer this specific question, not broader questions about mobile strategy.',
              },
              {
                id: 'bd-b',
                label: 'Whether mobile is an important surface for Vantage customers',
                scoreValue: 0,
                rationale: 'This is a discovery question, not a treatment effect question. You already know 40% of sessions are mobile — that\'s evidence that mobile matters. This is the wrong framing for a redesign test.',
              },
              {
                id: 'bd-c',
                label: 'Whether to invest more in mobile product development going forward',
                scoreValue: 1,
                rationale: 'This will be informed by the test, but it\'s a broader strategic question than this test can definitively answer. The immediate decision is about this specific redesign.',
              },
            ],
          },
          {
            id: 'hypothesis',
            label: 'Select the strongest hypothesis',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'hyp-a',
                label: 'The redesigned mobile dashboard will increase overall weekly active users across both mobile and desktop, with mobile WAU showing the largest improvement.',
                scoreValue: 2,
                rationale: 'Strong. Sets the overall direction (WAU up), specifies the expected subgroup pattern (mobile > desktop), and implicitly commits to evaluating both overall and subgroup effects. This enables meaningful interpretation of a mobile-only effect without it being post-hoc.',
              },
              {
                id: 'hyp-b',
                label: 'Mobile WAU will increase among users who primarily use the mobile app.',
                scoreValue: 1,
                rationale: 'Directional and testable, but defines "primarily mobile" post-hoc. If you don\'t pre-define "primarily mobile," you\'ll define it as whoever showed the strongest treatment effect, which is circular.',
              },
              {
                id: 'hyp-c',
                label: 'Users will prefer the new mobile design.',
                scoreValue: 0,
                rationale: '"Prefer" is not measurable without a satisfaction survey. Even if it were, preference doesn\'t translate directly to behavioral outcomes. This is not a useful experimental hypothesis.',
              },
              {
                id: 'hyp-d',
                label: 'The redesigned mobile dashboard will increase weekly dashboard views on mobile, with no degradation to desktop usage.',
                scoreValue: 2,
                rationale: 'Also strong. Specific metric (mobile dashboard views), directional, and includes a guardrail condition (desktop not harmed). The mechanism check (mobile views up) is appropriate for a mobile layout change.',
              },
            ],
          },
        ],
      },
      {
        id: 'setup',
        label: 'Setup',
        hint: 'Who gets treated, and how?',
        fields: [
          {
            id: 'eligiblePopulation',
            label: 'Who is eligible?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'ep-a',
                label: 'All current users across both mobile and desktop',
                scoreValue: 2,
                rationale: 'Correct. The treatment changes mobile for everyone in the treatment arm. Restricting eligibility to mobile-only users would exclude the cross-device usage pattern and bias the result toward users who only use mobile — not the average customer.',
              },
              {
                id: 'ep-b',
                label: 'Only users who have used the mobile app at least once in the past 30 days',
                scoreValue: 1,
                rationale: 'Restricts to active mobile users, which increases power for detecting mobile effects. But excludes users who might return to mobile if the experience improves — missing a potential re-engagement effect.',
              },
              {
                id: 'ep-c',
                label: 'Only mobile-primary users (>70% of sessions from mobile)',
                scoreValue: 0,
                rationale: 'Too restrictive. Reduces sample dramatically and selects for a subgroup that may not represent the average user. Results won\'t generalize to the full user base.',
              },
            ],
          },
          {
            id: 'randomizationUnit',
            label: 'What should be the randomization unit?',
            type: 'single_select',
            conceptLinks: ['randomization-unit', 'sutva'],
            options: [
              {
                id: 'ru-a',
                label: 'User level',
                scoreValue: 2,
                rationale: 'Correct for most purposes. User-level randomization ensures consistent experience across sessions and devices for individual users. Given cross-device usage patterns, this is the natural unit.',
              },
              {
                id: 'ru-b',
                label: 'Account level',
                scoreValue: 2,
                rationale: 'Also defensible and arguably better for a B2B product. Account-level randomization prevents contamination within teams (if team members discuss the new design). Given that renewal decisions are account-level, account-level metrics are more business-relevant. Either user or account level is senior-level thinking here.',
              },
              {
                id: 'ru-c',
                label: 'Session level',
                scoreValue: 0,
                rationale: 'Critical mistake. The same user would see different dashboard designs across sessions. For a redesign that requires learning a new layout, session-level assignment creates a confusing and invalid experience.',
              },
              {
                id: 'ru-d',
                label: 'Device level (mobile devices get treatment, desktop devices get control)',
                scoreValue: 0,
                rationale: 'The same user has both a mobile and desktop device. They\'d see treatment on mobile and control on desktop — which is actually what\'s happening in reality. But device-level assignment means you can\'t separate user-level effects from device-level effects, making the causal inference messy.',
              },
            ],
          },
          {
            id: 'unitOfAnalysis',
            label: 'What is the unit of analysis?',
            type: 'single_select',
            conceptLinks: ['unit-of-analysis'],
            options: [
              {
                id: 'ua-a',
                label: 'User — compute WAU as users active in a given week / total users assigned',
                scoreValue: 2,
                rationale: 'Correct for user-level randomization. Clean match between randomization and analysis.',
              },
              {
                id: 'ua-b',
                label: 'Account — compute account-level WAU as accounts with at least one active user per week',
                scoreValue: 2,
                rationale: 'Correct for account-level randomization. Better aligns with B2B business outcomes since renewal decisions are made at account level.',
              },
              {
                id: 'ua-c',
                label: 'Session — compute engagement as sessions per user per week',
                scoreValue: 1,
                rationale: 'Acceptable as a secondary metric but not the primary unit of analysis. Sessions per user are correlated within users — treating them as independent observations inflates power.',
              },
            ],
          },
        ],
      },
      {
        id: 'metrics',
        label: 'Metrics',
        hint: 'What will you measure?',
        fields: [
          {
            id: 'primaryMetric',
            label: 'What is the primary metric?',
            type: 'single_select',
            conceptLinks: ['primary-metric'],
            options: [
              {
                id: 'pm-a',
                label: 'Overall weekly active users (WAU) — combines mobile and desktop activity',
                scoreValue: 2,
                rationale: 'Correct. Overall WAU is the right primary metric because: (1) the product goal is engagement improvement broadly, not mobile-specific; (2) a mobile design that cannibalizes desktop usage is not a win; (3) cross-device users\' total engagement is what matters for account health.',
              },
              {
                id: 'pm-b',
                label: 'Mobile WAU only — the treatment only affects mobile',
                scoreValue: 1,
                rationale: 'Narrower but defensible if you believe desktop is unaffected. The risk: if users shift from desktop to mobile without increasing total engagement, mobile WAU goes up but the business isn\'t better off. Overall WAU captures this.',
              },
              {
                id: 'pm-c',
                label: 'Mobile dashboard view count per week',
                scoreValue: 1,
                rationale: 'Reasonable mechanism metric but too granular for a primary. Count of views doesn\'t distinguish between more users engaging vs. the same users engaging more. WAU is cleaner.',
              },
            ],
          },
          {
            id: 'guardrailMetrics',
            label: 'Which metrics should be guardrails?',
            type: 'multi_select',
            conceptLinks: ['guardrail-metric'],
            options: [
              {
                id: 'gm-a',
                label: 'Desktop WAU — verify the mobile redesign doesn\'t cannibalize desktop usage',
                scoreValue: 2,
                rationale: 'Critical guardrail. If mobile improves but desktop declines proportionally (users shift channel but don\'t increase total engagement), the overall WAU result masks a neutral outcome. Desktop WAU as a guardrail catches this.',
              },
              {
                id: 'gm-b',
                label: 'Account-level churn rate during the test period',
                scoreValue: 1,
                rationale: 'Important longer-term metric but likely too lagging for a test window. Short-term churn rates are noisy. Better tracked as a follow-on metric post-ship.',
              },
              {
                id: 'gm-c',
                label: 'Mobile app crash rate',
                scoreValue: 2,
                rationale: 'Essential technical guardrail. A new mobile layout has higher crash risk. Even if engagement looks good, increased crashes would be a product quality signal that blocks shipping.',
              },
              {
                id: 'gm-d',
                label: 'Time spent per session on mobile',
                scoreValue: 0,
                rationale: 'Ambiguous direction. More time could mean the new layout is confusing (users spend longer finding things) or more engaging (users do more). This metric is not actionable as a guardrail because you can\'t distinguish the interpretations without deeper analysis.',
              },
            ],
          },
          {
            id: 'diagnosticMetrics',
            label: 'Which metrics should be tracked as diagnostics? Pre-register any planned subgroup splits.',
            type: 'multi_select',
            conceptLinks: ['p-value'],
            options: [
              {
                id: 'dm-a',
                label: 'Mobile WAU vs. desktop WAU by arm (pre-registered subgroup split)',
                scoreValue: 2,
                rationale: 'This is the most important decision in this design. Pre-registering the mobile/desktop subgroup split before the test runs transforms what would be a post-hoc fishing expedition into a legitimate pre-specified analysis. If you don\'t pre-register it, a mobile-only effect is just a hypothesis for the next test.',
              },
              {
                id: 'dm-b',
                label: 'WAU by mobile-primary vs. cross-device users (pre-registered)',
                scoreValue: 2,
                rationale: 'Another valuable pre-registered subgroup. Mobile-primary users may respond differently to a mobile redesign than cross-device users. Pre-registering this split before seeing data is the only way to legitimately report it.',
              },
              {
                id: 'dm-c',
                label: 'Chart drill-down click-through rate on mobile (mechanism check)',
                scoreValue: 1,
                rationale: 'Good mechanism check for the specific redesign feature (new chart drill-down pattern). If the primary metric improves but drill-down CTR doesn\'t move, the mechanism hypothesis is wrong.',
              },
              {
                id: 'dm-d',
                label: 'All subgroup effects across plan tier, geography, and company size',
                scoreValue: 0,
                rationale: 'This is a fishing expedition. Analyzing every possible subgroup without pre-registration means you\'ll find something significant by chance. Subgroup analyses should be limited to those pre-specified in the design document.',
              },
            ],
          },
        ],
      },
      {
        id: 'logistics',
        label: 'Logistics',
        hint: 'How long, how large, how attributed?',
        fields: [
          {
            id: 'runtime',
            label: 'How long should this experiment run?',
            type: 'single_select',
            conceptLinks: ['novelty-effect', 'mde'],
            options: [
              {
                id: 'rt-a',
                label: '4 weeks — captures full weekly cycles and reduces novelty effect risk for a UX redesign',
                scoreValue: 2,
                rationale: 'Correct for a UX redesign. New layouts often show a novelty engagement spike in week 1 that decays as users adapt. 4 weeks allows week-over-week effect analysis to distinguish novelty from genuine improvement. Also enough time to observe stable WAU patterns.',
              },
              {
                id: 'rt-b',
                label: '2 weeks — enough for statistical significance at this traffic level',
                scoreValue: 1,
                rationale: 'Statistically possible but risks novelty contamination. A 2-week WAU result for a UX redesign is dominated by the first-contact experience. You don\'t know if the effect persists. Senior analysts push for longer windows on redesigns.',
              },
              {
                id: 'rt-c',
                label: '1 week — mobile usage patterns are stable enough to read quickly',
                scoreValue: 0,
                rationale: 'Too short for a WAU metric. WAU by definition requires a week of observation per data point. A 1-week experiment gives you 1 WAU measurement — not enough to assess weekly patterns or week-over-week trends.',
              },
            ],
          },
          {
            id: 'attributionWindow',
            label: 'What attribution window applies?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'aw-a',
                label: 'Rolling 7-day window — WAU measured continuously throughout the experiment',
                scoreValue: 2,
                rationale: 'Standard for WAU metrics. Each user\'s weekly active status is computed from their activity in any 7-day window, which allows for stable weekly comparisons throughout the test.',
              },
              {
                id: 'aw-b',
                label: 'Calendar week — WAU computed by calendar week (Mon-Sun)',
                scoreValue: 1,
                rationale: 'Also valid, but introduces edge effects for users assigned near week boundaries. Rolling 7-day is slightly cleaner.',
              },
            ],
          },
          {
            id: 'sampleSizeConcern',
            label: 'What is the key power concern?',
            type: 'single_select',
            conceptLinks: ['power', 'mde'],
            options: [
              {
                id: 'ss-a',
                label: 'The overall WAU test is well-powered, but the mobile-only subgroup (40% of users) has lower power — the MDE for the mobile subgroup analysis is roughly 1.6x larger than for the overall test',
                scoreValue: 2,
                rationale: 'Exactly right and the most important power consideration for this design. Subgroup analyses have lower power by definition because they use a subset of the sample. If you\'re pre-registering a mobile subgroup analysis, you need to verify the MDE is still meaningful for that subset.',
              },
              {
                id: 'ss-b',
                label: 'No concern — 42k users is more than enough for any subgroup analysis',
                scoreValue: 0,
                rationale: 'Incorrect. 40% mobile users = ~17k users per arm. The MDE for a subgroup of this size is larger than for the full sample. Whether it\'s "enough" depends on the minimum effect size you care about.',
              },
              {
                id: 'ss-c',
                label: 'The test should use account-level randomization to increase effective sample size',
                scoreValue: 0,
                rationale: 'Account-level randomization doesn\'t increase sample size — it usually reduces effective sample size (8,400 accounts vs. 42,000 users). It changes the estimand (account-level vs. user-level effect), not the power.',
              },
            ],
          },
        ],
      },
      {
        id: 'risks',
        label: 'Risks & Decision Rule',
        hint: 'What could invalidate this, and what will you do with the result?',
        fields: [
          {
            id: 'trustChecks',
            label: 'Which trust checks should you run?',
            type: 'multi_select',
            conceptLinks: ['srm'],
            options: [
              {
                id: 'tc-a',
                label: 'SRM check on user counts (overall and within the pre-registered mobile/desktop subgroup)',
                scoreValue: 2,
                rationale: 'Run SRM checks on both the overall assignment and within the pre-registered subgroups. An SRM within the mobile subgroup would indicate differential dropout or logging issues on mobile devices.',
              },
              {
                id: 'tc-b',
                label: 'Verify pre-experiment mobile WAU is comparable between arms',
                scoreValue: 2,
                rationale: 'Critical for a test where the subgroup split (mobile vs. desktop) is a key pre-registered analysis. If the arms have different baseline mobile usage rates, the subgroup comparison is confounded.',
              },
              {
                id: 'tc-c',
                label: 'Verify crash rates are at baseline in the first 48 hours after rollout',
                scoreValue: 2,
                rationale: 'For a mobile redesign, this is an essential early instrumentation check. A new layout that crashes frequently will both harm users and corrupt the WAU measurement (users who crash can\'t engage).',
              },
            ],
          },
          {
            id: 'validityRisks',
            label: 'What are the main validity risks?',
            type: 'multi_select',
            conceptLinks: ['novelty-effect', 'sutva'],
            options: [
              {
                id: 'vr-a',
                label: 'Novelty effect — mobile WAU may spike in week 1 as users explore the new layout',
                scoreValue: 2,
                rationale: 'High risk for a visual redesign. Users often explore new layouts in the first week, inflating early engagement. 4-week runtime with weekly breakdowns lets you diagnose this.',
              },
              {
                id: 'vr-b',
                label: 'Cross-device contamination — users may discuss the new design with colleagues in the same account',
                scoreValue: 2,
                rationale: 'Real risk for a B2B product. If a treatment user shows their manager the new layout, the manager (in control) may change their behavior in response. Account-level randomization eliminates this. User-level randomization accepts this risk.',
              },
              {
                id: 'vr-c',
                label: 'Post-hoc subgroup fishing if mobile effect is not pre-registered',
                scoreValue: 2,
                rationale: 'The most important validity risk specific to this scenario. If the overall WAU result is null but mobile WAU is positive, and you didn\'t pre-register the mobile subgroup analysis, you cannot legitimately report the mobile result as a finding. This is the core trap of this scenario — and why pre-registration of the subgroup is a key design decision.',
              },
            ],
          },
          {
            id: 'decisionRule',
            label: 'What is the pre-committed decision rule?',
            type: 'single_select',
            conceptLinks: ['p-value', 'guardrail-metric'],
            options: [
              {
                id: 'dr-a',
                label: 'Ship if overall WAU is significantly positive AND desktop WAU is not significantly negative AND crash rate is clean. If overall WAU is null but pre-registered mobile WAU is significantly positive, investigate further before shipping to all.',
                scoreValue: 2,
                rationale: 'Correct. This rule (1) treats guardrails as blocking, (2) allows a mobile-only subgroup result if pre-registered, but doesn\'t automatically ship on it, (3) is specific enough to prevent post-hoc rationalization. Investigating a mobile-only result is appropriate — it might warrant a mobile-targeted rollout.',
              },
              {
                id: 'dr-b',
                label: 'Ship if overall WAU is positive. Report mobile subgroup results for context.',
                scoreValue: 1,
                rationale: 'Acceptable but incomplete. Doesn\'t specify what happens when guardrails breach. "For context" framing for the mobile subgroup suggests it wasn\'t pre-registered — which makes the subgroup result exploratory only.',
              },
              {
                id: 'dr-c',
                label: 'Ship if mobile WAU is significantly positive, even if overall WAU is neutral.',
                scoreValue: 0,
                rationale: 'Only acceptable if mobile WAU is the pre-registered primary metric. If overall WAU is the primary and mobile is a subgroup, this decision rule is post-hoc — you\'re choosing the metric after seeing which one moved.',
              },
            ],
          },
        ],
      },
    ],

    scoringRubric: {
      dimensions: [
        { id: 'metric_selection', label: 'Metric selection', weight: 0.30, fieldIds: ['primaryMetric', 'guardrailMetrics'] },
        { id: 'design_validity', label: 'Design validity', weight: 0.35, fieldIds: ['randomizationUnit', 'unitOfAnalysis', 'trustChecks', 'validityRisks'] },
        { id: 'decision_discipline', label: 'Decision discipline', weight: 0.20, fieldIds: ['decisionRule', 'sampleSizeConcern'] },
        { id: 'hypothesis_framing', label: 'Hypothesis framing', weight: 0.15, fieldIds: ['hypothesis', 'businessDecision'] },
      ],
      levels: {
        incomplete:    { minScore: 0,    label: 'Incomplete' },
        analyst_ready: { minScore: 0.45, label: 'Analyst-Ready' },
        senior_ready:  { minScore: 0.68, label: 'Senior-Ready' },
        staff_level:   { minScore: 0.85, label: 'Staff-Level' },
      },
    },

    seniorDesign: {
      rationale: `The central design decision is whether to pre-register the mobile subgroup analysis. This is not a detail — it\'s the difference between a legitimate finding and a post-hoc narrative. If you design the experiment with overall WAU as the primary, and you don\'t pre-register the mobile/desktop subgroup split, then a mobile-only treatment effect is exploratory at best and a finding to report at worst.

The correct design pre-registers: (1) overall WAU as the primary, (2) the mobile vs. desktop subgroup split as a pre-specified secondary analysis, (3) the expected direction (mobile > desktop). This means if the overall effect is null but mobile is positive, you can legitimately interpret the pre-registered subgroup result — with appropriate caveats about lower power.

Account-level vs. user-level randomization is also a real decision here. B2B products with team-level discussion of new features should consider account-level randomization to prevent within-team contamination. Either is defensible, but the choice should be explicit.

Novelty effect is the main runtime risk. 4 weeks with weekly breakdowns is the minimum to diagnose a decaying novelty effect vs. a sustained engagement improvement on a UX redesign.`,
      commonMistakes: [
        {
          mistake: 'Not pre-registering the mobile subgroup analysis',
          consequence: 'Overall WAU is null. Mobile WAU is positive. The team reports a mobile win. This is a post-hoc fishing finding — the mobile subgroup was not pre-specified, so a positive result has a much higher false positive probability than the nominal alpha.',
          conceptLink: 'p-value',
        },
        {
          mistake: 'Running 2 weeks on a UX redesign and calling the result conclusive',
          consequence: 'Week-1 novelty engagement inflates the treatment effect. The "significant improvement" decays in weeks 3-4. You ship a feature whose real-world effect is much smaller than the test suggested.',
          conceptLink: 'novelty-effect',
        },
      ],
    },

    pairedScenarioPrompt: {
      toReview: 'You designed this test. Now read the result — and see if your pre-registration decision changes how you interpret it.',
      fromReview: 'You read the Mobile Winners result. Go back and design this experiment — decide before seeing the data whether to pre-register the mobile subgroup.',
    },
  },

  // ─────────────────────────────────────────────
  // D04 — Design the Multi-Metric Launch (BETA · Senior)
  // Paired with: s06-five-metrics
  // Core trap: multiple testing — how many co-primaries, pre-registration discipline
  // ─────────────────────────────────────────────
  {
    id: 'd04-multi-metric-launch',
    title: 'Design the Multi-Metric Launch',
    subtitle: 'Loopwise is testing a redesigned notification center. Design the experiment — and decide how many metrics count as "success."',
    isFree: false,
    difficulty: 'senior',
    industry: 'saas',
    scenarioFamily: 'multiple_testing',
    pairedReviewScenarioId: 's06-five-metrics',

    context: {
      company: 'Loopwise',
      product: 'B2B workflow automation platform, ~28,000 MAU, teams use it for cross-functional project tracking',
      team: 'Core Product team',
      background: 'Loopwise rebuilt their notification center — smarter grouping, priority ranking, and a new "snooze" feature. The team believes the current notification center is overwhelming users and causing notification fatigue. The redesign aims to surface more relevant alerts while reducing noise. The PM has a list of 6 metrics she wants to see improve.',
      featureProposal: 'Roll out the redesigned notification center (with smart grouping, priority ranking, and snooze) to 50% of users. The PM\'s desired outcome: "All 6 metrics should improve."',
      businessPressure: 'This feature is the centerpiece of the Q2 roadmap. The CEO is presenting it at an all-hands in 6 weeks. The PM has committed to demonstrating improvement on notification engagement, response time, and retention metrics.',
      constraints: [
        'The PM has pre-identified 6 metrics she cares about: (1) notification open rate, (2) notification response rate, (3) time-to-first-response, (4) notification fatigue score (survey-based), (5) 7-day retention, (6) weekly active usage',
        'Survey-based metrics have 2-week collection lag',
        '~28,000 MAU, good traffic for most metrics',
        'Engineering instrumentation tracks all 6 metrics already',
      ],
    },

    designPhases: [
      {
        id: 'framing',
        label: 'Framing',
        hint: 'What are you testing and why?',
        fields: [
          {
            id: 'businessDecision',
            label: 'What business decision will this experiment inform?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'bd-a',
                label: 'Whether to ship the redesigned notification center to all users',
                scoreValue: 2,
                rationale: 'Correct. Binary, clear, scoped. The experiment should tell you ship or not ship.',
              },
              {
                id: 'bd-b',
                label: 'Whether the notification center is causing user fatigue',
                scoreValue: 0,
                rationale: 'This is a diagnostic question, not a decision framing. Whether the current design is bad is not the decision — it\'s the justification for testing the redesign. The test is about whether the redesign is better.',
              },
              {
                id: 'bd-c',
                label: 'Which of the 6 metrics the PM cares about will improve with the redesign',
                scoreValue: 0,
                rationale: 'This frames the experiment as exploratory (which metrics improve?) rather than confirmatory (does the redesign achieve the desired outcome?). This framing explicitly creates a multiple testing problem.',
              },
            ],
          },
          {
            id: 'hypothesis',
            label: 'Select the strongest hypothesis',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'hyp-a',
                label: 'The redesigned notification center will increase 7-day retention by reducing notification fatigue, with no degradation in notification response rate.',
                scoreValue: 2,
                rationale: 'Strong. One primary metric (7-day retention — the business outcome), mechanism specified (fatigue reduction), and a guardrail condition (response rate not harmed). This forces the team to commit to what "success" means before data arrives.',
              },
              {
                id: 'hyp-b',
                label: 'All 6 metrics the PM identified will improve significantly with the redesigned notification center.',
                scoreValue: 0,
                rationale: 'This is not a hypothesis — it\'s a wish list. Testing 6 metrics for simultaneous significance with no correction means you need all 6 to pass an already inflated false positive rate. And "will improve significantly" is a post-hoc standard if the threshold isn\'t specified beforehand.',
              },
              {
                id: 'hyp-c',
                label: 'The notification redesign will reduce time-to-first-response and increase notification open rate.',
                scoreValue: 1,
                rationale: 'Two primary metrics creates an implicit multiple testing issue. Which one defines success if they disagree? The hypothesis needs one primary outcome.',
              },
              {
                id: 'hyp-d',
                label: 'The redesigned notification center will improve weekly active usage by making notifications more actionable.',
                scoreValue: 2,
                rationale: 'Also strong. WAU is a business-level outcome metric, mechanism is specified (more actionable notifications), and it\'s single. The limitation vs. the 7-day retention option is that WAU may be a less sensitive short-term signal.',
              },
            ],
          },
        ],
      },
      {
        id: 'setup',
        label: 'Setup',
        hint: 'Who gets treated, and how?',
        fields: [
          {
            id: 'eligiblePopulation',
            label: 'Who is eligible?',
            type: 'single_select',
            conceptLinks: [],
            options: [
              {
                id: 'ep-a',
                label: 'All current MAU — the notification center is used across the product',
                scoreValue: 2,
                rationale: 'Correct. The notification center is a cross-product feature. All active users interact with it. Restricting eligibility would reduce power without improving validity.',
              },
              {
                id: 'ep-b',
                label: 'Only users who receive more than 10 notifications per week — focus on power users of the feature',
                scoreValue: 1,
                rationale: 'Makes intuitive sense for detecting notification fatigue effects, but reduces generalizability. If the redesign helps moderate users too, you\'d miss that. The test should be designed for the average user, not just power users.',
              },
              {
                id: 'ep-c',
                label: 'Only new users — avoid confounding from existing notification habits',
                scoreValue: 0,
                rationale: 'The notification center is relevant for all users. New users haven\'t developed habits yet — the test would miss the re-engagement and fatigue-reduction effects among existing users, which is the main hypothesis.',
              },
            ],
          },
          {
            id: 'randomizationUnit',
            label: 'What should be the randomization unit?',
            type: 'single_select',
            conceptLinks: ['randomization-unit'],
            options: [
              {
                id: 'ru-a',
                label: 'User level',
                scoreValue: 2,
                rationale: 'Correct. Notification preferences and fatigue are individual-level phenomena. User-level randomization ensures a consistent notification experience and maintains independence between observations.',
              },
              {
                id: 'ru-b',
                label: 'Account/team level',
                scoreValue: 2,
                rationale: 'Also defensible. In a B2B workflow tool, team members\' notification behavior is interdependent — if one person gets smart grouping, their response patterns affect the notifications their teammates receive. Account-level randomization eliminates within-team contamination. Either is acceptable; explicitly choosing is senior-level discipline.',
              },
              {
                id: 'ru-c',
                label: 'Session level',
                scoreValue: 0,
                rationale: 'Critical mistake. Notification centers require consistent experience across sessions — if a user sees smart grouping in one session and the old design in the next, the experience is incoherent and the data is uninformative.',
              },
            ],
          },
          {
            id: 'unitOfAnalysis',
            label: 'What is the unit of analysis?',
            type: 'single_select',
            conceptLinks: ['unit-of-analysis'],
            options: [
              {
                id: 'ua-a',
                label: 'User — all metrics computed per user',
                scoreValue: 2,
                rationale: 'Correct for user-level randomization. Clean match.',
              },
              {
                id: 'ua-b',
                label: 'Notification — open rate = notifications opened / notifications sent per arm',
                scoreValue: 1,
                rationale: 'Acceptable for notification-level metrics (open rate, response rate) but notifications from the same user are highly correlated. User-level aggregation is cleaner — compute per-user notification open rate, then average across users.',
              },
            ],
          },
        ],
      },
      {
        id: 'metrics',
        label: 'Metrics',
        hint: 'What will you measure? This is the most important design decision for this experiment.',
        fields: [
          {
            id: 'primaryMetric',
            label: 'What is the ONE primary metric for this experiment?',
            type: 'single_select',
            conceptLinks: ['primary-metric', 'multiple-testing'],
            options: [
              {
                id: 'pm-a',
                label: '7-day retention rate — the ultimate signal that the redesign is creating genuine product value',
                scoreValue: 2,
                rationale: 'Best primary metric. Retention is the business outcome that the notification redesign ultimately should serve. A notification system that improves engagement metrics but doesn\'t improve retention has a weaker case for shipping. It\'s also hard to game — users either return or they don\'t.',
              },
              {
                id: 'pm-b',
                label: 'Notification response rate — the most direct measure of notification quality',
                scoreValue: 1,
                rationale: 'Reasonable as a mechanism metric, but it\'s a proxy for the business outcome. A higher response rate to less important notifications is not a win. The downstream outcome (does responding to notifications create product value?) matters more.',
              },
              {
                id: 'pm-c',
                label: 'All 6 metrics the PM identified are co-primary — the feature succeeds if all improve',
                scoreValue: 0,
                rationale: 'This creates an unmanageable multiple testing problem. Six co-primary metrics at α = 0.05 means the per-test significance threshold should be α/6 ≈ 0.008 under Bonferroni. More critically: what happens if 5 improve and 1 doesn\'t? There\'s no pre-committed rule for this case.',
              },
              {
                id: 'pm-d',
                label: 'Weekly active usage — weekly engagement as the main behavioral outcome',
                scoreValue: 2,
                rationale: 'Also strong. WAU is a business-level metric that downstream captures engagement improvement. The tradeoff vs. retention: WAU is easier to observe within a short test window; retention has higher business impact.',
              },
            ],
          },
          {
            id: 'guardrailMetrics',
            label: 'Which metrics should be guardrails?',
            type: 'multi_select',
            conceptLinks: ['guardrail-metric', 'bonferroni'],
            options: [
              {
                id: 'gm-a',
                label: 'Notification unsubscribe/mute rate — signals that users are more overwhelmed, not less',
                scoreValue: 2,
                rationale: 'Critical guardrail. If the redesign increases unsubscribes, it\'s making the fatigue problem worse despite potentially improving open rates. This is the direction-of-harm guardrail.',
              },
              {
                id: 'gm-b',
                label: 'Notification volume per user — ensure the system isn\'t sending more notifications in treatment',
                scoreValue: 1,
                rationale: 'Worth checking as a sanity metric — if the redesign accidentally increases notification volume, any engagement improvement is confounded. Not a true guardrail but a validity check.',
              },
              {
                id: 'gm-c',
                label: 'All 5 remaining PM metrics should be treated as guardrails (anything negative blocks shipping)',
                scoreValue: 0,
                rationale: 'Converting the PM\'s wish list into guardrails is a way of smuggling in multiple testing without adjustment. If 5 metrics are "guardrails" that all must be clean, you have 5 tests at α = 0.05 each — the FWER for "all clean" is ~23% false negative rate even with no real effect.',
              },
              {
                id: 'gm-d',
                label: 'Time-to-first-response — response latency shouldn\'t worsen with the new design',
                scoreValue: 2,
                rationale: 'Good guardrail. Smart grouping and priority ranking could theoretically cause users to respond later (if notifications are de-emphasized). Ensuring response latency doesn\'t worsen is a meaningful blocking condition.',
              },
            ],
          },
          {
            id: 'diagnosticMetrics',
            label: 'Which of the PM\'s 6 metrics should be secondaries/diagnostics (informational only)?',
            type: 'multi_select',
            conceptLinks: ['multiple-testing', 'bonferroni'],
            options: [
              {
                id: 'dm-a',
                label: 'Notification open rate — informational, not decision-making',
                scoreValue: 2,
                rationale: 'Correct classification. Open rate is a mechanism metric — it tells you whether the design change is visible. But it\'s not the business outcome. Treating it as informational keeps it out of the multiple testing problem.',
              },
              {
                id: 'dm-b',
                label: 'Notification fatigue score (survey) — interesting signal but lagging and noisy',
                scoreValue: 2,
                rationale: 'Correct classification. Survey metrics have collection lag, lower sample sizes (not all users respond), and higher variance. Valuable for understanding the mechanism but not reliable enough for a primary or guardrail.',
              },
              {
                id: 'dm-c',
                label: 'All 6 PM metrics should remain as secondary metrics tracked with equal weight',
                scoreValue: 0,
                rationale: '"Equal weight" with no primary creates the same multiple testing problem as "6 co-primaries." Secondaries should be tracked for mechanism understanding, not for equal-weight decision-making.',
              },
              {
                id: 'dm-d',
                label: 'Snooze feature usage rate — mechanism check for the new snooze functionality',
                scoreValue: 1,
                rationale: 'Good diagnostic. Snooze adoption tells you whether users are engaging with the new feature or ignoring it. High snooze adoption with neutral retention might mean the feature is used defensively (to dismiss notifications) rather than productively.',
              },
            ],
          },
        ],
      },
      {
        id: 'logistics',
        label: 'Logistics',
        hint: 'How long, how large, how attributed?',
        fields: [
          {
            id: 'runtime',
            label: 'How long should this experiment run?',
            type: 'single_select',
            conceptLinks: ['mde', 'power'],
            options: [
              {
                id: 'rt-a',
                label: '4 weeks — captures behavioral adjustment period and gives enough data for 7-day retention analysis',
                scoreValue: 2,
                rationale: 'Correct. Notification habits take time to form or change. A 4-week window allows: (1) week-over-week effect analysis to detect novelty decay, (2) enough users with complete 7-day retention observations, (3) time for the survey-based metric to be collected.',
              },
              {
                id: 'rt-b',
                label: '6 weeks — the survey metric has a 2-week lag, so we need more time',
                scoreValue: 1,
                rationale: 'The survey metric is informational — it doesn\'t need to be fully collected before making the decision. 4 weeks is sufficient for the primary and guardrails. 6 weeks is acceptable but delays the decision unnecessarily.',
              },
              {
                id: 'rt-c',
                label: '2 weeks — fast read, then decide',
                scoreValue: 0,
                rationale: 'Risky for a notification behavior test. Users need time to adjust to new notification patterns. Week-1 behavior reflects novelty response to a changed interface, not long-term behavioral equilibrium.',
              },
            ],
          },
          {
            id: 'attributionWindow',
            label: 'What attribution window applies?',
            type: 'single_select',
            conceptLinks: ['right-censoring'],
            options: [
              {
                id: 'aw-a',
                label: '7-day window from first exposure for retention; same-day window for notification metrics',
                scoreValue: 2,
                rationale: 'Correct — different metrics need different windows. Retention is measured 7 days out from signup/first exposure. Notification metrics (open rate, response rate) are measured on the day they occur. Applying a single window to all metrics is analytically wrong.',
              },
              {
                id: 'aw-b',
                label: '30-day window for all metrics to capture long-term effects',
                scoreValue: 0,
                rationale: 'The test window is 4 weeks. A 30-day window means most users don\'t have complete observations. This is a right-censoring problem — you can\'t measure 30-day retention from a 4-week test without survival analysis.',
              },
              {
                id: 'aw-c',
                label: 'Same-day window for all metrics — measure immediately to avoid confounding',
                scoreValue: 0,
                rationale: 'Appropriate for notification-level metrics but completely wrong for retention. 7-day retention cannot be measured same-day — it requires 7 days of observation by definition.',
              },
            ],
          },
          {
            id: 'sampleSizeConcern',
            label: 'What is the key power consideration?',
            type: 'single_select',
            conceptLinks: ['power', 'mde', 'multiple-testing'],
            options: [
              {
                id: 'ss-a',
                label: 'With multiple metrics, the effective per-metric significance threshold is lower after multiple testing correction — I should verify the MDE is achievable at the adjusted alpha, not nominal α = 0.05',
                scoreValue: 2,
                rationale: 'Correct and important. If you apply Bonferroni across 2 guardrails and 1 primary, your effective per-test alpha is lower. The MDE at α = 0.017 (Bonferroni for 3 tests) is larger than at α = 0.05. Verify power at the correct threshold.',
              },
              {
                id: 'ss-b',
                label: '28,000 MAU is sufficient for all 6 metrics at standard significance levels',
                scoreValue: 0,
                rationale: 'This ignores the multiple testing adjustment needed when tracking multiple metrics and treats all metrics as equally powered. Some metrics (e.g., survey-based fatigue score with low response rate) will have far less power than notification metrics with high observation rates.',
              },
              {
                id: 'ss-c',
                label: 'No power concern — use adaptive stopping (stop when any metric hits p < 0.05)',
                scoreValue: 0,
                rationale: 'Adaptive stopping on any metric is the worst possible approach for a multiple testing scenario. It inflates the false positive rate massively and makes the result completely unreliable.',
              },
            ],
          },
        ],
      },
      {
        id: 'risks',
        label: 'Risks & Decision Rule',
        hint: 'What could invalidate this, and what will you do with the result?',
        fields: [
          {
            id: 'trustChecks',
            label: 'Which trust checks should you run?',
            type: 'multi_select',
            conceptLinks: ['srm'],
            options: [
              {
                id: 'tc-a',
                label: 'SRM check on user assignment',
                scoreValue: 2,
                rationale: 'Always first. Notification system changes often involve eligibility logic that can subtly affect assignment distribution.',
              },
              {
                id: 'tc-b',
                label: 'Verify notification volume is equal in both arms (treatment isn\'t sending more or fewer notifications)',
                scoreValue: 2,
                rationale: 'Critical for this specific test. If the smart grouping algorithm sends fewer notifications in treatment, any engagement changes are confounded with notification volume, not just quality. Must be a validity check, not just a diagnostic.',
              },
              {
                id: 'tc-c',
                label: 'Verify pre-experiment engagement metrics are equivalent in both arms',
                scoreValue: 1,
                rationale: 'Good practice. For notification engagement metrics, pre-experiment equivalence confirms the randomization produced comparable arms.',
              },
            ],
          },
          {
            id: 'validityRisks',
            label: 'What are the main validity risks?',
            type: 'multi_select',
            conceptLinks: ['novelty-effect', 'multiple-testing'],
            options: [
              {
                id: 'vr-a',
                label: 'Multiple testing inflation — if you test all 6 PM metrics for significance, expect ~26% false positive rate across the set',
                scoreValue: 2,
                rationale: 'The most important validity risk for this design. The PM\'s desire for all 6 metrics to improve creates a reporting problem: if you run 6 tests at α = 0.05, you expect ~1.3 false positives by chance alone. Pre-committing to one primary and applying correction is the only solution.',
              },
              {
                id: 'vr-b',
                label: 'Novelty exploration of the snooze feature inflating early engagement metrics',
                scoreValue: 2,
                rationale: 'Real risk. The snooze feature is new. Users may interact with it heavily in week 1 (out of curiosity) and then stop using it in week 3. Weekly breakdowns will diagnose this.',
              },
              {
                id: 'vr-c',
                label: 'Hawthorne effect — users in treatment may be more engaged because they know they\'re in a test',
                scoreValue: 0,
                rationale: 'Users don\'t know they\'re in an experiment. Hawthorne effect is not a meaningful threat in standard product A/B tests where treatment/control assignment is invisible to users.',
              },
              {
                id: 'vr-d',
                label: 'Business pressure creating post-hoc cherry-picking — the PM commits to "6 metrics improve" but will accept if "most" improve after seeing data',
                scoreValue: 2,
                rationale: 'The most important organizational risk. The PM\'s "all 6 metrics" framing creates political pressure to find wins. Without a pre-committed primary metric and decision rule, the readout becomes a post-hoc exercise in finding positive metrics. This is a validity risk that must be addressed before the test starts.',
              },
            ],
          },
          {
            id: 'decisionRule',
            label: 'What is the pre-committed decision rule?',
            type: 'single_select',
            conceptLinks: ['p-value', 'guardrail-metric', 'multiple-testing', 'bonferroni'],
            options: [
              {
                id: 'dr-a',
                label: 'Ship if the pre-committed primary metric (7-day retention or WAU) is significantly positive at the alpha-adjusted threshold AND no guardrails breach. Secondary metrics are reported for context but do not change the decision.',
                scoreValue: 2,
                rationale: 'Correct structure. One primary, alpha-adjusted, guardrails as blocking conditions, secondaries as informational. This is the only pre-committed rule that prevents post-hoc cherry-picking from 6 metrics.',
              },
              {
                id: 'dr-b',
                label: 'Ship if the majority (4+) of the PM\'s 6 metrics improve significantly.',
                scoreValue: 0,
                rationale: '"Majority of 6 metrics" is an ad hoc threshold with no statistical justification. It\'s essentially running 6 tests and selecting a post-hoc rule. The effective false positive rate is not α = 0.05 — it\'s much higher.',
              },
              {
                id: 'dr-c',
                label: 'Ship if any core engagement metric (open rate, response rate, or retention) is significantly positive.',
                scoreValue: 0,
                rationale: '"Any of three" is a multiple testing problem. The probability of at least one false positive across three tests at α = 0.05 is ~14%. This is three times the nominal rate.',
              },
              {
                id: 'dr-d',
                label: 'Ship if 7-day retention improves significantly AND notification unsubscribe rate doesn\'t significantly increase AND response time doesn\'t significantly worsen. Apply Bonferroni correction across these three tests.',
                scoreValue: 2,
                rationale: 'Also correct and more precise. Explicitly applies Bonferroni correction to the set of decision-relevant tests. This is staff-level precision — most analysts get the spirit right but don\'t specify the correction method.',
              },
            ],
          },
        ],
      },
    ],

    scoringRubric: {
      dimensions: [
        { id: 'metric_selection', label: 'Metric selection', weight: 0.30, fieldIds: ['primaryMetric', 'guardrailMetrics'] },
        { id: 'design_validity', label: 'Design validity', weight: 0.35, fieldIds: ['randomizationUnit', 'unitOfAnalysis', 'trustChecks', 'validityRisks'] },
        { id: 'decision_discipline', label: 'Decision discipline', weight: 0.20, fieldIds: ['decisionRule', 'sampleSizeConcern'] },
        { id: 'hypothesis_framing', label: 'Hypothesis framing', weight: 0.15, fieldIds: ['hypothesis', 'businessDecision'] },
      ],
      levels: {
        incomplete:    { minScore: 0,    label: 'Incomplete' },
        analyst_ready: { minScore: 0.45, label: 'Analyst-Ready' },
        senior_ready:  { minScore: 0.68, label: 'Senior-Ready' },
        staff_level:   { minScore: 0.85, label: 'Staff-Level' },
      },
    },

    seniorDesign: {
      rationale: `The central problem in this design is the PM\'s framing. "All 6 metrics should improve" is not a hypothesis — it\'s a wish. Letting it stand as the success definition means the readout will become a post-hoc exercise in finding which metrics moved in the right direction, and calling that success.

The analyst\'s job before this test starts is to get a pre-committed primary metric agreed upon. That means going back to the PM and asking: "If exactly one of these six metrics moves in the right direction, is that a success? Which one would it be?" That conversation is analytically essential, not politically optional.

The multiple testing correction is not optional either. If you track 6 metrics without correction, you will report false positives. The structure is: one primary (retention or WAU), one or two guardrails (unsubscribe rate, response time), the rest informational. Bonferroni or Benjamini-Hochberg across the primary + guardrails is appropriate.

The notification volume check is the most important trust check specific to this design. If the smart grouping algorithm reduces notification volume, any engagement change is partially explained by volume, not quality. That confound must be verified before interpreting results.`,
      commonMistakes: [
        {
          mistake: 'Treating all 6 PM metrics as co-equal primaries',
          consequence: 'With 6 tests at α = 0.05, you expect ~1.3 false positives. When the readout arrives, you\'ll find 2-3 "significant" results and call it a win — but some of those wins are noise. You ship a feature whose real effect is smaller or zero.',
          conceptLink: 'multiple-testing',
        },
        {
          mistake: 'Not verifying notification volume equivalence before the test',
          consequence: 'Smart grouping reduces notification volume by 20% in treatment. Notification engagement metrics (open rate, response rate) improve partly because there are fewer, higher-quality notifications. The effect is real but confounded — it\'s partly a volume effect, not purely a quality effect.',
          conceptLink: 'srm',
        },
        {
          mistake: 'Allowing "all 6 metrics should improve" to remain as the success definition',
          consequence: 'The business pressure creates post-hoc cherry-picking. 4 metrics improve, 2 don\'t. The team negotiates down to "most metrics improved" as success. The experiment has no pre-committed rule to prevent this.',
          conceptLink: 'p-value',
        },
      ],
    },

    pairedScenarioPrompt: {
      toReview: 'You designed this test — and pre-committed to a decision rule. Now read what happened when Loopwise ran it.',
      fromReview: 'You read the Five Metrics Problem. Go back and design this experiment — decide before seeing the data how many metrics can count as "success."',
    },
  },
];

export const designScenariosById = Object.fromEntries(designScenarios.map(s => [s.id, s]));
