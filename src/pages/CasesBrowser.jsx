import { Icon } from '../components/shared/Icon.jsx';
import { businessCases } from '../data/businessCases.js';
import { getCaseProgress } from '../utils/caseProgress.js';

export function CasesBrowser({ onSelectCase, unlocked, onUnlock, onNavigate }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--purple)', marginBottom: '0.4rem',
        }}>
          Business Cases
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Cases Room
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6, maxWidth: '540px' }}>
          Structure ambiguous business and product analytics questions.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--purple-bg)', border: '1px solid var(--purple-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem',
          fontSize: '0.75rem', color: 'var(--purple)',
        }}>
          <span>◈</span>
          <span>Cases · {businessCases.length} Cases</span>
        </div>
      </div>

      {/* Theory hint */}
              {onNavigate && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.7rem 1rem',
            background: 'var(--teal-bg)',
            borderLeft: '3px solid var(--teal)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem',
          }}>
            <Icon name="book-open" size={14} color="var(--teal)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: '0.15rem' }}>Recommended starting point</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <button onClick={() => onNavigate('rca-foundations')} style={{
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--teal)', fontWeight: 700, cursor: 'pointer',
                  fontSize: '0.78rem',
                }}>RCA Foundations</button>
                {' '}builds the diagnostic framework these cases use.
              </div>
            </div>
          </div>
        )}

      {/* Case cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {businessCases.map(bc => {
          const progress = getCaseProgress(bc.id);

          return (
            <CaseCard
              key={bc.id}
              businessCase={bc}
              progress={progress}
              isLocked={!bc.isFree && !unlocked}
              onSelect={() => onSelectCase(bc.id)}
              onUnlock={onUnlock}
            />
          );
        })}
      </div>

    </div>
  );
}

function CaseCard({ businessCase: bc, progress, isLocked, onSelect, onUnlock }) {
  const levelCfg = progress ? getLevelConfig(progress.level) : null;

  return (
    <div
      style={{
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius)',
        background: 'var(--surface)',
        padding: '1.1rem 1.25rem',
        cursor: isLocked ? 'default' : 'pointer',
        opacity: isLocked ? 0.7 : 1,
        transition: 'transform var(--transition), box-shadow var(--transition), border-color var(--transition)',
        position: 'relative',
      }}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onClick={onSelect}
      onKeyDown={e => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(); } }}
      onMouseEnter={e => {
        if (!isLocked) {
          e.currentTarget.style.borderColor = 'var(--purple-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Badges row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
        <DomainBadge domain={bc.domain} />
        <DifficultyBadge difficulty={bc.difficulty} />
        {levelCfg && (
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            color: levelCfg.color, background: levelCfg.bg, border: `1px solid ${levelCfg.border}`,
            borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
          }}>{levelCfg.label}</span>
        )}
      </div>

      {/* Title + subtitle */}
      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.15rem', letterSpacing: '-0.01em' }}>
        {bc.title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '0 0 0.75rem', lineHeight: 1.4 }}>
        {bc.subtitle}
      </p>

      {/* Executive ask callout */}
      <div style={{
        borderLeft: '3px solid var(--purple-border)',
        background: 'var(--purple-bg)',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        padding: '0.6rem 0.8rem',
        marginBottom: '0.5rem',
      }}>
        <div style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--purple)', marginBottom: '0.25rem',
        }}>
          The Question
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>
          {bc.context.executiveAsk}
        </p>
      </div>

      {/* Ambiguity hint */}
      <p style={{ fontSize: '0.77rem', color: 'var(--text-muted)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
        {bc.context.ambiguity}
      </p>

      {/* Progress / lock row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        {isLocked ? (
          <button
            onClick={e => { e.stopPropagation(); onUnlock(); }}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
              fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer',
            }}
          >
            Unlock beta
          </button>
        ) : progress?.attempts > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {progress.attempts} attempt{progress.attempts > 1 ? 's' : ''} · Score: {progress.score?.score ?? '—'}/{progress.score?.maxScore ?? '—'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--purple)', fontWeight: 600 }}>
              View debrief →
            </span>
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Not started · {bc.phases.length} phases
          </span>
        )}
      </div>
    </div>
  );
}

function getLevelConfig(level) {
  return {
    staff:   { color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)',   label: 'Staff' },
    senior:  { color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)', label: 'Senior' },
    analyst: { color: 'var(--blue-text)', bg: 'var(--blue-bg)',   border: 'var(--blue-border)',   label: 'Analyst' },
    junior:  { color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)', label: 'Junior miss' },
  }[level] || null;
}

function DifficultyBadge({ difficulty }) {
  const cfg = {
    analyst: { label: 'Analyst', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
    senior:  { label: 'Senior',  color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
    staff:   { label: 'Staff',   color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
  }[difficulty] || { label: difficulty, color: 'var(--text-dim)', bg: 'var(--surface-2)', border: 'var(--border)' };

  return (
    <span style={{
      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>{cfg.label}</span>
  );
}

function DomainBadge({ domain }) {
  return (
    <span style={{
      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>{domain}</span>
  );
}
