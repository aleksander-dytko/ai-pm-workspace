---
name: decision
description: Make a product decision with full context from vault and available sources
argument-hint: "[decision topic]"
---

# Make a Product Decision

You are helping make a well-informed product decision by gathering context from all available sources and creating structured documentation.

## Input

The user will provide a decision topic/question via `$ARGUMENTS`. Examples:
- "should we support feature X in the next release"
- "prioritize feature A vs feature B"
- "should we use GraphQL for the new API"

## Workflow

1. **Search the Obsidian vault**:
   - Search recent meetings in `Meetings/` for prior discussions on this topic
   - Search daily notes in `journals/` (last 2 weeks) for related context
   - Search `Loose Notes/Work/` for related decisions or notes
   - Check `Dashboard/Weekly P-Tasks.md` for related priorities

2. **Use GitHub MCP** (if configured):
   - Search repositories for related issues/PRs
   - Read engineering comments and discussions to understand technical feasibility
   - Identify any blockers or concerns raised by engineering

3. **Ask for additional context** (before presenting options):
   - Ask the user: "Do you have a Slack thread, document, or discussion related to this decision? If yes, paste it now - I'll use it as additional context."
   - If user provides context: extract key opinions, concerns, constraints
   - If user skips: proceed without it

4. **Present context summary**:
   - Relevant notes and prior discussions found
   - Strategy alignment (if strategy docs exist in vault)
   - Customer data or validation (if any found)
   - Engineering discussions and feasibility (from GitHub)

5. **Draft options with trade-offs**:
   - List 2-3 viable options
   - For each option, provide:
     - Pros (benefits, alignment with goals, customer value)
     - Cons (costs, risks, complexity, timeline impact)
   - Don't recommend yet - present objectively

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
   [To be filled by user after review, or suggest recommendation if clear]

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
   - Add link in today's journal (`journals/YYYY/MM-Month/DD-MM-YYYY.md`) under `## Notes`

8. **Draft communication**:
   - Create a ready-to-post Slack message or email announcing the decision
   - Keep it concise (under 200 words)
   - Format: Context -> Decision -> Impact -> Next steps

9. **Propose Todoist follow-up tasks** (confirm before creating):
   - Identify tasks needed for implementing and communicating the decision
   - Show proposed task list to the user
   - Wait for confirmation before calling Todoist MCP
   - After confirmation: create tasks per `shared/todoist-config.md`

## Output Format

```
✅ Decision note created: [[YYYY-MM-DD - Decision - [Topic]]]
✅ Linked in today's journal

📊 Context gathered:
- [N] related notes/meetings found
- [N] GitHub issues/PRs reviewed

📝 Communication draft:
[Message ready to copy-paste]

📋 Proposed Todoist tasks:
- [ ] [Task 1] - P[N], due [date]
- [ ] [Task 2] - P[N]

Confirm: Add tasks to Todoist? (Y/N or edit the list)

💡 Recommendation: [Your analysis-based recommendation, or "Awaiting user input"]
```

## Notes

- Always cite sources (meeting notes, GitHub issues, etc.)
- If options are equal/unclear, present them objectively and ask for user preference
- Keep the "Decision" section empty if not immediately clear
- If the decision is urgent, mark Todoist tasks with P2 priority
