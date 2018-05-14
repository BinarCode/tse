import {Router as ExpressRouter} from 'express';
import {extend, noop} from 'lodash';
import {PathParams, RequestHandlerParams} from 'express-serve-static-core';
import Middleware from '../../../http/middleware/Middleware';
import {IRouter} from './interfaces/IRouter';

let router: IRouter = ExpressRouter();

const sanitizePath = (base: string, userPath: string): PathParams  => {
    let final = base;
    if (userPath === '') return `/${final}`;
    if (userPath && userPath.startsWith('/')) {
        userPath = userPath.substring(1);
    }
    if (base && base.startsWith('/')) {
        base = base.substring(1);
    }
    return `/${base || ''}/${userPath || ''}`;
};

const middle = key => {
    return Middleware.getMiddleware(key);
};

router['group'] = (config, callback) => {
    let local = {};
    extend(local, router);
    local = {...router};
    ['get', 'post', 'delete', 'patch', 'put'].forEach(action => {
        local[action] = (path: string, cb: RequestHandlerParams) => {
            router[action](sanitizePath(config.prefix, path), middle(config.middleware), cb);
        };
    });
    callback(local);
};

export {router};
