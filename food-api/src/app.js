import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import autoLoadRoutes from "./utils/autoLoadRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());

// Load tất cả routes tự động
autoLoadRoutes(app);

// Middleware xử lý lỗi
app.use(errorHandler);

export default app;
