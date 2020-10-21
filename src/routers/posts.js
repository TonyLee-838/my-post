const express = require('express');

const {createPost,deletePost,getPost,listPosts,updatePost} = require("../controllers/posts.controller")
const auth = require('../middlewares/auth');

const router = express.Router()

router.get("/",listPosts)
router.get("/:id",getPost)
router.post("/",auth,createPost)
router.put("/:id",auth,updatePost)
router.delete("/:id",auth,deletePost)

module.exports = router;