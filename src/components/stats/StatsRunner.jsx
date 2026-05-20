import { useState, useEffect, useRef, useCallback } from 'react';
import { StatsDecisionCard } from './StatsDecisionCard.jsx';
import { StatsScoreReveal } from './StatsScoreReveal.jsx';
import { StatsConceptPanel } from './StatsConceptPanel.jsx';
import { ConceptDrawer } from '../concepts/ConceptDrawer.jsx';
import { saveStatsAttempt, clearStatsProgress } from '../../utils/statsProgress.js';

// views: 'question' | 'reveal' | 'debrief'

const ROOM_KEY = 'stats';

function loadNote(room, id) {
  try {
    const notes = JSON.parse(localStorage.getItem('pal-notes-v1') || '{}');
    return notes[`${room}:${id}`] || '';
  } catch { return ''; }
}
function saveNote(room, id, text) {
  try {
    const notes = JSON.parse(localStorage.getItem('pal-notes-v1') || '{}');
    notes[`${room}:${id}`] = text;
    localStorage.setItem('pal-notes-v1', JSON.stringify(notes));
  } catch {}
}

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
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const [userNote, setUserNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    setUserNote(loadNote(ROOM_KEY, module.id));
    setNoteSaved(false);
  }, [module.id]);

  useEffect(() => {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [module.id]);

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

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
          <span style={{
            fontSize: 13,
            color: elapsed > 600 ? 'var(--red, #ef4444)' : 'var(--text-muted, #888)',
            fontVariantNumeric: 'tabular-nums',
            marginLeft: 'auto',
          }}>
            ⏱ {formatTime(elapsed)}
          </span>
        </div>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text)', margin: 0, letterSpacing: '-0.015em' }}>
          {module.title}
        </h1>
        {module.sfPrerequisites?.length > 0 && (
          <div style={{ marginTop: 10, marginBottom: 2 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 6 }}>📚 Review first:</span>
            {module.sfPrerequisites.map(p => (
              <span key={p.id} style={{ fontSize: 12, padding: '2px 8px', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 4, marginRight: 4, color: 'var(--accent)' }}>{p.title}</span>
            ))}
          </div>
        )}
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
          }}>
            <div style={{ marginBottom: 16, padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>
                ✏️ Write your thinking first <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
              </div>
              <textarea
                value={userNote}
                onChange={e => { setUserNote(e.target.value); setNoteSaved(false); }}
                placeholder="What's your read? Jot down your diagnosis before revealing the answer..."
                style={{
                  width: '100%', minHeight: 80, padding: '10px 12px', background: 'var(--bg)',
                  border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)',
                  fontSize: 14, lineHeight: 1.5, resize: 'vertical', fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              <button
                onClick={() => { saveNote(ROOM_KEY, module.id, userNote); setNoteSaved(true); }}
                style={{
                  marginTop: 8, padding: '5px 14px', background: noteSaved ? 'var(--green-bg)' : 'var(--surface)',
                  border: `1px solid ${noteSaved ? 'var(--green-border)' : 'var(--border)'}`,
                  borderRadius: 6, cursor: 'pointer', fontSize: 12,
                  color: noteSaved ? 'var(--green)' : 'var(--text-muted)',
                }}
              >
                {noteSaved ? '✓ Saved' : 'Save note'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          {userNote && (
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 6 }}>Your notes</div>
              <div style={{ fontSize: 14, color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{userNote}</div>
            </div>
          )}
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
