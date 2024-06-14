import express from "express";
import { students, teachers } from "./local-variables.js";

const teacherRouter = express.Router();

//teacher get all teachers

teacherRouter.get("/", (req,res) => {
const {studentId} = req.query;

if(studentId){
  const teacherData = teachers.filter((t) => t.students.includes(studentId))
}else{
    res.send(teachers);
}

    res.send(teachers);
});

teacherRouter.get("/get-students/:teacherId", (req,res) => {

    const {teacherId} = req.params;

    const studentsData = students.filter(stu => stu.teacherId === teacherId);

    if(teacherId){
        res.send({studentsData})
    }else{
      res.send({teachers})
    }
});

teacherRouter.post("/",(req,res) => {
    const {body} = req;

    teachers.push({
        id:Date.now().toString(),
        ...body,
    })
    res.send(teachers);
});

teacherRouter.put("/:teacherId",(req,res) => {
    const {teacherId} =req.params;
     const {body} =req;
     teachers.push({
        id:Date.now().toString(),
        ...body,
     })
    res.send(teachers);
});

teacherRouter.delete("/:teacherId",(req,res) => {
    const {teacherId} =req.params;
    const {body} =req;
    if(Object.keys(body).length>0){
    const index = teacherId.findIndex((t) => t.id === teacherId);
    teachers[index] ={
        ...body,
        id:teacherId,
    };
    res.send({msg: "update student successfully"});
}else{
 res.status(400).send({msg:"please enter student data"})
}
});
export default teacherRouter ;