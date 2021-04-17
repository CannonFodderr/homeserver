interface UserName {
    firstName?: string,
    lastName?: string,
    username?: string
}

export interface UserSchema {
    email: string,
    password: string,
    phoneNumber: string,
    name?: UserName
}