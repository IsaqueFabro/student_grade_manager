# 🎓 Student Grade Manager – Node.js com HTTP Nativo

Este projeto é um **gerenciador de alunos e suas notas**, construído com **Node.js puro**, utilizando o módulo nativo `http`. O principal objetivo é **estudar o funcionamento interno de uma API REST** sem o uso de frameworks como Express ou Fastify. Isso ajuda a entender como as ferramentas modernas funcionam por trás dos panos.

---

## 📌 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- HTTP Module (nativo do Node)
- [VS Code](https://code.visualstudio.com/)

---

## 🎯 Objetivos

- Criar uma API REST simples utilizando apenas Node.js
- Praticar a criação de rotas, métodos HTTP e manipulação de dados
- Entender como os frameworks abstraem funcionalidades do Node puro
- Gerenciar dados de alunos em memória (sem banco de dados inicialmente)

---

## 🧱 Estrutura de pastas

```bash
student-grade-manager/
├── node_modules/
├── src/
│   ├── server.js             # servidor e roteamento
│   ├── controllers/          # lógica das rotas (em breve)
│   ├── utils/                # funções auxiliares (em breve)
├── package.json              # scripts e dependências
└── README.md
```

---

## ⚙️ Como rodar o projeto localmente

### Requisitos

- Node.js instalado
- Terminal e editor de código (VS Code recomendado)

### Passo a passo

```bash
# 1. Criar a pasta e iniciar o projeto
mkdir student-grade-manager
cd student-grade-manager
npm init -y

# 2. Criar o arquivo principal
mkdir src
touch src/server.js

# 3. Rodar o servidor
node src/server.js
```

---

## 🚀 Exemplo básico de servidor

```js
// src/server.js
import http from 'http'

const port = 3000

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Servidor rodando com Node puro!' }))
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
```

---

## ✨ Possibilidades de expansão

- Criar rotas para CRUD de alunos e notas
- Persistir dados em arquivos JSON
- Adicionar autenticação com tokens
- Implementar testes automatizados

---

## ✍️ Autor

Desenvolvido por Isaque Fabro como parte dos estudos sobre como funcionam os servidores HTTP e APIs REST usando apenas Node.js puro.
