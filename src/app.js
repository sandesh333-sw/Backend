import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// basic configurations for our app
app.use(express.json({ limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

//cors configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["http://localhost:5173"],   
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

//import Routers
import { healthCheckRouter } from "./routes/healthCheck.js";
import authRouter from "./routes/auth.routes.js";


app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

export default app;