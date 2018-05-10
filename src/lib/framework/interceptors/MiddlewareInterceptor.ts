export abstract class MiddlewareInterceptor {
    protected constructor() {
    }

    public encapsulate(args) {
        return this.handle;
    }

    abstract handle(req, res, next);
}
