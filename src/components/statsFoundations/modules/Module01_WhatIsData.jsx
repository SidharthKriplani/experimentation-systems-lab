import { useState, useMemo } from 'react';

const VARIABLES = [
  { id: 'purchases', label: 'Number of purchases', correct: 'numerical', subtype: 'discrete' },
  { id: 'country', label: "User's country", correct: 'categorical', subtype: null },
  { id: 'session', label: 'Session length (seconds)', correct: 'numerical', subtype: 'continuous' },
  { id: 'premium', label: 'Premium/free status', correct: 'categorical', subtype: null },
  { id: 'revenue', label: 'Revenue per order ($)', correct: 'numerical', subtype: 'continuous' },
  { id: 'appversion', label: 'App version (1.0, 2.0…)', correct: 'categorical', subtype: null },
  { id: 'friends', label: 'Number of friends', correct: 'numerical', subtype: 'discrete' },
  { id: 'gender', label: 'Gender', correct: 'categorical', subtype: null },
];

export function Module01_WhatIsData({ module, onNext }) {
  const [placements, setPlacements] = useState({}); // id -> 'numerical' | 'categorical'
  const [checked, setChecked] = useState(false);

  const unplaced = VARIABLES.filter(v => !placements[v.id]);
  const numerical = VARIABLES.filter(v => placements[v.id] === 'numerical');
  const categorical = VARIABLES.filter(v => placements[v.id] === 'categorical');

  const allPlaced = unplaced.length === 0;

  const score = useMemo(() => {
    if (!checked) return null;
    return VARIABLES.filter(v => placements[v.id] === v.correct).length;
  }, [checked, placements]);

  const numericalAllCorrect = checked && numerical.every(v => v.correct === 'numerical');

  function toggle(varId) {
    if (checked) return;
    setPlacements(prev => {
      const current = prev[varId];
      if (!current) return { ...prev, [varId]: 'numerical' };
      if (current === 'numerical') return { ...prev, [varId]: 'categorical' };
      const next = { ...prev };
      delete next[varId];
      return next;
    });
  }

  function handleCheck() {
    if (allPlaced) setChecked(true);
  }

  function handleReset() {
    setPlacements({});
    setChecked(false);
  }

  const cardStyle = (varObj) => {
    const placed = placements[varObj.id];
    let bg = 'var(--surface)';
    let border = 'var(--border)';
    let color = 'var(--text)';

    if (checked) {
      const correct = placed === varObj.correct;
      bg = correct ? 'var(--green-bg)' : 'var(--red-bg)';
      border = correct ? 'var(--green-border)' : 'var(--red-border)';
      color = correct ? 'var(--green-text)' : 'var(--red-text)';
    } else if (placed) {
      bg = placed === 'numerical' ? 'var(--accent-bg)' : 'var(--purple-bg)';
      border = placed === 'numerical' ? 'var(--accent-border)' : 'var(--purple-border)';
      color = placed === 'numerical' ? 'var(--accent)' : 'var(--purple)';
    }

    return {
      padding: '0.5rem 0.85rem',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${border}`,
      background: bg,
      color,
      fontSize: '0.82rem',
      fontWeight: 500,
      cursor: checked ? 'default' : 'pointer',
      userSelect: 'none',
      transition: 'all 0.18s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    };
  };

  const zoneStyle = (type) => ({
    flex: 1,
    minHeight: 140,
    borderRadius: 'var(--radius)',
    border: `2px dashed ${type === 'numerical' ? 'var(--accent-border)' : 'var(--purple-border)'}`,
    background: type === 'numerical' ? 'var(--accent-bg)' : 'var(--purple-bg)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Explanation */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>
        {module?.subtitle || 'Data comes in two fundamental types: numerical (you can do math on it) and categorical (it describes a group).'}{' '}
        Every experiment metric is a numerical variable measured on each user — but knowing the type shapes how you summarize and test it.
      </p>

      {/* Instructions */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text)' }}>How to play:</strong> Click a variable card to cycle it through Unplaced → Numerical → Categorical → Unplaced. Place all 8, then hit Check.
        </p>
      </div>

      {/* Unplaced pool */}
      {unplaced.length > 0 && (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
            Unplaced Variables
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {unplaced.map(v => (
              <span key={v.id} style={cardStyle(v)} onClick={() => toggle(v.id)}>{v.label}</span>
            ))}
          </div>
        </div>
      )}

      {/* Drop zones */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={zoneStyle('numerical')}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Numerical
          </div>
          {numerical.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>Click variables to place them here</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {numerical.map(v => (
              <span key={v.id} style={cardStyle(v)} onClick={() => toggle(v.id)}>
                {checked && v.correct === 'numerical' ? '✓ ' : checked ? '✗ ' : ''}{v.label}
                {checked && numericalAllCorrect && v.correct === 'numerical' && v.subtype && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 400, opacity: 0.8 }}> ({v.subtype})</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div style={zoneStyle('categorical')}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Categorical
          </div>
          {categorical.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>Click variables to place them here</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categorical.map(v => (
              <span key={v.id} style={cardStyle(v)} onClick={() => toggle(v.id)}>
                {checked && v.correct === 'categorical' ? '✓ ' : checked ? '✗ ' : ''}{v.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Score feedback */}
      {checked && (
        <div style={{
          background: score === 8 ? 'var(--green-bg)' : 'var(--yellow-bg)',
          border: `1.5px solid ${score === 8 ? 'var(--green-border)' : 'var(--yellow-border)'}`,
          borderRadius: 'var(--radius)',
          padding: '1rem 1.25rem',
          fontSize: '0.9rem',
          color: score === 8 ? 'var(--green-text)' : 'var(--yellow-text)',
          fontWeight: 500,
        }}>
          {score === 8
            ? 'Perfect! All 8 correct. Notice the numerical ones split into discrete (countable integers) and continuous (any real value).'
            : `${score}/8 correct. The blue ones got flipped — App version looks numerical but it labels categories with no true order. Click to rearrange, then re-check.`}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={handleCheck}
          disabled={!allPlaced || checked}
          style={{
            padding: '0.55rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: allPlaced && !checked ? 'var(--accent)' : 'var(--border)',
            color: allPlaced && !checked ? '#fff' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: allPlaced && !checked ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s',
          }}
        >
          Check answers
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text-muted)',
            fontWeight: 500,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      {/* Key Insight */}
      <div style={{ background: 'var(--yellow-bg)', border: '1.5px solid var(--yellow-border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--yellow-text)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--yellow-text)', lineHeight: 1.6 }}>
          {module?.keyInsight || 'Variable type determines everything downstream: what summary stats make sense, what test to run, and how to interpret results. App version looks like a number — but 2.0 is not "twice" 1.0. Always ask: does arithmetic make sense on this variable?'}
        </div>
      </div>

      {/* Connection */}
      <div style={{ background: 'var(--accent-bg)', border: '1.5px solid var(--accent-border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {module?.connection || 'When you pick a primary metric for an A/B test, you are choosing a numerical variable. The type (discrete vs continuous) affects your sample size calculation and which statistical test is appropriate.'}
        </div>
      </div>

      {/* Next */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onNext}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: 'var(--yellow)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          Next concept →
        </button>
      </div>
    </div>
  );
}
