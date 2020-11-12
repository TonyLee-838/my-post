const he = require("he");

const getDefaultPostDescription = (html) => {
  const trimmed = html.replace(/<[^>]+>/g, "");
  return he.decode(trimmed);
};

module.exports = getDefaultPostDescription;
