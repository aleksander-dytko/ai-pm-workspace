# Sample meeting transcript

> Used by `/guide` module 1 to teach `/meeting`. Overwrite or delete once you have a real meeting to process.

---

**Meeting**: Quarterly planning sync - Mobile team
**Date**: 2026-04-15
**Attendees**: Priya (eng lead), Marcus (design), Sam (support lead), me

Raw notes (my notes from the meeting):

Priya raised that the auth service is at capacity. Current architecture can't handle more than 2x current traffic. She estimates 3 weeks to rewrite, or we defer and accept that the next 2 launches will hit rate limits.

Marcus shared Figma mockups for the new onboarding flow. Numbers from last quarter: 60% of new signups don't reach the activation event. He thinks the current 7-step flow is the problem; new design collapses it to 3 steps. Wants engineering estimate by end of week.

Sam brought data on support tickets: 40% of all tickets in March were about signup confusion. He wants onboarding rework prioritized over other UX work.

Discussion got hot about whether to ship auth rewrite before or after onboarding redesign. Priya argued auth has to come first because onboarding launch will spike traffic. Marcus pushed back, saying onboarding has clearer customer value in the short term. Ended with "we'll decide by Friday."

Decisions reached:
- Kick off the auth rewrite next sprint (Priya's team)
- Onboarding redesign locked for next-next sprint
- Sam will share his ticket data with the design team by Wednesday
- I'll draft the sequencing decision and circulate by Friday

Open questions:
- Do we need to notify enterprise customers about any downtime during auth rewrite?
- Who signs off on the onboarding copy changes - design alone, or does marketing need a pass?
