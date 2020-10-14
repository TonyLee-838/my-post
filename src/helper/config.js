const config = require("config");

const env = (path) => process.env[config.get(path)];

module.exports = { env };
