import { t } from 'i18next';
import bcrypt from 'bcrypt';
import sequelize from '@bootstrap/database';
import { FileService } from '@components/files';
import { ValidationException } from '@exceptions/index';
import { UserModel } from '@components/users';

export default {
    async changePassword(user: UserModel, data) {
        const isOldPasswordCorrect = await bcrypt.compare(
            data.oldPassword,
            user.password
        );

        if (!isOldPasswordCorrect) {
            throw new ValidationException(t(`Old password doesn't match.`));
        }

        user.password = await bcrypt.hash(data.password, 10);
        return user.save();
    },
    async updateAvatar(user: UserModel, file) {
        const uploadedFile = await FileService.store(file, 'small');
        return user.update({
            image: uploadedFile.publicUrl,
        });
    },
    async update(user: UserModel, body) {
        return user.update(body);
    },
};
