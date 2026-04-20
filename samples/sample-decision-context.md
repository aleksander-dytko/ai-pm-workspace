# Sample decision context

> Used by `/guide` module 3 to teach `/decision`. Overwrite or delete once you have a real decision to document.

---

**Decision topic**: "Should we ship the auth rewrite before or after the onboarding redesign?"

**Context for the skill**:

Two options are on the table. Priya (eng lead) wants auth first because the onboarding redesign will spike traffic and the current auth service can't handle more than 2x current load. Marcus (design) wants onboarding first because 40% of support tickets last month were about signup confusion and the business case is stronger short-term.

Engineering estimate: auth rewrite is ~3 weeks, onboarding redesign is ~4 weeks.

Stakeholders:
- Priya: strong vote for auth-first.
- Marcus: strong vote for onboarding-first.
- Sam (support): neutral on sequence, just wants both done.
- My manager: wants a decision by Friday, doesn't have a strong preference.

Constraint: we can't parallelize - both initiatives will touch the same login-flow code.

Customer impact:
- Auth-first: 3 weeks of no new signup work. Supports who argue the current flow is "fine" for now.
- Onboarding-first: risk of the new flow launching and hitting rate limits during the launch spike, creating a bad first impression.

Gut feel: auth-first feels safer, but onboarding-first has better storytelling externally.

Questions I'm stuck on:
- How confident are we in the traffic-spike estimate?
- Can we de-risk the launch with a staged rollout instead of sequencing?
