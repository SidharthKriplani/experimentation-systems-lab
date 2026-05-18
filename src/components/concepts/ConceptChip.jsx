import { conceptsById } from '../../data/concepts.js';

// Inline chip that opens a concept drawer: e.g. <ConceptChip id="srm" onOpen={setOpenConcept} />
export function ConceptChip({ id, onOpen, variant = 'inline' }) {
  const concept = conceptsById[id];
  if (!concept) return null;

  const label = concept.abbreviation || concept.title;

  if (variant === 'pill') {
    // Standalone pill chip, e.g. in "Concepts in this scenario" section
    return (
      <button
        onClick={() => onOpen(id)}
        style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.6rem',
          color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500,
          cursor: 'pointer', transition: 'all 0.12s',
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent-border)';
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.background = 'var(--accent-bg)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.background = 'var(--surface-2)';
        }}
      >
        {concept.title}
        <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>↗</span>
      </button>
    );
  }

  // Default: inline superscript-style chip
  return (
    <button
      onClick={() => onOpen(id)}
      title={`What is ${concept.title}?`}
      style={{
        background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
        borderRadius: '3px', padding: '0.05rem 0.3rem',
        color: 'var(--accent)', fontSize: '0.62rem', fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.1s',
        verticalAlign: 'middle', lineHeight: 1.2, marginLeft: '0.2rem',
        display: 'inline-flex', alignItems: 'center', gap: '0.15rem',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--accent-bg)';
        e.currentTarget.style.color = 'var(--accent)';
      }}
    >
      {label} ↗
    </button>
  );
}

// A "Concepts in this scenario" section block
export function ConceptsSection({ conceptIds, onOpen, title = 'Concepts in this scenario' }) {
  if (!conceptIds?.length) return null;

  const validIds = conceptIds.filter(id => conceptsById[id]);
  if (!validIds.length) return null;

  return (
    <div style={{
      borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '1rem',
    }}>
      <div style={{
        fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'var(--text-dim)', marginBottom: '0.5rem',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {validIds.map(id => (
          <ConceptChip key={id} id={id} onOpen={onOpen} variant="pill" />
        ))}
      </div>
    </div>
  );
}
