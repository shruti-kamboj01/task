const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
    
    content:{
        type:String,
        require: true
     },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require:true
    }
})

module.exports = mongoose.model('Comment', commentSchema)