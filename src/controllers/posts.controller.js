const {
  deletePostFromDB,
  getAllPostsFromDB,
  getPostFromDB,
  insertNewPostToDB,
  updatePostToDB,
} = require("../db/api/post");
const asyncWrapper = require("../middlewares/async");

const listPosts = asyncWrapper(async (req, res) => {
    const posts = await getAllPostsFromDB();
    res.send(posts)

});

const getPost = asyncWrapper(async(req,res) => {
    const post = await getPostFromDB({_id:req.params.id})
    if(!post) throw new Error("NotFoundError: post for the given id is not found.")

    res.send(post)
})

const createPost = asyncWrapper(async(req,res) => {
    const post = req.body;
    //TODO:validation post

    const response = insertNewPostToDB(post)
    res.send(response)
})

const updatePost = asyncWrapper(async (req,res) => {
    const post = req.body;
    //TODO:validation post

    const response = await updatePostToDB(post)
    if(!response) throw new Error("NotFoundError: post for the given id is not found.")

    res.send(response)
})

const deletePost = asyncWrapper(async (req,res) => {
    const response = deletePostFromDB(req.params.id)
    if(!response) throw new Error("NotFoundError: post for the given id is not found.")

    res.send(response);
})


module.exports = {
    listPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
