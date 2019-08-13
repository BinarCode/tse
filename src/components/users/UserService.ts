import bcrypt from 'bcrypt';
import { CreateOptions } from 'sequelize';
import mixin from '@utils/rest/serviceMixin';
import { UserRepository } from '@components/users';

/**
 * @desc  Users CRUD service
 * @class userService
 */
const userService = {
    ...mixin(UserRepository),
    async store(data, options: CreateOptions = {}) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return UserRepository.store(data, options);
    },

    async update(id, data, options = {}) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return UserRepository.update(id, data, options);
    },
};

export default userService;
