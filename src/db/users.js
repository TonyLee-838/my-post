const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");

const getAllUsersFromDB = () => {
  return User.find();
};

const getUserFormDB = (condition) => {
  return User.find({ ...condition });
};

const insertNewUserIntoDB = (data) => {
  return new User(data).save({
    new: true,
  });
};

const insertUpdatedUserIntoDB = async (id, data) => {
  const user = await User.findById(id);
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");

  const { error } = validateUser(
    _.pick({ ...user.toObject(), ...data }, ["name", "email", "password"])
  );

  if (error)
    throw new Error(
      "ValidationError:Invalid user provided!" + error.details[0].message
    );
  return user.update(data);
};

const deleteUserFromDB = async (id) => {
  const user = await User.findByIdAndRemove(id);
  if (!user)
    throw new Error("NotFoundError:User for the given id is not found");
  return user;
};

const deleteAllUserFromDB = async () => {
  return User.deleteMany();
};

const validate = (user) => validateUser(user);

const generateObjectId = () => new mongoose.Types.ObjectId().toHexString();

module.exports = {
  deleteUserFromDB,
  deleteAllUserFromDB,
  generateObjectId,
  getAllUsersFromDB,
  getUserFormDB,
  insertUpdatedUserIntoDB,
  insertNewUserIntoDB,
  validate,
};
