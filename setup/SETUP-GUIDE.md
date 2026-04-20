# Setup Guide

The detailed version of the Quick Start in the [README](../README.md). If anything fails, this file is where to look.

## Prerequisites checklist

Before you start, make sure you have:

- [ ] A Claude Pro ($20/month), Max, or Teams subscription. The free plan does **not** include Claude Code.
- [ ] A GitHub account.
- [ ] (Optional) [Obsidian](https://obsidian.md/) if you want the vault to render as a proper knowledge base.

You do **not** need to know Git or have any terminal experience to get started - Path 1 below is fully UI-based once Claude Code is installed.

## Step 1: Install Claude Code

Three install paths. Pick the one that matches how you work.

### Option A: VS Code extension (easiest for first-time users)

1. Open VS Code (install it first if needed: [code.visualstudio.com](https://code.visualstudio.com/)).
2. Open the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`).
3. Search for **"Claude Code"** by Anthropic. Install it.
4. The extension installs the CLI behind the scenes.
5. Open a folder in VS Code and look for the Claude Code panel in the sidebar.

Pros: no terminal, diff view for edits, click-to-open file references.

### Option B: Native install (for power users)

**macOS / Linux**:

```bash
npm install -g @anthropic-ai/claude-code
```

Then authenticate:

```bash
claude login
```

Follow the browser flow to log into your Anthropic account.

**Windows**:

- Install [Node.js](https://nodejs.org/) (includes npm).
- Open PowerShell or Command Prompt and run the same `npm install -g ...` command as above.

Verify:

```bash
claude --version
```

If you see a version number, you're good.

### Option C: Claude Desktop (GUI-first)

1. Download [Claude Desktop](https://claude.ai/download) for macOS or Windows.
2. Sign in with your Claude account.
3. Claude Desktop includes Claude Code under the hood; open any folder and the same commands work.

Best for users who prefer a chat-first interface over a code editor.

## Step 2: Install GitHub tooling

You need **one** of the following:

### Option A: GitHub Desktop (no terminal)

1. Download [GitHub Desktop](https://desktop.github.com/).
2. Open it and sign in with your GitHub account.
3. Done - use this for Path 1 in the README.

Ref for non-developers: Hannah Stulberg's [Tool School: GitHub 101](https://hannahstulberg.substack.com/p/tool-school-github-101) is an excellent primer if you've never used GitHub before. Covers how repos work, why branches exist, and the typical get-stuck moments.

### Option B: GitHub CLI (`gh`)

**macOS**:

```bash
brew install gh
gh auth login
```

**Windows**:

```powershell
winget install GitHub.cli
gh auth login
```

**Linux**: see [cli.github.com](https://cli.github.com/).

Verify:

```bash
gh auth status
```

You should see "Logged in to github.com as [your username]".

## Step 3: Clone the template

See the [README](../README.md#clone-the-template-three-paths) for the three cloning paths.

## Step 4: Run `/personalize`

1. Open your cloned repo folder in Claude Code (VS Code extension, terminal `claude`, or Claude Desktop).
2. Type: `/personalize`
3. Follow the prompts. Three minutes.

The skill updates `CLAUDE.md` with your identity. You're now ready to use the other skills.

## Step 5: Try your first skill

Start simple. Write a few lines of raw notes from a recent meeting into a new file in `Meetings/` (e.g., `Meetings/2026-04-20 - Customer sync.md`), then run:

```
/meeting
```

Claude will ask which file to process, then produce a structured meeting note with decisions, action items, and a ready-to-add list of tasks for `Dashboard/tasks.md`.

## Configure MCP servers (optional)

MCP (Model Context Protocol) servers let Claude Code connect to external tools. The template works without any MCPs; these are enhancements.

### GitHub MCP (recommended for epic work)

```bash
claude mcp add github --transport streamable-http --url https://api.githubcopilot.com/mcp
```

Requires a GitHub Copilot subscription for the official MCP endpoint. Alternative: use `gh` CLI commands via Claude Code's Bash tool.

### Other MCPs

Any MCP-compatible tool can be added:

```bash
claude mcp add [name] --transport streamable-http --url [url]
```

Browse available MCPs at [mcp.so](https://mcp.so) or the [official MCP servers directory](https://github.com/modelcontextprotocol/servers).

Common additions: Notion, Linear, Jira, Confluence, company-specific docs APIs.

Run `/personalize --deep` to detect connected MCPs and wire them into `CLAUDE.md`.

## Troubleshooting

### "Claude Code can't find my files"

Make sure you're running Claude Code from the vault root directory, not from a parent folder. Check that file paths in `CLAUDE.md` match your actual folder structure.

### "`gh auth status` says I'm not logged in"

Run `gh auth login` and follow the browser flow. If you've just installed `gh`, you may need to restart your terminal.

### "GitHub Desktop can't clone my repo"

Check that you've accepted the invite to your own repo (GitHub sometimes pops this). Sign out and back in to GitHub Desktop. If still stuck, try Path 2 (ask Claude to clone it).

### "MCP server not responding"

Check `claude mcp list` to verify the server is configured. For any OAuth-based MCP, the token can expire - remove and re-add:

```bash
claude mcp remove [name]
claude mcp add [name] --transport streamable-http --url [url]
```

### "Skills not showing up when I type `/`"

Skills must be in `.claude/skills/[name]/SKILL.md`. The `SKILL.md` file needs valid frontmatter with `name` and `description`. Restart Claude Code after adding or editing skills.

### "I got stuck at step X"

Open an issue on this repo, or run `/report` from within your workspace - the skill opens a GitHub issue with the context pre-filled.

## Architecture Overview

```
+-------------------+    +---------------------+    +-------------------+
|                   |    |                     |    |                   |
|   YOUR VAULT      |<-->|    CLAUDE CODE      |<-->|   MCP BRIDGES     |
|   (persistent     |    |    (executor)       |    |   (optional)      |
|    memory)        |    |                     |    |                   |
+-------------------+    +---------------------+    +-------------------+
        ^                         |
        |       writes back       |
        +-------------------------+
```

- **Vault** = your persistent knowledge base (Markdown files).
- **Claude Code** = the executor that reads your vault and acts on it.
- **MCP** = optional bridges to external tools (GitHub, etc.).

See [CLAUDE.md](../CLAUDE.md) for the full operating manual Claude Code reads at each session.
