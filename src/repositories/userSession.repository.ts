import prisma from "../common/database/databaseConfig";


async function create(userId: number, token: string) {

    const session = await prisma.user_sessions.create({
        data: {
            token,
            user_id: userId
        }
    });

    return session;

}

const userSessionsRepository = {
    create
};

export default userSessionsRepository;