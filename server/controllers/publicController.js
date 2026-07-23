import fs from 'fs'
import path from 'path'
import Newsletter from '../models/Newsletter.js'
import Contact from '../models/Contact.js'

const dataDir = path.resolve('./server/logs')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' })
    const doc = new Newsletter({ email })
    await doc.save().catch(async (err) => {
      // Fallback: write to file
      fs.appendFileSync(path.join(dataDir, 'newsletter.json'), JSON.stringify({ email, at: new Date() }) + '\n')
    })
    res.json({ success: true, message: 'Subscribed' })
  } catch (err) {
    next(err)
  }
}

export const contact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Missing fields' })
    const doc = new Contact({ name, email, phone, message })
    await doc.save().catch(() => {
      fs.appendFileSync(path.join(dataDir, 'contacts.json'), JSON.stringify({ name, email, phone, message, at: new Date() }) + '\n')
    })
    res.json({ success: true, message: 'Message received' })
  } catch (err) {
    next(err)
  }
}
