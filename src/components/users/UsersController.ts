import { UserService, UserRequest, UserPolicy } from '@components/users';

export default {
    async index(req, res, next) {
        try {
            const list = await UserService.index();
            return res.$respond(list);
        } catch (e) {
            return next(e);
        }
    },

    async store(req, res, next) {
        try {
            await UserRequest.store(req.body);
        } catch (e) {
            return res.$response
                .bad()
                .error(e)
                .$respond();
        }
        try {
            const user = await UserService.store(req.body);
            return res.$respond(user);
        } catch (e) {
            next(e);
        }
    },

    async find(req, res, next) {
        try {
            const user = await UserService.find(req.params.id);
            await UserPolicy.access(req.user, user);

            return res.$respond(user);
        } catch (e) {
            return next(e);
        }
    },

    async findByUuid(req, res, next) {
        try {
            const user = await UserService.findByUuid(req.params.uuid, [
                'email',
                'locale',
                'gender',
                'salutation',
                'fullName',
                'image',
            ]);
            await UserPolicy.existsCheck(user);

            return res.$respond(user);
        } catch (e) {
            return next(e);
        }
    },

    async update(req, res, next) {
        try {
            await UserRequest.update(req.body);
            let user = await UserService.find(req.params.id);
            await UserPolicy.access(req.user, user);
            user = await UserService.update(req.params.id, req.body);

            return res.$respond(user);
        } catch (e) {
            next(e);
        }
    },

    async destroy(req, res, next) {
        try {
            const user = await UserService.find(req.params.id);
            await UserPolicy.access(req.user, user);
            const response = await UserService.destroy(req.params.id);

            return res.$respond(response);
        } catch (e) {
            return next(e);
        }
    },
};
