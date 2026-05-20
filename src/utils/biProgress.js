const KEY = 'pal-bi-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getBIProgress(caseId) {
  return load()[caseId] || null;
}

export function getAllBIProgress() {
  return load();
}

export function saveBIProgress(caseId, rating) {
  const d = load();
  d[caseId] = {
    rating,
    completedAt: new Date().toISOString(),
    attempts: (d[caseId]?.attempts || 0) + 1,
  };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearBIProgress(caseId) {
  const d = load();
  delete d[caseId];
  localStorage.setItem(KEY, JSON.stringify(d));
}
