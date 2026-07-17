# Caronas ICEA

Aplicativo Android de caronas para estudantes do ICEA/UFOP. O objetivo é conectar
motoristas e passageiros que tenham rotas e horários compatíveis, oferecendo uma
alternativa de transporte econômica, sustentável e segura.

> Projeto acadêmico da disciplina: **[preencher nome da disciplina]**  
> Professor(a): **[preencher nome]**  
> Aluno(a) 1: **[preencher nome e matrícula]**  
> Aluno(a) 2: **[preencher nome e matrícula, se houver]**

## Situação atual

Este repositório contém um protótipo inicial criado com React Native e Expo. A tela
atual ainda é apenas um exemplo e será substituída gradualmente pelas telas descritas
neste documento.

## Tecnologias escolhidas

- **React Native:** criação das telas do aplicativo Android.
- **Expo:** facilita a execução no celular e evita configuração nativa no início.
- **JavaScript:** linguagem já usada no projeto atual.
- **React Navigation:** navegação entre as telas.
- **Firebase Authentication:** cadastro e login por e-mail e senha.
- **Cloud Firestore:** banco de dados de usuários, caronas, reservas, avaliações e
  denúncias.
- **Firebase Storage:** fotos de perfil, caso esse recurso seja implementado.
- **Firebase Security Rules:** controle de quem pode ler e alterar cada informação.

Para este trabalho, o caminho mais simples é continuar com o **Expo Managed
Workflow** e usar o SDK JavaScript do Firebase. Não é necessário começar criando
código Android nativo.

## Escopo da primeira versão (MVP)

O MVP é a menor versão que atende ao objetivo principal e pode ser apresentada.

### Funcionalidades obrigatórias

- Cadastro com nome, e-mail institucional, senha e tipo de perfil.
- Login e logout.
- Perfil de motorista, passageiro ou ambos.
- Publicação de carona com origem, destino, data, horário, vagas, preço e regras.
- Listagem e busca de caronas disponíveis.
- Solicitação de reserva por um passageiro.
- Aceite ou recusa da solicitação pelo motorista.
- Cancelamento de uma carona ou reserva.
- Marcação da viagem como concluída.
- Avaliação de 1 a 5 estrelas após a conclusão.
- Denúncia de usuário ou viagem.
- Área administrativa simples para consultar denúncias e bloquear perfis.
- Tela **Sobre** com os nomes dos integrantes.

### Melhorias opcionais

Estas funcionalidades só devem ser iniciadas depois que o MVP estiver funcionando:

- Foto de perfil.
- Mapa, geolocalização e cálculo de distância.
- Chat em tempo real.
- Notificações push.
- Pagamento dentro do aplicativo.
- Histórico avançado e filtros por preço/local.

No MVP, origem e destino podem ser campos de texto, e o pagamento pode ser combinado
fora do app. Isso reduz bastante a complexidade sem prejudicar o fluxo principal.

## Perfis e permissões

| Perfil | Permissões principais |
| --- | --- |
| Passageiro | Buscar caronas, solicitar vaga, cancelar reserva, avaliar e denunciar |
| Motorista | Publicar/editar/cancelar carona, aceitar passageiros, concluir viagem, avaliar e denunciar |
| Ambos | Possui as permissões de passageiro e motorista |
| Administrador | Analisar denúncias, bloquear usuários e consultar dados necessários à moderação |

O usuário não deve poder escolher o perfil de administrador durante o cadastro. Essa
permissão deve ser atribuída manualmente no banco para a conta do professor ou da
equipe responsável.

## Requisitos não funcionais

- Funcionar em Android e adaptar-se a diferentes tamanhos de tela.
- Exibir mensagens de carregamento, sucesso e erro.
- Validar os campos antes de enviá-los ao Firebase.
- Aceitar apenas o domínio institucional definido para o projeto, por exemplo
  `@aluno.ufop.edu.br` e/ou `@ufop.edu.br`. Confirmar com o professor quais domínios
  serão aceitos.
- Armazenar senhas somente no Firebase Authentication, nunca no Firestore.
- Proteger dados usando regras do Firestore; esconder botões na interface não é uma
  proteção suficiente.
- Não salvar chaves privadas ou contas de serviço no Git.
- Manter textos legíveis, botões com área de toque adequada e contraste suficiente.
- Informar ao usuário quais dados são armazenados e coletar apenas o necessário.

## Fluxo principal do aplicativo

1. O usuário abre o app e cria uma conta com e-mail institucional.
2. Após o login, completa seu perfil e escolhe motorista, passageiro ou ambos.
3. O motorista publica uma carona.
4. O passageiro pesquisa uma rota e solicita uma vaga.
5. O motorista aceita ou recusa a solicitação.
6. Quando aceita, a reserva fica confirmada e uma vaga é ocupada.
7. Depois da viagem, o motorista a marca como concluída.
8. Motorista e passageiro podem avaliar um ao outro.
9. Em caso de problema, o usuário registra uma denúncia para o administrador.

## Telas planejadas

### Acesso

- Login
- Cadastro
- Recuperação de senha

### Área autenticada

- Início
- Buscar caronas
- Detalhes da carona
- Publicar/editar carona
- Minhas viagens
- Solicitações recebidas (motorista)
- Perfil
- Avaliação
- Denúncia
- Sobre

### Administração

- Lista de denúncias
- Detalhes da denúncia
- Lista de usuários e ação de bloquear/desbloquear

## Estrutura de pastas proposta

```text
appcarona/
├── assets/                 # Imagens e ícones
├── src/
│   ├── components/         # Botões, campos e cartões reutilizáveis
│   ├── config/
│   │   └── firebase.js     # Inicialização do Firebase
│   ├── contexts/           # Estado global de autenticação
│   ├── navigation/         # Rotas públicas, privadas e administrativas
│   ├── screens/
│   │   ├── auth/           # Login, cadastro e recuperação de senha
│   │   ├── rides/          # Busca, detalhes e publicação de caronas
│   │   ├── bookings/       # Reservas e solicitações
│   │   ├── profile/        # Perfil, avaliações e Sobre
│   │   └── admin/          # Moderação
│   ├── services/           # Funções que acessam o Firebase
│   ├── utils/              # Validações e formatação de datas/valores
│   └── theme/              # Cores, espaçamentos e tipografia
├── .env.example            # Nomes das configurações, sem valores privados
├── .gitignore
├── App.js
├── app.json
├── firestore.rules
├── firestore.indexes.json
└── package.json
```

Não é necessário criar tudo de uma vez. Cada pasta deve ser adicionada quando a
primeira funcionalidade correspondente for implementada.

## Modelo de dados no Firestore

O Firestore organiza os dados em coleções e documentos. Uma sugestão inicial é:

### `users/{userId}`

```js
{
  name: "Nome do aluno",
  email: "aluno@ufop.edu.br",
  roles: ["passenger", "driver"],
  isAdmin: false,
  isBlocked: false,
  ratingAverage: 4.8,
  ratingCount: 5,
  createdAt: Timestamp
}
```

O ID do documento deve ser o mesmo `uid` criado pelo Firebase Authentication.

### `rides/{rideId}`

```js
{
  driverId: "uid-do-motorista",
  origin: "Bairro A",
  destination: "ICEA/UFOP",
  departureAt: Timestamp,
  seatsTotal: 3,
  seatsAvailable: 2,
  price: 5.00,
  rules: "Não fumar no veículo",
  status: "open", // open, full, completed ou cancelled
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `bookings/{bookingId}`

```js
{
  rideId: "id-da-carona",
  driverId: "uid-do-motorista",
  passengerId: "uid-do-passageiro",
  status: "pending", // pending, accepted, rejected ou cancelled
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `reviews/{reviewId}`

```js
{
  rideId: "id-da-carona",
  authorId: "quem-avaliou",
  targetUserId: "quem-foi-avaliado",
  rating: 5,
  comment: "Viagem tranquila",
  createdAt: Timestamp
}
```

### `reports/{reportId}`

```js
{
  authorId: "quem-denunciou",
  reportedUserId: "usuario-denunciado",
  rideId: "id-da-carona-ou-null",
  reason: "Descrição do problema",
  status: "open", // open, reviewing ou resolved
  adminNotes: "",
  createdAt: Timestamp,
  resolvedAt: null
}
```

Datas devem ser salvas como `Timestamp` do Firebase, e não como texto. Valores como
`createdAt` e `updatedAt` devem usar o horário do servidor (`serverTimestamp()`).

## Preparação do ambiente

### 1. Instalar as ferramentas

Instale:

- Node.js na versão LTS;
- Git;
- VS Code ou outro editor;
- aplicativo **Expo Go** em um celular Android conectado à mesma rede do computador.

Confirme a instalação no terminal:

```bash
node --version
npm --version
git --version
```

### 2. Baixar e executar este projeto

```bash
git clone URL_DO_REPOSITORIO
cd appcarona
npm install
npx expo start
```

Leia o QR Code exibido no terminal usando o Expo Go. Se a rede não permitir a
conexão, tente:

```bash
npx expo start --tunnel
```

Também é possível usar um emulador Android, mas o celular com Expo Go costuma ser o
caminho mais simples para começar.

### 3. Instalar as bibliotecas necessárias

Execute apenas quando começar a implementar as respectivas funcionalidades:

```bash
npm install firebase
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

Sempre reinicie o Expo depois de instalar dependências. Se houver problema de cache:

```bash
npx expo start --clear
```

## Configuração do Firebase

1. Acesse o Console do Firebase e crie um projeto, por exemplo `caronas-icea`.
2. Adicione um **aplicativo Web** ao projeto. O SDK Web funciona no projeto Expo.
3. Em **Authentication > Sign-in method**, habilite **E-mail/senha**.
4. Em **Firestore Database**, crie o banco. O modo de teste serve apenas para o
   primeiro experimento; antes da entrega, publique regras restritivas.
5. Copie a configuração fornecida pelo Firebase.
6. Crie um arquivo `.env` na raiz a partir deste modelo:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

7. Crie `src/config/firebase.js` para ler essas variáveis e inicializar `app`, `auth`
   e `db`.
8. Crie também um `.env.example` vazio com os mesmos nomes para documentar a
   configuração para a dupla.

O arquivo `.env` e possíveis credenciais administrativas já estão previstos no
`.gitignore`. As configurações públicas do app Firebase não substituem as regras de
segurança: a proteção real deve estar no Authentication e nas Security Rules. Nunca
use uma chave de **service account** dentro do aplicativo.

## Regras de segurança que precisam ser implementadas

Antes da apresentação, as regras do Firestore devem garantir pelo menos que:

- apenas usuários autenticados acessam os dados do app;
- um usuário altera somente o próprio perfil e não pode se tornar administrador;
- um usuário bloqueado não publica nem solicita caronas;
- somente motoristas criam caronas em seu próprio nome;
- somente o autor edita uma carona, exceto ações administrativas;
- somente o passageiro cria uma reserva para si próprio;
- somente o motorista da carona aceita ou rejeita uma solicitação;
- uma avaliação só pode ser criada por participante de uma viagem concluída;
- cada participante avalia a outra pessoa no máximo uma vez por viagem;
- somente administradores leem todas as denúncias e alteram o estado delas.

Atualizar `seatsAvailable` e aceitar uma reserva são operações relacionadas. Para
evitar duas pessoas ocupando a última vaga ao mesmo tempo, essa alteração deve usar
uma **transação do Firestore**.

## Plano de desenvolvimento para iniciantes

### Etapa 0 — Entender o básico

- [ ] Executar o app atual no celular.
- [ ] Aprender os conceitos de componente, propriedade (`prop`), estado (`useState`)
  e efeito (`useEffect`).
- [ ] Fazer uma alteração pequena em `App.js` e confirmar que ela aparece no celular.
- [ ] Criar o repositório Git e fazer commits pequenos e descritivos.

**Resultado esperado:** o ambiente funciona e a equipe sabe alterar uma tela.

### Etapa 1 — Navegação e identidade visual

- [ ] Definir cores, nome e ícone do projeto.
- [ ] Instalar o React Navigation.
- [ ] Criar navegação de acesso (Login/Cadastro).
- [ ] Criar abas da área autenticada (Início, Buscar/Publicar, Viagens e Perfil).
- [ ] Criar componentes básicos de botão, campo de texto e estado de carregamento.
- [ ] Atualizar a tela Sobre com os integrantes.

**Resultado esperado:** todas as telas vazias podem ser abertas sem erro.

### Etapa 2 — Firebase e autenticação

- [ ] Criar e configurar o projeto Firebase.
- [ ] Inicializar o Firebase usando variáveis de ambiente.
- [ ] Implementar cadastro com e-mail e senha.
- [ ] Validar o domínio institucional.
- [ ] Criar o documento em `users` após o cadastro.
- [ ] Implementar login, logout e recuperação de senha.
- [ ] Criar um contexto de autenticação e proteger as telas internas.
- [ ] Tratar conta bloqueada.

**Resultado esperado:** cada integrante consegue criar uma conta, entrar, fechar o
app e continuar autenticado ao abrir novamente.

### Etapa 3 — Perfis

- [ ] Exibir os dados do usuário autenticado.
- [ ] Permitir editar nome e papéis (motorista/passageiro/ambos).
- [ ] Mostrar média e quantidade de avaliações.
- [ ] Validar todos os campos e exibir mensagens claras.

**Resultado esperado:** o perfil é salvo no Firestore e reaparece após reiniciar.

### Etapa 4 — Publicação e busca de caronas

- [ ] Criar formulário de carona.
- [ ] Usar seletor de data/hora e salvar como `Timestamp`.
- [ ] Listar caronas futuras com status `open` e vagas disponíveis.
- [ ] Mostrar detalhes da carona e dados públicos do motorista.
- [ ] Permitir ao motorista editar ou cancelar sua publicação.
- [ ] Criar os índices solicitados pelo Firestore durante as consultas.

**Resultado esperado:** uma conta publica e outra conta encontra a carona.

### Etapa 5 — Reservas e confirmação

- [ ] Criar solicitação com status `pending`.
- [ ] Impedir reserva duplicada e reserva na própria carona.
- [ ] Listar solicitações para o motorista.
- [ ] Implementar aceitar/recusar.
- [ ] Ao aceitar, usar transação para reduzir as vagas.
- [ ] Implementar cancelamento e devolução da vaga quando aplicável.
- [ ] Exibir viagens oferecidas e reservadas em “Minhas viagens”.

**Resultado esperado:** o fluxo passageiro → solicitação → aceite funciona com duas
contas diferentes.

### Etapa 6 — Conclusão, avaliações e denúncias

- [ ] Motorista marca a viagem como concluída.
- [ ] Participantes criam avaliações de 1 a 5 estrelas.
- [ ] Impedir avaliação duplicada.
- [ ] Atualizar/exibir a média de avaliações.
- [ ] Criar formulário de denúncia.
- [ ] Criar a área administrativa e cadastrar um administrador manualmente.
- [ ] Permitir ao administrador resolver denúncia e bloquear/desbloquear usuário.

**Resultado esperado:** o ciclo completo da viagem e a moderação podem ser
demonstrados.

### Etapa 7 — Segurança, testes e apresentação

- [ ] Escrever e testar as regras do Firestore.
- [ ] Testar telas pequenas e grandes.
- [ ] Testar internet lenta, campos inválidos e falha de conexão.
- [ ] Remover dados de teste inadequados e mensagens de depuração.
- [ ] Revisar nomes dos integrantes no README e na tela Sobre.
- [ ] Preparar contas de passageiro, motorista e administrador para a apresentação.
- [ ] Gerar uma versão Android ou confirmar previamente a execução no Expo Go.
- [ ] Ensaiar uma demonstração de 5 a 10 minutos.

**Resultado esperado:** versão estável, segura e pronta para avaliação.

## Sugestão de divisão em dupla

- **Pessoa A:** autenticação, perfil, navegação e telas administrativas.
- **Pessoa B:** caronas, busca, reservas e avaliações.
- **Ambas:** modelo de dados, regras do Firebase, testes, documentação e apresentação.

Evitem trabalhar ao mesmo tempo no mesmo arquivo. Criem uma branch por funcionalidade
e integrem mudanças pequenas frequentemente.

## Estratégia de testes

No mínimo, testar manualmente os seguintes casos:

| Cenário | Resultado esperado |
| --- | --- |
| Cadastro com e-mail pessoal | Cadastro recusado |
| Login com senha incorreta | Mensagem de erro compreensível |
| Passageiro tenta publicar sem papel de motorista | Operação recusada |
| Passageiro reserva a própria carona | Operação recusada |
| Duas solicitações para a última vaga | Apenas uma pode ser aceita |
| Usuário tenta editar carona de outra pessoa | Firestore recusa |
| Avaliação antes da conclusão | Operação recusada |
| Segunda avaliação da mesma pessoa/viagem | Operação recusada |
| Usuário comum abre função administrativa | Acesso recusado |
| Usuário bloqueado tenta publicar/reservar | Operação recusada |

Para o teste completo, mantenha três contas separadas: motorista, passageiro e
administrador.

## Git e organização do trabalho

Fluxo simples recomendado:

```bash
git checkout -b feature/login
# faça uma alteração pequena
git add .
git commit -m "feat: implementa tela de login"
git checkout main
git merge feature/login
```

Antes de cada commit, confira se nenhum segredo será enviado:

```bash
git status
git diff --staged
```

Nunca faça commit de `.env`, `node_modules`, arquivos de conta de serviço ou builds.
O `.gitignore` deste projeto já cobre esses casos. Arquivos como `firestore.rules`,
`firestore.indexes.json` e `.env.example` **devem** ser versionados.

## Roteiro sugerido para a apresentação

1. Explicar em uma frase o problema resolvido.
2. Cadastrar ou entrar com uma conta institucional.
3. Mostrar o perfil do motorista e publicar uma carona.
4. Entrar como passageiro, localizar a carona e solicitar uma vaga.
5. Voltar ao motorista e aceitar a solicitação.
6. Mostrar a reserva confirmada e concluir a viagem.
7. Fazer uma avaliação.
8. Criar uma denúncia e mostrar o tratamento pela conta administrativa.
9. Explicar brevemente o Firestore e as regras de segurança.

Tenha dados e contas preparados antes da apresentação, mas também saiba mostrar no
código onde cada funcionalidade foi implementada.

## Critério para considerar o projeto pronto

O projeto está pronto quando o fluxo principal funciona em dois celulares ou em um
celular alternando contas, os dados continuam salvos após reiniciar, acessos indevidos
são recusados pelas regras do Firebase e a equipe consegue demonstrar tudo sem editar
o banco manualmente (exceto a atribuição inicial do administrador).

## Entrega

- Somente um integrante da dupla deve postar o código no Moodle.
- Os nomes dos integrantes devem constar neste README e, se possível, na tela Sobre.
- O trabalho deve ser apresentado ao professor na sala A202 ou no laboratório.
- O agendamento da apresentação deve ser feito pelo e-mail informado na especificação
  da disciplina.

## Próximo passo recomendado

Execute o projeto atual com `npm install` e `npx expo start`. Depois conclua apenas a
**Etapa 1**. Quando a navegação e as telas vazias estiverem funcionando, faça um
commit antes de iniciar a configuração do Firebase.
