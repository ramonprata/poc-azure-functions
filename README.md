# Portal de Comunicação - Força de Vendas - Martins

## Demanda

Portal onde equipe estratégica de vendas possa enviar mensagens, comunicados, links e arquivos para representantes de vendas e gestores. Os mesmos receberão essas mensagens no **app** força de vendas e/ou por email.

### Especificações - Opções de comunicação

- Texto (até 500 caracteres)
- Imagem (1x1)
- Envio de PDF
- Envio de Arquivos Office
- Envio de link com direcionamento para o fim (ex.: link do SAS)

### Especificações - Opções de envio

- Marcar envio como push notification (para o app)
- Mensagem/comunicado deve ter prazo de expiração (padrão para todas)
- Direcionar mensagens/comunicados para grupos/usuários específicos
  - GV específicos, Grupo de GVs.
  - GT específico, Grupo de GT
  - RCA específico, Grupo de RCA
  - Equipe completa
  - Equipe especialista e Generalista

### Especificações - Opções de leitura

- Ver histórico de mensagens/comunicados
  - Filtrar por período, quem enviou, tipo de mensagem (email/push notification), etc.

### Demanda/Escopo

- Direcionamento
  - Somente para o Força de Vendas (não irá atender outras aplicações do Martins)
- Frequência de acesso
  - Baixo número de usuários (aproximadamente 40)
  - Uso diário (várias vezes ao dia)

# Requisitos técnicos / Proposta

- Front-end: (**Sugetão: SPA ReactJS**)
  - Plataforma: **WEB**
  - Responsividade: desejável mas não essencial
  - SEO: não relevante
  - Performance, bundle, load inicial: não crítico
  - Integração com BFF Força de Vendas
  - Integração com Serverless API
- Back-end **Serverless API (Sugestão: Azure Functions**)
  - Disparo de email (**NÃO PRIORITÁRIO INICIALMENTE**)
  - Disparo de push notification
    - Opções de serviços
      - AppCenter
      - **Firebase**
      - OneSignal
  - Gravar/ler histórico de mensagens/comunicados
    - NoSQL DB (**Sugestão Cosmos DB com Mongo API**)
    - Armazenamento de arquivos
      - Storage na nuvem (**Sugestão: Azure blob storage**)

## Desenho arquitetural

![](https://i.ibb.co/vYNBfC9/desenho-arquitetural.png)

# POC - EXECUTAR LOCAL

## Requisitos

- NodeJS >= 14
- Visual studio code (Opcional)
- instalar Azure functions cli
  `npm install -g azure-functions-core-tools`
- instalar Azure Cosmos DB Emulator
  - [download](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator?tabs=ssl-netstd21)
- instalar Microsof Azure Storage Explorer
  - [download](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator)
- instalar extensão Azurite no Visual Studio Code

## Executar

- DB
  - acessar: C:\Program Files\Azure Cosmos DB Emulator
  - executar: Microsoft.Azure.Cosmos.Emulator.exe /EnableMongoDbEndpoint=3.6
- Storageazu
  - habilitar extensão Azurite no VsCode
  - ``f1` para abrir a paleta de comandos Azurite
  - Selecionar opção Azurite: Start
- Serverless API - Azure Functions
  - clonar projeto (url)
  - acessar pasta do projeto
  - executar: `npm install`
  - executar: `func host start`
- Frontend
  - clonar projeto (url)
  - acessar pasta do projeto
  - executar: `npm install`
  - executar: `npm run start`
  - **Teste**
    - submeter uma mensagem com arquivo
    - checar se mensagem foi salva no banco com link da imagem
    - checar se arquivo foi salvo no Azure Storage Explorer
    - checar se recebeu o email numa conta definida como envio

# Levantamento de estórias

## Fluxos MACRO

1. ENVIO DE NOTIFICAÇÃO SEM ARQUIVO
   - **a refinar**
2. ENVIO DE NOTIFICAÇÃO COM ARQUIVO
   - **a refinar**
3. LEITURA DE HISTORICO DE NOTIFICAÇÕES
   - **a refinar**

## Estórias - BACK-END FUNCTIONS

- **Setup Inicial**
  - start de projeto com azure functions
  - definição de estrutura de pastas e padrões
  - configurações de lint e typescript
- **Criação da function BLOB TRIGGER** - função para persistir no banco o link do arquivo quando submetido no blobstorage

  - startar função
  - configurar conexão com blob storage (local inicialmente)
  - implementar trigger para disparar uma ação quando o blob for persistido

- **Criação da function HTTP TRIGGER - POST** - função para persistir dados da notificação submetida
  - startar função
  - implementar "end-point" da notificação
    - POST
    - deve receber informações da notificação (estrutura do body a definir)
- **Criação da function HTTP TRIGGER - GET** - função que irá retornar notificações já persistidas
  - startar função
  - implementar "end-point" da notificação
    - POST
    - deve receber informações da notificação (estrutura do body a definir)
- **DB**

  - implementar camada para comunicação com DB
  - implementar persistencia de dados da notificação **CREATE**
  - implementar persistencia de dados da notificação **UPDATE**

- **Integrações**

  - **HTTP TRIGGER - POST => DB**
    - persistir dados da notificação no banco ao receber uma requisição
  - **HTTP TRIGGER - GET => DB**
    - retornar histórico de notificações persistidas no DB
  - **BLOB TRIGGER => DB**
    - persistir link do arquivo da notificação no DB
    - OBS. após o link ser salvo, o front irá executar uma chamada HTTP com as demais informações da notificação
  - **HTTP TRIGGER => FIREBASE (SDK ADMIN)**
    - enviar push notification da notificação recebida na requisição

- **Deploy das functions**
  - Criar/configurar recurso na Azure
    - DB
    - BLOB STORAGE
  - Configurar conexão de functions com recusrsos da Azure

## Estórias - BACK-END BFF

- Endpoint para autenticação dos usuários que irão enviar mensagens
- Endpoint para retornar lista de usuários: todos e por perfil (RCA, GT, GV)
  - **campos essenciais a retornar**: id, nome, perfil

## Estórias - FRONT-END PORTAL MENSAGERIA

- **Estórias de layout a refinar**

- **Integrações**
  - Integração com API BFF
    - autenticação
    - buscar lista de usuários
  - Integração com AZURE BLOB STORAGE via **AZURE SDK**
    - submeter arquivos
  - Integração com function HTTP TRIGGER para persistir dados da notificação
    - http POST request (axios)
  - Integração com function HTTP TRIGGER para retornar histórico de notificações
    - http GET request (axios)

## Estórias - FRONT-END APP MARTINS FORÇA DE VENDAS

- **Estórias de layout a refinar**

- **Integrações**
  - Integração com function HTTP TRIGGER para retornar histórico de notificações
    - http GET request (axios)

# LINKS ÚTEIS

- https://www.youtube.com/watch?v=SC4-_ZwjlR4&t=2s&ab_channel=ServerlessonAzure

- https://www.youtube.com/watch?v=zYb5sVQgUN4&ab_channel=ServerlessonAzure

- https://firebase.google.com/docs/admin/setup

- **DB SCHEMA MODELING**

  - https://docs.mongodb.com/manual/core/data-modeling-introduction/
