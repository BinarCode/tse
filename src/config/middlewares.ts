import {Authenticate} from '../http/middleware/Authenticate';
import {StartSession} from '../http/middleware/StartSession';
import {Application} from '../http/middleware/Application';
import * as bodyParser from 'body-parser';
/**
 * The application's global HTTP middleware stack.
 * These middleware are run during every request to your application.
 */
export const middleware = {
    bodyParser: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
    ],
    application: Application,
    foo: [(req, res, next) => {
        console.log('First middle');
        next();
    }, (req, res, next) => {
        console.log('Second middle');
        next();
    }]
};

/**
 * The application's route middleware.
 * These middleware may be assigned to groups or used individually.
 */
export const routesMiddleware = {
    auth: Authenticate,
    session: (req, res, next) => {
        console.log('Local definition');
        next();
    }
};

/**
 * The application's route middleware groups.
 */
export const groupsMiddleware = {
    web: [
        StartSession,
        Authenticate
    ]
};
