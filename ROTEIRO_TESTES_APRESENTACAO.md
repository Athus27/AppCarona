# Roteiro de testes e apresentação — Caronas ICEA

Este documento serve como guia para preparar, testar e apresentar o aplicativo ao
professor. Faça a preparação e os testes completos antes do dia da apresentação.

## 1. O que levar para a apresentação

- Notebook com o projeto instalado e funcionando.
- Celular Android com o Expo Go instalado e carregado.
- Notebook e celular conectados à mesma rede.
- Acesso ao projeto `appcarona-973b6` no Console do Firebase.
- Duas contas institucionais para representar motorista e passageiro.
- Uma conta administrativa preparada conforme este roteiro.
- Este arquivo aberto para acompanhar a ordem da demonstração.

Também é recomendável gravar um vídeo curto do aplicativo funcionando. Ele serve como
plano B caso a rede da sala impeça a conexão com o Expo ou o Firebase.

## 2. Preparação inicial do projeto

Abra um terminal na pasta do projeto:

```bash
cd /home/athus/Downloads/appcarona
npm install
```

Confirme se as dependências estão compatíveis:

```bash
npx expo install --check
```

O resultado esperado é:

```text
Dependencies are up to date
```

Valide a compilação Android:

```bash
npx expo export --platform android
```

O comando deve terminar com uma mensagem semelhante a:

```text
Android Bundled
Exported: dist
```

## 3. Preparação do Firebase

### 3.1 Ativar o login por e-mail e senha

No Console do Firebase:

1. Abra o projeto `appcarona-973b6`.
2. Acesse **Authentication**.
3. Abra **Sign-in method** ou **Método de login**.
4. Ative **Email/Password** ou **E-mail/senha**.
5. Salve.

### 3.2 Confirmar o Firestore

1. Acesse **Firestore Database**.
2. Confirme que o banco `(default)` existe.
3. Confirme que a localização é `nam5`.
4. Abra a aba **Rules/Regras**.

### 3.3 Publicar as regras

No terminal:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore
```

O projeto esperado é `appcarona-973b6`. Se aparecer outro projeto, interrompa e
confira o arquivo `.firebaserc`.

### 3.4 Criar a coleção exigida pela atividade

Na aba **Dados** do Firestore, crie a coleção com o nome exato:

```text
Usuarios
```

Crie pelo menos dois documentos. O ID pode ser automático. Cada documento deve ter o
campo abaixo, respeitando o `E` maiúsculo:

```text
Email: "motorista@aluno.ufop.edu.br"
```

Exemplo:

```text
Usuarios
├── documento-1
│   └── Email: "motorista@aluno.ufop.edu.br"
└── documento-2
    └── Email: "passageiro@aluno.ufop.edu.br"
```

Quando o aplicativo abrir, esses documentos devem aparecer na lista **Usuários do
Firestore**, mostrando o ID e o campo `Email`.

> A coleção `Usuarios`, com inicial maiúscula, é a consulta específica pedida na
> atividade. A coleção `users`, em minúsculo, é utilizada internamente pelos perfis
> completos criados pelo aplicativo. Não confunda as duas.

## 4. Preparar as contas da demonstração

Use três contas:

| Conta | E-mail sugerido | Perfil no cadastro |
| --- | --- | --- |
| Motorista | `motorista@aluno.ufop.edu.br` | Motorista |
| Passageiro | `passageiro@aluno.ufop.edu.br` | Passageiro |
| Administrador | `admin@ufop.edu.br` | Ambos |

Os endereços precisam estar disponíveis no Firebase Authentication. Como o aplicativo
ainda não envia confirmação de e-mail, eles podem ser usados como contas acadêmicas
de teste. Escolha senhas com pelo menos seis caracteres e anote-as em um local
privado. Não coloque as senhas no Git ou neste arquivo.

### Tornar uma conta administradora

1. Cadastre `admin@ufop.edu.br` pelo aplicativo.
2. Abra **Firestore Database > Dados > users**.
3. Localize o documento cujo campo `email` seja `admin@ufop.edu.br`.
4. Altere o campo `isAdmin` de `false` para `true`.
5. Salve.
6. Saia e entre novamente na conta administrativa.
7. Confirme que **Perfil > Painel administrativo** está visível.

## 5. Iniciar o aplicativo

Execute:

```bash
npm start
```

No celular:

1. Abra o Expo Go.
2. Leia o QR Code mostrado no terminal.
3. Aguarde o aplicativo carregar.

Se a conexão pela rede local falhar:

```bash
npx expo start --tunnel
```

Para limpar o cache do Expo:

```bash
npx expo start --clear
```

## 6. Testes obrigatórios antes da apresentação

Marque cada item depois de testar.

### Teste 1 — Conexão direta com a coleção `Usuarios`

- [ ] Abrir o aplicativo sem fazer login.
- [ ] Localizar a seção **Usuários do Firestore**.
- [ ] Confirmar que os documentos criados aparecem.
- [ ] Confirmar que cada item mostra `ID:`.
- [ ] Confirmar que cada item mostra `Email:`.
- [ ] Confirmar que o valor vem do campo `Email` com `E` maiúsculo.

Resultado esperado: a lista apresenta os documentos existentes na coleção
`Usuarios`.

### Teste 2 — Validação do cadastro

- [ ] Tentar cadastrar um e-mail que não seja da UFOP.
- [ ] Confirmar que o aplicativo rejeita o endereço.
- [ ] Tentar usar uma senha com menos de seis caracteres.
- [ ] Confirmar que o aplicativo mostra uma mensagem de erro.
- [ ] Tentar confirmar uma senha diferente.
- [ ] Confirmar que o aplicativo impede o cadastro.

Resultado esperado: somente dados válidos permitem continuar.

### Teste 3 — Cadastro e persistência

- [ ] Cadastrar a conta do motorista.
- [ ] Confirmar que o aplicativo entra automaticamente.
- [ ] Abrir o Firestore e confirmar o documento em `users`.
- [ ] Fechar e abrir o aplicativo.
- [ ] Confirmar que a sessão continua ativa.
- [ ] Sair e entrar novamente com a mesma conta.

Resultado esperado: a conta existe no Authentication, o perfil existe no Firestore e
a sessão permanece ativa no celular.

### Teste 4 — Publicação de carona

Entre com a conta do motorista e publique:

```text
Origem: Centro, João Monlevade
Destino: ICEA / UFOP
Data: 20/07/2026
Horário: 07:10
Vagas: 3
Preço: 6,00
Veículo: Fiat Argo • Prata
Regras: Não fumar no veículo.
```

- [ ] Confirmar a mensagem de sucesso.
- [ ] Abrir **Viagens > Minhas caronas**.
- [ ] Confirmar que a nova carona aparece.
- [ ] Abrir o Firestore e confirmar um documento em `rides`.

Resultado esperado: a carona fica disponível e possui três vagas.

### Teste 5 — Busca e solicitação de vaga

1. Saia da conta do motorista.
2. Entre com a conta do passageiro.
3. Abra **Buscar**.
4. Pesquise `Centro` como origem e `ICEA` como destino.
5. Abra a carona criada.
6. Toque em **Solicitar uma vaga**.

- [ ] Confirmar a mensagem de solicitação enviada.
- [ ] Abrir **Viagens > Reservas**.
- [ ] Confirmar que a reserva aparece como pendente.
- [ ] Confirmar um novo documento em `bookings` no Firestore.

Resultado esperado: a solicitação fica com estado `pending`.

### Teste 6 — Aceite pelo motorista

1. Saia da conta do passageiro.
2. Entre com a conta do motorista.
3. Abra **Viagens > Solicitações**.
4. Aceite a solicitação recebida.

- [ ] Confirmar que a solicitação sai da lista de pendentes.
- [ ] Confirmar que o documento em `bookings` ficou `accepted`.
- [ ] Confirmar que `seatsAvailable` da carona mudou de 3 para 2.

Resultado esperado: a reserva é confirmada e somente uma vaga é descontada.

### Teste 7 — Conclusão da viagem

1. Na conta do motorista, abra **Viagens > Minhas caronas**.
2. Toque em **Marcar como concluída**.

- [ ] Confirmar a mensagem de conclusão.
- [ ] Confirmar que a carona ficou com estado `completed` no Firestore.
- [ ] Confirmar que a interface indica a conclusão.

Resultado esperado: a viagem não aceita novas reservas e pode ser avaliada.

### Teste 8 — Avaliação

1. Entre novamente com a conta do passageiro.
2. Abra **Viagens > Reservas**.
3. Abra a viagem concluída.
4. Toque em **Avaliar motorista**.
5. Selecione cinco estrelas e escreva um comentário.
6. Envie.

- [ ] Confirmar a mensagem de sucesso.
- [ ] Confirmar um documento novo na coleção `reviews`.
- [ ] Confirmar os campos `reviewerId`, `targetId`, `rideId` e `rating`.

Resultado esperado: a avaliação é persistida com nota entre 1 e 5.

### Teste 9 — Denúncia

1. Na conta do passageiro, abra os detalhes de uma carona.
2. Toque no ícone de alerta.
3. Escolha um motivo.
4. Escreva uma descrição de teste.
5. Envie.

- [ ] Confirmar a mensagem de envio.
- [ ] Confirmar um documento na coleção `reports`.
- [ ] Confirmar que o estado inicial é `pending`.

Resultado esperado: a denúncia fica disponível para o administrador.

### Teste 10 — Administração

1. Entre com `admin@ufop.edu.br`.
2. Abra **Perfil > Painel administrativo**.

- [ ] Confirmar que a denúncia aparece.
- [ ] Marcar a denúncia como resolvida.
- [ ] Confirmar que o estado mudou para `resolved`.
- [ ] Abrir a aba de usuários.
- [ ] Bloquear uma conta de teste.
- [ ] Tentar entrar com a conta bloqueada.
- [ ] Confirmar que o acesso é encerrado ou impedido.
- [ ] Desbloquear a conta para os próximos testes.

Resultado esperado: somente o administrador consegue moderar denúncias e usuários.

### Teste 11 — Cancelamento

Use uma carona separada para não apagar o cenário principal da apresentação.

- [ ] Publicar uma segunda carona.
- [ ] Criar uma solicitação de passageiro.
- [ ] Cancelar a carona como motorista.
- [ ] Confirmar que a carona ficou `cancelled`.
- [ ] Confirmar que as reservas relacionadas também ficaram `cancelled`.

Resultado esperado: o cancelamento atualiza a carona e suas reservas relacionadas.

## 7. Roteiro falado para a apresentação

Tempo sugerido: de 10 a 15 minutos.

### Parte 1 — Introdução, aproximadamente 1 minuto

Fala sugerida:

> O Caronas ICEA é um aplicativo Android desenvolvido em React Native com Expo. O
> objetivo é conectar motoristas e passageiros da comunidade do ICEA/UFOP que tenham
> rotas e horários compatíveis. O sistema busca oferecer uma alternativa mais
> econômica, sustentável e segura de transporte.

Mostre rapidamente a tela inicial e a identidade visual.

### Parte 2 — Tecnologias e banco, aproximadamente 2 minutos

Fala sugerida:

> A interface foi construída com React Native e Expo. Para os dados, utilizamos o
> Firebase Authentication no cadastro e login, e o Cloud Firestore para usuários,
> caronas, reservas, avaliações e denúncias. Os dados são sincronizados em tempo real
> e a sessão fica persistida no dispositivo.

Mostre:

1. A lista **Usuários do Firestore** na tela inicial.
2. Um documento da coleção `Usuarios` no Console do Firebase.
3. Os arquivos `.env.example` e `src/config/firebaseConfig.js` no editor.
4. Destaque que não foi utilizado `getAnalytics`, pois ele não é necessário para
   essa conexão no React Native.

### Parte 3 — Cadastro e perfis, aproximadamente 2 minutos

Fala sugerida:

> O cadastro exige um e-mail institucional da UFOP. O usuário pode atuar como
> passageiro, motorista ou nos dois perfis. A opção de administrador não aparece no
> cadastro comum e precisa ser atribuída de maneira controlada no banco.

Mostre uma tentativa com e-mail inválido e depois entre na conta do motorista.

### Parte 4 — Fluxo principal, aproximadamente 5 minutos

Faça o seguinte, explicando cada mudança:

1. Entre como motorista e publique uma carona.
2. Mostre a carona em **Minhas caronas**.
3. Entre como passageiro e encontre a rota pela busca.
4. Abra os detalhes e solicite uma vaga.
5. Volte ao motorista e aceite a solicitação.
6. Mostre que a quantidade de vagas diminuiu.
7. Marque a viagem como concluída.
8. Volte ao passageiro e envie uma avaliação.

Fala sugerida durante o aceite:

> O aceite utiliza uma transação no Firestore. A reserva e a quantidade de vagas são
> atualizadas juntas, evitando que a mesma vaga seja confirmada incorretamente.

### Parte 5 — Segurança e administração, aproximadamente 2 minutos

Envie uma denúncia como passageiro e depois entre como administrador.

Fala sugerida:

> Em caso de problema, o passageiro pode enviar uma denúncia. O administrador possui
> uma área separada para analisar denúncias e bloquear perfis. Essas permissões não
> dependem apenas dos botões da interface: o arquivo de regras do Firestore também
> controla quem pode ler e alterar cada coleção.

Mostre `firestore.rules` rapidamente e resolva a denúncia no painel.

### Parte 6 — Encerramento, aproximadamente 1 minuto

Fala sugerida:

> O MVP atende aos fluxos principais pedidos: cadastro institucional, perfis de
> motorista e passageiro, publicação e busca, confirmação de viagens, avaliações e
> administração. Como próximas evoluções, podem ser adicionados mapas, notificações,
> confirmação de e-mail e chat em tempo real.

Abra **Perfil > Sobre** e mostre os nomes dos integrantes.

## 8. Perguntas que o professor pode fazer

### Onde as senhas ficam armazenadas?

Resposta: no Firebase Authentication. Senhas não são gravadas no Firestore.

### Por que existem `Usuarios` e `users`?

Resposta: `Usuarios` é a coleção exigida no exercício específico de leitura com o
campo `Email`. A coleção `users` contém os perfis completos usados pelos fluxos do
aplicativo.

### O que acontece ao aceitar uma reserva?

Resposta: a reserva muda de `pending` para `accepted` e uma vaga é descontada da
carona por meio de uma transação.

### Como o administrador é protegido?

Resposta: a interface verifica `isAdmin`, e as regras do Firestore repetem essa
validação no banco. O usuário comum não pode alterar o próprio campo `isAdmin`.

### Por que o Analytics não foi usado?

Resposta: ele não é necessário para Authentication ou Firestore e o SDK Web de
Analytics não deve ser inicializado diretamente no ambiente React Native desse
projeto.

### Os dados continuam depois de fechar o aplicativo?

Resposta: sim. Os documentos ficam no Cloud Firestore, e a autenticação permanece no
dispositivo usando AsyncStorage.

### O aplicativo funciona sem internet?

Resposta: a interface abre, mas as operações desta versão dependem da conexão com o
Firebase. O SDK JavaScript do Firestore usado no React Native não oferece persistência
offline neste projeto.

### Como evitar mais reservas do que vagas?

Resposta: o aceite lê e atualiza a quantidade de vagas em uma transação e rejeita o
aceite quando não existem vagas disponíveis.

## 9. Plano B para problemas durante a apresentação

### O Expo não conecta ao celular

Execute:

```bash
npx expo start --tunnel
```

Se ainda falhar, apresente pelo navegador:

```bash
npm run web
```

### O Firebase retorna erro de permissão

Publique novamente as regras:

```bash
npx firebase-tools deploy --only firestore
```

### O login retorna `operation-not-allowed`

Ative **E-mail/senha** em **Authentication > Método de login**.

### A coleção `Usuarios` aparece vazia

Confirme:

- nome da coleção exatamente como `Usuarios`;
- campo exatamente como `Email`;
- regras publicadas;
- internet disponível;
- projeto `appcarona-973b6` selecionado.

### A conta administrativa não mostra o painel

Confirme que o documento correto em `users` possui:

```text
isAdmin: true
```

Depois saia e entre novamente.

## 10. Checklist final do dia

- [ ] Nomes e matrículas preenchidos no README e na tela Sobre.
- [ ] Projeto correto aberto no Firebase.
- [ ] Authentication por e-mail/senha ativado.
- [ ] Regras do Firestore publicadas.
- [ ] Coleção `Usuarios` preenchida com o campo `Email`.
- [ ] Contas de motorista, passageiro e administrador funcionando.
- [ ] Uma carona pronta para ser demonstrada.
- [ ] Celular e notebook carregados.
- [ ] Expo Go atualizado.
- [ ] Internet ou roteamento do celular disponível.
- [ ] Vídeo de segurança gravado.
- [ ] Senhas de teste anotadas fora do repositório.
- [ ] `npm install` e `npx expo install --check` executados.
- [ ] Bundle Android validado.
- [ ] Este roteiro aberto durante a apresentação.

## 11. Limpeza depois dos testes

No Console do Firebase:

1. Remova documentos de teste que não serão usados na apresentação.
2. Mantenha pelo menos uma carona para cada fluxo que deseja demonstrar.
3. Desbloqueie as contas utilizadas nos testes.
4. Remova denúncias com textos inadequados ou improvisados.
5. Não apague o usuário administrador antes da apresentação.

As contas são removidas em **Authentication > Users**. Os perfis e demais documentos
são removidos separadamente no Firestore.
