import mongoose from "mongoose";

const CabData = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    top: { type: Number, required: true },
    left: { type: Number, required: true },
    description: { type: String, required: true },
    manager:{type:[String],required :true},
    tags:{type:[String],required :true},
    floor:{type :Number ,required :true},
    fontsize:{type :Number ,required :true},
    type:{type :Number ,required :true},
    imgName:{type :String ,required :false},   //добавлено для кабинета 438
    pol:{type :String ,required :false}       //добавлено для WC

});

export default mongoose.model('CabData', CabData);