import express from 'express'
import { allMessages, sendMessage } from "../controllers/messageController.js";
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route("/:chatId").get(authenticate, allMessages);

router.route("/").post(authenticate, sendMessage);

export default router