import { t } from 'i18next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BPromise from 'bluebird';
import redis from '@bootstrap/redis';
import sequelize from '@bootstrap/database';
import AuthException from '@exceptions/AuthException';
import { UserService, UserRepository } from '@components/users';
import { UserVerifyModel, UserVerifyService } from '@components//usersVerify';

const ONE_DAY_IN_SECONDS = 86400;

export default {
    async login(email: string, password: string) {
        const user = await UserRepository.findByEmail(email);

        if (user.verifiedAt === null) {
            throw new AuthException(t('User account is not activated.'));
        }

        const isPasswordCorrect = user
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!isPasswordCorrect) {
            throw new AuthException(t('User not found or wrong password.'));
        }

        const payload = { userId: user.id, email: user.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return token;
    },
    async logout(token: string) {
        await redis.setAsync(
            `TOKEN-${token}`,
            'invalid',
            'EX',
            ONE_DAY_IN_SECONDS
        );
    },
    async resetPassword(email: string, token: string, password: string) {
        const tokenEntity = await UserVerifyService.check(
            token,
            UserVerifyModel.TYPE_PASSWORD
        );

        if (!tokenEntity || email !== tokenEntity.email) {
            throw new AuthException(t('Token is not valid'));
        }

        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new AuthException(t('User does not exists.'));
        }

        const transaction = await sequelize.transaction();

        try {
            await UserService.update(
                user.id,
                {
                    password,
                },
                { transaction }
            );

            await UserVerifyService.markAsUsed(tokenEntity, transaction);

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw new AuthException(t('Could not reset password'));
        }
    },
    async verifyRegister(verification: UserVerifyModel) {
        const transaction = await sequelize.transaction();
        const user = await UserService.oneWhere({ email: verification.email });
        user.verifiedAt = new Date();
        verification.usedAt = new Date();
        try {
            await BPromise.all([
                user.save({ transaction }),
                verification.save({ transaction }),
            ]);

            transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    },
};
