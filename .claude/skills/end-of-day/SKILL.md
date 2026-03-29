---
name: end-of-day
description: Evening journal close-out - fill End of Day section, flag unprocessed items, prep tomorrow
---

# End of Day - Evening Close-Out

You help the user close out their day: fill the "End of Day" section in their daily journal, surface any unprocessed meetings or inbox notes, and set up tomorrow's starting point.

## Input

User invokes `/end-of-day` in the evening, typically after finishing work. No arguments needed.

## Workflow

### Step 1: Parallel data gather (no user interaction yet)

Read ALL of these in parallel before asking any questions:

1. **Today's journal** - `journals/YYYY/MM-Month/DD-MM-YYYY.md`
   - What focus items were set in "My focus today"?
   - Is the "End of Day" section already partially filled?
   - What's the morning mood/energy score?
   - Check "Notes" section - which meetings/notes were already linked?

2. **Todoist today's tasks** - `mcp__todoist__find-tasks-by-date` with today's date
   - What was planned? Which tasks were completed vs. still open?

3. **Check for unprocessed items**:
   - Look in `Meetings/` for files matching today's date that appear unstructured (no "Decisions" section, no "Action Items" section)
   - If `Inbox/` folder exists: count files in it
   - If `Projects/` folder exists: note any recently modified project files

**Note**: If today's journal doesn't exist, create it from `templates/daily-note.md` before proceeding.

### Step 2: Ask ONE round of questions

Use `AskUserQuestion` with exactly 4 questions:

**Q1 - Energy and mood** (0-10 scale)
"How did you end the day? Energy (0-10) and mood (0-10)?"

**Q2 - What did you finish today?** (free text)
"What did you get done today? (can be brief)"
*(Suggest based on focus items that were set + Todoist completed tasks as hints)*

**Q3 - What will you start with tomorrow?** (free text)
"What's the first thing you'll do tomorrow morning? (1 thing)"

**Q4 - Anything else to capture?** (optional free text)
"Anything on your mind you want to capture before closing?"
*(Optional - user can skip)*

### Step 3: Fill "End of Day" section

Update today's journal - find the "End of Day" section and fill it:

```markdown
## End of Day

- Energy: [Q1 energy]/10 | Mood: [Q1 mood]/10
- Today I finished:
  - [user's answer to Q2]
- Tomorrow I start with:
  - [user's answer to Q3]
- Work closed.
```

If Q4 had content, add it as a note at the bottom of the section.

Do NOT update the morning frontmatter `energy:` or `mood:` - these reflect start-of-day state.

### Step 4: Flag unprocessed items (if any)

If there are unprocessed meetings from today:
```
Unprocessed meetings from today:
- [Meeting 1 title] ([time or filename])
- [Meeting 2 title] ([time or filename])

Run /meeting to process them.
```

If Inbox/ has unprocessed notes:
```
Unprocessed inbox notes: [N] items
Run /process-inbox to route them.
```

If all items are processed - skip this step.

### Step 5: Summary

```
Day closed!

Today:
- Energy: [X]/10 | Mood: [Y]/10
- Done: [brief summary from Q2]
- Tomorrow starts with: [Q3 answer]

[If unprocessed meetings]: Remember to run /meeting for: [meeting names]
[If unprocessed inbox]: [N] notes in Inbox/ - run /process-inbox
```

## Error Recovery

### If Todoist MCP fails
- Continue without task completion data
- Ask user directly what they finished

### If journal has unexpected format
- Don't overwrite filled sections - only fill empty fields
- If End of Day section doesn't exist, append it at the bottom

### If no journal exists
- Create from template, then fill End of Day section

## Notes

- Keep the skill fast: max 2 rounds (data gather + 1 AskUserQuestion)
- Do NOT overwrite content already filled in End of Day - if partially filled, only add to empty fields
- The Inbox/ check is conditional - if the folder doesn't exist, skip silently
- This skill works without Todoist MCP - just skip the completed task hints
