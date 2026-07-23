import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ['test-drive', 'inspection', 'consultation', 'purchase'],
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    preferredDate: {
      type: Date,
      required: true
    },
    preferredTime: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: 'Lagos, Nigeria'
    },
    message: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    notes: String,
    cancelReason: String
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
