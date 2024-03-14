const Post = require('../model/Post');
const User = require('../model/User');

// create
const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();

        // returning all the posts to the frontend
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// read
const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const userPosts = await Post.find({ userId });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// update
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        // grabbing whether the user has liked it or not
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } // to get the updated document
        );
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

module.exports = { createPost, getFeedPosts, getUserPosts, likePost };
