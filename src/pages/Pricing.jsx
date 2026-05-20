export function Pricing({ onShowUnlock, onBack }) {
  const stripeLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#';

  const cardBase = {
    flex: '1 1 280px',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '2rem',
    background: 'var(--surface)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  };

  const featureItem = (text) => (
    <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
      <span style={{ color: 'var(--green)', fontWeight: 700, marginTop: 1 }}>✓</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', color: 'var(--text-muted)',
          fontSize: '0.85rem', cursor: 'pointer', padding: 0, marginBottom: '2rem',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}
      >
        ← Back
      </button>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
          Unlock Product Analytics Lab
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          Practice the exact skills interviewers test — from A/B testing to metric design to root-cause analysis.
          One payment, lifetime access.
        </p>
      </div>

      {/* Tiers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', marginBottom: '2rem' }}>
        {/* Free tier */}
        <div style={{ ...cardBase, borderColor: 'var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Free
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)' }}>$0</div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
            {featureItem('Stat Foundations (2 free modules)')}
            {featureItem('Stats Room (2 free cases)')}
            {featureItem('Playbook (read-only)')}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
            <div style={{
              textAlign: 'center', padding: '0.65rem', borderRadius: 8,
              border: '1px solid var(--border)', color: 'var(--text-muted)',
              fontSize: '0.875rem', fontWeight: 600,
            }}>
              Current plan
            </div>
          </div>
        </div>

        {/* Paid tier */}
        <div style={{
          ...cardBase,
          borderColor: 'var(--accent)',
          boxShadow: '0 0 0 1px var(--accent)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.75rem',
            borderRadius: 20, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Best value
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Full Access
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)' }}>$49</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>one-time</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
            {featureItem('All 100+ practice cases across 9 rooms')}
            {featureItem('Stat Foundations (13 modules)')}
            {featureItem('All learning paths')}
            {featureItem('Lifetime access, no subscription')}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
            <button
              onClick={() => {
                try { window.posthog?.capture('pricing_cta_click', { tier: 'full_access' }); } catch {}
                window.open(stripeLink, '_blank');
              }}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 8,
                background: 'var(--accent)', color: '#fff',
                border: 'none', cursor: 'pointer',
                fontSize: '1rem', fontWeight: 700,
              }}
            >
              Get Full Access →
            </button>
          </div>
        </div>
      </div>

      {/* Access code link */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => {
            try { window.posthog?.capture('pricing_unlock_code_click'); } catch {}
            onShowUnlock?.();
          }}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline',
            padding: 0,
          }}
        >
          Have an access code? →
        </button>
      </div>
    </div>
  );
}
