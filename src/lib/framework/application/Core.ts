import * as express from 'express';
import Middleware from '../../../http/middleware/Middleware';
import { Routes } from '../../../routes/routes';

export class Core {
    public app: express.Application;
    public router: Routes = new Routes();
    constructor(app) {
        this.app = app;
        this.init();
    }

    protected applyGlobalMiddleware() {
        let middlewares = Middleware.getGlobalMiddleware;
        for (let middleware in middlewares) {
            let handle = Middleware.checkValidImplementation({
                middleware: middleware
            }, middlewares[middleware]);
            this.app.use(handle);
        }

    }

    public initRoutes() {
        this.app.use(this.router.getRoutes());
    }

    public init() {
        this.applyGlobalMiddleware();
        this.initRoutes();
    }

}
