import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("❌ Please define MONGODB_URL in .env file");
}

let connected = false;

export async function connectDB() {
  if (connected) return;

  try {
    const conn = await mongoose.connect(MONGODB_URL||"");

    connected = true;
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}
