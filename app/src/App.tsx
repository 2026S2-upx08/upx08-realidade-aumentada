import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  XR,
  createXRStore,
  useXRHitTest,
  useXREvent,
  IfInSessionMode,
  XRDomOverlay,
} from '@react-three/xr'
import { Matrix4, Vector3, type Group } from 'three'
import { HumanFigure, STRUCTURES, Structure, type StructureId } from './structures'
import { allocationOf, classifyCode, LISTED_CODES } from './allocation'
import { assignSessionOrder } from './counterbalance'
import {
  EXPOSURE_SECONDS,
  INSTRUMENTS,
  clearSession,
  exportColeta,
  instrumentUrl,
  isInstrumentStep,
  listColeta,
  nextStep,
  resumeSession,
  saveExposure,
  saveSession,
  type Condition,
  type Session,
} from './session'

const store = createXRStore({ hitTest: true, domOverlay: true })

const MIN_SIZE_M = 1
const MAX_SIZE_M = 4
const DEFAULT_SIZE_M = 2.25

// Figura humana fica em 1,70 m reais, fora da escala da maquete (decisão da #40)
const HUMAN_HALF_WIDTH_M = 0.3
const HUMAN_GAP_M = 0.3

// Contador de FPS para o teste do RNF04, ativado abrindo o app com ?fps
const SHOW_FPS = new URLSearchParams(window.location.search).has('fps')

// Segundos restantes da exposição (#106); null enquanto ela não começou. Ao
// zerar, chama onDone uma única vez.
function useCountdown(startedAt: number | null, onDone: () => void) {
  const [now, setNow] = useState(() => Date.now())
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (startedAt === null) return
    const id = setInterval(() => {
      const current = Date.now()
      setNow(current)
      if (current - startedAt >= EXPOSURE_SECONDS * 1000) {
        clearInterval(id)
        onDoneRef.current()
      }
    }, 250)
    return () => clearInterval(id)
  }, [startedAt])

  if (startedAt === null) return null
  const remaining = Math.ceil((EXPOSURE_SECONDS * 1000 - (now - startedAt)) / 1000)
  return Math.min(EXPOSURE_SECONDS, Math.max(0, remaining))
}

function formatSeconds(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

// Fator único: a altura real da estrutura passa a medir sizeM
function getScale(structure: StructureId, sizeM: number) {
  return sizeM / STRUCTURES[structure].sizeM[1]
}

function Reticle({ onSelect }: { onSelect: (position: Vector3) => void }) {
  const ref = useRef<Group>(null)
  const [hasHit, setHasHit] = useState(false)
  const matrixHelper = useRef(new Matrix4())
  const position = useRef(new Vector3())

  useXRHitTest(
    (results, getWorldMatrix) => {
      if (results.length === 0) {
        setHasHit(false)
        return
      }
      getWorldMatrix(matrixHelper.current, results[0])
      position.current.setFromMatrixPosition(matrixHelper.current)
      setHasHit(true)
    },
    'viewer',
    'plane',
  )

  useFrame(() => {
    if (hasHit && ref.current) {
      ref.current.position.copy(position.current)
    }
  })

  useXREvent('select', () => {
    if (hasHit) {
      onSelect(position.current.clone())
    }
  })

  return (
    <mesh ref={ref as never} visible={hasHit} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.08, 0.1, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

function FpsMeter({ onUpdate }: { onUpdate: (fps: number) => void }) {
  const frames = useRef(0)
  const startedAt = useRef(performance.now())

  useFrame(() => {
    frames.current += 1
    const elapsed = performance.now() - startedAt.current
    if (elapsed >= 500) {
      onUpdate(Math.round((frames.current * 1000) / elapsed))
      frames.current = 0
      startedAt.current = performance.now()
    }
  })

  return null
}

function AnchoredModel({
  position,
  structure,
  sizeM,
}: {
  position: Vector3
  structure: StructureId
  sizeM: number
}) {
  const scale = getScale(structure, sizeM)
  const structureHalfWidth = (STRUCTURES[structure].sizeM[0] * scale) / 2
  const humanX = structureHalfWidth + HUMAN_GAP_M + HUMAN_HALF_WIDTH_M

  return (
    <group position={position}>
      <Structure id={structure} scale={scale} />
      <group position-x={humanX}>
        <HumanFigure />
      </group>
    </group>
  )
}

function SizeControl({
  sizeM,
  scale,
  fps,
  remaining,
  onChange,
}: {
  sizeM: number
  scale: number
  fps: number | null
  remaining: number | null
  onChange: (value: number) => void
}) {
  return (
    <IfInSessionMode allow="immersive-ar">
      <XRDomOverlay>
        <div className="absolute bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-md bg-white/90 p-3 text-center text-gray-900 text-sm shadow-md">
          {fps !== null && <div className="mb-1 text-xs font-medium">{fps} fps</div>}
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>{MIN_SIZE_M} m</span>
            <span>
              {sizeM.toFixed(1)} m · 1:{Math.round(1 / scale)}
            </span>
            <span>{MAX_SIZE_M} m</span>
          </div>
          <input
            type="range"
            min={MIN_SIZE_M}
            max={MAX_SIZE_M}
            step={0.1}
            value={sizeM}
            onChange={(event) => onChange(Number(event.target.value))}
            className="w-full"
          />
          <div className="mt-2 text-xs font-medium">
            {remaining === null
              ? 'Toque no chão para posicionar o modelo'
              : `Tempo restante ${formatSeconds(remaining)}`}
          </div>
        </div>
      </XRDomOverlay>
    </IfInSessionMode>
  )
}

// Tela inicial (4.9/Figura 2a do artigo): o pesquisador informa o código do
// participante e a condição experimental antes de a sessão começar.
//
// O pesquisador digita o código e a condição da lista de alocação; a ordem das
// estruturas vem do código (seção 3.3, #105). Condição diferente da lista trava
// o início, para nenhum participante rodar no grupo errado.
function StartScreen({
  onStart,
}: {
  onStart: (start: {
    participantId: string
    condition: Condition
    order: StructureId[] | null
    substitui?: string
  }) => void
}) {
  const [participantCode, setParticipantCode] = useState('')
  const [condition, setCondition] = useState<Condition>('ra')
  const [replaced, setReplaced] = useState('')

  const code = classifyCode(participantCode)
  const listed =
    code.kind === 'lista' ? code : code.kind === 'substituto' && replaced ? allocationOf(replaced) : null
  const conditionLabel = (c: Condition) => (c === 'ra' ? 'RA' : 'Bidimensional')

  let notice = ''
  let blocked = participantCode.trim() === ''
  if (code.kind === 'invalido') {
    notice = 'Código inválido.'
    blocked = true
  } else if (code.kind === 'substituto' && !replaced) {
    notice = 'Escolha qual código este participante substitui.'
    blocked = true
  } else if (code.kind === 'teste' && participantCode.trim() !== '') {
    notice = 'Código fora da lista: sessão de teste, ordem pelo contador do aparelho.'
  }
  if (listed && listed.condition !== condition) {
    notice = `Pela lista, este código é do grupo ${conditionLabel(listed.condition)}.`
    blocked = true
  }

  function handleStart() {
    if (code.kind === 'invalido') return
    onStart({
      participantId: code.code,
      condition,
      order: listed ? listed.order : null,
      substitui: code.kind === 'substituto' ? replaced : undefined,
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-lg font-medium">Início da sessão</h1>
      <div className="w-full max-w-xs space-y-3">
        <label className="block text-sm">
          Código do participante
          <input
            type="text"
            value={participantCode}
            onChange={(event) => setParticipantCode(event.target.value)}
            placeholder="P_"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
        <fieldset className="text-sm">
          <legend className="mb-1">Condição experimental</legend>
          <label className="mr-4">
            <input
              type="radio"
              name="condition"
              checked={condition === 'ra'}
              onChange={() => setCondition('ra')}
            />{' '}
            RA
          </label>
          <label>
            <input
              type="radio"
              name="condition"
              checked={condition === '2d'}
              onChange={() => setCondition('2d')}
            />{' '}
            Bidimensional
          </label>
        </fieldset>
        {code.kind === 'substituto' && (
          <label className="block text-sm">
            Substitui qual código?
            <select
              value={replaced}
              onChange={(event) => setReplaced(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Escolher</option>
              {LISTED_CODES.map((listedCode) => (
                <option key={listedCode} value={listedCode}>
                  {listedCode}
                </option>
              ))}
            </select>
          </label>
        )}
        {listed && (
          <p className="text-sm text-gray-500">
            Ordem: {listed.order.map((id) => STRUCTURES[id].label).join(' → ')}
          </p>
        )}
        {notice && <p className="text-sm text-amber-700">{notice}</p>}
      </div>
      <button
        type="button"
        disabled={blocked}
        onClick={handleStart}
        className="rounded-md bg-white px-6 py-3 text-gray-900 text-base font-medium shadow-md disabled:opacity-50"
      >
        Iniciar sessão
      </button>
    </div>
  )
}

function StructureList({
  order,
  currentIndex,
  onVisualize,
}: {
  order: StructureId[]
  currentIndex: number
  onVisualize: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-lg font-medium">Estruturas</h1>
      <ul className="w-full max-w-xs space-y-2">
        {order.map((id, index) => (
          <li
            key={id}
            className={`flex items-center justify-between rounded-md border p-3 ${
              index === currentIndex ? 'border-black' : 'border-gray-200 text-gray-400'
            }`}
          >
            <span>{STRUCTURES[id].label}</span>
            {index < currentIndex && <span>✓ concluída</span>}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onVisualize}
        className="rounded-md bg-white px-6 py-3 text-gray-900 text-base font-medium shadow-md"
      >
        Visualizar
      </button>
    </div>
  )
}

// Etapa de instrumento (#46): o instrumento abre na mesma aba e, ao terminar,
// volta para o app, que confere o registro gravado antes de avançar.
function InstrumentScreen({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm text-gray-500">Próxima etapa</p>
      <h1 className="text-lg font-medium">{label}</h1>
      <a href={href} className="rounded-md bg-white px-6 py-3 text-gray-900 text-base font-medium shadow-md">
        Abrir
      </a>
    </div>
  )
}

// RF06: modo bidimensional do grupo de controle. Mesmo fluxo de avanço do
// modo RA, mas sem renderizar o modelo tridimensional ancorado (RNF07,
// equivalência entre as condições).
//
// As imagens saem dos mesmos GLB da RA, com a figura humana no mesmo fator
// de escala da estrutura e sem nenhum número (npm run flat, #54).
//
// A exposição começa quando a imagem termina de carregar (#106).
function FlatView({
  structure,
  remaining,
  onShown,
}: {
  structure: StructureId
  remaining: number | null
  onShown: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <img
        src={`/flat/${structure}.webp`}
        alt={STRUCTURES[structure].label}
        width={1200}
        height={900}
        onLoad={onShown}
        onError={onShown}
        className="h-auto w-full max-w-xl rounded-md"
      />
      <h1 className="text-lg font-medium">{STRUCTURES[structure].label}</h1>
      <p className="text-sm text-gray-500">
        {remaining === null ? 'Carregando…' : `Tempo restante ${formatSeconds(remaining)}`}
      </p>
    </div>
  )
}

export default function App() {
  // A sessão sobrevive ao recarregamento causado pela ida aos instrumentos
  const [session, setSession] = useState<Session | null>(() => resumeSession())
  const [phase, setPhase] = useState<'list' | 'ar' | 'flat'>('list')
  const [anchoredAt, setAnchoredAt] = useState<Vector3 | null>(null)
  const [sizeM, setSizeM] = useState(DEFAULT_SIZE_M)
  const [fps, setFps] = useState<number | null>(null)
  // Abertura da estrutura (para medir a ancoragem na RA) e início da exposição
  const visitOpenedAt = useRef<Date | null>(null)
  const [exposureStartedAt, setExposureStartedAt] = useState<number | null>(null)
  const remaining = useCountdown(exposureStartedAt, handleFinishStructure)

  function updateSession(next: Session) {
    saveSession(next)
    setSession(next)
  }

  function handleStart(start: {
    participantId: string
    condition: Condition
    order: StructureId[] | null
    substitui?: string
  }) {
    // Códigos de teste usam o contador; ele só avança aqui, e não ao carregar a
    // página, porque cada volta de um instrumento recarrega o app
    updateSession({
      participantId: start.participantId,
      condition: start.condition,
      order: start.order ?? assignSessionOrder(),
      substitui: start.substitui,
      step: 'estimativa-pre',
      currentIndex: 0,
      startedAt: new Date().toISOString(),
    })
  }

  function handleNewSession() {
    clearSession()
    setSession(null)
    setPhase('list')
  }

  function handleVisualize() {
    if (!session) return
    visitOpenedAt.current = new Date()
    setExposureStartedAt(null)
    setPhase(session.condition === 'ra' ? 'ar' : 'flat')
  }

  // A exposição só começa uma vez por estrutura: reancorar não reinicia o tempo
  function startExposure() {
    setExposureStartedAt((current) => current ?? Date.now())
  }

  function handleAnchor(position: Vector3) {
    setAnchoredAt(position)
    startExposure()
  }

  function handleFinishStructure() {
    if (!session || exposureStartedAt === null) return
    const anchoringMs =
      session.condition === 'ra' && visitOpenedAt.current !== null
        ? exposureStartedAt - visitOpenedAt.current.getTime()
        : undefined
    saveExposure(session, new Date(exposureStartedAt), new Date(), anchoringMs)
    visitOpenedAt.current = null
    setExposureStartedAt(null)
    setAnchoredAt(null)
    setSizeM(DEFAULT_SIZE_M)
    setPhase('list')
    if (session.currentIndex + 1 < session.order.length) {
      updateSession({ ...session, currentIndex: session.currentIndex + 1 })
    } else {
      updateSession({ ...session, step: nextStep(session.condition, 'estruturas') })
    }
  }

  if (!session) {
    return <StartScreen onStart={handleStart} />
  }

  if (isInstrumentStep(session.step)) {
    return (
      <InstrumentScreen
        label={INSTRUMENTS[session.step].label}
        href={instrumentUrl(session, session.step)}
      />
    )
  }

  if (session.step === 'fim') {
    console.info('Ordem efetivamente apresentada:', session.order)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p>
          Sessão concluída. Ordem apresentada:{' '}
          {session.order.map((id) => STRUCTURES[id].label).join(' → ')}
        </p>
        <p className="text-sm text-gray-500">
          {listColeta().length} registros neste aparelho, de todos os participantes
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => exportColeta('json')}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
          >
            Exportar JSON
          </button>
          <button
            type="button"
            onClick={() => exportColeta('csv')}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
          >
            Exportar CSV
          </button>
        </div>
        <button
          type="button"
          onClick={handleNewSession}
          className="rounded-md bg-white px-6 py-3 text-gray-900 text-base font-medium shadow-md"
        >
          Nova sessão
        </button>
      </div>
    )
  }

  const structure = session.order[session.currentIndex]

  if (phase === 'list') {
    return (
      <StructureList
        order={session.order}
        currentIndex={session.currentIndex}
        onVisualize={handleVisualize}
      />
    )
  }

  if (phase === 'flat') {
    return <FlatView structure={structure} remaining={remaining} onShown={startExposure} />
  }

  return (
    <>
      <button
        type="button"
        onClick={() => store.enterAR()}
        className="absolute top-5 left-1/2 z-10 -translate-x-1/2 rounded-md bg-white px-6 py-3 text-gray-900 text-base font-medium shadow-md"
      >
        Entrar em AR
      </button>
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={1} />
          <directionalLight position={[1, 2, 1]} />
          <Reticle onSelect={handleAnchor} />
          {SHOW_FPS && <FpsMeter onUpdate={setFps} />}
          {anchoredAt && (
            <Suspense fallback={null}>
              <AnchoredModel position={anchoredAt} structure={structure} sizeM={sizeM} />
            </Suspense>
          )}
          <SizeControl
            sizeM={sizeM}
            scale={getScale(structure, sizeM)}
            fps={fps}
            remaining={remaining}
            onChange={setSizeM}
          />
        </XR>
      </Canvas>
    </>
  )
}
