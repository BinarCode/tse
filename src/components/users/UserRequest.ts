import joi from '@hapi/joi';

export default {
    async store(body) {
        const schema = joi.object().keys({
            fullName: joi
                .string()
                .min(3)
                .max(256)
                .required(),
            locale: joi.string().min(2),
            password: joi.string().min(3),
            about: joi.string().max(160),
            email: joi.string().email({ minDomainSegments: 2 }),
        });

        return joi.validate(body, schema);
    },

    async update(body) {
        const schema = joi.object().keys({
            fullName: joi
                .string()
                .min(3)
                .max(256)
                .required(),
            about: joi.string().max(160),
            locale: joi.string().min(2),
        });

        return joi.validate(body, schema);
    },
};
