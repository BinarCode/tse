import * as express from 'express';
import {log} from '../../cli/chalk';
import Middleware from '../../../http/middleware/Middleware';
import { Routes } from '../../../routes/routes';
import {Response} from './http/Response';

export class Core {
    public app: express.Application;
    public router: Routes = new Routes();
    protected state;

    public config = {
        globalMiddleware: true,
        applyRespond: true
    };

    constructor(app, config = {}) {
        this.app = app;
        this.state = {
            globalMiddlewareInitiated: false
        };
        this.config = {...this.config, ...config};
        this.init();
    }

    protected applyGlobalMiddleware() {
        let handles = [];
        let middlewares = Middleware.getGlobalMiddleware;
        for (let middleware in middlewares) {
            let handle = Middleware.getCompactMiddlewares({
                middleware: middleware
            }, middlewares[middleware]);
            handles = [...handles, ...handle];
        }

        this.app.use(handles);
        log.success(`Gloabal middleware are configured.`);
        this.state.globalMiddlewareInitiated = true;
    }

    public initRoutes() {
        if (this.config.globalMiddleware === false || this.state.globalMiddlewareInitiated) {
            this.app.use(this.router.getRoutes());
            log.success(`Routes initialized.`);
        } else {
            log.warning(`${this.constructor.name}.ts: Routes are not initialized because the global middleware was not initiated yet.`);
        }
    }

    public monkeyPatching() {
        this.app.use((req, res, next) => {
            res['respond'] = Response(res);
            next();
        });
    }

    public init() {
        if (this.config.globalMiddleware) {
            this.applyGlobalMiddleware();
        }
        this.monkeyPatching();
        if (this.config.globalMiddleware) {
            this.initRoutes();
        }
        log.success(`Core initialized.`);
    }

    public use(middleware) {
        this.app.use(middleware);
    }
}
