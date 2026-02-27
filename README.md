# AI PM Workspace

A blueprint for building an AI-powered product management workspace with [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Obsidian](https://obsidian.md/), and MCP integrations.

This is not a plugin or an app. It's a structured Obsidian vault with Claude Code skills that turn your notes into an intelligent PM operating system. Your vault becomes the persistent memory. Claude Code becomes the executor. MCP servers bridge the gap to your tools.

> **Background**: This template is based on a real PM workspace I built and use daily. I wrote about the approach in [Your AI Has No Memory. Mine Does.](https://productpeak.substack.com/p/your-ai-has-no-memory-mine-does) - this repo is the open-source blueprint that came from the response to that article.

## The Architecture

```
+-------------------+    +---------------------+    +-------------------+
|                   |    |                     |    |                   |
|  OBSIDIAN VAULT   |<-->|    CLAUDE CODE      |<-->|   MCP BRIDGES     |
|  (persistent      |    |    (executor)       |    |                   |
|   brain)          |    |                     |    |  - Todoist        |
|                   |    |  Skills:            |    |  - GitHub         |
|  - Daily journal  |    |  /today             |    |  - [Your tools]   |
|  - Meeting notes  |    |  /meeting           |    |                   |
|  - Decisions      |    |  /decision          |    |                   |
|  - Loose notes    |    |  /communicate       |    |                   |
|                   |    |                     |    |                   |
+-------------------+    +---------------------+    +-------------------+
        ^                         |
        |       writes back       |
        +-------------------------+
```

**Obsidian** is where your knowledge accumulates - daily journals, meeting notes, decisions, priorities. Everything in Markdown, everything searchable.

**Claude Code** reads from your vault and acts on what it finds. Skills are repeatable workflows for tasks you do frequently: planning your day, processing meeting notes, making decisions, drafting communications.

**MCP servers** let Claude Code reach beyond local files. Todoist integration means tasks land in your task manager automatically. GitHub access lets it check engineering status. The system participates in your actual workflow instead of just reading files.

## What's Included

### 4 Ready-to-Use Skills

| Skill | Command | What it does |
|-------|---------|-------------|
| **Plan Today** | `/today` | Morning planning ritual: reviews yesterday, triages Todoist, sets focus items with capacity awareness |
| **Process Meeting** | `/meeting` | Takes your raw meeting notes and structures them: decisions, action items, Todoist tasks, context links |
| **Make Decision** | `/decision [topic]` | Gathers context from your vault and GitHub, presents options with trade-offs, creates documented decision |
| **Draft Communication** | `/communicate [topic + audience]` | Adapts tone to audience (engineering/leadership/customers), uses your people profiles |

### 1 Onboarding Skill

| Skill | Command | What it does |
|-------|---------|-------------|
| **Personalize** | `/personalize` | Interactive setup: configures CLAUDE.md, Todoist IDs, and people profiles for your specific role and company |

### Vault Structure

```
├── Dashboard/             # Living documents (weekly priorities, people profiles)
├── journals/              # Daily notes (YYYY/MM-Month/DD-MM-YYYY.md)
├── Meetings/              # Meeting notes
├── Loose Notes/Work/      # Decisions, drafts, analysis
├── templates/             # Note templates for daily, meeting, and loose notes
├── .claude/skills/        # Claude Code skills
└── CLAUDE.md              # The "operating system" - tells Claude who you are and how to work
```

## Quick Start

### Prerequisites

- [Obsidian](https://obsidian.md/)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (`npm install -g @anthropic-ai/claude-code`)
- Claude API key or Claude Pro/Max subscription

### Setup (5 minutes)

```bash
# 1. Clone this repo
git clone https://github.com/aleksander-dytko/ai-pm-workspace.git
cd ai-pm-workspace

# 2. Add MCP servers (optional but recommended)
claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp
claude mcp add github --transport streamable-http --url https://api.githubcopilot.com/mcp

# 3. Open in Obsidian (Open folder as vault)

# 4. Run Claude Code and personalize
claude
# Then type: /personalize
```

The `/personalize` skill walks you through an interactive setup - it asks about your role, company, tools, and configures everything automatically.

See [setup/SETUP-GUIDE.md](setup/SETUP-GUIDE.md) for detailed instructions.

## How CLAUDE.md Works

`CLAUDE.md` is the heart of this setup. It's a Markdown file that Claude Code reads automatically when you start a session. It contains:

- **Your identity**: Role, company, product area
- **Company context**: What your company does, who uses your product
- **Vault conventions**: File naming, folder structure, tags
- **MCP configuration**: Which servers are available and how to use them
- **Skill reference**: What each skill does and when to use it
- **Behavioral instructions**: How Claude should work with your vault

Think of it as the operating system for your AI assistant. The more context you put in, the less you need to explain in each conversation.

## Extending the Workspace

### Build Your Own Skills

Skills are Markdown files in `.claude/skills/[name]/SKILL.md`. Each skill has:

1. **Frontmatter**: Name and description (how Claude discovers the skill)
2. **Workflow**: Step-by-step instructions for Claude to follow
3. **Output format**: What the result should look like

Ideas for skills you can build:

- **`/weekly-plan`**: Sunday/Monday weekly planning with P-Tasks, Todoist sync, and overplanning detection
- **`/initiative`**: Track product initiatives by pulling status from external repos
- **`/reflect`**: Monthly personal reflection agent that analyzes mood/energy patterns from your journals

### Add MCP Integrations

Any MCP-compatible tool can be added:

```bash
claude mcp add [name] --transport streamable-http --url [url]
```

Examples: Notion, Linear, Jira, Confluence, your company's internal docs API.

### Customize Templates

Edit files in `templates/` to match your preferred note structure. Skills reference these templates when creating new notes.

## Philosophy

This workspace is built on three principles:

1. **Context over prompts**: When AI has deep context, the prompt barely matters. A simple "What should we do about X?" becomes a rich interaction because Claude already knows what X is.

2. **Skills over conversations**: Repeatable workflows shouldn't require re-explaining every time. Skills encode your process once and execute it consistently.

3. **Your vault, your memory**: Everything accumulates in Markdown files you own. No vendor lock-in, no cloud dependency for your knowledge. Claude reads what's there and gets smarter as your vault grows.

## Contributing

This is an open template. If you build skills, patterns, or integrations that others could use, PRs are welcome.

## License

MIT
