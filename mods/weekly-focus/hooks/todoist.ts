import type { TodoTask } from '../types'

const PRIORITY_ORDER: Record<string, number> = { p1: 0, p2: 1, p3: 2, p4: 3 }

/** Reads the Todoist MCP find-tasks-by-date answer: structured content, or the JSON in its first text block. */
export const parseTasks = (result: {
  content: readonly { type: string; text?: string }[]
  structuredContent?: unknown
}): TodoTask[] => {
  let data: unknown = result.structuredContent
  if (data === undefined) {
    const text = result.content.find(block => block.type === 'text')?.text ?? '{}'
    data = JSON.parse(text)
  }
  const raw = (data as { tasks?: unknown }).tasks
  if (!Array.isArray(raw)) return []
  return raw
    .filter((t): t is Record<string, unknown> => typeof t === 'object' && t !== null)
    .filter(t => t.checked !== true)
    .map(t => ({
      id: String(t.id),
      content: String(t.content ?? '').replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2'),
      priority: typeof t.priority === 'string' ? t.priority : 'p4',
      dueDate: typeof t.dueDate === 'string' ? t.dueDate.slice(0, 10) : undefined,
    }))
}

/** Overdue first, then by priority. */
export const sortTasks = (tasks: TodoTask[], today: string): TodoTask[] =>
  [...tasks].sort((a, b) => {
    const overdueA = a.dueDate !== undefined && a.dueDate < today ? 0 : 1
    const overdueB = b.dueDate !== undefined && b.dueDate < today ? 0 : 1
    if (overdueA !== overdueB) return overdueA - overdueB
    return (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
  })

/** A P-task's headline: the part before its first " - " or "(". */
export const shortTitle = (text: string): string =>
  text.split(/ - |\s\(/)[0]?.trim() ?? text
