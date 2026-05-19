const KEY = 'pal-estimation-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getEstimationProgress(problemId) {
  return load()[problemId] || null;
}

export function getAllEstimationProgress() {
  return load();
}

export function saveEstimationAttempt(problemId, response, rating) {
  const data = load();
  data[problemId] = { response, rating, completedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearEstimationProgress(problemId) {
  const data = load();
  delete data[problemId];
  localStorage.setItem(KEY, JSON.stringify(data));
}
