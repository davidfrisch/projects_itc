import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    googleId: { type: String }
});


export default mongoose.model("Auth", authSchema);