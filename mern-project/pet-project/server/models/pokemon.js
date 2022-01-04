import mongoose from "mongoose";

const pokemonSchema = mongoose.Schema({
    idPokedex: { type: Number, required: true },
    name: { type: String, required: true },
    picture: { type: String },
    type: { type: [String], required: true },
    adoptionStatus: { type: String, required: true },
    adoptionOwner: { type: String },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bio: { type: String },
    weaknesses: { type: [String] },
    next_evolution: { type: [Object] },
    prev_evolution: { type: [Object] },
    likeCounter: { type: Number, default: 0 },
});


export default mongoose.model("Pokemon", pokemonSchema, 'pokemon');