import { getScoreLevel } from '../../utils/scoring.js';

function Section({ title, children, color }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{
        fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: color || 'var(--text-dim)',
        marginBottom: '0.6rem', paddingBottom: '0.4rem',
        borderBottom: `1px solid var(--border-subtle)`,
      }}>{title}</div>
      {children}
    </div>
  );
}

function FlagList({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '0.855rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DebriefPanel({ scenario, selectedDecisionId }) {
  const selectedDecision = scenario.decisions.find(d => d.id === selectedDecisionId);
  const idealDecision = scenario.decisions.find(d => d.id === scenario.idealDecision);
  const scoreLevel = selectedDecision ? getScoreLevel(selectedDecision.score) : null;

  return (
    <div>
      {/* Decision Feedback */}
      {selectedDecision && (
        <Section title="Your Decision — Feedback" color={scoreLevel?.color}>
          <div style={{
            background: scoreLevel ? scoreLevel.bg : 'var(--surface)',
            border: `1px solid ${scoreLevel ? scoreLevel.border : 'var(--border)'}`,
            borderRadius: '6px', padding: '0.875rem',
            fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7,
          }}>
            {selectedDecision.feedback}
          </div>
        </Section>
      )}

      {/* Ideal Decision */}
      {idealDecision && selectedDecision?.id !== idealDecision.id && (
        <Section title="Best Available Decision" color="var(--green)">
          <div style={{
            background: 'var(--green-bg)', border: '1px solid var(--green-border)',
            borderRadius: '6px', padding: '0.875rem', marginBottom: '0.5rem',
          }}>
            <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              {idealDecision.label}
            </div>
            <div style={{ fontSize: '0.855rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {idealDecision.feedback}
            </div>
          </div>
        </Section>
      )}

      {/* Senior Analyst Debrief */}
      <Section title="Senior Analyst Debrief">
        <div style={{
          fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75,
          whiteSpace: 'pre-line', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem',
        }}>
          {scenario.debrief}
        </div>
      </Section>

      {/* Junior Mistake */}
      {scenario.juniorMistake && (
        <Section title="The Junior Miss" color="var(--red)">
          <div style={{
            background: 'var(--red-bg)', border: '1px solid var(--red-border)',
            borderRadius: '6px', padding: '0.75rem',
            fontSize: '0.855rem', color: 'var(--red)', lineHeight: 1.65,
          }}>
            {scenario.juniorMistake}
          </div>
        </Section>
      )}

      {/* Senior Flags */}
      {scenario.seniorFlags?.length > 0 && (
        <Section title="Senior-Level Flags" color="var(--green)">
          <FlagList items={scenario.seniorFlags} />
        </Section>
      )}

      {/* Staff Flags */}
      {scenario.staffFlags?.length > 0 && (
        <Section title="Staff-Level Flags" color="var(--purple)">
          <FlagList items={scenario.staffFlags} />
        </Section>
      )}

      {/* Interview Takeaway */}
      {scenario.interviewTakeaway && (
        <Section title="Interview Takeaway">
          <div style={{
            background: 'var(--blue-bg)', border: '1px solid var(--blue-border)',
            borderRadius: '6px', padding: '0.75rem',
            fontSize: '0.875rem', color: 'var(--blue-text)', lineHeight: 1.65, fontStyle: 'italic',
          }}>
            {scenario.interviewTakeaway}
          </div>
        </Section>
      )}

      {/* Related Concepts */}
      {scenario.relatedConcepts?.length > 0 && (
        <Section title="Related Concepts">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {scenario.relatedConcepts.map((c, i) => (
              <span key={i} style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '4px', padding: '0.2rem 0.55rem',
                fontSize: '0.75rem', color: 'var(--text-muted)',
              }}>{c}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
