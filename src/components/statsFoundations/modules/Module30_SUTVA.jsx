import { useState } from 'react';

/*
 * SKELETON — Module 30: SUTVA
 *
 * MICRO: Covers SUTVA definition, its two conditions (no interference between units,
 *        no hidden versions of treatment), and violation types (direct spillover,
 *        equilibrium effects, resource competition). Primary failure mode: candidates
 *        believe user-level randomization always satisfies SUTVA — it does not on
 *        social, marketplace, or shared-infrastructure products.
 *
 * MACRO: Sits after sf22 DiD as a "threats to validity" module that completes the
 *        causal inference arc before the capstone modules. Direct connection to Exp
 *        Foundations network effects module (EF11 stub). Connects to Review Room
 *        SUTVA scenarios and Spot the Flaw cases.
 *
 * INTERACTIVE: Scenario classification — given 4 experiment descriptions (ride-share
 *              pricing, social feed ranking, single-player game UI, email send-time),
 *              user identifies which violate SUTVA and why. Follow-up MCQ: for the
 *              violating scenario, which fix is correct — cluster randomization,
 *              geo holdout, or switchback experiment?
 *
 * PRIORITY: High — SUTVA violations appear in Review Room scenarios and Spot the Flaw
 * ESTIMATED BUILD: ~200 lines, one session
 */

export function Module30_SUTVA({ module, onNext }) {
  return (
    <div className="pal-page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Coming Soon card */}
      <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--yellow)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 'var(--radius-sm)', padding: '0.18rem 0.55rem', marginBottom: '0.9rem' }}>
          Coming Soon
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.6rem' }}>
          SUTVA is the assumption that your treatment group and control group do not affect each other. You will learn to spot when this assumption breaks — spillover on social networks, price equilibrium effects in marketplaces, shared server capacity — and which experiment designs exist specifically to fix it.
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
