import { useState, useEffect, lazy, Suspense } from 'react';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
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
import { challengesCases, challengesCasesById } from './data/challengesCases.js';
import { biCases, biCasesById } from './data/biCases.js';
import { spotTheFlawCases, spotTheFlawCasesById } from './data/spotTheFlawCases.js';
import { takehomeCases, takehomeCasesById } from './data/takehomeCases.js';
import { instrumentationCases, instrumentationCasesById } from './data/instrumentationCases.js';
import { getAllInstrumentationProgress } from './utils/instrumentationProgress.js';
import { metricsFoundationModules } from './data/metricsFoundationModules.js';
// Layout (always needed — not lazy)
import { Sidebar } from './components/layout/Sidebar.jsx';
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
import { getAllChallengesProgress } from './utils/challengesProgress.js';
import { getAllBIProgress } from './utils/biProgress.js';
import { getAllSTFProgress } from './utils/spotTheFlawProgress.js';
import { getAllTakehomeProgress } from './utils/takehomeProgress.js';
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
const InterviewSimulator      = lazy(() => import('./pages/InterviewSimulator.jsx').then(m => ({ default: m.InterviewSimulator })));
const ABTestInterpreter       = lazy(() => import('./pages/ABTestInterpreter.jsx').then(m => ({ default: m.ABTestInterpreter })));
const SearchPage              = lazy(() => import('./pages/SearchPage.jsx').then(m => ({ default: m.SearchPage })));
const BookmarksBrowser        = lazy(() => import('./pages/BookmarksBrowser.jsx').then(m => ({ default: m.BookmarksBrowser })));
const ConsultationSpace = lazy(() => import('./pages/ConsultationSpace.jsx').then(m => ({ default: m.ConsultationSpace })));
const Trainer           = lazy(() => import('./pages/Trainer.jsx').then(m => ({ default: m.Trainer })));
const CompanyTracks     = lazy(() => import('./pages/CompanyTracks.jsx').then(m => ({ default: m.CompanyTracks })));
const ChallengesBrowser = lazy(() => import('./pages/ChallengesBrowser.jsx').then(m => ({ default: m.ChallengesBrowser })));
const ChallengesRunner  = lazy(() => import('./components/challenges/ChallengesRunner.jsx').then(m => ({ default: m.ChallengesRunner })));
const BIBrowser        = lazy(() => import('./pages/BIBrowser.jsx').then(m => ({ default: m.BIBrowser })));
const BIRunner         = lazy(() => import('./components/bi/BIRunner.jsx').then(m => ({ default: m.BIRunner })));
const SpotTheFlawBrowser = lazy(() => import('./pages/SpotTheFlawBrowser.jsx').then(m => ({ default: m.SpotTheFlawBrowser })));
const SpotTheFlawRunner  = lazy(() => import('./components/spotTheFlaw/SpotTheFlawRunner.jsx').then(m => ({ default: m.SpotTheFlawRunner })));
const TakehomeBrowser  = lazy(() => import('./pages/TakehomeBrowser.jsx').then(m => ({ default: m.TakehomeBrowser })));
const TakehomeRunner   = lazy(() => import('./components/takehome/TakehomeRunner.jsx').then(m => ({ default: m.TakehomeRunner })));
const DefenseDocGenerator = lazy(() => import('./pages/DefenseDocGenerator.jsx').then(m => ({ default: m.DefenseDocGenerator })));
const InstrumentationBrowser = lazy(() => import('./pages/InstrumentationBrowser.jsx').then(m => ({ default: m.InstrumentationBrowser })));
const InstrumentationRunner   = lazy(() => import('./components/instrumentation/InstrumentationRunner.jsx').then(m => ({ default: m.InstrumentationRunner })));
const FoundationHub           = lazy(() => import('./pages/FoundationHub.jsx').then(m => ({ default: m.FoundationHub })));
const MetricsFoundationsBrowser = lazy(() => import('./pages/MetricsFoundationsBrowser.jsx').then(m => ({ default: m.MetricsFoundationsBrowser })));
const MetricsFoundationsRunner  = lazy(() => import('./components/metricsFoundations/MetricsFoundationsRunner.jsx').then(m => ({ default: m.MetricsFoundationsRunner })));

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
  const [activeChallengeId, setActiveChallengeId] = useState(null);
  const [activeBICaseId, setActiveBICaseId] = useState(null);
  const [activeSTFCaseId, setActiveSTFCaseId] = useState(null);
  const [activeTakehomeCaseId, setActiveTakehomeCaseId] = useState(null);
  const [activeInstrumentationCaseId, setActiveInstrumentationCaseId] = useState(null);
  const [activeMetricsFoundationId, setActiveMetricsFoundationId] = useState(null);
  const [playbookInitialArticle, setPlaybookInitialArticle] = useState(null);
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [progressSnapshot, setProgressSnapshot] = useState(() => ({ ...getAllProgress(), challengesProgress: getAllChallengesProgress(), biProgress: getAllBIProgress(), stfProgress: getAllSTFProgress(), takehomeProgress: getAllTakehomeProgress(), instrumentationProgress: getAllInstrumentationProgress() }));
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      'simulator':      'Interview Simulator — Product Analytics Lab',
      'ab-interpreter': 'A/B Test Interpreter — Product Analytics Lab',
      'search':    'Search — Analytics Lab',
      'bookmarks': 'Bookmarks — Product Analytics Lab',
      'consult':        'Consultation Space — Product Analytics Lab',
      'trainer':        'Trainer — Product Analytics Lab',
      'company-tracks': 'Company Tracks — Product Analytics Lab',
      'challenges': 'Challenges — Product Analytics Lab',
      'challenges-runner': 'Challenges — Product Analytics Lab',
      'bi': 'BI & Reporting — Product Analytics Lab',
      'bi-runner': 'BI & Reporting — Product Analytics Lab',
      'spot-the-flaw': 'Spot the Flaw — Product Analytics Lab',
      'stf-runner': 'Spot the Flaw — Product Analytics Lab',
      'take-home': 'Take-Home Challenges — Product Analytics Lab',
      'takehome-runner': 'Take-Home Challenges — Product Analytics Lab',
      'defense-doc': 'Defense Doc — Product Analytics Lab',
      'instrumentation': 'Analytics Instrumentation — Product Analytics Lab',
      'instrumentation-runner': 'Case — Analytics Instrumentation — Product Analytics Lab',
      'foundations': 'Foundations — Product Analytics Lab',
      'metrics-foundations': 'Metrics Foundations — Product Analytics Lab',
      'metrics-foundations-runner': 'Metrics Foundations — Product Analytics Lab',
    };
    document.title = titles[page] || 'Product Analytics Lab';
  }, [page]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  function refreshProgress() {
    setProgressSnapshot({ ...getAllProgress(), challengesProgress: getAllChallengesProgress(), biProgress: getAllBIProgress(), stfProgress: getAllSTFProgress(), takehomeProgress: getAllTakehomeProgress(), instrumentationProgress: getAllInstrumentationProgress() });
  }

  function navigate(target) {
    track('page_viewed', { page: target });
    setPage(target);
    setSidebarOpen(false);
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

  function openChallenge(id) {
    const c = challengesCasesById[id];
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'challenges', id }); setPage('unlock'); return; }
    setActiveChallengeId(id);
    track('open_challenge', { id, title: c.title });
    setPage('challenges-runner');
  }

  function getNextChallengeId(currentId) {
    const idx = challengesCases.findIndex(c => c.id === currentId);
    return idx >= 0 && idx < challengesCases.length - 1 ? challengesCases[idx + 1].id : null;
  }

  function openBICase(id) {
    const c = biCasesById[id];
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'bi', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'bi', id, title: c.title });
    setActiveBICaseId(id);
    setPage('bi-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function getNextBICaseId(currentId) {
    const idx = biCases.findIndex(c => c.id === currentId);
    return idx >= 0 && idx < biCases.length - 1 ? biCases[idx + 1].id : null;
  }

  function openSTFCase(id) {
    const c = spotTheFlawCasesById[id];
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'spot-the-flaw', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'spot-the-flaw', id, title: c.title });
    setActiveSTFCaseId(id);
    setPage('stf-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function getNextSTFCaseId(currentId) {
    const idx = spotTheFlawCases.findIndex(c => c.id === currentId);
    return idx >= 0 && idx < spotTheFlawCases.length - 1 ? spotTheFlawCases[idx + 1].id : null;
  }

  function openTakehomeCase(id) {
    const c = takehomeCasesById[id];
    if (!c) return;
    if (!c.isFree && !unlocked) { track('paywall_hit', { room: 'take-home', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'take-home', id, title: c.title });
    setActiveTakehomeCaseId(id);
    setPage('takehome-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function getNextTakehomeCaseId(currentId) {
    const idx = takehomeCases.findIndex(c => c.id === currentId);
    return idx >= 0 && idx < takehomeCases.length - 1 ? takehomeCases[idx + 1].id : null;
  }

  function openPlaybookArticle(id) {
    setPlaybookInitialArticle(id);
    setPage('playbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openInstrumentationCase(id) {
    const c = instrumentationCasesById[id];
    if (!c) return;
    if (!unlocked && !c.isFree) { navigate('unlock'); return; }
    track('case_opened', { room: 'instrumentation', id, title: c.title });
    setActiveInstrumentationCaseId(id);
    navigate('instrumentation-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openMetricsFoundationModule(id) {
    const m = metricsFoundationModules.find(m => m.id === id);
    if (!m) return;
    if (!m.isFree && !unlocked) { track('paywall_hit', { room: 'metrics-foundations', id }); setPage('unlock'); return; }
    track('case_opened', { room: 'metrics-foundations', id, title: m.title });
    setActiveMetricsFoundationId(id);
    setPage('metrics-foundations-runner');
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

  useKeyboardShortcuts([
    { key: '/', action: () => setPage('search') },
    { key: 'k', ctrlKey: true, action: () => setPage('search') },
    { key: 'Escape', action: () => { if (page !== 'home') setPage('home'); } },
    { key: 'p', action: () => setPage('progress') },
    { key: 'h', action: () => setPage('home') },
    { key: 't', action: () => setPage('trainer') },
    { key: 'c', action: () => setPage('consult') },
    { key: 'x', action: () => setPage('challenges') },
    { key: 'b', action: () => setPage('bi') },
    { key: 'd', action: () => setPage('defense-doc') },
  ]);

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

  function getNextMetricsFoundationId(currentId) {
    const accessible = metricsFoundationModules.filter(m => m.isFree || unlocked);
    const idx = accessible.findIndex(m => m.id === currentId);
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

  const instrIdx = activeInstrumentationCaseId ? instrumentationCases.findIndex(c => c.id === activeInstrumentationCaseId) : -1;
  const nextInstrumentationCaseId = instrIdx >= 0 && instrIdx < instrumentationCases.length - 1 ? instrumentationCases[instrIdx + 1].id : null;

  function getPairedDesignId(reviewScenarioId) {
    const d = designScenarios.find(s => s.pairedReviewScenarioId === reviewScenarioId);
    return d?.id || null;
  }

  const isFocusMode = page === 'runner' || page.endsWith('-runner');

  return (
    <div className={`app-layout${isFocusMode ? ' focus-mode' : ''}`} style={{ color: 'var(--text)' }}>
      <Sidebar
        currentPage={page}
        onNavigate={navigate}
        unlockedStatus={unlocked}
        theme={theme}
        onToggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="app-main-wrapper">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <button
            onClick={() => setSidebarOpen(s => !s)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: '1.1rem', padding: '0.3rem', lineHeight: 1, display: 'flex', alignItems: 'center' }}
            aria-label="Open menu"
          >☰</button>
          <button
            onClick={() => navigate('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0' }}
          >
            <div style={{ width: 20, height: 20, background: 'linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>⚗</div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>Analytics Lab</span>
          </button>
        </div>

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
          <StatsBrowser onSelectModule={openStatsModule} unlocked={unlocked} onUnlock={() => navigate('unlock')} onOpenArticle={openPlaybookArticle} />
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
          <MetricsBrowser onSelectCase={openMetricsCase} unlocked={unlocked} onUnlock={() => navigate('unlock')} onOpenArticle={openPlaybookArticle} />
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
          <DesignBrowser onSelectScenario={openDesignScenario} unlocked={unlocked} onUnlock={() => navigate('unlock')} onOpenArticle={openPlaybookArticle} />
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
            onOpenArticle={openPlaybookArticle}
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
          <RCABrowser onSelectCase={openRCACase} unlocked={unlocked} onUnlock={() => navigate('unlock')} onOpenArticle={openPlaybookArticle} />
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
            onOpenArticle={openPlaybookArticle}
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
            onOpenArticle={openPlaybookArticle}
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
            onOpenArticle={openPlaybookArticle}
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
            onNavigate={navigate}
          />
        )}

        {/* ── Growth Analytics Room ── */}
        {page === 'growth-analytics' && (
          <GrowthAnalyticsBrowser
            onSelectCase={openGrowthAnalyticsCase}
            unlocked={unlocked}
            onOpenArticle={openPlaybookArticle}
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

        {/* ── Search Page ── */}
        {page === 'search' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <SearchPage
              onNavigate={(targetPage, itemId) => {
                if (itemId) {
                  switch (targetPage) {
                    case 'browser':              openScenario(itemId); break;
                    case 'stats':                openStatsModule(itemId); break;
                    case 'metrics':              openMetricsCase(itemId); break;
                    case 'design':               openDesignScenario(itemId); break;
                    case 'rca':                  openRCACase(itemId); break;
                    case 'cases':                openBusinessCase(itemId); break;
                    case 'product-design':       openPDScenario(itemId); break;
                    case 'code':                 openCodeModule(itemId); break;
                    case 'prioritization':       openPrioritizationScenario(itemId); break;
                    case 'behavioral':           openBehavioralQuestion(itemId); break;
                    case 'estimation':           openEstimationProblem(itemId); break;
                    case 'stat-foundations':     openStatFoundationsModule(itemId); break;
                    case 'growth-analytics':     openGrowthAnalyticsCase(itemId); break;
                    default:                     setPage(targetPage);
                  }
                } else {
                  setPage(targetPage);
                }
              }}
              allData={{ scenarios, designScenarios, statsModules, metricCases, rcaCases, businessCases, productDesignScenarios, codeModules, prioritizationScenarios, behavioralQuestions, estimationProblems, statsFoundationsModules, growthAnalyticsCases }}
            />
          </Suspense>
        )}

        {/* ── BI Room ── */}
        {page === 'bi' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <BIBrowser onSelectCase={openBICase} unlocked={unlocked} onOpenArticle={openPlaybookArticle} />
          </Suspense>
        )}
        {page === 'bi-runner' && activeBICaseId && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <BIRunner
              caseData={biCasesById[activeBICaseId]}
              onBack={() => setPage('bi')}
              onNext={() => { const n = getNextBICaseId(activeBICaseId); if (n) openBICase(n); else setPage('bi'); }}
              unlocked={unlocked}
            />
          </Suspense>
        )}

        {/* ── Spot the Flaw Room ── */}
        {page === 'spot-the-flaw' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <SpotTheFlawBrowser onSelectCase={openSTFCase} unlocked={unlocked} />
          </Suspense>
        )}
        {page === 'stf-runner' && activeSTFCaseId && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <SpotTheFlawRunner
              caseData={spotTheFlawCasesById[activeSTFCaseId]}
              onBack={() => setPage('spot-the-flaw')}
              onNext={() => { const n = getNextSTFCaseId(activeSTFCaseId); if (n) openSTFCase(n); else setPage('spot-the-flaw'); }}
              unlocked={unlocked}
            />
          </Suspense>
        )}

        {/* ── Take-Home Room ── */}
        {page === 'take-home' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <TakehomeBrowser onSelectCase={openTakehomeCase} unlocked={unlocked} onOpenArticle={openPlaybookArticle} />
          </Suspense>
        )}
        {page === 'takehome-runner' && activeTakehomeCaseId && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <TakehomeRunner
              caseData={takehomeCasesById[activeTakehomeCaseId]}
              onBack={() => setPage('take-home')}
              onNext={() => { const n = getNextTakehomeCaseId(activeTakehomeCaseId); if (n) openTakehomeCase(n); else setPage('take-home'); }}
              unlocked={unlocked}
            />
          </Suspense>
        )}

        {/* ── Analytics Instrumentation Room ── */}
        {page === 'instrumentation' && (
          <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>}>
            <InstrumentationBrowser onSelectCase={openInstrumentationCase} unlocked={unlocked} onOpenArticle={openPlaybookArticle} />
          </Suspense>
        )}
        {page === 'instrumentation-runner' && activeInstrumentationCaseId && (
          <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>}>
            <InstrumentationRunner
              caseData={instrumentationCasesById[activeInstrumentationCaseId]}
              onBack={() => navigate('instrumentation')}
              onNext={nextInstrumentationCaseId ? () => openInstrumentationCase(nextInstrumentationCaseId) : null}
              unlocked={unlocked}
            />
          </Suspense>
        )}

        {/* ── Defense Doc Generator ── */}
        {page === 'defense-doc' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <DefenseDocGenerator
              onBack={() => setPage('home')}
              onNavigate={(targetPage, itemId) => {
                if (itemId) {
                  switch (targetPage) {
                    case 'stat-foundations': openStatFoundationsModule(itemId); break;
                    case 'growth-analytics': openGrowthAnalyticsCase(itemId); break;
                    case 'metrics': openMetricsCase(itemId); break;
                    case 'rca': openRCACase(itemId); break;
                    case 'code': openCodeModule(itemId); break;
                    case 'behavioral': openBehavioralQuestion(itemId); break;
                    default: setPage(targetPage);
                  }
                } else {
                  setPage(targetPage);
                }
              }}
            />
          </Suspense>
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
          <PlaybookBrowser key={playbookInitialArticle || 'playbook'} initialArticleId={playbookInitialArticle} onOpenItem={(room, id) => {
            if (room === 'stats') openStatsModule(id);
            else if (room === 'metrics') openMetricsCase(id);
            else if (room === 'design') openDesignScenario(id);
            else if (room === 'review') openScenario(id);
            else if (room === 'rca') openRCACase(id);
            else if (room === 'cases') openBusinessCase(id);
            else if (room === 'product-design') openPDScenario(id);
            else if (room === 'prioritization') openPrioritizationScenario(id);
            else if (room === 'bi') openBICase(id);
            else if (room === 'instrumentation') openInstrumentationCase(id);
            else if (room === 'take-home') openTakehomeCase(id);
          }} />
        )}
        {page === 'foundations' && (
          <FoundationHub
            onOpenArticle={openPlaybookArticle}
            onNavigate={navigate}
          />
        )}
        {/* ── Metrics Foundations ── */}
        {page === 'metrics-foundations' && (
          <MetricsFoundationsBrowser onStart={openMetricsFoundationModule} unlocked={unlocked} />
        )}
        {page === 'metrics-foundations-runner' && activeMetricsFoundationId && (
          <MetricsFoundationsRunner
            key={activeMetricsFoundationId}
            moduleId={activeMetricsFoundationId}
            onBack={() => setPage('metrics-foundations')}
            onNext={(() => { const n = getNextMetricsFoundationId(activeMetricsFoundationId); return n ? () => openMetricsFoundationModule(n) : () => setPage('metrics-foundations'); })()}
            unlocked={unlocked}
          />
        )}

        {page === 'simulator' && <InterviewSimulator onBack={() => setPage('home')} onNavigate={navigate} />}
        {page === 'ab-interpreter' && <ABTestInterpreter onBack={() => setPage('home')} />}
        {page === 'consult' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <ConsultationSpace
              onBack={() => setPage('home')}
              onNavigate={(targetPage, itemId) => {
                if (itemId) {
                  switch (targetPage) {
                    case 'playbook': setPage('playbook'); break; // playbook handles article ID via its own state
                    case 'stat-foundations': openStatFoundationsModule(itemId); break;
                    case 'growth-analytics': openGrowthAnalyticsCase(itemId); break;
                    case 'trainer': setPage('trainer'); break;
                    default: setPage(targetPage);
                  }
                } else {
                  setPage(targetPage);
                }
              }}
            />
          </Suspense>
        )}
        {page === 'trainer' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <Trainer onBack={() => setPage('home')} />
          </Suspense>
        )}
        {page === 'company-tracks' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <CompanyTracks
              onBack={() => setPage('home')}
              onNavigate={(targetPage, itemId) => {
                if (itemId) {
                  switch (targetPage) {
                    case 'stat-foundations': openStatFoundationsModule(itemId); break;
                    case 'growth-analytics': openGrowthAnalyticsCase(itemId); break;
                    case 'stats':            openStatsModule(itemId); break;
                    case 'metrics':          openMetricsCase(itemId); break;
                    case 'rca':              openRCACase(itemId); break;
                    case 'cases':            openBusinessCase(itemId); break;
                    case 'behavioral':       openBehavioralQuestion(itemId); break;
                    case 'estimation':       openEstimationProblem(itemId); break;
                    case 'product-design':   openPDScenario(itemId); break;
                    case 'prioritization':   openPrioritizationScenario(itemId); break;
                    case 'code':             openCodeModule(itemId); break;
                    case 'browser':          openScenario(itemId); break;
                    case 'playbook':         setPage('playbook'); break;
                    default:                 setPage(targetPage);
                  }
                } else {
                  setPage(targetPage);
                }
              }}
            />
          </Suspense>
        )}
        {page === 'challenges' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <ChallengesBrowser
              onSelectChallenge={openChallenge}
              unlocked={unlocked}
            />
          </Suspense>
        )}
        {page === 'challenges-runner' && activeChallengeId && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <ChallengesRunner
              caseData={challengesCasesById[activeChallengeId]}
              onBack={() => setPage('challenges')}
              onNext={() => {
                const nextId = getNextChallengeId(activeChallengeId);
                if (nextId) openChallenge(nextId);
                else setPage('challenges');
              }}
              unlocked={unlocked}
            />
          </Suspense>
        )}

        {page === 'bookmarks' && (
          <Suspense fallback={<div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)'}}>Loading…</div>}>
            <BookmarksBrowser
              onBack={() => setPage('home')}
              onNavigate={(targetPage, itemId) => {
                if (itemId) {
                  switch (targetPage) {
                    case 'stat-foundations':  openStatFoundationsModule(itemId); break;
                    case 'growth-analytics':  openGrowthAnalyticsCase(itemId); break;
                    case 'stats':             openStatsModule(itemId); break;
                    case 'metrics':           openMetricsCase(itemId); break;
                    case 'rca':               openRCACase(itemId); break;
                    case 'cases':             openBusinessCase(itemId); break;
                    case 'behavioral':        openBehavioralQuestion(itemId); break;
                    case 'estimation':        openEstimationProblem(itemId); break;
                    case 'product-design':    openPDScenario(itemId); break;
                    case 'prioritization':    openPrioritizationScenario(itemId); break;
                    case 'browser':           openScenario(itemId); break;
                    default:                  setPage(targetPage);
                  }
                } else {
                  setPage(targetPage);
                }
              }}
            />
          </Suspense>
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
               'pal-stat-foundations-progress-v1',
               'pal-bi-progress-v1', 'pal-stf-progress-v1', 'pal-takehome-progress-v1',
               'pal-instrumentation-progress-v1', 'pal-growth-analytics-progress-v1',
               'pal-challenges-progress-v1', 'pal-bookmarks-v1', 'pal-notes-v1',
               'pal-metrics-foundation-progress-v1'
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
  </div>
  );
}
