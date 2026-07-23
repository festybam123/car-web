import fs from 'fs'
import path from 'path'
import SupportTicket from '../models/SupportTicket.js'

const dataDir = path.resolve('./server/logs')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

export const createTicket = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body
    if (!name || !email || !subject || !message) return res.status(400).json({ success: false, message: 'Missing fields' })
    const doc = new SupportTicket({ name, email, phone, subject, message })
    await doc.save().catch(() => {
      fs.appendFileSync(path.join(dataDir, 'support.json'), JSON.stringify({ name, email, phone, subject, message, at: new Date() }) + '\n')
    })
    res.json({ success: true, message: 'Ticket created' })
  } catch (err) {
    next(err)
  }
}
