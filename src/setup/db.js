const mongoose = require("mongoose");
const config = require("config");

const { baseURL, dbName } = config.get("dbConfig");
const connectToDB = () => {
  mongoose
    .connect(`${baseURL}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.info("Successfully connected to mongodb"))
    .catch(() =>
      console.warn("Something wrong happened when connecting to mongodb")
    );
};

module.exports = connectToDB;
