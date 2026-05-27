import { useState, useEffect } from 'react';
import { rcaFoundationModules } from '../../data/rcaFoundationModules.js';
import { saveRCAFoundationProgress } from '../../utils/rcaFoundationProgress.js';
import { track } from '../../utils/analytics.js';

const NOTES_KEY = 'pal-notes-v1';

function getNotes(room, caseId) {
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    return all[room + ':' + caseId] || '';
  } catch { return ''; }
}

function saveNote(room, caseId, text) {
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    all[room + ':' + caseId] = text;
    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  } catch {}
}

// ── Shared helpers ──────────────────────────────────────────────────────────

function InsightBox({ children }) {
  return (
    <div style={{
      background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
      borderRadius: 'var(--radius)', padding: '1rem 1.1rem', marginTop: '1.25rem',
    }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.4rem' }}>
        Key Insight
      </div>
      <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function NextBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      marginTop: '1.5rem', padding: '0.65rem 1.6rem',
      background: 'var(--teal)', color: '#fff', border: 'none',
      borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem',
      cursor: 'pointer',
    }}>
      {label || 'Next →'}
    </button>
  );
}

function MCQOption({ label, selected, correct, revealed, onClick }) {
  let bg = 'var(--surface-2)';
  let border = 'var(--border)';
  let color = 'var(--text)';
  if (revealed) {
    if (correct) { bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)'; }
    else if (selected && !correct) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
  } else if (selected) {
    border = 'var(--teal-border)';
  }
  return (
    <button onClick={onClick} disabled={revealed} style={{
      display: 'block', width: '100%', textAlign: 'left',
      padding: '0.7rem 1rem', marginBottom: '0.5rem',
      background: bg, border: '1.5px solid ' + border, borderRadius: 'var(--radius-sm)',
      color, fontSize: '0.88rem', cursor: revealed ? 'default' : 'pointer',
      transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );
}

// ── Module rf01: The RCA Framework ─────────────────────────────────────────
function Module_RF01({ onComplete }) {
  const LAYERS = [
    { id: 'dq',  label: 'Data Quality',          desc: 'Did tracking or a pipeline change? Is this a real signal?', color: 'var(--red)' },
    { id: 'ext', label: 'External / Seasonal',   desc: 'Holiday? Competitor launch? Platform outage? Day-of-week?', color: 'var(--yellow)' },
    { id: 'prod',label: 'Product Change',         desc: 'Did we ship something? A/B test? Infra change? Ranking algorithm?', color: 'var(--accent)' },
    { id: 'beh', label: 'User Behaviour Shift',  desc: 'Cohort mix change? Organic behaviour evolution? Market saturation?', color: 'var(--purple)' },
  ];

  const ITEMS = [
    { text: 'Event logging stopped firing on iOS 17.2', layer: 'dq' },
    { text: 'Christmas week — all consumer apps see traffic spike', layer: 'ext' },
    { text: 'Pushed a nav redesign that buried the share button', layer: 'prod' },
    { text: 'New user cohort from paid acquisition has lower baseline engagement', layer: 'beh' },
    { text: 'Data warehouse pipeline had a 6-hour backfill delay', layer: 'dq' },
    { text: 'Competitor launched a free tier that matches our core feature set', layer: 'ext' },
  ];

  const [assignments, setAssignments] = useState({});
  const [revealed, setRevealed] = useState(false);

  function assign(itemIdx, layerId) {
    if (revealed) return;
    setAssignments(prev => ({ ...prev, [itemIdx]: layerId }));
  }

  function allAssigned() {
    return ITEMS.every((_, i) => assignments[i]);
  }

  function check() {
    setRevealed(true);
  }

  const correct = ITEMS.filter((item, i) => assignments[i] === item.layer).length;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        The RCA framework works top-to-bottom through four layers. Classify each signal into its layer.
        Click an item, then click the layer to assign it.
      </p>

      {/* Layers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
        {LAYERS.map(layer => (
          <div key={layer.id} style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.8rem',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: layer.color, marginBottom: '0.25rem' }}>
              {layer.label}
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.5rem' }}>
              {layer.desc}
            </div>
            <div style={{ minHeight: 32 }}>
              {ITEMS.map((item, i) => assignments[i] === layer.id && (
                <div key={i} style={{
                  fontSize: '0.72rem', padding: '0.2rem 0.4rem', marginBottom: '0.2rem',
                  borderRadius: 3,
                  background: revealed
                    ? (item.layer === layer.id ? 'var(--teal-bg)' : 'var(--red-bg)')
                    : 'var(--accent-bg)',
                  color: revealed
                    ? (item.layer === layer.id ? 'var(--teal)' : 'var(--red)')
                    : 'var(--accent)',
                  border: '1px solid ' + (revealed
                    ? (item.layer === layer.id ? 'var(--teal-border)' : 'var(--red-border)')
                    : 'var(--accent-border)'),
                }}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unassigned items */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Drag to classify:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {ITEMS.map((item, i) => !assignments[i] && (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{
                fontSize: '0.78rem', padding: '0.3rem 0.6rem',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text)',
                cursor: 'pointer', marginBottom: '0.4rem',
              }}>
                {item.text}
              </div>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {LAYERS.map(layer => (
                  <button key={layer.id} onClick={() => assign(i, layer.id)} style={{
                    fontSize: '0.68rem', padding: '0.15rem 0.4rem',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 3, color: layer.color, cursor: 'pointer', fontWeight: 600,
                  }}>
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!revealed && allAssigned() && (
        <button onClick={check} style={{
          padding: '0.55rem 1.2rem', background: 'var(--teal)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700,
          fontSize: '0.88rem', cursor: 'pointer',
        }}>
          Check answers
        </button>
      )}

      {revealed && (
        <div>
          <div style={{
            padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginTop: '0.75rem',
            background: correct === ITEMS.length ? 'var(--teal-bg)' : 'var(--yellow-bg)',
            border: '1px solid ' + (correct === ITEMS.length ? 'var(--teal-border)' : 'var(--yellow-border)'),
            color: correct === ITEMS.length ? 'var(--teal)' : 'var(--yellow)',
            fontWeight: 700, fontSize: '0.88rem',
          }}>
            {correct}/{ITEMS.length} correct
            {correct < ITEMS.length && ' — review the highlighted items above'}
          </div>
          <InsightBox>
            RCA works top-to-bottom: Data Quality → External → Product → Behaviour. This order exists because data quality is cheap to rule out and the most common false alarm. Never skip to product hypotheses before confirming the data is real.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module rf02: Decompose Before Diagnose ──────────────────────────────────
function Module_RF02({ onComplete }) {
  const SCENARIO = 'WhatsApp DAU drops 18% week-over-week, from 42M to 34.4M. Your PM asks: "What happened?"';

  const DECOMPS = [
    { id: 'new',   label: 'New user installs',        correct: true,  explanation: 'New user acquisition failure = marketing or app store change.' },
    { id: 'ret',   label: 'D1/D7/D30 retention rate', correct: true,  explanation: 'Retention collapse = product or notification change.' },
    { id: 'res',   label: 'Resurrected users',         correct: true,  explanation: 'Resurr drop = re-engagement campaign stopped or push notifications disabled.' },
    { id: 'rev',   label: 'Revenue per user',          correct: false, explanation: 'Revenue is a lagging output metric, not a DAU driver. This does not explain the drop.' },
    { id: 'churn', label: 'Churned user rate',          correct: true,  explanation: 'Churn spike = product problem or external pressure causing users to leave.' },
    { id: 'sess',  label: 'Session count per user',    correct: false, explanation: 'Sessions per user explains engagement depth, not DAU headcount. Useful after decomposing DAU.' },
  ];

  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id) {
    if (revealed) return;
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  const correctIds = new Set(DECOMPS.filter(d => d.correct).map(d => d.id));

  return (
    <div>
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
        fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6,
      }}>
        <strong>Scenario:</strong> {SCENARIO}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Before diagnosing root cause, you must decompose DAU. Select all metrics that belong in the DAU decomposition:
      </p>

      {DECOMPS.map(d => {
        const sel = selected.has(d.id);
        let bg = sel ? 'var(--teal-bg)' : 'var(--surface-2)';
        let border = sel ? 'var(--teal-border)' : 'var(--border)';
        let color = sel ? 'var(--teal)' : 'var(--text)';
        if (revealed) {
          if (d.correct) { bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)'; }
          else if (sel && !d.correct) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
          else { bg = 'var(--surface-2)'; border = 'var(--border)'; color = 'var(--text-muted)'; }
        }
        return (
          <div key={d.id}>
            <button onClick={() => toggle(d.id)} disabled={revealed} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '0.65rem 1rem', marginBottom: revealed ? 0 : '0.45rem',
              background: bg, border: '1.5px solid ' + border,
              borderRadius: 'var(--radius-sm)', color, fontSize: '0.88rem',
              cursor: revealed ? 'default' : 'pointer', transition: 'all 0.15s',
              fontWeight: sel || (revealed && d.correct) ? 600 : 400,
            }}>
              {d.label}
            </button>
            {revealed && (
              <div style={{
                fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5,
                padding: '0.3rem 1rem 0.6rem', marginBottom: '0.1rem',
              }}>
                {d.correct ? '✓' : '✗'} {d.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!revealed && selected.size > 0 && (
        <button onClick={() => setRevealed(true)} style={{
          marginTop: '0.75rem', padding: '0.55rem 1.2rem',
          background: 'var(--teal)', color: '#fff', border: 'none',
          borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
        }}>
          Check
        </button>
      )}

      {revealed && (
        <div>
          <InsightBox>
            DAU = New + Retained + Resurrected − Churned. This decomposition immediately tells you whether the drop is an acquisition problem, a retention problem, a resurrection problem, or a churn spike — four different diagnoses with four different fixes. Never say "DAU dropped" without this breakdown.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module rf03: Data Quality First ────────────────────────────────────────
function Module_RF03({ onComplete }) {
  const QUESTIONS = [
    {
      q: 'You notice a 40% drop in session_start events on Android. iOS is flat. What do you check first?',
      options: [
        { label: 'A. Check if we shipped a product change to Android last week', correct: false },
        { label: 'B. Check if the Android SDK version or tracking library changed', correct: true },
        { label: 'C. Check if a competitor launched on Android', correct: false },
        { label: 'D. Check if Android users have different engagement patterns', correct: false },
      ],
      explanation: 'Platform-specific drops (Android only, iOS flat) almost always indicate an SDK or tracking change, not a product problem. Data quality is the first hypothesis — and it\'s cheap to rule out.',
    },
    {
      q: 'Revenue per user drops 25% but order count is flat and AOV is flat. What is most likely?',
      options: [
        { label: 'A. Users are spending less per order', correct: false },
        { label: 'B. A data pipeline aggregation bug is double-counting orders in the denominator', correct: true },
        { label: 'C. A new cohort of lower-value users joined last week', correct: false },
        { label: 'D. A promotion reduced pricing across the board', correct: false },
      ],
      explanation: 'If RPU drops but both components (order count and AOV) are flat, the ratio arithmetic is broken. The most likely cause is a denominator inflation bug in the pipeline. Data quality first.',
    },
  ];

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  function select(qi, oi) {
    if (revealed[qi]) return;
    setAnswers(prev => ({ ...prev, [qi]: oi }));
  }

  function check(qi) {
    setRevealed(prev => ({ ...prev, [qi]: true }));
  }

  const allDone = QUESTIONS.every((_, i) => revealed[i]);

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Data quality is the first layer of every RCA. These scenarios test whether you apply it correctly.
      </p>

      {QUESTIONS.map((q, qi) => (
        <div key={qi} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '1rem', marginBottom: '1.25rem',
        }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
            {q.q}
          </div>
          {q.options.map((opt, oi) => (
            <MCQOption
              key={oi}
              label={opt.label}
              selected={answers[qi] === oi}
              correct={opt.correct}
              revealed={!!revealed[qi]}
              onClick={() => select(qi, oi)}
            />
          ))}
          {answers[qi] !== undefined && !revealed[qi] && (
            <button onClick={() => check(qi)} style={{
              marginTop: '0.3rem', padding: '0.45rem 1rem',
              background: 'var(--teal)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
            }}>
              Check
            </button>
          )}
          {revealed[qi] && (
            <div style={{
              marginTop: '0.5rem', padding: '0.65rem 0.85rem',
              background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5,
            }}>
              {q.explanation}
            </div>
          )}
        </div>
      ))}

      {allDone && (
        <div>
          <InsightBox>
            Data quality checks are cheap and fast — SDK version logs, pipeline run history, event count by platform. Always run these before generating product hypotheses. A false positive (treating a tracking bug as a product problem) wastes engineering sprint capacity on a non-issue.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module rf04: Seasonality and External Factors ───────────────────────────
function Module_RF04({ onComplete }) {
  const FACTORS = [
    { text: 'Monday — lower engagement vs Friday on a consumer social app', type: 'seasonal', label: 'Day-of-week' },
    { text: 'Thanksgiving week — US DAU spikes for recipe apps', type: 'seasonal', label: 'Holiday' },
    { text: 'Major competitor launches a free tier matching our core features', type: 'external', label: 'Competitor' },
    { text: 'Apple changes App Store search ranking algorithm', type: 'external', label: 'Platform' },
    { text: 'Marketing budget cut 60% in Q4 vs Q3', type: 'external', label: 'Marketing' },
    { text: 'January — fitness app signups spike after New Year resolutions', type: 'seasonal', label: 'Seasonal trend' },
  ];

  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState(false);

  function assign(i, type) {
    if (revealed) return;
    setSelected(prev => ({ ...prev, [i]: type }));
  }

  const allAssigned = FACTORS.every((_, i) => selected[i]);

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Before diagnosing a product problem, you must rule out time-based and external causes.
        Classify each factor as <strong>Seasonal</strong> (time-based, predictable) or <strong>External</strong> (market/platform, unpredictable):
      </p>

      {FACTORS.map((f, i) => {
        const sel = selected[i];
        const correct = f.type;
        let rowBg = 'var(--surface-2)';
        if (revealed) {
          rowBg = sel === correct ? 'var(--teal-bg)' : 'var(--red-bg)';
        }
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 0.9rem', marginBottom: '0.5rem',
            background: rowBg, border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, fontSize: '0.85rem', color: 'var(--text)', minWidth: 160 }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 3, padding: '0.1rem 0.35rem', marginRight: '0.5rem',
              }}>
                {f.label}
              </span>
              {f.text}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              {['seasonal', 'external'].map(type => (
                <button key={type} onClick={() => assign(i, type)} disabled={revealed} style={{
                  padding: '0.3rem 0.65rem', fontSize: '0.75rem', fontWeight: 600,
                  borderRadius: 'var(--radius-sm)', cursor: revealed ? 'default' : 'pointer',
                  background: sel === type ? (revealed ? (sel === correct ? 'var(--teal)' : 'var(--red)') : 'var(--teal)') : 'var(--surface)',
                  color: sel === type ? '#fff' : 'var(--text-muted)',
                  border: '1px solid ' + (sel === type ? (revealed ? (sel === correct ? 'var(--teal-border)' : 'var(--red-border)') : 'var(--teal-border)') : 'var(--border)'),
                }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {!revealed && allAssigned && (
        <button onClick={() => setRevealed(true)} style={{
          marginTop: '0.75rem', padding: '0.55rem 1.2rem',
          background: 'var(--teal)', color: '#fff', border: 'none',
          borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
        }}>
          Check
        </button>
      )}

      {revealed && (
        <div>
          <InsightBox>
            Seasonal factors are predictable from the calendar — build YoY and WoW comparisons into your default dashboards so you never mistake a holiday spike for a product win. External factors are unpredictable — maintain a "competitor intelligence" log so recent launches are the first thing you check when a drop appears.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module rf05: When the Aggregate Lies ───────────────────────────────────
function Module_RF05({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const scenario = 'A fitness app\'s overall D7 retention drops from 32% to 28% (-4pp) after a major new user acquisition campaign. The growth team is worried.';

  const options = [
    { label: 'A. The product experience degraded — investigate recent product changes', correct: false },
    { label: 'B. The new acquisition cohort has lower baseline retention, pulling the aggregate down (mix shift)', correct: true },
    { label: 'C. The acquisition campaign targeted the wrong geography', correct: false },
    { label: 'D. D7 retention calculation is incorrect — check the pipeline', correct: false },
  ];

  const explanation = 'When you run a large acquisition campaign, you add a wave of new users who have not yet proven they will retain. The aggregate D7 retention drops not because existing users retained less, but because the mix of users shifted toward a younger, less-proven cohort. Always segment retention by acquisition cohort before concluding there is a product problem.';

  return (
    <div>
      {step === 0 && (
        <div>
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
              The aggregate view
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Overall D7 retention', before: '32%', after: '28%', change: '-4pp', bad: true },
                { label: 'Existing user D7 retention', before: '38%', after: '37%', change: '-1pp', bad: false },
                { label: 'New campaign cohort D7', before: 'N/A', after: '14%', change: 'new', bad: false },
                { label: 'New user % of DAU', before: '18%', after: '41%', change: '+23pp', bad: false },
              ].map((row, i) => (
                <div key={i} style={{ minWidth: 140 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{row.label}</div>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{row.before}</span>
                    <span style={{ fontSize: '0.1rem' }}>→</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: row.bad ? 'var(--red)' : 'var(--text)' }}>{row.after}</span>
                    <span style={{ fontSize: '0.72rem', color: row.bad ? 'var(--red)' : 'var(--text-muted)' }}>({row.change})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            {scenario}
          </p>

          <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.85rem' }}>
            What is the most likely explanation for the aggregate D7 drop?
          </p>

          {options.map((opt, i) => (
            <MCQOption
              key={i}
              label={opt.label}
              selected={answer === i}
              correct={opt.correct}
              revealed={revealed}
              onClick={() => !revealed && setAnswer(i)}
            />
          ))}

          {answer !== null && !revealed && (
            <button onClick={() => setRevealed(true)} style={{
              marginTop: '0.5rem', padding: '0.5rem 1.1rem',
              background: 'var(--teal)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            }}>
              Check
            </button>
          )}

          {revealed && (
            <div>
              <div style={{
                marginTop: '0.5rem', padding: '0.65rem 0.85rem',
                background: options[answer]?.correct ? 'var(--teal-bg)' : 'var(--red-bg)',
                border: '1px solid ' + (options[answer]?.correct ? 'var(--teal-border)' : 'var(--red-border)'),
                borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
              }}>
                {explanation}
              </div>
              <InsightBox>
                Mix shifts are the silent killer of aggregate metrics. When the composition of your user base changes — more new users, more mobile users, more low-intent users — the aggregate metric moves even if every segment is healthy. Always segment by acquisition cohort, platform, and user vintage before concluding the product has a problem.
              </InsightBox>
              <NextBtn onClick={onComplete} label="Complete module →" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Module rf06: From Diagnosis to Recommendation ──────────────────────────
function Module_RF06({ onComplete }) {
  const STEPS = [
    { id: 'what',    label: '1. What dropped',        example: 'D7 retention dropped 6pp (38% → 32%) in the week of Nov 4th, affecting iOS users only.' },
    { id: 'why',     label: '2. Root cause + evidence', example: 'The Nov 3rd iOS push notification permission prompt change reduced opt-in rate from 61% to 34%. Users who disabled notifications have 22pp lower D7 retention (confirmed in segment analysis).' },
    { id: 'fix',     label: '3. Proposed fix + owner', example: 'Revert the prompt copy to the control version (ETA: 2 days, owner: iOS team). Test a softer permission request flow in Q1.' },
    { id: 'measure', label: '4. How we measure success', example: 'Push opt-in rate back to >55% within 2 weeks. D7 retention recovery to >36% within 30 days for the affected cohort.' },
    { id: 'monitor', label: '5. Ongoing monitoring',   example: 'Weekly alert if push opt-in rate drops >5pp from baseline. Add to the iOS release checklist: verify notification opt-in rate 48h post-release.' },
  ];

  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState(new Set());

  function advance() {
    setSeen(prev => new Set([...prev, current]));
    if (current < STEPS.length - 1) {
      setCurrent(current + 1);
    }
  }

  const allSeen = seen.size >= STEPS.length - 1;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        A complete RCA has 5 components. Walk through each one — many analysts stop at diagnosis and skip the recommendation structure.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {STEPS.map((step, i) => {
          const isActive = i === current;
          const isDone = seen.has(i);
          return (
            <div key={step.id} style={{
              border: '1.5px solid ' + (isActive ? 'var(--teal-border)' : isDone ? 'var(--border)' : 'var(--border)'),
              borderRadius: 'var(--radius-sm)',
              background: isActive ? 'var(--teal-bg)' : isDone ? 'var(--surface-2)' : 'var(--surface)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.7rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: isDone ? 'var(--teal)' : isActive ? 'var(--teal-bg)' : 'var(--surface-2)',
                  border: '2px solid ' + (isDone ? 'var(--teal)' : isActive ? 'var(--teal-border)' : 'var(--border)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 800,
                  color: isDone ? '#fff' : isActive ? 'var(--teal)' : 'var(--text-muted)',
                }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span style={{
                  fontWeight: isActive ? 700 : 600, fontSize: '0.88rem',
                  color: isActive ? 'var(--teal)' : isDone ? 'var(--text-muted)' : 'var(--text)',
                }}>
                  {step.label}
                </span>
              </div>
              {isActive && (
                <div style={{ padding: '0 1rem 1rem' }}>
                  <div style={{
                    fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.6,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem',
                    marginBottom: '0.75rem', fontStyle: 'italic',
                  }}>
                    Example: {step.example}
                  </div>
                  <button onClick={advance} style={{
                    padding: '0.45rem 1rem',
                    background: 'var(--teal)', color: '#fff', border: 'none',
                    borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                  }}>
                    {i < STEPS.length - 1 ? 'Next component →' : 'Done'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allSeen && (
        <div>
          <InsightBox>
            Steps 4 and 5 are what separate junior analysts from senior ones. Anyone can find the root cause. The senior move is pre-committing to a success metric (step 4) — so you know if the fix worked — and adding monitoring (step 5) — so the problem cannot silently recur without being caught.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module registry ─────────────────────────────────────────────────────────
const MODULE_COMPONENTS = {
  rf01: Module_RF01,
  rf02: Module_RF02,
  rf03: Module_RF03,
  rf04: Module_RF04,
  rf05: Module_RF05,
  rf06: Module_RF06,
};

// ── Runner shell ────────────────────────────────────────────────────────────
export function RCAFoundationsRunner({ moduleId, onBack, onNext, unlocked }) {
  const module = rcaFoundationModules.find(m => m.id === moduleId);
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState(() => getNotes('rca-foundations', moduleId));
  useEffect(() => { setNote(getNotes('rca-foundations', moduleId)); }, [moduleId]);

  if (!module) return null;

  const ModuleComponent = MODULE_COMPONENTS[moduleId];

  function handleComplete() {
    saveRCAFoundationProgress(moduleId);
    track('case_completed', { room: 'rca-foundations', id: moduleId, title: module.title });
    setCompleted(true);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem 1.25rem 3rem' }}>
      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.2rem 0',
        }}>
          ← All modules
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Module {module.index} of {rcaFoundationModules.length}
          </span>
          {completed && (
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem',
              background: 'var(--teal-bg)', color: 'var(--teal)',
              border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)',
            }}>
              ✓ Complete
            </span>
          )}
        </div>
      </div>

      {/* Module header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.3rem', letterSpacing: '-0.02em' }}>
          {module.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>{module.subtitle}</p>
      </div>

      {/* Module content */}
      {ModuleComponent && <ModuleComponent onComplete={handleComplete} />}

      {/* Post-completion: connection + playbook links + next */}
      {completed && (
        <div style={{ marginTop: '1.75rem' }}>
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1rem 1.1rem', marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>
              Why this matters for RCA practice
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>
              {module.connection}
            </div>
          </div>

          {module.playbookLinks && module.playbookLinks.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
                Playbook reading
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {module.playbookLinks.map(link => (
                  <span key={link.id} style={{
                    fontSize: '0.78rem', padding: '0.2rem 0.55rem',
                    background: 'var(--teal-bg)', color: 'var(--teal)',
                    border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', fontWeight: 500,
                  }}>
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button onClick={onNext} style={{
            padding: '0.65rem 1.6rem', background: 'var(--teal)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700,
            fontSize: '0.9rem', cursor: 'pointer',
          }}>
            {module.index < rcaFoundationModules.length ? 'Next module →' : 'Back to all modules'}
          </button>

          {/* Notes */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              My Notes
            </div>
            <textarea
              value={note}
              onChange={e => { setNote(e.target.value); saveNote('rca-foundations', moduleId, e.target.value); }}
              placeholder="Add your own notes, reminders, or follow-up questions..."
              rows={4}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.65rem 0.85rem',
                color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.55,
                resize: 'vertical', outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
