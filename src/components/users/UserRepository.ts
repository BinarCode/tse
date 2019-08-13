import mixin from '@utils/rest/repositoryMixin';
import { UserModel } from '@components/users';

/**
 * @desc Users CRUD
 * @class userRepository
 */
export default {
    ...mixin(UserModel),
    index() {
        return UserModel.findAll({
            include: [],
        });
    },
    findByEmail(email) {
        return UserModel.findOne({
            where: {
                email,
            },
        });
    },
};
