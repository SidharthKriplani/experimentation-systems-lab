import { useState } from 'react';
import { scenarios } from '../data/scenarios.js';
import { plannedScenarios, SCENARIO_FAMILIES } from '../data/scenarioBank.js';

const DIFFICULTY_ORDER = { analyst: 1, senior: 2, staff: 3 };

const DIFFICULTY_COLORS = {
  analyst: { color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  staff: { color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

function PlannedCard({ scenario }) {
  const diff = DIFFICULTY_COLORS[scenario.difficulty] || DIFFICULTY_COLORS.analyst;
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '1rem 1.1rem',
      opacity: 0.72,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.3 }}>
          {scenario.title}
        </span>
        <span style={{
          flexShrink: 0,
          fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
          color: 'var(--text-dim)', background: 'var(--surface-2)',
          border: '1px solid var(--border)', borderRadius: '3px',
          padding: '0.1rem 0.4rem', letterSpacing: '0.06em',
        }}>Planned</span>
      </div>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.65rem', lineHeight: 1.5 }}>
        {scenario.teaser}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
          color: diff.color, background: diff.bg, border: `1px solid ${diff.border}`,
          borderRadius: '3px', padding: '0.1rem 0.4rem', letterSpacing: '0.06em',
        }}>{scenario.difficulty}</span>
        <span style={{
          fontSize: '0.62rem', fontWeight: 600,
          color: 'var(--text-dim)', background: 'var(--surface-2)',
          border: '1px solid var(--border)', borderRadius: '3px', padding: '0.1rem 0.4rem',
        }}>{scenario.industry}</span>
      </div>
    </div>
  );
}

function PlayableCard({ scenario, onClick }) {
  const diff = DIFFICULTY_COLORS[scenario.difficulty] || DIFFICULTY_COLORS.analyst;
  return (
    <div
      onClick={() => onClick(scenario.id)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--accent-border)',
        borderRadius: '8px',
        padding: '1rem 1.1rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: 'var(--shadow)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-bg)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.3 }}>
          {scenario.title}
        </span>
        <span style={{
          flexShrink: 0,
          fontSize: '0.62rem', fontWeight: 700,
          color: 'var(--accent)', background: 'var(--accent-bg)',
          border: '1px solid var(--accent-border)', borderRadius: '3px',
          padding: '0.1rem 0.4rem', letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {scenario.isFree ? 'Free' : 'Beta'}
        </span>
      </div>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.65rem', lineHeight: 1.5 }}>
        {scenario.subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
          color: diff.color, background: diff.bg, border: `1px solid ${diff.border}`,
          borderRadius: '3px', padding: '0.1rem 0.4rem', letterSpacing: '0.06em',
        }}>{scenario.difficulty}</span>
        <span style={{
          fontSize: '0.62rem', fontWeight: 600,
          color: 'var(--text-dim)', background: 'var(--surface-2)',
          border: '1px solid var(--border)', borderRadius: '3px', padding: '0.1rem 0.4rem',
        }}>{scenario.industry}</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--green)', fontWeight: 700 }}>▶ Playable</span>
      </div>
    </div>
  );
}

export function JudgmentBank({ onNavigate }) {
  const [familyFilter, setFamilyFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Merge playable + planned for display
  const playable = scenarios.map(s => ({ ...s, status: 'playable', scenarioFamily: s.theme }));
  const allCards = [...playable, ...plannedScenarios];

  const filtered = allCards.filter(s => {
    if (familyFilter !== 'all' && s.scenarioFamily !== familyFilter) return false;
    if (diffFilter !== 'all' && s.difficulty !== diffFilter) return false;
    if (statusFilter === 'playable' && s.status !== 'playable') return false;
    if (statusFilter === 'planned' && s.status !== 'planned') return false;
    return true;
  });

  const familiesInUse = [...new Set(allCards.map(s => s.scenarioFamily))].filter(Boolean).sort();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
          borderRadius: '20px', padding: '0.3rem 0.75rem',
          marginBottom: '1rem', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600,
        }}>
          ⚗ V1.1 · 50-Scenario Architecture
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
          Experiment Judgment Bank
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
          8 playable scenarios now · 42 planned across 15 scenario families · V1.5 and V2 roadmap
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', margin: 0 }}>
          Planned cards show the scenario architecture — full readouts, decisions, and debriefs ship with each version.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        {/* Status filter */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${allCards.length})` },
            { id: 'playable', label: `Playable (${playable.length})` },
            { id: 'planned', label: `Planned (${plannedScenarios.length})` },
          ].map(f => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)} style={{
              background: statusFilter === f.id ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${statusFilter === f.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '5px', padding: '0.3rem 0.7rem',
              color: statusFilter === f.id ? '#fff' : 'var(--text-muted)',
              fontWeight: statusFilter === f.id ? 700 : 400,
              fontSize: '0.78rem', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All levels' },
            { id: 'analyst', label: 'Analyst' },
            { id: 'senior', label: 'Senior' },
            { id: 'staff', label: 'Staff' },
          ].map(f => (
            <button key={f.id} onClick={() => setDiffFilter(f.id)} style={{
              background: diffFilter === f.id ? 'var(--surface-2)' : 'var(--surface)',
              border: `1px solid ${diffFilter === f.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '5px', padding: '0.3rem 0.7rem',
              color: diffFilter === f.id ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: diffFilter === f.id ? 600 : 400,
              fontSize: '0.78rem', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Family filter */}
        <select
          value={familyFilter}
          onChange={e => setFamilyFilter(e.target.value)}
          style={{
            background: 'var(--input-bg)',
            border: '1px solid var(--border)',
            borderRadius: '5px',
            padding: '0.3rem 0.65rem',
            color: familyFilter !== 'all' ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="all">All families</option>
          {familiesInUse.map(f => (
            <option key={f} value={f}>{SCENARIO_FAMILIES[f] || f}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
        {filtered.length} scenario{filtered.length !== 1 ? 's' : ''}
        {familyFilter !== 'all' ? ` in ${SCENARIO_FAMILIES[familyFilter] || familyFilter}` : ''}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '0.75rem',
      }}>
        {filtered.map(s => (
          s.status === 'playable'
            ? <PlayableCard key={s.id} scenario={s} onClick={() => onNavigate('browser')} />
            : <PlannedCard key={s.id} scenario={s} />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
            No scenarios match this filter.
          </div>
        )}
      </div>

      {/* Family legend */}
      <div style={{
        marginTop: '3rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          15 Scenario Families
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.4rem' }}>
          {Object.entries(SCENARIO_FAMILIES).map(([key, label]) => {
            const count = allCards.filter(s => s.scenarioFamily === key).length;
            return (
              <button
                key={key}
                onClick={() => setFamilyFilter(familyFilter === key ? 'all' : key)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: familyFilter === key ? 'var(--accent-bg)' : 'transparent',
                  border: `1px solid ${familyFilter === key ? 'var(--accent-border)' : 'transparent'}`,
                  borderRadius: '5px', padding: '0.35rem 0.6rem',
                  color: familyFilter === key ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: '0.78rem', cursor: 'pointer', textAlign: 'left', gap: '0.5rem',
                }}
              >
                <span>{label}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', flexShrink: 0 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
