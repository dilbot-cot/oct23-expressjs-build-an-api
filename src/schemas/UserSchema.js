const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

UserSchema.pre(
    "save",
    async function (next) {
        const user = this;
        console.log("Pre-save hook running.")

        if (!user.isModified("password")) {
            return;
        }
        console.log('Pre-save hook running and password is modified')

        console.log('Raw password is ' + this.password)

        const hash = await bcrypt.hash(this.password, 10)

        console.log("Hashed and encypted and salted passowrd is: " + hash)

        this.password = hash

        next()

    }
)

module.exports = UserSchema