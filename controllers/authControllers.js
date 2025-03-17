const User = require("../models/user");
const { validationResult } = require("express-validator");

const register = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        errors: result.array(),
      });
    }
    const { name, email, password, isAdmin, isSeller, isCustomer } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
      isSeller: isSeller || false,
      isCustomer: isCustomer !== undefined ? isCustomer : true,
    });
    // generate token
    const token = newUser.getSignedJwtToken();

    console.log("User details:", newUser);

    res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};
exports.register = register;

const login = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
exports.login = login;

const logout = async (req, res, next) => {
  try {
    // Clear token cookie
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.logout = logout;

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.getUser = getUser;
