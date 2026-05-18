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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e', marginBottom: '0.75rem' }}>Beta Access Active</h1>
        <p style={{ color: '#8890a8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          All 8 scenarios are unlocked. Head to the Scenario Browser to access the paid scenarios.
        </p>
        <button
          onClick={() => onNavigate('browser')}
          style={{
            background: '#5b7fff', color: '#fff', border: 'none',
            borderRadius: '6px', padding: '0.6rem 1.5rem',
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          }}
        >
          Open Scenario Browser →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px', margin: '4rem auto', padding: '2rem 1.5rem' }}>
      <div style={{
        background: '#1a1d27',
        border: '1px solid #2d3148',
        borderRadius: '10px',
        padding: '2rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e8eaf0', marginBottom: '0.5rem' }}>
            Private Beta Access
          </h1>
          <p style={{ color: '#8890a8', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Paid access coming soon — unlock code enabled for private beta.
            Enter your access code to unlock all 8 scenarios.
          </p>
        </div>

        {success ? (
          <div style={{
            background: '#0d2e1a', border: '1px solid #22c55e',
            borderRadius: '6px', padding: '1rem', textAlign: 'center',
            color: '#22c55e', fontWeight: 700,
          }}>
            ✓ Code accepted — unlocking access...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8890a8', display: 'block', marginBottom: '0.4rem' }}>
                Access Code
              </label>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                placeholder="EXP-LAB-XXXX-XXXX"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#0f1117', border: `1px solid ${error ? '#ef4444' : '#2d3148'}`,
                  borderRadius: '6px', padding: '0.6rem 0.875rem',
                  color: '#e8eaf0', fontSize: '0.95rem',
                  fontFamily: 'monospace', letterSpacing: '0.05em',
                  outline: 'none',
                }}
              />
              {error && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: '#ef4444' }}>{error}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!code.trim()}
              style={{
                width: '100%',
                background: code.trim() ? '#5b7fff' : '#1a1d27',
                color: code.trim() ? '#fff' : '#545b7a',
                border: `1px solid ${code.trim() ? '#5b7fff' : '#2d3148'}`,
                borderRadius: '6px', padding: '0.65rem',
                fontWeight: 700, fontSize: '0.9rem', cursor: code.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Unlock Access
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #1e2235', fontSize: '0.75rem', color: '#545b7a', textAlign: 'center' }}>
          Access status stored locally in your browser. No account required.
        </div>
      </div>
    </div>
  );
}
