import { useState } from 'react';

/*
 * SKELETON — Module 28: Bootstrap Resampling
 *
 * MICRO: Covers resampling with replacement, percentile CI vs BCa CI, and when
 *        to prefer bootstrap over a t-test. Primary failure mode: candidates treat
 *        bootstrap as a cure-all that eliminates sample size requirements — it does
 *        not; it only relaxes the normality assumption.
 *
 * MACRO: Follows sf09 CLT and sf10 CI as the direct "what if CLT does not hold"
 *        answer. Companion to sf32 Non-Parametric Tests. Connects to Code Room
 *        Python bootstrap CI module — cross-reference is needed since that room
 *        shows the implementation without the statistical grounding.
 *
 * INTERACTIVE: Animated simulation — display a right-skewed revenue distribution,
 *              run a bootstrap animation (sampling with replacement, plotting the
 *              statistic distribution across 500 resamples), compare the resulting
 *              percentile CI to the naive normal CI. User identifies which CI is
 *              wider and explains why.
 *
 * PRIORITY: High — Python bootstrap CI is in the Code Room and cross-reference needed
 * ESTIMATED BUILD: ~200 lines, one session
 */

export function Module28_Bootstrap({ module, onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          Bootstrap resampling builds a sampling distribution empirically, without relying on normality. You will see how repeatedly resampling your own data with replacement produces a distribution of your statistic — and why this approach is the right default for skewed metrics like revenue and LTV at tech companies.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          This module is in development. The Key Insight below gives you the core concept to internalize now.
        </p>
      </div>

      {/* Key Insight */}
      <div style={{ background: 'var(--yellow-bg)', border: '1.5px solid var(--yellow-border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--yellow-text)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Key Insight</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--yellow-text)', lineHeight: 1.6 }}>{module?.keyInsight}</div>
      </div>

      {/* Connection */}
      <div style={{ background: 'var(--accent-bg)', border: '1.5px solid var(--accent-border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Connects to Experiments</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{module?.connection}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onNext} style={{ padding: '0.7rem 1.75rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--teal)', color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}
