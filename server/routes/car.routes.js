import express from 'express';
import { getCars, getCarById, createCar, updateCar, deleteCar, getFeaturedCars } from '../controllers/carController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCars);
router.get('/featured', getFeaturedCars);
router.get('/:id', getCarById);
router.post('/', authenticate, authorize('dealer', 'admin'), createCar);
router.put('/:id', authenticate, authorize('dealer', 'admin'), updateCar);
router.delete('/:id', authenticate, authorize('dealer', 'admin'), deleteCar);

export default router;
