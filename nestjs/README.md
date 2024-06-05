## Começando

### Pré-requisitos

- Node.js/versao 20
- Docker
- MongoDB

### Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/jonathanvinicius/challenge_casar
   cd nestjs

2. Execute os containeres da aplicacao 
  ```bash
  docker compose up -d

3. Execute a aplicacao
   ```
   npm run start:dev

## Stack Usada

- **Backend:** Node.js, NestJS
- **Banco de Dados:** MongoDB
- **Testes:** Nao realizado

## Swagger
Para acessar o swagger da aplicacao basta acessar o localhost:3000/docs

## Endpoints Iniciais

### Usuários

- **GET /users:** Lista todos os usuários

### Postagens

- **GET /posts:** Lista todas as postagens
- **POST /posts:** Cria uma nova postagem

### Seguidores

- **POST /followers/:userId/:followerId:** Cria uma nova relação de seguidor

## Páginas Críticas

1. **Página Inicial:** A página inicial exibirá as postagens mais acessadas.
2. **Página de Listagem de Usuários:** A primeira página que os usuários veem ao fazer login será uma listagem de todos os usuários.