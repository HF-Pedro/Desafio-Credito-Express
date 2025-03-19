
# API de Gestão de Usuários

Este é um projeto simples de API RESTful para gerenciamento de usuários, desenvolvido utilizando Node.js, Express.js, TypeScript, PostgreSQL e autenticação via JWT. A API permite o cadastro, login de usuários, além da listagem de usuários autenticados com CPF anonimizado.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT (JSON Web Token)
- Prisma (ORM)
- Jest (Testes Unitários)
- Docker

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Passo 1: Clonar o Repositório

Clone este repositório para a sua máquina:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Passo 2: Subir o Banco de Dados e o Servidor

Este projeto utiliza Docker para facilitar o processo de configuração do banco de dados. Você pode subir o banco e o servidor com o Docker Compose:

```bash
docker-compose up
```

Isso irá criar e iniciar os containers necessários, incluindo o banco de dados PostgreSQL.

### Passo 3: Instalar as Dependências

Com o banco de dados em funcionamento, instale as dependências do projeto:

```bash
npm install
```
### Passo 4: Criar o arquivo .env

A partir o arquivo .env.example, crie um.env com as informações presentes

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db"
JWT_SECRET=""
```

### Passo 5: Rodar o Servidor

Agora, você pode rodar o servidor localmente:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### Passo 6: Rodar os Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
npm test
```

---

## Endpoints da API

### 1. **Autenticação**

#### POST /register

- **Descrição**: Cadastra um novo usuário.
- **Parâmetros**:
  - `name`: Nome do usuário.
  - `email`: E-mail do usuário.
  - `password`: Senha do usuário (deve ser armazenada de forma segura, utilizando hash).
  - `cpf`: CPF do usuário
- **Resposta**:
  - Retorna uma mensagem de sucesso ou erro.
  
Exemplo de corpo de requisição:

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senhaSegura123"
  "cpf": "12345678901"
}
```

#### POST /login

- **Descrição**: Realiza o login do usuário e retorna um token JWT.
- **Parâmetros**:
  - `email`: E-mail do usuário.
  - `password`: Senha do usuário.
- **Resposta**:
  - Retorna um JWT válido se a autenticação for bem-sucedida.
  
Exemplo de corpo de requisição:

```json
{
  "email": "joao@exemplo.com",
  "password": "senhaSegura123"
}
```

Resposta:

```json
{
  "token": "jwt_token_aqui"
}
```

---

### 2. **Gestão de Usuários**

#### GET /users

- **Descrição**: Retorna uma lista de todos os usuários cadastrados, apenas para usuários autenticados.
- **Autenticação**: Requer um token JWT válido no cabeçalho `Authorization` da requisição (ex: `Bearer <token>`).
- **Resposta**:
  - Retorna a lista de usuários com os campos `name`, `email`, e o `cpf` anonimizado (ex: `***.456.789-00`).

Exemplo de resposta:

```json
[
  {
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "cpf": "***.456.789-00"
  },
  {
    "name": "Maria Oliveira",
    "email": "maria@exemplo.com",
    "cpf": "***.123.456-78"
  }
]
```

---



