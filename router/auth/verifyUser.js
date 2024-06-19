import jwt from "jsonwebtoken";
import express from "express";
import { userModel } from "../db-utils/models.js";

const verifyUserRouter = express.Router();

verifyUserRouter.post("/", async(req, res) => {
    const {token} = req.body;
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET);

         await userModel.updateOne(
            { email: data.email },
            {
              $set: { isVerified: true },
            }
        );

    res.send({ msg:"User verified successfully", code:1 });
    } catch (err) {
      res.status(403).send({msg: "failed User verification", code: -1});
    } 
});

export default verifyUserRouter;