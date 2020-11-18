const mongoose = require("mongoose");
const Joi = require("joi");

const pieceSchema = new mongoose.Schema({
  timeCreated: {
    type: Number,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
    maxlength: 127,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: String,
});
const Piece = mongoose.model("piece", pieceSchema);

const validatePiece = (piece) =>
  Joi.object({
    title: Joi.string().max(127).required(),
    content: Joi.string(),
  }).validate(piece);

module.exports = {
  Piece,
  pieceSchema,
  validatePiece,
};
