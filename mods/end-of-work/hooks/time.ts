import type { Closing } from '../types'
import { journalPath, pad, wallClock } from './clock'

export const DEFAULT_CLOSE = '18:00'
export const DEFAULT_HEADS_UP = 15

export type Config = {
  closeAt: string
  headsUpMinutes: number
  weekdaysOnly: boolean
  timezone: string
  workspace: string
  journalFolder: string
}

/** `17:00`, `17.30`, `17` or `5pm` to `HH:MM`; undefined when it reads as no time. */
export const parseTime = (raw: string): string | undefined => {
  const match = raw.trim().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?/i)
  if (match === null) return undefined
  let hours = Number(match[1])
  const minutes = Number(match[2] ?? '0')
  if (match[3]?.toLowerCase() === 'pm' && hours < 12) hours += 12
  if (match[3]?.toLowerCase() === 'am' && hours === 12) hours = 0
  if (hours > 23 || minutes > 59) return undefined
  return `${pad(hours)}:${pad(minutes)}`
}

/** The plugin's options, with defaults for anything missing or malformed. */
export const configFrom = (options: Readonly<Record<string, unknown>>): Config => {
  const str = (key: string, fallback: string) =>
    typeof options[key] === 'string' ? (options[key] as string) : fallback
  const minutes = Number(options.headsUpMinutes)
  return {
    closeAt: parseTime(str('closeAt', DEFAULT_CLOSE)) ?? DEFAULT_CLOSE,
    headsUpMinutes: Number.isFinite(minutes) && minutes >= 0 ? minutes : DEFAULT_HEADS_UP,
    weekdaysOnly: options.weekdaysOnly !== false,
    timezone: str('timezone', ''),
    workspace: str('workspace', ''),
    journalFolder: str('journalFolder', 'journals') || 'journals',
  }
}

/**
 * The closing time a daily note names, from either form:
 * `Closing the laptop: 17:30` on one line, or a heading containing
 * "closing the laptop" with the time as the next bullet. Case-insensitive.
 */
export const closeAtFromJournal = (text: string): string | undefined => {
  const lines = text.split('\n')
  const at = lines.findIndex(line => /closing the laptop/i.test(line))
  if (at === -1) return undefined
  const sameLine = (lines[at] ?? '').replace(/^.*closing the laptop[^:]*:?/i, '').replace(/\*/g, '')
  const inline = sameLine.trim() === '' ? undefined : parseTime(sameLine)
  if (inline !== undefined) return inline
  for (const line of lines.slice(at + 1, at + 4)) {
    if (line.startsWith('#')) return undefined
    if (line.startsWith('-')) return parseTime(line.replace(/^-\s*/, ''))
  }
  return undefined
}

export const todayPath = (root: string, config: Config, ms: number) =>
  journalPath(root, config.journalFolder, wallClock(ms, config.timezone))

export const closingAt = (ms: number, config: Config, fromJournal: string | undefined): Closing => {
  const w = wallClock(ms, config.timezone)
  const time = fromJournal ?? config.closeAt
  const [hours = 18, minutes = 0] = time.split(':').map(Number)
  return {
    date: journalPath('/', config.journalFolder, w).date,
    closeAt: time,
    isFromJournal: fromJournal !== undefined,
    minutesLeft: hours * 60 + minutes - (w.hours * 60 + w.minutes),
    isWorkday: !config.weekdaysOnly || (w.weekday >= 1 && w.weekday <= 5),
  }
}

export const LINES = [
  'Stop now so tomorrow starts strong.',
  'The last task will still be there in the morning.',
  'Write down where you stopped and close the laptop.',
]

export const LATE_LINE = 'An hour past closing. Write down where you stopped and close the laptop.'

/** The line for how far past closing it is; it changes by the day, not each minute. */
export const lineFor = (minutesPast: number, date: string): string => {
  if (minutesPast >= 60) return LATE_LINE
  const day = Number(date.slice(0, 2))
  return LINES[day % LINES.length] ?? LATE_LINE
}

export const formatPast = (minutes: number): string =>
  minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${pad(minutes % 60)}m`
