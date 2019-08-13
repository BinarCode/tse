import { t } from 'i18next';
import { ValidationException } from '@exceptions/index';
import { isUndefined } from 'lodash';

export default {
    async store(req) {
        if (isUndefined(req.files)) {
            throw new ValidationException(t('Missing file.'));
        }

        return true;
    },
};
