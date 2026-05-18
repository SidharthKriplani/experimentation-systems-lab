// Product Analytics Lab — Design Room Progress Persistence
// Saves partial answers, completed phases, attempts, best level, timestamp

const STORAGE_KEY = 'pal-design-progress-v1';

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

// Save answers for a given scenario (partial or complete)
export function saveDesignAnswers(scenarioId, answers) {
  const store = readStore();
  if (!store[scenarioId]) store[scenarioId] = {};
  store[scenarioId].answers = answers;
  store[scenarioId].lastSaved = Date.now();
  writeStore(store);
}

// Save which phases the user has completed (array of phase ids)
export function saveCompletedPhases(scenarioId, completedPhaseIds) {
  const store = readStore();
  if (!store[scenarioId]) store[scenarioId] = {};
  store[scenarioId].completedPhaseIds = completedPhaseIds;
  writeStore(store);
}

// Save final score result after submission
export function saveDesignResult(scenarioId, result) {
  const store = readStore();
  if (!store[scenarioId]) store[scenarioId] = {};
  const prev = store[scenarioId];
  store[scenarioId].attempts = (prev.attempts || 0) + 1;
  store[scenarioId].lastScore = result.totalScore;
  store[scenarioId].lastLevel = result.level.id;
  store[scenarioId].lastCompletedAt = Date.now();
  // Track best
  if (!prev.bestScore || result.totalScore > prev.bestScore) {
    store[scenarioId].bestScore = result.totalScore;
    store[scenarioId].bestLevel = result.level.id;
  }
  writeStore(store);
}

// Get all saved data for a scenario
export function getDesignProgress(scenarioId) {
  const store = readStore();
  return store[scenarioId] || null;
}

// Get all design progress (for Progress page / Judgment Bank)
export function getAllDesignProgress() {
  return readStore();
}

// Clear progress for one scenario (re-attempt)
export function clearDesignProgress(scenarioId) {
  const store = readStore();
  delete store[scenarioId];
  writeStore(store);
}

// ─────────────────────────────────────────────
// Scoring engine — deterministic, dimension-weighted
// ─────────────────────────────────────────────

export function computeDesignScore(scenario, answers) {
  const allFields = scenario.designPhases.flatMap(p => p.fields);
  const fieldsById = Object.fromEntries(allFields.map(f => [f.id, f]));

  const dimensionScores = scenario.scoringRubric.dimensions.map(dim => {
    let earned = 0;
    let max = 0;

    for (const fieldId of dim.fieldIds) {
      const field = fieldsById[fieldId];
      if (!field) continue;

      const fieldMax = Math.max(...field.options.map(o => o.scoreValue));
      max += fieldMax;

      const answer = answers[fieldId];
      if (!answer) continue;

      if (field.type === 'single_select') {
        const opt = field.options.find(o => o.id === answer);
        if (opt) earned += opt.scoreValue;
      } else {
        // multi_select
        const selected = Array.isArray(answer) ? answer : [answer];
        for (const optId of selected) {
          const opt = field.options.find(o => o.id === optId);
          if (opt) earned += opt.scoreValue;
        }
      }
    }

    const ratio = max > 0 ? earned / max : 0;
    return { id: dim.id, label: dim.label, weight: dim.weight, earned, max, ratio };
  });

  // Weighted total
  const totalScore = dimensionScores.reduce((acc, d) => acc + d.ratio * d.weight, 0);

  // Level
  const levels = scenario.scoringRubric.levels;
  let level;
  if (totalScore >= levels.staff_level.minScore) {
    level = { id: 'staff_level', ...levels.staff_level };
  } else if (totalScore >= levels.senior_ready.minScore) {
    level = { id: 'senior_ready', ...levels.senior_ready };
  } else if (totalScore >= levels.analyst_ready.minScore) {
    level = { id: 'analyst_ready', ...levels.analyst_ready };
  } else {
    level = { id: 'incomplete', ...levels.incomplete };
  }

  // Strongest / weakest dimension
  const sorted = [...dimensionScores].sort((a, b) => a.ratio - b.ratio);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  // "What separates you from next level"
  const nextLevelGap = getNextLevelGap(totalScore, levels, weakest);

  return { dimensionScores, totalScore, level, strongest, weakest, nextLevelGap };
}

function getNextLevelGap(score, levels, weakest) {
  if (score >= levels.staff_level.minScore) {
    return 'Staff-level execution. The design is sound across all dimensions.';
  }
  if (score >= levels.senior_ready.minScore) {
    return `To reach Staff-Level: sharpen ${weakest.label.toLowerCase()} — this was your lowest-scoring dimension (${Math.round(weakest.ratio * 100)}%). Staff designers pre-commit every constraint before looking at data.`;
  }
  if (score >= levels.analyst_ready.minScore) {
    return `To reach Senior-Ready: focus on ${weakest.label.toLowerCase()} (${Math.round(weakest.ratio * 100)}%). Seniors build designs that hold up when PMs push back — especially on decision rules and validity checks.`;
  }
  return `To reach Analyst-Ready: ${weakest.label.toLowerCase()} needs the most work (${Math.round(weakest.ratio * 100)}%). Revisit the core tradeoffs in this scenario — the right choices become more obvious once the business question is precisely framed.`;
}
