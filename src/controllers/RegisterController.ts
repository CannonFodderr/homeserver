import { UserSchema } from '@/schemas/UserSchema'
import { ObjectId } from 'bson'
import { Router, Request, Response } from 'express'
import MongoDbStore from '../store/MongoDbStore'

const { getDbCollection, insertOneToDbCollection } = MongoDbStore
interface UserRegistrationPayload {
    email: string,
    password: string
}

class RegController {
    private _router: Router
    constructor () {
        this._router = Router()
        this.initRouter()
    }
    private initRouter () {
        this._router.post('/register', this.registerUser)
        this._router.post('/unregister', this.unregisterUser)
    }
    private isValidCreateUserPayload (payload: UserSchema) {
        const { email, password } = payload
        if (email && password) {
            return true
        }
        return false
    }
    private registerUser = async (req: Request, res: Response) => {
        const { body } = req
        const { email = "", password ="" }:UserRegistrationPayload = body
        
        if (this.isValidCreateUserPayload(body)) {
            const foundUser = await getDbCollection('users')?.findOne({ email: email })
            if (!foundUser) {
                const inserted = await insertOneToDbCollection('users', {email, password})
                if (!inserted) {
                    return res.sendStatus(500)
                }
                return res.sendStatus(201)

            }
            return res.status(409).send("User already registered")
        }
        return res.sendStatus(400)
    }
    private unregisterUser = async (req: Request, res: Response) => {
        const { body } = req
        const {_id:id}:any = body
        if (!id) return res.sendStatus(400)

        const deletedUser = await getDbCollection('users')?.findOneAndDelete({
            _id: new ObjectId(id),
        })
        
        if (deletedUser && deletedUser.ok && deletedUser.value) {
            return res.sendStatus(200)
        }
        
        if (deletedUser && !deletedUser.value) {
            return res.sendStatus(404)
        }
        res.sendStatus(500)


    }
    public getRouter () {
        return this._router
    }
}


const controller = new RegController()
export default controller.getRouter()