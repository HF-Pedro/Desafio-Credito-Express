import { NextFunction, Request, Response } from "express";
import { CustomError, ErrorType } from "../common/protocols/error.types";
import prisma from "../common/database/databaseConfig";

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) throw new CustomError(ErrorType.UNAUTHORIZED, "Invalid Token");

    const sessao = await prisma.user_sessions.findFirst({ where: { token } });
    if (!sessao) throw new CustomError(ErrorType.UNAUTHORIZED, "Invalid Token");
    res.locals.idUsuario = sessao.user_id;
    next();
}