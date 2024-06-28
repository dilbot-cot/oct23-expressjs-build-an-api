const express = require('express')
const { User } = require('../models/models')
const { createJWT } = require('./UserFunctions')
const router = express.Router()

// Sign-up new user
router.post('/sign-up', async (request, response) => {
    try {
        let userDetails = {
            email: request.body.email,
            password: request.body.password,
            username: request.body.username,
            country: request.body.country,
            role: request.body.role,
        }
        // Check if user email already enrolled
        const existingUser = await User.findOne({email: userDetails.email})
        if (existingUser) {
            return response.status(400).json({
                message: "User with this email already exists"
            })
        }
        const newUser = new User(userDetails)
        await newUser.save()

        // create JWT
        const token = createJWT(newUser._id)

        // send the response
        response.status(201).json({
            message: `User ${newUser.username} created successfully`,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                country: newUser.country,
                role: newUser.role
            },
            token: token
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

module.exports = router