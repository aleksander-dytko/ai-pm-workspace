# GitHub MCP Setup

## Quick Setup

```bash
claude mcp add github --transport streamable-http --url https://api.githubcopilot.com/mcp
```

Authentication is handled through your GitHub Copilot subscription or personal access token.

## What It Enables

With GitHub MCP, Claude Code can:
- **Search issues/PRs**: Find related work across repositories
- **Read issue details**: Understand engineering context and discussions
- **Check PR status**: See implementation progress
- **Browse code**: Look up implementations in your repos

## How Skills Use It

| Skill | GitHub operations |
|-------|-------------------|
| `/decision` | Search for related issues, read engineering discussions |

## Configuration

Update the GitHub MCP section in `CLAUDE.md` with your key repositories:
- Repository names and what they contain
- Key operations you use frequently

## Alternative: GitHub CLI

If you prefer not to use the MCP server, you can also use the `gh` CLI tool directly. Claude Code can run `gh` commands via the Bash tool.

```bash
# Install GitHub CLI
brew install gh
gh auth login
```
