import { useState, useEffect } from 'react';
import { scenarios } from './data/scenarios.js';
import { designScenarios } from './data/designScenarios.js';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { ScenarioBrowser } from './pages/ScenarioBrowser.jsx';
import { DesignBrowser } from './pages/DesignBrowser.jsx';
import { Progress } from './pages/Progress.jsx';
import { Unlock } from './pages/Unlock.jsx';
import { About } from './pages/About.jsx';
import { JudgmentBank } from './pages/JudgmentBank.jsx';
import { ScenarioRunner } from './components/scenario/ScenarioRunner.jsx';
import { DesignRunner } from './components/design/DesignRunner.jsx';
import { getAllProgress } from './utils/progress.js';
import { getDesignProgress } from './utils/designProgress.js';
import { isUnlocked } from './utils/unlock.js';

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
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [progressSnapshot, setProgressSnapshot] = useState(() => getAllProgress());
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    try { localStorage.setItem('exp-lab-theme', theme); } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  function refreshProgress() {
    setProgressSnapshot(getAllProgress());
  }

  function navigate(target) {
    setPage(target);
    setActiveScenarioId(null);
    setActiveDesignScenarioId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openDesignScenario(id) {
    const scenario = designScenarios.find(s => s.id === id);
    if (!scenario) return;
    if (!scenario.isFree && !unlocked) {
      setPage('unlock');
      return;
    }
    setActiveDesignScenarioId(id);
    setPage('design-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openScenario(id) {
    const scenario = scenarios.find(s => s.id === id);
    if (!scenario) return;
    if (!scenario.isFree && !unlocked) {
      setPage('unlock');
      return;
    }
    setActiveScenarioId(id);
    setPage('runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleUnlocked() {
    setUnlocked(true);
    navigate('browser');
  }

  function getNextScenarioId(currentId) {
    const accessible = scenarios.filter(s => s.isFree || unlocked);
    const idx = accessible.findIndex(s => s.id === currentId);
    if (idx < 0 || idx >= accessible.length - 1) return null;
    return accessible[idx + 1].id;
  }

  const activeScenario = scenarios.find(s => s.id === activeScenarioId);
  const nextScenarioId = activeScenarioId ? getNextScenarioId(activeScenarioId) : null;
  const activeDesignScenario = designScenarios.find(s => s.id === activeDesignScenarioId);

  // Paired design scenario for a given review scenario id
  function getPairedDesignId(reviewScenarioId) {
    const d = designScenarios.find(s => s.pairedReviewScenarioId === reviewScenarioId);
    return d?.id || null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Header currentPage={page} onNavigate={navigate} unlockedStatus={unlocked} theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ flex: 1 }}>
        {page === 'home' && (
          <Home onNavigate={navigate} onStartScenario={openScenario} />
        )}
        {page === 'design' && (
          <DesignBrowser
            onSelectScenario={openDesignScenario}
            unlocked={unlocked}
            onUnlock={() => navigate('unlock')}
          />
        )}
        {page === 'design-runner' && activeDesignScenario && (
          <DesignRunner
            key={activeDesignScenarioId}
            scenario={activeDesignScenario}
            savedProgress={getDesignProgress(activeDesignScenarioId)}
            onBack={() => navigate('design')}
            onGoToReview={id => openScenario(id)}
          />
        )}
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
        {page === 'progress' && (
          <Progress
            scenarios={scenarios}
            allProgress={progressSnapshot}
            onSelect={openScenario}
            onClear={refreshProgress}
          />
        )}
        {page === 'unlock' && (
          <Unlock
            onUnlocked={handleUnlocked}
            alreadyUnlocked={unlocked}
            onNavigate={navigate}
          />
        )}
        {page === 'about' && <About />}
        {page === 'bank' && <JudgmentBank onNavigate={navigate} />}
      </main>
      <Footer />
    </div>
  );
}
