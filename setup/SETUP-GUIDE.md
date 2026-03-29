# Setup Guide

Step-by-step instructions to get your AI PM Workspace running.

## Prerequisites

- [Obsidian](https://obsidian.md/) installed
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed (`npm install -g @anthropic-ai/claude-code`)
- A Claude API key or Claude Pro/Max subscription
- Git
- GitHub Copilot subscription (for GitHub MCP - optional, skip if you don't use GitHub for issue tracking)

### Optional Obsidian Plugins

The daily note template includes an optional Todoist query block that is commented out by default. To use it, install the [Obsidian Todoist Plugin](https://github.com/jamiebrynes7/obsidian-todoist-plugin) and then uncomment the block in the daily note template by removing the surrounding `<!-- ... -->` comment markers. If you don't use Todoist or don't install the plugin, you can leave the block commented out or delete it from the template.

## Step 1: Clone and Open

```bash
git clone https://github.com/aleksander-dytko/ai-pm-workspace.git
cd ai-pm-workspace
```

Open this folder as an Obsidian vault:
1. Open Obsidian
2. Click "Open folder as vault"
3. Select the `ai-pm-workspace` folder

## Step 2: Configure MCP Servers

MCP (Model Context Protocol) servers let Claude Code connect to external tools. Configure the ones you use:

### Todoist (recommended)

```bash
claude mcp add todoist --transport streamable-http --url https://ai.todoist.net/mcp
```

See [mcp-configs/todoist.md](mcp-configs/todoist.md) for detailed setup.

### GitHub (recommended)

```bash
claude mcp add github --transport streamable-http --url https://api.githubcopilot.com/mcp
```

See [mcp-configs/github.md](mcp-configs/github.md) for detailed setup.

### Other MCPs (optional)

You can add any MCP server that enhances your workflow:
- **Notion**: For personal notes integration
- **Domain-specific docs**: For product documentation lookup (e.g., your company's docs)
- **Linear/Jira**: For issue tracking (if you don't use GitHub Issues)

Browse available MCPs at [mcp.so](https://mcp.so) or the [MCP servers directory](https://github.com/modelcontextprotocol/servers).

## Step 3: Run Personalization

Open Claude Code in this directory and run:

```
/personalize
```

This interactive skill will:
- Ask about your role, company, and product area
- Configure CLAUDE.md with your context
- Set up Todoist project/section IDs
- Create stakeholder profiles (optional)

## Step 4: Start Using

Try these skills:

| Command | What it does |
|---------|-------------|
| `/today` | Plan your day (morning ritual) |
| `/meeting` | Process raw meeting notes into structured notes |
| `/decision [topic]` | Make a documented decision |
| `/communicate [topic + audience]` | Draft a Slack/email message |
| `/weekly-plan` | Plan your week with P-tasks and overplanning challenge |
| `/end-of-day` | Close out your day and prep tomorrow |
| `/slack-thread [paste]` | Process a pasted Slack conversation |
| `/process-inbox` | Route Inbox/ notes to the right folders |

## Step 5: Build Your Workflow

The included skills are a starting point. You can:

1. **Modify existing skills** - Edit files in `.claude/skills/` to match your workflow
2. **Create new skills** - Add a new folder in `.claude/skills/` with a `SKILL.md` file
3. **Add MCP integrations** - Connect more tools via MCP servers
4. **Extend CLAUDE.md** - Add more context as your usage matures

### Quick-capture with Inbox

During the day, drop notes in `Inbox/` with any name - no naming conventions needed. When ready, run `/process-inbox` to classify and route them to the right folder:

- Meeting-like notes -> `Meetings/` with proper `YYYY-MM-DD - [Title].md` naming
- Decisions -> `Loose Notes/Work/` with Decision prefix
- Project updates -> `Projects/` (appended to existing files or new)
- Everything else -> `Loose Notes/Work/`

The `/today` and `/end-of-day` skills automatically check for unprocessed Inbox items.

### Skill ideas to build yourself

- **`/initiative`**: Track product initiatives
  - Read status from external repos
  - Update working files in your vault
  - Cross-reference with meeting notes

- **`/retro`**: Sprint or quarterly retrospective
  - Analyze recent journals and meeting notes for patterns
  - Summarize wins, blockers, and recurring themes
  - Generate shareable retrospective summary

## Architecture Overview

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

**Obsidian** = your persistent knowledge base (Markdown files)
**Claude Code** = the executor that reads your vault and acts on it
**MCP** = bridges to external tools (Todoist, GitHub, etc.)

## Troubleshooting

### Claude Code can't find my files
- Make sure you're running Claude Code from the vault root directory
- Check that file paths in CLAUDE.md match your actual folder structure

### Todoist MCP not working
- Re-run `claude mcp add todoist` and re-authenticate
- Check `claude mcp list` to verify it's configured
- Try a simple command first: ask Claude "list my Todoist projects"

### Skills not showing up
- Skills must be in `.claude/skills/[name]/SKILL.md`
- The SKILL.md file needs valid frontmatter with `name` and `description`
- Restart Claude Code after adding new skills
