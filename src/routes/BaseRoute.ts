import { Router } from 'express';
import {middleware} from '../http/middleware/middleware';
import {PathParams, RequestHandlerParams} from 'express-serve-static-core';

interface IConfig {
    prefix: string;
    middleware: string;
}

export class BaseRoute {
    protected router: Router = Router();
    protected LocalRouter;
    protected Route;

    constructor () {
        this.router = Router();
        this.Route = {
            group: this.group.bind(this)
        };
    }

    public sanitizePath (base: string, userPath: string): PathParams {
        let final = base;
        if (userPath === '') return `/${final}`;
        if (userPath.startsWith('/')) {
            userPath = userPath.substring(1);
        }
        if (base.startsWith('/')) {
            base = base.substring(1);
        }
        return `/${base}/${userPath}`;
    }

    public group(config: IConfig, callback): void {
        this.LocalRouter = {...this.router};
        this.LocalRouter.get = (path: string, cb: RequestHandlerParams) => {
            this.router.get(this.sanitizePath(config.prefix, path), middleware(config.middleware), cb);
        };

        this.LocalRouter.post = (path: string, cb: RequestHandlerParams) => {
            this.router.post(this.sanitizePath(config.prefix, path), middleware(config.middleware), cb);
        };

        this.LocalRouter.put = (path: string, cb: RequestHandlerParams) => {
            this.router.put(this.sanitizePath(config.prefix, path), middleware(config.middleware), cb);
        };

        this.LocalRouter.delete = (path: string, cb: RequestHandlerParams) => {
            this.router.delete(this.sanitizePath(config.prefix, path), middleware(config.middleware), cb);
        };
        callback(this.LocalRouter);
    }

    public getRoutes(): Router {
        return this.router;
    }
}
