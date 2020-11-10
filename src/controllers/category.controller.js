const { getCategoriesFromDb, postCategoryToDb } = require("../db/api/category");
const asyncWrapper = require("../middlewares/async");

const getCategories = asyncWrapper(async (req, res) => {
  const categories = await getCategoriesFromDb();
  res.send(categories);
});

const postCategory = asyncWrapper(async (req, res) => {
  const category = req.body;
  if (category.name.length > 20)
    throw new Error("ValidationError: Name of category must be less than 20");
  const response = await postCategoryToDb(category);
  res.send(response);
});

module.exports = {
  getCategories,
  postCategory,
};
