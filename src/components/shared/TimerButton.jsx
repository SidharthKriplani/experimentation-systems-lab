import { Icon } from './Icon.jsx';

/**
 * TimerButton — shared timer display with pause/resume toggle.
 * Tooltip explains the timer is for self-awareness only (no scoring impact).
 * Replaces the plain <span className="pal-timer"> across all runners.
 *
 * Props:
 *   elapsed  — integer seconds elapsed
 *   paused   — boolean
 *   onToggle — () => void
 *   warning  — boolean (renders red/warning style when true, e.g. elapsed > 600)
 */
export function TimerButton({ elapsed, paused, onToggle, warning }) {
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const display = m + ':' + s.toString().padStart(2, '0');

  return (
    <button
      onClick={onToggle}
      title="Tracks time for self-awareness — does not affect scoring. Click to pause or resume."
      className={'pal-timer' + (warning && !paused ? ' warning' : '')}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.15rem 0.4rem',
        borderRadius: '4px',
        opacity: paused ? 0.5 : 1,
        transition: 'opacity 0.15s',
        marginLeft: 'auto',
      }}
    >
      {paused ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <Icon name="clock" size={12} color="currentColor" />
      )}
      {display}
    </button>
  );
}
