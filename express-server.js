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
import registerRouter from "./router/auth/register.js";
import loginRouter from "./router/auth/login.js";
import jwt from "jsonwebtoken";
import verifyUserRouter from "./router/auth/verifyUser.js";


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

// const customeMiddleware = (req,res,next) => {
//     console.log(new Date().toString(),"Handling request for",req.url);
//next();
// };

//middleware to authorize the apis
const authApi = (req,res,next) => {
    try{
    const token = req.headers["authorization"];
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if(data.role === "Teacher"){
        next(); 
    } else {
        throw new Error();
    }
}catch(err){
    res.status(403).send({msg: "Unauthorized"});
}
};

const authAllapi = (req,res,next) => {
    try{
        const token = req.headers["authorization"];
        jwt.verify(token,process.env.JWT_SECRET);
        next(); 
    }catch(err){
        console.log(err.message);
       //err
       res.status(403).send({msg:"unauthorized"});
    }
}

//adding middleware to teacger to connect export token to backendend
server.use("/teachers",authApi,teachersRouter);
server.use("/students",authAllapi, studentdBRouter);
server.use("/verify-user",verifyUserRouter)
server.use("/todos",authAllapi,todosRouter);
server.use("/register",registerRouter);
server.use("/login",loginRouter);

const port = 8000;
server.listen(port, () => {
    console.log("server listing on port" + port);
});

