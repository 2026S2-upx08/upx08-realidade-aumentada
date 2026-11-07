"""Análise dos dados da coleta, conforme a seção 3.5 do artigo.

Uso: python3 docs/results/analise.py [docs/results/Coleta.csv]

Lê o CSV exportado pelo app ("Exportar CSV") e recalcula erros, notas e SUS a
partir das respostas brutas, sem depender do cálculo feito em tela (seção 3.4).
Só usa a biblioteca padrão do Python. Os testes são exatos: o valor de p vem
da enumeração de todas as divisões possíveis dos dados (Mann-Whitney) ou de
todas as combinações de sinais (Wilcoxon), o que vale também com empates.
"""
import csv
import statistics as st
import sys
from collections import defaultdict
from itertools import combinations, product

REFERENCIA = {'m1': 45, 'm2': 187, 'm3': 46, 'm4': 38}
MEDIDA = {'m1': 'Coliseu, altura', 'm2': 'Coliseu, comprimento', 'm3': 'Estátua da Liberdade, altura',
          'm4': 'Cristo Redentor, altura'}
MEDIDAS_DA_ESTRUTURA = {'coliseu': ['m1', 'm2'], 'estatua': ['m3'], 'cristo': ['m4']}
NOME_ESTRUTURA = {'coliseu': 'Coliseu', 'estatua': 'Estátua da Liberdade', 'cristo': 'Cristo Redentor'}
GABARITO = {'q1': 2, 'q2': 0, 'q3': 3, 'q4': 1, 'q5': 2, 'q6': 1, 'q7': 3, 'q8': 0, 'q9': 2, 'q10': 3}
GRUPOS = [('experimental', 'RA'), ('controle', '2D')]
ALFA = 0.05


def num(x, casas=2):
    return '—' if x is None else f'{x:.{casas}f}'.replace('.', ',')


def resumo(valores, casas=2):
    """Mediana [Q1; Q3], quartis pelo método inclusivo (o mesmo do QUARTIL do Excel)."""
    if not valores:
        return '—'
    if len(valores) == 1:
        return num(valores[0], casas)
    q1, _, q3 = st.quantiles(valores, n=4, method='inclusive')
    return f'{num(st.median(valores), casas)} [{num(q1, casas)}; {num(q3, casas)}]'


def postos(valores):
    """Postos médios (empates recebem a média dos postos)."""
    ordem = sorted(range(len(valores)), key=lambda i: valores[i])
    r = [0.0] * len(valores)
    i = 0
    while i < len(ordem):
        j = i
        while j + 1 < len(ordem) and valores[ordem[j + 1]] == valores[ordem[i]]:
            j += 1
        for k in range(i, j + 1):
            r[ordem[k]] = (i + j) / 2 + 1
        i = j + 1
    return r


def mann_whitney(a, b):
    """U de a, p bilateral exato e bisserial de postos (positiva = a tende a ser maior)."""
    na, nb = len(a), len(b)
    juntos = a + b
    r = postos(juntos)
    centro = na * nb / 2

    def u_de(indices):
        return sum(r[i] for i in indices) - na * (na + 1) / 2

    u_obs = u_de(range(na))
    dist = [u_de(c) for c in combinations(range(na + nb), na)]
    p = sum(1 for u in dist if abs(u - centro) >= abs(u_obs - centro) - 1e-9) / len(dist)
    return u_obs, p, 2 * u_obs / (na * nb) - 1


def wilcoxon(diferencas):
    """W+, p bilateral exato e bisserial pareada; diferenças zero são descartadas."""
    d = [x for x in diferencas if x != 0]
    if not d:
        return None, None, None
    r = postos([abs(x) for x in d])
    total = sum(r)
    w_mais = sum(ri for ri, x in zip(r, d) if x > 0)
    centro = total / 2
    dist = [sum(ri for ri, s in zip(r, sinais) if s) for sinais in product([0, 1], repeat=len(d))]
    p = sum(1 for w in dist if abs(w - centro) >= abs(w_mais - centro) - 1e-9) / len(dist)
    return w_mais, p, (2 * w_mais - total) / total


def magnitude(r):
    a = abs(r)
    return 'grande' if a >= 0.5 else 'média' if a >= 0.3 else 'pequena' if a >= 0.1 else 'desprezível'


def tabela(cabecalho, linhas):
    print('| ' + ' | '.join(cabecalho) + ' |')
    print('|' + '---|' * len(cabecalho))
    for linha in linhas:
        print('| ' + ' | '.join(str(c) for c in linha) + ' |')
    print()


# ---------------------------------------------------------------- leitura
caminho = sys.argv[1] if len(sys.argv) > 1 else 'docs/results/Coleta.csv'
registros = list(csv.DictReader(open(caminho, encoding='utf-8')))
por_pessoa = defaultdict(list)
for reg in registros:
    por_pessoa[reg['participanteId']].append(reg)

avisos = []
participantes = {}
for pid, regs in sorted(por_pessoa.items()):
    grupo = regs[0]['grupo']
    achar = lambda inst, mom=None: [x for x in regs if x['instrumento'] == inst and (mom is None or x['momento'] == mom)]
    est_pre, est_pos = achar('ESTIMATIVA', 'pre'), achar('ESTIMATIVA', 'pos')
    comp_pre, comp_pos = achar('COMPREENSAO', 'pre'), achar('COMPREENSAO', 'pos')
    expos = sorted(achar('EXPOSICAO'), key=lambda x: int(x['posicao']))
    sus = achar('SUS')
    faltando = [nome for nome, lista in [('estimativa pré', est_pre), ('estimativa pós', est_pos),
                                         ('compreensão pré', comp_pre), ('compreensão pós', comp_pos)] if len(lista) != 1]
    if len(expos) != 3:
        faltando.append(f'{len(expos)} de 3 exposições')
    if grupo == 'experimental' and len(sus) != 1:
        faltando.append('SUS')
    if faltando:
        avisos.append(f'{pid} fora da análise (sessão incompleta: {", ".join(faltando)})')
        continue

    def erros(reg):
        return {m: abs(float(reg[f'respostas.{m}']) - ref) / ref * 100 for m, ref in REFERENCIA.items()}

    def respostas(reg):
        return {m: float(reg[f'respostas.{m}']) for m in REFERENCIA}

    def nota(reg):
        n = sum(int(reg[f'respostas.{q}']) == c for q, c in GABARITO.items())
        if reg.get('nota') not in (None, '') and int(float(reg['nota'])) != n:
            avisos.append(f'{pid} {reg["momento"]}: nota do app {reg["nota"]}, recalculada {n}')
        return n

    def pontuacao_sus(reg):
        soma = sum((int(reg[f'respostas.q{i}']) - 1) if i % 2 else (5 - int(reg[f'respostas.q{i}'])) for i in range(1, 11))
        return soma * 2.5

    participantes[pid] = {
        'grupo': grupo,
        'resp_pre': respostas(est_pre[0]), 'resp_pos': respostas(est_pos[0]),
        'erro_pre': erros(est_pre[0]), 'erro_pos': erros(est_pos[0]),
        'nota_pre': nota(comp_pre[0]), 'nota_pos': nota(comp_pos[0]),
        'ordem': [x['estrutura'] for x in expos],
        'exposicao_s': [float(x['exposicaoMs']) / 1000 for x in expos if x.get('exposicaoMs')],
        'ancoragem_s': [float(x['ancoragemMs']) / 1000 for x in expos if x.get('ancoragemMs')],
        'substitui': next((x['substitui'] for x in regs if x.get('substitui')), None),
        'tempo': {'estimativa pré': float(est_pre[0]['duracaoSegundos']), 'estimativa pós': float(est_pos[0]['duracaoSegundos']),
                  'compreensão pré': float(comp_pre[0]['duracaoSegundos']), 'compreensão pós': float(comp_pos[0]['duracaoSegundos'])},
        'sus': pontuacao_sus(sus[0]) if sus else None,
        'tempo_sus': float(sus[0]['duracaoSegundos']) if sus else None,
    }

for p in participantes.values():
    p['media_pre'] = st.mean(p['erro_pre'].values())
    p['media_pos'] = st.mean(p['erro_pos'].values())
    p['delta'] = p['media_pre'] - p['media_pos']          # positivo = o erro diminuiu
    p['ganho_nota'] = p['nota_pos'] - p['nota_pre']       # positivo = a nota subiu

do_grupo = lambda g: [p for p in participantes.values() if p['grupo'] == g]
exp, ctr = do_grupo('experimental'), do_grupo('controle')

# ---------------------------------------------------------------- 1. caracterização
print(f'# Análise da coleta ({caminho})\n')
print('## 1. Participantes e ordem de apresentação\n')
datas = sorted(r['inicioEm'][:10] for r in registros if r.get('inicioEm'))
print(f'Sessões analisadas: {len(participantes)} ({len(exp)} RA, {len(ctr)} 2D). '
      f'Período: {datas[0]} a {datas[-1]}. Substitutos: '
      + (', '.join(k + ' (no lugar de ' + v['substitui'] + ')' for k, v in participantes.items() if v['substitui']) or 'nenhum')
      + '.\n')
for aviso in avisos:
    print(f'> AVISO: {aviso}')
if avisos:
    print()
linhas = []
for g, rot in GRUPOS:
    contagem = defaultdict(list)
    for pid, p in participantes.items():
        if p['grupo'] == g:
            contagem[' → '.join(NOME_ESTRUTURA[e] for e in p['ordem'])].append(pid)
    for ordem, pids in sorted(contagem.items()):
        linhas.append([rot, ordem, len(pids), ', '.join(pids)])
tabela(['Grupo', 'Ordem', 'Vezes', 'Participantes'], linhas)

# ---------------------------------------------------------------- 2. análise principal
print('## 2. Análise principal (H1): variação do erro médio, pré − pós\n')
print('Erro percentual absoluto médio das 4 estimativas, por grupo: mediana [Q1; Q3].\n')
tabela(['Grupo', 'n', 'Erro pré (%)', 'Erro pós (%)', 'Variação pré − pós (p.p.)'],
       [[rot, len(do_grupo(g)), resumo([p['media_pre'] for p in do_grupo(g)]),
         resumo([p['media_pos'] for p in do_grupo(g)]), resumo([p['delta'] for p in do_grupo(g)])] for g, rot in GRUPOS])

u, p_mw, r_mw = mann_whitney([p['delta'] for p in exp], [p['delta'] for p in ctr])
dif = st.median([p['delta'] for p in exp]) - st.median([p['delta'] for p in ctr])
print(f'Mann-Whitney bilateral exato: U = {num(u, 1)}, p = {num(p_mw, 3)}; diferença entre as medianas '
      f'(RA − 2D) = {num(dif)} p.p.; bisserial de postos = {num(r_mw)} ({magnitude(r_mw)}, positiva favorece a RA).\n')
if p_mw < ALFA and dif > 0:
    veredito = 'H1 SUSTENTADA: diferença significativa, com redução do erro maior no grupo RA.'
elif p_mw >= ALFA and r_mw >= 0.3:
    veredito = 'INCONCLUSIVO: efeito médio ou grande a favor da RA, sem significância (seção 3.5).'
else:
    veredito = 'H1 NÃO SUSTENTADA.'
print(f'**Resultado: {veredito}**\n')

print('Valores por participante:\n')
tabela(['Código', 'Grupo', 'Erro pré (%)', 'Erro pós (%)', 'Variação (p.p.)', 'Nota pré', 'Nota pós'],
       [[pid, 'RA' if p['grupo'] == 'experimental' else '2D', num(p['media_pre']), num(p['media_pos']),
         num(p['delta']), p['nota_pre'], p['nota_pos']] for pid, p in sorted(participantes.items())])

# ---------------------------------------------------------------- 3. exploratórias
print('## 3. Análises exploratórias (não sustentam nem rejeitam H1)\n')
linhas = []
for g, rot in GRUPOS:
    w, p_w, r_w = wilcoxon([p['delta'] for p in do_grupo(g)])
    linhas.append([f'Wilcoxon, erro pré × pós, {rot}', f'W+ = {num(w, 1)}', num(p_w, 3), f'{num(r_w)} ({magnitude(r_w)})'])
u2, p2, r2 = mann_whitney([p['ganho_nota'] for p in exp], [p['ganho_nota'] for p in ctr])
linhas.append(['Mann-Whitney, ganho na nota, RA × 2D', f'U = {num(u2, 1)}', num(p2, 3), f'{num(r2)} ({magnitude(r2)})'])
tabela(['Teste', 'Estatística', 'p exato', 'Bisserial de postos'], linhas)
tabela(['Grupo', 'Nota pré', 'Nota pós', 'Ganho (pós − pré)'],
       [[rot, resumo([p['nota_pre'] for p in do_grupo(g)], 1), resumo([p['nota_pos'] for p in do_grupo(g)], 1),
         resumo([p['ganho_nota'] for p in do_grupo(g)], 1)] for g, rot in GRUPOS])

# ---------------------------------------------------------------- 4. descritivas
print('## 4. Descritivas por medida e por posição (sem testes)\n')
print('Erro percentual absoluto por medida: mediana [Q1; Q3].\n')
linhas = []
for m in REFERENCIA:
    linha = [f'{MEDIDA[m]} ({REFERENCIA[m]} m)']
    for g, _ in GRUPOS:
        linha += [resumo([p['erro_pre'][m] for p in do_grupo(g)]), resumo([p['erro_pos'][m] for p in do_grupo(g)])]
    linhas.append(linha)
tabela(['Medida', 'RA pré', 'RA pós', '2D pré', '2D pós'], linhas)

print('Variação do erro (pré − pós, p.p.) de cada estrutura conforme a posição em que foi vista: mediana (n).\n')
linhas = []
for g, rot in GRUPOS:
    linha = [rot]
    for pos in range(3):
        vals = []
        for p in do_grupo(g):
            ms = MEDIDAS_DA_ESTRUTURA[p['ordem'][pos]]
            vals.append(st.mean(p['erro_pre'][m] - p['erro_pos'][m] for m in ms))
        linha.append(f'{num(st.median(vals))} ({len(vals)})')
    linhas.append(linha)
tabela(['Grupo', '1ª estrutura', '2ª estrutura', '3ª estrutura'], linhas)

print('Tempos (s): mediana [Q1; Q3].\n')
linhas = []
for nome in ['estimativa pré', 'compreensão pré', 'estimativa pós', 'compreensão pós']:
    linhas.append([nome] + [resumo([p['tempo'][nome] for p in do_grupo(g)], 0) for g, _ in GRUPOS])
linhas.append(['exposição por estrutura'] + [resumo([t for p in do_grupo(g) for t in p['exposicao_s']], 1) for g, _ in GRUPOS])
linhas.append(['ancoragem antes da exposição (RA)', resumo([t for p in exp for t in p['ancoragem_s']], 1), '—'])
linhas.append(['SUS', resumo([p['tempo_sus'] for p in exp], 0), '—'])
tabela(['Etapa', 'RA', '2D'], linhas)

# ---------------------------------------------------------------- 5. SUS
print('## 5. Usabilidade (SUS, só RA)\n')
sus = {pid: p['sus'] for pid, p in participantes.items() if p['sus'] is not None}
if sus:
    acima = sum(v >= 68 for v in sus.values())
    print(f'Pontuação: mediana [Q1; Q3] = {resumo(list(sus.values()), 1)}; média = {num(st.mean(sus.values()), 1)}; '
          f'mínimo {num(min(sus.values()), 1)}, máximo {num(max(sus.values()), 1)}. '
          f'{acima} de {len(sus)} participantes com 68 ou mais (referência do RNF06).\n')
    tabela(['Código', 'SUS'], [[pid, num(v, 1)] for pid, v in sorted(sus.items())])

# ---------------------------------------------------------------- 6. sensibilidade
print('## 6. Análise de sensibilidade (seção 3.4)\n')
sinalizadas = [(pid, mom, m, p[f'resp_{mom}'][m]) for pid, p in participantes.items() for mom in ('pre', 'pos')
               for m in REFERENCIA if not REFERENCIA[m] / 10 <= p[f'resp_{mom}'][m] <= REFERENCIA[m] * 10]
if not sinalizadas:
    print('Nenhuma resposta se afastou do valor de referência por mais de uma ordem de grandeza; '
          'a análise principal não muda.\n')
else:
    tabela(['Código', 'Momento', 'Medida', 'Resposta (m)'], [[a, b, MEDIDA[c], num(d, 1)] for a, b, c, d in sinalizadas])
    fora = {(a, b, c) for a, b, c, _ in sinalizadas}

    def delta_sem(pid, p):
        pre = [v for m, v in p['erro_pre'].items() if (pid, 'pre', m) not in fora]
        pos = [v for m, v in p['erro_pos'].items() if (pid, 'pos', m) not in fora]
        return st.mean(pre) - st.mean(pos)

    de = [delta_sem(k, p) for k, p in participantes.items() if p['grupo'] == 'experimental']
    dc = [delta_sem(k, p) for k, p in participantes.items() if p['grupo'] == 'controle']
    u3, p3, r3 = mann_whitney(de, dc)
    print(f'Sem as respostas sinalizadas: U = {num(u3, 1)}, p = {num(p3, 3)}, bisserial = {num(r3)}.\n')
