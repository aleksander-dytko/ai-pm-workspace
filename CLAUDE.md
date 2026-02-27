# Claude Code Memory: AI PM Workspace

## Identity & Context

<!-- PERSONALIZE: Update these fields with your information. Run /personalize to do this interactively. -->

**Owner**: [YOUR NAME], [YOUR ROLE] at [YOUR COMPANY]
**Focus areas**: [YOUR PRODUCT AREAS - e.g., "Core Platform, API strategy, customer onboarding"]
**Vault purpose**: Personal PM workspace - private, never referenced externally

**Language**: English
<!-- If you work in multiple languages, specify rules here. Example:
- English: Work content, meetings, decisions, communications
- [Other language]: Personal reflections, emotional content
- NEVER mix languages within a note
-->

---

## Company Context

<!-- PERSONALIZE: Replace with your company and product context. This helps Claude understand your domain. -->

**What [YOUR COMPANY] does**: [Brief description of what your company does - 1-2 sentences]

**Target customers**: [Who your customers are - e.g., "Enterprise SaaS companies", "SMB retailers"]

**Core products**:
- **[Product 1]**: [Brief description]
- **[Product 2]**: [Brief description]

**Target users**:
- **[User type 1]**: [Brief description]
- **[User type 2]**: [Brief description]

---

## MCP Servers Available

<!-- These are configured via `claude mcp add` command, not stored in this file. -->
<!-- See setup/mcp-configs/ for setup instructions for each MCP server. -->

You have access to MCP servers configured in your Claude Code environment:

### Todoist MCP
**Use for**: Task management - creating, reading, completing tasks
**Work project structure**: Tasks go to the "[YOUR PROJECT]" project with a "[YOUR SECTION]" section
**Key operations**:
- Create follow-up tasks from meetings/decisions
- Read current workload for weekly planning
- Complete tasks programmatically
- Set priorities (P1-P4)

### GitHub MCP
**Use for**: Repository and issue management
**Key repos**:
- **[YOUR REPO]**: [Description - e.g., "Epic tracking issues"]

**Key operations**:
- Check implementation status on epics
- Read engineering comments on issues
- Find related PRs

<!-- OPTIONAL MCPs - uncomment and configure if you use these:

### [Domain Docs MCP]
**Use for**: Product documentation lookup
**Key operations**:
- Understanding current product behavior
- Referencing APIs and features

### Notion MCP
**Use for**: Personal/private notes
**Restriction**: Personal reflection only, never in work skills

-->

---

## Vault Structure & Conventions

### Folder organization

```
/
├── Dashboard/             # Living documents (updated frequently)
│   ├── Weekly P-Tasks.md  # Weekly priority tasks (P1-P5)
│   └── people-profiles.md # Stakeholder communication profiles
├── journals/              # Daily notes (YYYY/MM-Month/DD-MM-YYYY.md)
├── Loose Notes/
│   └── Work/              # Work notes, drafts, decisions
├── Meetings/              # Meeting notes
├── templates/             # Note templates
└── CLAUDE.md              # This file
```

### Naming conventions

| Type | Format | Example | Location |
|------|--------|---------|----------|
| Daily note | `DD-MM-YYYY.md` | `14-02-2026.md` | `journals/2026/02-February/` |
| Work note | `YYYY-MM-DD - Title.md` | `2026-02-14 - Decision - API scope.md` | `Loose Notes/Work/` |
| Meeting note | `YYYY-MM-DD - Meeting description.md` | `2026-02-14 - Customer sync.md` | `Meetings/` |

### P-Tasks system
**Purpose**: Weekly priorities tracked in `Dashboard/Weekly P-Tasks.md`
**Priority levels**: P1 (critical) -> P5 (optional)
**Status markers** (added during Friday review):
- `✅` - Done
- `🔄` - Carried over to next week
- `❌` - Not done / deprioritized

### Tags
- `DailyNote` - Daily journal entries
- `LooseNotes` - General notes
- `MeetingNotes` - Meeting records
<!-- Add your own tags: people tags (#PersonName), customer tags (#CustomerName), etc. -->

---

## Task Cadence

| Frequency | Tasks | Skills to use |
|-----------|-------|---------------|
| **Daily** | Morning planning, meeting notes, decisions, communications | `/today`, `/meeting`, `/decision`, `/communicate` |
| **Weekly** | P-Tasks planning, initiative status checks | `/weekly-plan` (build your own) |
| **Monthly** | Reflection, progress review | Custom agent (build your own) |

---

## People & Communication Context

**Reference**: `Dashboard/people-profiles.md` for communication preferences and working styles of key stakeholders.

<!-- PERSONALIZE: Adjust these audience types to match your organization -->

**Communication tone guidance**:
- **Engineering teams**: Technical, specific, actionable (include links to specs, APIs, issues)
- **Design teams**: User-focused, visual references, customer context
- **Leadership**: Strategic, metrics-driven, concise, aligned with company goals
- **Customers**: Professional, benefits-focused, clear ROI, no internal jargon

**Slack markdown formatting**:
- **Bold**: Use `*text*` (single asterisk), NOT `**text**`
- **Bullets**: Use `-` for bullets
- **Emoji**: Use `:emoji_name:` format

---

## Privacy Rules

1. **NEVER reference this vault** in shared repositories or documents
2. **NEVER commit vault content** to other repos
3. **NEVER expose personal content** in work outputs

---

## Available Skills

| Skill | Command | When to use | MCPs used |
|-------|---------|-------------|-----------|
| **Plan Today** | `/today` | Morning daily planning and journal fill | Todoist |
| **Process Meeting** | `/meeting` | Process raw meeting notes into structured notes | Todoist |
| **Make Decision** | `/decision` | When making product decisions | GitHub, Todoist |
| **Draft Communication** | `/communicate` | Writing Slack messages, emails, updates | - |
| **Personalize** | `/personalize` | Initial setup - customize this workspace to your needs | - |

### Skills you can build (examples in README):

| Skill | Purpose |
|-------|---------|
| `/weekly-plan` | Sunday/Monday weekly planning with overplanning challenge |
| `/initiative` | Track initiative status from external repos |
| `/reflect` | Personal reflection agent (privacy-bounded) |

---

## Key Files to Understand

| File | Purpose |
|------|---------|
| `Dashboard/Weekly P-Tasks.md` | Weekly priorities (P1-P5), reviewed at week's end |
| `Dashboard/people-profiles.md` | Stakeholder communication profiles and working styles |

---

## How AI Should Work with This Vault

### Do
- When analyzing journals, look for **patterns across days**, not individual entries
- Be specific and direct - reference concrete notes and patterns
- When creating notes, follow existing naming conventions and use appropriate templates
- Link new notes in today's journal (`journals/YYYY/MM-Month/DD-MM-YYYY.md`)
- When creating work notes, save in `Loose Notes/Work/` and link from daily note

### Don't
- Don't give generic productivity advice - be specific to documented patterns
- Don't create files outside the established folder structure
- Don't assume empty daily note fields mean a bad day
- Don't write to external repositories from this vault

---

## Daily Notes Structure

Daily notes follow the template in `templates/daily-note.md`:

**Sections**:
- **Yesterday**: What happened, energy tracking
- **Today**: Mood, self-care, focus (max 3 items), Todoist tasks
- **Notes**: Links to meeting notes and loose notes created that day
- **End of Day**: What was completed, what to start with tomorrow

**Frontmatter**: Includes `energy` and `mood` fields for quantitative tracking.

---

## Todoist Integration

Tasks created by Claude skills go to:
- **Project**: "[YOUR PROJECT]"
- **Section**: "[YOUR SECTION]"
- **Priority**: Set based on urgency (P1-P4 in Todoist)

See `.claude/skills/shared/todoist-config.md` for project and section IDs.

---

## Important Patterns

### Overplanning tendency
**Pattern**: Many PMs plan too many tasks for the week, leading to disappointment.
**Solution**: When running weekly planning, if the list has more than 5-7 P-tasks or last week's completion rate was low, **challenge and ask to prioritize**. Remind: "Which 3-5 tasks are truly critical?"

### Meeting note enrichment
**Pattern**: Raw meeting notes need structure, context links, and action items extracted.
**Solution**: `/meeting` skill creates structured notes with decisions, action items (pushed to Todoist), and links to relevant context.

### Decision documentation
**Pattern**: Decisions happen in Slack or meetings but aren't always documented.
**Solution**: `/decision` skill creates structured decision notes, links them in the daily journal.
