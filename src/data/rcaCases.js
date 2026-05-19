// Product Analytics Lab — RCA Room Case Data

export const rcaCases = [
  {
    id: 'RCA01',
    title: 'Checkout Conversion Dropped Overnight',
    subtitle: 'Crestline Home · E-Commerce · Payment Flow',
    difficulty: 'analyst',
    isFree: true,
    domain: 'growth',
    linkedConceptIds: ['funnel-decomposition', 'segmentation', 'data-quality-check'],
    context: {
      metricMovement: 'Checkout conversion rate dropped from 62.4% to 57.1% (-5.3pp) overnight',
      businessImpact: '~$140k in daily revenue at risk if sustained',
      timeWindow: 'Drop observed at 11pm Tuesday, sustained through Wednesday morning',
      knownFacts: [
        'A new payment provider was integrated on Tuesday afternoon',
        'Drop is NOT seen in the app (mobile) — only web',
        'Payment error logs show a 4x spike in "invalid card" errors for Visa cards on web',
        'No A/B test was running at the time of drop',
        'The payment UI was not changed — only the backend provider'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'Before diagnosing user behavior, you need to determine if this drop is real or a data/system artifact. What do you do first?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Check payment error logs and provider error rates — a deployment just happened',
            isCorrect: true,
            level: 'strong',
            feedback: 'A backend deployment occurred hours before the drop — this is the most likely candidate and error logs will confirm or rule it out in minutes. Checking provider error rates first gives you a fast, high-signal answer without any analysis work. This is the right instinct: when a system change coincides with a metric drop, check the system before checking the users.'
          },
          {
            id: 'b',
            label: 'Check analytics instrumentation for tracking gaps or missing events',
            isCorrect: false,
            level: 'partial',
            feedback: 'Instrumentation checks are a valid first step when there is no known deployment, but here a payment provider change happened the same afternoon. Ruling out a real system issue first is faster and more targeted. Instrumentation gaps are still worth checking if error logs come back clean.'
          },
          {
            id: 'c',
            label: 'Assume it is real and start analyzing user checkout behavior',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Jumping to user behavior analysis before checking for system causes wastes time and often leads to false conclusions. A known backend deployment just happened — you must rule that out first. Analysts who skip system checks frequently "find" behavioral explanations for problems that are actually engineering bugs.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'You have confirmed the drop is real. Now break the checkout conversion metric into its component steps. Which decomposition is most useful here?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Decompose the checkout funnel step-by-step: cart → payment page → payment submit → confirmation',
            isCorrect: true,
            level: 'strong',
            feedback: 'Breaking the funnel at each step immediately reveals where users are dropping — whether it is reaching the payment page, submitting payment, or receiving confirmation. This narrows the problem from "checkout conversion dropped" to a specific step, making subsequent segmentation faster and more targeted. Given the known Visa error spike, you expect to see the drop at the payment submit step.'
          },
          {
            id: 'b',
            label: 'Compare overall checkout conversion rate this week vs. last week',
            isCorrect: false,
            level: 'partial',
            feedback: 'Week-over-week comparison confirms the drop is real and gives you a baseline, but it does not tell you where in the funnel users are dropping. You already know there is a drop — decomposing the funnel steps is far more actionable for diagnosis. This approach answers "how bad" but not "where or why."'
          },
          {
            id: 'c',
            label: 'Look at overall conversion rate across the entire site',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Zooming out to total site conversion dilutes the signal and mixes unrelated user journeys. The problem is specifically in the checkout flow, and broadening scope adds noise without revealing the mechanism. This is a common mistake when analysts feel uncertain — widening the view instead of narrowing to the affected component.'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Funnel decomposition shows the drop is at payment submission. Now segment to find where it is concentrated. Which segmentation finds the root cause fastest?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment by payment method (Visa vs. other cards vs. PayPal) + platform (web vs. app) + card network',
            isCorrect: true,
            level: 'strong',
            feedback: 'You already know from the known facts that Visa error logs spiked on web — segmenting by payment method and platform confirms this signal with conversion data and quantifies the impact precisely. This lets you attribute the full drop to a specific technical failure mode. Cross-referencing card network with platform also reveals whether it is Visa-specific or broader.'
          },
          {
            id: 'b',
            label: 'Segment by device type (desktop vs. mobile vs. tablet)',
            isCorrect: false,
            level: 'partial',
            feedback: 'Device segmentation is directionally useful since the drop is web-only, but it does not get you to the payment method or card network dimension where the actual failure is. You would see "desktop is down" but still not know if it is a Visa issue or something broader. Payment method segmentation is the more targeted cut given the evidence available.'
          },
          {
            id: 'c',
            label: 'Segment by acquisition channel (organic vs. paid vs. email)',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Acquisition channel segmentation makes sense when the hypothesis is a traffic quality shift, but here the evidence points to a payment processing failure, not a demand-side issue. Segmenting by acquisition channel would find nothing useful and wastes diagnostic time. Always match your segmentation choice to the most likely failure mode given the known facts.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: 'You have confirmed: drop is at payment submit, concentrated in Visa on web. Which hypothesis best explains the root cause?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'New payment provider integration has a bug processing Visa cards on web, causing payment failures',
            isCorrect: true,
            level: 'strong',
            feedback: 'This hypothesis is supported by three converging signals: the timing (drop started after deployment), the specificity (Visa on web only, not app), and the error logs (4x spike in "invalid card" errors for Visa). A hypothesis this well-evidenced should be treated as the likely cause pending provider-level confirmation. The specificity to one card network on one platform is a hallmark of an integration bug, not a user behavior change.'
          },
          {
            id: 'b',
            label: 'User behavior changed due to external factors (holiday, news event) causing higher checkout abandonment',
            isCorrect: false,
            level: 'partial',
            feedback: 'Behavioral explanations are valid hypotheses in the absence of system changes, but here a known deployment happened and error logs already show a Visa failure spike. Attributing the drop to behavior without a behavioral signal is premature. This is a common analyst mistake: reaching for demand-side explanations when supply-side (technical) causes are already evident.'
          },
          {
            id: 'c',
            label: 'A UI design change caused user confusion at the payment step',
            isCorrect: false,
            level: 'wrong',
            feedback: 'The known facts explicitly state the payment UI was not changed — only the backend provider. A UI confusion hypothesis directly contradicts the available evidence and would send the team on a false investigation. Always anchor your hypothesis to the known facts before introducing new variables.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Your hypothesis is a payment provider bug causing Visa failures on web. How do you confirm this before escalating to engineering?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Pull provider error API to get failure rate by card type, confirm Visa failure rate pre/post deploy, and cross-check provider dashboard for incident flags',
            isCorrect: true,
            level: 'strong',
            feedback: 'This validation approach directly tests the hypothesis at the source: the provider\'s own error data will show whether Visa failures spiked at the time of the deployment. Comparing pre/post deploy failure rates gives you a clean causal window, and the provider dashboard may already have an incident flag saving you hours of investigation. Specific data sources + a causal window + third-party confirmation is a complete validation.'
          },
          {
            id: 'b',
            label: 'Run a user survey asking checkout dropouts why they did not complete their purchase',
            isCorrect: false,
            level: 'partial',
            feedback: 'Surveys can surface user perception but take hours or days and will likely return vague answers ("it didn\'t work") that you already know. When server-side error logs are available, they provide faster and higher-fidelity confirmation than user self-report. Reserve surveys for hypotheses that are not directly observable in system logs.'
          },
          {
            id: 'c',
            label: 'Run a new A/B test on the checkout flow to measure the impact',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Running an experiment when you believe a known deployment caused the issue is the wrong tool entirely — it delays resolution and exposes more users to a broken payment experience. Experiments are for testing improvements, not diagnosing active technical incidents. When a system failure is suspected, the correct path is validation through error logs and rollback, not experimentation.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've confirmed the hypothesis: Visa payment failures spiked on web immediately after the new payment provider was deployed Tuesday afternoon.\n\nWrite a SQL query that validates this by comparing the Visa payment success rate on web versus app, before and after the 3pm deployment window — segmented by card network and platform.`,
      hints: [
        'Use a CASE WHEN to create a pre/post deployment flag around the Tuesday 3pm cutoff',
        'Segment by platform (web vs. app) AND card_network (Visa vs. others) — the bug is specific to both dimensions',
        'Your success rate = successful_payments / total_payment_attempts, not total orders',
        'Include a row count per bucket so you can confirm statistical significance of the drop'
      ],
      modelQuery: `SELECT
  -- Deployment window: before vs. after Tuesday 3pm
  CASE
    WHEN attempted_at < '2024-01-16 15:00:00' THEN 'pre_deploy'
    ELSE 'post_deploy'
  END AS deploy_window,

  platform,          -- 'web' | 'app'
  card_network,      -- 'visa' | 'mastercard' | 'amex' | 'other'

  COUNT(*)                                          AS total_attempts,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successful_payments,

  -- Success rate as percentage
  ROUND(
    100.0 * SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END)
    / NULLIF(COUNT(*), 0),
    2
  ) AS success_rate_pct,

  -- Error breakdown for diagnostics
  SUM(CASE WHEN error_code = 'invalid_card' THEN 1 ELSE 0 END) AS invalid_card_errors

FROM payments
WHERE attempted_at BETWEEN '2024-01-16 12:00:00' AND '2024-01-17 12:00:00'
  -- 12-hour window bracketing the deployment for clean pre/post comparison

GROUP BY 1, 2, 3
ORDER BY deploy_window, platform, card_network;`,
      annotation: `Line-by-line explanation:

CASE WHEN attempted_at < Tuesday 3pm → creates a clean pre/post deployment flag. The 12-hour window (noon-to-noon) avoids mixing previous-day traffic into "pre" while giving enough pre-deploy volume for comparison.

platform + card_network → the two segmentation dimensions where the bug is known to be concentrated. Without both, you'd see the Visa drop diluted by app traffic (where Visa works fine).

success_rate_pct → the key metric: you expect to see ~62% pre-deploy dropping to ~45-50% post-deploy, but ONLY in the web × Visa cell.

invalid_card_errors → the specific error code from the known facts. If your hypothesis is correct, this count spikes sharply in the post-deploy × web × Visa row.

NULLIF(COUNT(*), 0) → prevents division-by-zero if a bucket has no rows (e.g., no Amex attempts on app in that window).

Expected output: post_deploy / web / visa row will show significantly lower success_rate_pct and much higher invalid_card_errors compared to all other rows — that's your confirmation.`
    },
    seniorDiagnosis: {
      likelyCause: 'Payment provider integration bug causing Visa card failures on web',
      reasoning: 'The timing, specificity, and error log evidence all point to the same cause: the new payment provider integration introduced a bug in Visa card processing that only manifests on web (not app, likely because the app uses a different integration path or SDK version). The 4x spike in "invalid card" errors is a direct symptom of the provider mishandling Visa card tokenization or authorization calls. The fact that the drop is isolated to web and to Visa — rather than all cards or all platforms — is a strong indicator of an integration-specific failure rather than any user behavior change. At -5.3pp conversion and $140k daily revenue impact, this is a P1 incident requiring immediate engineering escalation, not further analysis. The validation path is through the provider\'s error API and their incident dashboard, not through user analytics.',
      validationPlan: [
        'Pull payment provider error API: get failure rate by card network (Visa vs. Mastercard vs. Amex) for the 24 hours before and after deployment',
        'Cross-reference internal payment logs: confirm "invalid card" error rate for Visa on web spiked at exactly the time of provider deployment',
        'Check provider incident dashboard and contact provider support to determine if this is a known issue on their end',
        'Confirm app payment flow uses a separate integration path or SDK — explains why app is not affected'
      ],
      recommendation: 'Escalate immediately to engineering for rollback of the payment provider integration or emergency hotfix for Visa routing. Do not wait for more analysis — $140k/day and the error evidence are sufficient to act. After rollback, confirm conversion rate recovers before closing the incident.',
      commonMistakes: [
        'Starting with user behavior analysis before checking server-side error logs',
        'Running an A/B test to "measure the impact" instead of rolling back the known bad deployment',
        'Attributing the drop to seasonality or demand without ruling out the concurrent deployment first',
        'Segmenting by acquisition channel when the failure is in the payment processing layer'
      ],
      interviewPhrase: 'When a metric drops the same day as a deployment, the deployment is guilty until proven innocent — I check error logs before I open the analytics dashboard.'
    }
  },

  {
    id: 'RCA02',
    title: 'Zero-Result Rate Spiked After Catalog Update',
    subtitle: 'Vela · B2C Marketplace · Search Quality',
    difficulty: 'analyst',
    isFree: true,
    domain: 'search',
    linkedConceptIds: ['data-quality-check', 'segmentation', 'funnel-decomposition'],
    context: {
      metricMovement: 'Zero-result rate in search jumped from 4.2% to 11.8% (+7.6pp)',
      businessImpact: 'Users who get zero results have 3x lower purchase conversion — this threatens $2M/month in search-driven GMV',
      timeWindow: 'Spike observed this morning after a scheduled catalog re-ingestion job',
      knownFacts: [
        'A catalog re-ingestion pipeline ran at 2am — quarterly update to add new categories',
        'The spike is only in the "Home & Garden" and "Electronics" categories',
        'Synonym mapping for new subcategories was NOT updated before ingestion',
        'Search query volume is normal — this isn\'t a demand change',
        'The search index shows 23% of queries in those categories return no results vs 4% in others'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'Zero-result rate spiked this morning after a catalog pipeline ran. What is your first check?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Verify the catalog ingestion pipeline completed successfully and that the search index is fully updated',
            isCorrect: true,
            level: 'strong',
            feedback: 'A pipeline ran hours before the spike — confirming it completed without errors rules out a partial index state or ingestion failure as the cause. If the pipeline failed mid-run, the index could be in an inconsistent state that causes false zero-results. Checking pipeline completion logs is fast and directly tests the most proximate cause before any deeper analysis.'
          },
          {
            id: 'b',
            label: 'Check search query volume trends over the past 7 days',
            isCorrect: false,
            level: 'partial',
            feedback: 'Query volume is worth checking to rule out a sudden demand surge toward uncommon terms, but the known facts already state query volume is normal. This check is redundant given the evidence and does not address the pipeline-related cause. It is the right second check, not the first.'
          },
          {
            id: 'c',
            label: 'Assume user demand shifted to uncommon queries and investigate seasonal trends',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Jumping to demand-side explanations when a pipeline ran at 2am is a classic misdirection. Catalog pipelines can corrupt or incompletely update search indexes, and that is a far more likely cause of a sudden zero-result spike than an overnight demand shift. Always check system changes before behavioral hypotheses.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'Pipeline ran cleanly. Now break the zero-result rate to understand what type of queries are failing. What is the right decomposition?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Break zero-result rate by category, query type (navigational vs. categorical), and new vs. previously-indexed terms',
            isCorrect: true,
            level: 'strong',
            feedback: 'This decomposition directly tests whether the spike is concentrated in newly-added catalog terms (which would point to indexing or synonym gaps) vs. existing terms (which would point to a broader index regression). Knowing that it is new terms in specific categories is the critical insight that drives the synonym hypothesis. Category-level decomposition also matches the already-known signal that Home & Garden and Electronics are affected.'
          },
          {
            id: 'b',
            label: 'Compare total search volume and zero-result count before and after the pipeline ran',
            isCorrect: false,
            level: 'partial',
            feedback: 'Before/after comparison confirms the pipeline timing and quantifies the total impact, but it does not tell you which queries are failing or why. You already know zero-results spiked — the question is which query types are driving it. Decomposition by query characteristics is a more diagnostic next step.'
          },
          {
            id: 'c',
            label: 'Look at overall site traffic and bounce rate to understand user impact',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Overall site traffic is too broad to diagnose a search-layer problem. Bounce rate changes are downstream effects, not root cause indicators. This approach would show you that something is wrong but provide no signal about what search-specific mechanism is failing. Stay in the search layer to diagnose a search problem.'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Decomposition confirms the spike is in new-category queries in Home & Garden and Electronics. Which segmentation finds the exact failure mode?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment by category + query term (new subcategory terms vs. existing terms) and extract the specific zero-result query strings',
            isCorrect: true,
            level: 'strong',
            feedback: 'Extracting the actual zero-result query strings from the new subcategories lets you directly compare them against the synonym table and the new catalog terms — you can see exactly which terms are missing mappings. This is the definitive confirmation step for the synonym hypothesis. Specific query strings are the unit of analysis in search quality diagnosis.'
          },
          {
            id: 'b',
            label: 'Segment by device type (desktop vs. mobile) to see if the issue is platform-specific',
            isCorrect: false,
            level: 'partial',
            feedback: 'Device segmentation is worth a quick check but is unlikely to be diagnostic here — synonym mapping gaps affect all devices equally. If the zero-result rate were device-specific, it would suggest a rendering or query-submission bug rather than an indexing issue. This segmentation does not move you toward the root cause.'
          },
          {
            id: 'c',
            label: 'Segment by user cohort (new vs. returning users) to see if new users are searching differently',
            isCorrect: false,
            level: 'wrong',
            feedback: 'User cohort segmentation is useful for behavioral hypotheses, but this is an index/catalog issue, not a user behavior issue. New and returning users searching the same terms would hit the same zero-result wall. Segmenting by user cohort would show both groups affected equally and provide no diagnostic value here.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: 'Zero-result queries are concentrated in new subcategory terms in Home & Garden and Electronics. What is the most likely root cause?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Synonym mappings for new subcategory terms added in the catalog update were not created, so queries for those terms return nothing',
            isCorrect: true,
            level: 'strong',
            feedback: 'This hypothesis is directly supported by the known fact that synonym mapping was not updated before ingestion. When a catalog adds new subcategory terms and the synonym table does not include those terms (or their common user-facing equivalents), search queries using those terms will find no indexed results. The category-specific nature of the spike — only Home & Garden and Electronics — matches exactly where new subcategories were added.'
          },
          {
            id: 'b',
            label: 'User demand shifted toward uncommon or niche queries in those categories',
            isCorrect: false,
            level: 'partial',
            feedback: 'A demand shift is a valid hypothesis when query volume changes, but the known facts state query volume is normal. Demand shifts also tend to be gradual rather than overnight spikes. The simultaneous pipeline run and the synonym gap evidence make a catalog/indexing explanation far more plausible than a sudden behavioral shift.'
          },
          {
            id: 'c',
            label: 'The search ranking algorithm regressed and is mis-scoring results for those categories',
            isCorrect: false,
            level: 'wrong',
            feedback: 'A ranking regression would cause worse results or lower-quality matches, but zero results means no items were returned at all — this is an index coverage issue, not a ranking issue. Ranking regressions manifest as clicks on poor results or low conversion on search, not as zero-result rates. Distinguishing between "bad results" and "no results" is a critical diagnostic distinction in search quality.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Your hypothesis is missing synonym mappings for new catalog terms. How do you confirm this before asking engineering to fix it?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Pull the top 50 zero-result query strings, cross-reference against new catalog terms from the ingestion, and check the synonym table for gaps',
            isCorrect: true,
            level: 'strong',
            feedback: 'This validation directly tests the mechanism: if the zero-result queries map to newly-ingested catalog terms that are absent from the synonym table, the root cause is confirmed with specificity. You can hand engineering an exact list of missing synonym entries, which accelerates the fix. Concrete query strings + catalog diff + synonym table comparison is a complete and actionable validation.'
          },
          {
            id: 'b',
            label: 'Survey users who received zero results to ask what they were looking for',
            isCorrect: false,
            level: 'partial',
            feedback: 'User surveys take time and will produce noisy data when you can directly inspect the query logs and synonym table. For a search quality issue with clear system-side evidence, structured query log analysis is faster and more precise than user self-report. Use surveys when you lack quantitative signal, not when the signal is already in your logs.'
          },
          {
            id: 'c',
            label: 'Run a new ML ranking experiment to improve coverage for the affected categories',
            isCorrect: false,
            level: 'wrong',
            feedback: 'A ranking experiment is the wrong tool for a zero-result problem — ranking only applies when results exist. Running an experiment here would test a fix that doesn\'t address the actual cause and would delay resolution. The fix is operational (add synonym mappings), not algorithmic, and should be validated and deployed without an experiment cycle.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've identified the hypothesis: the catalog re-ingestion added new subcategory terms in Home & Garden and Electronics, but synonym mappings for those terms were never created — so user queries return zero results.\n\nWrite a SQL query that extracts the top zero-result query strings from those two categories since the pipeline ran, so you can cross-reference them against the synonym table and confirm the missing mappings.`,
      hints: [
        'Filter to searches with result_count = 0 and only after the 2am pipeline run timestamp',
        'Limit to the two affected categories: Home & Garden and Electronics',
        'Group by search_query to find the most frequently searched zero-result terms',
        'Order by frequency descending — the highest-volume zero-result queries are the ones to fix first'
      ],
      modelQuery: `SELECT
  sq.search_query,
  sq.category,
  COUNT(*)                        AS zero_result_count,
  COUNT(DISTINCT sq.user_id)      AS unique_users_affected,

  -- Check if this term exists anywhere in the synonym table
  CASE
    WHEN st.canonical_term IS NOT NULL THEN 'has_synonym'
    ELSE 'NO SYNONYM — MISSING'
  END AS synonym_status,

  -- Check if the term was added in the catalog update
  CASE
    WHEN ct.term IS NOT NULL THEN 'new_catalog_term'
    ELSE 'pre-existing_term'
  END AS catalog_status

FROM search_queries sq

-- Left join to synonym table to identify gaps
LEFT JOIN synonym_table st
  ON LOWER(sq.search_query) = LOWER(st.user_query)

-- Left join to new catalog terms added in the 2am pipeline
LEFT JOIN catalog_terms ct
  ON LOWER(sq.search_query) = LOWER(ct.term)
  AND ct.ingested_at >= '2024-01-17 02:00:00'  -- Only terms from today's run

WHERE sq.result_count = 0
  AND sq.searched_at >= '2024-01-17 02:00:00'  -- After the pipeline ran
  AND sq.category IN ('Home & Garden', 'Electronics')

GROUP BY 1, 2, 5, 6
ORDER BY zero_result_count DESC
LIMIT 50;`,
      annotation: `Line-by-line explanation:

result_count = 0 → filters to only zero-result searches. This is the population we're investigating.

searched_at >= 2am pipeline run → ensures we're only looking at queries that happened after the catalog update, not pre-existing zero-result terms.

category IN ('Home & Garden', 'Electronics') → scopes to the two affected categories from the known facts, keeping the result set focused.

LEFT JOIN synonym_table → if synonym_status = 'NO SYNONYM — MISSING', this row is a confirmed gap. The JOIN maps user query terms against the canonical synonym entries.

LEFT JOIN catalog_terms → the 'new_catalog_term' flag confirms which zero-result queries correspond to terms literally added in the 2am pipeline. The most actionable rows are: zero_result_count HIGH + synonym_status 'NO SYNONYM' + catalog_status 'new_catalog_term'.

COUNT(DISTINCT user_id) → shows how many unique users were affected, not just query count. A term searched by 500 different users is higher priority than one searched 500 times by the same user.

Expected output: top rows will show new catalog terms with 'NO SYNONYM — MISSING' status and high unique user counts. Hand this list to engineering — each row is a synonym entry that needs to be created.`
    },
    seniorDiagnosis: {
      likelyCause: 'Missing synonym mappings for new subcategory terms added in the catalog re-ingestion',
      reasoning: 'When the catalog pipeline added new subcategories in Home & Garden and Electronics, the search synonym table was not updated to include the new terms or their user-facing equivalents. As a result, user queries using those new category terms return zero results because the index has the items but the query terms do not match the indexed identifiers. The scope — 23% zero-result rate in affected categories vs. 4% elsewhere — and the timing alignment with the pipeline run make this a near-certain operational gap, not an algorithmic issue. This type of failure is common in catalog-driven search systems: new taxonomy additions break search coverage whenever synonym and keyword mapping pipelines are not run in sync with catalog ingestion. The fix is operational (add synonyms and re-index), and the validation is a direct inspection of query strings against the synonym table.',
      validationPlan: [
        'Export the top 100 zero-result query strings from the affected categories (Home & Garden, Electronics) since the pipeline ran',
        'Compare those query strings against the list of new subcategory terms added in the 2am ingestion to confirm overlap',
        'Inspect the synonym table for each matching new term to confirm the synonym entries are absent',
        'Spot-test: manually add synonym mappings for 5 high-volume zero-result terms and confirm search returns results'
      ],
      recommendation: 'Add missing synonym mappings for all new subcategory terms from the catalog update and trigger a re-index for the affected categories. Implement a pre-ingestion validation check that flags new catalog terms with no synonym coverage to prevent recurrence on future quarterly updates.',
      commonMistakes: [
        'Diagnosing as a ranking regression when zero results indicates an index coverage gap, not a ranking issue',
        'Investigating demand shifts when the pipeline timing is the obvious starting point',
        'Attempting to fix with an ML experiment instead of an operational synonym update',
        'Failing to add a pre-ingestion synonym coverage check to prevent recurrence'
      ],
      interviewPhrase: 'Zero results is a coverage problem, not a ranking problem — before touching the algorithm, I check whether the index even has the items the query is looking for.'
    }
  },

  {
    id: 'RCA03',
    title: 'Buyer Cancellations Up 40% in Three Cities',
    subtitle: 'Crafted · Two-Sided Marketplace · Fulfillment',
    difficulty: 'analyst',
    isFree: false,
    domain: 'marketplace',
    linkedConceptIds: ['segmentation', 'marketplace-interference', 'funnel-decomposition'],
    context: {
      metricMovement: 'Buyer cancellation rate increased from 3.1% to 4.3% overall, but up 40% in NYC, Chicago, and LA',
      businessImpact: 'Cancellations trigger refunds and seller disputes — sustained increase would erode both sides of the marketplace',
      timeWindow: 'Increase started 10 days ago, coinciding with a new seller onboarding cohort',
      knownFacts: [
        'A new seller onboarding batch was activated 10 days ago — 380 new sellers, concentrated in those 3 cities',
        'Cancellation reason codes show "item not as described" up 3x in those cities',
        '"Seller unresponsive" cancellation reason is up 2x',
        'Star rating for new sellers (cohort) averages 3.8 vs. 4.6 for existing sellers',
        'No product changes were deployed in this period'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'Cancellation rate spiked 10 days ago. Before assuming buyer behavior changed, what do you check first?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Verify cancellation tracking logic and refund attribution have not changed — confirm the data definition is consistent',
            isCorrect: true,
            level: 'strong',
            feedback: 'If the cancellation tracking code or attribution logic changed around the same time as the spike, you could be measuring more cancellations simply because you are capturing more of them. Confirming data consistency is the first step in any metric investigation — a real 40% increase in cancellation rate has significant business implications, so you want to be certain before acting. No product changes were deployed, but data pipeline or tracking changes can happen independently.'
          },
          {
            id: 'b',
            label: 'Check overall GMV trends for anomalies that might indicate instrumentation problems',
            isCorrect: false,
            level: 'partial',
            feedback: 'GMV trends can signal data issues but are not the most direct check for cancellation tracking accuracy. A targeted look at the cancellation event tracking code and refund pipeline is faster and more specific. GMV is a useful corroboration step after you have confirmed cancellation data integrity.'
          },
          {
            id: 'c',
            label: 'Accept the data as accurate and immediately start analyzing buyer behavior in those cities',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Skipping the data integrity check is risky when the metric moved significantly and a data pipeline may have changed. In two-sided marketplace analytics, cancellation tracking can be affected by changes in how refunds are attributed, how partial cancellations are counted, or how reason codes are classified. Validate the measurement before acting on it.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'Data is confirmed accurate. Now decompose the cancellation rate metric to find what is driving the increase. Which decomposition is most revealing?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Break cancellations by reason code + seller cohort (new vs. existing sellers) + geography',
            isCorrect: true,
            level: 'strong',
            feedback: 'This three-dimensional decomposition directly tests the seller cohort hypothesis: if new sellers are driving cancellations, the reason codes and geography will line up with the new onboarding batch. Reason code analysis tells you the mechanism (listing accuracy vs. responsiveness), seller cohort tells you the supply-side source, and geography confirms the concentration matches the new seller batch locations. Together these are a complete diagnostic picture.'
          },
          {
            id: 'b',
            label: 'Compare total cancellation rate this week vs. last week across the entire marketplace',
            isCorrect: false,
            level: 'partial',
            feedback: 'Week-over-week comparison at the aggregate level confirms the trend but does not reveal the driver. You already know cancellations are up — the question is why and in which segment. Aggregate comparison is a monitoring step, not a diagnostic step; decomposition by seller cohort and reason code is far more actionable.'
          },
          {
            id: 'c',
            label: 'Look at total order volume to see if demand increased and overwhelmed fulfillment',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Total order volume would help if the hypothesis were a demand surge overwhelming supply, but the reason codes point to listing quality and seller responsiveness — not capacity. Looking at aggregate order volume here would distract from the seller cohort signal that is already visible in the known facts.'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Decomposition confirms reason codes "item not as described" and "seller unresponsive" are concentrated in those three cities. Which segmentation confirms the seller cohort hypothesis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment by new vs. established sellers + cancellation reason code + city to compare cancellation rates directly between cohorts',
            isCorrect: true,
            level: 'strong',
            feedback: 'Comparing cancellation rates between new and established sellers in those three cities with reason code breakdown is the definitive test of the seller quality hypothesis. If new sellers have 3-4x the cancellation rate of established sellers on the same reason codes, the cohort is confirmed as the driver. The seller rating differential (3.8 vs. 4.6) already suggests quality gap — this segmentation quantifies it with outcome data.'
          },
          {
            id: 'b',
            label: 'Segment by product category to see if specific item types are driving cancellations',
            isCorrect: false,
            level: 'partial',
            feedback: 'Category segmentation is a useful secondary check — if new sellers are concentrated in specific categories, category and cohort effects will overlap. However, category is a downstream attribute of sellers, not the root cause variable. The seller cohort is the primary segmentation given the timing and known seller rating differential.'
          },
          {
            id: 'c',
            label: 'Segment by buyer cohort (new vs. returning buyers) to see if behavior changed',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Buyer cohort segmentation tests whether buyers changed their behavior, but the reason codes point to supply-side failures (inaccurate listings, unresponsive sellers). If new buyers were cancelling more due to behavior changes, the reason codes would reflect different patterns. The evidence already points to the seller side — segment there.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: 'New sellers in those cities have 3.8 average rating vs. 4.6 for existing sellers, and "not as described" cancellations are 3x higher. What is the root cause hypothesis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'New seller onboarding cohort has lower listing quality and slower response times, driving "not as described" and "seller unresponsive" cancellations in cities where they are concentrated',
            isCorrect: true,
            level: 'strong',
            feedback: 'The hypothesis aligns with all the known signals: new sellers rated 3.8 vs. 4.6 (quality gap), cancellation reasons pointing to listing accuracy and responsiveness (operational gap), and geographic concentration matching where the new batch was onboarded. Two-sided marketplace quality problems often originate with seller onboarding batches — the platform scales supply faster than quality assurance can keep up with. The mechanism is clear: new sellers post inaccurate listings and respond slowly, buyers cancel.'
          },
          {
            id: 'b',
            label: 'Demand spike in those cities overwhelmed supply, forcing sellers to cancel or fulfill late',
            isCorrect: false,
            level: 'partial',
            feedback: 'A demand surge is a plausible marketplace hypothesis but is not supported by the specific reason codes ("not as described" and "seller unresponsive"). A demand surge would produce "out of stock" or "long wait" cancellations, not listing inaccuracy cancellations. The reason code evidence is the key distinguishing factor here.'
          },
          {
            id: 'c',
            label: 'Buyers in those cities developed different shopping behavior or higher expectations',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Attributing a marketplace quality problem to buyer behavior without behavioral evidence is a supply-side exoneration fallacy. The cancellation reason codes explicitly point to seller failures (inaccurate listings, unresponsiveness), not buyer preferences. When reason codes are available, they are more reliable than demographic hypotheses about buyer behavior changes.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Your hypothesis is new seller cohort quality driving cancellations. How do you confirm this and quantify the impact?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Pull cancellation rate by seller cohort (new vs. existing) in those cities, cross-reference listing accuracy scores and response time metrics for the new cohort',
            isCorrect: true,
            level: 'strong',
            feedback: 'This validation tests the mechanism directly: if new sellers show 2-3x higher cancellation rates and their listing accuracy scores and response times are below threshold, the quality gap is confirmed with actionable data. Listing accuracy score and response time are the operational inputs that explain the reason code outputs ("not as described," "unresponsive"). This gives marketplace ops a specific cohort to retrain or off-board.'
          },
          {
            id: 'b',
            label: 'Send an NPS survey to buyers who cancelled to understand their experience',
            isCorrect: false,
            level: 'partial',
            feedback: 'NPS surveys can surface qualitative context but are slow and produce self-reported data when you already have reason codes, ratings, and cohort data available. The quantitative evidence chain from seller cohort to listing accuracy to cancellation reason to outcome is already available in your platform data. Reserve surveys for issues where the quantitative signal is ambiguous.'
          },
          {
            id: 'c',
            label: 'Run a promotional campaign in those cities to offset cancellation rates',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Running a promotional campaign does not validate a hypothesis — it attempts to mask the symptom without confirming the cause. If the root cause is seller quality, a promotion would temporarily reduce cancellation rates while the underlying quality problem persists and compounds. Always validate before intervening, and choose interventions that address the root cause.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've hypothesized that the new seller onboarding cohort (380 sellers activated 10 days ago) has lower listing quality and slower response times, causing the buyer cancellation spike in NYC, Chicago, and LA.\n\nWrite a SQL query that compares cancellation rates between the new seller cohort and established sellers in those three cities, broken out by cancellation reason code — to confirm the cohort is the driver and quantify the quality gap.`,
      hints: [
        'Join orders to sellers to get the seller cohort (activated_at date for new vs. established)',
        'Filter geography to NYC, Chicago, LA using a city column or zip-to-city mapping',
        'Break out cancellation reason codes: group by reason_code to compare "item_not_as_described" and "seller_unresponsive" specifically',
        'Calculate cancellation rate as cancelled_orders / total_orders per cohort to normalize for different cohort sizes'
      ],
      modelQuery: `WITH seller_cohorts AS (
  -- Label sellers as new (activated in last 14 days) vs. established
  SELECT
    seller_id,
    city,
    average_rating,
    CASE
      WHEN activated_at >= CURRENT_DATE - INTERVAL '14 days' THEN 'new_cohort'
      ELSE 'established'
    END AS seller_cohort
  FROM sellers
  WHERE city IN ('New York', 'Chicago', 'Los Angeles')
),

order_outcomes AS (
  SELECT
    o.order_id,
    o.seller_id,
    o.city,
    o.status,
    o.cancellation_reason,   -- 'item_not_as_described' | 'seller_unresponsive' | 'buyer_changed_mind' | etc.
    sc.seller_cohort,
    sc.average_rating
  FROM orders o
  INNER JOIN seller_cohorts sc ON o.seller_id = sc.seller_id
  WHERE o.created_at >= CURRENT_DATE - INTERVAL '14 days'
)

SELECT
  seller_cohort,
  cancellation_reason,

  COUNT(*)                                          AS total_orders,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,

  ROUND(
    100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)
    / NULLIF(COUNT(*), 0),
    2
  ) AS cancellation_rate_pct,

  ROUND(AVG(average_rating), 2)                    AS avg_seller_rating

FROM order_outcomes
GROUP BY 1, 2
ORDER BY seller_cohort, cancellation_rate_pct DESC;`,
      annotation: `Line-by-line explanation:

seller_cohorts CTE → separates sellers into new (activated in last 14 days, matching the onboarding batch) vs. established. The 14-day window captures the batch activated "10 days ago" with some buffer.

city IN ('New York', 'Chicago', 'Los Angeles') → scopes to the three geographies where the cancellation spike is confirmed.

order_outcomes CTE → joins orders to sellers, pulling cancellation_reason. This is the key field — we need to see "item_not_as_described" and "seller_unresponsive" broken out by cohort.

cancellation_rate_pct → normalizes by total orders so you're comparing rates, not raw counts. New sellers may have fewer total orders, making raw count comparison misleading.

avg_seller_rating → included per row to confirm the 3.8 vs. 4.6 rating gap alongside the cancellation rate gap.

Expected output: new_cohort rows will show significantly higher cancellation_rate_pct on "item_not_as_described" and "seller_unresponsive" reason codes specifically (3x and 2x respectively per the known facts), while the established seller rows will show lower rates on the same reasons. This is your definitive confirmation.`
    },
    seniorDiagnosis: {
      likelyCause: 'New seller onboarding cohort has lower listing quality and slower response times, driving cancellations in concentrated cities',
      reasoning: 'The 10-day timeline, the geographic concentration in cities where the new seller batch was onboarded, and the specific reason codes all point to a supply quality problem from the new seller cohort. The 380 new sellers onboarded 10 days ago introduced a supply expansion that was not matched by adequate quality controls — their listings contain inaccuracies and their response times are slow relative to established sellers. The 3.8 vs. 4.6 star rating differential is a leading indicator that was visible before this analysis but was not flagged as a risk. In two-sided marketplaces, rapid seller supply expansion without quality gates is a recurring failure mode: the platform optimizes for supply growth but the quality assurance process does not scale at the same rate. This is a supply quality problem, not a demand problem, and the fix is operational — retrain, constrain, or off-board the underperforming new sellers.',
      validationPlan: [
        'Pull cancellation rate for new seller cohort vs. established sellers in NYC, Chicago, and LA for the past 10 days',
        'Extract listing accuracy score (% of listings flagged for description mismatch) and median response time for the new cohort vs. established sellers',
        'Cross-reference seller star ratings with cancellation rates at the individual seller level to confirm quality-outcome correlation',
        'Check whether the 380 new sellers went through the same quality review process as previous batches — determine if the onboarding process changed'
      ],
      recommendation: 'Identify the specific new sellers with cancellation rates above threshold and either place them in a quality improvement program or suspend listings until listings are corrected. Implement a 14-day post-onboarding quality monitoring window for all new seller batches with automatic flagging when cancellation rate exceeds 2x the cohort average.',
      commonMistakes: [
        'Attributing cancellations to buyer behavior before examining seller-side quality signals',
        'Running a promotion to offset the symptom instead of diagnosing the supply quality cause',
        'Segmenting by product category rather than seller cohort when timing points to a cohort-level issue',
        'Not using reason codes as primary diagnostic evidence — they directly name the mechanism'
      ],
      interviewPhrase: 'In marketplace cancellation analysis, reason codes are your fastest diagnostic tool — "not as described" tells you this is a supply quality problem, not a demand problem, before you pull a single additional query.'
    }
  },

  {
    id: 'RCA04',
    title: 'D7 Retention Fell Despite High Open Rates',
    subtitle: 'Orion · Consumer Mobile · Re-engagement',
    difficulty: 'senior',
    isFree: false,
    domain: 'retention',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'cohort-analysis'],
    context: {
      metricMovement: 'D7 retention dropped from 41% to 36% (-5pp) for the cohort that received a new re-engagement push campaign',
      businessImpact: 'D7 retention drop of 5pp predicts ~12% lower 30-day LTV for affected cohort',
      timeWindow: 'Drop observed in cohorts acquired in the last 3 weeks who received the new push campaign',
      knownFacts: [
        'New re-engagement push campaign launched 3 weeks ago — 4 push notifications per day (up from 1)',
        'Notification open rate for the new campaign: 34% (vs. 12% baseline)',
        'Push opt-out rate for campaign cohort: 18% (baseline: 4%)',
        'App uninstall rate for campaign cohort: 6.2% (baseline: 1.8%)',
        'Task completion per session for campaign cohort: -8% versus non-campaign cohort'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'D7 retention dropped for the campaign cohort. Before concluding the campaign caused the drop, what do you verify?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Verify the campaign cohort definition and retention measurement methodology have not changed — confirm the cohort is being measured consistently',
            isCorrect: true,
            level: 'strong',
            feedback: 'Retention measurement can be affected by how the cohort is defined (install date vs. first engagement), how "return" is measured (any open vs. task completion), and whether the campaign cohort inadvertently selects a different user mix than the baseline. Confirming the measurement is consistent before attributing the drop to the campaign is essential — a 5pp retention drop at the cohort level has significant LTV implications and warrants careful measurement validation.'
          },
          {
            id: 'b',
            label: 'Check whether new acquisition sources changed in the last 3 weeks that might explain user quality differences',
            isCorrect: false,
            level: 'partial',
            feedback: 'Acquisition mix shift is a valid confound to check — if the campaign cohort acquired users through lower-quality channels, the retention drop could reflect user quality rather than campaign impact. This is worth investigating as a secondary check, but confirming the cohort measurement definition comes first since it is faster to verify and more directly tests data integrity.'
          },
          {
            id: 'c',
            label: 'Assume the drop is seasonal and compare to the same period last year',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Seasonal comparison ignores the campaign launch which is the most proximate and specific change. Seasonal effects would affect the non-campaign cohort equally, but the drop is concentrated in the campaign cohort. When a specific intervention is launched and a metric moves in the affected group, the intervention is the primary hypothesis, not seasonality.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'Measurement is confirmed accurate. Now decompose the retention metric to understand where in the engagement funnel the drop occurs. What decomposition do you run?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Break retention by campaign cohort vs. non-campaign cohort, and within the campaign cohort by notification frequency exposure bucket (1/day vs. 2/day vs. 4/day)',
            isCorrect: true,
            level: 'strong',
            feedback: 'Comparing campaign vs. non-campaign cohort isolates the campaign effect from organic retention trends. Breaking the campaign cohort by frequency bucket tests the dose-response relationship: if retention drops more sharply with higher notification frequency, that is strong evidence of notification fatigue rather than any other campaign variable. Frequency buckets are the precise lever that was changed in this campaign.'
          },
          {
            id: 'b',
            label: 'Compare overall DAU week-over-week and look for the inflection point',
            isCorrect: false,
            level: 'partial',
            feedback: 'DAU trends can show the aggregate impact of retention decline but do not isolate the campaign cohort or reveal the frequency-retention relationship. Cohort-level analysis is the correct instrument for retention diagnosis — DAU is a lagging aggregate that mixes too many cohorts to be diagnostic here.'
          },
          {
            id: 'c',
            label: 'Look at total new user signups and install volume trends',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Install volume is an acquisition metric, not a retention metric. Retention diagnosis requires looking at what happens to users after they install — specifically, whether they return. Looking at install trends would address a different question (are we acquiring users?) rather than the current question (why are acquired users not returning?).'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Decomposition shows the retention gap is largest in the highest-frequency notification bucket. Which segmentation reveals the behavioral mechanism?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment campaign cohort by opt-out status, uninstall timing, task completion depth per session, and notification frequency received',
            isCorrect: true,
            level: 'strong',
            feedback: 'This segmentation tests the notification fatigue mechanism at the behavioral level: users who opted out or uninstalled early would show near-zero D7 retention, driving the aggregate drop. Task completion per session (-8%) already suggests users who stayed are less engaged — cross-referencing this with opt-out timing and frequency exposure reveals whether the damage is from churned users or degraded engagement among retained users. Both dimensions are important.'
          },
          {
            id: 'b',
            label: 'Segment by device OS (iOS vs. Android) to see if notification behavior differs by platform',
            isCorrect: false,
            level: 'partial',
            feedback: 'Platform segmentation is relevant if you suspect notification delivery or opt-out mechanics differ between iOS and Android (which they do — iOS requires explicit opt-in). However, the primary question is whether notification volume is driving fatigue, not whether the effect differs by platform. OS segmentation is a useful third-level check after the frequency-fatigue relationship is established.'
          },
          {
            id: 'c',
            label: 'Segment by acquisition channel to see if paid users respond differently to push campaigns',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Acquisition channel segmentation tests a user selection hypothesis, but the high opt-out rate (18% vs. 4%) and uninstall rate (6.2% vs. 1.8%) suggest the campaign is creating negative reactions regardless of acquisition source. The behavioral signals already point to a campaign design problem, not a user selection problem. Segmenting by channel would not reveal the notification fatigue mechanism.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: '18% opt-out rate, 6.2% uninstall rate, -8% task completion per session, and high open rate. What is the root cause hypothesis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Notification fatigue: 4x frequency increase annoyed users into opting out and uninstalling. High open rate reflects involuntary phone pickups, not genuine intent',
            isCorrect: true,
            level: 'strong',
            feedback: 'This is a classic proxy metric misinterpretation: open rate was used as a success signal, but it conflates genuine engagement with reactive taps on intrusive notifications. The 4.5x increase in opt-outs (4% to 18%) and the 3.4x increase in uninstalls (1.8% to 6.2%) are direct behavioral signals that users found the increased frequency aversive. Task completion per session declining -8% confirms that opens are not translating to meaningful engagement. High open rates with low task completion and high churn is the diagnostic fingerprint of notification fatigue.'
          },
          {
            id: 'b',
            label: 'D7 retention drop is seasonal — the acquisition period coincides with a low-quality user cycle',
            isCorrect: false,
            level: 'partial',
            feedback: 'Seasonality is worth ruling out, but a seasonal effect would affect both campaign and non-campaign cohorts equally. Since the drop is concentrated in the campaign cohort, a campaign-specific mechanism is far more likely. The 4.5x increase in opt-outs in the campaign cohort vs. baseline is too large to attribute to seasonality alone.'
          },
          {
            id: 'c',
            label: 'App bugs introduced at the same time as the campaign are causing session drops and reducing retention',
            isCorrect: false,
            level: 'wrong',
            feedback: 'An app bug would affect all users, not just the campaign cohort. The retention drop is specifically concentrated in users who received the new push campaign, which makes the campaign the far more parsimonious explanation. App bugs also typically manifest as crashes or errors, not as opt-out spikes — the opt-out behavior is a deliberate user response to the notification experience.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Your hypothesis is notification fatigue from 4x frequency increase. How do you confirm the causal mechanism before recommending changes?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Compare D7 retention by notification frequency bucket, cross-reference opt-out timing with retention drop, and check task completion for opted-out vs. active users',
            isCorrect: true,
            level: 'strong',
            feedback: 'This validation tests the dose-response relationship (more notifications = lower retention), the behavioral mechanism (opt-outs as the retention drain), and the engagement quality (whether retained users are actually engaging more deeply or just opening). If retention decreases monotonically with frequency and opted-out users show the steepest retention drop, the fatigue mechanism is confirmed with enough precision to drive a specific recommendation: reduce frequency.'
          },
          {
            id: 'b',
            label: 'Plan a future A/B test on notification frequency to measure the causal impact',
            isCorrect: false,
            level: 'partial',
            feedback: 'A future A/B test on frequency is the right long-term approach for optimizing notification cadence, but it does not help you diagnose the current retention drop quickly. You already have the data from the current campaign — analyzing frequency buckets within the existing cohort gives you directional evidence faster. Run the analysis first, then design a cleaner experiment to optimize the frequency ceiling.'
          },
          {
            id: 'c',
            label: 'Survey opted-out users to understand why they disabled notifications',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Opted-out users are hard to reach (they have already signaled disengagement) and will largely say "too many notifications" — which you already infer from the 4x frequency increase. The quantitative data (opt-out rate, uninstall rate, task completion, frequency buckets) is more actionable and faster to analyze. Surveys are valuable when the behavioral signal is ambiguous; here it is not.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've hypothesized notification fatigue: the 4x frequency increase (from 1 to 4 pushes/day) is annoying users into opting out and uninstalling, which directly suppresses D7 retention. The high open rate is a misleading proxy — it conflates genuine engagement with reactive phone pickups.\n\nWrite a SQL query that shows D7 retention by notification frequency bucket, so you can confirm the dose-response relationship: the more notifications a user received per day, the lower their D7 retention.`,
      hints: [
        'Create frequency buckets: 1/day, 2/day, 3/day, 4/day (or use ranges like 1-2 vs. 3-4)',
        'D7 retention = users who had any app session on day 7 after install / total users in that cohort',
        'Only include users from cohorts acquired since the campaign launched (3 weeks ago)',
        'Include opt_out_rate and uninstall_rate per bucket to confirm the fatigue mechanism alongside retention'
      ],
      modelQuery: `WITH user_notification_exposure AS (
  -- Calculate average daily push notifications received per user
  -- for the first 7 days after install
  SELECT
    u.user_id,
    u.install_date,
    u.cohort_type,   -- 'campaign' | 'control'
    COUNT(n.notification_id) / 7.0  AS avg_daily_notifications,

    -- Bucket users by frequency received
    CASE
      WHEN COUNT(n.notification_id) / 7.0 < 1.5  THEN '1/day'
      WHEN COUNT(n.notification_id) / 7.0 < 2.5  THEN '2/day'
      WHEN COUNT(n.notification_id) / 7.0 < 3.5  THEN '3/day'
      ELSE '4/day'
    END AS frequency_bucket,

    MAX(CASE WHEN n.event_type = 'opt_out'   THEN 1 ELSE 0 END) AS did_opt_out,
    MAX(CASE WHEN n.event_type = 'uninstall' THEN 1 ELSE 0 END) AS did_uninstall

  FROM users u
  LEFT JOIN notification_events n
    ON u.user_id = n.user_id
    AND n.event_date BETWEEN u.install_date AND u.install_date + INTERVAL '7 days'
  WHERE u.install_date >= CURRENT_DATE - INTERVAL '21 days'  -- Last 3 weeks (campaign period)
  GROUP BY 1, 2, 3
),

d7_sessions AS (
  -- Flag users who had any session on day 7 (D7 = retained)
  SELECT DISTINCT user_id
  FROM app_sessions
  WHERE DATE(session_start) = (
    SELECT install_date + INTERVAL '7 days'
    FROM users u2
    WHERE u2.user_id = app_sessions.user_id
    LIMIT 1
  )
)

SELECT
  une.frequency_bucket,
  une.cohort_type,
  COUNT(*)                                                  AS total_users,
  SUM(CASE WHEN ds.user_id IS NOT NULL THEN 1 ELSE 0 END)  AS d7_retained_users,

  ROUND(
    100.0 * SUM(CASE WHEN ds.user_id IS NOT NULL THEN 1 ELSE 0 END)
    / NULLIF(COUNT(*), 0), 2
  )                                                         AS d7_retention_pct,

  ROUND(100.0 * AVG(une.did_opt_out),    2)                AS opt_out_rate_pct,
  ROUND(100.0 * AVG(une.did_uninstall),  2)                AS uninstall_rate_pct

FROM user_notification_exposure une
LEFT JOIN d7_sessions ds ON une.user_id = ds.user_id

GROUP BY 1, 2
ORDER BY frequency_bucket, cohort_type;`,
      annotation: `Line-by-line explanation:

avg_daily_notifications = COUNT / 7.0 → normalizes to a daily rate. Some users may have received the campaign for fewer than 7 days depending on install timing.

frequency_bucket CASE WHEN → groups users into 4 buckets matching the frequency levels. This creates the dose-response variable.

did_opt_out / did_uninstall MAX flags → captures whether each user opted out or uninstalled at any point in days 1-7. These are the behavioral mechanisms driving retention suppression.

install_date >= CURRENT_DATE - 21 days → scopes to campaign-period cohorts only, so you're not mixing in pre-campaign users who had different notification exposure.

d7_sessions CTE → defines D7 retention as "had any app session exactly on day 7." Some teams use "within day 7" — adjust based on your company's retention definition.

Expected output: D7 retention_pct should decrease monotonically as frequency_bucket increases (1/day highest retention → 4/day lowest), while opt_out_rate_pct and uninstall_rate_pct increase in the same direction. That monotonic relationship is your dose-response confirmation of the fatigue mechanism.`
    },
    seniorDiagnosis: {
      likelyCause: 'Notification fatigue from 4x frequency increase driving opt-outs and uninstalls that suppress D7 retention',
      reasoning: 'The campaign optimized for open rate — a proxy metric that measures whether users tapped the notification, not whether they engaged meaningfully. The 34% open rate looked like a success signal, but it was masking a destructive user experience: users were picking up their phone because of relentless notifications, not because they wanted to use the app. The 4.5x opt-out increase (4% to 18%) and 3.4x uninstall increase (1.8% to 6.2%) are direct evidence of aversion, and these churned users mechanically suppress D7 retention. Task completion per session declining -8% confirms that even retained users are engaging less purposefully — they open but do not complete. This is a textbook proxy metric trap: the metric the team optimized (open rate) moved in the right direction while the metric that matters (D7 retention and LTV) moved in the wrong direction. Senior analysts recognize that high open rates with high churn is the diagnostic signature of notification fatigue, not campaign success.',
      validationPlan: [
        'Pull D7 retention by notification frequency bucket (users who received 1/day vs. 2/day vs. 4/day) — confirm retention decreases monotonically with frequency',
        'Calculate the contribution of opted-out and uninstalled users to the aggregate D7 retention drop — quantify how much of the 5pp drop is attributable to those groups',
        'Compare task completion per session for high-frequency users vs. low-frequency users within the campaign cohort to confirm engagement quality degradation',
        'Calculate the LTV impact: model 30-day LTV difference between campaign and non-campaign cohort using the 5pp retention gap'
      ],
      recommendation: 'Immediately reduce push notification frequency to 1-2 per day maximum and implement a fatigue cap. Redefine campaign success metrics to include opt-out rate, uninstall rate, and task completion per session alongside open rate. Run a proper frequency optimization experiment (1/day vs. 2/day vs. 3/day) with retention as the primary metric before scaling any re-engagement campaign.',
      commonMistakes: [
        'Treating high open rate as a success signal without checking downstream engagement and retention metrics',
        'Not calculating the opt-out and uninstall contribution to the retention drop',
        'Planning a new A/B test instead of analyzing frequency-bucket data already available in the current campaign',
        'Attributing retention drop to acquisition quality or seasonality without ruling out the campaign cohort effect'
      ],
      interviewPhrase: 'Open rate is a proxy — when I see high open rates and declining retention, I immediately check opt-out rate and task completion per session, because the campaign might be training users to ignore the app, not return to it.'
    }
  },

  {
    id: 'RCA05',
    title: 'Revenue Grew 18% But Margin Compressed',
    subtitle: 'Vantage Analytics · B2B SaaS · Commercial Health',
    difficulty: 'senior',
    isFree: false,
    domain: 'revenue',
    linkedConceptIds: ['funnel-decomposition', 'segmentation'],
    context: {
      metricMovement: 'Revenue grew 18% QoQ but gross margin compressed from 71% to 64%',
      businessImpact: 'At scale, 7pp margin compression on SaaS revenue threatens contribution margin and fundraising multiple',
      timeWindow: 'Compression observed over the last full quarter — gradual, not sudden',
      knownFacts: [
        'A new volume discount tier was launched mid-quarter for 5+ seat contracts',
        'New customer mix shifted toward SMB (shorter contracts, lower ACV)',
        'Hosting/infrastructure costs grew 28% despite only 18% revenue growth',
        'Professional services/onboarding cost per account grew 35% for new SMB accounts',
        'Net revenue retention (NRR) for enterprise accounts: 118%. For SMB accounts: 89%'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'Margin compressed 7pp over a full quarter. Before diagnosing business causes, what do you verify?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Verify revenue and cost attribution are consistent QoQ — confirm no accounting methodology or cost allocation changes occurred',
            isCorrect: true,
            level: 'strong',
            feedback: 'Gross margin is computed from both revenue recognition and cost allocation, and either can change without reflecting a real business deterioration. In B2B SaaS, revenue recognition methodology changes (e.g., moving from cash to accrual, changing deferred revenue treatment) or cost reclassifications can move gross margin by several percentage points. Confirming methodology consistency is table stakes before attributing the compression to business factors.'
          },
          {
            id: 'b',
            label: 'Check if new contracts are being recognized in the correct period',
            isCorrect: false,
            level: 'partial',
            feedback: 'Revenue recognition timing for new contracts is worth checking — particularly for multi-year deals where front-loaded recognition can inflate revenue — but this is one specific accounting check within the broader methodology consistency review. A targeted single-item check is less thorough than confirming the overall methodology has not changed.'
          },
          {
            id: 'c',
            label: 'Accept the margin compression as real and immediately analyze discount program impact',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Jumping to business analysis before validating the measurement is premature when the compression is gradual over a full quarter and could reflect accounting changes, cost reclassifications, or changes in how professional services costs are allocated to gross margin. A 7pp margin compression is material enough to warrant a data validation step before the business discussion.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'Accounting methodology is confirmed consistent. Now decompose gross margin to find which revenue or cost driver is most responsible. What is the right decomposition?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Break margin by revenue type (new ARR, expansion, renewal) × customer segment (enterprise vs. SMB) × cost category (hosting, professional services, support)',
            isCorrect: true,
            level: 'strong',
            feedback: 'This multi-dimensional decomposition exposes the three potential drivers simultaneously: revenue mix shift (enterprise vs. SMB), pricing impact (discounts on expansion revenue), and cost structure (hosting and PS cost growth). Without this decomposition you cannot tell whether margin compression is primarily a revenue problem (lower ACV per seat) or a cost problem (higher cost per account). Both dimensions matter and they compound.'
          },
          {
            id: 'b',
            label: 'Compare total operating expenses as a percentage of revenue QoQ',
            isCorrect: false,
            level: 'partial',
            feedback: 'OpEx-to-revenue ratio is a useful high-level signal but it mixes gross margin costs with below-the-line costs and obscures the specific drivers within COGS. Gross margin compression is specifically a cost-of-revenue issue, and you need to decompose hosting, professional services, and support separately to find where the cost growth is concentrated. Aggregate OpEx analysis dilutes the signal.'
          },
          {
            id: 'c',
            label: 'Look at total contract count and average contract value to understand volume vs. price dynamics',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Contract count and ACV give you a top-line lens but do not touch the cost side of margin. You need both revenue composition and cost composition to explain margin compression — looking at only the revenue side would lead you to discount impacts while missing the infrastructure and PS cost overruns that are likely contributing equally.'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Decomposition shows hosting costs grew faster than revenue and PS costs grew faster for new accounts. Which segmentation reveals the margin by business unit?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment gross margin by account tier (enterprise vs. SMB), discount tier, and new vs. existing contracts',
            isCorrect: true,
            level: 'strong',
            feedback: 'This segmentation will show starkly different gross margins between enterprise and SMB accounts, confirming the mix shift impact. Segmenting by discount tier quantifies how much the volume discount eroded per-seat revenue. New vs. existing contract segmentation reveals whether the PS cost growth is concentrated in new SMB onboarding (as the known facts suggest). Together these three cuts isolate all three contributing factors.'
          },
          {
            id: 'b',
            label: 'Segment by geographic region to see if certain markets have higher cost structures',
            isCorrect: false,
            level: 'partial',
            feedback: 'Regional segmentation can reveal geographic cost differences (particularly for professional services with on-site delivery) and is a reasonable secondary check. However, the primary drivers — SMB mix shift, discount impact, and infrastructure cost per account — are not primarily geographic and would not be surfaced by this segmentation first. Segment by business variable before geographic variable.'
          },
          {
            id: 'c',
            label: 'Segment by deal size (ACV) only to find where revenue concentration has shifted',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Segmenting by deal size only addresses the revenue side of margin and misses the cost-per-account dynamics that the known facts already flag (PS cost +35% for SMB, hosting +28%). Margin is revenue minus cost — a segmentation that only looks at the revenue dimension will systematically under-diagnose the cost drivers that are compounding the margin compression.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: 'SMB mix shift, volume discount program, and 28% infrastructure cost growth are all present. What is the root cause hypothesis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Three compounding factors: (a) SMB mix shift brings lower ACV and higher PS cost per account, (b) volume discount eroded per-seat revenue, (c) infrastructure costs grew faster than revenue due to SMB inefficiency',
            isCorrect: true,
            level: 'strong',
            feedback: 'Margin compression that develops gradually over a quarter almost always reflects multiple compounding factors rather than a single cause. Each factor individually might produce 2-3pp compression, but together they produce the observed 7pp. The NRR differential (118% enterprise vs. 89% SMB) confirms that SMB accounts also erode faster, making the mix shift a compounding problem over time. Senior analysts recognize this as a unit economics breakdown, not a pricing or sales problem in isolation.'
          },
          {
            id: 'b',
            label: 'The volume discount program alone is causing the margin compression',
            isCorrect: false,
            level: 'partial',
            feedback: 'Discounting is one contributing factor but cannot explain the full 7pp compression alone, especially since infrastructure costs grew 28% vs. 18% revenue growth — that gap contributes independently of discounting. Attributing the entire margin compression to one factor when three compounding factors are visible in the data is an incomplete diagnosis that would lead to an incomplete fix.'
          },
          {
            id: 'c',
            label: 'Revenue recognition change is masking true margin by front-loading revenue from new contracts',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Revenue recognition was already confirmed as unchanged in the data check step. Returning to a hypothesis that was already ruled out wastes analytical cycles and suggests insufficient discipline in the diagnosis process. When a data quality check rules out an explanation, it should be removed from the hypothesis list, not recycled at the hypothesis stage.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Three compounding factors are identified. How do you build the business case that quantifies each driver?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Build a cohort P&L by segment (enterprise vs. SMB) showing revenue per seat, hosting cost per seat, PS cost per account, gross margin, and NRR — cross-reference to isolate each driver\'s contribution',
            isCorrect: true,
            level: 'strong',
            feedback: 'A cohort-level P&L with the full cost breakdown is the gold standard for margin diagnosis in B2B SaaS. Showing gross margin per segment with all cost inputs attributed makes each driver\'s contribution explicit and defensible. Cross-referencing NRR by segment extends the analysis to lifetime margin, not just single-quarter margin — critical for a fundraising conversation. This analysis directly translates into unit economics talking points.'
          },
          {
            id: 'b',
            label: 'Review the total discount amount given in the quarter and compare to prior quarter',
            isCorrect: false,
            level: 'partial',
            feedback: 'Discount volume is one input worth quantifying, but it only covers one of three compounding factors. A complete margin diagnosis needs to quantify all three drivers (mix shift, discounting, cost growth) so leadership can prioritize which lever to pull. Reviewing only discounts would lead to an incomplete recommendation.'
          },
          {
            id: 'c',
            label: 'Reduce all discounts immediately to recover margin',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Taking action before completing the validation is premature and risky — reducing discounts without understanding the sales pipeline impact could churn new SMB prospects and worsen the mix shift problem. Validation exists to inform the right intervention: in this case, the answer may be to price SMB differently, cap discount tiers, and optimize infrastructure efficiency simultaneously, not just to eliminate discounts.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've identified three compounding factors behind the margin compression: (a) SMB mix shift brings lower ACV and higher cost-to-serve, (b) the volume discount program eroded per-seat revenue, (c) infrastructure costs grew 28% vs. 18% revenue growth.\n\nWrite a SQL query that builds a per-segment cohort P&L — enterprise vs. SMB — showing gross margin per account alongside hosting cost, professional services cost, and revenue per seat. This is the analysis you'd present to the CFO.`,
      hints: [
        'Join contracts to accounts to get segment (enterprise vs. SMB) and contract_value',
        'Join to hosting_costs and ps_costs tables to get cost per account (not per user)',
        'Gross margin = (revenue - hosting_cost - ps_cost) / revenue × 100',
        'Include NRR or churn flag per segment to extend the story to LTV, not just quarterly margin'
      ],
      modelQuery: `WITH account_revenue AS (
  SELECT
    a.account_id,
    a.segment,            -- 'enterprise' | 'smb'
    a.acquisition_quarter,
    c.contract_value_arr,
    c.seat_count,
    c.has_volume_discount,
    c.discounted_seat_price,
    c.list_seat_price,

    -- Effective revenue per seat (reflects discount impact)
    ROUND(c.contract_value_arr / NULLIF(c.seat_count, 0), 2) AS revenue_per_seat,

    -- Discount erosion: revenue lost per seat due to volume discount
    ROUND(c.list_seat_price - c.discounted_seat_price, 2)    AS discount_erosion_per_seat

  FROM accounts a
  INNER JOIN contracts c ON a.account_id = c.account_id
  WHERE c.contract_start_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 months')
    AND c.status = 'active'
),

account_costs AS (
  SELECT
    account_id,
    SUM(monthly_hosting_cost) * 3    AS quarterly_hosting_cost,  -- 3 months
    SUM(ps_hours * ps_hourly_rate)   AS quarterly_ps_cost
  FROM (
    SELECT account_id, monthly_hosting_cost, 0 AS ps_hours, 0 AS ps_hourly_rate
    FROM infrastructure_costs
    WHERE month >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 months')
    UNION ALL
    SELECT account_id, 0, hours_logged, hourly_rate
    FROM professional_services_engagements
    WHERE engagement_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 months')
  ) costs
  GROUP BY 1
),

retention_flags AS (
  -- NRR proxy: did the account expand, renew flat, or churn/contract this quarter?
  SELECT
    account_id,
    CASE
      WHEN arr_change_pct > 0.05  THEN 'expansion'
      WHEN arr_change_pct > -0.05 THEN 'flat_renewal'
      ELSE 'contraction_or_churn'
    END AS nrr_bucket
  FROM account_arr_changes
  WHERE quarter = DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 months')
)

SELECT
  ar.segment,
  ar.has_volume_discount,
  rf.nrr_bucket,

  COUNT(*)                                        AS account_count,
  ROUND(AVG(ar.contract_value_arr), 0)            AS avg_arr,
  ROUND(AVG(ar.revenue_per_seat), 2)              AS avg_revenue_per_seat,
  ROUND(AVG(ar.discount_erosion_per_seat), 2)     AS avg_discount_erosion_per_seat,
  ROUND(AVG(ac.quarterly_hosting_cost), 0)        AS avg_quarterly_hosting_cost,
  ROUND(AVG(ac.quarterly_ps_cost), 0)             AS avg_quarterly_ps_cost,

  -- Gross margin per account: (revenue - COGS) / revenue
  ROUND(
    100.0 * (
      AVG(ar.contract_value_arr / 4.0)   -- Quarterly ARR
      - AVG(ac.quarterly_hosting_cost)
      - AVG(ac.quarterly_ps_cost)
    ) / NULLIF(AVG(ar.contract_value_arr / 4.0), 0),
    1
  ) AS gross_margin_pct

FROM account_revenue ar
LEFT JOIN account_costs ac ON ar.account_id = ac.account_id
LEFT JOIN retention_flags rf ON ar.account_id = rf.account_id

GROUP BY 1, 2, 3
ORDER BY segment, has_volume_discount, nrr_bucket;`,
      annotation: `Line-by-line explanation:

account_revenue CTE → pulls contract-level data including the discounted vs. list price per seat. The discount_erosion_per_seat column quantifies how much revenue the volume discount is removing per seat — if this is $50/seat × 10,000 seats, you have the dollar impact.

account_costs CTE → UNION ALL pattern merges hosting and professional services into a single cost per account. This is critical because PS cost is often excluded from gross margin calculations that focus only on infrastructure.

quarterly_hosting_cost = monthly × 3 → annualizes to quarterly for apples-to-apples comparison with ARR.

retention_flags CTE → proxies NRR by looking at ARR change direction. Not a true NRR calculation (which would need prior-period comparison) but sufficient to confirm the enterprise expansion vs. SMB contraction pattern.

gross_margin_pct → the headline metric. Expected output: enterprise / no_discount rows will show ~71% gross margin (matching pre-compression baseline), while smb / has_discount rows will show significantly lower margins — likely 55-60% range — directly decomposing where the 7pp compression is coming from.`
    },
    seniorDiagnosis: {
      likelyCause: 'Three compounding factors: SMB mix shift, volume discount margin erosion, and infrastructure cost outpacing revenue growth',
      reasoning: 'The margin compression developed gradually over a full quarter because three factors were compounding simultaneously rather than any single event driving a sudden change. The SMB mix shift introduced a structurally lower-margin customer segment — SMB accounts have lower ACV, higher professional services cost per account (+35%), and an NRR of 89% vs. 118% for enterprise, meaning they also erode over time. The volume discount program reduced per-seat revenue on 5+ seat contracts without a corresponding reduction in infrastructure cost (the cost savings from larger contracts did not materialize). Infrastructure costs growing 28% vs. 18% revenue growth suggests SMB accounts are more infrastructure-intensive per dollar of revenue — likely due to more frequent onboarding, shorter sessions with heavier data loading, or less efficient usage patterns. These three factors individually might each compress margin 2-3pp; together they explain the full 7pp. The NRR differential is the most alarming long-term signal: a business growing on 89% NRR customers while its high-NRR enterprise base represents a shrinking share of new growth is building a structurally declining margin profile.',
      validationPlan: [
        'Build a per-segment cohort P&L (enterprise vs. SMB, new vs. existing) with revenue per seat, COGS per account (hosting + PS + support), and gross margin — calculate each segment\'s contribution to the total margin change',
        'Quantify the discount program impact: calculate average revenue per seat with and without the volume discount for 5+ seat contracts, measure total revenue impact of discounts given in the quarter',
        'Analyze infrastructure cost per account by segment: confirm SMB accounts are more infrastructure-intensive per dollar of revenue, and quantify the efficiency gap',
        'Model 12-month forward margin under current mix trajectory vs. a re-balanced mix with enterprise growth targets and SMB pricing adjustments'
      ],
      recommendation: 'Address all three drivers with targeted interventions: (a) introduce SMB-specific pricing that reflects true cost-to-serve including higher PS and infrastructure cost per account, (b) restructure the volume discount tier to require minimum contract length that enables infrastructure efficiency, (c) set enterprise growth targets to rebalance the mix. Present cohort P&L to leadership to make the unit economics of the SMB segment transparent before the next fundraise.',
      commonMistakes: [
        'Attributing the full margin compression to discounting alone and missing the cost-side drivers',
        'Not connecting NRR differential to long-term margin trajectory — 89% SMB NRR is a structural margin erosion risk',
        'Recommending immediate discount elimination without quantifying the sales pipeline impact first',
        'Stopping at revenue-side analysis without building a cost-per-account breakdown by segment'
      ],
      interviewPhrase: 'Revenue growth with margin compression usually means you are selling to the wrong mix of customers or the right customers at the wrong price — I build a cohort P&L to see the unit economics by segment before I recommend any pricing or cost changes.'
    }
  },

  {
    id: 'RCA06',
    title: 'Bot Deflection Looks Good — But Escalations Are Climbing',
    subtitle: 'Threadline · B2B SaaS · AI Support Quality',
    difficulty: 'senior',
    isFree: false,
    domain: 'genai',
    linkedConceptIds: ['proxy-metric', 'metric-gaming', 'data-quality-check'],
    context: {
      metricMovement: 'Deflection rate (tickets not escalated to human) held at 68%, but human escalation volume increased 22% and repeat contact rate rose from 8% to 19%',
      businessImpact: 'Repeat contacts and escalation volume are rising — true resolution quality is degrading despite flat deflection',
      timeWindow: 'Trend observed over 6 weeks since GenAI bot rollout to full production',
      knownFacts: [
        'GenAI support bot replaced Tier 1 human agents 6 weeks ago — handles billing, account, and feature questions',
        'Deflection rate (tickets not escalated): 68% vs. 70% target — appears fine',
        'But human escalation VOLUME is up 22% despite deflection rate being stable',
        'Repeat contact rate (same issue re-opened within 7 days): 8% to 19%',
        'CSAT score for bot-handled tickets: 3.1/5 vs. 4.2/5 for human-handled',
        'Hallucination flag rate (answer factually wrong per QA review): 11%'
      ]
    },
    diagnosisSteps: [
      {
        id: 'system_check',
        stepNumber: 1,
        label: 'System / Data Check',
        prompt: 'Deflection rate looks fine at 68%, but escalation volume and repeat contacts are rising. What is your first check?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Verify what "deflected" means in the measurement — confirm it means "not escalated," not "issue resolved"',
            isCorrect: true,
            level: 'strong',
            feedback: 'Deflection is a notoriously ambiguous metric in AI support systems: it typically measures whether a ticket was closed or not escalated, not whether the user\'s issue was actually resolved. If "deflected" is defined as "ticket closed without escalation," it includes users who gave up, accepted a wrong answer, or closed the ticket out of frustration. Clarifying the operational definition of deflection is the critical first check — a 68% "deflection" rate that masks a 19% repeat contact rate is measuring the wrong thing.'
          },
          {
            id: 'b',
            label: 'Check whether total ticket volume has increased since the bot launched, which might explain higher escalation volume',
            isCorrect: false,
            level: 'partial',
            feedback: 'Total ticket volume is worth checking since higher escalation volume with a stable deflection rate could indicate more tickets in total rather than a quality degradation. However, the repeat contact rate rising from 8% to 19% is a quality signal that does not depend on total volume — it indicates that 19% of contacts require a follow-up within 7 days, which reflects resolution failure regardless of overall volume.'
          },
          {
            id: 'c',
            label: 'Assume deflection equals resolution and report the bot as performing near target',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Treating deflection rate as equivalent to resolution rate is the core measurement error in AI support systems. The 19% repeat contact rate explicitly refutes the idea that "not escalated" means "resolved." Reporting the bot as near target when resolution quality signals are clearly degrading would give leadership a false picture of the bot\'s performance and delay necessary intervention.'
          }
        ]
      },
      {
        id: 'decompose',
        stepNumber: 2,
        label: 'Metric Decomposition',
        prompt: 'Confirmed: "deflected" means not escalated, not resolved. Now decompose support outcomes to understand what is actually happening to tickets. What decomposition do you run?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Break support contacts by outcome (resolved, escalated, abandoned, re-opened) × intent type (billing, feature, account, bug) × bot confidence score',
            isCorrect: true,
            level: 'strong',
            feedback: 'This four-way outcome classification reveals what is hidden by the deflection metric: "deflected" tickets are being split between truly resolved and abandoned/re-opened, and the re-opened category is driving the 19% repeat contact rate. Crossing with intent type will show which categories the bot handles competently vs. poorly, and bot confidence score will reveal whether the bot knows when it does not know — a critical GenAI quality signal. This decomposition transforms a single vanity metric into a complete resolution quality picture.'
          },
          {
            id: 'b',
            label: 'Compare total ticket volume before and after bot launch to isolate the volume effect',
            isCorrect: false,
            level: 'partial',
            feedback: 'Volume comparison helps isolate whether escalation count growth reflects more tickets overall vs. a higher escalation rate, but it does not address the quality question. The repeat contact rate is already a rate (not a count), so volume effects do not explain the 8% to 19% increase. Outcome decomposition is the more informative next step.'
          },
          {
            id: 'c',
            label: 'Look at total bot session count and average session duration to understand usage patterns',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Session count and duration are engagement metrics, not resolution quality metrics. A bot can have high session counts and long sessions and still be failing to resolve issues — users might be in long sessions precisely because the bot is not giving them satisfactory answers. Engagement metrics are a proxy for usage, not a proxy for resolution quality.'
          }
        ]
      },
      {
        id: 'segment',
        stepNumber: 3,
        label: 'Segmentation',
        prompt: 'Decomposition shows repeat contacts and hallucinations are concentrated in specific intent types. Which segmentation pinpoints the failure mode?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Segment by intent category (billing vs. feature vs. account vs. bug), user tier (enterprise vs. SMB), and bot confidence bucket (high vs. medium vs. low confidence)',
            isCorrect: true,
            level: 'strong',
            feedback: 'Intent category segmentation will reveal whether the 11% hallucination rate is concentrated in specific question types (e.g., billing questions requiring account-specific data, or feature questions about recent product changes the bot was not trained on). User tier segmentation matters because enterprise customers with complex account configurations are more likely to receive wrong answers than SMB customers with standard setups. Bot confidence segmentation tests whether the bot knows when it should escalate — low-confidence answers that are not escalated are a key failure mode to identify and fix.'
          },
          {
            id: 'b',
            label: 'Segment by account age (new vs. established accounts) to see if newer accounts have more questions',
            isCorrect: false,
            level: 'partial',
            feedback: 'Account age segmentation could reveal whether newer accounts are generating more complex questions, but it does not get to the resolution quality question. An established account can receive a hallucinated answer just as easily as a new account. The intent type and confidence segmentation is more directly tied to the bot\'s quality failure modes.'
          },
          {
            id: 'c',
            label: 'Segment by which human support agent handled escalated tickets',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Human agent performance is irrelevant to the bot quality diagnosis — the question is why tickets are being escalated or re-opened, not how agents are handling escalations once they receive them. Focusing on agent-level segmentation deflects attention from the bot quality failures that are the actual root cause. This would be appropriate only if you were diagnosing human agent performance, not bot quality.'
          }
        ]
      },
      {
        id: 'hypothesis',
        stepNumber: 4,
        label: 'Root Cause Hypothesis',
        prompt: '19% repeat contact rate, 11% hallucination rate, 3.1/5 CSAT for bot tickets. What is the root cause hypothesis?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Bot is deflecting tickets by giving low-quality or wrong answers that do not resolve issues — users accept or abandon, then re-contact. Deflection rate measures non-escalation, not resolution',
            isCorrect: true,
            level: 'strong',
            feedback: 'This hypothesis explains all three signals simultaneously: the flat deflection rate (bot is closing tickets), the rising repeat contacts (issues are not actually resolved), and the high hallucination rate (11% of answers are factually wrong per QA). The 3.1/5 CSAT vs. 4.2/5 for human-handled tickets confirms users feel the bot is providing lower quality support. The mechanism is that escalation friction (effort required to reach a human) leads users to accept a bad bot answer and then re-contact later rather than escalating immediately. Deflection as a success metric actively masks this failure mode.'
          },
          {
            id: 'b',
            label: 'Total ticket volume increased due to product issues unrelated to the bot, generating more escalations',
            isCorrect: false,
            level: 'partial',
            feedback: 'Volume increase is worth ruling out, but the repeat contact rate rising from 8% to 19% is a rate-based quality signal independent of total volume. Even if ticket volume grew, that would not explain why 19% of contacts require re-opening within 7 days — that pattern points to resolution failure, not demand increase. A volume-driven hypothesis would not predict rising repeat contact rate without also predicting declining per-ticket quality.'
          },
          {
            id: 'c',
            label: 'Human agents are causing the escalation spike by failing to resolve escalated tickets efficiently',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Human agents are handling escalated tickets with 4.2/5 CSAT vs. 3.1/5 for the bot — this directly contradicts the hypothesis that human agents are causing the quality degradation. The quality gap runs in the opposite direction: human resolution is outperforming bot resolution. Attributing the escalation volume increase to human agent failure when the CSAT data points to bot quality failure is an evidence inversion.'
          }
        ]
      },
      {
        id: 'validate',
        stepNumber: 5,
        label: 'Validation Approach',
        prompt: 'Your hypothesis is that deflected tickets are not being resolved. How do you confirm this and quantify the failure modes?',
        type: 'single',
        options: [
          {
            id: 'a',
            label: 'Sample 100 deflected-but-re-contacted tickets, classify failure mode (wrong answer, incomplete answer, hallucination, no answer), and cross-reference with CSAT and hallucination rate by intent type',
            isCorrect: true,
            level: 'strong',
            feedback: 'Sampling deflected tickets that resulted in repeat contact gives you the ground truth for what "deflection without resolution" looks like in practice. Classifying the failure mode (wrong answer vs. hallucination vs. abandonment) with a 100-ticket sample is enough to produce a statistically meaningful distribution. Cross-referencing CSAT by intent type and the 11% hallucination rate by category gives you the specific areas where the bot is failing, enabling targeted retraining or escalation routing changes.'
          },
          {
            id: 'b',
            label: 'Run a CSAT survey for all bot interactions to measure satisfaction at scale',
            isCorrect: false,
            level: 'partial',
            feedback: 'CSAT surveys at scale will confirm that bot satisfaction is lower than human satisfaction, which you already know (3.1 vs. 4.2). Surveys take time, have low response rates, and will not give you the specific failure modes (wrong answer, hallucination, incomplete) that you need to fix the bot. Qualitative ticket review is faster and more diagnostic for root cause analysis of AI quality failures.'
          },
          {
            id: 'c',
            label: 'Increase escalation friction to reduce escalation volume and bring the rate closer to the 70% target',
            isCorrect: false,
            level: 'wrong',
            feedback: 'Increasing escalation friction when resolution quality is already degrading would make the problem worse, not better: users who cannot easily escalate would accept more wrong answers, re-contact even more frequently, and have even lower CSAT. This intervention optimizes the deflection proxy metric while directly harming resolution quality and user trust. It is the wrong direction entirely — the correct fix is to improve bot answer quality and lower the escalation barrier for low-confidence answers.'
          }
        ]
      }
    ],
    sqlStep: {
      prompt: `You've confirmed the core issue: the bot's deflection metric measures "ticket closed without escalation," not "issue resolved." The 19% repeat contact rate proves that nearly 1 in 5 deflected contacts returns within 7 days — meaning the bot closed the ticket but didn't solve the problem.\n\nWrite a SQL query that calculates the true resolution rate: deflected tickets that did NOT result in a re-contact within 7 days. Then break it by intent category and bot confidence score to show where the failure is concentrated.`,
      hints: [
        'A "true resolution" = ticket was deflected (not escalated) AND no re-open or new ticket from same user within 7 days',
        'Use a LEFT JOIN to re_contacts table on user_id and ticket_open_date to flag re-contacts',
        'Break out by intent_category (billing, feature, account, bug) to find where hallucinations are concentrated',
        'Include bot_confidence_score bucket (high/medium/low) to show whether the bot knows when it\'s unsure'
      ],
      modelQuery: `WITH deflected_tickets AS (
  -- All tickets that were closed without human escalation
  SELECT
    t.ticket_id,
    t.user_id,
    t.opened_at,
    t.closed_at,
    t.intent_category,           -- 'billing' | 'feature' | 'account' | 'bug'
    t.bot_confidence_score,      -- 0.0 to 1.0
    t.csat_score,                -- 1-5 post-resolution survey (nullable)
    t.hallucination_flagged,     -- Boolean: flagged in QA review

    -- Confidence bucket
    CASE
      WHEN t.bot_confidence_score >= 0.80 THEN 'high_confidence'
      WHEN t.bot_confidence_score >= 0.50 THEN 'medium_confidence'
      ELSE 'low_confidence'
    END AS confidence_bucket

  FROM support_tickets t
  WHERE t.resolution_type = 'deflected'   -- Bot handled, not escalated
    AND t.opened_at >= CURRENT_DATE - INTERVAL '42 days'  -- 6-week bot rollout period
),

re_contacts AS (
  -- Tickets re-opened or new tickets from same user within 7 days
  SELECT DISTINCT dt.ticket_id AS original_ticket_id
  FROM deflected_tickets dt
  INNER JOIN support_tickets follow_up
    ON follow_up.user_id = dt.user_id
    AND follow_up.ticket_id != dt.ticket_id
    AND follow_up.opened_at BETWEEN dt.opened_at AND dt.opened_at + INTERVAL '7 days'
)

SELECT
  dt.intent_category,
  dt.confidence_bucket,

  COUNT(*)                                                        AS deflected_tickets,

  -- True resolutions: no re-contact within 7 days
  SUM(CASE WHEN rc.original_ticket_id IS NULL THEN 1 ELSE 0 END) AS truly_resolved,
  SUM(CASE WHEN rc.original_ticket_id IS NOT NULL THEN 1 ELSE 0 END) AS re_contacted,

  ROUND(
    100.0 * SUM(CASE WHEN rc.original_ticket_id IS NULL THEN 1 ELSE 0 END)
    / NULLIF(COUNT(*), 0), 1
  )                                                               AS true_resolution_rate_pct,

  ROUND(
    100.0 * SUM(CASE WHEN rc.original_ticket_id IS NOT NULL THEN 1 ELSE 0 END)
    / NULLIF(COUNT(*), 0), 1
  )                                                               AS repeat_contact_rate_pct,

  -- Quality signals
  ROUND(AVG(dt.csat_score), 2)                                    AS avg_csat,
  ROUND(100.0 * AVG(dt.hallucination_flagged::int), 1)            AS hallucination_rate_pct

FROM deflected_tickets dt
LEFT JOIN re_contacts rc ON dt.ticket_id = rc.original_ticket_id

GROUP BY 1, 2
ORDER BY intent_category, confidence_bucket;`,
      annotation: `Line-by-line explanation:

deflected_tickets CTE → scopes to only bot-handled tickets (resolution_type = 'deflected'), filtering to the 6-week rollout period. Confidence bucket divides bot answers into high/medium/low to test whether the bot escalates appropriately when uncertain.

re_contacts CTE → the critical definition: any ticket from the same user within 7 days of the original deflected ticket. This flags re-contacts whether the user re-opened the original ticket or opened a new one for the same unresolved issue.

LEFT JOIN re_contacts → NULL on the right side means no re-contact → "truly resolved." Not NULL means re-contact → resolution failure.

true_resolution_rate_pct → this is the metric that should replace (or complement) deflection rate. Expected value: overall ~81% (since we know 19% re-contact within 7 days).

hallucination_rate_pct broken by intent_category + confidence_bucket → expected to show: billing and feature questions have the highest hallucination rates (they require account-specific or recently-updated information the bot may not have), and low_confidence answers have the highest re-contact rates. These two patterns together tell engineering exactly where to focus retraining.`
    },
    seniorDiagnosis: {
      likelyCause: 'GenAI bot is deflecting (closing) tickets without resolving them — deflection metric measures non-escalation, not resolution quality',
      reasoning: 'The core failure here is a metric definition problem that became a product quality problem: "deflection rate" was defined as "not escalated" and treated as equivalent to "resolved," which it is not. The bot closes tickets by giving answers — whether correct, incomplete, or hallucinated — and users who lack the energy to escalate accept those answers and re-contact later. The 8% to 19% repeat contact rate is the clearest signal: nearly one in five contacts is a re-contact within 7 days, which is definitional evidence of resolution failure. The 11% hallucination rate from QA review confirms the bot is generating factually wrong answers at a non-trivial rate, and the 3.1/5 CSAT vs. 4.2/5 for human-handled tickets confirms users notice the quality difference. The escalation volume growing 22% while deflection rate holds stable is mathematically explained by total support ticket volume growing (more users) while the bot handles a constant 68% proportion — the absolute count of escalations grows even if the rate does not. Senior analysts working on GenAI product metrics must distinguish between engagement metrics (deflection rate), satisfaction metrics (CSAT), and outcome metrics (repeat contact rate, resolution rate) — and recognize that the last category is the only one that tells you whether the AI is actually working.',
      validationPlan: [
        'Pull all tickets from the past 6 weeks classified as "deflected" (not escalated) and cross-reference with the repeat contact log — calculate the true resolution rate: deflected tickets that did NOT re-contact within 7 days',
        'Sample 100 deflected-but-re-contacted tickets and manually classify failure mode: wrong answer (hallucination), incomplete answer, irrelevant answer, or user confusion',
        'Break hallucination flag rate (11%) by intent category to identify the specific question types where the bot is most likely to generate incorrect answers',
        'Calculate the true cost of non-resolution: deflected ticket + re-contact = 2 support touches instead of 1, likely at higher cost than a direct human escalation would have been'
      ],
      recommendation: 'Redefine success metrics for the bot to include resolution rate (no re-contact within 7 days) as the primary KPI, with deflection rate demoted to a secondary efficiency metric. Implement a low-confidence escalation path where the bot automatically offers human escalation when its confidence is below threshold. Retrain the bot on the specific intent categories with highest hallucination rates. Report bot performance to leadership with the full resolution quality picture, not just deflection rate.',
      commonMistakes: [
        'Equating deflection rate with resolution rate — these are categorically different measurements',
        'Recommending increased escalation friction to hit deflection targets when quality is already degrading',
        'Accepting 11% hallucination rate without connecting it to the repeat contact rate and CSAT signals',
        'Reporting bot performance as "near target" based on deflection rate alone when three quality signals are flashing red'
      ],
      interviewPhrase: 'For any AI support system, I always ask: does our deflection metric measure non-escalation or actual resolution? Because if it\'s the former, we\'re probably celebrating the bot closing tickets the user didn\'t feel were worth escalating — not tickets that were actually resolved.'
    }
  }
];

export const rcaCasesById = Object.fromEntries(rcaCases.map(c => [c.id, c]));
