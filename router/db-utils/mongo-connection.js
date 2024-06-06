//  import { MongoClient } from "mongodb";
//  import dotenv from "dotenv";

//  dotenv.config();

//  //Mongo Running URI
// const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
//  const dbName = process.env.DB_NAME || "tamil-weekend";
//  const dbUserName = process.env.DB_USER || "" ;
// const dbPassword = process.env.DB_PASSWORD || "";

// //  const localUri = `mongodb://${dbCluster}/${dbName}`; //(used when used on local)

//   //const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;  

//   const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

//  const client = new MongoClient(cloudUri);

//  const db = client.db(dbName);
// //  console.log("Connection URI: ", cloudUri);

//  const connectToDb = async () => {
//     try{
//         await client.connect();
//         console.log("DB Connect successfully");
//     }catch(err) {
//       console.log("error occured",err);
//       process.exit(1);
//     }
//  };

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "tamil-weekend";
const dbUserName = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

const client = new MongoClient(cloudUri);

const db = client.db(dbName);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log("DB connected successfully");
    } catch (err) {
        console.log("Error occurred: ", err);
        process.exit(1);
    }
};

export { db };
export default connectToDb;
