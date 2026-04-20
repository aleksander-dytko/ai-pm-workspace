---
tags: Persona
status: validated
last_updated: 2026-04-20
---

# Priya - Platform Operator (DevOps / SRE)

An example persona. Replace with your own or use as a structural reference.

## Background

Priya has spent nine years in platform engineering roles, the last four at a fintech where she built and now runs the internal developer platform. Her team of six supports 200+ engineers across 40 services. She spent her first career years as a backend developer and still codes when she gets time, but most of her day is operational.

She is the primary person customer-success teams page when "the platform is acting up." She cares deeply about reliability, spends her reading time on post-mortems, and believes most production outages come from subtle human errors made under time pressure.

---

## Job role

- **Title**: Staff Platform Engineer
- **Seniority**: Staff
- **Organization type**: Mid-market fintech (~700 employees)
- **Primary focus**: Internal developer platform, reliability, runbooks

---

## Responsibilities

- Own the SLOs for the internal developer platform.
- Review and approve infrastructure-as-code changes from application teams.
- Lead incident response for P1/P2 incidents.
- Maintain the runbook library.
- Advocate for platform improvements in the quarterly planning cycle.

---

## Ways of working

- **Tools she lives in**: Terminal, Grafana, PagerDuty, the CI/CD pipeline, the internal platform's admin UI, and Slack.
- **Preferred learning channel**: Official docs and source code. Occasionally a conference talk if the speaker is known for depth over hype.
- **Collaboration pattern**: Deeply async. Written RFCs for any significant change. Weekly 1:1 with her manager; almost no other standing meetings.
- **Pace and rhythm**: Long focus blocks. Incident response breaks them. Rebuilds context patiently.

---

## Goals

- **This quarter**: Reduce incident frequency by migrating three legacy services to the new platform baseline.
- **This year**: Get the platform's error budget from 30% consumed to under 10%, year-over-year.

---

## Pain points

- "When a service degrades, I don't want to stitch together three monitoring tools to figure out which component is the root cause."
- "The application teams keep asking me why their deploys fail. The error messages the platform gives them are awful. That's on me to fix."
- "I spend more time explaining the platform than improving it. If the docs were good, I could take a vacation."

---

## Influences

- SRE community (Google's SRE book culture).
- Her own team's retrospectives.
- Vendors who publish detailed public post-mortems.
- Not marketing. She ignores it.

---

## Tools

- **Most relevant**: Grafana, PagerDuty, Terraform, Kubernetes, the internal platform CLI.
- **Adjacent**: GitHub, Slack, the incident management tool.

---

## Constraints

- Any change to the production platform requires a change-advisory review.
- Security compliance gates for any new dependency.
- No unsupervised access to production data stores.

---

## Open questions

- Would she advocate for replacing the existing observability stack, or only incremental improvements?
- How much does her team's retention depend on the quality of the tools she maintains?

---

## Research sources

- Interview: 2026-03-08 (60 min)
- Post-incident review notes, Q1 2026
