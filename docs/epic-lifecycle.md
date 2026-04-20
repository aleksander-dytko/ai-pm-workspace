# Epic Lifecycle

A lightweight four-stage framework for moving an epic from idea to shipped. Skills like `/create-epic`, `/user-journey`, and `/competitive-research` produce artifacts that map to one or more of these stages.

This is a generic framework adapted from common product lifecycle practice; adapt stage names and gating criteria to whatever your team already uses.

---

## The four stages

| Stage | Goal | Typical artifacts | Exit criteria |
|-------|------|-------------------|---------------|
| **Explore** | Understand the user problem, validate it's worth solving | Research notes, competitive matrix, opportunity-solution tree | You can articulate a user problem, know it's not already solved, and have a hypothesis about who benefits |
| **Scope** | Turn the hypothesis into a shippable plan | Epic draft (sections 1-3, 6-9 of `templates/epic-template.md`), user journey, design brief, engineering estimate | Engineering says "we can build this"; design has a direction; stakeholders have signed off on scope |
| **Build** | Implement and ship | Code, documentation, release notes (section 4 of epic template) | Feature is live in production for the target audience |
| **Validate** | Measure whether the bet paid off | Telemetry, customer interviews, success-metric dashboard, validation criteria evaluation (section 10) | You have evidence for or against the bet, documented in the epic |

---

## Stage gating

Move between stages when the exit criteria are met, not on a fixed schedule. A good epic often sits in Explore for weeks while you talk to users, then moves through Scope and Build quickly because the hypothesis was well-shaped.

Flag stalled epics:
- **More than 3 weeks in Explore with no user research**: the hypothesis may be wrong. Either talk to users or kill the epic.
- **More than 2 weeks in Scope**: probably scope bloat. Cut or split.
- **More than a release in Validate with no metrics read**: ship the telemetry first, or accept the epic as "shipped but not validated" and move on.

---

## Artifacts by stage

### Explore

The cheapest artifacts to produce. Goal: learn fast.

- Customer interview notes (processed via `/meeting`).
- `/competitive-research` for external landscape.
- `/opportunity-solution-tree` for mapping the opportunity space.
- A short research note in `Loose Notes/Work/` summarizing what you learned.

### Scope

Artifacts get more expensive. Goal: reduce risk before committing build capacity.

- Epic draft using `templates/epic-template.md` (sections 1-3 required, 6-9 phase-specific).
- `/user-journey` to walk through the intended experience.
- Design review sign-off (section 7).
- Risk assessment (section 9).
- Engineering estimate (not a template; happens with the EM).

### Build

Mostly engineering work. PM role is removing blockers and making scope calls.

- Follow-up tasks from scope work live in `Dashboard/tasks.md`.
- Release notes (section 4) drafted in advance of launch.
- Documentation plan from section 8 executed.

### Validate

The bet gets tested.

- Instrument telemetry for the validation criteria (section 10).
- Schedule follow-up customer interviews 30-60 days post-launch.
- Write a short "what we learned" note in `Loose Notes/Work/` and link it to the epic and the initiative.
- Update the initiative's `## Product beliefs` table.

---

## When to kill an epic

Killing an epic early is usually a **win** for the portfolio, not a failure. Strong signals to kill:

- **Explore stage**: no user could articulate the problem you thought existed.
- **Scope stage**: the engineering estimate is 5x what you expected and you can't cut scope without losing the value proposition.
- **Build stage**: a dependency you assumed is now at risk.
- **Validate stage**: metrics show no movement 90 days after launch, and qualitative feedback is tepid.

Document the kill decision via `/decision` with rationale and what you learned. That artifact is how future epics in the same initiative avoid repeating the mistake.

---

## How this lifecycle connects to skills

- `/create-epic` drafts a new epic file using `templates/epic-template.md` and sets `stage: Explore`.
- `/user-journey` produces an artifact that supports Scope stage.
- `/competitive-research` produces an artifact that supports Explore stage.
- `/opportunity-solution-tree` supports Explore stage.
- `/decision` documents stage transitions and kill calls.
- `/weekly-plan` triages follow-up tasks by stage.
