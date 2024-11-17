import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";

dotenv.config();

import "./database/db";
import "./database/postgresdb";
const RedisClient = require("./database/redis");

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Define a route for the root path ('/')
app.get("/", (req: Request, res: Response) => {
  // Send a response to the client
  RedisClient.set("get", "Hello, TypeScript + Node.js + Express!");
  res.send("Hello, TypeScript + Node.js + Express!");
});

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});
