export const SCORE_LEVELS = {
  junior_miss: {
    label: 'Junior Miss',
    shortLabel: 'Junior',
    color: '#ef4444',
    bg: '#2e0d0d',
    border: '#ef4444',
    rank: 1,
    description: 'Common early-career mistake — focuses on surface signals and misses the critical issue.',
  },
  analyst_ready: {
    label: 'Analyst-Ready',
    shortLabel: 'Analyst',
    color: '#f59e0b',
    bg: '#2e200d',
    border: '#f59e0b',
    rank: 2,
    description: 'Solid foundational call — catches the key problem but may miss depth or next steps.',
  },
  senior_ready: {
    label: 'Senior-Ready',
    shortLabel: 'Senior',
    color: '#22c55e',
    bg: '#0d2e1a',
    border: '#22c55e',
    rank: 3,
    description: 'Strong judgment — identifies the right decision and the right reasoning.',
  },
  staff_level: {
    label: 'Staff-Level',
    shortLabel: 'Staff',
    color: '#a78bfa',
    bg: '#1e1030',
    border: '#a78bfa',
    rank: 4,
    description: 'Exceptional rigor — statistically precise, actionable, and forward-looking.',
  },
};

export function getScoreLevel(scoreKey) {
  return SCORE_LEVELS[scoreKey] || SCORE_LEVELS.analyst_ready;
}

export function getScoreRank(scoreKey) {
  return SCORE_LEVELS[scoreKey]?.rank || 0;
}

export function compareScores(a, b) {
  return getScoreRank(a) - getScoreRank(b);
}

export function getBestScore(attempts) {
  if (!attempts || attempts.length === 0) return null;
  return attempts.reduce((best, curr) => {
    if (!best) return curr.score;
    return getScoreRank(curr.score) > getScoreRank(best) ? curr.score : best;
  }, null);
}
