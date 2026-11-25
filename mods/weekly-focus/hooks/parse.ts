import type { Focus, PTask, PTaskStatus } from '../types'

/** `[[a|b]]` to `b`, `[[a]]` to `a`, bold markers dropped. */
export const clean = (text: string): string =>
  text
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*/g, '')
    .trim()

/** HTML comments blanked out, line count kept, so examples inside them are never read. */
export const stripComments = (text: string): string =>
  text.replace(/<!--[\s\S]*?-->/g, comment => comment.replace(/[^\n]/g, ''))

/**
 * Both marker sets: `:LiCheck:` / `:LiRecycle:` / ⭕ / 🔴 / 🟡 / 🟢 and
 * ✅ done / 🔄 carried / ❌ dropped.
 */
export const statusOf = (prefix: string): PTaskStatus => {
  if (prefix.includes(':LiCheck:') || prefix.includes('🟢') || prefix.includes('✅')) return 'done'
  if (prefix.includes(':LiRecycle:') || prefix.includes('🔄')) return 'carried'
  if (prefix.includes('⭕') || prefix.includes('❌')) return 'dropped'
  if (prefix.includes('🔴')) return 'not-started'
  if (prefix.includes('🟡')) return 'partial'
  return 'open'
}

/** The newest week section (the first `# [[DD-MM-YYYY]]` heading): its date and P-lines. */
export const parsePTasks = (text: string): { week: string; tasks: PTask[] } => {
  const lines = stripComments(text).split('\n')
  const start = lines.findIndex(line => /^# \[\[\d{2}-\d{2}-\d{4}\]\]/.test(line))
  if (start === -1) return { week: '', tasks: [] }

  const week = lines[start]?.match(/\d{2}-\d{2}-\d{4}/)?.[0] ?? ''
  const tasks: PTask[] = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('# ') || line.startsWith('**Notes')) break
    const task = line.match(/^(.*?)\b(P\d):\s*(.+)$/)
    if (task !== null && !line.startsWith('- ')) {
      tasks.push({
        level: task[2] ?? '',
        text: clean(task[3] ?? ''),
        status: statusOf(task[1] ?? ''),
      })
      continue
    }
    const last = tasks[tasks.length - 1]
    if (line.startsWith('- ') && last !== undefined && last.note === undefined) {
      last.note = clean(line.slice(2))
    }
  }
  return { week, tasks }
}

const pad = (n: number) => String(n).padStart(2, '0')

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

/** `Closing the laptop: 17:30` on one line, or the time as the bullet under such a heading. */
export const closeAtFromJournal = (lines: string[]): string | undefined => {
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

/** The bullet after a line matching `marker`, without its `- `. */
const answerAfter = (lines: string[], marker: RegExp): string | undefined => {
  const at = lines.findIndex(line => marker.test(line))
  if (at === -1) return undefined
  for (const line of lines.slice(at + 1, at + 4)) {
    if (line.startsWith('#')) return undefined
    const value = line.replace(/^-\s*/, '').trim()
    if (line.startsWith('-') && value !== '') return clean(value)
  }
  return undefined
}

/** Reads "My focus for today" or "My focus today" (heading or bold line), a win line and a closing time. */
export const parseJournal = (
  text: string,
): Pick<Focus, 'winIf' | 'closeAt' | 'focus'> => {
  const lines = stripComments(text).split('\n')
  const focus: string[] = []
  const at = lines.findIndex(line => /my focus (for )?today/i.test(line))
  if (at !== -1) {
    for (const line of lines.slice(at + 1)) {
      const item = line.match(/^\s*\d+\.\s+(.+)$/)
      if (item === null) {
        if (focus.length > 0 || line.startsWith('#') || line.startsWith('```')) break
        continue
      }
      focus.push(clean(item[1] ?? ''))
    }
  }
  return {
    winIf: answerAfter(lines, /today I win if/i),
    closeAt: closeAtFromJournal(lines),
    focus,
  }
}
