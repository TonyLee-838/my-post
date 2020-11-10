const express = require("express");

const {
  getCategories,
  postCategory,
} = require("../controllers/category.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getCategories);
router.post("/", auth, postCategory);

module.exports = router;
