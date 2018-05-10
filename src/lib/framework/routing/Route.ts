import { Router } from 'express';
import { extend, noop } from 'lodash';
import {PathParams, RequestHandlerParams} from 'express-serve-static-core';
import Middleware  from '../../../http/middleware/Middleware';
import { IConfig } from './interfaces/IConfig';

export abstract class Route {
    protected expressRouter: Router = Router();
    protected LocalRouter;
    protected router;

    protected constructor () {
        this.expressRouter = Router();
        const local = {};
        extend(local, this.expressRouter, {
                group: this.group.bind(this)
            }
        );
        this.router = local;
    }

    protected sanitizePath (base: string, userPath: string): PathParams {
        let final = base;
        if (userPath === '') return `/${final}`;
        if (userPath && userPath.startsWith('/')) {
            userPath = userPath.substring(1);
        }
        if (base && base.startsWith('/')) {
            base = base.substring(1);
        }
        return `/${base || ''}/${userPath || ''}`;
    }

    protected middle (key) {
        return Middleware.getMiddleware(key);
    }

    protected group(config: IConfig, callback): void {
        this.LocalRouter = {...this.router};
        this.LocalRouter.get = (path: string, cb: RequestHandlerParams) => {
            this.expressRouter.get(this.sanitizePath(config.prefix, path), this.middle(config.middleware), cb);
        };

        this.LocalRouter.post = (path: string, cb: RequestHandlerParams) => {
            this.expressRouter.post(this.sanitizePath(config.prefix, path), this.middle(config.middleware), cb);
        };

        this.LocalRouter.put = (path: string, cb: RequestHandlerParams) => {
            this.expressRouter.put(this.sanitizePath(config.prefix, path), this.middle(config.middleware), cb);
        };

        this.LocalRouter.delete = (path: string, cb: RequestHandlerParams) => {
            this.expressRouter.delete(this.sanitizePath(config.prefix, path), this.middle(config.middleware), cb);
        };
        callback(this.LocalRouter);
    }

    public getRoutes(): Router {
        return this.expressRouter;
    }
}

export { IRoute } from './interfaces/IRoute';
