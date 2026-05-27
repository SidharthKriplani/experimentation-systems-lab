import { useState, useEffect } from 'react';
import { expFoundationModules } from '../../data/expFoundationModules.js';
import { saveExpFoundationProgress } from '../../utils/expFoundationProgress.js';
import { track } from '../../utils/analytics.js';

const NOTES_KEY = 'pal-notes-v1';

function getNotes(room, caseId) {
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    return all[room + ':' + caseId] || '';
  } catch { return ''; }
}

function saveNote(room, caseId, text) {
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    all[room + ':' + caseId] = text;
    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  } catch {}
}

// ── Shared helpers ──────────────────────────────────────────────────────────

function InsightBox({ children }) {
  return (
    <div style={{
      background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
      borderRadius: 'var(--radius)', padding: '1rem 1.1rem', marginTop: '1.25rem',
    }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.4rem' }}>
        Key Insight
      </div>
      <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function NextBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      marginTop: '1.5rem', padding: '0.65rem 1.6rem',
      background: 'var(--accent)', color: '#fff', border: 'none',
      borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem',
      cursor: 'pointer',
    }}>
      {label || 'Next →'}
    </button>
  );
}

function MCQOption({ label, selected, correct, revealed, onClick }) {
  let bg = 'var(--surface-2)';
  let border = 'var(--border)';
  let color = 'var(--text)';
  if (revealed) {
    if (correct) { bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)'; }
    else if (selected && !correct) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
  } else if (selected) {
    border = 'var(--accent-border)';
  }
  return (
    <button onClick={onClick} disabled={revealed} style={{
      display: 'block', width: '100%', textAlign: 'left',
      padding: '0.7rem 1rem', marginBottom: '0.5rem',
      background: bg, border: '1.5px solid ' + border, borderRadius: 'var(--radius-sm)',
      color, fontSize: '0.88rem', cursor: revealed ? 'default' : 'pointer',
      transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );
}

function CheckBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      marginTop: '0.5rem', padding: '0.5rem 1.1rem',
      background: 'var(--accent)', color: '#fff', border: 'none',
      borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
    }}>
      Check
    </button>
  );
}

// ── Module EF01: Why We Experiment ─────────────────────────────────────────
function Module_EF01({ onComplete }) {
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const question = 'A PM notices checkout rate is 12% for users who see the new CTA, vs 9% for others. They conclude the CTA causes higher conversion. What\'s wrong?';

  const options = [
    { label: 'A. Sample size too small', correct: false },
    { label: 'B. Correlation is not causation — users who see the CTA may differ systematically from those who don\'t', correct: true },
    { label: 'C. 12% is not statistically significant', correct: false },
    { label: 'D. The metric is wrong', correct: false },
  ];

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Observational data seems simple: compare the group that saw the feature with the group that did not.
        But this comparison has a fundamental flaw that A/B testing is designed to fix.
      </p>

      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
        fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6,
      }}>
        <strong>Question:</strong> {question}
      </div>

      {options.map((opt, i) => (
        <MCQOption
          key={i}
          label={opt.label}
          selected={answer === i}
          correct={opt.correct}
          revealed={revealed}
          onClick={() => !revealed && setAnswer(i)}
        />
      ))}

      {answer !== null && !revealed && <CheckBtn onClick={() => setRevealed(true)} />}

      {revealed && (
        <div>
          <div style={{
            marginTop: '0.5rem', padding: '0.65rem 0.85rem',
            background: options[answer] && options[answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
            border: '1px solid ' + (options[answer] && options[answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
            borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
          }}>
            Users who see the new CTA are not a random sample — they may be more engaged, further in the funnel,
            or on a specific device. The higher checkout rate may reflect who they are, not what the CTA did.
            This is selection bias, and it is why observational comparisons cannot establish causality.
          </div>
          <InsightBox>
            Observational comparisons confound treatment with selection bias. Only random assignment breaks
            the confound — it ensures the only systematic difference between groups is the treatment itself.
            That is why A/B tests beat intuition, analytics dashboards, and before/after comparisons.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF02: The Unit of Randomization ─────────────────────────────────
function Module_EF02({ onComplete }) {
  const UNITS = [
    { id: 'user',    label: 'User-level' },
    { id: 'session', label: 'Session-level' },
    { id: 'page',    label: 'Page/request-level' },
    { id: 'cluster', label: 'Cluster/household-level' },
  ];

  const SCENARIOS = [
    {
      text: 'Testing a new checkout flow',
      correct: 'user',
      explanation: 'User-level: a user should see the same checkout flow across all sessions, or the experience is inconsistent and you cannot attribute conversion changes to the variant.',
    },
    {
      text: 'Testing a sponsored post ranking algorithm on a social feed',
      correct: 'user',
      explanation: 'User-level: social network effects mean friends influence each other. Session-level randomization would cause the same user to see different ranking logic across sessions, contaminating the result.',
    },
    {
      text: 'Testing a page load speed optimization',
      correct: 'page',
      explanation: 'Page/request-level: load speed has no user-state dependency — each request is independent. This allows faster ramp-up and higher statistical power with no spillover risk.',
    },
    {
      text: 'Testing a referral program',
      correct: 'cluster',
      explanation: 'Cluster/household-level: referral programs have strong spillover — a user in control can receive an invite from a user in treatment. Randomizing at cluster level prevents this contamination.',
    },
  ];

  const [assignments, setAssignments] = useState({});
  const [revealed, setRevealed] = useState(false);

  function assign(idx, unitId) {
    if (revealed) return;
    setAssignments(prev => ({ ...prev, [idx]: unitId }));
  }

  const allAssigned = SCENARIOS.every((_, i) => assignments[i]);
  const correctCount = SCENARIOS.filter((s, i) => assignments[i] === s.correct).length;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        The randomization unit determines which entity gets assigned to control or treatment.
        Picking the wrong unit causes inconsistent user experiences, spillover, or inflated false positive rates.
        Classify each scenario to the correct randomization unit.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        {SCENARIOS.map((s, i) => {
          const picked = assignments[i];
          const isCorrect = picked === s.correct;
          return (
            <div key={i} style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem',
            }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.65rem' }}>
                {s.text}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {UNITS.map(u => {
                  let bg = 'var(--surface)';
                  let border = 'var(--border)';
                  let color = 'var(--text-muted)';
                  if (picked === u.id) {
                    if (!revealed) { bg = 'var(--accent-bg)'; border = 'var(--accent-border)'; color = 'var(--accent)'; }
                    else if (isCorrect) { bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)'; }
                    else { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
                  } else if (revealed && u.id === s.correct) {
                    bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)';
                  }
                  return (
                    <button key={u.id} onClick={() => assign(i, u.id)} disabled={revealed} style={{
                      padding: '0.3rem 0.75rem', fontSize: '0.78rem', fontWeight: 600,
                      background: bg, border: '1.5px solid ' + border, color,
                      borderRadius: 'var(--radius-sm)', cursor: revealed ? 'default' : 'pointer',
                      transition: 'all 0.15s',
                    }}>
                      {u.label}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <div style={{
                  marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5,
                  borderTop: '1px solid var(--border)', paddingTop: '0.5rem',
                }}>
                  {isCorrect ? '✓' : '✗'} {s.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!revealed && allAssigned && (
        <button onClick={() => setRevealed(true)} style={{
          padding: '0.55rem 1.2rem', background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
        }}>
          Check answers
        </button>
      )}

      {revealed && (
        <div>
          <div style={{
            marginTop: '0.75rem', padding: '0.65rem 0.85rem',
            background: correctCount === SCENARIOS.length ? 'var(--teal-bg)' : 'var(--yellow-bg)',
            border: '1px solid ' + (correctCount === SCENARIOS.length ? 'var(--teal-border)' : 'var(--yellow-border)'),
            color: correctCount === SCENARIOS.length ? 'var(--teal)' : 'var(--yellow)',
            fontWeight: 700, fontSize: '0.88rem', borderRadius: 'var(--radius-sm)',
          }}>
            {correctCount}/{SCENARIOS.length} correct
          </div>
          <InsightBox>
            The randomization unit must match the unit of analysis and eliminate spillover. Network effects
            (social, referral, marketplace) require cluster-level randomization. User-level is the default
            for most product experiments because it ensures consistent experience across sessions.
            Page-level is safe only when each request is truly independent.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF03: Statistical Power and MDE ─────────────────────────────────
function Module_EF03({ onComplete }) {
  const [part1Answer, setPart1Answer] = useState(null);
  const [part1Revealed, setPart1Revealed] = useState(false);
  const [part2Answer, setPart2Answer] = useState(null);
  const [part2Revealed, setPart2Revealed] = useState(false);

  const part1Options = [
    { label: 'A. 2 days', correct: false },
    { label: 'B. 7 days', correct: false },
    { label: 'C. 30 days', correct: true },
    { label: 'D. 90+ days', correct: false },
  ];

  const part2Options = [
    { label: 'A. Doubles', correct: false },
    { label: 'B. Quadruples', correct: true },
    { label: 'C. Stays the same', correct: false },
    { label: 'D. Halves', correct: false },
  ];

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Sizing an experiment before you run it is non-negotiable. Running underpowered experiments wastes time
        and produces uninterpretable null results. Two key inputs: minimum detectable effect (MDE) and baseline rate.
      </p>

      {/* Part 1 */}
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          Part 1 of 2
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Your baseline CTR is 5%. You want to detect a 0.5pp lift (MDE = 0.5pp) with 80% power at
          alpha = 0.05. You get 10,000 users per day. Roughly how long will the experiment need to run?
        </div>

        {part1Options.map((opt, i) => (
          <MCQOption
            key={i}
            label={opt.label}
            selected={part1Answer === i}
            correct={opt.correct}
            revealed={part1Revealed}
            onClick={() => !part1Revealed && setPart1Answer(i)}
          />
        ))}

        {part1Answer !== null && !part1Revealed && (
          <CheckBtn onClick={() => setPart1Revealed(true)} />
        )}

        {part1Revealed && (
          <div style={{
            marginTop: '0.5rem', padding: '0.65rem 0.85rem',
            background: part1Options[part1Answer] && part1Options[part1Answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
            border: '1px solid ' + (part1Options[part1Answer] && part1Options[part1Answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
            borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
          }}>
            At 5% baseline, detecting a 0.5pp lift (10% relative) at 80% power requires roughly 250,000–300,000
            users per variant, or 500,000–600,000 total. At 10,000 users/day that is 50–60 days.
            A commonly used rule of thumb for this baseline/MDE combo gives approximately 25–30 days per variant
            split — so around 30 days total is the closest answer.
          </div>
        )}
      </div>

      {/* Part 2 — show after Part 1 answered */}
      {part1Revealed && (
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
            Part 2 of 2
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '1rem' }}>
            You reduce your MDE from 0.5pp to 0.25pp (you want to detect a smaller effect).
            What happens to the required sample size?
          </div>

          {part2Options.map((opt, i) => (
            <MCQOption
              key={i}
              label={opt.label}
              selected={part2Answer === i}
              correct={opt.correct}
              revealed={part2Revealed}
              onClick={() => !part2Revealed && setPart2Answer(i)}
            />
          ))}

          {part2Answer !== null && !part2Revealed && (
            <CheckBtn onClick={() => setPart2Revealed(true)} />
          )}

          {part2Revealed && (
            <div style={{
              marginTop: '0.5rem', padding: '0.65rem 0.85rem',
              background: part2Options[part2Answer] && part2Options[part2Answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
              border: '1px solid ' + (part2Options[part2Answer] && part2Options[part2Answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
              borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
            }}>
              Sample size scales with 1/MDE squared. Halving the MDE from 0.5pp to 0.25pp means
              MDE ratio = 0.5/0.25 = 2, and 2 squared = 4. Required sample size quadruples.
              This is the most important formula in experiment design.
            </div>
          )}
        </div>
      )}

      {part2Revealed && (
        <div>
          <InsightBox>
            n proportional to 1/MDE squared. This is the central tradeoff: ambitious MDEs require
            exponentially more traffic. Most teams underpower experiments by setting overly optimistic MDE
            targets. Always run the power calculation first and check whether your traffic supports the
            runtime implied by your MDE.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF04: p-values, CIs, and What They Actually Mean ───────────────
function Module_EF04({ onComplete }) {
  const STATEMENTS = [
    {
      text: 'A p-value of 0.03 means there is a 3% chance the null hypothesis is true.',
      correct: false,
      explanation: 'FALSE. A p-value is the probability of observing data this extreme (or more) assuming the null is true — it is NOT the probability that the null is true. The probability of the null being true requires Bayesian reasoning and a prior.',
    },
    {
      text: 'A 95% CI that excludes zero means the result is practically significant.',
      correct: false,
      explanation: 'FALSE. Statistical significance (CI excludes zero) says the effect is distinguishable from zero with the given sample size. It says nothing about whether the effect is large enough to matter. A +0.001pp lift can be statistically significant with a large enough sample.',
    },
    {
      text: 'If p > 0.05, the experiment should be considered inconclusive — not proof of no effect.',
      correct: true,
      explanation: 'TRUE. Absence of evidence is not evidence of absence. A non-significant result may mean the effect is real but smaller than your MDE, or that you were underpowered. "We did not detect an effect" is very different from "there is no effect."',
    },
  ];

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  function answer(idx, val) {
    if (revealed[idx]) return;
    setAnswers(prev => ({ ...prev, [idx]: val }));
  }

  function check(idx) {
    setRevealed(prev => ({ ...prev, [idx]: true }));
  }

  const allRevealed = STATEMENTS.every((_, i) => revealed[i]);
  const correctCount = STATEMENTS.filter((s, i) => answers[i] === s.correct).length;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        p-values and confidence intervals are the most misquoted statistics in product experimentation.
        Mark each statement TRUE or FALSE, then check.
      </p>

      {STATEMENTS.map((s, i) => {
        const picked = answers[i];
        const isRevealed = revealed[i];
        const isCorrect = picked === s.correct;
        return (
          <div key={i} style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '0.85rem',
          }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              {i + 1}. {s.text}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: isRevealed ? '0.75rem' : 0 }}>
              {[true, false].map(val => {
                let bg = picked === val ? 'var(--accent-bg)' : 'var(--surface)';
                let border = picked === val ? 'var(--accent-border)' : 'var(--border)';
                let color = picked === val ? 'var(--accent)' : 'var(--text-muted)';
                if (isRevealed) {
                  if (val === s.correct) { bg = 'var(--teal-bg)'; border = 'var(--teal-border)'; color = 'var(--teal)'; }
                  else if (picked === val) { bg = 'var(--red-bg)'; border = 'var(--red-border)'; color = 'var(--red)'; }
                  else { bg = 'var(--surface)'; border = 'var(--border)'; color = 'var(--text-muted)'; }
                }
                return (
                  <button key={String(val)} onClick={() => answer(i, val)} disabled={isRevealed} style={{
                    padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700,
                    background: bg, border: '1.5px solid ' + border, color,
                    borderRadius: 'var(--radius-sm)', cursor: isRevealed ? 'default' : 'pointer',
                    transition: 'all 0.15s',
                  }}>
                    {val ? 'TRUE' : 'FALSE'}
                  </button>
                );
              })}
              {picked !== undefined && !isRevealed && (
                <button onClick={() => check(i)} style={{
                  padding: '0.35rem 0.85rem', fontSize: '0.82rem', fontWeight: 700,
                  background: 'var(--accent)', color: '#fff', border: 'none',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                }}>
                  Check
                </button>
              )}
            </div>
            {isRevealed && (
              <div style={{
                fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text)',
                padding: '0.5rem 0.75rem',
                background: isCorrect ? 'var(--teal-bg)' : 'var(--red-bg)',
                border: '1px solid ' + (isCorrect ? 'var(--teal-border)' : 'var(--red-border)'),
                borderRadius: 'var(--radius-sm)',
              }}>
                {s.explanation}
              </div>
            )}
          </div>
        );
      })}

      {allRevealed && (
        <div>
          <div style={{
            padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem',
            background: correctCount === STATEMENTS.length ? 'var(--teal-bg)' : 'var(--yellow-bg)',
            border: '1px solid ' + (correctCount === STATEMENTS.length ? 'var(--teal-border)' : 'var(--yellow-border)'),
            color: correctCount === STATEMENTS.length ? 'var(--teal)' : 'var(--yellow)',
            fontWeight: 700, fontSize: '0.88rem',
          }}>
            {correctCount}/{STATEMENTS.length} correct
          </div>
          <InsightBox>
            The three failure modes: (1) treating p-value as the probability the null is true (it is not —
            it assumes the null is true and asks how surprising the data is), (2) equating statistical and
            practical significance (significant just means detectable, not meaningful), (3) treating p &gt; 0.05
            as proof of no effect (it is inconclusive — you may have been underpowered).
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF05: Sample Ratio Mismatch ─────────────────────────────────────
function Module_EF05({ onComplete }) {
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const options = [
    { label: 'A. Proceed — the split is close enough to 50/50', correct: false },
    { label: 'B. Flag as SRM; investigate the assignment pipeline before trusting any results', correct: true },
    { label: 'C. Re-weight the results by the expected 50/50 ratio and proceed', correct: false },
    { label: 'D. Extend the experiment until the ratios balance out naturally', correct: false },
  ];

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Sample Ratio Mismatch (SRM) is one of the most important data quality checks in experimentation.
        Before reading any metric results, always verify that the observed split matches the intended split.
      </p>

      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          Experiment report
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.88rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Intended split</div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>50% / 50%</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Control visitors</div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>48,200</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Treatment visitors</div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>51,800</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Observed split</div>
            <div style={{ fontWeight: 700, color: 'var(--red)' }}>48.2% / 51.8%</div>
          </div>
        </div>
      </div>

      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.85rem' }}>
        Your experiment was supposed to split 50/50. Control received 48,200 visitors, treatment received
        51,800. What do you do?
      </div>

      {options.map((opt, i) => (
        <MCQOption
          key={i}
          label={opt.label}
          selected={answer === i}
          correct={opt.correct}
          revealed={revealed}
          onClick={() => !revealed && setAnswer(i)}
        />
      ))}

      {answer !== null && !revealed && <CheckBtn onClick={() => setRevealed(true)} />}

      {revealed && (
        <div>
          <div style={{
            marginTop: '0.5rem', padding: '0.65rem 0.85rem',
            background: options[answer] && options[answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
            border: '1px solid ' + (options[answer] && options[answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
            borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
          }}>
            SRM means the groups are not the random samples you intended. Re-weighting (option C) does not
            fix this — you do not know which users were systematically excluded or over-included.
            Extending the experiment (option D) cannot correct a broken assignment pipeline.
            The only valid path is to pause, investigate, and re-run.
          </div>

          <div style={{
            marginTop: '0.85rem', padding: '0.75rem 1rem',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              Common SRM root causes
            </div>
            {[
              'Bot filtering applied to only one variant (bots flushed from control but not treatment)',
              'Redirect latency causing variant users to abandon before logging (treatment sees slower load)',
              'Logging bugs where events fire on only one code path',
              'Experiment assignment before eligibility check, but logging after — different users pass the check',
            ].map((c, i) => (
              <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5, marginBottom: '0.3rem' }}>
                {i + 1}. {c}
              </div>
            ))}
          </div>

          <InsightBox>
            SRM invalidates the experiment because the groups are no longer comparable. It is the experiment
            equivalent of a data quality check in RCA — always run it first, before reading any metric results.
            A chi-squared test on the observed vs expected counts gives a formal SRM p-value.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF06: Novelty Effects and Long-Run Validity ─────────────────────
function Module_EF06({ onComplete }) {
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const options = [
    { label: 'A. The algorithm degraded over time', correct: false },
    { label: 'B. Novelty effect followed by user adaptation — users explored the new recommendations initially, then settled into old patterns', correct: true },
    { label: 'C. Seasonality — traffic mix changed across the 8-week window', correct: false },
    { label: 'D. Sample ratio mismatch distorted early results', correct: false },
  ];

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Not all experiment results are stable. Initial measurements often reflect novelty behavior
        rather than the true long-run effect. Knowing when to trust week-one results is a key skill.
      </p>

      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          CTR over time — treatment vs control delta
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Week 1', delta: '+8%', color: 'var(--teal)' },
            { label: 'Week 4', delta: '+2%', color: 'var(--yellow)' },
            { label: 'Week 8', delta: '-1%', color: 'var(--red)' },
          ].map((d, i) => (
            <div key={i} style={{ minWidth: 90 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{d.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: d.color }}>{d.delta}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.85rem' }}>
        A new recommendation algorithm shows +8% CTR in week 1. By week 4 it is +2% and by week 8 it is -1%.
        What is the most likely explanation?
      </div>

      {options.map((opt, i) => (
        <MCQOption
          key={i}
          label={opt.label}
          selected={answer === i}
          correct={opt.correct}
          revealed={revealed}
          onClick={() => !revealed && setAnswer(i)}
        />
      ))}

      {answer !== null && !revealed && <CheckBtn onClick={() => setRevealed(true)} />}

      {revealed && (
        <div>
          <div style={{
            marginTop: '0.5rem', padding: '0.65rem 0.85rem',
            background: options[answer] && options[answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
            border: '1px solid ' + (options[answer] && options[answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
            borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
          }}>
            Users explore unfamiliar UI out of curiosity, generating clicks that are not sustainable.
            The initial +8% reflects novelty behavior. As users adapt, the lift decays to steady-state (+2%)
            and eventually the algorithm may perform worse (-1%) as users learn to ignore the recommendations.
            Seasonal variation (option C) would show a pattern correlated with time of year, not a smooth decay.
          </div>
          <InsightBox>
            Run experiments long enough to capture steady-state behavior — typically at least one full weekly
            cycle (to account for day-of-week effects), often 2-4 weeks for features with habitual use patterns.
            If you see a strong novelty decay, report the week-4+ average, not the week-1 peak, as your
            point estimate.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module EF07: Multiple Testing and Guardrails ────────────────────────────
function Module_EF07({ onComplete }) {
  const [q1Answer, setQ1Answer] = useState(null);
  const [q1Revealed, setQ1Revealed] = useState(false);
  const [q2Answer, setQ2Answer] = useState(null);
  const [q2Revealed, setQ2Revealed] = useState(false);

  const q1Options = [
    { label: 'A. 0 — if there is truly no effect, you will never get a false positive', correct: false },
    { label: 'B. 1 — expected false positives = alpha x number of tests = 0.05 x 20 = 1', correct: true },
    { label: 'C. 5', correct: false },
    { label: 'D. 20', correct: false },
  ];

  const q2Options = [
    { label: 'A. Raises the significance threshold, making it easier to reject the null', correct: false },
    { label: 'B. Divides alpha by the number of tests — lowers the per-test threshold so the family-wise error rate stays at 5%', correct: true },
    { label: 'C. Removes metrics that were not significant, reducing the test count', correct: false },
    { label: 'D. Increases statistical power by pooling metrics together', correct: false },
  ];

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Most experiment dashboards track many metrics simultaneously. Each additional metric you test
        at alpha = 0.05 adds another 5% chance of a spurious significant result — even if nothing
        actually changed. This module covers the math and the standard correction.
      </p>

      {/* Q1 */}
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          Question 1 of 2
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '1rem' }}>
          You run one experiment and test 20 metrics simultaneously, each at alpha = 0.05.
          Assuming all null hypotheses are true, how many false positives do you expect by chance?
        </div>

        {q1Options.map((opt, i) => (
          <MCQOption
            key={i}
            label={opt.label}
            selected={q1Answer === i}
            correct={opt.correct}
            revealed={q1Revealed}
            onClick={() => !q1Revealed && setQ1Answer(i)}
          />
        ))}

        {q1Answer !== null && !q1Revealed && (
          <CheckBtn onClick={() => setQ1Revealed(true)} />
        )}

        {q1Revealed && (
          <div style={{
            marginTop: '0.5rem', padding: '0.65rem 0.85rem',
            background: q1Options[q1Answer] && q1Options[q1Answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
            border: '1px solid ' + (q1Options[q1Answer] && q1Options[q1Answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
            borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
          }}>
            Expected false positives = alpha × number of tests = 0.05 × 20 = 1. With 20 metrics you will
            on average find one "significant" result that is pure noise. This is why teams that track
            many metrics without correction find spurious wins regularly.
          </div>
        )}
      </div>

      {/* Q2 — show after Q1 answered */}
      {q1Revealed && (
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
            Question 2 of 2
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '1rem' }}>
            You apply Bonferroni correction to those 20 metrics. What does this correction do?
          </div>

          {q2Options.map((opt, i) => (
            <MCQOption
              key={i}
              label={opt.label}
              selected={q2Answer === i}
              correct={opt.correct}
              revealed={q2Revealed}
              onClick={() => !q2Revealed && setQ2Answer(i)}
            />
          ))}

          {q2Answer !== null && !q2Revealed && (
            <CheckBtn onClick={() => setQ2Revealed(true)} />
          )}

          {q2Revealed && (
            <div style={{
              marginTop: '0.5rem', padding: '0.65rem 0.85rem',
              background: q2Options[q2Answer] && q2Options[q2Answer].correct ? 'var(--teal-bg)' : 'var(--red-bg)',
              border: '1px solid ' + (q2Options[q2Answer] && q2Options[q2Answer].correct ? 'var(--teal-border)' : 'var(--red-border)'),
              borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.5,
            }}>
              Bonferroni sets the per-test alpha to alpha / number of tests = 0.05 / 20 = 0.0025.
              This keeps the family-wise error rate (the probability of any false positive across all tests)
              at 5%. It is conservative — it may miss real effects — but it is simple and widely understood.
              For guardrail metrics, where false positives are costly, this conservatism is appropriate.
            </div>
          )}
        </div>
      )}

      {q2Revealed && (
        <div>
          <InsightBox>
            The practical takeaway: pre-specify your primary metric before running the experiment.
            Use a Bonferroni-corrected threshold (or Benjamini-Hochberg for less conservatism) when
            evaluating secondary and guardrail metrics. Do not data-mine your metric list after seeing
            results — that is p-hacking, and interviewers know to probe for it.
          </InsightBox>
          <NextBtn onClick={onComplete} label="Complete module →" />
        </div>
      )}
    </div>
  );
}

// ── Module registry ─────────────────────────────────────────────────────────
const MODULE_COMPONENTS = {
  ef01: Module_EF01,
  ef02: Module_EF02,
  ef03: Module_EF03,
  ef04: Module_EF04,
  ef05: Module_EF05,
  ef06: Module_EF06,
  ef07: Module_EF07,
};

// ── Runner shell ────────────────────────────────────────────────────────────
export function ExpFoundationsRunner({ moduleId, onBack, onNext, unlocked }) {
  const module = expFoundationModules.find(m => m.id === moduleId);
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState(() => getNotes('exp-foundations', moduleId));
  useEffect(() => {
    setCompleted(false);
    setNote(getNotes('exp-foundations', moduleId));
  }, [moduleId]);

  if (!module) return null;

  const ModuleComponent = MODULE_COMPONENTS[moduleId];

  function handleComplete() {
    saveExpFoundationProgress(moduleId);
    track('case_completed', { room: 'exp-foundations', id: moduleId, title: module.title });
    setCompleted(true);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem 1.25rem 3rem' }}>
      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.2rem 0',
        }}>
          ← All modules
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Module {module.index} of {expFoundationModules.length}
          </span>
          {completed && (
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem',
              background: 'var(--accent-bg)', color: 'var(--accent)',
              border: '1px solid var(--accent-border)', borderRadius: 'var(--radius-sm)',
            }}>
              ✓ Complete
            </span>
          )}
        </div>
      </div>

      {/* Module header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
          }}>
            Experimentation Foundations
          </span>
        </div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.3rem', letterSpacing: '-0.02em' }}>
          {module.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>{module.subtitle}</p>
      </div>

      {/* Module content */}
      {ModuleComponent && <ModuleComponent onComplete={handleComplete} />}

      {/* Post-completion: connection + next */}
      {completed && (
        <div style={{ marginTop: '1.75rem' }}>
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1rem 1.1rem', marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>
              Why this matters for experimentation practice
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>
              {module.connection}
            </div>
          </div>

          <div style={{
            background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1.25rem',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
              Key insight
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.6 }}>
              {module.keyInsight}
            </div>
          </div>

          <button onClick={onNext} style={{
            padding: '0.65rem 1.6rem', background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700,
            fontSize: '0.9rem', cursor: 'pointer',
          }}>
            {module.index < expFoundationModules.length ? 'Next module →' : 'Back to all modules'}
          </button>

          {/* Notes */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              My Notes
            </div>
            <textarea
              value={note}
              onChange={e => { setNote(e.target.value); saveNote('exp-foundations', moduleId, e.target.value); }}
              placeholder="Add your own notes, reminders, or follow-up questions..."
              rows={4}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.65rem 0.85rem',
                color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.55,
                resize: 'vertical', outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
