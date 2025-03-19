import { CustomError, ErrorType } from "../../common/protocols/error.types";
import { User } from "../../common/protocols/user.types";
import userRepository from "../../repositories/users.repository";
import bcrypt from "bcrypt";
import { generateJWT } from "./generateJWT";
import userSessionsRepository from "../../repositories/userSession.repository";
import { formatCpf } from "../../common/utils/formatCPF";

async function register(user: User) {

    if (await userRepository.emailAlreadyRegistered(user.email)) {
        throw new CustomError(ErrorType.BAD_REQUEST, { message: "Email already used" });
    }

    if (await userRepository.cpfAlreadyRegistered(user.cpf)) {
        throw new CustomError(ErrorType.BAD_REQUEST, { message: "cpf already used" });
    }

    user.password = bcrypt.hashSync(user.password, 10);

    await userRepository.register(user);

    return { message: "user registered" };

}

async function login(email: string, password: string) {

    const user = await userRepository.getByEmail(email);

    if (!bcrypt.compareSync(password, user.password) || user.email !== email) {
        throw new CustomError(ErrorType.UNAUTHORIZED, 'Invalid email and or password');
    }

    const token = generateJWT(user.id.toString(), email);

    const session = await userSessionsRepository.create(user.id, token);

    if (!session) throw new CustomError(ErrorType.BAD_REQUEST, { message: "Error inicializing the session" });

    return token;
}

async function getUsers() {

    const users = await userRepository.getAll();

    const formatedUsers = users.map(user => {
        const formattedCpf = formatCpf(user.cpf);
        return {
            ...user,
            cpf: formattedCpf,
        };
    });

    return formatedUsers;
}

const authService = {
    register,
    login,
    getUsers
};

export default authService

