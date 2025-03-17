const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { check } = require("express-validator");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Admin-only routes
router
  .route("/")
  .get(authorize("admin"), getUsers)
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters",
      ).isLength({ min: 6 }),
    ],
    authorize("admin"),
    createUser,
  );

router
  .route("/:id")
  .get(authorize("admin"), getUser)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;
