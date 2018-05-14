import * as express from 'express';
import {noop} from 'lodash';
import connect from '../../mongoose/connect';
import {log} from '../../cli/chalk';
import Middleware from '../../../http/middleware/Middleware';
import {Response} from './http/Response';
import {config} from '../../../config/index';
require('require-all')({
    dirname     :  __dirname + '/../../../routes/',
    filter      :  /(.+)\.ts$/,
    recursive   : true
});
import {router} from '../../Facades';
export class Core {
    public app: express.Application;
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
            this.app.use(router);
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

    public use(middleware) {
        this.app.use(middleware);
    }

    public listen() {
        this.app.listen(config.default.PORT, noop);
    }

    public dbConnect() {
        connect.connect(config.default);
    }

    public init() {
        if (this.config.globalMiddleware) {
            this.applyGlobalMiddleware();
        }
        this.monkeyPatching();
        if (this.config.globalMiddleware) {
            this.initRoutes();
        }
        this.listen();
        this.dbConnect();
        log.success(`Core initialized.`);
    }
}
