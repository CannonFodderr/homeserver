import { Router } from 'express'
import {UserRegistrationController} from './UserRegistrationController'
class UserController {
    private _router: Router
    constructor () {
        this._router = Router()
        this.initUserRouter()
    }
    initUserRouter () {
        this._router.use(new UserRegistrationController(this._router).getRouter())
    }
    public getRouter () {
        return this._router
    }
}


const controller = new UserController()
export default controller.getRouter()