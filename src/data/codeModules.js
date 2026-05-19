// Product Analytics Lab — Code Room Module Data
// V3.1 — Analytics SQL + Python/Pandas in product context.
// Not generic coding. Every module presents a product scenario and a real analyst task.

export const codeModules = [

  // ─────────────────────────────────────────────
  // CODE01 — Funnel Conversion Rate by Cohort (SQL · FREE)
  // ─────────────────────────────────────────────
  {
    id: 'code01-funnel-sql',
    title: 'Write a Funnel Query',
    subtitle: 'SQL · Funnel Analysis · Conversion Rates',
    track: 'sql',
    difficulty: 'analyst',
    isFree: true,
    tags: ['funnel', 'conversion', 'window functions'],

    scenario: {
      company: 'Crestline Home',
      context: `Checkout conversion dropped 5pp overnight. You've confirmed it's real. Now the head of product wants a query that shows step-by-step funnel conversion rates for the 7 days before and after Tuesday's deployment — so she can see exactly where in the checkout flow users are dropping.`,
      schema: [
        { table: 'funnel_events', description: 'One row per user per funnel step', columns: ['user_id', 'session_id', 'event_name', 'event_ts', 'platform'] },
        { table: '—', description: 'event_name values: "viewed_cart", "viewed_payment", "submitted_payment", "order_confirmed"', columns: [] },
      ],
      task: 'Write a SQL query that shows the conversion rate at each funnel step (users who reached step N / users who started checkout), split by pre- and post-deployment period.',
    },

    hints: [
      'Use COUNT(DISTINCT user_id) at each step — not COUNT(*), which double-counts session restarts',
      'A CASE WHEN on event_ts creates the pre/post deployment flag',
      'Funnel step rate = users at step N / users at step 1 (not step N / step N-1)',
      'Use conditional aggregation: SUM(CASE WHEN event_name = \'...\' THEN 1 ELSE 0 END)',
    ],

    partialCode: `SELECT
  deploy_period,
  COUNT(DISTINCT CASE WHEN event_name = 'viewed_cart' THEN user_id END) AS step1_cart,
  -- TODO: add step2 (viewed_payment), step3 (submitted_payment), step4 (order_confirmed)

  -- TODO: compute conversion rates from step1 to each step
  -- payment_page_rate = step2 / step1
  -- payment_submit_rate = step3 / step1
  -- order_confirmed_rate = step4 / step1

FROM (
  SELECT
    user_id,
    event_name,
    -- TODO: create deploy_period column: 'pre_deploy' vs 'post_deploy'
    -- Deployment was Tuesday 2024-01-16 at 3pm
    CASE
      WHEN event_ts < '2024-01-16 15:00:00' THEN ___
      ELSE ___
    END AS deploy_period
  FROM funnel_events
  WHERE event_ts BETWEEN '2024-01-09' AND '2024-01-23'  -- 7 days each side
) base
GROUP BY 1
ORDER BY deploy_period;`,

    modelAnswer: `SELECT
  deploy_period,

  -- Step counts (unique users who reached each step)
  COUNT(DISTINCT CASE WHEN event_name = 'viewed_cart'         THEN user_id END) AS step1_cart,
  COUNT(DISTINCT CASE WHEN event_name = 'viewed_payment'      THEN user_id END) AS step2_payment_page,
  COUNT(DISTINCT CASE WHEN event_name = 'submitted_payment'   THEN user_id END) AS step3_payment_submit,
  COUNT(DISTINCT CASE WHEN event_name = 'order_confirmed'     THEN user_id END) AS step4_confirmed,

  -- Conversion rates (each step / step 1 = overall funnel depth)
  ROUND(
    100.0 * COUNT(DISTINCT CASE WHEN event_name = 'viewed_payment'    THEN user_id END)
    / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'viewed_cart'      THEN user_id END), 0),
    1
  ) AS payment_page_rate_pct,

  ROUND(
    100.0 * COUNT(DISTINCT CASE WHEN event_name = 'submitted_payment' THEN user_id END)
    / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'viewed_cart'      THEN user_id END), 0),
    1
  ) AS payment_submit_rate_pct,

  ROUND(
    100.0 * COUNT(DISTINCT CASE WHEN event_name = 'order_confirmed'   THEN user_id END)
    / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'viewed_cart'      THEN user_id END), 0),
    1
  ) AS checkout_conversion_rate_pct

FROM (
  SELECT
    user_id,
    event_name,
    CASE
      WHEN event_ts < '2024-01-16 15:00:00' THEN 'pre_deploy'
      ELSE 'post_deploy'
    END AS deploy_period
  FROM funnel_events
  WHERE event_ts BETWEEN '2024-01-09' AND '2024-01-23'
) base

GROUP BY 1
ORDER BY deploy_period;`,

    keyInsights: [
      `COUNT(DISTINCT CASE WHEN event_name = '...' THEN user_id END) — this pattern counts unique users who reached a step in a single pass over the table, no subquery needed`,
      `Funnel rates use step1 as the denominator, not step N-1. This measures "what % of cart viewers completed checkout", which is more meaningful than step-to-step dropout rate`,
      `NULLIF prevents division-by-zero if a deploy_period bucket has no cart views`,
      `Expected output: payment_submit_rate_pct drops notably in post_deploy — confirming the drop is at the payment submission step, not at page view`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE02 — Retention Cohort Query (SQL · Analyst)
  // ─────────────────────────────────────────────
  {
    id: 'code02-retention-sql',
    title: 'Build a Retention Cohort Table',
    subtitle: 'SQL · Cohort Analysis · Window Functions',
    track: 'sql',
    difficulty: 'analyst',
    isFree: false,
    tags: ['retention', 'cohort analysis', 'window functions', 'DATE_DIFF'],

    scenario: {
      company: 'Orion · Consumer Mobile App',
      context: `D7 retention fell 5pp for the cohort that received a new re-engagement push campaign. The PM wants a cohort table showing Day 1, Day 7, and Day 30 retention for install cohorts over the past 8 weeks — to see if the drop is recent or if it predates the campaign.`,
      schema: [
        { table: 'users', description: 'One row per user', columns: ['user_id', 'install_date', 'cohort_type'] },
        { table: 'app_sessions', description: 'One row per session', columns: ['user_id', 'session_date'] },
      ],
      task: `Write a SQL query that produces a retention cohort table: one row per install week, with D1, D7, and D30 retention rates as columns.`,
    },

    hints: [
      'A CTE for "install cohort" + a CTE for "return sessions" keeps things readable',
      'Use DATE_DIFF(session_date, install_date, DAY) to compute days since install',
      'D7 retention = users with any session on days 6-8 (±1 day tolerance is industry standard) / users who installed that week',
      'Use a LEFT JOIN from cohorts to sessions so install weeks with 0 retention still appear',
    ],

    partialCode: `WITH install_cohorts AS (
  -- Weekly install cohorts
  SELECT
    user_id,
    install_date,
    DATE_TRUNC('week', install_date) AS install_week
  FROM users
  WHERE install_date >= CURRENT_DATE - INTERVAL '56 days'  -- 8 weeks
),

return_events AS (
  SELECT
    ic.user_id,
    ic.install_week,
    DATE_DIFF(s.session_date, ic.install_date, DAY) AS days_since_install
  FROM install_cohorts ic
  -- TODO: join to app_sessions on user_id
  -- TODO: only include sessions after install date
),

cohort_retention AS (
  SELECT
    install_week,
    COUNT(DISTINCT user_id) AS cohort_size,

    -- TODO: count users retained on D1 (day 1 ± tolerance)
    COUNT(DISTINCT CASE WHEN days_since_install BETWEEN ___ AND ___ THEN user_id END) AS d1_retained,

    -- TODO: count D7 retained users (days 6-8)

    -- TODO: count D30 retained users (days 29-31)
  FROM return_events
  GROUP BY 1
)

SELECT
  install_week,
  cohort_size,
  d1_retained,
  -- TODO: compute D1, D7, D30 retention rates as percentages
FROM cohort_retention
ORDER BY install_week;`,

    modelAnswer: `WITH install_cohorts AS (
  SELECT
    user_id,
    install_date,
    DATE_TRUNC('week', install_date) AS install_week
  FROM users
  WHERE install_date >= CURRENT_DATE - INTERVAL '56 days'
),

return_events AS (
  -- Every session for each installed user, with days since install
  SELECT
    ic.user_id,
    ic.install_week,
    ic.install_date,
    DATE_DIFF(s.session_date, ic.install_date, DAY) AS days_since_install
  FROM install_cohorts ic
  LEFT JOIN app_sessions s
    ON ic.user_id = s.user_id
    AND s.session_date > ic.install_date  -- Exclude the install day itself
),

cohort_retention AS (
  SELECT
    install_week,
    COUNT(DISTINCT user_id)                                                     AS cohort_size,
    COUNT(DISTINCT CASE WHEN days_since_install BETWEEN 1  AND 2  THEN user_id END) AS d1_retained,
    COUNT(DISTINCT CASE WHEN days_since_install BETWEEN 6  AND 8  THEN user_id END) AS d7_retained,
    COUNT(DISTINCT CASE WHEN days_since_install BETWEEN 29 AND 31 THEN user_id END) AS d30_retained
  FROM return_events
  GROUP BY 1
)

SELECT
  install_week,
  cohort_size,
  d1_retained,
  d7_retained,
  d30_retained,

  ROUND(100.0 * d1_retained  / NULLIF(cohort_size, 0), 1) AS d1_retention_pct,
  ROUND(100.0 * d7_retained  / NULLIF(cohort_size, 0), 1) AS d7_retention_pct,
  ROUND(100.0 * d30_retained / NULLIF(cohort_size, 0), 1) AS d30_retention_pct

FROM cohort_retention
ORDER BY install_week;`,

    keyInsights: [
      `Day ±1 tolerance (days 6-8 for D7) is industry standard — many apps don't require users to open on exactly day 7, so a 3-day window avoids undercounting`,
      `LEFT JOIN from install_cohorts to app_sessions ensures cohorts with zero return events still appear in the output with NULL/0 retention`,
      `COUNT(DISTINCT user_id) in the CASE WHEN pattern counts each user once per retention bucket, even if they had multiple sessions in that window`,
      `This query produces the exact table the PM asked for — one row per install week, D1/D7/D30 as columns. You can now scan down the install_week column and see if the D7 drop started the week the campaign launched`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE03 — A/B Test Significance in Python (Python · Analyst)
  // ─────────────────────────────────────────────
  {
    id: 'code03-ab-test-python',
    title: 'Run an A/B Test Significance Check',
    subtitle: 'Python · scipy.stats · Confidence Intervals',
    track: 'python',
    difficulty: 'analyst',
    isFree: false,
    tags: ['A/B testing', 'scipy', 'confidence intervals', 'hypothesis testing'],

    scenario: {
      company: 'Crestline Home · Checkout A/B Test',
      context: `The new payment provider experiment ran for 14 days. You have the results: control (old provider) had 62.4% checkout conversion on 294,000 users. Treatment (new provider) had 63.8% conversion on 292,000 users. The PM asks: "Is this significant? What's the 95% CI on the lift?"`,
      schema: [
        { table: 'Python variables already defined:', description: '', columns: [] },
        { table: '—', description: 'control_users = 294000, control_conversions = 183456', columns: [] },
        { table: '—', description: 'treatment_users = 292000, treatment_conversions = 186216', columns: [] },
      ],
      task: `Write Python code that computes: (1) conversion rates for both arms, (2) the absolute lift, (3) a two-proportion z-test p-value, and (4) a 95% confidence interval on the lift.`,
    },

    hints: [
      'Use scipy.stats.proportions_ztest for the two-proportion z-test',
      'The 95% CI on a proportion difference can be computed with the standard error: SE = sqrt(p1*(1-p1)/n1 + p2*(1-p2)/n2)',
      'z* for 95% CI is 1.96',
      'Report lift in both absolute (pp) and relative (%) terms — PMs understand both',
    ],

    partialCode: `import numpy as np
from scipy import stats

# Given data
control_users       = 294_000
control_conversions = 183_456
treatment_users     = 292_000
treatment_conversions = 186_216

# 1. Compute conversion rates
control_rate   = ___
treatment_rate = ___
abs_lift_pp    = ___          # Absolute lift in percentage points
rel_lift_pct   = ___          # Relative lift as a %

print(f"Control:   {control_rate:.2%}")
print(f"Treatment: {treatment_rate:.2%}")
print(f"Lift:      {abs_lift_pp:+.2f}pp  ({rel_lift_pct:+.1f}% relative)")

# 2. Two-proportion z-test
# H0: treatment_rate == control_rate
stat, p_value = stats.proportions_ztest(
    count=___,    # [treatment_conversions, control_conversions]
    nobs=___,     # [treatment_users, control_users]
    alternative='two-sided'
)
print(f"\\np-value: {p_value:.4f}")
print(f"Significant at 0.05: {p_value < 0.05}")

# 3. 95% Confidence interval on the lift
z_star = 1.96
se = ___   # Standard error of the difference
ci_lower = ___
ci_upper = ___
print(f"\\n95% CI: [{ci_lower:+.2f}pp, {ci_upper:+.2f}pp]")`,

    modelAnswer: `import numpy as np
from scipy import stats

# Given data
control_users         = 294_000
control_conversions   = 183_456
treatment_users       = 292_000
treatment_conversions = 186_216

# 1. Conversion rates and lift
control_rate   = control_conversions   / control_users
treatment_rate = treatment_conversions / treatment_users
abs_lift_pp    = (treatment_rate - control_rate) * 100   # In percentage points
rel_lift_pct   = (treatment_rate - control_rate) / control_rate * 100

print(f"Control:   {control_rate:.2%}")
print(f"Treatment: {treatment_rate:.2%}")
print(f"Lift:      {abs_lift_pp:+.2f}pp  ({rel_lift_pct:+.1f}% relative)")

# 2. Two-proportion z-test
stat, p_value = stats.proportions_ztest(
    count=[treatment_conversions, control_conversions],
    nobs=[treatment_users, control_users],
    alternative='two-sided'
)
print(f"\\nZ-statistic: {stat:.3f}")
print(f"p-value:      {p_value:.4f}")
print(f"Significant at α=0.05: {p_value < 0.05}")

# 3. 95% Confidence interval on the absolute lift
z_star = 1.96
se = np.sqrt(
    (treatment_rate * (1 - treatment_rate) / treatment_users) +
    (control_rate   * (1 - control_rate)   / control_users)
)
ci_lower = abs_lift_pp - z_star * se * 100
ci_upper = abs_lift_pp + z_star * se * 100
print(f"\\n95% CI on lift: [{ci_lower:+.2f}pp, {ci_upper:+.2f}pp]")
print(f"\\nInterpretation: Treatment conversion is {abs_lift_pp:+.2f}pp higher.")
print(f"We're 95% confident the true lift is between {ci_lower:.2f}pp and {ci_upper:.2f}pp.")`,

    keyInsights: [
      `proportions_ztest takes count= (conversions) and nobs= (total users) as lists — [treatment, control] order`,
      `The SE formula sqrt(p1*(1-p1)/n1 + p2*(1-p2)/n2) uses each arm's own rate — not the pooled rate — for the CI (use pooled for the test statistic itself, which scipy handles internally)`,
      `Report absolute lift (pp) for product decisions, relative lift (%) for percentage context — PMs care about both`,
      `With n=~290k per arm, almost any real effect will be significant. Always check the CI width — a 95% CI of [+0.1pp, +2.7pp] is very different from [+1.2pp, +1.6pp] in business terms`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE04 — CUPED Variance Reduction (Python · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code04-cuped-python',
    title: 'Implement CUPED Variance Reduction',
    subtitle: 'Python · Pandas · Pre-experiment Covariate',
    track: 'python',
    difficulty: 'senior',
    isFree: false,
    tags: ['CUPED', 'variance reduction', 'pandas', 'OLS regression', 'experimentation'],

    scenario: {
      company: 'Vantage Analytics · B2B SaaS',
      context: `Your A/B test on a new onboarding flow is underpowered — you only have 12,000 users and need 20,000 to reach 80% power at your expected effect size. The stats team suggests applying CUPED using each user's pre-experiment revenue (last 30 days before the experiment) as the covariate. You have the experiment data in a DataFrame.`,
      schema: [
        { table: 'DataFrame: df', description: 'One row per user', columns: ['user_id', 'variant', 'post_revenue', 'pre_revenue'] },
        { table: '—', description: 'variant: "control" | "treatment"', columns: [] },
        { table: '—', description: 'post_revenue: revenue during the experiment period (outcome)', columns: [] },
        { table: '—', description: 'pre_revenue: revenue in the 30 days before the experiment (covariate)', columns: [] },
      ],
      task: `Implement CUPED: regress post_revenue on pre_revenue to estimate theta, compute the CUPED-adjusted outcome, then run a t-test comparing adjusted treatment vs. control. Report the variance reduction achieved.`,
    },

    hints: [
      'CUPED adjusted metric: Y_adj = Y - theta * (X - mean(X))',
      'theta = Cov(Y, X) / Var(X) — this is the OLS regression coefficient of Y on X',
      'Use numpy.cov or just fit a simple OLS with scipy.stats.linregress to get theta',
      'Variance reduction = (1 - Var(Y_adj) / Var(Y)) * 100 — the higher this is, the more power you gained',
    ],

    partialCode: `import pandas as pd
import numpy as np
from scipy import stats

# Assume df is already loaded with columns: user_id, variant, post_revenue, pre_revenue

# 1. Estimate theta — the regression coefficient of post_revenue on pre_revenue
#    theta = Cov(Y, X) / Var(X)
theta = ___

print(f"Theta (covariate coefficient): {theta:.4f}")

# 2. Compute the global mean of pre_revenue (used to center the covariate)
pre_mean = ___

# 3. Apply CUPED adjustment
#    Y_adj = Y - theta * (X - mean(X))
df['post_revenue_cuped'] = ___

# 4. Run t-test on CUPED-adjusted outcomes
control_adj   = df.loc[df['variant'] == 'control',   'post_revenue_cuped']
treatment_adj = df.loc[df['variant'] == 'treatment', 'post_revenue_cuped']

t_stat, p_value = stats.ttest_ind(treatment_adj, control_adj)
lift = treatment_adj.mean() - control_adj.mean()

print(f"\\nCUPED-adjusted lift: \${lift:.2f}")
print(f"p-value: {p_value:.4f}")

# 5. Report variance reduction
var_original = ___   # Variance of unadjusted post_revenue
var_adjusted = ___   # Variance of CUPED-adjusted post_revenue
variance_reduction = ___
print(f"\\nVariance reduction: {variance_reduction:.1f}%")
print(f"Equivalent sample size multiplier: {1 / (1 - variance_reduction/100):.2f}x")`,

    modelAnswer: `import pandas as pd
import numpy as np
from scipy import stats

# 1. Estimate theta using numpy covariance matrix
cov_matrix = np.cov(df['post_revenue'], df['pre_revenue'])
theta = cov_matrix[0, 1] / cov_matrix[1, 1]   # Cov(Y,X) / Var(X)

print(f"Theta (covariate coefficient): {theta:.4f}")

# 2. Global mean of pre_revenue (centering the covariate)
pre_mean = df['pre_revenue'].mean()

# 3. Apply CUPED adjustment: Y_adj = Y - theta * (X - mean(X))
df['post_revenue_cuped'] = df['post_revenue'] - theta * (df['pre_revenue'] - pre_mean)

# 4. T-test on CUPED-adjusted outcomes
control_adj   = df.loc[df['variant'] == 'control',   'post_revenue_cuped']
treatment_adj = df.loc[df['variant'] == 'treatment', 'post_revenue_cuped']

t_stat, p_value = stats.ttest_ind(treatment_adj, control_adj)
lift           = treatment_adj.mean() - control_adj.mean()

print(f"\\nCUPED-adjusted lift:  \${lift:.2f}")
print(f"T-statistic:          {t_stat:.3f}")
print(f"p-value:              {p_value:.4f}")

# 5. Variance reduction
var_original       = df['post_revenue'].var()
var_adjusted       = df['post_revenue_cuped'].var()
variance_reduction = (1 - var_adjusted / var_original) * 100

print(f"\\nOriginal variance:    {var_original:.2f}")
print(f"Adjusted variance:    {var_adjusted:.2f}")
print(f"Variance reduction:   {variance_reduction:.1f}%")

# Equivalent sample size multiplier: 1 / (1 - VR) tells you how much "more data" CUPED simulated
# A 50% variance reduction is equivalent to doubling sample size
equiv_multiplier = 1 / (1 - variance_reduction / 100)
print(f"Sample size multiplier: {equiv_multiplier:.2f}x  (CUPED simulated {equiv_multiplier:.2f}x your actual n)")`,

    keyInsights: [
      `theta = Cov(Y,X) / Var(X) is exactly the OLS coefficient from regressing post_revenue on pre_revenue — numpy.cov gives you the 2×2 covariance matrix, and [0,1]/[1,1] extracts it`,
      `Centering the covariate (X - mean(X)) ensures the adjustment doesn't shift the mean of Y — only reduces variance`,
      `A 50% variance reduction is equivalent to doubling your sample size. With high correlation between pre and post revenue (typical in SaaS: r ≈ 0.7-0.85), you often achieve 40-70% variance reduction`,
      `CUPED does not change the point estimate of the lift — only the standard error, making the same lift more statistically detectable`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE05 — SRM Detection in SQL (SQL · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code05-srm-sql',
    title: 'Detect a Sample Ratio Mismatch',
    subtitle: 'SQL · Chi-squared Test · Experiment Integrity',
    track: 'sql',
    difficulty: 'senior',
    isFree: false,
    tags: ['SRM', 'chi-squared', 'experiment integrity', 'data quality'],

    scenario: {
      company: 'Threadline · B2B SaaS',
      context: `You're reviewing the assignment logs for a 50/50 experiment that ran for 14 days. The platform engineer tells you the split "looks roughly right." Before trusting any results, you need to run an SRM check — a chi-squared test to determine whether the assignment ratio is statistically consistent with the expected 50/50 split.`,
      schema: [
        { table: 'experiment_assignments', description: 'One row per user assignment', columns: ['user_id', 'experiment_id', 'variant', 'assigned_at'] },
      ],
      task: `Write a SQL query that computes the observed assignment counts per variant, the expected counts (assuming perfect 50/50), and the chi-squared statistic. Flag whether an SRM is detected at α = 0.05 (chi-squared critical value: 3.841 for 1 degree of freedom).`,
    },

    hints: [
      'Chi-squared = SUM((observed - expected)^2 / expected) across variants',
      'Expected count = total_users * expected_proportion (0.5 for each arm in a 50/50 split)',
      'You can compute this entirely in SQL using window functions for the total',
      'Flag SRM: chi_sq > 3.841 means p < 0.05 — the assignment ratio is significantly non-random',
    ],

    partialCode: `WITH assignment_counts AS (
  SELECT
    variant,
    COUNT(DISTINCT user_id) AS observed_count
  FROM experiment_assignments
  WHERE experiment_id = 'exp_onboarding_v2'
    AND assigned_at BETWEEN '2024-01-01' AND '2024-01-14'
  GROUP BY 1
),

totals AS (
  SELECT SUM(observed_count) AS total_users
  FROM assignment_counts
),

chi_sq_components AS (
  SELECT
    ac.variant,
    ac.observed_count,
    t.total_users,

    -- Expected count for a 50/50 split
    ___ AS expected_count,

    -- Chi-squared component: (O - E)^2 / E
    ___ AS chi_sq_component

  FROM assignment_counts ac
  CROSS JOIN totals t
)

SELECT
  -- Show per-variant breakdown
  variant,
  observed_count,
  ROUND(expected_count, 0)               AS expected_count,
  ROUND(100.0 * observed_count / SUM(observed_count) OVER (), 2) AS observed_pct,
  ROUND(chi_sq_component, 4)             AS chi_sq_component,

  -- Total chi-squared statistic
  ROUND(SUM(chi_sq_component) OVER (), 4) AS chi_sq_total,

  -- SRM flag: chi_sq > 3.841 => p < 0.05
  CASE WHEN SUM(chi_sq_component) OVER () > ___ THEN 'SRM DETECTED ⚠️' ELSE 'No SRM ✓' END AS srm_status

FROM chi_sq_components
ORDER BY variant;`,

    modelAnswer: `WITH assignment_counts AS (
  SELECT
    variant,
    COUNT(DISTINCT user_id) AS observed_count
  FROM experiment_assignments
  WHERE experiment_id = 'exp_onboarding_v2'
    AND assigned_at BETWEEN '2024-01-01' AND '2024-01-14'
  GROUP BY 1
),

totals AS (
  SELECT SUM(observed_count) AS total_users
  FROM assignment_counts
),

chi_sq_components AS (
  SELECT
    ac.variant,
    ac.observed_count,
    t.total_users,

    -- Expected count: total * 0.5 for a 50/50 split
    t.total_users * 0.5                                        AS expected_count,

    -- Chi-squared component per variant: (O - E)^2 / E
    POWER(ac.observed_count - t.total_users * 0.5, 2)
    / NULLIF(t.total_users * 0.5, 0)                          AS chi_sq_component

  FROM assignment_counts ac
  CROSS JOIN totals t
)

SELECT
  variant,
  observed_count,
  ROUND(expected_count, 0)                                       AS expected_count,
  ROUND(100.0 * observed_count / SUM(observed_count) OVER (), 2) AS observed_pct,
  ROUND(chi_sq_component, 4)                                     AS chi_sq_component,

  -- Sum across all variants using window function (no GROUP BY needed)
  ROUND(SUM(chi_sq_component) OVER (), 4)                       AS chi_sq_total,

  -- Critical value for df=1 at α=0.05 is 3.841
  CASE
    WHEN SUM(chi_sq_component) OVER () > 3.841
    THEN 'SRM DETECTED ⚠️  — do not trust results'
    ELSE 'No SRM ✓  — assignment looks clean'
  END AS srm_status

FROM chi_sq_components
ORDER BY variant;`,

    keyInsights: [
      `SUM(...) OVER () is a window function that computes the total chi-squared across all variant rows without collapsing them — you get one row per variant with the total displayed on each`,
      `POWER(O - E, 2) / E is the per-variant chi-squared component. Sum these across all k variants to get the test statistic`,
      `For a 2-variant (1 df) experiment, the chi-squared critical value at α=0.05 is 3.841. Any value above this means p < 0.05 — the assignment is statistically non-random`,
      `An SRM doesn't tell you what caused the imbalance — it tells you something went wrong in assignment (bots, caching, early stopping). You must pause the experiment and investigate before trusting any metric results`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE06 — Mix Shift Decomposition in SQL (SQL · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code06-mix-shift-sql',
    title: 'Decompose a Mix Shift',
    subtitle: 'SQL · Shift-Share Analysis · Business Decomposition',
    track: 'sql',
    difficulty: 'senior',
    isFree: false,
    tags: ['mix shift', 'shift-share', 'business decomposition', 'margin analysis'],

    scenario: {
      company: 'Vantage Analytics · B2B SaaS',
      context: `Overall gross margin compressed from 71% to 64% last quarter. The CFO asks: "How much of this is because our customer mix changed (more SMB, less enterprise) vs. each segment's margin actually getting worse?" This is a mix shift decomposition — separating mix effect from rate effect.`,
      schema: [
        { table: 'segment_margin_history', description: 'Quarterly margin by segment', columns: ['quarter', 'segment', 'revenue', 'gross_profit'] },
        { table: '—', description: 'quarter: "2024_Q2" | "2024_Q3". segment: "enterprise" | "smb"', columns: [] },
      ],
      task: `Write a SQL query that decomposes the 7pp margin compression into (a) mix effect — how much compression is explained by the shift toward SMB — and (b) rate effect — how much compression came from each segment's own margin changing.`,
    },

    hints: [
      'Mix effect = change in segment weight × prior period margin rate (if the rate stayed constant, how much would mix alone move the needle?)',
      'Rate effect = prior period weight × change in segment margin rate',
      'Total change ≈ mix effect + rate effect (interaction term is small and usually omitted)',
      'This is a shift-share decomposition — the same logic used in economic regional analysis',
    ],

    partialCode: `WITH quarterly_margins AS (
  SELECT
    quarter,
    segment,
    revenue,
    gross_profit,
    ROUND(100.0 * gross_profit / NULLIF(revenue, 0), 2) AS margin_rate
  FROM segment_margin_history
),

-- Pivot to get Q2 and Q3 side by side per segment
pivoted AS (
  SELECT
    segment,
    MAX(CASE WHEN quarter = '2024_Q2' THEN revenue    END) AS q2_revenue,
    MAX(CASE WHEN quarter = '2024_Q2' THEN margin_rate END) AS q2_margin,
    MAX(CASE WHEN quarter = '2024_Q3' THEN revenue    END) AS q3_revenue,
    MAX(CASE WHEN quarter = '2024_Q3' THEN margin_rate END) AS q3_margin
  FROM quarterly_margins
  GROUP BY 1
),

-- Compute total revenue per period for weight calculation
totals AS (
  SELECT
    SUM(q2_revenue) AS total_q2_rev,
    SUM(q3_revenue) AS total_q3_rev
  FROM pivoted
),

decomposition AS (
  SELECT
    p.segment,
    p.q2_revenue, p.q2_margin,
    p.q3_revenue, p.q3_margin,

    -- Segment weight in each period
    ___ AS q2_weight,   -- q2_revenue / total_q2_rev
    ___ AS q3_weight,   -- q3_revenue / total_q3_rev

    -- Mix effect: (q3_weight - q2_weight) * q2_margin
    ___ AS mix_effect_pp,

    -- Rate effect: q2_weight * (q3_margin - q2_margin)
    ___ AS rate_effect_pp

  FROM pivoted p CROSS JOIN totals t
)

SELECT
  segment,
  ROUND(q2_weight * 100, 1) AS q2_weight_pct,
  ROUND(q3_weight * 100, 1) AS q3_weight_pct,
  ROUND(q2_margin, 1) AS q2_margin_pct,
  ROUND(q3_margin, 1) AS q3_margin_pct,
  ROUND(mix_effect_pp,  2) AS mix_effect_pp,
  ROUND(rate_effect_pp, 2) AS rate_effect_pp,
  ROUND(mix_effect_pp + rate_effect_pp, 2) AS total_explained_pp
FROM decomposition
ORDER BY segment;`,

    modelAnswer: `WITH quarterly_margins AS (
  SELECT
    quarter,
    segment,
    revenue,
    gross_profit,
    ROUND(100.0 * gross_profit / NULLIF(revenue, 0), 2) AS margin_rate
  FROM segment_margin_history
),

pivoted AS (
  SELECT
    segment,
    MAX(CASE WHEN quarter = '2024_Q2' THEN revenue    END) AS q2_revenue,
    MAX(CASE WHEN quarter = '2024_Q2' THEN margin_rate END) AS q2_margin,
    MAX(CASE WHEN quarter = '2024_Q3' THEN revenue    END) AS q3_revenue,
    MAX(CASE WHEN quarter = '2024_Q3' THEN margin_rate END) AS q3_margin
  FROM quarterly_margins
  GROUP BY 1
),

totals AS (
  SELECT
    SUM(q2_revenue) AS total_q2_rev,
    SUM(q3_revenue) AS total_q3_rev
  FROM pivoted
),

decomposition AS (
  SELECT
    p.segment,
    p.q2_revenue, p.q2_margin,
    p.q3_revenue, p.q3_margin,

    -- Segment weights
    p.q2_revenue / t.total_q2_rev  AS q2_weight,
    p.q3_revenue / t.total_q3_rev  AS q3_weight,

    -- Mix effect: weight shift × prior-period rate
    -- "If rates hadn't changed, how much would the mix shift move overall margin?"
    (p.q3_revenue / t.total_q3_rev - p.q2_revenue / t.total_q2_rev) * p.q2_margin
      AS mix_effect_pp,

    -- Rate effect: prior-period weight × rate change
    -- "If the mix hadn't changed, how much would the rate change move overall margin?"
    (p.q2_revenue / t.total_q2_rev) * (p.q3_margin - p.q2_margin)
      AS rate_effect_pp

  FROM pivoted p CROSS JOIN totals t
)

SELECT
  segment,
  ROUND(q2_weight * 100, 1)             AS q2_weight_pct,
  ROUND(q3_weight * 100, 1)             AS q3_weight_pct,
  ROUND(q2_margin, 1)                   AS q2_margin_pct,
  ROUND(q3_margin, 1)                   AS q3_margin_pct,
  ROUND(mix_effect_pp,  2)              AS mix_effect_pp,
  ROUND(rate_effect_pp, 2)              AS rate_effect_pp,
  ROUND(mix_effect_pp + rate_effect_pp, 2) AS total_explained_pp

FROM decomposition
ORDER BY segment;`,

    keyInsights: [
      `Mix effect = weight change × prior rate: answers "if segment margins had stayed flat, how much would the compositional shift alone change overall margin?"`,
      `Rate effect = prior weight × rate change: answers "if the mix hadn't changed, how much would each segment's own margin movement have caused?"`,
      `If mix_effect_pp for SMB is negative (larger SMB weight × lower SMB margin), that's the mix drag. If rate_effect_pp for SMB is also negative, SMB's margin got worse within the quarter too`,
      `Sum the mix_effect + rate_effect across both segments to reconstruct the total observed margin change — the two components should add up to approximately -7pp`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE07 — CUPED Variance Reduction in SQL (SQL · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code07-cuped-sql',
    title: 'Apply CUPED Variance Reduction in SQL',
    subtitle: 'SQL · CUPED · Pre-experiment Covariate · CTEs',
    track: 'sql',
    difficulty: 'senior',
    isFree: false,
    tags: ['CUPED', 'variance reduction', 'CTEs', 'experimentation', 'covariate adjustment'],

    scenario: {
      company: 'Ardent Commerce',
      context: `Ardent Commerce ran a two-week A/B test on a new recommendations widget. The head of experimentation flags that the test is slightly underpowered on revenue — there's a real effect, but the p-value is hovering around 0.07. She asks you to apply CUPED using last week's revenue (pre-experiment) as the covariate. You have the raw assignment and orders tables in the warehouse. Do the full CUPED adjustment entirely in SQL.`,
      schema: [
        { table: 'experiment_assignments', description: 'One row per user, assigned at experiment start', columns: ['user_id', 'variant', 'assigned_at'] },
        { table: 'orders', description: 'One row per order', columns: ['user_id', 'order_ts', 'revenue'] },
        { table: '—', description: 'Experiment ran 2024-01-15 to 2024-01-28. Pre-experiment window: 2024-01-08 to 2024-01-14.', columns: [] },
      ],
      task: `Write a SQL query that computes CUPED-adjusted revenue per user. Steps: (1) aggregate pre-experiment revenue per user as covariate X, (2) aggregate experiment-period revenue per user as outcome Y, (3) compute theta = Cov(Y, X) / Var(X) using SQL aggregate functions, (4) compute Y_cuped = Y - theta * (X - mean_X) for each user.`,
    },

    hints: [
      'Cov(Y, X) in SQL: AVG(Y * X) - AVG(Y) * AVG(X) — the definitional formula works cleanly as window or subquery aggregates',
      'Var(X) in SQL: AVG(X * X) - AVG(X) * AVG(X) — same pattern as covariance but both columns are X',
      'theta is a single scalar — compute it in one CTE, then cross-join it into the per-user CTE so every row can use it',
      'Users with zero pre-experiment revenue still get a CUPED adjustment (X=0, so the correction is -theta * (0 - mean_X) = +theta * mean_X)',
    ],

    partialCode: `WITH pre_revenue AS (
  -- Covariate X: revenue per user in the week BEFORE the experiment
  SELECT
    ea.user_id,
    ea.variant,
    COALESCE(SUM(o.revenue), 0) AS pre_rev
  FROM experiment_assignments ea
  LEFT JOIN orders o
    ON ea.user_id = o.user_id
    AND o.order_ts BETWEEN '2024-01-08' AND '2024-01-14'
  GROUP BY 1, 2
),

exp_revenue AS (
  -- Outcome Y: revenue per user DURING the experiment
  SELECT
    ea.user_id,
    COALESCE(SUM(o.revenue), 0) AS exp_rev
  FROM experiment_assignments ea
  LEFT JOIN orders o
    ON ea.user_id = o.user_id
    -- TODO: filter order_ts to the experiment window (2024-01-15 to 2024-01-28)
  GROUP BY 1
),

combined AS (
  SELECT
    pr.user_id,
    pr.variant,
    pr.pre_rev   AS x,   -- covariate
    er.exp_rev   AS y    -- outcome
  FROM pre_revenue pr
  JOIN exp_revenue er ON pr.user_id = er.user_id
),

theta_calc AS (
  -- theta = Cov(Y, X) / Var(X)
  -- TODO: compute cov_yx = AVG(y * x) - AVG(y) * AVG(x)
  -- TODO: compute var_x  = AVG(x * x) - AVG(x) * AVG(x)
  -- TODO: theta = cov_yx / NULLIF(var_x, 0)
  SELECT
    ___ AS mean_x,
    ___ AS cov_yx,
    ___ AS var_x,
    ___ AS theta
  FROM combined
)

SELECT
  c.user_id,
  c.variant,
  c.y                                                        AS raw_revenue,
  -- TODO: compute cuped_revenue = y - theta * (x - mean_x)
  ___                                                        AS cuped_revenue,
  t.theta,
  t.mean_x
FROM combined c
CROSS JOIN theta_calc t
ORDER BY c.user_id;`,

    modelAnswer: `WITH pre_revenue AS (
  -- Covariate X: revenue per user in the week before the experiment
  SELECT
    ea.user_id,
    ea.variant,
    COALESCE(SUM(o.revenue), 0) AS pre_rev
  FROM experiment_assignments ea
  LEFT JOIN orders o
    ON ea.user_id = o.user_id
    AND o.order_ts BETWEEN '2024-01-08' AND '2024-01-14'
  GROUP BY 1, 2
),

exp_revenue AS (
  -- Outcome Y: revenue per user during the experiment period
  SELECT
    ea.user_id,
    COALESCE(SUM(o.revenue), 0) AS exp_rev
  FROM experiment_assignments ea
  LEFT JOIN orders o
    ON ea.user_id = o.user_id
    AND o.order_ts BETWEEN '2024-01-15' AND '2024-01-28'
  GROUP BY 1
),

combined AS (
  SELECT
    pr.user_id,
    pr.variant,
    pr.pre_rev  AS x,   -- covariate (pre-experiment revenue)
    er.exp_rev  AS y    -- outcome (experiment-period revenue)
  FROM pre_revenue pr
  JOIN exp_revenue er ON pr.user_id = er.user_id
),

theta_calc AS (
  -- Compute theta = Cov(Y, X) / Var(X) using the definitional formulas
  -- Cov(Y, X) = E[YX] - E[Y]*E[X]
  -- Var(X)    = E[X^2] - E[X]^2
  SELECT
    AVG(x)                                                         AS mean_x,
    AVG(y * x) - AVG(y) * AVG(x)                                  AS cov_yx,
    AVG(x * x) - AVG(x) * AVG(x)                                  AS var_x,
    (AVG(y * x) - AVG(y) * AVG(x))
      / NULLIF(AVG(x * x) - AVG(x) * AVG(x), 0)                  AS theta
  FROM combined
)

-- Final output: CUPED-adjusted revenue per user
-- Y_cuped = Y - theta * (X - mean_X)
SELECT
  c.user_id,
  c.variant,
  c.y                                                              AS raw_revenue,
  c.y - t.theta * (c.x - t.mean_x)                               AS cuped_revenue,
  c.x                                                              AS pre_revenue_covariate,
  ROUND(t.theta,  4)                                               AS theta,
  ROUND(t.mean_x, 4)                                               AS mean_pre_revenue

FROM combined c
CROSS JOIN theta_calc t
ORDER BY c.user_id;

-- To get per-variant summary after this, wrap in another CTE:
-- SELECT variant, AVG(cuped_revenue) AS mean_cuped_rev, VARIANCE(cuped_revenue) AS var_cuped
-- FROM (...above...) GROUP BY variant`,

    keyInsights: [
      `theta = Cov(Y,X) / Var(X) is the OLS regression coefficient of Y on X. In SQL, Cov(Y,X) = AVG(Y*X) - AVG(Y)*AVG(X) and Var(X) = AVG(X^2) - AVG(X)^2 — the definitional formula computes cleanly as aggregate expressions`,
      `CROSS JOIN theta_calc distributes the single scalar theta and mean_x to every row without a correlated subquery — this is the idiomatic SQL pattern for broadcasting a global statistic into per-row calculations`,
      `CUPED works best when pre-experiment and experiment-period revenue are highly correlated (r > 0.5). For e-commerce, weekly revenue typically has r ≈ 0.6–0.8, giving 35–65% variance reduction`,
      `Users with no pre-experiment orders get x=0. Their adjustment becomes -theta*(0 - mean_x) = +theta*mean_x, slightly shifting their adjusted revenue upward — this is correct behavior, not a bug`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE08 — Bootstrap Confidence Interval in Python (Python · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code08-bootstrap-python',
    title: 'Compute a Bootstrap Confidence Interval',
    subtitle: 'Python · Bootstrap · Skewed Distributions · Resampling',
    track: 'python',
    difficulty: 'senior',
    isFree: false,
    tags: ['bootstrap', 'confidence intervals', 'numpy', 'skewed distributions', 'A/B testing'],

    scenario: {
      company: 'Loopwise',
      context: `Loopwise ran an A/B test on a new onboarding flow for 21 days. The metric is 30-day revenue per user. The distribution is highly skewed: 74% of users pay nothing, and a small fraction drives the bulk of revenue. A standard normal-theory confidence interval assumes the sampling distribution of the mean is approximately normal — an assumption that breaks down with this kind of zero-inflated, heavy-tailed data at moderate sample sizes. The senior analyst asks you to compute a 95% bootstrap CI for the treatment effect (mean revenue difference) using 10,000 bootstrap samples.`,
      schema: [
        { table: 'DataFrame: df', description: 'One row per user', columns: ['user_id', 'variant', 'revenue_30d'] },
        { table: '—', description: 'variant: "control" | "treatment". revenue_30d: float, many zeros', columns: [] },
      ],
      task: `Write Python code that: (1) separates control and treatment revenue arrays, (2) runs 10,000 bootstrap iterations — sampling with replacement from each arm and recording the mean difference — (3) computes the 2.5th and 97.5th percentiles of the bootstrap delta distribution as the 95% CI, (4) prints the observed lift, the CI, and whether the CI excludes zero.`,
    },

    hints: [
      'np.random.choice(arr, size=len(arr), replace=True) draws a bootstrap sample of the same size as the original',
      'Compute the delta for each bootstrap iteration as: np.mean(boot_treatment) - np.mean(boot_control)',
      'The percentile CI is np.percentile(deltas, [2.5, 97.5]) — no normal approximation needed',
      'Set np.random.seed(42) for reproducibility before the loop',
    ],

    partialCode: `import numpy as np
import pandas as pd

# Assume df is loaded with columns: user_id, variant, revenue_30d
np.random.seed(42)

# 1. Separate the two arms into numpy arrays
control_rev   = df.loc[df['variant'] == 'control',   'revenue_30d'].values
treatment_rev = df.loc[df['variant'] == 'treatment', 'revenue_30d'].values

# Observed lift (point estimate)
observed_lift = treatment_rev.mean() - control_rev.mean()
print(f"Observed lift: \${observed_lift:.4f}")
print(f"Control mean:   \${control_rev.mean():.4f}  (n={len(control_rev):,})")
print(f"Treatment mean: \${treatment_rev.mean():.4f}  (n={len(treatment_rev):,})")

# 2. Bootstrap loop — 10,000 iterations
n_boot = 10_000
boot_deltas = np.zeros(n_boot)

for i in range(n_boot):
    # TODO: draw a bootstrap sample from control_rev (same size, with replacement)
    boot_control   = ___

    # TODO: draw a bootstrap sample from treatment_rev (same size, with replacement)
    boot_treatment = ___

    # TODO: store the mean difference in boot_deltas[i]
    boot_deltas[i] = ___

# 3. Compute the 95% percentile CI
# TODO: use np.percentile to get the 2.5th and 97.5th percentiles
ci_lower, ci_upper = ___

print(f"\\n95% Bootstrap CI: [\${ci_lower:.4f}, \${ci_upper:.4f}]")
print(f"CI excludes zero (significant): {ci_lower > 0 or ci_upper < 0}")`,

    modelAnswer: `import numpy as np
import pandas as pd

# Assume df is loaded with columns: user_id, variant, revenue_30d
np.random.seed(42)

# 1. Separate arms
control_rev   = df.loc[df['variant'] == 'control',   'revenue_30d'].values
treatment_rev = df.loc[df['variant'] == 'treatment', 'revenue_30d'].values

observed_lift = treatment_rev.mean() - control_rev.mean()
print(f"Observed lift:  \${observed_lift:.4f}")
print(f"Control mean:   \${control_rev.mean():.4f}  (n={len(control_rev):,})")
print(f"Treatment mean: \${treatment_rev.mean():.4f}  (n={len(treatment_rev):,})")
print(f"\\nRevenue distribution (% zero-revenue users):")
print(f"  Control:   {(control_rev == 0).mean():.1%} zeros")
print(f"  Treatment: {(treatment_rev == 0).mean():.1%} zeros")

# 2. Bootstrap loop
n_boot = 10_000
boot_deltas = np.zeros(n_boot)

for i in range(n_boot):
    # Sample with replacement — same size as each arm's original n
    boot_control   = np.random.choice(control_rev,   size=len(control_rev),   replace=True)
    boot_treatment = np.random.choice(treatment_rev, size=len(treatment_rev), replace=True)
    boot_deltas[i] = boot_treatment.mean() - boot_control.mean()

# 3. Percentile CI — no normal approximation, reads directly from the bootstrap distribution
ci_lower, ci_upper = np.percentile(boot_deltas, [2.5, 97.5])

print(f"\\n95% Bootstrap CI: [\${ci_lower:.4f}, \${ci_upper:.4f}]")
print(f"Observed lift:    \${observed_lift:.4f}")
print(f"CI excludes zero (significant at 95%): {ci_lower > 0 or ci_upper < 0}")

# 4. Bootstrap distribution summary
print(f"\\nBootstrap delta distribution:")
print(f"  Mean of bootstrap deltas: \${boot_deltas.mean():.4f}  (should ≈ observed lift)")
print(f"  Std of bootstrap deltas:  \${boot_deltas.std():.4f}   (bootstrap SE)")
print(f"  Skewness of deltas: {((boot_deltas - boot_deltas.mean())**3).mean() / boot_deltas.std()**3:.3f}")`,

    keyInsights: [
      `The percentile bootstrap CI is non-parametric — it makes no assumption about the sampling distribution shape. This matters for zero-inflated revenue where the CLT convergence is slow at moderate sample sizes (n < 50k per arm)`,
      `np.random.choice(arr, size=len(arr), replace=True) is the canonical bootstrap sample. The key is replace=True and size equal to the original n — drawing fewer or more changes the variance estimate`,
      `10,000 iterations is the practical standard: it gives stable CI estimates (bootstrap SE of the CI endpoint is small) without being computationally expensive. For production use, 1,000 iterations is often enough; 100,000 adds precision but rarely changes decisions`,
      `The bootstrap delta distribution mean should closely match the observed lift — if it doesn't, check that you're sampling from the right arrays. The standard deviation of boot_deltas is the bootstrap standard error of the lift estimate`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE09 — Funnel Visualization with Matplotlib (Python · Analyst)
  // ─────────────────────────────────────────────
  {
    id: 'code09-funnel-viz-python',
    title: 'Visualize Funnel Conversion Rates',
    subtitle: 'Python · Matplotlib · Horizontal Bar Chart · Annotations',
    track: 'python',
    difficulty: 'analyst',
    isFree: false,
    tags: ['matplotlib', 'funnel', 'visualization', 'bar chart', 'annotations'],

    scenario: {
      company: 'Crestline Home',
      context: `The same checkout funnel from the SQL module. The PM has already run the SQL query and has pre-computed conversion rates for pre- vs post-deployment in a DataFrame. Now she needs a clean horizontal bar chart to drop into the all-hands deck — one that shows both periods side by side at each funnel step, with the delta annotated so the audience can immediately see where the drop happened. She wants it to look polished, not like a default matplotlib output.`,
      schema: [
        { table: 'DataFrame: df', description: 'Pre-computed funnel conversion rates', columns: ['step', 'pre_rate', 'post_rate'] },
        { table: '—', description: 'step: e.g. "Cart Viewed", "Payment Page", "Payment Submitted", "Order Confirmed"', columns: [] },
        { table: '—', description: 'pre_rate, post_rate: conversion rate as a percentage float, e.g. 78.4', columns: [] },
      ],
      task: `Write Python/matplotlib code that produces a horizontal bar chart: y-axis = funnel steps, x-axis = conversion rate (%), two bars per step (pre-deploy in blue, post-deploy in orange), with a delta annotation (e.g. "▼ 3.2pp") displayed to the right of the longer bar for each step.`,
    },

    hints: [
      'Use ax.barh() twice — once for pre_rate and once for post_rate. Offset the y positions by bar_height/2 to create the side-by-side layout',
      'Enumerate the steps with np.arange(len(df)) for numeric y positions, then set ax.set_yticks and ax.set_yticklabels to label them',
      'For each step, compute delta = post_rate - pre_rate. Use "▲" if positive, "▼" if negative',
      'ax.text(x, y, label, va="center") places the annotation. Use max(pre_rate, post_rate) + 1 as the x position to place it just past the longer bar',
    ],

    partialCode: `import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

# Sample data — replace with your actual df
import pandas as pd
df = pd.DataFrame({
    'step':      ['Cart Viewed', 'Payment Page', 'Payment Submitted', 'Order Confirmed'],
    'pre_rate':  [100.0, 78.4, 61.2, 54.7],
    'post_rate': [100.0, 77.1, 55.3, 48.9],
})

# Chart setup
fig, ax = plt.subplots(figsize=(10, 5))
bar_height = 0.35
y = np.arange(len(df))

# TODO: draw the pre_rate bars (blue, label='Pre-deploy')
# Hint: ax.barh(y + bar_height/2, df['pre_rate'], height=bar_height, ...)
bars_pre  = ___

# TODO: draw the post_rate bars (orange, label='Post-deploy')
bars_post = ___

# TODO: annotate each step with the delta
# For each i, compute delta = post - pre, choose arrow symbol, call ax.text(...)
for i, row in df.iterrows():
    delta = ___
    arrow = ___   # '▲' if delta > 0 else '▼'
    label = ___   # e.g. '▼ 3.2pp'
    x_pos = ___   # just past the longer of the two bars
    # TODO: call ax.text to place the annotation

# Axis labels and formatting
ax.set_xlabel('Conversion Rate (%)', fontsize=12)
ax.set_title('Checkout Funnel: Pre vs Post Deployment', fontsize=14, fontweight='bold')

# TODO: set y-tick positions and labels (use y and df['step'])
ax.set_yticks(___)
ax.set_yticklabels(___)

ax.set_xlim(0, 115)
ax.legend(handles=[bars_pre, bars_post], loc='lower right')
ax.spines[['top', 'right']].set_visible(False)

plt.tight_layout()
plt.show()`,

    modelAnswer: `import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import pandas as pd

# Sample data
df = pd.DataFrame({
    'step':      ['Cart Viewed', 'Payment Page', 'Payment Submitted', 'Order Confirmed'],
    'pre_rate':  [100.0, 78.4, 61.2, 54.7],
    'post_rate': [100.0, 77.1, 55.3, 48.9],
})

fig, ax = plt.subplots(figsize=(10, 5))
bar_height = 0.35
y = np.arange(len(df))

# Draw bars — offset by half bar_height to create side-by-side layout
bars_pre  = ax.barh(y + bar_height / 2, df['pre_rate'],  height=bar_height,
                    color='#4C72B0', label='Pre-deploy',  alpha=0.85)
bars_post = ax.barh(y - bar_height / 2, df['post_rate'], height=bar_height,
                    color='#DD8452', label='Post-deploy', alpha=0.85)

# Annotate each step with the delta
for i, row in df.iterrows():
    delta  = row['post_rate'] - row['pre_rate']
    arrow  = '▲' if delta > 0 else '▼'
    color  = '#2ca02c' if delta > 0 else '#d62728'
    label  = f'{arrow} {abs(delta):.1f}pp'
    x_pos  = max(row['pre_rate'], row['post_rate']) + 1.5
    ax.text(x_pos, y[i], label, va='center', ha='left',
            fontsize=10, color=color, fontweight='bold')

# Axis formatting
ax.set_xlabel('Conversion Rate (%)', fontsize=12)
ax.set_title('Checkout Funnel: Pre vs Post Deployment', fontsize=14, fontweight='bold')
ax.set_yticks(y)
ax.set_yticklabels(df['step'], fontsize=11)
ax.set_xlim(0, 120)
ax.axvline(x=100, color='grey', linestyle='--', linewidth=0.8, alpha=0.5)

# Legend
ax.legend(handles=[bars_pre, bars_post], loc='lower right', fontsize=10)
ax.spines[['top', 'right']].set_visible(False)
ax.tick_params(axis='x', labelsize=10)

plt.tight_layout()
plt.show()`,

    keyInsights: [
      `Horizontal bar charts are preferred over vertical for funnel steps because the step labels are long strings — horizontal layout gives them natural reading space on the y-axis without rotation or truncation`,
      `The side-by-side layout uses y + bar_height/2 for one series and y - bar_height/2 for the other. This centers the pair of bars on the tick mark. bar_height = 0.35 leaves a small gap between pairs, making the grouping visually clear`,
      `Delta annotations use ax.text() positioned at max(pre_rate, post_rate) + 1.5 so the label always clears the longer bar regardless of which period is higher. Color-coding green/red makes the direction immediately scannable`,
      `ax.spines[['top', 'right']].set_visible(False) is a single line that removes the two chart borders that add no information, giving the chart a cleaner, more presentation-ready look`,
    ],
  },

  // ─────────────────────────────────────────────
  // CODE10 — Retention Heatmap in Python (Python · Senior)
  // ─────────────────────────────────────────────
  {
    id: 'code10-retention-heatmap',
    title: 'Build a Cohort Retention Heatmap',
    subtitle: 'Python · Seaborn · Cohort Analysis · Pivot Tables',
    track: 'python',
    difficulty: 'senior',
    isFree: false,
    tags: ['retention', 'cohort analysis', 'seaborn', 'heatmap', 'pivot_table'],

    scenario: {
      company: 'Threadline · B2B SaaS',
      context: `Threadline's growth team wants to understand long-term retention by signup cohort. They need a classic cohort retention heatmap: rows are weekly signup cohorts (e.g. "2024-W01"), columns are weeks since signup (W0 through W12), and each cell shows the percentage of that cohort still active in that week. The raw data is a long-format DataFrame with one row per user per week they were active. You need to pivot it into the cohort × week matrix, normalize by cohort size, and render it as a seaborn heatmap.`,
      schema: [
        { table: 'DataFrame: df', description: 'One row per user per week they were active', columns: ['user_id', 'signup_week', 'activity_week'] },
        { table: '—', description: 'signup_week: ISO week string like "2024-W01"', columns: [] },
        { table: '—', description: 'activity_week: ISO week string like "2024-W03" (can be any week on or after signup_week)', columns: [] },
      ],
      task: `Write Python code that: (1) computes weeks_since_signup for each row, (2) counts distinct active users per cohort × week-offset cell, (3) divides by cohort size to get retention rates (0–100%), (4) renders the result as a seaborn heatmap with percentage annotations. Handle the NaN triangle (future cohorts have no data for later weeks) gracefully.`,
    },

    hints: [
      'Convert signup_week and activity_week to actual dates using pd.to_datetime(df["signup_week"] + "-1", format="%G-W%V-%u") to get Monday of each ISO week',
      'weeks_since_signup = (activity_week_dt - signup_week_dt).dt.days // 7',
      'Use df.pivot_table(index="signup_week", columns="weeks_since_signup", values="user_id", aggfunc="nunique", fill_value=0) to get the activity counts matrix',
      'Divide each row by cohort_sizes (a Series indexed by signup_week) using retention_matrix.div(cohort_sizes, axis=0) then multiply by 100',
    ],

    partialCode: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

# Assume df is loaded with columns: user_id, signup_week, activity_week
# Example signup_week values: '2024-W01', '2024-W02', ...

# 1. Convert ISO week strings to dates (Monday of each week)
df['signup_week_dt']   = pd.to_datetime(df['signup_week']   + '-1', format='%G-W%V-%u')
df['activity_week_dt'] = pd.to_datetime(df['activity_week'] + '-1', format='%G-W%V-%u')

# 2. Compute weeks since signup
df['weeks_since_signup'] = (df['activity_week_dt'] - df['signup_week_dt']).dt.days // 7

# 3. Cohort sizes: distinct users per signup_week
cohort_sizes = df.groupby('signup_week')['user_id'].nunique()
print("Cohort sizes:")
print(cohort_sizes)

# 4. Pivot: rows = signup_week, columns = weeks_since_signup, values = distinct active users
# TODO: use pd.pivot_table with aggfunc='nunique' and fill_value=0
activity_matrix = ___

# 5. Normalize by cohort size to get retention rates (0–100%)
# TODO: divide activity_matrix by cohort_sizes (align on signup_week index) and multiply by 100
retention_matrix = ___

# 6. Keep only W0 through W12
retention_matrix = retention_matrix.loc[:, 0:12]

# 7. Render heatmap
fig, ax = plt.subplots(figsize=(14, 7))

# TODO: call sns.heatmap with annot=True, fmt='.0f', cmap='Blues_r'
# Hint: use mask=retention_matrix.isna() to leave the NaN triangle blank
___

ax.set_title('Weekly Cohort Retention Heatmap (%)', fontsize=14, fontweight='bold', pad=12)
ax.set_xlabel('Weeks Since Signup', fontsize=11)
ax.set_ylabel('Signup Week', fontsize=11)
plt.tight_layout()
plt.show()`,

    modelAnswer: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Assume df is loaded with columns: user_id, signup_week, activity_week

# 1. Convert ISO week strings to Monday dates
df['signup_week_dt']   = pd.to_datetime(df['signup_week']   + '-1', format='%G-W%V-%u')
df['activity_week_dt'] = pd.to_datetime(df['activity_week'] + '-1', format='%G-W%V-%u')

# 2. Weeks since signup (integer offset)
df['weeks_since_signup'] = (df['activity_week_dt'] - df['signup_week_dt']).dt.days // 7

# 3. Cohort sizes — distinct users who signed up each week
cohort_sizes = df.groupby('signup_week')['user_id'].nunique()

# 4. Activity counts matrix: unique users active in each cohort × week-offset cell
activity_matrix = df.pivot_table(
    index='signup_week',
    columns='weeks_since_signup',
    values='user_id',
    aggfunc='nunique',
    fill_value=0
)

# 5. Retention rates: divide by cohort size, convert to percentage
#    .div(cohort_sizes, axis=0) aligns on the signup_week index
retention_matrix = activity_matrix.div(cohort_sizes, axis=0) * 100

# 6. Trim to W0–W12 (filter out negative offsets or beyond W12)
cols_to_keep = [c for c in range(0, 13) if c in retention_matrix.columns]
retention_matrix = retention_matrix[cols_to_keep]

# 7. Build the NaN mask: future cohorts have no data for later weeks
#    Any cell where the cohort hasn't had enough time is already 0 from fill_value.
#    Re-apply NaN for cells where activity was truly impossible (week offset > cohort age).
cohort_age = {
    week: (retention_matrix.columns.max() - i)
    for i, week in enumerate(retention_matrix.index)
}
mask = pd.DataFrame(False, index=retention_matrix.index, columns=retention_matrix.columns)
for i, week in enumerate(retention_matrix.index):
    max_observable_week = len(retention_matrix.index) - 1 - i
    for col in retention_matrix.columns:
        if col > max_observable_week:
            mask.loc[week, col] = True
            retention_matrix.loc[week, col] = np.nan

# 8. Heatmap
fig, ax = plt.subplots(figsize=(14, 7))

sns.heatmap(
    retention_matrix,
    annot=True,
    fmt='.0f',
    cmap='Blues_r',           # Reversed Blues: darker = better retention
    mask=mask,
    linewidths=0.4,
    linecolor='#e0e0e0',
    vmin=0,
    vmax=100,
    cbar_kws={'label': 'Retention %', 'shrink': 0.6},
    ax=ax
)

ax.set_title('Weekly Cohort Retention Heatmap (%)', fontsize=14, fontweight='bold', pad=12)
ax.set_xlabel('Weeks Since Signup', fontsize=11)
ax.set_ylabel('Signup Week', fontsize=11)
ax.tick_params(axis='both', labelsize=9)

plt.tight_layout()
plt.show()`,

    keyInsights: [
      `The pivot_table pattern (index=cohort, columns=week_offset, aggfunc='nunique') is the core of cohort analysis. fill_value=0 ensures cohorts with zero activity in a week show 0 not NaN — you separately apply NaN only to the future triangle where data is structurally impossible`,
      `Dividing by cohort_sizes with .div(cohort_sizes, axis=0) normalizes each row by its own cohort's starting size. Critically, this uses absolute cohort size as the denominator throughout — not the previous week's active users — so W8 retention is always "% of original cohort", not "% of W7 survivors"`,
      `The NaN triangle arises because recent cohorts simply haven't existed long enough to have W8, W9, ... data. Masking these cells (mask=True in sns.heatmap) leaves them blank in the heatmap, preventing them from being misread as zero retention`,
      `cmap='Blues_r' (reversed) maps high retention to dark blue and low retention to light/white. This is the convention for retention heatmaps — the visual gradient flows naturally from the dense dark diagonal (W0 = 100%) outward`,
    ],
  },
];

export const codeModulesById = Object.fromEntries(codeModules.map(m => [m.id, m]));
