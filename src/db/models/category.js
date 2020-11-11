const mongoose = require("mongoose");
const Joi = require("joi");

const requiredString = {
  type: String,
  required: true,
  maxlength: 50,
};
const categorySchema = new mongoose.Schema({
  name: requiredString,
  color: {
    ...requiredString,
    maxlength: 10,
  },
  icon: requiredString,
});

const Category = mongoose.model("category", categorySchema);

const validateCategory = (category) =>
  Joi.object({
    name: Joi.string().max(50).required(),
    icon: Joi.string().max(50).required(),
    color: Joi.string().max(10).required(),
  }).validate(category);

module.exports = {
  Category,
  categorySchema,
  validateCategory,
};
