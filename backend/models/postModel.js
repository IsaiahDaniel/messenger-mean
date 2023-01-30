const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    image: {
        type: String,
        required: [true, "image Path is required"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model("post", postSchema);