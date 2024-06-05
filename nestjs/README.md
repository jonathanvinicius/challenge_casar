## Começando

### Pré-requisitos

- Node.js/versão 20
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
   ```bash
   npm run start:dev

4. Importar a collection do postman disponibilizada no diretório collection

## Stack Usada

- **Backend:** Node.js, NestJS
- **Banco de Dados:** MongoDB
- **ORM:** Mongoose
- **Testes:** Não realizado

## Swagger
Para acessar o swagger da aplicacao basta acessar o localhost:3000/docs

## Endpoints Iniciais

### Usuários

- **GET /users:** Lista o usuário e suas respectivas postagens, seguidores.

### Postagens

- **GET /posts:** Lista todas as postagens
- **POST /posts:** Cria uma nova postagem

### Seguidores

- **POST /followers/:userId/:followerId:** Cria uma nova relação de seguidor

