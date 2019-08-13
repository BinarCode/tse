import { t } from 'i18next';
import joi from '@hapi/joi';
import isUndefined from 'lodash/isUndefined';
import ValidationException from '../../exceptions/ValidationException';

export default {
    async update(body) {
        const locationSchema = joi.object().keys({
            name: joi
                .string()
                .min(3)
                .max(256)
                .required(),
            lat: joi.number(),
            long: joi.number(),
        });

        const linkSchema = joi.object().keys({
            name: joi.string().required(),
            url: joi.string().required(),
            icon: joi.string(),
        });

        const schema = joi.object().keys({
            fullName: joi
                .string()
                .min(3)
                .max(255)
                .required(),
            image: joi.string().max(256),
            about: joi.string().max(160),
            positions: joi
                .array()
                .items(joi.string())
                .required(),
            locations: joi
                .array()
                .items(locationSchema)
                .required(),
            links: joi
                .array()
                .items(linkSchema)
                .required(),
        });

        return joi.validate(body, schema);
    },
    async changePassword(body) {
        const schema = joi.object().keys({
            oldPassword: joi
                .string()
                .min(3)
                .required(),
            password: joi
                .string()
                .min(3)
                .required(),
            confirmPassword: joi
                .string()
                .min(3)
                .required()
                .valid(joi.ref('password')),
        });

        return joi.validate(body, schema);
    },
    async updateAvatar(req) {
        if (isUndefined(req.files) || isUndefined(req.files.avatar)) {
            throw new ValidationException(t(`Missing 'avatar' field.`));
        }

        return true;
    },
};
