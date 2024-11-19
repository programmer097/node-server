import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import { authenticateToken } from "./middleware/auth";

dotenv.config();

// const { postgresClient } = require("./database/postgresdb");
// const { redisClient } = require("./database/redis");
require("./database/mongoose");
// Create an Express application
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", authenticateToken, userRoutes);
app.use("/task", authenticateToken, taskRoutes);

// Define a route for the root path ('/')
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

// app.get("/redis", async (req: Request, res: Response) => {
//   // Send a response to the client
//   redisClient.set("get", "Hello, TypeScript + Node.js + Express!");

//   res.send("Hello, Redis!");
// });

// // Define a route for the root path ('/')
// app.get("/postgres", async (req: Request, res: Response) => {
//   // Perform queries (example)
//   try {
//     // Perform queries (example)
//     const result2 = await postgresClient.query("SELECT NOW() AS current_time");
//     console.log("Current Time:", result2.rows[0]);
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL:", error);
//   }

//   res.send("Hello, Postgres!");
// });

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});
