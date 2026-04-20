---
name: decision
description: Make a product decision with full context from the vault and available sources
argument-hint: "[decision topic]"
---

# Make a Product Decision

You help make a well-informed product decision by gathering context from all available sources and producing structured documentation, follow-up tasks, and a communication draft.

## Input

The user provides a decision topic via `$ARGUMENTS`. Examples:
- "should we support feature X in the next release"
- "prioritize feature A vs feature B"
- "should we adopt GraphQL for the new API"

## Workflow

1. **Search the vault**:
   - Recent meetings in `Meetings/` that touched this topic
   - Daily notes in `journals/` (last 2 weeks) for related context
   - `Loose Notes/Work/` for related decisions or drafts
   - `Dashboard/Weekly P-Tasks.md` for related priorities

2. **Use GitHub MCP** (if configured):
   - Search repositories for related issues/PRs
   - Read engineering comments and discussions
   - Identify any blockers or concerns raised

3. **Ask for additional context** (before options):
   - "Do you have a Slack thread, document, or discussion about this decision? If yes, paste it now."
   - If provided: extract opinions, concerns, constraints.
   - If skipped: proceed without.

4. **Present context summary**:
   - Relevant notes and prior discussions
   - Strategy alignment (if strategy docs exist)
   - Customer data or validation (if any)
   - Engineering discussions and feasibility (from GitHub)

5. **Draft options with trade-offs**:
   - 2-3 viable options
   - For each: pros (benefits, alignment, customer value), cons (costs, risks, complexity, timeline)
   - Do not recommend yet - present objectively

6. **Create decision note**:
   - Location: `Loose Notes/Work/YYYY-MM-DD - Decision - [Topic].md`
   - Structure:

```markdown
---
tags: LooseNotes
date: YYYY-MM-DD
---
# Decision: [Topic]

**Date**: YYYY-MM-DD

## Context
[Why this decision is needed - background from notes, meetings, strategy]

## Options Considered
1. **Option 1**: [Description]
   - Pros: ...
   - Cons: ...
2. **Option 2**: [Description]
   - Pros: ...
   - Cons: ...

## Decision
[To be filled after review, or suggest recommendation if clear]

## Rationale
[Why this option, trade-offs accepted]

## Impact
[What changes, who is affected, timeline]

## Communication
[Who needs to be informed, how]

## Follow-up Tasks
- [ ] [Task]
```

7. **Link the decision note**:
   - Add a link in today's journal (`journals/YYYY/MM-Month/DD-MM-YYYY.md`) under `## Notes`.

8. **Draft a communication**:
   - A ready-to-post message announcing the decision.
   - Keep it concise (under 200 words).
   - Format: Context → Decision → Impact → Next steps.
   - Channel-neutral by default; if the user names a channel (Slack/email), adapt to that channel's style (see `/communicate`).

9. **Propose follow-up tasks** (confirm before writing):
   - Identify tasks needed to implement and communicate the decision.
   - Show the proposed list and wait for confirmation.
   - After confirmation, append each task to `Dashboard/tasks.md` under "This week" with format:

```
- [ ] Task - source: [[YYYY-MM-DD - Decision - Topic]] - due: YYYY-MM-DD - priority: P2
```

## Output Format

```
✅ Decision note created: [[YYYY-MM-DD - Decision - Topic]]
✅ Linked in today's journal

📊 Context gathered:
- [N] related notes/meetings
- [N] GitHub issues/PRs

📝 Communication draft:
[Message ready to copy-paste]

📋 Proposed follow-up tasks:
- [ ] [Task 1] - P[N], due [date]
- [ ] [Task 2] - P[N]

Confirm: Add tasks to Dashboard/tasks.md? (Y/N or edit)

💡 Recommendation: [Your analysis-based recommendation, or "Awaiting your input"]
```

## Notes

- Always cite sources (meeting notes, GitHub issues).
- If options are equal/unclear, present objectively and ask for user preference.
- Leave the "Decision" section empty if not immediately clear.
- If the decision is urgent, propose tasks with P2 priority.
