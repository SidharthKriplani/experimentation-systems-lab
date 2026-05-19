const KEY = 'pal-pri-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getPrioritizationProgress(scenarioId) {
  return load()[scenarioId] || null;
}

export function getAllPrioritizationProgress() {
  return load();
}

export function savePrioritizationAttempt(scenarioId, response, rating) {
  const data = load();
  data[scenarioId] = { response, rating, completedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearPrioritizationProgress(scenarioId) {
  const data = load();
  delete data[scenarioId];
  localStorage.setItem(KEY, JSON.stringify(data));
}
