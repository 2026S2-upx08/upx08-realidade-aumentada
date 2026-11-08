DOCUMENTAÇÃO TÉCNICA
Vencimento: Sáb 31 de Out de 2026 23:59
0 Points Possible
Tentativa 1
Em progresso
PRÓXIMO: Enviar tarefa

Unlimited Attempts Allowed
Disponível: 1 de Out de 2026 19:00 até 31 de Out de 2026 23:59
ATIVIDADE — DOCUMENTAÇÃO TÉCNICA DO PROJETO NO GITHUB

Objetivo

Esta atividade tem como objetivo organizar e documentar tecnicamente o projeto desenvolvido pela equipe ao longo da disciplina de UPX — Realidade Aumentada. Cada equipe deverá utilizar o repositório do projeto no **GitHub** como ambiente oficial de armazenamento do código-fonte e da documentação técnica. Além de manter o código-fonte atualizado, a equipe deverá revisar e completar o arquivo `README.md`, utilizando como referência o modelo de documentação fornecido pelo professor.

Para execução desta atividade o grupo deverá utilizar o modelo disponível no repositório remoto com o acesso a seguir: https://github.com/dr-ohata/upx-modelo

O objetivo principal não é apenas apresentar o projeto, mas permitir que outra pessoa, sem conhecimento prévio sobre a solução, consiga compreender:

- qual problema está sendo resolvido;
- qual solução foi desenvolvida;
- como a Realidade Aumentada está sendo utilizada;
- quais tecnologias foram utilizadas;
- como o projeto está estruturado;
- como configurar o ambiente;
- como executar a aplicação;
- como utilizar a aplicação;
- quais funcionalidades já estão implementadas;
- quais testes foram realizados;
- quais limitações ainda existem.

---

1. Organização do Repositório

Cada equipe deverá utilizar o repositório do projeto disponibilizado ou definido para a disciplina.

O repositório deverá conter, no mínimo:

projeto/
│
├── código-fonte do projeto
│
├── docs/
│ ├── diagrams/
│ ├── images/
│ └── documents/
│
├── README.md
├── .gitignore
└── demais arquivos necessários para execução

```

A estrutura poderá variar de acordo com a tecnologia utilizada pela equipe, porém deverá permanecer organizada e compreensível. Os projetos Unity, React Native, Web, aplicações Android ou outras tecnologias podem possuir estruturas diferentes. O importante é que os arquivos necessários para compreender, desenvolver e executar o projeto estejam devidamente organizados.

---

2. Código-Fonte

A equipe deverá inserir no repositório a versão atual do código-fonte do projeto. O conteúdo deverá representar o estágio real de desenvolvimento da aplicação no momento da entrega. Não deverão ser enviados apenas arquivos demonstrativos ou imagens do projeto.

O repositório deverá conter os arquivos necessários para continuidade do desenvolvimento. A equipe deverá verificar se:

- o projeto está completo;
- os principais arquivos de código estão presentes;
- as dependências utilizadas estão documentadas;
- arquivos desnecessários não foram enviados;
- arquivos temporários foram ignorados utilizando `.gitignore`;
- não existem senhas, tokens, chaves privadas ou informações sensíveis no repositório.

---

3. Atualização do README.md

O arquivo `README.md` deverá ser atualizado utilizando o modelo fornecido pelo professor. Cada seção deverá ser preenchida com informações específicas do projeto da equipe. Não deverá permanecer no README nenhum texto genérico do modelo como:

- "Nome do projeto";
- "Nome do aluno";
- "XX.X";
- "URL";
- "Descrição";
- "Exemplo";
- ou outros textos utilizados apenas como orientação.

Todos esses campos deverão ser substituídos por informações reais do projeto.

---

4. Identificação do Projeto

A primeira parte do README deverá identificar corretamente o projeto. Informar:

- nome do projeto;
- nome da equipe;
- integrantes;
- RA de cada integrante;
- função ou responsabilidade de cada integrante;
- curso;
- disciplina;
- professor;
- semestre.

As responsabilidades deverão representar a participação técnica real de cada integrante.

Exemplos:

- desenvolvimento Unity;
- programação C#;
- modelagem 3D;
- desenvolvimento de interface;
- integração com AR Foundation;
- documentação;
- testes;
- pesquisa;
- design.

Evite utilizar descrições genéricas como "ajudou no projeto".

---

5. Visão Geral do Projeto

Apresente uma explicação resumida da solução desenvolvida. O texto deverá responder:

1. Qual problema está sendo tratado?
2. Quem possui esse problema?
3. Qual solução está sendo proposta?
4. Como a aplicação funciona?
5. Onde a Realidade Aumentada participa da solução?

O objetivo desta seção é permitir que uma pessoa compreenda rapidamente a proposta da equipe. Evite textos excessivamente longos. Procure produzir de dois a quatro parágrafos claros e objetivos.

---

6. Problema

Descreva o problema que levou ao desenvolvimento da solução. Apresente:

- contexto;
- situação atual;
- dificuldade encontrada;
- público afetado;
- impacto do problema.

Não descreva apenas o aplicativo.

Esta seção deve explicar **por que o projeto existe**.

---

7. Objetivos

Objetivo Geral

Apresente em uma frase o principal resultado esperado pelo projeto. Preferencialmente utilize um verbo de ação. Exemplos:

- desenvolver;
- criar;
- implementar;
- propor;
- validar;
- construir.

Objetivos Técnicos

Liste as principais metas relacionadas à implementação. Exemplos:

- implementar reconhecimento de imagens;
- desenvolver rastreamento de superfícies;
- posicionar modelos 3D no ambiente;
- permitir interação com objetos virtuais;
- desenvolver interface de navegação;
- executar a aplicação em dispositivo móvel;
- realizar testes em diferentes condições.

Os objetivos devem representar funcionalidades ou resultados que possam ser verificados.

---

8. Público-Alvo

Descreva quem deverá utilizar a aplicação. A equipe poderá informar:

- perfil dos usuários;
- contexto de utilização;
- necessidades;
- limitações;
- nível de familiaridade tecnológica.

Caso a equipe já tenha elaborado Persona ou Jornada do Usuário em atividades anteriores, esses materiais poderão ser adicionados à pasta:

/docs/documents/
```

O README deverá apresentar apenas uma síntese.

---

9. Funcionalidades

Liste as funcionalidades atuais do projeto.

Utilize uma tabela contendo:

- identificador;
- funcionalidade;
- descrição;
- status.

Exemplo:

| ID | Funcionalidade | Descrição | Status |
| RF01 | Iniciar RA | Inicia a experiência de Realidade Aumentada | ✅ |
| RF02 | Detectar imagem | Reconhece uma imagem cadastrada | ✅ |
| RF03 | Exibir objeto 3D | Carrega um objeto associado | 🚧 |
| RF04 | Interagir com objeto | Permite manipulação do objeto | ⬜ |

Utilize os seguintes estados:

- ✅ Implementado
- 🚧 Em desenvolvimento
- ⬜ Planejado
- ❌ Cancelado

Os status devem representar a situação real do projeto no momento da entrega.

---

10. Requisitos Não Funcionais

Documente requisitos relacionados à qualidade e às condições técnicas da solução.

Exemplos:

- desempenho;
- compatibilidade;
- usabilidade;
- segurança;
- hardware;
- software;
- conectividade;
- disponibilidade.

Não é necessário criar uma grande quantidade de requisitos. Inclua apenas aqueles que realmente fazem sentido para o projeto.

---

11. Tecnologias Utilizadas

Documente todas as principais tecnologias utilizadas.

Para cada item informe:

- tecnologia;
- versão;
- finalidade no projeto.

Exemplo:

| Tecnologia | Versão | Utilização |
| Unity | 6000.X | Desenvolvimento principal |
| C# | — | Programação |
| AR Foundation | X.X | Recursos de RA |
| ARCore | X.X | Execução em Android |
| Blender | X.X | Modelagem 3D |
| GitHub | — | Controle de versão |

É obrigatório indicar as versões quando essa informação for aplicável. Não escreva apenas "Unity", "React Native" ou "Android".

A versão utilizada é importante para que outra pessoa consiga reproduzir o ambiente.

---

12. Hardware Utilizado

Liste os principais equipamentos utilizados durante o desenvolvimento e os testes.

Exemplos:

- computador;
- smartphone;
- tablet;
- câmera;
- sensores;
- óculos de realidade aumentada;
- Arduino;
- Raspberry Pi;
- Kinect;
- outros equipamentos.

Quando possível informe:

- fabricante;
- modelo;
- sistema operacional;
- características relevantes;
- finalidade no projeto.

---

13. Arquitetura do Sistema

Apresente um diagrama simplificado mostrando como os principais componentes se relacionam. O diagrama deverá representar apenas elementos presentes no projeto.

Exemplo:
Usuário > Aplicação > Interface > Módulo RA > AR Foundation > ARCore / ARKit > Câmera e Sensores

Projetos que utilizam servidor, API, banco de dados ou hardware externo deverão representar esses componentes.

O arquivo gráfico poderá ser armazenado em:
/docs/diagrams/
e inserido no README.

---

14. Funcionamento da Realidade Aumentada

Esta seção é obrigatória e deverá ser tratada com atenção especial. A equipe deverá explicar **como a RA funciona tecnicamente dentro do projeto**. Primeiramente identifique o tipo de abordagem utilizada.

Exemplos:

- Image Tracking;
- marcador;
- QR Code;
- Plane Detection;
- Markerless;
- Object Tracking;
- Face Tracking;
- Location Based AR;
- reconhecimento de objeto.

Depois descreva o fluxo.

Exemplo:

Usuário abre a aplicação > Câmera é iniciada > Sistema captura o ambiente > ARCore identifica uma superfície > Aplicação calcula uma posição > Modelo 3D é instanciado > Usuário interage com o objeto
Não basta escrever:

> "O projeto utiliza Realidade Aumentada."

É necessário explicar **qual tecnologia realiza o processo e como ela está integrada ao projeto**.

---

15. Estrutura do Projeto

Apresente as principais pastas e arquivos do repositório.

Exemplo:

Assets/
├── Materials/
├── Models/
├── Prefabs/
├── Scenes/
├── Scripts/
└── Textures/

Depois explique brevemente a função de cada pasta importante. Não é necessário explicar automaticamente todas as pastas geradas pela ferramenta. O foco deverá estar nos arquivos produzidos ou utilizados pela equipe.

---

16. Principais Scripts ou Componentes

Identifique os principais códigos desenvolvidos.

Exemplo:

| Script | Responsabilidade |
| `ImageTracking.cs` | Controla reconhecimento de imagens |
| `ObjectManager.cs` | Instancia modelos 3D |
| `InteractionController.cs` | Controla interações |
| `SceneController.cs` | Gerencia as cenas |

Não copie o código completo para o README.

A documentação deve explicar **qual a responsabilidade do código**.

Caso o projeto não utilize scripts nesse formato, documente os principais:

- componentes;
- módulos;
- classes;
- páginas;
- serviços;
- APIs;
- controllers.

---

17. Dependências

Informe pacotes, bibliotecas, plugins ou módulos utilizados no projeto.

Exemplo:

AR Foundation 6.X
ARCore XR Plugin 6.X
XR Plugin Management 4.X
TextMeshPro 3.X
Caso uma biblioteca externa seja essencial para funcionamento, informe também onde ela pode ser obtida.

---

18. Configuração do Ambiente

Crie um procedimento para preparar o ambiente de desenvolvimento. Imagine que outro aluno realizará o download do repositório em um computador novo.

Quais programas ele precisaria instalar?

Quais versões?

Quais configurações?

Exemplo:

1. Instalar Unity Hub.
2. Instalar Unity 6000.X.
3. Adicionar Android Build Support.
4. Instalar Git.
5. Clonar o repositório.
6. Abrir o projeto pelo Unity Hub.
   O procedimento deverá ser testável.

---

19. Como Executar o Projeto

Explique exatamente como iniciar o projeto.

Exemplo:

```bash
git clone URL_DO_REPOSITORIO
```

Depois apresente o procedimento adequado para a tecnologia utilizada.

No caso de Unity, por exemplo:

1. abrir o Unity Hub;
2. selecionar o projeto;
3. verificar a versão;
4. abrir a cena principal;
5. selecionar a plataforma;
6. executar ou gerar o Build.

Não utilize instruções vagas como:

> "Abra e execute o projeto."

20. Como Utilizar a Aplicação

Esta seção deverá explicar o funcionamento do ponto de vista do usuário.

Exemplo:

1. iniciar a aplicação;
2. autorizar a câmera;
3. selecionar "Iniciar RA";
4. apontar para o marcador;
5. aguardar reconhecimento;
6. interagir com o objeto.

Sempre que possível, adicione screenshots.

21. Diagramas

O projeto deverá apresentar pelo menos os diagramas considerados relevantes.

Podem ser utilizados:

- arquitetura;
- fluxo de funcionamento;
- fluxo de navegação;
- caso de uso;
- diagrama de componentes;
- diagrama de sequência.

Os diagramas devem representar o **projeto atual**, e não uma versão antiga ou apenas planejada.

22. Interface da Aplicação

Inclua imagens atuais das principais telas.

Para cada imagem informe brevemente:

- nome da tela;
- finalidade;
- principais elementos;
- ação realizada pelo usuário.

As imagens poderão ficar em:

/docs/images/
Evite inserir screenshots excessivamente grandes.

---

23. Testes Técnicos

Registre os principais testes realizados.

Exemplo:

| Teste | Procedimento | Resultado esperado | Resultado obtido | Status |
| Câmera | Iniciar RA | Câmera abre | Funcionou | ✅ |
| Tracking | Apontar marcador | Detectar imagem | Detectado | ✅ |
| Objeto 3D | Detectar alvo | Exibir objeto | Exibido | ✅ |

O objetivo é demonstrar que a equipe está verificando tecnicamente o desenvolvimento.

24. Dispositivos Testados

Para aplicações de RA, registre quais dispositivos foram utilizados.

Exemplo:

| Dispositivo | Sistema | Versão | Resultado |
| Samsung XXXX | Android | XX | Compatível |
| Motorola XXXX | Android | XX | Compatível |

Não informe compatibilidade com dispositivos que não tenham sido testados.

25. Limitações Conhecidas

Toda solução possui limitações.

Documentá-las faz parte de uma boa prática de Engenharia de Software.

Exemplos:

- baixa precisão em ambientes escuros;
- dependência de marcador;
- incompatibilidade com determinado dispositivo;
- necessidade de internet;
- necessidade de uma superfície plana;
- problemas de desempenho;
- funcionalidade ainda não implementada.

A equipe **não será penalizada simplesmente por informar limitações**.

Esconder problemas conhecidos, entretanto, prejudica a qualidade da documentação.

26. Evidências de Funcionamento

Inclua evidências atuais do funcionamento do projeto.

Podem ser utilizados:

- screenshots;
- GIFs;
- vídeos;
- demonstrações;
- gravações de tela;
- fotos dos testes.

A equipe deverá disponibilizar pelo menos uma evidência visual da solução funcionando.

Caso exista vídeo publicado, inclua o link no README.

27. Problemas Encontrados e Soluções

Documente dificuldades técnicas relevantes encontradas durante o desenvolvimento.

Para cada caso apresente:

**Problema:**  
o que aconteceu.

**Causa:**  
qual foi a causa identificada.

**Solução:**  
como foi resolvido.

Exemplo:

**Problema:** objeto 3D não aparecia após reconhecimento.

**Causa:** prefab não estava relacionado corretamente ao objeto de referência.

**Solução:** configuração da biblioteca de imagens e associação correta do prefab.

Esta seção é importante porque registra o conhecimento adquirido durante o desenvolvimento.

28. Cronograma Técnico

Atualize as principais etapas do desenvolvimento.

Exemplo:

| Atividade | Responsável | Status |
| Configuração Unity | Nome | ✅ |
| Pesquisa de RA | Nome | ✅ |
| Implementação do tracking | Nome | ✅ |
| Modelagem 3D | Nome | 🚧 |
| Testes | Equipe | 🚧 |
| Documentação | Equipe | 🚧 |

O cronograma deverá refletir o estágio atual do projeto.

29. Controle de Versão

A equipe deverá utilizar corretamente os recursos do GitHub.

Espera-se o uso de:

- commits;
- histórico de alterações;
- branches, quando necessário;
- tags ou releases nas versões relevantes.

Evite realizar apenas um único commit contendo todo o projeto.

As mensagens dos commits deverão explicar o que foi alterado.

Exemplos adequados:

feat: implementa reconhecimento de imagens
fix: corrige posicionamento do objeto 3D
docs: atualiza procedimentos de instalação
test: adiciona validação em dispositivo Android

30. Regras para o README

O arquivo deverá ser escrito em **Markdown**.

Utilize corretamente:

```markdown
# Título

## Subtítulo

### Seção
```

Para listas:

```markdown
- Item 1
- Item 2
```

Para código:

````markdown
```bash
git clone ...
```
````

Para imagens:

```markdown
![Descrição da imagem](docs/images/imagem.png)
```

Para links:

```markdown
[Nome do recurso](URL)
```

Evite escrever o documento inteiro utilizando apenas parágrafos.

Utilize títulos, tabelas, imagens, diagramas, listas e blocos de código para melhorar a leitura.

---

31. Qualidade Esperada

O README deverá possuir informações suficientes para que outra pessoa consiga:

1. compreender a proposta;
2. identificar as tecnologias;
3. entender a arquitetura;
4. localizar o código principal;
5. configurar o ambiente;
6. executar o projeto;
7. compreender a implementação da RA;
8. reproduzir o procedimento de uso;
9. conhecer os testes realizados;
10. conhecer as limitações atuais.

A pergunta que a equipe deverá fazer antes da entrega é:

> **Se outra equipe recebesse apenas nosso repositório, conseguiria compreender e executar nosso projeto?**

Caso a resposta seja "não", a documentação ainda está incompleta.

---

32. O que deverá ser entregue

A entrega será composta pelo **link do repositório no GitHub**.

O repositório deverá possuir:

- código-fonte atualizado;
- `README.md` preenchido;
- estrutura de arquivos organizada;
- tecnologias e versões documentadas;
- arquitetura;
- funcionamento da RA;
- instruções de configuração;
- instruções de execução;
- testes;
- imagens;
- evidências de funcionamento;
- limitações conhecidas;
- histórico de desenvolvimento por commits.

---

33. Checklist antes da entrega

Antes de enviar, verifique:

- [ ] O código-fonte está atualizado.
- [ ] O projeto abre corretamente.
- [ ] O README foi completamente preenchido.
- [ ] Não existem campos do modelo sem substituir.
- [ ] A versão das tecnologias foi informada.
- [ ] A arquitetura foi apresentada.
- [ ] A utilização da RA foi explicada tecnicamente.
- [ ] Os principais scripts foram documentados.
- [ ] Existe procedimento de instalação.
- [ ] Existe procedimento de execução.
- [ ] Existe procedimento de utilização.
- [ ] Existem imagens do projeto.
- [ ] Existem evidências de funcionamento.
- [ ] Os testes estão documentados.
- [ ] Os dispositivos utilizados estão identificados.
- [ ] As limitações estão documentadas.
- [ ] O histórico de commits representa a evolução do projeto.
- [ ] O link do repositório está acessível ao professor.

---

Resultado Esperado

Ao final da atividade, cada equipe deverá possuir um **repositório técnico organizado e documentado**, reunindo código-fonte, documentação, diagramas, evidências e instruções suficientes para permitir a compreensão, reprodução e continuidade do projeto.

O `README.md` deverá representar o estado atual da aplicação e deverá continuar sendo atualizado conforme o projeto evoluir ao longo da disciplina.
