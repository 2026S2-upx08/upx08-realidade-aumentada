// Gera as imagens estáticas do modo bidimensional (#54) a partir dos mesmos
// GLB usados na RA, para que as duas condições mostrem a mesma geometria (RNF07).
//
// Uso (na pasta app/):  npm run flat
// Requer o Google Chrome instalado. Outro caminho: CHROME=/caminho/do/chrome npm run flat
//
// Saída: public/flat/<estrutura>.webp

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { createServer } from 'vite'

const ESTRUTURAS = ['coliseu', 'estatua', 'cristo']
const LARGURA = 1200
const ALTURA = 900
const QUALIDADE_WEBP = 82
const PORTA = 5180

const CHROME =
  process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const raizApp = new URL('..', import.meta.url).pathname
const saida = join(raizApp, 'public', 'flat')
const temp = mkdtempSync(join(tmpdir(), 'upx08-flat-'))
mkdirSync(saida, { recursive: true })

const servidor = await createServer({
  root: raizApp,
  logLevel: 'error',
  server: { port: PORTA, strictPort: true },
})
await servidor.listen()

try {
  for (const id of ESTRUTURAS) {
    const png = join(temp, id + '.png')
    // Assíncrono de propósito: o Vite roda neste mesmo processo e precisa do
    // event loop livre para servir a página que o Chrome está abrindo
    await promisify(execFile)(
      CHROME,
      [
        '--headless=new',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
        '--hide-scrollbars',
        `--window-size=${LARGURA},${ALTURA}`,
        '--virtual-time-budget=30000',
        `--screenshot=${png}`,
        `http://localhost:${PORTA}/scripts/render-flat.html?s=${id}`,
      ],
    )
    const destino = join(saida, id + '.webp')
    const info = await sharp(png).webp({ quality: QUALIDADE_WEBP }).toFile(destino)
    console.log(`${id}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
  }
} finally {
  await servidor.close()
  rmSync(temp, { recursive: true, force: true })
}
