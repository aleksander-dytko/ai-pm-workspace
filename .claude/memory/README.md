---
tags: ClaudeMemory
---

# .claude/memory/

Skills that need to persist state across sessions write to this directory. Committed so the directory exists on a fresh clone (no `mkdir` required at runtime).

Files you might see here:

- `guide-progress.md` - `/guide` tracks which of its 8 modules you've completed.

Adding a new skill that needs persistent state? Drop its state file(s) here with a descriptive frontmatter (`tags: ClaudeMemory` plus anything else useful). One file per skill.
