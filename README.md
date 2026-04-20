# AI PM Workspace

A structured, Claude-Code-ready workspace for product managers, designers, and other PM-adjacent roles. Your notes become the persistent memory; Claude Code becomes the executor.

This is a **template**. Clone it, run `/personalize --quick` (three minutes), and you have a working AI workspace.

> **v2 is live** (see [CHANGELOG.md](CHANGELOG.md)). Tasks now live in-repo at `Dashboard/tasks.md` - no external task manager required. The old Todoist-coupled v1 is available on the `v1` tag if you need it.

> **Background reading**:
> - [Your AI Has No Memory. Mine Does.](https://productpeak.substack.com/p/your-ai-has-no-memory-mine-does) - the architecture that inspired this template.
> - [The Four Claude Code Building Blocks](https://productpeak.substack.com/p/the-four-claude-code-building-blocks) - CLAUDE.md, MCP, skills, agents.
> - [Claude Has 5 Memory Layers](https://productpeak.substack.com/p/claude-has-5-memory-layers-most-people) - how Claude Code actually remembers you.

## Get started in 5 minutes

Three steps. Two of them are skills.

**1. Clone the template.** Pick the path that matches how you work:
- **No terminal**: click the green **"Use this template"** button above, then clone with [GitHub Desktop](https://desktop.github.com/).
- **Minimal terminal**: open Claude Code in any empty folder and ask it: *"Clone the template at https://github.com/aleksander-dytko/ai-pm-workspace into a new repo called my-pm-workspace on my GitHub account, then clone it locally."*
- **Full terminal**: `gh repo create my-pm-workspace --private --template aleksander-dytko/ai-pm-workspace && gh repo clone my-pm-workspace && cd my-pm-workspace`

Full instructions with screenshots and gotchas: [Quick start](#quick-start) below and [setup/SETUP-GUIDE.md](setup/SETUP-GUIDE.md).

**2. Run `/personalize --quick`** (3 minutes).

Open Claude Code in the cloned folder and type `/personalize --quick`. It asks three multiple-choice questions and one free-text question ("your name, your company in one sentence, your focus area"). Fills your identity into `CLAUDE.md`, trims the workspace to your role and audiences. You're ready to work.

**3. Run `/guide`** (eight modules, one per sitting).

`/guide` is an interactive learning path that walks you through every shipped skill using sample data that's already in the repo. No scrambling for a real meeting or a real decision to practice on. Role-adaptive so it reframes examples for designers, analysts, and engineers too.

After that, try the skills on real work. When you want more context on board, run `/personalize --deep` (10 min) to add MCP detection, active initiatives, and people profiles.

## What you get

- **12 ready-to-use skills** covering daily PM work, craft artifacts, onboarding, and feedback (see [the full list](#the-skills) below).
- **A structured vault**: journals, meeting notes, decisions, dashboards, initiatives, epics, research.
- **CLAUDE.md** pre-configured with quality standards, interaction rules, and a skill dispatch table.
- **In-repo task management** via `Dashboard/tasks.md` - no Todoist or external tool required.
- **An interactive `/guide`** that walks new users through all the shipped skills in eight modules, using sample data bundled with the template.
- **Templates + personas + samples** ready to use: epic template, initiative template, three generic personas, six sample data files.

## How it fits together

```
+-------------------+    +---------------------+    +-------------------+
|                   |    |                     |    |                   |
|   YOUR VAULT      |<-->|    CLAUDE CODE      |<-->|   MCP BRIDGES     |
|   (persistent     |    |    (executor)       |    |   (optional)      |
|    memory)        |    |                     |    |                   |
|                   |    |   Skill categories: |    |   - GitHub        |
|  - Daily journal  |    |    * Core daily     |    |   - Your docs     |
|  - Meeting notes  |    |    * Craft          |    |   - [Your tools]  |
|  - Decisions      |    |    * Onboarding     |    |                   |
|  - Epics          |    |    * Feedback       |    |                   |
|  - Research       |    |                     |    |                   |
|  - Dashboard/     |    |                     |    |                   |
|    tasks.md       |    |                     |    |                   |
+-------------------+    +---------------------+    +-------------------+
        ^                         |
        |       writes back       |
        +-------------------------+
```

- **Your vault** accumulates knowledge in Markdown. Everything searchable, versionable, yours.
- **Claude Code** reads your vault and runs skills. Skills are repeatable workflows encoded as Markdown files.
- **MCP bridges** (optional) connect Claude Code to external tools like GitHub.

## The skills

### Core daily (5)

| Skill | What it does |
|-------|--------------|
| `/today [morning\|evening]` | Morning focus planning or evening close-out. Morning fills journal and picks max 3 focus items; evening logs what got done and prepares tomorrow. |
| `/meeting` | Turns raw meeting notes into a structured note with decisions, action items, and follow-up tasks for `Dashboard/tasks.md`. |
| `/decision [topic]` | Gathers context, drafts 2-3 options with trade-offs, creates a decision note, drafts a communication. |
| `/communicate [topic + audience + channel]` | Drafts Slack, email, or async doc matched to the audience. Uses context from recent meetings and decisions. |
| `/weekly-plan` | Weekly P-Tasks planning with an overplanning challenge and triage of `Dashboard/tasks.md`. |

### Craft (4)

| Skill | What it does |
|-------|--------------|
| `/create-epic [idea]` | Turns a raw idea into a structured epic draft using `templates/epic-template.md`. Sets stage to Explore. |
| `/user-journey [flow]` | Persona-grounded journey map using `research/personas/`. Lands in `research/journeys/`. |
| `/competitive-research [topic]` | Produces a sourced competitive matrix. Every observation cites a source or is marked inferred. |
| `/opportunity-solution-tree [outcome]` | Teresa Torres discovery framework. Ported from [phuryn/pm-skills](https://github.com/phuryn/pm-skills) under MIT; see the skill's `ATTRIBUTION.md`. |

### Onboarding (2)

| Skill | What it does |
|-------|--------------|
| `/personalize [quick\|deep]` | Quick (3 min) or deep (10 min) setup. Quick fills identity; deep adds MCP detection, initiatives, and people profiles. |
| `/guide [module\|next\|reset]` | Interactive 8-module learning path through all the shipped skills. Role-adaptive. Uses sample data in `samples/`. |

### Feedback (1)

| Skill | What it does |
|-------|--------------|
| `/report [description]` | Files a bug / confusion / feature request / feedback as a GitHub issue on this template repo. Uses GitHub MCP if available; falls back to a pre-filled issue URL. |

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

If you get stuck on the GitHub side of this, Hannah Stulberg's [Tool School: GitHub 101](https://hannahstulberg.substack.com/p/tool-school-github-101) is a great primer for non-developers, and [setup/SETUP-GUIDE.md](setup/SETUP-GUIDE.md) has platform-specific install commands.

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

- **Quick** (default, 3 min): asks your name, role, focus area, and team. Fills `CLAUDE.md` identity. Ships working skills immediately.
- **Deep** (10 min): everything above, plus MCP detection, initiative setup, and people profiles. Run `/personalize --deep` when you want more context.

## Going deeper

Once `/personalize --quick` is done, you have two paths.

**Try the skills one by one:**

1. `/today` - morning planning or evening close-out.
2. `/meeting` - process a raw meeting note into a structured one.
3. `/decision` - document a product decision with full context.
4. `/communicate` - draft a Slack, email, or async update.
5. `/weekly-plan` - Sunday/Monday planning with an overplanning challenge.

**Or run the interactive guide:**

```
/guide
```

Eight modules, role-adaptive, using sample data shipped with the template. Covers all shipped skills plus how to extend your workspace with external skills. Good to do over a week, one module per day.

When you want more, `/personalize --deep` adds MCP integration, initiatives, and people profiles.

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

Ideas to build yourself:

- `/retro` - sprint or quarterly retrospective from journals and meeting notes.
- `/standup` - daily standup summary from journal + today's plan.
- `/health` - vault health audit (unlinked notes, stale tasks, orphaned decisions).

Module 8 of `/guide` walks you through how to write your own or adopt one from the internet.

### Port skills from elsewhere

There's a growing open-source library of PM skills you can borrow.

- [phuryn/pm-skills](https://github.com/phuryn/pm-skills) - 60+ MIT-licensed skills covering discovery, strategy, GTM, analytics, and more. One of these (`opportunity-solution-tree`) already ships with this template as a worked attribution example.

To add another phuryn skill to your workspace, copy its folder into `.claude/skills/`, keep the attribution header, restart Claude Code.

### Optional: sync tasks to Todoist

This template keeps tasks in-repo (`Dashboard/tasks.md`) so you can start without any external tool. If you want Todoist sync later, see [docs/todoist-sync.md](docs/todoist-sync.md).

## Philosophy

Three principles:

1. **Context over prompts**: when AI has deep context, the prompt barely matters. A simple "What should we do about X?" becomes a rich interaction because Claude already knows what X is.
2. **Skills over conversations**: repeatable workflows shouldn't require re-explaining every time. Skills encode your process once and execute it consistently.
3. **Your vault, your memory**: everything accumulates in Markdown files you own. No vendor lock-in, no cloud dependency for your knowledge.

## Migrating from v1

If you cloned v1 (Todoist-coupled) and want to upgrade: see the migration notes in [CHANGELOG.md](CHANGELOG.md). Short version: tasks now live in `Dashboard/tasks.md` instead of Todoist, and four skills (`/end-of-day`, `/process-inbox`, `/slack-thread`, and parts of `/personalize`) were either merged or removed. Your notes and journals are unchanged.

## Contributing

This is an open template. If you build skills, patterns, or integrations that others could use, PRs are welcome.

Bugs, questions, or "I got stuck here" feedback: open an issue or run `/report` from within your workspace.

## License

MIT - see [LICENSE](LICENSE).
