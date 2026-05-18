export function Badge({ children, color, bg, border, size = 'sm' }) {
  const padding = size === 'lg' ? '0.35rem 0.9rem' : '0.2rem 0.55rem';
  const fontSize = size === 'lg' ? '0.8rem' : '0.68rem';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      color: color || '#8890a8',
      background: bg || '#1a1d27',
      border: `1px solid ${border || '#2d3148'}`,
      borderRadius: '4px',
      padding,
      fontSize,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }) {
  const map = {
    analyst: { label: 'Analyst', color: '#60a5fa', bg: '#0d1f3a', border: '#1d4ed8' },
    senior: { label: 'Senior', color: '#f59e0b', bg: '#2e200d', border: '#92400e' },
    staff: { label: 'Staff', color: '#a78bfa', bg: '#1e1030', border: '#7c3aed' },
  };
  const d = map[difficulty] || map.analyst;
  return <Badge color={d.color} bg={d.bg} border={d.border}>{d.label}</Badge>;
}

export function IndustryBadge({ industry }) {
  const map = {
    ecommerce: '#10b981',
    saas: '#5b7fff',
    fintech: '#f59e0b',
    consumer: '#ec4899',
    marketplace: '#f97316',
    b2b: '#8890a8',
  };
  const color = map[industry] || '#8890a8';
  return (
    <Badge color={color} bg="#1a1d27" border={color}>
      {industry}
    </Badge>
  );
}

export function ThemeBadge({ theme }) {
  const label = theme?.replace(/_/g, ' ') || theme;
  return <Badge color="#8890a8" bg="#1a1d27" border="#2d3148">{label}</Badge>;
}
