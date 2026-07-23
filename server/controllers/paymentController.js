import Payment from '../models/Payment.js';
import crypto from 'crypto';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export const initializePayment = async (req, res) => {
  try {
    const { carId, amount, email, paymentMethod } = req.body;

    const payment = new Payment({
      user: req.user.id,
      car: carId,
      amount,
      email,
      paymentMethod: paymentMethod || 'paystack'
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment initialized',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    const payment = await Payment.findOne({ reference });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    payment.status = 'completed';
    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    const body = JSON.stringify(req.body);

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha512', PAYSTACK_SECRET)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(401).json({
          success: false,
          message: 'Invalid signature'
        });
      }
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      const { reference } = event.data;
      await Payment.findOneAndUpdate(
        { reference },
        { status: 'completed' }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};