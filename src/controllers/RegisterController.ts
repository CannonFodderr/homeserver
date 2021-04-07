import { Router, Request, Response } from 'express'
import cors from 'cors'

const router = Router()

router.post('/register', (req: Request, res: Response) => {

    res.sendStatus(200)
})

export default router