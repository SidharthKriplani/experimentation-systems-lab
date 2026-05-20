import { useState } from 'react';
import { statsFoundationsModules } from '../../data/statsFoundationsModules.js';
import { saveStatFoundationsProgress, getStatFoundationsProgress } from '../../utils/statsFoundationsProgress.js';
import { Module01_WhatIsData } from './modules/Module01_WhatIsData.jsx';
import { Module02_CentralTendency } from './modules/Module02_CentralTendency.jsx';
import { Module03_Spread } from './modules/Module03_Spread.jsx';
import { Module04_NormalDist } from './modules/Module04_NormalDist.jsx';
import { Module05_ZScores } from './modules/Module05_ZScores.jsx';
import { Module06_Areas } from './modules/Module06_Areas.jsx';
import { Module07_Sampling } from './modules/Module07_Sampling.jsx';
import { Module08_StandardError } from './modules/Module08_StandardError.jsx';
import { Module09_CLT } from './modules/Module09_CLT.jsx';
import { Module10_CI } from './modules/Module10_CI.jsx';
import { Module11_HypothesisTesting } from './modules/Module11_HypothesisTesting.jsx';
import { Module12_Power } from './modules/Module12_Power.jsx';
import { Module13_ExperimentDesigner } from './modules/Module13_ExperimentDesigner.jsx';
import { Module14_Correlation } from './modules/Module14_Correlation.jsx';
import { Module15_SimpsonsParadox } from './modules/Module15_SimpsonsParadox.jsx';
import { Module16_Skewness } from './modules/Module16_Skewness.jsx';
import { Module17_MultipleTesting } from './modules/Module17_MultipleTesting.jsx';
import { Module18_RegressionToMean } from './modules/Module18_RegressionToMean.jsx';
import { Module19_SelectionBias } from './modules/Module19_SelectionBias.jsx';
import { Module20_PracticalSignificance } from './modules/Module20_PracticalSignificance.jsx';

const MODULE_COMPONENTS = {
  sf01: Module01_WhatIsData,
  sf02: Module02_CentralTendency,
  sf03: Module03_Spread,
  sf04: Module04_NormalDist,
  sf05: Module05_ZScores,
  sf06: Module06_Areas,
  sf07: Module07_Sampling,
  sf08: Module08_StandardError,
  sf09: Module09_CLT,
  sf10: Module10_CI,
  sf11: Module11_HypothesisTesting,
  sf12: Module12_Power,
  sf13: Module13_ExperimentDesigner,
  sf14: Module14_Correlation,
  sf15: Module15_SimpsonsParadox,
  sf16: Module16_Skewness,
  sf17: Module17_MultipleTesting,
  sf18: Module18_RegressionToMean,
  sf19: Module19_SelectionBias,
  sf20: Module20_PracticalSignificance,
};

const TOTAL = statsFoundationsModules.length;

const DIFFICULTY_STYLE = {
  Beginner:     { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
  Intermediate: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  Advanced:     { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)' },
};

export function StatsFoundationsRunner({ moduleId, onBack, onNext, unlocked }) {
  const module = statsFoundationsModules.find(m => m.id === moduleId);
  const ModuleComponent = MODULE_COMPONENTS[moduleId];

  if (!module || !ModuleComponent) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box', color: 'var(--text-muted)' }}>
        Module not found.
      </div>
    );
  }

  const isLocked = !module.isFree && !unlocked;
  const diffStyle = DIFFICULTY_STYLE[module.difficulty] || DIFFICULTY_STYLE.Beginner;

  function handleNext() {
    saveStatFoundationsProgress(moduleId);
    onNext();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box' }}>

      {/* ── Top navigation bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        gap: '0.75rem',
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ← Foundations
        </button>

        {/* Module title */}
        <div style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: 'var(--text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}>
          {module.title}
        </div>

        {/* Progress badge */}
        <div style={{
          background: 'var(--yellow-bg)',
          border: '1px solid var(--yellow-border)',
          borderRadius: '20px',
          padding: '0.3rem 0.7rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--yellow-text)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {module.index} / {TOTAL}
        </div>
      </div>

      {/* ── Module header card ── */}
      <div style={{
        background: 'var(--yellow-bg)',
        border: '1px solid var(--yellow-border)',
        borderRadius: '10px',
        padding: '1.1rem 1.25rem',
        marginBottom: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            background: 'var(--yellow)',
            color: '#fff',
            borderRadius: '4px',
            padding: '0.15rem 0.55rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
          }}>
            MODULE {module.index}
          </span>
          <span style={{
            background: diffStyle.bg,
            border: `1px solid ${diffStyle.border}`,
            borderRadius: '4px',
            padding: '0.15rem 0.55rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: diffStyle.color,
          }}>
            {module.difficulty}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ~{module.estimatedMin} min
          </span>
        </div>

        <div style={{ marginTop: '0.6rem', fontSize: '0.85rem', color: 'var(--yellow-text)', fontStyle: 'italic' }}>
          {module.subtitle}
        </div>
      </div>

      {/* ── Locked state ── */}
      {isLocked && (
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          background: 'var(--surface)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            This module is locked
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', maxWidth: '360px', margin: '0 auto 1.5rem' }}>
            Unlock full access to all 13 Stat Foundations modules, plus every other room in Product Analytics Lab.
          </div>
          <button
            onClick={onBack}
            style={{
              background: 'var(--yellow)',
              border: 'none',
              borderRadius: '7px',
              padding: '0.65rem 1.5rem',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Back to Foundations
          </button>
        </div>
      )}

      {/* ── Unlocked: render module ── */}
      {!isLocked && (
        <>
          <ModuleComponent module={module} onNext={handleNext} />
          {module.playbookLinks?.length > 0 && (
            <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px 32px', boxSizing: 'border-box' }}>
              <div style={{ padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>📖 Playbook Reading</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {module.playbookLinks.map(link => (
                    <span key={link.id} style={{ fontSize: 13, color: 'var(--accent)', background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', borderRadius: 6, padding: '4px 10px', cursor: 'default' }}>{link.label}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
