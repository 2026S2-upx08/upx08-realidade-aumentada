# Otimização dos modelos 3D

Os modelos usados no app ficam em `app/public/models/` e são gerados a partir dos originais do Sketchfab pelo script [`app/scripts/optimize-models.mjs`](../../app/scripts/optimize-models.mjs). Fontes e licenças em [LICENCAS-MODELOS.md](LICENCAS-MODELOS.md).

## Como rodar

1. Baixe os originais no Sketchfab no formato **GLB (textura 2k)** e salve em `models-src/`, na raiz do repositório (pasta fora do git):

   | Arquivo | Modelo |
   |---|---|
   | `coliseu.glb` | "Colosseum" |
   | `estatua.glb` | "Statue Of Liberty" |
   | `cristo.glb` | "Christ the Redeemer" |
   | `humano.glb` | "3d people standing smooth" |

2. Na pasta `app/`:

   ```bash
   npm install
   npm run models            # processa todos
   npm run models -- cristo  # processa só os indicados
   ```

## O que o script faz

Em todos os modelos:

- Remove câmeras e nós vazios e junta as malhas (1 chamada de desenho por material).
- Converte para **metros reais**, com **Y para cima**, **base em y=0** e centralizado em x/z.
- Comprime a geometria com **Meshopt**. O decodificador já vem embutido no `useGLTF` do drei, então o carregamento não depende de servidor externo (diferente do Draco).

Ajustes por modelo:

| Modelo | Ajuste | Triângulos | Arquivo |
|---|---|---|---|
| Coliseu | Original era circular e mais baixo: escala não uniforme para **187 × 156 m e 45 m de altura** (oval). Redução de polígonos. | 763.406 → 152.680 | 28,2 → 1,6 MB |
| Estátua da Liberdade | Já estava em metros, sem pedestal: escala para **46 m**. Texturas convertidas para **WebP (máx. 2048 px)**. | 56.931 (sem redução) | 12,5 → 2,1 MB |
| Cristo Redentor | Pedestal ocupava 26,5% da altura: comprimido só ele para **21% (8 m de 38 m)**, sem deformar a estátua. Simplificação com tolerância de 0,1%, que elimina a malha densa da gravação lateral do pedestal. | 78.083 → 39.041 | 3,6 → 0,6 MB |
| Figura humana | Das 6 figuras do original, mantida só a `46_person` (em pé, braços ao lado do corpo), escalada para **1,70 m**. | 11.020 → 1.830 | 0,3 → 0,02 MB |

## Proporções (RNF03)

| Estrutura | Modelo | Referência do artigo |
|---|---|---|
| Coliseu | 187 × 156 m, 45 m de altura | 187 m de comprimento, 45 m de altura |
| Estátua da Liberdade | 46 m, sem pedestal | 46 m, sem pedestal |
| Cristo Redentor | 38 m (30 m estátua + 8 m pedestal), envergadura 29,5 m | 38 m (30 + 8), envergadura 28 m |
| Figura humana | 1,70 m | 1,70 m |

A envergadura do Cristo fica 5% acima da real por causa da proporção do modelo original; as medidas usadas nas estimativas (alturas e comprimento do Coliseu) estão exatas.

## Uso no app

Como todos os modelos estão em metros, o fator de escala da estrutura é:

```
fator = tamanho da maquete (m) / maior eixo real da estrutura (m)
```

A figura humana não recebe esse fator: fica sempre com 1,70 m reais, ao lado da maquete, como referência visual. Em escala proporcional ela ficaria pequena demais (cerca de 2 cm no Coliseu com maquete de 2,25 m). Decisão do time registrada na #40, divergente do RF12/RNF03 do artigo.
