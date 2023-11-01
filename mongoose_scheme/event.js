import mongoose from "mongoose";

const Event = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        dateStart: {
            type: Date,
            required: true,
        },
        dateEnd: {
            type: Date,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
    }
);

export default mongoose.model('Event', Event)


//Бд события:
// Цвет темы,
// Название,
// Описание,
// Фото,
// Дата + время начала,
// Дата + время конец,
// X координата,
// Y координата,
// Этаж