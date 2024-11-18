import mongoose from "mongoose";

const uri = `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}`;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB!!");
  } catch (err: any) {
    console.error(err.stack);
  }
}

run().catch(console.dir);

process.on("SIGINT", async () => {
  console.log("Closing MongoDb connection...");
  await mongoose.connection.close();
  process.exit(0);
});
