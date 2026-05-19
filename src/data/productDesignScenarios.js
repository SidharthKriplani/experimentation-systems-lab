// Product Analytics Lab — Product Design Room Scenario Data
// PM-style "design a product feature" questions across companies and product types
// Each scenario has 5 phases: Clarify → Users → Goals → Solutions → Prioritize & Measure

export const productDesignScenarios = [

  // ─────────────────────────────────────────────────────────────────
  // PD01 — Spotify: Podcast Discovery (FREE)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd01',
    title: 'Improve Podcast Discovery on Spotify',
    company: 'Spotify',
    companyColor: 'var(--green)',
    difficulty: 'medium',
    category: 'Consumer App',
    tags: ['content discovery', 'personalization', 'consumer'],
    isFree: true,
    prompt: `You are a PM at Spotify. Podcast listening has grown significantly over the last three years, but podcast discovery still largely depends on users knowing what to search for. Users who don't already know a show's name rarely find new podcasts organically.

Design a feature to meaningfully improve podcast discovery — specifically for users who want to find something new but don't know what to search for.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before starting to design?',
        guidance: 'Good PM clarifying questions narrow ambiguity about users, scope, success criteria, and constraints. Aim for 4–6 targeted questions, not an exhaustive list. Show that you are thinking strategically, not just gathering information.',
        criteria: [
          'Asks about target user segment (new Spotify users vs. lapsed podcast listeners vs. music-only users)',
          'Asks about success metric definition and north star for discovery',
          'Asks about existing discovery surface (current podcasts tab, search) and its performance',
          'Asks about platform scope (mobile only? Also desktop/web?)',
          'Asks about timeline and resource constraints',
          'Avoids asking questions that have obvious answers from the brief',
        ],
        modelAnswer: `Before designing, I'd want to clarify:

1. **Who is the primary target user?** New Spotify users who haven't engaged with podcasts, or existing podcast listeners we want to expand? Or music-only users we want to convert? These require very different solutions.

2. **What does "improve discovery" mean in measurable terms?** Are we targeting first podcast listen, podcast engagement (completion rate, return listening), or new show subscriptions? The success metric should exist before the solution.

3. **What's the baseline?** How are users currently discovering podcasts — search, editorial playlists, social shares? And where does that discovery fail? Knowing the existing funnel shapes what we build.

4. **Platform constraint?** Mobile first, or does this span desktop, TV, car? Discovery patterns differ meaningfully by context.

5. **Are there content constraints?** Do we have licensing or editorial curation capacity for something like a recommendation engine vs. a curated shelf?

6. **What's the timeline?** A 6-week sprint suggests iterating on existing surfaces; a longer timeline could support an ML-driven feature.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Identify the user segments most relevant to this problem. Which segment would you focus on and why?',
        guidance: 'Strong answers identify 2–4 distinct segments with different needs and behaviors, then make a clear, reasoned choice about focus. Avoid treating "all Spotify users" as one segment.',
        criteria: [
          'Names at least 3 distinct segments with different discovery behaviors',
          'Considers the segment\'s size, discovery pain, and potential for growth',
          'Makes a clear recommendation for which segment to focus on',
          'Justifies the choice with business logic, not just intuition',
        ],
        modelAnswer: `Three segments stand out:

**1. Music-first users who haven't tried podcasts**
Large in volume. Their barrier is awareness and cold-start unfamiliarity — they don't know where to start. Discovery tools could convert them, but it requires disrupting existing listening habits. High ceiling, higher friction.

**2. Lapsed podcast listeners (engaged 3–6 months ago, now inactive)**
They've proven they like podcasts but have churned from the habit. They're familiar with the format but haven't found a compelling show to stick with. They're more receptive to re-engagement through personalized recommendations.

**3. Active podcast listeners who want more shows**
Already engaged. Their pain is variety and serendipitous discovery — they want to find shows adjacent to what they love but can't search for what they don't know exists.

**Focus: Segment 3 (active podcast listeners)**

They're already in the behavior, so we can measure impact quickly. They have strong signal (listening history) for personalization, and solving for them builds infrastructure that later scales to segments 1 and 2. Their engagement also pulls up north star metrics most directly.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define the success metrics for this feature. What is the north star, what are diagnostics, and what guardrails would you commit to?',
        guidance: 'A strong metrics answer names one clear primary metric tied to the problem, supporting diagnostics that explain movement, and at least one guardrail. Avoid listing every possible metric.',
        criteria: [
          'Names a specific, measurable north star (not "engagement" generically)',
          'Includes diagnostic metrics that explain why the north star moved',
          'Includes at least one guardrail (protecting existing listener behavior)',
          'Explains the denominator for each rate metric',
          'Avoids using revenue as the north star for a discovery feature',
        ],
        modelAnswer: `**North Star: New unique shows streamed per active podcast listener per month**
This captures discovery success (new shows, not re-listens) and is directly tied to the problem. It's more meaningful than "impressions" or "clicks" because it measures actual listening, not just exposure.

**Diagnostic metrics:**
- Click-through rate on discovery surface (discovery content → show page)
- Show page → first episode start rate (are users interested once they land?)
- Episode completion rate for discovery-sourced starts (quality signal)
- Day-7 and Day-30 return rate to newly discovered shows (is the recommendation durable?)

**Guardrail:**
- Existing podcast listening volume per active listener must not decline (we're adding discovery, not disrupting existing habits)
- Music listening engagement should not decrease significantly (podcast discovery shouldn't cannibalize the core product)

**Primary metric for experiment:** New unique shows with ≥1 episode started, per active podcast listener, in the 30 days after feature exposure.`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions at different levels of scope and complexity. Briefly describe each.',
        guidance: 'Good solution generation shows range — from quick wins to strategic bets. Show tradeoffs. Don\'t anchor on one idea. A senior PM can articulate what each solution optimizes for and what it sacrifices.',
        criteria: [
          'Generates at least 3 solutions at different effort/impact levels',
          'Each solution has a clear mechanism (how it drives discovery)',
          'Identifies what each solution assumes or risks',
          'Avoids generic ideas like "recommendation algorithm" without mechanism',
          'At least one solution is novel or non-obvious',
        ],
        modelAnswer: `**Option 1: "Because You Listened To…" Discovery Shelf (Low effort, quick signal)**
Surface a dedicated discovery shelf on the Podcasts tab showing shows algorithmically similar to the user's recent listens. Each recommendation is labeled with the connection ("Because you listen to Lex Fridman"). Clear, personal, and low-friction. Risk: cold-start problem for new podcast listeners; depends heavily on existing catalog relationships.

**Option 2: Mood/Context-Based Podcast Channels (Medium effort, differentiated)**
Instead of topic-based discovery (users don't know genre), offer mode-based channels: "Something to learn on my commute," "True crime for tonight," "Quick 10-minute stories." Users discover shows through a context/mood entry point rather than by searching for a genre they can't name. Novel, but requires strong editorial/curation infrastructure.

**Option 3: Social Discovery via Friends & Followed Artists (Medium effort, platform leverage)**
Surface what Spotify friends or followed artists are listening to. This leverages social proof without requiring active sharing. "Artists you follow are listening to this podcast" is a unique Spotify angle other platforms can't replicate. Risk: relies on social graph density and opt-in sharing, which may be limited.

**Option 4: Conversational Discovery (High effort, strategic bet)**
An in-app prompt: "Tell me what you're in the mood for" — uses LLM to generate personalized show recommendations from a text description. Higher development lift but matches the search-vs-browse tension head-on. Could be built on top of existing Spotify AI DJ infrastructure.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'Which solution would you recommend shipping first and why? How would you test it? What does v1 look like?',
        guidance: 'Strong prioritization shows clear reasoning about impact vs. effort, mentions how to validate with a test, and describes a concrete v1 scope. Avoid choosing the most technically exciting option just because it\'s interesting.',
        criteria: [
          'Makes a clear recommendation with explicit reasoning',
          'Considers both impact and effort/feasibility',
          'Proposes a concrete experiment or test to validate',
          'Describes what v1 looks like (minimum scope to learn)',
          'Acknowledges the tradeoff of the choice made',
        ],
        modelAnswer: `**Recommendation: Ship Option 1 ("Because You Listened To…" shelf) as the v1 test**

**Rationale:**
It builds on existing recommendation infrastructure, doesn't require new UI paradigms, and gives us a clean north star signal (new shows started) within a 2-week experiment window. Option 2 and 3 are strategically interesting but require more build time and have more assumptions to validate.

**What v1 looks like:**
- A shelf on the Podcasts home tab with 6–8 algorithmic recommendations
- Each card shows: show name, episode count, and a "because you listened to X" label
- Tapping goes to the show page, not directly to an episode
- Surface area is mobile only for the v1 test

**Test design:**
Run a 14-day A/B test: treatment (shelf visible) vs. control (no shelf). Primary metric: new unique shows with ≥1 episode started per listener. Guardrail: existing podcast listening volume.

**If it works:**
Expand to desktop and test contextual placement (top of tab vs. mid-page). Then layer in social/friends data to improve recommendation quality (Option 3 becomes a ranking signal, not a separate feature).

**Tradeoff acknowledged:**
We're shipping a cold-start-limited solution first. Users with limited podcast history will see weaker recommendations. We'll measure recommendation quality by segment and decide whether to add a fallback for low-history users in v2.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD02 — Airbnb: Host Response Time (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd02',
    title: 'Reduce Host Response Lag on Airbnb',
    company: 'Airbnb',
    companyColor: 'var(--red)',
    difficulty: 'medium',
    category: 'Marketplace',
    tags: ['two-sided marketplace', 'supply-side', 'retention'],
    isFree: false,
    prompt: `You are a PM at Airbnb. Data shows that guest booking conversion drops 18% when hosts take more than 12 hours to respond to a booking request. Currently, 31% of requests see a host response time over 12 hours.

Design a solution to reduce host response lag and improve booking conversion — without harming host satisfaction or causing hosts to accept bookings they'll cancel later.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before designing?',
        guidance: 'This is a two-sided marketplace problem. Good questions explore both guest and host perspectives, identify root causes of response lag, and clarify what "without harming host satisfaction" means in practice.',
        criteria: [
          'Asks about root causes of response lag (hosts on mobile? Not notified? Deliberately slow?)',
          'Asks about current notification system and its effectiveness',
          'Asks about host segmentation (superhosts vs occasional hosts, home-sharing vs investment properties)',
          'Asks about the tradeoff definition for "host satisfaction"',
          'Asks about Instant Book eligibility and current adoption',
          'Distinguishes between improving response time and preventing slow responses',
        ],
        modelAnswer: `Before designing, I'd clarify:

1. **What are the root causes of slow responses?** Is it hosts who are genuinely unavailable, hosts who are hesitant (uncertainty about the guest), or a notification delivery problem? These require different solutions.

2. **What does host segmentation look like?** Superhosts (likely higher response rates) vs occasional home-sharers vs professional property managers — each has different motivations and constraints.

3. **What's the current notification stack?** Do we send push, email, or SMS? What are open/response rates on those notifications? Is there a fatigue problem?

4. **What is Instant Book adoption currently?** If hosts are already eligible for Instant Book, why aren't they using it? Is it a trust/control issue?

5. **How do we define "host satisfaction"?** Is it measured by survey, star rating, or continued hosting activity? What's the acceptable degradation threshold?

6. **What is the nature of the bookings being slow-responded to?** Are these long-stay, high-value requests? New guest profiles? Knowing which requests cause hesitation shapes what we build.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Identify the host segments most relevant to this problem. Which segment should the solution target first?',
        guidance: 'The key insight is that "hosts" is not one segment. Superhosts have different response patterns than occasional hosts or professional property managers. Identify what drives response lag for each type.',
        criteria: [
          'Identifies at least 3 distinct host segments with different response behaviors',
          'Identifies which segment accounts for most of the 31% slow-response problem',
          'Considers host motivation and trust dynamics, not just notification behavior',
          'Makes a clear recommendation for which segment to target first',
        ],
        modelAnswer: `Three host segments with distinct response behaviors:

**1. Occasional/part-time home sharers (primary target)**
High volume, lower response consistency. They're often at work, asleep, or simply not checking the app frequently. The response lag is largely passive — not a rejection signal, just inattention. Most of the 31% slow-response problem likely lives here. High leverage: even small nudges can meaningfully improve response time.

**2. Superhosts and experienced hosts**
Low response lag already (it's a Superhost criterion). Not the core problem. May be useful as a benchmark for what good looks like.

**3. Professional property managers**
Manage multiple listings. Their response lag may be structural (review queues, team coordination) rather than personal inattention. May need different tooling (dashboard-level tools) rather than mobile push notifications.

**Focus: Segment 1 (occasional home sharers)**
They represent the bulk of the problem, they're responsive to gentle nudges (no deep structural barriers), and improvements here have the largest conversion impact at scale. The solution should be lightweight, mobile-first, and reduce friction in responding — not just increase notification frequency.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define the success metrics. What is the primary goal, how do you measure it, and what guardrails protect against unintended consequences?',
        guidance: 'This is a two-sided marketplace problem — metrics on the guest side AND host side matter. A solution that improves response time but causes stressed hosts to accept-then-cancel is worse than the baseline.',
        criteria: [
          'Primary metric tied to guest conversion (not just host response rate)',
          'Includes host-side diagnostic (acceptance rate, not just response rate)',
          'Includes guardrail against post-booking cancellations by hosts',
          'Distinguishes between response rate and response quality',
          'Considers long-term host retention as a constraint',
        ],
        modelAnswer: `**Primary metric: Guest booking conversion rate within 12 hours of request submission**
This captures the real business outcome — completed bookings, not just host responses. We want faster responses that convert to bookings, not faster refusals.

**Diagnostic metrics:**
- Host response time distribution (% responding in <1hr, 1–6hrs, 6–12hrs, 12–24hrs)
- Host acceptance rate on responded requests (quality signal — we don't want pressure-accepted bookings)
- % of sessions where guest abandons while waiting for host response

**Guardrail metrics:**
- Host post-booking cancellation rate must not increase (pressure = stress = later cancellations)
- Host satisfaction score (NPS or continued listing activity) — we protect the supply side
- % of hosts who temporarily deactivate listings after intervention (early signal of stress)

**North star for the overall feature:**
Completed bookings per active guest search session — the ultimate measure of both guest intent and host supply health.`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions. For each, identify the mechanism, what it assumes, and its key risk.',
        guidance: 'Strong solutions address the root cause (why hosts are slow) not just the symptom (they\'re slow). Consider both notification/reminder approaches AND structural changes to the booking flow.',
        criteria: [
          'At least 3 solutions at different effort levels',
          'Solutions address both notification improvement AND flow/structural changes',
          'Each solution identifies a key risk or assumption',
          'At least one solution addresses the host trust/hesitation angle',
          'Avoids "just send more notifications" without mechanism',
        ],
        modelAnswer: `**Option 1: Smart Response Reminders (Low effort)**
Send escalating, contextual push notifications: first nudge at 2hrs with the guest's profile summary (name, verified status, prior stay history), second at 6hrs with "Your booking request will expire in 6 hours." The key insight: framing it as "guest is waiting" is more effective than "you have a notification." Risk: notification fatigue if poorly calibrated.

**Option 2: One-tap Response Card (Medium effort)**
Re-design the response notification as a rich push notification with 3 buttons: Accept / Decline / Ask a Question. Hosts can respond without opening the app. Reduces friction for the majority of cases where the host has already decided. Risk: some hosts may accept without reading carefully, increasing mismatch.

**Option 3: Response Window Visibility for Guests + Host Accountability Score (Medium effort)**
Show guests the host's average response time on the listing page ("Usually responds within 2 hours"). This creates soft social accountability — hosts who see guests filtering by response time have an incentive to improve. Hosts get a response-time badge visible on their listing. Risk: hosts who can't respond fast may feel unfairly disadvantaged; could reduce supply.

**Option 4: Flexible Booking Mode (High effort, strategic)**
Introduce a "Flexible Hold" booking type: guest pays a small deposit to hold the listing for 24hrs while host confirms. Removes urgency pressure on both sides — guest isn't lost while waiting, host has more time without losing a committed booking. Risk: adds complexity to the booking flow and may reduce overall booking velocity for guests who want instant confirmation.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'Which solution do you recommend shipping first and how would you test it? Describe the experiment.',
        guidance: 'Prioritize with explicit effort/impact reasoning. Define a testable experiment and explain how you\'d know if it worked. Call out the guardrail risk you\'re most worried about.',
        criteria: [
          'Clear recommendation with effort/impact reasoning',
          'Describes a concrete A/B experiment design',
          'Identifies primary metric and guardrail for the experiment',
          'Names the biggest risk and how to monitor it',
          'Describes what "success" looks like and what the v2 follow-up would be',
        ],
        modelAnswer: `**Recommendation: Option 2 (One-tap Response Card) — ship first**

**Reasoning:**
Option 1 (reminders) is the simplest but addresses a symptom (hosts forget). Option 2 addresses the real friction: opening the app, navigating to the request, reading it, and responding — that's 5–7 steps. A one-tap response card collapses it to 2. If the primary cause of slow responses is friction rather than deliberate hesitation, this has significantly higher impact than reminders alone.

**Experiment design:**
- Treatment: rich push notifications with one-tap Accept / Decline / Question buttons
- Control: existing notification (tap → app → respond flow)
- Unit: booking request, randomized at the host level
- Runtime: 3 weeks (enough to see full response-to-booking conversion)
- Primary metric: guest booking conversion within 12 hours
- Guardrail: post-booking host cancellation rate (must not increase >3% relative)

**Biggest risk:** Hosts who previously read the full guest profile before deciding may now accept too quickly, leading to post-booking cancellations. This is why the guardrail on cancellation rate is critical.

**V2 follow-up:**
If Option 2 succeeds, layer in Option 1 (contextual reminders) as a complement — the reminder encourages opening the rich notification. Then evaluate Option 3 (response time badge) as a long-term supply quality signal.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD03 — Slack: Reduce Notification Overload (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd03',
    title: 'Reduce Notification Fatigue in Slack',
    company: 'Slack',
    companyColor: 'var(--purple)',
    difficulty: 'hard',
    category: 'B2B / Productivity',
    tags: ['notifications', 'productivity', 'B2B', 'retention'],
    isFree: false,
    prompt: `You are a PM at Slack. Research shows that 42% of Slack users report feeling overwhelmed by notifications, and this correlates with users going into "Do Not Disturb" for extended periods or reducing app usage. Notification-overwhelmed users are 2.4x more likely to churn from paid plans within 6 months.

Design a solution to reduce notification fatigue without reducing the quality of communication or causing users to miss important messages.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before designing?',
        guidance: 'Notification fatigue in a B2B context involves both individual user preferences AND organizational communication norms. Good questions explore both dimensions.',
        criteria: [
          'Asks about what types of notifications are causing fatigue (channels, DMs, @mentions)',
          'Asks about the current notification configuration options (are users not configuring, or is configuration not powerful enough?)',
          'Asks about who sets norms — individual users or admins/workspace owners',
          'Asks about which user segments report highest fatigue',
          'Asks how "missing important messages" is currently defined or measured',
        ],
        modelAnswer: `Key clarifying questions:

1. **What notification types are driving fatigue?** Is it @channel/@here pings, DMs, channel message volume, or thread replies? These require different solutions.

2. **What's the current configuration adoption?** Do users know they can mute channels, set keyword notifications, or schedule DND? If adoption of existing features is low, the problem may be UX discoverability rather than missing functionality.

3. **Who controls notification defaults?** Individual users vs. workspace admins? For enterprise accounts, admins often set org-wide defaults. A solution that only works at the individual level may have limited reach.

4. **Which user segments report the most fatigue?** Power users in large workspaces? People in 20+ channels? Cross-functional contributors in many teams? The solution should target the highest-volume segment first.

5. **How do we define "missing important messages"?** Is this measured by response time on @mentions? Messages read within 24hrs? User-reported anxiety about missing things? The guardrail needs a measurable definition.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Who are the users experiencing the most notification fatigue and why?',
        guidance: 'In a B2B tool, "users" includes people with very different workspace configurations, roles, and usage patterns. Segment thoughtfully.',
        criteria: [
          'Identifies at least 3 user segments with different fatigue drivers',
          'Distinguishes between individual contributors, managers, and connectors/cross-functional leads',
          'Considers workspace size and channel count as a segmentation dimension',
          'Makes a clear recommendation for which segment to prioritize',
        ],
        modelAnswer: `**Segment 1: Cross-functional contributors in large workspaces**
In 15+ channels, receiving @mentions from multiple teams. Notification volume is high and contextual — they need to stay responsive but can't distinguish signal from noise. Highest fatigue, clearest pain.

**Segment 2: Managers and team leads**
DM volume is high, thread participation is expected, they're often the escalation point. Their fatigue is driven by always-on expectations, not configuration problems.

**Segment 3: Peripheral channel members**
Added to channels they rarely read but that generate notification noise. "Channel hygiene" problem — they're in meetings they don't need to be in, channel equivalent.

**Focus: Segment 1 (cross-functional contributors)**
They have the most actionable problem (too many signals, unclear priority), they're in paid plans (churn risk is highest), and they're the users most likely to benefit from intelligent notification triage. Solutions here can scale to segments 2 and 3.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define the primary metric, diagnostics, and guardrails for this feature.',
        guidance: 'The tension here is real: reducing notifications improves user wellbeing but risks reducing message responsiveness, which could harm team communication quality. Your metrics must capture both sides.',
        criteria: [
          'Primary metric measures fatigue reduction, not just notification count reduction',
          'Diagnostic includes response time on @mentions (communication quality proxy)',
          'Guardrail protects against missed important messages',
          'Considers long-term retention metric as the ultimate outcome',
          'Distinguishes between notification volume and notification relevance',
        ],
        modelAnswer: `**Primary metric: Notification-triggered app opens per active user (volume reduction)**
We want to reduce low-value opens, not all opens. A user who opens Slack for a reason and finds something relevant is healthy. A user who opens 40 times and acts on 2 is fatigued.

**Better primary: Ratio of acted-on notifications to total notifications delivered**
Notification "precision" — what fraction of notifications lead to a read, reply, or reaction within 1 hour? Higher precision = less noise. Target: +15% improvement in precision.

**Diagnostic metrics:**
- DND activation rate and duration (fatigue proxy — going up means fatigue is worsening)
- @mention response time (communication quality proxy — should not increase)
- Channel mute rate (are users self-solving or suppressing signals?)

**Guardrail:**
- @mention response time for messages from direct manager or skip-level must not increase >10% relative (protecting critical communication chains)
- Self-reported "missed important message" survey rate must not increase

**Long-term outcome metric:** 6-month plan renewal rate for users who experienced the feature vs control.`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions. Consider both ML-based and rule-based approaches.',
        guidance: 'Good solutions here acknowledge the core tension: users want to miss less AND receive less. The best solutions improve signal-to-noise rather than just reducing volume.',
        criteria: [
          'At least 3 solutions including both light (config/UX) and heavy (ML) approaches',
          'At least one solution addresses the "importance" signal problem',
          'Solutions are specific — not just "AI-powered notifications"',
          'Each identifies the key assumption or risk',
        ],
        modelAnswer: `**Option 1: Smart Notification Digest (Medium effort)**
Instead of real-time pings for all channels, batch non-urgent notifications (channels without @mentions of the user) into a daily or morning digest. Direct @mentions and DMs are still real-time. Risk: some users want real-time awareness of channel activity even without @mention — "lurking" is a valid behavior.

**Option 2: Intelligent Priority Ranking (High effort, ML)**
Use ML to rank notifications by predicted importance: messages from your direct manager, direct reports, recent collaborators, and projects you've actively contributed to get elevated. Low-priority channel traffic is demoted. User sees a "Priority" view by default. Opt-out available. Risk: model accuracy — a misprioritized message from a manager is worse than the original problem.

**Option 3: Notification Intent Labels (Low-medium effort)**
Let senders mark messages as "FYI," "needs response," or "urgent" — visible in the notification. This shifts signal-creation to the sender, where it belongs. Slack already has emoji reactions; this extends intent signaling to the notification layer. Risk: requires sender behavior change; adoption is voluntary.

**Option 4: Channel Noise Score + Auto-Suggest (Low effort)**
Analyze each channel a user is in and show a monthly "Channel Noise Report": you've been in this channel for 90 days, read 3% of messages, and received 0 @mentions. "Want to mute or leave?" Nudge users toward better channel hygiene proactively. Risk: users may not act; channel membership decisions are often socially complex.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'Which solution do you ship first? How do you validate it? What\'s your v1 scope?',
        guidance: 'In a B2B tool, "ship first" must consider admin controls and workspace-level rollout. Describe the experiment and what a successful outcome looks like.',
        criteria: [
          'Clear prioritization with reasoning',
          'Addresses admin/workspace rollout complexity for B2B context',
          'Describes experiment or measurement approach',
          'Names the primary metric and guardrail for the test',
          'Honest about what v1 does NOT include',
        ],
        modelAnswer: `**Recommendation: Option 4 (Channel Noise Score) first, then Option 1 (Smart Digest)**

**Why Option 4 first:**
It requires no ML, no sender behavior change, and it works with existing user preferences. It's essentially a UX nudge that improves channel hygiene — the root cause of notification fatigue for many users. V1 is a monthly in-app message surfacing the top 3 "noisy channels you barely read." Low risk, fast to ship.

**V1 scope:**
- Monthly in-app card for users in 10+ channels showing their 3 highest-noise, lowest-engagement channels
- Simple action: Mute, Leave, or Dismiss
- Available to individual users, not admin-configurable in v1

**Measurement:**
Not a traditional A/B test (this is a nudge, hard to hold back). Track cohort behavior: users who see the nudge vs prior period. Primary metric: notification-triggered open ratio (precision). Guardrail: @mention response time for manager-level messages.

**V2:**
Once channel hygiene improves, layer in Smart Digest (Option 1) to handle residual volume in channels users want to stay in but not be interrupted by. Option 2 (ML priority ranking) is the medium-term investment once we have clean engagement signal from channel hygiene improvements.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD04 — Google Maps: Design for EV Drivers (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd04',
    title: 'Design a Feature for EV Drivers on Google Maps',
    company: 'Google Maps',
    companyColor: 'var(--blue-text)',
    difficulty: 'medium',
    category: 'Utility App',
    tags: ['utility', 'new user segment', 'navigation', 'infrastructure'],
    isFree: false,
    prompt: `You are a PM at Google Maps. EV adoption is growing globally, and EV drivers have fundamentally different navigation needs than ICE vehicle drivers — primarily around range anxiety, charging infrastructure availability, and charging time planning.

Google Maps currently shows EV charging stations as POIs, but has no integrated trip planning that accounts for vehicle range, charger compatibility, or charging time. Design a feature that makes Google Maps the best navigation experience for EV drivers.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before designing?',
        guidance: 'EV trip planning is technically complex. Good questions identify the scope of vehicle integration, the data availability for charging infrastructure, and which EV driver scenarios to address.',
        criteria: [
          'Asks about vehicle integration (does Maps have access to battery level, range, charger type?)',
          'Asks about which EV drivers to target (Tesla ecosystem vs. non-Tesla, long-trip vs. city drivers)',
          'Asks about data quality for charging station availability and reliability',
          'Asks about platform scope (mobile, CarPlay/Android Auto, built-in nav systems)',
          'Asks about the competitive context (Plugshare, A Better Routeplanner, Tesla Nav)',
        ],
        modelAnswer: `Key questions before designing:

1. **Do we have vehicle integration?** Does Google Maps currently receive real-time battery level, range estimate, or charging port type from connected vehicles? The feature scope changes dramatically with vs without this data.

2. **What charging network data quality do we have?** Do we have real-time availability (charger occupied/free), reliability ratings, and compatibility metadata per station? Or just location and type?

3. **Which EV driver scenarios are most underserved?** City/daily drivers rarely need trip planning (they charge at home). The gap is long-distance drivers and those in areas with sparse charging infrastructure.

4. **What's the platform context?** Mobile navigation? CarPlay/Android Auto integration? These have different interaction constraints — you can't ask a driver to configure much while driving.

5. **What's the competitive landscape?** Tesla's built-in navigation handles this well for Tesla owners. A Better Routeplanner exists for the data-savvy. Our opportunity is the mainstream EV driver who doesn't want to use a separate app.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Identify the EV driver segments most relevant to this problem. Which should the feature focus on?',
        guidance: 'EV drivers are not homogeneous. City commuters, long-distance travelers, and range-anxious new EV owners have very different needs.',
        criteria: [
          'Identifies at least 3 EV driver segments with different navigation needs',
          'Distinguishes between daily/city use and long-distance trip planning',
          'Considers the anxiety dimension (range anxiety) as a distinct UX driver',
          'Makes a clear segment choice and justifies it with business/product logic',
        ],
        modelAnswer: `**Segment 1: Daily city commuters**
Charge at home or work, rarely need trip planning. Range is not an issue for normal use. Occasional need: finding chargers when routine is disrupted. Low urgency problem, but high volume.

**Segment 2: Long-distance/road trip EV drivers**
Traveling beyond single-charge range. Must plan charging stops. Anxiety is highest here — will they make it? Will the charger be working? How long will they wait? This is the highest-pain, most differentiated segment.

**Segment 3: New EV owners with range anxiety**
Recently switched from ICE. Unfamiliar with range and charging patterns. High anxiety disproportionate to actual risk. Need reassurance and clear information, even for shorter trips.

**Focus: Segment 2 (long-distance drivers)**

They have the clearest, most acute pain. A solution for them demonstrates Google Maps' unique value over competitors. Segment 3 is large but served by a simpler version of the same solution. Segment 1 can be served with a "find charger near me" feature that doesn't require the full trip planning investment.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define success metrics for this feature. Include north star, diagnostics, and guardrails.',
        guidance: 'The ultimate success metric isn\'t charger discovery — it\'s trip completion confidence and actual trip completion. Define accordingly.',
        criteria: [
          'North star metric tied to trip completion or confidence, not just charger clicks',
          'Diagnostic includes charger stop adoption rate and route deviations',
          'Guardrail protects existing navigation experience for non-EV users',
          'Considers long-term retention (EV driver DAU) as a strategic metric',
        ],
        modelAnswer: `**North star: EV long-trip navigation sessions completed without emergency route deviation**
A "completed" session means: user started a multi-stop EV route, drove it, and didn't have to deviate to an unplanned charger. This directly measures whether we solved the core pain (range anxiety, unexpected stops).

**Diagnostics:**
- Charger stop adoption rate: % of planned stops actually visited (are our recommendations trusted?)
- Replanning frequency: how often do users modify the route mid-trip (frequent replanning = bad plan quality)
- Battery level at destination (estimated vs. actual — measures range prediction accuracy)
- Charger availability complaints (user-reported or implicit from rerouting)

**Guardrails:**
- Non-EV navigation session quality must not degrade (app performance, route accuracy for the broader user base)
- Charger stop ETAs must not add >10% to total trip time vs. manual planning (we shouldn't make efficient EV drivers less efficient)

**Long-term:** DAU retention among EV driver cohorts 90 days after first EV trip navigation session.`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions from incremental to strategic.',
        guidance: 'The hardest part of this design is the data integration challenge (real-time charger availability, vehicle range data). Solutions that work without perfect data integrations are more shippable.',
        criteria: [
          'At least 3 solutions at different effort levels',
          'At least one solution works without full vehicle integration',
          'Solutions address the "what if the charger is broken" anxiety specifically',
          'Each solution identifies the key data or infrastructure dependency',
        ],
        modelAnswer: `**Option 1: EV Mode with Manual Range Input (Low effort, ships fast)**
User sets their vehicle model and current battery % manually before a long trip. Maps uses public range data per model to plan charging stops and surface compatible chargers. No vehicle integration needed. Risk: manual entry is friction; stale battery data if users set it once and forget.

**Option 2: Dynamic Charging Stop Planner (Medium effort)**
Integrated multi-stop route planning that automatically inserts charging stops based on vehicle range. Shows: time to charge at each stop, charging cost estimate, compatibility flag (CCS/CHAdeMO/Tesla), and user ratings for the station. Uses crowdsourced data on charger reliability. Risk: data quality is uneven across networks and regions.

**Option 3: Confidence Routing with Backup Chargers (Medium effort)**
For each leg of a trip, show: primary charger stop + a backup charger 10 miles earlier in case the primary is occupied or out of service. Explicitly addresses the "what if it's broken" anxiety. Users see a route with built-in redundancy. Risk: adds visual complexity to the route; some users may find backup stops anxiety-inducing rather than reassuring.

**Option 4: OEM Vehicle Integration (High effort, strategic)**
Partner with major EV manufacturers (GM, Ford, Rivian, Hyundai) for real-time SOC (state of charge) data. Route planning automatically updates as battery degrades faster than predicted (hills, speed, HVAC load). This is the Tesla-Nav equivalent for non-Tesla vehicles. Risk: long partnership/integration timeline; data standards are fragmented across OEMs.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'What do you ship first? What is the v1 scope and how do you measure success?',
        guidance: 'Given the data complexity, a strong answer acknowledges what v1 requires vs. what\'s aspirational. Be specific about the v1 feature scope.',
        criteria: [
          'Clear recommendation with data/effort reasoning',
          'V1 scope is achievable without full OEM partnership',
          'Defines a specific measurement approach',
          'Addresses the "what if the charger is broken" problem in v1 or v2',
          'Honest about what the v1 does NOT solve',
        ],
        modelAnswer: `**Recommendation: Ship Option 1 + Option 3 together as v1**

Option 1 alone is too limited (no backup routing). Option 3 alone requires range-aware routing. Combined, they create a coherent "EV trip mode" with manual range input + confidence routing.

**V1 scope:**
- "EV Mode" toggle before starting a long-distance navigation session
- User selects vehicle model from a list of 50 most common EVs (range data is public, no OEM integration needed)
- User enters current battery % (one-time prompt)
- Route automatically includes 2–3 charging stops with compatible chargers
- Each stop shows: primary + one backup charger, current user rating, compatibility type, estimated charging time
- Mobile only in v1 (CarPlay in v2)

**What v1 does NOT solve:**
- Real-time charger availability (we show ratings, not live occupancy — this requires charging network APIs)
- Dynamic range updates based on actual driving (requires OEM integration or CarPlay energy data)

**Measurement:**
Cohort analysis of EV driver users who activate EV Mode vs. those who don't. Primary: multi-stop trip completion rate. Diagnostic: replanning frequency. This isn't a clean A/B test (users self-select into EV Mode), so we use cohort matching against similar distance/route non-EV-mode users as control.

**V2:** Integrate with 3–5 major charging networks for real-time availability. This upgrades the biggest remaining anxiety in v1.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD05 — LinkedIn: Improve Application Quality (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd05',
    title: 'Improve Job Application Quality on LinkedIn',
    company: 'LinkedIn',
    companyColor: 'var(--blue-text)',
    difficulty: 'hard',
    category: 'B2B Platform',
    tags: ['marketplace', 'two-sided', 'B2B', 'hiring'],
    isFree: false,
    prompt: `You are a PM at LinkedIn. Recruiters report that application quality has declined — they receive too many underqualified applications, and the signal-to-noise ratio in their inboxes has dropped significantly. 72% of recruiters say reviewing unqualified applications is their top pain point.

Meanwhile, job seekers report applying to many jobs without hearing back, which is demoralizing and damages LinkedIn's brand with this audience.

Design a solution that improves application quality — benefiting both recruiters (fewer unqualified applications) and job seekers (higher response rates).`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask?',
        guidance: 'This is a two-sided marketplace problem with a genuine tension: filtering applications helps recruiters but may restrict job seekers. Good questions probe both sides.',
        criteria: [
          'Asks what "unqualified" means in measurable terms (skill gap, experience gap, location mismatch?)',
          'Asks about Easy Apply vs. full application adoption',
          'Asks about the job seeker experience and what they know about their qualification fit before applying',
          'Asks about recruiter tools currently in place (filters, screening questions)',
          'Asks about LinkedIn\'s business model implications (job post revenue vs. premium subscriptions)',
        ],
        modelAnswer: `Clarifying questions:

1. **What defines "unqualified"?** Is this skills mismatch, experience mismatch, location mismatch, or something recruiters can't easily articulate? The solution changes based on the primary mismatch type.

2. **What's the Easy Apply vs. full application split?** Easy Apply dramatically reduces friction for job seekers — is the quality problem primarily from Easy Apply applications?

3. **What do job seekers know about their fit before applying?** Do they see qualification requirements? Do they understand how they compare? A transparency problem is different from a motivation problem.

4. **What recruiter tools currently exist?** Screening questions, required fields, AI matching tools? Are recruiters using them? If not, why not?

5. **What's the business model impact?** LinkedIn earns revenue from job post volume and application activity. Solutions that reduce application volume may reduce engagement metrics LinkedIn cares about commercially.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Identify the key user segments on both sides of this marketplace.',
        guidance: 'Both sides of the marketplace are users here. Identify recruiter segments AND job seeker segments with different behaviors.',
        criteria: [
          'Identifies multiple recruiter segments (high-volume enterprise, boutique, small company)',
          'Identifies multiple job seeker segments (overqualified but desperate, genuinely underqualified, spray-and-pray)',
          'Identifies which segment drives most of the "quality problem"',
          'Makes a prioritization recommendation',
        ],
        modelAnswer: `**Recruiter segments:**
- Enterprise/corporate recruiters: High volume, need automated filtering, feel quality decline most acutely
- Agency/boutique recruiters: Smaller volume but higher stakes per role; quality matters more per application
- Small business owners: Post occasional jobs, no dedicated HR; overwhelmed by any significant volume

**Job seeker segments:**
- "Spray-and-pray" applicants: Apply to many roles regardless of fit, relying on volume for response. Often using Easy Apply.
- Aspirational stretch applicants: Underqualified but trying. Not malicious, just uninformed about their competitiveness.
- Qualified applicants being lost in noise: The segment LinkedIn most needs to protect — they're applying correctly but getting buried.

**Primary drivers of the quality problem:** Spray-and-pray applicants enabled by low-friction Easy Apply, combined with job seekers who don't have visibility into their competitive position for each role.

**Focus:** Reduce friction-less low-fit applications from spray-and-pray users, while protecting qualified applicants who might self-select out unfairly.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define success metrics for both sides of the marketplace.',
        guidance: 'A critical insight: improving "quality" must be measured from the recruiter\'s perspective, but you must also measure job seeker outcomes to ensure you\'re not unfairly excluding qualified candidates.',
        criteria: [
          'Primary metric captures recruiter value (application quality, not just volume reduction)',
          'Includes job seeker success metric (response rate, interview rate)',
          'Guardrail protects against unfair exclusion of qualified-but-unconventional applicants',
          'Considers LinkedIn revenue implications as a constraint',
        ],
        modelAnswer: `**Primary metric (recruiter side): Recruiter interview-advance rate**
% of applications that result in a recruiter-initiated next step (message, interview invite, reject notice). Higher means better quality filtering. Current baseline: likely very low for high-volume job posts.

**Primary metric (job seeker side): Response rate for applications from qualified candidates**
Segment applications by "LinkedIn-assessed fit" (skills, experience, location match) and measure response rate for high-fit applicants. If response rate for high-fit applicants improves, quality is improving. If it doesn't, we're just reducing volume, not improving quality.

**Diagnostic:**
- % of applications flagged as "strong fit" by LinkedIn's existing match algorithms
- Time-to-screen per application for recruiters (are they spending less time on noise?)
- Job seeker application-to-response time (are qualified seekers hearing back faster?)

**Guardrail:**
- % of final hires that came from non-traditional backgrounds or "unconventional" profiles must not decline (preventing systemic bias amplification)
- Total application volume must not fall below a threshold that reduces LinkedIn's job activity revenue`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions that could improve application quality for this two-sided marketplace.',
        guidance: 'Strong solutions acknowledge the equity tension — screening out "unqualified" applicants can amplify bias if qualification signals are themselves biased. Name this risk explicitly.',
        criteria: [
          'At least 3 solutions at different scope levels',
          'At least one solution works on the job seeker side (giving them better signals before applying)',
          'At least one solution works on the recruiter/screening side',
          'Solutions acknowledge the bias/equity risk',
          'Each solution identifies its key assumption or risk',
        ],
        modelAnswer: `**Option 1: Fit Score Transparency for Job Seekers (Low effort, job seeker side)**
Show job seekers a "Your fit for this role" score before they apply — based on skills match, experience level, and location. Not a gate, but a signal. "You match 6 of 8 key requirements." Users can choose to apply anyway but with full information. Risk: score accuracy — a biased scoring model unfairly discourages underrepresented candidates. Requires careful audit.

**Option 2: Application Quality Gates for Easy Apply (Medium effort)**
Add 2–3 required screening questions to Easy Apply posts above a certain volume threshold. Recruiters define questions; applicants must answer. Raises friction meaningfully without removing access. Risk: adds friction for all applicants including qualified ones; may reduce LinkedIn's "applications sent" volume metric.

**Option 3: AI-Powered Recruiter Inbox Ranking (Medium-high effort)**
Rather than reducing incoming applications, rank them for recruiters by predicted fit. Recruiters see the top 20 applications first, with unranked applications available below the fold. No applicants are excluded, but noise is deprioritized. Risk: model bias; "predicted fit" may amplify historical hiring patterns.

**Option 4: "Seriously Interested" Apply Mode (Medium effort)**
A second apply path: "Standard Apply" (current) vs. "Seriously Interested" (requires a 3-sentence cover note and 2 work samples). Recruiters can filter to Seriously Interested only. Incentivizes high-quality applications while preserving access for all. Risk: disadvantages job seekers who write less well but are genuinely qualified; may require careful framing.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'What would you ship first and how would you measure it? Address the equity risk explicitly.',
        guidance: 'This is one of the few design scenarios where the ethical dimension must be named as a first-class constraint, not an afterthought. Show that you can hold both commercial and equity goals simultaneously.',
        criteria: [
          'Clear recommendation with reasoning',
          'Explicitly names the equity/bias risk and how you\'d monitor it',
          'Measurement approach is specific',
          'Doesn\'t pretend the bias risk doesn\'t exist or is trivial',
          'V1 scope is realistic and specific',
        ],
        modelAnswer: `**Recommendation: Option 1 (Fit Score Transparency) as v1, with Option 3 (AI inbox ranking) as v2**

**Reasoning:**
Option 1 works on the job seeker side — it reduces noise by helping spray-and-pray applicants self-select out, rather than algorithmically excluding them. This preserves job seeker agency and reduces systemic bias risk because exclusion is never automatic.

**V1 scope:**
- Fit summary displayed on job post page before hitting Apply: "You match X of Y key requirements" with listed matched and unmatched skills
- Available on all Easy Apply posts initially
- No gating — this is informational only
- Does NOT appear in the application itself (recruiter doesn't see it, avoiding feedback loop)

**Measurement:**
- Treatment: fit score shown; control: fit score hidden. A/B test.
- Primary: recruiter interview-advance rate for treatment vs. control job posts
- Secondary: self-reported job seeker satisfaction with the application process
- Guardrail: application rate by candidate demographic profile (must not show disparate impact on protected groups)

**Equity risk:**
I'd require a fairness audit before launching: does the fit score have statistically different pass rates across demographic groups? If so, we delay launch and fix the model. This is non-negotiable — launching a biased filter at LinkedIn's scale would amplify hiring inequity across millions of applications.

**V2:** Roll out Option 3 (AI inbox ranking) only after the fit score model has passed fairness review, using the same model as the foundation.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD06 — DoorDash: Reduce Post-Order Cancellations (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd06',
    title: 'Reduce Customer Cancellations After Ordering on DoorDash',
    company: 'DoorDash',
    companyColor: 'var(--red)',
    difficulty: 'medium',
    category: 'Delivery Marketplace',
    tags: ['marketplace', 'delivery', 'retention', 'operations'],
    isFree: false,
    prompt: `You are a PM at DoorDash. Data shows that 8.2% of orders placed are cancelled by the customer after placement — before the food is prepared. The most common cancellation window is 3–8 minutes post-order, and the most common reasons given are: "taking too long," "changed my mind," and "ordered by mistake."

Cancellations cost DoorDash in operational complexity, merchant trust, and Dasher wasted trips. Design a solution to reduce post-order cancellations without adding friction to the order placement experience.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before designing?',
        guidance: 'Cancellations have multiple root causes. Good questions probe the data behind the stated reasons and identify which causes are the most actionable.',
        criteria: [
          'Asks which cancellation reason is most prevalent and whether stated reasons match actual behavior',
          'Asks about the cancellation window breakdown (what % happen before vs. after preparation starts?)',
          'Asks about the current cancellation flow — how easy is it to cancel?',
          'Asks about the merchant and Dasher experience of cancellations',
          'Asks about any known correlations (time of day, cuisine type, order size, new vs. returning customers)',
        ],
        modelAnswer: `Key clarifying questions:

1. **Which cancellation reason is most actionable vs. just a stated reason?** "Taking too long" may mask buyer\'s remorse or order mistakes. Do we have data on cancellations vs. actual ETA at the time?

2. **When in the preparation process are cancellations happening?** Pre-accept (merchant hasn't started), post-accept but pre-start, or after preparation begins? The cost and solution change based on this.

3. **How easy is it to cancel currently?** Is the cancel button prominent? If so, some friction reduction elsewhere might be creating a "too easy to cancel" problem.

4. **Are certain order types more cancellation-prone?** Large orders, first-time users, late-night orders? The segment insight shapes targeting.

5. **What's the Dasher and merchant impact?** If a Dasher is dispatched before cancellation, they've wasted a trip. If preparation started, the merchant has sunk cost. Understanding this shapes the urgency of different cancellation windows.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Who is cancelling and why? Identify segments with different cancellation drivers.',
        guidance: 'The "8.2% of orders" hides different behaviors. New users cancel for different reasons than experienced users. High-ETA orders cancel for different reasons than low-ETA orders.',
        criteria: [
          'Identifies at least 3 cancellation-prone segments with different drivers',
          'Distinguishes between "impatient" cancellers vs. "accidental" cancellers vs. "changed-mind" cancellers',
          'Makes a recommendation for which segment represents the most winnable cancellations',
        ],
        modelAnswer: `**Segment 1: ETA-disappointed cancellers**
Ordered expecting 25 minutes, ETA showed 45 minutes post-order. This is the most addressable — the gap between expected and actual ETA is the trigger. May have been shown an optimistic pre-order ETA that was updated after order confirmation.

**Segment 2: Accidental/mistake orderers**
Tapped wrong item, wrong address, wrong restaurant. These are low-intent cancellations that a quick review/confirm step before submission might prevent.

**Segment 3: Changed-mind cancellers**
True buyer's remorse. Food preference changed, decided to cook instead. Less preventable through product changes; these may require a different strategy (waiting window vs. cancel button).

**Focus: Segment 1 (ETA-disappointed cancellers)**
They have the clearest product lever: if we improve ETA accuracy or set better expectations pre-order, the trigger for cancellation disappears. This is the most preventable and likely the largest segment of the 8.2%.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define success metrics for this feature.',
        guidance: 'Reducing cancellations sounds straightforwardly good, but reducing cancellations by adding friction could hurt the order placement experience. Metrics must capture both.',
        criteria: [
          'Primary metric is post-order cancellation rate with a clear denominator',
          'Diagnostic distinguishes between cancellation types (ETA, mistake, changed mind)',
          'Guardrail protects order placement conversion (don\'t fix cancellations by killing orders)',
          'Considers merchant and Dasher satisfaction as secondary outcomes',
        ],
        modelAnswer: `**Primary metric: Post-order cancellation rate (cancellations / completed orders placed)**
Current baseline: 8.2%. Target: reduce by 25% to ~6%.

**Diagnostic metrics:**
- ETA-triggered cancellation rate: cancellations where ETA at time of cancel > initial ETA shown by >10 minutes
- Cancellation timing: % of cancellations within first 3 minutes (likely mistake/ETA mismatch) vs. 3–8 minutes (changed mind) vs. 8+ minutes (operational delay)
- ETA accuracy: actual delivery time vs. ETA shown at order confirmation

**Guardrail:**
- Order placement conversion must not decrease (adding confirmation steps should not reduce completed orders)
- Cancellation friction must not increase "silent abandonment" where users don't cancel but also don't reorder

**Secondary outcome metrics:**
- Merchant satisfaction with cancellation rates (reported monthly)
- Dasher efficiency: wasted pickups per day`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions targeting different cancellation causes.',
        guidance: 'Strong solutions address root causes, not symptoms. "Make it harder to cancel" reduces cancellations but increases frustration — it\'s a bad solution. The best solutions remove the trigger for wanting to cancel.',
        criteria: [
          'At least 3 solutions targeting different root causes',
          'No solution simply makes cancellation harder without improving the experience',
          'Solutions address ETA accuracy, mistake prevention, and post-order engagement separately',
          'Each identifies its key assumption or risk',
        ],
        modelAnswer: `**Option 1: Real-Time ETA Transparency (Low effort)**
Show a live order tracker immediately after confirmation with: real-time ETA updates, current step (accepted / preparing / Dasher assigned / en route), and the message "Your order is being prepared — cancelling now will not refund your payment." The goal: reduce ETA anxiety by making progress visible. Risk: if the ETA is genuinely bad, transparency just makes the problem more visible.

**Option 2: Pre-Order ETA Accuracy Improvement (Medium effort)**
Fix the root cause: ETA shown pre-order is often too optimistic. Implement tighter ETA prediction using real-time restaurant busyness, Dasher proximity, and historical accuracy by restaurant/time-of-day. Show the realistic ETA before order placement. Users who are time-sensitive self-select out before ordering, rather than cancelling after. Risk: showing longer ETAs may reduce order conversion for time-sensitive users.

**Option 3: Order Review Screen for Likely-Mistake Orders (Low effort)**
For orders where signals suggest high mistake risk (new user, first order from this restaurant, order placed within 2 seconds of adding to cart), show a brief "Quick check before we send this" summary screen with item names, address, and estimated total. Adds 5 seconds for this user segment only. Risk: small friction for a segment that may not be the majority of cancellations.

**Option 4: "Delay Gratification" Cancel Flow (Medium effort)**
When a user taps Cancel, instead of immediate cancellation, show: "Your Dasher will be assigned in [X minutes]. Cancel anyway?" with a countdown. For ETA-anxious users, seeing the progress may be enough to keep them. The cancel is still available — this is not blocking it. Risk: perceived as manipulative if the countdown is shown falsely or extends artificially.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'What would you ship first? Describe the test and what success looks like.',
        guidance: 'Be specific about which cancellation segment this addresses, what the A/B test looks like, and how you\'d isolate the impact.',
        criteria: [
          'Clear recommendation with reasoning',
          'Test design is specific (unit, treatment, control, metric)',
          'Calls out which cancellation driver the v1 solution addresses',
          'Honest about what v1 does NOT solve',
        ],
        modelAnswer: `**Recommendation: Option 2 (ETA accuracy improvement) + Option 1 (live tracker) together as v1**

Option 2 prevents the trigger (unrealistic pre-order ETA). Option 1 reduces anxiety for users who placed despite good ETA but get anxious while waiting. They address complementary cancellation drivers.

**V1 scope:**
- Tighter ETA model using real-time restaurant load + Dasher proximity (this is a model improvement, no UI change needed for users)
- Live order status tracker on the post-order confirmation screen with 4-step progress indicator
- No changes to the cancellation flow itself (Option 4 is v2 if needed)

**Experiment:**
- Treatment: accurate ETA model + live tracker
- Control: current experience
- Unit: order, randomized at user level
- Runtime: 3 weeks
- Primary metric: post-order cancellation rate
- Guardrail: order placement conversion rate (ensure new ETA model doesn't kill orders by showing longer ETAs)

**What v1 doesn't solve:**
- Accidental/mistake cancellations (that's Option 3, a separate v2 sprint)
- True changed-mind cancellations (those are the non-addressable baseline)

**Success:** If cancellation rate drops to ≤6% and order placement conversion is stable, v1 is a success. We'd then layer in Option 3 for the mistake segment in v2.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD07 — Stripe: Help Small Businesses Understand Revenue (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd07',
    title: 'Help Small Businesses Understand Their Revenue on Stripe',
    company: 'Stripe',
    companyColor: 'var(--purple)',
    difficulty: 'hard',
    category: 'Fintech / B2B',
    tags: ['fintech', 'B2B', 'data literacy', 'dashboard'],
    isFree: false,
    prompt: `You are a PM on Stripe's Dashboard team. Small business owners (SMBs) — restaurants, freelancers, boutique retailers — represent a large and growing portion of Stripe's customer base. Many of them use Stripe's dashboard daily to check revenue, but qualitative research shows they feel confused by the data and often can't answer basic questions like "Is my business doing better or worse than last month?" without manual calculation.

Design a feature that helps small business owners better understand their revenue performance without requiring them to be data-savvy.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask before designing?',
        guidance: 'SMB owners are not data analysts. Good questions probe the gap between what they want to understand and what the current dashboard shows them.',
        criteria: [
          'Asks what specific questions SMBs most commonly ask about their revenue',
          'Asks about the current dashboard metrics and their format',
          'Asks whether the target is daily-active users or low-frequency check-ins',
          'Asks about the business types within SMB (subscription vs transaction-based)',
          'Asks about existing integrations (accounting software, POS)',
        ],
        modelAnswer: `Clarifying questions:

1. **What questions do SMBs most commonly ask when they open the dashboard?** "How much did I make today?" vs. "Am I on track this month?" vs. "What's my best-selling product?" Each implies a different solution.

2. **What's the current dashboard showing?** Total volume, transaction count, net revenue? Is the issue that the right data isn't shown, or that it's shown in a format SMBs can't interpret?

3. **What's the usage pattern?** Are SMBs checking daily (like checking a cash register) or weekly/monthly (like reviewing books)? The interaction design differs significantly.

4. **What are the most common SMB business types in this segment?** Subscription businesses, one-time transaction businesses, and recurring service businesses have different revenue patterns and therefore different meaningful metrics.

5. **Do SMBs currently integrate with accounting tools (QuickBooks, FreshBooks)?** If so, we may be able to surface more meaningful context. If not, Stripe is the only data source.`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Who are the SMB users most underserved by the current dashboard?',
        guidance: 'Not all SMBs have the same data needs. A freelancer with 5 clients per month has different needs than a boutique with 200 transactions per day.',
        criteria: [
          'Identifies at least 3 SMB segments with different data literacy and business patterns',
          'Considers the difference between transaction-heavy vs. service-based businesses',
          'Makes a clear focus recommendation based on urgency and size of segment',
        ],
        modelAnswer: `**Segment 1: Freelancers and service providers**
Low transaction volume, high per-transaction value. Primarily care about: have I been paid? When's my next payment coming? Not primarily "revenue trends" — they need invoice tracking and cash flow visibility. Different core need.

**Segment 2: Brick-and-mortar retail and restaurants**
High transaction volume, daily-active dashboard users. They check total daily revenue like a cash register reading. They need: today vs. yesterday vs. same day last week. This is the most common mental model.

**Segment 3: E-commerce/Shopify businesses**
Transaction-heavy but less daily-active. They care about trends, best-selling products, and cohort-level insight. More data-savvy than Segment 2 but still overwhelmed by raw tables.

**Focus: Segment 2 (retail/restaurant owners)**
Highest daily engagement, clearest mental model of what they want ("is today good or bad?"), and the least served by a traditional chart-heavy dashboard. Their need is comparison, not raw numbers.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define success metrics for this feature.',
        guidance: 'The tricky part: how do you measure "understanding"? Proxy metrics like time-on-dashboard or feature adoption are available; direct measures require research.',
        criteria: [
          'Acknowledges the challenge of measuring "understanding" directly',
          'Proposes a behavioral proxy for comprehension (reduced support tickets, more confident decision-making)',
          'Primary metric is engagement or retention, not just feature clicks',
          'Guardrail protects against oversimplification (hiding data that power users need)',
        ],
        modelAnswer: `**Primary metric: Dashboard return visit rate among SMB users**
If users understand what they're seeing and find value in it, they return. A dashboard that confuses people gets checked once and abandoned. Target: increase 7-day active usage among SMB cohort.

**A better proxy for "understanding":** Reduction in support tickets tagged "how do I read my dashboard?" and "what does X metric mean?" This is a direct signal that the dashboard is communicable.

**Diagnostic:**
- Time spent on dashboard per visit (longer isn't necessarily better — ideally shorter time to answer their question, not longer exploration)
- Feature adoption: % of users who access the new comparison view vs. raw transaction table
- NPS or "did you find what you were looking for?" prompt satisfaction score

**Guardrail:**
- Power user access to raw data must not be reduced (SMBs graduating to more sophisticated analysis should not hit a wall)
- Dashboard load time must not increase (these are mobile users checking quickly)`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions that improve revenue understanding for non-data-savvy SMBs.',
        guidance: 'Strong solutions meet users at their mental model, not at a data model. The question SMBs are asking is "am I doing well?" — not "what is my MoM revenue delta?"',
        criteria: [
          'At least 3 solutions from simple to sophisticated',
          'Solutions are grounded in SMB mental models, not analyst mental models',
          'At least one solution uses natural language or plain English interpretation',
          'Solutions consider mobile-first design (many SMBs check on phone)',
        ],
        modelAnswer: `**Option 1: Revenue Snapshot Card (Low effort)**
A prominent card at the top of the dashboard showing: today's revenue vs. same day last week vs. same day last month — with a clear up/down indicator. No percentages (too abstract), just dollar amounts and colored arrows. "Today: $1,247 ↑ $340 vs. last Tuesday." SMBs understand this intuitively — it mirrors how they think about a "good day."

**Option 2: Plain-English Revenue Digest (Medium effort)**
A weekly email or in-app card that describes performance in sentences: "Your best week this month. Top category: Lunch items. Revenue: $8,430 (+12% vs. last week). Your busiest day was Saturday." No charts, no tables. Just business-owner-readable prose. Can be generated with a simple template system (no LLM required initially).

**Option 3: Trend Explanation Feature (Medium-high effort)**
When a metric changes significantly, surface a one-line explanation: "Revenue is up 18% this week — 7 more transactions than usual, average transaction size was flat." Moves from "what happened" to "why it happened" at a level SMBs can act on. More complex to build (requires anomaly detection + causal decomposition), but directly addresses the "why" question they can't currently answer.

**Option 4: Goal-Setting Mode (Medium effort)**
Let SMBs set a monthly revenue goal during onboarding. The dashboard shows progress toward that goal: a simple bar with "$4,200 of $8,000 goal — 52% of the way through the month." Personalized framing of performance against their own expectations. Low data-literacy required.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'What do you ship first? Describe the test and what success looks like at 90 days.',
        guidance: 'SMB retention is the strategic prize. Show that you\'re thinking about long-term engagement, not just short-term feature clicks.',
        criteria: [
          'Clear recommendation with reasoning',
          'Measurement approach covers both short-term activation and long-term retention',
          'Calls out what "success at 90 days" means specifically',
          'V1 scope is mobile-friendly and fast to build',
        ],
        modelAnswer: `**Recommendation: Ship Option 1 (Revenue Snapshot Card) + Option 4 (Goal-Setting Mode) as v1**

Option 1 is the fastest to build and directly addresses the "am I having a good day?" mental model. Option 4 (goal-setting) adds personal context that makes the snapshot meaningful — knowing $1,200 is 15% of your goal vs. knowing $1,200 in isolation are very different insights.

**V1 scope:**
- Prominent revenue snapshot card at top of dashboard (Today / This Week / This Month, each vs. prior period same timeframe)
- Optional goal-setting prompt during onboarding for new users, retroactively available for existing users
- Mobile-optimized (cards, not charts)
- No changes to existing charts/tables below the fold (power users unaffected)

**Measurement:**
- 7-day and 30-day active usage rates for the SMB cohort (treatment: new dashboard; control: old dashboard)
- Support ticket volume for "how do I read my dashboard" category
- NPS survey for SMB segment at 30 days

**Success at 90 days:**
- 7-day active usage rate improves by ≥15% for SMB cohort
- "How do I read my dashboard" support tickets down ≥20%
- Goal-setting adoption ≥40% of new users

**V2:** Plain-English Weekly Digest (Option 2) — low-effort content layer on top of the data we're now surfacing, delivered as a Monday morning email.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PD08 — Instagram: Help Creators Grow Their Audience (PAID)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'pd08',
    title: 'Help Creators Grow Their Audience on Instagram',
    company: 'Instagram',
    companyColor: 'var(--purple)',
    difficulty: 'medium',
    category: 'Social Platform',
    tags: ['creator economy', 'social', 'growth', 'retention'],
    isFree: false,
    prompt: `You are a PM at Instagram. The creator economy is central to Instagram's strategy — creators drive content quality, user engagement, and advertiser value. However, data shows that 68% of creators with under 10K followers report feeling "stuck" — they're posting regularly but not growing. Creators who stagnate for 60 days are significantly more likely to reduce posting frequency or churn entirely.

Design a feature to help small creators (under 10K followers) understand why they're not growing and take concrete actions to change that.`,
    phases: [
      {
        id: 'clarify',
        label: 'Clarify & Scope',
        prompt: 'What clarifying questions would you ask?',
        guidance: 'Creator growth is a complex multi-factor problem: content quality, posting frequency, audience targeting, algorithm fit. Good questions probe which factors are most actionable.',
        criteria: [
          'Asks what "growing" means to creators vs. what metrics matter to Instagram',
          'Asks whether the solution is about analytics, feedback, distribution changes, or all three',
          'Asks which creator types are most affected (photos, Reels, Stories, carousels)',
          'Asks about the current Insights product and where it falls short',
          'Asks about competitive context (YouTube Studio, TikTok creator tools)',
        ],
        modelAnswer: `Clarifying questions:

1. **What does "growing" mean to small creators?** Follower count, reach, engagement rate, DM connections, collaborations? The definition shapes what we build.

2. **What does the current Instagram Insights product show?** If creators have reach and engagement data, is the problem that they can't interpret it, or that the insights don't tell them what to do differently?

3. **Which content formats are most stagnation-prone?** Photo-only creators may be algorithmically disadvantaged vs. Reels creators. If distribution is the core issue, analytics alone won't solve it.

4. **Is this a feedback problem or a distribution problem?** Knowing WHY you're not growing (feedback) is different from being more visible to new audiences (distribution). Both are valid but require very different solutions.

5. **What's the competitive context?** YouTube Studio and TikTok's Creator Portal offer richer creator analytics. Are Instagram creators comparing features?`,
      },
      {
        id: 'users',
        label: 'User Segments',
        prompt: 'Who are the small creators most at risk of stagnation and churn?',
        guidance: 'Not all small creators are the same. Niche topic creators behave differently than aspiring lifestyle creators. Identify segments by both creator type and stagnation cause.',
        criteria: [
          'Identifies at least 3 creator segments with different stagnation causes',
          'Considers posting frequency and format as segment dimensions',
          'Makes a prioritization recommendation with reasoning',
        ],
        modelAnswer: `**Segment 1: Consistent posters with declining reach**
Post regularly but engagement and reach is declining. Often happens when a creator's format becomes less algorithmically favored (e.g., static photos in a Reels-first era) or when their audience stops engaging. They're working hard but the feedback loop is broken.

**Segment 2: Irregular posters who are waiting for traction**
Post occasionally, hoping something goes viral. Low strategic intent. The problem here is behavioral: they need a feedback loop that rewards consistent posting, not just lucky posts.

**Segment 3: Niche/topic-specific creators with small but engaged communities**
May have high engagement rates but low absolute growth. Their followers love them but they can't break out of their niche. Discovery is the problem.

**Focus: Segment 1 (consistent posters with declining reach)**
They're the most motivated, most at-risk of frustrated churn (they're putting in effort without results), and they have enough data to give them actionable feedback. Solving for them also builds infrastructure (content performance diagnosis) that benefits other segments.`,
      },
      {
        id: 'goals',
        label: 'Goals & Metrics',
        prompt: 'Define success metrics for this feature.',
        guidance: 'Creator success metrics must consider both creator outcomes (they grow) AND platform outcomes (they keep posting, which feeds the content loop). These should align, but name both.',
        criteria: [
          'Primary metric captures creator behavior change, not just feature clicks',
          'Includes a metric for actual creator growth as a downstream outcome',
          'Guardrail protects against "vanity features" that feel helpful but don\'t produce growth',
          'Considers time-to-stagnation as a leading indicator',
        ],
        modelAnswer: `**Primary metric: Creator posting continuation rate at 90 days (for stagnation-risk creators)**
If the feature works, small creators who engage with it should post more consistently and for longer. A creator who posts for 90+ days after engaging with the feature is the success story.

**Downstream outcome metric (lags 60–90 days):**
- Average follower growth rate for creators who engage with the feature vs. matched control cohort
- Reach per post trend for the feature-engaged cohort

**Diagnostic:**
- Feature adoption: % of stagnation-risk creators who engage with the new tool
- Action completion: % of creators who take a recommended action (try a Reel, post at a new time, engage with a hashtag suggestion) within 7 days of seeing the recommendation
- Creator-reported "I understand why I'm not growing" NPS item

**Guardrail:**
- Content quality on the platform must not degrade (we don't want creators gaming metrics by posting low-quality content more frequently)
- Time creators spend on analytics must not cannibalize time they spend creating (we want to reduce friction, not create an analytics addiction)`,
      },
      {
        id: 'solutions',
        label: 'Generate Solutions',
        prompt: 'Generate at least 3 solutions. Consider feedback, distribution, and coaching approaches.',
        guidance: 'Strong solutions give creators actionable next steps, not just more data. The gap in the current product is likely "so what do I do?" not "here\'s your reach data."',
        criteria: [
          'At least 3 solutions at different effort levels',
          'At least one solution focuses on actionable recommendations, not just analytics',
          'Solutions consider the emotional dimension of creator stagnation — this is personal',
          'Each solution identifies its key assumption or risk',
        ],
        modelAnswer: `**Option 1: Content Performance Diagnostic (Medium effort)**
A weekly "what's working" summary: shows creators which posts had the highest reach, which had the best engagement-to-reach ratio, and which drove the most new follows. Surfaces patterns: "Your posts with X type of caption get 2x engagement." Goes beyond raw numbers to "your Reels outperformed your photos 4:1 this month." Risk: correlation, not causation — formats that work for one creator may not generalize; we must be careful not to create prescriptive patterns.

**Option 2: Creator Growth Roadmap (Medium-high effort)**
Personalized next-step cards: based on a creator's profile (content type, posting frequency, follower count, engagement rate), surface 3 specific actions: "You haven't tried Reels yet — creators like you who start posting Reels 2x/week see 40% more reach on average." "Your bio doesn't have a clear niche — add a niche keyword and we estimate 15% more follows." Risk: promises that don't pan out damage trust; recommendations must be well-calibrated.

**Option 3: Creator Cohort Benchmarking (Low-medium effort)**
Show creators how they compare to similar creators by niche, account age, and content type: "You're in the top 30% of home decor creators at your stage." Human tendency to benchmark against peers is powerful. Provides context for stagnation: "Most home decor accounts at your size grow 5–8 followers/week — you're at 3." Risk: comparison can be demoralizing if framed poorly; must be encouraging, not shaming.

**Option 4: Audience Insight Map (Medium effort)**
Show creators WHO is engaging with them: age, location, interest clusters. Help them understand if their intended audience is their actual audience. A fitness creator whose audience is 65% over-45 may be producing content misaligned with their perception of their audience. This helps reframe or sharpen content strategy. Risk: privacy constraints; this data may be aggregated in ways that limit actionability.`,
      },
      {
        id: 'prioritize',
        label: 'Prioritize & Next Steps',
        prompt: 'What do you ship first? How do you measure success and what does the v2 roadmap look like?',
        guidance: 'Creator tools require a careful emotional framing — they\'re building a personal brand, and feedback can feel personal. Show that you\'re thinking about tone and trust, not just feature completeness.',
        criteria: [
          'Clear recommendation with emotional/trust framing acknowledged',
          'V1 scope is specific and measurable',
          'V2 roadmap is logical',
          'Measurement approach is honest about the lag between action and outcome',
        ],
        modelAnswer: `**Recommendation: Option 1 (Content Performance Diagnostic) as v1**

**Reasoning:**
It builds trust before making recommendations. Creators need to believe the data before they act on it. Option 2 (Growth Roadmap) is more powerful but requires credibility first — if creators don't trust the performance data, they won't trust the recommendations. Option 1 earns the trust; Option 2 spends it.

**V1 scope:**
- Weekly "Creator Insights Card" for accounts with ≥5 posts in the last 30 days
- Shows: top 3 posts by reach, top 3 by engagement rate, and a simple comparison ("Your Reels got 2x more reach than your photos this month")
- Framing is encouraging, not prescriptive: "Here's what's resonating" not "here's what you're doing wrong"
- No recommendations in v1 — pure signal, not prescription

**Measurement:**
- Primary: 90-day posting continuation rate for creators who engage with the card vs. matched non-engaging cohort
- Secondary: self-reported "do you feel you understand what's working?" (monthly pulse survey)
- Lag warning: follower growth changes will take 60+ days to appear — don't measure this in the first sprint readout

**Trust framing:**
The copy matters enormously here. "Your top-performing posts" feels celebratory. "Your underperforming posts" would feel like criticism. Every element of v1 should read as a coach pointing to strengths, not a system diagnosing failures.

**V2:** Layer in Option 2 (Growth Roadmap) — once creators have been using the diagnostic for 4+ weeks and trust the data, introduce 1–2 specific actionable suggestions per week, individually calibrated, with realistic expectations set upfront.`,
      },
    ],
  },

];
