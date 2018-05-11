import * as express from 'express';
import {log} from '../../cli/chalk';
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
        let handles;
        let middlewares = Middleware.getGlobalMiddleware;
        for (let middleware in middlewares) {
            handles = Middleware.getCompactMiddlewares({
                middleware: middleware
            }, middlewares[middleware]);
        }

        this.app.use(handles);
        log.success(`Gloabal middleware are configured.`);
    }

    public initRoutes() {
        this.app.use(this.router.getRoutes());
        log.success(`Routes initialized.`);
    }

    public init() {
        this.applyGlobalMiddleware();
        this.initRoutes();
        log.success(`Core initialized.`);
    }

}
