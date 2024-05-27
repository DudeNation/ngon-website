const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: "Invalid Email address"
    }
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
