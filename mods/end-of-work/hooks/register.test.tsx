import { expect, test } from 'claude-code/testing'

import { LATE_LINE, LINES, closeAtFromJournal, configFrom, lineFor } from './time'
import { joinPath, wallClock } from './clock'

const BAND = {
  plugin: 'end-of-work',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false, isCollapsed: false, isWorking: false, maxRows: 4, bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 4 }, view: {},
  },
} as const

const INLINE_NOTE = '## Today\n\nClosing the laptop: 17:00\n\n**My focus today (max 3):**\n1. Ship it\n'
const HEADING_NOTE = '#### ⏰ What time am I closing the laptop:\n- 17:00\n\n#### 🚀 My focus'

/** Friday 6 November 2026, UTC wall clock. */
const at = (utcHour: number, utcMinute: number) => Date.UTC(2026, 10, 6, utcHour, utcMinute)
const UTC = { options: { timezone: 'UTC' } } as const

const paths: string[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (on: any, now: number, note: string | null = INLINE_NOTE) => {
  paths.length = 0
  on('clock.now', () => ({ value: now }))
  on('session.cwd', () => ({ value: '/work/space/' }))
  on('fs.exists', (_: unknown, e: { path: string }) => {
    paths.push(e.path)
    return { value: note !== null }
  })
  on('fs.read', () => ({ value: note ?? '' }))
  on('ui.status', () => ({ value: undefined }))
  on('ui.toast', () => ({ value: undefined }))
  on('session.start', (_: unknown, e: { cwd: string }) => ({ cwd: e.cwd }))
  on('clock.every', () => ({ value: undefined }))
}

const start = { cwd: '/work/space', surface: 'desktop', isInteractive: true } as const

test('past closing time the band says how far past, on every surface', UTC, async ($, on) => {
  setup(on, at(17, 45))
  await $.session.start(start)
  expect(paths).toContain('/work/space/journals/2026/11-November/06-11-2026.md')
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Text', text: /45m past 17:00/ })).toBeDefined()
    await ui.unmount()
  }
})

test('the heading-and-bullet form of the daily note works too', UTC, async ($, on) => {
  setup(on, at(17, 5), HEADING_NOTE)
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await ui.find({ type: 'Text', text: /5m past 17:00/ })).toBeDefined()
  await ui.unmount()
})

test('with no daily note the configured closing time and heads-up apply', {
  options: { timezone: 'UTC', closeAt: '17:30', headsUpMinutes: 30 },
}, async ($, on) => {
  setup(on, at(17, 10), null)
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /Closing time is 17:30, in 20m/ })).toBeDefined()
  await ui.unmount()
})

test('before the heads-up window the band stays empty', UTC, async ($, on) => {
  setup(on, at(13, 0))
  on('ui.render', ($, e) => { const { Text } = $.ui.resolve(e); return <Text>engine</Text> })
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /past|Closing time/ })).toBeUndefined()
  await ui.unmount()
})

test('weekends stay quiet unless weekdaysOnly is off', UTC, async ($, on) => {
  setup(on, Date.UTC(2026, 10, 7, 18, 30)) // Saturday
  on('ui.render', ($, e) => { const { Text } = $.ui.resolve(e); return <Text>engine</Text> })
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /past/ })).toBeUndefined()
  await ui.unmount()
})

test('weekdaysOnly off speaks on a Saturday', { options: { timezone: 'UTC', weekdaysOnly: false } }, async ($, on) => {
  setup(on, Date.UTC(2026, 10, 7, 18, 30))
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /1h 30m past 17:00/ })).toBeDefined()
  await ui.unmount()
})

test('the workspace option replaces the session folder', {
  options: { timezone: 'UTC', workspace: '/notes/', journalFolder: 'daily' },
}, async ($, on) => {
  setup(on, at(12, 0))
  await $.session.start(start)
  expect(paths).toContain('/notes/daily/2026/11-November/06-11-2026.md')
})

test('a named time zone moves the wall clock', { options: { timezone: 'America/New_York' } }, async ($, on) => {
  setup(on, at(22, 45)) // 17:45 in New York (EST)
  await $.session.start(start)
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await ui.find({ type: 'Text', text: /45m past 17:00/ })).toBeDefined()
  await ui.unmount()
})

test('an empty or unknown time zone reads local time', async () => {
  const ms = at(9, 30)
  const local = new Date(ms)
  for (const zone of ['', 'Not/AZone']) {
    const w = wallClock(ms, zone)
    expect([w.hours, w.minutes, w.day]).toEqual([local.getHours(), local.getMinutes(), local.getDate()])
  }
})

test('config defaults', async () => {
  expect(configFrom({})).toEqual({
    closeAt: '18:00', headsUpMinutes: 15, weekdaysOnly: true, timezone: '', workspace: '', journalFolder: 'journals',
  })
  expect(configFrom({ closeAt: 'later', headsUpMinutes: -3 }).closeAt).toBe('18:00')
  expect(configFrom({ closeAt: '5pm', headsUpMinutes: 5 })).toMatchObject({ closeAt: '17:00', headsUpMinutes: 5 })
})

test('closing time parsing', async () => {
  expect(closeAtFromJournal(INLINE_NOTE)).toBe('17:00')
  expect(closeAtFromJournal('**Closing the laptop:** 17.30')).toBe('17:30')
  expect(closeAtFromJournal(HEADING_NOTE)).toBe('17:00')
  expect(closeAtFromJournal('# Nothing here')).toBeUndefined()
  expect(joinPath('/', 'journals', '2026')).toBe('/journals/2026')
})

test('only the four neutral lines are ever shown', async () => {
  expect(LINES).toEqual([
    'Stop now so tomorrow starts strong.',
    'The last task will still be there in the morning.',
    'Write down where you stopped and close the laptop.',
  ])
  expect(LATE_LINE).toBe('An hour past closing. Write down where you stopped and close the laptop.')
  const shown = new Set<string>()
  for (let day = 1; day <= 31; day += 1) {
    for (const past of [0, 30, 59, 60, 200]) shown.add(lineFor(past, `${String(day).padStart(2, '0')}-11-2026`))
  }
  expect([...shown].sort()).toEqual([...LINES, LATE_LINE].sort())
})
