# Claude Code mods

Three small mods for Claude Code. Each one is a plugin with a hooks module that changes Claude Code's own interface. They work with this workspace's file layout and fall back to sensible defaults anywhere else.

| Mod | What it does |
|---|---|
| **end-of-work** | Shows a quiet band above the prompt shortly before your closing time. Once that time passes, it says how far past you are, adds a status-line timer and shows one toast per day. You can hide it until tomorrow. It runs on weekdays only by default. |
| **next-steps** | After each answer, a small model suggests three follow-up messages and shows them as chips above the prompt. Click a chip to send it. Typing clears the chips. |
| **weekly-focus** | Opens a side pane with today's tasks and this week's P1-P5 priorities. Tick a task to complete it; you get 15 seconds to undo. `/weekly-focus` reopens the pane. |

## Install

Run these in a terminal Claude Code session:

```
/plugin marketplace add aleksander-dytko/ai-pm-workspace
/plugin install end-of-work@ai-pm-workspace
/plugin install next-steps@ai-pm-workspace
/plugin install weekly-focus@ai-pm-workspace
/reload-plugins
```

Install only the mods you want. During install, Claude Code asks for each mod's settings. Press Enter to keep the defaults.

## Settings

To change a setting later, open `/config` and find the rows named `<mod>.<setting>`, or edit `pluginConfigs` in `~/.claude/settings.json`. A changed setting reloads the mod.

If you leave **workspace** empty, the mod uses the folder Claude Code was started in. If you leave **timezone** empty, it uses your computer's local time. To set a zone, use an IANA name such as `America/New_York`. An unknown name falls back to local time.

**end-of-work**

| Setting | Default | Meaning |
|---|---|---|
| `closeAt` | `18:00` | Your closing time, HH:MM. A line in today's daily note such as `Closing the laptop: 17:30` overrides it for that day. |
| `headsUpMinutes` | `15` | How many minutes before closing the quiet reminder appears. |
| `weekdaysOnly` | `true` | Stay silent on Saturdays and Sundays. |
| `timezone` | empty | IANA time zone, or local time when empty. |
| `workspace` | empty | Folder that holds your daily notes. |
| `journalFolder` | `journals` | Daily notes live at `<folder>/YYYY/MM-Month/DD-MM-YYYY.md`. |

**next-steps**

| Setting | Default | Meaning |
|---|---|---|
| `model` | `haiku` | The model that writes the chips. |
| `minAnswerLength` | `40` | Answers shorter than this many characters get no chips. |

**weekly-focus**

| Setting | Default | Meaning |
|---|---|---|
| `weeklyPriorities` | `Dashboard/Weekly P-Tasks.md` | The newest `# [[DD-MM-YYYY]]` week section is read. Lines can be marked ✅ 🔄 ❌, or `:LiCheck:` `:LiRecycle:` ⭕ 🔴 🟡 🟢. |
| `tasksFile` | `Dashboard/tasks.md` | Used when Todoist is not connected. The pane shows open tasks under **This week**, plus any task due today or earlier. Format: `- [ ] Task - due: YYYY-MM-DD - priority: P1`. Ticking a task changes `[ ]` to `[x]` in this file. |
| `todoistServer` | `todoist` | The name of the Todoist MCP server as `/mcp` lists it. When that server is connected, the pane shows and completes Todoist tasks. Leave it empty to always use the tasks file. |
| `journalFolder` | `journals` | The daily note supplies the "My focus today" items, a "Today I win if" line and a closing time. Each appears only when the note has it. |
| `timezone`, `workspace` | empty | As above. |
| `openOnStart` | `true` | Open the pane when a session starts. |

## Security

Mods run inside Claude Code, unsandboxed and with your permissions:

- end-of-work and weekly-focus read files in your workspace.
- weekly-focus also writes your tasks file and calls your Todoist MCP server.
- next-steps sends your last message and Claude's answer to the model you configured.

Read the code before you install a mod. Run `claude plugin validate <mod folder>` to see every hook and call a mod makes, and `claude plugin test <mod folder>` to run its tests.

## Development

`.claude-plugin/types/` in each mod is written by Claude Code when it loads the mod, so it is git-ignored. To try a mod from a local folder, run `claude --plugin-dir mods/<name>`.

MIT licensed.
