const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");
const { uploadFileToCloudinary } = require("../utils/imageUploader");

exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.files.imageFile;
    const { userId } = req.body;
    //    console.log("userId is", userId)
    //    console.log("image is", image)

    // Upload the file to Cloudinary
    const postImage = await uploadFileToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    // console.log("posted",postImage)

    const user = await User.findById(userId);

    // console.log("user is",user)

    //create post
    const newPost = await Post.create({
      caption,
      image: postImage.secure_url,
      user: user._id,
    });
    
    //updated user schema
    const updateUser = await User.findByIdAndUpdate(
        {_id: userId},
    { 
        $push:{
            post:newPost._id
        },
        },
        {new:true}
    )
    // console.log("newPost", updateUser);
    res.json({
      success: true,
      message: "Post Successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.updatePost = async (req, res) => {
      try{ 
          const {postId} = req.body;
        //   console.log("postId", postId)
          const post = await Post.findById(postId);
        //   console.log(post);
          if(!post) {
            return res.status(404).json({ error: "Post not found" });
          }
          const {caption} = req.body;
          const image = req.files.imageFile;
        //   console.log("newImage", image)
          if(image) {
            const postImage = await uploadFileToCloudinary(
                image,
                process.env.FOLDER_NAME
              );
              post.image = postImage.secure_url;
          }
          if(caption) {
            post.caption = caption
          }
          
          //update post schema
          const updatedPost = await post.save()
          console.log(updatedPost)

          res.json({
            success: true,
            message: "Post updated successfully",
            
          });

      }catch(error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
};

exports.deletePost = async (req,res) => {
    try{
        const {postId} = req.body;
        // console.log(postId)
        const post = await Post.findById(postId)
        // console.log(post)
        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        //delete post
        await post.deleteOne();
        
        //update user Schema(delete post from user schema also)
        const user = post.user
        // console.log(user)
        const updatedUser = await User.findByIdAndUpdate(
            {_id: user},
            {
                $pull:{
                    post: post._id,
                }
            },
            {new:true}
        );
        // console.log("update", updatedUser)
        res.json({
            success:true,
            message:'Post deleted successfully'
        })
    }catch(error) {
         console.log(error);
         res.status(400).json({
            success: false,
            message: "Something went wrong",
          });
    }
}

exports.getAllPost = async (req, res) => {
    try{
        const allPost = await Post.find(
            {},
            {
                caption:true,
                image:true,
            }
        ).populate("user")
         .exec()
        return res.status(200).json({
            success: true,
            data:allPost,
          });
    }catch (error) {
        // console.log(error);
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Post Data`,
          error: error.message,
        });
      }

}

