import ACL from '@middleware/ACL';
import Recaptcha from '@middleware/Recaptcha';
import Authenticate from '@middleware/Authenticate';
import Application from '@middleware/Application';
import StartSession from '@middleware/StartSession';
import AuthenticateUnverified from '@middleware/AuthenticateUnverified';
/**
 * The application's global HTTP middleware stack.
 * These middleware are run during every request to your application.
 */
export const middleware = {
    application: Application,
    recaptcha: Recaptcha,
    acl: ACL,
};

/**
 * The application's route middleware.
 * These middleware may be assigned to groups or used individually.
 */
export const routesMiddleware = {
    auth: Authenticate,
    'auth-unverified': AuthenticateUnverified,
};

/**
 * The application's route middleware groups.
 */
export const groupsMiddleware = {
    web: [StartSession, Authenticate],
    'api.admin': [Authenticate, ACL.admin],
    'api.user': [Authenticate, ACL.user],
    api: (req, res, next) => {
        // Needs this global API entry middleware global API rules (ie. cors)
        return next();
    },
};
