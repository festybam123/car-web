import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required']
    },
    model: {
      type: String,
      required: [true, 'Model is required']
    },
    year: {
      type: Number,
      required: [true, 'Year is required']
    },
    engine: {
      type: String,
      required: true
    },
    horsepower: Number,
    fuel: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
      required: true
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic', 'CVT'],
      required: true
    },
    mileage: Number, // in kilometers
    condition: {
      type: String,
      enum: ['New', 'Used', 'Certified Pre-Owned'],
      default: 'Used'
    },
    vin: {
      type: String,
      unique: true,
      sparse: true
    },
    exteriorColor: String,
    interiorColor: String,
    driveType: {
      type: String,
      enum: ['FWD', 'RWD', 'AWD', '4WD']
    },
    seats: Number,
    doors: Number,
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    discountPrice: Number,
    status: {
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available'
    },
    images: [{
      type: String,
      required: true
    }],
    videoUrl: String,
    description: String,
    features: [String],
    warranty: {
      type: String,
      enum: ['3 months', '6 months', '1 year', '2 years', '3 years', 'None'],
      default: 'None'
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    availability: {
      type: Boolean,
      default: true
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

carSchema.index({ brand: 1, model: 1, year: -1 });
carSchema.index({ price: 1 });
carSchema.index({ dealer: 1 });

export default mongoose.model('Car', carSchema);
