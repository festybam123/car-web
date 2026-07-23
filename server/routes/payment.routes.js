import express from 'express';
import { initializePayment, verifyPayment, handleWebhook } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/initialize', authenticate, initializePayment);
router.post('/verify', authenticate, verifyPayment);
router.post('/webhook', handleWebhook);

export default router;