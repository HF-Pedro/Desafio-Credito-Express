import jwt from "jsonwebtoken";

export const generateJWT = (userId: string, email: string) => {
    const payload = {
        sub: userId,
        email: email,
    };

    const secretKey = process.env.JWT_SECRET as string;

    return jwt.sign(payload, secretKey);
};