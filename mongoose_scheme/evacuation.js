import mongoose from "mongoose";

const Evacuation = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    deg: { type: Number, required: true },
    floor: { type: Number, required: true }
});

export default mongoose.model('Evacuation', Evacuation);