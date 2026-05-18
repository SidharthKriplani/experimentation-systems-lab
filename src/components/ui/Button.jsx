export function Button({ children, onClick, variant = 'primary', disabled, fullWidth, size = 'md', style: extraStyle }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.15s ease',
    border: '1px solid transparent',
    width: fullWidth ? '100%' : undefined,
    fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1rem' : '0.875rem',
    padding: size === 'sm' ? '0.4rem 0.75rem' : size === 'lg' ? '0.75rem 1.5rem' : '0.55rem 1.1rem',
    ...extraStyle,
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
      borderColor: 'var(--accent)',
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text)',
      borderColor: 'var(--border)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      borderColor: 'transparent',
    },
    danger: {
      background: 'var(--red-bg)',
      color: 'var(--red)',
      borderColor: 'var(--red-border)',
    },
    success: {
      background: 'var(--green-bg)',
      color: 'var(--green)',
      borderColor: 'var(--green-border)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </button>
  );
}
