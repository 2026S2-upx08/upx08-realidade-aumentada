# Conect Way - Realidade Aumentada para Monumentos Histórico-Culturais

> Aplicação móvel de realidade aumentada que representa a escala e o processo construtivo do Coliseu, da Estátua da Liberdade e do Cristo Redentor, comparando seu efeito na compreensão desses aspectos com o de representações bidimensionais.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Plataforma](https://img.shields.io/badge/plataforma-Android-green)
![Tecnologia](https://img.shields.io/badge/RA-WebXR-blue)
![Stack](https://img.shields.io/badge/React-Three%20Fiber-black)

---

## 1. Identificação do Projeto

| Item            | Informação                                                           |
| --------------- | -------------------------------------------------------------------- |
| **Projeto**     | Conect Way - Realidade Aumentada para Monumentos Histórico-Culturais |
| **Equipe**      | Conect Way                                                           |
| **Curso**       | Engenharia de Computação                                             |
| **Disciplina**  | UPx08 - Realidade Aumentada                                          |
| **Professor**   | Daniel Ohata                                                         |
| **Instituição** | Centro Universitário Facens, Sorocaba, SP                            |
| **Semestre**    | 8º semestre, 2026                                                    |

### Integrantes

| Nome                           | RA     | Responsabilidade técnica                                                                              |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------- |
| Gabriel Ferreira do Nascimento | 236085 | Configuração do projeto, implementação da ancoragem e do ajuste de escala do modelo, deploy na Vercel |
| Bruno da Silveira Escanhoela   | 236793 | Pesquisa, licenciamento e otimização dos modelos 3D, validação de campo do rastreamento WebXR         |
| João Guilherme Volta Kinol     | 235255 | Implementação dos instrumentos de avaliação (questionário SUS e questionário de compreensão)          |

---

## 2. Visão Geral

Recursos didáticos bidimensionais, como fotografias e ilustrações de livro didático, são amplamente utilizados no ensino de História, mas frequentemente falham em transmitir a magnitude física e a complexidade temporal de grandes monumentos histórico-culturais. Dados como altura e tempo de construção chegam ao estudante como números abstratos, sem referência corporal ou noção de esforço coletivo.

O público afetado por esse problema são estudantes do Ensino Fundamental, ao longo de diferentes anos do componente curricular de História, no estudo do patrimônio material como registro de sociedades passadas.

A solução proposta é uma aplicação móvel de realidade aumentada que posiciona modelos tridimensionais do Coliseu, da Estátua da Liberdade e do Cristo Redentor no ambiente físico do usuário, em escala reduzida (modo maquete), e apresenta o processo construtivo de cada estrutura como uma sequência de etapas navegáveis. A mesma aplicação também disponibiliza um modo bidimensional equivalente, usado como grupo de controle num estudo comparativo que avalia o efeito da representação em RA sobre a compreensão de escala e de processo construtivo.

A Realidade Aumentada participa da solução na camada central da aplicação: por meio da WebXR Device API, com detecção de superfícies (hit-test), o modelo tridimensional é ancorado sobre o ambiente capturado pela câmera do dispositivo, permitindo que o usuário o observe de diferentes posições e distâncias, ao contrário do que uma foto ou ilustração estática permite.

---

## 3. Problema

O ensino de patrimônio cultural material, ao tratar de monumentos históricos de grande porte, depende tradicionalmente de fotografias, ilustrações de livro didático e vídeos. Esses recursos comunicam bem a forma desses monumentos, mas dificilmente comunicam sua real magnitude: as dimensões físicas e a duração das obras chegam ao estudante como números abstratos, sem referência corporal nem noção do esforço coletivo envolvido em sua construção.

Essa dificuldade afeta estudantes do Ensino Fundamental brasileiro, no contexto do estudo de patrimônio cultural previsto na Base Nacional Comum Curricular. Sem uma forma de situar o monumento no próprio espaço do observador, o estudante tende a tratar sua escala e seu processo construtivo como fatos a memorizar, não como algo que pode ser compreendido espacialmente.

Esse problema existe porque nenhuma das soluções tradicionais isola o efeito da representação tridimensional sobre essa compreensão: a literatura da área trata a escala principalmente como restrição técnica, não como aspecto a ser diretamente comparado e medido.

---

## 4. Objetivos

### 4.1 Objetivo Geral

Desenvolver uma aplicação móvel de realidade aumentada que represente a escala e o processo construtivo de monumentos histórico-culturais, permitindo comparar seu efeito na compreensão desses aspectos com o de representações bidimensionais equivalentes.

### 4.2 Objetivos Técnicos

- implementar a ancoragem de modelos tridimensionais no ambiente físico via WebXR hit-test;
- permitir o ajuste da escala do modelo ancorado, em modo maquete, entre 1 e 4 metros;
- apresentar o processo construtivo de cada monumento como uma sequência de etapas navegáveis;
- implementar um modo bidimensional equivalente, destinado ao grupo de controle;
- implementar os instrumentos de avaliação (estimativa de dimensões, ordenação das etapas, questionário de compreensão e questionário de usabilidade SUS);
- disponibilizar a aplicação via navegador, acessível por HTTPS, sem necessidade de instalação;
- registrar e exportar os dados coletados em formato JSON e CSV.

---

## 5. Público-Alvo

O público-alvo descrito na pesquisa que motiva o projeto é o de estudantes do Ensino Fundamental, no contexto do ensino de patrimônio cultural material. Esse público não exige familiaridade técnica prévia: a aplicação foi pensada para rodar em smartphones Android comuns, sem necessidade de instalar nenhum aplicativo além do navegador.

Nesta etapa do projeto, por restrição de escopo (ausência de aprovação ética e de acesso formal a instituições de ensino básico), os testes e validações do protótipo são conduzidos com usuários proxy: colegas de curso recrutados por conveniência, não pertencentes à população-alvo original. Essa limitação está detalhada na seção 24 (Limitações Conhecidas).
