import express from 'express'
import { createGroupChat, getUserChats, modifyGroup, p2pChat } from '../controllers/chatController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/").get(authenticate,getUserChats);

router.route("/p2p/:id").get(authenticate,p2pChat)

router.route("/groupChat").post(authenticate,createGroupChat)

router.route("/groupChat/modify").put(authenticate,modifyGroup)

export default router