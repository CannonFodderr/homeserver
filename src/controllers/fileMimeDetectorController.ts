import { Request, Response, Router } from 'express'
import axios, { AxiosResponse } from 'axios'

const router = Router()

interface fileDetectRequest {
    url:string
}

interface ResponseHeaders {
    'content-type'?: string,
    'content-length'?: string
}

async function requestHeadersFormUrl (url:string) {
    try {

        const res = (await axios.head(url, {method: 'HEAD'}))
        if (res?.headers) {
            return res.headers
        }
        return null
    }
    catch {
        return null
    }
}

router.post('/detect', async (req: Request, res:Response) => {
    const { url = "" }:fileDetectRequest = req.body
    if (url) {
        const headers:ResponseHeaders | null = await requestHeadersFormUrl(url)
        if (!headers) {
            return res.sendStatus(404)
        }
        const {
            "content-type":fileType = "",
            "content-length": fileSize = ""
        } = headers

        res
        .status(200)
        .json({fileType, fileSize})
    } else {
        res.sendStatus(500)
    }
})

export default router 