# ROLLOUT.md — PAL Beta Rollout Plan

Operational file. Tracks what goes out, in what order, to whom, and what gets checked before it does. Not a feature backlog (that's IDEAS.md). Not standing rules (that's DECISIONS.md). This is the gate between "built" and "live to testers."

---

## Principles
*These are word-for-word identical across all sibling repos. If they change, change them everywhere.*

**1. Batch 0 is founder-only. No exceptions.**
Every batch starts with the founder using the product as a stranger would — cold, no context, no knowledge of what's behind the UI. Obvious breakage gets caught here so testers spend time on judgment calls, not bug reports.

**2. Every batch entry has two layers: profile and scope.**
Profile = who the tester is and what they are trying to do. Scope = what they are testing. Both are required. "Batch 1 = these 5 rooms" is not a batch entry. "A senior analyst candidate with 7 days to prep, testing the Defense Strategy + RCA room" is.

**3. Tester brief is one specific prompt, not a list.**
Vague prompts produce vague feedback. Each batch gets one concrete scenario the tester walks through. If you need to test two distinct things, run two batches.

**4. Feedback has an expiry date.**
Tester feedback on Batch N is only valid until Batch N+1 ships. When the next batch opens, mark the previous batch's feedback field as closed. Do not let unresolved notes from old batches accumulate as if they are still actionable.

**5. Mobile is non-negotiable in every vet checklist.**
Every batch — Batch 0 included — must be tested on a real mobile device before testers see it. Not browser devtools. A real phone. Check sticky bars, grids, tap targets, dark mode at low brightness.

**6. "Pass" must be defined before the batch opens.**
Each batch entry states what pass looks like before a single tester is invited. If you cannot define pass, the batch is not ready to open.

---

## Batch 0 — Founder Self-Vet
*Status: OPEN — complete before any tester sees the product*

### User profile
Founder, using the product as a first-time visitor with no context. No skipping. No "I know what this does."

### Scope
Full product surface — all rooms, all tools, all nav paths.

### Self-vet checklist

**Core loop**
- [ ] Home page loads cleanly, onboarding modal appears on first visit
- [ ] Can navigate to every room from the sidebar without errors
- [ ] Complete one case end-to-end in Stats, RCA, Metrics, Cases rooms — debrief renders correctly
- [ ] Code Room: Python and SQL both execute; Pyodide loads without hang
- [ ] Interview Simulator: full session completes without error in both DS and PM mode

**Defense Strategy (new — V4.27.0)**
- [ ] Step 1: JD textarea accepts paste, Analyze JD button activates
- [ ] Step 2: skill rating cards render, all three ratings selectable, JD weight dots appear
- [ ] Step 2: all four time horizon buttons selectable; intensity picker hides on Cram Up
- [ ] Step 3: gap scorecard bars render and are ordered by gap score
- [ ] Step 3: round-by-round cards show correct skill tags with correct rating colors
- [ ] Step 3: Cram Up output shows focus list + "the hour before" block
- [ ] Step 3: day plan cards show room chips (clickable) + suggested cases
- [ ] Step 3: Outside PAL section appears when JD contains Excel/financial modeling/presentation keywords
- [ ] Reconfigure link returns to Step 2 with ratings preserved

**Progress + auth**
- [ ] Progress page heatmap renders as 13×7 grid, not a blob
- [ ] Role readiness score updates after completing cases
- [ ] Sign in / sign out flow works; topbar shows avatar when signed in
- [ ] Sign in appears only in topbar (not duplicated in sidebar)

**Mobile — on a real phone**
- [ ] Sidebar opens and closes cleanly; all nav items tappable
- [ ] No horizontal scroll on any room browser page
- [ ] Sticky bottom bars (RCA, Cases, BI, Challenges) clear the home indicator
- [ ] Topbar clears the notch / Dynamic Island
- [ ] Dark mode at 30% brightness: text and surface elevation both visible
- [ ] Code Room shows mobile notice banner
- [ ] Defense Strategy 3-step flow usable on mobile (grid collapses correctly)

**Known rough edges to verify are not blockers**
- Pyodide initial load takes 3–6 seconds on first visit — acceptable, confirm spinner shows
- Defense Strategy with very sparse JD (< 3 keyword matches) shows fallback skills warning — confirm it appears

### Pass criteria
All checklist items green. No room throws a runtime error. Defense Strategy 3-step flow completes end-to-end on both desktop and mobile.

### Feedback collected
*N/A — founder self-vet, no external feedback*

---

## Batch 1 — First External Testers
*Status: PENDING — opens after Batch 0 passes*

### User profile
2–3 people actively prepping for a senior analyst or business analyst role. Have an interview coming up in the next 7–14 days. Comfortable with SQL. Self-described as shaky on experimentation and RCA. Not from a pure engineering background.

*Why this profile:* They have genuine skin in the game, so they will use the product seriously rather than casually clicking around. Their gap profile (SQL strong, experimentation/RCA weak) maps directly to PAL's best content.

### Scope
- Defense Strategy (the full 3-step flow, using a real JD from their actual target role)
- RCA Room (3+ cases)
- Stats Room or Stat Foundations (whichever the Defense Strategy recommends)

### Self-vet checklist before inviting testers
- [ ] Batch 0 passed fully
- [ ] Tested on mobile by founder (real device, not devtools)
- [ ] Defense Strategy tested with 3 different JDs: generic analyst, BA at e-commerce, PM at startup — all produce sensible plans
- [ ] Outside PAL section tested with a JD containing "Excel" and "pivot tables" — section appears correctly
- [ ] RCA Room: all 12 cases load without error, sticky next bar works

### Tester brief
*One prompt only — send this verbatim:*

> You have a [their role] interview coming up. Paste your actual job description into Defense Strategy (under Tools in the left menu), rate yourself on each skill honestly, pick your time horizon, and build your plan. Then do 3 cases in the first room it recommends. That's it. Tell me: did the plan feel like it was built for your situation, or did it feel generic? Where did you get confused or lose momentum?

### Feedback target
- Does the Defense Strategy plan feel personal or generic?
- Do testers reach the debrief in the practice rooms, or do they drop off before?
- Any room or UI element that caused confusion or required explanation

### What "pass" looks like
At least 2 of 3 testers complete the Defense Strategy flow and at least one practice room session without needing guidance. At least one piece of specific, actionable feedback collected per tester.

### Feedback collected
*Open — fill in when Batch 1 closes*

---

## Batch 2 — Broader + Mobile-First
*Status: STUB — define scope after Batch 1 closes*

### User profile
TBD — likely: PM candidates or career-switchers (less technical, more product-sense focused). Specifically recruit at least 2 mobile-primary testers.

### Scope
TBD — likely: Product Design Room, Prioritization Room, Behavioral Room, and the Interview Simulator. Possibly the Meesho / Company Track flow if Batch 1 feedback suggests company context matters.

### Self-vet checklist
- [ ] Mobile-first pass: entire Batch 2 scope tested on iPhone and Android before any tester invited
- [ ] Batch 1 feedback reviewed and any blockers resolved

### Tester brief
*TBD after Batch 1 closes*

### Feedback target
*TBD*

### Pass criteria
*TBD*

### Feedback collected
*Not yet open*

---

## Batch 3 — Stress Test + Pricing Signal
*Status: STUB*

### Notes
This batch should include the Pricing page explicitly. Ask testers directly: "Does this feel worth paying for? What would make you hesitate?" Broader tester pool, less controlled. By this point the core loop should be solid enough to absorb noise.

---

## Changelog
| Version | Change |
|---|---|
| V4.27.0 | File created. Batch 0 checklist written. Batch 1 fully specified. Batches 2–3 stubbed. |
