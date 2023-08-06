import {Controller, GET} from 'fastify-decorators';
import {HelloService} from "../services/HelloService";

@Controller()
export default class HelloController {
    private helloService = new HelloService()

    @GET()
    async helloHandler() {
        return this.helloService.hello()
    }

    @GET("/a")
    async goodbyeHandler() {
        return 'Bye-bye!';
    }
}
