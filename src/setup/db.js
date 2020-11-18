const mongoose = require("mongoose");
const config = require("config");

const { baseURL, dbName } = config.get("dbConfig");

const connectToDB = async () => {
  try {
    await mongoose.connect(`${baseURL}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (process.env.NODE_ENV === "development")
      console.log("Successfully connected to mongodb...");
  } catch (error) {
    console.warn("Something wrong happened when connecting to mongodb...");
  }
};

module.exports = connectToDB;
