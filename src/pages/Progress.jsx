import { getScoreLevel } from '../utils/scoring.js';
import { clearProgress } from '../utils/progress.js';

function ScoreBar({ scoreKey }) {
  const level = getScoreLevel(scoreKey);
  return (
    <span style={{
      fontSize: '0.72rem', fontWeight: 700,
      color: level.color, background: level.bg,
      border: `1px solid ${level.border}`,
      borderRadius: '4px', padding: '0.2rem 0.45rem',
    }}>
      {level.label}
    </span>
  );
}

export function Progress({ scenarios, allProgress, onSelect, onClear }) {
  const completed = scenarios.filter(s => allProgress[s.id]?.attempts?.length > 0);
  const notStarted = scenarios.filter(s => !allProgress[s.id]?.attempts?.length);
  const totalAttempts = Object.values(allProgress).reduce((sum, p) => sum + (p.attempts?.length || 0), 0);

  function handleClear() {
    if (window.confirm('Clear all progress? This cannot be undone.')) {
      clearProgress();
      onClear();
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            Practice Log
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
            {completed.length} of {scenarios.length} scenarios completed · {totalAttempts} total attempts
          </p>
        </div>
        {totalAttempts > 0 && (
          <button
            onClick={handleClear}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: '5px', padding: '0.35rem 0.75rem',
              color: 'var(--text-dim)', fontSize: '0.8rem', cursor: 'pointer',
            }}
          >
            Clear Progress
          </button>
        )}
      </div>

      {totalAttempts === 0 && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
          padding: '3rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No completed scenarios yet.</div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
            Head to the Scenario Browser to start your first review.
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Completed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {completed.map(scenario => {
              const progress = allProgress[scenario.id];
              return (
                <div
                  key={scenario.id}
                  onClick={() => onSelect(scenario.id)}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '0.875rem 1.1rem',
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '0.75rem',
                    transition: 'border-color 0.15s',
                    boxShadow: 'var(--shadow)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--green)' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{scenario.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                        {progress.attempts.length} attempt{progress.attempts.length !== 1 ? 's' : ''} ·
                        Last: {new Date(progress.lastAttemptAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ScoreBar scoreKey={progress.bestScore} />
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>best</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {notStarted.length > 0 && totalAttempts > 0 && (
        <div>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Not Started ({notStarted.length})
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {notStarted.map(s => (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border-subtle)',
                  borderRadius: '6px', padding: '0.4rem 0.75rem',
                  color: 'var(--text-dim)', fontSize: '0.8rem', cursor: 'pointer',
                }}
              >{s.title}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
