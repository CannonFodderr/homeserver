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
    uploadHandler (req: Request, res: Response) {
        
        OSSStore.uploadToBucket(req)
        res.sendStatus(200)
    }
    getRouter () {
        return this._router
    }
}


export default new UploadController()