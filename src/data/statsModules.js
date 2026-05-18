// Product Analytics Lab — Stats Room Module Data
// V1.5 — 8 modules. Every module starts with a product situation.
// No textbook definitions. No formula drills. Every concept lives inside a call.

export const statsModules = [

  // ─────────────────────────────────────────────
  // STAT01 — P-value Is Not the Decision (FREE · Foundational)
  // Trap: p < 0.05 but CI spans near-zero and guardrail is degraded
  // ─────────────────────────────────────────────
  {
    id: 'stat01-pvalue-decision',
    title: 'p < 0.05. Ship it?',
    concept: 'p-value',
    difficulty: 'foundational',
    isFree: true,
    linkedConceptIds: ['p-value', 'confidence-interval', 'guardrail-metric'],
    linkedScenarioIds: ['s01-checkout-trap'],
    linkedDesignIds: ['d01-checkout-test'],

    situation: {
      company: 'Crestline Home',
      product: 'E-commerce checkout — $55M ARR, ~42k daily checkout users',
      context: 'The team ran a 14-day test removing the upsell widget from checkout. The PM is in your Slack: "p = 0.03, we\'re significant, can we ship end of day?"',
      decisionPressure: 'Q4 starts in 72 hours. The head of growth wants a clean decision before the holiday campaign launches.',
    },

    setup: {
      metric: 'Checkout conversion rate (primary)',
      baseline: '62.4%',
      observedResult: 'Treatment: 63.8% (+1.4pp, +2.2%)',
      sampleInfo: 'n = 294,000 users per arm. p = 0.031. 95% CI: [+0.1%, +4.3%]',
      caveat: 'Secondary metric: revenue per checkout user. Treatment: $48.20 vs control $51.10 (–$2.90, p = 0.008). Page load time: treatment +340ms (p < 0.001).',
    },

    question: 'Evaluate this claim.',
    claim: '"p = 0.031 — we cleared our significance threshold. The conversion improvement is statistically confirmed and we should ship end of day."',

    options: [
      {
        id: 'a',
        label: 'Valid — p = 0.031 clears our threshold and the conversion improvement is real. Ship it.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Statistical significance on the primary metric is one input, not the full decision. This claim ignores revenue per user (–$2.90, significantly negative) and a +340ms latency breach. Both are guardrail-level concerns that override a green primary metric. p < 0.05 tells you the effect is real — not that it\'s worth the tradeoffs.',
      },
      {
        id: 'b',
        label: 'Directionally reasonable but incomplete — the conversion lift is real, but the claim doesn\'t address the revenue and latency data.',
        isCorrect: false,
        level: 'partial',
        feedback: 'The incompleteness here isn\'t just framing — it changes the decision. Revenue per user is significantly negative, meaning the upsell revenue lost outweighs the conversion gain. And the latency breach alone would block ship. Calling the claim "incomplete" understates it: the missing data inverts the conclusion.',
      },
      {
        id: 'c',
        label: 'Not supported — statistical significance on conversion rate doesn\'t override a significantly negative revenue result and a +340ms latency guardrail breach.',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. p < 0.05 on the primary metric means the conversion effect is real. It says nothing about whether the full decision is a ship. Revenue per checkout user — which captures both the conversion gain and lost upsell revenue — is significantly negative. The latency breach is a separate guardrail failure. Two guardrail violations mean this test fails, regardless of the primary.',
      },
      {
        id: 'd',
        label: 'Cannot conclude — conflicting signals make it impossible to evaluate this claim without more data.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'The data is not ambiguous — it\'s directionally clear on what matters. Revenue per user is down significantly. Latency is up significantly. These are not ambiguous signals requiring more data; they are clean negative signals on the business outcome. "Cannot conclude" is the wrong frame when you have statistically significant evidence pointing in a clear direction.',
      },
    ],

    seniorRead: {
      shortAnswer: 'Do not ship. Revenue per user is the correct primary metric for this decision, and it is significantly negative.',
      why: 'A checkout test that removes an upsell widget has two financial effects: conversion lift (people complete checkout more) and revenue loss (fewer upsells). Checkout conversion rate only measures one side. Revenue per checkout user captures both. The correct primary metric was always revenue per user — and that metric is telling you the tradeoff is not worth it.\n\nThe latency degradation is a separate concern that would trigger a no-ship on its own. +340ms on checkout is not a minor UX cost — it has well-documented effects on abandonment rates.\n\np = 0.03 on the conversion rate is correct. But statistical significance on the wrong metric is meaningless for the business decision.',
      commonMistake: 'Treating "p < 0.05 on the primary metric" as the decision. Statistical significance tells you the effect is real. It says nothing about whether the effect is worth the tradeoffs. You need both.',
      interviewPhrase: '"p < 0.05 means the conversion effect is statistically distinguishable from noise — not that we should ship. I\'d look at the full revenue picture and guardrail metrics before making the call. Here, revenue per user is down significantly, which is the real business outcome."',
      connectsTo: ['design', 'review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT02 — Confidence Interval Reality Check (FREE · Foundational)
  // Trap: point estimate looks good, but CI lower bound is near zero
  // ─────────────────────────────────────────────
  {
    id: 'stat02-ci-reality',
    title: 'The +3.2% That Might Be Nothing',
    concept: 'confidence-interval',
    difficulty: 'foundational',
    isFree: true,
    linkedConceptIds: ['confidence-interval', 'p-value', 'mde'],
    linkedScenarioIds: ['s01-checkout-trap'],
    linkedDesignIds: [],

    situation: {
      company: 'Meridian Health',
      product: 'Patient appointment scheduling app — 280k monthly active users',
      context: 'The team shipped a redesigned appointment booking flow two weeks ago. The PM is presenting the results to the VP: "We saw a +3.2% improvement in booking completion rate. Strong result — recommending we roll this to all users."',
      decisionPressure: 'The VP wants to announce this as a win in the quarterly all-hands next week. The PM has already drafted the announcement.',
    },

    setup: {
      metric: 'Appointment booking completion rate',
      baseline: '71.4%',
      observedResult: 'Treatment: 74.6% (+3.2pp, +4.5%)',
      sampleInfo: 'n = 18,200 users per arm. p = 0.041. 95% CI: [+0.1pp, +6.3pp]',
      caveat: 'MDE set pre-experiment at 3.0pp. Experiment ran 14 days.',
    },

    question: 'Evaluate this claim.',
    claim: '"We saw a +3.2% improvement in booking completion rate. Strong result — recommending we roll this to all users."',

    options: [
      {
        id: 'a',
        label: 'Valid — p = 0.041 is significant and the point estimate exceeds the pre-set MDE of 3.0pp. The rollout recommendation is justified.',
        isCorrect: false,
        level: 'partial',
        feedback: 'The significance and MDE framing is correct, but "strong result" overstates the precision. The 95% CI is [+0.1pp, +6.3pp] — the true effect could be near-zero or could be substantial. Rollout may be justified, but presenting "+3.2pp" as a precise, reliable estimate to the VP hides material uncertainty that affects how confident leadership should be.',
      },
      {
        id: 'b',
        label: 'Directionally reasonable but incomplete — the effect is real and positive, but the claim presents the point estimate as more definitive than the 95% CI [+0.1pp, +6.3pp] supports.',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. The direction is clear, significance is real, and rollout is defensible. But "strong result" for a CI that spans near-zero to +6.3pp oversells the precision. The right framing for the VP: the direction is confirmed, the size is genuinely uncertain, and you\'re recommending rollout with monitoring. Leaders make better decisions when they know the confidence level, not just the headline number.',
      },
      {
        id: 'c',
        label: 'Not supported — a CI lower bound near zero means the effect isn\'t large enough to meaningfully impact the business. Rolling out isn\'t justified.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Too conservative. A CI of [+0.1pp, +6.3pp] is statistically significant and the probability-weighted outcome is positive. The MDE was 3.0pp; the point estimate is 3.2pp. "Not supported" implies rollout is unjustified — but the data does support a directionally positive, real effect. The issue is precision framing, not the rollout decision itself.',
      },
      {
        id: 'd',
        label: 'Cannot conclude — the CI width is too large to draw any recommendation from this data.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'A wide CI is uncertainty about magnitude, not a barrier to concluding anything. The result is statistically significant. The direction is clear. The CI tells you the effect could be small or large — but probability-weighted, it\'s positive and justifies rollout with monitoring. "Cannot conclude" is the wrong call when you have a significant result and no guardrail harms.',
      },
    ],

    seniorRead: {
      shortAnswer: 'Significant, directionally positive, but uncertain in magnitude. Present the full CI, not just the point estimate.',
      why: 'A 95% CI of [+0.1pp, +6.3pp] tells you: the true effect is somewhere in this range with 95% confidence. The point estimate (+3.2pp) is your best single guess, but it\'s not the truth. The lower bound being near zero means you could plausibly have a near-negligible effect. The upper bound of +6.3pp means you could have a meaningful one.\n\nThe right action depends on the cost of being wrong. For a patient-facing scheduling feature, rollout with monitoring is reasonable — the probability-weighted outcome is positive and there\'s no guardrail evidence of harm.',
      commonMistake: 'Presenting only the point estimate. "+3.2% improvement" without the CI hides the uncertainty from decision-makers. They make decisions based on what you tell them — if you only give them the optimistic number, they\'ll make an optimistic decision.',
      interviewPhrase: '"Before calling this a strong result, I\'d report the full CI, not just the point estimate. A 95% CI of [+0.1pp, +6.3pp] means the effect is real but its size is genuinely uncertain. I\'d recommend rollout with monitoring rather than claiming a definitive win."',
      connectsTo: ['review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT03 — Power and MDE (FREE · Foundational)
  // Trap: "no effect" from underpowered test, team wants to rollback
  // ─────────────────────────────────────────────
  {
    id: 'stat03-power-mde',
    title: 'No Effect Found. Roll Back?',
    concept: 'power',
    difficulty: 'foundational',
    isFree: true,
    linkedConceptIds: ['power', 'mde', 'confidence-interval'],
    linkedScenarioIds: ['s08-false-rigor'],
    linkedDesignIds: [],

    situation: {
      company: 'Loopwise',
      product: 'B2B project management SaaS — 14k paying accounts',
      context: 'The team ran a 10-day test of a new in-app onboarding checklist. p = 0.21. The engineering lead wants to roll the feature back: "No significant effect after 10 days — it doesn\'t work, let\'s move on."',
      decisionPressure: 'The PM agrees. The sprint retro is tomorrow and they want to close this ticket as "no impact, deprioritized."',
    },

    setup: {
      metric: 'Week-1 activation rate (completed ≥3 core actions)',
      baseline: '38%',
      observedResult: 'Treatment: 40.1% (+2.1pp). p = 0.21. 95% CI: [–1.2pp, +5.4pp]',
      sampleInfo: 'n = 820 users per arm over 10 days.',
      caveat: 'Pre-experiment power analysis: to detect a 3pp lift at 80% power requires n = 3,200 users per arm. Current sample is 820 per arm. MDE at current sample size: ~8pp.',
    },

    question: 'Evaluate this claim.',
    claim: '"p = 0.21 — no significant effect after 10 days. The checklist feature doesn\'t work. We should roll back and move on."',

    options: [
      {
        id: 'a',
        label: 'Valid — p = 0.21 fails our significance threshold. No effect detected; rolling back is the correct call.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'This is "absence of evidence is evidence of absence" — a classic mistake. p = 0.21 means we failed to reject the null, not that the null is true. The test ran for 10 days with n = 820 per arm. The MDE at that sample size is ~8pp. If the true effect is +2–3pp, this test was never going to detect it — regardless of how long you waited. "No effect detected" ≠ "no effect exists."',
      },
      {
        id: 'b',
        label: 'Directionally reasonable but incomplete — p = 0.21 is indeed not significant, but the claim skips the power analysis that explains why.',
        isCorrect: false,
        level: 'partial',
        feedback: 'Better than treating p = 0.21 as a negative result, but "incomplete" understates the problem. This claim drives a rollback decision based on a test that was never designed to detect the effect size in question. The observed +2.1pp is in the expected direction but below the detection threshold. Incomplete framing here leads to the same bad outcome: discarding a feature that may work.',
      },
      {
        id: 'c',
        label: 'Not supported — the test was underpowered. MDE at n = 820 is ~8pp, but we\'re looking for a ~3pp lift. p = 0.21 is inconclusive, not negative. Rolling back is premature.',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. A power analysis reveals why p = 0.21 happened: the test needed 3,200 users per arm to detect a 3pp lift at 80% power. It ran with 820. The MDE at that sample is ~8pp — a 3pp effect is invisible to this test. The 95% CI [–1.2pp, +5.4pp] is wide precisely because the test is underpowered. This is an inconclusive result, not a negative one. The right call: re-run with adequate sample.',
      },
      {
        id: 'd',
        label: 'Cannot conclude — the sample is too small to say anything in either direction.',
        isCorrect: false,
        level: 'partial',
        feedback: '"Cannot conclude" is closer to right than "roll back" — you\'re correctly identifying insufficient evidence. But the stronger framing names the mechanism: the test was underpowered for the effect size we care about. "Cannot conclude" leaves it ambiguous whether you need more data or a different design. "Underpowered, re-run with n = 3,200" is the actionable version.',
      },
    ],

    seniorRead: {
      shortAnswer: 'This is an underpowered test. p = 0.21 is inconclusive, not negative. Do not roll back — re-run with adequate sample.',
      why: 'Statistical power is the probability of detecting a real effect if one exists. 80% power at n=3,200 means even with a true +3pp lift, you\'d miss it 20% of the time. At n=820, you\'d miss it much more often.\n\nThe MDE at the current sample size is ~8pp. The observed effect is +2.1pp. If the true effect were exactly +2.1pp, this test would almost never detect it. The "null result" is fully explained by insufficient power.\n\nThe CI [–1.2pp, +5.4pp] is very wide. That width is itself the signal: we don\'t have enough data to say anything meaningful.',
      commonMistake: '"No significant effect" means we failed to reject the null — not that the null is true. These are not the same thing, and confusing them leads to discarding features that may work.',
      interviewPhrase: '"Before interpreting a null result, I check whether the test was powered to detect the effect size we care about. Here, the MDE at the current sample is ~8pp — we were looking for a 3pp lift. The test couldn\'t have found it even if it existed. This is an inconclusive result, not a negative one."',
      connectsTo: ['design', 'review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT04 — SRM Before Results (FREE · Foundational)
  // Trap: assignment imbalance but team wants to read lift anyway
  // ─────────────────────────────────────────────
  {
    id: 'stat04-srm-first',
    title: 'The Numbers Look Great. Check This First.',
    concept: 'srm',
    difficulty: 'foundational',
    isFree: true,
    linkedConceptIds: ['srm', 'randomization-unit', 'unit-of-analysis'],
    linkedScenarioIds: ['s02-ghost-assignment'],
    linkedDesignIds: ['d02-onboarding-assignment'],

    situation: {
      company: 'Threadline',
      product: 'B2B productivity SaaS — teams of 5–50 users, 120k seats',
      context: 'The team ran a 2-week test of a new onboarding flow. Results came in. Before reading the metrics, you\'re reviewing the assignment logs. Control: 14,820 users. Treatment: 16,340 users. The planned split was 50/50.',
      decisionPressure: 'The PM already saw the summary dashboard. Treatment shows +11% week-1 activation. They\'re in your calendar for an hour from now to discuss shipping.',
    },

    setup: {
      metric: 'Week-1 activation rate (primary)',
      baseline: '41%',
      observedResult: 'Treatment: 45.5% (+4.5pp, +11%). p = 0.001.',
      sampleInfo: 'Planned: 50/50. Actual: Control 14,820 / Treatment 16,340. Chi-square test on assignment counts: p < 0.0001.',
      caveat: 'Ratio: treatment is 52.4% of assigned users vs. expected 50.0%. Absolute SRM: +4.8pp over-assignment to treatment.',
    },

    question: 'Evaluate this claim.',
    claim: '"Treatment shows +11% week-1 activation with p = 0.001. The assignment difference is a minor data quality note, but the effect is too strong to ignore. We should ship."',

    options: [
      {
        id: 'a',
        label: 'Valid — p = 0.001 with +11% lift is strong enough that the assignment imbalance doesn\'t change the conclusion.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Effect size doesn\'t override validity. An SRM means the assignment mechanism broke — treatment and control groups are not comparable. The +11% lift could be entirely explained by selection bias: if higher-intent users systematically ended up in treatment (due to a logging bug, redirect, or eligibility change), you\'d see exactly this pattern. A strong observed effect from a broken experiment is not evidence of a real effect.',
      },
      {
        id: 'b',
        label: 'Directionally reasonable but incomplete — the activation lift looks strong, but the SRM needs investigation before the causal estimate can be trusted.',
        isCorrect: false,
        level: 'partial',
        feedback: '"Needs investigation" is the right direction, but the claim describes SRM as a "minor data quality note" — and this framing lets the ship recommendation stand. SRM is not a note. It\'s a validity failure that means you cannot causally interpret any metric from this experiment. The right response isn\'t "investigate then probably ship" — it\'s "stop reading metrics until the cause is identified."',
      },
      {
        id: 'c',
        label: 'Not supported — SRM invalidates causal inference. The +11% lift cannot be attributed to the treatment when assignment is broken. Calling this a "minor note" mischaracterizes a validity failure.',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. SRM is the trust check that comes before outcome reading. Chi-square p < 0.0001 on assignment counts is not ambiguous — the assignment mechanism failed. Possible causes: session-level vs. user-level assignment (same user assigned twice), a redirect step affecting one arm, eligibility logic changes mid-experiment, or unequal bot filtering. Until the cause is identified, every metric from this experiment is suspect. Stop. Diagnose. Then decide.',
      },
      {
        id: 'd',
        label: 'Cannot conclude — the SRM makes it impossible to interpret any metrics from this experiment.',
        isCorrect: false,
        level: 'partial',
        feedback: '"Cannot conclude" is the right outcome, but it\'s passive — it doesn\'t explain why the claim is wrong or what to do. The stronger framing: SRM is a validity failure that requires active diagnosis, not just suspended judgment. You should be telling the PM why the experiment can\'t be read (broken randomization), and what the next step is (investigate the SRM cause before any ship decision).',
      },
    ],

    seniorRead: {
      shortAnswer: 'SRM is a stop sign. Read nothing. Diagnose the cause first.',
      why: 'An SRM means the randomization mechanism failed. The most common causes in onboarding experiments: session-level vs user-level assignment (the same user hits the assignment code multiple times and ends up in both arms, creating log-level over-representation), a redirect step that only fires for one arm, eligibility logic that changed mid-experiment, or bot/spam traffic filtering applied unequally.\n\nUntil you know why the split is wrong, you don\'t know whether users in treatment and control are otherwise comparable. Every metric you read has an unknown confound. The +11% activation lift is as likely to be a selection artifact as a real effect.',
      commonMistake: 'Treating SRM as a footnote or a minor data quality issue. "We\'ll just note it in the limitations." An SRM is not a limitation — it\'s a validity failure. The experiment did not run as designed.',
      interviewPhrase: '"Before reading any metric, I run a chi-square test on the assignment counts. If SRM is confirmed, I stop there — I won\'t interpret treatment effects from a mismatched sample until I know why the split broke."',
      connectsTo: ['design', 'review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT05 — Multiple Testing Trap (BETA · Analyst)
  // Trap: 1 metric wins out of 7 without hierarchy; team celebrates
  // ─────────────────────────────────────────────
  {
    id: 'stat05-multiple-testing',
    title: 'One of Seven Metrics Is Significant',
    concept: 'multiple-testing',
    difficulty: 'analyst',
    isFree: false,
    linkedConceptIds: ['multiple-testing', 'bonferroni', 'primary-metric'],
    linkedScenarioIds: ['s06-five-metrics'],
    linkedDesignIds: ['d04-multi-metric-launch'],

    situation: {
      company: 'Loopwise',
      product: 'B2B project management SaaS — quarterly OKR: improve 7-day retention',
      context: 'The team ran a 3-week test of a new "daily digest" email feature. Results came in. The PM sent to Slack: "Revenue per seat is significant at p = 0.04! Declaring a win — this clearly works."',
      decisionPressure: 'Board review is Friday. The PM wants to include this in the quarterly results presentation as an example of retention-driving work.',
    },

    setup: {
      metric: 'Pre-registered primary: 7-day retention. 6 secondary metrics also tracked.',
      baseline: '7-day retention: 61%',
      observedResult: 'Results across all 7 metrics: 7-day retention: +0.8pp (p=0.31), DAU/MAU: +0.4pp (p=0.44), Feature adoption: +1.1% (p=0.19), Support tickets: –2.1% (p=0.38), Session length: +22s (p=0.12), Email opens: +14% (p=0.003), Revenue per seat: +1.8% (p=0.04).',
      sampleInfo: 'n = 4,800 accounts per arm. 7 metrics tested. Primary was pre-registered as 7-day retention.',
      caveat: 'No pre-registered threshold for secondary metrics. Bonferroni correction for 7 tests: α = 0.0071 per test.',
    },

    question: 'The PM wants to ship and present this as a win based on revenue per seat. What do you say?',

    options: [
      {
        id: 'a',
        label: '"Revenue per seat is significant — ship it. The primary metric is underpowered but the secondary result is real."',
        isCorrect: false,
        level: 'wrong',
        feedback: 'The primary metric — 7-day retention — was pre-registered and is not significant. Revenue per seat is one of six secondary metrics, all tested without a pre-specified hierarchy. With 7 tests at α=0.05, you expect about 0.35 false positives by chance. Revenue per seat at p=0.04 is well within false-positive range. This is cherry-picking, not analysis.',
      },
      {
        id: 'b',
        label: '"The primary metric (7-day retention) is not significant. The revenue result is a secondary metric that doesn\'t survive Bonferroni correction (threshold: p < 0.0071). This experiment failed on its pre-registered hypothesis."',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. The primary metric was pre-registered as 7-day retention, and it\'s not significant. Revenue per seat at p=0.04 doesn\'t survive Bonferroni correction (α = 0.0071 for 7 tests). Even without formal correction, a single secondary metric significant at p=0.04 across 7 tests is exactly what you\'d expect from chance. The experiment failed on its stated hypothesis.',
      },
      {
        id: 'c',
        label: '"Email opens are also significant (p=0.003). Both are wins — let\'s ship."',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Email opens is not a business outcome — it\'s a mechanism metric for the email feature itself. Significant email opens means the email feature works as an email feature. It doesn\'t tell you whether it\'s improving the product outcomes you care about (retention, revenue). More importantly, the primary metric (retention) is not significant.',
      },
      {
        id: 'd',
        label: '"We should re-run with revenue per seat as the primary metric since that\'s where we saw the effect."',
        isCorrect: false,
        level: 'partial',
        feedback: 'Close — re-running with a pre-specified primary is the right instinct. But the framing is wrong: you\'re not "confirming" a finding; you\'re using the current data to generate a hypothesis for a new test. Revenue per seat showing up as an interesting secondary is a hypothesis, not a result. Run a new experiment with revenue per seat pre-registered as primary before claiming a win.',
      },
    ],

    seniorRead: {
      shortAnswer: 'The experiment failed. The pre-registered primary metric is not significant. A single secondary result at p=0.04 across 7 tests is noise.',
      why: 'Multiple testing is one of the most common sources of false wins in product experimentation. With 7 metrics at α=0.05, the family-wise error rate (probability of at least one false positive) is approximately 30%. Revenue per seat at p=0.04 is exactly in the range you\'d expect from chance.\n\nThe solution isn\'t to test fewer metrics — it\'s to pre-register one primary and treat secondaries as exploratory. A secondary metric that lights up is a hypothesis for the next experiment, not a win to ship on.',
      commonMistake: '"We saw a significant result across our metrics" implies one finding among many is evidence of effectiveness. It is not. The more metrics you measure, the more likely one will be significant by chance.',
      interviewPhrase: '"I\'d pre-register one primary metric before the test runs. If the primary isn\'t significant, the experiment failed, regardless of what the secondaries show. A secondary result is a hypothesis for the next experiment."',
      connectsTo: ['design', 'review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT06 — Guardrail Breach (BETA · Analyst)
  // Trap: primary wins, PM wants to ship, guardrail is degraded
  // ─────────────────────────────────────────────
  {
    id: 'stat06-guardrail-breach',
    title: 'The Primary Won. The Guardrail Didn\'t.',
    concept: 'guardrail-metric',
    difficulty: 'analyst',
    isFree: false,
    linkedConceptIds: ['guardrail-metric', 'p-value', 'primary-metric'],
    linkedScenarioIds: ['s03-slow-tax'],
    linkedDesignIds: [],

    situation: {
      company: 'Vantage Analytics',
      product: 'B2B analytics platform — 8,200 paying users, enterprise contracts',
      context: 'The team tested a new AI-powered dashboard generation feature. Primary metric: report creation rate (reports created per active user per week). Pre-committed guardrails: p99 load time (threshold: no degradation beyond +200ms), error rate (threshold: no increase).',
      decisionPressure: 'The PM is excited: "Primary metric is up +18%, p < 0.001. This is our biggest win this quarter. Ship it."',
    },

    setup: {
      metric: 'Report creation rate (primary) + pre-committed guardrails',
      baseline: 'Report creation rate: 2.1 reports/user/week. p99 load time: 1,840ms. Error rate: 0.4%.',
      observedResult: 'Report creation rate: +18.3% (p < 0.001). 95% CI: [+13.1%, +23.5%]. p99 load time: 2,390ms (+550ms, p < 0.001). Error rate: 0.6% (+0.2pp, p = 0.031).',
      sampleInfo: 'n = 3,800 users per arm. 21-day test.',
      caveat: 'Pre-committed guardrail thresholds: load time ≤ +200ms, error rate no increase (any degradation blocks ship). Both guardrails are breached.',
    },

    question: 'The PM wants an end-of-day ship decision. What do you recommend?',

    options: [
      {
        id: 'a',
        label: 'Ship it — +18% on the primary metric is large enough to absorb minor performance costs.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Both guardrails were pre-committed as blocking conditions. +550ms on p99 load time (+30% degradation for worst-case users) is not a minor cost — it\'s a significant performance regression in an enterprise B2B product where reliability is a contractual expectation. The error rate increase may seem small, but in enterprise contracts, increased error rates trigger SLA conversations. Pre-committed guardrails exist precisely to prevent this "but the primary is good" override.',
      },
      {
        id: 'b',
        label: 'Do not ship. Both guardrails are breached beyond pre-committed thresholds. The feature needs performance work before it can ship.',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. Guardrail metrics are pre-committed blocking conditions — not observations to weigh against the primary. A +550ms p99 degradation (threshold was +200ms) and a statistically significant error rate increase both breach pre-set limits. The right path: the primary result validates the feature direction, but engineering needs to optimize performance before ship. You can hold the feature alive while fixing the performance issues.',
      },
      {
        id: 'c',
        label: 'Ship to 10% of users and monitor guardrails in production.',
        isCorrect: false,
        level: 'partial',
        feedback: 'Staged rollouts can be useful, but this reasoning bypasses the guardrail decision. If the guardrails are pre-committed blocking conditions, partial rollout doesn\'t change the fact that performance is degraded for those 10%. The correct framing: pre-committed guardrails are not "acceptable for some users."',
      },
      {
        id: 'd',
        label: 'The guardrails might be too strict — let\'s recalibrate the thresholds and re-evaluate.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'Changing guardrail thresholds after seeing the data is not recalibration — it\'s rationalization. Guardrails only have meaning when defined before the experiment. Changing them after a breach because the primary looks good is exactly the behavior guardrails are designed to prevent.',
      },
    ],

    seniorRead: {
      shortAnswer: 'Do not ship. Pre-committed guardrails are blocking conditions, not suggestions. Both are breached.',
      why: 'Guardrails exist to protect the things you\'d regret losing even if the primary metric wins. A +30% p99 load time degradation in an enterprise B2B tool is a significant reliability regression. Enterprise customers often have SLAs and technical buyers who will notice. An increased error rate, even 0.2pp, is a quality signal that compounds over time.\n\nThe feature direction is validated — users create more reports. The business judgment: invest in performance optimization, then ship. The primary result isn\'t going anywhere while engineering fixes the latency. Don\'t let the "win" pressure short-circuit the quality bar you set before the data existed.',
      commonMistake: 'Treating guardrails as suggestions when the primary metric is compelling. "The effect is big enough to absorb some performance cost" — this is exactly the rationalization guardrails prevent. They have no meaning if they can be overridden whenever the primary looks good.',
      interviewPhrase: '"A guardrail breach changes the decision, not just the confidence level. I defined this threshold before the data existed. Both guardrails are breached — I won\'t override that because the primary looks good."',
      connectsTo: ['design', 'review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT07 — Novelty Effect (BETA · Analyst)
  // Trap: early lift fades by week two, team wants to ship on week-1 data
  // ─────────────────────────────────────────────
  {
    id: 'stat07-novelty-effect',
    title: 'The Feature That Peaked on Day One',
    concept: 'novelty-effect',
    difficulty: 'analyst',
    isFree: false,
    linkedConceptIds: ['novelty-effect', 'confidence-interval', 'right-censoring'],
    linkedScenarioIds: ['s04-week-two-drop'],
    linkedDesignIds: [],

    situation: {
      company: 'Pulse Social',
      product: 'Consumer social platform — 4.2M MAU, content engagement focus',
      context: 'The team tested a new "Reactions 2.0" feature — 12 emoji reactions replacing the previous 5. After 7 days, the PM flagged it: "Engagement is through the roof — +22% reaction rate. Let\'s ship before we lose momentum."',
      decisionPressure: 'A competitor launched a similar feature last month. The CEO is asking why we haven\'t shipped yet. The PM wants to call this a win and move fast.',
    },

    setup: {
      metric: 'Reaction rate (reactions per post viewed)',
      baseline: '8.4 reactions per 100 post views',
      observedResult: 'Week 1: Treatment +22.1% (p < 0.001). Week 2 (first 4 days): Treatment +6.8% (p = 0.041).',
      sampleInfo: 'n = 280,000 users per arm. 11 days of data. Week 1: days 1–7. Week 2 partial: days 8–11.',
      caveat: 'Week-over-week treatment effect: Day 1–3: +31%. Day 4–7: +18%. Day 8–11: +7%. Trend is clearly declining. No week-3 data yet.',
    },

    question: 'The PM wants to ship on the week-1 result. How do you respond?',

    options: [
      {
        id: 'a',
        label: 'Ship it — +22% in week 1 is statistically solid and the week-2 result is still positive.',
        isCorrect: false,
        level: 'wrong',
        feedback: 'The week-over-week pattern is the signal, not the aggregate. Day 1–3: +31%. Day 4–7: +18%. Day 8–11: +7%. This is a textbook novelty decay curve. If the trend continues, the week-3 effect could be near zero. Shipping on week-1 aggregate hides the decay pattern. The feature may still be worth shipping, but you need to know whether the effect stabilizes or continues to decline.',
      },
      {
        id: 'b',
        label: '"The week-over-week effect is declining from +31% to +7% in 11 days. This pattern is consistent with novelty, not a durable lift. I\'d run 2–3 more weeks to see where the effect stabilizes before shipping."',
        isCorrect: true,
        level: 'strong',
        feedback: 'Correct. Novelty effects are characterized by decay — users engage more because it\'s new, not because it\'s better. The only way to distinguish novelty from genuine value is time. If the effect stabilizes above baseline, it\'s real. If it continues decaying toward zero, it\'s mostly novelty. For an engagement feature on a consumer social platform, 3–4 weeks is a reasonable runway to see stabilization.',
      },
      {
        id: 'c',
        label: 'Ship but add a monitoring alert if engagement drops below a threshold in the next 30 days.',
        isCorrect: false,
        level: 'partial',
        feedback: 'Post-ship monitoring is good practice, but doesn\'t change the evidentiary problem. If the feature is shipped based on a novelty peak and the effect decays, you\'ve already communicated a win to leadership based on transient engagement. Novelty effects can make features look transformative in week 1 and irrelevant in month 2. Better to know before shipping.',
      },
      {
        id: 'd',
        label: 'Present the week-over-week breakdown to the PM and explain that +22% aggregate likely overstates the steady-state effect, but even a stabilized +5–8% could justify shipping.',
        isCorrect: false,
        level: 'partial',
        feedback: 'Better than the others, but speculative. "+5–8% could justify shipping" is a guess about where the effect stabilizes. You don\'t have that data yet. Run the test long enough to see stabilization, then make the call with real numbers rather than extrapolations.',
      },
    ],

    seniorRead: {
      shortAnswer: 'Novelty effect. The declining week-over-week pattern is the story. Run 2–3 more weeks before deciding.',
      why: 'Novelty effects are ubiquitous in engagement features. Users engage more with anything new — the curiosity behavior is well-documented. The decay pattern here (+31% → +18% → +7% over 11 days) is steep and consistent. The question is whether the effect will stabilize at some positive level or continue to zero.\n\nFor an engagement feature on a social platform, the real question is: does this feature create new behavioral habits, or does it just satisfy curiosity? Habits take weeks to form. Seven-day data is almost always too early for habit-forming features.',
      commonMistake: 'Treating week-1 aggregate as the final effect size for engagement features. The aggregate obscures decay. Always plot treatment effect by cohort week for engagement tests.',
      interviewPhrase: '"For engagement features, I\'d look at the week-over-week treatment effect, not just the aggregate. A decaying pattern is diagnostic of novelty. The real test is: what does the effect look like in week 3 and 4?"',
      connectsTo: ['review'],
    },
  },

  // ─────────────────────────────────────────────
  // STAT08 — Interference / SUTVA (BETA · Senior)
  // Trap: marketplace treatment affects control through shared supply
  // ─────────────────────────────────────────────
  {
    id: 'stat08-sutva-interference',
    title: 'The Experiment That Contaminated Itself',
    concept: 'sutva',
    difficulty: 'senior',
    isFree: false,
    linkedConceptIds: ['sutva', 'randomization-unit', 'unit-of-analysis'],
    linkedScenarioIds: ['s07-two-sided-spill'],
    linkedDesignIds: [],

    situation: {
      company: 'Fareway',
      product: 'Two-sided home services marketplace — connects homeowners (demand) with service providers (supply)',
      context: 'The team tested a new "Instant Book" feature for buyers that eliminates the back-and-forth scheduling step. 50% of buyers got Instant Book. Results: treatment buyers completed 18% more bookings. The team wants to ship.',
      decisionPressure: 'The booking rate improvement is the largest ever seen on the platform. Growth team is eager. CEO is asking if this can be announced at the next all-hands.',
    },

    setup: {
      metric: 'Booking completion rate per buyer (primary)',
      baseline: '34% of initiated conversations ended in a booking',
      observedResult: 'Treatment buyers: 40.1% booking rate (+18%). p < 0.001. 95% CI: [+14%, +22%].',
      sampleInfo: 'n = 22,000 buyers per arm. 21-day test. Buyer-level randomization. Sellers were not randomized — all sellers saw both treatment and control buyers.',
      caveat: 'Average seller utilization in treatment arm during test: 87% (near capacity). In control arm: 71%. Pre-test seller utilization: ~74%.',
    },

    question: 'What\'s your read on this +18% result?',

    options: [
      {
        id: 'a',
        label: '"Strong result — +18% booking rate with tight CI, ship it."',
        isCorrect: false,
        level: 'wrong',
        feedback: 'This experiment has a structural SUTVA violation. Sellers were not randomized — they served both treatment and control buyers simultaneously. Treatment buyers, by booking faster and more often, consumed more of the finite seller supply. Control buyers competed for less available supply. The treatment lifted treatment buyer bookings by pulling supply away from control buyers, not by creating new supply. The 18% lift is partly a within-experiment reallocation effect, not a real platform-level improvement.',
      },
      {
        id: 'b',
        label: '"The SUTVA assumption is violated. Sellers weren\'t randomized and treatment buyers consumed disproportionate seller capacity. The +18% overstates the platform-level effect. The real effect is likely smaller — possibly zero at platform scale."',
        isCorrect: true,
        level: 'staff',
        feedback: 'Correct. This is the marketplace interference problem. In a two-sided marketplace with finite supply, A/B testing on the demand side without separating supply creates spillover. Treatment buyers booked more → seller utilization rose to 87% → fewer time slots available for control buyers. The "improvement" in treatment is partly structural theft from the control group. The experiment cannot measure a true platform-level effect. You need geo-holdout or switchback design for this.',
      },
      {
        id: 'c',
        label: '"The CI is tight and the effect is large. Even if SUTVA is slightly violated, the effect is probably real."',
        isCorrect: false,
        level: 'partial',
        feedback: 'SUTVA violation is not a statistical precision problem — it\'s a design validity problem. A tight CI on a biased estimate is still a biased estimate. The seller utilization data (87% treatment vs 71% control) directly demonstrates supply competition. The magnitude of the bias is unknown; it could range from minor to completely explaining the effect.',
      },
      {
        id: 'd',
        label: '"We should re-run the experiment with seller-level randomization instead of buyer-level."',
        isCorrect: false,
        level: 'partial',
        feedback: 'Closer — you do need a different design. But seller-level randomization alone doesn\'t solve the problem if the platform still has shared supply dynamics. For two-sided marketplaces, geo-holdout (randomize by geography, so supply and demand are isolated together) or switchback design (time-based alternation that lets the system reach equilibrium) are the appropriate approaches.',
      },
    ],

    seniorRead: {
      shortAnswer: 'SUTVA violated. Sellers served both arms, creating supply spillover. The +18% is not a valid platform-level estimate.',
      why: 'The Stable Unit Treatment Value Assumption requires that one unit\'s outcome is unaffected by another unit\'s treatment assignment. In a two-sided marketplace, this almost never holds when only one side is randomized.\n\nHere: treatment buyers booked faster → they consumed more seller capacity → control buyers competed for less capacity → control booking rate was depressed. The "treatment effect" is partly a between-arm supply redistribution, not a net platform gain.\n\nThe seller utilization gap (87% vs 71%) directly quantifies the interference. At platform scale — where all buyers are in treatment — seller utilization would be the same for everyone, and the baseline booking rate for all buyers would be something between the two arms.\n\nFor marketplace experiments, the valid designs are: geo-holdout (randomize by geography so supply/demand are isolated), switchback/time-series design (alternate all buyers between treatment/control in time blocks), or holdout-based Difference-in-Differences.',
      commonMistake: 'Running buyer-side A/B tests in marketplaces and interpreting the result as a platform-level effect. Two-sided markets with shared supply cannot be analyzed with standard user-level A/B.',
      interviewPhrase: '"In a two-sided marketplace, user-level A/B testing on the demand side is structurally compromised if supply isn\'t isolated. Treatment buyers consuming more seller capacity depresses the control. I\'d use geo-holdouts or switchback design instead."',
      connectsTo: ['review'],
    },
  },
];

export const statsModulesById = Object.fromEntries(statsModules.map(m => [m.id, m]));
