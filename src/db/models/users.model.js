const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide user username"],
    },
    email: {
      type: String,
      required: [true, "Please provide user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
