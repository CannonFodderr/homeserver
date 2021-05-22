import path from 'path'
import fs from 'fs/promises'
import config from '../config/config'
import { S3, config as awsConfig } from 'aws-sdk'
import { Request } from 'express'

awsConfig.update({
    region: config.AWS_S3_REGION
})

class OSSStore {
    private s3: S3    
    constructor () {
        this.s3 = new S3({
            "region": "eu-central-1",
            "credentials": {
                "accessKeyId": config.AWS_USER_ACCESS_KEY,
                "secretAccessKey": config.AWS_USER_SECRET_ACCESS_KEY
            }
        })
    }
    async uploadToBucket (req: Request) {
        
        const s3Params: S3.PutObjectRequest  = {
            "Bucket": config.AWS_S3_BUCKET_NAME,
            "Key": 'exampleobject',
            "Body": req,
            "ContentType": req.file.mimetype,
        }
        
        this.s3.upload(s3Params, (err: any, data:any) => {
            if (err) {
                console.error(err)
                return
            }
            console.log({data})
        })
    }
}



export default new OSSStore()