import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "PrimePlaceEstate API is running" });
});

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});