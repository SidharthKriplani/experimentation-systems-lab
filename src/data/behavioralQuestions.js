export const behavioralQuestions = [
  {
    id: 'BEH01',
    title: 'Changing a PM\'s Mind with Cohort Data',
    subtitle: 'Influence · Data-Driven Persuasion',
    difficulty: 'Mid-level',
    isFree: true,
    tags: ['stakeholder management', 'cohort analysis', 'north star metric', 'A/B testing'],
    category: 'influence',

    prompt: 'Tell me about a time you disagreed with a PM or stakeholder about a key product decision and used data to change their mind.',

    starGuide: {
      situation: 'Set the stage: what was the product, what decision was being made, and what was the PM\'s position? Explain the metric they were optimizing for.',
      task: 'What was your role, and what was at stake if the decision went forward as planned?',
      action: 'This is the most important part. Walk through: how did you identify the problem in the data, how did you frame the conversation, and why did you choose to approach the PM privately first? What analysis did you actually run?',
      result: 'What changed? Did they agree? What was the outcome for the product and for the relationship?',
    },

    strongAnswerMarkers: [
      'Identifies a specific vanity metric vs. north star metric tension',
      'Approaches the PM in a 1:1 before a group setting',
      'Reframes the conversation around shared goal rather than "you\'re wrong"',
      'Runs additional analysis (holdout, cohort) to confirm the hypothesis',
      'Gives the PM credit in the eventual outcome',
    ],

    modelAnswer: {
      situation: 'Our growth team was preparing to ship a new content discovery feature. The PM was excited about the results from an internal preview — impressions were up 40% and click-through on the feature itself was strong. She wanted to move straight to a full rollout in the next sprint. I was doing routine cohort analysis on engagement that week and noticed something the headline metrics weren\'t capturing: session depth — our north star metric for content consumption — was essentially flat in the cohort of users who had been exposed to the new feature, and slightly negative in the 18-34 segment.',
      task: 'My job was to flag this before we committed to the rollout. The feature was already on the sprint plan, the PM had socially committed to it in a leadership sync, and reversing course in a group setting would have been embarrassing for her.',
      action: 'Instead of raising it in the next team standup, I pulled the PM into a quick 1:1 the afternoon before the sprint planning meeting. I framed it not as "your feature doesn\'t work" but as: "I want to show you something I\'m seeing in the cohort data before we finalize tomorrow — I think there\'s a question worth answering first." I walked her through the cohort breakdown: impressions were high because the feature was prominent in the feed, but users who clicked it were not going deeper into the content library. I hypothesized that it was optimizing for top-of-funnel visibility at the cost of session depth. To get a cleaner read, we agreed to run a two-week holdout on 10% of the audience and instrument session depth as an explicit guardrail metric on the scorecard. The holdout confirmed the finding: session depth in the holdout group was statistically flat (p=0.41) while the impression metric looked great.',
      result: 'The PM agreed to delay the rollout and work with the content team on a revised version that tied the discovery feature more directly to curated playlists — which they hypothesized would drive deeper sessions. Session depth moved +3pp in the revised experiment. She also added depth as a permanent guardrail on the experiment scorecard going forward. She later mentioned in a team retro that the early flag saved her from a "good-looking-bad-outcome" launch. The relationship got stronger, not weaker.',
    },

    keyPrinciples: [
      'Lead with the data and the question, not a position. "I\'m seeing something — can we look at this together?" lands better than "I think you\'re wrong."',
      'Persuade in private before advocating in public. Giving the PM space to update their view without losing face is just as important as the data itself.',
      'Give the PM credit in the reframe. The goal is a better product decision, not being right.',
    ],

    antiPatterns: [
      'Raising the concern for the first time in a group meeting or all-hands — this creates defensiveness, not alignment.',
      'Presenting only the opposing data without a clear "here\'s what I suggest we do instead" — data without a recommendation puts all the burden on the PM.',
    ],
  },

  {
    id: 'BEH02',
    title: 'Delivering a Metric Miss Before the QBR',
    subtitle: 'Communication · Delivering Bad News',
    difficulty: 'Mid-level',
    isFree: true,
    tags: ['stakeholder communication', 'OKRs', 'early signaling', 'executive communication'],
    category: 'communication',

    prompt: 'Tell me about a time you had to deliver bad news to a stakeholder or leadership — a metric miss, a failed experiment, or a launch that underperformed.',

    starGuide: {
      situation: 'What was the expected outcome, and what actually happened? When did you find out the metric was going to miss?',
      task: 'What was your responsibility in this situation — were you the analyst, the DS lead, the person who ran the experiment?',
      action: 'The meat is here: did you wait for the scheduled review or did you proactively signal early? How did you structure the message? Did you come with just the bad news or with a framing and recommendation?',
      result: 'How did leadership react? What did the team do differently afterward? What did this do for your credibility?',
    },

    strongAnswerMarkers: [
      'Surfaces the problem proactively rather than waiting for the scheduled review',
      'Frames the message as "here\'s what the data shows, here\'s what we know about why, here\'s what I recommend"',
      'Comes with a clear recommendation for next steps — not just the bad news',
      'Treats it as a learning moment, not a failure to minimize',
      'Mentions the trust-building effect of early signaling',
    ],

    modelAnswer: {
      situation: 'At the end of Q2, we were tracking to miss our primary engagement OKR — daily active content consumers — by about 15%. The miss was tied to a content feature launch that had shipped in week 4 of the quarter. I was the analytics lead for the content team, and I was running weekly cohort reports. By week 7 of the quarter, I could see from the early cohort trajectory that we were not going to recover to target by the end of the quarter — there simply wasn\'t enough time. The official QBR was three weeks away.',
      task: 'I had a choice: wait for the QBR, where leadership would see the miss live in a slide deck in front of 20 people, or get ahead of it. My instinct was that the worst outcome wasn\'t missing the metric — it was the surprise.',
      action: 'I put together a brief pre-read and asked for 20 minutes with the VP of Product and the content lead the following morning. I structured it in three parts: first, "here\'s what the data shows" — the miss, the magnitude, the timeline. Second, "here\'s what we understand about why" — the content feature drove top-of-funnel numbers but not retention in the second week of the cohort, which we now believed was a novelty effect. Third, "here\'s what I recommend we do this quarter and in Q3" — pause the content feature expansion, run a focused experiment on week-2 retention hooks, and add a second-week cohort retention rate as a leading indicator on the Q3 OKR dashboard so we\'d catch this pattern earlier. I was explicit that I was still refining the "why" analysis and would have a fuller picture in 48 hours.',
      result: 'The VP\'s response was: "I appreciate you bringing this to me now instead of at the QBR." The miss was still reported at the QBR, but the team came in with a clear diagnosis and a Q3 plan already drafted — which landed very differently than a surprise. The week-2 retention hook experiment in Q3 showed a +5pp improvement. The pre-read format became standard practice on the team for any projected OKR miss.',
    },

    keyPrinciples: [
      'Never let a metric miss be a surprise. The cost of a surprise at a QBR is much higher than the cost of a difficult conversation three weeks early.',
      'Early signaling builds trust faster than perfect results. Leaders remember who gave them time to react.',
      'Come with a "here\'s what we do next" recommendation. Bad news plus a plan is a problem to solve; bad news alone is just bad news.',
    ],

    antiPatterns: [
      'Waiting until the scheduled review to surface a miss that was visible weeks earlier — this reads as either oblivious or politically motivated.',
      'Delivering the bad news without any analysis of why it happened — a metric number without a hypothesis is almost useless to a leader.',
    ],
  },

  {
    id: 'BEH03',
    title: 'Finding the Leaky Bucket Behind Flat DAU',
    subtitle: 'Data Impact · Proactive Insight',
    difficulty: 'Mid-level',
    isFree: false,
    tags: ['proactive analysis', 'DAU/MAU', 'cohort analysis', 'acquisition quality', 'dashboard'],
    category: 'data-impact',

    prompt: 'Tell me about a time you identified a significant metric anomaly or insight that the team or leadership had missed — and what impact it had.',

    starGuide: {
      situation: 'What were you doing (routine monitoring, ad-hoc analysis, etc.) and what caught your attention? What was everyone else focused on?',
      task: 'What was the gap between what people were measuring and what you believed was actually happening?',
      action: 'Walk through the analysis: how did you confirm the anomaly, how did you segment it, and how did you frame it for the team? Did you come with just the observation or with a hypothesis about the cause?',
      result: 'What changed as a result of surfacing this insight? Was there a product change, a metric change, a strategic shift?',
    },

    strongAnswerMarkers: [
      'Identifies a metric that was hidden in averages or not on the existing dashboard',
      'Uses cohort segmentation to pinpoint where the problem is concentrated',
      'Frames the insight as a business risk, not just an analytical observation',
      'Comes to the team with a hypothesis about the cause, not just the anomaly',
      'Result includes either a product change, a channel mix change, or a new metric added to the dashboard',
    ],

    modelAnswer: {
      situation: 'I was doing weekly metric monitoring on our growth dashboard. DAU was growing — up 8% over six weeks — and that\'s where leadership attention was focused. During a routine pass, I noticed that DAU/MAU ratio (stickiness) had declined from 22% to 19% over the same period. That\'s a 3-percentage-point drop, which sounds small, but embedded in growing DAU numbers it was essentially invisible. Nobody had a chart for it; it had to be computed manually from two separate tables.',
      task: 'I wanted to understand whether the stickiness decline was a product problem or an acquisition mix problem, because the remedy is completely different. If it\'s a product problem, you fix retention mechanics. If it\'s an acquisition problem, you fix channel mix. My job was to diagnose which it was before bringing it to leadership.',
      action: 'I pulled a cohort breakdown by acquisition channel — paid social, paid search, organic search, and referral. The stickiness decline was almost entirely concentrated in users acquired via paid social (DAU/MAU down from 21% to 16%) while organic and referral cohorts were flat or slightly improving. I ran a second cut: paid social volume had increased 35% over the same period — the team had doubled down on paid acquisition to hit the DAU target. In the weekly metrics review, I presented it this way: "We\'re growing DAU by filling the top of the funnel with paid social users who churn at higher rates. We\'re building a leaky bucket. The stickiness number shows we\'re working twice as hard to stay in place on retained users." I brought a clear exhibit: two lines on one chart — DAU (going up) and DAU/MAU by channel (paid social line going down, organic line flat).',
      result: 'Leadership agreed to add a stickiness guardrail to the OKR dashboard going forward, so it couldn\'t be hidden by raw DAU growth again. The growth team shifted paid acquisition budget from paid social toward interest-based targeting with higher historic retention rates. Over the next two quarters, DAU/MAU stabilized back above 21%. The more lasting impact was the dashboard change — the metric became a standard weekly indicator.',
    },

    keyPrinciples: [
      'Surface what people aren\'t measuring, not just what they\'re monitoring. The most important insights are usually off the dashboard.',
      'Frame the insight as a business risk, not an analytical observation. "We\'re building a leaky bucket" lands differently than "stickiness is declining."',
      'Bring a hypothesis about the cause alongside the finding. An anomaly without a hypothesis just creates anxiety; an anomaly plus a plausible cause gives people something to act on.',
    ],

    antiPatterns: [
      'Presenting the anomaly without any segmentation or hypothesis — "DAU/MAU is down" tells you there\'s a problem but not where to look.',
      'Framing it as a "here\'s an interesting data fact" rather than a "here\'s a risk to our OKR" — the framing determines whether people act.',
    ],
  },

  {
    id: 'BEH04',
    title: 'Stopping a False-Positive A/B Launch Before All-Hands',
    subtitle: 'Conflict · Protecting Analytical Integrity',
    difficulty: 'Senior',
    isFree: false,
    tags: ['experiment design', 'statistical power', 'false positive', 'pushback', 'stakeholder conflict'],
    category: 'conflict',

    prompt: 'Tell me about a time you had to push back on a poorly designed experiment or a conclusion being drawn from flawed analysis.',

    starGuide: {
      situation: 'What was the experiment or analysis, and what conclusion was about to be communicated — and to whom?',
      task: 'What did you spot that others had missed? What was the risk of letting it go forward?',
      action: 'Most important: how did you flag it, to whom, and when? How did you frame the pushback to make it a collaboration, not a confrontation? What specific analysis did you do to demonstrate the flaw?',
      result: 'Did the announcement get stopped or modified? What happened when the experiment was re-run correctly? What was the impact on the team\'s analytical standards?',
    },

    strongAnswerMarkers: [
      'Flags the problem privately and early — not in a public meeting',
      'Identifies a specific statistical flaw (underpowered test, tracking anomaly, short runtime)',
      'Runs the power calculation to demonstrate the problem concretely',
      'Reframes pushback as "here\'s how we make this more defensible" rather than "you got it wrong"',
      'The re-run experiment produces a different or null result — validating the concern',
    ],

    modelAnswer: {
      situation: 'The growth team had been running an A/B test on a new checkout flow redesign for about 4 days. The results showed a +4% lift in conversion rate with p=0.03, and the growth lead was planning to announce the "successful launch" in the following day\'s company all-hands. I was reviewing the experiment as part of a cross-team analytics review process we\'d recently introduced.',
      task: 'I had 48 hours before the all-hands to either flag it or let it go. The risk of letting it go was significant: if we shipped the redesign based on a false positive and conversion reverted to baseline post-launch, we\'d have a much harder time explaining the miss — and it would undermine confidence in the entire experimentation program.',
      action: 'I went straight to the growth lead — not to the experiment team\'s manager and not in the public review thread. I asked if we could look at the experiment together for 20 minutes. I walked through three things: First, the runtime. At our traffic volumes, detecting a true 4% lift at 80% power required at minimum 14 days — I showed the power calculation in a notebook. We had run it for 4. Second, the sample size. The confidence interval at day 4 was wide enough that the true effect could plausibly be anywhere from -1% to +9%. Third, a tracking anomaly. Day 2 of the experiment had a spike in treatment-side conversions that looked like a tag-firing issue — removing that day moved the lift estimate from +4% to +2.5% and p from 0.03 to 0.09. My suggestion to the growth lead: "We can announce this as a very promising early signal in the all-hands — which it genuinely is — and say we\'re running the full test to confirm before shipping. That\'s actually a better story: it shows we have the rigor to not jump on early results."',
      result: 'The growth lead agreed immediately. The all-hands announcement became "early signal looks strong, full test in progress." The experiment was re-run with the correct runtime. The final result was a 1.1% lift, p=0.18 — statistically inconclusive. The redesign was not shipped. More durably: the growth team added a power calculation requirement to their experiment kick-off template, and we established a 48-hour review window before any experiment results could be announced externally.',
    },

    keyPrinciples: [
      'Protecting the team from bad conclusions is not criticism — it\'s the job. Framing it as "here\'s how we make this more defensible" makes you an ally, not an obstacle.',
      'Timing matters: private flag early beats public correction late. Once a result is announced, reversing it is much harder and more damaging than preventing the announcement.',
      'Come with a concrete alternative framing for the stakeholder. "Here\'s what you can say instead" is as important as "here\'s what you shouldn\'t say."',
    ],

    antiPatterns: [
      'Raising the concern in the review thread or Slack channel where the growth team lead would be publicly corrected — this creates defensiveness and makes it about ego, not the data.',
      'Flagging the issue without the power calculation or tracking evidence — "I don\'t think this test ran long enough" without numbers is just an opinion.',
    ],
  },

  {
    id: 'BEH05',
    title: 'Getting Engineering Buy-In Without Escalation',
    subtitle: 'Leadership · Cross-Functional Influence',
    difficulty: 'Senior',
    isFree: false,
    tags: ['cross-functional', 'influence without authority', 'data engineering', 'prioritization', 'stakeholder alignment'],
    category: 'leadership',

    prompt: 'Tell me about a time you had to influence a decision without having direct authority — you needed something from another team.',

    starGuide: {
      situation: 'What did you need from another team, and why were they not already prioritizing it? What was the competing pressure on their side?',
      task: 'What was at stake for your work if you couldn\'t get this done? And why couldn\'t you just escalate?',
      action: 'The heart of the answer: how did you make the ask? Did you quantify the value? Did you make it easy for them to say yes? Did you give them co-ownership? How did you avoid the trap of escalating first?',
      result: 'What was the outcome? Did they reprioritize? How did the relationship change?',
    },

    strongAnswerMarkers: [
      'Quantifies the business value of the ask in terms the other team cares about',
      'Writes a one-pager or structured ask rather than a Slack message',
      'Gives the other team co-ownership or credit — not just a task',
      'Explicitly avoids escalating to their manager as a first move',
      'The relationship is stronger after the ask, not transactional',
    ],

    modelAnswer: {
      situation: 'I needed our data engineering team to implement a new event-level tracking schema for a critical retention experiment I was designing. The experiment would measure the impact of a new onboarding flow on 30-day retention, and without the new events, I\'d have to use a proxy metric that was a much weaker signal. The DE team had a full backlog — they were in the middle of a warehouse migration — and my request was sitting at spot 14 in their queue. At our current velocity, that meant a 5-sprint delay, which would push the experiment out of the quarter entirely.',
      task: 'If the experiment slipped out of the quarter, we\'d miss the retention learning window that was tied to a product decision the leadership team needed to make by Q3 planning. I couldn\'t just wait. But I also didn\'t want to escalate to the DE manager or their VP — that would create resentment and make the DE team feel like I was going over their heads for routine work.',
      action: 'I spent an afternoon writing a one-pager: the specific tracking ask (5 new events, estimated 3 engineering days of work), the business value in concrete terms (the experiment was designed to detect a 5pp improvement in 30-day retention; at current scale, a confirmed 5pp improvement was worth approximately $300k in incremental annual subscription revenue), and the cost of delay (experiment slips out of quarter, Q3 product roadmap decision made without data). I also mapped out the alternative: if we couldn\'t get the full tracking, I offered a reduced-scope version that could be implemented in 1 day and would give us a weaker but usable signal. Then I set up a 30-minute working session with the DE lead — not to ask for their approval, but to walk through the experiment design together and get their input on the instrumentation approach. I asked them explicitly: "I want your fingerprints on how we track this — you\'ll catch things I won\'t." They flagged a deduplication edge case I\'d missed, which they would have had to fix anyway post-launch.',
      result: 'The DE lead re-slotted the work from sprint 5 to sprint 2, prioritizing the reduced-scope version first and the full schema in the sprint after. The experiment launched on time. The DE lead mentioned in a team retro that the one-pager was the clearest ask they\'d received from analytics that quarter. The relationship became more collaborative — they started flagging schema decisions to me proactively in subsequent sprints.',
    },

    keyPrinciples: [
      'Influence starts with making the other team\'s work feel meaningful, not with escalation. People prioritize work they\'re invested in, not work they were told to do.',
      'Make the ask specific and the value quantified. A one-pager with a dollar value is much harder to deprioritize than a Jira ticket with "high priority."',
      'Give the other person a win too — credit, co-ownership, or a problem to solve. The DE team\'s deduplication catch made the tracking better and gave them a stake in the outcome.',
    ],

    antiPatterns: [
      'Leading with escalation to the other team\'s manager — this gets the work done once and poisons the relationship for every future ask.',
      'Framing the ask as urgent without explaining why — "this is a blocker" without a business case reads as your problem, not their priority.',
    ],
  },

  {
    id: 'BEH06',
    title: 'When Time-Spent Going Down Was Actually Good',
    subtitle: 'Data Impact · Counter-Intuitive Experiment Results',
    difficulty: 'Senior',
    isFree: false,
    tags: ['experiment interpretation', 'heterogeneous treatment effects', 'user segmentation', 'north star metric', 'personalization'],
    category: 'data-impact',

    prompt: 'Tell me about a time an experiment or analysis you ran had an unexpected or counter-intuitive result — how did you handle it?',

    starGuide: {
      situation: 'What was the experiment and what did you expect to happen? What was the actual result, and why was it surprising?',
      task: 'What pressure was there to either dismiss the result or declare it a failure? What was your responsibility in the interpretation?',
      action: 'This is the key part: what did you do before drawing a conclusion? Did you check for heterogeneous treatment effects? Did you look at secondary metrics? Did you generate a competing hypothesis and test it?',
      result: 'What was the final interpretation? Was the feature shipped? What was the impact of getting the interpretation right rather than reacting to the surface-level number?',
    },

    strongAnswerMarkers: [
      'Resists the first-instinct explanation (the model is broken, the tracking is wrong)',
      'Checks for heterogeneous treatment effects by user segment',
      'Generates a testable hypothesis for the unexpected result',
      'Identifies the right metric for the actual user value (not just the one that moved)',
      'The correct interpretation leads to a ship or a correct no-ship rather than a default reaction',
    ],

    modelAnswer: {
      situation: 'We shipped a feed personalization model designed to improve content relevance. The north star metric for this experiment was time spent in the content feed. When we read out the results, time spent was down 8% in the treatment group, p<0.001. The effect was clear and statistically strong. The team\'s immediate reaction was: the model is broken, we need to roll it back.',
      task: 'I was the DS lead on the experiment. Before we called it a failure and rolled back, I wanted to make sure we understood what was actually happening, because the effect size was very clean — it didn\'t look like noise or a tracking bug. A clean negative effect on an important metric is interesting, not just bad.',
      action: 'I asked for 48 hours before any rollback decision. First, I checked for a tracking anomaly — session lengths in control and treatment were internally consistent, so that wasn\'t it. Second, I ran a heterogeneous treatment effects cut by user engagement tier: casual users (bottom 40% by weekly sessions), regular users (middle 40%), and power users (top 20%). The time-spent decline was entirely concentrated in casual users (-12%) while power users actually showed a modest increase (+6%). Hypothesis: the personalization model was making casual users realize faster that they\'d seen all the content relevant to them — efficient exploration rather than passive scrolling. For casual users, shorter sessions might mean satisfied intent, not disengagement. To test this, I pulled day-30 retention for each tier in treatment vs. control. Casual users in treatment showed 4pp higher day-30 retention than control. They were coming back more, not less. The personalization was compressing session length while improving return frequency.',
      result: 'We shipped the model with a nuanced framing for the leadership presentation: "Session length is down for casual users, which our analysis suggests reflects more efficient content discovery rather than disengagement — day-30 retention is 4pp higher in the same cohort." The team also updated the experiment scorecard to include both session length and return frequency as co-primary metrics for personalization experiments going forward, since session length alone was not capturing the right user value in this feature class.',
    },

    keyPrinciples: [
      'Unexpected results are hypotheses, not conclusions. A clean effect in the "wrong" direction is often telling you something real about user behavior.',
      'Always check heterogeneous treatment effects before calling a result counter-intuitive. The aggregate can mask opposite effects across segments.',
      'Know which metric is the right one for the actual user value you\'re creating. Session length is a proxy — return frequency and long-term retention are closer to the actual value for a personalization feature.',
    ],

    antiPatterns: [
      'Immediately assuming a surprising negative result is a bug or a measurement error — the first instinct should be to understand it, not dismiss it.',
      'Looking only at the primary metric and missing the secondary metrics that tell the fuller story.',
    ],
  },

  {
    id: 'BEH07',
    title: 'Revenue Forecast from 3 Weeks of Incomplete Data',
    subtitle: 'Leadership · Decision-Making Under Uncertainty',
    difficulty: 'Senior',
    isFree: false,
    tags: ['incomplete data', 'scenario analysis', 'confidence intervals', 'cohort maturity', 'executive communication'],
    category: 'leadership',

    prompt: 'Tell me about a time you had to make a recommendation with incomplete or imperfect data — and how you handled the uncertainty.',

    starGuide: {
      situation: 'What decision needed to be made, and what data was available vs. what was needed for a confident answer? What was the time pressure?',
      task: 'What was the risk of waiting for better data? What was the risk of acting on incomplete data?',
      action: 'How did you structure the analysis under uncertainty? Did you build scenarios? Did you explicitly quantify your confidence level? How did you communicate what you knew vs. what you didn\'t know?',
      result: 'What decision was made? How did it play out? What did this demonstrate about how to handle ambiguity?',
    },

    strongAnswerMarkers: [
      'Builds a range estimate (low/mid/high) rather than a false-precision point estimate',
      'Explicitly labels the confidence level and what would move the estimate toward each scenario',
      'Identifies leading indicators that would signal which scenario was materializing',
      'Frames the recommendation as provisional with a named update trigger',
      'The decision-maker is able to act with calibrated uncertainty rather than paralysis',
    ],

    modelAnswer: {
      situation: 'We had launched a new premium tier feature in month 1 of the quarter. At week 3, the VP of Finance needed a revenue impact estimate to feed into a mid-year board update. The problem: subscription cohort maturity — the revenue signal we trusted most — required at least 8 weeks of data to be reliable. We had 3 weeks. The early activation rate looked good, but the critical variable was week-6 to week-8 upgrade-to-paid conversion, which we simply hadn\'t observed yet.',
      task: 'I had to give the VP something useful without overstating my confidence. A false-precision point estimate that turned out to be wrong would be worse than an honest range — especially in a board context.',
      action: 'I built three scenarios based on the week-3 leading indicators I did have: low case (week-3 activation rate extrapolated using the retention decay curve from our last two feature launches, with no conversion rate improvement), mid case (week-3 activation sustained at current rate, conversion rate in line with our historical average for comparable premium features), and high case (activation rate maintained, conversion rate at the top quartile of our comparable launches). Each scenario had a revenue figure, a probability weight I assigned based on current data, and — most importantly — a list of the 2-3 early indicators I\'d watch over the next 3 weeks that would tell me whether we were tracking to mid or low case. I presented it as: "Based on 3-week early cohort data, my mid-case estimate is $X, but I\'m calling this provisional until week 8. Here are the three things I\'ll be watching — if [indicator A] shows the pattern from the high case by week 5, I\'ll revise upward. If [indicator B] declines, I\'ll revise to the low case." I included a simple one-page chart with the three lines and the current tracking dot.',
      result: 'The VP went to the board with the mid-case estimate clearly labeled as "week-3 provisional, 8-week confirmation coming." The board appreciated the transparency — the CFO specifically commented that the scenario framing was more useful than a single number. By week 8, the actual result came in at 94% of the mid-case estimate. The provisional-with-indicators approach became the standard template for early-stage revenue estimates across the team.',
    },

    keyPrinciples: [
      '"Incomplete data" is the normal state. The job is to be precise about what you know and don\'t know — not to wait for perfect data that rarely arrives.',
      'Scenario ranges with explicit confidence levels and named update triggers are more useful than point estimates. They give the decision-maker something to act on and something to watch.',
      'Communicate uncertainty as structure, not as hedging. "I don\'t know" is unhelpful; "here\'s my estimate, here\'s my confidence level, and here\'s what would change it" is useful.',
    ],

    antiPatterns: [
      'Refusing to provide an estimate until the data is mature — the decision often can\'t wait, and "I don\'t have enough data" with no alternative is not an answer.',
      'Providing a single point estimate without confidence bounds — in an early-stage analysis, false precision is more damaging than an honest range.',
    ],
  },

  {
    id: 'BEH08',
    title: 'Explaining a Novelty Effect to a CPO with an Analogy',
    subtitle: 'Communication · Technical Concept Translation',
    difficulty: 'Any level',
    isFree: false,
    tags: ['non-technical communication', 'novelty effect', 'experiment design', 'analogy', 'executive communication'],
    category: 'communication',

    prompt: 'Tell me about a time you had to communicate a complex technical concept (like causal inference, experiment design, or a statistical method) to a non-technical audience.',

    starGuide: {
      situation: 'Who was the audience, what was the technical concept, and why did they need to understand it to make a good decision?',
      task: 'What was the risk of them not understanding it — would they make a wrong decision, ship something prematurely, or misinterpret a result?',
      action: 'The answer lives here: how did you translate the concept? Did you use an analogy? A visual? Did you test whether they understood before moving on? What did you choose NOT to explain (equally important)?',
      result: 'Did they understand? What decision did they make? Was it the right one? What did this interaction change about how you communicate technical ideas?',
    },

    strongAnswerMarkers: [
      'Uses a concrete analogy grounded in everyday experience, not a domain-specific metaphor',
      'Pairs the analogy with a visual (chart, diagram) for reinforcement',
      'Does not hide the uncertainty — frames it as "here\'s what we\'d need to be confident"',
      'The non-technical person makes a better decision as a result of understanding the concept',
      'Does not over-explain — removes technical jargon rather than defining it',
    ],

    modelAnswer: {
      situation: 'We had shipped a feed personalization feature and the 7-day experiment results showed a +5% lift in daily engagement. The CPO was excited and ready to declare success and move to full rollout. I was concerned about a novelty effect — users often interact more with a new UI element in the first week simply because it\'s new, but that engagement boost decays back to baseline as the novelty wears off. The CPO had a strong engineering background but was not deep on experiment methodology, and the term "novelty effect" wasn\'t landing.',
      task: 'If we shipped based on the 7-day lift without checking for decay, we risked a scenario where we\'d announced a 5% engagement improvement that disappeared three weeks after the rollout — which would be confusing and damaging to the team\'s credibility on experimentation. I needed the CPO to agree to a 30-day measurement window before announcing the result.',
      action: 'I tried explaining the novelty effect technically first — "the treatment effect may be partially driven by exposure novelty that decays over time" — and watched the CPO\'s eyes glaze. I stopped and started over with an analogy: "Think about the last time you rearranged your living room furniture. For the first week, you notice the room constantly — you\'re more aware of it, you might sit in different spots, you engage with the space differently. That heightened attention decays after a week or two, and you\'re back to your normal patterns. We\'re seeing the same pattern in feed interactions. Users in the first week are engaged partly because the feed is new — it\'s the furniture rearrangement effect. What we need to see is whether the engagement is still up at week 4, after the novelty has worn off." I then showed a single chart: week-by-week engagement for the same users, with a dotted line at week 1 and week 4, and pointed to two previous experiments where a similar 7-day lift had decayed to near-zero by week 4. I kept it to two exhibits and one analogy.',
      result: 'The CPO said immediately: "Oh — we\'re measuring the excitement of trying new furniture, not whether they actually like the new layout better." He agreed to extend the measurement window to 30 days before the full rollout announcement. The 30-day result showed the lift had compressed from +5% to +2.1% — still positive and worth shipping, but not the headline number we would have announced prematurely. The CPO later used the furniture analogy himself in a product review to explain why a different team\'s 7-day experiment wasn\'t sufficient to call a win.',
    },

    keyPrinciples: [
      'Analogies beat technical explanations for non-technical audiences. The goal is for them to build an intuition, not to pass a statistics exam.',
      'Visual plus verbal together beats either alone. The chart anchors the analogy in real data so it\'s not just a story.',
      'Don\'t hide the uncertainty — frame it as "here\'s what we\'d need to be confident." This builds credibility and gives the audience a clear action to take.',
    ],

    antiPatterns: [
      'Defining technical jargon rather than replacing it — saying "novelty effect, which means..." is still harder to internalize than a concrete analogy.',
      'Over-explaining to the point where the audience loses the thread — pick one analogy, one visual, and stop.',
    ],
  },
];
