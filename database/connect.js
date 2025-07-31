import mongoose from "mongoose";
 const connect = async () => {
    console.log("Connecting to MongoDB...");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw new Error("Connection failed!");
    }finally
    {
        console.log("Connected to finnal  MongoDB.");
    }
};

export default connect;