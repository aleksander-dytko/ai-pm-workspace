// SPDX-License-Identifier: MIT - weekly-focus, part of the ai-pm-workspace mods.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Done, Focus, PTaskStatus, TodoTask, Todos } from '../types'
import { joinPath, journalPath, pad, wallClock } from './clock'
import { parseJournal, parsePTasks } from './parse'
import { parseTasksFile, toggleTask } from './tasks-file'
import { parseTasks, shortTitle, sortTasks } from './todoist'

const PANE = 'weekly-focus'
const TITLE = 'Weekly focus'
const SHOWN = 8
const UNDO_MS = 15_000

export type Config = {
  workspace: string
  weeklyPriorities: string
  tasksFile: string
  todoistServer: string
  journalFolder: string
  timezone: string
  openOnStart: boolean
}

/** The plugin's options, with defaults for anything missing or empty. */
export const configFrom = (options: Readonly<Record<string, unknown>>): Config => {
  const str = (key: string, fallback: string, allowEmpty = false) => {
    const value = typeof options[key] === 'string' ? (options[key] as string).trim() : undefined
    if (value === undefined) return fallback
    return value === '' && !allowEmpty ? fallback : value
  }
  return {
    workspace: str('workspace', ''),
    weeklyPriorities: str('weeklyPriorities', 'Dashboard/Weekly P-Tasks.md'),
    tasksFile: str('tasksFile', 'Dashboard/tasks.md'),
    todoistServer: str('todoistServer', 'todoist', true),
    journalFolder: str('journalFolder', 'journals'),
    timezone: str('timezone', ''),
    openOnStart: options.openOnStart !== false,
  }
}

let config: Config = configFrom({})

const focusAtom = atom({ plugin: 'weekly-focus', key: 'focus' } as const, null, {
  shape: 'focus-1',
})
const todosAtom = atom({ plugin: 'weekly-focus', key: 'todos' } as const, null, {
  shape: 'todos-2',
})
const doneAtom = atom({ plugin: 'weekly-focus', key: 'done' } as const, [], {
  shape: 'done-2',
})

const WEEK_MARK: Record<PTaskStatus, { glyph: string; color?: string }> = {
  done: { glyph: '✓', color: 'success' },
  carried: { glyph: '↻', color: 'warning' },
  dropped: { glyph: '–' },
  'not-started': { glyph: '·' },
  partial: { glyph: '◐', color: 'warning' },
  open: { glyph: '·' },
}

const PRIORITY_COLOR: Record<string, string | undefined> = {
  p1: 'error',
  p2: 'warning',
  p3: 'suggestion',
}

const root = async ($: EngineInterface): Promise<string> =>
  config.workspace !== '' ? config.workspace : $.session.cwd()

/** A configured path: absolute as given, else inside the workspace. */
const resolve = (base: string, path: string): string =>
  path.startsWith('/') ? path : joinPath(base, path)

const readText = async ($: EngineInterface, path: string): Promise<string> =>
  String(await $.fs.read(path))

const loadFocus = async ($: EngineInterface): Promise<Focus> => {
  const base = await root($)
  const { path, date } = journalPath(base, config.journalFolder, wallClock(await $.clock.now(), config.timezone))
  const focus: Focus = { week: '', tasks: [], today: date, isJournalFound: false, focus: [] }
  try {
    Object.assign(focus, parsePTasks(await readText($, resolve(base, config.weeklyPriorities))))
  } catch {
    focus.error = `Could not read ${config.weeklyPriorities}`
  }
  try {
    if (await $.fs.exists(path)) {
      focus.isJournalFound = true
      Object.assign(focus, parseJournal(await readText($, path)))
    }
  } catch {
    // No daily note today: the pane shows the week alone.
  }
  return focus
}

const isoToday = async ($: EngineInterface): Promise<string> => {
  const w = wallClock(await $.clock.now(), config.timezone)
  return `${w.year}-${pad(w.month)}-${pad(w.day)}`
}

type McpOutcome = { isError: boolean; content?: readonly { type: string; text?: string }[] }

const NOT_CONNECTED = /not connected|no such server|unknown server|not found|disconnected|no server/i

/** Why a Todoist call failed, short enough for a toast. */
const reasonOf = (failure: McpOutcome | unknown): string => {
  let text = ''
  if (typeof failure === 'object' && failure !== null && 'content' in failure) {
    text = (failure as McpOutcome).content?.find(b => b.type === 'text')?.text ?? ''
  } else if (failure instanceof Error) {
    text = failure.message
  } else if (typeof failure === 'string') {
    text = failure
  }
  const status = /\b(4\d\d|5\d\d)\b/.exec(text)?.[1]
  if (status?.startsWith('5')) return `Todoist is not reachable (${status})`
  if (NOT_CONNECTED.test(text)) return 'Todoist is not connected'
  const line = text.split('\n')[0]?.trim() ?? ''
  if (line === '') return 'no reason given'
  return line.length > 80 ? `${line.slice(0, 79)}…` : line
}

const loadFromFile = async ($: EngineInterface, today: string): Promise<Todos> => {
  const base = await root($)
  try {
    const text = await readText($, resolve(base, config.tasksFile))
    return { tasks: sortTasks(parseTasksFile(text, today), today), source: 'file', today }
  } catch {
    return { tasks: [], source: 'file', today, error: `Could not read ${config.tasksFile}` }
  }
}

/** Todoist when its MCP server answers; the tasks file when it is not there at all. */
const loadTodos = async ($: EngineInterface): Promise<Todos> => {
  const today = await isoToday($)
  if (config.todoistServer === '') return loadFromFile($, today)
  try {
    const result = await $.mcp.call(config.todoistServer, 'find-tasks-by-date', {
      startDate: 'today',
      limit: 50,
    })
    if (result.isError) {
      const reason = reasonOf(result)
      if (reason === 'Todoist is not connected') return loadFromFile($, today)
      return { tasks: [], source: 'todoist', today, error: reason }
    }
    return { tasks: sortTasks(parseTasks(result), today), source: 'todoist', today }
  } catch {
    return loadFromFile($, today)
  }
}

const same = <T,>(prev: T, next: T): T =>
  JSON.stringify(prev) === JSON.stringify(next) ? prev : next

const refreshFocus = async ($: EngineInterface) => {
  const next = await loadFocus($)
  await update($, focusAtom, prev => same(prev, next))
}

const refreshTodos = async ($: EngineInterface) => {
  const next = await loadTodos($)
  await update($, todosAtom, prev => same(prev, next))
}

const callTodoist = async (
  $: EngineInterface,
  tool: string,
  args: Record<string, unknown>,
): Promise<string | undefined> => {
  try {
    const result = await $.mcp.call(config.todoistServer, tool, args)
    return result.isError ? reasonOf(result) : undefined
  } catch (error) {
    return reasonOf(error)
  }
}

/** Ticks or unticks the task's line in the tasks file; a reason when it could not. */
const flipInFile = async ($: EngineInterface, task: TodoTask, isDone: boolean): Promise<string | undefined> => {
  if (task.line === undefined) return 'no line to change'
  const path = resolve(await root($), config.tasksFile)
  try {
    const next = toggleTask(await readText($, path), task.line, isDone)
    if (next === undefined) return `the line changed in ${config.tasksFile}`
    await $.fs.write(path, next)
    return undefined
  } catch {
    return `could not write ${config.tasksFile}`
  }
}

const isFileTask = (task: TodoTask) => task.line !== undefined

const complete = async ($: EngineInterface, task: TodoTask) => {
  const failure = isFileTask(task)
    ? await flipInFile($, task, true)
    : await callTodoist($, 'complete-tasks', { ids: [task.id] })
  if (failure !== undefined) {
    $.ui.toast(`Could not complete "${task.content}": ${failure}`)
    return
  }
  const until = (await $.clock.now()) + UNDO_MS
  await update($, doneAtom, list => [...list.filter(d => d.task.id !== task.id), { task, until }])
  await update($, todosAtom, todos =>
    todos === null ? todos : { ...todos, tasks: todos.tasks.filter(t => t.id !== task.id) },
  )
  $.clock.after(UNDO_MS + 500, async () => {
    const now = await $.clock.now()
    await update($, doneAtom, list => list.filter(d => d.until > now))
  })
}

const undo = async ($: EngineInterface, task: TodoTask) => {
  const failure = isFileTask(task)
    ? await flipInFile($, task, false)
    : await callTodoist($, 'uncomplete-tasks', { ids: [task.id] })
  if (failure !== undefined) {
    $.ui.toast(`Could not reopen "${task.content}": ${failure}`)
    return
  }
  await update($, doneAtom, list => list.filter(d => d.task.id !== task.id))
  await refreshTodos($)
}

const isWatched = (path: unknown): boolean =>
  typeof path === 'string' &&
  (path.endsWith(config.weeklyPriorities) ||
    path.endsWith(config.tasksFile) ||
    path.includes(`/${config.journalFolder}/`))

const isTodoistWrite = (tool: string): boolean =>
  config.todoistServer !== '' &&
  tool.startsWith(`mcp__${config.todoistServer.replace(/[^A-Za-z0-9_-]/g, '_')}__`) &&
  !/__(find|get|fetch|search|user-info|view)/.test(tool)

export const register: Register = (on, options) => {
  config = configFrom(options)

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'weekly-focus',
      description: "Show today's tasks and this week's priorities in a side pane",
    })
    await refreshFocus($)
    void refreshTodos($)
    $.clock.every(60_000, () => refreshFocus($))
    $.clock.every(5 * 60_000, () => refreshTodos($))
    if (config.openOnStart) void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'weekly-focus' }, async $ => {
    await Promise.all([refreshFocus($), refreshTodos($)])
    await $.ui.open({ id: PANE, title: TITLE })

    return { text: 'Weekly focus pane opened.' }
  }).catch(() => ({ text: 'Could not open the weekly focus pane.' }))

  on('tool.call', { tool: ['Write', 'Edit'] }, async ($, e, next) => {
    const ran = await next(e)
    if (isWatched(e.file_path)) await Promise.all([refreshFocus($), refreshTodos($)])

    return ran
  }).catch(($, e, next) => next(e))

  on('tool.call', async ($, e, next) => {
    const ran = await next(e)
    if (isTodoistWrite(String(e.tool))) await refreshTodos($)

    return ran
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const focus = await read($, focusAtom)
    const todos = await read($, todosAtom)
    const done = await read($, doneAtom)

    const tasks = todos?.tasks ?? []
    const shown = tasks.slice(0, SHOWN)
    const weekDone = focus?.tasks.filter(t => t.status === 'done').length ?? 0
    const where = todos?.source === 'file' ? config.tasksFile : 'Todoist'

    const header = (label: string, count: string) => (
      <Box flexDirection="row" justifyContent="space-between">
        <Text dimColor bold>
          {label}
        </Text>
        <Text dimColor>{count}</Text>
      </Box>
    )

    return (
      <Box flexDirection="column" gap={1}>
        {focus?.winIf !== undefined && (
          <Text wrap="truncate-end">
            <Text dimColor>Win: </Text>
            {focus.winIf}
          </Text>
        )}

        <Box flexDirection="column">
          {header('TODAY', todos === null ? '' : String(tasks.length))}
          {todos === null && <Text dimColor>Loading tasks...</Text>}
          {todos?.error !== undefined && <Text dimColor>{todos.error}</Text>}
          {todos !== null && todos.error === undefined && tasks.length === 0 && done.length === 0 && (
            <Text dimColor>Nothing due today.</Text>
          )}
          {shown.map(task => {
            const isOverdue = task.dueDate !== undefined && task.dueDate < (todos?.today ?? '')
            return (
              <Box flexDirection="row" gap={1}>
                <Button key={`done-${task.id}`} plain onPress={() => complete($, task)}>
                  ○
                </Button>
                <Text wrap="truncate-end">
                  {PRIORITY_COLOR[task.priority] !== undefined && (
                    <Text color={PRIORITY_COLOR[task.priority]}>● </Text>
                  )}
                  {task.content}
                  {isOverdue && <Text color="error"> overdue</Text>}
                </Text>
              </Box>
            )
          })}
          {tasks.length > SHOWN && <Text dimColor>+{tasks.length - SHOWN} more in {where}</Text>}
          {done.map(({ task }) => (
            <Box flexDirection="row" gap={1}>
              <Text color="success">✓</Text>
              <Text dimColor strikethrough wrap="truncate-end">
                {task.content}
              </Text>
              <Button key={`undo-${task.id}`} plain onPress={() => undo($, task)}>
                <Text dimColor>Undo</Text>
              </Button>
            </Box>
          ))}
        </Box>

        <Box flexDirection="column">
          {header('THIS WEEK', focus === null ? '' : `${weekDone}/${focus.tasks.length}`)}
          {focus?.error !== undefined && <Text dimColor>{focus.error}</Text>}
          {focus !== null && focus.tasks.length === 0 && focus.error === undefined && (
            <Text dimColor>No priorities for this week yet.</Text>
          )}
          {focus?.tasks.map(task => (
            <Text
              wrap="truncate-end"
              dimColor={task.status === 'done' || task.status === 'dropped'}
              strikethrough={task.status === 'dropped'}
            >
              <Text color={WEEK_MARK[task.status].color}>{WEEK_MARK[task.status].glyph}</Text>{' '}
              <Text dimColor>{task.level}</Text> {shortTitle(task.text)}
            </Text>
          ))}
        </Box>

        <Box flexDirection="row" justifyContent="space-between">
          <Text dimColor>{focus?.closeAt !== undefined ? `Closes ${focus.closeAt}` : ''}</Text>
          <Button
            key="refresh"
            plain
            onPress={() => Promise.all([refreshFocus($), refreshTodos($)])}
          >
            <Text dimColor>↻ Refresh</Text>
          </Button>
        </Box>
      </Box>
    )
  })
}
