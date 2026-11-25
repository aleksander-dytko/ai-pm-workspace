import type { TodoTask } from '../types'
import { clean, stripComments } from './parse'

const OPEN = /^(\s*[-*] )\[ \] (.+)$/

/**
 * Open tasks from a markdown list in the form
 * `- [ ] Task - source: [[note]] - due: YYYY-MM-DD - priority: P1`:
 * every one under "This week", plus any elsewhere due today or earlier.
 */
export const parseTasksFile = (text: string, today: string): TodoTask[] => {
  const raw = text.split('\n')
  const lines = stripComments(text).split('\n')
  const tasks: TodoTask[] = []
  let section = ''
  lines.forEach((line, i) => {
    const heading = line.match(/^#{1,6}\s+(.+)$/)
    if (heading !== null) {
      section = (heading[1] ?? '').trim().toLowerCase()
      return
    }
    const open = line.match(OPEN)
    if (open === null) return
    const body = open[2] ?? ''
    const due = body.match(/ - due:\s*(\d{4}-\d{2}-\d{2})/i)?.[1]
    const priority = body.match(/ - priority:\s*(P[1-4])\b/i)?.[1]?.toLowerCase() ?? 'p4'
    const content = clean(
      body
        .replace(/ - (?:source|due|priority):.*?(?= - (?:source|due|priority):|$)/gi, '')
        .replace(/🎯/g, ''),
    )
    const isThisWeek = section === 'this week'
    const isDue = due !== undefined && due <= today
    if (content === '' || (!isThisWeek && !isDue)) return
    tasks.push({ id: `f${i + 1}`, content, priority, dueDate: due, line: raw[i] ?? line })
  })
  return tasks
}

/**
 * The file with `line` ticked (`[ ]` to `[x]`) or, with `isDone` false, the
 * ticked copy of `line` opened again; undefined when that line is not there.
 */
export const toggleTask = (text: string, line: string, isDone: boolean): string | undefined => {
  const ticked = line.replace('[ ]', '[x]')
  const [from, to] = isDone ? [line, ticked] : [ticked, line]
  const lines = text.split('\n')
  const at = lines.indexOf(from)
  if (at === -1) return undefined
  lines[at] = to
  return lines.join('\n')
}
