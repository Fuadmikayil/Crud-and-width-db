import mongoose from "mongoose";

const MANGO_URI = "mongodb://localhost:27017";
export const connectDB = async () => {
  try {
    if (!MANGO_URI) {
      throw new Error("Plase DB URI is not defened");
    }

    if (mongoose.connection.readyState == 1) {
      return;
    }
    await mongoose.connect(MANGO_URI);
    console.log("DB connected :)");
  } catch (err) {
    console.log("DB NOT Connected! ", err);
    process.exit(1);
  }
};
