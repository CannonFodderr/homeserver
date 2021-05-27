import mongodb, { connect, MongoClient } from 'mongodb'
import config from '../config/config'



export class MongoDbStore {
    _connectionString: string
    _client: MongoClient | null
    _clientConfiguration: Object
    constructor (
        connectionString = `${config.MONGODB_HOST}/${config.MONGODB_DB_NAME}`,
        clientConfiguration = {
            "useUnifiedTopology": true,
            "auth": {
                "user": config.MONGODB_USER,
                "password": config.MONGODB_PASSWORD
            },
            "appname": "home-server-client",
        }
    ) {
        this._connectionString = connectionString
        this._client = null,
        this._clientConfiguration = clientConfiguration
    }

    public async connect (): Promise<mongodb.MongoClient | null> {
        return await connect(this._connectionString, this._clientConfiguration)
        .then((connection: MongoClient ) => {
            this._client = connection
            console.log(`Mongodb connected to ${this._connectionString}`)
            return connection
        })
        .catch((err: Error) => {
            console.error(`MongoDB connection error: ${err}`)
            return null
        })
    }
    public async createIndex (collection = '', index = {}, indexOptions = {}) {
        const foundCollection = await this.getDbCollection(collection)
        if (!foundCollection) return null

        const result = await foundCollection.createIndex(index, indexOptions)
        console.log(`Collection ${collection} created index: ${result}`)
        return result
    }
    public getDbCollection = (collection = '') => {
        if (!this._client || !collection) return null
        return this._client.db(config.MONGODB_DB_NAME).collection(collection)
    }
    public insertOneToDbCollection = async (collectionName: string, payload: object) => {
        if (!this._client || !collectionName) return null
        const collection = this.getDbCollection(collectionName)
        if (!collection) return null
        return await collection?.insertOne(payload)
    }
    public deleteOneFromCollection = async (collectionName: string, objectId: object) => {
        if (!this._client || !collectionName) return null
        const collection = this.getDbCollection(collectionName)
        if (!collection) return null
        return await collection.deleteOne({"_id": objectId })
    }
}


export default new MongoDbStore()