import {prisma} from "../app";
import {client} from "../app";
export class RedisService {
    async fillDatabase(): Promise<{ success: boolean }> {
        try {
            let users: any = []
            for (let i = 1; i <= 20000; i++) {
                const user = await prisma.user.create({
                    data: {
                        name: `User #${i}`,
                        email: `user${i}email@email.com`,
                    },
                })
                users.push(user)
            }
            await client.set('allUsers', JSON.stringify(users));
            return {success: true}
        } catch (e) {
            return e
        }
    }

    async get(): Promise<any[]> {
        const users = await prisma.user.findMany();
        await client.set('allUsers', JSON.stringify(users));
        return users;
    }

    async getRedis(): Promise<any[]> {
        const redisResponse = await client.get('allUsers');
        if (redisResponse) {
            return JSON.parse(redisResponse);
        }
        return []
    }

    async deleteAll(): Promise<{ success: boolean }> {
        try {
            await prisma.user.deleteMany()
            await client.del('allUsers');
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    }
}
