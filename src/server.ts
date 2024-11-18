import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import session from "express-session";

dotenv.config();

// const { mongoClient } = require("./database/mongodb");
// const { postgresClient } = require("./database/postgresdb");
const { redisClient } = require("./database/redis");
import passport from "./middleware/passport";
import passportRoutes from "./routes/passport.route";

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // For form parsing
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/passport", passportRoutes);

// Define a route for the root path ('/')
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.get("/redis", async (req: Request, res: Response) => {
  // Send a response to the client
  redisClient.set("get", "Hello, TypeScript + Node.js + Express!");

  res.send("Hello, Redis!");
});

// app.get("/mongo", async (req: Request, res: Response) => {
//   await mongoClient.connect();
//   const db = mongoClient.db("admin");
//   const coll = db.collection("test");
//   const result = await coll.insertOne({ value: "hello mongodb" });
//   console.log("result", result);

//   res.send("Hello, MongoDB!");
// });

// Define a route for the root path ('/')
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
