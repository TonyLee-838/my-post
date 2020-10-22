const asyncWrapper = require("../middlewares/async");
const { User } = require("../db/models/user");
const bcrypt = require("bcrypt");

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    throw new Error("AuthenticationError:Incorrect Email-Password combination");

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new Error("AuthenticationError:Incorrect Email-Password combination");

  const token = user.schema.static.genJwtToken({ email, isAdmin:user.isAdmin,id:user._id });
  res.header("x-auth-token", token);
  res.send(token);
});

module.exports = { signIn };
