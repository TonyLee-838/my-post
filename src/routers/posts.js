const express = require('express');

const {createPost,deletePost,getPost,listPosts,updatePost} = require("../controllers/posts.controller")

const router = express.Router()

router.get("/",listPosts)
router.get("/:id",getPost)
router.post("/",createPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)

module.exports = router;