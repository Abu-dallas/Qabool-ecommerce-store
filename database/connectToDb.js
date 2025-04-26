import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb already Conneted");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Qabool",
    });
    isConnected = true;
    console.log("MongoDb is Connected");
  } catch (error) {
    console.log(["Connect_to_DB_error"], error);
    return;
  }
};
