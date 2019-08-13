import { t } from 'i18next';
import Exception from './Exception';

class ForbiddenException extends Exception {
    /**
     *
     * @param message
     * @param {number} code
     * @param context - original exception
     */
    constructor(
        message = t(`You don't have permission to access.`),
        code = 403,
        context?: any
    ) {
        super(message, code, context);
    }
}

export default ForbiddenException;
