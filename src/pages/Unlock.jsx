import { useState } from 'react';
import { tryUnlock } from '../utils/unlock.js';

export function Unlock({ onUnlocked, alreadyUnlocked, onNavigate }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (tryUnlock(code)) {
      setSuccess(true);
      setError('');
      setTimeout(() => onUnlocked(), 1200);
    } else {
      setError('Invalid code. Check the community link or ask the founder for an invite.');
    }
  }

  if (alreadyUnlocked) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green)', marginBottom: '0.75rem' }}>Full Access Active</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          All 150+ practice cases across 17 rooms are unlocked. Progress is saved locally.
        </p>
        <button
          onClick={() => onNavigate('progress')}
          style={{
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: '6px', padding: '0.6rem 1.5rem',
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          }}
        >
          View My Progress →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px', margin: '4rem auto', padding: '2rem 1.5rem' }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: 'var(--shadow)',
      }}>
        {/* What you get — free vs premium */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔑</div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.4rem', margin: '0 0 0.4rem 0' }}>
              Unlock Full Access
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>
              Enter a community access code to unlock all content.
            </p>
          </div>

          {/* Free vs premium comparison */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '0.9rem',
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Free
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 1rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <li>3 cases per room</li>
                <li>All Foundations modules</li>
                <li>Full Defense Strategy</li>
                <li>Progress tracking</li>
              </ul>
            </div>
            <div style={{
              background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
              borderRadius: '8px', padding: '0.9rem',
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                With code
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 1rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <li>Full case banks (150+)</li>
                <li>Company Tracks</li>
                <li>Full Behavioral bank</li>
                <li>Interview Simulator</li>
              </ul>
            </div>
          </div>
        </div>

        {success ? (
          <div style={{
            background: 'var(--green-bg)', border: '1px solid var(--green-border)',
            borderRadius: '6px', padding: '1rem', textAlign: 'center',
            color: 'var(--green)', fontWeight: 700, fontSize: '0.9rem',
          }}>
            ✓ Code accepted — unlocking full access...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '0.875rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Access Code
              </label>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                placeholder="PAL-XXXX-XXXX"
                autoComplete="off"
                autoCapitalize="characters"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'var(--input-bg)', border: `1px solid ${error ? 'var(--red-border)' : 'var(--border)'}`,
                  borderRadius: '6px', padding: '0.6rem 0.875rem',
                  color: 'var(--text)', fontSize: '0.95rem',
                  fontFamily: 'monospace', letterSpacing: '0.05em',
                  outline: 'none',
                }}
              />
              {error && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--red)' }}>{error}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!code.trim()}
              style={{
                width: '100%',
                background: code.trim() ? 'var(--accent)' : 'var(--surface-2)',
                color: code.trim() ? '#fff' : 'var(--text-dim)',
                border: `1px solid ${code.trim() ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '6px', padding: '0.65rem',
                fontWeight: 700, fontSize: '0.9rem', cursor: code.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
            >
              Unlock Full Access
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.73rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.5 }}>
          Access code from the PAL community or a direct invite. Stored locally — no account needed.
        </div>
      </div>
    </div>
  );
}
