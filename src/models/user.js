const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.virtual("password").set(function (password) {
  this.hashed = this.encryptPassword(password);
});

userSchema.methods = {
  authenticate: async function (password) {
    await bcrypt.compare(password, this.hashed);
  },
  encryptPassword: async function (password) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  },

  genJwtToken: function () {
    return jwt.sign(
      { email: this.email, isAdmin: this.isAdmin },
      process.env[jwt_secret_key]
    );
  },
};

const User = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  User,
};
