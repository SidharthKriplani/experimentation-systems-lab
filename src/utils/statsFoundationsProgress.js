const KEY = 'pal-stat-foundations-progress-v1';

export function getStatFoundationsProgress(moduleId) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data[moduleId] || null;
  } catch { return null; }
}

export function getAllStatFoundationsProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveStatFoundationsProgress(moduleId) {
  try {
    const existing = getAllStatFoundationsProgress();
    existing[moduleId] = { completedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}

export function clearStatFoundationsProgress(moduleId) {
  try {
    const existing = getAllStatFoundationsProgress();
    delete existing[moduleId];
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}
