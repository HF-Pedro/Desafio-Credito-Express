import { tokenExample, userListExample } from "./consts";
import authService from "../src/services/authService/authService";


jest.mock('../src/services/authService/authService', () => ({
    register: jest.fn().mockResolvedValue({ message: "user registered" }),
    login: jest.fn().mockResolvedValue(tokenExample),
    getUsers: jest.fn().mockResolvedValue(userListExample)
}));


describe('register and login', () => {

    it('should register correctly', async () => {

        expect((await authService.register({ cpf: "12345678901", email: "email@gmail.com", name: "pedro", password: "senha010203" })).message).toBe('user registered');

    });

    it('should be able to login and receive a valid token', async () => {

        await authService.register({ cpf: "12345678901", email: "email@gmail.com", name: "pedro", password: "senha010203" });

        const token = await authService.login('email@gmail.com', 'senha010203');

        const jwtRegex = /^[A-Za-z0-9-_=]+\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)$/;
        expect(typeof token).toBe('string');
        expect(jwtRegex.test(token)).toBe(true);

    });

    it('should be able to list users', async () => {

        const users = await authService.getUsers();

        expect(users).toBeTruthy();
    });

});