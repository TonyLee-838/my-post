const {
  deletePieceFromDB,
  getPiecesFromDB,
  insertNewPieceToDB,
  updatePieceToDB,
  validatePiece,
} = require("../db/api/piece");
const { getUserFormDB } = require("../db/api/users");
const { getCategoriesFromDb } = require("../db/api/category");

const { toHtml } = require("../helper/markdown");
const asyncWrapper = require("../middlewares/async");

const listPieces = asyncWrapper(async (req, res) => {
  const pieces = await getPiecesFromDB();
  res.send(pieces);
});

const getPieceById = asyncWrapper(async (req, res) => {
  const piece = await getPiecesFromDB({ _id: req.params.id });
  if (!piece.length)
    throw new Error("NotFoundError: piece for the given id is not found.");

  res.send(piece);
});

const createPiece = asyncWrapper(async (req, res) => {
  const piece = req.body;
  if (!validatePiece(piece))
    throw new Error("ValidationError: Invalid piece provided!");

  const user = await getUserFormDB({ _id: piece.userId });
  if (!user.length)
    throw new Error("NotFoundError: user for the given id is not found.");

  if (piece.categoryId) {
    const category = await getCategoriesFromDb({ _id: piece.categoryId });
    if (!category.length)
      throw new Error(
        "NotFoundError: piece's category for the given id is not found."
      );
  }

  const response = await insertNewPieceToDB(piece);
  res.send(response);
});

const updatePiece = asyncWrapper(async (req, res) => {
  const inputData = req.body;
  if (validatePiece(inputData))
    throw new Error("ValidationError: Invalid piece provided!");

  const [piece] = await getPiecesFromDB({ _id: req.params.id });
  if (!piece)
    throw new Error("NotFoundError: piece for the given id is not found.");

  if (!piece.userId.equals(req.user.id))
    throw new Error(
      "UnauthorizeError: Access denied. You are not the corresponding author of this article."
    );

  if (inputData.categoryId) {
    const categories = await getCategoriesFromDb({ _id: inputData.categoryId });
    if (!categories.length)
      throw new Error(
        "NotFoundError: piece's category for the given id is not found."
      );
  }

  const response = await updatePieceToDB(inputData, req.params.id);

  res.send(response);
});

const deletePiece = asyncWrapper(async (req, res) => {
  const [piece] = await getPiecesFromDB({ _id: req.params.id });
  if (!piece)
    throw new Error("NotFoundError: piece for the given id is not found.");

  if (!piece.userId.equals(req.user.id))
    throw new Error(
      "UnauthorizeError: Access denied. You are not the corresponding author of this article."
    );

  const response = await deletePieceFromDB(req.params.id);

  res.send(response);
});

module.exports = {
  listPieces,
  getPieceById,
  createPiece,
  updatePiece,
  deletePiece,
};
