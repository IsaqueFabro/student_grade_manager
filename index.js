// importa o módulo 'http' do Node.js, usado para criar servidores web
import http from 'http';
// importa a função v4 da biblioteca 'uuid', usada para gerar IDs únicos
import { v4 } from 'uuid';
// define a porta onde o servidor vai escutar as requisições
const port = 3000;
// array simulando um "banco de dados" com notas de alunos
const grades = [
    {
        studentName: "Isaque", // nome do aluno
        subject: "Mathematics", // matéria
        grade: "9.2" // nota
    }
];

// cria o servidor HTTP
const server = http.createServer((request, response) => {
    // desestrutura o método (GET, POST, etc.) e a URL (rota) da requisição
    const { method, url } = request;
    // variável que irá armazenar os dados enviados no corpo da requisição (usado no POST)
    let body = '';
    // evento 'data' é disparado toda vez que um pedaço (chunk) do corpo da requisição chega
    request.on('data', chunk => {
        body += chunk.toString(); // concatena os pedaços em uma string completa
    });

    // evento 'end' é disparado quando todos os dados da requisição já foram recebidos
    request.on('end', () => {
        // verifica se a requisição é um GET para a rota /grades
        if (url === "/grades" && method === "GET") {
            // define o status da resposta como 200 (OK) e o tipo de conteúdo como JSON
            response.writeHead(200, { "Content-Type": "application/json" });
            // envia a lista de notas convertida para JSON e finaliza a resposta
            response.end(JSON.stringify(grades));
        }

        // verifica se a requisição é um POST para a rota /grades
        else if (url === "/grades" && method === "POST") {
            // transforma o corpo (texto) da requisição em um objeto JavaScript
            const { studentName, subject, grade } = JSON.parse(body);
            // cria um novo objeto de nota com ID gerado automaticamente
            const newGrade = {
                id: v4(), // id único
                studentName, // nome do aluno
                subject, // matéria
                grade // nota
            };
            // adiciona a nova nota ao array
            grades.push(newGrade);
            // define o status 201 (Created) e o tipo de conteúdo
            response.writeHead(201, { "Content-Type": "application/json" });
            // envia o novo objeto criado como resposta
            response.end(JSON.stringify(newGrade));
        }
        // se nenhuma das rotas acima for atendida, retorna 404 (rota não encontrada)
        else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Route not found" }));
        }
    });
});

// inicia o servidor e escuta na porta especificada
server.listen(port, () => {
    // exibe mensagem no terminal informando que o servidor está rodando
    console.log(`Server is running on port ${port}`);
});
