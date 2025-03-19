import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";
import AuthController from "../controllers/authController";
import { loginSchema } from "../schemas/loginSchema";
import validateToken from "../middlewares/validateToken";

const authRouter = Router();

authRouter.post('/register', validateSchema(userSchema), AuthController.register);
authRouter.post('/login', validateSchema(loginSchema), AuthController.login);
authRouter.get('/users', validateToken, AuthController.getUsers);

export default authRouter;