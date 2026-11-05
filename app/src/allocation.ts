import { ORDER_PERMUTATIONS } from './counterbalance'
import type { Condition } from './session'
import type { StructureId } from './structures'

// Lista de alocação da seção 3.3 do artigo (#105). Sorteio computacional em
// 05/11/2026, em 3 blocos de 4 com 2 participantes de cada grupo por bloco;
// cada uma das 6 ordens aparece uma vez em cada grupo. O número da ordem é a
// posição (1 a 6) em ORDER_PERMUTATIONS. Registro: docs/documents/LISTA-ALOCACAO.md
const ALLOCATION_LIST: Record<string, { condition: Condition; order: number }> = {
  P01: { condition: 'ra', order: 4 },
  P02: { condition: '2d', order: 4 },
  P03: { condition: '2d', order: 1 },
  P04: { condition: 'ra', order: 1 },
  P05: { condition: '2d', order: 5 },
  P06: { condition: 'ra', order: 3 },
  P07: { condition: '2d', order: 6 },
  P08: { condition: 'ra', order: 5 },
  P09: { condition: 'ra', order: 6 },
  P10: { condition: 'ra', order: 2 },
  P11: { condition: '2d', order: 2 },
  P12: { condition: '2d', order: 3 },
}

export const LISTED_CODES = Object.keys(ALLOCATION_LIST)

export type CodeKind =
  | { kind: 'lista'; code: string; condition: Condition; order: StructureId[] }
  | { kind: 'substituto'; code: string }
  | { kind: 'teste'; code: string }
  | { kind: 'invalido' }

// "p1", "P1" e "P01" viram "P01". Códigos que não seguem o padrão P + número
// (ex.: TESTE) ficam fora da lista e servem só para ensaio.
export function classifyCode(raw: string): CodeKind {
  const text = raw.trim().toUpperCase()
  const match = /^P(\d+)$/.exec(text)
  if (!match) return { kind: 'teste', code: text }
  const number = Number(match[1])
  if (number === 0) return { kind: 'invalido' }
  const code = `P${String(number).padStart(2, '0')}`
  const entry = ALLOCATION_LIST[code]
  if (entry) return { kind: 'lista', code, ...allocationOf(code) }
  return { kind: 'substituto', code }
}

// Substitutos (P13 em diante) herdam grupo e ordem de quem substituem (seção 3.3)
export function allocationOf(code: string) {
  const { condition, order } = ALLOCATION_LIST[code]
  return { condition, order: ORDER_PERMUTATIONS[order - 1] }
}
