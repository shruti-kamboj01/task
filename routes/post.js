const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth")

const {createPost,updatePost, deletePost,getAllPost} = require("../controller/post")
const {likePost} = require("../controller/like")
const {addComment} = require("../controller/comment")

router.post("/createpost", auth, createPost)
router.put("/updatepost", auth, updatePost)
router.delete("/deletepost", auth, deletePost)
router.get("/allpost", getAllPost)

router.post("/like", auth, likePost)

router.post("/comment", auth, addComment)
module.exports = router;