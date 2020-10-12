const { User } = require("../models/user");
const asyncWrapper = require("../middlewares/async");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(new Error("NotFoundError:User for the given id is not found"));

  res.send(user);
});

const createUser = asyncWrapper(async (req, res) => {
  const user = new User({ ...req.body });
  const response = await user.save({ new: true });
  res.send(response);
});

const updateUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(new Error("NotFoundError:User for the given id is not found"));

  const response = await user.update({ ...req.body });
  res.send(response);
});

const deleteUser = asyncWrapper(async (req, res) => {
  const response = await User.findByIdAndRemove(req.params.id);
  res.send(response);
});
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
