import {Authenticate} from '../http/middleware/Authenticate';
import {StartSession} from '../http/middleware/StartSession';
/**
 * The application's global HTTP middleware stack.
 * These middleware are run during every request to your application.
 */
export const middleware = {};

/**
 * The application's route middleware.
 * These middleware may be assigned to groups or used individually.
 */
export const routesMiddleware = {
    auth: Authenticate,
    session: StartSession
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
