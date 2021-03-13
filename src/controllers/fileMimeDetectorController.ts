import { Request, Response, Router } from 'express'
import axios from 'axios'

const router = Router()

interface fileDetectRequest {
    url:string
}

interface ResponseHeaders {
    'fileType'?: string,
    'fileSize'?: string
}

async function requestHeadersFormUrl (url:string) {
    try {

        const res = (await axios.head(url, {method: 'HEAD'}))
        if (res?.headers) {
            const {
                "content-type":fileType = "",
                "content-length": fileSize = ""
            } = res.headers
            return {fileType, fileSize}
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

        res
        .status(200)
        .json(headers)
    } else {
        res.sendStatus(500)
    }
})

export default router 