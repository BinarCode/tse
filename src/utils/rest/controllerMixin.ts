const controllerMixin = service => {
    return {
        /**
         * @param req
         * @param res
         * @param next
         * @returns {Promise<any>}
         */
        async index(req, res, next) {
            try {
                const list = await service.index();
                return res.$respond(list);
            } catch (e) {
                next(e);
            }
        },

        //TODO: Pagination integration
    };
};

export default controllerMixin;
