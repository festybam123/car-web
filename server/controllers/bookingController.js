import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import { sendEmail, emailTemplates } from '../services/emailService.js';

export const createBooking = async (req, res) => {
  try {
    const { carId, preferredDate, preferredTime, location, message, bookingType } = req.body;

    // Fetch car to get dealer reference
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const booking = new Booking({
      car: carId,
      customer: req.user.id,
      dealer: car.dealer,
      preferredDate,
      preferredTime,
      location: location || 'Lagos, Nigeria',
      message,
      bookingType: bookingType || 'test-drive',
      status: 'pending'
    });

    await booking.save();
    await booking.populate('car', 'brand model year images price');
    await booking.populate('customer', 'firstName lastName email phone');

    const emailTitle = bookingType === 'purchase'
      ? `Purchase Request - ${car.year} ${car.brand} ${car.model}`
      : `Test Drive Booking - ${car.year} ${car.brand} ${car.model}`;

    // Send confirmation email
    try {
      await sendEmail(
        booking.customer.email,
        emailTitle,
        emailTemplates.bookingConfirmation({
          car: `${car.year} ${car.brand} ${car.model}`,
          date: preferredDate,
          time: preferredTime,
          location: location || 'Lagos, Nigeria'
        })
      );
    } catch (emailError) {
      console.warn('Email sending failed (non-blocking):', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: bookingType === 'purchase' ? 'Purchase request submitted successfully' : 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('car')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car')
      .populate('customer');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', cancelReason: req.body.reason },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
