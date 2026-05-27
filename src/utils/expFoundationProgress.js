const KEY = 'pal-exp-foundation-progress-v1';

export function getExpFoundationProgress(id) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return raw[id] || null;
  } catch { return null; }
}

export function getAllExpFoundationProgress() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}

export function saveExpFoundationProgress(id) {
  try {
    const existing = getAllExpFoundationProgress();
    existing[id] = { completedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}

export function markExpFoundationComplete(id) {
  saveExpFoundationProgress(id);
}

export function clearExpFoundationProgress(id) {
  try {
    const existing = getAllExpFoundationProgress();
    delete existing[id];
    localStorage.setItem(KEY, JSON.stringify(existing));
  } catch {}
}
