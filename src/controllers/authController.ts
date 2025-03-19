import { Request, Response } from "express";
import authService from "../services/authService/authService";

async function register(req: Request, res: Response) {

    const result = await authService.register(req.body);

    res.status(200).send(result);

}

async function login(req: Request, res: Response) {

    const token = await authService.login(req.body.email, req.body.password);

    res.status(200).send({ token });
}

async function getUsers(req: Request, res: Response) {
    const users = await authService.getUsers();

    res.status(200).send(users);
}

const AuthController = {
    register,
    login,
    getUsers
};

export default AuthController;