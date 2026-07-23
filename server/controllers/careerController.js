import fs from 'fs'
import path from 'path'
import JobApplication from '../models/JobApplication.js'

const dataDir = path.resolve('./server/logs')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

export const apply = async (req, res, next) => {
  try {
    const { name, email, phone, role, coverLetter, resumeUrl } = req.body
    if (!name || !email) return res.status(400).json({ success: false, message: 'Missing name or email' })
    const doc = new JobApplication({ name, email, phone, role, coverLetter, resumeUrl })
    await doc.save().catch(() => {
      fs.appendFileSync(path.join(dataDir, 'applications.json'), JSON.stringify({ name, email, phone, role, coverLetter, resumeUrl, at: new Date() }) + '\n')
    })
    res.json({ success: true, message: 'Application received' })
  } catch (err) {
    next(err)
  }
}
