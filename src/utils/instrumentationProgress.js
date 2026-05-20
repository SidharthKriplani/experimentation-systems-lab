const KEY = 'pal-instrumentation-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getInstrumentationProgress(id) {
  return load()[id] || null;
}

export function getAllInstrumentationProgress() {
  return load();
}

export function saveInstrumentationProgress(id, data) {
  const d = load();
  d[id] = { ...data, completedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearInstrumentationProgress() {
  localStorage.removeItem(KEY);
}
