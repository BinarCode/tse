const Status = require('http-status');

class Response {
    res;
    withData;
    withError;
    withStatus = Status.OK;
    withMessage;

    constructor(res) {
        this.res = res;
        this.$respond = this.$respond.bind(this);
    }

    data(data: any) {
        this.withData = data;
        return this;
    }

    ok() {
        this.withStatus = Status.OK;
        return this;
    }

    notFound() {
        this.withStatus = Status.NOT_FOUND;
        return this;
    }

    bad() {
        this.withStatus = Status.BAD_REQUEST;
        return this;
    }

    forbidden() {
        this.withStatus = Status.FORBIDDEN;
        return this;
    }

    error(message = null) {
        this.withStatus = Status.INTERNAL_SERVER_ERROR;
        this.withError = message;
        return this;
    }

    message(message = null) {
        this.withMessage = message;
        return this;
    }

    $respond(data: any = undefined, status?: number) {
        const response = {};
        if (data && this.withData) {
            this.withData = { ...this.withData, ...data };
        } else {
            this.withData = data;
        }

        if (status) {
            this.withStatus = status;
        }

        if (this.withData) {
            response['data'] = this.withData;
        }

        if (this.withError) {
            response['error'] = this.withError;
        }

        if (this.withMessage) {
            response['message'] = this.withMessage;
        }

        return this.res.status(this.withStatus).json(response);
    }

    static make(res) {
        return new this(res);
    }
}

export default Response;
