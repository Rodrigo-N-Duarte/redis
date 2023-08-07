import {Controller, DELETE, GET, POST} from 'fastify-decorators'
import { RedisService } from '../services/RedisService'

@Controller()
export default class RedisController {
  private readonly redisService = new RedisService()

  @POST("/fill")
  async fillDatabase (): Promise<{success: boolean}> {
    return await this.redisService.fillDatabase()
  }
  @GET()
  async get(): Promise<any> {
    return this.redisService.get()
  }
  @GET('/redis')
  async getRedis(): Promise<any> {
    return this.redisService.getRedis()
  }
  @DELETE()
  async deleteAll(): Promise<any> {
    return this.redisService.deleteAll()
  }
}
