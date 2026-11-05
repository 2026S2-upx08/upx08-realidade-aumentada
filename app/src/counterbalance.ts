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

// Só para códigos de teste (fora da lista P01–P12). Participantes da coleta
// recebem a ordem da lista de alocação (allocation.ts, #105): o contador é do
// aparelho e não separa RA de 2D, então alternando grupos cada um receberia
// só 3 das 6 ordens.
export function assignSessionOrder(): StructureId[] {
  const stored = Number(localStorage.getItem(SESSION_COUNT_KEY) ?? '0')
  localStorage.setItem(SESSION_COUNT_KEY, String(stored + 1))
  return ORDER_PERMUTATIONS[stored % ORDER_PERMUTATIONS.length]
}
