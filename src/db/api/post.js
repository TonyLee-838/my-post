const Post = require("../models/post");

const getPostsFromDB = (condition) => Post.find(condition);

const insertNewPostToDB = (post) => {
  const newPost = new Post(post);
  return newPost.save({ new: true });
};

const updatePostToDB = async (data, id) => Post.updateOne({ _id: id }, data);

const deletePostFromDB = async (id) => Post.findByIdAndRemove(id)

const deleteAllPostsFromDB = () => Post.deleteMany({});

const isValidTitle = (title) =>
  title && typeof title === "string" && title.length < 255;

module.exports = {
  getPostsFromDB,
  insertNewPostToDB,
  updatePostToDB,
  deletePostFromDB,
  deleteAllPostsFromDB,
  isValidTitle,
};
