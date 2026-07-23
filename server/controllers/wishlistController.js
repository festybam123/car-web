import Wishlist from '../models/Wishlist.js';
import Car from '../models/Car.js';

export const addToWishlist = async (req, res) => {
  try {
    const { carId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, cars: [carId] });
    } else if (!wishlist.cars.includes(carId)) {
      wishlist.cars.push(carId);
    } else {
      return res.status(200).json({
        success: true,
        message: 'Car already in wishlist',
        wishlist
      });
    }

    await wishlist.save();
    await wishlist.populate('cars');

    res.status(200).json({
      success: true,
      message: 'Added to wishlist',
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('cars');

    res.status(200).json({
      success: true,
      wishlist: wishlist || { cars: [] }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { cars: req.params.carId } },
      { new: true }
    ).populate('cars');

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist',
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};