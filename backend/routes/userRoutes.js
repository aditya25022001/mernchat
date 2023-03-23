import express from 'express'
import { login, register, listUsers } from '../controllers/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/listusers").get(authenticate,listUsers)

export default router
