import { expect, test } from 'claude-code/testing'

import { configFrom } from './register'
import { parseJournal, parsePTasks } from './parse'
import { parseTasksFile, toggleTask } from './tasks-file'

const PANE = {
  plugin: 'weekly-focus',
  component: 'Pane',
  requestId: 'weekly-focus',
  props: {
    title: 'Weekly focus', isFocused: false, bodyColumns: 50, placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 }, view: {},
  },
} as const

/** Emoji-and-icon marker set, heading-style daily note. */
const PTASKS = `---\ntags: [x]\n---\n# [[16-11-2026]]\n:LiCheck: P1: Ship the GTM deck - ~10-slide cut, [[A|the deck]]\n- Completed - done Wed.\n🟡 P2: Drive the pricing decision - brief\n⭕ P3: Tidy the backlog\n\n**Notes:**\n- P9: not a task\n\n# [[09-11-2026]]\nP1: old week\n`
const JOURNAL = `#### 🏁 Today I win if:\n- GTM deck cut sent.\n\n#### ⏰ What time am I closing the laptop:\n- 17:30\n\n#### 🚀 My focus for today (max 3):\n1. Cut v8\n`

/** The starter template's marker set, with its example week inside an HTML comment. */
const TEMPLATE_PTASKS = `---\ntags: Dashboard\n---\n# Weekly P-Tasks\n\n**Status markers**:\n- ✅ Done\n\n---\n\n<!-- New weeks are added below this line. Most recent week on top. -->\n# [[16-11-2026]]\n✅ P1: Ship API documentation for v2 endpoints\n🔄 P2: Review the Q1 roadmap - needs one more pass\n❌ P3: Draft blog post\nP4: Clean up backlog\n\n**Notes:**\n- fine\n\n<!-- Example:\n\n# [[06-01-2026]]\n✅ P1: Example only\n-->\n`
const TEMPLATE_NOTE = `## Today\n\n**My focus today (max 3):**\n1. Write the spec\n2.\n3.\n\n---\n## Notes\n`

const TASKS_MD = `---\ntags: Dashboard\n---\n# Tasks\n\nFormat: \`- [ ] Task description - source: [[note title]] - due: YYYY-MM-DD - priority: P1-P4\`\n\n## This week\n\n<!-- Active tasks for the current week. -->\n- [ ] Review the spec - source: [[2026-11-18 - Sync]] - due: 2026-11-21 - priority: P2\n- [ ] 🎯 Send the update - priority: P1\n- [x] Already done - priority: P1\n\n## Next\n\n- [ ] Overdue from next - due: 2026-11-10 - priority: P3\n- [ ] Not yet - due: 2026-12-01\n\n## Backlog\n\n- [ ] Someday\n`

const TASKS = {
  tasks: [
    { id: 'a', content: 'Finish the prototype', priority: 'p3', dueDate: '2026-11-19', checked: false },
    { id: 'b', content: 'Cut v8 into GTM version', priority: 'p1', dueDate: '2026-11-19', checked: false },
    { id: 'c', content: 'Old thing', priority: 'p4', dueDate: '2026-11-10', checked: false },
  ],
}

const UTC = { options: { timezone: 'UTC' } } as const
const start = { cwd: '/work/space', surface: 'desktop', isInteractive: true } as const

const calls: string[] = []
const toasts: string[] = []
const reads: string[] = []
const writes: { path: string; text: string }[] = []
let failWith: string | undefined
let files: Record<string, string> = {}
let todoistMode: 'ok' | 'absent' | 'error' = 'ok'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (on: any, fixture: { ptasks?: string; journal?: string; tasks?: string } = {}) => {
  calls.length = 0
  toasts.length = 0
  reads.length = 0
  writes.length = 0
  failWith = undefined
  todoistMode = 'ok'
  files = {
    'Weekly P-Tasks.md': fixture.ptasks ?? PTASKS,
    'tasks.md': fixture.tasks ?? TASKS_MD,
    '.md': fixture.journal ?? JOURNAL,
  }
  const fileFor = (path: string) =>
    Object.entries(files).find(([suffix]) => path.endsWith(suffix))?.[1] ?? ''
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 19, 10, 0) }))
  on('clock.every', () => ({ value: undefined }))
  on('clock.after', () => ({ value: undefined }))
  on('session.cwd', () => ({ value: '/work/space' }))
  on('fs.exists', () => ({ value: true }))
  on('fs.read', (_: unknown, e: { path: string }) => {
    reads.push(e.path)
    return { value: fileFor(e.path) }
  })
  on('fs.write', (_: unknown, e: { path: string; text: string }) => {
    writes.push(e)
    files['tasks.md'] = e.text
    return { value: undefined }
  })
  on('mcp.call', (_: unknown, e: { tool: string }) => {
    calls.push(e.tool)
    if (todoistMode === 'absent') throw new Error('MCP server "todoist" is not connected')
    if (failWith !== undefined) {
      return { value: { isError: true, content: [{ type: 'text', text: failWith }] } }
    }
    return {
      value: { isError: false, content: [{ type: 'text', text: JSON.stringify(TASKS) }] },
    }
  })
  on('command.register', () => ({ value: { command: 'weekly-focus' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('ui.toast', (_: unknown, e: { text: string }) => {
    toasts.push(e.text)
    return { value: undefined }
  })
  on('session.start', (_: unknown, e: { cwd: string }) => ({ cwd: e.cwd }))
}

test('today shows Todoist tasks, overdue first; the week shows short titles', UTC, async ($, on) => {
  setup(on)
  await $.session.start(start)
  expect(reads).toContain('/work/space/Dashboard/Weekly P-Tasks.md')
  expect(reads).toContain('/work/space/journals/2026/11-November/19-11-2026.md')

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    await ui.press({ key: 'refresh' })
    const texts = (await ui.findAll({ type: 'Text' })).map(t => t.text)
    expect(texts.some(t => /Win: GTM deck cut sent/.test(t))).toBe(true)
    expect(texts.some(t => /Old thing overdue/.test(t))).toBe(true)
    expect(texts.some(t => /Cut v8 into GTM version/.test(t))).toBe(true)
    expect(texts.some(t => /P1 Ship the GTM deck$/.test(t))).toBe(true)
    expect(texts.some(t => /P9|old week|10-slide/.test(t))).toBe(false)
    expect(texts.some(t => /Closes 17:30/.test(t))).toBe(true)
    await ui.unmount()
  }
})

test('pressing a task completes it in Todoist and offers undo', UTC, async ($, on) => {
  setup(on)
  await $.session.start(start)

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'refresh' })
  await ui.press({ key: 'done-b' })
  expect(calls).toContain('complete-tasks')
  expect(await ui.find({ key: 'undo-b' })).toBeDefined()

  await ui.press({ key: 'undo-b' })
  expect(calls).toContain('uncomplete-tasks')
  await ui.unmount()
})

test('a failed completion says why in the toast', UTC, async ($, on) => {
  setup(on)
  await $.session.start(start)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'refresh' })

  failWith = 'Error POSTing to endpoint: { statusCode: 500, message: Internal server error }'
  await ui.press({ key: 'done-b' })
  expect(toasts.some(t => /Cut v8 into GTM version": Todoist is not reachable \(500\)/.test(t))).toBe(true)
  await ui.unmount()
})

test('a connected Todoist that errors shows the error, not the file', UTC, async ($, on) => {
  setup(on)
  failWith = 'Error: { statusCode: 503 }'
  await $.session.start(start)
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  await ui.press({ key: 'refresh' })
  const texts = (await ui.findAll({ type: 'Text' })).map(t => t.text)
  expect(texts.some(t => /Todoist is not reachable \(503\)/.test(t))).toBe(true)
  expect(texts.some(t => /Review the spec/.test(t))).toBe(false)
  await ui.unmount()
})

test('without Todoist the pane reads tasks.md and ticking flips [ ] to [x], with undo', UTC, async ($, on) => {
  setup(on, { ptasks: TEMPLATE_PTASKS, journal: TEMPLATE_NOTE })
  todoistMode = 'absent'
  await $.session.start(start)

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    await ui.press({ key: 'refresh' })
    const texts = (await ui.findAll({ type: 'Text' })).map(t => t.text)
    expect(texts.some(t => /^● Overdue from next overdue$/.test(t))).toBe(true)
    expect(texts.some(t => /Review the spec$/.test(t))).toBe(true)
    expect(texts.some(t => /Send the update$/.test(t))).toBe(true)
    expect(texts.some(t => /Not yet|Someday|Already done|source:/.test(t))).toBe(false)
    expect(texts.some(t => /^Win:|Closes/.test(t))).toBe(false)
    expect(texts.some(t => /P1 Ship API documentation for v2 endpoints/.test(t))).toBe(true)
    expect(texts.some(t => /Example only/.test(t))).toBe(false)
    await ui.unmount()
  }

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'refresh' })
  const send = TASKS_MD.split('\n').findIndex(l => l.includes('Send the update')) + 1
  await ui.press({ key: `done-f${send}` })
  expect(writes[0]?.path).toBe('/work/space/Dashboard/tasks.md')
  expect(writes[0]?.text).toContain('- [x] 🎯 Send the update - priority: P1')
  expect(await ui.find({ key: `undo-f${send}` })).toBeDefined()

  await ui.press({ key: `undo-f${send}` })
  expect(writes[1]?.text).toBe(TASKS_MD)
  await ui.unmount()
})

test('an empty todoistServer never calls Todoist', { options: { timezone: 'UTC', todoistServer: '' } }, async ($, on) => {
  setup(on)
  await $.session.start(start)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'refresh' })
  expect(calls).toEqual([])
  expect(reads).toContain('/work/space/Dashboard/tasks.md')
  await ui.unmount()
})

test('configured paths and workspace are used', {
  options: { timezone: 'UTC', workspace: '/notes', weeklyPriorities: 'plan/week.md', journalFolder: 'daily' },
}, async ($, on) => {
  setup(on)
  await $.session.start(start)
  expect(reads).toContain('/notes/plan/week.md')
  expect(reads).toContain('/notes/daily/2026/11-November/19-11-2026.md')
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'refresh' })
  await ui.unmount()
})

test('config defaults', async () => {
  expect(configFrom({})).toEqual({
    workspace: '',
    weeklyPriorities: 'Dashboard/Weekly P-Tasks.md',
    tasksFile: 'Dashboard/tasks.md',
    todoistServer: 'todoist',
    journalFolder: 'journals',
    timezone: '',
    openOnStart: true,
  })
  expect(configFrom({ todoistServer: '' }).todoistServer).toBe('')
  expect(configFrom({ weeklyPriorities: '  ' }).weeklyPriorities).toBe('Dashboard/Weekly P-Tasks.md')
})

test('both status-marker sets parse', async () => {
  expect(parsePTasks(PTASKS).tasks.map(t => t.status)).toEqual(['done', 'partial', 'dropped'])
  expect(parsePTasks(TEMPLATE_PTASKS)).toMatchObject({
    week: '16-11-2026',
    tasks: [
      { level: 'P1', status: 'done' },
      { level: 'P2', status: 'carried' },
      { level: 'P3', status: 'dropped' },
      { level: 'P4', status: 'open' },
    ],
  })
  expect(parsePTasks('🔴 P1: x').tasks).toEqual([])
  expect(parsePTasks('# [[01-01-2026]]\n🔴 P1: a\n:LiRecycle: P2: b').tasks.map(t => t.status)).toEqual(['not-started', 'carried'])
})

test('both focus headings and the inline closing time parse', async () => {
  expect(parseJournal(TEMPLATE_NOTE)).toEqual({ winIf: undefined, closeAt: undefined, focus: ['Write the spec'] })
  expect(parseJournal(JOURNAL)).toEqual({ winIf: 'GTM deck cut sent.', closeAt: '17:30', focus: ['Cut v8'] })
  expect(parseJournal('Closing the laptop: 5pm').closeAt).toBe('17:00')
})

test('tasks.md parsing and toggling', async () => {
  const tasks = parseTasksFile(TASKS_MD, '2026-11-19')
  expect(tasks.map(t => [t.content, t.priority, t.dueDate])).toEqual([
    ['Review the spec', 'p2', '2026-11-21'],
    ['Send the update', 'p1', undefined],
    ['Overdue from next', 'p3', '2026-11-10'],
  ])
  const line = tasks[0]?.line ?? ''
  const ticked = toggleTask(TASKS_MD, line, true) ?? ''
  expect(ticked).toContain('- [x] Review the spec')
  expect(toggleTask(ticked, line, false)).toBe(TASKS_MD)
  expect(toggleTask(TASKS_MD, '- [ ] gone', true)).toBeUndefined()
})
