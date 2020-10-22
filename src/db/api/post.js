const Post = require("../models/post");
const { getUserFormDB } = require("./users");

const getPostsFromDB = (condition) => Post.find(condition);

const insertNewPostToDB = (post) => {
  const newPost = new Post(post);
  return newPost.save({ new: true });
};

const updatePostToDB = async (data, id) => Post.updateOne({_id:id},data)

const deletePostFromDB = async (id) => {
  const post = await Post.findById(id);
  if (!post) return null;

  return post.remove();
};

const deleteAllPostsFromDB = () => Post.deleteMany({});


module.exports = {
  getPostsFromDB,
  insertNewPostToDB,
  updatePostToDB,
  deletePostFromDB,
  deleteAllPostsFromDB,
};
