const KEY = 'pal-behavioral-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getBehavioralProgress(questionId) {
  return load()[questionId] || null;
}

export function getAllBehavioralProgress() {
  return load();
}

export function saveBehavioralAttempt(questionId, response, rating) {
  const data = load();
  data[questionId] = { response, rating, completedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearBehavioralProgress(questionId) {
  const data = load();
  delete data[questionId];
  localStorage.setItem(KEY, JSON.stringify(data));
}
