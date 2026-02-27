# Todoist MCP Setup

## Quick Setup

```bash
claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp
```

When you first use a Todoist tool, Claude Code will open a browser for OAuth authentication. Authorize access and you're set.

## What It Enables

With Todoist MCP, Claude Code can:
- **Read tasks**: Check today's tasks, overdue items, inbox
- **Create tasks**: Add tasks with priorities, due dates, projects, sections
- **Update tasks**: Reprioritize, reschedule, move between projects
- **Complete tasks**: Mark tasks as done
- **Search**: Find tasks by text, project, label, or date

## How Skills Use It

| Skill | Todoist operations |
|-------|-------------------|
| `/today` | Read today's tasks, triage overdue, set priorities |
| `/meeting` | Create follow-up tasks from action items |
| `/decision` | Create implementation and communication tasks |

## Configuration

After setup, run `/personalize` to configure your project and section IDs. Or update `.claude/skills/shared/todoist-config.md` manually.

## Troubleshooting

- **Auth expired**: Run `claude mcp remove todoist` then re-add it
- **HTTP 400 errors**: Batch size too large - skills limit to 3-5 tasks per call
- **Can't find project**: Use `mcp__todoist__find-projects` to list all projects
