---
tags: Dashboard
updated: 2026-04-20
---

# Tasks

In-repo task list. Skills write here automatically; you can also edit by hand.

Format: `- [ ] Task description - source: [[note title]] - due: YYYY-MM-DD - priority: P1-P4`

Priority is optional. Source link is optional. Due date is optional.

When a task is done, replace `[ ]` with `[x]` or delete the line. Skills will not touch completed or deleted tasks.

---

## This week

<!-- Active tasks for the current week. Skills add tasks here by default. -->

## Next

<!-- Tasks you intend to do but not this week. -->

## Backlog

<!-- Not scheduled. Review during /weekly-plan. -->

---

## How skills write here

- `/meeting` adds your action items to **This week** (with a `source:` link back to the meeting note).
- `/decision` adds follow-up tasks to **This week**.
- `/today` reviews **This week** each morning.
- `/weekly-plan` triages between the three sections each Monday.

You can change where skills write by editing their `SKILL.md` files.

## Syncing to Todoist (optional)

This template is Todoist-free by default so you can get started without any external task manager. If you later want to sync this file to Todoist, add the Todoist MCP (`claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp`) and ask Claude to update the skills to mirror tasks into Todoist.
