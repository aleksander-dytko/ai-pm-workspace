---
name: meeting
description: Process raw meeting notes into structured meeting note with Todoist tasks
argument-hint: "[meeting file path or 'browse']"
---

# Process Meeting Notes

You are helping process raw meeting notes into a structured meeting note with automatic Todoist task creation.

## Input Modes

The skill operates in one of three modes based on `$ARGUMENTS`:

| Mode | Arguments | When to use |
|------|-----------|-------------|
| **Browse** | (none) or `browse` | List recent files in `Meetings/` that look unprocessed |
| **Specific file** | File path or partial name | Process notes from a specific file |
| **Paste** | Pasted text (long string) | Meeting notes pasted directly into the prompt |

---

## Workflow

### Step 0: Determine mode and get raw notes

**If no arguments (Browse mode)**:
1. List files in `Meetings/` folder, sorted by date (newest first)
2. Check each file's content - identify files that appear to have raw/unstructured notes (no "## Decisions" section, no structured format)
3. Show numbered list of unprocessed files
4. Ask: "Which meeting do you want to process?" - wait for selection

**If specific file path**:
1. Read the file
2. If already structured (has Decisions, Action Items sections): warn user and ask to confirm before overwriting
3. If raw notes: proceed directly

**If pasted text**:
- Use the pasted text as raw input
- Ask for meeting date and title if not obvious from the text

---

### Step 1: Analyze raw notes

Read the raw notes and extract:
- **Meeting title** (from filename or content)
- **Date** (from filename or content)
- **Attendees** (mentioned names)
- **Key topics discussed**
- **Decisions made** (explicit or implicit)
- **Action items** (tasks, follow-ups, commitments with owners)
- **Open questions** (unresolved topics)

---

### Step 2: Cross-reference people with people-profiles.md

- Read `Dashboard/people-profiles.md` to verify attendee names and roles
- Use correct tags (e.g., `#PersonName`)
- Tag people when mentioned in meeting notes using `#Name` format

---

### Step 3: Search for related context

- Search `Loose Notes/Work/` for related decisions or notes (by keywords from the meeting)
- Search `Dashboard/Weekly P-Tasks.md` for related P-tasks
- Identify which existing notes this meeting relates to - used in the Related section

---

### Step 4: Create structured meeting note

- **Location**: `Meetings/YYYY-MM-DD - [Meeting Title].md` (or overwrite the source file if processing in-place)
- **Template**: `templates/meeting-note.md`
- **Date**: Use the meeting's actual date, not today's date
- Fill all sections:
  - **Attendees**: verified names with correct tags
  - **Topics**: high-level topic list
  - **Meeting notes**: structured from raw notes, organized by topic
  - **Decisions**: extracted explicitly, not buried in notes
  - **Action Items**: checkboxes with owners and deadlines (`- [ ] [Action] - [Owner] - [Deadline]`)
  - **Open Questions**: unresolved questions from the meeting
  - **Related**: wikilinks to relevant notes

---

### Step 5: Link in the meeting's journal

- Find the journal for the **meeting's date**: `journals/YYYY/MM-Month/DD-MM-YYYY.md`
- Add link under the `## Notes` section
- Format: `- [[YYYY-MM-DD - Meeting Title]] - [One-line summary]`
- If the journal for that date doesn't exist, skip this step

---

### Step 6: Prepare Todoist tasks (don't create yet)

- **ONLY prepare tasks for the vault owner** - skip tasks owned by others
- Check existing tasks in Todoist to avoid duplicates
- Prepare list of new tasks:
  - Task content: "[Action item description]"
  - Due date: Based on mentioned deadline (if any)
  - Priority: P2 for critical items, P3 for normal, P4 for low priority
- **Show the list to the user and wait for confirmation before creating**

---

## Output Format

```
✅ Meeting note created: [[YYYY-MM-DD - Meeting Title]]
✅ Linked in journal: [[DD-MM-YYYY]]

📋 Proposed tasks for Todoist (your action items only):
1. [Task] - [Due date] - Priority: P2
2. [Task] - Priority: P3

⏭️ Tasks already in Todoist (will skip):
- [Existing task]

ℹ️ Tasks for others (not adding to Todoist):
- [Task] - [Person]

---
Confirm:
- Add tasks to Todoist? (Y/N or select which ones)
```

Wait for confirmation. After confirmation:
- Create Todoist tasks per `shared/todoist-config.md` settings

---

## Notes

- **Use the meeting's actual date**, not today's date
- If a meeting already has a structured note, warn before overwriting
- If the journal for the meeting date doesn't exist, skip journal linking
- **ONLY create Todoist tasks for the vault owner**
- **ALWAYS check existing Todoist tasks** before creating new ones
- If attendees aren't clear from the notes, ask the user
- If no deadline is mentioned for action items, don't set a due date in Todoist
