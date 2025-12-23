import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URL);

    await mongoose.connect(`${process.env.MONGODB_URL}/bg-removal`);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
