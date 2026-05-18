import { WarningFlags } from './WarningFlags.jsx';

export function FlagChecklist({ flags, checked, onToggle }) {
  if (!flags || flags.length === 0) return null;

  const checkedCount = checked?.length || 0;
  const total = flags.length;

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '0.75rem',
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)' }}>
            Self-Reflection: What did you notice?
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
            Check each flag you identified before deciding. Not graded — this is for your own calibration.
          </div>
        </div>
        <div style={{
          fontSize: '0.8rem', fontWeight: 700,
          color: checkedCount === total ? 'var(--green)' : 'var(--text-muted)',
          whiteSpace: 'nowrap', marginLeft: '1rem',
        }}>
          {checkedCount}/{total}
        </div>
      </div>
      <WarningFlags flags={flags} checked={checked} onToggle={onToggle} interactive={true} />
    </div>
  );
}
