import { expect, test } from 'claude-code/testing'

import { configFrom } from './chips'

// The test runtime has timers; the mod's type set does not declare them.
declare const setTimeout: (fn: (value?: unknown) => void, ms: number) => unknown

const BAND = {
  plugin: 'next-steps',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false, isCollapsed: false, isWorking: false, maxRows: 4, bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 4 }, view: {},
  },
} as const

const REPLY = JSON.stringify([
  { label: 'Run the tests', prompt: 'Run the tests for the mod.' },
  { label: 'Explain the hotkeys', prompt: 'Explain how the hotkeys work.' },
  { label: 'Publish it', prompt: 'Publish the mod.' },
  { label: 'Extra', prompt: 'ignored' },
])

const submitted: string[] = []
const models: string[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (on: any, reply = REPLY) => {
  submitted.length = 0
  models.length = 0
  on('model.complete', (_: unknown, e: { model: string }) => {
    models.push(e.model)
    return { value: { isAnswered: true, text: reply, usage: {} } }
  })
  on('prompt.submit', (_: unknown, e: { text: string }) => {
    submitted.push(e.text)
    return { text: e.text }
  })
  on('prompt.edit', (_: unknown, e: { text: string }) => ({ text: e.text, cursor: 0 }))
  on('turn.complete', (_: unknown, e: { answer: string }) => ({ text: e.answer }))
}

const finish = { answer: 'Here is a long enough answer about the mod and what to do next with it.', durationMs: 1, isAborted: false, turnId: 't1', reason: 'answer' } as const

test('a finished turn shows three chips; pressing one sends its prompt and clears', async ($, on) => {
  setup(on)
  await $.turn.complete(finish)
  await new Promise(r => setTimeout(r, 10))

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await ui.find({ key: 'chip-3' })).toBeDefined()
  expect(await ui.find({ key: 'chip-4' })).toBeUndefined()

  await ui.press({ key: 'chip-1' })
  expect(submitted).toContain('Run the tests for the mod.')
  expect(await ui.find({ key: 'chip-1' })).toBeUndefined()
  await ui.unmount()
})

test('typing clears the chips; a bad reply shows none', async ($, on) => {
  setup(on)
  await $.turn.complete(finish)
  await new Promise(r => setTimeout(r, 10))
  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ key: 'chip-1' })).toBeDefined()
  await ($.prompt as unknown as { edit: (e: unknown) => Promise<unknown> }).edit({ origin: { kind: 'composer' }, text: '', cursor: 0, start: 0, end: 0, inputText: 'h' } as never)
  expect(await ui.find({ key: 'chip-1' })).toBeUndefined()
  await ui.unmount()
})

test('config defaults: haiku, 40 characters', async ($, on) => {
  expect(configFrom({})).toEqual({ model: 'haiku', minAnswerLength: 40 })
  expect(configFrom({ model: ' ', minAnswerLength: -1 })).toEqual({ model: 'haiku', minAnswerLength: 40 })
  setup(on)
  await $.turn.complete(finish)
  await new Promise(r => setTimeout(r, 10))
  expect(models).toEqual(['haiku'])
})

test('the model and minimum length come from the options', { options: { model: 'sonnet', minAnswerLength: 500 } }, async ($, on) => {
  setup(on)
  await $.turn.complete(finish)
  await new Promise(r => setTimeout(r, 10))
  expect(models).toEqual([])
  await $.turn.complete({ ...finish, answer: 'x'.repeat(600) })
  await new Promise(r => setTimeout(r, 10))
  expect(models).toEqual(['sonnet'])
})
