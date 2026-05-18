export function Badge({ children, color, bg, border, size = 'sm' }) {
  const padding = size === 'lg' ? '0.35rem 0.9rem' : '0.2rem 0.55rem';
  const fontSize = size === 'lg' ? '0.8rem' : '0.68rem';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      color: color || 'var(--text-muted)',
      background: bg || 'var(--surface-2)',
      border: `1px solid ${border || 'var(--border)'}`,
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
    analyst: { label: 'Analyst', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
    senior: { label: 'Senior', color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
    staff: { label: 'Staff', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
  };
  const d = map[difficulty] || map.analyst;
  return <Badge color={d.color} bg={d.bg} border={d.border}>{d.label}</Badge>;
}

export function IndustryBadge({ industry }) {
  return (
    <Badge color="var(--text-muted)" bg="var(--surface-2)" border="var(--border)">
      {industry}
    </Badge>
  );
}

export function ThemeBadge({ theme }) {
  const label = theme?.replace(/_/g, ' ') || theme;
  return <Badge color="var(--text-muted)" bg="var(--surface-2)" border="var(--border)">{label}</Badge>;
}
