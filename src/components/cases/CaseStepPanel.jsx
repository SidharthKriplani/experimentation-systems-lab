// CaseStepPanel — shows one phase at a time with radio options
// Props: { phase, selectedId, onSelect, submitted, stepNumber, totalSteps }

const PHASE_LABELS = {
  clarify:    'Clarify the Decision',
  kpi:        'Choose the KPI',
  hypothesis: 'Frame the Hypothesis',
  data_cut:   'Identify the Data Cut',
  method:     'Choose the Method',
  recommend:  'Structure the Recommendation',
};

const LEVEL_CONFIG = {
  strong:  { color: 'var(--teal)',   bg: 'var(--teal-bg)',   border: 'var(--teal-border)',   label: 'Strong' },
  partial: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)', label: 'Partial' },
  wrong:   { color: 'var(--red)',    bg: 'var(--red-bg)',     border: 'var(--red-border)',    label: 'Needs work' },
};

import { useState } from 'react';

export function CaseStepPanel({ phase, selectedId, onSelect, submitted, stepNumber, totalSteps, answerFeedback, pendingSelectedId }) {
  const [hoveredId, setHoveredId] = useState(null);
  const phaseLabel = PHASE_LABELS[phase.id] || phase.label || phase.id;
  const chosenOption = submitted && selectedId
    ? phase.options.find(o => o.id === selectedId)
    : null;
  const chosenLevel = chosenOption ? LEVEL_CONFIG[chosenOption.level] : null;

  return (
    <div style={{
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      background: 'var(--surface)',
      overflow: 'hidden',
    }}>
      {/* Phase indicator header */}
      <div style={{
        padding: '0.75rem 1.25rem',
        background: 'var(--surface-2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--purple)',
            background: 'var(--purple-bg)', border: '1px solid var(--purple-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.45rem',
          }}>
            Phase {stepNumber} of {totalSteps}
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>
            {phaseLabel}
          </span>
        </div>
        {submitted && chosenLevel && (
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            color: chosenLevel.color, background: chosenLevel.bg, border: `1px solid ${chosenLevel.border}`,
            borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
          }}>
            {chosenLevel.label}
          </span>
        )}
      </div>

      {/* Prompt */}
      <div style={{ padding: '1.1rem 1.25rem 0.75rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.55 }}>
          {phase.prompt}
        </p>
      </div>

      {/* Options */}
      <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {phase.options.map(option => {
          const isSelected = selectedId === option.id;
          const levelCfg = LEVEL_CONFIG[option.level];

          // Colors when submitted
          let borderColor = 'var(--border)';
          let bgColor = 'var(--surface)';
          let labelColor = 'var(--text-secondary)';

          const isHovered = !submitted && !isSelected && hoveredId === option.id;
          if (submitted && isSelected && levelCfg) {
            borderColor = levelCfg.border;
            bgColor = levelCfg.bg;
            labelColor = 'var(--text)';
          } else if (!submitted && isSelected) {
            borderColor = 'var(--purple-border)';
            bgColor = 'var(--purple-bg)';
            labelColor = 'var(--text)';
          } else if (isHovered) {
            borderColor = 'var(--purple-border)';
            bgColor = 'var(--purple-bg)';
          }

          return (
            <div
              key={option.id}
              onClick={() => !submitted && onSelect(option.id)}
              className={option.id === (pendingSelectedId || selectedId) && answerFeedback ? answerFeedback : ''}
              style={{
                border: `1.5px solid ${borderColor}`,
                borderRadius: 'var(--radius-sm)',
                background: bgColor,
                padding: '0.75rem 0.9rem',
                cursor: submitted ? 'default' : 'pointer',
                transition: 'all 0.1s',
              }}
              onMouseEnter={() => { if (!submitted && !isSelected) setHoveredId(option.id); }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Option label row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                {/* Radio dot */}
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  border: `2px solid ${submitted && isSelected && levelCfg ? levelCfg.color : isSelected ? 'var(--purple)' : 'var(--border)'}`,
                  background: submitted && isSelected && levelCfg ? levelCfg.color : isSelected ? 'var(--purple)' : 'transparent',
                  flexShrink: 0, marginTop: '2px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSelected && (
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#fff',
                    }} />
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: labelColor, margin: 0, lineHeight: 1.55, flex: 1 }}>
                  {option.label}
                </p>
              </div>

              {/* Feedback — only shown after submit */}
              {submitted && isSelected && option.feedback && (
                <div style={{
                  marginTop: '0.65rem',
                  paddingTop: '0.6rem',
                  borderTop: `1px solid ${levelCfg ? levelCfg.border : 'var(--border)'}`,
                  paddingLeft: '1.65rem',
                }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {option.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
