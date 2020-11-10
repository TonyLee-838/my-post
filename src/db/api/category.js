const { Category } = require("../models/category");

const getCategoriesFromDb = async (condition) => Category.find(condition);

const postCategoryToDb = async (category) =>
  new Category(category).save({ new: true });

module.exports = {
  getCategoriesFromDb,
  postCategoryToDb,
};
