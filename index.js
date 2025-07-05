import { write } from 'fs';
import http, { STATUS_CODES } from 'http'

const port = 3000
const grades = [
    {
        studantName: "Isaque",
        subject: "Mathematics",
        grade: "9.2"
    }
]

const server = http.createServer((request, response) => {
    const { method, url } = request;

    if (url === '/grades' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(grades));
    }else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
