import { useState } from 'react';

/*
 * SKELETON — Module 31: ANOVA
 *
 * MICRO: Covers between-group vs within-group variance, the F-statistic, one-way
 *        ANOVA, and post-hoc pairwise tests (Tukey, Bonferroni). Primary failure
 *        mode: candidates run separate t-tests for each variant pair, which inflates
 *        Type I error — with 3 variants and 1 control, running all 6 pairwise
 *        t-tests raises the false positive rate from 5% to ~26%.
 *
 * MACRO: Extends sf11 Hypothesis Testing and sf17 Multiple Testing to the multi-group
 *        case. Connects directly to Exp Foundations multi-variant testing scenario
 *        and the Review Room. Post-hoc testing here is the applied complement to
 *        sf17 Bonferroni/FDR corrections.
 *
 * INTERACTIVE: MCQ — "You have 3 variants and 1 control. Which approach is correct?"
 *              (a) run 6 t-tests, (b) run 1 ANOVA then post-hoc tests,
 *              (c) run 3 t-tests vs control only, (d) use Bonferroni on 6 t-tests.
 *              Second MCQ: interpret a given F-statistic and decide whether any
 *              groups differ.
 *
 * PRIORITY: Medium
 * ESTIMATED BUILD: ~160 lines, one session
 */

export function Module31_ANOVA({ module, onNext }) {
  return (
    <div className="pal-page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          When you are running 3 or more variants simultaneously, separate t-tests inflate your false positive rate to an unacceptable level. ANOVA tests all groups at once using the F-statistic, and then post-hoc tests tell you which specific pairs differ — without the multiple-comparison penalty.
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
        <button className="pal-glow-pulse" onClick={onNext} style={{ padding: '0.7rem 1.75rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--teal)', color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
          Next →
        </button>
      </div>
    </div>
  );
}
