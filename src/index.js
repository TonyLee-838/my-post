const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const users = require("./routers/users");
const auth = require("./routers/auth");
const posts = require("./routers/posts");
const pieces = require("./routers/pieces");
const categories = require("./routers/categories");
const error = require("./middlewares/error");
const config = require("config");
const connectToDB = require("./setup/db");

connectToDB();

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/pieces", pieces);
app.use("/api/categories", categories);
app.use(error);

const port = process.env[config.get("port")] || 3003;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV === "development")
    console.log(`listening on port ${port}...`);
});

// module.exports = app;
module.exports = server;
