import express, { Request, Response } from 'express'
import FileMimeDetectController from './controllers/fileMimeDetectorController'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import TimestampController from './controllers/TimestampController'
import bodyParser from 'body-parser'
import config from './config/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import MongoDbStore from './store/MongoDbStore'
// import redisStore from './store/RedisStore'
const app = express()
const port: Number = Number(config.PORT) || 8080


MongoDbStore.connect()
.then((connection) => {
    console.log("Connected to mongoDB: ", connection?.isConnected())
    if (!connection) {
        return process.exit()
    }
})


const corsOptions = {
    "credentials": true,
    "origin": true
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from home server")
})

app.use('/timestamp', TimestampController)
app.use('/file', FileMimeDetectController)
app.use('/auth', AuthController)
app.use('/user', UserController)


app.listen(port, () => console.log(`Serving on port: ${port}`))