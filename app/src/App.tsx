import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  XR,
  createXRStore,
  useXRHitTest,
  useXREvent,
  IfInSessionMode,
  XRDomOverlay,
} from '@react-three/xr'
import { Matrix4, Vector3, type Mesh } from 'three'

const store = createXRStore({ hitTest: true, domOverlay: true })

const MIN_SIZE_M = 1
const MAX_SIZE_M = 4
const DEFAULT_SIZE_M = 2.25

function Reticle({ onSelect }: { onSelect: (position: Vector3) => void }) {
  const ref = useRef<Mesh>(null)
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
    <mesh ref={ref} visible={hasHit} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.08, 0.1, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

function AnchoredModel({ position, sizeM }: { position: Vector3; sizeM: number }) {
  return (
    <mesh
      position={[position.x, position.y + sizeM / 2, position.z]}
      scale={[sizeM * 0.4, sizeM, sizeM * 0.4]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function SizeControl({
  sizeM,
  onChange,
}: {
  sizeM: number
  onChange: (value: number) => void
}) {
  return (
    <IfInSessionMode allow="immersive-ar">
      <XRDomOverlay>
        <div className="absolute bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-md bg-white/90 p-3 text-center text-sm shadow-md">
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>{MIN_SIZE_M} m</span>
            <span>{sizeM.toFixed(1)} m</span>
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
          <Reticle onSelect={(position) => setAnchoredAt((prev) => prev ?? position)} />
          {anchoredAt && <AnchoredModel position={anchoredAt} sizeM={sizeM} />}
          <SizeControl sizeM={sizeM} onChange={setSizeM} />
        </XR>
      </Canvas>
    </>
  )
}
