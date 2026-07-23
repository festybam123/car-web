import mongoose from 'mongoose'

const SupportTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open','pending','closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.models.SupportTicket || mongoose.model('SupportTicket', SupportTicketSchema)
