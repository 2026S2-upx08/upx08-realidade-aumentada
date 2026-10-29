# Material bidimensional de controle

Imagens estáticas exibidas ao grupo de controle no modo bidimensional (RF06), uma por estrutura. Ficam em `app/public/flat/` e são mostradas pelo componente `FlatView` em [`app/src/App.tsx`](../../app/src/App.tsx).

| Arquivo | Estrutura | Tamanho |
|---|---|---|
| `coliseu.webp` | Coliseu | 1200 × 900, 23 KB |
| `estatua.webp` | Estátua da Liberdade | 1200 × 900, 14 KB |
| `cristo.webp` | Cristo Redentor | 1200 × 900, 8 KB |

## Conteúdo

Depois da retirada do processo construtivo do escopo (19/10/2026), o material bidimensional passou a ser **só a imagem em escala de cada estrutura**, sem etapas e sem texto informativo. A tela mostra a imagem, o nome da estrutura e o botão "Concluir estrutura", com o mesmo fluxo de avanço do modo RA.

## Origem

As imagens são renderizadas a partir dos **mesmos GLB usados na RA** (`app/public/models/`), para que as duas condições mostrem a mesma geometria (RNF07). Origem e licença dos modelos em [LICENCAS-MODELOS.md](LICENCAS-MODELOS.md).

## Como gerar de novo

Na pasta `app/`, com o Google Chrome instalado:

```bash
npm install
npm run flat
```

O script [`app/scripts/render-flat.mjs`](../../app/scripts/render-flat.mjs) sobe o Vite, abre [`app/scripts/render-flat.html`](../../app/scripts/render-flat.html) no Chrome headless para cada estrutura, tira o print e converte para WebP. Se o Chrome estiver em outro lugar: `CHROME=/caminho/do/chrome npm run flat`.

Para testar um enquadramento sem gerar os arquivos, rode `npx vite` em `app/` e abra `/scripts/render-flat.html?s=estatua&r=90` (`r` é o giro em graus).

## Parâmetros de renderização

| Parâmetro | Valor | Motivo |
|---|---|---|
| Resolução | 1200 × 900, iguais para as três | Padronização entre as estruturas |
| Câmera | Ortográfica, vista lateral | Sem perspectiva, a proporção entre estrutura e figura não depende da distância |
| Unidade | Metros reais | A figura de 1,70 m fica automaticamente no mesmo fator de escala da estrutura |
| Figura humana | `humano.glb`, 1,70 m, a 3 m da estrutura, cor escura `#1b2a3a` sem sombreamento | No Coliseu a figura tem poucos pixels; em cinza sobre cinza desapareceria. Muda só a cor, não a proporção |
| Fundo | `#eceae6`, com faixa de chão `#cfcac2` | Neutro, sem marcação |
| Enquadramento | Conjunto centralizado, margem de 12% | Nada cortado nas bordas |
| Giro | Coliseu 0°, Estátua 270°, Cristo 0° | Cada estrutura aparece de frente |
| Compressão | WebP, qualidade 82 | Peso baixo para celular |

## Decisões

1. **Nenhum número na imagem.** Sem medidas, régua graduada ou escala escrita, pelo mesmo motivo dos instrumentos: qualquer valor exibido ancoraria a tarefa de estimativa.
2. **Figura humana proporcional (RNF03).** Numa imagem estática não existe a opção de manter a figura em 1,70 m reais: ela só pode estar na mesma escala da estrutura.
3. **Vista lateral em vez de perspectiva.** Em perspectiva, o que está mais perto da câmera parece maior, e a figura humana deixaria de servir de referência confiável.

## Limitações e pontos em aberto

- **Divergência com o modo RA.** Na RA a figura humana fica fixa em 1,70 m reais ao lado da maquete (decisão da #40), enquanto aqui ela é proporcional. As duas condições diferem justamente na referência de tamanho, que é o que a RQ1 mede, o que afeta a equivalência exigida pelo RNF07. Pendente de decisão da equipe.
- **Figura muito pequena no Coliseu.** Com 187 m de comprimento na mesma imagem, a figura fica com poucos pixels. É o tamanho correto em escala, mas pode passar despercebida; vale observar no teste com participantes.
- **Texto da tábua espelhado na Estátua.** Vem da textura do modelo original, não do script. Não é medida e não interfere na estimativa.
- **Uma única vista por estrutura.** Na RA o participante pode andar em volta do modelo; aqui vê só a vista frontal.
