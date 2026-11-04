# Visão Geral do Projeto

Contexto geral pra qualquer pessoa (ou IA) que precise entender o projeto rapidamente, sem ler o repositório inteiro. Os outros arquivos desta pasta (`docs/contexts/`) aprofundam tópicos específicos.

## O que é

Protótipo de realidade aumentada (RA) que ajuda estudantes a entender a escala e o processo construtivo de monumentos histórico-culturais (Coliseu, Estátua da Liberdade, Cristo Redentor), comparando o efeito da RA com o de uma representação bidimensional equivalente. É o projeto experimental da disciplina UPx08 (Realidade Aumentada), e também sustenta um artigo científico sendo escrito em paralelo na mesma disciplina.

## Equipe (Conect Way)

| Nome                           | RA     | Frente principal                                                     |
| ------------------------------ | ------ | -------------------------------------------------------------------- |
| Bruno da Silveira Escanhoela   | 236793 | Modelos 3D, licenciamento, validação de campo do WebXR               |
| Gabriel Ferreira do Nascimento | 236085 | Setup do projeto, ancoragem/escala, deploy, documentação técnica     |
| João Guilherme Volta Kinol     | 235255 | Instrumentos de avaliação (SUS, compreensão), material bidimensional |

Curso: Engenharia de Computação. Instituição: Centro Universitário Facens, Sorocaba/SP. Professor: Daniel Ohata. 8º semestre, 2026.

## Links importantes

- Repositório: `https://github.com/2026S2-upx08/upx08-realidade-aumentada` (o remote local ainda pode apontar pro endereço antigo `github.com/upx08/...`, que está redirecionando)
- Aplicação em produção: `https://upx08-realidade-aumentada.vercel.app/`
- Quadro Trello: "Conect Way - Monumentos Histórico-Culturais (UPX08)", listas Informações do Projeto / Backlog / Andamento / Espera / Concluído

## Duas frentes de trabalho, não confundir

1. **O protótipo** (código em `app/`, documentado tecnicamente no `README.md` da raiz). É o que roda de verdade.
2. **O artigo científico** (fora deste repositório, no modelo `.docx` da disciplina). Descreve a pesquisa: pergunta, hipóteses, metodologia, e (na entrega final) resultados. **O artigo e o protótipo precisam estar sempre coerentes entre si** — toda vez que o escopo do protótipo muda (uma funcionalidade é cancelada, uma decisão de design muda), o artigo precisa ser atualizado também. Essa falta de sincronia já foi apontada pelo professor uma vez (ver `02-artigo-cientifico.md`).

## Decisão de escopo mais importante até agora

O processo construtivo navegável (RF04/RF05/RF08 — avançar entre etapas, painel informativo, tarefa de ordenação) foi **cancelado** do protótipo por restrição de tempo. O projeto hoje foca só em **escala** (RQ1/H1): ancorar o modelo em tamanho reduzido, comparar RA com uma imagem estática equivalente, e medir erro de estimativa de dimensões antes/depois. Isso afeta tanto o código quanto o artigo (que, na última versão avaliada pelo professor, ainda descrevia o processo construtivo como central — ver `02-artigo-cientifico.md`).

## Por onde começar a ler

- Quer entender o protótipo tecnicamente? Leia o `README.md` da raiz do repo inteiro, ele é a fonte de verdade.
- Quer entender o estado atual com mais contexto de decisões/histórico? Leia `01-prototipo-estado-atual.md`.
- Vai mexer no artigo científico? Leia `02-artigo-cientifico.md` antes de tudo.
- Vai commitar ou mexer no Trello? Leia `03-fluxo-de-trabalho.md`.
