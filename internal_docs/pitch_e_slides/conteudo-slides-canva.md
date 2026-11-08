# Conteúdo para o deck do Canva (card #82)

Rascunho pronto pra colar no template oficial (`template_mostra_de_projetos_ unifacens_2026.pptx`/`.pdf`), seção por seção, igual à estrutura do template. Dados reais tirados do artigo final (seções 5.1-5.4, 6 e 8). Ajustar texto/visual livremente, o conteúdo factual é esse.

## 1. Título / Identificação do projeto

- Código: UPX08 — Realidade Aumentada
- Equipe: Conect Way
- Grupo: Bruno da Silveira Escanhoela (RA 236793), Gabriel Ferreira do Nascimento (RA 236085), João Guilherme Volta Kinol (RA 235255)
- Título: Realidade aumentada para a representação da escala de monumentos histórico-culturais

## 2. Contextualização e problema

- Problema: estudantes têm dificuldade em compreender a escala real de monumentos históricos (Coliseu, Estátua da Liberdade, Cristo Redentor) a partir de material didático bidimensional.
- Público-alvo final: estudantes do Ensino Fundamental (a avaliação atual foi feita com usuários proxy adultos, sem aprovação ética ainda pra testar com o público real).
- Proposta de valor: ancorar modelos 3D em escala reduzida no ambiente real do usuário via RA, e comparar esse efeito com uma representação bidimensional equivalente.

## 3. Objetivos

- Desenvolver e avaliar uma prova de conceito de RA móvel que representa a escala dos três monumentos.
- RQ1 / H1: a visualização em RA reduz mais o erro de estimativa de dimensões do que uma representação bidimensional equivalente.
- Funcionalidades propostas: ancoragem e escala do modelo (1 a 4 m), figura humana de referência (1,70 m fixo), modo bidimensional espelhando as mesmas geometrias 3D, instrumentos de estimativa/compreensão/SUS.

## 4. Metodologia

- Stack: React 19 + Vite + TypeScript, react-three-fiber + @react-three/xr (WebXR), sem backend (dados em localStorage/sessionStorage).
- Delineamento: pré-teste e pós-teste, 12 usuários proxy (adultos), 6 no grupo RA e 6 no grupo bidimensional (controle), ordem das 3 estruturas contrabalanceada.
- Instrumentos: tarefa de estimativa de dimensões, questionário de compreensão de escala/proporção, System Usability Scale (só grupo RA).
- Coleta: 3 a 5 de novembro de 2026, mesmo aparelho (Samsung Galaxy S25).

## 5. Desenvolvimento

- Ancoragem via hit-test WebXR; modelo ajustável de 1 a 4 m, calculado pelo maior eixo real da estrutura.
- Modo bidimensional: imagens estáticas renderizadas a partir dos mesmos GLBs da RA, pra manter a mesma geometria entre as duas condições.
- **Aqui entram prints/trecho de vídeo da demonstração do protótipo** (depende da Fase 2 do roadmap — card #78 — print do app ancorando um dos modelos).
- Exportação dos dados de cada sessão em JSON/CSV.

## 6. Resultados

- 12 sessões concluídas nas duas condições, sem falha bloqueante; tempo de exposição equivalente entre grupos (mediana 60,1 s por estrutura).
- Erro de estimativa de dimensões: caiu de 43,2% para 18,5% no grupo RA; ficou praticamente estável no grupo bidimensional (39,2% → 36,0%).
- Redução significativamente maior no grupo RA (Mann-Whitney, p = 0,026; efeito grande, correlação bisserial de postos = 0,78) → **H1 sustentada**.
- Usabilidade (SUS): média 75,8, acima da referência de 68 adotada.
- Questionário de compreensão de escala/proporção não acompanhou esse resultado (ganho mediano maior no grupo bidimensional, sem diferença significativa entre grupos).

## 7. Conclusões

- A RA reduziu mais o erro de estimativa de dimensões do que a representação bidimensional equivalente — evidência preliminar, obtida com adultos, em sessão única, em um único aparelho.
- Limitação de projeto identificada: a figura humana de referência funciona bem pra estruturas verticais e mal pra estruturas extensas no plano horizontal (caso do Coliseu).
- Próximos passos: aprimorar a referência de escala pra estruturas horizontais, validar o questionário de compreensão, repetir a avaliação com estudantes do Ensino Fundamental (exige submissão ao CEP/Conep).

## 8. Referências e contatos

- Principais referências: Chiu et al. (2024); Hain e Motaref (2023); Giambastiani et al. (2024); Cheek, LaDue e Shipley (2017); Garcia (2020); López-García, Maquilón-Sánchez e Miralles-Sánchez (2024). Lista completa no artigo (`internal_docs/UPx08 - MODELO DE ARTIGO CIENTÍFICO.docx`).
- Contatos: nome + e-mail de cada integrante da equipe (preencher).

## 9. QR Code

- Aplicação em produção: https://upx08-realidade-aumentada.vercel.app/
- Opcional: link do repositório ou do vídeo pitch no YouTube (depende da Fase 3b do roadmap — card #80).
