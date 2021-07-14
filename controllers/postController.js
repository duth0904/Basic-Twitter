const Post = require('../models/Post')
// Get all Posts
exports.getAllPosts = async (req, res, next) =>{
    try {
        const posts = await Post.find({}).populate('author', 'name').select('content createdAt')
        res.status(200).json({
            status: 'Success',
            results : posts.length,
            data : {posts}
        })
    } catch (error) {
        res.json(error)
    }
}

//Create one post
exports.createOnePost = async (req, res, next) => {
    try {
        const {userID} = req.user
        const post = await Post.create({...req.body, author : userID})
        res.status(200).json({
            status: 'Success',
            data : {post}
        })
    } catch (error) {
        res.json(error)
    }
}

//Update one post
exports.updateOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true})
        res.status(200).json({
            status: 'Success',
            data : {post}
        })
    } catch (error) {
        res.json(error)
    }
}

//Delete one post
exports.deleteOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            status: 'Success',
            message: 'Post has been deleted'
        })
    } catch (error) {
        res.json(error)
    }
}
