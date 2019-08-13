import UserVerifyModel from './userVerifyModel';
import mixin from '@utils/rest/repositoryMixin';

export default {
    findByEmail(email) {
        return UserVerifyModel.findOne({
            where: {
                email,
            },
        });
    },
    findIfNotUsed(token: string, type: string) {
        return UserVerifyModel.findOne({
            where: {
                token,
                type,
                used_at: null,
                // till: {
                //     [Sequelize.Op.gte]: new Date(),
                // },
            },
        });
    },
    ...mixin(UserVerifyModel),
};
