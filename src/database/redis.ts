import { createClient, RedisClientType } from "redis";

// Create a Redis client
const client = createClient({
  url: `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`, // Corrected the typo here
});

client.on("connect", () => {
  console.log("Connected to Redis");
  client.set("set", "connected");
});

client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

// Gracefully shut down the Redis client when the app shuts down
process.on("SIGINT", async () => {
  await client.quit(); // Properly close the Redis connection
  console.log("Redis client closed");
  process.exit();
});

// Connect the client
client.connect();

module.exports = client;
