import { FileService, FileRequest } from '@components/files';

export default {
    async index(req, res, next) {
        try {
            const data = await FileService.index();
            return res.$respond(data);
        } catch (e) {
            return next(e);
        }
    },
    async store(req, res, next) {
        try {
            await FileRequest.store(req);
            let file = req.files.file;
            const data = await FileService.store(file, 'medium');
            return res.$respond(data);
        } catch (e) {
            return next(e);
        }
    },
};
