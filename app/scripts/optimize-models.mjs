// Otimiza os modelos originais (models-src/) para uso no app (public/models/).
// Uso: npm run models            -> processa todos
//      npm run models -- coliseu -> processa só os indicados
// Saída em metros reais, Y para cima, base em y=0 e centrado em x/z.

import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { NodeIO, getBounds } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import {
  clearNodeTransform,
  dedup,
  flatten,
  join,
  meshopt,
  prune,
  simplify,
  textureCompress,
  transformMesh,
  weld,
} from '@gltf-transform/functions'
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import sharp from 'sharp'

const SRC_DIR = path.resolve(import.meta.dirname, '../../models-src')
const OUT_DIR = path.resolve(import.meta.dirname, '../public/models')

// Dimensões alvo em metros (x = comprimento, y = altura, z = profundidade).
// Eixo null = acompanha a escala dos outros (mantém a proporção original).
const MODELS = {
  coliseu: {
    src: 'coliseu.glb',
    size: { x: 187, y: 45, z: 156 },
    simplify: { ratio: 0.2, error: 0.005 },
  },
  estatua: {
    src: 'estatua.glb',
    size: { x: null, y: 46, z: null },
    textureSize: 2048,
  },
  cristo: {
    src: 'cristo.glb',
    size: { x: null, y: 38, z: null },
    // Topo do pedestal medido no original (26,5% da altura); real: 8 m de 38 m.
    pedestal: { top: 0.265, ratio: 8 / 38 },
    simplify: { ratio: 0.5, error: 0.001 },
  },
  humano: {
    src: 'humano.glb',
    // O original tem 6 figuras; usamos uma (braços ao lado do corpo).
    keepNode: '46_person',
    size: { x: null, y: 1.7, z: null },
  },
}

function countTriangles(doc) {
  let total = 0
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      if (prim.getMode() !== 4) continue
      const indices = prim.getIndices()
      total += (indices ?? prim.getAttribute('POSITION')).getCount() / 3
    }
  }
  return Math.round(total)
}

function sceneBounds(doc) {
  const root = doc.getRoot()
  return getBounds(root.getDefaultScene() ?? root.listScenes()[0])
}

// Remove câmeras e, se indicado, as malhas cujo nó não contém `keepNode` no nome.
function cleanup(keepNode) {
  return (doc) => {
    for (const camera of doc.getRoot().listCameras()) camera.dispose()
    if (!keepNode) return
    for (const node of doc.getRoot().listNodes()) {
      if (node.getMesh() && !node.getName().includes(keepNode)) node.setMesh(null)
    }
  }
}

// Aplica as transformações dos nós direto nos vértices, para medir e escalar em coordenadas finais.
function bakeTransforms() {
  return async (doc) => {
    await doc.transform(flatten())
    for (const node of doc.getRoot().listNodes()) {
      if (node.getMesh()) clearNodeTransform(node)
    }
  }
}

// Comprime verticalmente só o trecho abaixo de `top` (fração da altura) para que ele
// ocupe `ratio` da altura final; o que está acima apenas desce, sem deformar.
function resizePedestal({ top, ratio }) {
  return (doc) => {
    const { min, max } = sceneBounds(doc)
    const cut = min[1] + top * (max[1] - min[1])
    const pedestal = cut - min[1]
    const above = max[1] - cut
    const k = (ratio / (1 - ratio)) * above / pedestal
    const accessors = new Set()
    for (const mesh of doc.getRoot().listMeshes()) {
      for (const prim of mesh.listPrimitives()) accessors.add(prim.getAttribute('POSITION'))
    }
    const v = [0, 0, 0]
    for (const pos of accessors) {
      for (let i = 0; i < pos.getCount(); i++) {
        pos.getElement(i, v)
        v[1] = v[1] < cut ? min[1] + (v[1] - min[1]) * k : v[1] - pedestal * (1 - k)
        pos.setElement(i, v)
      }
    }
  }
}

// Escala cada eixo para a dimensão alvo e posiciona a base em y=0, centrada em x/z.
function fitToSize(size) {
  return (doc) => {
    const { min, max } = sceneBounds(doc)
    const current = [0, 1, 2].map((i) => max[i] - min[i])
    const target = [size.x, size.y, size.z]
    const known = target.map((t, i) => (t == null ? null : t / current[i])).filter((s) => s != null)
    const scale = target.map((t, i) => (t == null ? known[0] : t / current[i]))
    const center = [(min[0] + max[0]) / 2, min[1], (min[2] + max[2]) / 2]
    const matrix = [
      scale[0], 0, 0, 0,
      0, scale[1], 0, 0,
      0, 0, scale[2], 0,
      -center[0] * scale[0], -center[1] * scale[1], -center[2] * scale[2], 1,
    ]
    for (const mesh of doc.getRoot().listMeshes()) transformMesh(mesh, matrix)
  }
}

async function optimize(name, config) {
  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder })

  const srcPath = path.join(SRC_DIR, config.src)
  const outPath = path.join(OUT_DIR, `${name}.glb`)
  const doc = await io.read(srcPath)
  const trisBefore = countTriangles(doc)

  await doc.transform(cleanup(config.keepNode), prune(), dedup(), bakeTransforms(), prune(), join())
  if (config.pedestal) await doc.transform(resizePedestal(config.pedestal))
  await doc.transform(fitToSize(config.size), weld())
  if (config.simplify) {
    await doc.transform(simplify({ simplifier: MeshoptSimplifier, ...config.simplify }))
  }
  if (config.textureSize) {
    const resize = [config.textureSize, config.textureSize]
    await doc.transform(textureCompress({ encoder: sharp, targetFormat: 'webp', resize }))
  }
  await doc.transform(prune(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }))

  await io.write(outPath, doc)

  const { min, max } = sceneBounds(doc)
  const dims = [0, 1, 2].map((i) => (max[i] - min[i]).toFixed(1)).join(' x ')
  const [before, after] = await Promise.all([stat(srcPath), stat(outPath)])
  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1)
  console.log(`${name}: ${dims} m (x × y × z), base y=${min[1].toFixed(2)}`)
  console.log(`  triângulos ${trisBefore} -> ${countTriangles(doc)}`)
  console.log(`  arquivo ${mb(before.size)} MB -> ${mb(after.size)} MB  (${path.relative(process.cwd(), outPath)})`)
}

await Promise.all([MeshoptEncoder.ready, MeshoptSimplifier.ready])
await mkdir(OUT_DIR, { recursive: true })

const selected = process.argv.slice(2)
const names = selected.length ? selected : Object.keys(MODELS)
for (const name of names) {
  if (!MODELS[name]) throw new Error(`Modelo desconhecido: ${name}`)
  await optimize(name, MODELS[name])
}
