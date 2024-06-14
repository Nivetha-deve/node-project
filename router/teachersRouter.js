import express from "express";
import {teacherModel} from "./db-utils/models.js";
const teachersRouter = express.Router();

teachersRouter.get("/", async (req,res) => {
    try{ 

       const teachers = await teacherModel.find();
        res.send(teachers);
    }catch(err){
        console.log("error:",err)
        res.status(500).send({msg:"something went wrong"});
    }
});

teachersRouter.post("/", async (req,res) => {
    const{body} = req;
    try{
        //validate a payload for the teacher model
        const newTeacher = await new teacherModel({
            ...body,
            id:Date.now().toString(),
        });
        await newTeacher.save();  // validate and insert the record
        res.send({msg: "teacher create successfully"});
    }catch(err){
        console.log("error:", err);
        res.status(500).send({msg:"somethig went wrong"});
    }
});

teachersRouter.put("/:teacherId", async(req,res) => {
    const {body} =req;
    const {teacherId} = req.params;
    try{
        const teacherObj ={
            ...body,
            id:teacherId,
        };
        //validates a payload for the teacher model
        await new teacherModel(teacherObj).validate();//validate manually

        await teacherModel.updateOne({id:teacherId}, {$set: teacherObj});
        res.send({msg:"teacher saved successfully"});
        }catch(err){
            console.log("error:", err);
            res.status(500).send({msg:"something went wrong"});
        }
});

teachersRouter.delete("/:teacherId", async(req,res) => {
    const {teacherId} = req.params;
    try{
        await teacherModel.deleteOne({id:teacherId});
        res.send({msg:"teacher saved successfully"});
        }catch(err){
            console.log("error:", err);
            res.status(500).send({msg:"something went wrong"});
        }
})


export default teachersRouter;