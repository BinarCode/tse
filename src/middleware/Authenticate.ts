import { t } from 'i18next';
import { Request } from 'express';
import passport from 'passport';
import BPromise from 'bluebird';
import redis from '@bootstrap/redis';
import { AuthException } from '@exceptions';
import { UserService } from '@components/users';
import Response from '@src/interfaces/Response';
import { ExtractJwt, Strategy } from 'passport-jwt';

export default class Authenticate {
    public static initialize() {
        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        };

        const strategy = new Strategy(
            jwtOptions,
            async (req: Request, payload, next) => {
                try {
                    const [_, token] = req.headers.authorization.split(' ');

                    await Authenticate.isTokenValid(token);

                    const user = await UserService.find(payload.userId);

                    next(null, user);
                } catch (e) {
                    next(e);
                }
            }
        );

        passport.use(strategy);
    }

    public async handle(req, res: Response, next) {
        try {
            const user = await Authenticate.authenticicateWithPassport(req);

            if (user['verifiedAt'] === null) {
                throw new AuthException(t('User is not activated'));
            }

            if (!user) {
                throw new AuthException(t('Auth token invalid or missing'));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

    private static async isTokenValid(token: string) {
        const status = await redis.getAsync(`TOKEN-${token}`);

        if (status === 'invalid') {
            throw new AuthException(t('Token has expired'));
        }
    }

    protected static async authenticicateWithPassport(req) {
        return new BPromise((resolve, reject) => {
            passport.authenticate('jwt', (err, user, info) => {
                if (err) {
                    return reject(err);
                }

                resolve(user);
            })(req);
        });
    }
}
