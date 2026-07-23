import mongoose from 'mongoose'

const JobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  role: String,
  coverLetter: String,
  resumeUrl: String,
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema)
