// Product Analytics Lab — Content Audit Utility
// V2.1 — Automated content integrity checks for QA Dashboard

const EXPECTED = { stats: 8, metrics: 6, design: 8, review: 12, rca: 6, cases: 4, total: 44 };

function check(id, name, status, affected = [], explanation = '') {
  return { id, name, status, affected, explanation };
}

export function runContentAudit({ statsModules, metricCases, designScenarios, scenarios, rcaCases, businessCases, learningPaths, concepts }) {
  const checks = [];
  const conceptIds = new Set(concepts.map(c => c.id));

  // ── Build lookup maps ────────────────────────────────────────────────────
  const statsIds   = new Set(statsModules.map(m => m.id));
  const metricsIds = new Set(metricCases.map(c => c.id));
  const designIds  = new Set(designScenarios.map(s => s.id));
  const reviewIds  = new Set(scenarios.map(s => s.id));
  const rcaIds     = new Set(rcaCases.map(c => c.id));
  const casesIds   = new Set(businessCases.map(c => c.id));

  // pairedDesignScenarioId for review scenarios (derived from design data)
  const pairedDesignByReview = {};
  designScenarios.forEach(d => {
    if (d.pairedReviewScenarioId) pairedDesignByReview[d.pairedReviewScenarioId] = d.id;
  });

  // ── 1. Count checks ──────────────────────────────────────────────────────
  const counts = {
    stats:   statsModules.length,
    metrics: metricCases.length,
    design:  designScenarios.length,
    review:  scenarios.length,
    rca:     rcaCases.length,
    cases:   businessCases.length,
  };
  counts.total = Object.values(counts).reduce((a, b) => a + b, 0);

  for (const [room, expected] of Object.entries(EXPECTED)) {
    const actual = counts[room];
    if (actual === undefined) continue;
    if (actual === expected) {
      checks.push(check(`count-${room}`, `${room} count`, 'pass', [], `${actual} items — expected ${expected}`));
    } else {
      checks.push(check(`count-${room}`, `${room} count`, 'fail', [], `Got ${actual}, expected ${expected}`));
    }
  }

  // ── 2. Duplicate IDs ─────────────────────────────────────────────────────
  const allRooms = [
    { room: 'stats',   items: statsModules },
    { room: 'metrics', items: metricCases },
    { room: 'design',  items: designScenarios },
    { room: 'review',  items: scenarios },
    { room: 'rca',     items: rcaCases },
    { room: 'cases',   items: businessCases },
  ];

  for (const { room, items } of allRooms) {
    const seen = new Set();
    const dupes = [];
    items.forEach(item => {
      if (seen.has(item.id)) dupes.push(item.id);
      seen.add(item.id);
    });
    checks.push(check(
      `dupes-${room}`, `${room} duplicate IDs`,
      dupes.length ? 'fail' : 'pass',
      dupes,
      dupes.length ? `Duplicate IDs found` : 'All IDs unique'
    ));
  }

  // ── 3. Missing required fields ───────────────────────────────────────────
  for (const { room, items } of allRooms) {
    const missingTitle      = items.filter(i => !i.title?.trim()).map(i => i.id);
    const missingSubtitle   = items.filter(i => !i.subtitle?.trim()).map(i => i.id);
    const missingDifficulty = items.filter(i => !i.difficulty).map(i => i.id);
    const missingIsFree     = items.filter(i => i.isFree === undefined || i.isFree === null).map(i => i.id);

    checks.push(check(`title-${room}`, `${room} missing title`, missingTitle.length ? 'fail' : 'pass', missingTitle, missingTitle.length ? 'Items missing title' : 'All titles present'));
    checks.push(check(`subtitle-${room}`, `${room} missing subtitle`, missingSubtitle.length ? 'fail' : 'pass', missingSubtitle, missingSubtitle.length ? 'Items missing subtitle' : 'All subtitles present'));
    checks.push(check(`difficulty-${room}`, `${room} missing difficulty`, missingDifficulty.length ? 'fail' : 'pass', missingDifficulty, missingDifficulty.length ? 'Items missing difficulty' : 'All difficulties set'));
    checks.push(check(`isfree-${room}`, `${room} missing isFree`, missingIsFree.length ? 'fail' : 'pass', missingIsFree, missingIsFree.length ? 'Items missing isFree flag' : 'All isFree flags set'));
  }

  // ── 4. linkedConceptIds checks ───────────────────────────────────────────
  const roomsWithConcepts = [
    { room: 'stats',   items: statsModules,   getter: i => i.linkedConceptIds },
    { room: 'metrics', items: metricCases,    getter: i => i.linkedConceptIds },
    { room: 'rca',     items: rcaCases,       getter: i => i.linkedConceptIds },
    { room: 'cases',   items: businessCases,  getter: i => i.linkedConceptIds },
  ];

  for (const { room, items, getter } of roomsWithConcepts) {
    const emptyLinked = items.filter(i => !getter(i)?.length).map(i => i.id);
    checks.push(check(
      `linked-concepts-${room}`, `${room} empty linkedConceptIds`,
      emptyLinked.length ? 'warning' : 'pass',
      emptyLinked,
      emptyLinked.length ? 'Items have no linked concepts (may be intentional)' : 'All items have linked concepts'
    ));

    // broken refs
    const brokenRefs = [];
    items.forEach(item => {
      const ids = getter(item) || [];
      const broken = ids.filter(cid => !conceptIds.has(cid));
      if (broken.length) brokenRefs.push(`${item.id}: [${broken.join(', ')}]`);
    });
    checks.push(check(
      `broken-concepts-${room}`, `${room} broken linkedConceptIds`,
      brokenRefs.length ? 'fail' : 'pass',
      brokenRefs,
      brokenRefs.length ? 'References to non-existent concept IDs' : 'All concept refs valid'
    ));
  }

  // ── 5. Design ↔ Review paired links ──────────────────────────────────────
  // Design → Review: each design's pairedReviewScenarioId should exist in scenarios
  const brokenDesignToReview = designScenarios
    .filter(d => d.pairedReviewScenarioId && !reviewIds.has(d.pairedReviewScenarioId))
    .map(d => `${d.id} → ${d.pairedReviewScenarioId}`);
  checks.push(check('paired-design-review', 'Design → Review links', brokenDesignToReview.length ? 'fail' : 'pass', brokenDesignToReview, brokenDesignToReview.length ? 'Broken design→review refs' : 'All paired links valid'));

  // How many designs have paired review IDs
  const designsWithPairs = designScenarios.filter(d => d.pairedReviewScenarioId).length;
  checks.push(check('paired-count', 'Paired scenario count', 'pass', [], `${designsWithPairs} design scenarios have paired review counterparts`));

  // ── 6. Guided path item IDs exist ────────────────────────────────────────
  const pathLookup = {
    stats: statsIds, metrics: metricsIds, design: designIds,
    review: reviewIds, rca: rcaIds, cases: casesIds,
  };
  const brokenPathItems = [];
  learningPaths.forEach(path => {
    path.sequence.forEach(item => {
      const roomSet = pathLookup[item.room];
      if (!roomSet) {
        brokenPathItems.push(`${path.id}: unknown room "${item.room}" for ${item.itemId}`);
      } else if (!roomSet.has(item.itemId)) {
        brokenPathItems.push(`${path.id}: "${item.itemId}" not found in ${item.room}`);
      }
    });
  });
  checks.push(check('guided-paths', 'Guided path item IDs', brokenPathItems.length ? 'fail' : 'pass', brokenPathItems, brokenPathItems.length ? 'Broken path item refs' : `All ${learningPaths.reduce((a, p) => a + p.sequence.length, 0)} path items resolve correctly`));

  // ── 7. Senior debrief completeness ───────────────────────────────────────
  // Stats
  const statsMissingDebrief = statsModules.filter(m => !m.seniorRead?.shortAnswer?.trim()).map(m => m.id);
  const statsMissingInterviewPhrase = statsModules.filter(m => !m.seniorRead?.interviewPhrase?.trim()).map(m => m.id);
  checks.push(check('stats-debrief', 'Stats senior read present', statsMissingDebrief.length ? 'fail' : 'pass', statsMissingDebrief, 'seniorRead.shortAnswer'));
  checks.push(check('stats-interview', 'Stats interview phrase', statsMissingInterviewPhrase.length ? 'warning' : 'pass', statsMissingInterviewPhrase, 'seniorRead.interviewPhrase'));

  // Review
  const reviewMissingDebrief = scenarios.filter(s => !s.debrief?.trim()).map(s => s.id);
  const reviewMissingInterview = scenarios.filter(s => !s.interviewTakeaway?.trim()).map(s => s.id);
  checks.push(check('review-debrief', 'Review debrief present', reviewMissingDebrief.length ? 'fail' : 'pass', reviewMissingDebrief, 'debrief string'));
  checks.push(check('review-interview', 'Review interview takeaway', reviewMissingInterview.length ? 'warning' : 'pass', reviewMissingInterview, 'interviewTakeaway string'));

  // Design
  const designMissingRationale = designScenarios.filter(d => !d.seniorDesign?.rationale?.trim()).map(d => d.id);
  const designMissingMistakes = designScenarios.filter(d => !d.seniorDesign?.commonMistakes?.length).map(d => d.id);
  checks.push(check('design-rationale', 'Design senior rationale', designMissingRationale.length ? 'fail' : 'pass', designMissingRationale, 'seniorDesign.rationale'));
  checks.push(check('design-mistakes', 'Design common mistakes', designMissingMistakes.length ? 'warning' : 'pass', designMissingMistakes, 'seniorDesign.commonMistakes'));

  // Metrics
  const metricsMissingDebrief  = metricCases.filter(c => !c.seniorMetricDesign?.summary?.trim()).map(c => c.id);
  const metricsMissingMistakes = metricCases.filter(c => !c.seniorMetricDesign?.commonMistakes?.length).map(c => c.id);
  const metricsMissingPhrase   = metricCases.filter(c => !c.seniorMetricDesign?.interviewPhrase?.trim()).map(c => c.id);
  checks.push(check('metrics-debrief', 'Metrics senior summary', metricsMissingDebrief.length ? 'fail' : 'pass', metricsMissingDebrief, 'seniorMetricDesign.summary'));
  checks.push(check('metrics-mistakes', 'Metrics common mistakes', metricsMissingMistakes.length ? 'warning' : 'pass', metricsMissingMistakes, 'seniorMetricDesign.commonMistakes'));
  checks.push(check('metrics-interview', 'Metrics interview phrase', metricsMissingPhrase.length ? 'warning' : 'pass', metricsMissingPhrase, 'seniorMetricDesign.interviewPhrase'));

  // RCA
  const rcaMissingCause    = rcaCases.filter(c => !c.seniorDiagnosis?.likelyCause?.trim()).map(c => c.id);
  const rcaMissingMistakes = rcaCases.filter(c => !c.seniorDiagnosis?.commonMistakes?.length).map(c => c.id);
  const rcaMissingPhrase   = rcaCases.filter(c => !c.seniorDiagnosis?.interviewPhrase?.trim()).map(c => c.id);
  checks.push(check('rca-debrief', 'RCA senior diagnosis', rcaMissingCause.length ? 'fail' : 'pass', rcaMissingCause, 'seniorDiagnosis.likelyCause'));
  checks.push(check('rca-mistakes', 'RCA common mistakes', rcaMissingMistakes.length ? 'warning' : 'pass', rcaMissingMistakes, 'seniorDiagnosis.commonMistakes'));
  checks.push(check('rca-interview', 'RCA interview phrase', rcaMissingPhrase.length ? 'warning' : 'pass', rcaMissingPhrase, 'seniorDiagnosis.interviewPhrase'));

  // Cases
  const casesMissingRec      = businessCases.filter(c => !c.seniorAnswer?.recommendation?.trim()).map(c => c.id);
  const casesMissingMistakes = businessCases.filter(c => !c.seniorAnswer?.commonMistakes?.length).map(c => c.id);
  const casesMissingPhrase   = businessCases.filter(c => !c.seniorAnswer?.interviewPhrase?.trim()).map(c => c.id);
  checks.push(check('cases-debrief', 'Cases senior recommendation', casesMissingRec.length ? 'fail' : 'pass', casesMissingRec, 'seniorAnswer.recommendation'));
  checks.push(check('cases-mistakes', 'Cases common mistakes', casesMissingMistakes.length ? 'warning' : 'pass', casesMissingMistakes, 'seniorAnswer.commonMistakes'));
  checks.push(check('cases-interview', 'Cases interview phrase', casesMissingPhrase.length ? 'warning' : 'pass', casesMissingPhrase, 'seniorAnswer.interviewPhrase'));

  // ── 8. Free vs Beta counts ────────────────────────────────────────────────
  let freeCount = 0, betaCount = 0;
  allRooms.forEach(({ items }) => items.forEach(i => { i.isFree ? freeCount++ : betaCount++; }));

  // ── 9. Build enriched items list ─────────────────────────────────────────
  const items = [];

  statsModules.forEach(m => items.push({
    room: 'stats', id: m.id, title: m.title,
    difficulty: m.difficulty, isFree: m.isFree,
    linkedConceptsCount: m.linkedConceptIds?.length ?? 0,
    pairedItem: null,
    hasSeniorDebrief: !!m.seniorRead?.shortAnswer?.trim(),
    hasCommonMistakes: !!m.seniorRead?.commonMistake?.trim(),
    hasInterviewPhrase: !!m.seniorRead?.interviewPhrase?.trim(),
    subtitle: m.concept,
  }));

  metricCases.forEach(c => items.push({
    room: 'metrics', id: c.id, title: c.title,
    difficulty: c.difficulty, isFree: c.isFree,
    linkedConceptsCount: c.linkedConceptIds?.length ?? 0,
    pairedItem: null,
    hasSeniorDebrief: !!c.seniorMetricDesign?.summary?.trim(),
    hasCommonMistakes: !!c.seniorMetricDesign?.commonMistakes?.length,
    hasInterviewPhrase: !!c.seniorMetricDesign?.interviewPhrase?.trim(),
    subtitle: c.subtitle,
  }));

  designScenarios.forEach(d => items.push({
    room: 'design', id: d.id, title: d.title,
    difficulty: d.difficulty, isFree: d.isFree,
    linkedConceptsCount: 0,
    pairedItem: d.pairedReviewScenarioId ? `review:${d.pairedReviewScenarioId}` : null,
    hasSeniorDebrief: !!d.seniorDesign?.rationale?.trim(),
    hasCommonMistakes: !!d.seniorDesign?.commonMistakes?.length,
    hasInterviewPhrase: false,
    subtitle: d.subtitle,
  }));

  scenarios.forEach(s => items.push({
    room: 'review', id: s.id, title: s.title,
    difficulty: s.difficulty, isFree: s.isFree,
    linkedConceptsCount: s.relatedConcepts?.length ?? 0,
    pairedItem: pairedDesignByReview[s.id] ? `design:${pairedDesignByReview[s.id]}` : null,
    hasSeniorDebrief: !!s.debrief?.trim(),
    hasCommonMistakes: !!(s.juniorMistake?.trim()),
    hasInterviewPhrase: !!s.interviewTakeaway?.trim(),
    subtitle: s.subtitle,
  }));

  rcaCases.forEach(c => items.push({
    room: 'rca', id: c.id, title: c.title,
    difficulty: c.difficulty, isFree: c.isFree,
    linkedConceptsCount: c.linkedConceptIds?.length ?? 0,
    pairedItem: null,
    hasSeniorDebrief: !!c.seniorDiagnosis?.likelyCause?.trim(),
    hasCommonMistakes: !!c.seniorDiagnosis?.commonMistakes?.length,
    hasInterviewPhrase: !!c.seniorDiagnosis?.interviewPhrase?.trim(),
    subtitle: c.subtitle,
  }));

  businessCases.forEach(c => items.push({
    room: 'cases', id: c.id, title: c.title,
    difficulty: c.difficulty, isFree: c.isFree,
    linkedConceptsCount: c.linkedConceptIds?.length ?? 0,
    pairedItem: null,
    hasSeniorDebrief: !!c.seniorAnswer?.recommendation?.trim(),
    hasCommonMistakes: !!c.seniorAnswer?.commonMistakes?.length,
    hasInterviewPhrase: !!c.seniorAnswer?.interviewPhrase?.trim(),
    subtitle: c.subtitle,
  }));

  return {
    counts: { ...counts, free: freeCount, beta: betaCount },
    expected: EXPECTED,
    checks,
    items,
    paths: learningPaths.map(p => ({
      ...p,
      sequence: p.sequence.map(item => ({
        ...item,
        exists: !!(pathLookup[item.room]?.has(item.itemId)),
        isFree: allRooms.find(r => r.room === item.room)?.items.find(i => i.id === item.itemId)?.isFree ?? null,
      })),
    })),
    summary: {
      totalChecks: checks.length,
      pass: checks.filter(c => c.status === 'pass').length,
      warning: checks.filter(c => c.status === 'warning').length,
      fail: checks.filter(c => c.status === 'fail').length,
    },
  };
}

export const LS_KEYS = [
  'exp-lab-theme',
  'exp-lab-unlocked-v1',
  'exp-lab-progress-v1',
  'pal-design-progress-v1',
  'pal-stats-progress-v1',
  'pal-metrics-progress-v2',
  'pal-rca-progress-v2',
  'pal-cases-progress-v2',
];
