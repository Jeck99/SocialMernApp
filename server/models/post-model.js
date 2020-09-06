const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        name: { type: String, required: true },
        text: { type: String, required: true },
        time: { type: [String], required: true },
        likes: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('posts', Post)