import {check} from '../../helpers';

export abstract class Kernel {
    /**
     * The application's global HTTP middleware stack.
     * These middleware are run during every request to your application.
     */
    protected middleware: Object;
    /**
     * The application's route middleware groups.
     */
    protected groupsMiddleware: Object;
    /**
     * The application's route middleware.
     * These middleware may be assigned to groups or used individually.
     */
    protected routesMiddleware: Object;

    private joinsMiddleware: Object;

    protected constructor () {
        this.initMiddleware();
        this.initRoutes();
        this.initGroups();
        this.join();
    }

    abstract initMiddleware();
    abstract initRoutes();
    abstract initGroups();

    protected split(key) {
        let middleware = key, args = [];
        if (key.includes(':')) {
            let splitted = key.split(':');
            middleware = splitted[0];
            args = splitted[1].split(',');
        }

        return {
            middleware,
            args
        };
    }
    public getMiddleware(key) {
        let middle = [];

        if (typeof key === 'string') {
            middle = [...middle, ...this.joinClasses(key)];
        }

        if (Array.isArray(key)) {
            key.forEach(k => {
                middle = [...middle, ...this.joinClasses(k)];
            });
        }

        return middle;
    }

    /**
     *
     * @param key 'auth' or 'auth:admin,user'
     * @returns {Array<Function>}
     */
    private joinClasses(key): Array<Function> {
        let mdls = [];
        let splitted = this.split(key);
        check(this.joinsMiddleware, splitted.middleware, `Middleware ${splitted.middleware} is not defined as middleware`);

        if (Array.isArray(this.joinsMiddleware[splitted.middleware])) {
            this.joinsMiddleware[splitted.middleware].forEach(cls => {
                let instance = new cls();
                mdls.push( instance.encapsulate ? instance.encapsulate(splitted.args) : instance.handle);
            });
        }
        if (typeof this.joinsMiddleware[splitted.middleware] === 'function') {
            let instance = new this.joinsMiddleware[splitted.middleware];
            mdls.push(instance.encapsulate ? instance.encapsulate(splitted.args) : instance.handle);
        }
        return mdls;
    }

    private join() {
        this.joinsMiddleware = { ...this.middleware, ...this.routesMiddleware, ...this.groupsMiddleware };
    }

}
