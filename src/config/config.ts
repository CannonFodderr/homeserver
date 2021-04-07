import fs from 'fs'
import path from 'path'
import env from 'dotenv'
const envVariables = env.parse(fs.readFileSync(path.join(__dirname + '../../../.env')))



class Config {
    private loadedConfig: {[key: string]: string}
    constructor () {
        this.loadedConfig = {}
        this.loadEnv()
    }
    private loadEnv () {
        const envArr = Object.keys(envVariables)
        envArr.forEach(item => {
            this.loadedConfig[item] = envVariables[item]
        })
    }
    public getConfig () {
        return this.loadedConfig
    }
}

export default new Config().getConfig()
