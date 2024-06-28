const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

async function comparePassword(plainTextPassword, encryptedPassword) {
    let doesPasswordMatch = false
    doesPasswordMatch = await bcrypt.compare(plainTextPassword, encryptedPassword)
    return doesPasswordMatch
}

function createJWT(userId) {
    let newJwt = jwt.sign(
        {id: userId},
        process.env.JWT_KEY,
        {expiresIn: "7d"}
    )
    return newJwt
}

function validateJwt(jwtToValidate){
    let isJwtValid = false
    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJwt) => {
        if (error) {
            throw new Error ("User JWT is not valid")
        }

        console.log(decodedJwt)
        isJwtValid = true
    })
    return isJwtValid
}

module.exports = {
    comparePassword,
    createJWT,
    validateJwt
}