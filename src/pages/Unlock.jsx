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
      setTimeout(() => onUnlocked(), 1500);
    } else {
      setError('Invalid code. Check your access email or wait for the public launch.');
    }
  }

  if (alreadyUnlocked) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green)', marginBottom: '0.75rem' }}>Beta Access Active</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          All 100+ practice cases across 9 rooms are unlocked.
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
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>
            Private Beta Access
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Access all 100+ practice cases across 9 rooms.
            Progress is saved locally in your browser. No account required.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            If you received a beta code, enter it below.
          </p>
        </div>

        {success ? (
          <div style={{
            background: 'var(--green-bg)', border: '1px solid var(--green-border)',
            borderRadius: '6px', padding: '1rem', textAlign: 'center',
            color: 'var(--green)', fontWeight: 700,
          }}>
            ✓ Code accepted — unlocking access...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => window.open(import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#', '_blank')}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 'var(--radius)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 700,
                width: '100%',
                marginBottom: 16,
              }}
            >
              Buy Full Access →
            </button>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Access Code
              </label>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                placeholder="EXP-LAB-XXXX-XXXX"
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
              }}
            >
              Unlock Access
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
          Progress and access status stored locally. No server, no account.
        </div>
      </div>
    </div>
  );
}
