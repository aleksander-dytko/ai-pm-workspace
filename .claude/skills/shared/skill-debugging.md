# Skill Debugging

## Frontmatter Validation

Supported fields in SKILL.md: `name`, `description`, `argument-hint`, `compatibility`, `disable-model-invocation`, `license`, `metadata`, `user-invokable`

`tags` is NOT supported - remove from all skill frontmatters.

## Common Skill Issues

### /today
- If journal file doesn't exist: create it from the template in `templates/daily-note.md`
- Morning mode fills focus items; evening mode fills the "End of Day" section and flags unprocessed meetings
- Tasks live in `Dashboard/tasks.md` (in-repo, no external task manager required)

### /weekly-plan
- If `Dashboard/Weekly P-Tasks.md` is empty: initialize with current week header
- Triage inputs come from `Dashboard/tasks.md` (section: Backlog / Next) and recent meeting action items
- P-Tasks go into `Dashboard/Weekly P-Tasks.md`; subtasks and standalone tasks go into `Dashboard/tasks.md` under "This week"

### /meeting
- Always check `Meetings/` folder for duplicates before creating new note
- Meeting note format: `YYYY-MM-DD - [Title].md` in `Meetings/`
- Cross-reference attendees with `Dashboard/people-profiles.md`
- Action items assigned to the user go to `Dashboard/tasks.md` under "This week" with a `source:` link back to the meeting note

### /decision
- Decision note goes in `Loose Notes/Work/` with format `YYYY-MM-DD - Decision - [topic].md`
- Link it in: (1) today's journal under "Notes", (2) relevant project working file if applicable
- Follow-up tasks go to `Dashboard/tasks.md` under "This week" with a `source:` link back to the decision note
- Always confirm tasks with the user before writing them

### /communicate
- Draft in the channel format the user selects: Slack (use `*bold*`, `-` bullets, `:emoji:`), email, or plain async update (doc / comment)
- Check `Dashboard/people-profiles.md` for recipient communication preferences

## Skills Path

Skills: `.claude/skills/[skill-name]/SKILL.md`
Shared: `.claude/skills/shared/` (skill-debugging.md)
