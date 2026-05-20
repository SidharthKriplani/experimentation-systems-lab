const KEY = 'pal-growth-analytics-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getGrowthAnalyticsProgress(caseId) {
  return load()[caseId] || null;
}

export function getAllGrowthAnalyticsProgress() {
  return load();
}

export function saveGrowthAnalyticsProgress(caseId, rating) {
  const d = load();
  d[caseId] = {
    rating,
    completedAt: new Date().toISOString(),
    attempts: (d[caseId]?.attempts || 0) + 1,
  };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearGrowthAnalyticsProgress(caseId) {
  const d = load();
  delete d[caseId];
  localStorage.setItem(KEY, JSON.stringify(d));
}
