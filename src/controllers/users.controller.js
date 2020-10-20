const asyncWrapper = require("../middlewares/async");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
  getAllUsersFromDB,
  getUserFormDB,
  insertNewUserIntoDB,
  insertUpdatedUserIntoDB,
  deleteUserFromDB,
  validate,
} = require("../db/api/users");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await getAllUsersFromDB();
  res.send(users);
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await getUserFormDB({ _id: req.params.id });
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");

  res.send(user);
});

const createUser = asyncWrapper(async (req, res) => {
  const user = { ...req.body };

  const { error } = validate(user);
  if (error) throw new Error("ValidationError:Invalid user provided!");

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(user.password, salt);

  const response = await insertNewUserIntoDB({ ...user, password: hashed });
  res.send(response);
});

const updateUser = asyncWrapper(async (req, res) => {
  const response = await insertUpdatedUserIntoDB(req.params.id, req.body);
  res.send(response);
});

const deleteUser = asyncWrapper(async (req, res) => {
  const user = await deleteUserFromDB(req.params.id);
  res.send(user);
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
