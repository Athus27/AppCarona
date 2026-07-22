# Caronas ICEA

> Para preparar os dados, testar todos os fluxos e apresentar o trabalho, consulte o
> [Roteiro de testes e apresentação](./ROTEIRO_TESTES_APRESENTACAO.md).

Aplicativo móvel de caronas voltado à comunidade do ICEA/UFOP. O sistema aproxima
motoristas e passageiros que possuem rotas e horários compatíveis, oferecendo uma
alternativa de transporte mais econômica, sustentável e segura.

O projeto foi desenvolvido em **React Native com Expo**, usa **Firebase
Authentication** para acesso e **Cloud Firestore** para persistência e sincronização
dos dados. O Android é a plataforma principal do trabalho.

## Identificação do trabalho

> **Importante:** preencha os dados abaixo antes de enviar o código no Moodle.

- Aluno(a) 1: **[nome completo e matrícula]**
- Aluno(a) 2: **[nome completo e matrícula, se houver]**
- Disciplina: **[nome da disciplina]**
- Professor(a): **[nome do professor ou professora]**

Os nomes dos integrantes também podem ser adicionados à tela **Sobre**, no componente
`AboutScreen` do arquivo `src/screens/MainScreens.js`.

## Objetivo

O Caronas ICEA permite que membros da comunidade acadêmica:

- criem uma conta usando um e-mail institucional da UFOP;
- utilizem o aplicativo como passageiro, motorista ou nos dois perfis;
- publiquem e pesquisem caronas;
- solicitem e confirmem vagas;
- acompanhem suas viagens e solicitações;
- avaliem outros usuários após uma viagem;
- registrem denúncias para análise administrativa.

O cadastro comum não permite escolher o perfil de administrador. Essa permissão é
atribuída manualmente no Console do Firebase para impedir que um usuário comum
transforme a própria conta em administradora.

## Funcionalidades implementadas

### Acesso e cadastro

- Tela de apresentação do aplicativo.
- Login com e-mail e senha.
- Cadastro com nome, e-mail, senha e tipo de perfil.
- Validação dos domínios `@ufop.edu.br` e `@aluno.ufop.edu.br`.
- Validação de campos obrigatórios, tamanho da senha e confirmação da senha.
- Bloqueio de acesso para usuários marcados como bloqueados pelo administrador.

### Passageiro

- Busca por origem e destino.
- Consulta das caronas disponíveis.
- Visualização da rota, motorista, avaliação, veículo, preço, regras e vagas.
- Solicitação de uma vaga.
- Acompanhamento do estado da reserva.
- Avaliação por estrelas em uma viagem concluída.
- Envio de denúncia sobre um motorista.

### Motorista

- Publicação de carona com origem, destino, data, horário, quantidade de vagas,
  preço, veículo e regras.
- Visualização das caronas publicadas.
- Aceite ou recusa de solicitações de passageiros.
- Atualização automática das vagas após o aceite.
- Cancelamento de carona e das reservas relacionadas.
- Marcação da viagem como concluída.

### Administrador

- Acesso a uma área administrativa exclusiva.
- Listagem das denúncias recebidas.
- Marcação de denúncias como resolvidas.
- Listagem dos usuários.
- Bloqueio e desbloqueio de contas comuns.

### Interface

- Navegação inferior entre Início, Buscar, Oferecer, Viagens e Perfil.
- Layout adaptável a diferentes larguras de tela.
- Componentes reutilizáveis e identidade visual consistente.
- Mensagens de erro, sucesso, confirmação e estados vazios.
- Áreas de toque e contraste adequados para dispositivos móveis.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| React 19 | Componentes e gerenciamento de estado |
| React Native 0.81 | Construção da interface móvel |
| Expo SDK 54 | Execução, desenvolvimento e empacotamento do projeto |
| Expo Status Bar | Controle visual da barra de status |
| Expo Vector Icons | Ícones utilizados na interface |
| Firebase Authentication | Cadastro, login e persistência da sessão |
| Cloud Firestore | Banco de dados e atualizações em tempo real |
| AsyncStorage | Persistência da sessão no React Native |
| JavaScript | Linguagem principal do projeto |

## Pré-requisitos

Para executar o projeto, instale:

- Node.js 20, 22 ou 24 LTS;
- npm;
- Expo Go em um celular Android, ou um emulador Android configurado;
- Git, caso o projeto seja obtido por clonagem.

Para conferir as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

No terminal, entre na pasta do projeto e instale as dependências:

```bash
cd appcarona
npm install
```

## Configuração obrigatória do Firebase

O aplicativo usa variáveis de ambiente para receber a configuração pública do
Firebase. Copie o arquivo de exemplo e preencha os valores do aplicativo Web exibidos
em **Configurações do projeto > Seus aplicativos** no Console do Firebase:

```bash
cp .env.example .env
```

O arquivo `.env` é local e ignorado pelo Git. O `.env.example` documenta apenas os
nomes das variáveis. Variáveis `EXPO_PUBLIC_*` são incluídas no aplicativo compilado
e não devem receber chaves privadas ou credenciais de conta de serviço.

Antes de criar a primeira conta, conclua estas etapas no Console do Firebase:

### 1. Ativar autenticação por e-mail e senha

1. Abra o projeto `appcarona-973b6` no Console do Firebase.
2. Acesse **Criação > Authentication**.
3. Clique em **Vamos começar**.
4. Abra a aba **Método de login**.
5. Selecione **E-mail/senha**, ative a primeira opção e salve.

### 2. Criar o Cloud Firestore

1. Acesse **Criação > Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha uma localização próxima dos usuários.
4. Finalize a criação do banco.

### 3. Publicar as regras de segurança

Os arquivos `firebase.json`, `.firebaserc`, `firestore.rules` e
`firestore.indexes.json` já estão configurados. Para publicar as regras:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore
```

Também é possível copiar o conteúdo de `firestore.rules` para a aba **Regras** do
Firestore no Console e clicar em **Publicar**.

Sem essas três configurações, o aplicativo exibirá uma mensagem informando que a
operação não foi permitida ou que o banco ainda não existe.

## Iniciar o aplicativo

Depois, inicie o servidor de desenvolvimento:

```bash
npm start
```

O Expo exibirá um QR Code no terminal.

### Executar em um celular Android

1. Instale e abra o Expo Go no celular.
2. Mantenha o computador e o celular conectados à mesma rede.
3. Execute `npm start` no computador.
4. Leia o QR Code exibido pelo Expo.
5. Aguarde o carregamento do aplicativo.

Se a rede local impedir a conexão, tente iniciar o Expo em modo túnel:

```bash
npx expo start --tunnel
```

### Executar em um emulador Android

Com um emulador já aberto e configurado:

```bash
npm run android
```

Também é possível iniciar com `npm start` e pressionar `a` no terminal.

### Executar no navegador

O navegador é útil para uma verificação rápida da interface, embora a plataforma
principal do trabalho seja Android:

```bash
npm run web
```

### Validar o bundle

Para verificar se o código pode ser empacotado sem erros de compilação:

```bash
npx expo export --platform android
```

Esse comando gera um bundle de produção, mas não gera sozinho um arquivo APK.

## Preparar contas para a apresentação

As contas agora são reais e ficam no Firebase Authentication. Cadastre pelo próprio
aplicativo:

| Uso | E-mail sugerido | Perfil escolhido |
| --- | --- | --- |
| Passageiro | um e-mail institucional disponível | Passageiro |
| Motorista | outro e-mail institucional disponível | Motorista |
| Administrador | `admin@ufop.edu.br` | Ambos |

Use senhas com pelo menos seis caracteres. Para demonstrar a troca de solicitações,
é necessário usar duas contas diferentes, pois um motorista não pode reservar a
própria carona.

Para preparar o administrador, cadastre `admin@ufop.edu.br` uma única vez pelo
aplicativo. Depois abra **Firestore Database > Dados > users**, localize o documento
da conta e altere `isAdmin` de `false` para `true`. Saia e entre novamente no app para
exibir o painel administrativo. Guarde a senha escolhida e não a publique no README
ou no repositório.

## Como utilizar

### Criar uma conta

1. Na tela inicial, toque em **Criar minha conta**.
2. Informe o nome completo e um e-mail institucional válido.
3. Escolha Passageiro, Motorista ou Ambos.
4. Informe e confirme uma senha com pelo menos seis caracteres.
5. Toque em **Criar conta**.

A nova conta é criada no Firebase Authentication, seu perfil é salvo na coleção
`users` e a sessão permanece ativa no dispositivo.

### Buscar e reservar uma carona

1. Acesse a aba **Buscar**.
2. Preencha a origem e/ou o destino para filtrar os resultados.
3. Toque em uma carona para consultar os detalhes.
4. Toque em **Solicitar uma vaga**.
5. A reserva aparecerá em **Viagens > Reservas** como pendente.

### Publicar uma carona

1. Acesse a aba **Oferecer**.
2. Preencha a rota, a data, o horário e os detalhes da viagem.
3. Toque em **Publicar carona**.
4. Consulte a publicação em **Viagens > Minhas caronas**.

### Responder a uma solicitação

1. Acesse **Viagens > Solicitações**.
2. Toque em **Aceitar** ou **Recusar**.
3. Quando aceita, a reserva é confirmada e uma vaga é descontada da carona.

### Avaliar uma viagem

1. Acesse **Viagens > Reservas**.
2. Abra uma reserva cuja viagem tenha sido marcada como concluída pelo motorista.
3. Toque em **Avaliar motorista**.
4. Selecione de uma a cinco estrelas e envie a avaliação.

### Enviar e administrar uma denúncia

1. Abra os detalhes de uma carona.
2. Toque no ícone de alerta no canto superior direito.
3. Escolha o motivo, descreva o ocorrido e envie.
4. Entre com a conta administrativa.
5. Acesse **Perfil > Painel administrativo** para resolver a denúncia.

## Fluxo geral do sistema

```text
Cadastro ou login
       │
       ├── Passageiro ──> Buscar carona ──> Solicitar vaga ──> Aguardar resposta
       │                                                    │
       │                                                    └──> Viajar e avaliar
       │
       ├── Motorista ───> Publicar carona ─> Analisar solicitação
       │                                      │
       │                                      ├──> Aceitar ou recusar
       │                                      └──> Concluir viagem
       │
       └── Administrador ─> Analisar denúncias e gerenciar bloqueios
```

## Organização do projeto

```text
appcarona/
├── App.js                         # Estado global e controle da navegação
├── index.js                       # Registro do componente principal no Expo
├── app.json                       # Metadados e configurações do aplicativo
├── package.json                   # Dependências e comandos npm
├── firebase.json                  # Configuração de deploy do Firebase
├── firestore.rules                # Regras de autorização do Firestore
├── firestore.indexes.json         # Índices do Firestore
├── assets/                        # Ícones e imagens
└── src/
    ├── components/
    │   └── ui.js                  # Botões, campos, cabeçalhos e cartões
    ├── config/                     # Inicialização web e nativa do Firebase
    ├── services/                   # Authentication e operações do Firestore
    ├── screens/
    │   ├── AuthScreens.js         # Apresentação, login e cadastro
    │   └── MainScreens.js         # Telas da área autenticada
    ├── theme/                     # Cores, tipografia, raios e espaçamentos
    └── utils/
        └── validators.js          # Validação de login e cadastro
```

### Responsabilidade dos arquivos principais

- `App.js`: observa a autenticação e os dados em tempo real, executa as operações e
  decide qual tela deve ser exibida.
- `src/config/firebase.native.js`: inicializa o Firebase no Android com persistência
  da sessão por AsyncStorage.
- `src/config/firebase.web.js`: inicializa o Firebase no navegador.
- `src/services/authService.js`: cadastro, login, logout e perfil do usuário.
- `src/services/firestoreService.js`: operações de caronas, reservas, avaliações,
  denúncias e administração.
- `src/screens/AuthScreens.js`: reúne os fluxos que não exigem autenticação.
- `src/screens/MainScreens.js`: contém os fluxos do passageiro, motorista,
  administrador, perfil e Sobre.
- `src/components/ui.js`: fornece os elementos visuais reutilizados pelas telas.
- `src/theme/`: centraliza a identidade visual e evita valores repetidos.

## Modelo de dados no Firestore

Cada entidade é armazenada em uma coleção do Cloud Firestore. Os documentos usam o
UID fornecido pelo Firebase Authentication para relacionar as ações ao usuário.

Além das coleções funcionais abaixo, a tela inicial executa a consulta acadêmica
solicitada sobre a coleção `Usuarios`. Cada documento dessa coleção deve possuir o
campo `Email`, respeitando exatamente o `E` maiúsculo. O resultado mostra o ID do
documento e o endereço na lista **Usuários do Firestore**.

A coleção `Usuarios` possui leitura pública nas regras porque a atividade exige a
consulta assim que o app abre, antes do login. Ela deve conter somente dados de teste;
para um aplicativo real, remova essa exceção e exija autenticação.

| Entidade | Informações principais |
| --- | --- |
| Usuário | nome, e-mail, perfis, avaliação e bloqueio |
| Carona | motorista, rota, data, horário, vagas, preço, regras e estado |
| Reserva | carona, motorista, passageiro e estado da solicitação |
| Avaliação | avaliador, avaliado, viagem, estrelas e comentário |
| Denúncia | denunciante, denunciado, motivo, descrição e estado da análise |

Estados de uma carona: `open`, `completed` ou `cancelled`.

Estados de uma reserva: `pending`, `accepted`, `rejected` ou `cancelled`.

As senhas não são armazenadas no Firestore: elas são tratadas exclusivamente pelo
Firebase Authentication.

## Requisitos do trabalho atendidos

| Requisito | Implementação |
| --- | --- |
| React Native | Interface construída com React Native e Expo |
| Android | Execução e bundle Android validados |
| Interface responsiva | Conteúdo flexível, rolável e com largura máxima |
| Cadastro institucional | Validação dos domínios de e-mail da UFOP |
| Perfis de usuário | Passageiro, motorista, ambos e administrador |
| Publicar carona | Formulário completo na aba Oferecer |
| Buscar carona | Filtros de origem e destino |
| Negociar e confirmar | Solicitação, aceite e recusa de vaga |
| Avaliações | Avaliação de uma a cinco estrelas após conclusão |
| Administração | Denúncias e bloqueio de usuários |

## Roteiro sugerido para apresentação

1. Apresente a tela inicial e explique o objetivo do aplicativo.
2. Mostre o cadastro e a validação do e-mail institucional.
3. Entre com a conta de motorista preparada anteriormente.
4. Publique uma nova carona na aba **Oferecer** e depois saia.
5. Entre com a conta de passageiro, busque a carona e solicite uma vaga.
6. Volte à conta de motorista e aceite em **Viagens > Solicitações**.
7. Em **Viagens > Minhas caronas**, marque a viagem como concluída.
8. Volte à conta de passageiro, abra a reserva concluída e faça uma avaliação.
9. Abra uma carona e envie uma denúncia.
10. Entre com a conta `admin@ufop.edu.br` para demonstrar a moderação.
11. Finalize mostrando o perfil e a tela Sobre.

## Limitações desta versão

- A média das avaliações ainda não é recalculada automaticamente no perfil.
- O protótipo não possui mapa, GPS, chat ou notificações push.
- O pagamento é combinado fora do aplicativo.
- Não há recuperação real de senha.
- A validação institucional verifica o domínio do endereço, mas o envio de e-mail de
  confirmação ainda não foi implementado.

## Evolução para uma versão real

Para transformar o MVP em um aplicativo de produção, recomenda-se:

1. implementar confirmação de e-mail e recuperação de senha;
2. calcular médias de avaliações com uma Cloud Function;
3. substituir o campo `isAdmin` por custom claims atribuídas no servidor;
4. configurar notificações para solicitações e respostas;
5. adicionar geolocalização e mapas;
6. incluir testes automatizados e tratamento avançado de falhas de rede;
7. configurar App Check e proteção contra abuso;
8. gerar uma versão Android assinada para distribuição.

As regras em `firestore.rules` protegem as operações do cliente. A interface não
substitui essas regras: toda autorização relevante precisa continuar sendo validada
pelo Firebase.

## Solução de problemas

### O QR Code não abre o aplicativo

- Confirme que o celular e o computador estão na mesma rede.
- Desative temporariamente VPNs que bloqueiem a conexão local.
- Tente `npx expo start --tunnel`.

### Alterações não aparecem

Limpe o cache do Expo:

```bash
npx expo start --clear
```

### Dependências com erro

Reinstale as dependências com as versões registradas no projeto:

```bash
npm install
npx expo-doctor
```

### Erro “operation-not-allowed”

Ative o provedor **E-mail/senha** em Firebase Authentication.

### Erro de permissão do Firestore

Publique o arquivo de regras com `npx firebase-tools deploy --only firestore` e
confirme que o projeto selecionado é `appcarona-973b6`.

### Remover dados de teste

Apague os documentos desejados nas coleções do Firestore pelo Console do Firebase.
As contas são removidas separadamente na página **Authentication > Users**.

## Licença e finalidade

Projeto acadêmico desenvolvido para fins educacionais. Antes de qualquer publicação
ou uso real, devem ser definidos termos de uso, política de privacidade e regras para
tratamento dos dados dos usuários.
