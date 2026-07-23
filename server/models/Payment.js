import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'NGN'
    },
    paymentMethod: {
      type: String,
      enum: ['paystack', 'bank-transfer', 'credit-card'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    reference: String, // Paystack reference
    transactionId: String,
    receiptUrl: String,
    description: String,
    metadata: mongoose.Schema.Types.Mixed,
    failureReason: String,
    refundAmount: Number,
    refundReason: String,
    refundedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
