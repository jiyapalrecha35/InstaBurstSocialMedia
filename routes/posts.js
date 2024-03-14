const express = require('express')
const verifyToken = require('../middleware/auth')
const { getFeedPosts, getUserPosts, likePost } = require('../controllers/posts')

const router = express.Router()

//read
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

//update
router.patch('/:id/like', verifyToken, likePost)
module.exports = router