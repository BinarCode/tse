import { t } from 'i18next';
import request from 'request-promise';

export class Recaptcha {
    async handle(req, res, next) {
        const secretKey = process.env.GOOGLE_RECAPTCHA_APP_KEY;
        if (!req.body['g-recaptcha-response']) {
            return res.$response
                .error('Please select captcha')
                .bad()
                .$respond();
        }
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
        try {
            const response = await request(verificationUrl);
            const body = JSON.parse(response);
            if (!body.success) {
                return res.$response
                    .error(t('Failed captcha verification'))
                    .bad()
                    .$respond();
            }

            return next();
        } catch (e) {
            return next(e);
        }
    }
}

export default Recaptcha;
