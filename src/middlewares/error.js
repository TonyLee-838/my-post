module.exports = (error, req, res, next) => {
  const message = error.message;
  if (process.env.NODE_ENV === "DEVELOPMENT") console.warn("Error!: ", message);
  if (message.startsWith("ValidationError"))
    return res.status(400).send(message);

  if (message.startsWith("AuthenticationError"))
    return res.status(401).send(message);

  if (message.startsWith("NotFoundError")) return res.status(404).send(message);

  if (message.startsWith("AuthenticationError"))
    return res.status(404).send(message);

  console.error({ message: "InternalNetworkError", stack: error.stack });

  res
    .status("500")
    .send({ message: "InternalNetworkError", stack: error.stack });
};
