//student apis with DB connection

import express from "express";
import { db } from "./db-utils/mongo-connection.js";

const studentdBRouter = express.Router();

studentdBRouter.get("/",async (req,res) => {
    const collection=db.collection("students");

    const data = await collection.find({}).toArray();

    res.send(data);
});

//Insert a new student into Db

studentdBRouter.post("/", async(req,res) => {
    const {body} =req;
    const collection = db.collection("students");
    await collection.insertOne({
        ...body,
        id: Date.now().toString(),
        teacherId: null,
    })
    res.send({msg:"inserted successfully"})
});

studentdBRouter.put("/:studentId", async (req,res) => {
    const {studentId} =req.params;

    const {body} = req;
    if(Object.keys(body).length>0) {
        await db.collection("students").updateOne({id: studentId}, {$set: {...body,id: studentId}});
        res.send({msg:"update student successfully"});
    } else {
        res.send(400).send({msg:"please enter student data"})
    }
});

studentdBRouter.delete("/:studentId", async (req,res) => {
    const {studentId} = req.params;
   const studObj = await db.collection("students").findOne({id: studentId});
   if(studObj){
    await db.collection("students").deleteOne({id:studentId});
    res.send({msg:"deleted successfully"});
   } else {
    res.status(404).send ({msg:"deleted successfully"});
   }
});

studentdBRouter.patch("/assign-teacher/:studentId", async(req,res) => {
    const {body} = req;
    const {teacherId} = body;
    const {studentId} = req.params;

    //check whether the student exits
    const stuObj = await db.collection("students").findOne({id:studentId})
    const teachObj = await db.collection("teachers").findOne({id:teacherId})

    if(stuObj && teachObj) {
        //update the teacher in student collection
        await db.collection("students").updateOne({id:studentId}, {$set: {teacherId}});

        //add student in teacher collection
        await db.collection("teachers").updateOne({id:teacherId}, {$set:{students:[...teachObj.students, studentId]}});
        res.send({msg:"teacher assigned successfully"})
    } else{
        res.status(400).send({msg:"please check student $ teacher details"})
    }
});

export default studentdBRouter;



//deloy url
//  mongodb+srv://nivetha:Nivetha@028@nivetha.ulb0kpo.mongodb.net/?retryWrites=true&w=majority&appName=Nivetha

//mongodb+srv://nivetha:<password>@nivetha.ulb0kpo.mongodb.net/?retryWrites=true&w=majority&appName=Nivetha