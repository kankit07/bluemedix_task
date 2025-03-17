const express = require("express");
const { register, login, getUser } = require("../controllers/authControllers");
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Register route with validation
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  register,
);

// Login route with validation
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login,
);

// Get current user route (protected)
router.get("/me", protect, getUser);

module.exports = router;
