# AI PM Workspace

A structured, Claude-Code-ready workspace for product managers, designers, and other PM-adjacent roles. Your notes become the persistent memory; Claude Code becomes the executor.

This is a **template**. Clone it, run `/personalize`, and you have a working AI workspace in under five minutes.

> **v2 is here** (see [CHANGELOG.md](CHANGELOG.md)). Tasks now live in-repo at `Dashboard/tasks.md` - no external task manager required. The old Todoist-coupled v1 is tagged `v1` if you need it.

> **Background reading**:
> - [Your AI Has No Memory. Mine Does.](https://productpeak.substack.com/p/your-ai-has-no-memory-mine-does) - the architecture that inspired this template.
> - [The Four Claude Code Building Blocks](https://productpeak.substack.com/p/the-four-claude-code-building-blocks) - CLAUDE.md, MCP, skills, agents.
> - [Claude Has 5 Memory Layers](https://productpeak.substack.com/p/claude-has-5-memory-layers-most-people) - how Claude Code actually remembers you.

## What you get

- **6 ready-to-use skills**: `/today`, `/meeting`, `/decision`, `/communicate`, `/weekly-plan`, `/personalize`
- **A structured vault**: journals, meeting notes, decisions, dashboards, initiatives
- **CLAUDE.md** pre-configured with quality standards, interaction rules, and a skill dispatch table
- **In-repo task management** via `Dashboard/tasks.md` - no Todoist or external tool required
- A `/personalize` skill that runs in two modes: quick (3 min) or deep (10 min)

## How it fits together

```
+-------------------+    +---------------------+    +-------------------+
|                   |    |                     |    |                   |
|   YOUR VAULT      |<-->|    CLAUDE CODE      |<-->|   MCP BRIDGES     |
|   (persistent     |    |    (executor)       |    |   (optional)      |
|    memory)        |    |                     |    |                   |
|                   |    |  Skills:            |    |   - GitHub        |
|  - Daily journal  |    |   /today            |    |   - Your docs     |
|  - Meeting notes  |    |   /meeting          |    |   - [Your tools]  |
|  - Decisions      |    |   /decision         |    |                   |
|  - Dashboard/     |    |   /communicate      |    |                   |
|    tasks.md       |    |   /weekly-plan      |    |                   |
|                   |    |   /personalize      |    |                   |
+-------------------+    +---------------------+    +-------------------+
        ^                         |
        |       writes back       |
        +-------------------------+
```

- **Your vault** accumulates knowledge in Markdown. Everything searchable, versionable, yours.
- **Claude Code** reads your vault and runs skills. Skills are repeatable workflows encoded as Markdown files.
- **MCP bridges** (optional) connect Claude Code to external tools like GitHub.

## Quick start

### Prerequisites

- A Claude Pro ($20/mo), Max, or Teams subscription. The free plan does not include Claude Code.
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed. See [setup/SETUP-GUIDE.md](setup/SETUP-GUIDE.md) for three install paths.
- A GitHub account.
- (Optional) [Obsidian](https://obsidian.md/) if you want the vault UX.

### Clone the template (three paths)

Pick the path that matches how you work.

#### Path 1: GitHub UI + GitHub Desktop (no terminal required)

Best for: designers, PMs, anyone who doesn't live in a terminal.

1. Click the green **"Use this template"** button at the top right of this repo page.
2. Choose **"Create a new repository"**. Name it (e.g., `my-pm-workspace`), make it private, create.
3. Open [GitHub Desktop](https://desktop.github.com/). `File > Clone repository > [your new repo]`.
4. Pick a local folder, click **Clone**.
5. Open Claude Code in that folder. Run `/personalize`. Done.

See [setup/SETUP-GUIDE.md](setup/SETUP-GUIDE.md) if you get stuck on GitHub auth - Hannah Stulberg's [Tool School: GitHub 101](https://hannahstulberg.substack.com/p/tool-school-github-101) is a great primer for non-developers.

#### Path 2: Ask Claude Code to do it (minimal terminal)

Best for: PMs who have Claude Code installed but aren't fluent with `git`.

Open Claude Code in any empty folder and paste:

```
Clone the template at https://github.com/aleksander-dytko/ai-pm-workspace
into a new repo called my-pm-workspace on my GitHub account,
then clone that new repo locally and open it.
```

Claude will use the GitHub CLI to create the repo and clone it. If you don't have `gh` installed, Claude will guide you through installing it.

Then run `/personalize`.

#### Path 3: Git CLI (classic)

Best for: developers.

```bash
gh repo create my-pm-workspace --private --template aleksander-dytko/ai-pm-workspace
gh repo clone my-pm-workspace
cd my-pm-workspace
claude   # run Claude Code
```

Then run `/personalize`.

### What `/personalize` does

- **Quick** (default, 3 min): asks your name, role, focus area, and team. Fills `CLAUDE.md` identity. Ships working skills.
- **Deep** (10 min): everything above, plus MCP detection, initiative setup, and people profiles. Run `/personalize --deep` when you want more context.

## Going deeper

Once `/personalize` is done, try:

1. `/today` - morning planning or evening close-out.
2. `/meeting` - process a raw meeting note into a structured one.
3. `/decision` - document a product decision with full context.
4. `/communicate` - draft a Slack, email, or async update.
5. `/weekly-plan` - Sunday/Monday planning with an overplanning challenge.

When you're ready, `/personalize --deep` adds MCP integration, initiatives, and people profiles.

## How CLAUDE.md works

[`CLAUDE.md`](CLAUDE.md) is the single most important file in this setup. Claude Code reads it at the start of every session, so it always knows:

- Your identity (role, company, focus area)
- How your vault is organized (folders, naming conventions)
- Quality standards for notes, decisions, and communications
- Interaction rules (never-write-tasks-without-confirming, no em-dashes, etc.)
- Which skills exist and when to use them

The more context you put into `CLAUDE.md`, the less you need to explain in each conversation. Deep dive: [Claude Has 5 Memory Layers](https://productpeak.substack.com/p/claude-has-5-memory-layers-most-people).

## Extending the workspace

### Build your own skills

Skills are Markdown files in `.claude/skills/[name]/SKILL.md`. Each has:

1. **Frontmatter**: `name` and `description` (how Claude discovers the skill).
2. **Workflow**: step-by-step instructions.
3. **Output format**: what the result should look like.

Example skill ideas:

- `/create-epic` - turn an idea into a structured epic draft.
- `/user-journey` - build a persona-grounded user journey.
- `/competitive-research` - sourced competitive matrix.
- `/retro` - sprint or quarterly retrospective from journals and meeting notes.

### Port skills from elsewhere

There's a growing open-source library of PM skills you can borrow.

- [phuryn/pm-skills](https://github.com/phuryn/pm-skills) - MIT-licensed skills covering discovery (opportunity-solution-tree, prioritization frameworks), GTM (battlecards, launch plans), analytics (cohort analysis, A/B test analysis), and more.

To add a phuryn skill to your workspace, copy its folder into `.claude/skills/` and keep the attribution header. Then restart Claude Code.

### Optional: sync tasks to Todoist

This template keeps tasks in-repo (`Dashboard/tasks.md`) so you can start without any external tool. If you want Todoist sync later, see [docs/todoist-sync.md](docs/todoist-sync.md).

## Philosophy

Three principles:

1. **Context over prompts**: when AI has deep context, the prompt barely matters. A simple "What should we do about X?" becomes a rich interaction because Claude already knows what X is.
2. **Skills over conversations**: repeatable workflows shouldn't require re-explaining every time. Skills encode your process once and execute it consistently.
3. **Your vault, your memory**: everything accumulates in Markdown files you own. No vendor lock-in, no cloud dependency for your knowledge.

## Migrating from v1

If you cloned v1 (Todoist-coupled) and want to upgrade: see the migration notes in [CHANGELOG.md](CHANGELOG.md). The short version: tasks now live in `Dashboard/tasks.md` instead of Todoist, and four skills (`/end-of-day`, `/process-inbox`, `/slack-thread`, and parts of `/personalize`) were either merged or removed. Your notes and journals are unchanged.

## Contributing

This is an open template. If you build skills, patterns, or integrations that others could use, PRs are welcome.

Bugs, questions, or "I got stuck here" feedback: open an issue or run `/report` from within your workspace.

## License

MIT - see [LICENSE](LICENSE).
