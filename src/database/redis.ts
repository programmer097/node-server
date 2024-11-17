import { createClient } from "redis";

// Create a Redis client
function connectRedis() {
  try {
    const client = createClient({
      url: "redis://localhost:6379", // Corrected the typo here
    });

    client.on("connect", () => {
      console.log("Connected to Redis");
    });

    client.on("error", (err) => {
      console.error("Error connecting to Redis:", err);
    });

    // Connect the client
    client.connect();
  } catch (error) {
    console.log("Error:", error);
  }
}

connectRedis();
