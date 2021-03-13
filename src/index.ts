import express, { Request, Response } from 'express'
import FileMimeDetectController from './controllers/fileMimeDetectorController'
import bodyParser from 'body-parser'

const app = express()
const port: Number = Number(process.env.PORT) || 8080


app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from home server")
})

app.use('/file', FileMimeDetectController)

app.listen(port, () => console.log(`Serving on port: ${port}`))