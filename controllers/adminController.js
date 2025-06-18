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

// Update admin (admin-only)
export const updateAdmin = async (req, res, next) => {
    try {
        const { fullName, email, role } = req.body;
    
        // Don't allow password updates through this route
        if (req.body.password) {
            return res.status(400).json({
                status: 'error',
                message: 'This route is not for password updates. Please use /updatePassword.'
            });
        }
        // Check permissions - only SUPER_ADMINs can update role to SUPER_ADMIN
        if (role === 'SUPER_ADMIN') {
            const currentAdmin = await Admin.findById(req.user.id);
            if (currentAdmin.role !== 'SUPER_ADMIN') {
                return res.status(403).json({
                    status: 'error',
                    message: 'Only SUPER_ADMINs can grant SUPER_ADMIN privileges'
                });
            }
        }
    // Find and update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { fullName, email, role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedAdmin) {
      return res.status(404).json({
        status: 'error',
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        admin: updatedAdmin
      }
    });
  } catch (error) {
    next(error);
  }
};

// Deactivate admin (admin-only) - We don't delete for audit trail
export const deactivateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        status: 'error',
        message: 'Admin not found'
      });
    }
    
    // Check permissions - only SUPER_ADMINs can deactivate other SUPER_ADMINs
    const currentAdmin = await Admin.findById(req.user.id);
    if (admin.role === 'SUPER_ADMIN' && currentAdmin.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        status: 'error',
        message: 'Only SUPER_ADMINs can deactivate SUPER_ADMINs'
      });
    }
    
    // Prevent self-deactivation
    if (admin._id.toString() === req.user.id.toString()) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot deactivate your own account'
      });
    }
    
    // Add isActive field to Admin model if you haven't already
    admin.isActive = false;
    await admin.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Admin account deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};