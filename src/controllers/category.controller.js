const { getCategoriesFromDb, postCategoryToDb } = require("../db/api/category");
const { validateCategory } = require("../db/models/category");
const asyncWrapper = require("../middlewares/async");

const getCategories = asyncWrapper(async (req, res) => {
  const categories = await getCategoriesFromDb();
  res.send(categories);
});

const postCategory = asyncWrapper(async (req, res) => {
  const category = req.body;
  const { error } = validateCategory(category);
  if (error) throw new Error(`ValidationError:${error.message}`);
  const response = await postCategoryToDb(category);
  res.send(response);
});

module.exports = {
  getCategories,
  postCategory,
};
