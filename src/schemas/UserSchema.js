const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    country: String,
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }
})

module.exports = UserSchema