# AI PM Workspace

This is the operating system for an AI-powered product management workspace. Claude Code reads this file at the start of every session so it knows who you are, how your vault is organized, and how to behave.

If you just cloned this repo, run `/personalize` to fill in your identity. Everything below is the template a fresh user sees.

## Identity & Context

<!-- PERSONALIZE: filled automatically by /personalize. -->

**Owner**: [YOUR NAME], [YOUR ROLE] at [YOUR COMPANY]
**Focus areas**: [YOUR PRODUCT AREAS - e.g., "Core Platform, API strategy, customer onboarding"]
**Vault purpose**: Personal PM workspace - private, never referenced externally

**Language**: English
<!-- If you work in multiple languages, specify rules here. Example:
- English: Work content, meetings, decisions, communications
- [Other language]: Personal notes, non-work content
- NEVER mix languages within a note
-->

---

## Company Context

<!-- PERSONALIZE: replaced by /personalize with your actual context. -->

**What [YOUR COMPANY] does**: [Brief description of what your company does - 1-2 sentences]

**Target customers**: [Who your customers are - e.g., "Enterprise SaaS companies", "SMB retailers"]

**Core products**:
- **[Product 1]**: [Brief description]
- **[Product 2]**: [Brief description]

**Target users**:
- **[User type 1]**: [Brief description]
- **[User type 2]**: [Brief description]

---

## How tasks live in this repo

Tasks live in [Dashboard/tasks.md](Dashboard/tasks.md) - a plain-markdown checklist with three sections:

- **This week** - what you've committed to.
- **Next** - intended soon, not this week.
- **Backlog** - unscheduled.

Skills write to `Dashboard/tasks.md` by default (no external task manager required). Each task line looks like:

```
- [ ] Action description - source: [[note title]] - due: YYYY-MM-DD - priority: P3
```

Priority, due date, and source are all optional.

**Optional Todoist sync**: If you prefer Todoist, follow `docs/todoist-sync.md` to wire it up. The default template works without it.

---

## MCP Servers Available

<!-- MCPs are configured via `claude mcp add`, not stored in this file. -->
<!-- See setup/mcp-configs/ for setup instructions for each MCP server. -->

### GitHub MCP (recommended)
**Use for**: Repository and issue management.
**Key operations**:
- Check implementation status on epics
- Read engineering comments on issues
- Find related PRs

### [Optional] Documentation MCP
<!-- If your company has a docs MCP (e.g., for public API docs), configure it and note it here. -->

### [Optional] Notion / Linear / Jira
<!-- If you use these tools, configure the respective MCP and note it here. /personalize --deep will help detect what you have. -->

---

## Vault Structure & Conventions

### Folder organization

```
/
|-- Dashboard/             # Living documents
|   |-- tasks.md           # In-repo task list (skills write here)
|   |-- Weekly P-Tasks.md  # Weekly priorities (P1-P5)
|   `-- people-profiles.md # Stakeholder communication profiles
|-- Initiatives/           # Working files for active initiatives (created by /personalize --deep)
|-- journals/              # Daily notes (YYYY/MM-Month/DD-MM-YYYY.md)
|-- Loose Notes/
|   `-- Work/              # Decisions, drafts, analysis
|-- Meetings/              # Meeting notes
|-- samples/               # Sample data for /guide modules
|-- templates/             # Note templates
|-- docs/                  # Reference docs (epic lifecycle, optional Todoist sync)
`-- CLAUDE.md              # This file
```

### Naming conventions

| Type | Format | Example | Location |
|------|--------|---------|----------|
| Daily note | `DD-MM-YYYY.md` | `14-02-2026.md` | `journals/2026/02-February/` |
| Work note | `YYYY-MM-DD - Title.md` | `2026-02-14 - Decision - API scope.md` | `Loose Notes/Work/` |
| Meeting note | `YYYY-MM-DD - Meeting description.md` | `2026-02-14 - Customer sync.md` | `Meetings/` |
| Initiative file | `[initiative-slug].md` | `billing-migration.md` | `Initiatives/` |

### P-Tasks system
**Purpose**: Weekly priorities tracked in `Dashboard/Weekly P-Tasks.md`.
**Priority levels**: P1 (critical) down to P5 (optional).
**Status markers** (added during Friday review):
- `✅` done
- `🔄` carried over
- `❌` not done / deprioritized

P-Tasks go into `Dashboard/Weekly P-Tasks.md`. Their subtasks and standalone tasks go into `Dashboard/tasks.md` under "This week".

### Tags
- `DailyNote` - daily journal entries
- `LooseNotes` - general notes
- `MeetingNotes` - meeting records
- `Initiative` - initiative working files
<!-- Add your own tags: people tags (#PersonName), customer tags (#CustomerName), etc. -->

---

## Task Cadence

| Frequency | Tasks | Skills to use |
|-----------|-------|---------------|
| **Daily** | Morning planning, evening close-out, meeting notes, decisions, communications | `/today`, `/meeting`, `/decision`, `/communicate` |
| **Weekly** | P-Tasks planning, triage of `Dashboard/tasks.md` | `/weekly-plan` |
| **Monthly** | Reflection, progress review | Custom agent (build your own) |

---

## People & Communication Context

**Reference**: `Dashboard/people-profiles.md` for communication preferences and working styles.

<!-- PERSONALIZE: adjust to match your organization. -->

**Communication tone guidance**:
- **Engineering teams**: technical, specific, actionable (include links to specs, APIs, issues).
- **Design teams**: user-focused, visual references, customer context.
- **Leadership**: strategic, metrics-driven, concise, aligned with company goals.
- **Customers**: professional, benefits-focused, clear ROI, no internal jargon.

**Slack markdown formatting**:
- Bold: `*text*` (single asterisk), NOT `**text**`
- Bullets: `-` for bullets
- Emoji: `:emoji_name:` format

---

## Interaction Rules

### Task-writing confirm-before-executing
- **Never write to `Dashboard/tasks.md` without showing the user the proposed list first.**
- Always present proposed new tasks as a numbered list so the user can respond with "1,3,5" for partial approval.
- Check for duplicate tasks (all three sections) before proposing new ones.

### Formatting
- **Never use the em-dash character (Unicode U+2014).** Always use a regular hyphen (`-`).
- **Slack**: single-asterisk bold (`*bold*`), `-` bullets, `:emoji_name:` format.

### Style
- Lead with the action or answer, not the reasoning.
- Don't summarize what you just did at the end of every response - the user can see the file diff.
- Batch questions when possible; avoid constant confirmation prompts.

---

## Privacy Rules

1. **Never reference this vault** in shared repositories or documents.
2. **Never commit vault content** to other repos.
3. **Never expose personal content** in work outputs.

---

## Quality standards for notes and artifacts

Adapted from shared PM quality practices. Apply to anything Claude generates in this vault.

### Every note
- **Lead with the result or recommendation**, not background.
- **Name the stakeholder / owner** of any follow-up action.
- **Cite sources** - wikilink related notes, link to external docs or issues.
- **Keep paragraphs short** - bullets over prose when it helps skimming.

### Decisions
- State the decision in one line at the top.
- List the 2-3 options considered with pros/cons, even if the chosen option is obvious.
- Record who was involved and what the blockers were.
- Always include a "Follow-up" section with concrete tasks (these become entries in `Dashboard/tasks.md`).

### Meeting notes
- Attendees tagged with `#FirstName`.
- Explicit "Decisions" and "Action Items" sections - not buried in prose.
- Action items have an owner and a deadline when mentioned.
- Tasks assigned to the owner of this vault (you) go into `Dashboard/tasks.md`; tasks assigned to others stay in the meeting note only.

### Communications
- Match tone to audience (see the table above).
- Under 200 words for Slack messages.
- Email: clear subject line, inverted-pyramid body.
- Never use internal jargon with customers.

---

## Available Skills

### Core daily (5)

| Skill | Command | When to use |
|-------|---------|-------------|
| **Plan Today** | `/today [morning \| evening]` | Morning focus planning or evening close-out. Merges the old `/end-of-day` ritual into one skill. |
| **Process Meeting** | `/meeting` | Turn raw meeting notes into a structured meeting note with action items. |
| **Make Decision** | `/decision [topic]` | Gather context, draft options with trade-offs, create a decision note. |
| **Draft Communication** | `/communicate [topic + audience + channel]` | Draft Slack, email, or async update. Tone matches audience. |
| **Plan Week** | `/weekly-plan` | Weekly P-Tasks planning with overplanning challenge and triage of `Dashboard/tasks.md`. |

### Onboarding (1)

| Skill | Command | When to use |
|-------|---------|-------------|
| **Personalize** | `/personalize [quick \| deep]` | Quick (3 min) or deep (10 min) setup. Quick fills identity; deep adds MCP detection, initiatives, and people profiles. |

### Skills you can build yourself (examples)

| Skill | Purpose |
|-------|---------|
| `/create-epic` | Turn an idea into a structured epic draft using `templates/epic-template.md`. |
| `/user-journey` | Build a persona-grounded user journey from a product flow. |
| `/competitive-research` | Produce a sourced competitive matrix. |
| `/health` | Vault health audit (unlinked notes, stale tasks, orphaned decisions). |

---

## How AI Should Work with This Vault

### Do
- Analyze journals for **patterns across days**, not individual entries.
- Be specific and direct - reference concrete notes and patterns.
- Follow existing naming conventions when creating notes.
- Link new notes in today's journal (`journals/YYYY/MM-Month/DD-MM-YYYY.md`) under `## Notes`.
- Write work notes in `Loose Notes/Work/`.
- Write new tasks to `Dashboard/tasks.md` under "This week" after user confirmation.

### Don't
- Don't give generic productivity advice - be specific to documented patterns.
- Don't create files outside the established folder structure.
- Don't assume empty daily note fields mean a bad day.
- Don't write to external repositories from this vault.
- Don't use em-dashes.
- Don't write tasks without confirming them with the user first.

---

## Daily Notes Structure

Daily notes follow the template in `templates/daily-note.md`:

- **Yesterday**: what happened, energy tracking
- **Today**: mood, self-care, focus (max 3 items), link to `Dashboard/tasks.md`
- **Notes**: links to meeting notes and loose notes created that day
- **End of Day**: what was completed, what to start with tomorrow

**Frontmatter**: includes `energy` and `mood` fields for quantitative tracking.

---

## Important Patterns

### Overplanning tendency
**Pattern**: Most PMs plan too many tasks for the week, leading to disappointment when not all are completed.
**Solution**: When running `/weekly-plan`, if the list has more than 5-7 P-tasks or last week's completion rate was low, challenge and ask to prioritize. Remind: "Which 3-5 tasks are truly critical?"

### Meeting note enrichment
**Pattern**: Raw meeting notes need structure, context links, and action items extracted.
**Solution**: `/meeting` creates structured notes with decisions, action items (added to `Dashboard/tasks.md` after confirmation), and links to related context.

### Decision documentation
**Pattern**: Decisions happen in Slack or meetings but aren't always documented.
**Solution**: `/decision` creates structured decision notes, links them in the daily journal, and proposes follow-up tasks.
