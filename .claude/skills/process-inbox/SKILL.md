---
name: process-inbox
description: Route notes from Inbox/ to the correct destination folder with proper naming
---

# Process Inbox

You help route quick-capture notes from the `Inbox/` folder to their correct destination with proper naming conventions and journal linking.

## Input

User invokes `/process-inbox` without arguments. The skill processes all files currently in `Inbox/`.

## Workflow

### Step 1: Scan Inbox/

- List all files in `Inbox/` (excluding `.gitkeep`)
- If empty: report "Inbox is empty - nothing to process." and exit
- Show count: "Found [N] notes in Inbox/"

### Step 2: Analyze each note

Read the content of each file and classify based on patterns:

| Content Pattern | Suggested Destination | New Filename Format |
|----------------|----------------------|---------------------|
| Contains attendees, agenda, action items, meeting context | `Meetings/` | `YYYY-MM-DD - [Title].md` |
| Contains options, trade-offs, rationale, "decided" | `Loose Notes/Work/` | `YYYY-MM-DD - Decision - [Topic].md` |
| Contains project status, milestones, blockers, ongoing work | `Projects/` | Append to existing `[project-name].md` or create new |
| General work note, idea, draft | `Loose Notes/Work/` | `YYYY-MM-DD - [Title].md` |

**Classification hints**:
- If the file has frontmatter with `tags: [MeetingNotes]` -> Meetings/
- If the file has frontmatter with `tags: [Project]` -> Projects/
- If the filename contains "meeting" or "sync" or "standup" -> Meetings/
- If the filename contains "decision" -> Loose Notes/Work/ with Decision prefix
- When in doubt, default to Loose Notes/Work/

### Step 3: Present routing table

Show a single table with all routing proposals:

```
Inbox Processing - [N] notes

#  | Current File              | Destination         | New Name                                  | Confidence
1  | quick-meeting-notes.md    | Meetings/           | 2026-03-15 - Product Sync.md              | High
2  | api-thoughts.md           | Loose Notes/Work/   | 2026-03-15 - API Design Notes.md          | Medium
3  | project-x-update.md       | Projects/           | Append to project-x.md                    | High
4  | random-idea.md            | Loose Notes/Work/   | 2026-03-15 - Feature Idea - Search.md     | Low

Confirm routing? You can override any line (e.g., "2 -> Meetings/", "4 -> delete")
```

Wait for user confirmation. Accept:
- "yes" / "all" - execute all as proposed
- "1,2,3" - execute specific items only
- "2 -> Meetings/" - override destination for specific items
- "4 -> delete" - delete the file instead of routing

### Step 4: Execute moves

For each confirmed item:

1. **If routing to Meetings/ or Loose Notes/Work/**:
   - Read the file content
   - Create new file at destination with proper naming
   - Ensure the file has appropriate frontmatter (add if missing):
     - Meetings/: `tags: [MeetingNotes]`, `date: YYYY-MM-DD`
     - Loose Notes/Work/: `tags: [LooseNotes]`, `date: YYYY-MM-DD`
   - Delete the original from Inbox/

2. **If routing to Projects/ (append)**:
   - Read the inbox file content
   - Read the target project file
   - Append the new content under the "Notes" section of the project file
   - Add a date header: `### YYYY-MM-DD - [Brief Title]`
   - Delete the original from Inbox/

3. **If routing to Projects/ (new project)**:
   - Create new file using `templates/project-working-file.md` template
   - Fill in the content from the inbox note
   - Delete the original from Inbox/

4. **Link each moved file in today's journal** under the "Notes" section

### Step 5: Summary

```
Inbox processed!

Routed [N] notes:
- [X] to Meetings/
- [Y] to Loose Notes/Work/
- [Z] to Projects/
- [D] deleted

Inbox is now empty.

All notes linked in today's journal.
```

## Error Recovery

### If Inbox/ folder doesn't exist
- Tell user: "No Inbox/ folder found. Create it manually or run /personalize to set it up."
- Exit gracefully

### If today's journal doesn't exist
- Create it from `templates/daily-note.md` before linking notes

### If a destination file already exists (name conflict)
- Append a number suffix: `YYYY-MM-DD - Title (2).md`
- Warn the user about the conflict

## Notes

- This skill does NOT use Todoist MCP - it's purely file organization
- The routing is heuristic-based - always present proposals for user confirmation
- If Projects/ folder doesn't exist, route all project-like notes to Loose Notes/Work/ instead
- Keep the interaction to 2 rounds max: present table -> execute
- The Inbox/ folder should be empty after processing - that's the goal
