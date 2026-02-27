---
name: today
description: Morning daily planning - fill journal, review Todoist, plan focus items
---

# Plan Today

You are helping the user plan their day each morning through an interactive flow that fills their Obsidian daily journal and organizes Todoist tasks.

## Input

The user invokes this skill (typically in the morning) without arguments.

## Speed Principles

This skill should be FAST. Minimize round-trips:
- **Max 3 interactive rounds** (personal questions -> calendar + triage -> focus confirmation)
- **All data fetched before asking anything** - no mid-conversation fetches visible to user
- **Recommendations only after seeing calendar** - never suggest focus tasks without knowing the meeting load

## Workflow

### Phase 1: Parallel Setup + Personal Questions

**1a. Fetch EVERYTHING in parallel before asking (no user interaction)**

Do ALL of these simultaneously:
- Check if `journals/YYYY/MM-Month/DD-MM-YYYY.md` exists (month folder format: `02-February`)
- Read yesterday's journal for hints (mood, energy, activities)
  - Extract "Tomorrow I start with" from yesterday's end-of-day section (if filled) -> use as first focus hint in Phase 3
- If today's journal doesn't exist, create it using the template (see `templates/daily-note.md`)
- If it exists, read it to see what's already filled
- **Todoist today + overdue**: `mcp__todoist__find-tasks-by-date` with `startDate: "today"`
- **Todoist inbox**: `mcp__todoist__find-tasks` for tasks without a project
- **Weekly P-Tasks**: Read `Dashboard/Weekly P-Tasks.md`, extract current week's section

Only AFTER all fetches complete, ask personal questions.

**1b. Ask personal questions in ONE AskUserQuestion (3-4 questions)**

Use yesterday's journal values as hints. This is the only personal question round.

**Questions** (3-4 in AskUserQuestion):

1. **Mood** (1-10): "How are you feeling today? (mood 1-10)"
   - Hint with yesterday's mood if available
   - Options: "3-4 (rough)", "5-6 (okay)", "7-8 (good)", "9-10 (great)"

2. **Energy** (1-10): "What's your energy level? (1-10)"
   - Hint with yesterday's energy if available
   - Options: "3-4 (low)", "5-6 (medium)", "7-8 (high)", "9-10 (full power)"

3. **Self-care**: "What did you do for yourself before work?"
   - Options: "Exercise / run", "Walk", "Nothing special", Other (free text)

4. **Yesterday evening**: "How was yesterday after work?"
   - Options: "Relaxing, no stress", "Active (workout / outing)", "Stressful / tough", Other (free text)

**After receiving answers:**
- Update frontmatter `mood` and `energy`
- Fill yesterday and today personal sections in the journal
- If mood < 6 or energy < 6: set `low_energy = true`

### Phase 2: Data Overview + Calendar (1 dedicated round)

**2a. Present all fetched data + ask for calendar**

Show pre-fetched data and ask for the calendar:

```
Data ready - paste your calendar screenshot (and note what to do with overdue/inbox):

---
📋 Todoist - Today (N):
- [task] (p1)
- [task] (p3)

⏰ Overdue (N):
- [task] (due Monday) - today / this week / next week / delete?

📥 Inbox (N):
- [task] - assign to project / delete?

📅 P-Tasks this week:
P1: [task] [status]
P2: [task] [status]
...
```

Wait for: calendar screenshot + triage decisions in one message.

**2b. After receiving calendar + triage decisions:**
- Analyze calendar: extract meetings, calculate total meeting time, calculate focus time, flag if >50% day in meetings
- Execute triage immediately (reschedule/move/delete via Todoist MCP)

### Phase 3: Focus Planning + Confirmation (1 round-trip)

**3a. Synthesize daily plan**

Based on all context (mood/energy, calendar, Todoist, P-Tasks):

**Suggest max 3 focus items** for "My focus today (max 3)":
- If yesterday's end-of-day "Tomorrow I start with" was filled: use it as the **first suggested focus item**
- Prioritize: hard deadlines > P1 tasks > meetings needing prep > P2 tasks > overdue
- Focus items = outcome-oriented (what you'll FINISH, not just work on)

**Suggest Todoist priority assignments with strict limits:**
- **Max 1 task at P1** (Todoist `p1`) - the ONE most critical thing
- **Max 2 tasks at P2** (Todoist `p1`) - high priority
- **Max 3 tasks at P3** (Todoist `p2`) - medium
- **Everything else at P4** (Todoist `p3`/`p4`)

**Capacity check:**
- `low_energy`: max 2 focus items
- >50% meetings: reduce focus count
- Both: 1 focus item only

**Present:**

```
Plan for today:

Available focus time: ~Xh (N meetings, Zh total)
Energy: Z/10 | Mood: W/10

Focus (max 3):
1. [Focus item 1] - hard deadline
2. [Focus item 2]
3. [Focus item 3]

Todoist priorities:
- P1 (max 1): [most critical task]
- P2 (max 2): [task], [task]
- P3 (max 3): [task], [task], [task]
- P4 (rest): [task], [task]

Anything to change? If OK, I'll update Todoist and the journal.
```

**3b. User confirms**

If user adds too many items, challenge:
```
You have ~Xh of deep work time and Y tasks. That's ambitious.
Which are truly critical for TODAY? The rest can wait.
```

### Phase 4: Execute Updates (no interaction)

After confirmation, do ALL in parallel:

**Todoist updates:**
- Reprioritize existing tasks: `mcp__todoist__update-tasks`
- Create new tasks for P-task work not in Todoist:
  - Project and section per `shared/todoist-config.md`
  - Due: today
  - Priority: as confirmed (respecting limits)
- Execute any remaining triage from Phase 2

**Journal update:**
- Fill "My focus today (max 3)" with confirmed items
- Mark `[x] Tasks for today are planned and prioritized in Todoist.`
- Ensure frontmatter `mood` and `energy` are set

### Phase 5: Summary

```
Planning done - [Day of week] [Date]

Mood: X/10 | Energy: Y/10
Focus time: ~Zh | Meetings: N

Focus:
1. [item]
2. [item]
3. [item]

Todoist: N tasks with priorities
- P1: [task]
- P2: [task], [task]
- P3: [task], [task], [task]
- P4: N others

Overdue: N rescheduled | Inbox: N sorted

Updated: journals/YYYY/MM-Month/DD-MM-YYYY.md

---
🌙 End of day - update your journal:
- ✅ Today I finished: [what you actually completed]
- ➡️ Tomorrow I start with: [one starting point]
- 🔒 Work closed.
```

---

## Priority Limits (STRICT)

Daily Todoist task priorities:

| Priority | Max tasks | Todoist value | Description |
|----------|-----------|---------------|-------------|
| P1 | 1 | `p1` | THE one most critical task |
| P2 | 2 | `p1` | High priority |
| P3 | 3 | `p2` | Medium priority |
| P4 | unlimited | `p3`/`p4` | Everything else |

**NEVER exceed these limits.** If user wants more P1/P2 tasks, challenge them to pick.

---

## Error Recovery

### If Todoist MCP fails
- Continue with calendar + P-Tasks only
- Note skipped steps, suggest manual Todoist check

### If journal has unexpected format
- Don't overwrite filled sections
- Only fill empty sections
- Mention pre-filled sections

### If no yesterday's journal
- Use generic hints

---

## Notes

### Capacity Rules
- Energy < 6 OR mood < 6: max 2 focus items
- Calendar >50% meetings: reduce focus count
- Both: 1 focus item only
- Declining energy trend (last 2-3 days): flag burnout risk

### Todoist IDs

See [shared/todoist-config.md](../shared/todoist-config.md).
