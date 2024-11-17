import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";

dotenv.config();

const { mongoClient } = require("./database/mongodb");
const PostresClient = require("./database/postgresdb");
const RedisClient = require("./database/redis");

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Define a route for the root path ('/')
app.get("/", async (req: Request, res: Response) => {
  // Send a response to the client
  RedisClient.set("get", "Hello, TypeScript + Node.js + Express!");

  await mongoClient.connect();
  const db = mongoClient.db("admin");
  console.log("db", db);
  const coll = db.collection("test");
  console.log("collection", coll);
  const result = await coll.insertOne({ value: "hello mongodb" });
  console.log("result", result);
  res.send("Hello, TypeScript + Node.js + Express!");
});

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});
