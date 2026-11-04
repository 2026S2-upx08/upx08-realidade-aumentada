# Estado Atual do Protótipo

Resumo técnico vivo do que já foi decidido e implementado, pra não precisar reconstruir esse raciocínio lendo todo o histórico de commits. O `README.md` da raiz é mais formal e completo (segue o modelo do professor); este arquivo é mais direto, focado em decisões e no porquê delas.

## Stack

React 19 + Vite + TypeScript, `react-three-fiber` + `@react-three/xr` (WebXR Device API, hit-test, immersive-ar, DOM overlay), Tailwind CSS 4. Hospedado na Vercel. Sem backend: tudo roda no navegador, dados ficam em `localStorage`/`sessionStorage` até a exportação.

## Fluxo da sessão

Máquina de estados em `app/src/session.ts`. Etapas, na ordem: `estimativa-pre` → `compreensao-pre` → `estruturas` (as 3, em ordem contrabalanceada) → `estimativa-pos` → `compreensao-pos` → `sus` (só se condição for RA) → `fim` (exportação). Cada instrumento (estimativa, compreensão, SUS) é um HTML separado em `app/public/instrumentos/`, aberto na mesma aba; ao voltar, a sessão confere se o registro foi gravado em `localStorage` antes de avançar — se o participante voltou sem terminar, a mesma etapa reaparece. Isso sobrevive a recarregamento de página via `sessionStorage`.

## O que está implementado (RF) e por quê

- **Ancoragem e escala** (RF01, RF02): hit-test WebXR, modelo em modo maquete, ajustável de 1 a 4 m.
- **Ordem contrabalanceada das estruturas** (RF03): decidida pelo sistema, não pelo participante. **Atenção**: existe um card no Trello (`DEV - Decidir entre ordem contrabalanceada ou seleção livre das estruturas`, ainda em Backlog) discutindo se isso deveria mudar. O código já implementa contrabalanceada como se a decisão estivesse tomada — vale o time confirmar formalmente e fechar esse card.
- **Modo bidimensional** (RF06): imagens estáticas reais, renderizadas a partir dos mesmos GLB da RA (`npm run flat`, script `app/scripts/render-flat.mjs`), pra manter a mesma geometria entre condições (RNF07). Documentado em `docs/documents/MATERIAL-BIDIMENSIONAL.md`.
- **Instrumentos** (RF09, RF10): questionário de compreensão (focado em escala/proporção, não mais em processo construtivo — ver abaixo) e SUS (só grupo RA).
- **Exportação** (RF11): JSON e CSV, achatando campos aninhados, uma exportação única reunindo todos os registros do aparelho.
- **Figura humana de referência** (RF12): **altura real fixa, 1,70 m**, independente da escala do modelo ancorado. Importante: isso já passou por uma mudança de decisão (antes era proporcional ao modelo, e ficava quase invisível em estruturas grandes como o Coliseu — ver seção 24/Problemas do README). O artigo científico, na última versão avaliada, ainda descreve isso de forma inconsistente (ora real, ora proporcional) — é uma das correções pendentes mais importantes (ver `02-artigo-cientifico.md`).

## O que foi cancelado e por quê

**RF04 (navegação entre etapas construtivas), RF05 (painel informativo da etapa) e RF08 (tarefa de ordenação das etapas)** foram removidos do escopo. Motivo: redução de escopo por tempo disponível. Isso significa que o protótipo hoje **não trata mais do processo construtivo (RQ2/H2) de forma alguma** — só da escala (RQ1/H1). O questionário de compreensão foi adaptado pra focar em escala/proporção (commits `#75-1,2,3,4`).

**Consequência que ainda não foi resolvida**: o artigo científico avaliado pelo professor foi escrito _antes_ desse corte de escopo, e ainda trata o processo construtivo como parte central da pesquisa. Isso é uma contradição real entre o artigo e o artefato — tratado em detalhe em `02-artigo-cientifico.md`.

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

## Limitações conhecidas (resumo; completo na seção 22 do README)

- Testes feitos com usuários proxy (colegas de curso), não com o público-alvo real (Ensino Fundamental) — sem aprovação ética ainda pra isso.
- Validação real feita em um único smartphone (Samsung Galaxy S25).
- Taxa de quadros (RNF04, mínimo 30 fps) ainda não validada formalmente em dispositivo real.
- Figura humana no modo 2D é proporcional à imagem (não fixa em 1,70 m como na RA) — diverge da RA e afeta a equivalência exigida pelo RNF07 entre as condições. Pendente de decisão do time.
