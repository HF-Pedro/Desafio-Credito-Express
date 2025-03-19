import { users } from "@prisma/client";
import prisma from "../common/database/databaseConfig";
import { User } from "../common/protocols/user.types";
import { CustomError, ErrorType } from "../common/protocols/error.types";


async function register(user: User) {

    await prisma.users.create({
        data: user
    });

}

async function getByEmail(email: string): Promise<users> {

    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });

    if (!user) throw new CustomError(ErrorType.BAD_REQUEST, { message: "email not registered" });

    return user;

}

async function emailAlreadyRegistered(email: string) {

    const result = await prisma.users.findFirst({
        where: {
            email
        }
    });

    if (result) {
        return true;
    }
    else {
        return false;
    }
}

async function cpfAlreadyRegistered(cpf: string) {

    const result = await prisma.users.findFirst({
        where: {
            cpf
        }
    });

    if (result) {
        return true;
    }
    else {
        return false;
    }
}

async function getAll() {

    const users = await prisma.users.findMany({
        omit: {
            password: true
        }
    });

    return users;
}

const userRepository = {
    register,
    emailAlreadyRegistered,
    cpfAlreadyRegistered,
    getByEmail,
    getAll
};

export default userRepository;