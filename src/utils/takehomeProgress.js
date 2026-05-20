const KEY = 'pal-takehome-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getTakehomeProgress(caseId) {
  return load()[caseId] || null;
}

export function getAllTakehomeProgress() {
  return load();
}

export function saveTakehomeProgress(caseId, data) {
  const d = load();
  d[caseId] = {
    startedAt: data.startedAt || null,
    completedAt: data.completedAt || new Date().toISOString(),
    wordCount: data.wordCount || 0,
    rating: data.rating || null,
  };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearTakehomeProgress(caseId) {
  const d = load();
  delete d[caseId];
  localStorage.setItem(KEY, JSON.stringify(d));
}
