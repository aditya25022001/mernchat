import { Router } from 'express'
import { resetPassword, sendOtp } from '../controllers/recoveryController.js'

const router = Router()

router.post("/otp",sendOtp).post("/reset",resetPassword)

export default router