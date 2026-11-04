# Artigo Científico — Status e Pendências

O artigo é escrito fora deste repositório, no modelo oficial `.docx` da disciplina (`FSGQ-19.02.01 rev. 03 — MODELO DE ARTIGO CIENTÍFICO`), mas o histórico de avaliação e os enunciados das atividades ficam versionados aqui em `internal_docs/`. Este arquivo resume o estado pra quem for mexer no artigo não precisar reler tudo.

## Onde está cada coisa

- `internal_docs/02-artigo-cientifico-v1.md` — enunciado da primeira atividade (v1 do artigo).
- `internal_docs/05-avaliacao-professor-entrega.md` — feedback do professor sobre a **v2** do artigo (a mais recente avaliada), 13 pontos de melhoria.
- `internal_docs/annotated-UPx08...pdf` — a v2 do artigo que foi avaliada (texto completo, pra conferir o que exatamente foi escrito).
- `internal_docs/06-proxima-entrega-artigo.md` — enunciado da entrega final (v3): revisão integral + Resultados + Discussão + Conclusão.

## O problema maior: artigo e protótipo saíram de sincronia

A v2 do artigo (avaliada pelo professor) ainda descreve o processo construtivo navegável (RQ2, H2, RF04/RF05/RF08, tarefa de ordenação de etapas) como parte central da pesquisa. Mas o protótipo **já cancelou isso** depois dessa avaliação (ver `01-prototipo-estado-atual.md`). O professor nem chegou a comentar essa contradição especificamente (ela é posterior ao feedback dele), mas o enunciado da entrega final é claro: _"a versão final não poderá apresentar contradições entre a proposta inicial, a metodologia realizada e os resultados obtidos"_. Então essa é a correção mais importante e que precisa vir **antes** de quase todas as outras, porque muda RQ/H/objetivos/instrumentos/requisitos em cascata.

## Os 13 pontos do feedback do professor (resumo; texto completo no `05`)

1. Delimitar o público-alvo (usuários proxy vs. público real da BNCC).
2. Precisar a interpretação do efeito da RA em H1/H2 (não é só rastreamento isolado).
3. Ampliar a fundamentação teórica (só 3 trabalhos relacionados, sem quadro comparativo).
4. Resolver a inconsistência de escala da figura humana/maquete (**prioridade do professor**).
5. Elaborar matriz de equivalência entre as condições RA e bidimensional.
6. Definir amostra, alocação e contrabalanceamento dos participantes.
7. Detalhar os instrumentos de coleta (como tratar erros, quantidade de itens, critérios de correção).
8. Corrigir o plano de análise estatística pro delineamento de medidas repetidas.
9. Definir critérios de aceitação mensuráveis pros requisitos não funcionais.
10. Atualizar o diagrama de arquitetura e padronizar nomes de bibliotecas.
11. Detalhar os testes técnicos com critério de aprovação mensurável.
12. Criar uma seção de aspectos éticos (consentimento, CEP/Conep, segurança dos participantes).
13. Corrigir formatação institucional e escrita acadêmica (datas fictícias, referências, quadros).

## O que falta escrever de novo (entrega final, v3)

Além de corrigir os 13 pontos acima, a entrega final (`06`) exige seções que ainda não existem:

- Consolidação da metodologia como o que foi _realmente_ executado (não só planejado).
- Coleta de dados real com participantes pra validar a PoC (evidências técnicas + de execução de tarefas + de percepção).
- Seção de Resultados (caracterização da avaliação, resultados técnicos, resultados com participantes).
- Discussão dos resultados (interpretação crítica, não repetição de números).
- Limitações da avaliação.
- Conclusão (retomando objetivo e questão de pesquisa, sem inventar sucesso não sustentado por dados).
- Atualização do Resumo e Abstract com os resultados finais.

## Plano de tasks

Esse trabalho foi quebrado em 22 cards (prefixo `ARTIGO -`) organizados em 8 fases por dependência, definidas em 2026-11-03. Os cards ainda não foram criados no Trello, precisam ser adicionados manualmente (título, descrição e checklist de cada um foram definidos nessa data; se não estiver mais à mão, vale reconstruir a partir dos 13 pontos do `05` e das seções pendentes do `06` listadas acima).

### Ordem de dependência

**Fase 1 — Decisão estrutural (trava quase tudo o resto)**

1. Remover o processo construtivo (RQ2/H2) do artigo, alinhando com o corte de escopo do protótipo.

**Fase 2 — Ajustes conceituais da pesquisa (paralelo entre si, depois da Fase 1)** 2. Resolver a inconsistência conceitual da escala da maquete e da figura humana. 3. Delimitar o alcance da avaliação com usuários proxy na Introdução e na Metodologia. 4. Precisar a interpretação do efeito da RA nas hipóteses H1 e H2. 5. Definir amostra, alocação e contrabalanceamento dos participantes.

**Fase 3 — Especificação técnica (depende da Fase 1 e 2, principalmente da 2)** 6. Detalhar e atualizar os instrumentos de coleta conforme o escopo atual. 7. Elaborar matriz de equivalência experimental entre as condições RA e bidimensional. 8. Definir critérios de aceitação mensuráveis para os requisitos não funcionais. 9. Atualizar o diagrama de arquitetura e padronizar os nomes das bibliotecas. 10. Detalhar os procedimentos de teste técnico com critérios de aprovação mensuráveis. 11. Corrigir o plano de análise estatística para o delineamento com medidas repetidas.

**Fase 4 — Independentes, podem rodar em paralelo com 1-3** 12. Ampliar a fundamentação teórica e montar quadro comparativo dos trabalhos relacionados. 13. Criar seção de aspectos éticos da pesquisa.

**Fase 5 — Coleta de dados (começa quando a Fase 3 e o item 13 estiverem minimamente resolvidos; pode rodar em paralelo com as fases 2-4 se as sessões já estiverem acontecendo)** 14. Planejar e executar a coleta de dados com participantes para validação da PoC.

**Fase 6 — Consolidação da metodologia (junta tudo que mudou nas fases 1-3)** 15. Revisar e consolidar a metodologia conforme o que foi efetivamente executado.

**Fase 7 — Resultados em diante (depende da Fase 5 com dados reais em mãos)** 16. Escrever a seção de Resultados. 17. Escrever a seção de Discussão dos Resultados. 18. Escrever a seção de Limitações da Avaliação. 19. Escrever a Conclusão.

**Fase 8 — Fechamento** 20. Atualizar Resumo e Abstract com os resultados finais. 21. Corrigir formatação institucional e escrita acadêmica. 22. Revisão final de coerência entre proposta, metodologia e resultados.

A única que não trava em sequência rígida é a coleta de dados (14): se as sessões reais já estiverem rodando, pode começar bem antes, em paralelo com as fases 2-4 — só não dá pra fechar os Resultados (16) sem ela e sem a Fase 3 definida (os instrumentos mudam com o item 1).
