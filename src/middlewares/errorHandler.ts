import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../common/protocols/error.types";

export default function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.log(error);

    switch (error.type) {
        case ErrorType.CONFLICT:
            res.status(httpStatus.CONFLICT).send(error.message);
            break;
        case ErrorType.NOT_FOUND:
            res.status(httpStatus.NOT_FOUND).send(error.message);
            break;
        case ErrorType.UNPROCESSABLE:
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Unprocessable entity: " + error.message);
            break;
        case ErrorType.BAD_REQUEST:
            res.status(httpStatus.BAD_REQUEST).send(error.message);
            break;
        case ErrorType.INTERNAL:
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
            break;
        case ErrorType.UNAUTHORIZED:
            res.status(httpStatus.UNAUTHORIZED).send("Unauthorized: " + error.message);
            break;
        case ErrorType.PROCESSING_ACCOUNT:
            res.status(httpStatus.NO_CONTENT).send("Processing account");
            break;
        default:
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
            break;
    }
}