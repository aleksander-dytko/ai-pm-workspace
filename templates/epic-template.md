---
tags: Epic
status: [exploring | scoped | building | validating | shipped]
stage: [Explore | Scope | Build | Validate]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# [Epic Title - keep under 80 characters]

A template for structuring a product epic. Fill the sections progressively as the epic moves through the lifecycle (see `docs/epic-lifecycle.md`).

Sections are marked **Required**, **Optional**, or **Phase-specific**.

---

## 1. Value Proposition Statement *(Required)*

A clear statement about the outcome the customer realizes from using this.

Think through these:
- What specific metric will improve for the target user?
- Why is that beneficial to them?
- What is the measurable commercial impact for your company?
- What market problem does this solve?
- Why should the customer choose this over alternatives?

**Do's and Don'ts**:

| Do | Don't |
|----|-------|
| Simple | Complex |
| Tangible | Abstract |
| Customer-centric | Feature-centric |
| Share piece by piece | Dump everything at once |
| Storyline | Random facts in random order |

**Example** (fictional):
> A dashboard that lets a platform operator see end-to-end request latency without logging into three separate observability tools.

---

## 2. User Problem *(Required)*

Describe the problem from the customer's perspective. Focus on the **why** - the outcome the user is trying to reach, not the feature they're asking for.

Collaborate with:
- **Product designer** to frame the problem from a human-centered perspective.
- **Engineering manager** to surface technical constraints and risks early.

**Example** (fictional):
> When a customer's system slows down, our support engineers currently need to open the metrics dashboard, the log aggregator, and the tracing UI in separate tabs, then manually correlate timestamps across all three. This takes 15-20 minutes per incident and often requires escalating to the platform team. Support engineers want one screen that answers "where is the latency coming from" without needing to understand the full observability stack.

---

## 3. User Stories *(Required)*

Stories designed so developers know if they implemented the right thing.

- **Explore / Scope phase**: describe mainly the **what**.
- **Build phase**: also describe the **how**.

Include an **Upgrading User Story** if the epic affects existing users (behaviour change, migration, deprecation).

**Examples** (fictional):

*What (Explore phase)*:
- As a support engineer, I can see the slowest 10 customer requests in the last hour on one screen.
- As a support engineer, I can click a slow request and see its full trace with correlated logs.
- As a platform engineer, I can filter the dashboard to one customer's traffic.

*How (Build phase)*:
- As a support engineer, when I click a request row, the trace and logs load in under 2 seconds.
- As a platform engineer, filters persist across page navigations via URL query params.

*Upgrading*:
- As an existing customer using the old per-tool UX, I can still reach the legacy metrics view via the app menu during a 60-day deprecation window.

---

## 4. Release Notes *(Optional)*

Only for epics with release documentation. Draft a blurb covering the feature description, the value, and the call to action.

Keep it actionable. Avoid internal jargon.

**Example** (fictional):
> **Unified incident dashboard**
>
> Support engineers can now diagnose customer latency issues from a single screen. The new dashboard correlates metrics, logs, and traces in one view, with one-click drill-downs. Expected time-to-diagnosis drops from ~15 minutes to under 2 minutes per incident. See [link to docs].

---

## 5. Implementation Notes *(Optional)*

Notes to consider for implementation. Aligned with the engineering manager.

Use this to flag specific technical decisions, dependencies, or sequencing that the epic's user stories don't capture on their own.

---

## 6. Breakdown *(Phase-specific links)*

Links to sub-issues / sub-tasks for each lifecycle stage.

### Explore
- Customer interviews
- User research
- Market / competitive analysis (see `/competitive-research`)
- Opportunity-solution tree (see `/opportunity-solution-tree`)

### Scope
- UI / UX design (see `/user-journey`)
- Technical design
- Documentation plan

### Build
- Implementation tasks
- Documentation
- Testing

### Validate
- Usage telemetry
- User feedback sessions
- Success metric evaluation

---

## 7. Design Planning *(Phase-specific, Scope)*

- **Design review**: {date}
- **Designer assigned**: {Yes / No Design Needed / No Designer Available}
- **Assignee**: {Designer name}
- **Design brief**: {link}
- **Research brief**: {link}

Design deliverables and links go here as they come online.

---

## 8. Documentation Planning *(Phase-specific, Scope)*

Anticipated documentation impact. Assign a documentation reviewer during the Scope phase.

---

## 9. Risk Assessment *(Phase-specific, Scope)*

- **Risk class**: {Low / Medium / High}
- **Specific risks**:
  - Customer-facing breaking change?
  - Data migration required?
  - Compliance or privacy impact?
  - Downtime or rollback complexity?

For any High risk, link to the mitigation plan.

---

## 10. Validation Criteria *(Optional, Phase-specific: Validate)*

How success is measured after shipping.

**Customer outcome metrics** (e.g., time saved, errors reduced).
**Product experience metrics** (e.g., first-time success rate, activation rate).
**Commercial impact metrics** (e.g., retention signals, expansion opportunities).
**Validation plan** (how you'll collect the above).

**Example** (fictional):
- Support engineers resolve 80% of latency incidents without escalation (baseline: 40%).
- Median time-to-diagnosis drops from 15 minutes to under 3 minutes.
- Support ticket volume for "slow dashboard" complaints drops 50% within 90 days.

---

## 11. Follow-up Tasks

Tasks generated by `/create-epic` land here and in `Dashboard/tasks.md` under "This week".

- [ ] [Task] - owner - due date

---

## Template Summary

### Required
1. Value Proposition Statement
2. User Problem
3. User Stories

### Optional
4. Release Notes (only for epics with release docs)
5. Implementation Notes
10. Validation Criteria

### Phase-specific
6. Breakdown (all phases)
7. Design Planning (Scope)
8. Documentation Planning (Scope)
9. Risk Assessment (Scope)
11. Follow-up Tasks (all phases)
