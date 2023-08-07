import Fastify from 'fastify'
import {resolve} from 'path'
import {PrismaClient} from "@prisma/client";
import {bootstrap} from "fastify-decorators";
import { createClient } from 'redis';

const fastify = Fastify({
    logger: true
})
export const prisma = new PrismaClient()

export const client: any = createClient();
async function initServer() {
    try {
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        await createServerConnection();
    } catch (e) {
        console.log(e)
        process.exit(0)
    }
}

const createServerConnection = async () => {
    fastify.register(bootstrap, {
        directory: resolve(__dirname, `controllers`), mask: /./,
    })
    fastify.setErrorHandler((error, req, res) => {
        req.log.error(error.toString());
        res.send({error});
    });
    const PORT = process.env.PORT || 3000;
    fastify.listen({port: +PORT, host: "0.0.0.0"}, (err, host) => {
        if (err) throw err;
        console.log(`🚀 Server listening on ${host}`);
    });
}
initServer()
