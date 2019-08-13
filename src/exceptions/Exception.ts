class Exception extends Error {
    public message: string;
    public code: number;
    public context: any;

    constructor(message, code = 500, context = null) {
        super();
        this.message = message;
        this.code = code;
        this.context = context;
    }

    getMessage() {
        return this.message;
    }

    getCode() {
        return this.code;
    }

    getContext() {
        return this.context;
    }
}

export default Exception;
