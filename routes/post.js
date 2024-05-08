const express = require("express");
const router = express.Router();

const {createPost,updatePost, deletePost,getAllPost} = require("../controller/post")
const {likePost} = require("../controller/like")
const {addComment} = require("../controller/comment")

router.post("/createpost", createPost)
router.put("/updatepost", updatePost)
router.delete("/deletepost", deletePost)
router.get("/allpost", getAllPost)

router.post("/like", likePost)

router.post("/comment", addComment)
module.exports = router;