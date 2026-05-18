// Product Analytics Lab — Cases Room Progress Persistence
const STORAGE_KEY = 'pal-cases-progress-v2';

function readStore() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { return {}; }
}
function writeStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

export function saveCaseAttempt(caseId, phaseChoices, score, level) {
  const store = readStore();
  const prev = store[caseId] || {};
  const attempts = (prev.attempts || 0) + 1;
  store[caseId] = {
    phaseChoices,
    score,
    level,
    attempts,
    lastCompletedAt: Date.now(),
  };
  writeStore(store);
}

export function getCaseProgress(caseId) {
  return readStore()[caseId] || null;
}

export function getAllCaseProgress() {
  return readStore();
}

export function clearCaseProgress(caseId) {
  const store = readStore();
  delete store[caseId];
  writeStore(store);
}
