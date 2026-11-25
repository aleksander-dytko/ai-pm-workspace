// SPDX-License-Identifier: MIT - next-steps, part of the ai-pm-workspace mods.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Chip } from '../types'
import { SYSTEM, buildPrompt, configFrom, parseChips } from './chips'
import type { Config } from './chips'

let config: Config = configFrom({})

const chipsAtom = atom({ plugin: 'next-steps', key: 'chips' } as const, [], { shape: 'chips-1' })

let lastAsk = ''
let generation = 0
let inFlight: AbortController | undefined

const clear = async ($: EngineInterface) => {
  generation += 1
  inFlight?.abort()
  inFlight = undefined
  await update($, chipsAtom, prev => (prev.length === 0 ? prev : []))
}

const send = async ($: EngineInterface, chip: Chip) => {
  await clear($)
  await $.prompt.submit({ text: chip.prompt, asUser: true })
}

const suggest = async ($: EngineInterface, answer: string) => {
  const mine = ++generation
  const stop = new AbortController()
  inFlight = stop
  try {
    const reply = await $.model.complete(
      { model: config.model, system: SYSTEM, prompt: buildPrompt(lastAsk, answer), maxTokens: 400, effort: 'low' },
      { signal: stop.signal },
    )
    if (!reply.isAnswered || mine !== generation) return
    const chips = parseChips(reply.text)
    if (chips.length > 0) await update($, chipsAtom, () => chips)
  } catch {
    // Fail silently: no chips this turn.
  }
}

export const register: Register = (on, options) => {
  config = configFrom(options)

  on('prompt.submit', async ($, e, next) => {
    if (e.isMeta !== true && e.command === undefined) lastAsk = e.text
    await clear($)

    return next(e)
  }).catch(($, e, next) => next(e))

  on('prompt.edit', async ($, e, next) => {
    if (e.inputText !== '') await clear($)

    return next(e)
  }).catch(($, e, next) => next(e))

  on('turn.complete', async ($, e, next) => {
    const ran = await next(e)
    if (e.agentId !== undefined || e.reason !== 'answer' || e.answer.trim().length < config.minAnswerLength) {
      return ran
    }

    void suggest($, e.answer)

    return ran
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const chips = await read($, chipsAtom)
    if (chips.length === 0 || e.props.hasSurvey) return next(e)

    const { Box, Button, Text } = $.ui.resolve(e)

    return (
      <Box flexDirection="row" gap={2}>
        <Text dimColor>Next:</Text>
        {chips.map((chip, i) => (
          <Button
            key={`chip-${i + 1}`}
            hotkey={String(i + 1)}
            plain
            onPress={() => send($, chip)}
          >
            {chip.label}
          </Button>
        ))}
        <Button key="dismiss" plain onPress={() => clear($)}>
          <Text dimColor>×</Text>
        </Button>
      </Box>
    )
  }).catch(($, e, next) => next(e))
}
