import { createClient, RedisClientType } from "redis";

// Create a Redis client
const redisClient = createClient({
  url: `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`, // Corrected the typo here
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
  redisClient.set("set", "connected");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

redisClient.on("end", () => {
  console.log("Redis client disconnected");
});

// Gracefully shut down the Redis client when the app shuts down
process.on("SIGINT", async () => {
  await redisClient.quit(); // Properly close the Redis connection
  console.log("Redis client closed");
  process.exit();
});

// Connect the client
redisClient.connect();

module.exports = { redisClient };
