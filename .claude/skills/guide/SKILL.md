---
name: guide
description: Interactive 8-module learning path for the shipped skills, role-adaptive
argument-hint: "[module number 1-8, or 'next', or 'reset']"
---

# Guide

An interactive tour through the shipped skills. Each module teaches one skill by running it against sample data in `samples/`. Designed for PMs, designers, analysts, or engineers - the skill adapts framing to the role set in `CLAUDE.md`.

## Progress tracking

Progress is stored in `.claude/memory/guide-progress.md`. The `.claude/memory/` directory ships with the template (see its `README.md`), so do NOT run `mkdir` or `ls` to check - use the `Read` tool directly, and if Read returns "file does not exist", treat it as a first run and create the file with `Write`.

When you create the progress file for the first time, use this content:

```markdown
---
tags: GuideProgress
started: YYYY-MM-DD
---

# /guide progress

- [ ] Module 1: /meeting
- [ ] Module 2: /today morning
- [ ] Module 3: /decision
- [ ] Module 4: /communicate
- [ ] Module 5: /create-epic
- [ ] Module 6: /competitive-research
- [ ] Module 7: Capstone
- [ ] Module 8: Extend your workspace
```

Mark a module complete (`[x]`) once the user finishes it.

## Mode selection

Keep tool calls minimal and silent - no `Bash ls`, no `mkdir`, no "let me check..." narration. The user wants a coach, not a script.

Check `$ARGUMENTS`:
- Empty or `next`:
  - Read `.claude/memory/guide-progress.md`. If Read returns "file does not exist", it's a first run: show the **first-run orientation**, create the progress file with `Write`, then ask "Ready to start Module 1? (y/n/skip)".
  - If it exists: show the **resume orientation** (one line: "You're on Module N of 8 - [Module title]. `/guide <n>` to jump, `/guide reset` to start over."), then ask "Ready to start Module N? (y/n/skip)".
- A number 1-8: jump straight to that module (no orientation) and ask "Ready to start Module [N]? (y/n/skip)".
- `reset`: delete `guide-progress.md`, confirm reset in one line, then show the **first-run orientation** and start at Module 1.

---

## First-run orientation

Show this on the first run (or after `reset`) before asking about Module 1. Keep it tight - a welcome, the full module list, and the commands. Do not turn it into a lecture.

```
Welcome to /guide - an interactive tour of the shipped skills.

What this is:
- 8 short modules, each teaching one skill by running it against sample data in samples/.
- Designed to be done over days, not one sitting. 1-2 modules per session is comfortable. About 5-10 minutes per module.
- Progress is saved in .claude/memory/guide-progress.md so you can stop and resume.
- Your role from CLAUDE.md is used to adapt the framing (PM / designer / analyst / engineer).

The 8 modules:
1. /meeting                   - turn raw meeting notes into a structured note + tasks
2. /today morning             - daily planning (mood, energy, focus items)
3. /decision                  - document a product decision with options + trade-offs
4. /communicate               - draft a Slack / email / async update for the right audience
5. /create-epic               - turn a raw idea into a structured epic draft
6. /competitive-research      - build a sourced competitive matrix
7. Capstone                   - chain /meeting -> /decision -> /communicate on one flow
8. Extend your workspace      - run /opportunity-solution-tree, add or write new skills

How to use:
- /guide           continue from where you left off (or start at Module 1 the first time)
- /guide next      same as above
- /guide <n>       jump to a specific module (e.g. /guide 3)
- /guide reset     wipe progress and start over

Inside a module you can answer:
- y        run the module now
- n        stop here (resume later with /guide)
- skip     mark it done and move to the next module
```

After this block, ask: "Ready to start Module 1? (y/n/skip)".

## Role adaptation

Read `CLAUDE.md` for the user's role. Adapt module framing accordingly:

- **Product Manager / Senior PM / Head of Product**: the default framing used below.
- **Designer**: reframe examples around design artifacts. Module 1's "meeting with engineering" becomes "design review with stakeholders". Module 5's "create-epic" becomes "draft a design brief using the epic structure". Module 6's "competitive research" becomes "design-pattern research".
- **Analyst / Researcher**: emphasize the research and insights modules (5, 6). De-emphasize the planning modules if the user says they don't plan that way.
- **Engineer**: frame modules 5-6 around technical investigation rather than product management.

Keep the same underlying skills; just reframe the examples and language so the user sees themselves in them.

---

## Guidance along the way

Tone: you are a coach walking the user through real skills, not a script executing steps. The user drives; you narrate, point at things, and invoke skills only when asked. Write in conversational prose - avoid long bulleted blocks, avoid code-fenced "cards" that look like markdown templates, avoid running `ls`, `mkdir`, or any "let me verify the file exists" bash. Verify silently with `Read` if you must.

Every module follows the same shape:

**At the start of a module, write a short conversational intro** (do NOT wrap it in a code fence). Include these four beats as flowing sentences or a short bullet list, whichever reads better, but keep it tight:

- Module N of 8, title, rough time (~5-10 min).
- One-line hook: what the user will walk away with.
- The sample file that goes with this module (exact path) - invite the user to open it and skim.
- How they can run the skill: tell them the exact command (e.g. `/meeting samples/sample-meeting-transcript.md`), and say they can either run it themselves or ask you to run it for them.

Example of the tone (do not copy verbatim - write it fresh for each module):

> **Module 1 of 8 - Your first meeting note** (~5 min)
>
> `/meeting` turns a raw transcript into a structured note with decisions, action items, and follow-up tasks for `Dashboard/tasks.md`. It's the thing you reach for when notes land in your inbox after a call and you want them to survive past the week.
>
> The sample transcript lives at `samples/sample-meeting-transcript.md` - open it if you want to see the kind of input `/meeting` handles.
>
> When you're ready, run `/meeting samples/sample-meeting-transcript.md` yourself, or just tell me "run it" and I'll invoke it for you. Either way, the skill will ask you to confirm before writing any tasks.

Then wait. Don't ask "Ready? (y/n/skip)" - that's script-like. The module starts when the user either runs the command themselves or tells you to. If they ask to skip, mark it done and move on. If they say "stop" or "later", stop and exit the skill.

**While running the module:**

- Invoke the skill only when the user has asked you to. If the user runs it themselves, step back and let the other skill do its thing - resume the guide conversation once they return.
- If you are invoking it on their behalf, narrate one short line first ("running `/meeting` on the sample - it'll ask you to confirm any tasks before writing").
- If the user asks a question mid-module, answer it, then offer to resume.
- Never create files, tasks, or notes without the per-skill confirmation the user has already agreed to.

**At the end of a module, write a short conversational recap** (again, not in a code fence). Include:

- A one-line "done" with a simple progress indicator (e.g. "Module 1 done - 1 of 8").
- One or two lines on what was just created (real filenames the user can open).
- One line on when they'd reach for this skill in real work (the takeaway).
- A one-line nudge to the next module, naming it and its hook, followed by "say `next` when you're ready, or stop here and pick up later with `/guide`".

For Module 8, skip the "next module" nudge - use the existing "Congratulations - you've completed /guide" block already in this file.

After the recap, update `.claude/memory/guide-progress.md` to mark the module done.

**Content in the module sections below is reference material, not a script.** Each module lists what the skill does, the sample file path, and what artifacts to expect. Use it to inform your own conversational narration - do not paste numbered "Try this" lists directly into the chat. The Module 1 section shows the right tone (look at its "How the module runs" block).

---

## Module 1: Your first meeting note

**What `/meeting` does**: turns raw notes from a meeting into a structured note with decisions, action items, and a list of follow-up tasks for you.

**Why it exists**: raw meeting notes rot. A structured note is searchable, links back to your journal, and surfaces the tasks you committed to without relying on your memory.

**How the module runs** (write this to the user conversationally, do NOT copy the numbered list below):

The sample transcript already lives at `samples/sample-meeting-transcript.md`. Point the user at it and invite them to open/skim it first if they want to see the kind of input `/meeting` handles. Then tell them they can either run `/meeting samples/sample-meeting-transcript.md` themselves, or say "run it" and you'll invoke it for them. When the skill asks to confirm tasks, the user says y/n themselves - don't answer on their behalf.

**See the artifact**:
- A new file in `Meetings/` named `2026-04-XX - [title].md` (or similar) with structured sections.
- A new task in `Dashboard/tasks.md` under "This week" sourced from the meeting.
- A link added to today's journal under `## Notes` (if today's journal exists).

**Recap hook for Module 1**: takeaway is "when raw notes hit your inbox, reach for /meeting instead of copy-pasting into a doc - it extracts commitments you'd otherwise forget." Next module hook: "Morning planning - pick 3 focus items, not 10."

Then print the end-of-module recap block from the "Guidance along the way" section.

---

## Module 2: Morning planning

**What `/today morning` does**: opens (or creates) today's journal, asks how you're feeling, takes your calendar, and sets up to 3 focus items drawn from `Dashboard/tasks.md` and your weekly P-Tasks.

**Why it exists**: three focus items beats ten. This skill forces the question.

**Try this**:

1. Run: `/today morning`
2. Answer the personal questions honestly (mood, energy, self-care, yesterday evening).
3. Paste a calendar screenshot, or describe your day in text if you don't have a calendar handy. For testing, you can say: "Only meeting today is a 30-min 1:1 at 3pm."
4. Pick a focus item when suggested. The skill will respect capacity - if your energy is low, it'll suggest fewer focus items.

**See the artifact**:
- A filled journal at `journals/YYYY/MM-Month/DD-MM-YYYY.md` with mood, energy, self-care, and "My focus today".
- A 🎯 marker added to the task(s) you picked as focus in `Dashboard/tasks.md`.

**Recap hook for Module 2**: takeaway is "a 3-focus-item day beats a 10-task wish list - /today morning forces the prioritization." Next module hook: "Document a decision so it doesn't get lost in Slack."

Then print the end-of-module recap block.

---

## Module 3: Logging a decision

**What `/decision` does**: gathers context from the vault and (if configured) GitHub, drafts 2-3 options with trade-offs, creates a decision note, and proposes follow-up tasks.

**Why it exists**: decisions get made in meetings, Slack threads, or your head. Without documentation they're forgotten by next quarter, relearned painfully, and sometimes reversed without anyone noticing.

**Try this**:

1. Read `samples/sample-decision-context.md` for a sample decision you can walk through.
2. Run: `/decision should we ship the auth rewrite before or after the onboarding redesign`
3. When asked about additional context, paste the content of `samples/sample-decision-context.md`.
4. Watch the skill produce options with pros/cons, draft a decision note in `Loose Notes/Work/`, and propose follow-up tasks.
5. Confirm the tasks when asked.

**See the artifact**:
- A new decision note in `Loose Notes/Work/YYYY-MM-DD - Decision - [topic].md`.
- A link in today's journal.
- Tasks added to `Dashboard/tasks.md`.

**Recap hook for Module 3**: takeaway is "when a decision happens in Slack or a meeting, the only way it survives the next quarter is a decision note - /decision makes it a 5-minute habit, not a project." Next module hook: "Draft a crisp async update that already knows the context."

Then print the end-of-module recap block.

---

## Module 4: Drafting a crisp async update

**What `/communicate` does**: drafts a message (Slack, email, or async doc) matched to the audience. Pulls context from recent meetings, decisions, and P-Tasks. Respects the formatting rules for the channel.

**Why it exists**: PMs re-explain the same context over and over. The skill lets you say "update engineering on X" and get back a draft that already knows what X is.

**Try this**:

1. Read `samples/sample-update-context.md` for a sample message you need to send.
2. Run: `/communicate update engineering leadership on the auth-first decision - Slack`
3. Paste the context from the sample when asked (or just paste the whole file).
4. The skill will produce a draft formatted for Slack (single-asterisk bold, hyphen bullets, `:emoji_name:` format).

**See the artifact**:
- A Slack-formatted draft in the chat output, ready to copy-paste.

**Try the variations**:
- Run again with `- email` at the end for an email draft.
- Run again with `- async doc` for an inverted-pyramid written update.

**Recap hook for Module 4**: takeaway is "stop re-explaining context - /communicate pulls from the vault you've been building, matches the channel's format, and hands you a ready-to-paste draft." Next module hook: "Go from raw idea to a structured epic in one command."

Then print the end-of-module recap block.

---

## Module 5: Creating your first epic

**What `/create-epic` does**: turns a raw idea into a structured epic draft using `templates/epic-template.md`. Sets stage to Explore. Fills what it can; marks the rest as "to be determined in Scope."

**Why it exists**: most ideas die in the gap between "hmm, we should think about that" and a document someone can review. This skill closes the gap in one command.

**Try this**:

1. Read `samples/sample-epic-idea.md` - a raw idea from a CSM kickoff meeting.
2. Run: `/create-epic samples/sample-epic-idea.md`
3. Answer the 3-5 clarifying questions (target persona, metric, initiative fit, etc.). If you don't know, say so honestly - the skill will mark those sections accordingly.
4. Review the draft the skill produces.

**See the artifact**:
- A new epic file in `epics/YYYY-MM-DD - [Title].md` with `stage: Explore`.
- Follow-up tasks in `Dashboard/tasks.md` (schedule interviews, run competitive research, etc.).
- A link in today's journal.

**Designers**: the same skill works for drafting a design brief - swap "epic" for "design brief" mentally, and use section 1 (Value Prop) + section 2 (User Problem) + section 7 (Design Planning) as your main canvas.

**Recap hook for Module 5**: takeaway is "most ideas die in the gap between 'we should think about that' and a document someone can review - /create-epic closes that gap in one command." Next module hook: "Gather competitive evidence before locking in a direction."

Then print the end-of-module recap block.

---

## Module 6: Competitive research

**What `/competitive-research` does**: produces a sourced competitive matrix for a focused research question. Every observation has a source link.

**Why it exists**: "what do competitors do" is usually answered by opinion. This skill forces evidence.

**Try this**:

1. Read `samples/sample-competitor-prompt.md` - a research prompt about how competitors handle first-time user onboarding.
2. Run: `/competitive-research samples/sample-competitor-prompt.md`
3. Confirm the competitor set the skill suggests (or adjust).
4. The skill will gather observations from public sources and build a matrix.
5. Review the matrix and the synthesis paragraphs below it.

**See the artifact**:
- A new research note in `research/YYYY-MM-DD - Competitive - [Topic].md` with a sourced matrix.
- Every cell is marked `observed:` or `inferred:`.
- A methodology section calls out gaps and confidence level.

**Recap hook for Module 6**: takeaway is "opinion-driven 'what competitors do' breaks in leadership reviews - /competitive-research forces every claim to have a source, which is what makes the matrix useful." Next module hook: "Capstone - chain /meeting, /decision, and /communicate on one realistic flow."

Then print the end-of-module recap block.

---

## Module 7: Capstone - chain it

**What the capstone teaches**: real PM work rarely stops after one skill run. Most real workflows chain 2-3 skills. This module walks you through a realistic flow end-to-end.

**The flow**: `/meeting` -> `/decision` -> `/communicate`.

**Try this**:

1. Run: `/meeting samples/sample-capstone-meeting.md`

   Watch the skill produce a structured meeting note. The meeting has a real contentious item: whether the billing UI revamp should include a full self-service invoice portal or just fix the top-5 complaints.

2. Run: `/decision invoice portal scope for billing UI revamp`

   The skill will read the just-created meeting note as context, draft options with trade-offs, and propose a decision note.

3. Run: `/communicate update cross-functional stakeholders on the invoice portal scope decision - Slack`

   The skill will pull from the decision note you just wrote and draft a Slack message.

**See the artifacts** (three total):
- Meeting note in `Meetings/`.
- Decision note in `Loose Notes/Work/`.
- Slack draft in the chat output.

All three link to each other; follow-up tasks from each land in `Dashboard/tasks.md` under "This week".

**Observation**: notice how each skill used the artifacts of the previous one. This is the power of the vault-as-memory pattern. You didn't re-explain context at any step.

**Recap hook for Module 7**: takeaway is "real PM work chains skills - the vault becomes memory so each skill builds on the last without you re-explaining anything. This is the payoff pattern." Next module hook: "Extend your workspace - run an external skill, install more, write your own."

Then print the end-of-module recap block.

---

## Module 8: Extend your workspace

**What this module teaches**: how to add a new skill to your workspace - either one someone else wrote, or one you wrote yourself.

**Why it matters**: the shipped skills are starters. Your real workflow probably needs a few you haven't built yet. The ecosystem of PM-focused Claude Code skills is growing - you can borrow from it.

**Part 1: Run the bundled external skill**

Your workspace ships one skill from outside: `/opportunity-solution-tree`, ported from [phuryn/pm-skills](https://github.com/phuryn/pm-skills) under MIT license. See `.claude/skills/opportunity-solution-tree/ATTRIBUTION.md` for the full attribution.

Try it:

1. Run: `/opportunity-solution-tree reduce new-user activation drop-off from 40% to 25%`
2. The skill will walk you through a Teresa Torres opportunity-solution tree: outcome -> opportunities -> solutions -> experiments.

**Part 2: How to add a skill from the internet**

Browse skill libraries:
- [phuryn/pm-skills](https://github.com/phuryn/pm-skills) - 60+ PM skills across discovery, strategy, execution, GTM, analytics.
- Search GitHub for `claude-code skill pm` or `claude-code skill [topic]`.

To add an external skill:

1. **Check the license**. MIT, Apache 2.0, and similar permissive licenses are fine. GPL and proprietary are not (for this personal-template use case).
2. **Copy the skill folder** into `.claude/skills/` locally. Example: `cp -r ~/Downloads/some-skill .claude/skills/`.
3. **Keep the attribution**. If the upstream has a LICENSE or ATTRIBUTION file, copy it into the skill's folder.
4. **Restart Claude Code** so the new skill is picked up.
5. **Test it**. Run the skill once to confirm it works in your environment.
6. **Add it to your `CLAUDE.md` dispatch table** so future you (and other Claude sessions) know it exists.

**Part 3: How to write your own skill**

- **One skill per repeated workflow.** If you're doing the same thing more than three times, encode it.
- **Structure**: a folder `.claude/skills/[name]/` with a `SKILL.md` containing frontmatter (`name`, `description`, `argument-hint`) and a workflow body.
- **Start by copying an existing skill** (e.g., `/decision` or `/meeting`) and editing it. Easier than starting from scratch.
- **Name it by the action, not the object**: `/meeting` not `/process-meeting-notes`. Shorter commands get used more.

**See the artifact**:
- An opportunity-solution tree you generated, saved if the skill chose to.
- Your understanding of how to extend the workspace.

**Congratulations - you've completed `/guide`.**

Next steps on your own:
- Run `/weekly-plan` this Sunday or Monday to plan your actual week.
- Run `/personalize --deep` to add MCP detection, initiatives, and people profiles.
- Build one skill for a workflow you do repeatedly.

Mark module 8 done in `guide-progress.md`.

---

## Notes on running the guide

- Modules are designed to be done over days, not in one sitting. 1-2 per day is sustainable.
- The guide never writes tasks without your confirmation. Same rule as the other skills.
- If a module's sample file is missing, the skill will recreate it from this guide's templates.
- You can skip modules. The `reset` argument starts over.
