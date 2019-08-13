import {
    groupsMiddleware,
    middleware,
    routesMiddleware,
} from '@middleware/middlewares';

import Kernel from './Kernel';

export class Middleware extends Kernel {
    constructor() {
        super();
    }

    initRoutes() {
        this.routesMiddleware = routesMiddleware;
    }

    initMiddleware() {
        this.middleware = middleware;
    }

    initGroups() {
        this.groupsMiddleware = groupsMiddleware;
    }
}

export default new Middleware();
