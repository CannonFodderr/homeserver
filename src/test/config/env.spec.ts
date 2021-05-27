import { validateEmail } from '../../utils/email.utils'
import { expect } from 'chai'
import config from '../../config/config'

describe("Config test unit", () => {
       
    it("Should load config enviroment variables", () => {
        
        expect(config)
    })

    it ("Should contain Server mandatory keys", () => {
        
        expect(config.NODE_ENV).to.be.a('string')
        expect(config.PORT).to.be.a('string')
        expect(config.PRIVATE_KEY_PASSPHRASE).to.be.a('string')
        expect(config.APP_NAME).to.be.a('string')
    })
    
    it ("Should contain E-MAIL mandatory keys", () => {
        
        expect(config.EMAIL_ACCOUNT).to.be.a('string')
        expect(validateEmail(config.EMAIL_ACCOUNT)).to.be.true
        expect(config.EMAIL_ACCOUNT).to.be.a('string')
        expect(config.EMAIL_SERVICE).to.be.a('string')
        expect(config.EMAIL_ACCOUNT_USERNAME).to.be.a('string')
        expect(config.EMAIL_PASSWORD).to.be.a('string')
        expect(config.ACCOUNT_VALIDATION_ENDPOINT).to.be.a('string')
    })

    it ("Should contain MONGODB mandatory keys", () => {
        
        expect(config.MONGODB_HOST).to.be.a('string')
        expect(config.MONGODB_DB_NAME).to.be.a('string')
        expect(config.MONGODB_USER).to.be.a('string')
        expect(config.MONGODB_PASSWORD).to.be.a('string')
        expect(config.MONGO_TEST_DB_NAME).to.be.a('string')
    })

    it ("Should contain REDIS mandatory keys", () => {
        
        expect(config.REDIS_PROTOCOL).to.be.a('string')
        expect(config.REDIS_PORT).to.be.a('string')
        expect(config.REDIS_HOST).to.be.a('string')

    })

    it ("Should contain AWS mandatory keys", () => {
        
        expect(config.AWS_REGION).to.be.a('string')
        expect(config.AWS_USER_ACCESS_KEY).to.be.a('string')
        expect(config.AWS_USER_SECRET_ACCESS_KEY).to.be.a('string')

    })

    it("should contain S3 mandatory keys", () => {
        expect(config.AWS_S3_BUCKET_ARN).to.be.a('string')
        expect(config.AWS_S3_BUCKET_NAME).to.be.a('string')
    })
})

