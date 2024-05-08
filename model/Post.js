const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
     image:{
        type:String,
        require: true
     },
     caption:{
        type:String,
        require: true
     },
     likes:{
        type:Number,
        default: 0
     },
     comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
     }]
})

module.exports = mongoose.model('Post', postSchema)