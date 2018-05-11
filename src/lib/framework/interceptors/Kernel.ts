import * as isClass from 'is-class';
import {check} from '../../helpers';
import {log} from '../../cli/chalk';
import {Exception} from '../exceptions/Exception';

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

    /**
     * Split key passed from the route definition into middleware and arguments
     * @param key - format 'auth' or 'auth:admin,user'
     * @returns {{middleware: any; args: any[]}}
     */
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

    /**
     * Return properly handle function base
     * @param splitted { middleware: 'auth', args: ['admin', user'] }
     * @param handle function
     */
    public checkValidImplementation(splitted, cls) {
        let instance, handle;
        if (isClass(cls)) {
            instance = new cls();
            handle = instance.handle;
        } else {
            handle = cls;
        }
        if (typeof handle !== 'function') {
            let msg = `'handle' Function is not defined in ${instance.constructor.name} class`;
            this.throw(msg);
        }
        /**
         * We are waiting for a closure with callback middleware
         */
        if (splitted.args && splitted.args.length > 0) {
            let cb = handle(splitted.args);
            if (typeof cb !== 'function') {
                let msg = `'handle' Function should return an middleware function in ${instance.constructor.name} class, 
                    please read: https://expressjs.com/en/guide/using-middleware.html#middleware.router`;
                this.throw(msg);
            } else {
                handle = cb;
            }
        }

        return handle;
    }

    /**
     *
     * @param key 'auth' or 'auth:admin,user'
     * @returns {Array<Function>}
     */
    public joinClasses(key): Array<Function> {
        let mdls = [];
        let splitted = this.split(key);
        check(this.joinsMiddleware, splitted.middleware, `Middleware ${splitted.middleware} is 
        not defined as middleware in your config/middlewares file`);

        /**
         * Here is in  => if middleware defined in the config is a group with multiple middlewares
         */
        if (Array.isArray(this.joinsMiddleware[splitted.middleware])) {
            this.joinsMiddleware[splitted.middleware].forEach(cls => {
                mdls.push(this.checkValidImplementation(splitted, cls));
            });
        }
        /**
         * Here is in => if middleware is a function defined in config
         */
        if (typeof this.joinsMiddleware[splitted.middleware] === 'function') {
            mdls.push(this.checkValidImplementation(splitted, this.joinsMiddleware[splitted.middleware]));
        }
        return mdls;
    }

    /**
     * Join all middlewares defined in the config file,
     * if the same middleware is present in multiple object, the last one will be implemented
     */
    private join() {
        this.joinsMiddleware = { ...this.middleware, ...this.routesMiddleware, ...this.groupsMiddleware };
    }

    /**
     *
     * @param msg
     */
    private throw(msg) {
        log.error(msg);
        throw new Exception(msg);
    }

    get getGlobalMiddleware() {
        return this.middleware;
    }

}
