const Post = require('../models/post');

const getAllPostsFromDB = () => Post.find()

const getPostFromDB = (condition) => Post.findOne(condition);

const insertNewPostToDB = (post) => {
    const newPost = new Post(post);
    return newPost.save({new:true})
}

const updatePostToDB = async (data,id) => {
    const post =  await Post.findById(id);
    if(!post) return null;

    return post.update()
}

const deletePostFromDB = async (id) => {
    const post = await Post.findById(id)
    if(!post) return null;

    return post.remove()
}

const deleteAllPostsFromDB = () => Post.deleteMany({})


module.exports = {
    getAllPostsFromDB,
    getPostFromDB,
    insertNewPostToDB,
    updatePostToDB,
    deletePostFromDB,
    deleteAllPostsFromDB
};