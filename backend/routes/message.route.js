import { Router } from "express";
import { getMessagesController, sendMessageController } from "../controller/message.controller.js";
import auth from '../middleware/auth.middleware.js'

const messageRoute = Router();

messageRoute.post('/send/:id', auth, sendMessageController);
messageRoute.get('/get/:id', auth, getMessagesController);

export default messageRoute;