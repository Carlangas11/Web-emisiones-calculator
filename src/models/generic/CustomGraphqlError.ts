export type CustomGraphqlError = {
    response: {
        errors: {
            message: string
            extensions: {
                exception: {
                    response: {
                        status:number
                    }
                }
            }
        }[]
    }
}