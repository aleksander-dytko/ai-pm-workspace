---
name: personalize
description: Customize this workspace to your role, company, and tools through an interactive setup
---

# Personalize Your Workspace

You are helping the user customize this AI PM Workspace template to their specific role, company, and tools. This is a one-time interactive setup that configures CLAUDE.md, skills, and integrations.

## Input

The user invokes this skill after cloning the repository. No arguments needed.

## Workflow

### Phase 1: Welcome + Core Identity (1 round)

Start with a brief welcome, then ask all core identity questions in ONE AskUserQuestion:

```
Welcome to AI PM Workspace! Let's customize this to your setup.
I'll ask a few questions, then update everything automatically.
```

**Questions (4 in AskUserQuestion)**:

1. **Role**: "What's your role?"
   - Options: "Product Manager", "Senior PM / Group PM", "Head of Product / Director", "Engineering Manager"

2. **Company type**: "What type of company?"
   - Options: "B2B SaaS", "B2C / Consumer", "Enterprise / Platform", "Startup / Early stage"

3. **Team structure**: "Who do you typically communicate with?"
   - multiSelect: true
   - Options: "Engineering teams", "Design teams", "Leadership / Executives", "Customers / External"

4. **Note-taking language**: "What language do you write notes in?"
   - Options: "English", "Mixed (English work + other personal)"

### Phase 2: Company & Product Details (1 round)

Ask for specifics as free text:

```
Now the specifics. Tell me about:

1. **Company name**: What company do you work for?
2. **What it does**: One sentence about what your company does
3. **Your product area**: What part of the product do you own? (e.g., "Core Platform", "Growth", "Developer Tools")
4. **Key products/features**: List 2-3 main products or features (comma-separated)
5. **Target users**: Who uses your product? (e.g., "Developers, DevOps engineers")
```

### Phase 3: Tool Setup (1 round)

Ask about MCP integrations:

**Questions (3 in AskUserQuestion)**:

1. **Todoist**: "Do you use Todoist for task management?"
   - Options: "Yes, already set up", "Yes, need help setting up", "No, I use something else", "No task manager"

2. **GitHub**: "Do you use GitHub for issue/PR tracking?"
   - Options: "Yes, already set up", "Yes, need help setting up", "No"

3. **People profiles**: "Do you want to set up stakeholder communication profiles?"
   - Options: "Yes, I'll add key people now", "Later, skip for now"

### Phase 4: Todoist Configuration (conditional)

**Only if user selected Todoist "Yes":**

If "already set up":
- Ask: "What's the name of your main work project in Todoist? And which section should Claude create tasks in?"
- Use Todoist MCP to look up the project and section IDs
- Update `shared/todoist-config.md` with the real IDs

If "need help setting up":
- Guide them through: `claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp`
- After setup, find their project and section IDs via MCP

### Phase 5: People Profiles (conditional)

**Only if user wants to set up profiles:**

Ask: "List 3-5 key people you work with. For each, give me: Name, Role, and how they prefer communication (brief/detailed, technical/strategic)."

Create `Dashboard/people-profiles.md` with the provided information in this format:

```markdown
---
tags: Dashboard
updated: YYYY-MM-DD
---
# People Profiles

Communication preferences and working styles of key stakeholders.

## [Person Name]
- **Role**: [Role]
- **Communication style**: [Brief description]
- **Preferred channel**: [Slack/Email/etc.]
- **Tags**: #[FirstName]
```

### Phase 6: Apply All Changes

Update all files in parallel:

**1. CLAUDE.md** - Replace all placeholders:
- `[YOUR NAME]` -> user's name (ask if not yet provided)
- `[YOUR ROLE]` -> from Phase 1
- `[YOUR COMPANY]` -> from Phase 2
- `[YOUR PRODUCT AREAS]` -> from Phase 2
- Company context section -> from Phase 2 answers
- Target users section -> from Phase 2
- Communication tone guidance -> adjusted based on Phase 1 team structure
- MCP servers section -> uncomment relevant sections based on Phase 3
- Todoist integration section -> update project/section names

**2. shared/todoist-config.md** - If Todoist configured:
- Fill in project name, project ID, section name, section ID

**3. Dashboard/people-profiles.md** - If people provided:
- Create with provided profiles

**4. Verify journal template** - Check `templates/daily-note.md`:
- If user selected "Mixed" language: add a comment about language rules
- Otherwise: keep as-is (English)

### Phase 7: Summary + Next Steps

```
✅ Workspace personalized!

Updated:
- CLAUDE.md (your identity, company context, MCP config)
- Todoist config (project: [name], section: [name])
- People profiles ([N] profiles created)

Your workspace is ready. Here's what to try:

1. Start your day:     /today
2. Process a meeting:  /meeting (write raw notes first, then invoke)
3. Make a decision:    /decision [topic]
4. Draft a message:    /communicate [topic + audience]

💡 Tips:
- The more notes you write, the smarter Claude gets about your context
- Keep meeting notes in Meetings/, decisions in Loose Notes/Work/
- Update people-profiles.md as you learn communication preferences
- Run /personalize again anytime to update your setup

📚 See setup/SETUP-GUIDE.md for advanced configuration.
```

## Notes

- This skill should feel like a friendly onboarding conversation, not a form
- If the user gives brief answers, don't push for more - fill in reasonable defaults
- If Todoist MCP isn't configured yet, provide the setup command and suggest running /personalize again after
- Don't ask about features the user doesn't need - respect "skip" and "later" answers
- Keep the total interaction to 3-4 rounds maximum
