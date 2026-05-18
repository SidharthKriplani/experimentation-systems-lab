import { useState } from 'react';
import { ContextPanel } from './ContextPanel.jsx';
import { ExperimentDesign } from './ExperimentDesign.jsx';
import { MetricTable } from './MetricTable.jsx';
import { WarningFlags } from './WarningFlags.jsx';
import { FlagChecklist } from './FlagChecklist.jsx';
import { DecisionPanel } from './DecisionPanel.jsx';
import { ScoreReveal } from './ScoreReveal.jsx';
import { DebriefPanel } from './DebriefPanel.jsx';
import { Button } from '../ui/Button.jsx';
import { saveAttempt } from '../../utils/progress.js';

function PanelHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1e2235' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#545b7a', marginBottom: '0.2rem' }}>
        {subtitle}
      </div>
      <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#e8eaf0', margin: 0 }}>{title}</h3>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: '#1a1d27',
      border: '1px solid #2d3148',
      borderRadius: '8px',
      padding: '1.25rem',
      ...style,
    }}>
      {children}
    </div>
  );
}

// Tab navigation for the left panel
const LEFT_TABS = ['Context', 'Design', 'Metrics', 'Flags'];

export function ScenarioRunner({ scenario, onBack, onNext, hasNext }) {
  const [leftTab, setLeftTab] = useState('Context');
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [checkedFlags, setCheckedFlags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);

  function handleFlagToggle(flagId) {
    setCheckedFlags(prev =>
      prev.includes(flagId) ? prev.filter(f => f !== flagId) : [...prev, flagId]
    );
  }

  function handleSubmit() {
    if (!selectedDecision) return;
    const decision = scenario.decisions.find(d => d.id === selectedDecision);
    saveAttempt(scenario.id, selectedDecision, decision.score);
    setSubmitted(true);
    setShowDebrief(true);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('score-reveal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function handleReplay() {
    setSelectedDecision(null);
    setCheckedFlags([]);
    setSubmitted(false);
    setShowDebrief(false);
    setLeftTab('Context');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const selectedDecisionObj = scenario.decisions.find(d => d.id === selectedDecision);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Back + Title */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: '1px solid #2d3148', borderRadius: '5px',
            padding: '0.35rem 0.75rem', color: '#8890a8', fontSize: '0.8rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}
        >
          ← Scenarios
        </button>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#e8eaf0', margin: 0, letterSpacing: '-0.02em' }}>
            {scenario.title}
          </h1>
          <p style={{ color: '#8890a8', fontSize: '0.85rem', margin: '0.15rem 0 0' }}>{scenario.subtitle}</p>
        </div>
      </div>

      {/* Main layout: left info pane + right decision pane */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '1.25rem',
        alignItems: 'start',
      }}>
        {/* LEFT: Tabbed info panel */}
        <div>
          {/* Tab nav */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            marginBottom: '1rem',
            background: '#1a1d27',
            border: '1px solid #2d3148',
            borderRadius: '8px',
            padding: '4px',
          }}>
            {LEFT_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setLeftTab(tab)}
                style={{
                  flex: 1,
                  background: leftTab === tab ? '#2d3148' : 'transparent',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0.4rem 0.5rem',
                  color: leftTab === tab ? '#e8eaf0' : '#8890a8',
                  fontWeight: leftTab === tab ? 600 : 400,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tab}
                {tab === 'Flags' && scenario.warningFlags?.length > 0 && (
                  <span style={{
                    marginLeft: '0.3rem',
                    background: '#2e0d0d',
                    color: '#ef4444',
                    borderRadius: '10px',
                    padding: '0 5px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                  }}>{scenario.warningFlags.length}</span>
                )}
              </button>
            ))}
          </div>

          <Card>
            {leftTab === 'Context' && (
              <>
                <PanelHeader title="Scenario Context" subtitle="The Setup" />
                <ContextPanel scenario={scenario} />
              </>
            )}
            {leftTab === 'Design' && (
              <>
                <PanelHeader title="Experiment Design" subtitle="How It Was Run" />
                <ExperimentDesign design={scenario.experimentDesign} />
              </>
            )}
            {leftTab === 'Metrics' && (
              <>
                <PanelHeader title="Metric Readout" subtitle="The Data" />
                <MetricTable metrics={scenario.metricReadout} />
              </>
            )}
            {leftTab === 'Flags' && (
              <>
                {!submitted ? (
                  <>
                    <PanelHeader title="Warning Flags" subtitle="Self-Reflection" />
                    <FlagChecklist
                      flags={scenario.warningFlags}
                      checked={checkedFlags}
                      onToggle={handleFlagToggle}
                    />
                  </>
                ) : (
                  <>
                    <PanelHeader title="Warning Flags" subtitle="All Flags" />
                    <WarningFlags flags={scenario.warningFlags} />
                  </>
                )}
              </>
            )}
          </Card>

          {/* Quick nav hint */}
          {!submitted && (
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {LEFT_TABS.filter(t => t !== leftTab).map(tab => (
                <button
                  key={tab}
                  onClick={() => setLeftTab(tab)}
                  style={{
                    background: 'none', border: '1px solid #1e2235',
                    borderRadius: '4px', padding: '0.25rem 0.6rem',
                    color: '#545b7a', fontSize: '0.75rem', cursor: 'pointer',
                  }}
                >
                  View {tab} →
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Decision + Submit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card>
            <PanelHeader title="Make Your Call" subtitle="The Decision" />
            <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: '#545b7a', lineHeight: 1.5 }}>
              Based on the experiment data, what would you recommend?
            </div>
            <DecisionPanel
              decisions={scenario.decisions}
              selected={selectedDecision}
              onSelect={setSelectedDecision}
              submitted={submitted}
            />
            {!submitted && (
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedDecision}
                  style={{
                    width: '100%',
                    background: selectedDecision ? '#5b7fff' : '#1a1d27',
                    color: selectedDecision ? '#fff' : '#545b7a',
                    border: `1px solid ${selectedDecision ? '#5b7fff' : '#2d3148'}`,
                    borderRadius: '6px',
                    padding: '0.65rem 1rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: selectedDecision ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s',
                  }}
                >
                  Submit Decision →
                </button>
                {!selectedDecision && (
                  <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#545b7a', marginTop: '0.4rem' }}>
                    Select a decision above to submit
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* After submit: score reveal + action buttons */}
          {submitted && selectedDecisionObj && (
            <div id="score-reveal">
              <ScoreReveal
                scoreKey={selectedDecisionObj.score}
                decisionLabel={selectedDecisionObj.label}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button
                  onClick={() => {
                    document.getElementById('debrief-panel')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: '#1a1d27', border: '1px solid #2d3148',
                    borderRadius: '6px', padding: '0.55rem', color: '#e8eaf0',
                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  }}
                >
                  Read Debrief ↓
                </button>
                <button
                  onClick={handleReplay}
                  style={{
                    background: 'transparent', border: '1px solid #2d3148',
                    borderRadius: '6px', padding: '0.55rem', color: '#8890a8',
                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  }}
                >
                  Try Another Decision
                </button>
                {hasNext && (
                  <button
                    onClick={onNext}
                    style={{
                      background: '#5b7fff', border: '1px solid #5b7fff',
                      borderRadius: '6px', padding: '0.55rem', color: '#fff',
                      fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    Next Scenario →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Debrief panel — full width below */}
      {showDebrief && selectedDecision && (
        <div id="debrief-panel" style={{ marginTop: '2rem' }}>
          <div style={{
            borderBottom: '1px solid #2d3148',
            paddingBottom: '0.75rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              width: '3px', height: '24px',
              background: 'linear-gradient(#5b7fff, #a78bfa)',
              borderRadius: '2px',
            }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e8eaf0', margin: 0 }}>
              Senior Analyst Read
            </h2>
          </div>
          <DebriefPanel scenario={scenario} selectedDecisionId={selectedDecision} />
        </div>
      )}
    </div>
  );
}
