import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pageCount:{
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    publishDate: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    stockCount: {
        type: Number,
        required: true,
    },
})
export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
