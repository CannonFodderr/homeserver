import config from '../config/config'
import { S3, config as awsConfig } from 'aws-sdk'
import { Request } from 'express'

awsConfig.update({
    region: config.AWS_S3_REGION,
    credentials: {
        "accessKeyId": config.AWS_USER_ACCESS_KEY,
        "secretAccessKey": config.AWS_USER_SECRET_ACCESS_KEY
    }
})

class OSSStore {
    private s3: S3    
    constructor () {
        this.s3 = new S3()
    }
    async uploadToBucket (req: Request) {
        const { file } = req
        if (!file || !file.originalname) {
            return [new Error("No file or filename found"), null]
        }
        
        const s3Params: S3.PutObjectRequest  = {
            "Bucket": config.AWS_S3_BUCKET_NAME,
            "Key": file.originalname,
            "Body": file.buffer,
            "ContentType": req.file.mimetype,
        }
        
        return new Promise((resolve) => {
            this.s3.putObject(s3Params, (err: any = null, data:any = null) => {
                resolve([err, data])
            })
        })
    }
}



export default new OSSStore()