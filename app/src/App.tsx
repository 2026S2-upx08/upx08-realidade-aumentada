import { Suspense, useRef, useState } from 'react'
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

const store = createXRStore({ hitTest: true, domOverlay: true })

const MIN_SIZE_M = 1
const MAX_SIZE_M = 4
const DEFAULT_SIZE_M = 2.25
const DEFAULT_STRUCTURE: StructureId = 'coliseu'

// Figura humana fica em 1,70 m reais, fora da escala da maquete (decisão da #40)
const HUMAN_HALF_WIDTH_M = 0.3
const HUMAN_GAP_M = 0.3

// Fator único: o maior eixo real da estrutura passa a medir sizeM
function getScale(structure: StructureId, sizeM: number) {
  return sizeM / Math.max(...STRUCTURES[structure].sizeM)
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
  onChange,
}: {
  sizeM: number
  scale: number
  onChange: (value: number) => void
}) {
  return (
    <IfInSessionMode allow="immersive-ar">
      <XRDomOverlay>
        <div className="absolute bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-md bg-white/90 p-3 text-center text-sm shadow-md">
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
        </div>
      </XRDomOverlay>
    </IfInSessionMode>
  )
}

export default function App() {
  const [anchoredAt, setAnchoredAt] = useState<Vector3 | null>(null)
  const [sizeM, setSizeM] = useState(DEFAULT_SIZE_M)
  const structure = DEFAULT_STRUCTURE

  return (
    <>
      <button
        type="button"
        onClick={() => store.enterAR()}
        className="absolute top-5 left-1/2 z-10 -translate-x-1/2 rounded-md bg-white px-6 py-3 text-base font-medium shadow-md"
      >
        Entrar em AR
      </button>
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={1} />
          <directionalLight position={[1, 2, 1]} />
          <Reticle onSelect={setAnchoredAt} />
          {anchoredAt && (
            <Suspense fallback={null}>
              <AnchoredModel position={anchoredAt} structure={structure} sizeM={sizeM} />
            </Suspense>
          )}
          <SizeControl
            sizeM={sizeM}
            scale={getScale(structure, sizeM)}
            onChange={setSizeM}
          />
        </XR>
      </Canvas>
    </>
  )
}
