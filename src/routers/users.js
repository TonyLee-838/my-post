const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/users.controller");

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", getUserById);

module.exports = router;
