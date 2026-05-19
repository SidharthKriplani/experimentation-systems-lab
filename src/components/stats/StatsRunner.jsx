import { useState, useCallback } from 'react';
import { StatsDecisionCard } from './StatsDecisionCard.jsx';
import { StatsScoreReveal } from './StatsScoreReveal.jsx';
import { StatsConceptPanel } from './StatsConceptPanel.jsx';
import { ConceptDrawer } from '../concepts/ConceptDrawer.jsx';
import { saveStatsAttempt, clearStatsProgress } from '../../utils/statsProgress.js';

// views: 'question' | 'reveal' | 'debrief'

const DIFFICULTY_CFG = {
  foundational: { label: 'Foundational', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  analyst:      { label: 'Analyst',      color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  senior:       { label: 'Senior',       color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
};

export function StatsRunner({ module, savedProgress, onBack, onGoToReview, onGoToDesign, onNext }) {
  const [view, setView] = useState(savedProgress?.selectedOptionId ? 'debrief' : 'question');
  const [selectedId, setSelectedId] = useState(savedProgress?.selectedOptionId || null);
  const [submitted, setSubmitted] = useState(!!savedProgress?.selectedOptionId);
  const [openConceptId, setOpenConceptId] = useState(null);

  const selectedOption = module.options.find(o => o.id === selectedId);
  const diffCfg = DIFFICULTY_CFG[module.difficulty] || DIFFICULTY_CFG.foundational;

  function handleSubmit() {
    if (!selectedId) return;
    const opt = module.options.find(o => o.id === selectedId);
    saveStatsAttempt(module.id, selectedId, opt.level);
    setSubmitted(true);
    setView('reveal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRetry() {
    clearStatsProgress(module.id);
    setSelectedId(null);
    setSubmitted(false);
    setView('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleOpenConcept = useCallback(id => setOpenConceptId(id), []);
  const handleCloseConcept = useCallback(() => setOpenConceptId(null), []);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1rem' }}>

      {/* Back + header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '0.78rem', cursor: 'pointer', padding: 0, marginBottom: '0.75rem',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}
        >
          ← Stats Room
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            color: diffCfg.color, background: diffCfg.bg, border: `1px solid ${diffCfg.border}`,
            borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
          }}>{diffCfg.label}</span>
          {!module.isFree && (
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              color: 'var(--teal)', background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
              borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
            }}>Beta</span>
          )}
          <span style={{
            fontSize: '0.58rem', fontWeight: 600,
            color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>{module.concept}</span>
        </div>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text)', margin: 0, letterSpacing: '-0.015em' }}>
          {module.title}
        </h1>
      </div>

      {/* Question view */}
      {view === 'question' && (
        <div style={{
          border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          background: 'var(--surface)', overflow: 'hidden',
        }}>
          <div style={{ padding: '1.5rem' }}>
            <StatsDecisionCard
              module={module}
              selectedId={selectedId}
              onSelect={setSelectedId}
              submitted={false}
            />
          </div>
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-2)',
            display: 'flex', justifyContent: 'flex-end',
          }}>
            <button
              onClick={handleSubmit}
              disabled={!selectedId}
              style={{
                padding: '0.6rem 1.25rem',
                background: selectedId ? 'var(--accent)' : 'var(--surface-2)',
                border: `1.5px solid ${selectedId ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                color: selectedId ? '#fff' : 'var(--text-dim)',
                fontSize: '0.88rem', fontWeight: 700,
                cursor: selectedId ? 'pointer' : 'default',
                transition: 'all 0.12s',
              }}
            >
              Submit answer →
            </button>
          </div>
        </div>
      )}

      {/* Reveal view */}
      {view === 'reveal' && selectedOption && (
        <div style={{
          border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          background: 'var(--surface)', padding: '1.5rem',
        }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '1rem',
          }}>
            Your answer
          </div>
          <StatsScoreReveal
            option={selectedOption}
            onContinue={() => { setView('debrief'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        </div>
      )}

      {/* Debrief view */}
      {view === 'debrief' && selectedOption && (
        <div style={{
          border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          background: 'var(--surface)', padding: '1.5rem',
        }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '1rem',
          }}>
            Stats Room debrief
          </div>
          <StatsConceptPanel
            module={module}
            selectedOption={selectedOption}
            onOpenConcept={handleOpenConcept}
            onGoToReview={onGoToReview}
            onGoToDesign={onGoToDesign}
            onRetry={handleRetry}
          />
          {onNext && (
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={onNext}
                style={{
                  background: 'var(--accent)', border: 'none', borderRadius: '7px',
                  padding: '0.5rem 1.2rem', color: '#fff', fontSize: '0.85rem',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Next module →
              </button>
            </div>
          )}
        </div>
      )}

      <ConceptDrawer conceptId={openConceptId} onClose={handleCloseConcept} />
    </div>
  );
}
