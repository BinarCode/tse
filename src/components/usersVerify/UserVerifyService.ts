import util from 'util';
import moment from 'moment';
import crypto from 'crypto';
import sequelize from 'sequelize';
import { UserModel } from '@components/users';
import mixin from '@utils/rest/serviceMixin';
import { UserVerifyRepository, UserVerifyModel } from '@components/usersVerify';

/**
 * @desc  User Verify Service
 * @class UserVerifyService
 */
const UserVerifyService = {
    ...mixin(UserVerifyRepository),
    check(token: string, type: string) {
        return UserVerifyRepository.findIfNotUsed(token, type);
    },
    markAsUsed(token: UserVerifyModel, transaction?: sequelize.Transaction) {
        return UserVerifyRepository.update(
            token.id,
            {
                usedAt: new Date(),
            },
            { transaction }
        );
    },
    async store(
        user: UserModel,
        type: 'register' | 'email' | 'password' | 'other',
        hours = 1,
        transaction?: sequelize.Transaction
    ) {
        const randomToken = util.promisify(crypto.randomBytes);
        const res = await randomToken(32);
        const token = res.toString('hex');
        const till = moment(new Date())
            .add(hours, 'hours')
            .toDate();
        return UserVerifyRepository.store(
            {
                email: user.email,
                type,
                token,
                till,
            },
            {
                transaction,
            }
        );
    },
};

export default UserVerifyService;
