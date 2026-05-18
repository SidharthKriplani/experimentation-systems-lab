export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1e2235',
      padding: '1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <span style={{ color: '#545b7a', fontSize: '0.8rem' }}>
          Experimentation Systems Lab — V1 · 8 Scenarios
        </span>
        <span style={{ color: '#545b7a', fontSize: '0.8rem' }}>
          Static · No backend · No API calls · localStorage only
        </span>
      </div>
    </footer>
  );
}
