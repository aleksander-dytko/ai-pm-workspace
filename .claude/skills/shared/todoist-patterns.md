# Todoist Patterns

## Confirmation Rule (CRITICAL)

**NEVER create, complete, reschedule, or delete tasks without explicit user confirmation.** This applies to ALL skills and ad-hoc interactions.

- Present proposed changes as a **numbered list**
- Wait for the user to confirm (e.g., "yes", "1,3,5", "all", "skip 2")
- Only execute the confirmed items
- This is the single most important Todoist rule - violating it breaks user trust

## Task Creation Rules

- **Two-step pattern for parent/child tasks**: Always create parent tasks first, then children with `parentId` referencing the parent's returned ID. Never create parents and children in the same batch call.
- **Batch size limit**: Max 3-5 tasks per `add-tasks` call. Larger batches cause HTTP 400 errors. Split into multiple calls if needed.
- **Priority mapping** (P-Tasks to Todoist):
  - P1-P2 -> `"p1"`
  - P3 -> `"p2"`
  - P4-P5 -> `"p3"`
  - Stretch -> `"p4"`
- **dueString formats**: Use simple values: `"Monday"`, `"Tuesday"`, `"this week"`, `"Friday"`. Avoid complex formats.
- **Never set sectionId on subtasks** - doing so removes the `parentId` in Todoist, making them flat tasks. Subtasks inherit section from their parent automatically.

## Common Failures

- **HTTP 400 on add-tasks**: Reduce batch size. Split into 2-3 calls of 3-5 tasks each.
- **parentId not resolving**: Parent must be created in a PREVIOUS call. The ID comes from the API response - never guess it.
- **Section not found**: Verify section IDs in `shared/todoist-config.md`. Run `/personalize` to reconfigure if needed.

## Pattern that DOESN'T work

```json
[
  {"content": "Parent task", "projectId": "..."},
  {"content": "Subtask", "parentId": "UNKNOWN_ID", "projectId": "..."}
]
```

## Pattern that WORKS

```json
// Step 1: Create parent (one task)
{"content": "Parent task", "projectId": "[YOUR_PROJECT_ID]", "sectionId": "[YOUR_SECTION_ID]"}
// Response: {"id": "abc123"}

// Step 2: Create children (can batch same-parent subtasks)
[
  {"content": "Subtask 1", "parentId": "abc123", "projectId": "[YOUR_PROJECT_ID]"},
  {"content": "Subtask 2", "parentId": "abc123", "projectId": "[YOUR_PROJECT_ID]"}
]
```

## Duplicate Task Cleanup

1. `mcp__todoist__find-tasks` with `sectionId` to list all tasks
2. Identify duplicates: same content, missing `parentId`, wrong `parentId`
3. `mcp__todoist__delete-object` with `type: "task"` and the task `id`
