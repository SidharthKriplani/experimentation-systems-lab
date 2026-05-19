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

  // ─────────────────────────────────────────────
  // Q09 — Pushback from a More Senior Person
  // ─────────────────────────────────────────────
  {
    id: 'Q09',
    title: 'A Senior Director Publicly Dismissed Your Analysis. What Did You Do?',
    subtitle: 'Conflict · Analytical Integrity Under Pressure',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Tell me about a time when someone more senior than you publicly dismissed or challenged your analysis in a meeting. How did you handle it?',
    whatTheyreReallyAsking: 'Can you maintain analytical integrity under social pressure without becoming confrontational or backing down when you were right? How do you disagree up without career self-sabotage?',
    storyFramework: {
      situation: 'A director or VP challenged your finding in a meeting — in front of others, creating social pressure to agree with them.',
      behavior: 'You acknowledged their perspective, asked clarifying questions to understand the source of disagreement, stood your ground on the data points you were confident in, and offered to reconcile the gap privately or with a follow-up analysis.',
      outcome: 'The analysis held up. You either found a nuance that improved your conclusion, or confirmed the original finding — either way, the disagreement led to a better outcome than if you\'d capitulated immediately.',
    },
    strongSignals: [
      'Distinguishes between "they have more context" (valid reason to update) vs. "they have more authority" (not a valid reason to update)',
      'Asks questions to understand the source of disagreement rather than defending or caving immediately',
      'Separates the meeting moment (graceful, non-confrontational) from the resolution (private follow-up with evidence)',
      'Can articulate what they would have done differently with hindsight',
    ],
    weakSignals: [
      'Immediately backed down because of seniority — no interrogation of whether the senior person was actually right',
      'Became confrontational or emotional in the moment',
      'Spent the story describing the senior person\'s unreasonableness rather than their own behavior',
      'Resolution was the senior person being "proved wrong" with no learning or nuance',
    ],
    keyPrinciples: [
      'Data doesn\'t care about seniority. Your job is to get to the right answer, not to win the argument — and those are different goals.',
      'In the moment, your goal is to de-escalate and create space for resolution: "That\'s a really interesting point — can you help me understand what data is informing your view? I want to make sure I\'m not missing something."',
      'After the moment: private follow-up with specific evidence is far more effective than a public debate. Most senior people are more open to being wrong in private than in front of others.',
    ],
    antiPatterns: [
      'Treating seniority as a signal that the senior person is more likely to be analytically correct — experience doesn\'t equal data access',
      'Framing the story as a battle you won rather than a disagreement you resolved constructively',
      'Using vague language like "I pushed back" without describing specifically what you said and how you said it',
    ],
  },

  // ─────────────────────────────────────────────
  // Q10 — Analysis That Changed a Major Decision
  // ─────────────────────────────────────────────
  {
    id: 'Q10',
    title: 'Tell Me About Analysis That Changed a Major Product or Business Decision.',
    subtitle: 'Data Impact · Analysis-to-Action',
    difficulty: 'analyst',
    isFree: false,
    prompt: 'Describe a time when your analysis directly changed a significant product or business decision. What was the decision, what did you find, and what happened as a result?',
    whatTheyreReallyAsking: 'Do you do analysis that matters, or analysis that people read and move on from? Can you connect your work to outcomes? Do you understand the difference between analysis and impact?',
    storyFramework: {
      situation: 'A decision was pending or had been made — and your analysis introduced information that changed the direction.',
      behavior: 'You identified the right question, ran the analysis with appropriate rigor, communicated the finding in a way the decision-maker could act on, and advocated for the implication without just presenting the data.',
      outcome: 'The decision changed in a specific, measurable way. The outcome of that decision can be described — even if it\'s "we didn\'t ship the feature and avoided a bad outcome."',
    },
    strongSignals: [
      'Can name a specific decision, a specific analysis, and a specific outcome — not a general description of "influencing strategy"',
      'The analysis uncovered something non-obvious, not just confirmed what everyone expected',
      'The candidate advocated for an implication, not just presented data',
      'Understands why the analysis was influential: the right framing, the right audience, the right timing',
    ],
    weakSignals: [
      'Vague: "I did analysis that helped the team make better decisions"',
      'The decision was minor (changing a button color, adjusting a metric threshold)',
      'The analysis just confirmed existing belief — no surprise or contrary finding',
      'The candidate presented the data and "let the team decide" without a recommendation',
    ],
    keyPrinciples: [
      'The difference between analysis and impact is a recommendation. Data says "here is what happened." Impact says "here is what I think we should do and why." Presenting data is not influence — advocating for an implication is.',
      'Influential analysis often sounds like: "The data shows X. The conventional interpretation is Y. But I think the right interpretation is Z, and here\'s why." That deviation from conventional wisdom is what makes analysis memorable.',
      'Timing matters as much as content. The same analysis delivered before a decision is made is 10x more influential than the same analysis delivered after.',
    ],
    antiPatterns: [
      'Confusing data presentation with influence — shipping a dashboard that people use to make decisions is not the same as doing analysis that changed a specific decision',
      'Describing the analysis methodology in detail while being vague about the outcome',
      'Crediting the team or PM for the decision without demonstrating your specific contribution',
    ],
  },

  // ─────────────────────────────────────────────
  // Q11 — Disagreeing With PM or Eng Direction
  // ─────────────────────────────────────────────
  {
    id: 'Q11',
    title: 'Tell Me About a Time You Disagreed With the Product Roadmap Direction.',
    subtitle: 'Cross-Functional Influence · Product Judgment',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a time when you disagreed with the direction a PM or engineering team was taking. What did you disagree with, how did you raise it, and what happened?',
    whatTheyreReallyAsking: 'Do you have strong product instincts and the courage to advocate for them? Can you influence without authority? Do you know when to accept a decision you disagree with and move forward?',
    storyFramework: {
      situation: 'A PM, engineering lead, or cross-functional team was committed to a direction you believed was analytically or strategically wrong.',
      behavior: 'You didn\'t just raise a concern — you came with a counter-hypothesis and data. You chose the right moment and forum. You made the case once, clearly. And either changed the direction or, if you didn\'t, accepted the decision and committed to executing it.',
      outcome: 'Either the direction changed (and the outcome validates your concern), or it didn\'t change (and you describe what you learned about influence, or what the outcome showed about whether you were right).',
    },
    strongSignals: [
      'Had a specific analytical disagreement with a specific claim — not just a "feeling" the decision was wrong',
      'Came with data and a counter-hypothesis, not just an objection',
      'Chose the right forum (1:1 before the meeting, not a public challenge)',
      'Can describe what happened after — either the outcome validated their concern or they accepted the decision professionally',
    ],
    weakSignals: [
      'Disagreed on vibes or strategic intuition without specific data',
      'Raised the concern publicly in a way that created conflict',
      'Unable to accept that the decision went against them — still relitigating it in the interview',
      'The story is mostly about being right and the other person being wrong, with no nuance',
    ],
    keyPrinciples: [
      'Influence without authority is built on: (1) being right frequently enough that people trust your instincts, (2) raising concerns in private before public forums, (3) presenting a counter-hypothesis with evidence rather than just objecting, (4) knowing when to commit after being heard.',
      '"Disagree and commit" is not capitulation — it means you made your case, you were heard, and you now own the execution of the agreed-upon decision even though you preferred something else. That\'s professionalism.',
      'The quality of your disagreement is measured by whether you moved people or generated data. If you raised a concern, were ignored, and turned out to be right — you failed at influence, not at analysis.',
    ],
    antiPatterns: [
      'Framing the story as "I was right and they were wrong" with no acknowledgment of the other side\'s reasoning',
      'Never accepting the decision — continuing to raise the same objection after the decision was made',
      'Disagreeing on strategic vision or business priorities without any analytical basis',
    ],
  },

  // ─────────────────────────────────────────────
  // Q12 — Handling Ambiguous or Incomplete Data
  // ─────────────────────────────────────────────
  {
    id: 'Q12',
    title: 'Tell Me About a Time You Had to Make a Decision With Incomplete Data.',
    subtitle: 'Decision-Making · Uncertainty Management',
    difficulty: 'analyst',
    isFree: false,
    prompt: 'Describe a situation where you had to provide a recommendation or make a data-driven decision despite having incomplete, conflicting, or unreliable data. How did you proceed?',
    whatTheyreReallyAsking: 'Can you operate under uncertainty without being paralyzed? Do you know how to bound the uncertainty, make assumptions explicit, and communicate confidence levels? Can you distinguish between "needs more data before deciding" and "enough to act on with stated uncertainty"?',
    storyFramework: {
      situation: 'A decision was pending, the data was incomplete or unreliable, and waiting for perfect data wasn\'t an option.',
      behavior: 'You explicitly bounded what you knew vs. didn\'t know, stated your assumptions, estimated the confidence interval on your conclusion, and recommended action while being clear about the conditions under which you\'d update your recommendation.',
      outcome: 'The recommendation was acted on. Either the incomplete data was good enough (the decision held up) or the stated assumptions were wrong and the recommendation was updated accordingly.',
    },
    strongSignals: [
      'Can distinguish between "not enough data to act" and "enough data to act with stated confidence" — these are different from "not enough data to act without stated confidence"',
      'Made assumptions explicit before making conclusions',
      'Recommended a specific action with a specific confidence level, not "it depends" or "we need more data"',
      'Built in a review trigger: "I\'d revisit this if X changes"',
    ],
    weakSignals: [
      'Always waited for complete data before making any recommendation',
      'Provided a recommendation without flagging the incompleteness or assumptions',
      'Confused "incomplete data" with "bad data" — different problems requiring different responses',
      'The story is about requesting more data, not making a decision under uncertainty',
    ],
    keyPrinciples: [
      'The right response to incomplete data is not a better analysis — it\'s an explicit uncertainty statement. "Based on X data with Y assumption, my best estimate is Z, and I\'d expect this to be wrong if A happens."',
      'Senior analysts are valuable not because they have perfect data but because they can make better decisions with imperfect data than junior analysts can. That skill is the whole job at high seniority.',
      'The cost of waiting for perfect data is always non-zero. Someone with a decision to make will make it with or without your analysis. Your job is to reduce their uncertainty, not to guarantee the right answer.',
    ],
    antiPatterns: [
      'Treating "I recommended we wait for more data" as a good outcome — sometimes it is, but it shouldn\'t be the default response to ambiguous data',
      'Not naming the specific assumptions that made the incomplete data actionable',
      'Confusing confidence in the analysis with confidence in the outcome',
    ],
  },

  // ─────────────────────────────────────────────
  // Q13 — Building a Metric From Scratch
  // ─────────────────────────────────────────────
  {
    id: 'Q13',
    title: 'Tell Me About a Metric You Built From Scratch That the Team Adopted.',
    subtitle: 'Metric Design · Organizational Influence',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a situation where you designed a new metric that your team or organization started using to make decisions. What was the problem with existing metrics, what did you build, and how did it get adopted?',
    whatTheyreReallyAsking: 'Do you think critically about existing measurement frameworks? Can you design metrics that are precise, actionable, and resistant to gaming? Do you understand the organizational work required to make a new metric stick?',
    storyFramework: {
      situation: 'The existing metric was imprecise, gameable, or measuring the wrong thing — and this was causing misaligned decisions.',
      behavior: 'You diagnosed the problem with the existing metric, designed a replacement with clear criteria (what does moving this metric actually require?), validated it against historical data, and worked to get it adopted through influence rather than authority.',
      outcome: 'The metric was adopted and changed decisions in a specific, describable way. Teams made different choices because of the new measurement framework.',
    },
    strongSignals: [
      'Can articulate precisely what was wrong with the old metric — not just "it wasn\'t good" but "it measured X when the business goal was Y"',
      'The new metric has explicit anti-gaming properties — what behavior does it reward, and is that behavior actually aligned with the goal?',
      'Describes the organizational work of adoption, not just the technical design work',
      'The metric changed at least one real decision',
    ],
    weakSignals: [
      'Built a dashboard rather than a metric — dashboards are collections of numbers, metrics are north-star signals that guide decisions',
      'The metric replaced a bad metric with a different metric that has the same problems',
      'Adoption happened because the candidate had authority, not because the metric was compelling',
      'Cannot describe what behavior the new metric rewards vs. the old one',
    ],
    keyPrinciples: [
      'A good metric rewards the behavior you want to see. The test: if a team optimized solely for this metric, would you be happy with their behavior? If yes, it\'s a good metric.',
      'Getting a metric adopted is a political problem, not a technical one. People are emotionally attached to metrics that make them look good. Changing the metric changes who wins and who loses.',
      'The strongest metric adoption stories involve proving the new metric predicts outcomes the old metric missed. Retroactive validation on historical data, showing the new metric would have flagged problems the old one missed, is the most compelling adoption argument.',
    ],
    antiPatterns: [
      'Designing a metric in a vacuum and being surprised when teams don\'t adopt it',
      'Replacing a simple, understandable metric with a complex formula that nobody can explain to the CEO',
      'Not testing the metric for perverse incentives — does optimizing for it actually require doing the right things?',
    ],
  },

  // ─────────────────────────────────────────────
  // Q14 — Working With Stakeholders Who Want Different Answers
  // ─────────────────────────────────────────────
  {
    id: 'Q14',
    title: 'Tell Me About a Time Stakeholders Had Conflicting Views on What the Data Said.',
    subtitle: 'Stakeholder Management · Analytical Objectivity',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a situation where two or more stakeholders had different interpretations of the same data, or wanted you to reach a specific conclusion. How did you navigate it?',
    whatTheyreReallyAsking: 'Can you maintain analytical objectivity when different stakeholders are pulling you toward different conclusions? Do you know how to handle a situation where the data doesn\'t support anyone\'s preferred outcome?',
    storyFramework: {
      situation: 'Two stakeholders (e.g., marketing and product, or two PMs, or a PM and an exec) had conflicting interpretations or wanted conflicting recommendations.',
      behavior: 'You acknowledged the different perspectives, identified the specific analytical question that separated them, ran the analysis that could resolve the disagreement objectively, and reported the result to both stakeholders before the broader meeting.',
      outcome: 'The disagreement was resolved with evidence rather than politics. Both stakeholders accepted the result, even the one whose interpretation was wrong.',
    },
    strongSignals: [
      'Identified the specific analytical question that could resolve the disagreement — not all stakeholder conflicts are resolvable with more analysis, but many are',
      'Proactively shared findings with the "losing" stakeholder before the public forum, to give them time to process and respond',
      'Framed the analysis as "here is what the data shows" rather than "here is why Person A is right and Person B is wrong"',
      'Describes what they would do when the data genuinely doesn\'t resolve the disagreement — some questions are strategic, not analytical',
    ],
    weakSignals: [
      'Presented the conflicting data to the group and let them fight it out — analysts are not referees',
      'Sided with the more senior stakeholder regardless of the data',
      'Produced a "balanced" analysis that didn\'t actually resolve anything — both sides were technically right in a way that avoided conflict',
      'Couldn\'t distinguish between analytical disputes (resolvable with data) and strategic disputes (require different resolution)',
    ],
    keyPrinciples: [
      'Analytical disputes have a correct answer and are resolved with better methodology. Strategic disputes are about values and priorities — more data doesn\'t resolve them, and pretending it does erodes your credibility.',
      'The most dangerous stakeholder conflict is when both sides want you to selectively slice the data to support their conclusion. The right response: "I can run both cuts and show you both. But I\'ll also tell you which one I think is the right way to look at the problem, and why."',
      'Your credibility as an analyst depends on being right more often than you\'re politically convenient. Consistently producing the answer the most powerful stakeholder wants will eventually produce an obviously wrong conclusion that destroys trust with everyone.',
    ],
    antiPatterns: [
      'Producing a "balanced" report that presents both sides without a conclusion — that is not analysis, that is a summary of conflicting opinions',
      'Implying you would side with whoever controls your performance review',
      'Treating every stakeholder conflict as an analytical dispute when some are genuinely strategic disagreements that data cannot resolve',
    ],
  },

  // ─────────────────────────────────────────────
  // Q15 — Fixing a Metric That Was Being Gamed
  // ─────────────────────────────────────────────
  {
    id: 'Q15',
    title: 'Tell Me About a Time You Discovered a Metric Was Being Gamed.',
    subtitle: 'Data Integrity · Analytical Courage',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a situation where you discovered that a team or process was optimizing a metric in a way that didn\'t actually reflect the underlying business goal. What did you do?',
    whatTheyreReallyAsking: 'Do you notice when metrics are being gamed? Do you have the courage to name it when it\'s happening, especially when gaming might be intentional or implicit? Can you redesign metrics to be gaming-resistant?',
    storyFramework: {
      situation: 'A metric showed improvement, but the underlying behavior that improvement was supposed to reflect was not improving — or was getting worse.',
      behavior: 'You identified the specific gaming behavior, quantified the gap between the metric and the actual business outcome, named it clearly to the relevant stakeholders, and recommended a metric redesign or guardrail.',
      outcome: 'The metric was redesigned, a guardrail was added, or the team\'s behavior changed. The business outcome improved as a result of measuring the right thing.',
    },
    strongSignals: [
      'Identified the gaming behavior without being accusatory — framed it as a measurement problem, not a character problem',
      'Can articulate precisely why the metric could be improved without improving the underlying outcome',
      'Proposed a specific redesign that makes the same gaming behavior less rewarding',
      'Raised it to the right people in the right way — not publicly shaming the team, but not ignoring it either',
    ],
    weakSignals: [
      'Noticed the gaming but didn\'t raise it because it was uncomfortable',
      'Raised it accusatorially, creating defensiveness rather than problem-solving',
      'The "fix" was just a different metric with the same gaming potential',
      'Confused optimization (doing the right thing better) with gaming (doing a different thing that improves the number)',
    ],
    keyPrinciples: [
      'Metric gaming is almost never malicious. People optimize for what they\'re measured on. If the metric is gameable, it will be gamed. The problem is the metric, not the person.',
      'Goodhart\'s Law: when a measure becomes a target, it ceases to be a good measure. Every metric is gameable at some optimization pressure. The question is whether gaming the metric requires doing something genuinely good or something that only looks good on paper.',
      'The best response to gaming is a metric redesign that makes gaming require actually doing the right thing — not a louder instruction not to game, not a punishment, not a guardrail. Change what the metric rewards.',
    ],
    antiPatterns: [
      'Framing gaming as a personal integrity failure rather than a measurement design failure',
      'Adding a secondary guardrail metric without addressing the root cause (the gameable primary metric)',
      'Noticing gaming only after it caused a significant negative business outcome rather than proactively',
    ],
  },

  // ─────────────────────────────────────────────
  // Q16 — Handling a Failed Project or Experiment
  // ─────────────────────────────────────────────
  {
    id: 'Q16',
    title: 'Tell Me About an Experiment or Project That Failed. What Did You Learn?',
    subtitle: 'Learning · Intellectual Honesty',
    difficulty: 'analyst',
    isFree: false,
    prompt: 'Describe an analysis, experiment, or project that did not produce the expected results or had to be discontinued. What happened, and what did you take away from it?',
    whatTheyreReallyAsking: 'Can you be honest about failure? Do you take genuine lessons or do you perform learning? Do you distinguish between execution failures (you did something wrong) and hypothesis failures (you were wrong about how the world works)?',
    storyFramework: {
      situation: 'A project was abandoned, an experiment showed no effect or a negative effect, or an analysis conclusion turned out to be wrong.',
      behavior: 'You acknowledged the failure without deflection, diagnosed the root cause (execution issue vs. wrong hypothesis), extracted a specific lesson, and applied that lesson to something later.',
      outcome: 'The failure led to a specific change in how you approach similar problems — not just "I learned to be more careful" but a concrete behavior change.',
    },
    strongSignals: [
      'The failure is real and meaningful — not a minor setback dressed up as a failure for the purpose of the question',
      'Distinguishes between "I executed poorly" and "my model of the world was wrong" — both are failures but have different lessons',
      'Can articulate the specific lesson and a specific subsequent situation where it was applied',
      'Doesn\'t blame external factors for what was within their control',
    ],
    weakSignals: [
      'The "failure" is a success with minor imperfections — not a genuine failure',
      'Attributes the failure entirely to external factors (data quality, team dynamics, time pressure)',
      'The lesson is vague: "I learned to communicate better" without any specific behavior change',
      'Visibly uncomfortable or defensive when describing the failure',
    ],
    keyPrinciples: [
      'The most informative failures are hypothesis failures — where you were systematically wrong about how something works, not just careless in execution. These are rare and deeply instructive.',
      'A good answer to this question distinguishes between two types of wrong: wrong about the facts (you analyzed bad data) and wrong about the model (your mental model of user behavior was incorrect). Wrong about the model is more valuable to discuss.',
      'The lesson should sound like: "I now approach X differently because of this, specifically by doing Y instead of Z." If the lesson can\'t be stated that concretely, the learning wasn\'t real.',
    ],
    antiPatterns: [
      'Describing a "failure" that is really a success story framed negatively to seem more relatable',
      'Accepting no personal responsibility — the team, the data, the timeline were all to blame, not any decision you made',
      'Performing humility ("I realized I have a lot to learn") without a specific lesson',
    ],
  },

  // ─────────────────────────────────────────────
  // Q17 — Scaling Your Impact Beyond Your Team
  // ─────────────────────────────────────────────
  {
    id: 'Q17',
    title: 'Tell Me About a Time You Made an Impact Beyond Your Direct Team.',
    subtitle: 'Leadership · Organizational Influence',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a contribution you made that benefited people or teams beyond your immediate team. What did you build, how did it spread, and what impact did it have?',
    whatTheyreReallyAsking: 'Can you see and solve problems beyond your immediate scope? Do you build things that scale? Do you understand the difference between being busy and being leveraged?',
    storyFramework: {
      situation: 'A problem existed that wasn\'t your job to fix, but you saw it and built something to address it.',
      behavior: 'You identified a reusable pattern or infrastructure gap, built something that other teams could adopt without you being present, and drove adoption through showing usefulness rather than mandate.',
      outcome: 'Other teams adopted what you built. Specifically: N teams use it, M decisions per quarter are informed by it, or a specific class of problem was eliminated.',
    },
    strongSignals: [
      'The contribution required going beyond the stated scope of their role',
      'Built something reusable and self-serve, not a one-off analysis that required their involvement every time',
      'Can quantify the spread: how many teams, what decision types, what cadence',
      'The adoption was pull-driven (others sought it out) not push-driven (mandated by leadership)',
    ],
    weakSignals: [
      'The contribution was a one-off analysis, not a reusable framework, tool, or process',
      'Describes "helping other teams" in a vague way without specific artifacts or outcomes',
      'The adoption was mandated by a manager, not organic',
      'The story is really about their own team\'s success, with a passing mention of cross-team collaboration',
    ],
    keyPrinciples: [
      'The highest leverage contributions are ones that scale without your ongoing involvement. A metric framework that 5 teams use is worth more than a brilliant one-off analysis that you had to do yourself 5 times.',
      'Adoption is the unit of impact for cross-team work. A tool nobody uses failed, regardless of how good it was. Getting adoption requires solving a real problem, making the tool easy to use, and being visible enough that the right people know it exists.',
      'Lateral influence (making something so good that people adopt it voluntarily) is the highest form of organizational influence for an individual contributor. It doesn\'t require authority and it builds your reputation in a way that authority-based contributions don\'t.',
    ],
    antiPatterns: [
      'Describing a contribution that required your ongoing manual involvement rather than a scalable artifact',
      'Confusing "presenting to multiple teams" with "creating something multiple teams adopted"',
      'Being vague about what specifically was built and how specifically it was used',
    ],
  },

  // ─────────────────────────────────────────────
  // Q18 — Balancing Speed and Rigor
  // ─────────────────────────────────────────────
  {
    id: 'Q18',
    title: 'How Do You Decide When Analysis Is "Good Enough" to Act On?',
    subtitle: 'Judgment · Speed vs. Rigor Tradeoff',
    difficulty: 'analyst',
    isFree: false,
    prompt: 'Tell me about a time when you had to decide whether to deliver analysis quickly with known limitations, or wait and do a more rigorous analysis. How did you decide, and what happened?',
    whatTheyreReallyAsking: 'Do you have good judgment about when rigor is required vs. when speed is the right tradeoff? Can you explicitly reason about the cost of delay vs. the cost of a wrong recommendation?',
    storyFramework: {
      situation: 'A decision needed to be made on a timeline that was shorter than the time needed for a rigorous analysis.',
      behavior: 'You assessed the cost of the decision (reversible vs. irreversible), the precision required for the recommended action, and the cost of delay — then either delivered a scoped analysis with stated limitations, or pushed back on the timeline with a specific risk argument.',
      outcome: 'The decision was made with appropriate rigor for the stakes. Either the quick analysis was good enough, or the timeline was extended because the risk of acting on insufficient data was quantified and accepted by the decision-maker.',
    },
    strongSignals: [
      'Has a clear framework for when to do quick-and-dirty vs. rigorous analysis (stake size, reversibility, precision required)',
      'Can articulate the specific limitations of the quick analysis and what conditions would change the recommendation',
      'Has pushed back on timelines when the stakes justified it — doesn\'t always default to "delivering on time"',
      'Separates analytical rigor from statistical rigor — sometimes quick analysis is directionally correct without being statistically precise',
    ],
    weakSignals: [
      'Always defaults to quick analysis regardless of stakes — "shipping fast" without differentiation',
      'Always defaults to rigorous analysis regardless of timeline — perfectionism without judgment',
      'Cannot articulate what "good enough" means for a specific decision',
      'The story is about technical choices in the analysis rather than the judgment about when to stop',
    ],
    keyPrinciples: [
      'The right amount of rigor is determined by the cost of being wrong, not by how much time is available. A decision that can be easily reversed warrants less rigor than one that cannot.',
      'Stated limitations are more valuable than unstated ones. "This analysis has 80% confidence and would change if X" is more actionable than a precise-sounding analysis that has hidden assumptions.',
      'The cost of delay is real. Waiting for perfect analysis on a decision that needed to be made 2 weeks ago is a failure of judgment, not a victory of rigor.',
    ],
    antiPatterns: [
      'Using "the data wasn\'t perfect" as a reason to not deliver rather than a reason to caveat your delivery',
      'Conflating "I was thorough" with "I was appropriately rigorous" — thoroughness is not a virtue when the decision doesn\'t require it',
      'Being unable to say "this analysis is good enough to act on" — indecision is a decision, and usually the wrong one',
    ],
  },

  // ─────────────────────────────────────────────
  // Q19 — Navigating Ethical Tension in Data Work
  // ─────────────────────────────────────────────
  {
    id: 'Q19',
    title: 'Have You Ever Been Asked to Do Analysis That Made You Uncomfortable? What Did You Do?',
    subtitle: 'Ethics · Analytical Integrity',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe a situation where you were asked to do analysis or present data in a way that raised ethical concerns or felt analytically dishonest. How did you handle it?',
    whatTheyreReallyAsking: 'Do you have ethical grounding in your analytical work? Do you know the difference between selective analysis (sometimes appropriate) and misleading analysis (never appropriate)? Can you navigate ethical tension without being self-righteous?',
    storyFramework: {
      situation: 'You were asked to present data in a way that omitted relevant context, cherry-picked favorable results, or drew conclusions the data didn\'t support.',
      behavior: 'You named the concern specifically (not generically), proposed an alternative framing that achieved the business goal honestly, and either got agreement on the honest framing or escalated to someone who could resolve the disagreement.',
      outcome: 'The analysis was presented in a way you were comfortable with. Either you persuaded the requester to accept an honest framing, or you escalated and got the right outcome, or — in the most difficult cases — you declined to do the work in the requested form.',
    },
    strongSignals: [
      'Can distinguish between legitimate data selection (choosing the most relevant cut for the audience) and misleading framing (hiding information that would change the conclusion)',
      'Named the concern directly: "If we only present this cut, we\'re implying X, which the data doesn\'t actually support"',
      'Proposed an alternative rather than just objecting: "Can we present both cuts and explain why we\'re highlighting this one?"',
      'Knows where the line is between "making data accessible to non-technical audiences" and "misrepresenting what the data shows"',
    ],
    weakSignals: [
      'No situation comes to mind — at most companies, data is regularly used to support predetermined conclusions',
      'Describes a very minor concern (choosing between two valid visualizations) rather than a real ethical tension',
      'Either always complied without objection or always escalated to HR immediately — neither extreme reflects real-world analytical judgment',
      'Cannot articulate where the line is between simplification and misrepresentation',
    ],
    keyPrinciples: [
      'Simplification is not misrepresentation. You can legitimately present one cut of the data to a non-technical audience without showing all possible cuts — provided the omitted cuts don\'t change the conclusion.',
      'Framing can mislead without lying. "Active users grew 15%" with a carefully chosen definition of "active" that inflates the number is analytically dishonest even if the math is correct.',
      'The test for ethical data presentation: if the decision-maker knew everything you know, would they make the same decision? If the answer is no, the presentation is misleading — regardless of whether it is technically accurate.',
    ],
    antiPatterns: [
      'Treating all selective presentation as unethical — sometimes the audience genuinely doesn\'t need every cut and simplification is appropriate',
      'Treating all ethical concerns as equally severe — there is a spectrum from "questionable framing" to "material misrepresentation" and they require different responses',
      'Being unable to describe a specific situation, using vague language about "maintaining data integrity" without examples',
    ],
  },

  // ─────────────────────────────────────────────
  // Q20 — Most Important Analysis You Did Without Being Asked
  // ─────────────────────────────────────────────
  {
    id: 'Q20',
    title: 'What Is the Most Important Analysis You Initiated Without Being Asked?',
    subtitle: 'Initiative · Proactive Insight',
    difficulty: 'senior',
    isFree: false,
    prompt: 'Describe the most important or impactful analysis you did on your own initiative — not because someone asked you to do it, but because you saw a question that needed answering. What did you find, and what happened?',
    whatTheyreReallyAsking: 'Do you have a curious, proactive analytical mind? Can you identify important questions that nobody is asking yet? Do you understand what the business most needs to know, even when nobody has articulated it?',
    storyFramework: {
      situation: 'You noticed something — a pattern in data, a decision that seemed to be made without good information, a metric moving in a way nobody was discussing.',
      behavior: 'You scoped the analysis yourself, ran it without waiting for a ticket or request, shared it with the relevant stakeholders in a way that created action (not just interest), and followed it to a decision or change.',
      outcome: 'Something changed because of this analysis. A decision was made differently, a risk was avoided, a new opportunity was identified. Not just "people were interested" but a concrete outcome.',
    },
    strongSignals: [
      'The question was non-obvious — most people weren\'t asking it, which is why it needed to be self-initiated',
      'The analysis required judgment about scope and method, not just execution of a well-defined task',
      'Led to a concrete change, not just appreciation from stakeholders',
      'Can explain why this question was important to the business, not just interesting analytically',
    ],
    weakSignals: [
      'The analysis was obvious and someone else would have gotten to it anyway',
      'The analysis was interesting but didn\'t lead to any decision or change',
      'The "initiative" was really responding to a loosely worded request — not genuinely self-initiated',
      'Cannot explain why the question was important to the business',
    ],
    keyPrinciples: [
      'The most valuable proactive analyses often start with a nagging feeling that a commonly accepted conclusion is wrong, or that an important question is being ignored. That instinct — knowing which questions are important before anyone asks them — is the senior data scientist skill that is hardest to teach.',
      'Proactive analysis succeeds or fails on follow-through. Many analysts do the analysis and present findings. Few analysts track the analysis through to a decision and don\'t let it get lost in inbox noise. The follow-through is half the value.',
      'The framing for sharing proactive analysis matters: "I noticed X and ran some numbers — I think this might affect Y. Here\'s what I found and here\'s what I think we should do about it." That structure creates a pull for action, not just a push of information.',
    ],
    antiPatterns: [
      'Describing proactive analysis that never got to a decision — a finding that generated appreciation but no action is a half-success at best',
      'Taking credit for analysis that was actually prompted by a manager or stakeholder comment',
      'The analysis being technically interesting but strategically irrelevant — analytical initiative that doesn\'t connect to business priorities isn\'t the right kind of initiative',
    ],
  },
];
