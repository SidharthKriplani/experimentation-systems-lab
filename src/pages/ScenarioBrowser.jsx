import { useState } from 'react';
import { ScenarioCard } from '../components/scenario/ScenarioCard.jsx';

export function ScenarioBrowser({ scenarios, allProgress, onSelect, unlocked, onUnlock }) {
  const [filter, setFilter] = useState('all'); // all, free, locked, completed

  const filteredScenarios = scenarios.filter(s => {
    if (filter === 'free') return s.isFree;
    if (filter === 'locked') return !s.isFree && !unlocked;
    if (filter === 'completed') {
      const p = allProgress[s.id];
      return p && p.attempts?.length > 0;
    }
    return true;
  });

  const completedCount = scenarios.filter(s => allProgress[s.id]?.attempts?.length > 0).length;
  const freeCount = scenarios.filter(s => s.isFree).length;
  const paidCount = scenarios.filter(s => !s.isFree).length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#e8eaf0', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
          Experiment Review Room
        </h1>
        <p style={{ color: '#8890a8', fontSize: '0.9rem', margin: 0 }}>
          {completedCount} of {scenarios.length} scenarios completed · {freeCount} free · {paidCount} private beta
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: `All (${scenarios.length})` },
          { id: 'free', label: `Free (${freeCount})` },
          { id: 'locked', label: `Locked (${!unlocked ? paidCount : 0})` },
          { id: 'completed', label: `Completed (${completedCount})` },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              background: filter === f.id ? '#5b7fff' : '#1a1d27',
              border: `1px solid ${filter === f.id ? '#5b7fff' : '#2d3148'}`,
              borderRadius: '6px',
              padding: '0.35rem 0.85rem',
              color: filter === f.id ? '#fff' : '#8890a8',
              fontWeight: filter === f.id ? 700 : 400,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >{f.label}</button>
        ))}
      </div>

      {/* Unlock banner */}
      {!unlocked && (
        <div style={{
          background: '#1a1d27',
          border: '1px solid #2d3148',
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
            <span style={{ fontWeight: 600, color: '#e8eaf0', fontSize: '0.875rem' }}>🔒 4 scenarios are locked </span>
            <span style={{ color: '#8890a8', fontSize: '0.82rem' }}>— private beta access coming soon</span>
          </div>
          <button
            onClick={onUnlock}
            style={{
              background: '#0d1629', border: '1px solid #5b7fff', borderRadius: '5px',
              padding: '0.35rem 0.85rem', color: '#5b7fff', fontWeight: 600,
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
            color: '#545b7a',
            fontSize: '0.875rem',
          }}>
            No scenarios match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
