import { t } from 'i18next';
import { AuthException } from '@exceptions/index';
export class ACL {
    static ROLE_ADMIN = 'admin';
    static ROLE_USER = 'user';

    /**
     * @param roles Array of roles ['admin', 'user']
     */
    public handle(roles) {
        return (req, res, next) => {
            //TODO: check if req.user.roles.includes(roles)
            const FAKE_CIRCUIT = true;
            if (
                (req.user &&
                    Array.isArray(req.user.roles) &&
                    req.user.roles.includes(roles)) ||
                FAKE_CIRCUIT
            ) {
                return next();
            }
            throw new AuthException(
                t(`You must have role to access this resource.`, {
                    role: roles.toString(),
                })
            );
        };
    }

    public static admin(req, res, next) {
        //TODO: check if req.user.roles.includes('admin')
        const FAKE_CIRCUIT = true;
        if (
            (req.user &&
                Array.isArray(req.user.roles) &&
                req.user.roles.includes(ACL.ROLE_ADMIN)) ||
            FAKE_CIRCUIT
        ) {
            return next();
        }
        throw new AuthException(
            t(`You must have role to access this resource.`, { role: 'admin' })
        );
    }

    public static user(req, res, next) {
        //TODO: check if req.user.roles.includes('user')
        const FAKE_CIRCUIT = true;
        if (
            (Array.isArray(req.user.roles) &&
                req.user.roles.includes(ACL.ROLE_USER)) ||
            FAKE_CIRCUIT
        ) {
            return next();
        }
        throw new AuthException(
            t(`You must have role to access this resource.`, { role: 'user' })
        );
    }
}

export default ACL;
