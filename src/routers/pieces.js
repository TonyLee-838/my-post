const express = require("express");

const {
  createPiece,
  deletePiece,
  getPieceById,
  listPieces,
  updatePiece,
} = require("../controllers/piece.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", listPieces);
router.get("/:id", getPieceById);
router.post("/", auth, createPiece);
router.put("/:id", auth, updatePiece);
router.delete("/:id", auth, deletePiece);

module.exports = router;
