declare namespace Express {
    interface Response {
        respond(
            data?: any,
            message?: string,
            responseCode?: number,
            statusCode?: number
        ): any;
    }
}
// interface Application { }
