import path from 'path'
import fs from 'fs/promises'
import config from '../config/config'
import { S3, config as awsConfig } from 'aws-sdk'

const { version } = require('../../package.json')

awsConfig.update({
    region: config.AWS_S3_REGION
})

class OSSStore {
    private s3: S3    
    constructor () {
        this.s3 = new S3({
            "apiVersion": version
        })
    }
    async uploadToBucket (filePath: string) {
        const fileStream = await fs.readFile(filePath)
        console.log({fileStream})


        // this.s3.upload({
        //     "Bucket": config.AWS_S3_BUCKET_ARN,
        //     "Key": '',
        //     "Body": ''
        // })
    }
}



export default new OSSStore()