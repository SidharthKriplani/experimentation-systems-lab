// Experimentation Systems Lab — Scenario Data Pack
// V1 — 8 Scenarios
// Status: REVIEW DRAFT — do not build UI until scenarios are approved
//
// ─────────────────────────────────────────────
// SCHEMA V2 FIELDS (for 50-scenario scaling)
// Add these to all scenarios in V1.5 pass:
//
//   scenarioFamily: string  — one of 15 scenario families (e.g. "metric_conflict", "srm", "hte_subgroup")
//   tags: string[]          — searchable labels (e.g. ["subgroup analysis", "post-hoc", "Bonferroni"])
//   conceptTags: string[]   — concept filter tags (e.g. ["multiple comparisons", "pre-specification"])
//   nextTestIdeas: string[] — 1-2 concrete follow-up experiment ideas
//   stakeholderSummary: string — 2-3 sentence non-technical summary for PMs / leadership
//
// Examples populated on s01 and s05. Others to be filled in V1.5.
// ─────────────────────────────────────────────

export const scenarios = [

  // ─────────────────────────────────────────────
  // SCENARIO 01 — The Checkout Trap (FREE)
  // Theme: Metric Conflict
  // ─────────────────────────────────────────────
  {
    id: "s01-checkout-trap",
    title: "The Checkout Trap",
    subtitle: "Conversion is up. Revenue math is down. Everyone wants to ship.",
    isFree: true,
    industry: "ecommerce",
    difficulty: "analyst",
    theme: "metric_conflict",

    context: {
      company: "Crestline Home",
      product: "Direct-to-consumer e-commerce storefront (premium home goods, ~$55M ARR)",
      team: "Growth & Conversion team",
      background: `Crestline's checkout flow has had the same upsell widget for three years — a "complete your look" carousel that fires after the user adds an item to cart. The design team has always thought it's friction. The merchandising team has always thought it drives revenue.

Six weeks ago, the Growth team finally got engineering cycles to test removing it. The hypothesis: removing the upsell widget reduces friction, increases checkout completion, and the lost upsell revenue is more than offset by the conversion lift.

The experiment ran for 14 days on 100% of checkout traffic (50/50 split). SRM check came back clean. Today is the readout.`,
      businessPressure: `Q4 starts in 18 days. Head of Growth already drafted a ship announcement and shared it in the #growth Slack channel before the readout. The VP of E-commerce is in today's readout meeting and has made clear she wants a decision today. The engineering PR has been open for 6 weeks and the team wants to merge it.`
    },

    hypothesis: "Removing the upsell widget from the checkout page will reduce friction, increase checkout conversion rate, and result in net-positive revenue impact.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "14 days",
      targetPopulation: "All users who reached the checkout page",
      primaryMetric: "Checkout conversion rate",
      guardrailMetrics: ["Revenue per session", "7-day refund rate"],
      sampleSizeContext: "~42,000 users per arm over 14 days. Powered to detect a 1.5% relative lift on conversion at 80% power."
    },

    metricReadout: [
      {
        metric: "Checkout conversion rate",
        type: "primary",
        direction: "up",
        delta: "+2.3%",
        pValue: 0.028,
        confidenceInterval: "[+0.3%, +4.3%]",
        significant: true,
        note: "Statistically significant. This is the headline number the team is celebrating."
      },
      {
        metric: "Cart abandonment rate",
        type: "secondary",
        direction: "down",
        delta: "-3.1%",
        pValue: 0.031,
        confidenceInterval: "[-5.9%, -0.3%]",
        significant: true,
        note: "Consistent with the conversion lift. Less abandonment at checkout step."
      },
      {
        metric: "Median time to purchase",
        type: "secondary",
        direction: "down",
        delta: "-22 seconds",
        pValue: 0.004,
        confidenceInterval: "[-36s, -8s]",
        significant: true,
        note: "Users are moving through checkout faster without the widget."
      },
      {
        metric: "Revenue per session",
        type: "guardrail",
        direction: "down",
        delta: "-2.8%",
        pValue: 0.041,
        confidenceInterval: "[-5.5%, -0.1%]",
        significant: true,
        note: "GUARDRAIL BREACH. Revenue per session is down — the upsell was contributing more than the team assumed."
      },
      {
        metric: "Average order value",
        type: "secondary",
        direction: "down",
        delta: "-4.1%",
        pValue: 0.019,
        confidenceInterval: "[-7.5%, -0.7%]",
        significant: true,
        note: "AOV dropped significantly. More orders, but each order is worth less."
      },
      {
        metric: "7-day refund rate",
        type: "guardrail",
        direction: "up",
        delta: "+11.2%",
        pValue: 0.038,
        confidenceInterval: "[+0.6%, +21.8%]",
        significant: true,
        note: "GUARDRAIL BREACH. Refund rate jumped. Wide CI — effect is noisy but real. The most alarming number in this readout."
      }
    ],

    warningFlags: [
      {
        id: "wf-revenue-negative",
        label: "Revenue math is negative",
        description: "+2.3% conversion with -4.1% AOV means net revenue per 100 sessions goes down, not up. The headline metric looks good; the business outcome does not.",
        severity: "critical"
      },
      {
        id: "wf-refund-spike",
        label: "Refund spike unexplained",
        description: "An 11.2% increase in 7-day refunds is a significant signal. It may mean that the upsell widget — despite being 'friction' — was helping users buy the right product the first time. Or the cart is now being completed more impulsively.",
        severity: "critical"
      },
      {
        id: "wf-guardrail-breach",
        label: "Both guardrails breached",
        description: "Revenue per session and refund rate were declared guardrails. Both are breached. Guardrail breaches are not negotiable without explicit re-agreement from stakeholders on risk tolerance.",
        severity: "critical"
      },
      {
        id: "wf-refund-window",
        label: "7-day refund window may be too short",
        description: "The experiment ran for 14 days and uses a 7-day refund lookback. The full refund curve may not be visible yet — especially for high-value items with longer decision windows.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it",
        description: "Conversion is up, the result is significant, and Q4 is 18 days away. Ship the widget removal.",
        score: "junior_miss",
        feedback: "Conversion is up, but the revenue math is negative and both guardrails are breached. Shipping here means accepting a known revenue loss and an unexplained refund spike before Q4 — exactly when unit economics matter most. The p<0.05 on conversion doesn't mean the business outcome is positive. It means the conversion effect is unlikely to be noise. The business outcome is clearly negative."
      },
      {
        id: "rollback",
        label: "Roll back",
        description: "The guardrails are breached and the revenue math is negative. Do not ship. Restore the original checkout.",
        score: "analyst_ready",
        feedback: "This is the right call given the data. Both guardrails are breached, revenue per session is down, and the refund spike is unexplained. Rolling back protects the business. The one thing you'd add at a senior level: roll back *and* investigate the refund spike. Understanding *why* refunds went up is a valuable finding — it may tell you something about purchase intent or product-market fit that improves the next iteration."
      },
      {
        id: "extend",
        label: "Extend the test",
        description: "Run the experiment for another 2 weeks to get more certainty on the refund and revenue signals.",
        score: "junior_miss",
        feedback: "More data won't change the math. Revenue per session is already significant at p=0.041. The AOV decline is significant at p=0.019. The refund spike is significant at p=0.038. These aren't noisy signals that need more time — they're real effects that are pointing clearly in the wrong direction. Extending to get 'more certainty' on an already-negative result just delays the decision."
      },
      {
        id: "investigate-refunds",
        label: "Roll back and investigate the refund spike before deciding",
        description: "The refund increase is the most alarming number. Roll back, but make understanding the refund cause the priority before any redesign.",
        score: "senior_ready",
        feedback: "This is the best call. You're not just making the right decision (roll back) — you're identifying the right next question. A +11.2% refund lift is a signal that something is different about the purchase quality in the treatment group. Was the upsell widget helping users buy the right product? Were treatment users purchasing more impulsively? Was the refund window too short to see the full effect? Answering that shapes what the next experiment should test — and possibly surfaces a product quality issue that was already there, just not visible."
      },
      {
        id: "segment-rollout",
        label: "Ship to high-AOV users only",
        description: "Segment the rollout: remove the widget only for users historically likely to complete checkout without upsell assistance.",
        score: "analyst_ready",
        feedback: "This is a reasonable mitigation instinct, but it doesn't answer the refund question. If high-AOV users also show elevated refunds, you've shipped a guardrail breach to your most valuable segment. Before any partial rollout, the refund spike needs to be understood. That said, the segmentation logic here is sound — if the upsell widget is only relevant for hesitant or lower-intent users, removing it for confident purchasers is defensible."
      },
      {
        id: "redesign",
        label: "Redesign: keep widget but test a less intrusive version",
        description: "The original hypothesis (friction → bad) may have been too simple. Test a redesigned widget that's less disruptive but still surfaces upsell options.",
        score: "senior_ready",
        feedback: "Good instinct, and probably the right long-term direction. The data suggests the upsell widget was contributing real value (both to AOV and, possibly, to purchase quality / lower refunds) but also creating real friction (lower conversion, longer time-to-purchase). The right answer may not be 'remove it or keep it' — it's 'redesign it.' This decision shows you're reading the data as a product signal, not just a stat."
      }
    ],

    idealDecision: "investigate-refunds",
    secondBestDecision: "rollback",

    juniorMistake: "Ships because checkout conversion is up and p<0.05. Treats the primary metric result as the full story, ignores the revenue math, and dismisses the guardrail breaches as 'things to monitor post-ship.' Often anchored by the business pressure: 'Q4 is coming and we finally got engineering cycles for this.'",

    seniorFlags: [
      "The refund spike is the lead story, not the conversion lift. A +11.2% refund increase on a 14-day experiment using a 7-day refund window means you may not have seen the full refund curve yet — especially for higher-ticket items.",
      "Revenue math: +2.3% conversion * -4.1% AOV = net negative revenue per 100 sessions, even before the refund cost. This is checkable arithmetic, not a judgment call.",
      "Both guardrails were declared upfront for a reason. Breaching both of them is not a 'complicated tradeoff' — it's a clear signal that the hypothesis was wrong."
    ],

    staffFlags: [
      "Would have questioned whether 'checkout conversion rate' is the right primary metric when the business goal is revenue. A more honest primary metric would be 'revenue per checkout session' — which would have made the negative result immediately visible without needing to inspect guardrails.",
      "Would have flagged the 7-day refund window as potentially underpowered for this product category before the experiment launched."
    ],

    debrief: `Okay, let's be honest about what happened here.

The conversion lift is real. Removing friction from checkout does make more people complete the purchase. That part worked exactly as hypothesized. But the team made a classic mistake: they defined success as conversion rate instead of revenue per session, so the moment the primary metric went green, the instinct was 'ship it.'

The refund spike is what I can't get past. +11.2% in 7 days. That's not noise — it's a signal that the quality of purchases in the treatment group is different. My read: the upsell widget, as annoying as it is, was doing something useful. It was slowing users down at a moment when they were considering their purchase. When you remove it, some of those users complete the checkout more impulsively — and then return the item.

So the real question isn't 'did we reduce friction?' The answer is yes. The real question is 'was that friction valuable?' And the refund data says: for some of it, yes.

The right call here is roll back and investigate. Not extend, not ship-with-monitoring, not segment-and-hope. Roll back and actually understand why refunds went up before you touch this flow again. That investigation will probably tell you more about your customers' purchase psychology than six months of iteration would.

One more thing: both guardrails were breached. When you declare guardrails and they breach, you don't get to negotiate them away in the readout meeting because the primary metric looked good. If the stakeholders want to re-evaluate the guardrail thresholds, that's a separate conversation — but it can't happen retroactively to justify a ship decision.`,

    interviewTakeaway: "A significant primary metric result does not mean a positive business outcome — always do the revenue math and take guardrail breaches seriously as hard stops, not soft signals.",

    relatedConcepts: ["guardrail metric", "metric conflict", "revenue per session", "refund rate", "SRM", "statistical significance"],

    // V2 scaling fields (example)
    scenarioFamily: "metric_conflict",
    tags: ["guardrail breach", "revenue math", "refund analysis", "checkout", "ecommerce"],
    conceptTags: ["guardrail metric", "metric conflict", "statistical significance", "revenue per session"],
    nextTestIdeas: [
      "Test a redesigned upsell widget that is less visually intrusive but still surfaces relevant recommendations — targeting the friction without removing the upsell value.",
      "Investigate the refund spike: analyze browsing and purchase patterns for treatment users who refunded vs. those who didn't, to understand whether impulsive checkout completion is the mechanism."
    ],
    stakeholderSummary: "The checkout widget removal increased conversion but reduced revenue and triggered a significant refund spike. Both pre-declared guardrails were breached. The right call is to roll back and investigate why refunds increased before any redesign is deployed."
  },

  // ─────────────────────────────────────────────
  // SCENARIO 02 — The Ghost Assignment (FREE)
  // Theme: SRM Failure
  // ─────────────────────────────────────────────
  {
    id: "s02-ghost-assignment",
    title: "The Ghost Assignment",
    subtitle: "The results look great. The assignment ratio doesn't.",
    isFree: true,
    industry: "saas",
    difficulty: "analyst",
    theme: "srm",

    context: {
      company: "Stackflow",
      product: "B2B project management SaaS (~8,000 active accounts, Series C)",
      team: "Product / Onboarding team",
      background: `Stackflow's onboarding completion rate has been a known problem for two years. New signups are assigned a static product tour — five modal popups that fire sequentially on first login. Internal data shows 61% of users close the tour before completing it. The onboarding PM has been advocating for an interactive tooltip-based tour for 18 months.

After two quarters of prioritization battles, engineering shipped the new experience. The experiment went live 21 days ago: 50/50 split, all new signups. The primary metric is 7-day feature adoption (defined as using 3+ core features within the first week).

Today is the readout. The PM sent a Slack message at 7am: "Numbers look incredible. Let's get this into the sprint for the merge."`,
      businessPressure: `The onboarding PM has been fighting for this for 18 months. This is visibly their project. The Head of Product is in the readout meeting and has already told the engineering team to be 'ready to move fast.' The PR has been sitting open for three weeks.`
    },

    hypothesis: "An interactive, tooltip-based onboarding tour will increase 7-day feature adoption compared to the existing static modal tour, by guiding users to key features in context rather than interrupting their workflow.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50 (intended)",
      runtime: "21 days",
      targetPopulation: "All new signups",
      primaryMetric: "7-day feature adoption (3+ core features used within 7 days of signup)",
      guardrailMetrics: ["Support ticket rate (first 7 days)", "Trial-to-paid conversion (30-day, incomplete)"],
      sampleSizeContext: "~2,400 new signups over 21 days. Powered to detect a 5% relative lift in adoption at 80% power."
    },

    metricReadout: [
      {
        metric: "7-day feature adoption",
        type: "primary",
        direction: "up",
        delta: "+18.3%",
        pValue: 0.008,
        confidenceInterval: "[+5.1%, +31.5%]",
        significant: true,
        note: "Very strong lift. This is the metric that has the team excited."
      },
      {
        metric: "Median time to first value action",
        type: "secondary",
        direction: "down",
        delta: "-31%",
        pValue: 0.003,
        confidenceInterval: "[-47%, -15%]",
        significant: true,
        note: "Treatment users reach their first meaningful action significantly faster."
      },
      {
        metric: "Onboarding completion rate",
        type: "secondary",
        direction: "up",
        delta: "+29.4%",
        pValue: 0.001,
        confidenceInterval: "[+18.2%, +40.6%]",
        significant: true,
        note: "Users are completing the new tour at much higher rates."
      },
      {
        metric: "7-day support ticket rate",
        type: "guardrail",
        direction: "down",
        delta: "-8.2%",
        pValue: 0.041,
        confidenceInterval: "[-16.1%, -0.3%]",
        significant: true,
        note: "Fewer support tickets in the first week. Consistent with better onboarding."
      },
      {
        metric: "30-day trial-to-paid conversion",
        type: "guardrail",
        direction: "up",
        delta: "+5.1%",
        pValue: 0.19,
        confidenceInterval: "[-2.5%, +12.7%]",
        significant: false,
        note: "Not significant and incomplete — only 21 days of data in a 30-day window."
      },
      {
        metric: "SRM check (assignment ratio)",
        type: "diagnostic",
        direction: "up",
        delta: "Treatment: 62.4% / Control: 37.6% (expected 50/50)",
        pValue: 0.0001,
        confidenceInterval: null,
        significant: true,
        note: "⚠️ SAMPLE RATIO MISMATCH. Assignment is significantly skewed. This invalidates the experiment."
      }
    ],

    warningFlags: [
      {
        id: "wf-srm",
        label: "SRM: 62/38 assignment split",
        description: "The experiment was configured for 50/50 but assignment landed at 62.4% treatment / 37.6% control. A chi-squared test on the assignment counts is highly significant (p=0.0001). This is not random variation — something went wrong in assignment logic.",
        severity: "critical"
      },
      {
        id: "wf-srm-bias",
        label: "SRM can cause directional bias",
        description: "SRM doesn't just add noise — it can create directional bias if the users who were incorrectly assigned to one group share a systematic characteristic (e.g., device type, account tier, sign-up source). You cannot tell which direction the bias runs without investigation.",
        severity: "critical"
      },
      {
        id: "wf-conversion-incomplete",
        label: "Primary conversion metric is incomplete",
        description: "Trial-to-paid conversion uses a 30-day window. The experiment is only 21 days old. The business outcome metric hasn't been observed yet.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it",
        description: "Three metrics are strongly significant and directionally consistent. The SRM may be a logging issue. The result is too strong to ignore.",
        score: "junior_miss",
        feedback: "This is the most common mistake on SRM scenarios. The reasoning sounds logical: 'the results are so strong, even if there's some SRM noise, the direction must be right.' But SRM doesn't just add noise — it can introduce systematic bias. If the extra 12% of users who landed in treatment share a characteristic (e.g., they came from a specific marketing channel, or they're on mobile, or they signed up on a specific day), the treatment group is no longer a random sample of new users. You're not measuring the effect of the onboarding tour — you're measuring the onboarding tour plus whatever is different about those users."
      },
      {
        id: "pause-investigate",
        label: "Pause and investigate the SRM before making any decision",
        description: "The assignment ratio is broken. No decision — ship or rollback — is valid until you know why.",
        score: "senior_ready",
        feedback: "This is the right call, and it's also the harder call to make in a room where the PM has been waiting 18 months and the Head of Product is present. But an SRM this large (62/38 on a 50/50 experiment) almost always has a root cause — client-side rendering that fires inconsistently, a bot or automated signup scraper inflating one arm, a logging bug, or an SDK version difference. Until you find it, the results are not trustworthy. The investigation also protects the team: if you ship and the result doesn't hold, you'll want to have caught the SRM rather than explaining why you ignored it."
      },
      {
        id: "rollback",
        label: "Roll back; the experiment is invalid",
        description: "SRM invalidates the results. Roll back, fix the assignment logic, and re-run.",
        score: "analyst_ready",
        feedback: "Correct diagnosis. The experiment is invalid and should not be shipped based on its current results. The only thing 'pause and investigate' adds over a clean rollback is understanding *why* the SRM happened before re-running — which matters because if the cause was a product behavior (e.g., a specific user segment not getting assigned correctly), it will recur in the re-run if not fixed."
      },
      {
        id: "ship-ignore-srm",
        label: "Note the SRM in the writeup, ship anyway",
        description: "Document the SRM as a known limitation and ship based on the strength of the other signals.",
        score: "junior_miss",
        feedback: "Documenting a known flaw and shipping anyway is not a risk mitigation — it's a paper trail for a bad decision. SRM is not a 'known limitation' in the same way that a short runtime or low power might be. It means the experiment's randomization was compromised. Noting it doesn't fix it."
      },
      {
        id: "rerun",
        label: "Re-run the experiment with correct assignment logic",
        description: "Discard this experiment. Fix whatever caused the SRM and run a clean 50/50 experiment.",
        score: "analyst_ready",
        feedback: "Correct — this is the right next step after investigating the SRM cause. The one missing piece: you should investigate the SRM before re-running, not just re-run and hope it doesn't happen again. If the cause was a client-side rendering issue with a specific browser, that needs to be fixed first. If it was a bot traffic problem, your assignment pipeline needs to filter that."
      },
      {
        id: "extend",
        label: "Extend the experiment to 42 days",
        description: "More data may stabilize the assignment ratio and give cleaner results.",
        score: "junior_miss",
        feedback: "SRM doesn't resolve itself with more data. The skewed assignment is a structural problem in the experiment's randomization logic — it will continue to produce biased results regardless of how long the experiment runs."
      }
    ],

    idealDecision: "pause-investigate",
    secondBestDecision: "rollback",

    juniorMistake: "Ships because the primary metric lift is +18.3% (p=0.008) and reasons that 'the effect is too strong to be explained by SRM alone.' Misunderstands SRM as a noise problem rather than a bias problem. Often anchored by social pressure in the room — the PM has been waiting 18 months, the results look amazing, and calling it invalid feels like being the person who kills good news.",

    seniorFlags: [
      "SRM at 62/38 on a 50/50 experiment is not marginal — it's a 24-percentage-point deviation. This almost certainly has a root cause beyond random variation. Most likely candidates: client-side JS rendering the treatment inconsistently, a cookie/session boundary issue causing users to be re-assigned, or a bot/scraper inflating one arm.",
      "The +18.3% adoption lift has a very wide confidence interval: [+5.1%, +31.5%]. Even if the result were trustworthy, the true effect could be closer to +5% than +18%. The SRM makes the estimate even less reliable.",
      "30-day trial-to-paid is the metric that actually matters for this business. It's incomplete and non-significant. Shipping on 7-day adoption while the conversion metric is still open is premature even without the SRM."
    ],

    staffFlags: [
      "SRM checks should be run at Day 3 and Day 7 of any experiment, not just at readout. If this SRM was present at Day 3, 18 days of bad data were collected unnecessarily.",
      "Would have included a pre-experiment SRM check in the experiment spec: verify assignment counts daily during the first 48 hours of rollout as a go/no-go gate before the experiment continues running."
    ],

    debrief: `I've been in this room. The PM who's been fighting for this for 18 months. The Head of Product looking expectant. The PR sitting open. And then someone points at the SRM number and the energy drains out of the meeting.

Here's the thing though: the SRM is doing you a favor.

If you ship on this result and it doesn't hold — and with a 62/38 assignment split, there's a real chance it doesn't — you're going to spend the next six months trying to explain why the new onboarding that showed +18% in the experiment is showing +3% in production. That conversation is much harder than this one.

The SRM means you don't actually know what the effect of the new onboarding tour is. You know that something is different between the two groups, but you don't know if it's the onboarding tour or the systematic characteristic that caused the skewed assignment. Those are two completely different things.

What I'd do: investigate the SRM root cause first. In my experience, the most common causes at a B2B SaaS company are (1) a client-side rendering issue where the new tooltip JS doesn't fire for certain browser/session combinations and those users silently fall into the wrong arm, (2) a signup source effect where users from a specific channel are being routed differently, or (3) a bot/crawler inflating new signup counts. Once you find it, fix it, re-run clean, and you'll have an actual answer.

The onboarding work is good. The experiment just needs to be run correctly before you ship.`,

    interviewTakeaway: "SRM invalidates an experiment's causal inference regardless of how strong the metric results look — it signals compromised randomization, not just added noise, and must be investigated before any ship decision.",

    relatedConcepts: ["SRM", "sample ratio mismatch", "randomization", "selection bias", "chi-squared test", "assignment pipeline"],

    // V2 scaling fields
    scenarioFamily: "srm",
    tags: ["SRM", "assignment bias", "onboarding", "B2B SaaS", "invalid experiment"],
    conceptTags: ["sample ratio mismatch", "randomization", "selection bias", "chi-squared test"],
    stakeholderSummary: "The onboarding experiment produced impressive-looking results, but the assignment was severely skewed — 62% of users ended up in the treatment group instead of the intended 50%. This breaks the experiment's causal logic: the treatment and control groups are no longer comparable. No ship or rollback decision is valid until we understand what went wrong in the assignment and fix it.",
    nextTestIdeas: [
      "Re-run the experiment with a daily SRM monitoring check built into the experiment pipeline — if assignment deviates by more than 2% from the intended split at 48 hours, pause automatically and investigate before accumulating more bad data.",
      "Before re-running, instrument the new onboarding flow with explicit assignment logging at the client-side render event, not just the server-side assignment event, to catch the most common SRM cause: JS rendering inconsistency across browser and session types.",
      "Design a parallel experiment focused solely on the 30-day trial-to-paid conversion metric — the business outcome metric that was still incomplete when this experiment was paused — using the fixed assignment pipeline."
    ],
    keyTakeaways: [
      "SRM at 62/38 on a 50/50 experiment is not noise — a 24-percentage-point deviation almost always has a concrete root cause such as client-side rendering inconsistency, bot traffic inflating one arm, or a cookie/session boundary that re-assigns users.",
      "SRM introduces directional bias, not just variance: if the extra users who silently landed in treatment share a systematic characteristic (device type, marketing channel, account tier), the treatment group is no longer a random sample and the measured effect is confounded.",
      "A +18.3% adoption lift with a CI of [+5.1%, +31.5%] is extremely wide — even if the experiment were clean, the true effect could be closer to +5% than +18%, and SRM makes that estimate even less trustworthy.",
      "The 30-day trial-to-paid conversion metric was incomplete (only 21 of 30 days observed) and non-significant — the metric that actually matters for a B2B SaaS business had not yet been observed when momentum for a ship decision was building.",
      "SRM checks should be run at Day 3 and Day 7, not only at readout — running a broken experiment for 18 additional days after a detectable SRM was already present wastes data and organizational attention."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 03 — The Slow Tax (FREE)
  // Theme: Guardrail Breach
  // ─────────────────────────────────────────────
  {
    id: "s03-slow-tax",
    title: "The Slow Tax",
    subtitle: "Retention is up. Your slowest users are paying the performance cost.",
    isFree: true,
    industry: "consumer",
    difficulty: "analyst",
    theme: "guardrail",

    context: {
      company: "Driftline",
      product: "Consumer content app (guided meditation + sleep content, ~3.2M MAU, subscription)",
      team: "Personalization team",
      background: `Driftline's content recommendation algorithm has been rule-based since launch: it surfaces the most-listened content in a user's chosen category. The Personalization team has spent two quarters building a collaborative filtering model that learns from listening behavior across the user base.

The experiment has been running for 18 days: 50/50 split across all logged-in users on iOS and Android. The new algorithm runs server-side but returns recommendations that require fetching more metadata per item — the implementation is heavier than the old rule-based system.

Retention is the north star metric. The team declared page load time (p75) as a guardrail, set at a maximum of +200ms increase.`,
      businessPressure: `The Personalization team has been building this model for two quarters. The engineering lead on the project says the load time issue is "definitely fixable in the next sprint — we know exactly what's causing it." Product leadership has been presenting the retention improvement to the board as evidence that the personalization investment is paying off.`
    },

    hypothesis: "A collaborative filtering recommendation model will increase 7-day retention by surfacing more relevant content, compared to the current rule-based algorithm.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "18 days",
      targetPopulation: "All logged-in users (iOS and Android)",
      primaryMetric: "7-day retention",
      guardrailMetrics: ["p75 page load time (guardrail threshold: +200ms max increase)", "App store crash rate"],
      sampleSizeContext: "~180,000 users per arm. Well-powered for the primary metric. Load time guardrail was set conservatively given the model's known compute overhead."
    },

    metricReadout: [
      {
        metric: "7-day retention",
        type: "primary",
        direction: "up",
        delta: "+3.2%",
        pValue: 0.021,
        confidenceInterval: "[+0.5%, +5.9%]",
        significant: true,
        note: "Significant retention lift. Real effect."
      },
      {
        metric: "Daily sessions per user",
        type: "secondary",
        direction: "up",
        delta: "+4.1%",
        pValue: 0.018,
        confidenceInterval: "[+0.7%, +7.5%]",
        significant: true,
        note: "Users are returning more frequently. Consistent with the retention lift."
      },
      {
        metric: "Time in app per session",
        type: "secondary",
        direction: "up",
        delta: "+12.3%",
        pValue: 0.004,
        confidenceInterval: "[+4.0%, +20.6%]",
        significant: true,
        note: "Sessions are longer. Users are engaging more with recommended content."
      },
      {
        metric: "p75 page load time",
        type: "guardrail",
        direction: "up",
        delta: "+820ms",
        pValue: 0.0001,
        confidenceInterval: "[+690ms, +950ms]",
        significant: true,
        note: "GUARDRAIL BREACH. Threshold was +200ms. Actual impact is +820ms — 4x the guardrail. Tight CI means this is a reliable estimate."
      },
      {
        metric: "p50 page load time",
        type: "secondary",
        direction: "up",
        delta: "+210ms",
        pValue: 0.003,
        confidenceInterval: "[+75ms, +345ms]",
        significant: true,
        note: "The median user also sees a meaningful load time increase, but p75 tells the more important story."
      },
      {
        metric: "App store crash rate",
        type: "guardrail",
        direction: "up",
        delta: "+0.3%",
        pValue: 0.41,
        confidenceInterval: "[-0.4%, +1.0%]",
        significant: false,
        note: "Not significant. Crash rate is clean."
      },
      {
        metric: "Content completion rate (sessions)",
        type: "secondary",
        direction: "up",
        delta: "+5.8%",
        pValue: 0.012,
        confidenceInterval: "[+1.3%, +10.3%]",
        significant: true,
        note: "Users who start a recommended piece are more likely to finish it."
      }
    ],

    warningFlags: [
      {
        id: "wf-guardrail-4x",
        label: "Guardrail breached at 4x threshold",
        description: "The declared guardrail was +200ms on p75 load time. Actual impact is +820ms. This isn't a borderline breach — the actual impact is 4x the acceptable limit.",
        severity: "critical"
      },
      {
        id: "wf-mobile-older-devices",
        label: "Older/budget devices disproportionately affected",
        description: "The p75 measure captures the slowest 25% of users. For a consumer app with broad device distribution, this is disproportionately users on older Android devices and lower-end iPhones — often lower-income users who may already have higher churn risk.",
        severity: "warning"
      },
      {
        id: "wf-load-retention-lag",
        label: "Load time degradation may produce delayed churn",
        description: "18 days may be too short to see the full churn effect of a persistent +820ms load time. Users may tolerate the slowdown in weeks 1-2 and churn in weeks 3-4 when the novelty of better recommendations wears off.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it",
        description: "Retention, sessions, and time in app are all significantly positive. Users are clearly getting value. Performance can be fixed in the next sprint.",
        score: "junior_miss",
        feedback: "This is the 'ship and fix later' trap. The guardrail was declared precisely to prevent this reasoning. If performance is 'fixable in the next sprint,' then fix it first and re-test. Shipping a known guardrail breach with a promise to patch it later creates two problems: (1) 'the next sprint' has a way of becoming 'three months from now' under production pressure, and (2) you've now set a precedent that guardrails can be negotiated away when the primary metric looks good. That precedent will haunt your next experiment."
      },
      {
        id: "do-not-ship-fix-first",
        label: "Do not ship. Fix the performance regression, then re-test.",
        description: "The guardrail was set for a reason. Declare it breached. Fix the model's performance overhead, then re-run.",
        score: "senior_ready",
        feedback: "This is the right call. The guardrail exists to protect the users who would pay the most for the performance degradation — in this case, users on slower devices who are also likely among the most price-sensitive in your subscriber base. The retention win is real and worth pursuing, but not at the cost of +820ms to your slowest users. Fix the implementation, re-run, and you'll likely still see the retention lift without the performance penalty."
      },
      {
        id: "ship-modern-devices",
        label: "Ship only to users on modern devices (iPhone 12+, Android flagships)",
        description: "The performance hit is device-dependent. Limit rollout to users where load time impact is minimal.",
        score: "analyst_ready",
        feedback: "This is a reasonable engineering mitigation and shows you're thinking about the population distribution. The concern: you're now running personalization for a subset of your users, which complicates model training (you're serving a biased recommendation set to a segment of users). You're also making an implicit decision to deprioritize the experience of your lower-end device users — which may be fine, but should be explicit. This doesn't absolve you of fixing the performance issue for everyone."
      },
      {
        id: "extend-while-fixing",
        label: "Keep the experiment running while engineering fixes the load time",
        description: "Don't roll back — keep collecting data while the performance fix is developed. Ship after the fix is validated.",
        score: "staff_level",
        feedback: "This is the most operationally elegant solution if it's feasible. You preserve the experiment's randomization integrity, continue accumulating data on the retention signal, and ship only after the guardrail is resolved. The conditions: (1) the fix must be testable in the current experiment arm (not a new deployment that requires a fresh experiment), and (2) you need to be confident the fix doesn't change the recommendation quality in a way that affects the metric. If both are true, this is better than rolling back."
      },
      {
        id: "rollback-redesign",
        label: "Roll back and redesign the model to be less compute-intensive",
        description: "The current implementation is too heavy. Rearchitect the model to reduce metadata fetch overhead before re-testing.",
        score: "analyst_ready",
        feedback: "Correct call to not ship. The 'redesign' framing is right if the performance issue is architectural rather than a fixable implementation bug. Worth discussing with engineering whether this is a 2-day fix or a 2-month redesign — that changes the recommendation significantly."
      }
    ],

    idealDecision: "extend-while-fixing",
    secondBestDecision: "do-not-ship-fix-first",

    juniorMistake: "Ships with a plan to 'fix performance post-launch.' Reasons that the retention improvement is worth the tradeoff and that engineering can patch the load time issue quickly. Discounts the guardrail breach because the primary metric is strong.",

    seniorFlags: [
      "The p75 measure is the right guardrail — but the specific users who are at p75 matter. On a consumer app with broad device distribution, the slowest 25% of load times are concentrated on budget Android devices. These users may be among your most churn-prone — the ones who have the hardest time justifying a subscription renewal.",
      "18 days may not capture the full churn effect of a persistent +820ms degradation. The retention lift could compress or reverse in weeks 3-5 when the novelty of better recommendations wears off but the performance cost persists.",
      "+820ms with a CI of [+690ms, +950ms] is a tight estimate. This is not a noisy signal that more data might move — the load time impact is real and reliably measured."
    ],

    staffFlags: [
      "Would have flagged the performance overhead of the collaborative filtering implementation in the experiment design review before launch. The +820ms p75 cost could have been anticipated with a staging load test.",
      "Would have recommended a smaller holdout (10% treatment) for the first 72 hours specifically to catch guardrail breaches early before full 50/50 rollout."
    ],

    debrief: `The data is telling you something that's actually useful if you read it correctly: the recommendation model works. The retention and engagement signals are real. But the implementation has a cost that's too high for your slowest users, and the guardrail was set exactly to catch this.

Here's my issue with 'ship and fix later': engineering says the fix is one sprint away, and I believe them. But after you ship, that sprint gets reprioritized. Three months later you're looking at slightly degraded retention numbers and nobody connects it to the +820ms load time that you shipped with. The guardrail exists to prevent that scenario.

The more interesting observation here is about your user base distribution. The p75 metric is telling you that your 75th-percentile user is experiencing 820ms of added latency. On a meditation app where the primary use case is someone in bed at night on whatever phone they have, that's your core use case, not an edge case. Slow performance at the moment someone is trying to relax before sleep is a genuinely bad user experience in a way that matters for retention.

The right path: if the fix is genuinely achievable, keep the experiment running while engineering patches the overhead. Don't roll back — preserve your randomized groups. Fix the implementation, validate that load time is back within guardrail, then ship. If the fix is more complex than one sprint, roll back, fix it properly, and re-run. Either way, the model is worth keeping — just not in this form.`,

    interviewTakeaway: "Guardrail breaches require resolution before shipping, not post-ship fixes — and the 'we'll fix it later' promise is one of the most common ways technically correct short-term decisions become product quality problems.",

    relatedConcepts: ["guardrail metric", "p75 latency", "performance regression", "device distribution", "holdout rollout"],

    // V2 scaling fields
    scenarioFamily: "guardrail",
    tags: ["guardrail breach", "performance regression", "personalization", "consumer app", "p75 latency"],
    conceptTags: ["guardrail metric", "p75 latency", "performance regression", "device distribution"],
    stakeholderSummary: "The new recommendation algorithm genuinely improves retention and engagement — but it comes with an 820ms load time increase for the slowest 25% of users, which is four times our declared limit. On a consumer app, the slowest users are disproportionately on budget devices and already have higher churn risk. The algorithm is worth pursuing, but not in its current form — performance must be fixed before any rollout.",
    nextTestIdeas: [
      "Keep the experiment running and have engineering deploy a targeted performance fix within the current treatment arm — validate that p75 load time returns within the +200ms guardrail before proceeding to a ship decision, preserving randomization continuity.",
      "Run a device-stratified analysis on the retention lift: separate the treatment effect for users on budget Android devices (where the +820ms load time is concentrated) from users on high-end devices — this will show whether the retention signal is coming from users who also pay the performance cost.",
      "After fixing the load time issue, extend the experiment to 35 days to assess whether the retention benefit persists or decays as the novelty of better recommendations wears off for longer-tenure users."
    ],
    keyTakeaways: [
      "A guardrail threshold of +200ms was declared before the experiment launched; an actual impact of +820ms is not a borderline case requiring judgment — it is a clear, 4x breach that requires resolution before any ship decision.",
      "The p75 load time metric is the right guardrail for a consumer app, but the specific users at p75 matter: on a broad consumer device distribution, the slowest 25% of sessions are concentrated on older Android devices, often belonging to price-sensitive subscribers who are more likely to cancel than users on flagship hardware.",
      "18 days may be too short to see the full churn effect of a persistent +820ms degradation — users often tolerate performance slowdowns in weeks 1-2 and churn in weeks 3-5 when the novelty of better content wears off but the latency cost remains.",
      "The 'ship and fix later' promise has a predictable failure mode: after launch, the performance patch gets deprioritized by production realities, and six months later a retention degradation signal appears with no clear causal link to the unresolved load time regression.",
      "The most operationally sound path — keeping the experiment running while engineering deploys a targeted fix — preserves both the randomization integrity and the data continuity, avoiding a full restart while still honoring the guardrail."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 04 — The Week-Two Drop (FREE)
  // Theme: Novelty Effect / Peeking
  // ─────────────────────────────────────────────
  {
    id: "s04-week-two-drop",
    title: "The Week-Two Drop",
    subtitle: "The CEO called it a win on Day 5. You have the Day 14 data.",
    isFree: true,
    industry: "consumer",
    difficulty: "analyst",
    theme: "novelty_peeking",

    context: {
      company: "Meridian",
      product: "Personal task management app (productivity, ~520K MAU, freemium)",
      team: "Growth / Engagement team",
      background: `Meridian added a streak system: users who complete at least 3 tasks per day build a "streak." The streak counter is visible on the home screen. After 7 days, a streak badge unlocks. After 30 days, a streak reward (premium feature access for 2 weeks) unlocks. The system also sends a push notification at 8pm if the user hasn't completed 3 tasks yet that day.

The experiment launched 14 days ago: 50/50 split on all active users (users who had logged in at least once in the past 30 days).

On Day 5, the PM pulled a preliminary read and shared it with the exec team in the weekly business review. The CEO mentioned it as a "clear product win" to the board. On Day 10, you noticed the week-2 trend and flagged it internally. Today is Day 14 — the pre-planned readout.`,
      businessPressure: `The CEO has already described this as a win externally. The PM is asking you to "explain the week-2 numbers" rather than revisit the ship decision. There's pressure to find a framing that supports shipping. The streak feature is already being discussed as a headline for the next app store update.`
    },

    hypothesis: "A daily streak system with push notification reminders will increase daily task completion rates and 30-day retention by creating habitual usage patterns.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "14 days (pre-planned)",
      targetPopulation: "Active users (logged in within past 30 days)",
      primaryMetric: "Daily active use rate (3+ tasks completed / day)",
      guardrailMetrics: ["Push notification opt-out rate", "7-day uninstall rate"],
      sampleSizeContext: "~68,000 users per arm. Powered to detect a 3% relative lift on daily active use at 80% power."
    },

    metricReadout: [
      {
        metric: "Daily active use — Week 1 (Days 1–7)",
        type: "secondary",
        direction: "up",
        delta: "+14.2%",
        pValue: 0.009,
        confidenceInterval: "[+3.7%, +24.7%]",
        significant: true,
        note: "Strong week-1 signal. This is the number that was shared on Day 5."
      },
      {
        metric: "Daily active use — Week 2 (Days 8–14)",
        type: "secondary",
        direction: "up",
        delta: "+2.1%",
        pValue: 0.31,
        confidenceInterval: "[-2.0%, +6.2%]",
        significant: false,
        note: "Non-significant in week 2. The lift has nearly fully reverted."
      },
      {
        metric: "Daily active use — Full 14 days",
        type: "primary",
        direction: "up",
        delta: "+6.8%",
        pValue: 0.08,
        confidenceInterval: "[-0.9%, +14.5%]",
        significant: false,
        note: "Not significant over the full pre-planned window. The primary metric did not meet its threshold."
      },
      {
        metric: "14-day retention",
        type: "secondary",
        direction: "up",
        delta: "+1.2%",
        pValue: 0.38,
        confidenceInterval: "[-1.5%, +3.9%]",
        significant: false,
        note: "Not significant. No evidence of a retention benefit over 14 days."
      },
      {
        metric: "Push notification opt-out rate",
        type: "guardrail",
        direction: "up",
        delta: "+22.3%",
        pValue: 0.001,
        confidenceInterval: "[+9.1%, +35.5%]",
        significant: true,
        note: "GUARDRAIL BREACH. A significant increase in users opting out of push notifications in the treatment group."
      },
      {
        metric: "7-day uninstall rate",
        type: "guardrail",
        direction: "up",
        delta: "+1.8%",
        pValue: 0.14,
        confidenceInterval: "[-0.6%, +4.2%]",
        significant: false,
        note: "Not significant, but directionally concerning. Worth monitoring."
      }
    ],

    warningFlags: [
      {
        id: "wf-peeking",
        label: "Peeking: decision was pre-announced on Day 5",
        description: "The PM shared week-1 results (Day 5 of a 14-day experiment) with the exec team and the CEO announced it externally. This is peeking — making or signaling a decision before the experiment's pre-planned endpoint. It doesn't invalidate the data, but it creates organizational pressure to ignore the Day 14 result.",
        severity: "critical"
      },
      {
        id: "wf-novelty-pattern",
        label: "Classic novelty effect pattern",
        description: "Week 1: +14.2% (p=0.009). Week 2: +2.1% (p=0.31). This week-over-week decay pattern is textbook novelty effect — users engage with a new feature initially, then return to baseline as the novelty wears off.",
        severity: "critical"
      },
      {
        id: "wf-notification-optout",
        label: "Notification opt-out is a leading churn signal",
        description: "A +22.3% increase in notification opt-outs is a strong negative signal. Users are being annoyed by the streak notifications, not motivated by them. High opt-out rates predict future disengagement and are hard to reverse.",
        severity: "critical"
      },
      {
        id: "wf-primary-not-significant",
        label: "Pre-planned primary metric is not significant",
        description: "The experiment was designed and powered to measure 14-day daily active use. That metric is not significant (p=0.08). Reporting the week-1 sub-period result as the headline is selective reporting.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship-week1-data",
        label: "Ship it — use the week-1 data as the signal",
        description: "The week-1 engagement lift was real. Week 2 may stabilize once users form a habit. The 14-day window may not be long enough to capture habit formation.",
        score: "junior_miss",
        feedback: "This is post-hoc rationalization. The experiment was pre-planned for 14 days — not 7 days — for exactly this reason: to see beyond the initial novelty period. Using the week-1 sub-period as the primary result is selective reporting. You had a pre-planned endpoint, a pre-planned metric, and a non-significant result at that endpoint. The week-1 number is a data point within the experiment, not the experiment's conclusion."
      },
      {
        id: "rollback-null",
        label: "Call it a null result — do not ship",
        description: "The 14-day primary metric is not significant. The week-2 regression suggests novelty effect. Roll back.",
        score: "analyst_ready",
        feedback: "This is the statistically correct call. The pre-planned primary metric over the pre-planned window is not significant. Calling it a null result is honest and protects the team from shipping something that may produce long-term churn. The one thing you'd add at a senior level: the notification opt-out signal deserves a separate investigation — it suggests the streak notification cadence is creating friction, not motivation."
      },
      {
        id: "extend-28-days",
        label: "Extend to 28 days to see if habit forms",
        description: "Habit formation may take longer than 14 days. Extend the experiment to give the streak system more time to drive sustainable engagement.",
        score: "analyst_ready",
        feedback: "Defensible — habit formation research does suggest 21-28 days is a more realistic window for new behavioral patterns. The concern is the notification opt-out rate: if +22% of treatment users are already opting out of notifications, an extension may make the guardrail breach worse and provide no more information about sustainable engagement. The honest question before extending: is the feature still working if notifications are turned off? Because a significant fraction of your treatment group is about to find out."
      },
      {
        id: "rollback-redesign-notification",
        label: "Call it a null result, but redesign the notification logic before re-testing",
        description: "The core streak concept may be sound, but the 8pm notification is creating friction. Redesign the notification cadence and re-test.",
        score: "senior_ready",
        feedback: "This reads the data correctly at two levels: the primary metric is null, and the notification design is actively damaging. A +22.3% opt-out rate suggests the 8pm daily notification is more annoyance than motivation. The right move: don't ship the current design, but treat the notification opt-out finding as a product signal. A less aggressive notification strategy (weekly encouragement vs. daily pressure) might achieve the engagement goal without the friction cost."
      },
      {
        id: "ship-monitor",
        label: "Ship with 30-day monitoring — declare provisional success",
        description: "The directional signal is positive. Ship with intensive post-ship monitoring and a 30-day rollback trigger if engagement reverts.",
        score: "junior_miss",
        feedback: "Post-ship monitoring cannot recover the statistical integrity of a pre-planned experiment that returned a non-significant result. 'Declare provisional success' on a p=0.08 primary metric is not how statistics works. And the notification opt-out rate means you'd be shipping a guardrail breach with a plan to watch it get worse."
      }
    ],

    idealDecision: "rollback-redesign-notification",
    secondBestDecision: "rollback-null",

    juniorMistake: "Ships based on the week-1 data, citing 'early positive signal' and 'habit formation takes time.' Often framed as 'we already told the CEO this is a win, we can't reverse that now.' Completely ignores the notification opt-out rate because it wasn't the primary metric.",

    seniorFlags: [
      "The notification opt-out rate (+22.3%, p=0.001) is the most actionable finding in this readout, and nobody is talking about it. That's what happens when teams organize their analysis around the primary metric and treat guardrails as an afterthought.",
      "The week-1 / week-2 decay pattern is the clearest novelty effect signature in the data. A 14.2% → 2.1% drop over two weeks is not 'habit formation in progress' — it's the new feature smell wearing off.",
      "The peeking issue on Day 5 is a process failure, not just a statistical one. The PM sharing preliminary results with the CEO before the experiment ended created organizational lock-in that made the correct Day-14 decision politically harder. That's a real cost of peeking beyond the statistical one."
    ],

    staffFlags: [
      "Would have flagged 14 days as likely too short for a habit formation experiment at experiment design time. Streak mechanics research consistently shows 21-28 day minimums for measuring sustainable behavior change.",
      "Would have separated the notification mechanism from the streak visual/gamification in the experiment design — two separate variables, two separate tests. This experiment can't tell you whether the streak concept failed or the notification strategy failed."
    ],

    debrief: `Let me be direct about what happened before I get to the data: peeking is a process failure that creates real organizational costs. When the PM shares week-1 numbers in the exec meeting before the experiment ended and the CEO announces it externally, you've made it politically costly to report the actual 14-day result honestly. That's a genuine harm, separate from the statistical issues.

Now the data.

The primary metric over the pre-planned 14-day window is p=0.08. Not significant. The week-1 / week-2 pattern — +14.2% then +2.1% — is as clean a novelty effect signature as I've seen. Users engaged with the streak in week 1 because it was new. By week 2, it was furniture.

But the number I'd be most concerned about is the notification opt-out rate: +22.3%. That's not a rounding error. That's more than one in five treatment users actively removing the streak notification from their phone. That's a direct signal that the 8pm "you haven't completed your tasks yet" push is creating resentment, not motivation. And once users opt out of notifications, they're much harder to re-engage.

So the data is actually telling you something useful: the streak concept might work, but this implementation is wrong. The notification cadence is too aggressive. An experiment that separates the visual streak gamification from the push notification pressure would give you a cleaner read on which part of the design is driving (or destroying) engagement.

Don't ship this. But don't throw away the concept — there's a real signal worth chasing here, just with a more user-respecting notification design.`,

    interviewTakeaway: "Pre-planned primary metrics at pre-planned endpoints are the only valid basis for a ship decision — week-over-week sub-period analysis is exploratory at best, and a +22% notification opt-out rate is a stronger product signal than the primary metric result.",

    relatedConcepts: ["novelty effect", "peeking", "pre-planned analysis", "notification opt-out", "habit formation", "guardrail metric"],

    // V2 scaling fields
    scenarioFamily: "novelty_peeking",
    tags: ["novelty effect", "peeking", "streak mechanics", "push notifications", "habit formation", "consumer app"],
    conceptTags: ["novelty effect", "peeking", "pre-planned analysis", "notification opt-out", "guardrail metric"],
    stakeholderSummary: "The streak feature produced an exciting week-1 result, but by week 2 the lift had nearly fully reverted — a textbook novelty effect. The pre-planned 14-day primary metric is not significant. More importantly, more than one in five users in the treatment group turned off push notifications, which is a direct signal that the daily reminder is creating resentment, not motivation. The right call is to not ship this design, but the streak concept itself is worth retesting with a less aggressive notification cadence.",
    nextTestIdeas: [
      "Redesign the notification strategy: test a weekly streak summary notification ('You're on a 5-day streak — keep it going') instead of a daily 8pm pressure reminder, and pre-specify a 28-day experiment window to capture sustainable habit formation rather than novelty-driven week-1 spikes.",
      "Run a separate experiment isolating the visual streak gamification (counter + badge on home screen) from the push notification mechanism — this experiment conflated both variables, making it impossible to know whether the streak concept failed or the notification design failed.",
      "Extend the primary metric observation window to 30 days for the next iteration and add 30-day notification opt-out rate as a co-equal guardrail alongside uninstall rate, treating a +10% opt-out rate as a hard stop regardless of engagement metrics."
    ],
    keyTakeaways: [
      "The week-1 / week-2 decay pattern (+14.2% then +2.1%) is a clean novelty effect signature — users engaged with the streak feature because it was new, not because it changed their behavior, and the 14-day experiment endpoint was designed to see past exactly this initial spike.",
      "Peeking — sharing preliminary results before the experiment endpoint — doesn't just introduce statistical risk; it creates organizational lock-in that makes the correct Day-14 decision politically costly, which is a real and underappreciated harm of early readouts.",
      "A +22.3% notification opt-out rate is the most actionable finding in this readout: once users disable notifications, re-engagement becomes much harder, and this signal predicts long-term churn better than any week-1 engagement metric.",
      "The primary metric over the pre-planned 14-day window (p=0.08) is not significant regardless of what the week-1 sub-period showed — reporting the sub-period result as the headline is selective reporting, not a reasonable adjustment for a slow-forming behavior.",
      "This experiment conflated two testable mechanisms (streak gamification vs. daily notification pressure) in a single treatment, making it impossible to diagnose which component drove the opt-out spike — good experiment design would have separated them."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 05 — The Mobile Winners (PAID)
  // Theme: Heterogeneous Treatment Effect
  // ─────────────────────────────────────────────
  {
    id: "s05-mobile-winners",
    title: "The Mobile Winners",
    subtitle: "Null overall. Strong mobile signal. Was it pre-specified?",
    isFree: false,
    industry: "fintech",
    difficulty: "senior",
    theme: "hte",

    context: {
      company: "Trestle Pay",
      product: "Consumer payments app (P2P transfers, bill splitting, ~2.1M users)",
      team: "Product / Core Payments team",
      background: `Trestle Pay's transaction confirmation screen has always been minimal: amount, recipient, timestamp, a green checkmark. The Product team hypothesized that adding contextual information — merchant category icon, a one-line spending insight ("You've spent $340 at restaurants this month"), and a quick-access button to the transaction history — would increase repeat transaction rates by reducing the friction of reviewing past payments.

The experiment ran for 21 days: 50/50 split across all users who completed at least one transaction during the experiment window. SRM check is clean.

The experiment brief, written 3 weeks ago, listed "repeat transaction rate (7-day)" as the primary metric with no pre-specified subgroup analysis.`,
      businessPressure: `The PM for Core Payments sees the mobile subgroup result before the readout and sends a Slack: "Okay this is clearly a mobile win. Can we just ship to mobile now? Desktop is a small fraction of our users anyway." The VP of Product is in the readout meeting.`
    },

    hypothesis: "Adding contextual spending information to the transaction confirmation screen will increase 7-day repeat transaction rates by making the post-transaction experience more informative and reducing the need to navigate to transaction history.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "21 days",
      targetPopulation: "Users who completed at least one transaction during experiment window (~310,000 users per arm)",
      primaryMetric: "Repeat transaction rate (7-day): completed 2+ transactions within 7 days of any transaction",
      guardrailMetrics: ["Transaction dispute rate (7-day)", "App crash rate on confirmation screen"],
      sampleSizeContext: "Powered to detect a 2% relative lift overall at 80% power. No pre-specified subgroup power calculation was done."
    },

    metricReadout: [
      {
        metric: "Repeat transaction rate — Overall",
        type: "primary",
        direction: "up",
        delta: "+0.8%",
        pValue: 0.31,
        confidenceInterval: "[-0.8%, +2.4%]",
        significant: false,
        note: "Not significant. Null result on the primary metric."
      },
      {
        metric: "Repeat transaction rate — Mobile users",
        type: "secondary",
        direction: "up",
        delta: "+9.2%",
        pValue: 0.018,
        confidenceInterval: "[+1.6%, +16.8%]",
        significant: true,
        note: "Strong mobile subgroup signal. Wide CI — true effect could range from modest to large."
      },
      {
        metric: "Repeat transaction rate — Desktop/web users",
        type: "secondary",
        direction: "down",
        delta: "-4.1%",
        pValue: 0.09,
        confidenceInterval: "[-8.9%, +0.7%]",
        significant: false,
        note: "Directionally negative on desktop, not significant. Desktop is ~18% of active users."
      },
      {
        metric: "Repeat transaction rate — New users (<30 days)",
        type: "secondary",
        direction: "up",
        delta: "+11.4%",
        pValue: 0.014,
        confidenceInterval: "[+2.3%, +20.5%]",
        significant: true,
        note: "Strong signal among newer users. Also post-hoc."
      },
      {
        metric: "Repeat transaction rate — Returning users (>30 days)",
        type: "secondary",
        direction: "down",
        delta: "-1.8%",
        pValue: 0.44,
        confidenceInterval: "[-6.3%, +2.7%]",
        significant: false,
        note: "Flat among returning users."
      },
      {
        metric: "Transaction dispute rate",
        type: "guardrail",
        direction: "up",
        delta: "+0.3%",
        pValue: 0.52,
        confidenceInterval: "[-0.6%, +1.2%]",
        significant: false,
        note: "Clean. No dispute rate impact."
      },
      {
        metric: "Confirmation screen crash rate",
        type: "guardrail",
        direction: "flat",
        delta: "0.0%",
        pValue: 0.99,
        confidenceInterval: null,
        significant: false,
        note: "Clean."
      }
    ],

    warningFlags: [
      {
        id: "wf-posthoc-subgroup",
        label: "Subgroup analysis was not pre-specified",
        description: "The experiment brief listed only the overall primary metric. The mobile and new-user subgroups were identified after seeing the data — classic post-hoc analysis. Post-hoc subgroup findings have a high false discovery rate.",
        severity: "critical"
      },
      {
        id: "wf-multiple-comparisons",
        label: "Multiple comparisons: 4 subgroups tested",
        description: "Mobile, desktop, new users, returning users — that's 4 subgroup tests run on the same data. At α=0.05, you'd expect 1 false positive per 20 tests. With 4 tests and no correction, the threshold for 'significance' should be closer to p=0.0125 (Bonferroni), which the mobile result (p=0.018) does not meet.",
        severity: "critical"
      },
      {
        id: "wf-wide-ci-mobile",
        label: "Wide CI on mobile effect",
        description: "The mobile CI is [+1.6%, +16.8%]. The true effect could be +2% (modest) or +17% (large). The point estimate of +9.2% is imprecise. This uncertainty matters for a targeting decision.",
        severity: "warning"
      },
      {
        id: "wf-desktop-negative",
        label: "Desktop signal is directionally negative",
        description: "The desktop subgroup shows -4.1% (p=0.09). Not significant, but the direction is worth noting: the new confirmation screen may be working differently on larger screens, possibly because the layout doesn't adapt well or because desktop users have different mental models.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship-overall",
        label: "Ship the new confirmation screen to all users",
        description: "The guardrails are clean and the directional signal across multiple subgroups is positive. Ship and monitor.",
        score: "junior_miss",
        feedback: "The overall result is not significant (p=0.31). Shipping on a non-significant primary metric because subgroups 'look positive' is not a valid decision framework. You're shipping based on noise, not signal."
      },
      {
        id: "ship-mobile-posthoc",
        label: "Ship to mobile users based on the mobile subgroup result",
        description: "Mobile is the clear win. Ship to mobile only. Desktop is small and the desktop signal is negative anyway.",
        score: "junior_miss",
        feedback: "This is the most tempting wrong answer. The mobile result came from a post-hoc subgroup that wasn't powered for this analysis, wasn't pre-specified, and doesn't survive multiple-comparison correction. Shipping a feature to 80% of your user base based on a post-hoc subgroup result that wouldn't survive Bonferroni correction is statistically unjustifiable — and it sets a precedent for subgroup fishing across your experimentation program."
      },
      {
        id: "null-no-followup",
        label: "Declare a null result. Do not ship.",
        description: "The primary metric is not significant. Treat the subgroup findings as noise and move on.",
        score: "analyst_ready",
        feedback: "Correct on the primary metric interpretation. The caution: calling the subgroup findings 'noise' and moving on misses something. The mobile/new-user pattern is strong enough to be worth a confirmatory test. Treating all post-hoc subgroup findings as noise is as problematic as treating all of them as confirmed effects. The right move is to treat them as hypotheses and test them properly — not to ignore them."
      },
      {
        id: "null-confirmatory-mobile",
        label: "Declare overall null. Run a confirmatory experiment targeting mobile users and new users, with the subgroup as the pre-specified population.",
        description: "The overall result is null. But the mobile/new-user pattern is strong enough to justify a follow-up experiment with these segments as the pre-specified primary population.",
        score: "senior_ready",
        feedback: "This is the right call. You're correctly calling the primary metric null, correctly treating the subgroup as exploratory (not confirmed), and correctly identifying the path forward: a pre-specified confirmatory test where mobile users are the stated primary population, powered appropriately for that subgroup. If the mobile effect replicates in a confirmatory experiment, you have a real finding. Until then, it's a hypothesis."
      },
      {
        id: "bonferroni-correction",
        label: "Apply Bonferroni correction to the subgroup tests. Note that the mobile result (p=0.018) does not survive correction at α=0.0125. Declare null across all analyses.",
        description: "With 4 subgroup tests, the corrected threshold is p=0.0125. Mobile (p=0.018) and new users (p=0.014) do not survive. Declare null.",
        score: "staff_level",
        feedback: "Technically rigorous and statistically correct. With four subgroup tests, Bonferroni sets the corrected threshold at α/4 = 0.0125. Both the mobile result (p=0.018) and the new-user result (p=0.014) fail that threshold — neither survives correction. The post-hoc nature of the analysis means the correction isn't just procedural; it's addressing a genuine search-pattern problem. In practice, the 'null-confirmatory-mobile' decision reaches the same conclusion and is slightly more actionable because it names the right follow-up experiment."
      }
    ],

    idealDecision: "null-confirmatory-mobile",
    secondBestDecision: "bonferroni-correction",

    juniorMistake: "Ships to mobile because 'the mobile numbers are strong and it's a targeted rollout, so what's the risk?' The risk is that post-hoc subgroup findings have a high false discovery rate, and systematically shipping on them trains the organization to fish for significant subgroups rather than design experiments with clear pre-specified hypotheses.",

    seniorFlags: [
      "The mobile CI [+1.6%, +16.8%] is wide. Even if the effect is real, you don't know if it's +2% or +17%. Powering a confirmatory mobile experiment correctly requires taking this uncertainty seriously.",
      "The new-user / returning-user pattern may be the more theoretically coherent finding: the spending context information is more valuable to users who are still learning the app than to experienced users who already know their transaction patterns. That's a testable hypothesis worth designing around.",
      "Desktop at -4.1% (p=0.09) is worth watching. If a confirmatory mobile experiment is launched, consider explicitly excluding desktop users or running a separate desktop-specific design."
    ],

    staffFlags: [
      "The absence of subgroup pre-specification in the experiment brief is a process gap, not just a statistical problem. At a mature experimentation organization, subgroups of interest are declared in the experiment design before data is collected — with power calculations for each. This experiment brief should have been returned for revision.",
      "The mobile vs. desktop difference may be a rendering/UX issue, not a genuine heterogeneous treatment effect. The confirmation screen layout may look different on mobile vs. desktop. That's worth investigating before attributing the difference to user behavior."
    ],

    debrief: `The PM's Slack message — "can we just ship to mobile now?" — is the exact situation this product was built to practice.

Here's the honest read: the overall experiment is null. The pre-planned primary metric over the pre-planned window did not reach significance. That's the answer the experiment was designed to produce, and it produced it.

The mobile subgroup result is interesting but untrustworthy as a ship signal. Why? Three reasons. First, it wasn't pre-specified — you found it by looking at the data after you saw the overall result, which means you already knew the overall was null when you went looking for the subgroup. That search pattern produces false positives. Second, it doesn't survive Bonferroni correction. With four subgroup tests at α=0.05, you're running a ~19% chance of at least one false positive. The mobile result at p=0.018 doesn't clear the corrected threshold. Third, the CI is [+1.6%, +16.8%] — wide enough that you don't actually know what effect you'd be shipping.

That said: the mobile/new-user pattern is coherent. Newer users who are still learning their spending patterns might genuinely benefit from the contextual information in a way that experienced users don't need. That's a real hypothesis worth testing.

The right move: declare this experiment null, write up the mobile/new-user finding as an exploratory observation in the experiment writeup, and design a confirmatory experiment with mobile new users as the pre-specified primary population. Power it for the lower end of the mobile CI — say +3% — so you're not deceiving yourself with an optimistic effect size assumption.

If the effect replicates, you have a real finding and a confident ship decision. If it doesn't, you've saved yourself from a decision that would have been hard to undo.`,

    interviewTakeaway: "Post-hoc subgroup findings from a null experiment are hypotheses, not conclusions — they require confirmatory pre-specified experiments before informing a ship decision, and they should be evaluated against multiple-comparison-corrected thresholds.",

    relatedConcepts: ["heterogeneous treatment effect", "subgroup analysis", "post-hoc analysis", "Bonferroni correction", "multiple comparisons", "pre-specification", "confirmatory vs exploratory"],

    // V2 scaling fields (example)
    scenarioFamily: "hte_subgroup",
    tags: ["subgroup analysis", "post-hoc", "mobile vs desktop", "Bonferroni", "confirmatory experiment", "fintech"],
    conceptTags: ["heterogeneous treatment effect", "multiple comparisons", "pre-specification", "post-hoc analysis"],
    nextTestIdeas: [
      "Run a confirmatory experiment targeting mobile users only as the pre-specified primary population, powered for the lower bound of the mobile CI (use +3% relative lift as the effect size assumption, not the +9.2% point estimate).",
      "Investigate the desktop direction separately: determine whether the -4.1% is a rendering/layout issue or a genuine behavioral difference before any mobile-only rollout."
    ],
    stakeholderSummary: "The overall experiment was null. A mobile subgroup looked promising but was identified post-hoc, wasn't powered for this analysis, and doesn't survive multiple-comparison correction. The right next step is a confirmatory experiment with mobile users as the pre-declared population — not a ship decision based on the exploratory finding."
  },

  // ─────────────────────────────────────────────
  // SCENARIO 06 — The Five Metrics Problem (PAID)
  // Theme: Multiple Testing
  // ─────────────────────────────────────────────
  {
    id: "s06-five-metrics-problem",
    title: "The Five Metrics Problem",
    subtitle: "Two of five metrics are significant. Is that a win?",
    isFree: false,
    industry: "saas",
    difficulty: "senior",
    theme: "multiple_testing",

    context: {
      company: "Formstack Analytics",
      product: "B2B analytics and reporting SaaS (~$22M ARR, growth-stage)",
      team: "Growth / Marketing site team",
      background: `Formstack's pricing page is widely blamed internally for lost revenue. The current page has three pricing tiers displayed as a feature matrix with 47 rows. The design is dense, the CTAs are unclear, and there's no social proof. A contractor redesigned it with: cleaner tier cards, a 5-feature comparison (not 47), prominent customer logos, and a single CTA per tier.

The experiment was written up three weeks ago. The experiment brief lists five metrics as "primary metrics" — the Head of Marketing insisted all five be declared primary because "they're all important to us." The experiment has been running for 21 days.

This morning, the VP of Marketing sent a Slack to #growth: "Big win on pricing page. Trial starts and demo requests both up. Let's ship this week."`,
      businessPressure: `The VP of Marketing has announced the result company-wide. The contractor who built the redesign is waiting for a reference. Sales leadership is asking when the new page goes live. The experiment has been running for 3 weeks and "everyone is tired of waiting."`
    },

    hypothesis: "A redesigned pricing page with cleaner tier presentation, reduced feature comparison complexity, and social proof will increase top-of-funnel conversion (trial starts and demo requests) and downstream paid conversion.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "21 days",
      targetPopulation: "All pricing page visitors",
      primaryMetric: "Five co-equal primary metrics declared in experiment brief (see readout)",
      guardrailMetrics: ["None formally declared"],
      sampleSizeContext: "~8,400 visitors per arm over 21 days. Powered to detect a 10% relative lift on trial starts at 80% power. No power calculation was done for the other four metrics."
    },

    metricReadout: [
      {
        metric: "Trial starts",
        type: "primary",
        direction: "up",
        delta: "+4.2%",
        pValue: 0.041,
        confidenceInterval: "[+0.2%, +8.2%]",
        significant: true,
        note: "Significant at p<0.05. CI lower bound is +0.2% — borderline."
      },
      {
        metric: "Demo requests",
        type: "primary",
        direction: "up",
        delta: "+7.1%",
        pValue: 0.031,
        confidenceInterval: "[+0.6%, +13.6%]",
        significant: true,
        note: "Significant at p<0.05. Wide CI."
      },
      {
        metric: "Bounce rate",
        type: "primary",
        direction: "down",
        delta: "-2.1%",
        pValue: 0.19,
        confidenceInterval: "[-5.2%, +1.0%]",
        significant: false,
        note: "Not significant."
      },
      {
        metric: "Session duration on pricing page",
        type: "primary",
        direction: "up",
        delta: "+11 seconds",
        pValue: 0.07,
        confidenceInterval: "[-1s, +23s]",
        significant: false,
        note: "Not significant."
      },
      {
        metric: "30-day paid conversion",
        type: "primary",
        direction: "up",
        delta: "+1.8%",
        pValue: 0.38,
        confidenceInterval: "[-2.2%, +5.8%]",
        significant: false,
        note: "Not significant AND incomplete — 21 days of data in a 30-day conversion window. The cohort that entered the experiment on Day 1 has not yet fully converted."
      }
    ],

    warningFlags: [
      {
        id: "wf-five-primaries",
        label: "Five co-equal primary metrics: fishing license",
        description: "Declaring five metrics as equally primary is equivalent to running five simultaneous hypothesis tests at α=0.05. With no pre-specified primary metric, no hierarchy, and no correction plan, any subset of significant results is uninterpretable — you have no principled way to distinguish signal from noise after the fact.",
        severity: "critical"
      },
      {
        id: "wf-bonferroni-fails",
        label: "Neither result survives multiple-comparison correction",
        description: "Bonferroni correction: α=0.01 per test (0.05/5). Trial starts (p=0.041) and demo requests (p=0.031) both fail. Even under less conservative Benjamini-Hochberg FDR correction at 5%, neither result survives.",
        severity: "critical"
      },
      {
        id: "wf-conversion-incomplete",
        label: "The only metric that matters is incomplete",
        description: "30-day paid conversion is the metric this business actually cares about — it directly measures revenue impact. It's incomplete (21 of 30 days observed), not significant, and has a wide CI. Any ship decision made today is made without knowing the answer to the most important question.",
        severity: "critical"
      },
      {
        id: "wf-borderline-ci",
        label: "Trial starts CI nearly crosses zero",
        description: "CI for trial starts is [+0.2%, +8.2%]. The lower bound is barely positive. This is a fragile result — a few hundred visitors could shift this to non-significant.",
        severity: "warning"
      },
      {
        id: "wf-no-guardrails",
        label: "No guardrail metrics declared",
        description: "The experiment had no declared guardrails. For a pricing page test, reasonable guardrails would include: paid conversion rate (ironic given it's now a 'primary'), time on site (could go down if the simplified page is too thin), or direct sales team contact rate.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship-two-significant",
        label: "Ship it — two significant metrics is a clear win",
        description: "Trial starts and demo requests are both up and significant. The page redesign is working.",
        score: "junior_miss",
        feedback: "Two out of five metrics reaching p<0.05 is not a win when no primary metric was pre-specified and no multiple-comparison correction plan was in place. With five co-equal primaries and no hierarchy, you have no principled basis for treating trial starts and demo requests as the signal and ignoring the other three — that selection happened post-hoc, after seeing the data. Both 'significant' results are borderline: trial starts (p=0.041) barely clears the uncorrected threshold, and neither survives Bonferroni correction (adjusted α=0.01 per test). The metric that actually translates to revenue — 30-day paid conversion — is incomplete and non-significant. There is no rigorous ship case here."
      },
      {
        id: "wait-for-conversion",
        label: "Wait 9 more days for the 30-day paid conversion metric to complete, then decide",
        description: "The most important metric is incomplete. Extend by 9 days and use paid conversion as the actual decision criterion.",
        score: "senior_ready",
        feedback: "This is the most commercially sound call. 30-day paid conversion is the metric that actually tells you whether the redesign is working for the business. Waiting 9 more days to see a complete readout on the metric you actually care about is more valuable than shipping 9 days earlier on incomplete and statistically questionable signals. If paid conversion comes back significant after 30 days, you have a real result to ship on. If it's still non-significant, you have your answer."
      },
      {
        id: "declare-inconclusive",
        label: "Declare the experiment inconclusive — the multiple testing problem invalidates the current results",
        description: "Five primary metrics with no correction means the significant results are untrustworthy. Declare inconclusive and re-run with a single primary metric.",
        score: "analyst_ready",
        feedback: "Statistically correct. The multiple testing problem is real and the significant results don't survive correction. The one thing missing: this doesn't give the team a path forward. What's the single primary metric for the re-run? What's the correct runtime? Pairing this with a concrete re-run proposal moves from a diagnosis to an actionable recommendation."
      },
      {
        id: "rerun-single-primary",
        label: "Declare inconclusive. Re-run with 30-day paid conversion as the sole primary metric, properly powered.",
        description: "The experiment was under-powered for the right metric and over-counted on the wrong ones. Re-run cleanly.",
        score: "senior_ready",
        feedback: "Correct and actionable. This names the right metric (paid conversion, not top-of-funnel proxies), acknowledges the experiment design error, and proposes a path forward. The political challenge: explaining to the VP of Marketing that the results they announced company-wide are statistically inconclusive. That conversation is uncomfortable but necessary."
      },
      {
        id: "benjamini-hochberg",
        label: "Apply Benjamini-Hochberg FDR correction across all five metrics. Report corrected results.",
        description: "BH is more appropriate than Bonferroni for this setting. Under BH at 5% FDR, neither significant result survives. Declare null.",
        score: "staff_level",
        feedback: "Correct statistical choice — BH controls the false discovery rate and is less conservative than Bonferroni while still appropriate for this setting. Under BH with 5 tests, the critical thresholds are p=0.01, p=0.02, p=0.03, p=0.04, p=0.05 (rank-ordered). The two significant results rank at p=0.031 and p=0.041 — the BH-adjusted thresholds for ranks 2 and 1 are p=0.02 and p=0.01. Neither survives. This is the most statistically nuanced call and the most defensible in a technical review."
      }
    ],

    idealDecision: "wait-for-conversion",
    secondBestDecision: "rerun-single-primary",

    juniorMistake: "Ships because 'we saw positive signals on the top-of-funnel metrics' and 'the page clearly performs better.' Does not recognize that two out of five p<0.05 results with no correction plan and no pre-specified primary metric is not a trustworthy signal — both results are borderline, neither survives correction, and the only revenue metric is incomplete.",

    seniorFlags: [
      "The experiment brief should never have been approved with five co-equal primary metrics. Someone — ideally the analyst — should have pushed back at spec time: 'What is the one metric this experiment needs to move for us to call it a success?'",
      "30-day paid conversion is the only metric that translates directly to business value. The fact that it's incomplete and non-significant at Day 21 is the most important data point in this readout, and it's being ignored.",
      "The trial starts CI [+0.2%, +8.2%] has a lower bound of essentially zero. This is a fragile result that a modestly different traffic mix could flip. Even if we set aside the multiple testing issue, this result would not give me high confidence."
    ],

    staffFlags: [
      "Would have rejected the five-primary-metric experiment brief before it launched. The conversation would be: 'If trial starts go up but paid conversion goes down, do we ship? If demo requests go up but trial starts don't move, do we ship? You can't answer either question without a hierarchy.' The answer to that question determines what the actual primary metric is.",
      "No declared guardrails on a pricing page experiment is a significant process gap. At minimum, paid conversion should have been a guardrail (floor: do not harm) if it wasn't going to be the primary metric."
    ],

    debrief: `This is one of the most common ways experimentation programs go wrong at growth-stage companies: the "we care about all of these metrics" instinct leads to experiments with five primary metrics and no statistical discipline. The VP of Marketing is excited, the Slack message is sent, and now it's your job to explain why "two significant results" is not a win.

Here's what they need to understand: this experiment had five co-equal primary metrics, no pre-specified hierarchy, and no correction plan. When you run five simultaneous tests at α=0.05 without any of those guardrails, two significant results is not a clean signal — you have no principled way to distinguish real effects from false positives. The two results that 'won' were selected post-hoc from a menu of five, after seeing the data. Neither survives Bonferroni correction. That's not evidence. That's noise with a p-value attached.

The thing I keep coming back to is the 30-day paid conversion metric. That's the number that tells you whether the redesign actually helps or hurts the business. It's at Day 21 of a 30-day window, not significant, and has a CI that includes meaningful negative effects. The entire experiment was declared a win before the only metric that matters was fully observed.

My recommendation in this specific situation: wait 9 days for the paid conversion metric to complete. That's the honest path. If paid conversion comes back significant, you have a clean result and a strong ship case. If it doesn't, you have your answer and you have to have the harder conversation — but you'd rather have it now than after shipping a redesign that turns out to be neutral or negative on revenue.

Longer term: the experiment brief process needs to require a single primary metric and a pre-registered analysis plan. "All of these metrics are important to us" is a business statement, not an experiment design.`,

    interviewTakeaway: "Declaring multiple co-equal primary metrics is equivalent to running multiple simultaneous tests with uncorrected alpha — two out of five significant results at p<0.05 is statistically consistent with no true effect, and the metric that matters most (downstream conversion) should drive the decision.",

    relatedConcepts: ["multiple testing", "Bonferroni correction", "Benjamini-Hochberg", "false discovery rate", "experiment brief", "primary metric selection", "family-wise error rate"],

    // V2 scaling fields
    scenarioFamily: "multiple_testing",
    tags: ["multiple testing", "Bonferroni", "Benjamini-Hochberg", "pricing page", "B2B SaaS", "experiment brief"],
    conceptTags: ["multiple testing", "false discovery rate", "primary metric selection", "family-wise error rate"],
    stakeholderSummary: "The pricing page redesign showed two significant metrics out of five, but this isn't a win — with five simultaneous tests and no correction plan, finding two significant results at p<0.05 is consistent with random noise. Neither result survives standard multiple-comparison correction. The metric that actually measures revenue impact — 30-day paid conversion — is still incomplete and shows no signal. The right call is to wait 9 more days for the conversion metric to complete before making any decision.",
    nextTestIdeas: [
      "Wait 9 days for 30-day paid conversion to complete, then re-evaluate with paid conversion as the sole primary metric — if it is significant, you have a clean ship decision; if not, you have a clear null result to communicate to stakeholders.",
      "Re-run a future pricing page experiment with a single pre-declared primary metric (30-day paid conversion), a properly powered sample size for that metric specifically, and trial starts demoted to a secondary metric that informs interpretation but does not drive the decision.",
      "Introduce a formal experiment brief review process that requires any experiment with more than one primary metric to explicitly answer: 'If metric A goes up but metric B goes down, do we ship?' — the inability to answer that question reveals that only one metric is truly primary."
    ],
    keyTakeaways: [
      "Declaring five co-equal primary metrics with no hierarchy and no correction plan is mathematically equivalent to running five simultaneous tests at α=0.05 — under the null hypothesis, you expect 0.25 false positives per experiment, making two out of five 'significant' results plausible as noise.",
      "Under Bonferroni correction (α=0.01 per test for 5 tests), both significant results fail — trial starts (p=0.041) and demo requests (p=0.031) both miss the corrected threshold, and Benjamini-Hochberg FDR correction reaches the same conclusion.",
      "The trial starts confidence interval [+0.2%, +8.2%] has a lower bound barely above zero — a result this fragile means a modestly different traffic composition over the same period could flip this to non-significant, regardless of multiple testing concerns.",
      "30-day paid conversion is the only metric in this readout that directly measures whether the redesign generates revenue; making a ship decision at Day 21 of a 30-day window on that metric means deciding without the answer to the question that actually matters.",
      "The 'experiment everything' instinct and the 'all our metrics are important' instinct are both healthy; they go wrong only when they are conflated — a single experiment can track many metrics, but it must have one pre-declared primary that determines the ship decision before any data is collected."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 07 — The Two-Sided Spill (PAID)
  // Theme: Marketplace Interference / SUTVA Violation
  // ─────────────────────────────────────────────
  {
    id: "s07-two-sided-spill",
    title: "The Two-Sided Spill",
    subtitle: "Treatment riders improved. Control riders got worse. The supply was shared.",
    isFree: false,
    industry: "marketplace",
    difficulty: "staff",
    theme: "network_effects",

    context: {
      company: "Haul",
      product: "On-demand delivery marketplace (~4.2M monthly orders, operates in 38 cities)",
      team: "Marketplace Dynamics / Driver Incentives team",
      background: `Haul has a driver cancellation problem during peak hours (5–9pm weekdays). Under the current incentive structure, drivers receive surge multipliers during peak hours — but the multipliers have become unpredictable, leading drivers to strategically delay acceptance while waiting for higher surges. This results in elevated cancellation rates and poor customer experience at exactly the wrong time.

The Marketplace Dynamics team designed a new incentive structure: a fixed "reliability bonus" (higher guaranteed base pay during peak hours) plus a lower, more predictable surge multiplier. The hypothesis is that more predictable earnings reduce strategic delay behavior and lower cancellations.

The experiment ran for 28 days in 6 cities. Riders in those cities were split 50/50 at the order level: treatment orders carried the new reliability bonus incentive (higher guaranteed base pay, lower surge multiplier), while control orders carried the old surge-based incentive. The same pool of drivers operated across both order types — drivers saw both treatment and control orders in their queue simultaneously. Because treatment orders offered more predictable, higher guaranteed pay, drivers preferentially accepted treatment orders when given the choice. The result: treatment riders received faster, more reliable service. Control riders — drawing from the same driver supply — were systematically underserved. Supply was shared. The benefit was not.`,
      businessPressure: `The Operations team is very excited about the treatment rider result. They want to present this to the board as evidence that the incentive redesign works. The experiment cost real money — the fixed reliability bonus was funded by reducing the surge multiplier pool, and the Operations budget took a $180K hit during the 28-day run. Leadership wants to see a return on that.`
    },

    hypothesis: "A fixed reliability bonus with a lower, predictable surge multiplier will reduce driver strategic cancellation behavior during peak hours, improving peak-hour delivery reliability for riders.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50 order-level (treatment orders carry new reliability bonus; control orders carry old surge incentive; driver pool is shared across both order types)",
      runtime: "28 days, 6 cities",
      targetPopulation: "Riders placing orders during peak hours (5–9pm weekdays) in 6 test cities",
      primaryMetric: "Peak-hour rider cancellation rate",
      guardrailMetrics: ["Driver acceptance rate", "Delivery completion time (p75)"],
      sampleSizeContext: "~95,000 peak-hour orders per arm across 6 cities and 28 days. Well-powered for a 3% relative change in cancellation rate."
    },

    metricReadout: [
      {
        metric: "Peak-hour cancellation rate — Treatment riders",
        type: "primary",
        direction: "down",
        delta: "-3.1%",
        pValue: 0.038,
        confidenceInterval: "[-6.0%, -0.2%]",
        significant: true,
        note: "Significant reduction in cancellations for treatment riders. This is the headline result."
      },
      {
        metric: "Peak-hour cancellation rate — Control riders (vs. pre-experiment baseline)",
        type: "diagnostic",
        direction: "up",
        delta: "+4.8% vs. historical baseline",
        pValue: null,
        confidenceInterval: null,
        significant: null,
        note: "Control riders experienced WORSE cancellation rates than historical pre-experiment baseline. This is a critical diagnostic finding."
      },
      {
        metric: "Overall marketplace cancellation rate (vs. historical baseline)",
        type: "diagnostic",
        direction: "up",
        delta: "+1.2% vs. pre-experiment baseline",
        pValue: null,
        confidenceInterval: null,
        significant: null,
        note: "The marketplace as a whole got slightly worse during the experiment — despite treatment riders improving."
      },
      {
        metric: "Driver acceptance rate",
        type: "guardrail",
        direction: "up",
        delta: "+6.2%",
        pValue: 0.021,
        confidenceInterval: "[+0.9%, +11.5%]",
        significant: true,
        note: "Drivers are accepting more orders. Consistent with the incentive hypothesis — more predictable pay, less strategic delay."
      },
      {
        metric: "Delivery completion time (p75)",
        type: "guardrail",
        direction: "down",
        delta: "-2.1 minutes",
        pValue: 0.09,
        confidenceInterval: "[-4.5 min, +0.3 min]",
        significant: false,
        note: "Not significant. Directionally positive."
      },
      {
        metric: "SRM check (rider assignment)",
        type: "diagnostic",
        direction: "flat",
        delta: "50.2% / 49.8%",
        pValue: 0.71,
        confidenceInterval: null,
        significant: false,
        note: "Assignment was clean on the rider side."
      }
    ],

    warningFlags: [
      {
        id: "wf-sutva",
        label: "SUTVA violation: shared driver supply",
        description: "The Stable Unit Treatment Value Assumption (SUTVA) requires that a unit's outcome depends only on its own treatment assignment, not on others'. Here, control and treatment riders share the same driver pool. Because treatment orders offer higher guaranteed pay, drivers preferentially accept them over control orders — leaving fewer drivers available for control riders. The treatment group benefits at the expense of the control group through the same shared supply. The treatment effect is inflated and the control outcome is degraded by the same mechanism.",
        severity: "critical"
      },
      {
        id: "wf-control-degraded",
        label: "Control group degradation confirms interference",
        description: "Control riders got worse than historical baseline (+4.8% cancellation vs. pre-experiment levels). In a clean experiment, the control group should approximate the pre-experiment baseline. The degradation is direct evidence that the treatment leaked into the control group through shared supply.",
        severity: "critical"
      },
      {
        id: "wf-experiment-invalid",
        label: "The experiment cannot produce a valid causal estimate",
        description: "When SUTVA is violated, the measured treatment effect is not the effect of the incentive change — it's the effect of the incentive change plus the spillover. You cannot separate these effects with the current design. The -3.1% result is meaningless as a causal estimate.",
        severity: "critical"
      },
      {
        id: "wf-design-flaw",
        label: "This experiment design was predictably invalid before launch",
        description: "In a marketplace where supply cannot be split, any rider-side experiment that affects driver behavior will violate SUTVA. This should have been caught in design review.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship-treatment-positive",
        label: "Ship to all riders — the treatment group improved and the driver acceptance rate is up",
        description: "Treatment riders saw -3.1% cancellations. Drivers accepted more orders. Ship the new incentive structure.",
        score: "junior_miss",
        feedback: "The treatment rider result is not a valid causal estimate of the incentive change. Because drivers were shared between treatment and control, the treatment group benefited partly at the expense of the control group. The -3.1% improvement for treatment riders is inflated — it includes the effect of having more drivers available (because control riders had fewer). You're not measuring the effect of the incentive; you're measuring the effect of preferential supply access."
      },
      {
        id: "invalid-do-not-ship",
        label: "Do not ship. The experiment is invalid due to supply-side interference.",
        description: "SUTVA is violated. The result cannot be interpreted causally. Do not make any ship decision based on this experiment.",
        score: "senior_ready",
        feedback: "Correct. The experiment cannot produce a valid causal estimate. Shipping on an invalid result would mean deploying a significant incentive redesign (at real cost to the driver incentive budget) based on a statistically meaningless number. The -3.1% could be entirely explained by supply reallocation, not by the incentive change itself."
      },
      {
        id: "geo-holdout",
        label: "Do not ship. Design a geographic holdout experiment — assign entire cities to treatment or control.",
        description: "A clean experiment requires the unit of randomization to be above the unit of interference. Use cities as the unit of randomization.",
        score: "senior_ready",
        feedback: "This is the correct alternative design. By randomizing at the city level (some cities get the new incentive, some don't), you eliminate within-city supply spillover. The tradeoff: you have fewer randomization units (cities, not riders), which means lower statistical power. But it's a valid experiment. Be aware of city-level confounders — size, driver density, demand patterns."
      },
      {
        id: "switchback",
        label: "Do not ship. Design a switchback (time-based) experiment — alternate the incentive structure by time period.",
        description: "Alternate between old and new incentive structures by time period (e.g., odd hours vs. even hours, or alternating weeks) within the same geography.",
        score: "staff_level",
        feedback: "The switchback design is an elegant solution for marketplace experiments where cross-sectional assignment is impossible. By alternating treatment conditions over time in the same market, you control for geographic confounders. The assumption: the treatment effect is not persistent across time periods (carryover). For an incentive structure experiment, carryover is a real risk — drivers may adapt their behavior over time in ways that persist into the next period. Careful carryover analysis is required."
      },
      {
        id: "driver-side-randomization",
        label: "Do not ship. Redesign to randomize on the driver side in a non-overlapping way (e.g., driver cohorts in non-overlapping service zones).",
        description: "If drivers can be assigned to non-overlapping geographic zones, SUTVA holds at the zone level.",
        score: "staff_level",
        feedback: "Valid design approach if geographic zone separation is practically feasible and service zones don't overlap. In practice, driver supply is highly fluid in most marketplace cities — drivers cross zone boundaries constantly, making true non-overlap difficult to enforce. This design works better in theory than execution for most marketplace contexts."
      }
    ],

    idealDecision: "geo-holdout",
    secondBestDecision: "invalid-do-not-ship",

    juniorMistake: "Ships because the treatment group improved and the driver acceptance rate went up. Does not notice the control group degradation vs. historical baseline. Does not recognize SUTVA or the concept of supply-side interference.",

    seniorFlags: [
      "The control group degradation vs. historical baseline (+4.8% cancellation) is the key diagnostic signal. In a valid experiment, control should approximate historical baseline. When it doesn't, it means the treatment is leaking — in this case, through shared driver supply.",
      "The overall marketplace cancellation rate went up vs. baseline (+1.2%), even while treatment riders improved. This is only possible if the improvement for treatment riders came at the cost of control riders. The incentive change may have zero net effect on the marketplace — you've redistributed cancellations, not reduced them.",
      "The driver acceptance rate improvement (+6.2%) is probably the most trustworthy finding in this readout, because it measures a driver-level outcome that isn't contaminated by which riders they serve. It's consistent with the hypothesis that more predictable pay reduces strategic delay."
    ],

    staffFlags: [
      "This experiment design should have been caught before launch. Any analyst with marketplace experimentation experience knows that you cannot run rider-side experiments when the treatment affects driver behavior — you've introduced interference by design.",
      "The right question at design review: 'What is the unit of interference for this treatment?' If the answer is 'drivers, who are shared,' the unit of randomization needs to be at or above the driver level — which means city-level or driver-zone-level randomization.",
      "The driver acceptance rate finding (+6.2%, p=0.021) is worth preserving: it's a valid measurement of driver behavioral response to the incentive change. A geo-holdout experiment would be designed specifically to measure whether this behavioral change translates to marketplace-level cancellation reduction."
    ],

    debrief: `This is the kind of experiment that looks right on the surface and is completely broken underneath.

The logic sounds airtight: riders in treatment saw fewer cancellations, drivers accepted more orders, let's ship. But look at the control group. Control riders experienced +4.8% more cancellations versus the pre-experiment baseline. In a valid experiment, the control group should approximate the world without the treatment — it should look like your historical baseline. When it doesn't, something is wrong.

What went wrong is SUTVA — the Stable Unit Treatment Value Assumption. It's the foundational assumption underlying any causal inference from a randomized experiment: the outcome for unit A depends only on A's treatment, not on B's. In a two-sided marketplace with a shared driver pool, that assumption is violated by construction the moment you run a rider-side experiment that affects how drivers behave.

Here's what actually happened: treatment orders offered higher guaranteed pay than control orders. When a driver's queue showed both types simultaneously, they preferentially accepted the treatment orders. Treatment riders got first pick of the driver pool. Control riders were left with whoever remained — or no driver at all. The treatment riders' improvement came partly at the expense of the control riders, not purely from the incentive design itself. The -3.1% causal estimate is not measuring the incentive change — it's measuring supply reallocation. It's fiction as a causal estimate.

The overall marketplace cancellation rate confirms it: the marketplace got slightly worse during the experiment, not better. You redistributed cancellations. You didn't reduce them.

The right experiment here is a geographic holdout. Pick some cities for treatment, some for control, run the incentive change at the city level. No rider-side split. Cities are the unit of randomization because cities are close to the unit of independence — supply doesn't flow freely between cities. It's lower power (you have 38 cities, not millions of riders), but it's valid.

One more thing: the driver acceptance rate finding (+6.2%) is real and worth keeping. That measures a driver behavioral outcome directly — it's not contaminated by supply spillover. It tells you the incentive is doing something to driver psychology. Whether that translates to marketplace-level improvement is exactly what the geo-holdout needs to measure.`,

    interviewTakeaway: "In a two-sided marketplace where supply cannot be split, standard rider/buyer-side A/B testing violates SUTVA — the correct experimental design is geographic holdout or switchback, where the unit of randomization is at or above the unit of interference.",

    relatedConcepts: ["SUTVA", "marketplace interference", "network effects", "geographic holdout", "switchback experiment", "unit of randomization", "spillover effects", "two-sided marketplace"],

    // V2 scaling fields
    scenarioFamily: "network_effects",
    tags: ["SUTVA violation", "marketplace interference", "supply sharing", "geographic holdout", "switchback", "on-demand delivery"],
    conceptTags: ["SUTVA", "spillover effects", "unit of randomization", "marketplace interference", "network effects"],
    stakeholderSummary: "The incentive redesign experiment appeared to show a benefit for treatment riders, but the experiment design was fundamentally broken: treatment and control riders shared the same driver pool, so drivers preferentially served treatment orders, leaving control riders underserved. This means we measured supply reallocation, not the effect of the incentive itself. The overall marketplace actually got slightly worse during the experiment. We cannot make a ship decision based on this result — we need to re-run using a city-level randomization design.",
    nextTestIdeas: [
      "Design a geographic holdout experiment across the existing 38 cities: assign approximately 19 cities to the new reliability bonus incentive and 19 to the existing surge structure, measure peak-hour cancellation rate at the city level for 28 days, and explicitly pre-declare city-level cancellation rate as the primary metric.",
      "Before the geo-holdout, run a driver survey in 3-5 cities to quantify how predictable pay affects strategic acceptance behavior — this qualitative signal will help size the expected effect and set a realistic minimum detectable effect for the geo-holdout power calculation.",
      "Design a switchback experiment in 6 cities alternating the incentive structure by week, with explicit carryover-period controls (48-hour washout between switches), to test whether the driver acceptance rate finding (+6.2%) translates into marketplace-level cancellation improvement in a cleaner setting."
    ],
    keyTakeaways: [
      "SUTVA — the Stable Unit Treatment Value Assumption — requires that a unit's outcome depends only on its own treatment, not on others'; in a two-sided marketplace with shared supply, this assumption is violated the moment a rider-side treatment changes how drivers prioritize competing orders.",
      "The clearest diagnostic for SUTVA violation is control group degradation: when control riders experience +4.8% worse cancellations than pre-experiment baseline, the experiment's control is no longer approximating the world without the treatment — the treatment is leaking through shared driver supply.",
      "The overall marketplace cancellation rate increased vs. baseline (+1.2%) even while treatment riders improved; this is only possible if treatment riders' benefit came at the expense of control riders, meaning the incentive change redistributed cancellations rather than reducing them in aggregate.",
      "The driver acceptance rate finding (+6.2%, p=0.021) is the most trustworthy result in this dataset because it measures a driver-level behavioral outcome that is not contaminated by which riders the driver subsequently serves — it confirms the incentive hypothesis is directionally plausible, worth testing in a valid design.",
      "The unit of randomization must be at or above the unit of interference: in any marketplace where supply flows freely within a geography, the city is the minimum viable randomization unit for supply-side experiments."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 08 — False Rigor (PAID)
  // Theme: When Not to Experiment
  // ─────────────────────────────────────────────
  {
    id: "s08-false-rigor",
    title: "False Rigor",
    subtitle: "The team wants an experiment. The math says it can't work. What do you tell them?",
    isFree: false,
    industry: "b2b",
    difficulty: "senior",
    theme: "when_not_to_experiment",

    context: {
      company: "Veridict",
      product: "Compliance and audit management SaaS for mid-market financial firms (~$14M ARR, 110 active enterprise accounts)",
      team: "Product / Compliance Workflow team",
      background: `Veridict's product team has spent the past quarter building a redesigned audit workflow module: a new evidence collection interface with drag-and-drop file organization, inline commenting, and automated deadline reminders. The feature is built, QA'd, and ready to deploy.

The Head of Product wants to "experiment on it." She attended an experimentation conference last month and came back committed to the idea that "we should A/B test every major feature." The PM on the audit workflow assigned it to you: design the experiment.

You pull the data: 110 active enterprise accounts. About 65 actually use the audit workflow feature today. Historically, "audit completion rate" (the percentage of assigned audit tasks completed on time) is the metric the team cares about. It's currently at 71%. It moves slowly — typical variance is ±2% per quarter.`,
      businessPressure: `The Head of Product is aligned with the "experiment everything" philosophy. The VP of Customer Success wants to show the new feature to a strategic account next week for an upsell conversation. The quarter ends in 8 weeks and the team wants to have "validated" the feature before the board presentation. The engineering team wants the feature deployed and done.`
    },

    hypothesis: "A redesigned audit workflow interface with drag-and-drop file organization, inline commenting, and automated deadline reminders will increase audit completion rates and reduce time-to-audit-close for enterprise accounts.",

    experimentDesign: {
      type: "proposed a/b (not yet launched)",
      allocation: "50/50 (proposed)",
      runtime: "TBD",
      targetPopulation: "Enterprise accounts using audit workflow feature (~65 accounts)",
      primaryMetric: "Audit completion rate (quarterly)",
      guardrailMetrics: ["Support ticket rate", "Account health score"],
      sampleSizeContext: "To detect a 5% relative lift (71% → 74.5%) at 80% power with α=0.05: required runtime is approximately 18 months. To detect a 10% relative lift (71% → 78.1%): approximately 9 months. To detect a 20% relative lift (71% → 85.2%): approximately 4 months. Quarter ends in 8 weeks."
    },

    metricReadout: [
      {
        metric: "Available sample (accounts using audit workflow)",
        type: "diagnostic",
        direction: "flat",
        delta: "~65 accounts",
        pValue: null,
        confidenceInterval: null,
        significant: null,
        note: "Maximum possible sample size. Cannot be increased."
      },
      {
        metric: "Minimum detectable effect at 80% power, 8-week runtime",
        type: "diagnostic",
        direction: "flat",
        delta: "~35% relative lift required",
        pValue: null,
        confidenceInterval: null,
        significant: null,
        note: "To reach 80% power in 8 weeks with 65 accounts, you would need to observe a 35%+ relative improvement — from 71% to ~96% audit completion rate. This is not a plausible effect size."
      },
      {
        metric: "Statistical power of proposed 8-week experiment",
        type: "diagnostic",
        direction: "flat",
        delta: "~12% (vs. 80% target)",
        pValue: null,
        confidenceInterval: null,
        significant: null,
        note: "An 8-week experiment on this sample has approximately 12% power to detect a 5% relative lift. That means an 88% chance of missing a real effect. Running this experiment produces almost no information."
      }
    ],

    warningFlags: [
      {
        id: "wf-sample-too-small",
        label: "Sample size is fundamentally insufficient for A/B testing",
        description: "65 accounts is an extremely small sample for A/B testing any metric with moderate variance. No amount of runtime optimization changes the fundamental math: you don't have enough units.",
        severity: "critical"
      },
      {
        id: "wf-metric-too-slow",
        label: "Primary metric moves too slowly for practical experimentation",
        description: "Audit completion rate is a quarterly metric with low variance. It requires a long observation window to accumulate enough metric change to measure reliably. 8 weeks is an order of magnitude too short.",
        severity: "critical"
      },
      {
        id: "wf-underpowered-experiment-is-worse-than-none",
        label: "Underpowered experiments produce misleading results",
        description: "A 12% power experiment is not 'weak evidence' — it's worse than no experiment. If the result comes back non-significant (88% chance even if the feature works), the team may falsely conclude the feature doesn't work and roll it back. If it comes back significant (by chance), the team has a false positive they'll rely on.",
        severity: "critical"
      },
      {
        id: "wf-false-rigor",
        label: "Insisting on A/B testing when it isn't valid is false rigor",
        description: "Calling something an 'experiment' when the statistical conditions for experimentation aren't met doesn't add rigor — it adds the language of rigor to a process that can't produce reliable evidence. This can be worse than honest qualitative assessment.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "run-8-week",
        label: "Run the A/B experiment for 8 weeks as requested",
        description: "The team wants an experiment. Run it for 8 weeks and report the results.",
        score: "junior_miss",
        feedback: "An 8-week experiment with 65 accounts on a slow quarterly metric has approximately 12% statistical power to detect a 5% relative improvement. Running it produces almost no useful information — you have an 88% chance of missing a real effect even if it exists. Worse, any result you get (significant or not) will be used as evidence in a decision, despite being statistically meaningless. This is how bad decisions get made with a veneer of data rigor."
      },
      {
        id: "run-longer",
        label: "Run the A/B experiment for 18 months to reach adequate power",
        description: "The statistically correct runtime for this experiment is 18 months. Recommend that to stakeholders.",
        score: "analyst_ready",
        feedback: "Statistically correct, practically useless. An 18-month experiment means the product team won't get any signal until after the next two planning cycles. The feature will either be rolled out, rolled back, or made obsolete before the experiment concludes. Recommending 18 months without alternative solutions isn't analysis — it's analysis as a roadblock."
      },
      {
        id: "instrumented-rollout-qualitative",
        label: "Recommend against A/B testing. Propose: instrumented rollout + structured qualitative feedback.",
        description: "Explain why A/B testing isn't valid here. Propose an instrumented rollout (pre/post analysis with all accounts) combined with structured qualitative interviews with 8–10 accounts post-rollout.",
        score: "senior_ready",
        feedback: "This is the right recommendation for this context. You're correctly diagnosing why A/B testing doesn't work here, and you're offering a credible alternative that can generate real evidence within the timeline. An instrumented rollout with clear pre-declared success criteria (e.g., 'audit completion rate increases by at least 3 percentage points within 2 quarters') gives the team something to evaluate against. Structured qualitative interviews with 8-10 accounts will surface usability issues and adoption patterns that A/B testing would never capture at this sample size."
      },
      {
        id: "piloted-rollout-success-criteria",
        label: "Recommend a structured pilot: 15-20 willing accounts, explicit pre-declared success criteria, qualitative interviews.",
        description: "Run a voluntary pilot with a subset of willing accounts. Declare explicit success criteria before launch. Evaluate against those criteria.",
        score: "senior_ready",
        feedback: "Also a strong recommendation. The voluntary pilot has a selection bias concern (willing accounts may be more engaged and more likely to succeed), but it's a reasonable way to gather early signal with limited sample. The critical component: success criteria must be declared before the pilot begins. 'We'll know it worked when we see X' is only meaningful if X is defined before the data is collected."
      },
      {
        id: "mixed-methods",
        label: "Recommend a mixed-methods approach: instrumented rollout + propensity-matched pre/post + qualitative interviews. Explain why A/B is invalid and what this replaces it with.",
        description: "Design a rigorous observational study instead of a randomized experiment. Use propensity score matching on account characteristics to create a quasi-experimental comparison. Pair with structured qualitative research.",
        score: "staff_level",
        feedback: "This is the most rigorous alternative to A/B testing when randomization is impossible or impractical. Propensity score matching on account characteristics (industry, company size, historical audit completion rate, account tenure) can approximate a comparison group. It's not as clean as randomization — unmeasured confounders are a real risk — but it's far more informative than a 12%-power A/B test. Pairing it with qualitative research gives you both quantitative signal and the ability to identify the mechanism."
      }
    ],

    idealDecision: "mixed-methods",
    secondBestDecision: "instrumented-rollout-qualitative",

    juniorMistake: "Runs the 8-week experiment as requested. Often doesn't check power before designing the experiment, or knows the power is low but doesn't want to push back on the Head of Product's 'experiment everything' philosophy. The result: the experiment runs, comes back non-significant (as expected at 12% power), and the team concludes the feature doesn't work — possibly rolling it back. This is an experiment that made things worse.",

    seniorFlags: [
      "The power calculation should be the first thing you do when asked to design an experiment. Here: 65 accounts, quarterly metric, moderate variance → 18 months to achieve 80% power → experiment is not viable. This is a 5-minute calculation that reframes the entire conversation.",
      "An underpowered experiment is not 'weak evidence' — it's misleading evidence. A non-significant result from a 12%-power experiment will be incorrectly interpreted as 'the feature doesn't work.' A significant result will be incorrectly interpreted as 'the feature works.' Neither interpretation is justified. The experiment produces almost no information while consuming significant organizational attention.",
      "The 'experiment everything' philosophy from the Head of Product is well-intentioned but misapplied here. Your job as the analyst is not to run every experiment that's asked for — it's to tell the team when a proposed experiment can and cannot produce valid evidence."
    ],

    staffFlags: [
      "Would have established minimum sample size and metric velocity requirements as part of the team's experiment intake process — before individual experiment requests are evaluated. 'We need at least N units and the primary metric needs to move at a rate that allows us to observe a meaningful change within a reasonable window.' This scenario wouldn't have reached the experiment design stage.",
      "The deeper organizational issue: the team equates 'running an experiment' with 'being rigorous.' The more honest frame is that rigor means using the right evidence collection method for the context — which is sometimes a randomized experiment, and sometimes an instrumented rollout with pre-declared success criteria and qualitative interviews. Both can be rigorous. Only the former is called an 'experiment.'"
    ],

    debrief: `The most important skill I've tried to develop is knowing when not to experiment. And this is one of those moments.

Here's the math: 65 accounts, an 8-week window, a metric that moves at ±2% per quarter. To reach 80% statistical power in 8 weeks, you'd need to observe a 35%+ relative improvement in audit completion rate. That means going from 71% to 96%. That's not a realistic effect size for a UI redesign of a workflow module. You could build the most beautiful audit interface ever shipped and not see a 35% lift.

So what does running this experiment actually tell you? If you get a non-significant result — which happens 88% of the time even if the feature genuinely works — you'll report "no significant improvement" and someone will use that to argue for rollback. You'll have created evidence that misleads, not informs.

Here's how I'd frame the conversation with the Head of Product: "I ran the power calculation. To detect a real effect with this sample and this metric, we need 18 months — which isn't useful. The good news is we can still get rigorous evidence. We instrument the rollout, define concrete success criteria before we start (audit completion rate +3pp within 2 quarters), and combine that with structured interviews with 10 accounts at 6 weeks and 12 weeks. That's actually more information than an underpowered A/B test would give us, and we can have preliminary data within the quarter."

Framing it this way gives the Head of Product what she actually wants — disciplined evidence collection — while being honest about what a randomized experiment can and can't do here.

One more thing: the VP of Customer Success wanting to demo this to a strategic account next week for an upsell is completely separate from the experimentation question. That's a sales decision. Let them demo it. Just don't let that demo's success or failure be treated as evidence about whether the feature works across all 110 accounts.`,

    interviewTakeaway: "The correct response to 'design an A/B test for this' is first to check whether a valid A/B test is possible — low sample size, slow-moving metrics, or short timelines can make A/B testing invalid, and proposing rigorous alternatives (instrumented rollout, pre/post with success criteria, qualitative research) is more valuable than running an underpowered experiment.",

    relatedConcepts: ["statistical power", "minimum detectable effect", "sample size", "quasi-experimental design", "propensity score matching", "instrumented rollout", "pre/post analysis", "when not to experiment"],

    // V2 scaling fields
    scenarioFamily: "when_not_to_experiment",
    tags: ["statistical power", "minimum detectable effect", "small sample", "enterprise SaaS", "false rigor", "instrumented rollout"],
    conceptTags: ["statistical power", "minimum detectable effect", "sample size", "quasi-experimental design", "when not to experiment"],
    stakeholderSummary: "The audit workflow redesign is ready to ship, but the proposed A/B test has only 12% statistical power — meaning it has an 88% chance of missing a real improvement even if the feature genuinely works. With 65 accounts and a quarterly metric, a valid A/B test would take 18 months. The right path is a structured instrumented rollout with pre-declared success criteria and structured customer interviews — this produces more honest evidence than a statistically meaningless experiment, and can deliver preliminary signal within the quarter.",
    nextTestIdeas: [
      "Design an instrumented rollout with pre-declared success criteria: define 'success' as audit completion rate increasing by at least 3 percentage points within 2 quarters post-launch, declare this before rollout, and report against it at 3 months and 6 months — this is more informative than an 8-week underpowered A/B test.",
      "Conduct structured qualitative interviews with 8-10 accounts at 6 weeks and 12 weeks post-launch to identify which specific features (drag-and-drop, inline commenting, automated reminders) are driving adoption and which are being ignored — qualitative research fills the gap that a small-N quantitative study cannot.",
      "After 6 months of rollout data, apply propensity score matching on account characteristics (industry, company size, historical audit completion rate, account tenure) to construct a quasi-experimental comparison group from accounts that were onboarded before the redesign — this provides a retrospective causal estimate that is far stronger than an 8-week 12%-power experiment."
    ],
    keyTakeaways: [
      "Statistical power is the first calculation to run before agreeing to any experiment design: with 65 accounts, a quarterly metric, and an 8-week timeline, power comes to approximately 12% — meaning you are almost certain to produce a misleading result regardless of whether the feature works.",
      "An underpowered experiment is not 'weak evidence' — it is actively misleading: a non-significant result from a 12%-power study will incorrectly be interpreted as 'the feature doesn't work,' and a false positive (12% base rate) will be incorrectly interpreted as confirmation, producing decisions that would have been better made without the experiment.",
      "The MDE at 8 weeks with 65 accounts is approximately +35% relative lift (71% → 96% audit completion) — naming this number explicitly in the stakeholder conversation reframes the question from 'why won't you run the experiment?' to 'is a 35% lift a plausible effect size?', which answers itself.",
      "The 'experiment everything' philosophy is healthy for teams with high traffic and fast-moving metrics; applied to enterprise B2B products with dozens of accounts and quarterly outcome metrics, it produces a pattern where teams run experiments they cannot possibly learn from and make decisions on statistical noise.",
      "Rigorous evidence collection does not require a randomized experiment — an instrumented rollout with pre-declared success criteria, explicit measurement of the primary metric pre and post, and structured qualitative interviews is a legitimate and often more informative evidence standard for small-N enterprise contexts."
    ]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 09 — The Clickbait Ranking Win (BETA)
  // Theme: Proxy Metric / Metric Gaming
  // Paired with: d05-search-ranking-test
  // ─────────────────────────────────────────────
  {
    id: "s09-clickbait-ranking-win",
    title: "The Clickbait Ranking Win",
    subtitle: "CTR is up 14%. Add-to-cart is flat. Reformulations are climbing. The PM wants to ship.",
    isFree: false,
    industry: "ecommerce",
    difficulty: "analyst",
    theme: "proxy_metric",

    context: {
      company: "Vela",
      product: "B2C e-commerce marketplace — handmade and independent goods, ~$80M GMV",
      team: "Search & Discovery team",
      background: `Vela deployed a new ML-based search ranking algorithm in an A/B test three weeks ago. The ML model was trained on historical click-through rate data. The PM chose CTR as the primary metric because it was "the training signal and the most direct measure of relevance."

The experiment ran 21 days on 50% of users. Today is the readout. The PM sent a message at 8am: "CTR is up 14% — that's enormous. I'm drafting the ship announcement."`,
      businessPressure: `The ML team spent a quarter building this model. The Head of Product wants an "AI win" for the roadmap review, which happens on Friday. Engineering has the deployment PR ready to merge. The PM has already briefed the CEO that search improvements are coming.`
    },

    hypothesis: "The ML ranking algorithm will improve search relevance by surfacing more engaging results, increasing CTR and downstream search-driven purchases.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "21 days",
      targetPopulation: "All users who performed at least one search query",
      primaryMetric: "Click-through rate on search results",
      guardrailMetrics: ["Add-to-cart from search", "Query reformulation rate"],
      sampleSizeContext: "~60,000 daily active searchers per arm. 21 days. User-level randomization."
    },

    metricReadout: [
      {
        metric: "Click-through rate on search results",
        type: "primary",
        direction: "up",
        delta: "+14.2%",
        pValue: 0.001,
        confidenceInterval: "[+11.1%, +17.3%]",
        significant: true,
        note: "Highly significant. The ML model substantially increases the proportion of search results that get clicked."
      },
      {
        metric: "Add-to-cart from search (users adding to cart within same search session)",
        type: "guardrail",
        direction: "down",
        delta: "-3.8%",
        pValue: 0.019,
        confidenceInterval: "[-6.9%, -0.7%]",
        significant: true,
        note: "GUARDRAIL BREACH. Users are clicking more results but adding fewer items to cart. The clicks aren't converting to purchase intent."
      },
      {
        metric: "Query reformulation rate (user rewrites query after seeing initial results)",
        type: "guardrail",
        direction: "up",
        delta: "+9.1%",
        pValue: 0.003,
        confidenceInterval: "[+3.2%, +15.0%]",
        significant: true,
        note: "GUARDRAIL BREACH. More users are rewriting their queries after seeing results — a direct signal that the initial results were not satisfying."
      },
      {
        metric: "Search bounce rate (user clicks a result and immediately returns to search)",
        type: "secondary",
        direction: "up",
        delta: "+6.3%",
        pValue: 0.028,
        confidenceInterval: "[+0.7%, +11.9%]",
        significant: true,
        note: "Elevated. Users are clicking results, finding them not what they expected, and returning to search. Consistent with clickbait effect."
      },
      {
        metric: "Revenue per searcher (total GMV from users who searched / users who searched)",
        type: "secondary",
        direction: "down",
        delta: "-2.1%",
        pValue: 0.061,
        confidenceInterval: "[-4.3%, +0.1%]",
        significant: false,
        note: "Trending negative but not significant. The add-to-cart decline and bounce rate increase are consistent with this directional revenue softness."
      }
    ],

    warningFlags: [
      {
        id: "wf-ctr-proxy",
        label: "CTR is the training signal, not the outcome",
        description: "The ML model was trained on CTR. Using CTR as the primary metric tests whether the model learned its training objective — not whether it improves user outcomes. A model that maximizes CTR will get this result even if it degrades purchase quality.",
        severity: "critical"
      },
      {
        id: "wf-reformulation-breach",
        label: "Reformulation rate rising is a search quality failure signal",
        description: "Query reformulation directly indicates that initial results failed the user's intent. Rising reformulation alongside rising CTR means the ML model is surfacing clickable but irrelevant results. Users click, find the wrong thing, and restate their query.",
        severity: "critical"
      },
      {
        id: "wf-cart-breach",
        label: "Add-to-cart breach: clicks aren't converting to intent",
        description: "If the ML model improved result relevance, CTR and add-to-cart should rise together. CTR rising while add-to-cart falls is the signature of clickbait — results that attract attention but don't match the user's actual purchase intent.",
        severity: "critical"
      },
      {
        id: "wf-business-pressure",
        label: "Business pressure on a technically impressive metric",
        description: "The ML team invested a quarter in this model. A 14% CTR lift is a visible number that will be cited in the all-hands. The decision to hold requires naming a technically impressive result as a product failure — which is analytically correct but organizationally difficult.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it — CTR +14% with p < 0.001 is definitive. The guardrail movements are small.",
        description: "CTR is the primary metric and it's up significantly. Ship.",
        score: "junior_miss",
        feedback: "Both guardrails are breached. The add-to-cart decline (-3.8%, p = 0.019) and the reformulation rate increase (+9.1%, p = 0.003) are statistically significant and directionally coherent. They tell the same story: users are clicking more results that don't match their intent, then reformulating. The 14% CTR lift is real — it just doesn't measure what you care about."
      },
      {
        id: "hold_investigate",
        label: "Hold. Both guardrails breach. CTR gain with add-to-cart loss and rising reformulations means the model is surfacing clickbait. Do not ship.",
        description: "The ML model optimized its training objective (CTR) at the cost of actual search quality.",
        score: "senior_ready",
        feedback: "This is the right call. The pattern is coherent: CTR up, add-to-cart down, reformulations up, bounce rate up. The ML model learned to surface listings that get clicks — but the wrong kind. Users click, find irrelevant results, and restate their query. The model optimized its training signal at the cost of the outcome. The decision: don't ship this version. Retrain with downstream quality signals (add-to-cart, purchase) as part of the objective, not just CTR."
      },
      {
        id: "ship_monitor",
        label: "Ship with close post-launch monitoring — the CTR win is real and guardrail movements are within tolerance.",
        description: "Ship and watch the guardrails closely for 30 days post-launch.",
        score: "analyst_ready",
        feedback: "The guardrail breaches are statistically significant and directionally coherent with a quality problem — they're not noise to monitor. Post-launch monitoring doesn't undo a ship decision. Once the ML ranking is deployed to 100% of users, reformulation rates and add-to-cart rates will reflect the same dynamics you're seeing here. 'We'll watch it' is not an analytical response to two pre-committed guardrail breaches."
      },
      {
        id: "retrain",
        label: "Do not ship. Ask the ML team to retrain the model using add-to-cart and purchase as training signals rather than CTR alone.",
        description: "The model is optimizing the wrong objective. Fix the objective function.",
        score: "staff_level",
        feedback: "This is the complete answer. Not only is the ship decision wrong — you're identifying the root cause and the correct fix. The model was trained on CTR, which can be gamed by listings with appealing thumbnails and titles regardless of actual product relevance. Retraining with downstream quality signals (add-to-cart, purchase, session quality) as the training objective will produce a model that optimizes for what users actually want. The 14% CTR lift validates that the model architecture works — it just needs a better objective."
      }
    ],

    idealDecision: "retrain",
    secondBestDecision: "hold_investigate",

    juniorMistake: "Ships on the 14% CTR result. Treats guardrail breaches as minor. Frames the reformulation increase as 'users exploring more results' rather than 'search quality failure.' Is anchored by the ML team investment and the CEO briefing.",

    seniorFlags: [
      "The CTR/add-to-cart divergence is the clearest signal in this readout. When they move in opposite directions, the likely cause is that the ranking is optimizing for clicks rather than intent match. Every senior search analyst knows this pattern.",
      "Reformulation rate is the most honest signal in search quality. A user who rewrites their query is explicitly telling you the results failed. Rising reformulation alongside rising CTR is the definition of a model that learned the wrong objective.",
      "The correct action is not just 'hold' — it's to diagnose why the model is doing this and retrain. The issue is the training objective, not the architecture."
    ],

    staffFlags: [
      "Would have caught this in the design phase by refusing to use CTR as the primary metric for a model trained on CTR. The circular logic is obvious before the experiment runs.",
      "Would have flagged the novelty risk explicitly: users explore new result orderings in week 1. The week-over-week CTR trend should be monitored to see if it's partly a novelty artifact."
    ],

    debrief: `Let's be direct about what happened here.

The ML model did exactly what it was trained to do: maximize click-through rate. The CTR result is not a mistake — it's the model performing correctly on its training objective. The mistake was choosing CTR as both the training signal and the success metric.

When the same metric is used to train the model and validate the model, you're testing whether the model learned its training objective, not whether it produces good outcomes. That's a circular test. Any sufficiently flexible ML model will pass it.

The guardrail data tells the complete story: users are clicking more results (+14% CTR), finding the wrong things (search bounce rate +6.3%), and giving up and retrying (+9.1% reformulation rate). Add-to-cart is falling (-3.8%). The model learned which listing thumbnails and titles are most compelling — which is not the same as which listings are most relevant to what the user wants to buy.

The right next step is not "hold and monitor" — it's retrain. The model architecture is fine. The objective function is wrong. Add-to-cart and purchase-from-search events need to be part of the training signal. A model that is rewarded for generating clicks that convert will learn fundamentally different ranking patterns than one rewarded only for generating clicks.

There's an organizational challenge here. Telling the ML team that their quarter's work needs to be retrained is difficult, especially with a 14% CTR lift visible in the readout. Your job as an analyst is to make the case clearly: the lift is real, the problem is the objective, and the fix is well-defined. That's actually a better outcome than "the model doesn't work."`,

    interviewTakeaway: "When a model is trained on a proxy metric and validated on the same metric, the test confirms the model achieved its training objective — not that it's good for users. CTR and search quality diverge when the model learns to surface clickable but irrelevant results. Guardrail metrics (reformulation rate, add-to-cart) break the circularity.",

    relatedConcepts: ["proxy metric", "metric gaming", "guardrail metric", "novelty effect", "multiple testing"],
    scenarioFamily: "proxy_metric",
    tags: ["search ranking", "ML model evaluation", "CTR", "proxy metric", "clickbait"]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 10 — The Push Open Rate Trap (BETA)
  // Theme: Proxy Metric / User Trust Guardrail
  // Paired with: d06-notification-timing-test
  // ─────────────────────────────────────────────
  {
    id: "s10-push-open-rate-trap",
    title: "The Push Open Rate Trap",
    subtitle: "Notification opens are up 22%. Opt-outs are climbing. Uninstalls are climbing. The PM says the opens prove it works.",
    isFree: false,
    industry: "mobile",
    difficulty: "analyst",
    theme: "proxy_metric",

    context: {
      company: "Orion",
      product: "Consumer habit and task tracking app — 2.1M MAU, notification-driven re-engagement",
      team: "Growth & Engagement team",
      background: `Orion deployed a test of ML-personalized notification timing two weeks ago. The ML model uses each user's historical open patterns to send at their highest-engagement time of day, replacing the previous fixed 8am/12pm/7pm schedule.

The PM pre-specified notification open rate as the primary metric. "If people are opening the notification, the timing is working." Results arrived this morning.`,
      businessPressure: `DAU/MAU has been declining for two quarters. The Head of Growth has this experiment on the leadership dashboard. The PM has pre-booked a "ship day" — three days from now — and has told the team to be ready to deploy. The Head of Growth wants to announce a re-engagement win in the all-hands.`
    },

    hypothesis: "ML-personalized notification timing will increase notification open rate by reaching users at their most receptive moments.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50",
      runtime: "21 days",
      targetPopulation: "All users with push notifications enabled (excluding users signed up <7 days)",
      primaryMetric: "Notification open rate",
      guardrailMetrics: ["Notification opt-out rate", "14-day uninstall rate"],
      sampleSizeContext: "~310,000 users per arm. User-level randomization. 1 notification per user per day in both arms."
    },

    metricReadout: [
      {
        metric: "Notification open rate",
        type: "primary",
        direction: "up",
        delta: "+22.4%",
        pValue: 0.001,
        confidenceInterval: "[+19.1%, +25.7%]",
        significant: true,
        note: "Highly significant. The ML timing model dramatically increases the proportion of notifications opened."
      },
      {
        metric: "7-day active session rate (users with ≥1 session in the 7 days following notification)",
        type: "secondary",
        direction: "up",
        delta: "+2.1%",
        pValue: 0.11,
        confidenceInterval: "[-0.5%, +4.7%]",
        significant: false,
        note: "Directionally positive but not significant. Notifications are being opened more, but the session uplift is marginal and noisy."
      },
      {
        metric: "Notification opt-out rate",
        type: "guardrail",
        direction: "up",
        delta: "+18.3%",
        pValue: 0.001,
        confidenceInterval: "[+12.7%, +23.9%]",
        significant: true,
        note: "GUARDRAIL BREACH. Users in treatment are opting out of notifications at a significantly higher rate. Once opted out, they cannot be re-engaged through this channel."
      },
      {
        metric: "14-day uninstall rate",
        type: "guardrail",
        direction: "up",
        delta: "+8.7%",
        pValue: 0.024,
        confidenceInterval: "[+1.2%, +16.2%]",
        significant: true,
        note: "GUARDRAIL BREACH. Treatment users are uninstalling at a significantly elevated rate. CI is wide but clearly above zero."
      },
      {
        metric: "Task completion per notification-driven session",
        type: "secondary",
        direction: "down",
        delta: "-4.2%",
        pValue: 0.038,
        confidenceInterval: "[-8.2%, -0.2%]",
        significant: true,
        note: "Significant. Users opened notifications more but completed fewer tasks per session entered from a notification. Suggests the ML model is catching users at moments when they open the notification but aren't actually ready to engage."
      }
    ],

    warningFlags: [
      {
        id: "wf-optin-breach",
        label: "Opt-out rate breach: irreversible channel loss",
        description: "An 18.3% relative increase in notification opt-outs is not a minor guardrail nudge — it's a signal that the ML timing model is making notifications feel intrusive at scale. Once a user opts out, the notification re-engagement channel is permanently closed for them.",
        severity: "critical"
      },
      {
        id: "wf-uninstall-breach",
        label: "Uninstall rate breach: elevated churn",
        description: "An 8.7% relative increase in 14-day uninstalls is a severe long-term user quality signal. Personalized timing may be sending at moments that feel surveillance-like (e.g., late at night, early morning) for some users.",
        severity: "critical"
      },
      {
        id: "wf-session-quality",
        label: "Task completion per notification session declining",
        description: "The ML model finds users when they will open a notification — not when they're ready to actually use the app. Opening a notification from the gym locker room is not the same as opening it at a desk with 10 minutes to complete a task.",
        severity: "warning"
      },
      {
        id: "wf-proxy-trap",
        label: "Open rate is the ML training signal — not the user outcome",
        description: "The model was trained to maximize opens. Using open rate to validate it confirms the training objective was achieved, not that users benefit. The session and opt-out data reveal the divergence.",
        severity: "critical"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it — open rate +22% with tight CI. Guardrail movements are within acceptable range.",
        description: "The primary metric is the win condition. Ship.",
        score: "junior_miss",
        feedback: "Both guardrails are statistically significant breaches. The opt-out rate increase (+18.3%, p < 0.001) and uninstall rate increase (+8.7%, p = 0.024) are not marginal — they are significant, directionally coherent harm signals. 'Within acceptable range' would need to be defined before the test. These exceed any reasonable pre-committed threshold."
      },
      {
        id: "hold",
        label: "Hold. Both guardrails are significantly breached. High opens from a model that drives opt-outs and uninstalls is not an engagement win.",
        description: "The model is reaching users at non-receptive moments, driving notification fatigue at scale.",
        score: "senior_ready",
        feedback: "Correct. The guardrail pattern tells a coherent story: the ML model sends notifications when users are most likely to physically open them — but not when they're ready to engage. The result: more opens, same or worse sessions, and dramatically more opt-outs and uninstalls. The model is optimizing for a fleeting interaction that damages the long-term channel. Pre-committed guardrails are blocking conditions. Do not ship."
      },
      {
        id: "ship_segment",
        label: "Ship to users with healthy open history and exclude users showing early opt-out signals.",
        description: "Target only the users for whom the model is working.",
        score: "analyst_ready",
        feedback: "Post-hoc segmentation based on experiment outcomes is selection bias. You don't know which users 'work well' for the model without seeing the data — and seeing the data means the segment is already defined by the outcome. Additionally, opt-outs have already accumulated in the 21-day test window and cannot be reversed. The harm has already started."
      },
      {
        id: "retrain_objective",
        label: "Do not ship. Retrain the ML model with task completion or session quality as the training objective, not raw open rate.",
        description: "The model optimized opens at the cost of engagement quality and channel health.",
        score: "staff_level",
        feedback: "This is the complete answer. The model found when users will open notifications — which is different from when they'll productively engage with the app. A model trained on task completion or session depth after notification would learn different timing patterns: times when users are actually ready to act. The current model is technically successful (maximized its objective) but practically harmful (the objective was wrong). This is the same issue as the search ranking case — the fix is the training objective, not the architecture."
      }
    ],

    idealDecision: "retrain_objective",
    secondBestDecision: "hold",

    juniorMistake: "Ships on the 22% open rate result. Dismisses guardrail breaches as 'we can monitor post-launch.' Anchored by the Head of Growth's ship timeline and the visible metric win.",

    seniorFlags: [
      "An 18% opt-out increase is catastrophic channel damage if shipped at scale. The opt-out rate in the experiment reflects ~310k users. At full deployment, that's ~600k users on a path to opting out. Channel damage is the most expensive outcome in push notification strategy.",
      "Task completion per notification session declining while opens increase is the clearest possible evidence that the model is optimizing momentary attention, not productive engagement. These two metrics moving in opposite directions define the proxy metric trap.",
      "The correct framing to leadership: 'The model architecture works. The training objective was wrong. Retraining with session quality signals will likely outperform this version significantly.'"
    ],

    staffFlags: [
      "Would have caught this in design by refusing to accept open rate as the primary metric for a model trained on open rate. The proxy trap is visible before the data exists.",
      "Would have flagged that opt-out harms are irreversible and asymmetric — they compound over time. A 21-day test with 18% elevated opt-outs is already meaningful channel damage that does not undo when the feature is rolled back."
    ],

    debrief: `The open rate result is exactly what you'd expect from a model trained on open rate. The model found when users pick up their phones and are likely to tap a notification. That is not the same as finding when they're ready to engage with your product.

The divergence between opens and task completion is the most important signal in this readout. If the model had found genuinely receptive moments — times when users wanted to work on their tasks — you'd see opens AND completions rise. Opens rising while completions fall means the model is catching users in distracted or passive moments. They tap the notification out of habit or curiosity and don't actually do anything.

The opt-out and uninstall numbers are the most serious findings here. An 18% opt-out increase is not a guardrail nudge — it's evidence that the personalized timing is making notifications feel intrusive to a significant portion of users. For some, this is probably because the model sends at unusual times (very early morning, very late night, during commutes) that feel surveillance-like. Once opted out, those users cannot be re-engaged through push notifications — the channel is permanently closed.

What should happen next: don't ship this model. Retrain it with downstream engagement signals — task completions, session depth, D7 retention from notification entry — as the training objective. A model that learns to send when users will engage rather than when they'll tap will produce very different timing patterns and, likely, much better actual outcomes.

The good news for the ML team: the architecture is fine. The objective function is wrong. That's a fixable problem, and a model trained on the right signal will be genuinely more valuable than this one.`,

    interviewTakeaway: "Notification open rate is a proxy for user receptiveness — not for productive engagement. A model that maximizes opens by finding when users will tap a notification teaches an entirely different skill than finding when users are ready to use the product. Opt-out and uninstall rates are the guardrails that reveal the difference.",

    relatedConcepts: ["proxy metric", "guardrail metric", "notification opt-out", "user trust", "ML training objective"],
    scenarioFamily: "proxy_metric",
    tags: ["push notifications", "ML timing model", "open rate", "opt-out", "engagement"]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 11 — The Seller Speed Spillover (BETA)
  // Theme: Marketplace Interference / SUTVA
  // Paired with: d07-seller-incentive-test
  // ─────────────────────────────────────────────
  {
    id: "s11-seller-speed-spillover",
    title: "The Seller Speed Spillover",
    subtitle: "Treatment sellers are converting 19% better. Control sellers are converting 11% worse. The PM wants to ship based on the treatment result.",
    isFree: false,
    industry: "marketplace",
    difficulty: "senior",
    theme: "sutva",

    context: {
      company: "Crafted",
      product: "Two-sided handmade goods marketplace — ~40,000 active sellers, ~850,000 monthly buyers",
      team: "Seller Success team",
      background: `Crafted ran a 6-week A/B test of the Fast Responder program: a badge and algorithmic search boost for sellers who maintain a <2h median response time. 50% of eligible sellers received the program (treatment); 50% did not (control). Buyers were not randomized — all buyers could see and purchase from both treatment and control sellers.

The Seller Success team is presenting results today. The PM leads with: "Treatment sellers are converting 19% better than pre-experiment. This is our biggest seller program result ever."`,
      businessPressure: `The Head of Marketplace wants to announce this program at the quarterly seller summit next month. The Seller Success team has been building this for two months. The VP of GMV growth is already calling it a win on Slack.`
    },

    hypothesis: "The Fast Responder badge and algorithmic boost will improve platform-level buyer-to-purchase conversion by incentivizing faster seller response times.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50 (seller-level randomization)",
      runtime: "42 days",
      targetPopulation: "Active sellers with 5+ transactions in past 90 days",
      primaryMetric: "Treatment seller conversion rate",
      guardrailMetrics: ["Control seller conversion rate", "Order cancellation rate"],
      sampleSizeContext: "~20,000 sellers per arm. Buyer-level metrics computed from all buyer interactions with each seller arm."
    },

    metricReadout: [
      {
        metric: "Treatment seller conversion rate (buyers who purchased from treatment sellers / buyers who contacted treatment sellers)",
        type: "primary",
        direction: "up",
        delta: "+19.2%",
        pValue: 0.001,
        confidenceInterval: "[+14.8%, +23.6%]",
        significant: true,
        note: "Treatment sellers are converting significantly more of the buyers they interact with."
      },
      {
        metric: "Control seller conversion rate (buyers who purchased from control sellers / buyers who contacted control sellers)",
        type: "guardrail",
        direction: "down",
        delta: "-11.4%",
        pValue: 0.002,
        confidenceInterval: "[-17.8%, -5.0%]",
        significant: true,
        note: "GUARDRAIL BREACH. Control sellers are converting significantly fewer buyers. This is the demand displacement signal."
      },
      {
        metric: "Platform-level buyer conversion rate (total purchases / total buyer inquiries, all sellers combined)",
        type: "secondary",
        direction: "up",
        delta: "+2.8%",
        pValue: 0.18,
        confidenceInterval: "[-1.3%, +6.9%]",
        significant: false,
        note: "Platform-level conversion is nearly flat and not significant. The treatment seller lift and control seller decline partially cancel out."
      },
      {
        metric: "Seller response time (median hours — treatment arm)",
        type: "secondary",
        direction: "down",
        delta: "-42%",
        pValue: 0.001,
        confidenceInterval: "[-49%, -35%]",
        significant: true,
        note: "The incentive worked: treatment sellers responded dramatically faster. Mechanism is confirmed."
      },
      {
        metric: "Order cancellation rate",
        type: "guardrail",
        direction: "up",
        delta: "+4.1%",
        pValue: 0.041,
        confidenceInterval: "[+0.2%, +8.0%]",
        significant: true,
        note: "GUARDRAIL BREACH. Cancellation rate is slightly elevated, possibly from sellers sending fast initial responses and then struggling to fulfill orders that were accepted impulsively."
      },
      {
        metric: "Buyer inquiry volume per seller (treatment vs. control)",
        type: "secondary",
        direction: "up",
        delta: "+28.1% (treatment vs. control)",
        pValue: 0.001,
        confidenceInterval: "[+22%, +34%]",
        significant: true,
        note: "Buyers are preferentially sending inquiries to Fast Responder sellers. This is the demand displacement mechanism — buyers are routing away from control sellers toward treatment sellers."
      }
    ],

    warningFlags: [
      {
        id: "wf-sutva",
        label: "SUTVA violation: buyers contact both arms — demand displacement is the mechanism",
        description: "Buyers in this marketplace contact multiple sellers simultaneously for the same purchase. Treatment sellers converting better doesn't mean new buyers are appearing — it means treatment sellers are winning buyers who might otherwise have purchased from control sellers. The +28% inquiry routing to treatment sellers quantifies the displacement.",
        severity: "critical"
      },
      {
        id: "wf-control-decline",
        label: "Control seller conversion declining is the demand displacement signal",
        description: "A genuine platform-level improvement would show treatment sellers lifting without control sellers declining. Control sellers declining while treatment sellers rise is the definition of zero-sum reallocation in a shared buyer pool.",
        severity: "critical"
      },
      {
        id: "wf-platform-flat",
        label: "Platform-level conversion is flat — the aggregate tells the truth",
        description: "Platform-level buyer conversion (+2.8%, p = 0.18) is not significant. This is the correct metric for evaluating whether the program adds GMV to the platform or merely redistributes it.",
        severity: "critical"
      },
      {
        id: "wf-cancellation",
        label: "Cancellation rate increase suggests quality gaming",
        description: "Sellers responding faster may be accepting orders before properly evaluating fit, leading to higher cancellations. Fast response without quality fulfillment is a hollow win.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it — treatment sellers improved 19%. This is a strong seller-level result.",
        description: "Treatment sellers show significant improvement. Ship the program.",
        score: "junior_miss",
        feedback: "The +19% is a demand displacement effect, not a platform GMV improvement. Treatment sellers gained conversions because buyers routed away from control sellers — the buyer inquiry routing data confirms this (+28% more inquiries to treatment sellers). When all sellers are in treatment, there are no control sellers to displace demand from. The net effect at full deployment would approximate the flat platform-level result you see now."
      },
      {
        id: "hold_investigate",
        label: "Hold. The design has a structural interference problem. Treatment lifts and control declines simultaneously — the program redistributes demand, it doesn't create it.",
        description: "Seller-level A/B cannot distinguish additive GMV from demand reallocation in a marketplace.",
        score: "senior_ready",
        feedback: "Correct. The evidence for demand displacement is clear: control conversion falls significantly, inquiry routing shifts toward treatment sellers, and platform-level conversion is flat. The SUTVA violation makes the treatment seller result uninterpretable as a platform-level effect. The program needs to be retested with a valid design (geographic holdout) before the ship decision can be made."
      },
      {
        id: "ship_partial",
        label: "Ship to 25% of sellers and monitor for cancellation and control seller impact.",
        description: "Partial rollout reduces risk while allowing learning.",
        score: "analyst_ready",
        feedback: "Partial rollout doesn't fix the design problem. At 25% of sellers in the program, the same SUTVA violation exists — buyers route toward the 25% with badges, control sellers still face demand displacement. The cancellation guardrail is already breached. A partial rollout with monitoring doesn't change the structural interpretation issue."
      },
      {
        id: "redesign_geo",
        label: "Do not ship. Recommend rerunning with geographic holdout design — randomize markets, not individual sellers, so supply and demand are isolated together.",
        description: "The valid design for two-sided marketplace experiments.",
        score: "staff_level",
        feedback: "This is the complete answer. Geographic holdout is the only design that can measure a true platform-level effect in this context. Within a treatment market, all buyers interact only with treatment sellers, and vice versa. There is no cross-market demand displacement. The market-level conversion rate is an unconfounded estimate of the program's platform-level value. Seller-level A/B is structurally invalid for this type of experiment, and no amount of monitoring or partial rollout fixes that."
      }
    ],

    idealDecision: "redesign_geo",
    secondBestDecision: "hold_investigate",

    juniorMistake: "Ships on the treatment seller lift. Does not check control seller performance. Treats the +19% as a platform-level win. Is anchored by the seller summit announcement timeline.",

    seniorFlags: [
      "The treatment lift + control decline pattern is the definitive diagnostic for demand displacement in marketplace A/B tests. If you see it, the design is structurally invalid for measuring platform-level effects.",
      "The correct framing: the incentive mechanism works (sellers respond faster, treatment conversion rises), but the experiment design can't tell you if the program adds GMV or just redistributes it. That's a design problem, not an outcome problem.",
      "Geographic holdout is the only valid design here. Seller-level A/B in two-sided markets with shared buyer pools is a known structural failure mode."
    ],

    staffFlags: [
      "Would have caught this in design by refusing seller-level randomization for a marketplace experiment. The SUTVA violation is predictable before the experiment runs.",
      "Would have noted that the demand displacement effect would be larger in high-density markets (where buyers have many seller options) than in thin markets. The aggregate result averages across this heterogeneity."
    ],

    debrief: `Let's talk about what this data actually shows.

The treatment sellers improved. The program worked exactly as designed: sellers responded faster, and buyers preferred them. The mechanism is validated. That part is not in question.

The problem is the design. Buyers in this marketplace contact multiple sellers when considering a purchase. When 50% of sellers have the Fast Responder badge and an algorithmic boost, buyers route their inquiries toward them. The treatment sellers gain conversions — but some of those conversions came from buyers who would have purchased from control sellers in the absence of the program. The control seller decline confirms this directly: -11.4% conversion, p = 0.002.

When all sellers are in the program, there are no control sellers to displace demand from. The steady-state platform effect is approximately what you see in the platform-level metric: +2.8%, p = 0.18. Not significant.

This is not a reason to abandon the program. It's a reason to test it correctly. Geographic holdout design isolates treatment and control markets so that within each market, all buyers interact with all sellers under the same conditions. The market-level conversion rate in treatment markets vs. control markets gives you an unconfounded platform-level estimate.

The honest answer for the seller summit: "The mechanism works — our sellers respond faster, and buyers prefer them. We found a design limitation in how we tested platform-level impact and we're running the right measurement now. We'll have a definitive answer in 6 weeks." That's not a failure. That's credible analytics.`,

    interviewTakeaway: "Seller-level A/B in two-sided marketplaces creates demand displacement — treatment sellers win conversions from buyers who route away from control sellers, not from new demand. The only valid platform-level test is geographic holdout, where treatment and control markets have isolated supply and demand pools.",

    relatedConcepts: ["SUTVA", "marketplace interference", "demand displacement", "geographic holdout", "two-sided markets"],
    scenarioFamily: "sutva",
    tags: ["marketplace", "seller incentive", "SUTVA", "demand displacement", "geographic holdout"]
  },

  // ─────────────────────────────────────────────
  // SCENARIO 12 — The Checklist Completion Illusion (BETA)
  // Theme: Proxy Metric / Activation Measurement
  // Paired with: d08-onboarding-checklist-test
  // ─────────────────────────────────────────────
  {
    id: "s12-checklist-completion-illusion",
    title: "The Checklist Completion Illusion",
    subtitle: "Checklist completion is up 47%. Week-1 meaningful activation is flat. 14-day retention is slightly worse.",
    isFree: false,
    industry: "saas",
    difficulty: "analyst",
    theme: "proxy_metric",

    context: {
      company: "Loopwise",
      product: "B2B project management SaaS — 14k paying accounts",
      team: "Activation & Onboarding team",
      background: `Loopwise added a 7-step in-product onboarding checklist for new users six weeks ago. Steps include: creating a project, adding a task, setting a due date, inviting a teammate, using a template, enabling notifications, and setting personal preferences.

The experiment ran for 6 weeks with account-level randomization. The PM pre-specified checklist completion rate as the primary success metric. "If users complete the checklist, they know how to use the product."

Results arrived this morning. The PM is presenting to the Head of Product in an hour.`,
      businessPressure: `The Head of Product has the onboarding checklist as a Q3 priority. The Activation team has been building it for 2 months. The PM's presentation already has a "ship recommendation" slide prepared. The Head of Product has told the team that "we need an activation win this quarter."`
    },

    hypothesis: "A structured onboarding checklist will guide new users to core value faster, improving week-1 activation and 30-day retention.",

    experimentDesign: {
      type: "a/b",
      allocation: "50/50 (account-level)",
      runtime: "42 days",
      targetPopulation: "New accounts in first 7 days (excluding staff and demo accounts)",
      primaryMetric: "Checklist completion rate",
      guardrailMetrics: ["14-day account retention", "Support ticket rate in first 7 days"],
      sampleSizeContext: "~660 accounts per arm over 42 days (~220 new accounts/week). Powered to detect ~7pp activation change at 80% power."
    },

    metricReadout: [
      {
        metric: "Checklist completion rate (accounts completing all 7 steps / treatment accounts)",
        type: "primary",
        direction: "up",
        delta: "+47pp (from 0% baseline to 47% completion)",
        pValue: 0.001,
        confidenceInterval: "[+43pp, +51pp]",
        significant: true,
        note: "Highly significant. 47% of treatment accounts completed all 7 checklist steps. Control has no checklist, so baseline is 0%."
      },
      {
        metric: "Week-1 meaningful activation (created project + added task + invited teammate within 7 days)",
        type: "secondary",
        direction: "up",
        delta: "+1.9pp (38.2% → 40.1%)",
        pValue: 0.28,
        confidenceInterval: "[-1.6pp, +5.4pp]",
        significant: false,
        note: "Directionally positive but not significant. The experiment is near the power limit for detecting this effect size. The pre-specified MDE was 7pp — the observed effect is well below that."
      },
      {
        metric: "14-day account retention",
        type: "guardrail",
        direction: "down",
        delta: "-2.4pp",
        pValue: 0.09,
        confidenceInterval: "[-5.2pp, +0.4pp]",
        significant: false,
        note: "Trending negative and approaching significance. The CI lower bound at -5.2pp is concerning — the experiment may be underpowered to detect a real retention decline.",
      },
      {
        metric: "Support ticket rate in first 7 days",
        type: "guardrail",
        direction: "up",
        delta: "+11.8%",
        pValue: 0.031,
        confidenceInterval: "[+1.1%, +22.5%]",
        significant: true,
        note: "GUARDRAIL BREACH. Treatment accounts are creating significantly more support tickets in the first week. CI is wide but significant."
      },
      {
        metric: "Checklist completion time (average minutes to complete all 7 steps)",
        type: "secondary",
        direction: "neutral",
        delta: "Median: 4.2 minutes",
        pValue: null,
        confidenceInterval: null,
        significant: false,
        note: "Descriptive only. The median completion time for all 7 checklist steps is 4.2 minutes — approximately 36 seconds per step. This speed suggests many completions are click-throughs, not genuine engagement."
      },
      {
        metric: "Week-2 product usage depth (features used in week 2 among week-1 activators)",
        type: "secondary",
        direction: "down",
        delta: "-6.3%",
        pValue: 0.048,
        confidenceInterval: "[-12.4%, -0.2%]",
        significant: true,
        note: "Significant. Treatment accounts that activated in week 1 show lower product depth in week 2 — suggesting checklist completion drove surface-level actions that didn't translate to genuine engagement."
      }
    ],

    warningFlags: [
      {
        id: "wf-completion-proxy",
        label: "Checklist completion is a gameable proxy — 4.2 minute median completion is the signal",
        description: "The average completion time of 4.2 minutes across 7 steps (36 seconds per step) is not genuine product engagement. Users are completing the checklist to clear the UI element, not to learn the product. This is the completion psychology effect — progress bars motivate task completion independent of actual value.",
        severity: "critical"
      },
      {
        id: "wf-activation-flat",
        label: "Meaningful activation is flat — the outcome that matters is not moving",
        description: "Week-1 meaningful activation (+1.9pp, p=0.28) is below the MDE and not significant. The checklist improved completion rate without improving the product behaviors that predict retention.",
        severity: "critical"
      },
      {
        id: "wf-week2-depth",
        label: "Week-2 product depth declining among activators — quality signal",
        description: "Treatment accounts that activated show lower week-2 depth. This is the checklist gamification effect: users went through the setup motions, 'activated', and then returned to shallow engagement because the core value wasn't genuinely internalized.",
        severity: "critical"
      },
      {
        id: "wf-retention-trending",
        label: "14-day retention trending negative with wide CI — possible underpowered harm",
        description: "The retention guardrail is at p=0.09 with lower bound -5.2pp. At n=660 accounts/arm, this experiment may be underpowered to detect a real retention decline. The direction and the support ticket breach both suggest the checklist may be creating friction, not value.",
        severity: "warning"
      }
    ],

    decisions: [
      {
        id: "ship",
        label: "Ship it — checklist completion is up 47pp and activation is trending positive.",
        description: "Large completion lift with positive activation trend. Ship.",
        score: "junior_miss",
        feedback: "Checklist completion is not an outcome — it's a mechanism metric. The pre-specified success condition should have been meaningful activation, not checklist completion. Completion +47pp with no checklist in control is not a comparison — it's trivially true that more treatment users completed a checklist that doesn't exist in control. The meaningful activation result is not significant, week-2 depth is declining, and support tickets are significantly elevated. The evidence does not support shipping."
      },
      {
        id: "hold_redesign",
        label: "Hold. Checklist completion is the wrong metric. Meaningful activation didn't move. Week-2 depth declined. The checklist may be creating friction without delivering value.",
        description: "Revisit the checklist design to focus on genuine value delivery, not UI completion.",
        score: "senior_ready",
        feedback: "Correct. The data pattern is: high completion, flat activation, declining depth, elevated support tickets. This is the checklist gamification failure mode — users complete it to clear the interface without genuinely engaging with the product. The 4.2-minute median completion time confirms this. A checklist that takes 4 minutes to complete and doesn't improve meaningful activation needs to be redesigned around the specific behaviors that drive retention, not around generic setup steps."
      },
      {
        id: "ship_monitor",
        label: "Ship with retention monitoring. The activation trend is positive and the retention decline is not significant.",
        description: "Directionally positive — ship and confirm retention doesn't worsen.",
        score: "analyst_ready",
        feedback: "The retention guardrail at p=0.09 with lower bound -5.2pp is concerning, not reassuring. At this sample size, p=0.09 may reflect genuine underpowering rather than a null effect. Shipping on 'not significant' when the experiment is near its power limit and the direction is negative is accepting a real risk. The support ticket breach is significant and unexplained. 'Monitor retention post-launch' doesn't retroactively fix shipped harm."
      },
      {
        id: "redesign",
        label: "Do not ship this version. Redesign the checklist to focus on the 3 behaviors that predict retention: create project, add task, invite teammate. Remove gamification steps that don't drive real activation.",
        description: "The checklist structure is the problem — not the concept.",
        score: "staff_level",
        feedback: "This is the complete response. The checklist concept is sound — guided onboarding can improve activation. The execution is wrong: 7 steps including 'enable notifications' and 'set personal preferences' are low-value setup actions that complete quickly and leave no behavioral residue. The redesigned checklist should include only the 3 actions that Loopwise data shows predict 30-day retention. Every step should require genuine product engagement, not a settings toggle. This version of the checklist is teaching users to clear a progress bar."
      }
    ],

    idealDecision: "redesign",
    secondBestDecision: "hold_redesign",

    juniorMistake: "Ships on the 47pp completion lift. Treats the positive activation trend as a win. Doesn't investigate the 4.2-minute median completion time or the week-2 depth decline. Anchored by the 'activation win this quarter' framing.",

    seniorFlags: [
      "The 4.2-minute median completion time is the smoking gun. 7 steps in 4 minutes is not product learning — it's UI clearing. If users were genuinely engaging with each step (creating a real project, adding a real task, actually inviting a colleague), this would take 20+ minutes per account.",
      "The correct comparison for checklist completion is not treatment vs. control — it's completion rate among treatment accounts vs. meaningful activation rate in the same group. If 47% complete the checklist but only 40% achieve meaningful activation, some completers are not actually activating. That's the quality gap.",
      "Week-2 depth declining among week-1 activators is the most diagnostic signal. These are accounts that 'passed' the activation threshold — but their subsequent depth is lower in treatment than control. The checklist directed them through motions that didn't create product habits."
    ],

    staffFlags: [
      "Would have caught this in design by refusing checklist completion as the primary metric. The completion vs. activation gap is predictable before the experiment runs.",
      "Would have added a checklist quality metric: of accounts that completed the checklist, what fraction also achieved meaningful activation? If this rate is lower in treatment than the base activation rate in control, the checklist is actively creating false positives."
    ],

    debrief: `The 47-point checklist completion lift is real, and it means nothing.

Here's why: the control group has no checklist, so the baseline is 0%. Any improvement from 0% to any positive number is a trivially true result. The comparison isn't "47% completed vs. some other completion rate" — it's "47% completed a set of arbitrary setup steps vs. 0% who completed those same steps in a group that never saw them." That tells you nothing about value.

The number that matters is week-1 meaningful activation: +1.9pp, not significant. The checklist improved completion of setup steps without improving the behaviors that actually predict whether a user will still be in the product in 30 days.

The 4.2-minute median completion time is the tell. Seven steps in four minutes is not learning to use a project management tool — it's clicking through a setup wizard. Users are completing the checklist to make it go away. "Enable notifications" and "set personal preferences" take about 8 seconds each. "Using a template" might take 30 seconds if the user just clicks the first template they see. None of these are the same as actually creating a project you care about, adding tasks you need to track, and inviting a colleague who will depend on the tool.

The week-2 depth decline among week-1 activators is the most diagnostic signal in this readout. These are accounts that passed the activation threshold — but they're using the product less deeply in week 2 than their counterparts in control. The checklist directed them through surface-level actions that didn't create the product habits that drive retention.

What should happen: don't ship this. Redesign the checklist to contain only the 3 steps that Loopwise data shows predict 30-day retention — and make each step require genuine product engagement, not a settings toggle. The onboarding checklist as a concept is sound. This specific implementation is teaching users to complete a progress bar.`,

    interviewTakeaway: "Checklist completion is a gameable proxy for activation. Completion psychology (people like to clear progress bars) drives step completion independent of product value. The correct activation metric is the specific set of durable behaviors that predict retention — not task completion in a guided setup flow.",

    relatedConcepts: ["proxy metric", "activation", "retention", "gamification effect", "checklist gaming"],
    scenarioFamily: "proxy_metric",
    tags: ["onboarding", "activation", "checklist", "SaaS", "B2B", "proxy metric"]
  }

];

// ─────────────────────────────────────────────
// UTILITY: get free scenarios
// ─────────────────────────────────────────────
export const freeScenarios = scenarios.filter(s => s.isFree);
export const paidScenarios = scenarios.filter(s => !s.isFree);

// ─────────────────────────────────────────────
// UTILITY: get scenario by id
// ─────────────────────────────────────────────
export const getScenarioById = (id) => scenarios.find(s => s.id === id);
