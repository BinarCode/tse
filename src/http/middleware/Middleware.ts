import {Kernel} from '../../lib/framework/interceptors/Kernel';
import {middleware, routesMiddleware, groupsMiddleware} from '../../config/middlewares';
export class Middleware extends Kernel {
    constructor () {
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
