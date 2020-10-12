module.exports = (error, req, res, next) => {
  if (error.message.startsWith("ValidationError"))
    return res.status(400).send(error.message);

  if (error.message.startsWith("NotFoundError"))
    return res.status(404).send(error.message);

  if (error.message.startsWith("AuthenticationError"))
    return res.status(404).send(error.message);

  console.error({ message: "InternalNetworkError", stack: error.stack });

  res
    .status("500")
    .send({ message: "InternalNetworkError", stack: error.stack });
};
