import { Router, Request, Response } from 'express'
import AuthStore from '../store/AuthStore'
import config from '../config/config'
const md5 = require('md5')

const router = Router()

/**
 * Endpoint to request login qr code
 */
router.post('/code/request', (req: Request, res: Response) => {
    
    const { body, headers } = req
    const { email = ""} = body

    if (email) {
        const code = md5(email)
        res.status(200).json({code})
    }
    res.sendStatus(500)
})

/**
 * Endpoint to submit qr code and recive JWT
 * @param code
 */
router.post('/code/submit', async (req: Request, res: Response) => {
    const { body, headers } = req
    
    if (body.code) {

        const token = await AuthStore.getSignedJWT({ code: body.code }, { expiration: '5m'})
        
        if (!token) {
            res.sendStatus(500)
        }
        return res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 300000),
            secure: config.NODE_ENV !== 'production' ? false : true,
            httpOnly: true,
        }).send("ok")
    }
    res.sendStatus(500)
})



export default router