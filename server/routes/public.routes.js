import express from 'express'
import { subscribe, contact } from '../controllers/publicController.js'

const router = express.Router()

router.post('/newsletter', subscribe)
router.post('/contact', contact)

export default router
