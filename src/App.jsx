import { useState, useEffect, lazy, Suspense } from 'react';
import { track } from './utils/analytics.js';
// Data
import { scenarios } from './data/scenarios.js';
import { designScenarios } from './data/designScenarios.js';
import { statsModules } from './data/statsModules.js';
import { metricCases } from './data/metricCases.js';
import { rcaCases } from './data/rcaCases.js';
import { businessCases } from './data/businessCases.js';
import { productDesignScenarios } from './data/productDesignScenarios.js';
import { codeModules } from './data/codeModules.js';
import { prioritizationScenarios } from './data/prioritizationScenarios.js';
import { behavioralQuestions } from './data/behavioralQuestions.js';
import { estimationProblems } from './data/estimationProblems.js';
import { statsFoundationsModules } from './data/statsFoundationsModules.js';
import { growthAnalyticsCases } from './data/growthAnalyticsCases.js';
// Layout (always needed — not lazy)
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
// Utils
import { getAllProgress } from './utils/progress.js';
import { getDesignProgress } from './utils/designProgress.js';
import { getStatsProgress } from './utils/statsProgress.js';
import { getMetricsProgress } from './utils/metricsProgress.js';
import { getRCAProgress } from './utils/rcaProgress.js';
import { getCaseProgress } from './utils/caseProgress.js';
import { getProductDesignProgress } from './utils/productDesignProgress.js';
import { getCodeProgress } from './utils/codeProgress.js';
import { getPrioritizationProgress } from './utils/prioritizationProgress.js';
import { getBehavioralProgress } from './utils/behavioralProgress.js';
import { getEstimationProgress } from './utils/estimationProgress.js';
import { getStatFoundationsProgress } from './utils/statsFoundationsProgress.js';
import { getGrowthAnalyticsProgress } from './utils/growthAnalyticsProgress.js';
import { isUnlocked } from './utils/unlock.js';

// Pages — lazy-loaded for code splitting
const Home                  = lazy(() => import('./pages/Home.jsx').then(m => ({ default: m.Home })));
const ScenarioBrowser       = lazy(() => import('./pages/ScenarioBrowser.jsx').then(m => ({ default: m.ScenarioBrowser })));
const DesignBrowser         = lazy(() => import('./pages/DesignBrowser.jsx').then(m => ({ default: m.DesignBrowser })));
const StatsBrowser          = lazy(() => import('./pages/StatsBrowser.jsx').then(m => ({ default: m.StatsBrowser })));
const MetricsBrowser        = lazy(() => import('./pages/MetricsBrowser.jsx').then(m => ({ default: m.MetricsBrowser })));
const RCABrowser            = lazy(() => import('./pages/RCABrowser.jsx').then(m => ({ default: m.RCABrowser })));
const CasesBrowser          = lazy(() => import('./pages/CasesBrowser.jsx').then(m => ({ default: m.CasesBrowser })));
const ProductDesignBrowser  = lazy(() => import('./pages/ProductDesignBrowser.jsx').then(m => ({ default: m.ProductDesignBrowser })));
const CodeBrowser           = lazy(() => import('./pages/CodeBrowser.jsx').then(m => ({ default: m.CodeBrowser })));
const PrioritizationBrowser = lazy(() => import('./pages/PrioritizationBrowser.jsx').then(m => ({ default: m.PrioritizationBrowser })));
const PlaybookBrowser       = lazy(() => import('./pages/PlaybookBrowser.jsx').then(m => ({ default: m.PlaybookBrowser })));
const BlogBrowser           = lazy(() => import('./pages/BlogBrowser.jsx').then(m => ({ default: m.BlogBrowser })));
const Progress              = lazy(() => import('./pages/Progress.jsx').then(m => ({ default: m.Progress })));
const Unlock                = lazy(() => import('./pages/Unlock.jsx').then(m => ({ default: m.Unlock })));
const About                 = lazy(() => import('./pages/About.jsx').then(m => ({ default: m.About })));
const JudgmentBank          = lazy(() => import('./pages/JudgmentBank.jsx').then(m => ({ default: m.JudgmentBank })));
const QADashboard           = lazy(() => import('./pages/QADashboard.jsx').then(m => ({ default: m.QADashboard })));
const Pricing               = lazy(() => import('./pages/Pricing.jsx').then(m => ({ default: m.Pricing })));

// Runners — lazy-loaded
const ScenarioRunner        = lazy(() => import('./components/scenario/ScenarioRunner.jsx').then(m => ({ default: m.ScenarioRunner })));
const DesignRunner          = lazy(() => import('./components/design/DesignRunner.jsx').then(m => ({ default: m.DesignRunner })));
const StatsRunner           = lazy(() => import('./components/stats/StatsRunner.jsx').then(m => ({ default: m.StatsRunner })));
const MetricsRunner         = lazy(() => import('./components/metrics/MetricsRunner.jsx').then(m => ({ default: m.MetricsRunner })));
const RCARunner             = lazy(() => import('./components/rca/RCARunner.jsx').then(m => ({ default: m.RCARunner })));
const CaseRunner            = lazy(() => import('./components/cases/CaseRunner.jsx').then(m => ({ default: m.CaseRunner })));
const ProductDesignRunner   = lazy(() => import('./components/productDesign/ProductDesignRunner.jsx').then(m => ({ default: m.ProductDesignRunner })));
const CodeRunner            = lazy(() => import('./components/code/CodeRunner.jsx').then(m => ({ default: m.CodeRunner })));
const PrioritizationRunner  = lazy(() => import('./components/prioritization/PrioritizationRunner.jsx').then(m => ({ default: m.PrioritizationRunner })));
const BehavioralBrowser     = lazy(() => import('./pages/BehavioralBrowser.jsx').then(m => ({ default: m.BehavioralBrowser })));
const BehavioralRunner      = lazy(() => import('./components/behavioral/BehavioralRunner.jsx').then(m => ({ default: m.BehavioralRunner })));
const EstimationBrowser     = lazy(() => import('./pages/EstimationBrowser.jsx').then(m => ({ default: m.EstimationBrowser })));
const EstimationRunner      = lazy(() => import('./components/estimation/EstimationRunner.jsx').then(m => ({ default: m.EstimationRunner })));
const StatsFoundationsBrowser = lazy(() => import('./pages/StatsFoundationsBrowser.jsx').then(m => ({ default: m.StatsFoundationsBrowser })));
const StatsFoundationsRunner  = lazy(() => import('./components/statsFoundations/StatsFoundationsRunner.jsx').then(m => ({ default: m.StatsFoundationsRunner })));
const GrowthAnalyticsBrowser  = lazy(() => import('./pages/GrowthAnalyticsBrowser.jsx').then(m => ({ default: m.GrowthAnalyticsBrowser })));
const GrowthAnalyticsRunner   = lazy(() => import('./components/growthAnalytics/GrowthAnalyticsRunner.jsx').then(m => ({ default: m.GrowthAnalyticsRunner })));

function getInitialTheme() {
  try {
    return localStorage.getItem('exp-lab-theme') === 'dark' ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}

export default function App() {
  const [page, setPage] = useState('home');
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [activeDesignScenarioId, setActiveDesignScenarioId] = useState(null);
  const [activeStatsModuleId, setActiveStatsModuleId] = useState(null);
  const [activeMetricsCaseId, setActiveMetricsCaseId] = useState(null);
  const [activeRCACaseId, setActiveRCACaseId] = useState(null);
  const [activeBusinessCaseId, setActiveBusinessCaseId] = useState(null);
  const [activePDScenarioId, setActivePDScenarioId] = useState(null);
  const [activeCodeModuleId, setActiveCodeModuleId] = useState(null);
  const [activePrioritizationId, setActivePrioritizationId] = useState(null);
  const [activeBehavioralId, setActiveBehavioralId] = useState(null);
  const [activeEstimationId, setActiveEstimationId] = useState(null);
  const [activeStatFoundationsId, setActiveStatFoundationsId] = useState(null);
  const [activeGrowthAnalyticsId, setActiveGrowthAnalyticsId] = useState(null);
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [progressSnapshot, setProgressSnapshot] = useState(() => getAllProgress());
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    try { localStorage.setItem('exp-lab-theme', theme); } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const titles = {
      home: 'Product Analytics Lab — Practice the Calls',
      stats: 'Stats Room — Product Analytics Lab',
      experimentation: 'Experimentation Room — Product Analytics Lab',
      rca: 'RCA Room — Product Analytics Lab',
      code: 'Code Room — Product Analytics Lab',
      'product-design': 'Product Design Room — Product Analytics Lab',
      prioritization: 'Prioritization Room — Product Analytics Lab',
      behavioral: 'Behavioral Room — Product Analytics Lab',
      estimation: 'Estimation Room — Product Analytics Lab',
      'stat-foundations': 'Stat Foundations — Product Analytics Lab',
      'growth-analytics': 'Growth Analytics Room — Product Analytics Lab',
      blog: 'Learn — Product Analytics Lab',
      playbook: 'Playbook — Product Analytics Lab',
      pricing: 'Pricing — Product Analytics Lab',
      progress: 'My Progress — Product Analytics Lab',
      unlock: 'Unlock Access — Product Analytics Lab',
    };
    document.title = titles[page] || 'Product Analytics Lab';
  }, [page]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  function refreshProgress() {
    setProgressSnapshot(getAllProgress());
  }

  function navigate(target) {
    track('page_viewed', { page: target });
    setPage(target);
    setActiveScenarioId(null);
    setActiveDesignScenarioId(null);
    setActiveStatsModuleId(null);
    setActiveMetricsCaseId(null);
    setActiveRCACaseId(null);
    setActiveBusinessCaseId(null);
    setActivePDScenarioId(null);
    setActiveCodeModuleId(null);
    setActiveBehavioralId(null);
    setActiveEstimationId(null);
    setActiveStatFoundationsId(null);
    setActiveGrowthAnalyticsId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openStatsModule(id) {
    const module = statsModules.find(m => m.id === id);
    if (!module) return;
    if (!module.isFree && !unlocked) { track('paywall_hit', { room: 'stats', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'stats', id, title: module.title });
    setActiveStatsModuleId(id);
    setPage('stats-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openDesignScenario(id) {
    const scenario = designScenarios.find(s => s.id === id);
    if (!scenario) return;
    if (!scenario.isFree && !unlocked) { track('paywall_hit', { room: 'design', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'design', id, title: scenario.title });
    setActiveDesignScenarioId(id);
    setPage('design-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openScenario(id) {
    const scenario = scenarios.find(s => s.id === id);
    if (!scenario) return;
    if (!scenario.isFree && !unlocked) { track('paywall_hit', { room: 'review', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'review', id, title: scenario.title });
    setActiveScenarioId(id);
    setPage('runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openMetricsCase(id) {
    const c = metricCases.find(m => m.id === id);
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'metrics', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'metrics', id, title: c.title });
    setActiveMetricsCaseId(id);
    setPage('metrics-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openRCACase(id) {
    const c = rcaCases.find(r => r.id === id);
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'rca', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'rca', id, title: c.title });
    setActiveRCACaseId(id);
    setPage('rca-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openBusinessCase(id) {
    const c = businessCases.find(b => b.id === id);
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'cases', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'cases', id, title: c.title });
    setActiveBusinessCaseId(id);
    setPage('cases-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openCodeModule(id) {
    const m = codeModules.find(m => m.id === id);
    if (!m) return;
    if (!m.isFree && !unlocked) { track('paywall_hit', { room: 'code', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'code', id, title: m.title });
    setActiveCodeModuleId(id);
    setPage('code-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openPrioritizationScenario(id) {
    const s = prioritizationScenarios.find(s => s.id === id);
    if (!s) return;
    if (!s.isFree && !unlocked) { track('paywall_hit', { room: 'prioritization', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'prioritization', id, title: s.title });
    setActivePrioritizationId(id);
    setPage('prioritization-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openBehavioralQuestion(id) {
    const q = behavioralQuestions.find(q => q.id === id);
    if (!q) return;
    if (!q.isFree && !unlocked) { track('paywall_hit', { room: 'behavioral', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'behavioral', id, title: q.title });
    setActiveBehavioralId(id);
    setPage('behavioral-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openEstimationProblem(id) {
    const p = estimationProblems.find(p => p.id === id);
    if (!p) return;
    if (!p.isFree && !unlocked) { track('paywall_hit', { room: 'estimation', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'estimation', id, title: p.title });
    setActiveEstimationId(id);
    setPage('estimation-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openStatFoundationsModule(id) {
    const m = statsFoundationsModules.find(m => m.id === id);
    if (!m) return;
    if (!m.isFree && !unlocked) { track('paywall_hit', { room: 'stat-foundations', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'stat-foundations', id, title: m.title });
    setActiveStatFoundationsId(id);
    setPage('stat-foundations-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openGrowthAnalyticsCase(id) {
    const c = growthAnalyticsCases.find(c => c.id === id);
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'growth-analytics', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'growth-analytics', id, title: c.title });
    setActiveGrowthAnalyticsId(id);
    setPage('growth-analytics-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openPDScenario(id) {
    const s = productDesignScenarios.find(s => s.id === id);
    if (!s) return;
    if (!s.isFree && !unlocked) { track('paywall_hit', { room: 'product-design', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'product-design', id, title: s.title });
    setActivePDScenarioId(id);
    setPage('product-design-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleUnlocked() {
    track('unlocked');
    setUnlocked(true);
    navigate('browser');
  }

  function getNextScenarioId(currentId) {
    const accessible = scenarios.filter(s => s.isFree || unlocked);
    const idx = accessible.findIndex(s => s.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextMetricsCaseId(currentId) {
    const accessible = metricCases.filter(c => c.isFree || unlocked);
    const idx = accessible.findIndex(c => c.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextRCACaseId(currentId) {
    const accessible = rcaCases.filter(c => c.isFree || unlocked);
    const idx = accessible.findIndex(c => c.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextBusinessCaseId(currentId) {
    const accessible = businessCases.filter(c => c.isFree || unlocked);
    const idx = accessible.findIndex(c => c.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextDesignScenarioId(currentId) {
    const accessible = designScenarios.filter(s => s.isFree || unlocked);
    const idx = accessible.findIndex(s => s.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextPDScenarioId(currentId) {
    const accessible = productDesignScenarios.filter(s => s.isFree || unlocked);
    const idx = accessible.findIndex(s => s.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextCodeModuleId(currentId) {
    const accessible = codeModules.filter(m => m.isFree || unlocked);
    const idx = accessible.findIndex(m => m.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextBehavioralId(currentId) {
    const accessible = behavioralQuestions.filter(q => q.isFree || unlocked);
    const idx = accessible.findIndex(q => q.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextEstimationId(currentId) {
    const accessible = estimationProblems.filter(p => p.isFree || unlocked);
    const idx = accessible.findIndex(p => p.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextPrioritizationId(currentId) {
    const accessible = prioritizationScenarios.filter(s => s.isFree || unlocked);
    const idx = accessible.findIndex(s => s.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextStatFoundationsId(currentId) {
    const accessible = statsFoundationsModules.filter(m => m.isFree || unlocked);
    const idx = accessible.findIndex(m => m.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextGrowthAnalyticsId(currentId) {
    const accessible = growthAnalyticsCases.filter(c => c.isFree || unlocked);
    const idx = accessible.findIndex(c => c.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  function getNextStatsId(currentId) {
    const accessible = statsModules.filter(m => m.isFree || unlocked);
    const idx = accessible.findIndex(m => m.id === currentId);
    return idx >= 0 && idx < accessible.length - 1 ? accessible[idx + 1].id : null;
  }

  const activeScenario = scenarios.find(s => s.id === activeScenarioId);
  const nextScenarioId = activeScenarioId ? getNextScenarioId(activeScenarioId) : null;
  const activeDesignScenario = designScenarios.find(s => s.id === activeDesignScenarioId);
  const nextDesignScenarioId = activeDesignScenarioId ? getNextDesignScenarioId(activeDesignScenarioId) : null;
  const activeStatsModule = statsModules.find(m => m.id === activeStatsModuleId);
  const nextStatsModuleId = activeStatsModuleId ? getNextStatsId(activeStatsModuleId) : null;
  const activeMetricsCase = metricCases.find(m => m.id === activeMetricsCaseId);
  const nextMetricsCaseId = activeMetricsCaseId ? getNextMetricsCaseId(activeMetricsCaseId) : null;
  const activeRCACase = rcaCases.find(r => r.id === activeRCACaseId);
  const nextRCACaseId = activeRCACaseId ? getNextRCACaseId(activeRCACaseId) : null;
  const activeBusinessCase = businessCases.find(b => b.id === activeBusinessCaseId);
  const nextBusinessCaseId = activeBusinessCaseId ? getNextBusinessCaseId(activeBusinessCaseId) : null;
  const activePDScenario = productDesignScenarios.find(s => s.id === activePDScenarioId);
  const nextPDScenarioId = activePDScenarioId ? getNextPDScenarioId(activePDScenarioId) : null;
  const activeCodeModule = codeModules.find(m => m.id === activeCodeModuleId);
  const nextCodeModuleId = activeCodeModuleId ? getNextCodeModuleId(activeCodeModuleId) : null;
  const activePrioritizationScenario = prioritizationScenarios.find(s => s.id === activePrioritizationId);
  const nextPrioritizationId = activePrioritizationId ? getNextPrioritizationId(activePrioritizationId) : null;
  const activeBehavioralQuestion = behavioralQuestions.find(q => q.id === activeBehavioralId);
  const nextBehavioralId = activeBehavioralId ? getNextBehavioralId(activeBehavioralId) : null;
  const activeEstimationProblem = estimationProblems.find(p => p.id === activeEstimationId);
  const nextEstimationId = activeEstimationId ? getNextEstimationId(activeEstimationId) : null;
  const activeStatFoundationsModule = statsFoundationsModules.find(m => m.id === activeStatFoundationsId);
  const nextStatFoundationsId = activeStatFoundationsId ? getNextStatFoundationsId(activeStatFoundationsId) : null;
  const activeGrowthAnalyticsCase = growthAnalyticsCases.find(c => c.id === activeGrowthAnalyticsId);
  const nextGrowthAnalyticsId = activeGrowthAnalyticsId ? getNextGrowthAnalyticsId(activeGrowthAnalyticsId) : null;

  function getPairedDesignId(reviewScenarioId) {
    const d = designScenarios.find(s => s.pairedReviewScenarioId === reviewScenarioId);
    return d?.id || null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Header currentPage={page} onNavigate={navigate} unlockedStatus={unlocked} theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ flex: 1 }}>
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Loading…
          </div>
        }>
        {page === 'home' && (
          <Home onNavigate={navigate} onStartScenario={openScenario} />
        )}

        {/* ── Stats Room ── */}
        {page === 'stats' && (
          <StatsBrowser onSelectModule={openStatsModule} unlocked={unlocked} onUnlock={() => navigate('unlock')} />
        )}
        {page === 'stats-runner' && activeStatsModule && (
          <StatsRunner
            key={activeStatsModuleId}
            module={activeStatsModule}
            savedProgress={getStatsProgress(activeStatsModuleId)}
            onBack={() => navigate('stats')}
            onGoToReview={id => openScenario(id)}
            onGoToDesign={id => openDesignScenario(id)}
            onNext={nextStatsModuleId ? () => { setActiveStatsModuleId(nextStatsModuleId); } : null}
          />
        )}

        {/* ── Metrics Room ── */}
        {page === 'metrics' && (
          <MetricsBrowser onSelectCase={openMetricsCase} unlocked={unlocked} onUnlock={() => navigate('unlock')} />
        )}
        {page === 'metrics-runner' && activeMetricsCase && (
          <MetricsRunner
            key={activeMetricsCaseId}
            metricCase={activeMetricsCase}
            savedProgress={getMetricsProgress(activeMetricsCaseId)}
            unlocked={unlocked}
            onBack={() => navigate('metrics')}
            onGoToDesign={id => openDesignScenario(id)}
            onGoToReview={id => openScenario(id)}
            onNext={nextMetricsCaseId ? () => openMetricsCase(nextMetricsCaseId) : undefined}
          />
        )}

        {/* ── Design Room ── */}
        {page === 'design' && (
          <DesignBrowser onSelectScenario={openDesignScenario} unlocked={unlocked} onUnlock={() => navigate('unlock')} />
        )}
        {page === 'design-runner' && activeDesignScenario && (
          <DesignRunner
            key={activeDesignScenarioId}
            scenario={activeDesignScenario}
            savedProgress={getDesignProgress(activeDesignScenarioId)}
            onBack={() => navigate('design')}
            onGoToReview={id => openScenario(id)}
            onNext={nextDesignScenarioId ? () => openDesignScenario(nextDesignScenarioId) : undefined}
          />
        )}

        {/* ── Review Room ── */}
        {page === 'browser' && (
          <ScenarioBrowser
            scenarios={scenarios}
            allProgress={progressSnapshot}
            onSelect={id => { openScenario(id); refreshProgress(); }}
            unlocked={unlocked}
            onUnlock={() => navigate('unlock')}
          />
        )}
        {page === 'runner' && activeScenario && (
          <ScenarioRunner
            key={activeScenarioId}
            scenario={activeScenario}
            onBack={() => { navigate('browser'); refreshProgress(); }}
            onNext={nextScenarioId ? () => { openScenario(nextScenarioId); refreshProgress(); } : null}
            hasNext={!!nextScenarioId}
            pairedDesignId={getPairedDesignId(activeScenarioId)}
            onGoToDesign={openDesignScenario}
          />
        )}

        {/* ── RCA Room ── */}
        {page === 'rca' && (
          <RCABrowser onSelectCase={openRCACase} unlocked={unlocked} onUnlock={() => navigate('unlock')} />
        )}
        {page === 'rca-runner' && activeRCACase && (
          <RCARunner
            key={activeRCACaseId}
            rcaCase={activeRCACase}
            savedProgress={getRCAProgress(activeRCACaseId)}
            unlocked={unlocked}
            onBack={() => navigate('rca')}
            onNext={nextRCACaseId ? () => openRCACase(nextRCACaseId) : undefined}
          />
        )}

        {/* ── Cases Room ── */}
        {page === 'cases' && (
          <CasesBrowser onSelectCase={openBusinessCase} unlocked={unlocked} onUnlock={() => navigate('unlock')} />
        )}
        {page === 'cases-runner' && activeBusinessCase && (
          <CaseRunner
            key={activeBusinessCaseId}
            businessCase={activeBusinessCase}
            savedProgress={getCaseProgress(activeBusinessCaseId)}
            unlocked={unlocked}
            onBack={() => navigate('cases')}
            onNext={nextBusinessCaseId ? () => openBusinessCase(nextBusinessCaseId) : undefined}
          />
        )}

        {/* ── Product Design Room ── */}
        {page === 'product-design' && (
          <ProductDesignBrowser
            onSelectScenario={openPDScenario}
            unlocked={unlocked}
            onUnlock={() => navigate('unlock')}
          />
        )}
        {page === 'product-design-runner' && activePDScenario && (
          <ProductDesignRunner
            key={activePDScenarioId}
            scenario={activePDScenario}
            savedProgress={getProductDesignProgress(activePDScenarioId)}
            onBack={() => navigate('product-design')}
            onNext={nextPDScenarioId ? () => openPDScenario(nextPDScenarioId) : undefined}
          />
        )}

        {/* ── Code Room ── */}
        {page === 'code' && (
          <CodeBrowser
            modules={codeModules}
            onSelectModule={openCodeModule}
            unlocked={unlocked}
            onUnlock={() => navigate('unlock')}
          />
        )}
        {page === 'code-runner' && activeCodeModule && (
          <CodeRunner
            key={activeCodeModuleId}
            module={activeCodeModule}
            savedProgress={getCodeProgress(activeCodeModuleId)}
            onBack={() => navigate('code')}
            onNext={nextCodeModuleId ? () => openCodeModule(nextCodeModuleId) : undefined}
          />
        )}

        {/* ── Prioritization Room ── */}
        {page === 'prioritization' && (
          <PrioritizationBrowser
            onStart={openPrioritizationScenario}
            unlocked={unlocked}
          />
        )}
        {page === 'prioritization-runner' && activePrioritizationScenario && (
          <PrioritizationRunner
            key={activePrioritizationId}
            scenario={activePrioritizationScenario}
            onBack={() => navigate('prioritization')}
            onNext={nextPrioritizationId ? () => openPrioritizationScenario(nextPrioritizationId) : undefined}
          />
        )}

        {/* ── Behavioral Room ── */}
        {page === 'behavioral' && (
          <BehavioralBrowser onStart={openBehavioralQuestion} unlocked={unlocked} />
        )}
        {page === 'behavioral-runner' && activeBehavioralQuestion && (
          <BehavioralRunner
            key={activeBehavioralId}
            question={activeBehavioralQuestion}
            onBack={() => navigate('behavioral')}
            onNext={nextBehavioralId ? () => openBehavioralQuestion(nextBehavioralId) : undefined}
          />
        )}

        {/* ── Estimation Room ── */}
        {page === 'estimation' && (
          <EstimationBrowser onStart={openEstimationProblem} unlocked={unlocked} />
        )}
        {page === 'estimation-runner' && activeEstimationProblem && (
          <EstimationRunner
            key={activeEstimationId}
            problem={activeEstimationProblem}
            onBack={() => navigate('estimation')}
            onNext={nextEstimationId ? () => openEstimationProblem(nextEstimationId) : undefined}
          />
        )}

        {/* ── Stat Foundations Room ── */}
        {page === 'stat-foundations' && (
          <StatsFoundationsBrowser
            onStart={openStatFoundationsModule}
            unlocked={unlocked}
          />
        )}
        {page === 'stat-foundations-runner' && activeStatFoundationsModule && (
          <StatsFoundationsRunner
            key={activeStatFoundationsId}
            moduleId={activeStatFoundationsId}
            onBack={() => setPage('stat-foundations')}
            onNext={nextStatFoundationsId
              ? () => openStatFoundationsModule(nextStatFoundationsId)
              : () => setPage('stat-foundations')}
            unlocked={unlocked}
          />
        )}

        {/* ── Growth Analytics Room ── */}
        {page === 'growth-analytics' && (
          <GrowthAnalyticsBrowser
            onSelectCase={openGrowthAnalyticsCase}
            unlocked={unlocked}
          />
        )}
        {page === 'growth-analytics-runner' && activeGrowthAnalyticsCase && (
          <GrowthAnalyticsRunner
            key={activeGrowthAnalyticsId}
            caseData={activeGrowthAnalyticsCase}
            unlocked={unlocked}
            onBack={() => navigate('growth-analytics')}
            onNext={nextGrowthAnalyticsId ? () => openGrowthAnalyticsCase(nextGrowthAnalyticsId) : undefined}
          />
        )}

        {/* ── Support pages ── */}
        {page === 'pricing' && <Pricing onShowUnlock={() => setPage('unlock')} onBack={() => setPage('home')} />}
        {page === 'progress' && (
          <Progress
            scenarios={scenarios}
            allProgress={progressSnapshot}
            onSelect={openScenario}
            onClear={refreshProgress}
            onNavigate={navigate}
            unlocked={unlocked}
          />
        )}
        {page === 'unlock' && (
          <Unlock onUnlocked={handleUnlocked} alreadyUnlocked={unlocked} onNavigate={navigate} />
        )}
        {page === 'about' && <About />}
        {page === 'bank' && <JudgmentBank onNavigate={navigate} />}
        {page === 'blog' && (
          <BlogBrowser onNavigate={navigate} />
        )}
        {page === 'playbook' && (
          <PlaybookBrowser onOpenItem={(room, id) => {
            if (room === 'stats') openStatsModule(id);
            else if (room === 'metrics') openMetricsCase(id);
            else if (room === 'design') openDesignScenario(id);
            else if (room === 'review') openScenario(id);
            else if (room === 'rca') openRCACase(id);
            else if (room === 'cases') openBusinessCase(id);
            else if (room === 'product-design') openPDScenario(id);
            else if (room === 'prioritization') openPrioritizationScenario(id);
          }} />
        )}
        {page === 'qa' && (
          <QADashboard
            onNavigate={navigate}
            unlocked={unlocked}
            onOpenItem={(room, id) => {
              if (room === 'stats') openStatsModule(id);
              else if (room === 'metrics') openMetricsCase(id);
              else if (room === 'design') openDesignScenario(id);
              else if (room === 'review') openScenario(id);
              else if (room === 'rca') openRCACase(id);
              else if (room === 'cases') openBusinessCase(id);
              else if (room === 'product-design') openPDScenario(id);
              else if (room === 'prioritization') openPrioritizationScenario(id);
            }}
            onUnlock={() => setUnlocked(true)}
            onLock={() => setUnlocked(false)}
            onResetAllProgress={() => {
              ['exp-lab-progress-v1', 'pal-design-progress-v1', 'pal-stats-progress-v1',
               'pal-metrics-progress-v2', 'pal-rca-progress-v2', 'pal-cases-progress-v2',
               'pal-code-progress-v1', 'pal-pri-progress-v1',
               'pal-behavioral-progress-v1', 'pal-estimation-progress-v1',
               'pal-stat-foundations-progress-v1'
              ].forEach(k => { try { localStorage.removeItem(k); } catch {} });
              // Clear per-scenario product-design progress (prefix: pd-progress-)
              try {
                Object.keys(localStorage)
                  .filter(k => k.startsWith('pd-progress-'))
                  .forEach(k => localStorage.removeItem(k));
              } catch {}
              refreshProgress();
            }}
          />
        )}
        </Suspense>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
