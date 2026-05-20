const KEY = 'pal-challenges-progress-v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function getChallengesProgress(id) {
  return load()[id] || null;
}

export function getAllChallengesProgress() {
  return load();
}

export function saveChallengesProgress(id, rating) {
  const d = load();
  d[id] = {
    rating,
    completedAt: new Date().toISOString(),
    attempts: (d[id]?.attempts || 0) + 1,
  };
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function clearChallengesProgress() {
  localStorage.removeItem(KEY);
}
