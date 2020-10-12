const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const users = require("./routers/users");
const error = require("./middlewares/error");
const connectToDB = require("./setup/db");

connectToDB();

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use(error);

const port = process.env.PORT || 3003;

const server = app.listen(port, () =>
  console.log(`listening on port ${port}...`)
);

module.exports = server;
