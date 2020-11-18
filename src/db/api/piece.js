const { Piece, validatePiece } = require("../models/piece");

const getPiecesFromDB = (condition) => Piece.find(condition);

const insertNewPieceToDB = (piece) => {
  const newPiece = new Piece(piece);
  return newPiece.save({ new: true });
};

const updatePieceToDB = async (data, id) => Piece.updateOne({ _id: id }, data);

const deletePieceFromDB = async (id) => Piece.findByIdAndRemove(id);

const deleteAllPiecesFromDB = () => Piece.deleteMany({});

module.exports = {
  getPiecesFromDB,
  insertNewPieceToDB,
  updatePieceToDB,
  deletePieceFromDB,
  deleteAllPiecesFromDB,
  validatePiece,
};
