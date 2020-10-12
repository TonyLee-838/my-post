const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwt_secret_key = require("config").get("jwt_secret_key");

const requiredString = {
  type: String,
  required: true,
  min: 5,
  max: 255,
};

const userSchema = new mongoose.Schema({
  name: { ...requiredString, max: 50 },

  email: {
    ...requiredString,
    unique: true,
  },
  password: requiredString,
  dateRegistered: {
    type: Number,
    default: Date.now(),
  },
  image: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.genJwtToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env[jwt_secret_key]
  );
};

const User = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(6).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(50).min(6),
  });

  return schema.validate(user);
};

module.exports = {
  userSchema,
  User,
  validateUser,
};
