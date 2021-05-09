import { Router, Request, Response } from 'express'
import config from '../config/config'
import multer from 'multer'



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
        console.log("Upload request")
        const { file, body } = req
        console.log(file)
        console.log(body)
        res.sendStatus(200)
    }
    getRouter () {
        return this._router
    }
}


export default new UploadController()