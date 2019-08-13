import isClass from 'is-class';
import isUndefined from 'lodash/isUndefined';

import Exception from '../../exceptions/Exception';

export const check = (obj, prop, message = undefined) => {
    if (isUndefined(obj[prop])) {
        const msg =
            message || `Property ${prop} is not present in the object passed`;
        // $error(msg)
        throw new Exception(msg);
    }

    return true;
};

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

    protected constructor() {
        this.initMiddleware();
        this.initRoutes();
        this.initGroups();
        this.join();
    }

    abstract initMiddleware();
    abstract initRoutes();
    abstract initGroups();

    /**
     * Split key passed from the route definition into middleware and arguments
     * @param key - format 'auth' or 'auth:admin,user'
     * @returns {{middleware: any; args: any[]}}
     */
    protected split(key) {
        let middleware = key,
            args = [];
        if (key.includes(':')) {
            const splitted = key.split(':');
            middleware = splitted[0];
            args = splitted[1].split(',');
        }

        return {
            middleware,
            args,
        };
    }

    /**
     *
     * @param key - format 'auth', 'auth:admin,user', ['auth'] or ['auth:admin,user'...]
     * @returns {any[]} Array with handle functions
     */
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

    public checkValidSignatureMiddleware(fn, mdl) {
        const indexStartArguments = fn.toString().indexOf('(');
        const indexStopArguments = fn.toString().indexOf(')');
        const str = fn
            .toString()
            .substring(indexStartArguments + 1, indexStopArguments);
        if (str.split(',').length !== 3) {
            this.throw(
                `Function passed as middleware for "${mdl}" not correspond with middleware signature.`
            );
        }
    }

    /**
     * Return properly handle function based on class or simple function
     * @param splitted { middleware: 'auth', args: ['admin', user'] }
     * @param handle function
     */
    public checkValidImplementation(splitted, cls) {
        let instance, handle;
        if (isClass(cls)) {
            instance = new cls();
            handle = instance.handle;
        } else {
            this.checkValidSignatureMiddleware(cls, splitted.middleware);
            handle = cls;
        }
        if (typeof handle !== 'function') {
            const msg = `'handle' Function is not defined in ${instance.constructor.name} class`;
            this.throw(msg);
        }
        /**
         * We are waiting for a closure with callback middleware
         */
        if (Array.isArray(splitted.args) && splitted.args.length > 0) {
            const cb = handle(splitted.args);
            this.checkValidSignatureMiddleware(cb, splitted.middleware);
            if (typeof cb !== 'function') {
                const msg = `'handle' Function should return an middleware function in ${instance.constructor.name} class,
                please read: https://expressjs.com/en/guide/using-middleware.html#middleware.router`;
                this.throw(msg);
                // // $error(msg);
            } else {
                handle = cb;
            }
        }

        return handle;
    }

    /**
     * Function that return an array of handle functions based on:
     * @param splitted { middleware: 'auth', args: ['admin', user'] }
     * @param functions [Function | Class (with handle method)...] or Function of Class
     * @returns {any[]}
     */
    public getCompactMiddlewares(splitted, functions) {
        const mdls = [];
        /**
         * Here is in  => if middleware defined in the config is a group with multiple middlewares
         */
        if (Array.isArray(functions)) {
            functions.forEach(cls => {
                mdls.push(this.checkValidImplementation(splitted, cls));
            });
        }

        /**
         * Here is in => if middleware is a function defined in config
         */
        if (typeof functions === 'function') {
            mdls.push(
                this.checkValidImplementation(
                    splitted,
                    this.joinsMiddleware[splitted.middleware]
                )
            );
        }

        return mdls;
    }

    /**
     *
     * @param key 'auth' or 'auth:admin,user'
     * @returns {Array<Function>}
     */
    public joinClasses(key): Array<Function> {
        if (key === '') return [];
        let mdls = [];
        const splitted = this.split(key);
        check(
            this.joinsMiddleware,
            splitted.middleware,
            `Middleware ${splitted.middleware} is
        not defined as middleware in your config/middlewares file`
        );

        mdls = [
            ...mdls,
            this.getCompactMiddlewares(
                splitted,
                this.joinsMiddleware[splitted.middleware]
            ),
        ];
        return mdls;
    }

    /**
     * Join all middlewares defined in the config file,
     * if the same middleware is present in multiple object, the last one will be implemented
     */
    private join() {
        this.joinsMiddleware = {
            ...this.middleware,
            ...this.routesMiddleware,
            ...this.groupsMiddleware,
        };
    }

    /**
     *
     * @param msg
     */
    private throw(msg) {
        // $error(msg);
        throw new Exception(msg);
    }

    get getGlobalMiddleware() {
        return this.middleware;
    }
}

export default Kernel;
