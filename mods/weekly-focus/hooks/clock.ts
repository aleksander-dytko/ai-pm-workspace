/** Wall-clock fields of an instant, in an IANA time zone or the machine's local time. */
export type Wall = {
  year: number
  /** 1-12. */
  month: number
  day: number
  hours: number
  minutes: number
  /** 0 = Sunday. */
  weekday: number
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** `timeZone` empty or invalid reads the machine's local time. */
export const wallClock = (ms: number, timeZone: string): Wall => {
  if (timeZone.trim() !== '') {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone.trim(),
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        hourCycle: 'h23',
      }).formatToParts(new Date(ms))
      const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
      return {
        year: Number(get('year')),
        month: Number(get('month')),
        day: Number(get('day')),
        hours: Number(get('hour')) % 24,
        minutes: Number(get('minute')),
        weekday: WEEKDAYS.indexOf(get('weekday')),
      }
    } catch {
      // Not a time zone this runtime knows: fall through to local time.
    }
  }
  const d = new Date(ms)
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
    weekday: d.getDay(),
  }
}

export const pad = (n: number) => String(n).padStart(2, '0')

/** `a/b` with no doubled or trailing slashes; `b` absolute wins. */
export const joinPath = (root: string, ...rest: string[]): string => {
  let out = root.replace(/\/+$/, '')
  for (const part of rest) {
    const clean = part.replace(/^\/+|\/+$/g, '')
    if (clean !== '') out = `${out}/${clean}`
  }
  return out === '' ? '/' : out
}

/** `<root>/<folder>/YYYY/MM-Month/DD-MM-YYYY.md` and its `DD-MM-YYYY` date. */
export const journalPath = (
  root: string,
  folder: string,
  w: Wall,
): { path: string; date: string } => {
  const date = `${pad(w.day)}-${pad(w.month)}-${w.year}`
  const month = `${pad(w.month)}-${MONTHS[w.month - 1]}`
  return { date, path: joinPath(root, folder, String(w.year), month, `${date}.md`) }
}
