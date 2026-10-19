import type { StructureId } from './structures'

export const ORDER_PERMUTATIONS: StructureId[][] = [
  ['coliseu', 'estatua', 'cristo'],
  ['coliseu', 'cristo', 'estatua'],
  ['estatua', 'coliseu', 'cristo'],
  ['estatua', 'cristo', 'coliseu'],
  ['cristo', 'coliseu', 'estatua'],
  ['cristo', 'estatua', 'coliseu'],
]

const SESSION_COUNT_KEY = 'upx08-session-count'

export function assignSessionOrder(): StructureId[] {
  const stored = Number(localStorage.getItem(SESSION_COUNT_KEY) ?? '0')
  localStorage.setItem(SESSION_COUNT_KEY, String(stored + 1))
  return ORDER_PERMUTATIONS[stored % ORDER_PERMUTATIONS.length]
}
