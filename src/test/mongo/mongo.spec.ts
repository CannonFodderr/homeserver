import { expect, should } from 'chai'
import { MongoClient } from 'mongodb'
import { MongoDbStore as testsStore } from '../../store/MongoDbStore'
import config from '../../config/config'

should()

let dbconnection: MongoClient | null = null
describe("Mongo test unit", function () {
    this.timeout(60000)
    
    before(async (done) => {
        const store = new testsStore(`${config.MONGODB_HOST}/${config.MONGODB_DB_NAME}-test`)
        dbconnection = await store.connect()
        if (!dbconnection) {
            console.error("%c Unable to connect to mongodb", 'color:red;')
            done()
            process.exit(1)
        }


        done()
    })

    beforeEach ((done) => {
        if (!dbconnection) {
            console.log("No db connection available")
            done()
            process.exit(1)
        }
        // drop tests database
        dbconnection.db('server-tests').dropDatabase()
    })
    
    it ("Should connect to mongodb", () => {

    })

})