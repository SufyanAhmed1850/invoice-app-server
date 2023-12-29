import "dotenv/config";
import mongoose from "mongoose";

const db = mongoose.connect(process.env.DB_URI);

export default mongoose;
