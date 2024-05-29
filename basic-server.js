import http from 'http';

const server = http.createServer((req,res) => {
    res.end(JSON.stringify({ message: "Hello world"}));
});

const port = 8000;

server.listen(port,()=>{
    console.log("server listening on",port);
});