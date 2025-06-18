import Admin from "../models/Admin.js";
// import Customer from "../models/Customer.js";
// import Merchant from "../models/Merchant.js";
// import Transaction from "../models/Transaction.js";
// import Wallet from "../models/Wallet.js";
// import RfidCard from "../models/RfidCard.js";
// import NfcScanner from "../models/NfcScanner.js";

// Get all admins (admin-only)
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: admins.length,
      data: {
        admins,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get admin by ID (admin-only)
export const getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        status: "error",
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};
