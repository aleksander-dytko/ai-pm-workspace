# Sample update context

> Used by `/guide` module 4 to teach `/communicate`. Overwrite or delete once you have a real update to draft.

---

**What to communicate**: The decision to sequence the auth rewrite before the onboarding redesign.

**To whom**: The engineering leadership channel (principal engineers, EMs, VP Eng).

**Channel**: Slack.

**Tone**: Peer-to-peer, technical. Not a management update; a sibling team lead explaining a decision and inviting feedback.

**Key points the message should cover**:
- Decision: auth rewrite first, onboarding redesign second.
- Why: auth can't handle 2x traffic; onboarding launch will cause exactly that spike. De-risking via staged rollout was considered but rejected because the rollout tooling itself depends on auth capacity.
- Timeline: auth next sprint (3 weeks), onboarding redesign starts the sprint after (4 weeks). Total ~7 weeks vs ~4 if parallel, but parallel is infeasible due to shared code.
- Invite feedback: specifically on whether there are other ways to parallelize that we missed, and whether any other team is blocked by auth rewrite.

**Links to include**: the decision note (link placeholder), Priya's auth capacity analysis (link placeholder), Sam's support ticket data (link placeholder).
