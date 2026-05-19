# Product Analytics Lab — Ideas Backlog

Running list of product, content, and feature ideas. Not prioritized — just captured so nothing gets lost.

---

## Blog / Learn Layer

**Status:** Placeholder page built (BlogBrowser.jsx). Content not written yet.

### The Idea
Add a blog/articles section that teaches the frameworks and concepts behind each room — before people try to practice them. The loop becomes:

**Read the concept → understand the framework → practice it immediately on the platform**

This is the core gap in most prep resources: they either teach passively (courses, articles) or test actively (LeetCode-style) but never connect the two. A blog layer built on top of the practice layer creates the full loop and makes both stickier.

### Source material
The following prep packets (Sidharth's interview prep materials) are rich source material for blog posts:
- `DS_Product_Scientist_Master_Handbook.pdf` — 5-mode operating system: Metric Design, Problem Investigation, RCA, Experimentation, AI/ML
- `Metric_Universe_Atlas.pdf` + `Metric_Universe_Atlas_Reference.pdf` + `Metric_Universe_Atlas_Pure.pdf` — 69 metrics across 9 families, decomposition, segmentation, denominator discipline
- `KPI_Metrics_Study_Packet.pdf` — KPI framing, metric trees, guardrails, walkthroughs
- `RCA_Interview_Prep_Packet.pdf` — CDSHV framework, walkthroughs, practice questions
- `Experimentation_Interview_Prep.pdf` — SRM, power/MDE, CUPED, trust checks, tradeoff/cannibalization
- `Ambiguous_Problem_Breakdown_Packet.pdf` — 10-step framework, proxy design, ambiguous problem bank
- `product_sense_ds_packet.pdf` — Product sense for DS/analytics roles
- `product_business_case_study_packet.pdf` — Business case framing, dollar impact translation

### Blog topics planned (see BlogBrowser.jsx for full list)
Grouped by room: Metrics, RCA, Experimentation, Stats, Ambiguous Problems, GenAI/ML, Business Cases

### Implementation notes
- Start with 5-6 posts that directly map to a room — not 20 posts upfront
- Each post should end with a "Practice this now →" CTA that deep-links into the relevant room
- Format: framework first, walkthrough example, common mistakes, CTA
- Static MDX or hardcoded JSX to start — no CMS needed yet
- No separate blog infrastructure needed until traffic justifies it

---

## Other Ideas

*(add here as they come)*

---

*Last updated: May 2026*
