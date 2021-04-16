import Redis from 'ioredis'
import config from '../config/config'


class RedisStore {
    private client: Redis.Redis | null
    private connectionString: string

    constructor () {
        this.client = null
        this.connectionString = `${config.REDIS_PROTOCOL}${config.REDIS_HOST}:${config.REDIS_PORT}`
        this.initRedisClient()
    }
    initRedisClient () {
        this.client = new Redis(this.connectionString, {
            "maxRetriesPerRequest": 3 
        })
    }
    public getClient () {
        return this.client
    }
    public async get(value:any) {
        if (!this.client) {
            return null
        }
        const res = await this.client.get(value)
        if (res) {
            return res
        }
        return null
    }
    public async set(key:Redis.KeyType, value:Redis.ValueType) {
        if(!this.client) return
        return await this.client.set(key, value)
    }
}


const redisStore = new RedisStore()
export default redisStore

