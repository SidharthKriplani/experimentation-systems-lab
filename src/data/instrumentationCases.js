export const instrumentationCases = [
  {
    id: 'inst01',
    title: 'Measurement Plan for Checkout Redesign',
    subtitle: 'Define what to track before shipping a major feature',
    difficulty: 'junior',
    isFree: true,
    domain: 'measurement-plan',
    company: 'Shopify',
    estimatedMin: 20,
    tags: ['measurement-plan', 'event-tracking', 'checkout', 'pre-launch'],
    situation: 'Shopify is launching a redesigned checkout flow next month. The PM asks you to create a measurement plan. The redesign changes the step order (payment before address instead of address before payment) and adds a one-click reorder button for returning customers. You need to define exactly what to track to evaluate success.',
    question: 'What is in your measurement plan? Define primary metrics, guardrail metrics, events to instrument, and how you validate the instrumentation before launch.',
    hints: [
      'A measurement plan has four parts: primary success metric, secondary metrics, guardrail metrics (must not degrade), and the event schema',
      'For event tracking, think: what user action fires the event, what properties does it carry, what questions can you answer with it?',
      'Instrumentation validation: how do you know the events are firing correctly before you go live?'
    ],
    modelAnswer: {
      approach: 'Define outcome metrics → map events to user journey → specify event schema → validation plan',
      answer: 'Primary metric: checkout_completion_rate (orders placed / checkout sessions started). Secondary: time_to_complete_checkout (median), one_click_reorder_adoption_rate (for returning users), payment_error_rate. Guardrail: cart_abandonment_rate must not increase >2pp, customer_support_tickets about checkout must not increase. Event schema: checkout_step_viewed { step_name, step_number, session_id, user_type: new|returning, timestamp }, checkout_step_completed { same fields + duration_sec }, checkout_abandoned { step_name, reason_if_known }, one_click_reorder_tapped { user_id, previous_order_id }. Validation plan: (1) fire test events in staging and verify they appear in the data warehouse within 5 minutes; (2) manually walk through checkout on 3 device types and confirm event counts match step counts; (3) check that session_id ties all steps together correctly; (4) run a 24h smoke test with 1% of traffic and verify no events are missing or duplicated.',
      keyInsights: [
        'Measurement plans must be written before code ships, not after — retrofitting tracking misses critical user actions',
        'Every event needs a session_id and user_type property or you cannot do funnel analysis',
        'Instrumentation validation (QA on tracking) is as important as feature QA — silent tracking failures are invisible bugs'
      ]
    },
    leadershipNote: 'At staff level, you enforce a measurement plan review gate: no feature ships without a signed-off measurement plan. You also maintain a company-wide event taxonomy so checkout_step_viewed is defined once and reused, not redefined per team. Consistency in naming (snake_case, verb_object pattern) enables cross-team joins later.',
    keyTakeaways: [
      'Measurement plans define primary, secondary, and guardrail metrics plus event schemas — written before code ships',
      'Event validation (staging QA + smoke test) catches silent tracking failures that poison analysis data'
    ],
    playbookLinks: []
  },
  {
    id: 'inst02',
    title: 'Event Taxonomy Design',
    subtitle: 'Build a scalable naming convention for a growing product',
    difficulty: 'senior',
    isFree: false,
    domain: 'event-taxonomy',
    company: 'Notion',
    estimatedMin: 25,
    tags: ['event-taxonomy', 'naming-convention', 'data-governance', 'schema-design'],
    situation: 'Notion has 15 product teams each logging events independently. You join as the first Analytics Engineer and discover 4 different naming conventions in use: camelCase, snake_case, SCREAMING_SNAKE, and free-form strings. There are 847 distinct event names; many are duplicates like page_view, pageView, and PageViewed. Teams can\'t join events across products. Leadership wants a unified event taxonomy in 90 days.',
    question: 'How do you design and migrate to a unified event taxonomy? What trade-offs do you make?',
    hints: [
      'A taxonomy has two parts: naming rules (format) and a semantic model (what categories of events exist)',
      'Migration of existing events breaks downstream dashboards — how do you handle backward compatibility?',
      'Who owns the taxonomy? A centralized gating process vs a decentralized contribution model have different scaling properties'
    ],
    modelAnswer: {
      approach: 'Audit current events → define semantic model → establish naming rules → migration strategy → governance model',
      answer: 'Step 1: Audit. Cluster the 847 events into functional categories — navigation (page_view, screen_viewed), engagement (clicked, scrolled, hovered), feature use (created, edited, deleted, shared), conversion (subscribed, upgraded, invited). Step 2: Semantic model. Adopt the Object-Action pattern: {object}_{action}, e.g., page_viewed, block_created, workspace_shared. All names lowercase snake_case, past tense for completed actions. Step 3: Standard properties. Every event carries: user_id, anonymous_id, timestamp, platform (web|ios|android|api), workspace_id, session_id. Feature-specific properties are additive. Step 4: Migration. Don\'t rename old events — add new canonical events alongside them. Run both for 6 months. Migrate dashboards one team at a time. Deprecate old events after 90% of dashboards have migrated. Step 5: Governance. Event Registry (a versioned YAML repo) is the source of truth. New events require a PR reviewed by Analytics Eng. Auto-reject events that don\'t match naming rules via CI.',
      keyInsights: [
        'Object-Action pattern (block_created, workspace_shared) gives consistent grammar across all product areas',
        'Never hard-rename events in production — it silently breaks all downstream queries and dashboards overnight',
        'A versioned event registry with CI enforcement is the only way to maintain taxonomy hygiene at scale'
      ]
    },
    leadershipNote: 'The organizational challenge is harder than the technical one. Teams resist taxonomy reviews as gatekeeping. Frame it as enabling — a unified taxonomy means your dashboard can join Notion Doc events with Notion Calendar events, which no team can do today. Show a concrete cross-team insight that was only possible after unification, and adoption follows.',
    keyTakeaways: [
      'Object-Action naming pattern (noun_verb, snake_case) is the industry standard for scalable event taxonomies',
      'Migrate by dual-firing new and old events simultaneously — never rename in place, as it destroys downstream dependencies'
    ],
    playbookLinks: []
  },
  {
    id: 'inst03',
    title: 'Data Quality Incident Investigation',
    subtitle: 'DAU dropped 40% overnight — is it real or a tracking bug?',
    difficulty: 'junior',
    isFree: false,
    domain: 'data-quality',
    company: 'Duolingo',
    estimatedMin: 20,
    tags: ['data-quality', 'incident-response', 'dau', 'tracking-bugs'],
    situation: 'Monday morning: Duolingo\'s DAU dashboard shows Sunday DAU was 12.4M, down from 20.8M on Saturday — a 40% drop. The CEO is asking questions. Your job is to determine within 30 minutes whether this is a real user drop or a data pipeline failure.',
    question: 'Walk through your diagnostic process step by step. How do you distinguish a real drop from a tracking issue?',
    hints: [
      'What systems generate DAU? The user, the client app, the event pipeline, the data warehouse, and the dashboard — any of these can fail',
      'If it\'s a pipeline failure, what would you expect to see in the data? If it\'s real user loss, what would you see?',
      'Cross-validate with independent data sources that don\'t share the same pipeline'
    ],
    modelAnswer: {
      approach: 'Cross-validate with independent sources → check pipeline health → check client-side signals → form hypothesis',
      answer: 'Step 1 (5 min): Cross-validate. Check app store ratings and crash rates (no instrumentation dependency). Check server-side request logs — if API calls dropped 40%, it\'s real. If API calls are normal but DAU is down, it\'s a tracking bug. Step 2 (10 min): Pipeline health. Check the event ingestion volume by hour for Sunday. If events stopped arriving at 11pm Saturday, there\'s a pipeline outage. Check ETL job run status — did the DAU computation job fail and rerun on partial data? Check for timezone errors (UTC vs local) causing Sunday events to land in Monday\'s partition. Step 3 (10 min): Client-side signals. Check push notification open rates, lesson completion events (separate pipeline), payment events. If all other metrics dropped proportionally, it\'s real. If only DAU dropped while lesson completions are normal, it\'s a DAU calculation bug. Step 4: Form hypothesis. Most likely causes in order: (1) ETL job failed on partial data, (2) timezone partition error, (3) client SDK update broke user identification, (4) real drop. Never lead with the worst case — data issues are more common than 40% real drops.',
      keyInsights: [
        'Server-side API call logs are the ground truth — if they\'re normal but event-based DAU is down, it\'s always a tracking issue',
        'Timezone and partition errors account for ~30% of sudden metric drops — check them first',
        'Cross-validating with payment data (which has its own pipeline) quickly isolates tracking failures from real events'
      ]
    },
    leadershipNote: 'At staff level, you don\'t just diagnose this incident — you build the prevention system. A data quality monitor runs hourly: if DAU drops >15% vs same hour yesterday, PagerDuty fires before any human notices. The runbook for this exact incident type lives in Confluence. Your job is to never be the person manually investigating this on a Monday morning again.',
    keyTakeaways: [
      'Cross-validate metric drops with independent sources (server logs, payment data) before concluding real vs pipeline issue',
      'Most sudden large metric drops are data pipeline failures — ETL issues, timezone errors, partial data loads'
    ],
    playbookLinks: []
  },
  {
    id: 'inst04',
    title: 'A/B Test Instrumentation Audit',
    subtitle: 'Find the tracking bugs before they invalidate your experiment',
    difficulty: 'senior',
    isFree: false,
    domain: 'ab-test-instrumentation',
    company: 'Airbnb',
    estimatedMin: 30,
    tags: ['ab-testing', 'instrumentation', 'srm', 'assignment-logging'],
    situation: 'Airbnb\'s experimentation platform shows an SRM (Sample Ratio Mismatch) for an ongoing experiment: treatment has 52,000 users, control has 41,000 users (expected 50/50 split). The experiment has been running for 2 weeks and shows a 12% booking conversion lift. The PM wants to ship based on this result.',
    question: 'What tracking bugs can cause SRM? Walk through your audit process and explain why the 12% lift cannot be trusted.',
    hints: [
      'SRM means the randomization or logging is broken — both treatment and control results are unreliable',
      'List the points in the system where assignment or logging can go wrong',
      'When would SRM inflate apparent lift vs deflate it?'
    ],
    modelAnswer: {
      approach: 'Identify SRM sources → audit assignment logging → audit conversion logging → assess bias direction',
      answer: 'SRM causes: (1) Assignment logging: treatment group users are more likely to trigger the assignment log event (e.g., the new feature loads slower, causing some treatment users to leave before the log fires — but this would cause treatment to be smaller, not larger). Opposite: if the new checkout page has better engagement and treatment users have more sessions logged. (2) Client-side vs server-side assignment mismatch: if assignment is server-side but logging is client-side, network failures cause logging dropouts. (3) Bucketing collision: if user IDs hash differently in the assignment system vs the analytics system, some users appear in both groups. (4) Bot filtering applied inconsistently. Audit steps: compare assignment table counts vs event table counts per group. Check if SRM appeared from day 1 (bucketing bug) or grew over time (logging dropoff). Check if SRM is concentrated in a specific platform (iOS vs Android). The 12% lift cannot be trusted because SRM indicates the treatment and control groups are not equivalent — the extra 11,000 treatment users are non-randomly different (likely more engaged users). Any lift estimate is contaminated by selection bias. Do not ship. Fix the SRM, re-run the experiment.',
      keyInsights: [
        'SRM immediately invalidates all metric estimates — both treatment and control groups are non-representative',
        'SRM that grows over time = logging dropout (network issue, SDK bug); SRM from day 1 = bucketing or assignment bug',
        'The correct action on SRM is always: stop the experiment, diagnose, fix, restart with clean data'
      ]
    },
    leadershipNote: 'At senior/staff level, SRM checks should be automated: the experimentation platform flags any experiment with SRM p<0.001 and prevents result reporting until it\'s resolved. Never let a team ship on SRM-contaminated data — the PM pressure to ship on a "12% lift" is a recurring failure mode that erodes trust in experimentation over time.',
    keyTakeaways: [
      'SRM invalidates the entire experiment — not just the affected arm — because groups are no longer randomized equivalents',
      'Automated SRM alerts on the experimentation platform prevent teams from reporting on contaminated experiments'
    ],
    playbookLinks: []
  },
  {
    id: 'inst05',
    title: 'Privacy-Compliant Event Design',
    subtitle: 'Redesign tracking for GDPR and CCPA compliance without losing signal',
    difficulty: 'senior',
    isFree: false,
    domain: 'privacy-consent',
    company: 'Spotify',
    estimatedMin: 25,
    tags: ['privacy', 'gdpr', 'ccpa', 'consent', 'anonymization'],
    situation: 'Spotify\'s legal team flags that the current analytics tracking collects user_id, IP address, precise geolocation, and device fingerprint in every event payload. Under GDPR Article 5, data must be "collected for specified, explicit and legitimate purposes" with data minimization. The current schema fails this test. You need to redesign the event schema to maintain analytical fidelity while achieving compliance.',
    question: 'How do you redesign the tracking schema to be GDPR/CCPA compliant without breaking your ability to do user-level analysis, funnel analysis, and A/B test assignment?',
    hints: [
      'What is the minimum user identifier you need for analytics? Does it need to be reversible to a real user_id?',
      'Pseudonymization (hashing user_id) is different from anonymization (removing user_id entirely) — each has different compliance and analytical implications',
      'Consent tiers: what can you track without consent vs with consent?'
    ],
    modelAnswer: {
      approach: 'Data minimization audit → pseudonymization design → consent tier mapping → migration plan',
      answer: 'Step 1: Audit necessity. IP address is never needed for analytics — remove entirely. Precise geolocation (lat/lng) can be country+city for 95% of use cases — truncate to city level. Device fingerprint is a GDPR red flag — replace with a session-scoped anonymous_id that doesn\'t persist across sessions. Step 2: Pseudonymization. Replace user_id with a hashed_user_id: SHA-256(user_id + daily_salt). The salt rotates daily, so the hash can\'t be joined across days (protecting long-term tracking) but within a day all events tie together for funnel analysis. Reversing requires access to the salt table, which is access-controlled. Step 3: Consent tier. Tier 0 (no consent): anonymous session events, aggregate counts only, no user-level properties. Tier 1 (functional consent): pseudonymized_user_id, country, platform, app_version — sufficient for A/B test assignment and funnel analysis. Tier 2 (analytics consent): content interaction events, listening history — requires explicit opt-in. Step 4: A/B tests use tier 1 identifiers — pseudonymized_user_id is stable within an experiment window and sufficient for assignment.',
      keyInsights: [
        'Pseudonymization (hashed ID with rotating salt) preserves analytical joins while preventing cross-context tracking',
        'IP address and precise geolocation are almost never analytically necessary — remove them by default',
        'Consent tiers allow you to maintain core analytics on all users while respecting opt-out for richer behavioral data'
      ]
    },
    leadershipNote: 'Privacy-by-design is a competitive advantage, not just compliance. At director level, you establish a Data Minimization Review as part of the measurement plan process: every new event field must justify its collection. This reduces legal risk and builds user trust, which increasingly correlates with engagement in privacy-conscious markets.',
    keyTakeaways: [
      'Pseudonymize with rotating salts to preserve within-session joins while preventing cross-context user tracking',
      'Consent tiers ensure core product analytics continue without consent while richer behavioral data requires opt-in'
    ],
    playbookLinks: []
  },
  {
    id: 'inst06',
    title: 'Data Contract Design',
    subtitle: 'Define a contract between producers and consumers of event data',
    difficulty: 'staff',
    isFree: false,
    domain: 'data-contracts',
    company: 'Uber',
    estimatedMin: 30,
    tags: ['data-contracts', 'schema-evolution', 'data-engineering', 'sla'],
    situation: 'Uber\'s Marketplace team ships an update that renames a field in their trip_completed event from driver_id to driver_uuid. This silently breaks 47 downstream dashboards and 12 ML models. The incident takes 3 days to fully resolve. The VP of Data asks you to design a system that prevents this class of incident.',
    question: 'What is a data contract, what does it contain, and how do you enforce it to prevent breaking changes from propagating downstream?',
    hints: [
      'A data contract is an agreement between the team that produces data and the teams that consume it',
      'What makes a schema change "breaking" vs "non-breaking"? Not all changes are equal',
      'How do you discover all downstream consumers before making a change?'
    ],
    modelAnswer: {
      approach: 'Define data contract components → classify breaking vs non-breaking changes → discovery mechanism → enforcement pipeline',
      answer: 'A data contract for trip_completed contains: (1) Schema: field names, types, nullability — versioned and stored in a schema registry. (2) SLA: event latency (P99 < 30 min), completeness (>99.5% of trips produce an event within 1 hour). (3) Owner: Marketplace team, on-call rotation for incidents. (4) Consumers: a discovery registry that every consumer must register in — 47 dashboards and 12 models would be listed. Breaking vs non-breaking: renaming a field is breaking. Adding a new optional field is non-breaking. Removing a field is breaking. Changing a type (int→string) is breaking. Enforcement: (1) Schema registry with compatibility checks — reject any event payload that violates the registered schema. (2) Before any breaking change, the producer runs an impact query against the consumer registry and notifies all owners. (3) A compatibility mode: dual-fire old and new field names for one deprecation period (30 days). (4) CI check: any PR that modifies an event schema triggers automated consumer notification.',
      keyInsights: [
        'Data contracts include schema, SLA, ownership, AND a consumer registry — the consumer registry is what makes breakage discoverable',
        'Dual-firing old and new field names during deprecation period is the only safe way to rename fields at scale',
        'Schema registries with compatibility enforcement catch breaking changes at publish time, not 3 days later in dashboards'
      ]
    },
    leadershipNote: 'Data contracts are a cultural intervention as much as a technical one. The Uber incident happened because the Marketplace team didn\'t know their event had 47 consumers — the knowledge wasn\'t discoverable. At director level, you mandate consumer registration and make it visible: "Your event trip_completed has 47 registered consumers — here they are." That number alone changes behavior.',
    keyTakeaways: [
      'Data contracts require a consumer registry — without knowing who depends on your data, you can\'t assess breaking change impact',
      'Schema registries with dual-fire deprecation periods are the operational mechanism for safe schema evolution'
    ],
    playbookLinks: []
  },
  {
    id: 'inst07',
    title: 'Tracking Plan for a New Feature Launch',
    subtitle: 'Design end-to-end instrumentation for a social sharing feature',
    difficulty: 'junior',
    isFree: false,
    domain: 'measurement-plan',
    company: 'Pinterest',
    estimatedMin: 20,
    tags: ['tracking-plan', 'feature-launch', 'social-sharing', 'event-design'],
    situation: 'Pinterest is launching a new feature: users can now create "Collections" (curated boards shared publicly with a custom URL). Product wants to know if Collections drives new user acquisition and increases saves. You need to design the tracking plan before the feature ships in 3 weeks.',
    question: 'Define the full tracking plan: what events, what properties, what metrics, and how do you verify the tracking is correct before launch?',
    hints: [
      'Map the user journey first: what are all the steps a user takes from discovering Collections to creating one and sharing it?',
      'Acquisition funnel for a sharing feature has two sides: the creator and the viewer who finds Pinterest via the shared link',
      'What is the North Star metric for this feature? How does it connect to Pinterest\'s overall growth?'
    ],
    modelAnswer: {
      approach: 'Map user journey → define events per touchpoint → specify properties → metrics definition → QA plan',
      answer: 'User journey: (1) User discovers Collections feature → (2) Creates a collection → (3) Adds pins → (4) Shares the URL → (5) Recipient views collection → (6) Recipient signs up or saves a pin. Events: collection_feature_discovered { surface: onboarding|feed|profile, user_id }, collection_created { user_id, collection_id, pin_count }, collection_shared { user_id, collection_id, share_channel: link|social|email }, collection_viewed { collection_id, viewer_user_id (nullable if anonymous), referrer: direct|social|email|search }, collection_pin_saved { collection_id, pin_id, viewer_user_id }, new_user_signup_from_collection { collection_id, referrer_channel }. Key properties on all events: platform, app_version, timestamp, session_id. Metrics: Collection creation rate (creators / eligible users), Share rate (shares / collections created), Viral coefficient (new signups from shares / shares sent), Pin save rate from shared collections. North Star connection: new signups from Collections → retained users → saves → creator flywheel. QA: manually create a collection and walk through all steps on iOS, Android, and web; verify each event fires in the debug view; check that collection_id is consistent across all downstream events.',
      keyInsights: [
        'Two-sided features (creator and viewer) require tracking both sides of the funnel separately',
        'collection_id must be a join key on all events so you can trace virality: share → view → signup',
        'Viral coefficient (new signups / shares) is the acquisition metric unique to sharing features'
      ]
    },
    leadershipNote: 'This is also a privacy design moment: the viewer\'s collection_viewed event includes anonymous viewers. You must ensure anonymous viewer data is not joined to signed-in activity without consent. At staff level, you\'d review this with the privacy team before shipping.',
    keyTakeaways: [
      'Two-sided features require events on both creator and viewer journeys — track the full viral loop',
      'A join key (collection_id) threading through all events enables tracing from share to signup to engagement'
    ],
    playbookLinks: []
  },
  {
    id: 'inst08',
    title: 'Instrumentation Debt Audit',
    subtitle: 'Triage a legacy tracking system with 300+ broken events',
    difficulty: 'staff',
    isFree: false,
    domain: 'data-quality',
    company: 'HubSpot',
    estimatedMin: 35,
    tags: ['technical-debt', 'instrumentation-audit', 'data-quality', 'prioritization'],
    situation: 'HubSpot acquired a startup 18 months ago. The acquired product has 300+ event types, but an audit reveals: 40% have schema inconsistencies (different properties in different client versions), 25% haven\'t fired in 6 months (dead events), 15% have duplicate semantics (signup_completed and user_registered track the same action), and 20% are undocumented. The data team is spending 30% of their time fielding questions about what these events mean.',
    question: 'How do you triage and remediate 300+ broken events? Define your prioritization framework and the steps you take over a 6-month remediation.',
    hints: [
      'Not all 300 events need fixing — what is the business impact of each broken event?',
      'Fixing events that nobody uses is a low-value activity — start with usage data',
      'The organizational work (getting engineers to update tracking) is harder than the technical work'
    ],
    modelAnswer: {
      approach: 'Usage audit → impact triage → remediation sprints → governance to prevent recurrence',
      answer: 'Month 1: Usage audit. Pull query frequency for all 300 events over last 6 months. Categorize: Tier 1 (queried >10x/month, business-critical: ~20 events), Tier 2 (queried 1-10x/month: ~80 events), Tier 3 (never queried: ~200 events). For Tier 3: schedule deprecation after 30-day notice. Do not fix what nobody uses. Month 2-3: Tier 1 remediation. For each Tier 1 event: (1) document the intended semantic in the event registry; (2) identify all client versions with schema inconsistencies; (3) add a schema validation layer that normalizes inconsistent payloads or flags them; (4) contact engineering teams to fix inconsistencies in next sprint. Merge duplicate events (signup_completed and user_registered → account_created with a migration note). Month 4-5: Tier 2 remediation. Lower-touch: add documentation and flag inconsistencies without necessarily fixing client code. Month 6: Governance. Introduce event registry with required fields: owner, semantic definition, example payload, linked dashboard. All new events require registry entry before shipping. Dead event cleanup becomes quarterly instead of ad hoc.',
      keyInsights: [
        'Usage-based triage (Tier 1/2/3 by query frequency) prevents wasting 6 months fixing events nobody uses',
        'Deprecate dead events proactively — having 300 events in the system when 200 are dead creates permanent confusion',
        'Governance (event registry with ownership) prevents instrumentation debt from accruing again after remediation'
      ]
    },
    leadershipNote: 'The 30% of data team time spent answering event questions is the business case for this project. At director level, frame it as: we are going to reclaim 30% of the data team\'s capacity by investing 6 months in cleanup and governance. That\'s the ROI argument. Instrumentation debt is invisible until you measure the cost.',
    keyTakeaways: [
      'Triage by query frequency — fix Tier 1 (business-critical, heavily used) events first, deprecate unused events',
      'An event registry with mandatory ownership is the governance mechanism that prevents instrumentation debt from recurring'
    ],
    playbookLinks: []
  }
];

export const instrumentationCasesById = Object.fromEntries(
  instrumentationCases.map(c => [c.id, c])
);
