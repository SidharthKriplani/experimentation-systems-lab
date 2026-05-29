// Single field panel — shows label, prompt, radio options, and post-submit rationale

import { useState } from 'react';

export function MetricChoicePanel({ field, selectedId, onSelect, submitted }) {
  const [hoveredId, setHoveredId] = useState(null);
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}>
      {/* Field label */}
      <div style={{
        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.09em', color: 'var(--teal)',
      }}>{field.label}</div>

      {/* Prompt */}
      <p style={{
        fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)',
        lineHeight: 1.55, margin: 0,
      }}>{field.prompt}</p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {field.options.map(opt => {
          const isSelected = selectedId === opt.id;

          const isHovered = !submitted && !isSelected && hoveredId === opt.id;
          let borderColor = isSelected ? 'var(--teal-border)' : isHovered ? 'var(--teal-border)' : 'var(--border)';
          let bg = isSelected ? 'var(--teal-bg)' : isHovered ? 'var(--teal-bg)' : 'var(--surface-2)';
          let textColor = isSelected ? 'var(--teal)' : 'var(--text-secondary)';
          let radioColor = isSelected ? 'var(--teal)' : 'var(--border)';

          if (submitted && isSelected) {
            if (opt.scoreValue === 2) {
              borderColor = 'var(--green-border)'; bg = 'var(--green-bg)'; textColor = 'var(--green-text)';
            } else if (opt.scoreValue === 1) {
              borderColor = 'var(--yellow-border)'; bg = 'var(--yellow-bg)'; textColor = 'var(--yellow)';
            } else {
              borderColor = 'var(--red-border)'; bg = 'var(--red-bg)'; textColor = 'var(--red)';
            }
            radioColor = textColor;
          }

          return (
            <button
              key={opt.id}
              onClick={() => !submitted && onSelect(opt.id)}
              disabled={submitted}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.7rem',
                padding: '0.7rem 0.85rem',
                background: bg,
                border: `1.5px solid ${borderColor}`,
                borderRadius: 'var(--radius)',
                cursor: submitted ? 'default' : 'pointer',
                textAlign: 'left', width: '100%',
                transition: 'all 0.1s',
              }}
              onMouseEnter={() => { if (!submitted && !isSelected) setHoveredId(opt.id); }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Radio dot */}
              <div style={{
                width: '1rem', height: '1rem', flexShrink: 0,
                borderRadius: '50%',
                border: `2px solid ${radioColor}`,
                background: isSelected ? radioColor : 'transparent',
                marginTop: '0.12rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isSelected && <span style={{ color: '#fff', fontSize: '0.45rem', fontWeight: 900 }}>●</span>}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: '0.85rem', color: textColor, lineHeight: 1.5,
                  fontWeight: isSelected ? 600 : 400,
                }}>
                  {opt.label}
                </span>

                {/* Rationale — only shown after submit for the selected option */}
                {submitted && isSelected && (
                  <div style={{
                    marginTop: '0.55rem',
                    paddingTop: '0.55rem',
                    borderTop: `1px solid ${borderColor}`,
                  }}>
                    <div style={{
                      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.07em', color: textColor, marginBottom: '0.3rem',
                    }}>
                      {opt.scoreValue === 2 ? 'Strong choice' : opt.scoreValue === 1 ? 'Partial credit' : 'Weak choice'}
                    </div>
                    <p style={{
                      fontSize: '0.8rem', color: 'var(--text-secondary)',
                      margin: 0, lineHeight: 1.55,
                    }}>{opt.rationale}</p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
