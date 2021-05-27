import { expect, should } from 'chai'
import { MongoClient } from 'mongodb'
import { MongoDbStore as testsStore } from '../../store/MongoDbStore'
import config from '../../config/config'

should()

let dbconnection: MongoClient | null = null

describe("Mongo test unit", function () {   
    before(async () => {
        const store = new testsStore(`${config.MONGODB_HOST}/admin`)
        if (!store) return
        dbconnection = await store.connect()
        if (!dbconnection) {
            console.error("%c Unable to connect to mongodb", 'color:red;')
        }
        return dbconnection
    })

    beforeEach (async () => {
        if (!dbconnection) {
            console.log("No db connection available")
            return null
        }
        // drop tests database
        const dropped = await dbconnection.db(config.MONGO_TEST_DB_NAME).dropDatabase()
        expect(dropped).true
        return dropped
    })
    
    it ("Should create a test collection", async () => {
        const created = await dbconnection?.db(config.MONGO_TEST_DB_NAME).createCollection('test')
        should().exist(created)
        return created
    })
    
    
    this.afterAll((done) => {
        done()
        process.exit(1)
    })
})