import mongoose from "mongoose";

const SchemeFloors = new mongoose.Schema({
    id: {type: Number, required: true},
    points: {type: String, required: true},
    name: {type: String, required: false},
    floor: {type: Number, required: true}
})


export default mongoose.model('SchemeFloors', SchemeFloors);