import { DifficultyBadge, IndustryBadge, ThemeBadge } from '../ui/Badge.jsx';
import { getScoreLevel } from '../../utils/scoring.js';

export function ScenarioCard({ scenario, progress, onClick, unlocked }) {
  const isLocked = !scenario.isFree && !unlocked;
  const isCompleted = progress && progress.attempts?.length > 0;
  const bestScore = progress?.bestScore;
  const scoreLevel = bestScore ? getScoreLevel(bestScore) : null;

  return (
    <div
      onClick={() => !isLocked && onClick(scenario.id)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1.1rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
        opacity: isLocked ? 0.65 : 1,
        boxShadow: 'var(--shadow)',
      }}
      onMouseEnter={e => { if (!isLocked) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-bg)'; } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem', gap: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}
            {isCompleted && !isLocked && <span style={{ fontSize: '0.75rem', color: 'var(--green)' }}>✓</span>}
            <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text)' }}>{scenario.title}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {scenario.subtitle}
          </div>
        </div>
        {scoreLevel && isCompleted && (
          <div style={{
            flexShrink: 0,
            fontSize: '0.68rem',
            fontWeight: 700,
            color: scoreLevel.color,
            background: scoreLevel.bg,
            border: `1px solid ${scoreLevel.border}`,
            borderRadius: '4px',
            padding: '0.2rem 0.45rem',
            whiteSpace: 'nowrap',
          }}>
            {scoreLevel.shortLabel}
          </div>
        )}
        {!scenario.isFree && !isLocked && (
          <span style={{ fontSize: '0.65rem', color: 'var(--green)', fontWeight: 700, background: 'var(--green-bg)', border: '1px solid var(--green-border)', borderRadius: '4px', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap' }}>
            BETA
          </span>
        )}
        {scenario.isFree && (
          <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '4px', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap' }}>
            FREE
          </span>
        )}
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.6rem' }}>
        <DifficultyBadge difficulty={scenario.difficulty} />
        <IndustryBadge industry={scenario.industry} />
        <ThemeBadge theme={scenario.theme} />
      </div>

      {isCompleted && (
        <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          {progress.attempts.length} attempt{progress.attempts.length !== 1 ? 's' : ''} · Best: {scoreLevel?.label || bestScore}
        </div>
      )}
    </div>
  );
}
