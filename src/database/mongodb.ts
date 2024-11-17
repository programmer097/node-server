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

module.exports = { mongoClient };
