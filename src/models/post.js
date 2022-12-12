const mongoose = require('mongoose')
// mongoose.set('strictQuery', false)

const id = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    image: { type: String },
    user: { type: id, ref: "user" }
})
// Schema.ObjectId;

const post = mongoose.model('posts', postSchema)

module.exports = post