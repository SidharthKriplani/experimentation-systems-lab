import { useState } from 'react';

/*
 * SKELETON — Module 32: Non-Parametric Tests
 *
 * MICRO: Covers when normality fails (small n, ordinal data, heavy skew),
 *        Mann-Whitney U, Wilcoxon signed-rank (paired variant), and Kruskal-Wallis
 *        (multi-group non-parametric ANOVA). Includes the power cost of non-parametric.
 *        Primary failure mode: candidates default to t-tests on small, skewed samples
 *        without checking whether the CLT approximation is reliable.
 *
 * MACRO: Companion to sf28 Bootstrap as the second answer to "what to do when CLT
 *        fails" — bootstrap relaxes the normality assumption via simulation; non-
 *        parametric tests relax it via rank-transformation. Connects to sf09 CLT
 *        and sf16 Skewness as the applied follow-on.
 *
 * INTERACTIVE: Dataset display — show a right-skewed revenue distribution (n=40)
 *              with visible outliers. User picks the correct test from three options:
 *              t-test, bootstrap CI, or Mann-Whitney U. Second MCQ: given a paired
 *              pre/post measurement on 25 users, which test is appropriate?
 *
 * PRIORITY: Medium
 * ESTIMATED BUILD: ~160 lines, one session
 */

export function Module32_NonParametric({ module, onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          When your sample is small, your data is ordinal, or your distribution is heavily skewed, the t-test assumptions break down. Non-parametric tests work by ranking the data instead of using raw values, making no assumption about the underlying distribution. You will learn when to reach for Mann-Whitney U instead of a t-test and what you give up when you do.
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
