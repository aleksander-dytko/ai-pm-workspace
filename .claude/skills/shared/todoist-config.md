# Todoist Configuration

Shared IDs and conventions used across all skills that interact with Todoist.

<!-- PERSONALIZE: Run /personalize to fill these in automatically, or update manually. -->

## Work Project

- **Project name**: [YOUR PROJECT NAME]
- **Project ID**: `[YOUR PROJECT ID]`

## Sections

### Active / This Week
Used by `/today` and `/weekly-plan` for current tasks and weekly P-tasks.

- **Section name**: [YOUR ACTIVE SECTION NAME]
- **Section ID**: `[YOUR ACTIVE SECTION ID]`

### Backlog
Used by `/weekly-plan` for triaging deferred tasks. Optional - if you don't use a separate backlog section, leave blank and `/weekly-plan` will use the active section only.

- **Section name**: [YOUR BACKLOG SECTION NAME]
- **Section ID**: `[YOUR BACKLOG SECTION ID]`

## Task Creation Rules

- All tasks created by skills go to the project and active section above
- Set priority based on urgency: P1 (urgent), P2 (high), P3 (medium), P4 (default)
- Two-step creation for parent/child tasks: create parents first, then children with `parentId`
- Batch size: max 3-5 tasks per call to avoid HTTP 400 errors

## How to Find Your IDs

1. Run Claude Code with Todoist MCP configured
2. Ask: "List my Todoist projects" - find your work project ID
3. Ask: "List sections in project [ID]" - find your section IDs
4. Update this file with the IDs

Or run `/personalize` which does this automatically.

## JSON Template

```json
{
  "projectId": "[YOUR PROJECT ID]",
  "activeSectionId": "[YOUR ACTIVE SECTION ID]",
  "backlogSectionId": "[YOUR BACKLOG SECTION ID]"
}
```
