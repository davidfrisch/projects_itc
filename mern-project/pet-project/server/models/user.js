import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    authId: { type: String, required: true },
    email: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    bio: { type: String },
    listOfPetsAdopted: { type: [String] },
    listOfPetsFostered: { type: [String] },
    listOfPetsSaved: { type: [String] },
    picture: '',
    role: { type: Number },
    lastConnection: { type: Date },
    ip: { type: String },
    signUpDate: { type: Date, required: true }
});




export default mongoose.model("User", userSchema);