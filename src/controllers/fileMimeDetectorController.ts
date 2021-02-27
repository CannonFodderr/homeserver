import { Request, Response, Router } from 'express'
import axios from 'axios'

const router = Router()

interface fileDetectRequest {
    url:string
}

async function requestFileFormUrl (url:string) {
    const headers = (await axios.get(url)).headers
    return headers
}

router.post('/detect', (req: Request, res:Response) => {
    const { url = "" }:fileDetectRequest = req.body
    if (url) {
        console.log(url)
        const file = requestFileFormUrl(url)
        file.then((headers) => {
            const { "content-type":fileType = "" } = headers
            console.log(fileType)
            res.status(200).send(fileType)
        })
        res.status(404)
    }
    res.status(500)
})

export default router 