import type { StructureId } from './structures'

export type Condition = 'ra' | '2d'

// Etapas na ordem em que o participante passa por elas (seção 4.9 do artigo)
export type Step =
  | 'estimativa-pre'
  | 'compreensao-pre'
  | 'estruturas'
  | 'estimativa-pos'
  | 'compreensao-pos'
  | 'sus'
  | 'fim'

export type Session = {
  participantId: string
  condition: Condition
  order: StructureId[]
  step: Step
  currentIndex: number
  startedAt: string
}

type InstrumentStep = Exclude<Step, 'estruturas' | 'fim'>

// path é a pasta em public/instrumentos; record e moment são os campos
// instrumento e momento que o HTML grava em upx08.coleta.v1
export const INSTRUMENTS: Record<
  InstrumentStep,
  { path: string; record: string; moment: 'pre' | 'pos'; label: string }
> = {
  'estimativa-pre': { path: 'estimativa', record: 'ESTIMATIVA', moment: 'pre', label: 'Estimativa de escala (pré-teste)' },
  'compreensao-pre': { path: 'compreensao', record: 'COMPREENSAO', moment: 'pre', label: 'Questionário de compreensão (pré-teste)' },
  'estimativa-pos': { path: 'estimativa', record: 'ESTIMATIVA', moment: 'pos', label: 'Estimativa de escala (pós-teste)' },
  'compreensao-pos': { path: 'compreensao', record: 'COMPREENSAO', moment: 'pos', label: 'Questionário de compreensão (pós-teste)' },
  sus: { path: 'sus', record: 'SUS', moment: 'pos', label: 'Questionário SUS' },
}

// Os instrumentos usam a nomenclatura de grupos do artigo
const GROUP_BY_CONDITION: Record<Condition, string> = { ra: 'experimental', '2d': 'controle' }

const SESSION_KEY = 'upx08.sessao.v1'
const COLETA_KEY = 'upx08.coleta.v1'

export function isInstrumentStep(step: Step): step is InstrumentStep {
  return step in INSTRUMENTS
}

// O SUS avalia a aplicação de RA e só é aplicado ao grupo experimental (seção 3.4)
export function sessionSteps(condition: Condition): Step[] {
  const steps: Step[] = ['estimativa-pre', 'compreensao-pre', 'estruturas', 'estimativa-pos', 'compreensao-pos']
  if (condition === 'ra') steps.push('sus')
  steps.push('fim')
  return steps
}

export function nextStep(condition: Condition, step: Step): Step {
  const steps = sessionSteps(condition)
  return steps[steps.indexOf(step) + 1] ?? 'fim'
}

export function instrumentUrl(session: Session, step: InstrumentStep) {
  const { path, moment } = INSTRUMENTS[step]
  const params = new URLSearchParams({
    pid: session.participantId,
    grupo: GROUP_BY_CONDITION[session.condition],
    momento: moment,
  })
  return `/instrumentos/${path}/index.html?${params}`
}

// Só conta registro gravado depois do início desta sessão: um registro antigo
// com o mesmo código (de um teste, por exemplo) não pode pular a etapa
function isInstrumentDone(session: Session, step: InstrumentStep) {
  const { record, moment } = INSTRUMENTS[step]
  try {
    const records: { instrumento: string; momento: string; participanteId: string; fimEm: string }[] =
      JSON.parse(localStorage.getItem(COLETA_KEY) ?? '[]')
    return records.some(
      (r) =>
        r.instrumento === record &&
        r.momento === moment &&
        r.participanteId === session.participantId &&
        Date.parse(r.fimEm) >= Date.parse(session.startedAt),
    )
  } catch {
    return false
  }
}

// RNF07: cada visita a uma estrutura vira um registro em upx08.coleta.v1, junto
// dos instrumentos, para sobreviver à ida aos instrumentos pós e sair na mesma
// exportação (RF11)
export function saveExposure(session: Session, startedAt: Date, endedAt: Date) {
  const record = {
    instrumento: 'EXPOSICAO',
    participanteId: session.participantId,
    grupo: GROUP_BY_CONDITION[session.condition],
    estrutura: session.order[session.currentIndex],
    posicao: session.currentIndex + 1,
    inicioEm: startedAt.toISOString(),
    fimEm: endedAt.toISOString(),
    exposicaoMs: endedAt.getTime() - startedAt.getTime(),
  }
  try {
    const records = JSON.parse(localStorage.getItem(COLETA_KEY) ?? '[]')
    records.push(record)
    localStorage.setItem(COLETA_KEY, JSON.stringify(records))
  } catch (error) {
    console.error('Tempo de exposição não gravado:', record, error)
  }
}

export function listColeta(): Record<string, unknown>[] {
  try {
    return JSON.parse(localStorage.getItem(COLETA_KEY) ?? '[]')
  } catch {
    return []
  }
}

// Campos aninhados (respostas, erros, itensCorretos) viram colunas "campo.chave",
// em qualquer profundidade, para que nenhum instrumento perca dados no CSV único
function flatten(value: unknown, prefix = '', flat: Record<string, unknown> = {}) {
  if (value === null || typeof value !== 'object') {
    flat[prefix] = value
    return flat
  }
  const entries = Array.isArray(value)
    ? value.map((item, index): [string, unknown] => {
        // lista de itens com id vira coluna por id: itensCorretos.q1.acertou
        if (item !== null && typeof item === 'object' && 'id' in item) {
          const { id, ...rest } = item
          return [String(id), rest]
        }
        return [String(index), item]
      })
    : Object.entries(value)
  for (const [key, sub] of entries) flatten(sub, prefix ? `${prefix}.${key}` : key, flat)
  return flat
}

function csvCell(value: unknown) {
  const text = value === undefined || value === null ? '' : String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function buildCsv(records: Record<string, unknown>[]) {
  const rows = records.map((record) => flatten(record))
  const columns: string[] = []
  for (const row of rows) {
    for (const column of Object.keys(row)) if (!columns.includes(column)) columns.push(column)
  }
  // mantém cada grupo (respostas.*, erros.*) junto e em ordem numérica: q1, q2, ..., q10
  const group = (column: string) => column.split('.')[0]
  const groupOrder = (column: string) => columns.findIndex((c) => group(c) === group(column))
  columns.sort(
    (a, b) => groupOrder(a) - groupOrder(b) || a.localeCompare(b, undefined, { numeric: true }),
  )
  return [columns.join(','), ...rows.map((row) => columns.map((c) => csvCell(row[c])).join(','))].join('\n')
}

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type: `${type};charset=utf-8` }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

// RF11: exportação única de tudo o que foi coletado no aparelho (instrumentos e
// tempo de exposição de todos os participantes)
export function exportColeta(format: 'json' | 'csv') {
  const records = listColeta()
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
  if (format === 'json') {
    download(`upx08-coleta-${stamp}.json`, JSON.stringify(records, null, 2), 'application/json')
  } else {
    download(`upx08-coleta-${stamp}.csv`, buildCsv(records), 'text/csv')
  }
}

export function saveSession(session: Session) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // aba anônima ou armazenamento bloqueado: a sessão segue só em memória
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // nada a limpar
  }
}

// Abrir um instrumento recarrega o app; ao voltar, a etapa só avança se o
// instrumento gravou o registro. Se o participante voltou sem terminar, a
// mesma etapa aparece de novo.
export function resumeSession(): Session | null {
  let session: Session | null = null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    session = raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
  if (!session) return null

  let step = session.step
  while (isInstrumentStep(step) && isInstrumentDone(session, step)) {
    step = nextStep(session.condition, step)
  }
  if (step !== session.step) {
    session = { ...session, step }
    saveSession(session)
  }
  return session
}
