import { Router, Request, Response } from 'express'


export class TimestampController {
    private _router: Router
    constructor () {
        this._router = Router()
        this.initTimestampRouter()
    }
    private initTimestampRouter () {
        this._router.post('/', this.getCurrentTimeStamp)
    }
    public getRouter = () => {
        return this._router
    }
    public getCurrentTimeStamp (req: Request, res: Response) {
        res.status(200).json({
            timestamp: Date.now()
        })
    }
}

const { getRouter } = new TimestampController()
export default getRouter()