# Content Quality Bar

**What makes a scenario good enough to ship.**

Every playable scenario must pass this bar. A scenario that fails any of these criteria should not be published, regardless of how complete it looks.

---

## The Core Test

**Would a senior product analyst reading this scenario learn something that changes how they approach real experiment reviews?**

If the answer is "probably not" — because the scenario is too easy, too obvious, too unrealistic, or because the debrief doesn't add anything beyond what was visible in the metrics — it doesn't ship.

---

## 1. The Decision Must Be Hard

The right answer should not be obvious on first glance. A good scenario has:

- A primary metric that looks clean but hides a problem, OR
- A genuine tension between two valid concerns (e.g., primary metric wins but guardrail breaches), OR
- A structural issue that invalidates the readout entirely (e.g., SRM), OR
- A contextual factor that changes what the right call is (e.g., experiment is underpowered but business context makes waiting impossible)

If someone with two years of A/B testing experience would get it right on first pass without needing to look at the full readout, the scenario is too easy.

---

## 2. The Metric Readout Must Do Work

The metric table is not decoration. It must contain:

- The right level of complexity for the difficulty tier (analyst: 3–5 metrics; senior: 5–8; staff: 6–10+)
- At least one metric that creates tension or ambiguity
- Realistic p-values and confidence intervals — not suspiciously round numbers
- At least one guardrail metric with real stakes (not just "engagement went up 0.1%")
- Delta directions and magnitudes that are internally consistent with the experiment design

If the decision is obvious from the metric table alone without reading the context or design, the readout isn't doing enough work.

---

## 3. The Warning Flags Must Be Real

Each warning flag must:

- Represent a genuine validity or interpretation concern
- Be discoverable from the data provided (not require external knowledge)
- Have a severity that reflects actual impact on the decision (critical = should change the call; moderate = should change confidence; minor = informational)

Do not include flags that are:
- Trivially obvious ("the experiment ran for less than one week")
- Not addressable from available information
- Present only to pad the checklist

Target: 3–6 flags per scenario. More than 6 suggests the scenario is trying to teach too many things at once.

---

## 4. The Decision Options Must Be Calibrated

Four decision options, each representing a distinct level of judgment:

**Junior Miss:** A decision a newer analyst would make by reading the surface signal and missing the critical issue. Should feel defensible on first read. This is what makes it a good learning moment — it's not an obviously wrong answer.

**Analyst-Ready:** Gets the right call but may be incomplete. Identifies the problem, makes the correct ship/hold/investigate decision, but doesn't fully articulate the mechanism or next steps.

**Senior-Ready:** Correct decision with correct reasoning. Names the failure mode, understands why it happened in this context, and specifies what a good next step looks like.

**Staff-Level:** Adds precision, forward-looking framing, and stakeholder-aware language. Not just "this is an SRM" but "here's why it happened, what it means for inference, what we should do next, and how to explain it to the PM without causing panic."

**Calibration check:** Have at least two experienced analysts independently score all four options before shipping. If they disagree on which is Senior-Ready vs. Staff-Level, revise.

---

## 5. The Senior Debrief Must Earn Its Title

The debrief is the learning payoff. It is not a summary of what happened. It is how a thoughtful senior analyst would read this experiment.

**The debrief must:**

- Name the failure mode explicitly and define it briefly
- Explain why it matters specifically in this scenario (not generically)
- Describe what the right call is and the reasoning behind it
- Address the most common wrong answer and explain what it misses
- Connect the issue to downstream business risk
- Suggest a concrete next step

**The debrief must not:**

- Simply restate the metric readout
- Be generic enough to apply to any experiment with this failure mode
- Use hedge language that avoids taking a position ("it depends" without saying what it depends on)
- Be longer than necessary — clarity is more important than comprehensiveness

**Length target:** 400–700 words. Under 400 usually means it's not doing enough. Over 700 usually means it's covering too much ground.

---

## 6. The Business Context Must Be Specific

The fictional company, product, and stakeholder pressure must feel real. Vague contexts ("a large tech company ran an experiment on their main feature") produce vague judgment. Good contexts:

- Name a plausible fictional company in a specific industry
- Describe a specific product moment (checkout flow, onboarding step, recommendation system)
- Give the team a real business pressure (launch deadline, exec review, competitive pressure)
- Create a tension: the pressure pushes toward one decision; the data should push back

The business context is not flavor text. It changes what the right decision is.

---

## 7. Scenario Family Alignment

Each scenario belongs to exactly one scenario family (see SCENARIO_BANK_TAXONOMY.md). The scenario should teach the core trap of its family — not two families at once.

If a scenario seems to straddle two families (e.g., it's both an SRM and a multiple testing issue), either:
- Simplify it so one family is clearly dominant, OR
- Split it into two separate scenarios

Teaching one thing well is more valuable than teaching two things messily.

---

## 8. Difficulty Tier Consistency

| Tier | What it means |
|------|---------------|
| Analyst | The issue is visible in the data if you know what to look for. The failure mode is well-known. |
| Senior | The issue requires contextual interpretation or involves multiple interacting factors. |
| Staff | The issue requires statistical precision, trade-off reasoning, or recognizing when the standard playbook doesn't apply. |

If beta readers at the target experience level consistently miss the right call, the scenario might be mis-tiered or poorly constructed. If everyone gets it right, it's probably too easy.

---

## Review Checklist Before Shipping

- [ ] Decision is genuinely hard — surface read differs from correct read
- [ ] Metric table creates tension, not just information
- [ ] Warning flags are real, discoverable, and correctly severity-rated
- [ ] All four decision options are distinct and correctly calibrated
- [ ] Senior debrief is specific to this scenario, not generic
- [ ] Business context creates real pressure
- [ ] Scenario teaches exactly one failure mode
- [ ] Difficulty tier is consistent with target audience expectations
- [ ] At least one person who didn't write it has reviewed the debrief
- [ ] Build passes, scenario renders correctly in both light and dark mode
