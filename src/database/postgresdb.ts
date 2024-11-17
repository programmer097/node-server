const { Client } = require("pg");

// Connection configuration
const client = new Client({
  host: process.env.POSTGRES_HOST || "localhost", // Replace with your host (e.g., container name if using Docker)
  port: process.env.POSTGRES_PORT || 5432, // Default PostgreSQL port
  user: process.env.POSTGRES_USER || "admin", // Replace with your username
  password: process.env.POSTGRES_PASSWORD || "admin", // Replace with your password
  database: process.env.POSTGRES_DB || "postgres", // Replace with your database name
});

async function connectToDB() {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to PostgreSQL!");

    // Perform queries (example)
    const res = await client.query("SELECT NOW() AS current_time");
    console.log("Current Time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } finally {
    // Disconnect from the database
    await client.end();
    console.log("Disconnected from PostgreSQL.");
  }
}

connectToDB();

module.exports = client;
