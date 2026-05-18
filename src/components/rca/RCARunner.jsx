import { useState } from 'react';
import { RCAStepPanel } from './RCAStepPanel.jsx';
import { RCAScoreReveal } from './RCAScoreReveal.jsx';
import { RCADebriefPanel } from './RCADebriefPanel.jsx';
import { saveRCAAttempt } from '../../utils/rcaProgress.js';

// ─── Scoring ────────────────────────────────────────────────────────────────
function scoreStep(level) {
  if (level === 'strong') return 2;
  if (level === 'partial') return 1;
  return 0;
}
function computeScore(rcaCase, stepChoices) {
  let score = 0;
  const maxScore = rcaCase.diagnosisSteps.length * 2;
  for (const step of rcaCase.diagnosisSteps) {
    const chosenId = stepChoices[step.id];
    if (chosenId) {
      const opt = step.options.find(o => o.id === chosenId);
      if (opt) score += scoreStep(opt.level);
    }
  }
  const pct = maxScore > 0 ? score / maxScore : 0;
  let level;
  if (pct >= 0.8) level = 'staff';
  else if (pct >= 0.6) level = 'senior';
  else if (pct >= 0.4) level = 'analyst';
  else level = 'junior';
  return { score, maxScore, level, pct };
}

// ─── Level indicator dot ─────────────────────────────────────────────────────
const LEVEL_DOT = {
  strong:  'var(--teal)',
  partial: 'var(--yellow)',
  wrong:   'var(--red)',
};

// ─── Main Runner ─────────────────────────────────────────────────────────────
export function RCARunner({ rcaCase, savedProgress, unlocked, onBack }) {
  const startView = savedProgress ? 'debrief' : 'diagnosis';
  const [view, setView] = useState(startView);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepChoices, setStepChoices] = useState(savedProgress?.stepChoices || {});
  const [pendingChoice, setPendingChoice] = useState(null); // selected but not yet submitted
  const [submittedSteps, setSubmittedSteps] = useState(
    savedProgress
      ? Object.fromEntries(Object.keys(savedProgress.stepChoices || {}).map(k => [k, true]))
      : {}
  );
  const [scoreResult, setScoreResult] = useState(null);

  const steps = rcaCase.diagnosisSteps;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const currentStepSubmitted = submittedSteps[currentStep?.id];

  function handleRetry() {
    setView('diagnosis');
    setCurrentStepIndex(0);
    setStepChoices({});
    setPendingChoice(null);
    setSubmittedSteps({});
    setScoreResult(null);
  }

  function handleSelectOption(optionId) {
    if (currentStepSubmitted) return;
    setPendingChoice(optionId);
  }

  function handleSubmitStep() {
    if (!pendingChoice) return;
    const newChoices = { ...stepChoices, [currentStep.id]: pendingChoice };
    const newSubmitted = { ...submittedSteps, [currentStep.id]: true };
    setStepChoices(newChoices);
    setSubmittedSteps(newSubmitted);
    setPendingChoice(null);
  }

  function handleNextStep() {
    if (isLastStep) {
      const result = computeScore(rcaCase, stepChoices);
      setScoreResult(result);
      saveRCAAttempt(rcaCase.id, stepChoices, result.score, result.level);
      setView('reveal');
    } else {
      setCurrentStepIndex(i => i + 1);
    }
  }

  function handleShowDebrief() {
    setView('debrief');
  }

  const activeChoiceId = currentStepSubmitted
    ? stepChoices[currentStep?.id]
    : pendingChoice;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1rem' }}>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600,
          padding: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--yellow)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        ← RCA Room
      </button>

      {/* Case title */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', marginBottom: '0.3rem' }}>
          {rcaCase.subtitle}
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
          {rcaCase.title}
        </h2>
        {savedProgress && view === 'debrief' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem',
            fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)',
            background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.5rem',
          }}>
            Previously completed
          </div>
        )}
      </div>

      {/* Context panel (always visible in diagnosis) */}
      {(view === 'diagnosis') && (
        <ContextPanel context={rcaCase.context} />
      )}

      {/* ─── Diagnosis View ─────────────────────────────────────────── */}
      {view === 'diagnosis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

          {/* Completed steps (collapsed) */}
          {steps.slice(0, currentStepIndex).map((step, i) => {
            const chosenId = stepChoices[step.id];
            const chosenOpt = chosenId ? step.options.find(o => o.id === chosenId) : null;
            return (
              <CompletedStepCard
                key={step.id}
                step={step}
                stepNumber={i + 1}
                chosenOption={chosenOpt}
              />
            );
          })}

          {/* Active step */}
          <RCAStepPanel
            step={currentStep}
            selectedId={activeChoiceId}
            onSelect={handleSelectOption}
            submitted={!!currentStepSubmitted}
            stepNumber={currentStepIndex + 1}
            totalSteps={steps.length}
          />

          {/* Submit / Next controls */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
            {!currentStepSubmitted && (
              <button
                onClick={handleSubmitStep}
                disabled={!pendingChoice}
                style={{
                  background: pendingChoice ? 'var(--yellow-bg)' : 'var(--surface-2)',
                  border: `1.5px solid ${pendingChoice ? 'var(--yellow-border)' : 'var(--border)'}`,
                  color: pendingChoice ? 'var(--yellow)' : 'var(--text-muted)',
                  borderRadius: 'var(--radius)',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.85rem', fontWeight: 700,
                  cursor: pendingChoice ? 'pointer' : 'not-allowed',
                  transition: 'all 0.12s',
                }}
              >
                Submit this step
              </button>
            )}
            {currentStepSubmitted && (
              <button
                onClick={handleNextStep}
                style={{
                  background: 'var(--yellow-bg)',
                  border: '1.5px solid var(--yellow-border)',
                  color: 'var(--yellow)',
                  borderRadius: 'var(--radius)',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.85rem', fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--yellow)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--yellow-bg)'}
              >
                {isLastStep ? 'See results →' : 'Next step →'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── Score Reveal ───────────────────────────────────────────── */}
      {view === 'reveal' && scoreResult && (
        <RCAScoreReveal
          score={scoreResult.score}
          maxScore={scoreResult.maxScore}
          level={scoreResult.level}
          stepChoices={stepChoices}
          rcaCase={rcaCase}
          onContinue={handleShowDebrief}
        />
      )}

      {/* ─── Debrief ────────────────────────────────────────────────── */}
      {view === 'debrief' && (
        <RCADebriefPanel
          rcaCase={rcaCase}
          onRetry={handleRetry}
          onBack={onBack}
        />
      )}
    </div>
  );
}

// ─── Context Panel ────────────────────────────────────────────────────────────
function ContextPanel({ context }) {
  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '1rem 1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Case Context
      </div>

      {/* Metric movement */}
      <div style={{
        background: 'var(--yellow-bg)',
        border: '1px solid var(--yellow-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 0.75rem',
        marginBottom: '0.75rem',
        fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5,
      }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--yellow)', marginRight: '0.5rem' }}>
          Metric
        </span>
        {context.metricMovement}
      </div>

      {/* Business impact + time window */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <MetaItem label="Business Impact" value={context.businessImpact} />
        <MetaItem label="Time Window" value={context.timeWindow} />
      </div>

      {/* Known facts */}
      <div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Known Facts
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {context.knownFacts.map((fact, i) => (
            <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{label}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{value}</div>
    </div>
  );
}

// ─── Completed Step Card (collapsed) ─────────────────────────────────────────
const LEVEL_DOT_COLOR = {
  strong:  'var(--teal)',
  partial: 'var(--yellow)',
  wrong:   'var(--red)',
};
const LEVEL_LABEL_MAP = {
  strong:  'Strong',
  partial: 'Partial',
  wrong:   'Incorrect',
};

function CompletedStepCard({ step, stepNumber, chosenOption }) {
  const dotColor = chosenOption ? (LEVEL_DOT_COLOR[chosenOption.level] || 'var(--text-muted)') : 'var(--text-muted)';
  const levelLabel = chosenOption ? (LEVEL_LABEL_MAP[chosenOption.level] || '') : '';

  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.6rem 0.9rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      opacity: 0.8,
    }}>
      {/* Dot indicator */}
      <div style={{
        width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
        background: dotColor,
      }} />
      {/* Step label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
          Step {stepNumber} · {step.label}
        </span>
        {chosenOption && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.6rem' }}>
            — {chosenOption.label.length > 60 ? chosenOption.label.slice(0, 60) + '…' : chosenOption.label}
          </span>
        )}
      </div>
      {/* Level badge */}
      {levelLabel && (
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
          color: dotColor, flexShrink: 0,
        }}>
          {levelLabel}
        </span>
      )}
    </div>
  );
}
