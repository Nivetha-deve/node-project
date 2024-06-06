import express from "express";

const todosRouter = express.Router();

let todos = [
    {
        id:"1",
        name:"sleep",
        isCompleted: false,
  
}
];

todosRouter.get("/", (req,res) => {
    res.send(todos);
});

todosRouter.delete("/",(req,res) => {
    const {id } = req.query;

    todos = todos.filter((td) => td.id!== id);

    res.send({msg: "todos deleted successfully"})
})

export default todosRouter;