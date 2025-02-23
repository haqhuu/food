import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_DATABASE,
            authSource: process.env.DB_AUTHENTICATION_DATABASE
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
