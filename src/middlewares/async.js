const asyncWrapper = async (handler) => {
  try {
    await handler();
  } catch (error) {
    next(error);
  }
};

module.exports = asyncWrapper;
