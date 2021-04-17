import config from '../../config/config'
import md5 from 'md5'

export default function generateAccountValidationEmail (accountId: string = '') {
    if (!accountId) return null
    return (
        `
        <h1>Validate your account</h1>
        <p>Activate your account</p>
        <a href="http://localhost:9001/${config.ACCOUNT_VALIDATION_ENDPOINT}/${accountId}">Validate</a>
        `
    )
}