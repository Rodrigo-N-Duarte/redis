import {prisma} from "../app";
import {createClient} from "redis";
export class RedisService {
    async fillDatabase(): Promise<{ success: boolean }> {
        try {
            for (let i = 1; i <= 100; i++) {
                await prisma.user.create({
                    data: {
                        name: `User #${i}`,
                        email: `user${i}email@email.com`,
                    },
                })
            }
            return {success: true}
        } catch (e) {
            return e
        }
    }

    async get(): Promise<any[]> {
        // @ts-ignore
        const redis = new createClient()
        const redisResponse = redis.get('allUsers')
        if (redisResponse) {
            return JSON.parse(redisResponse)
        }
        const users = prisma.user.findMany();
        await redis.set('allUsers', JSON.stringify(users))
        return users
    }

    async deleteAll(): Promise<{ success: boolean }> {
        try {
            await prisma.user.deleteMany()
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    }
}
