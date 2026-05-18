import { getScoreLevel } from '../../utils/scoring.js';

export function ScoreReveal({ scoreKey, decisionLabel }) {
  const level = getScoreLevel(scoreKey);

  return (
    <div style={{
      background: level.bg,
      border: `2px solid ${level.border}`,
      borderRadius: '10px', padding: '1.25rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
        Your Decision Level
      </div>
      <div style={{
        fontSize: '1.6rem', fontWeight: 800, color: level.color,
        letterSpacing: '-0.02em', marginBottom: '0.25rem',
      }}>
        {level.label}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        You chose: <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{decisionLabel}"</span>
      </div>
      <div style={{ fontSize: '0.82rem', color: level.color, opacity: 0.85, lineHeight: 1.5 }}>
        {level.description}
      </div>
    </div>
  );
}
