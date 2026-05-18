const STORAGE_KEY = 'exp-lab-progress-v1';

function getAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}

export function getProgress(scenarioId) {
  const all = getAll();
  return all[scenarioId] || null;
}

export function getAllProgress() {
  return getAll();
}

export function saveAttempt(scenarioId, decisionId, scoreKey) {
  const all = getAll();
  const existing = all[scenarioId] || {
    scenarioId,
    attempts: [],
    bestScore: null,
    firstCompletedAt: null,
    lastAttemptAt: null,
  };

  const attempt = {
    decisionId,
    score: scoreKey,
    timestamp: Date.now(),
  };

  existing.attempts.push(attempt);
  existing.lastAttemptAt = Date.now();

  if (!existing.firstCompletedAt) {
    existing.firstCompletedAt = Date.now();
  }

  // Track best score by rank
  const RANKS = { junior_miss: 1, analyst_ready: 2, senior_ready: 3, staff_level: 4 };
  const newRank = RANKS[scoreKey] || 0;
  const bestRank = RANKS[existing.bestScore] || 0;
  if (newRank > bestRank) {
    existing.bestScore = scoreKey;
  }

  all[scenarioId] = existing;
  saveAll(all);
  return existing;
}

export function clearProgress() {
  saveAll({});
}

export function getCompletedCount() {
  const all = getAll();
  return Object.values(all).filter(p => p.attempts && p.attempts.length > 0).length;
}
