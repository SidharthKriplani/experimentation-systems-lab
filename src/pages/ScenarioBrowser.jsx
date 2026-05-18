import { useState } from 'react';
import { ScenarioCard } from '../components/scenario/ScenarioCard.jsx';

export function ScenarioBrowser({ scenarios, allProgress, onSelect, unlocked, onUnlock }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  const completedCount = scenarios.filter(s => allProgress[s.id]?.attempts?.length > 0).length;
  const freeCount = scenarios.filter(s => s.isFree).length;
  const paidCount = scenarios.filter(s => !s.isFree).length;
  const industries = [...new Set(scenarios.map(s => s.industry))];

  const filteredScenarios = scenarios.filter(s => {
    if (statusFilter === 'free') return s.isFree;
    if (statusFilter === 'locked') return !s.isFree && !unlocked;
    if (statusFilter === 'completed') {
      const p = allProgress[s.id];
      return p && p.attempts?.length > 0;
    }
    if (diffFilter !== 'all' && s.difficulty !== diffFilter) return false;
    if (industryFilter !== 'all' && s.industry !== industryFilter) return false;
    return true;
  }).filter(s => {
    if (statusFilter === 'all') {
      if (diffFilter !== 'all' && s.difficulty !== diffFilter) return false;
      if (industryFilter !== 'all' && s.industry !== industryFilter) return false;
    }
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
          Experiment Review Room
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          {completedCount} of {scenarios.length} scenarios completed · {freeCount} free · {paidCount} private beta
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
        {/* Status */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${scenarios.length})` },
            { id: 'free', label: `Free (${freeCount})` },
            { id: 'locked', label: `Locked (${!unlocked ? paidCount : 0})` },
            { id: 'completed', label: `Completed (${completedCount})` },
          ].map(f => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)} style={{
              background: statusFilter === f.id ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${statusFilter === f.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '6px', padding: '0.35rem 0.85rem',
              color: statusFilter === f.id ? '#fff' : 'var(--text-muted)',
              fontWeight: statusFilter === f.id ? 700 : 400,
              fontSize: '0.82rem', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Difficulty */}
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
              borderRadius: '6px', padding: '0.35rem 0.75rem',
              color: diffFilter === f.id ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: diffFilter === f.id ? 600 : 400,
              fontSize: '0.82rem', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Industry */}
        <select
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
          style={{
            background: 'var(--input-bg)', border: '1px solid var(--border)',
            borderRadius: '6px', padding: '0.35rem 0.65rem',
            color: industryFilter !== 'all' ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.82rem', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="all">All industries</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Unlock banner */}
      {!unlocked && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '0.875rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <div>
            <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.875rem' }}>🔒 4 scenarios are locked </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>— private beta access coming soon</span>
          </div>
          <button
            onClick={onUnlock}
            style={{
              background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '5px',
              padding: '0.35rem 0.85rem', color: 'var(--accent)', fontWeight: 600,
              fontSize: '0.8rem', cursor: 'pointer',
            }}
          >Enter Unlock Code</button>
        </div>
      )}

      {/* Scenario grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-dim)',
            fontSize: '0.875rem',
          }}>
            No scenarios match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
