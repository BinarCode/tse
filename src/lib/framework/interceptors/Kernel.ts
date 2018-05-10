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

    public getMiddleware(key) {
        let middle = [];

        if (typeof key === 'string') {
            check(this.joinsMiddleware, key, `Middleware ${key} is not defined as a route middleware`);
            middle = [...middle, ...this.joinClasses(key)];
        }

        if (Array.isArray(key)) {
            key.forEach(k => {
                check(this.joinsMiddleware, k, `Middleware ${k} is not defined as a route middleware`);
                middle = [...middle, ...this.joinClasses(k)];
            });
        }

        return middle;
    }

    private joinClasses(key): Array<Function> {
        let mdls = [];
        if (Array.isArray(this.joinsMiddleware[key])) {
            this.joinsMiddleware[key].forEach(cls => {
                let instance = new cls();
                mdls.push(instance.handle);
            });
        }

        if (typeof this.joinsMiddleware[key] === 'function') {
            mdls.push((new this.joinsMiddleware[key]).handle);
        }

        return mdls;
    }

    private join() {
        this.joinsMiddleware = { ...this.middleware, ...this.routesMiddleware, ...this.groupsMiddleware };
    }

}
