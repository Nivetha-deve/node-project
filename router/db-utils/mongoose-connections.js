import mongoose from "mongoose";

// mongodb+srv://nivetha:Nivetha@028@nivetha.ulb0kpo.mongodb.net/?retryWrites=true&w=majority&appName=Nivetha

const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "tamil-weekend";
const dbUserName = process.env.DB_USER ||"";
const dbPassword = process.env.DB_PASSWORD ||"";

// const localUri = `mongodb://${dbCluster}/${dbName}`;

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

const mongooseConnect= async () => {
    try{
         await mongoose.connect(cloudUri) 
            console.log("mongoose connected successfully")
    }catch(e){
        console.log("ERROR" + e.message);
        process.exit(1);
    }
};

export default mongooseConnect;