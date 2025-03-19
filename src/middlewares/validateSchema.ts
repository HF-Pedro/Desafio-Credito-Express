import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { CustomError, ErrorType } from "../common/protocols/error.types";

export const validateSchema = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new CustomError(ErrorType.BAD_REQUEST, error.format());
            }
            throw new CustomError(ErrorType.BAD_REQUEST, "Erro interno na validação");
        }
    };
};