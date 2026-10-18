import { useGLTF } from '@react-three/drei'

export type StructureId = 'coliseu' | 'estatua' | 'cristo'

// Medidas reais (x, y, z em metros) dos GLBs gerados por scripts/optimize-models.mjs
export const STRUCTURES: Record<
  StructureId,
  { label: string; url: string; sizeM: [number, number, number] }
> = {
  coliseu: { label: 'Coliseu', url: '/models/coliseu.glb', sizeM: [187, 45, 156] },
  estatua: { label: 'Estátua da Liberdade', url: '/models/estatua.glb', sizeM: [12, 46, 15.2] },
  cristo: { label: 'Cristo Redentor', url: '/models/cristo.glb', sizeM: [29.5, 38, 11.5] },
}

const HUMAN_URL = '/models/humano.glb'

export function Structure({ id, scale }: { id: StructureId; scale: number }) {
  const { scene } = useGLTF(STRUCTURES[id].url)
  return <primitive object={scene} scale={scale} />
}

export function HumanFigure() {
  const { scene } = useGLTF(HUMAN_URL)
  return <primitive object={scene} />
}

for (const { url } of Object.values(STRUCTURES)) useGLTF.preload(url)
useGLTF.preload(HUMAN_URL)
