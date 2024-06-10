import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// const dbUserName="Nivethashree"
// const dbPassword="2wvS4TDr096HPwuB"
// const dbCluster="nivetha.ulb0kpo.mongodb.net"
// const dbName="tamil-weekend"


const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "tamil-weekend";
const dbUserName = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

//const cloudUri = `mongodb+srv://Nivethashree:2wvS4TDr096HPwuB@nivetha.ulb0kpo.mongodb.net/tamil-weekend?retryWrites=true&w=majority&appName=Nivetha`;

//const cloudUri =`mongodb+srv://Nivethashree:2wvS4TDr096HPwuB@nivetha.ulb0kpo.mongodb.net/tamil-weekend?retryWrites=true&w=majority&appName=Nivetha`

const client = new MongoClient(cloudUri);

const db = client.db(dbName);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log("DB mongoo connected successfully");
    } catch (err) {
        console.log("Error occurred: ", err);
        process.exit(1);
    }
};

export { db };
export default connectToDb;        




// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const dbCluster = process.env.DB_CLUSTER;
// const dbName = process.env.DB_NAME ;
// const dbUserName = process.env.DB_USER ;
// const dbPassword = process.env.DB_PASSWORD ;

// const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

// const client = new MongoClient(cloudUri);

// const connectToDb = async () => {
//     try {
//         await client.connect();
//         console.log("DB connected successfully");
//     } catch (err) {
//         console.error("Error occurred: ", err);
//         process.exit(1);
//     }
// };

// const db = client.db(dbName);

// export { db };
// export default connectToDb; 


