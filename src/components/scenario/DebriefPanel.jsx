import { getScoreLevel } from '../../utils/scoring.js';

function Section({ title, children, color }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: color || '#545b7a',
        marginBottom: '0.6rem',
        paddingBottom: '0.4rem',
        borderBottom: `1px solid ${color ? color + '33' : '#1e2235'}`,
      }}>{title}</div>
      {children}
    </div>
  );
}

function FlagList({ items, color }) {
  return (
    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '0.855rem', color: '#c5c9d8', lineHeight: 1.65 }}>
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
            background: scoreLevel ? scoreLevel.bg : '#1a1d27',
            border: `1px solid ${scoreLevel ? scoreLevel.border + '44' : '#2d3148'}`,
            borderRadius: '6px',
            padding: '0.875rem',
            fontSize: '0.875rem',
            color: '#c5c9d8',
            lineHeight: 1.7,
          }}>
            {selectedDecision.feedback}
          </div>
        </Section>
      )}

      {/* Ideal Decision */}
      {idealDecision && selectedDecision?.id !== idealDecision.id && (
        <Section title="Best Available Decision" color="#22c55e">
          <div style={{
            background: '#0d2e1a',
            border: '1px solid #22c55e44',
            borderRadius: '6px',
            padding: '0.875rem',
            marginBottom: '0.5rem',
          }}>
            <div style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              {idealDecision.label}
            </div>
            <div style={{ fontSize: '0.855rem', color: '#c5c9d8', lineHeight: 1.7 }}>
              {idealDecision.feedback}
            </div>
          </div>
        </Section>
      )}

      {/* Senior Analyst Debrief */}
      <Section title="Senior Analyst Debrief">
        <div style={{
          fontSize: '0.9rem',
          color: '#c5c9d8',
          lineHeight: 1.75,
          whiteSpace: 'pre-line',
          background: '#1a1d27',
          border: '1px solid #2d3148',
          borderRadius: '6px',
          padding: '1rem',
        }}>
          {scenario.debrief}
        </div>
      </Section>

      {/* Junior Mistake */}
      {scenario.juniorMistake && (
        <Section title="The Junior Miss" color="#ef4444">
          <div style={{
            background: '#2e0d0d',
            border: '1px solid #ef444433',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '0.855rem',
            color: '#fca5a5',
            lineHeight: 1.65,
          }}>
            {scenario.juniorMistake}
          </div>
        </Section>
      )}

      {/* Senior Flags */}
      {scenario.seniorFlags?.length > 0 && (
        <Section title="Senior-Level Flags" color="#22c55e">
          <FlagList items={scenario.seniorFlags} />
        </Section>
      )}

      {/* Staff Flags */}
      {scenario.staffFlags?.length > 0 && (
        <Section title="Staff-Level Flags" color="#a78bfa">
          <FlagList items={scenario.staffFlags} />
        </Section>
      )}

      {/* Interview Takeaway */}
      {scenario.interviewTakeaway && (
        <Section title="Interview Takeaway">
          <div style={{
            background: '#0d1629',
            border: '1px solid #1d3a6e',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '0.875rem',
            color: '#93b4f5',
            lineHeight: 1.65,
            fontStyle: 'italic',
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
                background: '#1a1d27',
                border: '1px solid #2d3148',
                borderRadius: '4px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.75rem',
                color: '#8890a8',
              }}>{c}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
