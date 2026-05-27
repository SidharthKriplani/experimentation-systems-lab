import { Icon } from '../components/shared/Icon.jsx';
import { useState } from 'react';
import { rcaCases } from '../data/rcaCases.js';
import { getRCAProgress } from '../utils/rcaProgress.js';
import { FOUNDATION_DOMAINS } from '../data/foundationMeta.js';

const DIFF_CFG = {
  analyst: { label: 'Analyst', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  senior:  { label: 'Senior',  color: 'var(--teal)',   bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
  staff:   { label: 'Staff',   color: 'var(--yellow)',  bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
};

const DOMAIN_CFG = {
  growth:   { label: 'Growth',   color: 'var(--blue-text)', bg: 'var(--blue-bg)' },
  search:   { label: 'Search',   color: 'var(--teal)',      bg: 'var(--teal-bg)' },
  engagement: { label: 'Engagement', color: 'var(--accent)', bg: 'var(--accent-bg)' },
  marketplace: { label: 'Marketplace', color: 'var(--purple)', bg: 'var(--purple-bg)' },
  retention: { label: 'Retention', color: 'var(--green)',  bg: 'var(--green-bg)' },
  monetization: { label: 'Monetization', color: 'var(--yellow)', bg: 'var(--yellow-bg)' },
};

const LEVEL_LABEL = {
  staff:   'Staff-Level',
  senior:  'Senior',
  analyst: 'Analyst',
  junior:  'Junior',
};

const LEVEL_COLOR = {
  staff:   'var(--teal)',
  senior:  'var(--accent)',
  analyst: 'var(--yellow)',
  junior:  'var(--red)',
};

const LEVEL_BG = {
  staff:   'var(--teal-bg)',
  senior:  'var(--accent-bg)',
  analyst: 'var(--yellow-bg)',
  junior:  'var(--red-bg)',
};

function Tag({ label, color, bg, border }) {
  return (
    <span style={{
      fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
      color, background: bg, border: `1px solid ${border || color}`,
      borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.45rem',
    }}>
      {label}
    </span>
  );
}

const DIFF_ORDER = { analyst: 0, foundational: 0, intermediate: 1, senior: 1, advanced: 2, staff: 2 };

export function RCABrowser({ onSelectCase, unlocked, onUnlock, onOpenArticle, onNavigate }) {
  const [sortBy, setSortBy] = useState('default');
  const [theoryActive, setTheoryActive] = useState(false);
  const completedCount = rcaCases.filter(c => getRCAProgress(c.id)).length;

  const displayCases = sortBy === 'difficulty'
    ? [...rcaCases].sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1))
    : rcaCases;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--yellow)', marginBottom: '0.4rem',
        }}>
          RCA Room
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Root Cause Analysis
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6, maxWidth: '540px' }}>
          Diagnose metric movements step by step. Each case gives you context, then walks you through
          the exact reasoning process a senior analyst would use to find the root cause.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.2rem 0.55rem',
          }}>
            RCA · {rcaCases.length} Cases
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {completedCount} completed
          </span>
        </div>
      </div>

      {/* Theory hint */}
      {onNavigate && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 0.85rem',
          background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
          borderRadius: '6px', marginBottom: '1.25rem',
          fontSize: '0.78rem', color: 'var(--teal)',
        }}>
          <Icon name="book-open" size={13} color="currentColor" />
          <span>New to this? Start with</span>
          <button onClick={() => onNavigate('rca-foundations')} style={{
            background: 'none', border: 'none', padding: 0,
            color: 'var(--teal)', fontWeight: 700, cursor: 'pointer',
            fontSize: '0.78rem', textDecoration: 'underline',
          }}>RCA Foundations</button>
          <span>first.</span>
        </div>
      )}

      {/* Theory / Cases tab bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['Cases', 'Theory'].map(tab => {
          const active = tab === 'Theory' ? theoryActive : !theoryActive;
          return (
            <button
              key={tab}
              onClick={() => setTheoryActive(tab === 'Theory')}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid ' + (active ? 'var(--accent-border)' : 'var(--border)'),
                background: active ? 'var(--accent-bg)' : 'none',
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: active ? 600 : 400,
                fontSize: '0.82rem', cursor: 'pointer',
              }}
            >{tab}</button>
          );
        })}
      </div>

      {!theoryActive && (
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, justifyContent: 'flex-end' }}>
        {['default', 'difficulty'].map(opt => (
          <button key={opt} onClick={() => setSortBy(opt)} className={`pal-sort-btn${sortBy === opt ? ' active' : ''}`}>{opt === 'default' ? 'Default' : 'By Difficulty'}</button>
        ))}
      </div>
      )}

      {/* Case cards */}
      {!theoryActive && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {displayCases.map((c) => {
          const progress = getRCAProgress(c.id);
          const diffCfg = DIFF_CFG[c.difficulty] || DIFF_CFG.analyst;
          const domainCfg = DOMAIN_CFG[c.domain] || DOMAIN_CFG.growth;

          return (
            <CaseCard
              key={c.id}
              rcaCase={c}
              progress={progress}
              isLocked={!c.isFree && !unlocked}
              diffCfg={diffCfg}
              domainCfg={domainCfg}
              onSelectCase={onSelectCase}
              onUnlock={onUnlock}
            />
          );
        })}
      </div>
      )}

      {theoryActive && (
        <div>
          <div style={{ marginBottom: '1rem', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            Read the theory, then practice it in the cases above.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '0.75rem' }}>
            {FOUNDATION_DOMAINS['rca'].articles.map(a => (
              <button
                key={a.id}
                onClick={() => onOpenArticle && onOpenArticle(a.id)}
                style={{
                  textAlign: 'left', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '0.9rem 1rem', cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{a.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.35rem', fontWeight: 500 }}>Read article →</div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function CaseCard({ rcaCase, progress, isLocked, diffCfg, domainCfg, onSelectCase, onUnlock }) {
  const levelColor = progress ? LEVEL_COLOR[progress.level] : null;
  const levelBg = progress ? LEVEL_BG[progress.level] : null;

  function handleClick() {
    if (isLocked) {
      onUnlock && onUnlock();
    } else {
      onSelectCase(rcaCase.id);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      style={{
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1.1rem 1.25rem',
        cursor: 'pointer',
        opacity: isLocked ? 0.65 : 1,
        transition: 'border-color 0.12s, box-shadow 0.12s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--yellow-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top row: tags + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.55rem', flexWrap: 'wrap' }}>
        <Tag label={domainCfg.label} color={domainCfg.color} bg={domainCfg.bg} />
        <Tag label={diffCfg.label} color={diffCfg.color} bg={diffCfg.bg} border={diffCfg.border} />
        {progress && !isLocked && (
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            color: levelColor, background: levelBg, border: `1px solid ${levelColor}`,
            borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.45rem',
          }}>
            {LEVEL_LABEL[progress.level]} · {progress.score}/{progress.maxScore ?? 10}
          </span>
        )}
      </div>

      {/* Title + subtitle */}
      <div style={{ marginBottom: '0.6rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
          {rcaCase.title}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
          {rcaCase.subtitle}
        </div>
      </div>

      {/* Metric movement callout */}
      <div style={{
        background: 'var(--yellow-bg)',
        border: '1px solid var(--yellow-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 0.75rem',
        fontSize: '0.8rem',
        color: 'var(--text)',
        lineHeight: 1.5,
      }}>
        <span style={{ fontWeight: 700, color: 'var(--yellow)', marginRight: '0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Movement
        </span>
        {rcaCase.context.metricMovement}
      </div>

      {/* Completion indicator */}
      {progress && (
        <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Completed {progress.attempts} time{progress.attempts !== 1 ? 's' : ''} · Click to review
        </div>
      )}
    </div>
  );
}
