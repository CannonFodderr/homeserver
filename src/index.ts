import express, { Request, Response } from 'express'
import FileMimeDetectController from './controllers/fileMimeDetectorController'
import AuthController from './controllers/AuthController'
import RegisterController from './controllers/RegisterController'
import bodyParser from 'body-parser'
import config from './config/config'
import cors from 'cors'
import mongodb, { MongoClient } from 'mongodb'

const connectionString = `${config.MONGODB_HOST}/${config.MONGODB_DB_NAME}`

mongodb.connect(connectionString, {
    "useUnifiedTopology": true,
    "auth": {
        "user": config.MONGODB_USER,
        "password": config.MONGODB_PASSWORD
    }
})
.then((connection) => {
    console.log(`Mongodb connected: ${connection.isConnected()}`)
})
.catch((err) => {
    console.error(`MongoDB connection error: ${err}`)
})

const app = express()
const port: Number = Number(config.PORT) || 8080

const corsOptions = {
    "credentials": true,
    "origin": true
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from home server")
})


app.use('/file', FileMimeDetectController)
app.use('/auth', AuthController)
app.use('/user', RegisterController)


app.listen(port, () => console.log(`Serving on port: ${port}`))