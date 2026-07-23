import express from 'express';
import { createBooking, getBookings, getBookingById, updateBooking, cancelBooking } from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.get('/:id', authenticate, getBookingById);
router.put('/:id', authenticate, updateBooking);
router.patch('/:id/cancel', authenticate, cancelBooking);

export default router;
