# Skill Debugging

## Frontmatter Validation

Supported fields in SKILL.md: `name`, `description`, `argument-hint`, `compatibility`, `disable-model-invocation`, `license`, `metadata`, `user-invokable`

`tags` is NOT supported - remove from all skill frontmatters.

## Common Skill Issues

### /today
- If Todoist section is missing: check IDs in shared/todoist-config.md
- If journal file doesn't exist: create it from the template in `templates/daily-note.md`
- If Inbox/ folder exists: check for unprocessed notes and mention count

### /weekly-plan
- If Todoist section is missing: check IDs in shared/todoist-config.md
- If Weekly P-Tasks.md is empty: initialize with current week header
- Two-step Todoist pattern: create parents first, then subtasks with parentId from response
- See shared/todoist-patterns.md for batch size and priority mapping

### /meeting
- Always check `Meetings/` folder for duplicates before creating new note
- Meeting note format: `YYYY-MM-DD - [Title].md` in `Meetings/`
- Cross-reference attendees with `Dashboard/people-profiles.md`

### /decision
- Decision note goes in `Loose Notes/Work/` with format `YYYY-MM-DD - Decision - [topic].md`
- Link it in: (1) today's journal under "Notes", (2) relevant project working file if applicable
- Todoist tasks require confirmation before creation

### /process-inbox
- If Inbox/ folder doesn't exist: tell user to create it or run /personalize
- Routing destinations: Meetings/, Loose Notes/Work/, Projects/
- Always confirm routing table before moving files
- Link moved files in today's journal under "Notes"

### /end-of-day
- If journal doesn't exist: create from template before filling End of Day section
- Don't overwrite existing End of Day content - only fill empty fields
- Check Inbox/ for unprocessed notes if folder exists

### /slack-thread
- Save notes in `Loose Notes/Work/YYYY-MM-DD - Slack Thread - [Topic].md`
- Slack formatting: `*bold*` (single asterisk), `-` for bullets, `:emoji:` format
- Check people-profiles.md for recipient communication preferences

## Skills Path

Skills: `.claude/skills/[skill-name]/SKILL.md`
Shared: `.claude/skills/shared/` (todoist-config.md, todoist-patterns.md, skill-debugging.md)
