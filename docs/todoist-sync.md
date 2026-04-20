# Optional: Syncing tasks to Todoist

This template ships Todoist-free so you can get started without any external task manager. If you already live in Todoist and want tasks to flow there automatically, you can wire it up yourself.

> This is a **user-maintained extension**, not a built-in feature. A polished built-in sync may land in v2.1.

## Quick recipe

1. Add the Todoist MCP:

    ```bash
    claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp
    ```

2. Open Claude Code in your workspace and ask:

    > "Read `.claude/skills/meeting/SKILL.md`, `.claude/skills/decision/SKILL.md`, and `.claude/skills/weekly-plan/SKILL.md`. Update them so that when a task is confirmed for `Dashboard/tasks.md`, an equivalent task is also created in Todoist via the Todoist MCP. Use a project called 'Work' by default; ask me if it doesn't exist. Keep the `Dashboard/tasks.md` writes as the source of truth."

3. Claude will edit each skill to add Todoist calls alongside the in-repo writes. Review the diffs before committing.

4. Run `/personalize --deep` to capture your Todoist project and section IDs once.

## What to expect

- `/meeting`, `/decision`, and `/weekly-plan` all create Todoist tasks after your confirmation (same as v1 behaviour).
- `Dashboard/tasks.md` remains the source of truth. If you delete a task from the Markdown file, Todoist is not automatically updated; if you complete a Todoist task, `Dashboard/tasks.md` is not automatically updated. Treat Todoist as a mirror for the mobile / cross-device surface.
- If you prefer bidirectional sync, that's a larger project. Consider building it as a separate skill (`/sync-todoist`) rather than baking it into every skill.

## Why this isn't a default

Feedback from the v1 rollout was that Todoist coupling got in the way of the first 5 minutes: setup required Todoist OAuth, project IDs, and section IDs before you could run any skill. v2 moves that friction to an opt-in extension so first-time users get a working setup in 3 minutes. You can opt in here whenever you're ready.
