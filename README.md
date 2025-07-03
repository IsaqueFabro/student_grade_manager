# 💰 Finance API – Fastify + Prisma + PostgreSQL

Este projeto é uma **API REST para gerenciamento de clientes e seus ativos financeiros**, construída com **Fastify**, **Prisma ORM** e banco de dados **PostgreSQL**. Ele está em fase de desenvolvimento e tem como objetivo **aprofundar o entendimento prático sobre backend moderno**, organização de código, banco de dados relacional e boas práticas de desenvolvimento.

---

## 📌 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 📁 Estrutura de pastas

```bash
finance-api/
├── node_modules/
├── prisma/
│   └── schema.prisma        # schema do banco (Prisma)
├── src/
│   ├── controllers/         # lógica dos endpoints
│   ├── routes/              # rotas agrupadas
│   ├── services/            # regras de negócio
│   ├── database/            # instância do Prisma
│   ├── middlewares/         # middlewares (em breve)
│   ├── utils/               # funções auxiliares (em breve)
│   └── server.ts            # ponto de entrada do servidor
├── .env                     # variáveis de ambiente
├── package.json             # dependências e scripts
├── tsconfig.json            # config do TypeScript
└── README.md
```

---

## ⚙️ Como rodar o projeto localmente

### 🔸 Requisitos

- Node.js instalado  
- PostgreSQL ou Postico 2 (com banco criado)  
- VS Code  
- Terminal com `npx` e `npm` funcionando  

---

### 🧱 Etapas de configuração

```bash
# 1. Criar o projeto
mkdir finance-api
cd finance-api
npm init -y

# 2. Instalar dependências
npm install fastify prisma @prisma/client fastify-swagger zod
npm install -D typescript tsx ts-node-dev @types/node

# 3. Inicializar TypeScript
npx tsc --init

# 4. Criar script de desenvolvimento
# no package.json:
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}

# 5. Inicializar Prisma
npx prisma init
```

---

### 🌐 Configurar banco de dados

No arquivo `.env`, defina sua URL do banco (ajuste conforme seu Postico):

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/finance?schema=public"
```

---

### 🧬 Modelo do schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Client {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  assets    Asset[]
  createdAt DateTime @default(now())
}

model Asset {
  id        String   @id @default(uuid())
  type      String
  value     Float
  clientId  String
  client    Client   @relation(fields: [clientId], references: [id])
  createdAt DateTime @default(now())
}
```

---

### 🧱 Criar tabelas no banco

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Rodar o servidor

```bash
npm run dev
```

> Acesse: [http://localhost:3333/docs](http://localhost:3333/docs) para ver a documentação gerada automaticamente pelo Swagger.

---

## 📚 Endpoints disponíveis

| Método | Rota     | Descrição               |
|--------|----------|-------------------------|
| GET    | /clients | Lista todos os clientes |
| POST   | /clients | Cria um novo cliente    |

> Em breve: endpoints para Assets, filtros por tipo/período, autenticação, etc.

---

## 🛠️ Exemplo de código – `server.ts`

```ts
import Fastify from 'fastify'
import { clientRoutes } from './routes/clientRoutes'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

const app = Fastify()

app.register(swagger)
app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  }
})

app.register(clientRoutes)

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running at http://localhost:3333')
})
```

---

## 🐘 Usar Postico 2 para visualizar dados

- Crie uma conexão com o mesmo host, usuário e porta definidos no `.env`
- Você verá as tabelas `Client` e `Asset` automaticamente geradas pelo Prisma

---

## 🐳 (Opcional) Usar PostgreSQL via Docker

### `docker-compose.yml`

```yml
version: "3"
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mypass
      POSTGRES_DB: finance
    ports:
      - "5432:5432"
```

```bash
docker-compose up -d
```

---

## ✨ Possibilidades para expandir

- [ ] Autenticação com JWT  
- [ ] CRUD completo para Assets  
- [ ] Validação com Zod  
- [ ] Upload de arquivos  
- [ ] Filtros por tipo, período ou cliente  
- [ ] Dashboard com Next.js  
- [ ] Deploy com Docker + Railway  

---

## ✍️ Autor

Desenvolvido por **Isaque Fabro**, como parte de um estudo aprofundado sobre APIs modernas com Node.js e banco de dados relacional.
