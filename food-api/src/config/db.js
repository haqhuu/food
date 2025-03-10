import mongoose from "mongoose";
import Ingredient from "../models/Ingredient.js";

// mongodb+srv://<db_username>:<db_password>@cluster0.hoqsvah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// await mongoose.connect(`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}@cluster0.hoqsvah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
// DB_HOST = food - mongodb
// DB_PORT = 27017
// DB_DATABASE = food
// DB_USERNAME = food
// DB_PASSWORD = food
// DB_AUTHENTICATION_DATABASE = food
// DB_AUTHENTICATION_MECHANISM = SCRAM - SHA - 256

const connectDB = async () => {
    try {

        await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=${process.env.DB_AUTHENTICATION_DATABASE}`, {
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_DATABASE,
            authSource: process.env.DB_AUTHENTICATION_DATABASE
        });


        console.log(`

        ______  _   _  _   __ _____ 
        |  ___|| | | || | / /|  ___|
        | |_   | | | || |/ / | |__  
        |  _|  | | | ||    \ |  __| 
        | |    | |_| || |\  \| |___ 
         \_|     \___/ \_| \_/\____/ 
                                    
`);


        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
