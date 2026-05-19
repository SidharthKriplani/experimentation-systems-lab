export const estimationProblems = [
  {
    id: 'EST01',
    title: 'Uber Rides in NYC Right Now',
    subtitle: 'Market Sizing · Rideshare',
    difficulty: 'Analyst',
    isFree: true,
    tags: ['rideshare', 'market-sizing', 'real-time', 'NYC'],
    category: 'market-sizing',
    approach: 'bottom-up',

    prompt: 'Estimate how many Uber rides are happening in New York City right now (assume a typical weekday morning around 9am).',

    frameworkSteps: [
      'Step 1 — Anchor with population: Start with NYC\'s population (~8.5M residents) and identify the addressable user base.',
      'Step 2 — Estimate daily rides: Determine what share of the population uses Uber and how often, to get a total daily ride count.',
      'Step 3 — Convert to hourly rate: Divide daily rides by 24 hours, then apply a peak-hour multiplier for 9am.',
      'Step 4 — Sanity check: Cross-check against Uber\'s reported global daily rides and NYC\'s estimated share of the global rideshare market.',
    ],

    hints: [
      'NYC\'s population is ~8.5M, but factor in tourists (~65M visits/year adds ~180k average visitors at any given time).',
      'Not everyone in NYC uses Uber — consider the subway\'s role. Roughly 25-30% of NYers are regular Uber users.',
      'Average Uber user in a city like NYC takes roughly 2 rides per week, or about 0.29 rides per day.',
      'Peak hours (7-9am, 12-1pm, 5-7pm) carry about 2-2.5x the hourly average ride volume.',
      'Global rideshare check: Uber reported ~18M daily global rides; NYC is roughly 5% of global rideshare demand.',
    ],

    modelAnswer: {
      walkthrough: `Start with the NYC addressable population. NYC has ~8.5M residents plus an average of ~180k tourists at any given time (65M annual visits ÷ 365), giving ~8.68M people in the city.

Uber penetration: In NYC the subway is dominant, so not everyone Ubers. Estimate ~28% of the population as regular Uber users → 8.68M × 0.28 ≈ 2.43M Uber users.

Rides per user per day: A typical NYC Uber user might take 2 rides per week (airport, late nights, rain days, convenience trips). That's 2 ÷ 7 ≈ 0.29 rides/user/day. Total daily rides: 2.43M × 0.29 ≈ 704k rides/day.

Convert to per-hour average: 704k ÷ 24h ≈ 29,300 rides/hour on average.

Apply peak multiplier: At 9am on a weekday, rideshare demand is ~2.2x the hourly average (morning commute surge). Rides in progress at any given moment of a 9am-hour window: ~29,300 × 2.2 ≈ 64,500 rides/hour.

But "right now" means simultaneous rides in progress, not rides started per hour. Average Uber trip in NYC is about 15 minutes (0.25 hours). Rides in flight at one instant = 64,500 × 0.25 ≈ 16,000 concurrent rides.

Range: 10,000–25,000 concurrent rides, with a point estimate of ~16,000.

Sanity check via global data: Uber reported ~18M daily rides globally. NYC represents roughly 5% of global rideshare volume → 18M × 0.05 = 900k rides/day in NYC. This is slightly higher than our 704k bottom-up — suggesting our Uber penetration estimate is conservative. Adjusting to 900k/day: peak hour = 900k/24 × 2.2 = 82,500 rides/hour × 0.25h average trip = ~20,600 concurrent rides. Consistent with the 10k–25k range.`,
      keyAssumptions: [
        '28% of NYC residents/visitors are regular Uber users — lower than other US cities due to NYC subway coverage',
        '2 rides/week per user — reflects occasional-to-moderate usage in a transit-heavy city',
        '2.2x peak multiplier at 9am — based on typical rideshare demand curves published in Uber driver forums',
        '15-minute average trip duration in NYC — consistent with published Uber data for dense urban markets',
        'NYC = ~5% of global Uber demand — based on NYC being the largest US rideshare market',
      ],
      finalEstimate: 'Range: 10,000–25,000 concurrent rides at 9am on a weekday',
      sanityChecks: [
        'Global check: 18M global daily rides × 5% NYC share = 900k/day → ~20k concurrent at peak. Consistent.',
        'Driver check: NYC has ~80k active Uber drivers. At peak utilization ~40% are on trips → 32k rides. Our estimate is within 2x, which is reasonable given different utilization assumptions.',
        'Revenue check: At avg $18/ride, 900k rides/day = $16M daily NYC gross booking. At 25% take rate = $4M revenue/day from NYC alone. Plausible for a top market.',
      ],
    },

    strongAnswerMarkers: [
      'Distinguishes between rides per hour and concurrent rides in flight (uses trip duration)',
      'Applies a peak multiplier rather than just using hourly average',
      'Cross-validates with a global top-down anchor (18M daily global rides)',
      'Explicitly states assumptions about Uber penetration given NYC\'s strong subway system',
      'Arrives at a range rather than a single point estimate',
    ],

    commonMistakes: [
      'Treating "rides per hour" as the same as "rides happening right now" — you need to multiply by trip duration (0.25h) to get concurrent count',
      'Ignoring the subway — NYC Uber penetration is much lower than in car-dependent cities like LA',
      'Using total population as the user base without applying a penetration rate',
      'Forgetting to apply a peak-hour multiplier for a 9am scenario',
      'Anchoring only on global data without building up from first principles — you should do both and reconcile',
    ],
  },

  {
    id: 'EST02',
    title: 'YouTube Storage Cost Per Year',
    subtitle: 'Cost Estimation · Cloud Infrastructure',
    difficulty: 'Senior',
    isFree: true,
    tags: ['YouTube', 'storage', 'infrastructure', 'cost'],
    category: 'cost-estimation',
    approach: 'hybrid',

    prompt: 'Estimate the total storage cost YouTube incurs for video uploads in a single year (new uploads only, not the existing library).',

    frameworkSteps: [
      'Step 1 — Estimate upload volume: Quantify hours of video uploaded per year using the "minutes per minute uploaded" anchor.',
      'Step 2 — Convert to raw storage: Estimate average file size per hour of video across all quality levels.',
      'Step 3 — Account for transcoding: YouTube stores multiple resolutions (360p, 720p, 1080p, 4K). Apply a multiplier.',
      'Step 4 — Apply storage unit cost: Use public cloud pricing as a proxy for the cost per TB/month.',
      'Step 5 — Sanity check: Cross-check using public cloud cost benchmarks and YouTube\'s known infrastructure scale.',
    ],

    hints: [
      'YouTube has publicly stated ~500 hours of video are uploaded every minute.',
      'A 1-hour video at 1080p is roughly 2-4 GB; but many uploads are 480p or lower. Use ~1 GB/hour as a blended average raw size.',
      'YouTube transcodes each upload into ~5 quality tiers (240p, 360p, 480p, 720p, 1080p). The transcoded total is ~4x the original raw size.',
      'Public cloud storage (AWS S3, GCS) runs ~$20/TB/month for hot storage. Google\'s internal cost is likely 5-10x cheaper at their scale — use $3-5/TB/month as a reasonable hyperscaler estimate.',
      'Don\'t forget: storage cost is ongoing (you pay every month), not just on the day of upload.',
    ],

    modelAnswer: {
      walkthrough: `Start with upload volume. YouTube has stated ~500 hours of video are uploaded per minute. Scale that up:
500 hours/minute × 60 minutes/hour × 24 hours/day × 365 days/year = 500 × 525,600 = 262.8M hours uploaded per year.

Raw storage per hour: A blended average across all quality levels of uploads (many are short, low-res user videos; some are professional 4K). Estimate ~1 GB per hour of raw video on average. Raw storage: 262.8M hours × 1 GB = 262.8M GB ≈ 263 petabytes (PB) of raw uploads/year.

Transcoding multiplier: YouTube stores each video in approximately 5 quality tiers (240p, 360p, 480p, 720p, 1080p) plus original. The transcoded versions combined are roughly 4× the original size. Total stored per year: 263 PB × 4 = 1,052 PB ≈ 1 exabyte of new storage added per year.

Storage cost: Google's internal storage at hyperscale is far cheaper than public cloud. Use ~$3/TB/month as an estimate for Google's internal cost (vs. $20-23/TB/month on AWS/GCS public pricing). 1,052 PB = 1,052,000 TB. Annual cost for just the first year's data (12 months average across the year, since uploads are spread over the year):
- If all 1 exabyte were stored from Jan 1, cost = 1,052,000 TB × $3/TB/month × 12 months = $37.9B/year — that's way too high. The error: not all of this year's uploads arrived on Jan 1.
- Correct annualization: Average TB-months for new 2024 uploads = 1,052,000 TB × 6.5 average months stored in first year ≈ 6.8M TB-months × $3 = ~$20.5M for the first year's storage of new uploads.
- Ongoing: This ~1 exabyte of new uploads then costs $3M/month ($36M/year) every subsequent year.

Summary: New uploads in year 1 cost ~$20M in storage for that year (partial-year basis). Ongoing annual storage cost for that cohort = ~$36M/year in perpetuity.

For a simpler framing the interviewer likely wants: Total cloud-equivalent cost for new uploads' first year = ~$60-120M if using public cloud pricing ($20/TB/month): 1,052,000 TB × $20/TB/month × 6.5 months = ~$137M. Range: $20M-$140M depending on Google's internal pricing advantage.`,
      keyAssumptions: [
        '500 hours uploaded per minute — widely published stat, though it has grown over time',
        '1 GB/hour blended average raw size — conservative estimate across all quality levels',
        '4x transcoding multiplier — YouTube stores ~5 quality tiers; 4x is a middle estimate',
        '$3/TB/month internal Google cost — public GCS is $20/TB/month; Google\'s scale gives ~5-7x cost advantage',
        'Only new uploads in one year counted — existing petabyte-scale library excluded per the question',
      ],
      finalEstimate: 'Range: $20M–$140M per year for new upload storage, depending on pricing model (Google internal vs. public cloud equivalent)',
      sanityChecks: [
        'Public cloud cross-check: 1,052 PB × $20/TB/month × 6.5 months ≈ $137M. Consistent with the upper bound.',
        'Revenue ratio: YouTube\'s estimated revenue is ~$30B/year. A $50-100M storage cost for new uploads is ~0.3% of revenue — plausible for a content platform.',
        'Netflix comparison: Netflix reportedly stores ~100 PB of content. YouTube adds 10x that per year, so storage costs 10x larger than Netflix\'s ~$20-30M/year estimate. Directionally consistent.',
      ],
    },

    strongAnswerMarkers: [
      'Correctly annualizes by recognizing that uploads throughout the year are stored for varying amounts of time (average ~6.5 months in year 1)',
      'Applies the transcoding multiplier (~4x) rather than just using raw upload size',
      'Distinguishes between public cloud pricing and hyperscaler internal costs',
      'Arrives at a range and explains what drives the range (internal vs. external pricing)',
      'Notes that "cost of new uploads" is separate from "total library storage cost"',
    ],

    commonMistakes: [
      'Treating 1 exabyte as fully stored from January 1 — leads to 10x overestimate; uploads are distributed across the year',
      'Forgetting the transcoding multiplier — raw upload size is only 1/4 of what\'s actually stored',
      'Using public cloud retail pricing ($20/TB/month) without noting Google\'s scale advantage',
      'Confusing "storage cost for new uploads" with "total YouTube storage cost including historical library"',
      'Getting the unit conversions wrong (PB → TB → GB) — work through units explicitly',
    ],
  },

  {
    id: 'EST03',
    title: 'WhatsApp Users in India',
    subtitle: 'Market Sizing · Messaging',
    difficulty: 'Analyst',
    isFree: false,
    tags: ['WhatsApp', 'India', 'DAU/MAU', 'messaging'],
    category: 'market-sizing',
    approach: 'top-down',

    prompt: 'Estimate the number of daily active WhatsApp users in India.',

    frameworkSteps: [
      'Step 1 — Start with total population: India\'s ~1.4B people, then filter to the addressable base.',
      'Step 2 — Apply smartphone penetration: Only smartphone owners can use WhatsApp.',
      'Step 3 — Apply WhatsApp adoption rate: Among Indian smartphone users, WhatsApp penetration is unusually high.',
      'Step 4 — Apply DAU/MAU ratio: Convert from installs → monthly actives → daily actives.',
      'Step 5 — Sanity check: WhatsApp has disclosed India figures in press releases and legal filings.',
    ],

    hints: [
      'India\'s smartphone penetration is around 55% of the population as of 2024.',
      'WhatsApp is effectively the default messaging platform in India — penetration among smartphone users is extremely high (~85-90%).',
      'For a messaging app this embedded in daily life, DAU/MAU ratios are high — estimate 70-75% DAU/MAU.',
      'The published figure for India is ~500M monthly active users. Your estimate should land near that.',
    ],

    modelAnswer: {
      walkthrough: `India population: ~1.4 billion people.

Smartphone penetration: ~55% of the population owns a smartphone → 1.4B × 0.55 = 770M smartphone users.

WhatsApp adoption rate in India: WhatsApp is the near-universal messaging app in India, effectively replacing SMS. Penetration among smartphone owners is ~85-90%. Use 88%: 770M × 0.88 = 678M WhatsApp installs/MAU-eligible users.

Monthly Active Users: Not every install is active monthly. Some users have WhatsApp but rarely open it. Estimate ~90% of installs are monthly active (very high because WhatsApp groups for family, work, community are pervasive): 678M × 0.90 = 610M MAU.

Daily Active Users: For a messaging app this integrated into daily communication, DAU/MAU is ~70-75%. Use 72%: 610M × 0.72 = 439M DAU.

Range: 400M–470M DAU in India.

Sanity check: WhatsApp publicly stated ~500M users in India (this appears to be MAU). Our MAU estimate is 610M — about 20% higher. The slight overestimate likely comes from:
1. Smartphone penetration may be closer to 50% (not 55%) in 2024, especially in rural areas.
2. Some dual-SIM users may show as 2 accounts.
Adjusting smartphone penetration to 50%: 1.4B × 0.50 = 700M × 0.88 = 616M installs × 0.90 MAU = 554M MAU × 0.72 = 399M DAU. Still in the right ballpark.`,
      keyAssumptions: [
        '55% smartphone penetration in India — this is the midpoint; rural penetration is lower (~35%) while urban is 75%+',
        '88% WhatsApp penetration among smartphone users — conservative given some users are iOS on iMessage or corporate MDM',
        '90% MAU rate — high because WhatsApp groups (family, school, neighborhood) drive habitual daily checking',
        '72% DAU/MAU — benchmarked against other high-engagement messaging apps (WhatsApp\'s ratio is estimated around this level)',
      ],
      finalEstimate: 'Range: 380M–470M daily active users in India',
      sanityChecks: [
        'Published MAU figure: ~500M India MAU × 72% DAU/MAU = 360M DAU. Our estimate of 400-470M is slightly higher, suggesting slightly optimistic penetration assumptions.',
        'India vs. global: WhatsApp has ~2B global MAU. India at 500M = 25% of global MAU. India is ~17% of world population. The 25% share makes sense given WhatsApp\'s dominant position vs. competing apps like WeChat in China, iMessage in US/UK.',
        'Revenue context: At ~$0 direct revenue per user, India\'s ~500M MAU is strategic rather than monetized — aligns with Meta\'s stated approach of India as a growth market for future monetization.',
      ],
    },

    strongAnswerMarkers: [
      'Uses a funnel approach: population → smartphones → installs → MAU → DAU rather than jumping straight to DAU',
      'Applies a DAU/MAU ratio explicitly, rather than treating all users as daily active',
      'Notes regional variation (urban vs. rural smartphone penetration)',
      'Cross-validates against the known published figure and explains the gap',
      'Arrives at a range with the key drivers of uncertainty called out',
    ],

    commonMistakes: [
      'Applying WhatsApp penetration to total India population rather than just smartphone users',
      'Treating MAU = DAU — messaging apps have high but not 100% daily engagement',
      'Using global smartphone penetration (~57%) rather than India-specific (~50-55%)',
      'Confusing "users" (often means MAU) with "daily actives" — the question asks specifically for DAU',
      'Forgetting that dual-SIM phones are common in India and some users have 2 WhatsApp numbers',
    ],
  },

  {
    id: 'EST04',
    title: 'Restaurant Listings on Yelp',
    subtitle: 'Market Sizing · Consumer Platforms',
    difficulty: 'Analyst',
    isFree: false,
    tags: ['Yelp', 'restaurants', 'bottom-up', 'US market'],
    category: 'market-sizing',
    approach: 'bottom-up',

    prompt: 'Estimate how many restaurant listings are on Yelp in the United States.',

    frameworkSteps: [
      'Step 1 — Estimate total US restaurants: Build up from household dining-out frequency and restaurant capacity.',
      'Step 2 — Estimate Yelp\'s coverage rate: Not all restaurants are on Yelp. Consider what share have been claimed or auto-listed.',
      'Step 3 — Account for non-restaurant food businesses: Yelp includes bars, cafes, food trucks, etc. Apply a multiplier if relevant.',
      'Step 4 — Sanity check: Cross-check against the National Restaurant Association total count and published Yelp business stats.',
    ],

    hints: [
      'The US has ~131M households. Average household eats out or orders in roughly 3-4 times per week.',
      'A typical restaurant serves about 150-250 covers per day.',
      'Not every restaurant in the US is on Yelp — particularly small, cash-only local spots. Estimate Yelp\'s coverage at ~50-60% of all US restaurants.',
      'The National Restaurant Association reports ~1M restaurant locations in the US.',
      'Yelp includes bars, cafes, bakeries, food trucks beyond just "restaurants." The "restaurant" category is roughly 50-60% of all food/drink Yelp listings.',
    ],

    modelAnswer: {
      walkthrough: `Build from household dining behavior.

US population: 330M people, ~2.5 people per household → 132M households.

Dining-out frequency: Average US household eats out or orders from a restaurant about 3 times per week (mix of dine-in, takeout, delivery). Total restaurant visits per week: 132M × 3 = 396M visits/week.

Restaurant capacity: A typical US restaurant serves about 200 diners per day (lunch + dinner + takeout), 7 days/week = 1,400 covers/week. Number of restaurants needed to serve demand: 396M ÷ 1,400 = ~283k restaurants.

But wait — 200 covers/day is for a mid-size sit-down restaurant. Many US restaurants are much smaller (food stalls, small diners at 50 covers/day) or much larger (chains at 500+/day). Using a blended average of 150 covers/day × 7 days = 1,050/week: 396M ÷ 1,050 = ~377k restaurants. Still feels low.

The issue: we're undercounting meal occasions. Many Americans eat fast food (McDonald's alone serves ~69M customers/day globally, ~40M in the US). Including QSR, fast casual, and delivery-only restaurants: total US foodservice units is about 1M per the NRA. Our demand-side estimate of 300-400k represents sit-down and independent restaurants; the other 600k are fast food chains and franchise units.

Revised estimate for total US restaurants (all types): ~1M.

Yelp coverage: Yelp has been around since 2004 and has strong penetration in urban/suburban areas. Coverage for sit-down restaurants: ~75-80%. Coverage for fast food chains (McDonald's, Starbucks): ~90%+ (auto-listed). Coverage for very small, cash-only local spots: ~30-40%. Blended coverage: ~60%.

Yelp restaurant listings: 1M × 60% = 600k restaurant-category listings.

But Yelp also lists bars, cafes, food trucks. Total food/drink = ~600k / 0.55 = ~1.09M total food/drink listings (if restaurants are 55% of that category). The question asks specifically for restaurants: ~600k.`,
      keyAssumptions: [
        '3 restaurant visits per household per week — slightly below the NRA\'s reported average of ~5.5 eating occasions outside home, but accounting for grocery delivery/meal kits',
        '150 average covers/day across all restaurant types — blended across fast food (high volume) and fine dining (low volume)',
        'NRA total of ~1M restaurant locations — used as the cross-check anchor',
        '60% Yelp coverage rate — higher in urban markets, lower in rural; Yelp auto-lists many businesses from public data',
      ],
      finalEstimate: 'Range: 500,000–700,000 restaurant listings on Yelp in the US',
      sanityChecks: [
        'NRA reports ~1M US restaurants × 60% Yelp coverage = 600k. Bottom-up demand approach gives ~380k sit-down + ~620k QSR ≈ 1M total → same answer.',
        'Yelp reported ~600k claimed business locations in 2023. Total listed (including unclaimed) is higher — ~3-5M total businesses across all categories. Food/drink is ~25-30% of listings → 750k-1.5M food listings. Restaurants specifically ~500-700k.',
        'Revenue check: If Yelp generates ~$1.3B annual revenue and has ~600k restaurant listings, average revenue per restaurant listing ≈ $2,167/year. At $300/month for a typical Yelp ad package and ~30% conversion to paid → ($300 × 12 × 0.30 × 600k = $648M from restaurants alone). Consistent with Yelp\'s actual advertising revenue profile.',
      ],
    },

    strongAnswerMarkers: [
      'Builds demand-side estimate (how many meals are served) and supply-side (how many restaurants does that require) separately then reconciles',
      'Distinguishes between sit-down restaurants (~300-400k) and QSR/fast food (~600k) to reach the NRA\'s 1M total',
      'Applies a Yelp-specific coverage rate rather than assuming 100% of restaurants are listed',
      'Explicitly notes that the question asks for restaurants vs. all food/drink businesses on Yelp',
    ],

    commonMistakes: [
      'Only estimating sit-down restaurants and ignoring QSR/fast food — undercounts by 2x',
      'Treating Yelp coverage as 100% — many small restaurants are not on Yelp',
      'Applying restaurant density per capita without accounting for different restaurant types and sizes',
      'Confusing total Yelp business listings (~5M) with restaurant-specific listings (~600k)',
      'Not doing a sanity check against the NRA\'s published ~1M restaurants figure',
    ],
  },

  {
    id: 'EST05',
    title: 'Songs Available on Spotify',
    subtitle: 'Product Metrics · Music Streaming',
    difficulty: 'Analyst',
    isFree: false,
    tags: ['Spotify', 'catalog', 'music', 'product-metrics'],
    category: 'product-metrics',
    approach: 'hybrid',

    prompt: 'Estimate the total number of songs available on Spotify\'s platform today.',

    frameworkSteps: [
      'Step 1 — Estimate historical catalog: How many commercial songs were recorded annually across different decades?',
      'Step 2 — Estimate digital-era explosion: DIY distribution platforms (DistroKid, TuneCore) dramatically increased releases from ~2010 onwards.',
      'Step 3 — Triangulate with upload rate: Spotify reportedly receives ~100k new tracks per day in recent years.',
      'Step 4 — Apply availability rate: Not every recorded song has been cleared for Spotify — estimate what fraction of existing catalog is licensed.',
      'Step 5 — Sanity check: Spotify has disclosed approximate catalog sizes in earnings materials.',
    ],

    hints: [
      'Before digital distribution (~2010), new commercial music releases totaled ~500k-1M tracks per year globally.',
      'After 2015, DIY platforms enabled anyone to distribute music. By 2022-2023, ~100,000 tracks were uploaded to Spotify daily.',
      'Spotify has stated its catalog passed 100 million tracks in late 2023.',
      'The key insight: catalog growth is exponential, not linear — ~80% of all tracks on Spotify were uploaded after 2015.',
      'Even if you don\'t know the exact number, the method matters: triangulating upload rate × time is the cleanest approach.',
    ],

    modelAnswer: {
      walkthrough: `Approach 1: Build from historical catalog + digital era growth.

Pre-digital era (1950-2010, 60 years): Estimate ~500k commercial tracks released per year globally (all genres, all countries). 60 years × 500k = 30M tracks in the historical catalog. Of these, ~60% have been digitized and licensed to streaming: 30M × 0.60 = 18M pre-2010 tracks on Spotify.

Early streaming era (2010-2015, 5 years): Music industry was adapting to streaming. Releases growing but not yet explosive. ~1M tracks/year → 5M tracks added. ~80% availability → 4M tracks.

DIY explosion (2015-2020, 5 years): DistroKid, TuneCore, CD Baby made distribution nearly free. Releases growing from 5M/year to 30M/year. Average: ~15M/year × 5 = 75M tracks released. ~90% uploaded to Spotify → 67M tracks.

Recent era (2020-2024, 4 years): ~40-50M tracks released per year (the ~100k/day figure = 36.5M/year). 4 years × 40M = 160M new releases, ~95% on Spotify → 152M.

But wait — this gives 18M + 4M + 67M + 152M = 241M, which seems too high. The issue: many "uploads" in the DIY era are AI-generated or duplicate tracks that Spotify has since removed.

Approach 2: Upload rate triangulation (cleaner).
Spotify receives ~100k new tracks/day = 36.5M/year currently. But the platform has been accepting uploads since 2008. Using a growth curve:
- 2008-2012: ~5M tracks/year → 20M cumulative
- 2013-2016: ~10M tracks/year → 40M cumulative
- 2017-2019: ~20M tracks/year → 60M cumulative
- 2020-2022: ~30M tracks/year → 90M cumulative
- 2023-2024: ~36M tracks/year → 72M cumulative
Total cumulative: 20+40+60+90+72 = 282M. Minus removals (AI spam, duplicates, inactive labels): ~25% removed → ~212M.

Spotify stated ~100M tracks in late 2023. Our estimate skews high, suggesting upload rate was lower than 100k/day historically (that's a very recent figure). A more conservative ramp gives ~80-120M.

The honest answer: without knowing Spotify's exact catalog, triangulation via the upload rate and a historical music release rate yields 80-120M tracks, converging on the ~100M disclosed figure.`,
      keyAssumptions: [
        '500k global commercial tracks per year pre-2010 — covers all genres (pop, classical, world music) but excludes unreleased recordings',
        '60% licensing rate for pre-digital catalog — many tracks are out-of-print or have unresolved rights',
        '~100k tracks/day current upload rate — widely cited in music industry press as of 2022-2023',
        '25% removal rate for quality/spam reasons — Spotify has removed AI-generated spam tracks',
      ],
      finalEstimate: 'Range: 80M–120M songs, with ~100M as the central estimate',
      sanityChecks: [
        'Spotify disclosed "over 100 million tracks" in October 2023. Our range of 80-120M is consistent.',
        'Apple Music, Amazon Music report similar catalog sizes (~100M). Competitive parity check passes.',
        'Revenue per track: Spotify pays ~$0.003-0.005 per stream. At 100M tracks, even if each track is streamed once a month: 100M × $0.004 = $400k/month in royalties, far below Spotify\'s actual ~$1.3B/month royalty payments — consistent with a power law where a tiny fraction of tracks get the vast majority of streams.',
      ],
    },

    strongAnswerMarkers: [
      'Uses two independent methods (historical catalog build-up and daily upload rate triangulation) and reconciles them',
      'Recognizes the exponential growth in the digital/DIY era rather than applying a flat historical rate',
      'Accounts for removals (AI spam, duplicates) rather than treating all uploads as permanent',
      'Is honest about uncertainty and explains why the estimate might diverge from actuals',
      'Notes that without the published Spotify figure, arriving at "~100M" via triangulation is the correct approach',
    ],

    commonMistakes: [
      'Applying a flat historical release rate (e.g., 1M/year) across all decades — misses the exponential DIY explosion post-2015',
      'Treating all uploads as permanently available — Spotify actively removes duplicate and spam tracks',
      'Anchoring only on the "100k tracks/day" figure without noting that rate only applies recently',
      'Confusing "songs" with "albums" or "artists" — the question asks specifically for tracks',
      'Not triangulating with a second method — using only one approach without cross-validation leaves the estimate ungrounded',
    ],
  },

  {
    id: 'EST06',
    title: 'Google Searches Per Second',
    subtitle: 'Product Metrics · Search',
    difficulty: 'Analyst',
    isFree: false,
    tags: ['Google', 'search', 'scale', 'product-metrics'],
    category: 'product-metrics',
    approach: 'top-down',

    prompt: 'Estimate how many Google searches happen per second globally.',

    frameworkSteps: [
      'Step 1 — Estimate global Google users: Who has internet access and uses Google Search?',
      'Step 2 — Estimate searches per user per day: How often does an average Google user search?',
      'Step 3 — Convert to per-second: Divide by 86,400 seconds in a day, then adjust for time-zone smoothing.',
      'Step 4 — Sanity check: Google has disclosed approximate search volumes in various public statements.',
    ],

    hints: [
      'Global internet users: ~5.3 billion people as of 2024.',
      'Google\'s global search market share is ~91-92%, but not every internet user searches daily.',
      'Think about your own behavior: how many times do you Google something in a day? Consider the average across light and heavy users.',
      'There are 86,400 seconds in a day. The per-second number should be a 5-digit figure.',
      'Google has historically stated ~2 trillion searches per year, which was cited in 2016 filings. More recent estimates suggest 8-9 billion per day.',
    ],

    modelAnswer: {
      walkthrough: `Start with the global user base.

Global internet users: ~5.3 billion people.
Google search market share: ~91% → 5.3B × 0.91 = ~4.8B Google users.

But not everyone searches every day. Distinguish by engagement level:
- Heavy users (daily multiple searches, typically young adults/professionals): ~35% of users, ~8 searches/day
- Regular users (search daily but fewer queries): ~40% of users, ~3 searches/day
- Light/occasional users (weekly, older demographics, feature phones): ~25% of users, ~0.5 searches/day

Weighted average searches per user per day:
(0.35 × 8) + (0.40 × 3) + (0.25 × 0.5) = 2.8 + 1.2 + 0.125 = ~4.1 searches/user/day

Total daily searches: 4.8B users × 4.1 searches = 19.7B searches/day.

Per second: 19.7B ÷ 86,400 = ~228,000 searches/second.

Simpler check: 4.8B users × 3.5 searches/day ÷ 86,400 = ~194,000/second.

Google's disclosed data: Google reported ~2 trillion searches per year as of 2016 = 5.5B/day = ~63,700/second. More recent industry estimates suggest 8-9 billion searches/day = ~100,000/second.

Our estimate of ~200,000/second is likely high because:
1. Many "users" in the 5.3B count are not daily Google searchers
2. The 3.5 searches/user/day might be too high for global average including low-connectivity regions

Adjusted: If 60% of Google users are active on any given day: 4.8B × 0.60 = 2.88B daily active searchers × 3.5 searches = 10.1B/day ÷ 86,400 = ~117,000/second.

The canonical answer the interviewer wants: approximately 100,000 searches per second.`,
      keyAssumptions: [
        '91% Google search market share globally — consistent with StatCounter data',
        '60% daily active rate among Google users — many people go days without searching',
        '3.5 average searches per daily active user — a typical day involves searching for directions, facts, how-to, news, shopping',
        '86,400 seconds/day — uniform distribution (searches are roughly uniform globally due to timezone spread)',
      ],
      finalEstimate: 'Range: 80,000–130,000 searches per second; point estimate ~100,000/second',
      sanityChecks: [
        'Annual check: 100k/second × 86,400 seconds × 365 days = 3.15 trillion searches/year. Google\'s historical "2 trillion/year" was from 2016; growth to 3T by 2024 is plausible.',
        'Revenue per search: Google\'s 2023 search revenue ≈ $175B. At 3T searches/year: $175B ÷ 3T = $0.058 per search. Industry CPC on Google averages $2-3 but click-through rate on ads is ~2-5% → revenue per search ≈ $2.50 × 3% ≈ $0.075. Close to our implied $0.058. Consistent.',
        'Server load check: Google reportedly has ~1M servers. At 100k searches/second and ~10ms processing time per search: 100k × 0.01 seconds = 1,000 server-seconds needed per second → ~1,000 servers actively processing. With parallelism and the remaining 999k servers on standby/other services — plausible.',
      ],
    },

    strongAnswerMarkers: [
      'Segments users by engagement level (heavy/regular/light) rather than applying one flat rate',
      'Applies a daily active rate rather than treating all 4.8B Google users as daily searchers',
      'Converts correctly from daily total to per-second (divides by 86,400)',
      'Arrives at the ~100,000/second order of magnitude through structured reasoning',
      'Cross-validates via revenue per search as a sanity check',
    ],

    commonMistakes: [
      'Using the global internet user count as if all 5.3B search Google every day — overstates by 2-3x',
      'Dividing by hours in a day (24) to get per-hour and forgetting to divide by 3,600 to get per-second',
      'Using only 1 search/user/day — underestimates; power users dramatically pull up the average',
      'Not knowing that 86,400 = 24 × 60 × 60 seconds in a day — this is a fundamental constant you should know',
      'Anchoring on the "2 trillion/year" figure from 2016 without noting it was cited 8+ years ago and search volume has grown since',
    ],
  },

  {
    id: 'EST07',
    title: 'Airbnb Cost to Acquire a New Host',
    subtitle: 'Cost Estimation · Marketplace Growth',
    difficulty: 'Senior',
    isFree: false,
    tags: ['Airbnb', 'CAC', 'marketplace', 'supply-side', 'funnel'],
    category: 'cost-estimation',
    approach: 'bottom-up',

    prompt: 'Estimate Airbnb\'s cost to acquire one new active host in the United States.',

    frameworkSteps: [
      'Step 1 — Map the acquisition channels: Identify how new hosts find out about Airbnb (referral, paid, organic, outbound sales).',
      'Step 2 — Estimate cost per acquisition per channel: Each channel has a different unit economics profile.',
      'Step 3 — Weight by channel mix: Estimate what % of new hosts come from each channel.',
      'Step 4 — Adjust for activation rate: Not every new host signup becomes an active host (completes a listing and receives a booking).',
      'Step 5 — Sanity check: Compare to host LTV to assess whether the CAC makes strategic sense.',
    ],

    hints: [
      'Airbnb\'s strongest supply acquisition channel historically is host-to-host referral (someone who stayed as a guest becomes a host, or a host refers a friend). This channel has near-zero marginal cost.',
      'Paid digital ads for host acquisition (Facebook, Google "List your home on Airbnb") cost significantly more than guest acquisition because the supply funnel is smaller and higher-friction.',
      'Enterprise/direct sales teams are used for large property managers (multi-unit listings) — these deals are expensive to close but produce many listings each.',
      'An important adjustment: the ratio of host signups to active listings. Many hosts sign up but never complete onboarding or receive a booking.',
      'Host LTV context: An average US Airbnb host earns ~$14,000/year. Airbnb\'s take rate is ~14% → ~$1,960/year in revenue per active host.',
    ],

    modelAnswer: {
      walkthrough: `Step 1: Define acquisition channels and estimate mix (for US new host acquisition):

Channel A — Referral / Word-of-mouth: A guest who loved their Airbnb experience and decides to list their own home. Also host referrals to friends. Cost: effectively $0 marginal CAC (brand/product cost amortized broadly). Estimated mix: ~40% of new host signups.

Channel B — Paid digital: Facebook/Instagram and Google campaigns targeting homeowners ("Earn extra income"). Cost per lead (someone who starts an application): ~$30-50. Cost per signup (completes the basic host profile): ~$80-120. Estimated mix: ~35% of new host signups.

Channel C — Organic / SEO / PR: Airbnb blog posts, press coverage, word-of-mouth discovery. Near-zero marginal cost. Estimated mix: ~15%.

Channel D — Direct sales / partnerships: Airbnb's "Superhosts for Hire" type programs, property manager outreach, relocation company partnerships. Cost per acquisition very high (~$500-1,000+) but yields high-value multi-listing hosts. Estimated mix: ~10%.

Step 2: Blended CAC at signup:
(40% × $0) + (35% × $100) + (15% × $20) + (10% × $750)
= $0 + $35 + $3 + $75 = $113 per host signup.

Step 3: Adjust for activation rate.
Not all signups become active. A host "signs up" = creates a profile. An active host = completes a verified listing AND receives at least one booking within 90 days. Estimated activation rate: ~50-60% (many people explore the idea but don't follow through with professional photos, listing copywriting, calendar management). Use 55%:

True CAC per active host = $113 ÷ 0.55 = ~$205 per active host.

Range: $150-$300 per active host.

LTV check: Active US host earns ~$14k/year. Airbnb take rate: ~14% → $1,960/year revenue to Airbnb. Average host stays active ~3.5 years → LTV = $1,960 × 3.5 = $6,860. CAC/LTV ratio = $205 / $6,860 = ~3%. This is an excellent CAC:LTV ratio (conventional threshold is CAC < LTV/3, i.e., ratio < 33%). Airbnb's host supply economics are highly attractive — the product itself (earning $14k/year) is the best marketing.`,
      keyAssumptions: [
        '40% referral/organic split — Airbnb is a strong network-effects platform; most supply growth in mature markets is organic',
        '$100 blended CPL for paid channels — competitive for a high-intent, low-frequency decision (listing your home)',
        '55% activation rate — many prospective hosts drop off during photo requirements, pricing setup, or calendar configuration',
        '$14k/year average US host earnings — derived from Airbnb\'s published "hosts earn an average of $14,000/year" claims',
        '14% Airbnb take rate — published service fee structure',
      ],
      finalEstimate: 'Range: $150–$300 per new active host; point estimate ~$200',
      sanityChecks: [
        'LTV/CAC check: Host LTV ≈ $6,860 over 3.5 years. CAC of $200 gives LTV/CAC = 34x. Extremely healthy — consistent with Airbnb prioritizing supply growth as a strategic investment.',
        'Compare to guest CAC: Airbnb\'s guest CAC is estimated at $15-30 (more competition, higher volume). Host CAC being 7-10x higher makes sense — it\'s a higher-friction, higher-commitment conversion.',
        'Airbnb S-1 check: Airbnb\'s sales & marketing spend was ~$1.5B in 2023 across both host and guest acquisition. They have ~4M active hosts globally. If 10% are new in a year (400k new hosts) and marketing is split 30/70 guest/host: $1.5B × 30% / 400k = $1,125/new host. This seems high — but includes brand spend, PR, and customer retention. Marginal paid acquisition per new host is much lower. The $200 estimate reflects marginal (not fully-loaded) CAC.',
      ],
    },

    strongAnswerMarkers: [
      'Breaks acquisition into 4 distinct channels with different cost structures rather than using one blended number',
      'Applies an activation rate adjustment — distinguishing "signup" from "active host"',
      'Benchmarks CAC against LTV to assess whether the economics make sense strategically',
      'Notes that referral/organic channels dominate in mature marketplace businesses — the product IS the acquisition',
      'Gives a range and explains the key drivers (channel mix and activation rate)',
    ],

    commonMistakes: [
      'Treating "host signup CAC" and "active host CAC" as the same number — activation rate is a crucial adjustment',
      'Using guest CAC as a proxy for host CAC — supply-side acquisition is fundamentally different and typically more expensive',
      'Ignoring the referral/organic channel — overestimates paid CAC by missing the free channels',
      'Not doing the LTV/CAC sanity check — without it, you can\'t tell whether your CAC estimate is strategically plausible',
      'Using total marketing spend ÷ new hosts — conflates host and guest acquisition spend, and includes retention/brand spend',
    ],
  },

  {
    id: 'EST08',
    title: 'Instagram Revenue Per US User Per Year',
    subtitle: 'Product Metrics · Social Media Monetization',
    difficulty: 'Senior',
    isFree: false,
    tags: ['Instagram', 'ARPU', 'Meta', 'advertising', 'monetization'],
    category: 'product-metrics',
    approach: 'top-down',

    prompt: 'Estimate how much annual revenue Instagram generates per monthly active user in the United States.',

    frameworkSteps: [
      'Step 1 — Estimate Instagram US revenue: Use Meta\'s US advertising revenue and Instagram\'s estimated share of it.',
      'Step 2 — Estimate Instagram US MAU: How many monthly active users does Instagram have in the US?',
      'Step 3 — Divide to get ARPU: Revenue ÷ MAU = annual ARPU.',
      'Step 4 — Triangulate via CPM/engagement: Cross-check by estimating ad impressions × CPM.',
      'Step 5 — Benchmark: Compare to other platforms (YouTube, LinkedIn, TikTok) to sense-check the number.',
    ],

    hints: [
      'Meta\'s total US & Canada revenue was ~$56B in 2023, split between Facebook, Instagram, and WhatsApp (minimal).',
      'Instagram generates roughly 30-40% of Meta\'s total global revenue.',
      'Instagram US MAU is approximately 160-170 million users as of 2023.',
      'Meta publishes ARPU by geography in its quarterly earnings. US/Canada ARPU across all Meta products was ~$68/user/quarter (~$272/year) in 2024.',
      'If you know Meta\'s US/Canada revenue and Instagram\'s share of it, dividing by Instagram MAU gives you the Instagram-specific ARPU.',
    ],

    modelAnswer: {
      walkthrough: `Approach 1: Top-down from Meta financials.

Meta total revenue 2023: ~$135B globally. Meta US & Canada revenue: ~$63B (roughly 46% of global, consistent with Meta's earnings reports).

Instagram's share of Meta revenue: Instagram accounts for approximately 35% of Meta's total revenue (it's the higher-CPM, younger-demographic platform; Facebook is larger by users but increasingly older and lower-CPM). Instagram global revenue: $135B × 35% = $47B. Instagram US revenue: proportional to the US share of Instagram's global user base — US is ~7.5% of Instagram's ~2B global MAU. But US commands a CPM premium of ~10x vs. emerging markets. Revenue-weighted US share: approximately $47B × 30% = $14B from the US (US is 7.5% of users but ~30% of revenue due to CPM premium).

Instagram US MAU: ~170M.

Instagram ARPU (US): $14B ÷ 170M = $82 per user per year.

Approach 2: Bottom-up via ad impressions.

An average Instagram user in the US spends ~30 minutes/day on the app. In 30 minutes of scrolling, a user sees approximately 20-25 ad impressions (roughly 1 ad per ~8 posts in the feed/stories/Reels). Daily ad impressions per user: ~22. Annual impressions per user: 22 × 365 = ~8,030 impressions/user/year.

Instagram US CPM (cost per thousand impressions): ~$7-$12. Use $9. Revenue per user per year: (8,030/1,000) × $9 = $72.27/user/year.

Both approaches converge around $75-$90/user/year.

Benchmarking:
- YouTube US ARPU: ~$30-40/user/year (lower because ads are skippable, CPMs lower)
- LinkedIn US ARPU: ~$80-120/user/year (higher CPM B2B audience)
- TikTok US ARPU: ~$20-30/user/year (newer, still scaling monetization)
- Facebook US ARPU: ~$70-80/user/year (Instagram and Facebook are similar)
Instagram at ~$80-90 looks reasonable — above YouTube (visual/intent-driven), similar to Facebook, below LinkedIn.

Final: ~$85/user/year.

Engagement value check: At 30 min/day and $85/year ARPU, Instagram generates $85 / (30 min × 365 days / 60 min/hour) = $85 / 182.5 hours = $0.47 per hour of user attention. Compare: LinkedIn ~$2-3/hour, YouTube ~$0.10-0.15/hour. Instagram's $0.47/hour reflects its high-intent shopping audience vs. YouTube's scale but lower commercial intent.`,
      keyAssumptions: [
        'Instagram = 35% of Meta global revenue — consistent with published analyst estimates (eMarketer, Bernstein)',
        'US = 30% of Instagram revenue despite 7.5% of users — reflects the 10x US/emerging market CPM differential',
        'Instagram US MAU = 170M — published by Meta indirectly; consistent with Pew and Statista surveys',
        '22 ad impressions/day per US user — based on 30-min session × 1 ad per 8-post scroll cadence',
        '$9 CPM for Instagram US — mid-range estimate; Instagram CPMs range $5-15 depending on format and targeting',
      ],
      finalEstimate: 'Range: $75–$100 per US monthly active user per year; point estimate ~$85',
      sanityChecks: [
        'Meta US/Canada ARPU published in Q4 2023 earnings: ~$68/quarter × 4 = $272/year per user across ALL Meta products (Facebook + Instagram + Messenger + WhatsApp). Instagram being ~35% of that for its own users: this approach suggests different user bases, not directly comparable. The $85 Instagram-specific ARPU is plausible if Instagram users in the US generate above-average Meta-wide revenue.',
        'Market share check: US digital ad market ~$250B in 2023. Instagram US revenue of $14B = 5.6% share. Given Instagram\'s dominant position in visual advertising, 5-6% of total digital ad spend is plausible (Google Search is ~28%, Facebook ~14%, YouTube ~5%).',
        'Advertiser check: Average small US advertiser spends ~$1,000-5,000/month on Instagram. If 500k advertisers spend avg $3,000/month: $3k × 12 × 500k = $18B. Consistent with $14B estimate (not all 500k advertise at that level year-round).',
      ],
    },

    strongAnswerMarkers: [
      'Uses two independent methods (top-down Meta financials and bottom-up CPM × impressions) and reconciles them',
      'Correctly applies the US revenue concentration premium — US generates far more than its population share',
      'Benchmarks Instagram ARPU against comparable platforms (YouTube, LinkedIn, TikTok)',
      'Calculates revenue per hour of attention and explains the economic intuition',
      'Notes the distinction between Meta-wide ARPU (published) and Instagram-specific ARPU (requires allocation)',
    ],

    commonMistakes: [
      'Using Meta\'s total ARPU ($272/year for US/Canada) as Instagram\'s ARPU — conflates all products',
      'Applying Instagram\'s global user share (7.5%) as the revenue share — ignores the massive US CPM premium',
      'Not knowing that Meta publishes US/Canada ARPU in quarterly earnings — you should know this metric',
      'Using global Instagram ARPU rather than US-specific — the US number is 8-12x the global average',
      'Forgetting to benchmark against comparable platforms — ARPU estimates without a benchmark have no reality check',
    ],
  },
];
