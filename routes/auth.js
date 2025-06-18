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

export default router;