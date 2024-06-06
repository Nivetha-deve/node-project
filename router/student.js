import express from "express"; 
import { students, teachers } from "./local-variables.js";                    

const studentRouter = express.Router();

//read
studentRouter.get("/",(req,res) => {
    const {teacherId} = req.query;

    if(teacherId) {
      res.send({
        students: students.filter((stu) => stu.teacherId === teacherId),
    });
  }
  res.send({students}); 
});
//create a new student
studentRouter.post("/",(req,res) => {
   const {body} =req;
   students.push({id: Date.now().toString(), teacherId: null, ...body});
   res.send({message:"created student successsfully"});
});
//update a student
//we need id        

studentRouter.put("/:studentId", (req,res) => {
   const { studentId } = req.params;
   
   const { body } = req;
   if(Object.keys(body).length>0){
   const index= students.findIndex((stu) => stu.id === studentId);
   students[index] = {...body, id:studentId };
   
   res.send({msg: "update student successfully"});
   }else{
    res.status(400).send({msg:"please enter student data"})
   }
});

studentRouter.delete("/:studentId",(req,res) => {
    const {studentId} =req.params;
if(students.filter(stu => stu.id === studentId).length>0){
students = students.filter((stu) => stu.id !== studentId);

   res.send({msg: "Student delted succesfully"})
}else{
    res.status(404).send({msg: "Student empty"})
}
});

//assign a teacher to a student
studentRouter.patch("/assign-teacher/:studentId", (req,res) => {
  const {body} = req;

  const {teacherId} =body;
  const {studentId} =req.params;

  const stuObj = students.find((student) => student.id === studentId);
  const teacherObj = students.find((teacher) => teacher.id === teacherId);

  if(stuObj && teacherObj) {
  const index = students.findIndex((student => student.id === studentId));
  const teacherIndex = teachers.findIndex((teacher) => teacher.id === teacherId)

  students[index].teacherId = teacherId;
  teachers[teacherIndex].students = [...teachers[teacherIndex].students,studentId];

  res.send({msg:"teacher assign successfully"});
  }else{
    res.send(400).send({msg:"please check the stud and teach id"})
  }
}); 

export default studentRouter;