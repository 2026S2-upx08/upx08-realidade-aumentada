# Lista de alocação dos participantes

Registro do sorteio descrito na seção 3.3 do artigo (card #105).

## Método

- Sorteio computacional feito em 05/11/2026, com `crypto.randomInt` do Node.js.
- 12 participantes (P01 a P12), em 3 blocos de 4. Cada bloco tem 2 participantes do grupo RA e 2 do grupo bidimensional (2D), para os grupos ficarem equilibrados ao longo da coleta.
- Dentro de cada grupo, cada uma das 6 ordens de apresentação das estruturas aparece uma vez.
- Os códigos são entregues na ordem de chegada. O pesquisador digita na tela inicial o código e a condição desta lista, e o app define a ordem pelo código (`app/src/allocation.ts`). Se a condição marcada não for a da lista, o app não deixa iniciar.
- Quem substituir uma sessão incompleta recebe um código novo a partir de P13 e herda o grupo e a ordem do código substituído. O app pede esse código e grava o campo `substitui` na exportação.
- Códigos fora do padrão P + número (por exemplo, `TESTE`) são sessões de ensaio e não entram na análise.

## Lista

| Código | Grupo | Ordem | Sequência |
|---|---|---|---|
| P01 | RA | 4 | Estátua → Cristo → Coliseu |
| P02 | 2D | 4 | Estátua → Cristo → Coliseu |
| P03 | 2D | 1 | Coliseu → Estátua → Cristo |
| P04 | RA | 1 | Coliseu → Estátua → Cristo |
| P05 | 2D | 5 | Cristo → Coliseu → Estátua |
| P06 | RA | 3 | Estátua → Coliseu → Cristo |
| P07 | 2D | 6 | Cristo → Estátua → Coliseu |
| P08 | RA | 5 | Cristo → Coliseu → Estátua |
| P09 | RA | 6 | Cristo → Estátua → Coliseu |
| P10 | RA | 2 | Coliseu → Cristo → Estátua |
| P11 | 2D | 2 | Coliseu → Cristo → Estátua |
| P12 | 2D | 3 | Estátua → Coliseu → Cristo |
