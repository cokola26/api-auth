import mongoose from "mongoose";
//import "dotenv/config";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(`Mongo DB connection error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;