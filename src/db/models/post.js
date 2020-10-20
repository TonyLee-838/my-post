const mongoose = require('mongoose');

const defaultTime = {
    type:Number,
    default:Date.now()
}
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        max:255
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    contentMd:String,
    contentHtml:String,
    timeCreated:defaultTime,
    timeUpdated:defaultTime
})


const Post = mongoose.model("post",postSchema)

module.exports = Post;