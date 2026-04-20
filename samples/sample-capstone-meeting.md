# Sample capstone meeting

> Used by `/guide` module 7 (Capstone). Overwrite or delete once you have a real workflow to chain.

This is a richer meeting than `sample-meeting-transcript.md`. The capstone walks through: `/meeting` -> `/decision` (on one of the contentious items) -> `/communicate` (to share the decision) all in sequence.

---

**Meeting**: Cross-team sync - Billing revamp kickoff
**Date**: 2026-04-17
**Attendees**: me, Jin (billing eng lead), Rita (finance partner), Lena (design), Kwame (CS lead)

Raw notes:

Kick-off on the billing revamp project. Background: our current billing UI was built in 2022 and hasn't been touched since. Finance has been complaining for 18 months that the current export CSV doesn't match the accounting system's schema, so Rita's team manually reformats every month.

Jin says engineering is ready to start in two weeks. He has capacity for 1 senior and 1 mid engineer for 6 sprints. He's concerned about scope - a full revamp could easily balloon.

Rita shared the pain: 8-12 hours/month of manual reformatting across her team. She listed three specific fields in the CSV that are wrong format. Says if we just fixed those three fields, 80% of her pain goes away. She doesn't need the UI revamped at all for her use case.

Lena pushed back on Rita's "just fix the CSV" framing. She's been looking at customer billing complaints in the support tickets - users can't self-serve invoice history, and the current UI is cited directly in churn exit interviews. Lena thinks the revamp is the right call.

Kwame shared ticket data: 15% of customer support volume is billing-related. Most is self-service stuff the users should be able to do in the UI. He agrees with Lena.

Discussion: Jin proposed splitting this into two parallel work streams. Stream A: fix the CSV export (small, 1 sprint). Stream B: the UI revamp (larger, 4-5 sprints). Both can go in parallel because they touch different code.

Decisions:
- Adopt Jin's two-stream approach.
- Stream A ships first (next sprint, eng owner: Jin's team).
- Stream B starts in parallel with Stream A but targets a later sprint for release.
- I'll draft the scope doc for Stream B by end of week, circulate for sign-off.
- Rita will validate that the three CSV fields are indeed what's blocking her - if there are more, flag before Stream A starts.

Open contentious item:
- Whether the UI revamp should include a full self-service invoice portal (Lena and Kwame say yes), or just fix the top 5 complaints in the existing UI (Jin leans this way to avoid scope creep).

Action items:
- Scope doc for Stream B - me - Friday 2026-04-24
- Validate Stream A fields - Rita - Tuesday 2026-04-21
- Share the churn interview excerpts - Lena - by Wednesday
- Preliminary engineering estimate for Stream B (with and without full portal) - Jin - next week
- Summarize decision for the wider team - me - after scope doc is done

Related notes: [[Initiatives/billing-revamp]] (if it exists), [[Q2 roadmap]].
