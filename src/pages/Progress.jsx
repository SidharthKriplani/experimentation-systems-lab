import { clearProgress } from '../utils/progress.js';
import { getAllStatsProgress } from '../utils/statsProgress.js';
import { getAllMetricsProgress } from '../utils/metricsProgress.js';
import { getAllRCAProgress } from '../utils/rcaProgress.js';
import { getAllCaseProgress } from '../utils/caseProgress.js';
import { getDesignProgress } from '../utils/designProgress.js';
import { statsModules } from '../data/statsModules.js';
import { metricCases } from '../data/metricCases.js';
import { rcaCases } from '../data/rcaCases.js';
import { businessCases } from '../data/businessCases.js';
import { designScenarios } from '../data/designScenarios.js';
import { learningPaths } from '../data/learningPaths.js';
import { GuidedPathCard } from '../components/paths/GuidedPathCard.jsx';

const LEVEL_ORDER = ['junior', 'analyst', 'senior', 'staff'];
const LEVEL_LABELS = {
  junior: { label: 'Junior Miss', color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  analyst: { label: 'Analyst-Ready', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior: { label: 'Senior-Ready', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)' },
  staff: { label: 'Staff-Level', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
  partial: { label: 'Analyst-Ready', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  strong: { label: 'Senior-Ready', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)' },
  wrong: { label: 'Junior Miss', color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
};

function LevelBadge({ level }) {
  const cfg = LEVEL_LABELS[level] || LEVEL_LABELS.analyst;
  return (
    <span style={{
      fontSize: '0.65rem', fontWeight: 700,
      color: cfg.color, background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: '4px', padding: '0.15rem 0.4rem',
    }}>
      {cfg.label}
    </span>
  );
}

function RoomReadinessBar({ label, color, bg, border, completed, total, bestLevel }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{completed}/{total}</span>
          {bestLevel && <LevelBadge level={bestLevel} />}
        </div>
      </div>
      <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

function getBestLevel(levelsArray) {
  if (!levelsArray || levelsArray.length === 0) return null;
  let best = null;
  for (const l of levelsArray) {
    if (!best || LEVEL_ORDER.indexOf(l) > LEVEL_ORDER.indexOf(best)) best = l;
  }
  return best;
}

export function Progress({ scenarios, allProgress, onSelect, onClear, onNavigate, unlocked }) {
  const completed = scenarios.filter(s => allProgress[s.id]?.attempts?.length > 0);
  const notStarted = scenarios.filter(s => !allProgress[s.id]?.attempts?.length);
  const totalAttempts = Object.values(allProgress).reduce((sum, p) => sum + (p.attempts?.length || 0), 0);

  // Gather progress from all rooms
  const statsProgress = getAllStatsProgress();
  const metricsProgress = getAllMetricsProgress();
  const rcaProgress = getAllRCAProgress();
  const caseProgress = getAllCaseProgress();

  const statsCompleted = statsModules.filter(m => statsProgress[m.id]?.attempts > 0);
  const metricsCompleted = metricCases.filter(c => metricsProgress[c.id]?.attempts > 0);
  const rcaCompleted = rcaCases.filter(c => rcaProgress[c.id]?.attempts > 0);
  const casesCompleted = businessCases.filter(c => caseProgress[c.id]?.attempts > 0);
  const designCompleted = designScenarios.filter(s => {
    const p = getDesignProgress(s.id);
    return p && p.submittedPhases && Object.keys(p.submittedPhases).length > 0;
  });

  // Best levels per room
  const statsBest = getBestLevel(statsCompleted.map(m => statsProgress[m.id]?.level).filter(Boolean));
  const metricsBest = getBestLevel(metricsCompleted.map(c => metricsProgress[c.id]?.level).filter(Boolean));
  const rcaBest = getBestLevel(rcaCompleted.map(c => rcaProgress[c.id]?.level).filter(Boolean));
  const casesBest = getBestLevel(casesCompleted.map(c => caseProgress[c.id]?.level).filter(Boolean));
  const reviewBest = getBestLevel(completed.map(s => allProgress[s.id]?.attempts?.slice(-1)[0]).filter(Boolean));
  const designBest = null; // Design uses different scoring

  const allRoomProgress = [
    { label: 'Stats', completed: statsCompleted.length, total: statsModules.length, best: statsBest },
    { label: 'Metrics', completed: metricsCompleted.length, total: metricCases.length, best: metricsBest },
    { label: 'Design', completed: designCompleted.length, total: designScenarios.length, best: designBest },
    { label: 'Review', completed: completed.length, total: scenarios.length, best: reviewBest },
    { label: 'RCA', completed: rcaCompleted.length, total: rcaCases.length, best: rcaBest },
    { label: 'Cases', completed: casesCompleted.length, total: businessCases.length, best: casesBest },
  ];

  const totalCompleted = statsCompleted.length + metricsCompleted.length + designCompleted.length + completed.length + rcaCompleted.length + casesCompleted.length;
  const grandTotal = statsModules.length + metricCases.length + designScenarios.length + scenarios.length + rcaCases.length + businessCases.length;

  // Strongest/weakest room (by completion %)
  const roomsWithData = allRoomProgress.filter(r => r.completed > 0);
  const sortedByPct = [...roomsWithData].sort((a, b) => (b.completed / b.total) - (a.completed / a.total));
  const strongest = sortedByPct[0] || null;
  const weakest = allRoomProgress.find(r => r.completed === 0) || sortedByPct[sortedByPct.length - 1];

  // Next suggested item
  function getNextSuggested() {
    if (statsCompleted.length < statsModules.length) {
      const next = statsModules.find(m => !statsProgress[m.id]?.attempts);
      if (next) return { room: 'Stats', label: next.title, nav: 'stats' };
    }
    if (metricsCompleted.length < metricCases.length) {
      const next = metricCases.find(c => !metricsProgress[c.id]?.attempts);
      if (next) return { room: 'Metrics', label: next.title, nav: 'metrics' };
    }
    if (completed.length < scenarios.length) {
      const next = scenarios.find(s => !allProgress[s.id]?.attempts?.length);
      if (next) return { room: 'Review', label: next.title, nav: 'browser' };
    }
    if (rcaCompleted.length < rcaCases.length) {
      const next = rcaCases.find(c => !rcaProgress[c.id]?.attempts);
      if (next) return { room: 'RCA', label: next.title, nav: 'rca' };
    }
    if (casesCompleted.length < businessCases.length) {
      const next = businessCases.find(c => !caseProgress[c.id]?.attempts);
      if (next) return { room: 'Cases', label: next.title, nav: 'cases' };
    }
    return null;
  }
  const nextSuggested = getNextSuggested();

  // Completion map for guided paths
  const completionMap = {};
  statsModules.forEach(m => { if (statsProgress[m.id]?.attempts > 0) completionMap[`stats:${m.id}`] = true; });
  metricCases.forEach(c => { if (metricsProgress[c.id]?.attempts > 0) completionMap[`metrics:${c.id}`] = true; });
  designScenarios.forEach(s => { const p = getDesignProgress(s.id); if (p?.submittedPhases && Object.keys(p.submittedPhases).length > 0) completionMap[`design:${s.id}`] = true; });
  scenarios.forEach(s => { if (allProgress[s.id]?.attempts?.length > 0) completionMap[`review:${s.id}`] = true; });
  rcaCases.forEach(c => { if (rcaProgress[c.id]?.attempts > 0) completionMap[`rca:${c.id}`] = true; });
  businessCases.forEach(c => { if (caseProgress[c.id]?.attempts > 0) completionMap[`cases:${c.id}`] = true; });

  function handleClear() {
    if (window.confirm('Clear all Review Room progress? This cannot be undone.')) {
      clearProgress();
      onClear();
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.4rem' }}>
            Progress
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
            {totalCompleted} of {grandTotal} items completed across all rooms
          </p>
        </div>
        {totalAttempts > 0 && (
          <button onClick={handleClear} style={{
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: '5px', padding: '0.35rem 0.75rem',
            color: 'var(--text-dim)', fontSize: '0.8rem', cursor: 'pointer',
          }}>Clear Review Progress</button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>

        {/* Readiness Summary */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '1.1rem',
          }}>Readiness by room</div>

          {allRoomProgress.map(r => (
            <RoomReadinessBar
              key={r.label}
              label={r.label}
              color={r.label === 'Stats' ? 'var(--blue-text)' :
                     r.label === 'Metrics' ? 'var(--teal)' :
                     r.label === 'Design' ? 'var(--teal)' :
                     r.label === 'Review' ? 'var(--accent)' :
                     r.label === 'RCA' ? 'var(--yellow)' : 'var(--purple)'}
              bg={r.label === 'Stats' ? 'var(--blue-bg)' : 'var(--surface-2)'}
              border={r.label === 'Stats' ? 'var(--blue-border)' : 'var(--border)'}
              completed={r.completed}
              total={r.total}
              bestLevel={r.best}
            />
          ))}

          {totalCompleted > 0 && (
            <div style={{
              marginTop: '1rem', paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex', flexDirection: 'column', gap: '0.4rem',
            }}>
              {strongest && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>▲ </span>
                  Strongest area: <strong>{strongest.label}</strong>
                </div>
              )}
              {weakest && weakest.completed === 0 && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>◯ </span>
                  Not started: <strong>{weakest.label}</strong>
                </div>
              )}
              {nextSuggested && (
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    onClick={() => onNavigate && onNavigate(nextSuggested.nav)}
                    style={{
                      width: '100%',
                      background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                      borderRadius: 'var(--radius)', padding: '0.5rem 0.75rem',
                      color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600,
                      cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <span>Next: {nextSuggested.room} — {nextSuggested.label}</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {totalCompleted === 0 && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'center', paddingTop: '0.5rem' }}>
              Complete items in any room to see readiness here.
            </div>
          )}
        </div>

        {/* Guided Paths */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '0.25rem',
          }}>Guided paths</div>
          {learningPaths.map(path => (
            <GuidedPathCard
              key={path.id}
              path={path}
              completionMap={completionMap}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* Review Room completed scenarios (existing detail) */}
      {completed.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '0.75rem',
          }}>Review Room — completed scenarios</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {completed.map(scenario => {
              const progress = allProgress[scenario.id];
              const lastLevel = progress.attempts?.slice(-1)[0];
              const levelCfg = LEVEL_LABELS[lastLevel] || LEVEL_LABELS.analyst;
              return (
                <div
                  key={scenario.id}
                  onClick={() => onSelect(scenario.id)}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '0.75rem 1rem',
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '0.75rem',
                    transition: 'border-color 0.15s',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--green)', fontSize: '0.8rem' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.87rem' }}>{scenario.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                        {progress.attempts.length} attempt{progress.attempts.length !== 1 ? 's' : ''} ·
                        Last: {new Date(progress.lastAttemptAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <LevelBadge level={lastLevel} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
