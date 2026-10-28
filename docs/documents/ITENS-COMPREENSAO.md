# Questionário de compreensão: itens e gabarito

Documento de referência do instrumento em [`app/public/instrumentos/compreensao/index.html`](../../app/public/instrumentos/compreensao/index.html). O gabarito fica só aqui e no código; a tela nunca mostra acerto, erro ou nota ao participante.

## Por que os itens mudaram

A primeira versão media técnicas e materiais construtivos das três estruturas, porque estava ligada à questão de pesquisa sobre processo construtivo. Em 19/10/2026 a equipe retirou o processo construtivo do escopo, e o questionário passou a medir **compreensão de escala e proporção**, o construto que continua no estudo.

Foram mantidos a tela, a correção de 0 a 10, a validação, o armazenamento (`localStorage`, chave `upx08.coleta.v1`) e a exportação em JSON e CSV. Mudou só o conjunto de dez itens.

## Regras de elaboração

1. **Nenhum item cita medida dos monumentos.** O questionário roda na mesma sessão da tarefa de estimativa ([`app/public/instrumentos/estimativa/`](../../app/public/instrumentos/estimativa/index.html)), e qualquer valor exibido aqui contaminaria o erro medido lá.
2. **Os itens sobre as estruturas são só comparativos** (maior, mais largo, mais alto), sem número.
3. **Os itens de raciocínio de escala usam números genéricos**, escolhidos longe dos valores de referência da estimativa (45 m, 187 m, 46 m e 38 m) para não ancorar a resposta.
4. **A posição da alternativa correta varia.** A tela não embaralha as alternativas, então a resposta certa não pode estar sempre no mesmo lugar. Na versão anterior estava sempre na primeira opção.
5. **Mesmos itens, na mesma ordem, no pré e no pós-teste**, para que o ganho seja comparável.

## Pontuação

Um ponto por acerto, nota de 0 a 10. O registro guarda a alternativa marcada em cada item (índice de 0 a 3), o acerto item a item, a nota, o momento (`pre` ou `pos`), o grupo e a duração.

## Itens e gabarito

### Comparação entre as estruturas

| Item | Enunciado | Correta | Fonte |
|---|---|---|---|
| q1 | Qual das três estruturas ocupa a maior área no chão? | C) Coliseu | LANCASTER, 2005; NIST, 2017; IPHAN, [s.d.] |
| q2 | Qual das três estruturas é mais larga do que alta? | A) Coliseu | LANCASTER, 2005; NIST, 2017; IPHAN, [s.d.] |
| q3 | Comparando a altura do Coliseu com a altura total do Cristo Redentor, incluindo o pedestal, qual afirmação está correta? | D) O Coliseu é mais alto que o Cristo Redentor | LANCASTER, 2005; IPHAN, [s.d.] |

### Noção de escala

| Item | Enunciado | Correta | Raciocínio |
|---|---|---|---|
| q4 | Um prédio de 24 m é representado na escala 1:100. Qual é a altura da maquete? | B) 24 cm | 24 m ÷ 100 = 0,24 m |
| q5 | Uma maquete de 80 cm representa uma torre de 80 m. Em que escala está? | C) 1:100 | 80 m ÷ 0,8 m = 100 |
| q6 | Na realidade, a torre A tem o dobro da altura da torre B. Na maquete, na mesma escala, a torre A tem: | B) O dobro da altura da torre B | A escala preserva a proporção |
| q7 | Uma maquete na escala 1:50 é refeita duas vezes maior. Qual passa a ser a escala? | D) 1:25 | Dobrar a maquete divide o denominador por 2 |

### Referências de tamanho

| Item | Enunciado | Correta | Raciocínio |
|---|---|---|---|
| q8 | Por que uma figura humana ao lado da maquete ajuda a perceber o tamanho real? | A) O tamanho de uma pessoa é conhecido e, na mesma escala, serve de comparação | Princípio da referência de escala |
| q9 | Se a maquete for ampliada para o dobro, o que deve acontecer com a figura humana na mesma escala? | C) Ficar com o dobro do tamanho também | A figura acompanha o fator de escala |
| q10 | Uma figura que representa 1,70 m mede 2 cm; um edifício ao lado mede 20 cm. Qual é a altura real aproximada do edifício? | D) 17 m | 20 cm é 10 vezes 2 cm, então 10 × 1,70 m |

Fontes dos itens de escala e de referência: elaboração própria.

## Conferência da correção

O botão "Conferir correção", na tela inicial, roda os casos abaixo sem precisar de terminal:

| Caso | Nota esperada |
|---|---|
| Todas corretas | 10 |
| Todas erradas | 0 |
| Cinco primeiras corretas | 5 |
| Só o último item correto | 1 |
| Item em branco | recusado |
| Alternativa inexistente | recusada |

## Limitações e pontos em aberto

- **Itens de elaboração própria, sem validação psicométrica.** Entra como limitação na seção 3.4 do artigo, como na versão anterior.
- **Os itens comparativos revelam a ordem entre as estruturas.** O q3, por exemplo, informa que o Coliseu é mais alto que o Cristo Redentor. Não revelam magnitude, que é o que a tarefa de estimativa mede, mas o efeito deve ser considerado na interpretação. Vale a equipe decidir se a estimativa é aplicada antes do questionário em cada momento, o que elimina esse risco.
- **Divergência com o aplicativo.** O q9 considera correto que a figura humana dobre junto com a maquete, como exige o RNF03 do artigo. Hoje o app mantém a figura fixa em 1,70 m reais (decisão registrada na #40). Enquanto isso não for resolvido, a condição de RA mostra o contrário do que o instrumento considera correto.
