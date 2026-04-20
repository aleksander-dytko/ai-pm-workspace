# Sample epic idea

> Used by `/guide` module 5 to teach `/create-epic`. Overwrite or delete once you have a real epic to draft.

---

**Raw idea**: "Unified onboarding dashboard for customer success"

**Source**: Feedback from three CSMs in a kickoff meeting last Tuesday.

**Problem (customer-reported)**:
Customer Success Managers currently log into four separate tools to prep for a new account kickoff call:
1. CRM (account details, renewal date)
2. Product analytics (feature usage)
3. Support tool (open tickets)
4. The health-score dashboard (red/yellow/green)

Each CSM spends ~30 minutes per kickoff prep, and the information is often stale by the time they get on the call. Two of the three CSMs said they've walked into calls missing critical context because they forgot to check one of the tools.

**Target user**: CSM (see `research/personas/example-business-user.md` for a similar role type).

**Ask (as pitched by the CSMs)**: "One screen that shows everything about an account the first time I open the file."

**Business case (my guess)**: 30 minutes saved per kickoff call * ~8 kickoffs per CSM per week * 12 CSMs = ~50 hours / week of CSM time. More importantly, fewer "missed context" moments in kickoff calls (hard to quantify but CSMs say it damages customer trust).

**Unknowns**:
- Is this actually the right solve, or would a Slackbot that summarizes the four tools before the call be better?
- Have other teams tried this? Any previous attempt that stalled?
- What does the CSM actually need vs. what they say they need?

**Scope guess**: Medium epic. Probably 1 designer sprint + 2 engineering sprints. Depends on how much data integration is already in place.

**Strategic fit**: Maps to our retention-focused initiative this half.
