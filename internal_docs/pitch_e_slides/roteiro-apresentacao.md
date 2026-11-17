# Roteiro da apresentação presencial (Mostra de Projetos 2026)

Divisão de fala baseada no PDF final `Conect Way - Monumentos Histórico-Culturais (UPX08).pdf` (17 slides) e nas frentes de cada integrante (ver `docs/contexts/00-visao-geral.md`). Tempo total: 5 a 8 minutos. Cada bloco é só um guia de pontos a falar, não texto decorado.

## Bloco 1 — Gabriel (slides 1 a 5, ~2 min)

**Slides:** Título (1), capa + Contextualização/Problema (2-3), capa + Objetivos (4-5).

- Identificação: nome do projeto, UPX08, equipe Conect Way.
- Problema: material didático 2D não ajuda a entender a escala real de monumentos grandes.
- Público-alvo: estudantes do Ensino Fundamental (deixar claro que a avaliação atual foi feita com adultos proxy, não com o público final).
- Proposta: ancorar modelos 3D em escala reduzida via RA, comparando com uma representação 2D equivalente.
- Objetivo geral e a pergunta de pesquisa (RQ1/H1): a RA reduz mais o erro de estimativa de dimensões do que o 2D?

## Bloco 2 — Bruno (slides 6 a 12, ~2,5 min)

**Slides:** capa + Metodologia (6-7), capa + Desenvolvimento (8-9), capa + Resultados (10-11, passar a vez pro João no fim do 11), ODS e Orçamento (12).

- Stack e delineamento: React 19 + WebXR, 12 usuários proxy (6 RA, 6 2D), pré/pós-teste, ordem contrabalanceada.
- Desenvolvimento: ancoragem via hit-test WebXR (1 a 4 m, maior eixo real da estrutura), modo 2D espelhando a mesma geometria 3D. Mostrar o print do Coliseu ancorado.
- ODS e Orçamento: ODS 4 (Educação de Qualidade, meta 4.1), orçamento R$ 0 (bibliotecas open source, modelos CC BY 4.0, hospedagem gratuita Vercel/GitHub), hardware (celular Android com suporte a RA).
- Entregar a fala pro João já no início do slide de Resultados (10-11), já que ele validou os instrumentos e pode falar dos números com mais propriedade.

## Bloco 3 — João (slides 10/11 a 17, ~2,5 min)

**Slides:** Resultados (10-11, retomando os números), capa + Conclusões (12-13... na prática 13-14), capa + Referências e Contatos (15-16), QR Code (17).

- Resultados: erro caiu de 43,2% para 18,5% no grupo RA, ficou praticamente estável no 2D (39,2% → 36,0%); SUS médio 75,8; diferença significativa (p = 0,026) → H1 sustentada. Citar o ensaio técnico (ancoragem estável, ≥30 fps, 12 sessões sem falha).
- Conclusões: RA ajudou mais na estimativa, mas é evidência preliminar (adultos, sessão única). Limitação: a figura humana de referência confunde a estimativa em estruturas horizontais (Coliseu). Próximos passos: validar o questionário de compreensão e repetir com estudantes do Ensino Fundamental.
- Fechar com referências/equipe e o QR Code do app.

## Perguntas da banca (ver `orientacoes-apresentacao.md`)

O professor passou 25 perguntas-guia sobre problema, metodologia, resultados e trabalhos futuros, mais um posicionamento comum sobre o projeto ser uma PoC acadêmica, sem modelo de negócio este semestre. Vale cada um reler as perguntas mais próximas da própria frente antes da apresentação:

- Gabriel: perguntas 1-10 (problema, motivação, hipótese, objetivos).
- Bruno: perguntas 11-15 (metodologia e aspectos técnicos).
- João: perguntas 16-25 (resultados, amostra, limitações, trabalhos futuros).

O posicionamento sobre monetização (final do arquivo) vale pra qualquer um responder, se a banca perguntar: é uma PoC acadêmica, sem proposta de modelo de negócio neste semestre.
