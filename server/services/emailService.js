import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent
    });
    
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Email templates
export const emailTemplates = {
  welcomeEmail: (name) => `
    <h1>Welcome to festybam Motors!</h1>
    <p>Hello ${name},</p>
    <p>Thank you for joining festybam Motors. We're excited to help you find your perfect car!</p>
    <p>Best regards,<br>festybam Motors Team</p>
  `,
  
  bookingConfirmation: (bookingDetails) => `
    <h1>Test Drive Booking Confirmed</h1>
    <p>Your test drive has been confirmed!</p>
    <ul>
      <li>Car: ${bookingDetails.car}</li>
      <li>Date: ${bookingDetails.date}</li>
      <li>Time: ${bookingDetails.time}</li>
      <li>Location: ${bookingDetails.location}</li>
    </ul>
    <p>Best regards,<br>festybam Motors Team</p>
  `,
  
  paymentReceipt: (paymentDetails) => `
    <h1>Payment Receipt</h1>
    <p>Thank you for your payment!</p>
    <ul>
      <li>Amount: ${paymentDetails.amount}</li>
      <li>Reference: ${paymentDetails.reference}</li>
      <li>Date: ${paymentDetails.date}</li>
    </ul>
    <p>Best regards,<br>festybam Motors Team</p>
  `
};
