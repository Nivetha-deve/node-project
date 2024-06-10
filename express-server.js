import express from "express";
import cors from "cors";                          
// import teacherRouter from "./router/teacher.js";
import teachersRouter from "./router/teachersRouter.js";
// import studentRouter from "./router/student.js";
import studentdBRouter from "./router/studentRouter.js";
import todosRouter from "./router/todos.js";
import connectToDb from "./router/db-utils/mongo-connection.js";
import mongooseConnect from "./router/db-utils/mongoose-connections.js";
import dotenv from "dotenv";


dotenv.config();
console.log(process.env);

const server = express();

await connectToDb();
await mongooseConnect();

 server.use(express.json());
//  server.use(cors());

// server.use(cors());

server.use(cors());

 server.post("/create-file",() => {

 });

server.get("/", (req,res) => {
    res.send("<h1>welcome this backend</h1>");
});

server.post('/',(req,res) => {
 const {body} =req;
 console.log(body);
 res.send({ message: "post method called" })
});

server.put("/",(req,res) => {
    const {body} =req;
    console.log(body);
   res.send({message: "put is working" })
});

server.delete("/",(req,res) => {
  const {body} =req;
  console.log(body);
  res.send({message: "delete the data"})
});

server.use("/teachers",teachersRouter);
server.use("/students",studentdBRouter);
server.use("/todos",todosRouter);

const port = 8000;
server.listen(port, () => {
    console.log("server listing on port" + port);
});

