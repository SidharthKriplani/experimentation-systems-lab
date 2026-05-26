const KEY = 'pal-metrics-foundation-progress-v1';

export function getMetricsFoundationProgress(moduleId) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data[moduleId] || null;
  } catch { return null; }
}

export function getAllMetricsFoundationProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveMetricsFoundationProgress(moduleId) {
  try {
    const existing = getAllMetricsFoundationProgress();
    existing[moduleId] = { completedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}

export function clearMetricsFoundationProgress(moduleId) {
  try {
    const existing = getAllMetricsFoundationProgress();
    delete existing[moduleId];
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}
