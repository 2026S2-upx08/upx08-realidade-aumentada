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
