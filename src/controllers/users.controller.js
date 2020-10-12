const { User, validateUser } = require("../models/user");
const asyncWrapper = require("../middlewares/async");
const _ = require("lodash");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");

  res.send(user);
});

const createUser = asyncWrapper(async (req, res) => {
  const user = { ...req.body };

  const { error } = validateUser(user);
  if (error) throw new Error("ValidationError:Invalid user provided!");

  const response = await new User(user).save({ new: true });
  res.send(response);
});

const updateUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");

  const { error } = validateUser(
    _.pick({ ...user.toObject(), ...req.body }, ["name", "email", "password"])
  );

  if (error)
    throw new Error(
      "ValidationError:Invalid user provided!" + error.details[0].message
    );

  const response = await user.update({ ...req.body });
  res.send(response);
});

const deleteUser = asyncWrapper(async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");

  res.send(user);
});
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
