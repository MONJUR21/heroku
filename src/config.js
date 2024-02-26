const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/database");

connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

const loginSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("users", loginSchema);

module.exports = collection;
