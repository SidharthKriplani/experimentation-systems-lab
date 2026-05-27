// The core interaction unit: situation, setup, question, options

export function StatsDecisionCard({ module, selectedId, onSelect, submitted }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Situation */}
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius)', padding: '1.1rem 1.2rem',
      }}>
        <SituationLabel>The situation</SituationLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <Row label="Company" value={module.situation.company} />
          <Row label="Product" value={module.situation.product} />
          <Row label="Context" value={module.situation.context} />
          {module.situation.decisionPressure && (
            <div style={{
              marginTop: '0.3rem',
              background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
              borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.65rem',
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--yellow)', marginBottom: '0.2rem' }}>Business pressure</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{module.situation.decisionPressure}</p>
            </div>
          )}
        </div>
      </div>

      {/* Setup / Data */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '1.1rem 1.2rem',
      }}>
        <SituationLabel>The data</SituationLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <DataRow label="Metric" value={module.setup.metric} />
          <DataRow label="Baseline" value={module.setup.baseline} />
          <DataRow label="Result" value={module.setup.observedResult} highlight />
          <DataRow label="Sample" value={module.setup.sampleInfo} />
          {module.setup.caveat && (
            <div style={{
              marginTop: '0.25rem',
              background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--accent-border)',
              borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.65rem',
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Also note</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{module.setup.caveat}</p>
            </div>
          )}
        </div>
      </div>

      {/* Claim to Evaluate (STAT01-04 only) */}
      {module.claim && (
        <div style={{
          background: 'var(--teal-bg)', border: '1.5px solid var(--teal-border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.2rem',
        }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.09em', color: 'var(--teal)', marginBottom: '0.5rem',
          }}>Claim to evaluate</div>
          <p style={{
            fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)',
            lineHeight: 1.55, margin: 0, fontStyle: 'italic',
          }}>{module.claim}</p>
        </div>
      )}

      {/* Question + Options */}
      <div>
        <p style={{
          fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)',
          lineHeight: 1.5, margin: '0 0 0.9rem',
        }}>
          {module.question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {module.options.map(opt => {
            const isSelected = selectedId === opt.id;
            const isSubmitted = submitted;

            let borderColor = isSelected ? 'var(--accent-border)' : 'var(--border)';
            let bg = isSelected ? 'var(--accent-bg)' : 'var(--surface-2)';
            let textColor = isSelected ? 'var(--accent)' : 'var(--text-secondary)';

            if (isSubmitted && isSelected) {
              if (opt.level === 'strong' || opt.level === 'staff') {
                borderColor = 'var(--teal-border)'; bg = 'var(--teal-bg)'; textColor = 'var(--teal)';
              } else if (opt.level === 'partial') {
                borderColor = 'var(--yellow-border)'; bg = 'var(--yellow-bg)'; textColor = 'var(--yellow)';
              } else {
                borderColor = 'var(--red-border)'; bg = 'var(--red-bg)'; textColor = 'var(--red)';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => !submitted && onSelect(opt.id)}
                disabled={submitted}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '0.75rem 0.9rem',
                  background: bg,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 'var(--radius)',
                  cursor: submitted ? 'default' : 'pointer',
                  textAlign: 'left', width: '100%',
                  transition: 'all 0.1s',
                }}
                onMouseEnter={e => {
                  if (!submitted && !isSelected) {
                    e.currentTarget.style.borderColor = 'var(--accent-border)';
                    e.currentTarget.style.background = 'var(--accent-bg)';
                  }
                }}
                onMouseLeave={e => {
                  if (!submitted && !isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface-2)';
                  }
                }}
              >
                <div style={{
                  width: '1rem', height: '1rem',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--accent)' : 'transparent',
                  flexShrink: 0, marginTop: '0.15rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSelected && <span style={{ color: '#fff', fontSize: '0.5rem', fontWeight: 900 }}>●</span>}
                </div>
                <span style={{ fontSize: '0.87rem', color: textColor, lineHeight: 1.5, fontWeight: isSelected ? 600 : 400 }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SituationLabel({ children }) {
  return (
    <div style={{
      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '0.6rem',
    }}>{children}</div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', minWidth: '68px', paddingTop: '0.05rem', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

function DataRow({ label, value, highlight }) {
  return (
    <div style={{
      display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
      background: highlight ? 'var(--surface-2)' : 'transparent',
      borderRadius: highlight ? 'var(--radius-sm)' : 0,
      padding: highlight ? '0.3rem 0.4rem' : '0',
      marginLeft: highlight ? '-0.4rem' : '0',
    }}>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', minWidth: '68px', paddingTop: '0.05rem', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '0.84rem', color: highlight ? 'var(--text)' : 'var(--text-secondary)', fontWeight: highlight ? 600 : 400, lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}
