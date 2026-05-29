import { useState, useEffect } from 'react';
import { rcaFoundationModules } from '../../data/rcaFoundationModules.js';
import { saveRCAFoundationProgress, getAllRCAFoundationProgress } from '../../utils/rcaFoundationProgress.js';
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
    <button onClick={onClick} className="pal-glow-pulse" style={{
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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Every metric movement belongs to one of four diagnostic layers. Working top-to-bottom through these layers keeps you from jumping to product conclusions when the data is simply broken, or missing an external event that explains the entire drop.
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
        <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
          <strong>What to do:</strong> For each signal below, click the layer label that best explains it. Assign all six signals before checking your answers.
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Classify each signal:
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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Aggregate metrics like DAU are sums of components. Jumping to a root cause without decomposing first wastes investigation time and leads to wrong diagnoses. This module trains you to break a top-line metric into the sub-metrics that can actually point to a cause.
      </p>

      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
        fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6,
      }}>
        <strong>Scenario:</strong> {SCENARIO}
      </div>

      <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
        <strong>What to do:</strong> Select every metric that belongs in the DAU decomposition — think about which components actually add up to or subtract from DAU.
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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        The first question in any RCA is not "what changed in the product?" — it is "is the data real?" SDK bugs, pipeline failures, and instrumentation gaps routinely produce false signals. This module trains you to spot those patterns before they send an investigation in the wrong direction.
      </p>

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
          <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
            <strong>What to do:</strong> Pick the single best first action — think about which hypothesis is cheapest to rule out and most likely given the symptom pattern.
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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Not every metric movement is caused by the product. Seasonal patterns repeat on a calendar schedule and are detectable with year-over-year comparisons. External factors are one-off market or platform events that require a different kind of awareness. Distinguishing them quickly stops you from filing a bug for a holiday.
      </p>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        Before diagnosing a product problem, you must rule out time-based and external causes.
        Classify each factor as <strong>Seasonal</strong> (time-based, predictable) or <strong>External</strong> (market/platform, unpredictable):
      </p>

      <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
        <strong>What to do:</strong> For each factor, click Seasonal or External — ask yourself whether a calendar alone could predict this event, or whether it required something outside your control to happen.
      </div>

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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Aggregate metrics can move in the wrong direction even when every individual segment is healthy. Mix shifts — changes in the composition of your user base — are one of the most common and misdiagnosed causes of metric drops. This module teaches you to look past the aggregate before raising an alarm.
      </p>

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

          <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
            <strong>What to do:</strong> Study the segmented data in the table above, then pick the answer that best explains why the aggregate moved even though existing-user retention is nearly flat.
          </div>

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
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Finding the root cause is only half the job. A complete RCA output includes a precise description of what happened, the evidence-backed cause, a concrete fix with an owner, a pre-committed success metric, and an ongoing monitoring plan. Most analysts stop at step two — this module walks you through all five.
      </p>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        A complete RCA has 5 components. Walk through each one — many analysts stop at diagnosis and skip the recommendation structure.
      </p>

      <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', marginBottom: '1rem', fontSize: '0.84rem', color: 'var(--teal)', lineHeight: 1.5 }}>
        <strong>What to do:</strong> Read the example for the active step and think about how you would write this section for a real investigation — then click Next component to advance through all five steps.
      </div>

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

// ── Module rf07: Metric Tree Construction ──────────────────────────────────
function Module_RF07({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This module teaches you to decompose any top-line metric into its multiplicative drivers — building the exhaustive tree that tells you exactly which branch a drop lives in. You will practise constructing metric trees for DAU, revenue, and engagement metrics from scratch, then use the tree to prioritise which node to investigate first.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>A metric tree forces you to be exhaustive: revenue = users x sessions x conversion x AOV. Every drop lives in exactly one node — the tree tells you where to look, not what you will find.</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Metric trees are the backbone of experiment debrief analysis — when a metric moves, the tree tells you which sub-metric drove it and whether that is the one you wanted to move.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Module rf08: SQL Diagnosis Patterns ────────────────────────────────────
function Module_RF08({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This module walks through the three SQL queries every analyst should run in the first 30 minutes of an investigation: time-series the raw event count by day, break it by platform and region, and compare this period to the same period last year. You will practise writing each query against a realistic schema and interpreting what the output tells you about where the investigation should focus next.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>The first three SQL moves in any RCA are always the same: time-series the raw event count by day, break it by platform and region, and compare this week to last week and last year. Analysts who jump to complex joins before these three queries have not yet confirmed whether the signal is real.</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>The same SQL patterns that surface a metric drop also validate experiment results — a time-series of your outcome metric split by variant is the first sanity check after any A/B test launches.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Module rf09: Seasonality and Trend Separation ──────────────────────────
function Module_RF09({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This module teaches you to separate a true trend from calendar-driven seasonality — so you can answer whether a metric drop is a genuine deterioration or a predictable cycle. You will practise constructing seasonality-adjusted baselines using WoW and YoY comparisons, and learn to identify when an apparent drop is actually within normal seasonal variance.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>A metric that is down 12% week-over-week may be perfectly healthy if the same week last year was also down 12%. Analysts who lack a seasonality-adjusted baseline mistake calendar effects for product problems every single quarter.</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Seasonality is also the primary confounder in long-running A/B tests — an experiment that spans a holiday week has treatment and control groups exposed to different demand environments, invalidating the comparison if not accounted for.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Module rf10: Data Quality First (Advanced) ─────────────────────────────
function Module_RF10({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This advanced module drills the complete data quality checklist that senior analysts run before touching product hypotheses: SDK and library version changes, pipeline run history, event-level row counts by platform, and denominator inflation checks. You will work through realistic failure scenarios — platform-specific drops, event-specific anomalies, and pipeline-wide collapses — and practise diagnosing each pattern in under five minutes.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Platform-specific drops almost always mean an SDK change, not a product problem. Event-specific drops almost always mean a logging bug. Pipeline-wide drops almost always mean a data engineering failure. These three patterns are recognizable in under five minutes if you know what to look for.</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Data quality checks are equally critical in A/B test analysis: a sudden metric movement in the control group after experiment launch almost always signals an instrumentation change, not treatment spillover.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Module rf11: External Factor Identification ────────────────────────────
function Module_RF11({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This module expands your external factor taxonomy beyond obvious seasonality to include competitor launches, app store policy changes, macro economic shifts, and marketing spend fluctuations. You will practise building a live external context log and using it to rapidly rule out non-product causes in a timed investigation scenario.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>The best analysts maintain a live external context log — a running list of competitor moves, platform policy changes, macro events, and marketing spend shifts. Without this log, external factors look like product problems, and engineers get pulled into investigations that have no product fix.</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>External factor awareness is also required for valid A/B test interpretation: if a major competitor launched during your experiment window, your treatment effect estimate is confounded by the market shift, not just the feature you tested.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Module rf12: Multi-Level RCA ───────────────────────────────────────────
function Module_RF12({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-2, var(--surface))', border: '1.5px solid var(--border)', borderRadius: 'var(--radius, 12px)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '4px', padding: '2px 8px', marginBottom: '0.75rem' }}>Coming Soon</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, var(--text-muted))', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          This capstone module tackles the hardest RCA scenario: incidents with two or three interacting causes that span multiple diagnostic layers simultaneously. You will practise disentangling compounding factors — a data quality issue masking a product regression layered on top of a seasonal dip — and learn the test for knowing when your RCA is actually complete versus prematurely stopped.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.08)', border: '1.5px solid rgba(20,184,166,0.2)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Real incidents often have two or three contributing causes that interact. Analysts who stop at the first plausible cause produce incomplete RCAs. The test: remove each cause and ask — would the full drop still exist?</div>
      </div>
      <div style={{ background: 'rgba(20,184,166,0.05)', border: '1.5px solid rgba(20,184,166,0.15)', borderRadius: 'var(--radius, 12px)', padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65 }}>Multi-level causal thinking is the senior skill in both RCA and experiment analysis. When a primary metric moves unexpectedly in an A/B test, the cause is often a combination of an interaction effect, a novelty effect, and a segment composition shift — not a single clean explanation.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="pal-glow-pulse" style={{ padding: '0.65rem 1.5rem', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 'var(--radius, 12px)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
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
  rf07: Module_RF07,
  rf08: Module_RF08,
  rf09: Module_RF09,
  rf10: Module_RF10,
  rf11: Module_RF11,
  rf12: Module_RF12,
};

// ── Runner shell ────────────────────────────────────────────────────────────
export function RCAFoundationsRunner({ moduleId, onBack, onNext, unlocked, onSelectModule }) {
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

  const completedMap = getAllRCAFoundationProgress();

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '1.5rem 1rem', width: '100%', boxSizing: 'border-box', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

      {/* ── Right nav sidebar ── */}
      <div className="pal-foundation-nav" style={{
        width: '190px', flexShrink: 0, order: 2,
        position: 'sticky', top: '1rem',
        maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '0.75rem 0.5rem',
      }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '0 0.4rem', marginBottom: '0.5rem' }}>
          RCA Foundations
        </div>
        {rcaFoundationModules.map((m) => {
          const isCurrent = m.id === moduleId;
          const isDone = !!completedMap[m.id];
          const isLocked = !m.isFree && !unlocked;
          return (
            <button
              key={m.id}
              onClick={() => !isLocked && onSelectModule && onSelectModule(m.id)}
              style={{
                display: 'flex', alignItems: 'baseline', gap: '0.35rem',
                width: '100%', textAlign: 'left',
                padding: '0.28rem 0.4rem', borderRadius: '5px', border: 'none',
                background: isCurrent ? 'var(--teal-bg)' : 'transparent',
                color: isCurrent ? 'var(--teal)' : isLocked ? 'var(--text-muted)' : isDone ? 'var(--teal)' : 'var(--text)',
                fontSize: '0.75rem', lineHeight: 1.4,
                cursor: isLocked ? 'default' : 'pointer',
                opacity: isLocked ? 0.55 : 1,
                marginBottom: '0.1rem',
                fontWeight: isCurrent ? 700 : 400,
              }}
              title={isLocked ? 'Unlock to access' : m.title}
            >
              <span style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontSize: '0.68rem', color: isCurrent ? 'var(--teal)' : 'var(--text-muted)', minWidth: '1.4rem' }}>{m.index}.</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{isLocked ? '🔒 ' : isDone && !isCurrent ? '✓ ' : ''}{m.title}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main content column ── */}
      <div style={{ flex: 1, minWidth: 0, order: 1 }}>
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
        <div className="pal-reveal-in" style={{ marginTop: '1.75rem' }}>
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

          <button onClick={onNext} className="pal-glow-pulse" style={{
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
      </div>{/* end main content column */}
    </div>
  );
}
