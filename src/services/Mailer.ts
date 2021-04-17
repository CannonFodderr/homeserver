import { createTransport, Transporter } from 'nodemailer'
import config from '../config/config'
import fs from 'fs/promises'
import path from 'path'


interface MailOptions {
    from: string
    to: string
    subject: string
    text?: string,
    html?: string
}


export class Mailer {
    private _transporter: Transporter
    private mailOptions:MailOptions
    constructor (destination = "", subject = "", text = '', html = '') {
        this._transporter = createTransport({
            service: config.SERVICE,
            port: 587,
            host: 'smtp.gmail.com',
            auth: {
                user: config.EMAIL_ACCOUNT,
                pass: config.EMAIL_PASSWORD
            },
            secure: false
        }),
        this.mailOptions = {
            from: `${config.EMAIL_ACCOUNT_USERNAME} ${config.EMAIL_ACCOUNT}`,
            to: destination,
            subject,
            text,
            html
        }
    }
    async sendMail () {
        try {

            if (!this.mailOptions.text && !this.mailOptions.html) {
                return null
            }
            const res = await this._transporter.sendMail(this.mailOptions)
            if (!res) {
                return null
            }
            return res
        } catch (err) {
            console.error(err)
            return null
        }
    }
    async sendTestEmail () {
        const templatePath = path.join(__dirname + '/../templates/emails/test.html')

        return fs.readFile(templatePath)
        .then(async (temp) => {
            const mailer = new Mailer(config.EMAIL_ACCOUNT, 'Server test', '', temp.toString())
            const res = await mailer.sendMail()
            return res
        })
        .catch((err) => {
            console.error(err)
            return null
        })
    }

}