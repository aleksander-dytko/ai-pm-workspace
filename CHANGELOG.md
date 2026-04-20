# Changelog

## v2.2 - `/report` skill (2026-04-20)

One new skill, two doc fixes.

- **New**: `/report` skill for filing feedback (bug / confusion / feature request / other) as a GitHub issue on this repo. Uses GitHub MCP if available; falls back to a pre-filled issue URL otherwise. Shows the full title + body for user confirmation before anything public goes out. Privacy rules prevent inclusion of vault content, personal paths, or file attachments without explicit user paste.
- **Docs**: `setup/SETUP-GUIDE.md` no longer references `/report` as "coming in v2.1" - it's shipped now.
- **Docs**: `CLAUDE.md` skill dispatch table has a new **Feedback (1)** section.

## v2.1 - Craft skills and the learning guide (2026-04-20)

The craft layer: skills and artifacts for the deeper PM work users graduate into after the onboarding foundation.

**New skills (5)**

- `/create-epic [idea]` - raw idea into a structured epic draft using `templates/epic-template.md`. Sets stage to Explore.
- `/user-journey [flow]` - persona-grounded journey map using `research/personas/`. Lands in `research/journeys/`.
- `/competitive-research [topic]` - sourced competitive matrix. Every observation cites a source or is marked inferred.
- `/opportunity-solution-tree [outcome]` - Teresa Torres discovery framework. Ported from [phuryn/pm-skills](https://github.com/phuryn/pm-skills) under MIT with attribution in `.claude/skills/opportunity-solution-tree/ATTRIBUTION.md`.
- `/guide [module|next|reset]` - interactive 8-module learning path through all the shipped skills. Role-adaptive (adapts framing for PM / designer / analyst / engineer). Uses sample data in `samples/` so users don't need to bring their own.

**New templates and artifacts**

- `templates/epic-template.md` - 11-section epic template with generic examples. Required / optional / phase-specific sections.
- `templates/initiative-template.md` - initiative working file structure with product-beliefs table.
- `docs/epic-lifecycle.md` - 4-stage lifecycle (Explore / Scope / Build / Validate) with stage-gating heuristics and when-to-kill guidance.
- `research/personas/` - template plus 3 example personas (backend developer, operations manager, platform operator) as structural references.
- `samples/` - 6 sample data files used by `/guide` modules.

**CLAUDE.md updates**

- Folder structure includes `epics/`, `research/`, `samples/`.
- Naming conventions cover epic, journey, research, persona files.
- Tag list extended (Epic, Persona, Journey, Research, Competitive).
- Skill dispatch table has **Craft (4)** and **Onboarding (2)** sections.

No breaking changes in this release. All v2.0 skills unchanged.

## v2.0 - Onboarding foundation (2026-04-20)

The first version of v2. Focused on one goal: anyone can clone the template, run `/personalize`, and produce a real artifact in under 30 minutes without getting stuck.

### Breaking changes

- **Todoist integration removed.** Tasks now live in-repo at `Dashboard/tasks.md` (a simple Markdown checklist). The template works without any external task manager. Optional Todoist sync is documented in `docs/todoist-sync.md` for users who want it.
- **Four skills removed or merged:**
  - `/end-of-day` - merged into `/today` as evening mode (`/today evening`).
  - `/process-inbox` - removed. The `Inbox/` folder is no longer part of the template.
  - `/slack-thread` - removed. It was a niche personal workflow; users who need it can build their own or port one from [phuryn/pm-skills](https://github.com/phuryn/pm-skills).
  - `/personalize` restructured from a single long flow into two tiers: `quick` (default, 3 min) and `deep` (10 min).
- **Folders removed:** `Inbox/`, `Projects/`. Template files for these folders are no longer shipped.
- **`shared/todoist-config.md` and `shared/todoist-patterns.md` removed.** No more Todoist project/section ID bookkeeping.

### Additions

- **`Dashboard/tasks.md`**: the new in-repo task list with three sections (This week / Next / Backlog).
- **`/today` has morning + evening modes.** Previously two skills, now one.
- **`/personalize --quick` mode**: three-minute setup for new users. Asks for name, role, focus area, team interactions, and language. Fills `CLAUDE.md` and nothing else. Deep mode available via `/personalize --deep` once the user has seen a first win.
- **Three cloning paths in the README**: GitHub UI + GitHub Desktop (no terminal), Claude-first (paste-a-prompt), and Git CLI. Designed so non-developers have a clear path.
- **`setup/SETUP-GUIDE.md` rewritten** with prerequisites checklist, three install paths for Claude Code, platform-specific GitHub setup, and a troubleshooting section.
- **Quality standards inlined into `CLAUDE.md`**: every note, decision, meeting note, and communication has explicit quality expectations.
- **Interaction rules added to `CLAUDE.md`**: task-writing requires user confirmation, no em-dashes, Slack formatting conventions.
- **`/communicate` generalized** beyond Slack: drafts Slack, email, or plain async updates (doc / comment / ticket).
- **`docs/todoist-sync.md`** shipped as an opt-in recipe for users who want Todoist mirror after the fact.

### Fixes

- `/weekly-plan` simplified: the dual Todoist triage flow is replaced with a single in-repo triage of `Dashboard/tasks.md` (Backlog -> Next -> This week).
- Template files (`templates/daily-note.md`) reference `Dashboard/tasks.md` instead of an optional Todoist plugin.

### Migrating from v1

If you cloned v1 and have local changes:

1. **Back up your vault** (it's in Git, but you may have unstaged changes).
2. Create a new branch: `git checkout -b v2-migration`.
3. Your `journals/`, `Meetings/`, `Loose Notes/`, `Dashboard/Weekly P-Tasks.md`, and `Dashboard/people-profiles.md` all carry forward unchanged.
4. Create `Dashboard/tasks.md` (copy from the v2 template or let `/personalize` create it).
5. Move any currently-open Todoist tasks you want to track manually into `Dashboard/tasks.md`.
6. Delete `Inbox/` and `Projects/` folders if you don't use them (or keep them if you added custom notes).
7. Remove `claude mcp remove todoist` if you added the Todoist MCP.
8. Pull the v2 skills and `CLAUDE.md`. Rerun `/personalize --quick` to refresh identity if needed.

If that feels like too much work, just keep using v1 on the `v1` tag: `git checkout v1`.

---

## v1 - Initial open-source release

See Git history up to the `v1` tag. v1 was built on the assumption that most PMs already use Todoist; v2 relaxes that assumption and makes the template work without any external task manager.
