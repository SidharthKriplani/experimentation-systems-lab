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
        background: '#1a1d27',
        border: `1px solid ${isLocked ? '#2d3148' : isCompleted ? '#2d3148' : '#2d3148'}`,
        borderRadius: '8px',
        padding: '1.1rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
        opacity: isLocked ? 0.7 : 1,
      }}
      onMouseEnter={e => { if (!isLocked) e.currentTarget.style.borderColor = '#5b7fff'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d3148'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem', gap: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}
            {isCompleted && !isLocked && <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>✓</span>}
            <span style={{ fontWeight: 700, fontSize: '0.925rem', color: '#e8eaf0' }}>{scenario.title}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#8890a8', lineHeight: 1.4 }}>
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
          <span style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 700, background: '#0d2e1a', border: '1px solid #22c55e', borderRadius: '4px', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap' }}>
            BETA
          </span>
        )}
        {scenario.isFree && (
          <span style={{ fontSize: '0.65rem', color: '#5b7fff', fontWeight: 700, background: '#0d1629', border: '1px solid #5b7fff', borderRadius: '4px', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap' }}>
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
        <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#545b7a' }}>
          {progress.attempts.length} attempt{progress.attempts.length !== 1 ? 's' : ''} · Best: {scoreLevel?.label || bestScore}
        </div>
      )}
    </div>
  );
}
