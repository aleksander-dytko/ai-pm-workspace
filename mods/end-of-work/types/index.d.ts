export type Closing = {
  /** Today in the configured time zone, `DD-MM-YYYY`. */
  date: string
  /** Today's closing time, `HH:MM`, from the daily note or the configured default. */
  closeAt: string
  /** Whether `closeAt` came from today's daily note. */
  isFromJournal: boolean
  /** Minutes until closing; negative once it has passed. */
  minutesLeft: number
  /** Whether the band should speak today (always true when weekdaysOnly is off). */
  isWorkday: boolean
}

declare module 'claude-code' {
  interface PluginState {
    'end-of-work': { closing: Shaped<Closing | null>; hiddenOn: string | null }
  }
}
