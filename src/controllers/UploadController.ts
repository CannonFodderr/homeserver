import { Router, Request, Response } from 'express'
import config from '../config/config'
import multer from 'multer'
import OSSStore from '../store/OSSStore'


class UploadController {
    private _router: Router
    private _uploadMiddleware: multer.Multer
    constructor () {
        this._router = Router()
        this._uploadMiddleware = multer()
        this.initRouter()
    }
    initRouter () {
        this._router.post('/', this._uploadMiddleware.single('file'), this.uploadHandler)
    }
    async uploadHandler (req: Request, res: Response) {
        
        const uploaded: any = await OSSStore.uploadToBucket(req)
        if (!uploaded) {
            return res.sendStatus(500)
        }
        res.status(200).json(uploaded)
    }
    getRouter () {
        return this._router
    }
}


export default new UploadController()