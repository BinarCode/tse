import { t } from 'i18next';
import { Request } from 'express';
import sequelize from '@bootstrap/database';
import Response from '@src/interfaces/Response';
import MailService from '@services/mail/MailService';
import { ValidationException } from '@exceptions/index';
import { UserService, UserRepository } from '@components/users';
import { UserVerifyModel, UserVerifyService } from '@components/usersVerify';

import AuthRequest from './AuthRequest';
import AuthService from './AuthService';
import { RegisterEmail } from '@components/auth';

export default {
    async register(req, res: Response, next) {
        let user, verification;
        const transaction = await sequelize.transaction();
        try {
            await AuthRequest.register(req.body);
        } catch (e) {
            return next(e);
        }

        try {
            const { email, fullName, password } = req.body;
            user = await UserService.store(
                {
                    fullName,
                    email,
                    password,
                },
                { transaction }
            );
            verification = await UserVerifyService.store(
                user,
                UserVerifyModel.TYPE_REGISTER,
                1,
                transaction
            );
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            return next(e);
        }

        try {
            await user.sendNotificationEmail(
                new RegisterEmail(user, verification)
            );

            const { email, password } = user;

            const token = await AuthService.login(email, password);
            return res.$response.message('A validation email sent.').$respond({
                user,
                token,
            });
        } catch (e) {
            return next(e);
        }
    },
    async verifyRegister(req, res, next) {
        try {
            await AuthRequest.verifyRegister(req.body);
            const verification = await UserVerifyService.check(
                req.body.token,
                UserVerifyModel.TYPE_REGISTER
            );
            if (!verification) {
                throw new ValidationException(`Token is not valid.`, 401);
            }

            await AuthService.verifyRegister(verification);

            res.$response
                .message(t('Account has been activated successfully.'))
                .$respond();
        } catch (e) {
            return next(e);
        }
    },
    async login(req, res: Response, next) {
        try {
            await AuthRequest.login(req.body);

            const { email, password } = req.body;

            const token = await AuthService.login(email, password);

            res.$respond({ token });
        } catch (e) {
            next(e);
        }
    },

    async logout(req: Request, res: Response, next) {
        try {
            const [_, token] = req.headers.authorization.split(' ');

            await AuthService.logout(token);

            res.$response.message(t('User logged out')).$respond();
        } catch (e) {
            next(e);
        }
    },

    async sendResetPasswordEmailWithToken(req, res: Response, next) {
        try {
            await AuthRequest.sendResetPasswordEmail(req.body);

            const user = await UserRepository.findByEmail(req.body.email);
            const resetToken = await UserVerifyService.store(
                user,
                UserVerifyModel.TYPE_PASSWORD
            );

            const mailService = new MailService();
            await mailService
                .to(user.email)
                .template('reset.password.email')
                .subject(t('Reset password request'))
                .data({
                    token: resetToken.token,
                    fullName: user.fullName,
                    email: user.email,
                })
                .send();

            res.$response
                .message(t('Email with instructions was sent'))
                .$respond();
        } catch (e) {
            next(e);
        }
    },

    async resetPassword(req, res: Response, next) {
        try {
            await AuthRequest.resetPassword(req.body);

            const { email, token, password } = req.body;

            await AuthService.resetPassword(email, token, password);

            res.$response.message(t('Password has been changed.')).$respond();
        } catch (e) {
            next(e);
        }
    },
};
