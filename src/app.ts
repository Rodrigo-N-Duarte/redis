import Fastify from 'fastify';
import {bootstrap} from 'fastify-decorators';
import {resolve} from 'path'

function createServer() {
    const server = Fastify({
        logger: true
    });
    server.register(bootstrap, {
        directory: resolve(__dirname, `controllers`),
        mask: /./,
    })

    server.setErrorHandler((error, req, res) => {
        req.log.error(error.toString());
        res.send({error});
    });

    return server;
}

export default createServer;
