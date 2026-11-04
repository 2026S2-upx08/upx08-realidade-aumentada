# Fluxo de Trabalho da Equipe

Convenções que o time usa neste projeto. Útil pra quem for commitar, mexer no Trello, ou usar um assistente de IA no repositório.

## Trello

Quadro: "Conect Way - Monumentos Histórico-Culturais (UPX08)". Listas: Informações do Projeto, Backlog, Andamento, Espera, Concluído (sem listas de "Sprint N" — o planejamento semanal é representado pelas datas de vencimento dos cards, que se agrupam em prazos reconhecíveis).

Cada card tem um número visível (ex: `#57`), referenciado nos commits (ver abaixo). Prefixos usados nos títulos: `DEV -` (desenvolvimento do protótipo), `ARTIGO -` (artigo científico), `PITCH -` (apresentação final), `TRELLO -` (organização do próprio quadro), `EAD -`, `PLANILHA -`.

Cards costumam ter um checklist numerado; cada item do checklist corresponde a um pedaço do trabalho que pode ser commitado separadamente.

## Mensagens de commit

Convenção: `tipo (#card): mensagem` quando o commit cobre o card inteiro, ou `tipo (#card-item1,item2): mensagem` quando resolve item(ns) específico(s) do checklist. Tipos: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`. Commits pequenos e descritivos, nunca um commit único reunindo várias frentes. Mensagens em inglês, sem emoji, sem corpo longo.

## README técnico do protótipo

O `README.md` da raiz segue um modelo fixo de 33 itens dado pelo professor (enunciado completo em `internal_docs/04-documentacao_tecnica.md`), com checklist equivalente no card `#57` do Trello (offset: item do checklist N corresponde à seção N-3 do README, ex: item 9 → seção 6). Esse card já foi concluído; o README deve continuar sendo atualizado conforme o protótipo evolui, pra nunca ficar desatualizado em relação ao código (já aconteceu mais de uma vez nesse projeto: uma seção ficar descrevendo um estado antigo depois de um merge de outra pessoa).

## Assistentes de IA neste repositório

Se você usar um assistente de IA aqui, valem as mesmas regras que o time já segue:

- **Nunca escrever no Trello via API/MCP.** Só leitura. Edição do quadro é manual.
- **Nunca rodar `git add`/`commit`/`push` automaticamente.** A IA deve dar os comandos prontos (em blocos separados) pra rodar manualmente.
- Reescrita de histórico (`amend`, `cherry-pick`, `push --force`) só com confirmação explícita, e sempre avisando que quem já deu `pull` depois precisa resincronizar com `git fetch && git reset --hard origin/main`.
- Rodar type-check/lint/build é automático (rápido, local, sem pedir permissão). Testes que dependem de navegador/dispositivo real são passados como passo a passo pra rodar manualmente.

## Documentação técnica avulsa

Decisões técnicas específicas (licenças dos modelos 3D, otimização, geração do material bidimensional, itens do questionário de compreensão) ficam em `docs/documents/`, cada uma em seu próprio `.md`, referenciadas a partir do README quando relevante.
