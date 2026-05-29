import { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '../../utils/auth.js';

export function AuthModal({ onClose, onSuccess }) {
  const [step, setStep] = useState('main'); // 'main' | 'sent'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogle() {
    setLoading(true);
    setError('');
    const { error: err } = await signInWithGoogle();
    setLoading(false);
    if (err) {
      setError('Google sign-in failed. Please try again.');
    } else {
      onSuccess();
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    const { error: err } = await signInWithEmail(email.trim());
    setLoading(false);
    if (err) {
      setError('Could not send link. Please check the email and try again.');
    } else {
      setStep('sent');
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="pal-slide-up"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg, 12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          ×
        </button>

        {step === 'main' && (
          <>
            <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>
              Sign in to PAL
            </h2>
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Sync your progress across devices.
            </p>

            {/* Google button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius, 6px)',
                padding: '0.65rem 1rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#333',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1.25rem',
                opacity: loading ? 0.7 : 1,
              }}
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#4285F4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}>G</span>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {/* Email magic link */}
            <form onSubmit={handleEmailSubmit}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius, 6px)',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.88rem',
                  color: 'var(--text)',
                  background: 'var(--surface)',
                  marginBottom: '0.75rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                style={{
                  width: '100%',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius, 6px)',
                  padding: '0.65rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: (loading || !email.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (loading || !email.trim()) ? 0.65 : 1,
                }}
              >
                {loading ? 'Sending...' : 'Send magic link'}
              </button>
            </form>

            {error && (
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: 'var(--red)', textAlign: 'center' }}>
                {error}
              </p>
            )}
          </>
        )}

        {step === 'sent' && (
          <>
            <div style={{ textAlign: 'center', padding: '0.5rem 0 1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📬</div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>
                Check your inbox
              </h2>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                We sent a magic link to
              </p>
              <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                {email}
              </p>
              <p style={{ margin: '0 0 1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Click the link in your email to sign in. You can close this window.
              </p>
            </div>
            <button
              onClick={() => setStep('main')}
              style={{
                width: '100%',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius, 6px)',
                padding: '0.6rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
