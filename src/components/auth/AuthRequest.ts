import { t } from 'i18next';
import joi from '@hapi/joi';
import { ValidationException } from '@exceptions/index';
import { UserService, UserRepository } from '@components/users';

export default {
    login(body) {
        const schema = joi.object().keys({
            email: joi
                .string()
                .email({ minDomainSegments: 2 })
                .required(),
            password: joi
                .string()
                .min(3)
                .required(),
        });

        return joi.validate(body, schema);
    },

    async sendResetPasswordEmail(body) {
        const schema = joi.object().keys({
            email: joi
                .string()
                .email({ minDomainSegments: 2 })
                .required(),
        });

        await joi.validate(body, schema);

        if (!(await UserRepository.existsWhere({ email: body.email }))) {
            throw new ValidationException(t('User does not exists'), 404);
        }
    },

    async resetPassword(body) {
        const schema = joi.object().keys({
            email: joi
                .string()
                .email({ minDomainSegments: 2 })
                .required(),
            token: joi.string().required(),
            password: joi
                .string()
                .min(3)
                .required(),
        });

        return joi.validate(body, schema);
    },
    async register(body) {
        const schema = joi.object().keys({
            fullName: joi.string(),
            email: joi.string().email({ minDomainSegments: 2 }),
            password: joi.string().min(3),
        });

        await joi.validate(body, schema);

        if (await UserService.oneWhere({ email: body.email })) {
            new ValidationException(t('Email already used'), 401);
        }
    },
    async verifyRegister(body) {
        const schema = joi.object().keys({
            token: joi.string().required(),
        });

        return joi.validate(body, schema);
    },
};
