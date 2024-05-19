const Post = require("../model/Post");
const Comment = require("../model/Comment");

exports.addComment = async (req, res) => {
  
     try {
      const { postId,content } = req.body;
      const userId = req.user.id
      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Create a new comment
      const comment = new Comment({
        postId,
        userId,
        content
      });
      await comment.save();
  
      // Add the comment reference to the Post document
      post.comments.push(comment._id);
      await post.save();
  
      // Return success response
      return res.status(200).json({
         success:true, 
         message: 'Comment added successfully', 
         comment });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ 
        success:false,
        message: 'Internal server error' });
    }
  };