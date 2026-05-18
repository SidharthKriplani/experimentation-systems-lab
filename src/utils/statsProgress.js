// Product Analytics Lab — Stats Room Progress Persistence
const STORAGE_KEY = 'pal-stats-progress-v1';

const LEVEL_ORDER = ['wrong', 'partial', 'strong', 'staff'];

function readStore() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { return {}; }
}
function writeStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

export function saveStatsAttempt(moduleId, selectedOptionId, level) {
  const store = readStore();
  const prev = store[moduleId] || {};
  const attempts = (prev.attempts || 0) + 1;
  const isImprovement = !prev.bestLevel || LEVEL_ORDER.indexOf(level) > LEVEL_ORDER.indexOf(prev.bestLevel);
  store[moduleId] = {
    selectedOptionId,
    level,
    attempts,
    lastCompletedAt: Date.now(),
    bestLevel: isImprovement ? level : prev.bestLevel,
  };
  writeStore(store);
}

export function getStatsProgress(moduleId) {
  return readStore()[moduleId] || null;
}

export function getAllStatsProgress() {
  return readStore();
}

export function clearStatsProgress(moduleId) {
  const store = readStore();
  delete store[moduleId];
  writeStore(store);
}
