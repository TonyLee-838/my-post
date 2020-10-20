const Post = require('../models/post');

const getAllPostsFromDB = () => Post.find()

const getPostFromDB = (condition) => Post.findOne(condition);

const insertNewPostToDB = (post) => new Post(post).save({new:true});

const updatePostToDB = async (data,id) => {
    const post =  await Post.findById(id);
    if(!post) return null;

    return post.update(data)
}

const deletePostFromDB = async (id) => {
    const post = await Post.findById(id)
    if(!post) return null;

    return post.remove()
}


module.exports = {
    getAllPostsFromDB,
    getPostFromDB,
    insertNewPostToDB,
    updatePostToDB,
    deletePostFromDB
};