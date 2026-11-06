# Estado Atual do Protótipo

Resumo técnico vivo do que já foi decidido e implementado, pra não precisar reconstruir esse raciocínio lendo todo o histórico de commits. O `README.md` da raiz é mais formal e completo (segue o modelo do professor); este arquivo é mais direto, focado em decisões e no porquê delas.

## Stack

React 19 + Vite + TypeScript, `react-three-fiber` + `@react-three/xr` (WebXR Device API, hit-test, immersive-ar, DOM overlay), Tailwind CSS 4. Hospedado na Vercel. Sem backend: tudo roda no navegador, dados ficam em `localStorage`/`sessionStorage` até a exportação.

## Fluxo da sessão

Máquina de estados em `app/src/session.ts`. Etapas, na ordem: `estimativa-pre` → `compreensao-pre` → `estruturas` (as 3, em ordem contrabalanceada) → `estimativa-pos` → `compreensao-pos` → `sus` (só se condição for RA) → `fim` (exportação). Cada instrumento (estimativa, compreensão, SUS) é um HTML separado em `app/public/instrumentos/`, aberto na mesma aba; ao voltar, a sessão confere se o registro foi gravado em `localStorage` antes de avançar — se o participante voltou sem terminar, a mesma etapa reaparece. Isso sobrevive a recarregamento de página via `sessionStorage`.

## O que está implementado (RF) e por quê

- **Ancoragem e escala** (RF01, RF02): hit-test WebXR, modelo em modo maquete, ajustável de 1 a 4 m. **Correção importante**: `getScale` em `App.tsx` escalava pela altura (`sizeM[1]`) em vez do maior eixo real da estrutura. Não afetava Estátua da Liberdade nem Cristo Redentor (maior eixo já é a altura), mas fazia o Coliseu (mais comprido que alto) ultrapassar a faixa de 1 a 4 m: no tamanho padrão de 2,25 m, o comprimento saía com 9,35 m, maior que a sala. Corrigido para `Math.max(...sizeM)`, batendo com o que o RF02 sempre exigiu ("no maior eixo"). Encontrado e corrigido antes do ensaio técnico final e da coleta real.
- **Ordem contrabalanceada das estruturas** (RF03): decidida pelo sistema, não pelo participante. **Atenção**: existe um card no Trello (`DEV - Decidir entre ordem contrabalanceada ou seleção livre das estruturas`, ainda em Backlog) discutindo se isso deveria mudar. O código já implementa contrabalanceada como se a decisão estivesse tomada — vale o time confirmar formalmente e fechar esse card.
- **Modo bidimensional** (RF06): imagens estáticas reais, renderizadas a partir dos mesmos GLB da RA (`npm run flat`, script `app/scripts/render-flat.mjs`), pra manter a mesma geometria entre condições (RNF07). Documentado em `docs/documents/MATERIAL-BIDIMENSIONAL.md`.
- **Instrumentos** (RF09, RF10): questionário de compreensão (focado em escala/proporção, não mais em processo construtivo — ver abaixo) e SUS (só grupo RA).
- **Exportação** (RF11): JSON e CSV, achatando campos aninhados, uma exportação única reunindo todos os registros do aparelho.
- **Figura humana de referência** (RF12): **altura real fixa, 1,70 m** na RA, independente da escala do modelo ancorado; proporcional à imagem no modo 2D. Essa divergência entre condições foi avaliada e mantida deliberadamente, não é mais uma inconsistência em aberto: unificar nos dois sentidos cria problemas piores (figura de dezenas de metros na imagem 2D pra manter a mesma proporção visual da RA, ou figura de poucos centímetros, imperceptível, se a RA virasse proporcional). O artigo documenta isso como limitação assumida do desenho experimental, com a justificativa técnica completa (seção 3.3, Quadro 1, RNF07), e o Quadro 4 tem casos de teste separados pra RA e pra 2D.

## O que foi cancelado e por quê

**RF04 (navegação entre etapas construtivas), RF05 (painel informativo da etapa) e RF08 (tarefa de ordenação das etapas)** foram removidos do escopo. Motivo: redução de escopo por tempo disponível. Isso significa que o protótipo hoje **não trata mais do processo construtivo (RQ2/H2) de forma alguma** — só da escala (RQ1/H1). O questionário de compreensão foi adaptado pra focar em escala/proporção (commits `#75-1,2,3,4`).

**Consequência, resolvida no card #83 (2026-11-04)**: o artigo científico avaliado pelo professor tinha sido escrito _antes_ desse corte de escopo, e ainda tratava o processo construtivo como parte central da pesquisa. O time removeu o processo construtivo do artigo, alinhando com o protótipo — detalhes em `02-artigo-cientifico.md`.

## Estrutura de pastas (resumo; completo no README)

```
app/
├── public/
│   ├── models/          GLBs otimizados (coliseu, estátua, cristo, humano)
│   ├── instrumentos/    HTML dos instrumentos (estimativa, compreensão, sus)
│   └── flat/             imagens estáticas do modo bidimensional
├── scripts/              optimize-models.mjs, render-flat.mjs
├── src/
│   ├── App.tsx            telas e componentes de UI
│   ├── session.ts         máquina de estados, persistência, exportação
│   ├── structures.tsx      dados e componentes dos modelos 3D
│   └── counterbalance.ts   ordem contrabalanceada
docs/
├── contexts/      este diretório
├── diagrams/      arquitetura.svg, fluxo-sessao.svg
├── documents/     licenças, otimização de modelos, material 2D, itens de compreensão
└── images/        screenshots (fluxo/, instrumentos/, estruturas/ra|2d/)
```

## Coleta de dados real (concluída)

A coleta com participantes reais aconteceu entre 3 e 5 de novembro de 2026, no Samsung Galaxy S25 usado na validação técnica. 12 pessoas diferentes, 6 no grupo experimental (RA) e 6 no grupo controle (2D), cada uma participando uma única vez, batendo com o esquema de contrabalanceamento (as 6 ordens de apresentação das 3 estruturas, cada uma usada exatamente uma vez por grupo). Dados exportados em `docs/results/Coleta.csv`, um registro por instrumento/etapa (ESTIMATIVA pré/pós, COMPREENSAO pré/pós, EXPOSICAO por estrutura, SUS só no grupo experimental). O ensaio técnico final (trena, estabilidade sob diferentes iluminações e superfícies, taxa de quadros e tempo de carregamento) foi concluído antes da coleta, já com a correção do RF02 aplicada.

## Limitações conhecidas (resumo; completo na seção 22 do README)

- Testes feitos com usuários proxy (colegas de curso), não com o público-alvo real (Ensino Fundamental) — sem aprovação ética ainda pra isso.
- Validação real e coleta feitas em um único smartphone (Samsung Galaxy S25).
