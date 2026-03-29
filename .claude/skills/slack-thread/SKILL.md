---
name: slack-thread
description: Analyze pasted Slack conversations - extract decisions, draft responses, save notes, create tasks
argument-hint: "[pasted conversation or context about what to do with it]"
---

# Process Slack Thread

You are helping process a pasted Slack conversation into structured outputs: analysis, decisions, response drafts, notes, and tasks.

## Input

The user will paste a Slack conversation via `$ARGUMENTS` or in the message body. They may also add context like:
- "help me answer" - they want a response draft
- "save this" / "document this" - they want a note
- "analyze" - they want decisions/action items extracted
- No specific ask - auto-detect what's useful (analyze + propose outputs)

## Workflow

### Step 1: Parse the conversation

- Identify participants (cross-reference with `Dashboard/people-profiles.md` for tags and roles)
- Identify the topic and which projects it may relate to (check `Projects/` folder if it exists)
- Extract: decisions made, action items, open questions, key context

### Step 2: Determine what the user needs

Based on their request or auto-detection:

| Signal | Action |
|--------|--------|
| "help me answer" / "draft response" / "reply" | Draft a response (Step 3a) |
| "save" / "document" / "record" | Save as note (Step 3b) |
| "analyze" / "what should I do" | Full analysis (Step 3c) |
| "make a decision" | Redirect to `/decision` skill |
| No specific ask | Do Step 3c (full analysis) and ask what else they need |

### Step 3a: Draft a response

- Read `Dashboard/people-profiles.md` for recipient communication style
- Follow Slack formatting rules from CLAUDE.md (single `*bold*`, `-` bullets, `:emoji:`)
- Match the tone and depth to the audience and thread context
- Present the draft ready to copy-paste

### Step 3b: Save as note

- Create: `Loose Notes/Work/YYYY-MM-DD - Slack Thread - [Topic].md`
- Structure:

```markdown
---
tags: LooseNotes
date: YYYY-MM-DD
---
# Slack Thread: [Topic]

**Channel/DM**: [if known]
**Participants**: [names with #tags]
**Date**: YYYY-MM-DD

---

## Context
[Brief context - what triggered this conversation]

## Key Points
- [Point 1]
- [Point 2]

## Decisions
- [Decision 1]
- [Decision 2]

## Action Items
- [ ] [Action] - [Owner] - [Deadline if mentioned]

## Open Questions
- [Question 1]

## Related
- [[related-project-or-note]]
```

- Link in today's journal under "Notes" section

### Step 3c: Full analysis

Provide structured output:

```
Thread: [Topic summary in one line]
Participants: [Names]

Decisions:
- [Decision 1]
- [Decision 2]

Action items for you:
1. [Action] - [Deadline if mentioned]
2. [Action]

Action items for others:
- [Person]: [Action]

Open questions:
- [Question]
```

Then ask:
- "Want me to save this as a note?"
- "Want me to draft a response?"
- "Should I propose Todoist tasks for your action items?"

### Step 4: Propose Todoist tasks (if applicable)

- **Only for the user's own action items** - skip tasks for others
- Present as a numbered list and **wait for confirmation before creating**
- Follow shared Todoist patterns (see `shared/todoist-patterns.md` for rules)
- Use project/section from `shared/todoist-config.md`

### Step 5: Offer follow-ups

If the conversation relates to a project in Projects/, offer to update the working file with decisions or action items.

## Post-send Flow

If the user later pastes back "here is my final message" or "here is what I sent":
- Update the existing note (if one was created) with the final sent message
- Or create a new note if none exists
- Link in journal if not already linked

## Output Format

Adapt to what was requested. Always end with:
```
What else? (save note / draft response / propose tasks)
```

## Notes

- Always verify people names against `Dashboard/people-profiles.md`
- Slack formatting: `*bold*` not `**bold**`, `-` for bullets
- Don't create tasks without confirmation
- If the thread is about a decision, suggest using `/decision` for a full decision note
- This skill works without Todoist MCP - just skip task creation steps
