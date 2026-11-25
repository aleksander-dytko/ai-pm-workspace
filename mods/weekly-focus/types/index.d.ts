export type PTaskStatus = 'done' | 'carried' | 'dropped' | 'not-started' | 'partial' | 'open'

export type PTask = { level: string; text: string; status: PTaskStatus; note?: string }

export type Focus = {
  /** The week heading of the newest section, `DD-MM-YYYY`. */
  week: string
  tasks: PTask[]
  /** Today's date as the daily note names it, `DD-MM-YYYY`. */
  today: string
  isJournalFound: boolean
  winIf?: string
  closeAt?: string
  focus: string[]
  error?: string
}

export type TodoTask = {
  /** The Todoist id, or `f<line number>` for a task from the tasks file. */
  id: string
  content: string
  /** `p1` (highest) to `p4`. */
  priority: string
  /** `YYYY-MM-DD`. */
  dueDate?: string
  /** For a task from the tasks file: its line exactly as read, to find it again. */
  line?: string
}

export type Todos = {
  tasks: TodoTask[]
  /** Where the tasks came from. */
  source: 'todoist' | 'file'
  /** `YYYY-MM-DD` in the configured time zone, to tell overdue tasks apart. */
  today: string
  error?: string
}

/** A task completed from the pane, kept on screen with an Undo until `until`. */
export type Done = { task: TodoTask; until: number }

declare module 'claude-code' {
  interface PluginState {
    'weekly-focus': {
      focus: Shaped<Focus | null>
      todos: Shaped<Todos | null>
      done: Shaped<Done[]>
    }
  }
}
