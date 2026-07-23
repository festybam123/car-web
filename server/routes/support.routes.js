import express from 'express'
import { createTicket } from '../controllers/supportController.js'

const router = express.Router()

router.post('/tickets', createTicket)

export default router
