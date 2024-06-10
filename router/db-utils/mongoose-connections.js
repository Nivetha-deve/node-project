
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "tamil-weekend";
const dbUserName = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Nivetha`;

const mongooseConnect = async () => {
    try {
        await mongoose.connect(cloudUri)
        console.log('Mongoose connected successfully');
    } catch (e) {
        console.error('ERROR: ' + e.message);
        process.exit(1);
    }
};

export default mongooseConnect; 