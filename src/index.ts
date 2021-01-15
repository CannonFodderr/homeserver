import express, { Request, Response } from 'express'
require('dotenv').config()


const app = express()
const port: Number = Number(process.env.PORT) || 8080


app.get('/', (req: Request, res: Response) => {
    res.send("Hello from home server")
})

app.listen(port, () => console.log(`Serving on port: ${port}`))