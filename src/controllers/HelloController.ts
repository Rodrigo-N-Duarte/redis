import { Controller, GET } from 'fastify-decorators'
import { HelloService } from '../services/HelloService'

@Controller()
export default class HelloController {
  private readonly helloService = new HelloService()

  @GET()
  async helloHandler (): Promise<string> {
    return await this.helloService.hello()
  }

  @GET('/a')
  async goodbyeHandler (): Promise<string> {
    return 'Bye-bye!'
  }
}
