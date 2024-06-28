const {Post} = require('../models/models')

// return all documents in the collection
async function getAllPosts(){
    return await Post.find({}).exec()
}

async function getPostById(postId) {
    return await Post.findById(postId).exec()
}

async function getPostsByAuthor(userId) {
    return await Post.find({author: userId}).exec()
}

async function createPost(postDetails){
    return await Post.create(postDetails)
}

async function updatePost(postDetails){
    return await Post.findByIdAndUpdate(postDetails.postId, postDetails.updatedData, {returnDocument: 'after'}).exec()
}

async function deletePost(postId){
    return await Post.findByIdAndDelete(postId).exec()
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
}