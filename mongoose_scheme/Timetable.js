import mongoose from "mongoose";


const Timetable = new mongoose.Schema({
    num: {
        type: Number,
        required: true,
    },
    letter: {
        type: String,
        required: true,
    },
    dayId: {
        type: Number,
        required: true,
    },
    timetable: [{
        subject: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        time: {
            type: String,
            required: false
        },
        num: {
            type: Number,
            required: true
        },
        group: {
            type: String,
            required: false
        }
    }]
});

export default mongoose.model('Timetable', Timetable);