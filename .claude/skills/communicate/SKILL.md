---
name: communicate
description: Draft a professional communication (Slack/email) with context from vault
argument-hint: "[what to communicate + to whom]"
---

# Draft a Communication

You are helping draft a professional communication based on context from the vault.

## Input

The user will provide via `$ARGUMENTS`:
- **What to communicate**: The topic or message content
- **To whom**: The recipient or audience

Example: "update engineering on API scope change"

## Workflow

1. **Read relevant context**:
   - Recent meetings in `Meetings/` that discussed this topic
   - Recent decisions in `Loose Notes/Work/` related to the topic
   - `Dashboard/Weekly P-Tasks.md` for current priorities
   - Any other relevant notes found via search

2. **Check communication preferences**:
   - Read `Dashboard/people-profiles.md` for recipient's communication style (if listed)
   - Note preferred channel, tone, level of detail

3. **Determine audience and tone**:
   - **Engineering teams**: Technical, specific, actionable
     - Include: Links to specs, APIs, issues, implementation details
     - Avoid: High-level marketing language
   - **Design teams**: User-focused, visual references
     - Include: User stories, customer context
     - Avoid: Deep technical implementation details
   - **Leadership**: Strategic, metrics-driven, concise
     - Include: Business impact, metrics, goal alignment, concise summary
     - Avoid: Implementation details, technical jargon
   - **Customers**: Professional, benefits-focused
     - Include: Business value, clear ROI, feature benefits
     - Avoid: Internal jargon, unfinished features, uncertainty

4. **Draft the message**:
   - Start with context (why this message now)
   - Present 2-3 key points clearly
   - End with clear next steps or call to action
   - Use appropriate formatting for the channel:
     - **Slack**: Use Slack markdown (`*bold*`, `-` bullets, `:emoji:`)
     - **Email**: Professional email format with subject line

5. **Include relevant links**:
   - Meeting notes (if referencing prior discussions)
   - GitHub issues (if relevant and accessible to recipient)
   - Any external links that support the message

## Output Format

**For Slack messages**:
```
📧 Slack message for [Recipient/Channel]:

[Message ready to copy-paste with Slack markdown formatting]
```

**For emails**:
```
📧 Email draft for [Recipient]:

**Subject**: [Clear, concise subject line]

[Email body ready to copy-paste]
```

## Example: Engineering Update

User: "update engineering on API scope change"

Draft:
```
📧 Slack message for #eng-platform:

*API scope update for next release*

We're adjusting the scope based on customer validation feedback:

*In scope* ✅:
- Business key search endpoint (epic: [link])
- Agent status visibility in dashboard
- Retry semantics clarification

*Out of scope* ⭕:
- Full execution timeline (moved to next cycle)

*Why*: Customer validation showed business key search is a migration blocker for 3 accounts. Timeline visualization requires UX work that doesn't fit this cycle.

*Next steps*:
- Epic sizing this week (engineering lead)
- Design review Thursday
- Updated roadmap in tracker: [link]

Questions? Thread below or ping me directly.
```

## Example: Leadership Update

User: "draft leadership update on Q1 progress"

Draft:
```
📧 Email draft for leadership:

**Subject**: Q1 Platform Progress - Key Milestone Update

Hi team,

Quick update on Q1 progress:

*Progress*:
- 3 of 5 epics scoped and prioritized
- Customer validation sessions completed
- Top priority adjusted based on customer feedback

*Metrics*:
- On track for target release
- 2 epics in active development

*Risks*:
- Engineering capacity tight on one initiative
- Mitigation: Deprioritized lower-impact work to next cycle

*Next milestone*: Design review [date], eng handoff [date].

Full details: [link]
```

## Notes

- Match the tone to the audience - don't send engineering-style updates to leadership
- Keep Slack messages under 200 words (people skim)
- Email subject lines should be clear and actionable
- Reference `Dashboard/people-profiles.md` for recipient-specific preferences
- Use Slack markdown formatting: `*bold*` (single asterisk), `-` bullets, `:emoji:` format
