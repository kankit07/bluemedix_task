const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if auth header exists and starts with Bearer
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from Bearer
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log("token", req, token);
    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // Set user in req object
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
  } catch (error) {
    next(error);
  }
};
// Middleware to check if user has specific role
const authorize = (...roles) => {
  return (req, res, next) => {
    const userRoles = [];

    // Check user roles
    if (req.user.isAdmin) userRoles.push("admin");
    if (req.user.isSeller) userRoles.push("seller");
    if (req.user.isCustomer) userRoles.push("customer");

    // Check if user has one of the required roles
    const hasRequiredRole = roles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).json({
        success: false,
        message: `User role ${userRoles.join(", ")} is not authorized to access this route`,
      });
    }

    next();
  };
};
module.exports = {
  protect,
  authorize,
};
