export class Exception extends Error {
    public message: string;
    public status: number;
    public context: any;

    constructor(msg, status?: number, context?: any) {
        super(msg);
        this.message = msg;
        this.status = status || 500;
        this.context = context || {};
        Error.captureStackTrace(this, Exception);
    }
};
