import express from "express";

const server = express();

server.get("/", (req,res) => {
    res.send("<h1>welcome this backend</h1>");
});

const port = 8000;
server.listen(port, () => {
    console.log("server listing on port" + port);
});

