import { t } from 'i18next';
import { AuthException } from '@exceptions';
import Response from 'src/interfaces/Response';
import Authenticate from '@middleware/Authenticate';

export default class AuthenticateUnverified extends Authenticate {
    public async handle(req, res: Response, next) {
        try {
            const user = await Authenticate.authenticicateWithPassport(req);

            if (!user) {
                throw new AuthException(t('Auth token invalid or missing'));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
}
