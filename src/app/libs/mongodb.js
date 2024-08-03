import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        console.log("failed to connect to MongoDB");

    }
}
export default connectMongoDB;