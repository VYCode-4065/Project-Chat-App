import { Router } from "express";
import { loginController, logoutController, signupController } from "../controller/user.controller.js";
import auth from "../middleware/auth.middleware.js";
import { sidebarUserController } from "../controller/sidebarUser.controller.js";
const userRouter = Router();

userRouter.post('/signup', signupController);

userRouter.post('/login', loginController);

userRouter.get('/logout', auth, logoutController);

userRouter.get('/sidebarUser', auth, sidebarUserController);
export default userRouter;