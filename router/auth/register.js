import express from "express";
import { userModel } from "../db-utils/models.js";
import bcrypt from "bcrypt";

const registerRouter = express.Router();

registerRouter.post("/", async(req,res) => {
      
    const userData = req.body;
    console.log(userData)

      //check if the user alredy exist
      const UserObj = await userModel.findOne({email: userData.email });

      if (UserObj) {
        res.status(400).send({msg: "User already exists"});
      } else {
        const id = Date.now().toString();
        bcrypt.hash(userData.password,10, async(err,hash) => {
            //store hash in your password
           if(err) {
            res.status(500).send({msg:"please enter the password"});
           } else {
            
            const newUser = await new userModel({
                ...userData,
                password:hash,
                id,
            });
            await newUser.save(); // validates and insert the record 
    
            res.send({msg: "User saved successfully"});
          }
           });
        }
        });

export default registerRouter;