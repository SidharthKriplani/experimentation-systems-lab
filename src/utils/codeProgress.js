// Code Room progress utilities
const KEY = 'pal-code-progress-v1';

function loadAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function saveAll(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function getCodeProgress(moduleId) {
  return loadAll()[moduleId] || null;
}

export function getAllCodeProgress() {
  return loadAll();
}

export function saveCodeAttempt(moduleId, response, rating) {
  const all = loadAll();
  all[moduleId] = { response, rating, completedAt: Date.now() };
  saveAll(all);
}

export function clearCodeProgress(moduleId) {
  const all = loadAll();
  delete all[moduleId];
  saveAll(all);
}
