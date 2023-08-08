import {prisma} from "../app";
import {client} from "../app";
export class RedisService {
    async fillDatabase(): Promise<{ success: boolean }> {
        try {
            let users: any = []
            for (let i = 1; i <= 10; i++) {
                const user = await prisma.user.create({
                    data: {
                        id: i,
                        name: `User #${i}`
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
        return new Promise((resolve) => {
            setTimeout(async () => {
                await client.set('allUsers', JSON.stringify(users));
                resolve(users)
            }, 500)
        })
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
            await prisma.user.deleteMany({})
            await client.del('allUsers');
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    }
}
