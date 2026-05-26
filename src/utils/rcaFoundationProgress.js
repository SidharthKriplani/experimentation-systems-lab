const KEY = 'pal-rca-foundation-progress-v1';

export function getRCAFoundationProgress(moduleId) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data[moduleId] || null;
  } catch { return null; }
}

export function getAllRCAFoundationProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveRCAFoundationProgress(moduleId) {
  try {
    const existing = getAllRCAFoundationProgress();
    existing[moduleId] = { completedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}

export function clearRCAFoundationProgress(moduleId) {
  try {
    const existing = getAllRCAFoundationProgress();
    delete existing[moduleId];
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}
