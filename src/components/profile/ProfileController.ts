import { t } from 'i18next';
import Response from 'src/interfaces/Response';
import { ProfileRequest, ProfileService } from '@components/profile';

export default {
    async changePassword(req, res: Response, next) {
        try {
            await ProfileRequest.changePassword(req.body);
            const data = {
                oldPassword: req.body.oldPassword,
                password: req.body.password,
            };
            const response = await ProfileService.changePassword(
                req.user,
                data
            );
            return res.$respond(response);
        } catch (e) {
            return next(e);
        }
    },

    /**
     * Get me
     *
     * @param req
     * @param {Response} res
     * @param next
     * @returns {Promise<void>}
     */
    async me(req, res: Response, next) {
        res.$response.message('Authentication successful').$respond(req.user);
    },

    async update(req, res: Response, next) {
        try {
            await ProfileRequest.update(req.body);

            const user = await ProfileService.update(req.user, req.body);

            res.$response.message(t('Profile has been updated')).$respond(user);
        } catch (e) {
            next(e);
        }
    },

    async updateAvatar(req, res, next) {
        try {
            await ProfileRequest.updateAvatar(req);
            const user = await ProfileService.updateAvatar(
                req.user,
                req.files.avatar
            );
            return res.$respond(user);
        } catch (e) {
            return next(e);
        }
    },
};
