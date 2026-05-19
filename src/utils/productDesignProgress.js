// Product Design Room — localStorage progress utility
// Stores: phase responses (free text), self-ratings per phase, completion state

const PREFIX = 'pd-progress-';

function key(scenarioId) {
  return PREFIX + scenarioId;
}

function load(scenarioId) {
  try {
    const raw = localStorage.getItem(key(scenarioId));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function save(scenarioId, data) {
  try {
    localStorage.setItem(key(scenarioId), JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function getProductDesignProgress(scenarioId) {
  return load(scenarioId);
}

export function getAllProductDesignProgress() {
  const result = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        const id = k.slice(PREFIX.length);
        const data = load(id);
        if (data) result[id] = data;
      }
    }
  } catch (e) {
    // ignore
  }
  return result;
}

export function savePhaseResponse(scenarioId, phaseId, response) {
  const existing = load(scenarioId) || {};
  const responses = existing.responses || {};
  responses[phaseId] = response;
  save(scenarioId, { ...existing, responses });
}

export function savePhaseRating(scenarioId, phaseId, rating) {
  const existing = load(scenarioId) || {};
  const ratings = existing.ratings || {};
  ratings[phaseId] = rating;
  save(scenarioId, { ...existing, ratings });
}

export function saveCompletedPhases(scenarioId, completedIds) {
  const existing = load(scenarioId) || {};
  save(scenarioId, { ...existing, completedPhaseIds: completedIds });
}

export function saveProductDesignResult(scenarioId, result) {
  const existing = load(scenarioId) || {};
  save(scenarioId, { ...existing, result, completedAt: Date.now() });
}

export function clearProductDesignProgress(scenarioId) {
  try {
    localStorage.removeItem(key(scenarioId));
  } catch (e) {
    // ignore
  }
}

// Compute a simple summary: self-rated scores (strong=2, partial=1, miss=0) / max
export function computeProductDesignScore(scenario, ratings) {
  const phases = scenario.phases;
  let score = 0;
  const maxScore = phases.length * 2;
  for (const phase of phases) {
    const r = ratings?.[phase.id];
    if (r === 'strong') score += 2;
    else if (r === 'partial') score += 1;
  }
  const pct = maxScore > 0 ? score / maxScore : 0;
  let level;
  if (pct >= 0.8) level = 'excellent';
  else if (pct >= 0.6) level = 'strong';
  else if (pct >= 0.4) level = 'developing';
  else level = 'needs_practice';
  return { score, maxScore, pct, level };
}
