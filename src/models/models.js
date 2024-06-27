const mongoose = require("mongoose");
const RoleSchema = require('../schemas/RoleSchema')
const UserSchema = require('../schemas/UserSchema')
const PostSchema = require('../schemas/PostSchema')


const Role = mongoose.model('Role', RoleSchema)
const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)

module.exports = {
    Role,
    User,
    Post
}