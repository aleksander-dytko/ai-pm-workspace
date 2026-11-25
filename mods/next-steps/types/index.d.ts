/** One follow-up: a 2-4 word `label` drawn on the chip, and the `prompt` it sends. */
export type Chip = { label: string; prompt: string }

declare module 'claude-code' {
  interface PluginState {
    'next-steps': {
      chips: Shaped<Chip[]>
    }
  }
}
