import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(String(process.env.MONGODB_URI));
        console.log('Database connected');
    } catch (error) {
        console.log(error)
    }
}

export default connect;