import type { Chip } from '../types'

export const DEFAULT_MODEL = 'haiku'
export const DEFAULT_MIN_ANSWER = 40

export type Config = { model: string; minAnswerLength: number }

/** The plugin's options, with defaults for anything missing or malformed. */
export const configFrom = (options: Readonly<Record<string, unknown>>): Config => {
  const model = typeof options.model === 'string' ? options.model.trim() : ''
  const min = Number(options.minAnswerLength)
  return {
    model: model === '' ? DEFAULT_MODEL : model,
    minAnswerLength: Number.isFinite(min) && min >= 0 ? min : DEFAULT_MIN_ANSWER,
  }
}

export const ANSWER_LIMIT = 6000
export const ASK_LIMIT = 1500

export const SYSTEM = `You suggest the user's next message in a coding-assistant chat.
Return ONLY a JSON array of exactly 3 objects: [{"label": "...", "prompt": "..."}].
- label: 2-4 words, imperative, no trailing punctuation.
- prompt: one or two sentences the user would send next, written as the user, specific to the answer.
- The three must differ: e.g. go deeper, act on it, check or verify it.
- If the assistant asked the user a question, make the chips plausible answers.
No prose, no markdown fences.`

const clip = (text: string, limit: number): string =>
  text.length <= limit ? text : `${text.slice(0, limit / 2)}\n[...]\n${text.slice(-limit / 2)}`

export const buildPrompt = (ask: string, answer: string): string =>
  `<user_message>\n${clip(ask, ASK_LIMIT)}\n</user_message>\n<assistant_answer>\n${clip(answer, ANSWER_LIMIT)}\n</assistant_answer>`

/** The first JSON array in `text`, kept to well-formed chips; at most 3. */
export const parseChips = (text: string): Chip[] => {
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start < 0 || end <= start) return []
  try {
    const raw: unknown = JSON.parse(text.slice(start, end + 1))
    if (!Array.isArray(raw)) return []
    return raw
      .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
      .map(c => ({ label: String(c.label ?? '').trim(), prompt: String(c.prompt ?? '').trim() }))
      .filter(c => c.label !== '' && c.prompt !== '')
      .map(c => ({ ...c, label: c.label.split(/\s+/).slice(0, 4).join(' ') }))
      .slice(0, 3)
  } catch {
    return []
  }
}
