const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const defaultTime = {
  type: Number,
  default: Date.now(),
};
const postSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  contentMd: String,
  contentHtml: String,
  title: {
    type: String,
    required: true,
    max: 255,
  },
  timeCreated: defaultTime,
  timeUpdated: defaultTime,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
