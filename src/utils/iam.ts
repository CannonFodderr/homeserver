import AuthStore from '../store/AuthStore'

const runtimeArguments = process.argv
const flagsDict: any = {
    '-I': 'code',
    '-D': 'expiration',
    '-A': 'audience'
}

function isFlag (str:string) {
    return str[0] === '-'
}

const payloadAndOptions:any = {}

runtimeArguments.forEach((arg: string, index) => {
    const nextArg = runtimeArguments[index + 1]

    if (isFlag(arg) && !nextArg || isFlag(arg) && isFlag(nextArg)) {
        console.error("Missing value for flag: ", arg)
        process.exit()
    }

    const dictValue = flagsDict[arg]
    if (dictValue) {
        payloadAndOptions[dictValue] = nextArg
    }
})

const { code = null , expiration = null, audience = null } = payloadAndOptions


async function getJwt () {
    try {
        const generated = await AuthStore.generateKeyPair()
        if (!generated) {
            console.error("Unable to generate keypair")
            process.exit()
        }
        const jwt = await AuthStore.getSignedJWT({code}, {expiration: expiration + 'days', audience})

        console.log("JWT Token for: ", code)
        console.log({
            jwt,
            audience,
            expiration: expiration + 'days'
        })
    }
    catch (err) {
        console.error(err)
    }
}

getJwt()