import express from 'express';
import {
  customerSignup,
  customerLogin,
  merchantSignup,
  merchantLogin,
  adminLogin,
  setupFirstAdmin,
  createAdmin,
  customerForgotPassword,
  customerVerifyResetCode,
  customerResetPassword,
  merchantForgotPassword,
  merchantVerifyResetCode,
  merchantResetPassword,
  customerChangePassword,
  merchantChangePassword,
  customerEditProfile,
  merchantEditProfile,
  getCustomerProfile,
  getMerchantProfile
} from '../controllers/authController.js';

import { protect, customerOnly, merchantOnly, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Customer routes
router.post('/customer/signup', customerSignup);
router.post('/customer/login', customerLogin);
router.post('/customer/forgot-password', customerForgotPassword);
router.post('/customer/verify-reset-code', customerVerifyResetCode);
router.post('/customer/reset-password', customerResetPassword);

// Merchant routes
router.post('/merchant/signup', merchantSignup);
router.post('/merchant/login', merchantLogin);
router.post('/merchant/forgot-password', merchantForgotPassword);
router.post('/merchant/verify-reset-code', merchantVerifyResetCode);
router.post('/merchant/reset-password', merchantResetPassword);

// Admin routes
router.post('/admin/setup', setupFirstAdmin); // For creating the first admin
router.post('/admin/login', adminLogin);

// Create additional admin (admin-only)
router.post('/admin/create', protect, adminOnly, createAdmin);

export default router;