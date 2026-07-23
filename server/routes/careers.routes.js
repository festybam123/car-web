import express from 'express'
import { apply } from '../controllers/careerController.js'

const router = express.Router()

router.post('/apply', apply)

export default router
