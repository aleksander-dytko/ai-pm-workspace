---
name: weekly-plan
description: Plan weekly P-Tasks with Todoist sync and overplanning challenge
---

# Plan Weekly P-Tasks

You are helping plan the upcoming week's P-Tasks with Todoist integration and an overplanning challenge.

## Input

The user invokes this skill (typically on Sunday evening or Monday morning) without arguments, or provides context like "plan my week" or "review this week".

The user may:
- Let you suggest P-tasks based on context
- Propose their own P-task list for validation
- Provide calendar context (screenshot or text description)

## Workflow

### 1. Review previous week's outcomes

**Help user review last week BEFORE planning new week:**

- Read `Dashboard/Weekly P-Tasks.md`
- Check the most recent week's P-tasks
- If P-tasks don't have completion markers yet, prompt user to add them:

```
Last Week Review

Let's review your P-tasks from last week before planning this week:

P1: [Task description]
- Status? (Completed / Not completed / Partial)
- If completed: What were the results?
- If not completed: What blocked it?

P2: [Task description]
...
```

- Wait for user's review, then update `Dashboard/Weekly P-Tasks.md` with completion markers:
  - `✅` = completed (add note about results)
  - `🔄` = partial/carryover (add note about what's left)
  - `❌` = not started/deprioritized (add note about why)

- Calculate completion rate (completed / total) for use in overplanning check

### 2. Analyze recent daily notes

- Read **last 7 days** from `journals/YYYY/MM-Month/` (covers full previous week)
- Identify:
  - Carryover items mentioned but not completed
  - **Energy/mood patterns** (from frontmatter and content):
    - Declining trend? (e.g., 7/10 -> 5/10)
    - Mentions of overwork, burnout, feeling overwhelmed
  - Recurring themes or blockers
  - Weekly review notes (Friday entries)

**Capacity adjustment**:
- If energy < 6/10 or declining trend: suggest 3-4 P-tasks max
- If "feeling overwhelmed" appears: reduce scope aggressively

### 3. Request calendar context (if not provided)

If user hasn't shared their calendar:
- Ask: "Can you share your calendar for this week or highlight key deadlines?"
- Look for:
  - Hard deadlines (presentations, demos, deliverables)
  - Meeting density (affects available focus time)
  - Time-sensitive milestones
- **If calendar shows >50% meeting time**: reduce P-task count and note reduced capacity

### 4. Check project working files (if Projects/ folder exists)

- Read files in `Projects/` folder
- Check "Action Items" sections for pending tasks
- Note upcoming milestones or deadlines
- Identify high-priority items from "Open Questions"

### 5. Review recent meetings for follow-ups

- Read the last 5 meeting notes from `Meetings/`
- Extract action items assigned to the user that haven't been completed
- Cross-reference with Todoist to find action items not yet tracked
- Flag missing items for inclusion in the weekly plan

### 6. Read Todoist (via MCP) - three buckets

Read all three sources in parallel:

1. **Inbox** - tasks without a project or section assignment
2. **This week section** - leftover tasks from previous week (see `shared/todoist-config.md` for section ID)
3. **Backlog section** - full backlog; flag items older than 4 weeks with no due date as stale

Also note: overdue tasks (any project), tasks due this week.

### 6b. Triage phase - execute immediately, before planning

**Goal**: Inbox empty, This Week and Backlog sections contain only intentional tasks.

Present a triage table for each bucket:

```
Inbox (N tasks)
-> "Book train tickets"          This week - urgent
-> "Some stale task from 6 weeks ago" Delete - stale, no longer relevant

This Week leftovers (N tasks)
-> "Write performance review"    Keep - still relevant
-> "Old follow-up from last month" Delete - stale

Backlog candidates (top 5 relevant to this week's themes)
-> "Follow up with X on metrics"  Promote - blocks work this week
-> "Scope workshop with Y"        Stay in backlog - not this week

Stale backlog (items 4+ weeks old, no activity)
-> "Old task from 8 weeks ago"    Delete? - no recent activity
```

For each item, suggest an action. Wait for user to confirm or override, then **execute the moves immediately** using `update-tasks` (to move sections) or `delete-object`. Do NOT wait until the end.

After triage: inbox must be empty. Confirm: "Triage complete - inbox empty, X tasks moved, Y deleted."

### 7. Suggest or validate P-tasks + standalone tasks

**Two outputs from this step: P-tasks AND standalone tasks.**

#### P-tasks (3-5, require subtasks)

**If user already proposed tasks**:
- Validate their list against context (completion rate, calendar, energy)
- Proceed to Step 8 for quality validation

**If user wants suggestions**:
- Draft 3-5 P-tasks based on:
  - Carryover from last week (uncompleted items)
  - Project priorities (from working files in Projects/)
  - Meeting follow-ups (action items not yet in Todoist)
  - Triage promotions (items flagged during triage)
  - Calendar deadlines
- Prioritize using P1-P5 system:
  - **P1**: Critical, must be done this week (1-2 items max)
  - **P2**: High priority, significant impact (1-2 items)
  - **P3**: Medium priority, should be done (1-2 items)
  - **P4**: Low priority, nice to have (0-1 items)
  - **P5**: Optional, time permitting (0-1 items)

#### Standalone tasks (self-contained, no subtasks needed)

Suggest 3-6 standalone tasks from:
- Triage promotions flagged as "this week"
- Meeting follow-ups too small for a P-task
- Backlog candidates matched to this week's themes
- Overdue tasks that need resolution

**Assign each standalone task a specific day** based on:
- Calendar (avoid heavy meeting blocks for deep work)
- P-task load per day
- Urgency and deadlines

**Do NOT include standalone tasks in Weekly P-Tasks.md or Slack format.** They go to Todoist only with specific due dates.

### 8. Validate task quality

**Check each P-task against the quality checklist** (see [quality-checklist.md](quality-checklist.md)):

Good P-task qualities:
- Marks a clear, measurable result (not vague)
- Specific action verb ("Draft", "Create", "Share", not "Work on", "Think about")
- Noteworthy (not routine)
- Requires active effort (not automatic)
- Independently achievable (not grouped)

Red flags to fix:
- Vague verbs: "work on", "think about", "look into"
- Too small: "send email", "schedule meeting"
- Grouped: "create X and Y" (should be separate)
- No clear completion: "improve X" (improve how?)

If you spot red flags, suggest improvements and ask 3-5 focused clarification questions about unclear tasks.

### 9. Overplanning challenge

After quality validation, check for overplanning:

- If P-tasks > 5, flag it (target: 3-5)
- If standalone tasks > 8, flag it (target: 3-6)
- If last week's completion rate was < 60%, flag it
- If energy is declining or < 6/10, flag it
- If calendar shows >50% meetings, flag it

Present this message if any flag triggers:

```
OVERPLANNING ALERT

Evidence:
- Last week's completion rate: [X]%
- Current suggestion: [N] P-tasks
- Energy this week: [Y]/10 [declining/stable/improving]
- Calendar: [% meetings] meeting time

Recommendation:
Which 3-5 tasks are truly CRITICAL this week?
What can realistically move to next week or backlog?
```

Ask user to trim the list before finalizing.

### 10. Break down P-tasks into subtasks

For each P-task, identify 2-5 concrete, actionable subtasks:

- Use action verbs: "Draft", "Review", "Share", "Test", "Create"
- Make subtasks specific and measurable
- Assign due dates to subtasks spread across the week

Mark stretch goals explicitly with "(stretch)" and lower Todoist priority.

### 11. Present complete plan for approval

**MANDATORY - do NOT proceed to Todoist or file updates without explicit user approval.**

Present:

1. **P-tasks + subtasks table** - full breakdown with due days
2. **Standalone tasks** - with assigned days
3. **Obsidian format** (P-tasks only - preview of what goes into Weekly P-Tasks.md)
4. **Slack format** (P-tasks only, no links, no internal context)

Ask: **"Does this look good? I'll update Weekly P-Tasks.md and push to Todoist once you confirm."**

Wait for explicit approval before proceeding.

### 12. Create Todoist tasks

**Use the two-step pattern from shared/todoist-patterns.md:**

1. Create each parent P-task individually to capture the returned task ID
2. Create subtasks with `parentId` referencing the parent's ID
3. Create standalone tasks with specific due dates (no subtasks, no parentId)

Configuration: See [shared/todoist-config.md](../shared/todoist-config.md) for IDs.

### 13. Update Weekly P-Tasks.md

Insert the new week's P-tasks at the top of `Dashboard/Weekly P-Tasks.md`:

#### Obsidian format

```markdown
# Week of DD Month YYYY

P1: [Task description] - [[related-project-or-meeting]]
P2: [Task description]
P3: [Task description]
P4: [Task description]

**Notes:**
- [Key deadlines from calendar]
- [Capacity notes if reduced]
```

#### Slack format (for team sharing)

Strip all Obsidian links, internal context, implementation details. Task name + core action only:

```markdown
## Week of DD Month YYYY

P1: [Task description]
P2: [Task description]
P3: [Task description]
```

Tell user: "Here's the Slack-ready version you can share with your team."

### 14. Summary

```
Weekly planning complete!

Planning Summary:
- Tasks: [N] P-tasks with [M] subtasks + [K] standalone tasks
- Last week completion: [X]%
- Energy this week: [Y]/10
- Key deadlines: [List hard deadlines from calendar]
- Capacity note: [If reduced due to energy/meetings, state why]

Created in Todoist:
- [N] parent tasks with [M] subtasks
- [K] standalone tasks with specific due dates
- Due dates spread across the week

Outputs:
1. Updated Dashboard/Weekly P-Tasks.md
2. Created Todoist tasks with subtasks
3. Slack-ready version (see above)
```

## Error Recovery

### If Todoist MCP fails
- Continue with calendar + P-Tasks planning only
- Note skipped steps, suggest manual Todoist check
- Still create Weekly P-Tasks.md and Slack format

### If Weekly P-Tasks.md has unexpected format
- Don't overwrite existing content
- Add new week section at the top
- Preserve all previous weeks

### If no daily journals exist
- Skip energy/mood analysis
- Ask user directly about capacity

## Notes

- Spread Todoist due dates across the week (don't dump everything on Monday)
- Calendar context is critical - deadlines change everything
- This skill works without Todoist MCP (manual task management) - just skip Todoist steps
- See shared/todoist-patterns.md for Todoist reliability patterns
