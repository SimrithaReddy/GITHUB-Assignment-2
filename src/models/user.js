const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String }
})

const user_info = mongoose.model('user', userSchema)

module.exports = user_info