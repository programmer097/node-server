import { MongoClient } from "mongodb";

const uri = `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}`;
const mongoClient = new MongoClient(uri);

async function run() {
  try {
    await mongoClient.connect();
    console.log("Connected successfully to MongoDB!!");
  } catch (err: any) {
    console.error(err.stack);
  } finally {
    await mongoClient.close();
  }
}

run().catch(console.dir);

process.on("SIGINT", async () => {
  console.log("Closing PostgreSQL pool...");
  await mongoClient.close();
  process.exit(0);
});

module.exports = { mongoClient };
