import { CreateOptions, DestroyOptions, Op } from 'sequelize';

const repositoryMixin = model => {
    return {
        index() {
            return model.findAll({});
        },
        store(data, options: CreateOptions = {}) {
            return model.create(data, options);
        },
        find(id) {
            return model.findOne({
                where: {
                    id,
                },
            });
        },
        findWith(id, eagers = []) {
            const withs = [];
            eagers.forEach(eager => {
                if (model.associations[eager]) {
                    withs.push(eager);
                }
            });

            return model.findOne({
                where: {
                    id,
                },
                include: withs,
            });
        },
        findByUuid(uuid, attributes?: Array<String>) {
            let options = {
                where: {
                    uuid,
                },
            };

            if (attributes) {
                options['attributes'] = attributes;
            }

            return model.findOne(options);
        },
        update(id, data, options = {}) {
            return model.update(data, {
                where: {
                    id,
                },
                ...options,
            });
        },
        destroy(id, options: DestroyOptions = {}) {
            return model.destroy(
                {
                    where: {
                        id,
                    },
                },
                options
            );
        },
        oneWhere(where: {}) {
            return model.findOne({
                where,
            });
        },
        allWhere(where: {}) {
            return model.findAll({
                where,
            });
        },
        whereIdIn(ids) {
            return model.findAll({
                where: {
                    id: {
                        [Op.or]: ids,
                    },
                },
            });
        },
        countWhere(where: {} = {}) {
            return model.count({
                where,
            });
        },
        async existsWhere(where: {}) {
            return (
                (await model.count({
                    where,
                })) > 0
            );
        },
        countWhereIn(ids: number[]) {
            return model.count({
                where: {
                    id: {
                        [Op.or]: ids,
                    },
                },
            });
        },
        destroyByUserId(userId, options: DestroyOptions = {}) {
            return model.destroy({
                where: {
                    userId,
                },
                ...options,
            });
        },
        storeBulk(items: any[], transaction?) {
            return model.bulkCreate(items, { transaction });
        },
    };
};

export default repositoryMixin;
