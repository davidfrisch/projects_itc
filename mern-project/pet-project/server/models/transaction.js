import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    timestamp: { type: Date, required: true },
    userId: { type: String },
    petId: { type: String },
    action: { type: String }
});


export default mongoose.model("Transaction", transactionSchema);