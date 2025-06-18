import express from 'express';
import {
  assignCardToCustomer,
  getCustomerCards,
  deactivateCard,
  verifyCardPin,
  changeCardPin,
  resetCardPin,
  unlockCardPin,
  assignScannerToMerchant,
  getMerchantScanners,
  updateScannerStatus,
  getAllCards,
  getAllScanners,
} from '../controllers/deviceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Admin routes for card management
router.post('/admin/cards/assign/:customerId', adminOnly, assignCardToCustomer);
router.get('/admin/customers/:customerId/cards', adminOnly, getCustomerCards);
router.patch('/admin/cards/:cardId/reset-pin', adminOnly, resetCardPin);
router.patch('/admin/cards/:cardId/unlock-pin', adminOnly, unlockCardPin);

// Admin device management routes
router.get('/admin/cards', adminOnly, getAllCards);
router.get('/admin/scanners', adminOnly, getAllScanners);

export default router;