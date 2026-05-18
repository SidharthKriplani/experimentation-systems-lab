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
      background: '#5b7fff',
      color: '#fff',
      borderColor: '#5b7fff',
    },
    secondary: {
      background: '#1a1d27',
      color: '#e8eaf0',
      borderColor: '#2d3148',
    },
    ghost: {
      background: 'transparent',
      color: '#8890a8',
      borderColor: 'transparent',
    },
    danger: {
      background: '#2e0d0d',
      color: '#ef4444',
      borderColor: '#ef4444',
    },
    success: {
      background: '#0d2e1a',
      color: '#22c55e',
      borderColor: '#22c55e',
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
