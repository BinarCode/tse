import { CreateOptions } from 'sequelize';

const serviceMixin = repository => {
    return {
        index() {
            return repository.index();
        },

        find(id) {
            return repository.find(id);
        },
        findWith(id, eagers = []) {
            return repository.findWith(id, eagers);
        },

        findByUuid(uuid, attributes?: Array<String>) {
            return repository.findByUuid(uuid, attributes);
        },

        store(data, options: CreateOptions = {}) {
            return repository.store(data, options);
        },

        update(id, data, options = {}) {
            return repository.update(id, data, options);
        },

        destroy(id, options: CreateOptions = {}) {
            return repository.destroy(id, options);
        },

        oneWhere(where) {
            return repository.oneWhere(where);
        },
    };
};

export default serviceMixin;
