const mongoose = require('mongoose')
// mongoose.set('strictQuery', false)

const postSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    image: { type: String },
    user: { type: mongoose.Schema.ObjectId, ref: "user" }
})
// Schema.ObjectId;

const post = mongoose.model('posts', postSchema)

module.exports = post