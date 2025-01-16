import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database successfully");

    } catch (error) {
        console.log("Server error: " + error.message || error);

    }
}

export default connectDB;