const KEY = 'pal-stf-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getSTFProgress(caseId) {
  return load()[caseId] || null;
}

export function getAllSTFProgress() {
  return load();
}

export function saveSTFProgress(caseId, rating) {
  const d = load();
  d[caseId] = {
    rating,
    completedAt: new Date().toISOString(),
    attempts: (d[caseId]?.attempts || 0) + 1,
  };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearSTFProgress(caseId) {
  const d = load();
  delete d[caseId];
  localStorage.setItem(KEY, JSON.stringify(d));
}
