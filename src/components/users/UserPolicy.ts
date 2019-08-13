import { t } from 'i18next';
import isNull from 'lodash/isNull';
import { UserModel } from '@components/users';
import { NotFoundException } from '@exceptions/index';

const policy = {
    /**
     * TODO: Check if it's itself or admin
     * @param {UserModel} user
     * @param {UserModel} userToAccess
     * @returns {Promise<boolean>}
     */
    async access(user: UserModel, userToAccess: UserModel) {
        this.existsCheck(user, userToAccess);

        if (userToAccess.id === user.id) {
            return true;
        }

        return true;
    },

    existsCheck(user, entity?) {
        if (isNull(user)) {
            throw new NotFoundException(t(`User not found.`));
        }

        if (isNull(entity)) {
            throw new NotFoundException(
                t('Accessible not found.', { entity: 'User' })
            );
        }
    },
};

export default policy;
