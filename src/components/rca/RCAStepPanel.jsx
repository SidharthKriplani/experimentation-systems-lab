const LEVEL_STYLE = {
  strong:  { border: 'var(--teal)',   bg: 'var(--teal-bg)',   label: 'Strong answer' },
  partial: { border: 'var(--yellow)', bg: 'var(--yellow-bg)', label: 'Partial credit' },
  wrong:   { border: 'var(--red)',    bg: 'var(--red-bg)',    label: 'Incorrect' },
};

export function RCAStepPanel({ step, selectedId, onSelect, submitted, stepNumber, totalSteps }) {
  const selectedOption = submitted && selectedId
    ? step.options.find(o => o.id === selectedId)
    : null;
  const levelStyle = selectedOption ? LEVEL_STYLE[selectedOption.level] || LEVEL_STYLE.wrong : null;

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid var(--border)`,
      borderRadius: 'var(--radius)',
      padding: '1.25rem',
      transition: 'border-color 0.15s',
    }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.5rem',
        }}>
          Step {stepNumber} of {totalSteps}
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {step.label}
        </span>
      </div>

      {/* Prompt */}
      <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6, margin: '0 0 1rem', fontWeight: 500 }}>
        {step.prompt}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {step.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isSubmittedChosen = submitted && isSelected;
          const optLevelStyle = isSubmittedChosen ? (LEVEL_STYLE[opt.level] || LEVEL_STYLE.wrong) : null;

          return (
            <div
              key={opt.id}
              onClick={() => !submitted && onSelect(opt.id)}
              style={{
                border: isSubmittedChosen
                  ? `2px solid ${optLevelStyle.border}`
                  : isSelected
                    ? '2px solid var(--accent)'
                    : '1.5px solid var(--border)',
                background: isSubmittedChosen
                  ? optLevelStyle.bg
                  : isSelected
                    ? 'var(--accent-bg)'
                    : 'var(--surface-2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                cursor: submitted ? 'default' : 'pointer',
                transition: 'border-color 0.12s, background 0.12s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
              onMouseEnter={e => {
                if (!submitted && !isSelected) {
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                }
              }}
              onMouseLeave={e => {
                if (!submitted && !isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                {/* Radio indicator */}
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                  border: isSubmittedChosen
                    ? `2px solid ${optLevelStyle.border}`
                    : isSelected
                      ? '2px solid var(--accent)'
                      : '2px solid var(--border)',
                  background: isSelected ? (isSubmittedChosen ? optLevelStyle.border : 'var(--accent)') : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSelected && (
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--bg)',
                    }} />
                  )}
                </div>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  lineHeight: 1.5,
                  fontWeight: isSelected ? 600 : 400,
                }}>
                  {opt.label}
                </span>
              </div>

              {/* Feedback (only shown after submit, for selected option) */}
              {isSubmittedChosen && (
                <div style={{
                  marginLeft: '1.6rem',
                  padding: '0.5rem 0.7rem',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `3px solid ${optLevelStyle.border}`,
                }}>
                  <div style={{
                    fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: optLevelStyle.border, marginBottom: '0.3rem',
                  }}>
                    {optLevelStyle.label}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {opt.feedback}
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
