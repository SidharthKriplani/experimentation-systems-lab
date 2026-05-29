import { useState } from 'react';

/*
 * SKELETON — Module 27: Effect Size
 *
 * MICRO: Covers Cohen's d formula, the small/medium/large conventions (0.2/0.5/0.8),
 *        and the relationship between effect size and MDE. Key failure mode: candidates
 *        stop at "p < 0.05" without asking whether the magnitude is worth acting on —
 *        this module draws the line between the measurement (effect size) and the
 *        decision layer covered in sf20 Practical Significance.
 *
 * MACRO: Placed after IV (sf25) as a companion to the causal inference arc. Precedes
 *        sf12 Power conceptually since power calculations depend on assumed effect size.
 *        Connects back to sf20 Practical Significance (decision layer) and forward to
 *        sf28 Bootstrap (which also handles skewed-metric measurement).
 *
 * INTERACTIVE: Slider — user adjusts mean difference and pooled SD, watches Cohen's d
 *              update in real time with a small/medium/large label. Follow-up MCQ:
 *              "A treatment increases revenue by $0.02 per session with p=0.001 and
 *              Cohen's d = 0.08. What do you recommend?" with four answer options
 *              testing the ship/hold/escalate decision.
 *
 * PRIORITY: Medium
 * ESTIMATED BUILD: ~160 lines, one session
 */

export function Module27_EffectSize({ module, onNext }) {
  return (
    <div className="pal-page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          You will learn to compute Cohen's d — a standardized measure of effect magnitude — and connect it to the minimum detectable effect you set when designing experiments. A statistically significant result with a tiny effect size is often not worth shipping, and this module teaches you to make that call quantitatively.
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
