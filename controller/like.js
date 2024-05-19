const User = require("../model/User");
const Post = require("../model/Post");
const Like = require('../model/Like');

exports.likePost = async (req, res) => {

  try {
    const {postId} = req.body 
    const userId = req.user.id;
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    // Create a new like
    const like = new Like({ postId, userId });
    await like.save();

    // Increment the like count in the Post document
    post.likes += 1;
    await post.save();

    // Return success response
    return res.status(200).json({ 
        success:true,
        message: 'Post liked successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
        success:false,
        message: 'Internal server error' });
  }
};

