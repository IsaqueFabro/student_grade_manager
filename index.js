// importa o módulo 'http' do Node.js, usado para criar servidores web
import http from "http";
// importa a função v4 da biblioteca 'uuid', usada para gerar IDs únicos
import { v4 } from "uuid";

// define a porta onde o servidor vai escutar as requisições
const port = 3000;
// array simulando um "banco de dados" com notas de alunos
const grades = [];

// cria o servidor HTTP
const server = http.createServer((request, response) => {
  const { method, url } = request;
  let body = "";

  request.on("data", (chunk) => {
    body += chunk.toString();
  });

  request.on("end", () => {
    const id = url.split("/")[2];

    // rota GET /grades
    if (url === "/grades" && method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(grades));
    }

    // rota POST /grades
    else if (url === "/grades" && method === "POST") {
      try {
        const { studentName, subject, grade } = JSON.parse(body);

        const newGrade = {
          id: v4(),
          studentName,
          subject,
          grade,
        };

        grades.push(newGrade);

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newGrade));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: "invalid JSON body" }));
      }
    }

    // rota DELETE /grades/:id
    else if (url.startsWith("/grades/") && method === "DELETE") {
      const index = grades.findIndex((g) => g.id === id);

      if (index !== -1) {
        const deleted = grades.splice(index, 1);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(deleted[0]));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Grade not found" }));
      }
    }

    // rota não encontrada
    else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Route not found" }));
    }
  });
});

// inicia o servidor e escuta na porta especificada
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
