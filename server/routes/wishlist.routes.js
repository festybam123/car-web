import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', addToWishlist);
router.get('/', getWishlist);
router.delete('/:carId', removeFromWishlist);

export default router;