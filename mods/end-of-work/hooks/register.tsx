// SPDX-License-Identifier: MIT - end-of-work, part of the ai-pm-workspace mods.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import { closeAtFromJournal, closingAt, configFrom, formatPast, lineFor, todayPath } from './time'
import type { Config } from './time'

const closingAtom = atom({ plugin: 'end-of-work', key: 'closing' } as const, null, {
  shape: 'closing-1',
})
const hiddenOn = atom({ plugin: 'end-of-work', key: 'hiddenOn' } as const, null)

let config: Config = configFrom({})

const workspaceRoot = async ($: EngineInterface): Promise<string> =>
  config.workspace.trim() !== '' ? config.workspace.trim() : $.session.cwd()

const tick = async ($: EngineInterface): Promise<void> => {
  const now = await $.clock.now()
  const { path } = todayPath(await workspaceRoot($), config, now)
  let fromJournal: string | undefined
  try {
    if (await $.fs.exists(path)) fromJournal = closeAtFromJournal(String(await $.fs.read(path)))
  } catch {
    fromJournal = undefined
  }
  const closing = closingAt(now, config, fromJournal)
  await update($, closingAtom, prev =>
    JSON.stringify(prev) === JSON.stringify(closing) ? prev : closing,
  )

  const isPast = closing.isWorkday && closing.minutesLeft <= 0
  const isHidden = (await read($, hiddenOn)) === closing.date
  $.ui.status(
    isPast && !isHidden
      ? `⏹ ${formatPast(-closing.minutesLeft)} past ${closing.closeAt}`
      : undefined,
  )

  // One toast per day, at the moment closing time passes.
  if (isPast && closing.minutesLeft > -2 && (await $.store.get('toastedOn')) !== closing.date) {
    await $.store.set('toastedOn', closing.date)
    $.ui.toast(`${closing.closeAt} - closing time. ${lineFor(0, closing.date)}`)
  }
}

export const register: Register = (on, options) => {
  config = configFrom(options)

  on('session.start', async ($, e, next) => {
    await tick($)
    $.clock.every(60_000, () => tick($))

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const closing = await read($, closingAtom)
    const isQuiet =
      e.props.hasSurvey ||
      closing === null ||
      !closing.isWorkday ||
      closing.minutesLeft > config.headsUpMinutes ||
      (await read($, hiddenOn)) === closing.date

    if (isQuiet) {
      return next(e)
    }

    const { Box, Button, Text } = $.ui.resolve(e)

    if (closing.minutesLeft > 0) {
      return (
        <Box>
          <Text dimColor>
            Closing time is {closing.closeAt}, in {closing.minutesLeft}m. Land the one
            thing that matters, park the rest.
          </Text>
        </Box>
      )
    }

    const past = -closing.minutesLeft

    return (
      <Box flexDirection="row" gap={1}>
        <Text>
          <Text color="warning" bold>
            {formatPast(past)} past {closing.closeAt}.
          </Text>{' '}
          {lineFor(past, closing.date)}
        </Text>
        <Button
          key="hide"
          label="Hide today"
          onPress={async () => {
            await update($, hiddenOn, () => closing.date)
            $.ui.status(undefined)
          }}
        />
      </Box>
    )
  })
}
