function Row({ label, value }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: '0.5rem',
      padding: '0.5rem 0',
      borderBottom: '1px solid #1e2235',
      alignItems: 'start',
    }}>
      <div style={{ fontSize: '0.75rem', color: '#545b7a', fontWeight: 600, paddingTop: '1px' }}>{label}</div>
      <div style={{ fontSize: '0.875rem', color: '#c5c9d8', lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

export function ExperimentDesign({ design }) {
  return (
    <div>
      <div style={{ borderBottom: '1px solid #1e2235', paddingBottom: '0.5rem' }}>
        <Row label="Type" value={<span style={{ fontFamily: 'monospace', color: '#5b7fff' }}>{design.type?.toUpperCase()}</span>} />
        <Row label="Allocation" value={<span className="mono">{design.allocation}</span>} />
        <Row label="Runtime" value={design.runtime} />
        <Row label="Population" value={design.targetPopulation} />
        <Row label="Primary Metric" value={
          <span style={{ fontWeight: 600, color: '#e8eaf0' }}>{design.primaryMetric}</span>
        } />
        {design.guardrailMetrics && design.guardrailMetrics.length > 0 && (
          <Row label="Guardrails" value={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {design.guardrailMetrics.map((g, i) => (
                <span key={i} style={{ color: '#ef4444', fontSize: '0.8rem' }}>⚑ {g}</span>
              ))}
            </div>
          } />
        )}
      </div>
      {design.sampleSizeContext && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.6rem 0.75rem',
          background: '#0d1629',
          border: '1px solid #1d3a6e',
          borderRadius: '4px',
          fontSize: '0.8rem',
          color: '#93b4f5',
          lineHeight: 1.6,
        }}>
          <span style={{ fontWeight: 600, color: '#5b7fff' }}>Power / Sample: </span>
          {design.sampleSizeContext}
        </div>
      )}
    </div>
  );
}
