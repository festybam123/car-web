import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    cars: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Wishlist', wishlistSchema);
