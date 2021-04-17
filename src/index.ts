import express, { Request, Response } from 'express'
import FileMimeDetectController from './controllers/fileMimeDetectorController'
import AuthController from './controllers/AuthController'
import RegisterController from './controllers/RegisterController'
import bodyParser from 'body-parser'
import config from './config/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import MongoDbStore from './store/MongoDbStore'
// import redisStore from './store/RedisStore'
import {Mailer} from './services/Mailer'
const app = express()
const port: Number = Number(config.PORT) || 8080


MongoDbStore.connect()
.then((connection) => {
    console.log("Connected to mongoDB: ", connection?.isConnected())
})


const corsOptions = {
    "credentials": true,
    "origin": true
}


// new Mailer()
// .sendTestEmail()
// .then((res) => {
//     console.log(res)
// })
// .catch((err) => {
//     console.error(err)
// })

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from home server")
})


app.use('/file', FileMimeDetectController)
app.use('/auth', AuthController)
app.use('/user', RegisterController)


app.listen(port, () => console.log(`Serving on port: ${port}`))