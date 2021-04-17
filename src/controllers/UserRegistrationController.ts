import { UserSchema } from "../schemas/UserSchema"
import { Mailer } from "../services/Mailer"
import generateAccountValidationEmail from "../templates/emails/AccountValidate"
import { ObjectId } from "bson"
import { Router, Request, Response } from "express"
import MongoDbStore from '../store/MongoDbStore'

const { getDbCollection, insertOneToDbCollection } = MongoDbStore

interface UserRegistrationPayload {
    email: string,
    password: string
}

export class UserRegistrationController {
    private _router: Router
    constructor (router: Router) {
        this._router = Router()
        this.initRegRouter()
    }
    private initRegRouter () {
        this._router.post('/register', this.registerUser)
        this._router.post('/unregister', this.unregisterUser)
        this._router.get('/validate/:accountId', this.validateAccount)
    }
    private isValidCreateUserPayload (payload: UserSchema) {
        const { email, password } = payload
        if (email && password) {
            return true
        }
        return false
    }
    private async sendAccountValidationEmail (email: string, accountId: string) {
        const template = generateAccountValidationEmail(accountId)
        if (template) {
            return await new Mailer(email, 'Validate your account', '', template).sendMail()
        }
    }
    public registerUser = async (req: Request, res: Response) => {
        const { body } = req
        const { email = "", password ="" }:UserRegistrationPayload = body
        
        if (this.isValidCreateUserPayload(body)) {
            const foundUser = await getDbCollection('users')?.findOne({ email: email })
            if (!foundUser) {
                const inserted = await insertOneToDbCollection('users', {email, password, validated: false})
                if (!inserted) {
                    return res.sendStatus(500)
                }
                this.sendAccountValidationEmail(email, inserted.insertedId)
                
                return res.sendStatus(201)

            }
            return res.status(409).send("User already registered")
        }
        return res.sendStatus(400)
    }
    public unregisterUser = async (req: Request, res: Response) => {
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
    public async validateAccount (req: Request, res: Response) {
        const { accountId } = req.params
        const collection = await getDbCollection('users')
        if (!collection) return res.sendStatus(500)
        const dbFilter = { _id: new ObjectId(accountId)}
        const foundUserAccount = await collection.findOne(dbFilter)
        
        if (!foundUserAccount) {
            return res.sendStatus(404)
        }
        if (foundUserAccount && foundUserAccount.validated) {
            return res.status(200).send("Account already activated")
        }

        const updated = await collection.updateOne(dbFilter, 
        {
            "$set": { validated: true},
        },
        {
            "upsert": false 
        }
        )
        if (!updated || !updated.modifiedCount) {
            return res.sendStatus(500)
        }
        res.sendStatus(200)
    }

    public getRouter () {
        return this._router
    }
}