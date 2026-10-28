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
