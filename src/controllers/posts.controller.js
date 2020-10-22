const {
  deletePostFromDB,
  getPostsFromDB,
  insertNewPostToDB,
  updatePostToDB,
} = require("../db/api/post");
const { getUserFormDB } = require("../db/api/users");

const { toHtml } = require("../helper/markdown");
const asyncWrapper = require("../middlewares/async");

const listPosts = asyncWrapper(async (req, res) => {
  const posts = await getPostsFromDB();
  res.send(posts);
});

const listPostsByUser = asyncWrapper(async (req, res) => {
  const post = await getPostsFromDB({ userId: req.query.userId });
  res.send(post);
});

const getPostById = asyncWrapper(async (req, res) => {
  const post = await getPostsFromDB({ _id: req.params.id });
  if (!post.length)
    throw new Error("NotFoundError: post for the given id is not found.");

  res.send(post);
});

const createPost = asyncWrapper(async (req, res) => {
  const post = req.body;
  //TODO:validation post
  if (!post.title || post.title instanceof String || post.title.length > 255)
    throw new Error("ValidationError: Invalid title provided!");

  const user = await getUserFormDB({ _id: post.userId });
  if (!user.length)
    throw new Error("NotFoundError: user for the given id is not found.");

  post.contentHtml = toHtml(post.contentMd);

  const response = await insertNewPostToDB(post);
  // console.log(response);
  res.send(response);
});

const updatePost = asyncWrapper(async (req, res) => {
  const inputData = req.body;

  if (
    !inputData.title ||
    inputData.title instanceof String ||
    inputData.title.length > 255
  )
    throw new Error("ValidationError: Invalid title provided!");

  const [post] = await getPostsFromDB({ _id: req.params.id });
  if (!post)
    throw new Error("NotFoundError: post for the given id is not found.");

  if (!post.userId.equals(req.user.id))
    throw new Error(
      "UnauthorizeError: Access denied. You are not the corresponding author of this article."
    );

  inputData.contentHtml = toHtml(inputData.contentMd);

  const response = await updatePostToDB(inputData, req.params.id);

  res.send(response);
});

const deletePost = asyncWrapper(async (req, res) => {
  const response = await deletePostFromDB(req.params.id);
  if (!response)
    throw new Error("NotFoundError: post for the given id is not found.");

  res.send(response);
});

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
