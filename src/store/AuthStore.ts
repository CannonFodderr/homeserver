import {generateKeyPair, getCiphers } from 'crypto'
import { Secret } from 'jsonwebtoken'
import config from '../config/config'
import jwt from 'jsonwebtoken'

interface JWTSignOptions {
    algorithm?: jwt.Algorithm
    expiration?: string,
    audience?: string
}
class AuthStore {
    private privateKey: Secret
    private publicKey: String | null

    constructor(){
        this.privateKey = ""
        this.publicKey = null
        if (!this.privateKey || !this.publicKey) {
            this.generateKeyPair()
        }
    }
    generateKeyPair = () => {
        generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: config.PRIVATE_KEY_PASSPHRASE
            }
            }, (err, publicKey, privateKey) => {
                if (err) {
                    return console.error(err)
                }
                this.privateKey = privateKey
                this.publicKey = publicKey
            })
    }
    getPrivateKey () {
        return this.privateKey.toString()
    }
    getSignedJWT (payload:{}, options: JWTSignOptions) {
        const {
            expiration = '5m',
            algorithm = 'RS256',
            audience = 'test'
        } = options
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                {key: this.getPrivateKey(), passphrase: config.PRIVATE_KEY_PASSPHRASE },
                {algorithm: algorithm, expiresIn: expiration, audience: audience, issuer: 'server', 'jwtid': Date.now().toString() },
                (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
        })
    }
}

export default new AuthStore()