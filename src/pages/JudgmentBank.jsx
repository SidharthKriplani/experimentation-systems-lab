import { useState } from 'react';
import { scenarios } from '../data/scenarios.js';
import { designScenarios } from '../data/designScenarios.js';
import { plannedScenarios, SCENARIO_FAMILIES } from '../data/scenarioBank.js';

const DIFFICULTY_COLORS = {
  analyst: { color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior:  { color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  staff:   { color: 'var(--purple)',    bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

function DiffBadge({ difficulty }) {
  const c = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.analyst;
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: c.color, background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>{difficulty}</span>
  );
}

function PairedBadge() {
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>◆ Paired</span>
  );
}

function PlannedCard({ scenario }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px dashed var(--border)',
      borderRadius: 'var(--radius)',
      padding: '0.95rem 1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.855rem', color: 'var(--text-secondary)', lineHeight: 1.3, flex: 1 }}>
          {scenario.title}
        </span>
        <span style={{
          flexShrink: 0, fontSize: '0.6rem', fontWeight: 600,
          color: 'var(--text-dim)', background: 'var(--surface-2)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
          padding: '0.1rem 0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>Roadmap</span>
      </div>
      <p style={{ fontSize: '0.775rem', color: 'var(--text-dim)', margin: '0 0 0.55rem', lineHeight: 1.5, fontStyle: 'italic' }}>
        {scenario.teaser}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        <DiffBadge difficulty={scenario.difficulty} />
        <span style={{
          fontSize: '0.6rem', color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>{scenario.industry}</span>
      </div>
    </div>
  );
}

function ReviewCard({ scenario, onClick }) {
  return (
    <div
      onClick={() => onClick(scenario.id)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '0.95rem 1rem',
        cursor: 'pointer',
        transition: 'border-color 0.13s, box-shadow 0.13s',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-bg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.3, flex: 1 }}>
          {scenario.title}
        </span>
        <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700,
            color: '#fff',
            background: scenario.isFree ? 'var(--accent)' : 'var(--teal)',
            borderRadius: 'var(--radius-sm)', padding: '0.12rem 0.4rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>{scenario.isFree ? 'Free' : 'Beta'}</span>
        </div>
      </div>
      <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '0 0 0.55rem', lineHeight: 1.5 }}>
        {scenario.subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
        <DiffBadge difficulty={scenario.difficulty} />
        <span style={{
          fontSize: '0.6rem', color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>{scenario.industry}</span>
        {scenario.pairedDesignScenarioId && <PairedBadge />}
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--green)', fontWeight: 700 }}>▶ Review</span>
      </div>
    </div>
  );
}

function DesignCard({ scenario, onClick }) {
  return (
    <div
      onClick={() => onClick(scenario.id)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '0.95rem 1rem',
        cursor: 'pointer',
        transition: 'border-color 0.13s, box-shadow 0.13s',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--teal)';
        e.currentTarget.style.boxShadow = '0 0 0 3px var(--teal-bg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.3, flex: 1 }}>
          {scenario.title}
        </span>
        <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700,
            color: '#fff',
            background: scenario.isFree ? 'var(--accent)' : 'var(--teal)',
            borderRadius: 'var(--radius-sm)', padding: '0.12rem 0.4rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>{scenario.isFree ? 'Free' : 'Beta'}</span>
        </div>
      </div>
      <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '0 0 0.55rem', lineHeight: 1.5 }}>
        {scenario.subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
        <DiffBadge difficulty={scenario.difficulty} />
        <span style={{
          fontSize: '0.6rem', color: 'var(--text-dim)',
          background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>{scenario.industry}</span>
        {scenario.pairedReviewScenarioId && <PairedBadge />}
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 700 }}>✏ Design</span>
      </div>
    </div>
  );
}

export function JudgmentBank({ onNavigate }) {
  const [roomFilter, setRoomFilter] = useState('all');
  const [familyFilter, setFamilyFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Enrich review scenarios with pairedDesignScenarioId for badge lookup
  const designIdByReview = Object.fromEntries(
    designScenarios
      .filter(d => d.pairedReviewScenarioId)
      .map(d => [d.pairedReviewScenarioId, d.id])
  );

  const reviewCards = scenarios.map(s => ({
    ...s,
    status: 'playable',
    room: 'review',
    scenarioFamily: s.theme,
    pairedDesignScenarioId: designIdByReview[s.id] || null,
  }));

  const designCards = designScenarios.map(s => ({
    ...s,
    status: 'playable',
    room: 'design',
  }));

  const allPlayable = [...reviewCards, ...designCards];
  const allCards = [...allPlayable, ...plannedScenarios.map(s => ({ ...s, room: 'planned' }))];

  const filtered = allCards.filter(s => {
    if (roomFilter === 'review' && s.room !== 'review') return false;
    if (roomFilter === 'design' && s.room !== 'design') return false;
    if (roomFilter === 'planned' && s.room !== 'planned') return false;
    if (statusFilter === 'playable' && s.status !== 'playable') return false;
    if (statusFilter === 'planned' && s.status !== 'planned') return false;
    if (diffFilter !== 'all' && s.difficulty !== diffFilter) return false;
    if (familyFilter !== 'all' && s.scenarioFamily !== familyFilter) return false;
    return true;
  });

  const familiesInUse = [...new Set(allCards.map(s => s.scenarioFamily))].filter(Boolean).sort();

  const FilterBtn = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      background: active ? 'var(--accent)' : 'var(--surface)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)', padding: '0.28rem 0.65rem',
      color: active ? '#fff' : 'var(--text-muted)',
      fontWeight: active ? 700 : 400, fontSize: '0.78rem', cursor: 'pointer',
      transition: 'all 0.12s',
    }}>{children}</button>
  );

  function handleCardClick(card) {
    if (card.room === 'review') {
      onNavigate('browser');
    } else if (card.room === 'design') {
      onNavigate('design');
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '680px', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
          Judgment Bank
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>
          50+ scenarios across Design and Review rooms. Each case teaches one decision trap from real product analytics work.
        </p>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)', borderRadius: 'var(--radius)',
          padding: '0.7rem 0.875rem',
          fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>12 playable now</strong> — 8 Review Room + 4 Design Room.
          {' '}Paired scenarios (◆) appear in both rooms.
          Roadmap cards ship with V1.5 and V2.
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>

        {/* Room filter */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <FilterBtn active={roomFilter === 'all'} onClick={() => setRoomFilter('all')}>All rooms</FilterBtn>
          <FilterBtn active={roomFilter === 'review'} onClick={() => setRoomFilter('review')}>▶ Review ({reviewCards.length})</FilterBtn>
          <FilterBtn active={roomFilter === 'design'} onClick={() => setRoomFilter('design')}>✏ Design ({designCards.length})</FilterBtn>
          <FilterBtn active={roomFilter === 'planned'} onClick={() => setRoomFilter('planned')}>Roadmap ({plannedScenarios.length})</FilterBtn>
        </div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        {/* Difficulty */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <FilterBtn active={diffFilter === 'all'} onClick={() => setDiffFilter('all')}>All levels</FilterBtn>
          <FilterBtn active={diffFilter === 'analyst'} onClick={() => setDiffFilter('analyst')}>Analyst</FilterBtn>
          <FilterBtn active={diffFilter === 'senior'} onClick={() => setDiffFilter('senior')}>Senior</FilterBtn>
          <FilterBtn active={diffFilter === 'staff'} onClick={() => setDiffFilter('staff')}>Staff</FilterBtn>
        </div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        {/* Family dropdown */}
        <select
          value={familyFilter}
          onChange={e => setFamilyFilter(e.target.value)}
          style={{
            background: 'var(--input-bg)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.28rem 0.65rem',
            color: familyFilter !== 'all' ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.78rem', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="all">All families</option>
          {familiesInUse.map(f => (
            <option key={f} value={f}>{SCENARIO_FAMILIES[f] || f}</option>
          ))}
        </select>
      </div>

      {/* Results label */}
      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
        {filtered.length} scenario{filtered.length !== 1 ? 's' : ''}
        {familyFilter !== 'all' ? ` · ${SCENARIO_FAMILIES[familyFilter] || familyFilter}` : ''}
        {diffFilter !== 'all' ? ` · ${diffFilter}` : ''}
      </div>

      {/* ── Card grid ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '0.65rem',
        marginBottom: '3rem',
      }}>
        {filtered.map(s => {
          if (s.room === 'design') {
            return <DesignCard key={`design-${s.id}`} scenario={s} onClick={() => onNavigate('design')} />;
          }
          if (s.room === 'review') {
            return <ReviewCard key={`review-${s.id}`} scenario={s} onClick={() => onNavigate('browser')} />;
          }
          return <PlannedCard key={`planned-${s.id}`} scenario={s} />;
        })}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1/-1', textAlign: 'center', padding: '3rem',
            color: 'var(--text-dim)', fontSize: '0.875rem',
          }}>
            No scenarios match this filter.
          </div>
        )}
      </div>

      {/* ── Family legend ───────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem',
      }}>
        <div className="label-caps" style={{ marginBottom: '0.875rem' }}>
          15 Scenario Families
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.3rem' }}>
          {Object.entries(SCENARIO_FAMILIES).map(([key, label]) => {
            const count = allCards.filter(s => s.scenarioFamily === key).length;
            const playableCount = allPlayable.filter(s => s.scenarioFamily === key).length;
            const active = familyFilter === key;
            return (
              <button
                key={key}
                onClick={() => setFamilyFilter(active ? 'all' : key)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: active ? 'var(--accent-bg)' : 'transparent',
                  border: `1px solid ${active ? 'var(--accent-border)' : 'transparent'}`,
                  borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.5rem',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: '0.775rem', cursor: 'pointer', textAlign: 'left', gap: '0.5rem',
                  transition: 'all 0.1s',
                }}
              >
                <span>{label}</span>
                <span style={{
                  fontSize: '0.68rem', flexShrink: 0,
                  color: playableCount > 0 ? 'var(--green)' : 'var(--text-dim)',
                }}>
                  {playableCount > 0 ? `${playableCount}▶ ` : ''}{count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
