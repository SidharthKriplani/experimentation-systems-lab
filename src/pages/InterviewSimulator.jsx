import { useState, useEffect, useRef } from 'react';
import { statsModules } from '../data/statsModules.js';
import { rcaCases } from '../data/rcaCases.js';
import { metricCases } from '../data/metricCases.js';
import { estimationProblems } from '../data/estimationProblems.js';
import { behavioralQuestions } from '../data/behavioralQuestions.js';
import { productDesignScenarios } from '../data/productDesignScenarios.js';
import { prioritizationScenarios } from '../data/prioritizationScenarios.js';
import { businessCases } from '../data/businessCases.js';

function pickRandom(arr, seed) {
  if (!arr || arr.length === 0) return null;
  const idx = seed % arr.length;
  return arr[idx];
}

function buildSession(role, seed) {
  if (role === 'ds') {
    return [
      { room: 'stats', label: 'Statistics', case: pickRandom(statsModules, seed) },
      { room: 'rca', label: 'RCA', case: pickRandom(rcaCases, seed + 1) },
      { room: 'metrics', label: 'Metrics', case: pickRandom(metricCases, seed + 2) },
      { room: 'estimation', label: 'Estimation', case: pickRandom(estimationProblems, seed + 3) },
      { room: 'behavioral', label: 'Behavioral', case: pickRandom(behavioralQuestions, seed + 4) },
    ];
  } else {
    return [
      { room: 'product-design', label: 'Product Design', case: pickRandom(productDesignScenarios, seed) },
      { room: 'prioritization', label: 'Prioritization', case: pickRandom(prioritizationScenarios, seed + 1) },
      { room: 'estimation', label: 'Estimation', case: pickRandom(estimationProblems, seed + 2) },
      { room: 'behavioral', label: 'Behavioral', case: pickRandom(behavioralQuestions, seed + 3) },
      { room: 'cases', label: 'Business Case', case: pickRandom(businessCases, seed + 4) },
    ];
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function getCasePrompt(roomCase) {
  if (!roomCase) return '';
  return (
    roomCase.situation?.context ||
    roomCase.context?.metricMovement ||
    roomCase.context?.executiveAsk ||
    roomCase.context ||
    roomCase.prompt ||
    roomCase.setup?.metric ||
    ''
  );
}

function getCaseModelAnswer(roomCase) {
  if (!roomCase) return '';
  if (roomCase.modelAnswer) {
    if (typeof roomCase.modelAnswer === 'string') return roomCase.modelAnswer;
    return (
      roomCase.modelAnswer.walkthrough ||
      roomCase.modelAnswer.situation ||
      roomCase.modelAnswer.fullAnswer ||
      JSON.stringify(roomCase.modelAnswer, null, 2)
    );
  }
  if (roomCase.fullAnalysis) return roomCase.fullAnalysis;
  if (roomCase.keyInsight) return roomCase.keyInsight;
  return 'Model answer not available for this case type. Review the framework steps and grading criteria.';
}

const ROOM_COLORS = {
  stats: 'var(--purple)',
  rca: 'var(--orange, #f97316)',
  metrics: 'var(--green)',
  estimation: 'var(--blue, #3b82f6)',
  behavioral: 'var(--accent)',
  'product-design': 'var(--purple)',
  prioritization: 'var(--green)',
  cases: 'var(--orange, #f97316)',
};

export function InterviewSimulator({ onBack, onNavigate }) {
  const [screen, setScreen] = useState('setup'); // 'setup' | 'active' | 'debrief'
  const [role, setRole] = useState(null);
  const [session, setSession] = useState(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [revealedCases, setRevealedCases] = useState(new Set());
  const [notes, setNotes] = useState({});
  const [ratings, setRatings] = useState({});
  const intervalRef = useRef(null);

  // Timer
  useEffect(() => {
    if (screen === 'active') {
      intervalRef.current = setInterval(() => {
        setElapsed(e => e + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [screen]);

  function startSimulation() {
    const seed = Math.floor(Date.now() / 86400000);
    const built = buildSession(role, seed);
    setSession(built);
    setCurrentCaseIndex(0);
    setElapsed(0);
    setRevealedCases(new Set());
    setNotes({});
    setRatings({});
    setScreen('active');
  }

  function toggleReveal(idx) {
    setRevealedCases(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function handleNext() {
    if (currentCaseIndex < 4) {
      setCurrentCaseIndex(i => i + 1);
    } else {
      finishSimulation();
    }
  }

  function finishSimulation() {
    clearInterval(intervalRef.current);
    // Save to localStorage
    try {
      const history = JSON.parse(localStorage.getItem('pal-sim-history-v1') || '[]');
      history.unshift({
        date: new Date().toISOString(),
        role,
        elapsedSeconds: elapsed,
        cases: session.map((s, i) => ({
          id: s.case?.id || `case-${i}`,
          room: s.room,
          rating: ratings[i] || null,
        })),
      });
      localStorage.setItem('pal-sim-history-v1', JSON.stringify(history.slice(0, 20)));
    } catch {}
    setScreen('debrief');
  }

  // ── Screen 1: Setup ──────────────────────────────────────────────
  if (screen === 'setup') {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0 0 1.5rem 0',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
          Interview Simulator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          45-minute mock interview. No hints. Real cases. Debrief at the end.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {/* DS Card */}
          <button
            onClick={() => setRole('ds')}
            style={{
              background: role === 'ds' ? 'var(--surface-2)' : 'var(--surface)',
              border: role === 'ds' ? '2px solid var(--accent)' : '2px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>📊</div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
              Data Scientist
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              Stats + RCA + Metrics + Estimation + Behavioral
            </div>
            <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              5 cases
            </div>
          </button>

          {/* PM Card */}
          <button
            onClick={() => setRole('pm')}
            style={{
              background: role === 'pm' ? 'var(--surface-2)' : 'var(--surface)',
              border: role === 'pm' ? '2px solid var(--accent)' : '2px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>🎯</div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
              Product Manager
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              Product Design + Prioritization + Estimation + Behavioral + Cases
            </div>
            <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              5 cases
            </div>
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Pick a random set of cases from your selected role. Timer starts when you begin.
        </p>

        <button
          onClick={startSimulation}
          disabled={!role}
          style={{
            background: role ? 'var(--accent)' : 'var(--surface-2)',
            color: role ? '#000' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: role ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s',
          }}
        >
          Start Simulation →
        </button>
      </div>
    );
  }

  // ── Screen 2: Active Simulation ──────────────────────────────────
  if (screen === 'active' && session) {
    const current = session[currentCaseIndex];
    const roomCase = current?.case;
    const isLast = currentCaseIndex === 4;
    const isRevealed = revealedCases.has(currentCaseIndex);
    const roomColor = ROOM_COLORS[current?.room] || 'var(--accent)';

    const casePromptText =
      (typeof getCasePrompt(roomCase) === 'string'
        ? getCasePrompt(roomCase)
        : JSON.stringify(getCasePrompt(roomCase))) || 'No prompt text available.';

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Progress + Timer bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {session.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: i === currentCaseIndex ? 700 : 400,
                  background: i < currentCaseIndex
                    ? 'var(--green-bg, rgba(34,197,94,0.1))'
                    : i === currentCaseIndex
                      ? 'var(--surface-2)'
                      : 'var(--surface)',
                  color: i < currentCaseIndex
                    ? 'var(--green)'
                    : i === currentCaseIndex
                      ? 'var(--text)'
                      : 'var(--text-muted)',
                  border: i === currentCaseIndex
                    ? '1px solid var(--border)'
                    : '1px solid transparent',
                  cursor: 'default',
                }}
              >
                {i + 1}/5
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '1rem',
            color: elapsed > 2700 ? 'var(--orange, #f97316)' : 'var(--text-muted)',
            fontWeight: 600,
          }}>
            ⏱ {formatTime(elapsed)}
          </div>
        </div>

        {/* Case card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.75rem',
          marginBottom: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{
              background: roomColor,
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}>
              {current?.label}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Case {currentCaseIndex + 1} of 5
            </span>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
            {roomCase?.title || 'Case'}
          </h2>

          <p style={{ color: 'var(--text-secondary, var(--text-muted))', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {casePromptText}
          </p>

          {/* Reveal toggle */}
          {isRevealed && (
            <div style={{
              marginTop: '1.25rem',
              padding: '1rem',
              background: 'var(--surface-2)',
              borderRadius: '8px',
              borderLeft: `3px solid ${roomColor}`,
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Model Answer
              </div>
              <p style={{ color: 'var(--text)', fontSize: '0.87rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {getCaseModelAnswer(roomCase)}
              </p>
            </div>
          )}
        </div>

        {/* Notes */}
        <textarea
          value={notes[currentCaseIndex] || ''}
          onChange={e => setNotes(n => ({ ...n, [currentCaseIndex]: e.target.value }))}
          placeholder="Write your thinking here..."
          style={{
            width: '100%',
            minHeight: '160px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1rem',
            color: 'var(--text)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            marginBottom: '1rem',
          }}
        />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => toggleReveal(currentCaseIndex)}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.6rem 1.25rem',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
          </button>

          <button
            onClick={handleNext}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.5rem',
              color: '#000',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            {isLast ? 'Finish →' : 'Next Case →'}
          </button>
        </div>
      </div>
    );
  }

  // ── Screen 3: Debrief ────────────────────────────────────────────
  if (screen === 'debrief' && session) {
    const RATING_OPTIONS = [
      { value: 'strong', label: 'Strong', color: 'var(--green)' },
      { value: 'ok', label: 'OK', color: 'var(--accent)' },
      { value: 'miss', label: 'Miss', color: 'var(--orange, #f97316)' },
    ];

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
            Debrief
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Total time: <strong style={{ color: 'var(--text)' }}>{formatTime(elapsed)}</strong>
            {' · '}
            Role: <strong style={{ color: 'var(--text)' }}>{role === 'ds' ? 'Data Scientist' : 'Product Manager'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {session.map((s, i) => {
            const roomCase = s?.case;
            const roomColor = ROOM_COLORS[s?.room] || 'var(--accent)';
            return (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: roomColor,
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.18rem 0.55rem',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}>
                    {s.label}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>
                    {roomCase?.title || `Case ${i + 1}`}
                  </span>
                </div>

                {/* Notes */}
                {notes[i] ? (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Your Notes
                    </div>
                    <p style={{ color: 'var(--text)', fontSize: '0.87rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: '6px' }}>
                      {notes[i]}
                    </p>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                    No notes written.
                  </p>
                )}

                {/* Model answer */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Model Answer
                  </div>
                  <p style={{ color: 'var(--text-secondary, var(--text-muted))', fontSize: '0.87rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: '6px', borderLeft: `3px solid ${roomColor}` }}>
                    {getCaseModelAnswer(roomCase)}
                  </p>
                </div>

                {/* Self-rating */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Self-Rate
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {RATING_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setRatings(r => ({ ...r, [i]: opt.value }))}
                        style={{
                          background: ratings[i] === opt.value ? opt.color : 'var(--surface-2)',
                          border: ratings[i] === opt.value ? `2px solid ${opt.color}` : '2px solid var(--border)',
                          borderRadius: '6px',
                          padding: '0.35rem 0.9rem',
                          color: ratings[i] === opt.value ? '#fff' : 'var(--text-muted)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.12s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setScreen('setup')}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.7rem 1.5rem',
              color: '#000',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Run Another Sim
          </button>
          <button
            onClick={onBack}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.7rem 1.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
