import http from 'http'

const port = 3000

const server = http.createServer((request, response) => {
    // funcoes do back
})


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
