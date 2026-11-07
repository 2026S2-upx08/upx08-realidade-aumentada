# Artigo Científico — Status e Pendências

> **Status em 2026-11-07: entrega da v3 (revisão final) enviada ao professor.** Esta é uma entrega de feedback, sem nota — a entrega definitiva da AF (Avaliação Final) acontece em 2 a 3 semanas. Os cards #103 e #104 estão concluídos. Detalhes da v3 na seção "Fase 8" mais abaixo.

O artigo é escrito fora deste repositório, no modelo oficial `.docx` da disciplina (`FSGQ-19.02.01 rev. 03 — MODELO DE ARTIGO CIENTÍFICO`), mas o histórico de avaliação e os enunciados das atividades ficam versionados aqui em `internal_docs/`. Este arquivo resume o estado pra quem for mexer no artigo não precisar reler tudo.

## Onde está cada coisa

- `internal_docs/02-artigo-cientifico-v1.md` — enunciado da primeira atividade (v1 do artigo).
- `internal_docs/05-avaliacao-professor-entrega-anterior.md` — feedback do professor sobre a **v2** do artigo, 13 pontos de melhoria. Todos os 13 resolvidos na v3 (ver seção abaixo).
- `internal_docs/06-proxima-entrega-artigo.md` — enunciado da entrega final (v3): revisão integral dos 13 pontos + adequação ao modelo FSGQ + Resultados + Discussão + Conclusão. Esse enunciado já foi atendido por completo.
- `internal_docs/FSGQ-19.02.01 rev. 03- MODELO DE ARTIGO CIENTÍFICO.docx` — modelo oficial em branco, fornecido pelo professor. Usado como referência pra conferir formatação (ex: numeração de página fica no **cabeçalho**, alinhada à direita, não no rodapé — confirmado direto no XML do docx).
- `internal_docs/UPx08 - MODELO DE ARTIGO CIENTÍFICO.docx` e `.pdf` — **a v3 atual, entregue**. O `.docx` é o formato de entrega oficial exigido; o `.pdf` é gerado a partir dele só pra leitura/revisão.
- `internal_docs/UPx08 - MODELO DE ARTIGO CIENTÍFICO-entrega-anterior.pdf` — a v2 (a que foi avaliada pelo professor, resultando nos 13 pontos), ~22 páginas, mantida só como referência de comparação.
- `docs/images/artigo/figura1_arquitetura.svg` / `.png` — Figura 1 (arquitetura), com texto aumentado (item 4 do #103). Fonte editável em SVG, renderizada via Chrome headless pro PNG usado no artigo.
- `docs/images/artigo/` — Figura 2 (wireframes) também aqui, em PNG e SVG, já sem o processo construtivo. Esta pasta é versionada, ao contrário de `internal_docs/`.

## Sincronia entre artigo e protótipo (resolvida no card #83)

A v2 do artigo (avaliada pelo professor) descrevia o processo construtivo navegável (RQ2, H2, RF04/RF05/RF08, tarefa de ordenação de etapas) como parte central da pesquisa, mas o protótipo cancelou isso depois dessa avaliação (ver `01-prototipo-estado-atual.md`). O enunciado da entrega final exige que _"a versão final não poderá apresentar contradições entre a proposta inicial, a metodologia realizada e os resultados obtidos"_.

O card #83 (Fase 1) resolveu isso em 2026-11-04. A decisão foi **remover o processo construtivo da pesquisa**, sem mantê-lo como hipótese não avaliada. O artigo passou a ter uma única questão (RQ1) e uma única hipótese (H1), ambas sobre escala. O processo construtivo aparece só como fora de escopo (Introdução e seção 4.2) e como trabalho futuro (Considerações finais, e depois Limitações e Conclusão). Mudaram junto: objetivos, Quadros de métricas, de evidências e de testes, RF04/RF05/RF08 (não listados, com a numeração dos demais mantida), Figuras 1 e 2, Resumo, Abstract e título. O README do repositório recebeu a mesma correção.

Se mexer no artigo, não reintroduza etapas, ordenação, RQ2 ou H2. O questionário de compreensão mede escala e proporção (`docs/documents/ITENS-COMPREENSAO.md`), e o material bidimensional é só a imagem da estrutura, sem texto (`docs/documents/MATERIAL-BIDIMENSIONAL.md`).

### Figura humana: resolvido (ponto 4 do feedback do professor)

O app usa **1,70 m fixos** na RA e figura proporcional à imagem no modo 2D (README, seções 22 e 24). O time avaliou as duas formas de unificar esse comportamento entre condições (fixo nos dois, ou proporcional nos dois) e descartou ambas: fixo no 2D exigiria desenhar a figura com dezenas de metros de altura na imagem pra manter a mesma proporção visual da RA (fisicamente absurdo); proporcional na RA deixaria a figura com poucos centímetros, imperceptível. A divergência foi mantida e documentada como limitação assumida do desenho experimental, com a justificativa completa na seção 3.3 (parágrafo após o Quadro 1), no RNF03 (seguindo só na RA), na exceção registrada no RNF07, e no Quadro 4 (casos de teste separados pra RA e 2D, RF12). Sem mudança de código.

## Os 13 pontos do feedback do professor (resumo; texto completo no `05`)

**Todos os 13 resolvidos na v3**, reconferidos contra o texto final mais de uma vez (incluindo uma rodada cética, do zero, sem herdar conclusão de rodada anterior).

1. ✅ Delimitar o público-alvo (usuários proxy vs. público real da BNCC) — Introdução deixa explícito, resultados restritos aos proxies.
2. ✅ Precisar a interpretação do efeito da RA (não é só rastreamento isolado) — hoje só existe H1 (ver seção acima), Introdução explicita que o efeito é do conjunto, não de uma característica isolada.
3. ✅ Ampliar a fundamentação teórica e montar quadro comparativo — card #94: 3 trabalhos novos adicionados (Chiu et al. 2024, Hain e Motaref 2023, Giambastiani et al. 2024, um por integrante + 1 achado em conjunto), Quadro 1 comparativo (objetivo, participantes, tecnologia, procedimento, resultados, limitações) na seção 2.
4. ✅ Inconsistência de escala da figura humana/maquete (**prioridade do professor**) — ver seção acima.
5. ✅ Matriz de equivalência entre as condições RA e bidimensional — Quadro 2, seção 3.3.
6. ✅ Amostra, alocação e contrabalanceamento dos participantes — seção 3.3, detalhado (códigos P01-P12, blocos de 4, 6 ordens contrabalanceadas).
7. ✅ Detalhar os instrumentos de coleta — seção 3.4, questionário com 10 itens em 3 blocos, tratamento de erro/valor extremo (análise de sensibilidade).
8. ✅ Plano de análise estatística pro delineamento de medidas repetidas — seção 3.5, comparação da variação entre grupos (não só pré/pós isolado), efeito de ordem controlado, Cohen (1988) pro tamanho de efeito.
9. ✅ Critérios de aceitação mensuráveis pros RNFs — RNF02 (5cm), RNF04 (justificativa dos 30fps/10s).
10. ✅ Diagrama de arquitetura e nomes de bibliotecas — Figura 1 com legenda de fluxo numerada, nomes padronizados (`react-three-fiber`, `@react-three/xr`).
11. ✅ Testes técnicos com critério de aprovação mensurável — Quadro 5 (era Quadro 4), com execuções e critério por linha.
12. ✅ Seção de aspectos éticos — seção 3.6 completa (Resolução 510/2016, CEP/Conep, privacidade, riscos).
13. ✅ Formatação institucional e escrita acadêmica — datas fictícias removidas, sobrescrito dos autores corrigido, Figura 1 com texto maior, afirmações categóricas qualificadas, referências ABNT em ordem alfabética com negrito correto, numeração de página no cabeçalho (igual ao modelo oficial).

## Seções que faltavam escrever (entrega final, v3) — todas concluídas

- ~~Consolidação da metodologia como o que foi _realmente_ executado~~ Concluída (Fase 6, card #97).
- ~~Coleta de dados real com participantes pra validar a PoC~~ Concluída (Fase 5), dados em `docs/results/Coleta.csv`.
- ✅ Seção de Resultados (5.1-5.4: caracterização, validação técnica, resultados quantitativos e qualitativos).
- ✅ Discussão dos resultados (6.1-6.5: funcionamento da PoC, evidências em relação à H1, dificuldades relatadas, relação com a literatura, melhorias necessárias).
- ✅ Limitações da avaliação (seção 7).
- ✅ Conclusão/Considerações finais (seção 8), retomando RQ1/H1 sem inventar sucesso além do sustentado pelos dados.
- ✅ Resumo e Abstract atualizados com os resultados finais, dentro do limite de 250 palavras cada (Resumo 247, Abstract 245, conferido no Word/Google Docs).

## Plano de tasks

Esse trabalho foi quebrado em 22 cards (prefixo `ARTIGO -`) organizados em 8 fases por dependência, definidas em 2026-11-03. Os cards são criados manualmente no Trello (o #83 corresponde à Fase 1). Se algum não existir ou o título e o checklist se perderem, vale reconstruir a partir dos 13 pontos do `05` e das seções pendentes do `06` listadas acima. Confira no quadro quais já foram concluídos, porque esta lista não acompanha o status de cada card.

### Ordem de dependência

**Fase 1 — Decisão estrutural (trava quase tudo o resto)**

1. Remover o processo construtivo (RQ2/H2) do artigo, alinhando com o corte de escopo do protótipo. **Concluída em 2026-11-04 (card #83).**

**Fase 2 — Ajustes conceituais da pesquisa (paralelo entre si, depois da Fase 1)** 2. Resolver a inconsistência conceitual da escala da maquete e da figura humana. 3. Delimitar o alcance da avaliação com usuários proxy na Introdução e na Metodologia. 4. Precisar a interpretação do efeito da RA na hipótese H1. 5. Definir amostra, alocação e contrabalanceamento dos participantes.

**Fase 3 — Especificação técnica (depende da Fase 1 e 2, principalmente da 2)** 6. Detalhar e atualizar os instrumentos de coleta conforme o escopo atual. 7. Elaborar matriz de equivalência experimental entre as condições RA e bidimensional. 8. Definir critérios de aceitação mensuráveis para os requisitos não funcionais. 9. Atualizar o diagrama de arquitetura e padronizar os nomes das bibliotecas. 10. Detalhar os procedimentos de teste técnico com critérios de aprovação mensuráveis. 11. Corrigir o plano de análise estatística para o delineamento com medidas repetidas.

**Fase 4 — Independentes, podem rodar em paralelo com 1-3** 12. Ampliar a fundamentação teórica e montar quadro comparativo dos trabalhos relacionados. 13. Criar seção de aspectos éticos da pesquisa.

**Fase 5 — Coleta de dados. Concluída em 2026-11-05 (card #96).** 14. Planejar e executar a coleta de dados com participantes para validação da PoC. 12 participantes diferentes (6 RA, 6 2D), 3 a 5 de novembro de 2026, dados em `docs/results/Coleta.csv`. Contrabalanceamento conferido: as 6 ordens de apresentação aparecem exatamente uma vez em cada grupo.

**Fase 6 — Consolidação da metodologia (junta tudo que mudou nas fases 1-3). Concluída em 2026-11-06 (card #97).** 15. Revisar e consolidar a metodologia conforme o que foi efetivamente executado. Seção 3.3 com a coleta real (datas, amostra, confirmação do contrabalanceamento), seções 4.1 e 4.7 em tempo verbal de execução (não mais de proposta), e seção 4.8 com o parágrafo "Resultados já obtidos" reescrito: registra o bug do RF02 (escala calculada pela altura em vez do maior eixo, ver `01-prototipo-estado-atual.md`), a correção, e confirma que o ensaio técnico final foi concluído antes da coleta, não depois.

**Fase 7 — Resultados em diante. Concluída.** 16. Resultados. 17. Discussão dos Resultados. 18. Limitações da Avaliação. 19. Conclusão. Todas escritas, com os dados reais de `docs/results/Coleta.csv`.

**Fase 8 — Fechamento. Concluída em 2026-11-07.** 20. Resumo e Abstract atualizados. 21. Formatação institucional e escrita acadêmica (card #103, 9 itens, todos concluídos). 22. Revisão final de coerência (card #104, 5 itens, todos concluídos).

### Como a Fase 8 foi fechada (resumo do que aconteceu, pra não precisar reconstruir o raciocínio)

**Card #94** (fundamentação teórica + quadro comparativo, parte da Fase 4 mas fechada junto no final): cada integrante pesquisou e analisou 1 artigo novo sobre cognição espacial/representação 3D/avaliação de compreensão (Gabriel: Chiu et al. 2024, calibração de percepção de tamanho em RA; Bruno: Hain e Motaref 2023, RA vs 2D em geometria de engenharia; João: Giambastiani et al. 2024, infográficos em RA pra compreensão de volumes). Os 3 entraram na seção 2 com parágrafos próprios e entraram no Quadro 1 (comparação dos trabalhos relacionados, 6 trabalhos no total). **Atenção**: a pesquisa e leitura dos artigos do Gabriel e do Bruno foi feita por IA a pedido deles, não lida de fato pelos dois antes de entrar no artigo — vale pelo menos dar uma lida nos PDFs (links nas referências do artigo) antes de reivindicar a autoria dessa contribuição, já que o #104 item 5 confere participação real de cada integrante no levantamento bibliográfico.

**Card #103** (9 itens): datas fictícias removidas; sobrescrito dos autores corrigido (usa `ª` ligado ao nome, sem espaço); Figura 1 com fonte maior (SVG em `docs/images/artigo/figura1_arquitetura.svg`, renderizado via Chrome headless); afirmações categóricas sobre o 2D qualificadas (2 ocorrências, Introdução e seção 4.1); citações y referências conferidas uma a uma; referências em ordem alfabética ABNT (a reordenação foi necessária depois que o #94 adicionou 2 referências novas fora de ordem); migração pro modelo oficial (o artigo já era escrito direto nele, só faltou exportar `.docx`); limite de 12 páginas — **o artigo ficou com 39 páginas**, bem acima do limite, mas o professor confirmou por e-mail (07/11) que não desconta nota por isso nesta entrega.

Com a adição do Quadro 1 (#94), todos os Quadros do artigo tiveram que ser renumerados em sequência (1 a 5, pela ordem de aparição no texto, não pela ordem de criação) — toda referência cruzada no corpo do texto foi atualizada junto.

**Card #104** (5 itens): os 13 pontos do professor reconferidos (ver seção acima); metodologia conferida contra o protótipo real (`01-prototipo-estado-atual.md`), sem divergência; achada e corrigida uma inconsistência de terminologia que se repetiu em 3 lugares do artigo (Introdução, seções 4.7 e 3.4) — a palavra "compreensão" estava sendo usada genericamente onde o sentido correto era "percepção"/"estimativa" de escala, já que o artigo define "compreensão" especificamente como a medida do questionário, que **não** teve efeito significativo (ao contrário da estimativa, que sim); Resumo e Abstract cortados pra caber no limite de 250 palavras (usando "p.p." como abreviação, consistente com a Tabela 1); adequação ao modelo FSGQ conferida, incluindo a numeração de página que tinha se perdido (recolocada no **cabeçalho**, alinhada à direita, igual ao modelo oficial — não no rodapé, que é onde normalmente se espera, mas não é o que esse modelo específico usa).

A validação final foi feita em várias rodadas sucessivas, cada uma mais cética que a anterior (conteúdo → ortografia/gramática → consistência numérica → fonte real via XML do `.docx` → padrão de escrita/conectivos), porque cada rodada achava alguma coisa pequena que a anterior tinha deixado passar. Se for fazer esse tipo de revisão de novo em outro artigo, vale já começar com esse nível de ceticismo em vez de ir aumentando aos poucos.
