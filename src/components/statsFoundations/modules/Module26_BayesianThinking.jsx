import { useState } from 'react';

/*
 * SKELETON — Module 26: Bayesian Thinking
 *
 * MICRO: Covers prior, likelihood, Bayes theorem, posterior update, and credible
 *        intervals. Primary failure mode to address: candidates conflate Bayesian
 *        credible intervals with frequentist confidence intervals — the credible
 *        interval has the direct probability interpretation that CIs do not.
 *
 * MACRO: Sits after IV (sf25) as a capstone to the causal inference block, before
 *        a future "advanced testing methods" arc. Connects to Exp Foundations
 *        multiple testing module and any future Bayesian A/B testing scenario
 *        in the Review Room.
 *
 * INTERACTIVE: Two-stage MCQ — (1) what does a 95% credible interval mean?
 *              (four options, only one correct); (2) coin flip example where a
 *              prior Beta(2,2) is updated with 3 heads and 0 tails — which
 *              posterior Beta parameters are correct? (Beta(5,2) is correct).
 *
 * PRIORITY: High — Bayesian A/B testing is a frequent interview topic
 * ESTIMATED BUILD: ~180 lines, one session
 */

export function Module26_BayesianThinking({ module, onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          Bayesian inference lets you start with a prior belief, incorporate observed data, and arrive at a posterior — a sharper, updated belief. You will work through a concrete updating example and learn why Bayesian credible intervals have the intuitive probability interpretation that frequentist confidence intervals do not.
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
