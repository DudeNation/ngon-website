const User = require('D:\\ngon-master\\server\\src\\model\\user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword
      });

      const result = await newUser.save();
      
      const token = createToken(result._id, email);
      return res.status(201).json({
        message: "User created successfully",
        user: result,
        token
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Error creating user",
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createToken(user._id, email);
      return res.status(200).json({
        message: "User logged in successfully",
        user,
        token
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({
        message: "Error logging in",
        error: error.message
      });
    }
  },

  logout: (req, res) => {
    // Invalidate the token or clear cookies if applicable
    res.status(200).json({ message: "Logged out successfully" });
  },

  patchUpdate: async (req, res) => {
    try {
      const user = res.locals.user;
      const field = req.params.field;
      const { newValue } = req.body;

      if (!newValue) {
        return res.status(400).json({ message: "New value is required" });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { [field]: newValue } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: `${field} updated successfully`, user: updatedUser });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      return res.status(500).json({
        message: `Error updating ${field}`,
        error: error.message
      });
    }
  }
};
