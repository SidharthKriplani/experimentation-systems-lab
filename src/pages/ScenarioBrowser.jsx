import { useState } from 'react';
import { ScenarioCard } from '../components/scenario/ScenarioCard.jsx';

export function ScenarioBrowser({ scenarios, allProgress, onSelect, unlocked, onUnlock }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  const completedCount = scenarios.filter(s => allProgress[s.id]?.attempts?.length > 0).length;
  const industries = [...new Set(scenarios.map(s => s.industry))];

  const filteredScenarios = scenarios.filter(s => {
    if (statusFilter === 'free') return s.isFree;
    if (statusFilter === 'locked') return !s.isFree && !unlocked;
    if (statusFilter === 'completed') return allProgress[s.id]?.attempts?.length > 0;
    if (diffFilter !== 'all' && s.difficulty !== diffFilter) return false;
    if (industryFilter !== 'all' && s.industry !== industryFilter) return false;
    return true;
  });

  const FilterBtn = ({ id, label, active, onClick }) => (
    <button onClick={onClick} style={{
      background: active ? 'var(--accent)' : 'var(--surface)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.8rem',
      color: active ? '#fff' : 'var(--text-muted)',
      fontWeight: active ? 700 : 400, fontSize: '0.8rem', cursor: 'pointer',
      transition: 'all 0.12s',
    }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.35rem' }}>
          Experiment Review Room
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          {completedCount} of {scenarios.length} completed
          {' · '}Read the readout, make the call, see the senior debrief.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <FilterBtn active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} label={`All (${scenarios.length})`} />
          <FilterBtn active={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')} label={`Done (${completedCount})`} />
        </div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {['all', 'analyst', 'senior', 'staff'].map(d => (
            <FilterBtn key={d} active={diffFilter === d} onClick={() => setDiffFilter(d)} label={d === 'all' ? 'All levels' : d.charAt(0).toUpperCase() + d.slice(1)} />
          ))}
        </div>

        <select
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
          style={{
            background: 'var(--input-bg)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
            color: industryFilter !== 'all' ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.8rem', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="all">All industries</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>


      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '0.875rem',
      }}>
        {filteredScenarios.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            progress={allProgress[scenario.id]}
            onClick={onSelect}
            unlocked={unlocked}
          />
        ))}
        {filteredScenarios.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
            No scenarios match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
