import Customer from "../models/Customer.js";
import Merchant from "../models/Merchant.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { promisify } from "util"; // -> for email verification

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in. Please log in to get access.",
      });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    let currentUser;
    if (decoded.type === "Customer") {
      currentUser = await Customer.findById(decoded.id);
    } else if (decoded.type === "Merchant") {
      currentUser = await Merchant.findById(decoded.id);
    } else if (decoded.type === "Admin") {
      currentUser = await Admin.findById(decoded.id);
    }

    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token no longer exists.",
      });
    }

    // Grant access to protected route
    req.user = {
      id: currentUser._id,
      type: decoded.type,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({
      status: "error",
      message: "Invalid token or token expired",
    });
  }
};

// Restriction middleware to check user types
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.type)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
// Admin only middleware (convenience function)
export const adminOnly = (req, res, next) => {
  if (req.user.type !== "Admin") {
    return res.status(403).json({
      status: "error",
      message: "This route is restricted to admin users only",
    });
  }
  next();
};

// Customer only middleware (convenience function)
export const customerOnly = (req, res, next) => {
  if (req.user.type !== "Customer") {
    return res.status(403).json({
      status: "error",
      message: "This route is restricted to customer users only",
    });
  }
  next();
};

// Merchant only middleware (convenience function)
export const merchantOnly = (req, res, next) => {
  if (req.user.type !== "Merchant") {
    return res.status(403).json({
      status: "error",
      message: "This route is restricted to merchant users only",
    });
  }
  next();
};
