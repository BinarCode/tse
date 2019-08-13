import Exception from './Exception';

class AuthException extends Exception {
    /**
     *
     * @param message
     * @param {number} code
     * @param context - original exception
     */
    constructor(message, code = 401, context?: any) {
        super(message, code, context);
    }
}

export default AuthException;
