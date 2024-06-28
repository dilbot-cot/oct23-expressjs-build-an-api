const express = require('express');
const { getAllPosts, getPostsByAuthor, getPostById, createPost, updatePost, deletePost } = require('./PostFunctions');
const router = express.Router();

router.get('/', async (request, response) => {
    let allPosts = await getAllPosts();

    response.json({
        postsCount: allPosts.length,
        postsArray: allPosts
    })
})

router.get('/author/:authorID', async (request, response) => {
    let postsByAuthor = await getPostsByAuthor(request.params.authorID)

    response.json({
        postsCount: postsByAuthor.length,
        postsArray: postsByAuthor
    })
})

router.get('/:postID', async (request, response) => {
    response.json(
        await getPostById(request.params.postID)
    )
})

router.post('/', async (request, response) => {
    response.json(await createPost(request.body.postDetails))
})

router.put('/:postID', async (request, response) => {
    let postDetails = {
        postID: request.params.postID,
        updatedData: request.body.newPostData
    }

    response.json(await updatePost(postDetails))
})

router.delete('/:postID', async (request, response) => {
    response.json(await deletePost(request.params.postID))
})

module.exports = router