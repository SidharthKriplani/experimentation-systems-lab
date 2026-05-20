import { useState } from 'react';

const KEYWORD_MAP = [
  { keywords: ['experiment', 'a/b test', 'hypothesis', 'statistical', 'significance', 'p-value', 'power', 'sample size'], room: 'stat-foundations', label: 'Stat Foundations', weight: 0 },
  { keywords: ['metric', 'kpi', 'north star', 'measurement', 'dau', 'mau', 'retention', 'engagement'], room: 'metrics', label: 'Metrics Room', weight: 0 },
  { keywords: ['growth', 'cohort', 'ltv', 'cac', 'funnel', 'acquisition', 'activation'], room: 'growth-analytics', label: 'Growth Analytics', weight: 0 },
  { keywords: ['root cause', 'rca', 'diagnose', 'investigate', 'spike', 'drop', 'anomaly'], room: 'rca', label: 'RCA Room', weight: 0 },
  { keywords: ['sql', 'python', 'query', 'data pipeline', 'etl', 'analytics engineering'], room: 'code', label: 'Code Room', weight: 0 },
  { keywords: ['product sense', 'design', 'user research', 'pm', 'feature', 'roadmap', 'strategy'], room: 'product-design', label: 'PM Design Room', weight: 0 },
  { keywords: ['prioritization', 'rice', 'ice', 'tradeoff', 'backlog', 'planning'], room: 'prioritization', label: 'Prioritization Room', weight: 0 },
  { keywords: ['behavioral', 'leadership', 'stakeholder', 'cross-functional', 'influence', 'communication'], room: 'behavioral', label: 'Behavioral Room', weight: 0 },
  { keywords: ['estimation', 'fermi', 'market size', 'scale', 'back of envelope'], room: 'estimation', label: 'Estimation Room', weight: 0 },
  { keywords: ['dashboard', 'bi', 'reporting', 'visualization', 'attribution', 'data storytelling'], room: 'bi', label: 'BI & Reporting', weight: 0 },
  { keywords: ['review', 'experiment review', 'case study', 'decision', 'analysis scenario'], room: 'browser', label: 'Review Scenarios', weight: 0 },
];

function computeWeights(jdText) {
  const text = jdText.toLowerCase();
  const weighted = KEYWORD_MAP.map(entry => {
    const hits = entry.keywords.filter(k => text.includes(k)).length;
    return { ...entry, weight: hits };
  }).filter(e => e.weight > 0)
    .sort((a, b) => b.weight - a.weight);
  return weighted;
}

function detectRole(jdText) {
  const text = jdText.toLowerCase();
  const dsSignals = ['data scientist', 'machine learning', 'statistical modeling', 'python', 'sql', 'experimentation'];
  const pmSignals = ['product manager', 'product management', 'roadmap', 'stakeholder', 'strategy', 'user research'];
  const dsScore = dsSignals.filter(k => text.includes(k)).length;
  const pmScore = pmSignals.filter(k => text.includes(k)).length;
  const expSignals = ['senior', 'staff', 'lead', 'principal'];
  const isStaff = expSignals.some(k => text.includes(k));
  const level = isStaff ? (text.includes('staff') || text.includes('principal') ? 'Staff' : 'Senior') : 'Mid-Level';
  if (dsScore > pmScore) return level + ' Data Scientist';
  if (pmScore > dsScore) return level + ' Product Manager';
  return level + ' DS/PM (hybrid role)';
}

function buildStudyPlan(weighted) {
  const primary   = weighted.slice(0, 3);
  const secondary = weighted.slice(3, 5);
  const light     = weighted.slice(5);

  return [
    {
      day: 1,
      label: 'Day 1',
      theme: 'Primary Focus: ' + (primary[0] ? primary[0].label : 'Core Skills'),
      tasks: primary[0]
        ? ['Complete 3 cases in ' + primary[0].label, 'Focus on understanding the pattern before the answer', 'Write a 2-sentence takeaway for each case']
        : ['Review your highest-priority room', 'Complete 3 core cases', 'Note weak spots for Day 6 review'],
      tier: 'primary',
    },
    {
      day: 2,
      label: 'Day 2',
      theme: 'Primary Focus: ' + (primary[0] ? primary[0].label + ' (continued)' : 'Core Skills (continued)'),
      tasks: primary[0]
        ? ['Complete 3 more cases in ' + primary[0].label, 'Attempt 1 harder case without hints', 'Review your Day 1 takeaways — any patterns?']
        : ['Complete 3 more core cases', 'Attempt at least 1 case without hints', 'Self-assess: which concepts are still shaky?'],
      tier: 'primary',
    },
    {
      day: 3,
      label: 'Day 3',
      theme: 'Primary Focus: ' + (primary[1] ? primary[1].label : (primary[0] ? primary[0].label + ' review' : 'Second Priority')),
      tasks: primary[1]
        ? ['Complete 3 cases in ' + primary[1].label, 'Map how this room connects to ' + (primary[0] ? primary[0].label : 'your first priority'), 'Write 1 STAR story from your experience for this topic']
        : ['Revisit Day 1–2 cases you struggled with', 'Try a case from a secondary room', 'Write a STAR story for the core topic'],
      tier: 'primary',
    },
    {
      day: 4,
      label: 'Day 4',
      theme: (primary[2] ? primary[2].label : (primary[1] ? primary[1].label + ' continued' : 'Cross-room practice')) + ' + depth',
      tasks: primary[2]
        ? ['Complete 2 cases in ' + primary[2].label, 'Complete 2 more cases in ' + (primary[1] ? primary[1].label : 'your second priority'), '2-minute verbal explanation of each answer out loud']
        : ['Complete 3 cases mixing your top two rooms', 'Practice explaining answers out loud', 'Identify your weakest case type so far'],
      tier: 'primary',
    },
    {
      day: 5,
      label: 'Day 5',
      theme: 'Secondary rooms: ' + (secondary.length > 0 ? secondary.map(s => s.label).join(' + ') : 'Breadth coverage'),
      tasks: secondary.length > 0
        ? [
            'Complete 2 cases in ' + (secondary[0] ? secondary[0].label : 'first secondary room'),
            secondary[1] ? ('Complete 2 cases in ' + secondary[1].label) : 'Complete 2 cases in your breadth room',
            'Connect secondary skills to your primary ones — interviewers often combine them',
          ]
        : ['Complete 2 cases in each of your secondary topics', 'Write down how these connect to your primary strengths', 'Note any terminology gaps to review tonight'],
      tier: 'secondary',
    },
    {
      day: 6,
      label: 'Day 6',
      theme: 'Light coverage + cross-room challenge',
      tasks: light.length > 0
        ? [
            'Complete 1 case in each light-coverage room: ' + light.slice(0, 3).map(l => l.label).join(', '),
            'Complete 1 cross-room challenge combining ' + (primary[0] ? primary[0].label : 'your top room') + ' + ' + (secondary[0] ? secondary[0].label : 'a secondary room'),
            'Review your missed rubric points from the week — what patterns do you see?',
          ]
        : ['Complete 1 case in each remaining room', 'Attempt a cross-room challenge combining two skills', 'Review all missed rubric points from the week'],
      tier: 'light',
    },
    {
      day: 7,
      label: 'Day 7',
      theme: 'Full simulator run + weak area review',
      tasks: [
        'Run the Interview Simulator (timed, no hints) — treat it like the real thing',
        'Review your 3 lowest-rated cases from the week and re-attempt them cold',
        'Final check: can you explain your top 3 strengths and 2 development areas in 90 seconds?',
      ],
      tier: 'review',
    },
  ];
}

const TIER_STYLE = {
  primary:   { color: 'var(--teal)',      bg: 'var(--teal-bg)',      border: 'var(--teal-border)',      label: 'Primary (30 min/day)' },
  secondary: { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',    border: 'var(--yellow-border)',    label: 'Secondary (20 min/day)' },
  light:     { color: 'var(--blue-text)', bg: 'var(--blue-bg)',      border: 'var(--blue-border)',      label: 'Light (10 min/day)' },
  review:    { color: 'var(--green)',     bg: 'var(--green-bg)',     border: 'var(--green-border)',     label: 'Full Review' },
};

export function DefenseDocGenerator({ onBack, onNavigate }) {
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState(null);

  function handleGenerate() {
    if (!jdText.trim()) return;
    const weighted = computeWeights(jdText);
    const role = detectRole(jdText);
    const plan = buildStudyPlan(weighted);
    setResult({ weighted, role, plan });
  }

  function handleReset() {
    setResult(null);
    setJdText('');
  }

  const primary   = result ? result.weighted.slice(0, 3) : [];
  const secondary = result ? result.weighted.slice(3, 5) : [];
  const light     = result ? result.weighted.slice(5) : [];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: '@media print { .no-print { display: none !important; } body { background: white; color: black; } .print-card { break-inside: avoid; border: 1px solid #ccc; margin-bottom: 8px; } }' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Back button */}
        {onBack && (
          <button
            className='no-print'
            onClick={onBack}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem',
              padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}
          >
            ← Back
          </button>
        )}

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              width: '36px', height: '36px', borderRadius: '9px',
              background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', flexShrink: 0,
            }}>
              🛡️
            </span>
            <div>
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '0.15rem',
              }}>
                Prep Tools
              </div>
              <h1 style={{
                fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)',
                margin: 0, letterSpacing: '-0.02em',
              }}>
                Defense Doc Generator
              </h1>
            </div>
          </div>
          <p style={{
            color: 'var(--text-muted)', fontSize: '0.95rem',
            margin: '0.5rem 0 0', maxWidth: '600px', lineHeight: 1.6,
          }}>
            Paste a job description — get your personalized 7-day study plan
          </p>
        </div>

        {/* Input section */}
        {!result && (
          <div className='no-print'>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block', fontWeight: 600, fontSize: '0.88rem',
                color: 'var(--text)', marginBottom: '0.5rem',
              }}>
                Job Description
              </label>
              <textarea
                value={jdText}
                onChange={e => setJdText(e.target.value)}
                placeholder={'Paste the full job description here...'}
                style={{
                  width: '100%', minHeight: '200px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '1rem',
                  fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7,
                  fontFamily: 'inherit', resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!jdText.trim()}
              style={{
                background: jdText.trim() ? 'var(--teal)' : 'var(--surface-2)',
                color: jdText.trim() ? 'white' : 'var(--text-dim)',
                border: 'none', borderRadius: '8px',
                padding: '0.8rem 2rem', fontSize: '0.95rem', fontWeight: 700,
                cursor: jdText.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
              }}
            >
              Generate Study Plan →
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Action bar */}
            <div className='no-print' style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.print()}
                style={{
                  background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
                  color: 'var(--teal)', borderRadius: '7px',
                  padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                🖨️ Print / Save as PDF
              </button>
              <button
                onClick={handleReset}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--text-muted)', borderRadius: '7px',
                  padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← New JD
              </button>
            </div>

            {/* Role detection summary */}
            <div style={{
              background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
              borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
            }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--teal)', marginBottom: '0.25rem' }}>
                Role Detected
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.5 }}>
                Based on your JD, this looks like a{' '}
                <strong>{result.role}</strong> role
                {primary.length > 0 && (
                  <span> with heavy focus on <strong>{primary[0].label}</strong></span>
                )}
                {primary.length > 1 && (
                  <span> and <strong>{primary[1].label}</strong></span>
                )}.
              </div>
            </div>

            {/* Keyword hits */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Keyword Signals by Room
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.weighted.length === 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No strong keyword signals found. Paste a more complete JD for better results.
                  </span>
                )}
                {primary.map(entry => (
                  <span key={entry.room} style={{
                    fontSize: '0.8rem', fontWeight: 700,
                    color: 'var(--teal)', background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
                    borderRadius: '20px', padding: '0.3rem 0.75rem',
                  }}>
                    {entry.label} ({entry.weight} signals) — Primary
                  </span>
                ))}
                {secondary.map(entry => (
                  <span key={entry.room} style={{
                    fontSize: '0.8rem', fontWeight: 600,
                    color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
                    borderRadius: '20px', padding: '0.3rem 0.75rem',
                  }}>
                    {entry.label} ({entry.weight}) — Secondary
                  </span>
                ))}
                {light.map(entry => (
                  <span key={entry.room} style={{
                    fontSize: '0.8rem', fontWeight: 500,
                    color: 'var(--blue-text)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)',
                    borderRadius: '20px', padding: '0.3rem 0.75rem',
                  }}>
                    {entry.label} ({entry.weight}) — Light
                  </span>
                ))}
              </div>
            </div>

            {/* 7-day plan */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '1rem' }}>
                Your 7-Day Study Plan
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
                {result.plan.map(day => {
                  const tierCfg = TIER_STYLE[day.tier] || TIER_STYLE.primary;
                  return (
                    <div
                      key={day.day}
                      className='print-card'
                      style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '10px', padding: '1rem 1.15rem',
                        borderTop: '3px solid ' + tierCfg.color,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
                          {day.label}
                        </span>
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 600,
                          color: tierCfg.color, background: tierCfg.bg, border: '1px solid ' + tierCfg.border,
                          borderRadius: '4px', padding: '0.1rem 0.4rem',
                        }}>
                          {tierCfg.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                        {day.theme}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.15rem' }}>
                        {day.tasks.map((task, i) => (
                          <li key={i} style={{
                            fontSize: '0.83rem', color: 'var(--text-muted)',
                            lineHeight: 1.5, marginBottom: '0.3rem',
                          }}>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <div style={{
              marginTop: '1.5rem', padding: '0.85rem 1rem',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '8px', fontSize: '0.83rem', color: 'var(--text-muted)',
              lineHeight: 1.55,
            }}>
              💡 This plan is tailored to your JD\'s keyword signals. As you complete cases, your{' '}
              {onNavigate ? (
                <button
                  className='no-print'
                  onClick={() => onNavigate('progress')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--teal)', fontWeight: 600, fontSize: '0.83rem', padding: 0,
                  }}
                >
                  Progress page
                </button>
              ) : (
                <span style={{ color: 'var(--teal)', fontWeight: 600 }}>Progress page</span>
              )}{' '}
              will show which rooms need more attention. Revisit this generator if your target role changes.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
