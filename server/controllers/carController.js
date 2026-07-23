import Car from '../models/Car.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all cars with filters
export const getCars = async (req, res) => {
  try {
    const { brand, priceMin, priceMax, fuel, transmission, year, bodyType, mileage, sort, page = 1, limit = 12 } = req.query;

    let filter = { status: 'available' };

    if (brand) filter.brand = brand;
    if (fuel) filter.fuel = fuel;
    if (transmission) filter.transmission = transmission;
    if (year) filter.year = parseInt(year);
    
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseInt(priceMin);
      if (priceMax) filter.price.$lte = parseInt(priceMax);
    }

    if (mileage) {
      filter.mileage = { $lte: parseInt(mileage) };
    }

    let sortOption = {};
    switch(sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { views: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const cars = await Car.find(filter)
      .populate('dealer', 'firstName lastName company')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Car.countDocuments(filter);

    res.status(200).json({
      success: true,
      cars,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('dealer', 'firstName lastName company phone email')
     .populate('reviews');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create car (Dealer/Admin only)
export const createCar = async (req, res) => {
  try {
    const { brand, model, year, engine, fuel, transmission, price, images } = req.body;

    const car = new Car({
      ...req.body,
      dealer: req.user.id
    });

    await car.save();

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update car
export const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check ownership
    if (car.dealer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this car'
      });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check ownership
    if (car.dealer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this car'
      });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get featured cars
export const getFeaturedCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'available' })
      .sort({ rating: -1, totalReviews: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
