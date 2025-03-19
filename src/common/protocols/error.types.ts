export enum ErrorType {
    CONFLICT = "Conflict",
    NOT_FOUND = "NotFound",
    UNPROCESSABLE = "Unprocessable",
    BAD_REQUEST = "BadRequest",
    INTERNAL = "Internal",
    UNAUTHORIZED = "Unauthorized",
    PROCESSING_ACCOUNT = "Processing",
}

export class CustomError extends Error {
    constructor(public type: ErrorType, message: string | object) {
        super(typeof message === "string" ? message : JSON.stringify(message));
        this.name = this.constructor.name;
    }
}