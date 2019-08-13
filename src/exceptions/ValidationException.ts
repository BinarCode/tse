import Exception from './Exception';

class ValidationException extends Exception {
    /**
     *
     * @param message
     * @param {number} code
     * @param context - original exception
     */
    constructor(message, code = 404, context?: any) {
        super(message, code, context);
    }
}

export default ValidationException;
