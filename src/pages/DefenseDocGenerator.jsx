import { useState } from 'react';

// ─── Keyword → Room mapping ───────────────────────────────────────────────────
const KEYWORD_MAP = [
  { keywords: ['experiment', 'a/b test', 'ab test', 'hypothesis', 'randomiz', 'control group', 'treatment', 'statistical significance', 'p-value', 'power', 'mde', 'causal'], rooms: ['exp-foundations', 'design', 'browser', 'spot-the-flaw'] },
  { keywords: ['metric', 'kpi', 'north star', 'success metric', 'counter metric', 'guardrail', 'okr'], rooms: ['metrics-foundations', 'metrics', 'growth-analytics'] },
  { keywords: ['root cause', 'rca', 'diagnos', 'debug', 'drop', 'decline', 'anomaly', 'investigate'], rooms: ['rca-foundations', 'rca', 'cases'] },
  { keywords: ['sql', 'query', 'python', 'pandas', 'data analysis', 'data manipulation', 'analytics engineering', 'dbt', 'pipeline'], rooms: ['code'] },
  { keywords: ['product sense', 'product design', 'feature', 'launch', 'tradeoff', 'user research', 'pm', 'product manager', 'product analyst'], rooms: ['product-design', 'prioritization'] },
  { keywords: ['growth', 'funnel', 'retention', 'activation', 'acquisition', 'ltv', 'churn', 'conversion', 'engagement'], rooms: ['growth-analytics', 'metrics'] },
  { keywords: ['dashboard', 'reporting', 'bi', 'tableau', 'looker', 'visualization', 'stakeholder'], rooms: ['bi'] },
  { keywords: ['tracking', 'instrumentation', 'event', 'logging', 'schema', 'data quality', 'pipeline integrity'], rooms: ['instrumentation'] },
  { keywords: ['behavioral', 'leadership', 'influence', 'conflict', 'communication', 'cross-functional'], rooms: ['behavioral'] },
  { keywords: ['estimation', 'market size', 'fermi', 'back-of-envelope', 'sizing'], rooms: ['estimation'] },
  { keywords: ['statistics', 'variance', 'distribution', 'regression', 'bias', 'sampling', 'confidence interval'], rooms: ['stat-foundations', 'stats'] },
];

// ─── Room metadata ────────────────────────────────────────────────────────────
const ROOM_META = {
  'exp-foundations':     { label: 'A/B Foundations',       color: 'var(--accent)',  page: 'exp-foundations' },
  'design':              { label: 'A/B Design',             color: 'var(--accent)',  page: 'design' },
  'browser':             { label: 'A/B Review',             color: 'var(--accent)',  page: 'browser' },
  'spot-the-flaw':       { label: 'Spot the Flaw',          color: 'var(--red)',     page: 'spot-the-flaw' },
  'metrics-foundations': { label: 'Metrics Foundations',    color: 'var(--green)',   page: 'metrics-foundations' },
  'metrics':             { label: 'Metrics',                color: 'var(--green)',   page: 'metrics' },
  'growth-analytics':    { label: 'Growth Analytics',       color: 'var(--green)',   page: 'growth-analytics' },
  'rca-foundations':     { label: 'RCA Foundations',        color: 'var(--teal)',    page: 'rca-foundations' },
  'rca':                 { label: 'RCA',                    color: 'var(--teal)',    page: 'rca' },
  'cases':               { label: 'Cases',                  color: 'var(--teal)',    page: 'cases' },
  'code':                { label: 'Code Lab',               color: 'var(--purple)',  page: 'code' },
  'product-design':      { label: 'Product Design',         color: 'var(--purple)',  page: 'product-design' },
  'prioritization':      { label: 'Prioritization',         color: 'var(--purple)',  page: 'prioritization' },
  'bi':                  { label: 'BI & Reporting',         color: 'var(--yellow)',  page: 'bi' },
  'instrumentation':     { label: 'Instrumentation',        color: 'var(--teal)',    page: 'instrumentation' },
  'behavioral':          { label: 'Behavioral',             color: 'var(--purple)',  page: 'behavioral' },
  'estimation':          { label: 'Estimation',             color: 'var(--yellow)',  page: 'estimation' },
  'stat-foundations':    { label: 'Stat Foundations',       color: 'var(--teal)',    page: 'stat-foundations' },
  'stats':               { label: 'Stats',                  color: 'var(--teal)',    page: 'stats' },
};

// ─── Foundation rooms (go on Day 1-2) ────────────────────────────────────────
const FOUNDATION_ROOMS = new Set(['exp-foundations', 'metrics-foundations', 'rca-foundations', 'stat-foundations']);

// ─── Category labels for matched keyword display ──────────────────────────────
const CATEGORY_LABELS = [
  { id: 'exp',           label: 'Experimentation',    keywords: ['experiment', 'a/b test', 'ab test', 'hypothesis', 'randomiz', 'control group', 'treatment', 'statistical significance', 'p-value', 'power', 'mde', 'causal'] },
  { id: 'metrics',       label: 'Metrics / KPIs',     keywords: ['metric', 'kpi', 'north star', 'success metric', 'counter metric', 'guardrail', 'okr'] },
  { id: 'rca',           label: 'RCA / Diagnosis',    keywords: ['root cause', 'rca', 'diagnos', 'debug', 'drop', 'decline', 'anomaly', 'investigate'] },
  { id: 'sql',           label: 'SQL / Python',       keywords: ['sql', 'query', 'python', 'pandas', 'data analysis', 'data manipulation', 'analytics engineering', 'dbt', 'pipeline'] },
  { id: 'product',       label: 'Product Sense',      keywords: ['product sense', 'product design', 'feature', 'launch', 'tradeoff', 'user research', 'pm', 'product manager', 'product analyst'] },
  { id: 'growth',        label: 'Growth / Funnels',   keywords: ['growth', 'funnel', 'retention', 'activation', 'acquisition', 'ltv', 'churn', 'conversion', 'engagement'] },
  { id: 'bi',            label: 'BI / Dashboards',    keywords: ['dashboard', 'reporting', 'bi', 'tableau', 'looker', 'visualization', 'stakeholder'] },
  { id: 'instrumentation', label: 'Instrumentation',  keywords: ['tracking', 'instrumentation', 'event', 'logging', 'schema', 'data quality', 'pipeline integrity'] },
  { id: 'behavioral',    label: 'Behavioral',         keywords: ['behavioral', 'leadership', 'influence', 'conflict', 'communication', 'cross-functional'] },
  { id: 'estimation',    label: 'Estimation',         keywords: ['estimation', 'market size', 'fermi', 'back-of-envelope', 'sizing'] },
  { id: 'stats',         label: 'Statistics',         keywords: ['statistics', 'variance', 'distribution', 'regression', 'bias', 'sampling', 'confidence interval'] },
];

// ─── Example placeholder plan (no JD entered) ────────────────────────────────
const EXAMPLE_PLAN = {
  role: 'Product Analyst at a growth-stage startup',
  matchedCategories: [
    { id: 'metrics',  label: 'Metrics / KPIs',   hits: 3 },
    { id: 'growth',   label: 'Growth / Funnels',  hits: 3 },
    { id: 'exp',      label: 'Experimentation',   hits: 2 },
    { id: 'rca',      label: 'RCA / Diagnosis',   hits: 2 },
    { id: 'sql',      label: 'SQL / Python',      hits: 1 },
    { id: 'behavioral', label: 'Behavioral',      hits: 1 },
  ],
  days: [
    { day: 1, label: 'Day 1', theme: 'Metric Theory', rooms: ['metrics-foundations', 'metrics'], note: 'Start with how metrics work before practicing judgment calls.' },
    { day: 2, label: 'Day 2', theme: 'Growth Foundations', rooms: ['growth-analytics'], note: 'Cohort retention, funnel decomposition, LTV/CAC — core for growth PA roles.' },
    { day: 3, label: 'Day 3', theme: 'Experimentation Practice', rooms: ['exp-foundations', 'browser'], note: 'How tests are designed and how results are read and challenged.' },
    { day: 4, label: 'Day 4', theme: 'RCA + Cases', rooms: ['rca', 'cases'], note: 'Structured diagnosis and multi-step business case practice.' },
    { day: 5, label: 'Day 5', theme: 'SQL / Code + Product Sense', rooms: ['code', 'product-design'], note: 'Funnel queries, cohort SQL, and feature design scenarios.' },
    { day: 6, label: 'Day 6', theme: 'Behavioral + Estimation', rooms: ['behavioral', 'estimation'], note: 'Cross-functional influence and Fermi-style sizing questions.' },
    { day: 7, label: 'Day 7', theme: 'Weak-spot review', rooms: ['metrics', 'growth-analytics', 'rca'], note: 'Re-attempt cases you struggled with. Explain top 3 strengths out loud in 90 seconds.' },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function scoreRooms(jdText) {
  const text = jdText.toLowerCase();
  const scores = {};
  KEYWORD_MAP.forEach(entry => {
    const hits = entry.keywords.filter(k => text.includes(k)).length;
    if (hits === 0) return;
    entry.rooms.forEach(roomId => {
      scores[roomId] = (scores[roomId] || 0) + hits;
    });
  });
  return scores;
}

function getMatchedCategories(jdText) {
  const text = jdText.toLowerCase();
  const matched = [];
  CATEGORY_LABELS.forEach(cat => {
    const hits = cat.keywords.filter(k => text.includes(k)).length;
    if (hits > 0) matched.push({ id: cat.id, label: cat.label, hits });
  });
  return matched.sort((a, b) => b.hits - a.hits);
}

function buildPlan(scores) {
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([roomId, score]) => ({ roomId, score }));

  const foundations = sorted.filter(r => FOUNDATION_ROOMS.has(r.roomId));
  const practice    = sorted.filter(r => !FOUNDATION_ROOMS.has(r.roomId));

  // Collect unique rooms for each day bucket
  const day1Rooms = foundations.slice(0, 2).map(r => r.roomId);
  const day2Rooms = foundations.slice(2, 4).concat(practice.slice(0, 1)).map(r => r.roomId);
  const day3Rooms = practice.slice(0, 2).map(r => r.roomId);
  const day4Rooms = practice.slice(2, 4).map(r => r.roomId);
  const day5Rooms = practice.slice(4, 6).map(r => r.roomId);

  // Day 6: rooms with exactly 1 match (light coverage)
  const day6Rooms = sorted.filter(r => r.score === 1).slice(0, 3).map(r => r.roomId);

  // Day 7: weakest matched rooms (bottom third)
  const day7Rooms = sorted.slice(-3).reverse().map(r => r.roomId);

  function fillEmpty(arr, fallback) {
    if (arr.length > 0) return arr;
    return fallback;
  }

  return [
    { day: 1, label: 'Day 1', theme: 'Foundations first', rooms: fillEmpty(day1Rooms, foundations.slice(0, 2).map(r => r.roomId).length ? foundations.slice(0, 2).map(r => r.roomId) : practice.slice(0, 2).map(r => r.roomId)), note: 'Build the theory base before doing judgment-call practice. Read debriefs carefully.' },
    { day: 2, label: 'Day 2', theme: 'Foundations depth', rooms: fillEmpty(day2Rooms, practice.slice(0, 2).map(r => r.roomId)), note: 'Continue foundations and begin your first practice room. Complete 3+ cases.' },
    { day: 3, label: 'Day 3', theme: 'Core practice', rooms: fillEmpty(day3Rooms, practice.slice(0, 2).map(r => r.roomId)), note: 'Attempt cases cold — commit your answer before reading the rubric.' },
    { day: 4, label: 'Day 4', theme: 'Practice depth', rooms: fillEmpty(day4Rooms, practice.slice(2, 4).map(r => r.roomId).length ? practice.slice(2, 4).map(r => r.roomId) : practice.slice(0, 2).map(r => r.roomId)), note: 'Verbal practice: explain each answer out loud without notes.' },
    { day: 5, label: 'Day 5', theme: 'Secondary topics', rooms: fillEmpty(day5Rooms, practice.slice(4, 6).map(r => r.roomId).length ? practice.slice(4, 6).map(r => r.roomId) : ['behavioral', 'estimation']), note: 'Breadth coverage. Write 1 sentence connecting each topic to your primary strength.' },
    { day: 6, label: 'Day 6', theme: 'Light coverage', rooms: fillEmpty(day6Rooms, ['behavioral', 'estimation', 'bi']), note: 'One case per light-match room. Note any terminology you can\'t explain clearly.' },
    { day: 7, label: 'Day 7', theme: 'Weak-spot review', rooms: fillEmpty(day7Rooms.length >= 1 ? day7Rooms : sorted.slice(0, 3).map(r => r.roomId), sorted.slice(0, 3).map(r => r.roomId)), note: 'Re-attempt lowest-rated cases cold. Can you explain your top 3 strengths in 90 seconds?' },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DefenseDocGenerator({ onBack, onNavigate }) {
  const [jdText, setJdText]   = useState('');
  const [plan,   setPlan]     = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleGenerate() {
    if (!jdText.trim()) return;
    setIsGenerating(true);
    setTimeout(function() {
      const scores   = scoreRooms(jdText);
      const cats     = getMatchedCategories(jdText);
      const days     = buildPlan(scores);
      const totalHits = Object.values(scores).reduce(function(a, b) { return a + b; }, 0);
      setPlan({ scores, cats, days, totalHits });
      setIsGenerating(false);
    }, 320);
  }

  function handleReset() {
    setPlan(null);
    setJdText('');
  }

  const usingExample = !plan;
  const displayPlan  = plan || EXAMPLE_PLAN;

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '2rem 1.25rem 6rem' }}>

      {/* Back */}
      {onBack && (
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          ← Back
        </button>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
          <span style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--purple-bg)', border: '1px solid var(--purple-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>🛡</span>
          <div>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--purple)', marginBottom: 2 }}>Prep Tools</div>
            <h1 style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>Defense Doc</h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem', margin: '0.4rem 0 0', maxWidth: 580, lineHeight: 1.6 }}>
          Paste a job description and get a prioritized 7-day study plan mapped to specific PAL rooms.
        </p>
      </div>

      {/* ── Two-panel layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: plan ? '1fr 2fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

        {/* Left panel — JD input */}
        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.6rem' }}>
              Job Description
            </label>
            <textarea
              value={jdText}
              onChange={function(e) { setJdText(e.target.value); }}
              placeholder={'Paste the job description here...\n\nInclude responsibilities and qualifications for best results.'}
              style={{ width: '100%', minHeight: plan ? 280 : 220, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.85rem', fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.65, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.35rem', marginBottom: '0.9rem' }}>
              Tip: more complete JDs produce better recommendations.
            </div>
            <button
              onClick={plan ? handleReset : handleGenerate}
              disabled={isGenerating || (!plan && !jdText.trim())}
              style={{
                width: '100%',
                background: plan ? 'var(--surface-2)' : (jdText.trim() ? 'var(--purple)' : 'var(--surface-2)'),
                color: plan ? 'var(--text-muted)' : (jdText.trim() ? 'white' : 'var(--text-dim)'),
                border: plan ? '1px solid var(--border)' : 'none',
                borderRadius: 8,
                padding: '0.75rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: (isGenerating || (!plan && !jdText.trim())) ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {isGenerating ? 'Analyzing...' : plan ? '← New job description' : 'Generate 7-day plan →'}
            </button>
          </div>

          {/* Keyword hint — shown when no plan yet */}
          {!plan && (
            <div style={{ marginTop: '1rem', background: 'var(--purple-bg)', border: '1px solid var(--purple-border)', borderRadius: 10, padding: '1rem 1.1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple)', marginBottom: '0.55rem' }}>Scanned for keywords across</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {CATEGORY_LABELS.map(function(cat) {
                  return (
                    <span key={cat.id} style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--purple)', background: 'var(--purple-bg)', border: '1px solid var(--purple-border)', borderRadius: 20, padding: '0.2rem 0.55rem' }}>
                      {cat.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right panel — plan output */}
        <div>
          {/* ── Example banner ── */}
          {usingExample && (
            <div style={{ background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.85rem' }}>💡</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--yellow-text)', fontWeight: 500 }}>
                Example plan for: <strong>{EXAMPLE_PLAN.role}</strong>. Paste a real JD to get your personalized plan.
              </span>
            </div>
          )}

          {/* ── Matched categories ── */}
          {!usingExample && (
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.55rem' }}>Keywords matched</div>
              {displayPlan.matchedCategories && displayPlan.matchedCategories.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {displayPlan.matchedCategories.map(function(cat, i) {
                    const isPrimary   = i < 3;
                    const isSecondary = i >= 3 && i < 6;
                    const color  = isPrimary ? 'var(--purple)'      : isSecondary ? 'var(--teal)'      : 'var(--text-muted)';
                    const bg     = isPrimary ? 'var(--purple-bg)'   : isSecondary ? 'var(--teal-bg)'   : 'var(--surface-2)';
                    const border = isPrimary ? 'var(--purple-border)': isSecondary ? 'var(--teal-border)': 'var(--border)';
                    return (
                      <span key={cat.id} style={{ fontSize: '0.75rem', fontWeight: isPrimary ? 700 : 500, color, background: bg, border: '1px solid ' + border, borderRadius: 20, padding: '0.22rem 0.65rem' }}>
                        {cat.label}
                        <span style={{ opacity: 0.65, marginLeft: 3, fontWeight: 400, fontSize: '0.7rem' }}>
                          ({cat.hits})
                        </span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>No strong signals found — paste a more complete JD for better results.</p>
              )}
            </div>
          )}

          {/* ── 7-day plan cards ── */}
          <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>
            Your 7-day study plan
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {displayPlan.days.map(function(dayObj) {
              var dayNum = dayObj.day;
              var accentColor = dayNum <= 2 ? 'var(--teal)' : dayNum <= 5 ? 'var(--purple)' : dayNum === 6 ? 'var(--yellow)' : 'var(--green)';
              var accentBg    = dayNum <= 2 ? 'var(--teal-bg)' : dayNum <= 5 ? 'var(--purple-bg)' : dayNum === 6 ? 'var(--yellow-bg)' : 'var(--green-bg)';
              var accentBorder= dayNum <= 2 ? 'var(--teal-border)' : dayNum <= 5 ? 'var(--purple-border)' : dayNum === 6 ? 'var(--yellow-border)' : 'var(--green-border)';
              var tier = dayNum <= 2 ? 'Foundation' : dayNum <= 5 ? 'Practice' : dayNum === 6 ? 'Breadth' : 'Review';

              return (
                <div key={dayObj.day} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.1rem', borderLeft: '3px solid ' + accentColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>{dayObj.label}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-muted)' }}>— {dayObj.theme}</span>
                    </div>
                    <span style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: accentColor, background: accentBg, border: '1px solid ' + accentBorder, borderRadius: 4, padding: '0.12rem 0.45rem' }}>
                      {tier}
                    </span>
                  </div>

                  {/* Room chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    {(dayObj.rooms || []).map(function(roomId) {
                      var meta = ROOM_META[roomId];
                      if (!meta) return null;
                      return (
                        <button
                          key={roomId}
                          onClick={function() { if (onNavigate) onNavigate(meta.page); }}
                          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.3rem 0.7rem', fontSize: '0.78rem', fontWeight: 600, color: meta.color, cursor: 'pointer', transition: 'border-color 0.12s' }}
                          title={'Go to ' + meta.label}
                        >
                          {meta.label} →
                        </button>
                      );
                    })}
                    {(!dayObj.rooms || dayObj.rooms.length === 0) && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No specific room match — paste a fuller JD.</span>
                    )}
                  </div>

                  {/* Day note */}
                  {dayObj.note && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{dayObj.note}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            As you complete cases, your{' '}
            {onNavigate ? (
              <button onClick={function() { onNavigate('progress'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontWeight: 600, fontSize: '0.82rem', padding: 0 }}>
                Progress page
              </button>
            ) : (
              <span style={{ color: 'var(--purple)', fontWeight: 600 }}>Progress page</span>
            )}{' '}
            will show which rooms still need attention. Regenerate this plan if your target role changes.
          </div>
        </div>
      </div>
    </div>
  );
}

// Alias export so both names resolve (App.jsx uses DefenseDocGenerator)
export { DefenseDocGenerator as DefenseDoc };
