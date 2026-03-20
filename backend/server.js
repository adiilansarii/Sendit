import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();
connectDB(); // Establishes MongoDB connection

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));