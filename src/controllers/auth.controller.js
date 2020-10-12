const asyncWrapper = require("../middlewares/async");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    throw new Error("AuthenticationError:Incorrect Email-Password combination");

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new Error("AuthenticationError:Incorrect Email-Password combination");

  const token = user.schema.methods.genJwtToken();

  res.send(token);
});

module.exports = { signIn };
