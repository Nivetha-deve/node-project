import express from "express";
import { userModel } from "../db-utils/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 import { db } from "../db-utils/mongo-connection.js";

const loginRouter = express.Router();

loginRouter.post("/", async(req,res) => {
      
    const userData = req.body; // email,password
    console.log(userData)

      //check if the user alredy exist
      const UserObj = await userModel.findOne({email: userData.email });

      if (UserObj) {
        //logic to handle succesful login 
        
        //verfiy the password send success message only if the password is correct 

        bcrypt.compare(userData.password,UserObj.password, async(err,result) => {
           //result == true
           if(err){
            res.status(500).send({msg:"something went wrong"})
           } else {
            if(result){
              const collection = db.collection("users");
              const user = await collection.findOne(
                {email:userData.email},
                {
                  projection: {password: 0, __v: 0, _id: 0},
                }
              );

              console.log(typeof user);

               var token = jwt.sign(user, process.env.JWT_SECRET,{expiresIn:"1day"});
               console.log(token);

                res.status(200).send({msg:"user successfully logined", code:1,token});
            } else {
                res.status(400).send({msg:"user creadentials failed", code:0 });
            }
           }
        });

      } else {
        res.status(404).send({msg:"User not found"})
      }
        });

export default loginRouter;