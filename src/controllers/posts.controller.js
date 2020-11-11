const {
  deletePostFromDB,
  getPostsFromDB,
  insertNewPostToDB,
  updatePostToDB,
  isValidTitle,
} = require("../db/api/post");
const { getUserFormDB } = require("../db/api/users");
const { getCategoriesFromDb } = require("../db/api/category");

const { toHtml } = require("../helper/markdown");
const getDefaultPostDescription = require("../helper/postDescription");
const asyncWrapper = require("../middlewares/async");

const listPosts = asyncWrapper(async (req, res) => {
  const posts = await getPostsFromDB();
  posts.map((post) => ({
    id: post._id,
    userId: post.userId,
    categoryId: post.categoryId,
    title: post.title,
    description: post.description
      ? post.description
      : getDefaultPostDescription(post.contentHtml),
  }));
  res.send(posts);
});

const getPostById = asyncWrapper(async (req, res) => {
  const post = await getPostsFromDB({ _id: req.params.id });
  if (!post.length)
    throw new Error("NotFoundError: post for the given id is not found.");

  res.send(post);
});

const createPost = asyncWrapper(async (req, res) => {
  const post = req.body;

  if (!isValidTitle(post.title))
    throw new Error("ValidationError: Invalid title provided!");

  const user = await getUserFormDB({ _id: post.userId });
  if (!user.length)
    throw new Error("NotFoundError: user for the given id is not found.");

  if (post.categoryId) {
    const category = await getCategoriesFromDb({ _id: post.categoryId });
    if (!category.length)
      throw new Error(
        "NotFoundError: post category for the given id is not found."
      );
  }

  post.contentHtml = toHtml(post.contentMd);

  const response = await insertNewPostToDB(post);
  res.send(response);
});

const updatePost = asyncWrapper(async (req, res) => {
  const inputData = req.body;

  if (inputData.title && !isValidTitle(inputData.title))
    throw new Error("ValidationError: Invalid title provided!");

  const [post] = await getPostsFromDB({ _id: req.params.id });
  if (!post)
    throw new Error("NotFoundError: post for the given id is not found.");

  if (!post.userId.equals(req.user.id))
    throw new Error(
      "UnauthorizeError: Access denied. You are not the corresponding author of this article."
    );

  if (inputData.categoryId) {
    const categories = await getCategoriesFromDb({ _id: inputData.categoryId });
    if (!categories.length)
      throw new Error(
        "NotFoundError: post category for the given id is not found."
      );
  }

  if (inputData.contentHtml)
    inputData.contentHtml = toHtml(inputData.contentMd);

  const response = await updatePostToDB(inputData, req.params.id);

  res.send(response);
});

const deletePost = asyncWrapper(async (req, res) => {
  const [post] = await getPostsFromDB({ _id: req.params.id });
  if (!post)
    throw new Error("NotFoundError: post for the given id is not found.");

  if (!post.userId.equals(req.user.id))
    throw new Error(
      "UnauthorizeError: Access denied. You are not the corresponding author of this article."
    );

  const response = await deletePostFromDB(req.params.id);

  res.send(response);
});

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
