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
  - [clonar front-end](https://github.com/ramonprata/azure-functions-front-end)
  - acessar pasta do projeto
  - executar: `npm install`
  - executar: `npm run start`
  - **Teste**
    - submeter uma mensagem com arquivo
    - checar se mensagem foi salva no banco com link da imagem
    - checar se arquivo foi salvo no Azure Storage Explorer
    - checar se recebeu o email numa conta definida como envio

# Help

# Docs

- [Criar azure functions com extensão do VSCode](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript)
- [Criar azure functions com azure CLI](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?tabs=azure-cli%2Cbrowser)

# Azure Functions vídeos

- [HttpTrigger](https://www.youtube.com/watch?v=zYb5sVQgUN4&ab_channel=ServerlessonAzure)
- [BlobTrigger](https://www.youtube.com/watch?v=SC4-_ZwjlR4&t=13s&ab_channel=ServerlessonAzure)

# Integrações

- [Firebase admin](https://firebase.google.com/docs/admin/setup)
