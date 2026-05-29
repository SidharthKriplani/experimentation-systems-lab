import { useState } from 'react';

/*
 * SKELETON — Module 29: Chi-Square Test
 *
 * MICRO: Covers contingency tables, observed vs expected cell counts, the chi-square
 *        statistic, degrees of freedom, and p-value interpretation. Also covers the
 *        goodness-of-fit variant. Key failure mode: candidates know SRM detection
 *        as a procedure but cannot explain the test behind it — this module closes
 *        that gap by grounding SRM in chi-square logic.
 *
 * MACRO: Connects sf11 Hypothesis Testing to a non-continuous test type, filling
 *        a gap in the module arc. Direct bridge to Exp Foundations SRM module and
 *        RCA Foundations data quality module — both link back here as the statistical
 *        foundation.
 *
 * INTERACTIVE: 2x2 contingency table — user is shown observed assignment counts
 *              (e.g. 5100 control, 4900 treatment when 50/50 split was intended
 *              across 10000 users), must compute expected counts, compute chi-square
 *              statistic, and decide: is this SRM? MCQ with four options testing
 *              threshold intuition (chi-square > 3.84 at df=1 rejects at alpha=0.05).
 *
 * PRIORITY: High — SRM is universal in experimentation and chi-square is the test behind it
 * ESTIMATED BUILD: ~180 lines, one session
 */

export function Module29_ChiSquare({ module, onNext }) {
  return (
    <div className="pal-page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          The chi-square test checks whether two categorical variables are independent by comparing what you observed to what you would expect if there were no relationship. You will use it to detect Sample Ratio Mismatch — the same chi-square logic that powers SRM alerts in every major experimentation platform.
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
