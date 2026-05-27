import { useState, useEffect } from 'react';
import { metricsFoundationModules } from '../../data/metricsFoundationModules.js';
import { saveMetricsFoundationProgress, getMetricsFoundationProgress } from '../../utils/metricsFoundationProgress.js';
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

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function InsightBox({ label, color, bg, border, children }) {
  return (
    <div style={{ background: bg, border: '1.5px solid ' + border, borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{label}</div>
      <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function NextBtn({ onClick, label }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
      <button onClick={onClick} style={{
        padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-sm)', border: 'none',
        background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
      }}>{label || 'Next concept →'}</button>
    </div>
  );
}

function MCQOption({ label, selected, correct, revealed, onClick }) {
  let bg = 'var(--surface)', border = 'var(--border)', color = 'var(--text)';
  if (revealed) {
    if (correct) { bg = 'var(--green-bg)'; border = 'var(--green-border)'; color = 'var(--green)'; }
    else if (selected) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
  } else if (selected) { bg = 'var(--accent-bg)'; border = 'var(--accent)'; color = 'var(--accent)'; }
  return (
    <button onClick={onClick} disabled={revealed} style={{
      display: 'block', width: '100%', textAlign: 'left',
      padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + border,
      background: bg, color, fontSize: '0.88rem', cursor: revealed ? 'default' : 'pointer',
      fontWeight: selected || (revealed && correct) ? 600 : 400, transition: 'all 0.15s',
    }}>{label}</button>
  );
}

// ─── Module 1: Metrics Hierarchy ─────────────────────────────────────────────

const HIERARCHY_ITEMS = [
  { id: 'dau',        label: 'Daily Active Users (Facebook)',       correct: 'north-star' },
  { id: 'session',    label: 'Avg session depth per user',          correct: 'l1' },
  { id: 'feed-ctr',   label: 'Feed click-through rate',             correct: 'l2' },
  { id: 'latency',    label: 'p99 API latency',                     correct: 'guardrail' },
  { id: 'stories',    label: 'Stories completion rate',             correct: 'l2' },
  { id: 'support',    label: 'Support contact rate',                correct: 'guardrail' },
  { id: 'mau',        label: 'Monthly Active Users (Facebook)',     correct: 'l1' },
  { id: 'notif-ctr',  label: 'Push notification CTR',              correct: 'l2' },
];

const TIERS = [
  { id: 'north-star', label: 'North Star',  color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
  { id: 'l1',         label: 'L1 Supporting', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  { id: 'l2',         label: 'L2 Operational', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
  { id: 'guardrail',  label: 'Guardrail',    color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
];

function Module_MF01({ module, onNext }) {
  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);

  const allPlaced = HIERARCHY_ITEMS.every(i => placements[i.id]);
  const score = checked ? HIERARCHY_ITEMS.filter(i => placements[i.id] === i.correct).length : null;

  function cycle(id) {
    if (checked) return;
    const tiers = TIERS.map(t => t.id);
    const cur = placements[id];
    const idx = tiers.indexOf(cur);
    const next = tiers[(idx + 1) % tiers.length];
    setPlacements(prev => ({ ...prev, [id]: next }));
  }

  function itemStyle(item) {
    const tier = TIERS.find(t => t.id === placements[item.id]);
    let bg = 'var(--surface-2)', border = 'var(--border)', color = 'var(--text-muted)';
    if (checked) {
      const ok = placements[item.id] === item.correct;
      bg = ok ? 'var(--green-bg)' : 'var(--red-bg)';
      border = ok ? 'var(--green-border)' : 'var(--red-border)';
      color = ok ? 'var(--green)' : 'var(--red)';
    } else if (tier) {
      bg = tier.bg; border = tier.border; color = tier.color;
    }
    return { padding: '0.45rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + border, background: bg, color, fontSize: '0.82rem', fontWeight: 500, cursor: checked ? 'default' : 'pointer', userSelect: 'none', transition: 'all 0.15s' };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        Every product has a <strong>metrics hierarchy</strong>: a single North Star that captures delivered value,
        L1 metrics that explain <em>why</em> it moves, L2 metrics that pinpoint <em>where</em>,
        and guardrails that protect what you must not break.
      </p>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.85rem 1.1rem' }}>
        <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text)' }}>Exercise:</strong> Click each metric to cycle it through the four tiers.
          Place all 8 correctly, then hit Check.
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
          {TIERS.map(t => (
            <span key={t.id} style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', background: t.bg, color: t.color, border: '1px solid ' + t.border }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {HIERARCHY_ITEMS.map(item => (
          <span key={item.id} style={itemStyle(item)} onClick={() => cycle(item.id)}>
            {checked && (placements[item.id] === item.correct ? '✓ ' : '✗ ')}
            {item.label}
            {placements[item.id] && !checked && (
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginLeft: '0.3rem' }}>
                [{TIERS.find(t => t.id === placements[item.id])?.label}]
              </span>
            )}
          </span>
        ))}
      </div>
      {checked && (
        <div style={{ background: score === 8 ? 'var(--green-bg)' : 'var(--yellow-bg)', border: '1.5px solid ' + (score === 8 ? 'var(--green-border)' : 'var(--yellow-border)'), borderRadius: 'var(--radius)', padding: '0.85rem 1.1rem', fontSize: '0.88rem', color: score === 8 ? 'var(--green)' : 'var(--yellow-text)', fontWeight: 500 }}>
          {score === 8 ? 'Perfect. L2 metrics (feed CTR, stories completion, push CTR) are experiment targets. L1s (session depth, MAU) are the explanatory layer. DAU is the North Star — too slow for experiments but the ultimate scorecard.' : score + '/8. Key: latency and support contacts are guardrails (protect, don\'t optimise). MAU is L1 — it explains DAU but doesn\'t replace it.'}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={() => allPlaced && !checked && setChecked(true)} disabled={!allPlaced || checked} style={{ padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: allPlaced && !checked ? 'var(--accent)' : 'var(--border)', color: allPlaced && !checked ? '#fff' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', cursor: allPlaced && !checked ? 'pointer' : 'not-allowed' }}>Check answers</button>
        <button onClick={() => { setPlacements({}); setChecked(false); }} style={{ padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer' }}>Reset</button>
      </div>
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} />
    </div>
  );
}

// ─── Module 2: What Makes a Good Metric? ────────────────────────────────────

const METRIC_QUALITIES = [
  { id: 'csat',    label: 'Customer satisfaction score (survey, weekly)',     fails: ['movable'],       reason: 'Too slow, too noisy, and self-selection bias. Hard to move significantly in a 2-week test.' },
  { id: 'dau',     label: 'DAU',                                              fails: [],                reason: 'Strong North Star candidate — measurable, somewhat movable, predictive of long-term value, hard to game at scale.' },
  { id: 'installs', label: 'App install count',                               fails: ['predictive'],    reason: 'Easily gamed (incentivised installs). Install does not equal active user or value delivery.' },
  { id: 'ltv',     label: '12-month LTV',                                     fails: ['movable'],       reason: 'Excellent for strategy but too lagging for an A/B test primary metric — need 12 months to observe.' },
  { id: 'stories', label: 'Stories completion rate (% who finish a story)',   fails: [],                reason: 'Good proxy metric — measurable, sensitive, predictive of re-engagement, hard to game without degrading UX.' },
];

const QUALITY_CRITERIA = [
  { id: 'measurable',  label: 'Measurable',  desc: 'Can observe it reliably without noise' },
  { id: 'movable',     label: 'Movable',     desc: 'A product change can shift it in days/weeks' },
  { id: 'predictive',  label: 'Predictive',  desc: 'Moving it predicts actual user value' },
  { id: 'trustworthy', label: 'Trustworthy', desc: 'Hard to game without real improvement' },
];

function Module_MF02({ module, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const Q = {
    question: 'A PM proposes using "App install count" as the primary metric for a feature that improves new-user onboarding. What is the strongest objection?',
    options: [
      { id: 'a', text: 'It is not measurable — install data is unreliable across platforms.' },
      { id: 'b', text: 'It is not predictive — an install does not mean a user received value. It can be inflated by incentivised campaigns without any real onboarding improvement.' },
      { id: 'c', text: 'It is not movable — a product change cannot affect install counts.' },
      { id: 'd', text: 'It is not trustworthy — engineering teams will manipulate the data.' },
    ],
    correct: 'b',
    explanation: 'Installs are measurable and movable (run an ad campaign, installs spike). The failure mode is predictiveness — an install does not mean a user opened the app, completed onboarding, or derived any value. Any campaign that drives low-quality installs will move the metric without improving the underlying outcome.',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        A metric is only useful if it has four properties: it must be <strong>measurable</strong> (observable, low noise),
        <strong> movable</strong> (a product change can shift it), <strong>predictive</strong> (moving it means users are better off),
        and <strong>trustworthy</strong> (hard to game without real improvement). Most bad metrics fail on predictiveness or trustworthiness.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '0.5rem' }}>
        {QUALITY_CRITERIA.map(c => (
          <div key={c.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)' }}>{c.label}</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{Q.question}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {Q.options.map(opt => (
            <MCQOption key={opt.id} label={opt.text} selected={selected === opt.id} correct={opt.id === Q.correct} revealed={answered} onClick={() => !answered && setSelected(opt.id)} />
          ))}
        </div>
        {selected && !answered && (
          <button onClick={() => setAnswered(true)} style={{ marginTop: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Submit</button>
        )}
        {answered && (
          <div style={{ marginTop: '0.75rem', background: selected === Q.correct ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (selected === Q.correct ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            <strong>{selected === Q.correct ? '✓ Correct. ' : '✗ Not quite. '}</strong>{Q.explanation}
          </div>
        )}
      </div>
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} />
    </div>
  );
}

// ─── Module 3: Ratio Metrics ─────────────────────────────────────────────────

function Module_MF03({ module, onNext }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const Q = {
    question: 'Overall CVR fell from 4.2% to 3.9% after a redesign. But desktop CVR rose (4.1%→4.5%) and mobile CVR rose (2.8%→3.2%). How is this possible?',
    options: [
      { id: 'a', text: 'Data pipeline error — the numbers cannot all be correct simultaneously.' },
      { id: 'b', text: 'Simpson\'s Paradox: the mix shifted toward mobile (lower CVR channel), so blended CVR fell even though each segment improved.' },
      { id: 'c', text: 'The primary metric is calculated incorrectly — numerator and denominator are swapped.' },
      { id: 'd', text: 'The redesign only went live on a subset of users, creating sample contamination.' },
    ],
    correct: 'b',
    explanation: 'If desktop was 30% of traffic before and 20% after, and mobile was 70% before and 80% after, the blended CVR will fall — even with both segments improving. The denominator mix changed. This is why you always decompose a ratio change into: (a) did each segment improve? (b) did the mix shift? Both can happen simultaneously.',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {step === 0 && (
        <>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
            Ratio metrics — CVR, CTR, retention rate — are attractive because they normalise for volume. But they hide a trap:
            <strong> the denominator can change composition</strong> independently of any product change, making the ratio move in a misleading direction.
          </p>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem 1.1rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '0.88rem' }}>The Anatomy of a Ratio Metric</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
              {[
                { label: 'Numerator', desc: 'The outcome (conversions, clicks)', color: 'var(--green)' },
                { label: 'Denominator', desc: 'The exposure (sessions, users)', color: 'var(--accent)' },
                { label: 'Mix', desc: 'Who makes up the denominator', color: 'var(--purple)' },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: item.color }}>{item.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              When diagnosing a ratio change: check numerator, check denominator absolute counts, then check <em>mix of denominator</em> across segments.
            </p>
          </div>
          <button onClick={() => setStep(1)} style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>See the paradox →</button>
        </>
      )}
      {step >= 1 && (
        <>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{Q.question}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {Q.options.map(opt => (
                <MCQOption key={opt.id} label={opt.text} selected={selected === opt.id} correct={opt.id === Q.correct} revealed={answered} onClick={() => !answered && setSelected(opt.id)} />
              ))}
            </div>
            {selected && !answered && (
              <button onClick={() => setAnswered(true)} style={{ marginTop: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Submit</button>
            )}
            {answered && (
              <div style={{ marginTop: '0.75rem', background: selected === Q.correct ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (selected === Q.correct ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong>{selected === Q.correct ? '✓ Correct. ' : '✗ Not quite. '}</strong>{Q.explanation}
              </div>
            )}
          </div>
          <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
          <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
          <NextBtn onClick={onNext} />
        </>
      )}
    </div>
  );
}

// ─── Module 4: Metric Decomposition ──────────────────────────────────────────

const DECOMP_OPTIONS = ['New users', 'Retained users', 'Resurrected users', 'Churned users', 'Power users', 'Organic users'];
const DECOMP_CORRECT = ['New users', 'Retained users', 'Resurrected users'];

function Module_MF04({ module, onNext }) {
  const [picked, setPicked] = useState([]);
  const [checked, setChecked] = useState(false);

  function toggle(opt) {
    if (checked) return;
    setPicked(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  }

  const correct = picked.length === 3 && DECOMP_CORRECT.every(c => picked.includes(c));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        Decomposition converts a single number into a set of drivers with different root causes and interventions.
        When a top-line metric moves, your first question is: <em>which component drove it?</em>
      </p>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
          DAU can be decomposed as the sum of three user segments. Select the three correct components:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.5rem' }}>
          {DECOMP_OPTIONS.map(opt => {
            const sel = picked.includes(opt);
            const isCorrect = DECOMP_CORRECT.includes(opt);
            let bg = sel ? 'var(--accent-bg)' : 'var(--surface)', border = sel ? 'var(--accent)' : 'var(--border)', color = sel ? 'var(--accent)' : 'var(--text-muted)';
            if (checked) {
              if (isCorrect) { bg = 'var(--green-bg)'; border = 'var(--green-border)'; color = 'var(--green)'; }
              else if (sel) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
            }
            return (
              <button key={opt} onClick={() => toggle(opt)} style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + border, background: bg, color, fontSize: '0.83rem', fontWeight: sel ? 600 : 400, cursor: checked ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                {checked && isCorrect ? '✓ ' : checked && sel ? '✗ ' : ''}{opt}
              </button>
            );
          })}
        </div>
        {picked.length === 3 && !checked && (
          <button onClick={() => setChecked(true)} style={{ marginTop: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Check</button>
        )}
        {checked && (
          <div style={{ marginTop: '0.75rem', background: correct ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (correct ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {correct
              ? '✓ Correct. DAU = New + Retained + Resurrected. A DAU drop is a very different problem depending on which component fell: acquisition issue vs retention problem vs re-engagement gap.'
              : '✗ The three components are New, Retained, and Resurrected users. "Churned" is the subtraction that gets you from yesterday\'s DAU to tomorrow\'s — it\'s a driver of change, not a component of today\'s DAU.'}
          </div>
        )}
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>LTV Decomposition</div>
        <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          LTV = ARPU \xd7 Avg lifespan = (Revenue per transaction \xd7 Transactions per month) \xd7 (1 / Churn rate)<br />
          This decomposition tells you whether an LTV improvement requires raising price, increasing purchase frequency, or reducing churn — three different product and pricing strategies.
        </div>
      </div>
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} />
    </div>
  );
}

// ─── Module 5: Counter Metrics ────────────────────────────────────────────────

const COUNTER_PAIRS = [
  { primary: 'Push notification send volume', correct: 'notif-opt-out', options: ['notif-opt-out', 'dau', 'session-length'], labels: { 'notif-opt-out': 'Notification opt-out rate', 'dau': 'DAU', 'session-length': 'Session length' } },
  { primary: 'Ads shown per session', correct: 'ad-hide', options: ['ad-hide', 'page-load', 'revenue'], labels: { 'ad-hide': 'Ad hide / negative feedback rate', 'page-load': 'Page load time', 'revenue': 'Ad revenue' } },
  { primary: 'Search ranking aggressiveness (more results)', correct: 'zero-click', options: ['zero-click', 'query-count', 'ctr'], labels: { 'zero-click': 'Zero-click rate (query abandoned)', 'query-count': 'Total search queries', 'ctr': 'Result click-through rate' } },
];

function Module_MF05({ module, onNext }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const allAnswered = COUNTER_PAIRS.every((_, i) => answers[i] !== undefined);
  const score = checked ? COUNTER_PAIRS.filter((p, i) => answers[i] === p.correct).length : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        Every metric you optimise creates pressure to sacrifice something else.
        <strong> Counter metrics</strong> make that tradeoff explicit before an experiment ships.
        For each primary metric below, select its most important counter metric:
      </p>
      {COUNTER_PAIRS.map((pair, i) => (
        <div key={i} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Primary metric</div>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.6rem' }}>{pair.primary}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {pair.options.map(opt => {
              const sel = answers[i] === opt;
              const isCorrect = opt === pair.correct;
              let bg = sel ? 'var(--accent-bg)' : 'var(--surface)', border = sel ? 'var(--accent)' : 'var(--border)', color = sel ? 'var(--accent)' : 'var(--text-muted)';
              if (checked) {
                if (isCorrect) { bg = 'var(--green-bg)'; border = 'var(--green-border)'; color = 'var(--green)'; }
                else if (sel) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
              }
              return (
                <button key={opt} onClick={() => !checked && setAnswers(prev => ({ ...prev, [i]: opt }))} style={{ padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + border, background: bg, color, fontSize: '0.83rem', fontWeight: sel ? 600 : 400, cursor: checked ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  {checked && isCorrect ? '✓ ' : checked && sel ? '✗ ' : ''}{pair.labels[opt]}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {allAnswered && !checked && (
        <button onClick={() => setChecked(true)} style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Check answers</button>
      )}
      {checked && (
        <div style={{ background: score === 3 ? 'var(--green-bg)' : 'var(--yellow-bg)', border: '1px solid ' + (score === 3 ? 'var(--green-border)' : 'var(--yellow-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {score === 3 ? '✓ All correct. Opt-out rate catches notification fatigue. Ad hide rate catches ad quality degradation. Zero-click rate catches search quality degradation.' : score + '/3. Counter metrics protect the quality of the user experience that isn\'t captured in the primary optimisation signal.'}
        </div>
      )}
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} />
    </div>
  );
}

// ─── Module 6: Leading vs Lagging ────────────────────────────────────────────

const LEADING_ITEMS = [
  { id: 'rev',      label: 'Monthly revenue',                    correct: 'lagging',  reason: 'Confirms past performance. No signal about what drove it or what\'s coming.' },
  { id: 'd7ret',    label: 'D7 retention rate',                  correct: 'leading',  reason: 'Predicts LTV and long-term DAU trajectory. Fast-moving and sensitive.' },
  { id: 'sub',      label: 'Total subscriber count',             correct: 'lagging',  reason: 'Accumulates over time. Slow to reflect product changes.' },
  { id: 'onboard',  label: 'Onboarding completion rate',         correct: 'leading',  reason: 'Predicts new user activation and early retention. Moves in days.' },
  { id: 'nps',      label: 'Net Promoter Score (quarterly)',      correct: 'lagging',  reason: 'Survey-based, infrequent, and reflects cumulative experience — not current product state.' },
  { id: 'act',      label: 'Actions taken in first session',     correct: 'leading',  reason: 'Strong early signal of engagement depth and eventual retention.' },
];

function Module_MF06({ module, onNext }) {
  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);

  const allPlaced = LEADING_ITEMS.every(i => placements[i.id]);
  const score = checked ? LEADING_ITEMS.filter(i => placements[i.id] === i.correct).length : null;

  function cycle(id) {
    if (checked) return;
    setPlacements(prev => {
      const cur = prev[id];
      if (!cur) return { ...prev, [id]: 'leading' };
      if (cur === 'leading') return { ...prev, [id]: 'lagging' };
      const n = { ...prev }; delete n[id]; return n;
    });
  }

  function chipStyle(item) {
    const placed = placements[item.id];
    let bg = 'var(--surface-2)', border = 'var(--border)', color = 'var(--text-muted)';
    if (checked) {
      const ok = placed === item.correct;
      bg = ok ? 'var(--green-bg)' : 'var(--red-bg)'; border = ok ? 'var(--green-border)' : 'var(--red-border)'; color = ok ? 'var(--green)' : 'var(--red)';
    } else if (placed === 'leading') { bg = 'var(--accent-bg)'; border = 'var(--accent-border)'; color = 'var(--accent)'; }
    else if (placed === 'lagging') { bg = 'var(--purple-bg)'; border = 'var(--purple-border)'; color = 'var(--purple)'; }
    return { padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + border, background: bg, color, fontSize: '0.82rem', fontWeight: placed || checked ? 600 : 400, cursor: checked ? 'default' : 'pointer', userSelect: 'none', transition: 'all 0.15s', display: 'inline-block' };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        <strong>Leading indicators</strong> move before the outcome — they predict. <strong>Lagging indicators</strong> confirm after — they report.
        The best experiment primary metrics are leading: fast, sensitive, and predictive of the lagging outcome you ultimately care about.
      </p>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.85rem 1.1rem' }}>
        <p style={{ margin: '0 0 0.6rem', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Exercise:</strong> Click each metric to label it <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Leading</span> or <span style={{ color: 'var(--purple)', fontWeight: 600 }}>Lagging</span>. Click again to toggle, or a third time to clear.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {LEADING_ITEMS.map(item => (
            <span key={item.id} style={chipStyle(item)} onClick={() => cycle(item.id)}>
              {checked && (placements[item.id] === item.correct ? '✓ ' : '✗ ')}
              {item.label}
              {placements[item.id] && !checked && <span style={{ fontSize: '0.7rem', opacity: 0.75, marginLeft: '0.3rem' }}>[{placements[item.id]}]</span>}
            </span>
          ))}
        </div>
      </div>
      {checked && (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.85rem 1.1rem' }}>
          {LEADING_ITEMS.map(item => (
            <div key={item.id} style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', lineHeight: 1.5 }}>
              <strong style={{ color: placements[item.id] === item.correct ? 'var(--green)' : 'var(--red)' }}>
                {item.label}
              </strong>{' — '}{item.reason}
            </div>
          ))}
        </div>
      )}
      {allPlaced && !checked && (
        <button onClick={() => setChecked(true)} style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Check answers</button>
      )}
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} />
    </div>
  );
}

// ─── Module 7: North Star Design ─────────────────────────────────────────────

function Module_MF07({ module, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const Q = {
    question: 'Spotify is choosing its North Star metric. Which candidate best captures delivered value to users — not extracted value for the company?',
    options: [
      { id: 'a', text: 'Monthly revenue per user — directly measures business health.' },
      { id: 'b', text: 'MAU — captures scale of the engaged user base.' },
      { id: 'c', text: 'Time spent listening per DAU — captures how much music value users are actually receiving.' },
      { id: 'd', text: 'Subscriber conversion rate — measures the paywall efficiency.' },
    ],
    correct: 'c',
    explanation: 'Revenue and conversion rate measure what Spotify extracts, not what users receive. MAU captures presence but not depth — a user who opens the app once counts. "Time spent listening per DAU" is strong because it directly measures the core value delivered (music listening) per engaged user. It is hard to inflate without genuinely improving the listening experience, and it correlates with retention and subscription. The weakness: it could be gamed by autoplay without user intent — which is why guardrails on skip rate and session exit matter.',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        A North Star metric should answer: <em>"Is the product delivering genuine value to users?"</em> — not "Is the company extracting revenue?"
        The best North Stars are behaviours that correlate with user value delivery, that are hard to inflate without real improvement, and that the whole company can reason about.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: '0.5rem' }}>
        {[
          { label: 'Captures user value', desc: 'What users get, not what company takes', good: true },
          { label: 'Hard to game', desc: 'Moving it requires real product improvement', good: true },
          { label: 'Company-wide clarity', desc: 'Every team understands what moving it means', good: true },
          { label: 'Lagging or extracted value', desc: 'Revenue, subs — result of value, not value itself', good: false },
        ].map(c => (
          <div key={c.label} style={{ background: c.good ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (c.good ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: c.good ? 'var(--green)' : 'var(--red)' }}>{c.good ? '✓ ' : '✗ '}{c.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{Q.question}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {Q.options.map(opt => (
            <MCQOption key={opt.id} label={opt.text} selected={selected === opt.id} correct={opt.id === Q.correct} revealed={answered} onClick={() => !answered && setSelected(opt.id)} />
          ))}
        </div>
        {selected && !answered && (
          <button onClick={() => setAnswered(true)} style={{ marginTop: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Submit</button>
        )}
        {answered && (
          <div style={{ marginTop: '0.75rem', background: selected === Q.correct ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (selected === Q.correct ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            <strong>{selected === Q.correct ? '✓ Correct. ' : '✗ Not quite. '}</strong>{Q.explanation}
          </div>
        )}
      </div>
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} label="Complete module →" />
    </div>
  );
}

// ─── Module 8: Metric Sensitivity ────────────────────────────────────────────

function Module_MF08({ module, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const Q = {
    question: 'A team is running an A/B test on checkout flow. Their primary metric is "revenue per user" (RPU), which has a standard deviation of $45 and a mean of $12. Their MDE is 5% lift ($0.60). After 4 weeks they have 50,000 users per arm and p=0.21. What is the most likely root cause?',
    options: [
      { id: 'a', text: 'The experiment was underpowered — 50K users per arm is too small for a metric with CV of 375% (SD/mean = $45/$12).' },
      { id: 'b', text: 'The treatment is ineffective — p=0.21 is decisive evidence of no effect.' },
      { id: 'c', text: 'Sample ratio mismatch — the unequal mean/SD ratio suggests allocation bias.' },
      { id: 'd', text: 'The wrong statistical test was used — RPU requires a non-parametric test.' },
    ],
    correct: 'a',
    explanation: 'A coefficient of variation (CV = SD/mean) of 375% means revenue is extremely noisy relative to its mean — most users spend $0, a few spend a lot. To detect a $0.60 lift (5%) with 80% power, you would need roughly (45 / 0.60)^2 \xd7 2 \xd7 7.85 ≈ 4.7 million users per arm, not 50K. p=0.21 is entirely consistent with the true effect existing but the test being massively underpowered. The fix: use a more sensitive metric (conversion rate, add-to-cart rate) as the primary, and validate against RPU in a longer holdout.',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.92rem' }}>
        A metric\'s <strong>sensitivity</strong> determines how large a sample you need to detect a real effect.
        High-variance metrics (revenue, time on site) require enormous samples. Low-variance proxies (conversion rate, clicks) detect effects faster —
        but only if they are causally linked to the outcome you care about.
      </p>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.83rem', marginBottom: '0.5rem' }}>Factors affecting metric sensitivity</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '0.4rem' }}>
          {[
            { factor: 'Lower variance', effect: 'Fewer users needed', dir: 'good' },
            { factor: 'Larger MDE', effect: 'Fewer users needed', dir: 'good' },
            { factor: 'Higher baseline rate', effect: 'Fewer users needed', dir: 'good' },
            { factor: 'Longer experiment', effect: 'More power (diminishing returns)', dir: 'neutral' },
            { factor: 'High-value outliers', effect: 'Inflates variance enormously', dir: 'bad' },
            { factor: 'Zero-inflated distribution', effect: 'CV explodes, sample grows', dir: 'bad' },
          ].map(f => (
            <div key={f.factor} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.55rem 0.75rem', fontSize: '0.78rem' }}>
              <div style={{ fontWeight: 600, color: f.dir === 'good' ? 'var(--green)' : f.dir === 'bad' ? 'var(--red)' : 'var(--text)' }}>{f.factor}</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }}>{f.effect}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{Q.question}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {Q.options.map(opt => (
            <MCQOption key={opt.id} label={opt.text} selected={selected === opt.id} correct={opt.id === Q.correct} revealed={answered} onClick={() => !answered && setSelected(opt.id)} />
          ))}
        </div>
        {selected && !answered && (
          <button onClick={() => setAnswered(true)} style={{ marginTop: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Submit</button>
        )}
        {answered && (
          <div style={{ marginTop: '0.75rem', background: selected === Q.correct ? 'var(--green-bg)' : 'var(--red-bg)', border: '1px solid ' + (selected === Q.correct ? 'var(--green-border)' : 'var(--red-border)'), borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            <strong>{selected === Q.correct ? '✓ Correct. ' : '✗ Not quite. '}</strong>{Q.explanation}
          </div>
        )}
      </div>
      <InsightBox label="Key Insight" color="var(--green)" bg="var(--green-bg)" border="var(--green-border)">{module.keyInsight}</InsightBox>
      <InsightBox label="Connects to Experiments" color="var(--accent)" bg="var(--accent-bg)" border="var(--accent-border)">{module.connection}</InsightBox>
      <NextBtn onClick={onNext} label="Complete module →" />
    </div>
  );
}

// ─── Module registry ──────────────────────────────────────────────────────────

const MODULE_COMPONENTS = {
  mf01: Module_MF01,
  mf02: Module_MF02,
  mf03: Module_MF03,
  mf04: Module_MF04,
  mf05: Module_MF05,
  mf06: Module_MF06,
  mf07: Module_MF07,
  mf08: Module_MF08,
};

// ─── Runner shell ─────────────────────────────────────────────────────────────

export function MetricsFoundationsRunner({ moduleId, onBack, onNext, unlocked }) {
  const module = metricsFoundationModules.find(m => m.id === moduleId);
  const [completed, setCompleted] = useState(() => !!getMetricsFoundationProgress(moduleId));
  const [note, setNote] = useState(() => getNotes('metrics-foundations', moduleId));

  useEffect(() => {
    setCompleted(!!getMetricsFoundationProgress(moduleId));
  }, [moduleId]);

  useEffect(() => { setNote(getNotes('metrics-foundations', moduleId)); }, [moduleId]);

  if (!module) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Module not found.</div>
  );

  const ModuleComponent = MODULE_COMPONENTS[moduleId];

  function handleNext() {
    saveMetricsFoundationProgress(moduleId);
    setCompleted(true);
    track('case_completed', { room: 'metrics-foundations', id: moduleId, title: module.title });
    if (onNext) onNext();
    else onBack();
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '1.5rem 1.25rem 3rem' }}>
      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          ← All modules
        </button>
        <span style={{ color: 'var(--border)', fontSize: '0.8rem' }}>|</span>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Module {module.index} of {metricsFoundationModules.length}</span>
        {completed && (
          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 4, background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid var(--green-border)' }}>✓ Complete</span>
        )}
      </div>

      {/* Module header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', margin: '0 0 0.3rem' }}>
          {module.index}. {module.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 0.75rem' }}>{module.subtitle}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{module.estimatedMin} min</span>
          {module.tags.slice(0, 4).map(tag => (
            <span key={tag} style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Module content */}
      {ModuleComponent ? (
        <ModuleComponent module={module} onNext={handleNext} />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Module content coming soon.
        </div>
      )}

      {/* Playbook links */}
      {module.playbookLinks && module.playbookLinks.length > 0 && (
        <div style={{ marginTop: '1.5rem', padding: '0.9rem 1.1rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
            Further reading
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {module.playbookLinks.map(link => (
              <span key={link.id} style={{ fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'default' }}>
                {link.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          My Notes
        </div>
        <textarea
          value={note}
          onChange={e => { setNote(e.target.value); saveNote('metrics-foundations', moduleId, e.target.value); }}
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
  );
}
